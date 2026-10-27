import { describe, it, expect, vi } from 'vitest'

vi.mock('./runInBrowser.js', () => ({ runInBrowser: vi.fn() }))

import { checkAnswer } from './checkAnswer.js'

describe('checkAnswer', () => {
  it('múltipla escolha compara o índice', async () => {
    const ex = { type: 'multiple_choice', solution: { correctIndex: 1 } }
    expect(await checkAnswer(ex, 1)).toEqual({ correct: true, messages: [] })
    expect((await checkAnswer(ex, 0)).correct).toBe(false)
  })

  it('lacuna ignora maiúsculas e espaços', async () => {
    const ex = { type: 'fill_blank', solution: { answers: ['display'] } }
    expect((await checkAnswer(ex, [' Display '])).correct).toBe(true)
    expect((await checkAnswer(ex, ['flex'])).correct).toBe(false)
  })

  it('ordenar exige a ordem exata', async () => {
    const ex = { type: 'order_blocks', solution: { order: [0, 1, 2] } }
    expect((await checkAnswer(ex, [0, 2, 1])).correct).toBe(false)
    expect((await checkAnswer(ex, [0, 1, 2])).correct).toBe(true)
  })
})
