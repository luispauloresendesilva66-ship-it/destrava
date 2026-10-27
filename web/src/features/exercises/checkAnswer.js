import { runInBrowser } from './runInBrowser.js'

const norm = (s) => String(s ?? '').trim().replace(/\s+/g, ' ').toLowerCase()

// Confere a resposta do aluno. A forma de `answer` depende do tipo:
// múltipla escolha: índice; lacuna: lista de textos; ordenar: lista de índices na ordem do aluno;
// código: { html, css, js }.
export async function checkAnswer(exercise, answer) {
  const { type, solution } = exercise
  switch (type) {
    case 'multiple_choice':
      return { correct: answer === solution.correctIndex, messages: [] }
    case 'fill_blank': {
      const expected = solution.answers ?? []
      const given = Array.isArray(answer) ? answer : []
      const correct =
        given.length === expected.length && expected.every((a, i) => norm(given[i]) === norm(a))
      return { correct, messages: [] }
    }
    case 'order_blocks': {
      const expected = solution.order ?? []
      const given = Array.isArray(answer) ? answer : []
      const correct = given.length === expected.length && expected.every((v, i) => given[i] === v)
      return { correct, messages: [] }
    }
    case 'code': {
      const { passed, results } = await runInBrowser(answer ?? {}, solution.tests ?? [])
      return {
        correct: passed,
        messages: results.filter((r) => !r.passed && r.message).map((r) => r.message),
      }
    }
    default:
      return { correct: false, messages: [`Tipo de exercício desconhecido: ${type}.`] }
  }
}
