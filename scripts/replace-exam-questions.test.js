import { describe, it, expect } from 'vitest'
import { replaceExamQuestions } from './replace-exam-questions.js'

// Cliente falso: registra as operações em ordem. `failOn` = 'table:op' que deve falhar.
function fakeClient({ oldIds = ['o1', 'o2'], failOn = null } = {}) {
  const ops = []
  const result = (key, extra = {}) => {
    ops.push(key.log)
    return Promise.resolve(failOn === key.id ? { error: { message: 'boom' } } : { error: null, ...extra })
  }
  return {
    ops,
    from(table) {
      return {
        select: () => ({
          eq: () => result({ id: `${table}:select`, log: { table, op: 'select' } }, { data: oldIds.map((id) => ({ id })) }),
        }),
        insert: (rows) => result({ id: `${table}:insert`, log: { table, op: 'insert', rows } }),
        delete: () => ({
          in: (col, ids) => result({ id: `${table}:delete`, log: { table, op: 'delete', col, ids } }),
        }),
      }
    },
  }
}

const questions = [
  { type: 'multiple_choice', topic: 'html', prompt: { question: 'q1', options: ['a', 'b'] }, answer: { correctIndex: 0 } },
  { type: 'code', topic: 'html', prompt: { statement: 's' }, answer: { tests: [{ type: 'dom-exists', selector: 'h1' }] } },
]
const deletes = (ops) => ops.filter((o) => o.op === 'delete')

describe('replaceExamQuestions', () => {
  it('sucesso: insere perguntas e respostas e só então apaga as antigas', async () => {
    const c = fakeClient()
    await replaceExamQuestions(c, 'L1', questions)
    const seq = c.ops.map((o) => `${o.table}:${o.op}`)
    expect(seq).toEqual([
      'exam_questions:select',
      'exam_questions:insert',
      'exam_answers:insert',
      'exam_answers:delete',
      'exam_questions:delete',
    ])
    const [qIns, aIns, aDel, qDel] = c.ops.slice(1)
    expect(aDel.ids).toEqual(['o1', 'o2'])
    expect(qDel.ids).toEqual(['o1', 'o2'])
    // respostas pareadas por id gerado no cliente
    expect(aIns.rows.map((r) => r.question_id)).toEqual(qIns.rows.map((r) => r.id))
    expect(aIns.rows[1].answer).toEqual(questions[1].answer)
  })

  it('falha ao inserir respostas: apaga só as perguntas novas, nunca as antigas', async () => {
    const c = fakeClient({ failOn: 'exam_answers:insert' })
    await expect(replaceExamQuestions(c, 'L1', questions)).rejects.toThrow('Falha ao criar respostas da prova')
    const newIds = c.ops.find((o) => o.op === 'insert' && o.table === 'exam_questions').rows.map((r) => r.id)
    const dels = deletes(c.ops)
    expect(dels).toHaveLength(1)
    expect(dels[0]).toMatchObject({ table: 'exam_questions', ids: newIds })
    expect(JSON.stringify(dels)).not.toContain('o1')
  })

  it('falha ao inserir perguntas: nada é apagado', async () => {
    const c = fakeClient({ failOn: 'exam_questions:insert' })
    await expect(replaceExamQuestions(c, 'L1', questions)).rejects.toThrow('Falha ao criar perguntas da prova')
    expect(deletes(c.ops)).toEqual([])
    expect(c.ops.some((o) => o.table === 'exam_answers')).toBe(false)
  })
})
