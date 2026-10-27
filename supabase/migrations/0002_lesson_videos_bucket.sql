-- Bucket privado dos vídeos e legendas das aulas (substitui o Cloudflare R2).
--
-- Propositalmente SEM policies em storage.objects: com RLS ativo e nenhuma policy, anon e
-- authenticated não leem, listam nem assinam nada. Só o service_role (que ignora RLS) acessa,
-- e é a Edge Function video-url que gera a URL assinada de 3 h depois de checar o plano.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lesson-videos', 'lesson-videos', false, 52428800, array['video/mp4', 'text/vtt'])
on conflict do nothing;
