import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }) }) }),
      upsert: async () => ({}),
    }),
  },
}))
vi.mock('../../lib/api.js', () => ({
  getVideoUrl: vi.fn(),
  VIDEO_ERROR: 'Não foi possível carregar o vídeo. Tente de novo.',
}))
const course = vi.hoisted(() => ({ state: null, plan: 'gold' }))
vi.mock('../levels/useCourse.js', () => ({ useCourse: () => ({ state: course.state, plan: course.plan, refresh: () => {} }) }))
vi.mock('../exercises/ExerciseRunner.jsx', () => ({ default: () => <div data-testid="runner" /> }))

import LessonPage from './LessonPage.jsx'
import { getVideoUrl } from '../../lib/api.js'

function renderPage() {
  return render(
    <MemoryRouter
      initialEntries={['/aula/l1']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/aula/:lessonId" element={<LessonPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LessonPage', () => {
  it('403 mostra a mensagem e o link para /niveis', async () => {
    getVideoUrl.mockRejectedValue(
      Object.assign(new Error('Você não tem acesso a esta aula.'), { status: 403 }),
    )
    renderPage()
    expect(await screen.findByRole('alert')).toHaveTextContent('Você não tem acesso a esta aula.')
    expect(screen.getByRole('link', { name: 'Voltar aos níveis' })).toHaveAttribute(
      'href',
      '/niveis',
    )
  })

  it('falha genérica mostra a mensagem e o botão tenta de novo', async () => {
    getVideoUrl.mockRejectedValueOnce(
      new Error('Não foi possível carregar o vídeo. Tente de novo.'),
    )
    renderPage()
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível carregar o vídeo. Tente de novo.',
    )
    getVideoUrl.mockResolvedValue({ url: 'https://r2.test/v.mp4', captionsUrl: null })
    fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    await waitFor(() =>
      expect(screen.getByRole('group', { name: 'Velocidade' })).toBeInTheDocument(),
    )
    expect(screen.getByRole('button', { name: '1.25x' })).toBeInTheDocument()
  })

  it('exercícios só aparecem quando a aula é liberada (mesma trava do vídeo)', async () => {
    getVideoUrl.mockResolvedValue({ url: 'https://r2.test/v.mp4', captionsUrl: null })
    const step = (watchable) => [
      { level: { name: 'N1' }, lessons: [{ lesson: { id: 'l1', title: 'A' }, watchable }] },
    ]
    course.state = step(false)
    const first = renderPage()
    await waitFor(() => expect(screen.getByRole('group', { name: 'Velocidade' })).toBeInTheDocument())
    expect(screen.queryByTestId('runner')).toBeNull()
    first.unmount()
    course.state = step(true)
    renderPage()
    expect(await screen.findByTestId('runner')).toBeInTheDocument()
    course.state = null
  })

  it('aula de amostra no plano free é só para assistir (sem exercícios)', async () => {
    getVideoUrl.mockResolvedValue({ url: 'https://r2.test/v.mp4', captionsUrl: null })
    course.state = [
      { level: { name: 'N1' }, lessons: [{ lesson: { id: 'l1', title: 'A', is_sample: true }, watchable: true }] },
    ]
    course.plan = 'free'
    const first = renderPage()
    await waitFor(() => expect(screen.getByRole('group', { name: 'Velocidade' })).toBeInTheDocument())
    expect(screen.queryByTestId('runner')).toBeNull()
    first.unmount()
    course.plan = 'gold'
    renderPage()
    expect(await screen.findByTestId('runner')).toBeInTheDocument()
    course.state = null
  })
})
