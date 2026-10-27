import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MultipleChoice from './MultipleChoice.jsx'
import { checkAnswer } from './checkAnswer.js'

const exercise = {
  id: 'e1',
  type: 'multiple_choice',
  prompt: { question: 'Qual tag é o título?', options: ['<p>', '<h1>'] },
  solution: { correctIndex: 1 },
  explanation: 'A tag h1 marca o título.',
}

function setup() {
  render(<MultipleChoice exercise={exercise} onSubmit={(a) => checkAnswer(exercise, a)} />)
}

describe('MultipleChoice', () => {
  it('opção certa mostra Correto! e a explicação', async () => {
    setup()
    fireEvent.click(screen.getByRole('radio', { name: '<h1>' }))
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }))
    await waitFor(() => expect(screen.getByText('Correto!')).toBeInTheDocument())
    expect(screen.getByText('A tag h1 marca o título.')).toBeInTheDocument()
  })

  it('opção errada mostra Quase! e a explicação', async () => {
    setup()
    fireEvent.click(screen.getByRole('radio', { name: '<p>' }))
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }))
    await waitFor(() => expect(screen.getByText('Quase!')).toBeInTheDocument())
    expect(screen.getByText('A tag h1 marca o título.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeInTheDocument()
  })
})
