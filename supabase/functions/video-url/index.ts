// @ts-nocheck -- JavaScript simples em arquivo .ts (padrão do projeto para Edge Functions).
import { createClient } from '@supabase/supabase-js'
import { AwsClient } from 'aws4fetch'
import { HttpError, json, withAuth } from '../_shared/http.js'
import { createRepo } from '../_shared/repo/supabase-repo.js'
import { getLessonVideoUrl } from '../_shared/services/video-service.js'

const env = (name) => Deno.env.get(name)

const authClient = createClient(env('SUPABASE_URL'), env('SUPABASE_ANON_KEY'))
const repo = createRepo(createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY')))

const r2 = new AwsClient({
  accessKeyId: env('R2_ACCESS_KEY_ID'),
  secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
  region: 'auto',
  service: 's3',
})

async function presign(key, expiresSeconds) {
  const url = new URL(
    `https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com/${env('R2_BUCKET')}/${key}`,
  )
  url.searchParams.set('X-Amz-Expires', String(expiresSeconds))
  const signed = await r2.sign(new Request(url, { method: 'GET' }), { aws: { signQuery: true } })
  return signed.url
}

Deno.serve(
  withAuth(async ({ req, userId }) => {
    const body = await req.json().catch(() => null)
    const lessonId = body?.lessonId
    if (typeof lessonId !== 'string' || !lessonId) throw new HttpError(400, 'Aula inválida.')
    const out = await getLessonVideoUrl({ userId, lessonId, repo, presign, now: new Date() })
    return json(out)
  }, authClient),
)
