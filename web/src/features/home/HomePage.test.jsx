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

  it('visitante vê os recursos e os três planos, sem botão de compra', () => {
    setup({ session: null, profile: null, loading: false })
    for (const title of [
      'Videoaulas curtas',
      'Exercícios interativos com vidas',
      'Prova de nível com nota mínima de 90%',
      'Certificado com QR Code verificável',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    }
    expect(screen.getByText('R$ 0')).toBeInTheDocument()
    expect(screen.getByText('R$ 39,99')).toBeInTheDocument()
    expect(screen.getByText('R$ 49,99')).toBeInTheDocument()
    expect(screen.getByText('Recomendado')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('a ilustração do editor é decorativa', () => {
    setup({ session: null, profile: null, loading: false })
    expect(screen.getByText('Certificado válido').closest('[aria-hidden="true"]')).not.toBeNull()
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
