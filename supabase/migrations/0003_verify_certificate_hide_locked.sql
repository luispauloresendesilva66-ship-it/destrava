-- Certificados bloqueados (plano free) não são públicos: a verificação os trata como inexistentes.
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
  where c.code = p_code
    and c.status <> 'locked';
$$;

revoke execute on function public.verify_certificate(text) from public, anon, authenticated;
grant execute on function public.verify_certificate(text) to anon, authenticated, service_role;
