import { supabase } from './supabase'

export const VIDEO_ERROR = 'Não foi possível carregar o vídeo. Tente de novo.'

function apiError(message, status) {
  return Object.assign(new Error(message), { status })
}

// Chama a Edge Function video-url. Em erro lança Error com .message em pt-BR e .status (HTTP, se houver).
export async function getVideoUrl(lessonId) {
  let result
  try {
    result = await supabase.functions.invoke('video-url', { body: { lessonId } })
  } catch {
    throw apiError(VIDEO_ERROR)
  }
  const { data, error } = result
  if (error) {
    const response = error.context
    if (response && typeof response.json === 'function') {
      const body = await response.json().catch(() => null)
      throw apiError(body?.error || VIDEO_ERROR, response.status)
    }
    throw apiError(VIDEO_ERROR)
  }
  if (!data?.url) throw apiError(VIDEO_ERROR)
  return data
}

export const EXAM_ERROR = 'Não foi possível falar com o servidor. Tente de novo.'

// Chama uma Edge Function de prova. Em erro lança Error com .message em pt-BR, .status, .code e .retryAt.
async function invokeExam(name, body) {
  let result
  try {
    result = await supabase.functions.invoke(name, { body })
  } catch {
    throw apiError(EXAM_ERROR)
  }
  const { data, error } = result
  if (error) {
    const response = error.context
    if (response && typeof response.json === 'function') {
      const payload = await response.json().catch(() => null)
      throw Object.assign(apiError(payload?.error || EXAM_ERROR, response.status), {
        code: payload?.code,
        retryAt: payload?.retryAt,
      })
    }
    throw apiError(EXAM_ERROR)
  }
  if (!data) throw apiError(EXAM_ERROR)
  return data
}

export const startExam = (levelId) => invokeExam('exam-start', { levelId })
export const submitExam = (attemptId, answers) => invokeExam('exam-submit', { attemptId, answers })
