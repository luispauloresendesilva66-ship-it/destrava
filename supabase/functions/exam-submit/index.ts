// @ts-nocheck -- JavaScript simples em arquivo .ts (padrão do projeto para Edge Functions).
import { createClient } from '@supabase/supabase-js'
import { HttpError, json, withAuth } from '../_shared/http.js'
import { createRepo } from '../_shared/repo/supabase-repo.js'
import { submitExam } from '../_shared/services/exam-service.js'

const env = (name) => Deno.env.get(name)
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const authClient = createClient(env('SUPABASE_URL'), env('SUPABASE_ANON_KEY'))
const serviceClient = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'))
const repo = createRepo(serviceClient)

Deno.serve(
  withAuth(async ({ req, userId }) => {
    const body = await req.json().catch(() => null)
    const { attemptId, answers } = body ?? {}
    if (typeof attemptId !== 'string' || !UUID.test(attemptId)) {
      throw new HttpError(400, 'Prova inválida.')
    }
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      throw new HttpError(400, 'Respostas inválidas.')
    }
    const out = await submitExam({ userId, attemptId, answers, repo, now: new Date() })
    return json(out)
  }, authClient),
)
