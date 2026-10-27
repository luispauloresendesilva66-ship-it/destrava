import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value, onChange, 'aria-label': label }) => (
    <textarea aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} />
  ),
}))
vi.mock('./runInBrowser.js', () => ({
  runInBrowser: vi.fn(async () => ({
    passed: false,
    results: [{ index: 0, passed: false, message: 'Não encontrei o elemento h1.' }],
  })),
  buildPreviewDoc: ({ html = '', css = '', js = '' }) => `${html}|${css}|${js}`,
}))

import CodeExercise from './CodeExercise.jsx'
import { checkAnswer } from './checkAnswer.js'
import { runInBrowser } from './runInBrowser.js'

const exercise = {
  id: 'c1',
  type: 'code',
  prompt: { statement: 'Crie um h1', starter: { html: '<p>a</p>', css: '', js: '' } },
  solution: { tests: [{ type: 'dom-exists', selector: 'h1' }] },
  explanation: 'Use h1.',
}

describe('CodeExercise', () => {
  it('mostra uma aba por arquivo do starter', () => {
    render(<CodeExercise exercise={exercise} onSubmit={() => {}} />)
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['HTML', 'CSS', 'JS'])
  })

  it('só HTML no starter: uma aba', () => {
    const ex = { ...exercise, prompt: { ...exercise.prompt, starter: { html: '' } } }
    render(<CodeExercise exercise={ex} onSubmit={() => {}} />)
    expect(screen.getAllByRole('tab')).toHaveLength(1)
  })

  it('Testar confere o código e não mostra verde na falha', async () => {
    render(<CodeExercise exercise={exercise} onSubmit={(a) => checkAnswer(exercise, a)} />)
    fireEvent.change(screen.getByLabelText('Editor de HTML'), { target: { value: '<p>b</p>' } })
    fireEvent.click(screen.getByRole('button', { name: 'Testar' }))
    expect(await screen.findByText('Quase!')).toBeInTheDocument()
    expect(runInBrowser).toHaveBeenCalledWith(
      { html: '<p>b</p>', css: '', js: '' },
      exercise.solution.tests,
    )
    expect(screen.getByText('Não encontrei o elemento h1.')).toBeInTheDocument()
    expect(document.querySelector('.ex__feedback--ok')).toBeNull()
  })

  it('o JS só entra na pré-visualização depois de Testar', async () => {
    const ex = {
      ...exercise,
      prompt: { ...exercise.prompt, starter: { html: '', css: '', js: 'x()' } },
    }
    render(
      <CodeExercise exercise={ex} onSubmit={async () => ({ correct: false, messages: [] })} />,
    )
    const preview = () => screen.getByTitle('Pré-visualização').getAttribute('srcdoc')
    expect(preview()).not.toContain('x()')
    fireEvent.click(screen.getByRole('button', { name: 'Testar' }))
    await waitFor(() => expect(preview()).toContain('x()'))
  })
})
