import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const rows = vi.hoisted(() => ({ data: [] }))
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: () => {
      const q = { select: () => q, eq: () => Promise.resolve({ data: rows.data, error: null }) }
      return q
    },
  },
}))
vi.mock('../auth/useSession.js', () => ({
  useSession: () => ({ session: { user: { id: 'u1' } }, profile: {}, loading: false }),
}))
const download = vi.hoisted(() => vi.fn())
vi.mock('./certificatePdf.js', () => ({
  downloadCertificatePdf: download,
  formatIssuedDate: () => '27/10/2026',
}))

import CertificatesPage from './CertificatesPage.jsx'

const cert = (status, code) => ({
  code,
  full_name: 'Ana',
  workload_hours: 10,
  score: 94,
  status,
  issued_at: '2026-10-27T15:00:00Z',
  levels: { name: 'Primeiro Commit', position: 1 },
})

describe('CertificatesPage', () => {
  it('ativo mostra Baixar PDF e baixa', async () => {
    rows.data = [cert('active', 'DTV-AAAA-BBBB')]
    render(<CertificatesPage />)
    fireEvent.click(await screen.findByRole('button', { name: 'Baixar PDF' }))
    await waitFor(() =>
      expect(download).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'DTV-AAAA-BBBB', fullName: 'Ana', levelName: 'Primeiro Commit' }),
      ),
    )
  })

  it('bloqueado mostra a mensagem e não o botão', async () => {
    rows.data = [cert('locked', 'DTV-CCCC-DDDD')]
    render(<CertificatesPage />)
    expect(
      await screen.findByText('Certificado conquistado! Destrave por R$ 39 ou assine o Gold.'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Baixar PDF' })).not.toBeInTheDocument()
  })
})
