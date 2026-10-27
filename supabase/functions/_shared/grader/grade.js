import { parseHTML } from 'linkedom'
import { getQuickJS } from 'quickjs-emscripten'
import { findCssDeclaration } from './cssCheck.js'

const TIMEOUT_MS = 1000
const MEMORY_LIMIT = 32 * 1024 * 1024
const TIMEOUT_MESSAGE = 'Seu código demorou demais (possível loop infinito).'
const EMPTY_HTML = '<!doctype html><html><body></body></html>'

let quickJsPromise = null
function loadQuickJS() {
  if (!quickJsPromise) {
    quickJsPromise = getQuickJS().catch((err) => {
      quickJsPromise = null
      throw err
    })
  }
  return quickJsPromise
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

function errorText(err) {
  if (err && typeof err === 'object') {
    const msg = err.message ?? err.name
    if (msg) return String(msg)
  }
  return String(err)
}

// Dumps a handle and always disposes it, even if dump throws.
function takeError(context, handle) {
  try {
    return context.dump(handle)
  } finally {
    handle.dispose()
  }
}

// One QuickJS context per gradeCode call: the student's JS runs once and every
// js-equals expression is evaluated afterwards in the same context, all under
// ONE shared deadline. Known limit: QuickJS does not call the interrupt handler
// inside the regex engine or long native builtins, so those can overrun it.
function createJsSession(js) {
  let state = null // { runtime, context, deadline, timedOut, failure }

  async function init() {
    const QuickJS = await loadQuickJS()
    const runtime = QuickJS.newRuntime()
    const context = runtime.newContext()
    state = { runtime, context, deadline: 0, timedOut: false, failure: null }
    runtime.setMemoryLimit(MEMORY_LIMIT)
    const deadline = Date.now() + TIMEOUT_MS
    state.deadline = deadline
    runtime.setInterruptHandler(() => {
      if (Date.now() > deadline) {
        state.timedOut = true
        return true
      }
      return false
    })
    // Keep the original JSON.stringify out of the student's reach.
    const pre = context.evalCode('const __stringify = JSON.stringify;')
    if (pre.error) takeError(context, pre.error)
    else pre.value.dispose()

    const run = context.evalCode(String(js ?? ''))
    if (run.error) {
      const err = takeError(context, run.error)
      state.failure = state.timedOut ? TIMEOUT_MESSAGE : `Erro no seu código: ${errorText(err)}`
    } else {
      run.value.dispose()
    }
  }

  async function evaluate(expression, equals) {
    try {
      if (!state) await init()
    } catch (err) {
      return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
    }
    if (state.failure) return { passed: false, message: state.failure }
    if (state.timedOut || Date.now() > state.deadline) {
      state.timedOut = true
      return { passed: false, message: TIMEOUT_MESSAGE }
    }
    try {
      const { context } = state
      const res = context.evalCode(`__stringify((\n${expression}\n))`)
      if (res.error) {
        const err = takeError(context, res.error)
        if (state.timedOut) return { passed: false, message: TIMEOUT_MESSAGE }
        return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
      }
      let json
      try {
        json = context.dump(res.value)
      } finally {
        res.value.dispose()
      }
      if (typeof json !== 'string') {
        return { passed: false, message: `O resultado de ${expression} deveria ser ${JSON.stringify(equals)}.` }
      }
      if (canonical(JSON.parse(json)) === canonical(equals)) return { passed: true, message: '' }
      return {
        passed: false,
        message: `O resultado de ${expression} deveria ser ${JSON.stringify(equals)}, mas foi ${json}.`,
      }
    } catch (err) {
      if (state.timedOut) return { passed: false, message: TIMEOUT_MESSAGE }
      return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
    }
  }

  function dispose() {
    if (!state) return
    try { state.context.dispose() } catch { /* ignore */ }
    try { state.runtime.dispose() } catch { /* ignore */ }
    state = null
  }

  return { evaluate, dispose }
}

function gradeOne(test, { document, cssText, session }) {
  switch (test?.type) {
    case 'dom-exists': {
      const found = document.querySelector(test.selector)
      return found
        ? { passed: true, message: '' }
        : { passed: false, message: `Não encontrei o elemento ${test.selector}.` }
    }
    case 'dom-text': {
      const el = document.querySelector(test.selector)
      if (!el) return { passed: false, message: `Não encontrei o elemento ${test.selector}.` }
      return (el.textContent ?? '').trim() === test.equals
        ? { passed: true, message: '' }
        : { passed: false, message: `O texto de ${test.selector} deveria ser "${test.equals}".` }
    }
    case 'css-decl': {
      return findCssDeclaration(cssText, test)
        ? { passed: true, message: '' }
        : { passed: false, message: `Não encontrei "${test.property}: ${test.value}" em ${test.selector}.` }
    }
    case 'js-equals':
      return session.evaluate(test.expression, test.equals)
    default:
      return { passed: false, message: `Tipo de teste desconhecido: ${test?.type}.` }
  }
}

export async function gradeCode({ html = '', css = '', js = '' } = {}, tests = []) {
  let document
  let cssText = String(css ?? '')
  try {
    ;({ document } = parseHTML(String(html ?? '') || EMPTY_HTML))
    for (const style of document.querySelectorAll('style')) cssText += `\n${style.textContent ?? ''}`
  } catch {
    document = parseHTML(EMPTY_HTML).document
  }
  const session = createJsSession(js)
  const results = []
  try {
    for (let index = 0; index < tests.length; index++) {
      let r
      try {
        r = await gradeOne(tests[index], { document, cssText, session })
      } catch (err) {
        r = { passed: false, message: `Erro ao corrigir o teste: ${errorText(err)}` }
      }
      results.push({ index, passed: r.passed, message: r.message })
    }
  } finally {
    session.dispose()
  }
  return { passed: results.length > 0 && results.every((r) => r.passed), results }
}
