import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
  },
}))

import { supabase } from '../../lib/supabase'
import SignupPage from './SignupPage.jsx'

function fill({ password = 'senha1234', accept = true } = {}) {
  fireEvent.change(screen.getByLabelText('Nome completo'), {
    target: { value: 'Maria Silva' },
  })
  fireEvent.change(screen.getByLabelText('E-mail'), {
    target: { value: 'maria@exemplo.com' },
  })
  fireEvent.change(screen.getByLabelText('Senha'), {
    target: { value: password },
  })
  if (accept) {
    fireEvent.click(screen.getByLabelText(/Li e aceito os termos de uso/))
  }
  fireEvent.click(screen.getByRole('button', { name: 'Criar conta' }))
}

describe('SignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    supabase.auth.signUp.mockResolvedValue({ data: {}, error: null })
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SignupPage />
      </MemoryRouter>,
    )
  })

  it('rejeita senha com 7 caracteres e não chama signUp', async () => {
    fill({ password: '1234567' })
    expect(
      await screen.findByText('A senha precisa ter pelo menos 8 caracteres.'),
    ).toBeInTheDocument()
    expect(supabase.auth.signUp).not.toHaveBeenCalled()
  })

  it('exige o aceite dos termos', async () => {
    fill({ accept: false })
    expect(
      await screen.findByText('Você precisa aceitar os termos de uso.'),
    ).toBeInTheDocument()
    expect(supabase.auth.signUp).not.toHaveBeenCalled()
  })

  it('envia cadastro válido e mostra a mensagem de confirmação', async () => {
    fill()
    expect(
      await screen.findByText(
        'Enviamos um link de confirmação para o seu e-mail.',
      ),
    ).toBeInTheDocument()
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'maria@exemplo.com',
      password: 'senha1234',
      options: { data: { full_name: 'Maria Silva' } },
    })
  })

  it('traduz erro do Supabase para pt-BR', async () => {
    supabase.auth.signUp.mockResolvedValue({
      data: null,
      error: { message: 'User already registered' },
    })
    fill()
    await waitFor(() =>
      expect(screen.getByText('Este e-mail já tem cadastro.')).toBeInTheDocument(),
    )
  })
})
