import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

vi.mock('../../lib/supabase', () => ({ supabase: {} }))

import RequireAuth from './RequireAuth.jsx'
import { SessionContext } from './sessionContext.js'

function setup(value) {
  render(
    <SessionContext.Provider value={value}>
      <MemoryRouter
        initialEntries={['/painel']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/entrar" element={<p>página de login</p>} />
          <Route
            path="/painel"
            element={
              <RequireAuth>
                <p>conteúdo protegido</p>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    </SessionContext.Provider>,
  )
}

describe('RequireAuth', () => {
  it('mostra carregando e não renderiza o conteúdo enquanto carrega', () => {
    setup({ session: null, profile: null, loading: true })
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
    expect(screen.queryByText('conteúdo protegido')).not.toBeInTheDocument()
    expect(screen.queryByText('página de login')).not.toBeInTheDocument()
  })

  it('redireciona para /entrar sem sessão', () => {
    setup({ session: null, profile: null, loading: false })
    expect(screen.getByText('página de login')).toBeInTheDocument()
  })

  it('renderiza o conteúdo com sessão', () => {
    setup({ session: { user: { id: 'u1' } }, profile: null, loading: false })
    expect(screen.getByText('conteúdo protegido')).toBeInTheDocument()
  })

  it('mostra erro com "Tentar de novo" quando o perfil falha', () => {
    const retryProfile = vi.fn()
    setup({ session: { user: { id: 'u1' } }, profile: null, loading: false, profileError: true, retryProfile })
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível carregar seu perfil.')
    expect(screen.queryByText('conteúdo protegido')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    expect(retryProfile).toHaveBeenCalledTimes(1)
  })
})
