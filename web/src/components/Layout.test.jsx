import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../lib/supabase', () => ({ supabase: {} }))

import Layout from './Layout.jsx'
import { SessionContext } from '../features/auth/sessionContext.js'

function setup(session) {
  render(
    <SessionContext.Provider value={{ session, profile: null, loading: false }}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout>
          <p>conteúdo</p>
        </Layout>
      </MemoryRouter>
    </SessionContext.Provider>,
  )
}

describe('Layout', () => {
  it('logado mostra Painel, Níveis e Certificados', () => {
    setup({ user: { id: 'u1' } })
    const menu = screen.getByRole('navigation', { name: 'Menu principal' })
    expect(menu).toHaveTextContent('PainelNíveisCertificados')
    expect(screen.getByRole('link', { name: 'Painel' })).toHaveAttribute('href', '/painel')
    expect(screen.getByRole('link', { name: 'Níveis' })).toHaveAttribute('href', '/niveis')
    expect(screen.getByRole('link', { name: 'Certificados' })).toHaveAttribute('href', '/certificados')
  })

  it('visitante só vê Início', () => {
    setup(null)
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('link', { name: 'Painel' })).not.toBeInTheDocument()
  })
})
