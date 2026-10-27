// Valida o JSON de conteúdo de um nível. Retorna uma lista de erros em português
// (vazia se estiver válido). Não lança exceção para entradas malformadas.

const EXERCISE_TYPES = ['multiple_choice', 'fill_blank', 'order_blocks', 'code']
const EXAM_TYPES = ['multiple_choice', 'code']
const TEST_TYPES = ['dom-exists', 'dom-text', 'css-decl', 'js-equals']

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const isStr = (v) => typeof v === 'string' && v.trim() !== ''
const isInt = (v) => Number.isInteger(v)
const isPosInt = (v) => Number.isInteger(v) && v >= 1

function checkTests(tests, where, errors) {
  if (!Array.isArray(tests) || tests.length === 0) {
    errors.push(`${where}: "tests" deve ser uma lista com pelo menos um teste.`)
    return
  }
  tests.forEach((t, i) => {
    const w = `${where}, teste ${i + 1}`
    if (!isObj(t) || !TEST_TYPES.includes(t.type)) {
      errors.push(`${w}: tipo "${isObj(t) ? t.type : t}" inválido.`)
      return
    }
    if (t.type === 'dom-exists' && !isStr(t.selector)) errors.push(`${w}: falta "selector".`)
    if (t.type === 'dom-text') {
      if (!isStr(t.selector)) errors.push(`${w}: falta "selector".`)
      if (typeof t.equals !== 'string') errors.push(`${w}: "equals" deve ser texto.`)
    }
    if (t.type === 'css-decl') {
      for (const k of ['selector', 'property', 'value']) {
        if (!isStr(t[k])) errors.push(`${w}: falta "${k}".`)
      }
    }
    if (t.type === 'js-equals') {
      if (!isStr(t.expression)) errors.push(`${w}: falta "expression".`)
      if (!('equals' in t)) errors.push(`${w}: falta "equals".`)
    }
  })
}

function checkCodePrompt(prompt, where, errors) {
  if (!isStr(prompt?.statement)) errors.push(`${where}: o enunciado (prompt.statement) é obrigatório.`)
  if (prompt?.starter !== undefined) {
    if (!isObj(prompt.starter)) errors.push(`${where}: prompt.starter deve ser um objeto.`)
    else {
      for (const k of ['html', 'css', 'js']) {
        if (prompt.starter[k] !== undefined && typeof prompt.starter[k] !== 'string') {
          errors.push(`${where}: prompt.starter.${k} deve ser texto.`)
        }
      }
    }
  }
}

function checkChoice(prompt, answer, where, errors) {
  const opts = prompt?.options
  if (!isStr(prompt?.question)) errors.push(`${where}: a pergunta (prompt.question) é obrigatória.`)
  if (!Array.isArray(opts) || opts.length < 2 || !opts.every(isStr)) {
    errors.push(`${where}: prompt.options deve ter pelo menos 2 opções de texto.`)
    return
  }
  const idx = answer?.correctIndex
  if (!isInt(idx) || idx < 0 || idx >= opts.length) {
    errors.push(`${where}: correctIndex deve apontar para uma das opções.`)
  }
}

function checkFillBlank(prompt, solution, where, errors) {
  if (!isStr(prompt?.code)) errors.push(`${where}: prompt.code é obrigatório.`)
  if (!isPosInt(prompt?.blanks)) errors.push(`${where}: prompt.blanks deve ser um inteiro maior que zero.`)
  const answers = solution?.answers
  if (!Array.isArray(answers) || !answers.every(isStr)) {
    errors.push(`${where}: solution.answers deve ser uma lista de textos.`)
  } else if (isPosInt(prompt?.blanks) && answers.length !== prompt.blanks) {
    errors.push(`${where}: solution.answers tem ${answers.length} respostas, mas prompt.blanks é ${prompt.blanks}.`)
  }
}

function checkOrderBlocks(prompt, solution, where, errors) {
  const blocks = prompt?.blocks
  if (!Array.isArray(blocks) || blocks.length < 2 || !blocks.every(isStr)) {
    errors.push(`${where}: prompt.blocks deve ter pelo menos 2 blocos de texto.`)
    return
  }
  const order = solution?.order
  const ok =
    Array.isArray(order) &&
    order.length === blocks.length &&
    order.every((n) => isInt(n) && n >= 0 && n < blocks.length) &&
    new Set(order).size === order.length
  if (!ok) errors.push(`${where}: solution.order deve ser uma permutação de 0 a ${blocks.length - 1}.`)
}

function checkPositions(items, label, errors) {
  const seen = new Set()
  items.forEach((it) => {
    if (!isPosInt(it?.position)) return
    if (seen.has(it.position)) errors.push(`${label}: posição ${it.position} repetida.`)
    seen.add(it.position)
  })
}

