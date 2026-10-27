import { randomUUID } from 'node:crypto'

function check(error, what) {
  if (error) throw new Error(`${what}: ${error.message}`)
}

// Troca as perguntas de prova de um nível sem deixar o banco pela metade:
// primeiro insere as novas (perguntas e respostas), e só depois apaga as antigas.
// Se algo falhar antes de apagar as antigas, as antigas continuam intactas.
export async function replaceExamQuestions(supabase, levelId, examQuestions) {
  const { data: old, error: oldErr } = await supabase.from('exam_questions').select('id').eq('level_id', levelId)
  check(oldErr, 'Falha ao buscar perguntas antigas da prova')
  const oldIds = old.map((q) => q.id)

  const newIds = examQuestions.map(() => randomUUID())

  if (examQuestions.length > 0) {
    const { error: qErr } = await supabase.from('exam_questions').insert(
      examQuestions.map((q, i) => ({ id: newIds[i], level_id: levelId, type: q.type, topic: q.topic, prompt: q.prompt })),
    )
    check(qErr, 'Falha ao criar perguntas da prova')

    const { error: aErr } = await supabase
      .from('exam_answers')
      .insert(examQuestions.map((q, i) => ({ question_id: newIds[i], answer: q.answer })))
    if (aErr) {
      // Desfaz as perguntas novas; as antigas nunca foram tocadas.
      await supabase.from('exam_questions').delete().in('id', newIds)
      check(aErr, 'Falha ao criar respostas da prova')
    }
  }

  if (oldIds.length > 0) {
    const { error: dAnsErr } = await supabase.from('exam_answers').delete().in('question_id', oldIds)
    check(dAnsErr, 'Falha ao apagar respostas antigas da prova')
    const { error: dQErr } = await supabase.from('exam_questions').delete().in('id', oldIds)
    check(dQErr, 'Falha ao apagar perguntas antigas da prova')
  }

  return examQuestions.length
}
