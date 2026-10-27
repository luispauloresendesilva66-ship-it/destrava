import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../lib/supabase', () => ({
  supabase: { auth: { updateUser: vi.fn() } },
}))

import { supabase } from '../../lib/supabase'
import NewPasswordPage from './NewPasswordPage.jsx'
import { SessionContext } from './sessionContext.js'

function setup(value) {
  render(
    <SessionContext.Provider value={value}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <NewPasswordPage />
      </MemoryRouter>
    </SessionContext.Provider>,
  )
}

describe('NewPasswordPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('sem sessão mostra link inválido e oferece novo link', () => {
    setup({ session: null, profile: null, loading: false })
    expect(screen.getByText('Link inválido ou expirado.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pedir um novo link' })).toHaveAttribute(
      'href',
      '/esqueci-senha',
    )
    expect(screen.queryByLabelText('Nova senha')).not.toBeInTheDocument()
  })

  it('enquanto carrega não mostra o formulário nem o erro', () => {
    setup({ session: null, profile: null, loading: true })
    expect(screen.queryByLabelText('Nova senha')).not.toBeInTheDocument()
    expect(screen.queryByText('Link inválido ou expirado.')).not.toBeInTheDocument()
  })

  it('com sessão valida o mínimo de 8 caracteres e chama updateUser', async () => {
    supabase.auth.updateUser.mockResolvedValue({ data: {}, error: null })
    setup({ session: { user: { id: 'u1' } }, profile: null, loading: false })
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: '1234567' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar nova senha' }))
    expect(
      await screen.findByText('A senha precisa ter pelo menos 8 caracteres.'),
    ).toBeInTheDocument()
    expect(supabase.auth.updateUser).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: '12345678' } })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar nova senha' }))
    await waitFor(() =>
      expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: '12345678' }),
    )
  })
})
