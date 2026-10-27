-- Manual RLS verification for Destrava. Run in the Supabase SQL editor AFTER applying 0001_core.sql.
-- Replace <uuid de teste> with the id of a real test user (Authentication > Users).
-- Run each block separately. "reset role" at the end of each one.

-- ===== Block A: as a logged-in student =====
set role authenticated;
set request.jwt.claims = '{"sub":"<uuid de teste>","role":"authenticated"}';

-- Expect: permission denied (privileges revoked) or 0 rows. Never any rows.
select * from exam_answers;
select * from exam_questions;

-- Expect: permission denied (no UPDATE grant / no policy). Never a successful change.
update profiles set plan = 'platinum' where id = auth.uid();
update profiles set role = 'admin' where id = auth.uid();

-- Expect: the only way to rename. Fails with 'O nome deve ter pelo menos 3 caracteres.'
select update_my_name('ab');
-- Expect: succeeds, trims whitespace.
select update_my_name('  Maria Silva  ');

-- Expect: 0 rows / permission denied (no insert grant or policy).
insert into certificates (code, user_id, level_id, status)
  select 'DTV-FAKE-0001', auth.uid(), id, 'active' from levels limit 1;

-- Expect: error (WITH CHECK / user_id mismatch).
insert into exercise_attempts (user_id, exercise_id, correct)
  values ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), true);

reset role;

-- ===== Block B: as anon =====
set role anon;
-- Expect: 5 levels.
select slug, name from levels;
-- Expect: permission denied.
select * from profiles;
-- Expect: 0 rows, no error.
select * from verify_certificate('DTV-XXXX-XXXX');
reset role;

-- ===== Block C: as postgres (sanity) =====
-- Expect: every table has RLS on (relrowsecurity = true).
select relname, relrowsecurity from pg_class
  where relnamespace = 'public'::regnamespace and relkind = 'r' order by relname;
-- Expect: no rows for exam_questions / exam_answers; no UPDATE policy on profiles.
select tablename, policyname, cmd from pg_policies
  where schemaname = 'public' order by tablename, policyname;
