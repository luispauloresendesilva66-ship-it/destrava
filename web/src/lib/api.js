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
