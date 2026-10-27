import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const db = vi.hoisted(() => ({
  exercises: [],
  correct: [],
  errorsToday: 0,
  inserts: [],
}))
vi.mock('../../lib/supabase', () => {
  const builder = (table) => {
    const state = { head: false }
    const b = {
      select: (_c, opts) => {
        state.head = !!opts?.head
        return b
      },
      eq: () => b,
      gte: () => b,
      in: () => b,
      order: () => b,
      insert: async (row) => {
        db.inserts.push(row)
        return { error: null }
      },
      then: (res) => {
        if (table === 'exercises') return res({ data: db.exercises, error: null })
        if (state.head) return res({ count: db.errorsToday, error: null })
        return res({ data: db.correct.map((id) => ({ exercise_id: id })), error: null })
      },
    }
    return b
  }
  return { supabase: { from: builder } }
})
const session = vi.hoisted(() => ({ plan: 'free' }))
vi.mock('../auth/useSession.js', () => ({ useSession: () => ({ profile: { plan: session.plan } }) }))

import ExerciseRunner from './ExerciseRunner.jsx'

const mc = (id, position) => ({
  id,
  position,
  type: 'multiple_choice',
  topic: 'html',
  prompt: { question: `Pergunta ${id}`, options: ['A', 'B'] },
  solution: { correctIndex: 1 },
  explanation: `Explicação ${id}`,
})

beforeEach(() => {
  db.exercises = [mc('e1', 1), mc('e2', 2)]
  db.correct = []
  db.errorsToday = 0
  db.inserts = []
  session.plan = 'free'
})

async function answer(option) {
  fireEvent.click(await screen.findByRole('radio', { name: option }))
  fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }))
}

describe('ExerciseRunner', () => {
  it('resposta errada registra a tentativa (correct=false), gasta vida e permite tentar de novo', async () => {
    render(<ExerciseRunner lessonId="l1" />)
    expect(await screen.findByText(/Vidas: 5/)).toBeInTheDocument()
    await answer('A')
    expect(await screen.findByText('Quase!')).toBeInTheDocument()
    expect(db.inserts).toEqual([{ exercise_id: 'e1', correct: false }])
    expect(screen.getByText(/Vidas: 4/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    await answer('B')
    expect(await screen.findByText('Correto!')).toBeInTheDocument()
    expect(db.inserts.at(-1)).toEqual({ exercise_id: 'e1', correct: true })
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }))
    expect(await screen.findByText('Pergunta e2')).toBeInTheDocument()
  })

  it('todos corretos: mostra o estado de concluído', async () => {
    db.correct = ['e1', 'e2']
    render(<ExerciseRunner lessonId="l1" />)
    expect(await screen.findByText('Você concluiu os exercícios desta aula!')).toBeInTheDocument()
  })

  it('free sem vidas: mostra a mensagem e não deixa responder', async () => {
    db.errorsToday = 5
    render(<ExerciseRunner lessonId="l1" />)
    expect(
      await screen.findByText(
        'Suas vidas acabaram. Elas voltam à meia-noite — ou destrave vidas infinitas no Gold.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'B' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeDisabled()
    expect(db.inserts).toEqual([])
  })

  it('não mostra nada (nem vidas falsas) até a contagem de vidas chegar', () => {
    const { container } = render(<ExerciseRunner lessonId="l1" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('plano pago: sem contador de vidas', async () => {
    session.plan = 'gold'
    render(<ExerciseRunner lessonId="l1" />)
    await screen.findByText('Pergunta e1')
    expect(screen.queryByText(/Vidas/)).toBeNull()
  })
})
