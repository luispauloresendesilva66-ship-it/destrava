import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'

const rpc = vi.hoisted(() => vi.fn())
vi.mock('../../lib/supabase', () => ({ supabase: { rpc } }))
vi.mock('../../lib/api.js', () => ({ startExam: vi.fn(), submitExam: vi.fn() }))
vi.mock('../auth/useSession.js', () => ({
  useSession: () => ({ profile: { full_name: 'Ana Souza', plan: 'gold' } }),
}))

import ExamPage from './ExamPage.jsx'
import { startExam, submitExam } from '../../lib/api.js'

const questions = [
  { id: 'q1', type: 'multiple_choice', topic: 'html', prompt: { question: 'Qual tag cria um link?', options: ['<link>', '<a>'] } },
  { id: 'q2', type: 'multiple_choice', topic: 'css', prompt: { question: 'Qual cor é vermelha?', options: ['red', 'blue'] } },
]

function Result() {
  return <div data-testid="result">{JSON.stringify(useLocation().state)}</div>
}

function renderPage() {
  return render(
    <MemoryRouter
      initialEntries={['/prova/L1']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/prova/:levelId" element={<ExamPage />} />
        <Route path="/prova/:levelId/resultado" element={<Result />} />
      </Routes>
    </MemoryRouter>,
  )
}

async function begin() {
  fireEvent.click(screen.getByRole('button', { name: 'Começar prova' }))
  await screen.findByText(/Pergunta 1 de 2/)
}

beforeEach(() => {
  vi.clearAllMocks()
  rpc.mockResolvedValue({ error: null })
  startExam.mockResolvedValue({ attemptId: 'a1', questions })
})

describe('ExamPage', () => {
  it('pede para confirmar o nome com o aviso e salva antes de iniciar', async () => {
    renderPage()
    expect(screen.getByText('Este nome vai no seu certificado e não poderá ser alterado depois.')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Nome completo'), { target: { value: 'Ana Maria Souza' } })
    expect(startExam).not.toHaveBeenCalled()
    await begin()
    expect(rpc).toHaveBeenCalledWith('update_my_name', { new_name: 'Ana Maria Souza' })
    expect(startExam).toHaveBeenCalledWith('L1')
  })

  it('mostra uma pergunta por vez com barra de progresso', async () => {
    renderPage()
    await begin()
    expect(screen.getByText('Qual tag cria um link?')).toBeInTheDocument()
    expect(screen.queryByText('Qual cor é vermelha?')).not.toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1')
    const next = screen.getByRole('button', { name: 'Próxima' })
    expect(next).toBeDisabled()
    fireEvent.click(screen.getByLabelText('<a>'))
    fireEvent.click(next)
    expect(screen.getByText('Qual cor é vermelha?')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2')
  })

  it('desativa "Enviar prova" enquanto envia e vai para o resultado', async () => {
    let resolve
    submitExam.mockReturnValue(new Promise((r) => (resolve = r)))
    renderPage()
    await begin()
    fireEvent.click(screen.getByLabelText('<a>'))
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }))
    fireEvent.click(screen.getByLabelText('red'))
    fireEvent.click(screen.getByRole('button', { name: 'Enviar prova' }))
    const sending = await screen.findByRole('button', { name: 'Enviando...' })
    expect(sending).toBeDisabled()
    fireEvent.click(sending)
    expect(submitExam).toHaveBeenCalledTimes(1)
    expect(submitExam).toHaveBeenCalledWith('a1', { q1: 1, q2: 0 })
    resolve({ percent: 100, passed: true, wrongTopics: [], nextAttemptAt: null, certificate: null })
    expect(await screen.findByTestId('result')).toHaveTextContent('"percent":100')
  })

  it('falha ao enviar mostra o erro e permite reenviar', async () => {
    submitExam.mockRejectedValueOnce(new Error('Não conseguimos corrigir sua prova agora. Tente enviar de novo.'))
    renderPage()
    await begin()
    fireEvent.click(screen.getByLabelText('<a>'))
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }))
    fireEvent.click(screen.getByLabelText('red'))
    fireEvent.click(screen.getByRole('button', { name: 'Enviar prova' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Não conseguimos corrigir sua prova agora')
    await waitFor(() => expect(screen.getByRole('button', { name: 'Enviar prova' })).toBeEnabled())
  })

  it('COOLDOWN mostra o horário exato de volta', async () => {
    startExam.mockRejectedValue(
      Object.assign(new Error('Aguarde.'), { status: 429, code: 'COOLDOWN', retryAt: '2026-10-27T15:00:00.000Z' }),
    )
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Começar prova' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Você poderá tentar de novo às 12:00 de 27/10.')
  })

  it('NAME_REQUIRED mantém o formulário do nome com a mensagem', async () => {
    startExam.mockRejectedValue(
      Object.assign(new Error('Confirme seu nome completo antes de começar a prova.'), { status: 422, code: 'NAME_REQUIRED' }),
    )
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Começar prova' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Confirme seu nome completo antes de começar a prova.')
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
    expect(screen.queryByText('Voltar ao mapa de níveis')).toBeNull()
  })

  it('outros erros de início mostram a mensagem do servidor', async () => {
    startExam.mockRejectedValue(Object.assign(new Error('Você já foi aprovado neste nível.'), { status: 409, code: 'ALREADY_PASSED' }))
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: 'Começar prova' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Você já foi aprovado neste nível.')
  })
})
