import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const rpc = vi.hoisted(() => vi.fn())
vi.mock('../../lib/supabase', () => ({ supabase: { rpc } }))

import VerifyCertificatePage from './VerifyCertificatePage.jsx'

const row = {
  full_name: 'Ana Souza',
  level_name: 'Primeiro Commit',
  workload_hours: 10,
  score: 94,
  issued_at: '2026-10-27T15:00:00Z',
}

function renderPage() {
  return render(
    <MemoryRouter
      initialEntries={['/certificado/DTV-AAAA-BBBB']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/certificado/:code" element={<VerifyCertificatePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('VerifyCertificatePage', () => {
  beforeEach(() => rpc.mockReset())

  it('ativo: mostra os dados', async () => {
    rpc.mockResolvedValue({ data: [{ ...row, status: 'active' }], error: null })
    renderPage()
    expect(await screen.findByText('Certificado válido')).toBeInTheDocument()
    expect(rpc).toHaveBeenCalledWith('verify_certificate', { p_code: 'DTV-AAAA-BBBB' })
    expect(screen.getByText('Ana Souza')).toBeInTheDocument()
    expect(screen.getByText('Primeiro Commit')).toBeInTheDocument()
    expect(screen.getByText('10 horas')).toBeInTheDocument()
    expect(screen.getByText('94%')).toBeInTheDocument()
    expect(screen.getByText('27/10/2026')).toBeInTheDocument()
  })

  it('revogado: só o aviso, sem dados', async () => {
    rpc.mockResolvedValue({ data: [{ ...row, status: 'revoked' }], error: null })
    renderPage()
    expect(await screen.findByText('Este certificado foi revogado.')).toBeInTheDocument()
    expect(screen.queryByText('Ana Souza')).not.toBeInTheDocument()
  })

  it('bloqueado: não revela nada', async () => {
    rpc.mockResolvedValue({ data: [{ ...row, status: 'locked' }], error: null })
    renderPage()
    expect(await screen.findByText('Certificado não encontrado.')).toBeInTheDocument()
    expect(screen.queryByText('Ana Souza')).not.toBeInTheDocument()
  })

  it('inexistente: não encontrado', async () => {
    rpc.mockResolvedValue({ data: [], error: null })
    renderPage()
    expect(await screen.findByText('Certificado não encontrado.')).toBeInTheDocument()
  })
})
