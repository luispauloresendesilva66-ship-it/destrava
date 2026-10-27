import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

vi.mock('../../lib/supabase', () => ({ supabase: {} }))
vi.mock('./useCourse.js', () => ({ useCourse: vi.fn() }))

import LevelMapPage from './LevelMapPage.jsx'
import { useCourse } from './useCourse.js'

const step = (position, unlocked, passed = false) => ({
  level: { id: `L${position}`, position, name: `Nível ${position}` },
  unlocked,
  passed,
  examAvailable: unlocked,
  lessons: [
    {
      lesson: { id: `x${position}`, title: `Aula ${position}` },
      done: false,
      watchable: unlocked,
    },
  ],
})

function setup(plan) {
  useCourse.mockReturnValue({
    plan,
    loading: false,
    error: null,
    refresh: vi.fn(),
    state: [step(1, true, true), step(2, plan !== 'free'), step(3, false)],
  })
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LevelMapPage />
    </MemoryRouter>,
  )
}

describe('LevelMapPage', () => {
  it('free: clicar num nível trancado mostra o aviso do plano Gold', () => {
    setup('free')
    expect(screen.queryByText('Disponível no plano Gold')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Degrau 2.*bloqueado/ }))
    expect(screen.getByText('Disponível no plano Gold')).toBeInTheDocument()
  })

  it('aula liberada vira link para /aula/:id e nível aprovado é identificado', () => {
    setup('gold')
    expect(screen.getByRole('link', { name: 'Aula 1' })).toHaveAttribute('href', '/aula/x1')
    expect(screen.getByRole('button', { name: /Degrau 1.*aprovado/ })).toBeInTheDocument()
  })

  it('limpa o aviso ao clicar em outro nível', () => {
    setup('free')
    fireEvent.click(screen.getByRole('button', { name: /Degrau 2.*bloqueado/ }))
    expect(screen.getByText('Disponível no plano Gold')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Degrau 1/ }))
    expect(screen.queryByText('Disponível no plano Gold')).not.toBeInTheDocument()
  })

  it('erro de carregamento mostra a mensagem e o botão chama refresh', () => {
    const refresh = vi.fn()
    useCourse.mockReturnValue({
      plan: 'gold',
      loading: false,
      state: null,
      refresh,
      error: 'Não foi possível carregar o curso. Tente de novo.',
    })
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LevelMapPage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível carregar o curso. Tente de novo.',
    )
    fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    expect(refresh).toHaveBeenCalledTimes(1)
  })
})
