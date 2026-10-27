-- Verificação manual de RLS do Destrava. Rode no SQL editor do Supabase DEPOIS de aplicar 0001_core.sql.
-- Troque <UUID-DE-TESTE> pelo id de um usuário de teste (Authentication > Users).
-- Rode UM bloco por vez (selecione o bloco inteiro, de "begin;" até "rollback;").
-- Cada bloco termina com rollback, então nada fica gravado.

-- 1) Esperado: ERRO "permission denied for table exam_answers" (ou 0 linhas). Nunca linhas.
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
select * from exam_answers;
rollback;

-- 2) Esperado: ERRO "permission denied for table exam_questions" (ou 0 linhas). Nunca linhas.
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
select * from exam_questions;
rollback;

-- 3) Esperado: ERRO "permission denied for table profiles" (ou 0 linhas afetadas). Plano nunca muda.
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
update profiles set plan = 'platinum' where id = auth.uid();
rollback;

-- 4) Esperado: ERRO "permission denied for table profiles". Papel nunca muda.
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
update profiles set role = 'admin' where id = auth.uid();
rollback;

-- 5) Esperado: ERRO "O nome deve ter pelo menos 3 caracteres."
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
select update_my_name('ab');
rollback;

-- 6) Esperado: sucesso; o select mostra o nome sem espaços nas pontas ("Maria Silva"). Desfeito no rollback.
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
select update_my_name('  Maria Silva  ');
select full_name, plan, role from profiles where id = auth.uid();
rollback;

-- 7) Esperado: ERRO "permission denied for table certificates". Aluno não emite certificado.
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
insert into certificates (code, user_id, level_id, status)
  select 'DTV-FAKE-0001', auth.uid(), id, 'active' from levels limit 1;
rollback;

-- 8) Esperado: ERRO "new row violates row-level security policy" (user_id de outro usuário).
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<UUID-DE-TESTE>","role":"authenticated"}', true);
insert into exercise_attempts (user_id, exercise_id, correct)
  values ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), true);
rollback;

-- 9) Esperado: 0 linhas, sem erro (código inexistente), chamado como visitante anônimo.
begin;
set local role anon;
select * from verify_certificate('DTV-XXXX-XXXX');
rollback;

-- 9b) Esperado (após a migration 0003): 0 linhas para um certificado com status 'locked'
-- (troque o código por um certificado free real); com status 'active' deve voltar 1 linha.
begin;
set local role anon;
select * from verify_certificate('<CODIGO-DE-CERTIFICADO-LOCKED>');
rollback;

-- 10) Esperado: ERRO "permission denied for table profiles" como visitante anônimo.
begin;
set local role anon;
select * from profiles;
rollback;

-- 11) Esperado: 5 linhas (níveis são públicos).
begin;
set local role anon;
select slug, name from levels order by position;
rollback;

-- 12) Como postgres. Esperado: relrowsecurity = true em TODAS as tabelas.
select relname, relrowsecurity from pg_class
  where relnamespace = 'public'::regnamespace and relkind = 'r' order by relname;

-- 13) Como postgres. Esperado: nenhuma policy em exam_questions/exam_answers e nenhuma de UPDATE em profiles.
select tablename, policyname, cmd from pg_policies
  where schemaname = 'public' order by tablename, policyname;
