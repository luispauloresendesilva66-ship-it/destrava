import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { validateContent } from './validate-content.js'

const sample = () =>
  JSON.parse(readFileSync(new URL('../content/primeiro-commit.json', import.meta.url), 'utf8'))

describe('validateContent', () => {
  it('aceita o exemplo primeiro-commit.json', () => {
    expect(validateContent(sample())).toEqual([])
  })

  it('rejeita tipo de exercício desconhecido', () => {
    const c = sample()
    c.lessons[0].exercises[0].type = 'xyz'
    expect(validateContent(c)).toContain('Aula 1, exercício 1: tipo "xyz" inválido.')
  })

  it('rejeita tipo de teste de código desconhecido', () => {
    const c = sample()
    c.lessons[1].exercises[1].solution.tests[0].type = 'foo'
    const errors = validateContent(c)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors.join('\n')).toContain('Aula 2, exercício 2')
    expect(errors.join('\n')).toContain('"foo"')
  })

  it('rejeita tipo de teste desconhecido em pergunta de prova', () => {
    const c = sample()
    c.examQuestions[4].answer.tests[0].type = 'foo'
    expect(validateContent(c).join('\n')).toContain('Pergunta de prova 5')
  })

  it('exige banco de prova com perguntas suficientes', () => {
    const c = sample()
    c.exam.questionCount = 20
    c.examQuestions = c.examQuestions.slice(0, 5)
    expect(validateContent(c)).toContain('Banco de prova tem 5 perguntas, mas a prova pede 20.')
  })

  it('exige durationSeconds', () => {
    const c = sample()
    delete c.lessons[0].durationSeconds
    const errors = validateContent(c)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors.join('\n')).toContain('Aula 1')
    expect(errors.join('\n')).toContain('durationSeconds')
  })

  it('rejeita solução fora do formato do tipo', () => {
    const c = sample()
    c.lessons[0].exercises[0].solution = { correctIndex: 9 }
    c.lessons[1].exercises[0].solution = { order: [0, 0, 2] }
    const text = validateContent(c).join('\n')
    expect(text).toContain('Aula 1, exercício 1')
    expect(text).toContain('Aula 2, exercício 1')
  })

  it('rejeita posições duplicadas e entrada que não é objeto', () => {
    const c = sample()
    c.lessons[1].position = 1
    expect(validateContent(c).join('\n')).toContain('posição 1 repetida')
    expect(validateContent(null).length).toBeGreaterThan(0)
  })
})
