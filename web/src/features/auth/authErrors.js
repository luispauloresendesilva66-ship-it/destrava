const GENERIC = 'Algo deu errado. Tente de novo.'
const RATE_LIMIT = 'Muitas tentativas. Aguarde um pouco e tente de novo.'
export const INVALID_LINK = 'Link inválido ou expirado.'
const OFFLINE = 'Sem conexão. Verifique sua internet.'

export const MIN_PASSWORD_LENGTH = 8
export const PASSWORD_TOO_SHORT = 'A senha precisa ter pelo menos 8 caracteres.'

// Traduz erros do Supabase Auth para pt-BR. Nunca devolve texto em inglês.
export function translateAuthError(error) {
  if (!error) return GENERIC
  const message = String(error.message ?? '').toLowerCase()
  const code = String(error.code ?? '').toLowerCase()
  const name = String(error.name ?? '')

  if (name === 'AuthRetryableFetchError' || message.includes('failed to fetch')) {
    return OFFLINE
  }
  if (error.status === 429 || code.includes('rate_limit') || message.includes('rate limit')) {
    return RATE_LIMIT
  }
  if (message.includes('invalid login credentials')) return 'E-mail ou senha incorretos.'
  if (message.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar.'
  if (message.includes('user already registered')) return 'Este e-mail já tem cadastro.'
  if (message.includes('auth session missing') || name === 'AuthSessionMissingError') {
    return INVALID_LINK
  }
  return GENERIC
}
