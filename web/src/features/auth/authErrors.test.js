import { describe, it, expect } from 'vitest'
import { translateAuthError } from './authErrors.js'

describe('translateAuthError', () => {
  it.each([
    [{ message: 'Invalid login credentials' }, 'E-mail ou senha incorretos.'],
    [{ message: 'Email not confirmed' }, 'Confirme seu e-mail antes de entrar.'],
    [{ message: 'User already registered' }, 'Este e-mail já tem cadastro.'],
    [
      { message: 'Email rate limit exceeded' },
      'Muitas tentativas. Aguarde um pouco e tente de novo.',
    ],
    [
      { message: 'x', status: 429 },
      'Muitas tentativas. Aguarde um pouco e tente de novo.',
    ],
    [
      { message: 'For security purposes, you can only request this after 20 seconds.', code: 'over_email_send_rate_limit' },
      'Muitas tentativas. Aguarde um pouco e tente de novo.',
    ],
    [{ message: 'Something weird' }, 'Algo deu errado. Tente de novo.'],
    [null, 'Algo deu errado. Tente de novo.'],
    [undefined, 'Algo deu errado. Tente de novo.'],
  ])('%j -> %s', (error, expected) => {
    expect(translateAuthError(error)).toBe(expected)
  })
})
