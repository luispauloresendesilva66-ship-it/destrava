import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const query = vi.hoisted(() => ({ data: [] }))
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: () => {
      const q = {
        select: () => q,
        in: () => q,
        eq: () => Promise.resolve({ data: query.data, error: null }),
      }
      return q
    },
  },
}))

import ExamResultPage from './ExamResultPage.jsx'

function renderResult(result) {
  return render(
    <MemoryRouter
      initialEntries={[{ pathname: '/prova/L1/resultado', state: result ? { result } : null }]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/prova/:levelId/resultado" element={<ExamResultPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ExamResultPage', () => {
  it('aprovado: nota em verde e link para o certificado', () => {
    renderResult({
      percent: 100,
      passed: true,
      wrongTopics: [],
      nextAttemptAt: null,
      certificate: { code: 'DTV-ABCD-EFGH', status: 'active' },
    })
    const score = screen.getByText('100%')
    expect(score).toHaveClass('exam__score--passed')
    expect(screen.getByRole('link', { name: 'Ver meu certificado' })).toHaveAttribute(
      'href',
      '/certificados',
    )
  })

  it('aprovado no plano free avisa que o certificado está bloqueado', () => {
    renderResult({
      percent: 95,
      passed: true,
      wrongTopics: [],
      nextAttemptAt: null,
      certificate: { code: 'DTV-ABCD-EFGH', status: 'locked' },
    })
    expect(screen.getByText('Certificado conquistado! Destrave por R$ 39 ou assine o Gold.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver meu certificado' })).toHaveAttribute('href', '/certificados')
  })

  it('reprovado: nota, assuntos com link para as aulas e horário exato', async () => {
    query.data = [{ topic: 'css', lessons: { id: 'les9', title: 'Cores', level_id: 'L1' } }]
    renderResult({
      percent: 75,
      passed: false,
      wrongTopics: ['css'],
      nextAttemptAt: '2026-10-27T15:00:00.000Z',
      certificate: null,
    })
    const score = screen.getByText('75%')
    expect(score).not.toHaveClass('exam__score--passed')
    expect(screen.getByText('Assuntos para revisar')).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Cores' })).toHaveAttribute('href', '/aula/les9')
    expect(screen.getByText('Você poderá tentar de novo às 12:00 de 27/10.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Ver meu certificado' })).not.toBeInTheDocument()
  })

  it('reprovado sem espera (platinum) diz que já pode tentar', () => {
    query.data = []
    renderResult({ percent: 50, passed: false, wrongTopics: [], nextAttemptAt: null, certificate: null })
    expect(screen.getByText('Você já pode tentar de novo.')).toBeInTheDocument()
  })

  it('sem resultado (página recarregada) mostra aviso e link de volta', () => {
    renderResult(null)
    expect(screen.getByText('Não encontramos o resultado desta prova.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar ao mapa de níveis' })).toHaveAttribute('href', '/niveis')
  })
})
