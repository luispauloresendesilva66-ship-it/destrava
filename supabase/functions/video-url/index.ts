// @ts-nocheck -- JavaScript simples em arquivo .ts (padrão do projeto para Edge Functions).
import { createClient } from '@supabase/supabase-js'
import { HttpError, json, withAuth } from '../_shared/http.js'
import { createRepo } from '../_shared/repo/supabase-repo.js'
import { selectPresign } from '../_shared/storage.js'
import { getLessonVideoUrl } from '../_shared/services/video-service.js'

const env = (name) => Deno.env.get(name)
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const authClient = createClient(env('SUPABASE_URL'), env('SUPABASE_ANON_KEY'))
const serviceClient = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'))
const repo = createRepo(serviceClient)
const presign = selectPresign(
  Object.fromEntries(
    ['B2_KEY_ID', 'B2_APPLICATION_KEY', 'B2_BUCKET', 'B2_ENDPOINT', 'B2_REGION'].map((n) => [
      n,
      env(n),
    ]),
  ),
  serviceClient,
)

Deno.serve(
  withAuth(async ({ req, userId }) => {
    const body = await req.json().catch(() => null)
    const lessonId = body?.lessonId
    if (typeof lessonId !== 'string' || !UUID.test(lessonId)) {
      throw new HttpError(400, 'Aula inválida.')
    }
    const out = await getLessonVideoUrl({ userId, lessonId, repo, presign, now: new Date() })
    return json(out)
  }, authClient),
)
