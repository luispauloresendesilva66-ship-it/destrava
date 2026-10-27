-- Destrava: core schema, RLS and public certificate verification.

-- ---------------------------------------------------------------- tables
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'gold', 'platinum')),
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now()
);

create table public.levels (
  id uuid primary key default gen_random_uuid(),
  position int unique not null,
  slug text unique,
  name text,
  description text
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels (id),
  position int,
  title text,
  description text,
  duration_seconds int not null,
  video_key text,
  captions_key text,
  is_free boolean default false,
  is_sample boolean default false,
  unique (level_id, position)
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id),
  position int,
  type text check (type in ('multiple_choice', 'fill_blank', 'order_blocks', 'code')),
  topic text,
  prompt jsonb,
  solution jsonb,
  explanation text
);

create table public.exercise_attempts (
  id bigserial primary key,
  user_id uuid not null default auth.uid() references auth.users (id),
  exercise_id uuid not null references public.exercises (id),
  correct boolean,
  created_at timestamptz default now()
);

create table public.lesson_progress (
  user_id uuid not null default auth.uid() references auth.users (id),
  lesson_id uuid not null references public.lessons (id),
  watched_seconds int default 0,
  updated_at timestamptz default now(),
  primary key (user_id, lesson_id)
);

create table public.exam_configs (
  level_id uuid primary key references public.levels (id),
  question_count int default 20,
  exercise_minutes int,
  exam_minutes int
);

create table public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels (id),
  type text check (type in ('multiple_choice', 'code')),
  topic text,
  prompt jsonb
);

create table public.exam_answers (
  question_id uuid primary key references public.exam_questions (id),
  answer jsonb
);

create table public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id),
  level_id uuid not null references public.levels (id),
  question_ids uuid[],
  started_at timestamptz default now(),
  submitted_at timestamptz null,
  correct int,
  total int,
  percent int,
  passed boolean,
  wrong_topics text[]
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  user_id uuid not null references auth.users (id),
  level_id uuid not null references public.levels (id),
  full_name text,
  workload_hours int,
  score int,
  status text check (status in ('active', 'locked', 'revoked')),
  issued_at timestamptz default now(),
  unique (user_id, level_id)
);

-- ---------------------------------------------------------------- indexes
-- At most one open exam attempt per user and level.
create unique index exam_attempts_one_open_idx
  on public.exam_attempts (user_id, level_id) where submitted_at is null;
create index exercise_attempts_user_idx on public.exercise_attempts (user_id);
create index exercise_attempts_exercise_idx on public.exercise_attempts (exercise_id);
create index lessons_level_idx on public.lessons (level_id);
create index exercises_lesson_idx on public.exercises (lesson_id);
create index lesson_progress_lesson_idx on public.lesson_progress (lesson_id);
create index exam_questions_level_idx on public.exam_questions (level_id);
create index exam_attempts_user_idx on public.exam_attempts (user_id);
create index certificates_user_idx on public.certificates (user_id);
create index certificates_level_idx on public.certificates (level_id);

-- ---------------------------------------------------------------- RLS on everything
alter table public.profiles enable row level security;
alter table public.levels enable row level security;
alter table public.lessons enable row level security;
alter table public.exercises enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.exam_configs enable row level security;
alter table public.exam_questions enable row level security;
alter table public.exam_answers enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.certificates enable row level security;

-- Exam material: no policies at all, and no privileges. Service role only.
revoke all on public.exam_questions, public.exam_answers from anon, authenticated;

-- Defense in depth: strip default Supabase grants, then grant only what the policies use.
revoke all on public.profiles, public.levels, public.lessons, public.exercises,
  public.exercise_attempts, public.lesson_progress, public.exam_configs,
  public.exam_attempts, public.certificates from anon, authenticated;
revoke all on sequence public.exercise_attempts_id_seq from anon, authenticated;

grant select on public.levels to anon, authenticated;
grant select on public.profiles, public.lessons, public.exercises, public.exam_configs,
  public.exam_attempts, public.certificates to authenticated;
grant select, insert on public.exercise_attempts to authenticated;
grant select, insert, update on public.lesson_progress to authenticated;
grant usage on sequence public.exercise_attempts_id_seq to authenticated;

-- ---------------------------------------------------------------- policies
-- profiles: read own row only. NO update policy: name changes go through update_my_name().
create policy profiles_select_own on public.profiles
  for select to authenticated using (id = auth.uid());

create policy levels_select_public on public.levels
  for select to anon, authenticated using (true);

create policy lessons_select_auth on public.lessons
  for select to authenticated using (true);
create policy exercises_select_auth on public.exercises
  for select to authenticated using (true);
create policy exam_configs_select_auth on public.exam_configs
  for select to authenticated using (true);

create policy exercise_attempts_select_own on public.exercise_attempts
  for select to authenticated using (user_id = auth.uid());
create policy exercise_attempts_insert_own on public.exercise_attempts
  for insert to authenticated with check (user_id = auth.uid());

create policy lesson_progress_select_own on public.lesson_progress
  for select to authenticated using (user_id = auth.uid());
create policy lesson_progress_insert_own on public.lesson_progress
  for insert to authenticated with check (user_id = auth.uid());
create policy lesson_progress_update_own on public.lesson_progress
  for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- exam_attempts / certificates: read own only; writes by service role (Edge Functions).
create policy exam_attempts_select_own on public.exam_attempts
  for select to authenticated using (user_id = auth.uid());
create policy certificates_select_own on public.certificates
  for select to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------- functions
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.update_my_name(new_name text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := trim(coalesce(new_name, ''));
begin
  if auth.uid() is null then
    raise exception 'Não autenticado.';
  end if;
  if char_length(v_name) < 3 then
    raise exception 'O nome deve ter pelo menos 3 caracteres.';
  end if;
  update public.profiles set full_name = v_name where id = auth.uid();
end;
$$;

create or replace function public.verify_certificate(p_code text)
returns table (
  full_name text,
  level_name text,
  workload_hours int,
  score int,
  issued_at timestamptz,
  status text
)
language sql
stable
security definer
set search_path = public
as $$
  select c.full_name, l.name, c.workload_hours, c.score, c.issued_at, c.status
  from public.certificates c
  join public.levels l on l.id = c.level_id
  where c.code = p_code;
$$;

-- Lock down execute: revoke from public first, then grant explicitly.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.update_my_name(text) from public, anon, authenticated;
revoke execute on function public.verify_certificate(text) from public, anon, authenticated;
grant execute on function public.update_my_name(text) to authenticated;
grant execute on function public.verify_certificate(text) to anon, authenticated;

-- ---------------------------------------------------------------- seed
insert into public.levels (position, slug, name) values
  (1, 'primeiro-commit', 'Primeiro Commit'),
  (2, 'nivel-2', 'Nível 2'),
  (3, 'nivel-3', 'Nível 3'),
  (4, 'nivel-4', 'Nível 4'),
  (5, 'nivel-5', 'Nível 5')
on conflict do nothing;