export function validateContent(content) {
  const errors = []
  if (!isObj(content)) return ['O conteúdo deve ser um objeto JSON.']

  const { level, exam, lessons, examQuestions } = content

  if (!isObj(level)) errors.push('Nível: falta o bloco "level".')
  else {
    if (!isPosInt(level.position)) errors.push('Nível: "position" deve ser um inteiro maior que zero.')
    if (!isStr(level.slug)) errors.push('Nível: falta "slug".')
    if (!isStr(level.name)) errors.push('Nível: falta "name".')
  }

  let questionCount = null
  if (!isObj(exam)) errors.push('Prova: falta o bloco "exam".')
  else {
    if (!isPosInt(exam.questionCount)) errors.push('Prova: "questionCount" deve ser um inteiro maior que zero.')
    else if (exam.questionCount < 2) errors.push('Prova: "questionCount" deve ser pelo menos 2 (precisa de uma pergunta de código e outra).')
    else questionCount = exam.questionCount
    for (const k of ['exerciseMinutes', 'examMinutes']) {
      if (!isPosInt(exam[k])) errors.push(`Prova: "${k}" deve ser um inteiro maior que zero.`)
    }
  }

  if (!Array.isArray(lessons) || lessons.length === 0) {
    errors.push('Falta a lista "lessons" com pelo menos uma aula.')
  } else {
    checkPositions(lessons, 'Aulas', errors)
    lessons.forEach((lesson, li) => {
      const L = `Aula ${isPosInt(lesson?.position) ? lesson.position : li + 1}`
      if (!isObj(lesson)) {
        errors.push(`${L}: deve ser um objeto.`)
        return
      }
      if (!isPosInt(lesson.position)) errors.push(`${L}: "position" deve ser um inteiro maior que zero.`)
      if (!isStr(lesson.title)) errors.push(`${L}: falta "title".`)
      if (!isPosInt(lesson.durationSeconds)) {
        errors.push(`${L}: "durationSeconds" é obrigatório e deve ser um inteiro maior que zero.`)
      }
      for (const k of ['videoKey', 'captionsKey']) {
        if (lesson[k] !== undefined && lesson[k] !== null && !isStr(lesson[k])) {
          errors.push(`${L}: "${k}" deve ser texto.`)
        }
      }
      for (const k of ['isFree', 'isSample']) {
        if (lesson[k] !== undefined && typeof lesson[k] !== 'boolean') {
          errors.push(`${L}: "${k}" deve ser true ou false.`)
        }
      }
      const exercises = lesson.exercises ?? []
      if (!Array.isArray(exercises)) {
        errors.push(`${L}: "exercises" deve ser uma lista.`)
        return
      }
      checkPositions(exercises, `${L}, exercícios`, errors)
      exercises.forEach((ex, ei) => {
        const E = `${L}, exercício ${isPosInt(ex?.position) ? ex.position : ei + 1}`
        if (!isObj(ex)) {
          errors.push(`${E}: deve ser um objeto.`)
          return
        }
        if (!isPosInt(ex.position)) errors.push(`${E}: "position" deve ser um inteiro maior que zero.`)
        if (!EXERCISE_TYPES.includes(ex.type)) {
          errors.push(`${E}: tipo "${ex.type}" inválido.`)
          return
        }
        if (!isStr(ex.topic)) errors.push(`${E}: falta "topic".`)
        if (!isObj(ex.prompt)) {
          errors.push(`${E}: falta "prompt".`)
          return
        }
        if (!isObj(ex.solution)) {
          errors.push(`${E}: falta "solution".`)
          return
        }
        if (ex.type === 'multiple_choice') checkChoice(ex.prompt, ex.solution, E, errors)
        else if (ex.type === 'fill_blank') checkFillBlank(ex.prompt, ex.solution, E, errors)
        else if (ex.type === 'order_blocks') checkOrderBlocks(ex.prompt, ex.solution, E, errors)
        else {
          checkCodePrompt(ex.prompt, E, errors)
          checkTests(ex.solution.tests, E, errors)
        }
      })
    })
  }

  if (!Array.isArray(examQuestions)) {
    errors.push('Falta a lista "examQuestions".')
  } else {
    examQuestions.forEach((q, qi) => {
      const Q = `Pergunta de prova ${qi + 1}`
      if (!isObj(q)) {
        errors.push(`${Q}: deve ser um objeto.`)
        return
      }
      if (!EXAM_TYPES.includes(q.type)) {
        errors.push(`${Q}: tipo "${q.type}" inválido.`)
        return
      }
      if (!isStr(q.topic)) errors.push(`${Q}: falta "topic".`)
      if (!isObj(q.prompt)) {
        errors.push(`${Q}: falta "prompt".`)
        return
      }
      if (!isObj(q.answer)) {
        errors.push(`${Q}: falta "answer".`)
        return
      }
      if (q.type === 'multiple_choice') checkChoice(q.prompt, q.answer, Q, errors)
      else {
        checkCodePrompt(q.prompt, Q, errors)
        checkTests(q.answer.tests, Q, errors)
      }
    })
    if (!examQuestions.some((q) => isObj(q) && q.type === 'code')) {
      errors.push('Banco de prova precisa ter pelo menos uma pergunta de código.')
    }
    if (questionCount !== null && examQuestions.length < questionCount) {
      errors.push(`Banco de prova tem ${examQuestions.length} perguntas, mas a prova pede ${questionCount}.`)
    }
  }

  return errors
}
