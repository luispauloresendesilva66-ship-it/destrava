import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

vi.mock('../../lib/supabase', () => ({ supabase: {} }))

import HomePage from './HomePage.jsx'
import { SessionContext } from '../auth/sessionContext.js'

function setup(value) {
  render(
    <SessionContext.Provider value={value}>
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/painel" element={<p>painel</p>} />
        </Routes>
      </MemoryRouter>
    </SessionContext.Provider>,
  )
}

describe('HomePage', () => {
  it('visitante vê o slogan e links para entrar e criar conta', () => {
    setup({ session: null, profile: null, loading: false })
    expect(screen.getByRole('heading', { name: 'Destrava sua carreira. Um nível de cada vez.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Entrar' })).toHaveAttribute('href', '/entrar')
    expect(screen.getByRole('link', { name: 'Criar conta' })).toHaveAttribute('href', '/cadastro')
  })

  it('com sessão redireciona para /painel', () => {
    setup({ session: { user: { id: 'u1' } }, profile: null, loading: false })
    expect(screen.getByText('painel')).toBeInTheDocument()
  })

  it('não decide nada enquanto carrega', () => {
    setup({ session: null, profile: null, loading: true })
    expect(screen.queryByRole('link', { name: 'Entrar' })).not.toBeInTheDocument()
  })
})
