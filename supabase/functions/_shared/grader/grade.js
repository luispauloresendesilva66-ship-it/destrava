import { parseHTML } from 'linkedom'
import { getQuickJS } from 'quickjs-emscripten'
import { findCssDeclaration } from './cssCheck.js'

const TIMEOUT_MS = 1000
const MEMORY_LIMIT = 32 * 1024 * 1024
const TIMEOUT_MESSAGE = 'Seu código demorou demais (possível loop infinito).'

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

async function evalJs(js, expression, equals) {
  let QuickJS
  try {
    QuickJS = await loadQuickJS()
  } catch (err) {
    return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
  }
  const runtime = QuickJS.newRuntime()
  const context = runtime.newContext()
  let timedOut = false
  try {
    runtime.setMemoryLimit(MEMORY_LIMIT)
    const deadline = Date.now() + TIMEOUT_MS
    runtime.setInterruptHandler(() => {
      if (Date.now() > deadline) {
        timedOut = true
        return true
      }
      return false
    })

    const run = context.evalCode(String(js ?? ''))
    if (run.error) {
      const err = context.dump(run.error)
      run.error.dispose()
      if (timedOut) return { passed: false, message: TIMEOUT_MESSAGE }
      return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
    }
    run.value.dispose()

    const res = context.evalCode(`JSON.stringify(${expression})`)
    if (res.error) {
      const err = context.dump(res.error)
      res.error.dispose()
      if (timedOut) return { passed: false, message: TIMEOUT_MESSAGE }
      return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
    }
    const json = context.dump(res.value)
    res.value.dispose()
    if (typeof json !== 'string') {
      return { passed: false, message: `O resultado de ${expression} deveria ser ${JSON.stringify(equals)}.` }
    }
    const actual = JSON.parse(json)
    if (canonical(actual) === canonical(equals)) return { passed: true, message: '' }
    return { passed: false, message: `O resultado de ${expression} deveria ser ${JSON.stringify(equals)}, mas foi ${json}.` }
  } catch (err) {
    if (timedOut) return { passed: false, message: TIMEOUT_MESSAGE }
    return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
  } finally {
    try { context.dispose() } catch { /* ignore */ }
    try { runtime.dispose() } catch { /* ignore */ }
  }
}

function gradeOne(test, { document, cssText, js }) {
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
      return evalJs(js, test.expression, test.equals)
    default:
      return { passed: false, message: `Tipo de teste desconhecido: ${test?.type}.` }
  }
}

export async function gradeCode({ html = '', css = '', js = '' } = {}, tests = []) {
  let document
  let cssText = String(css ?? '')
  try {
    ;({ document } = parseHTML(String(html ?? '') || '<!doctype html><html><body></body></html>'))
    for (const style of document.querySelectorAll('style')) cssText += `\n${style.textContent ?? ''}`
  } catch {
    document = parseHTML('<!doctype html><html><body></body></html>').document
  }
  const results = []
  for (let index = 0; index < tests.length; index++) {
    let r
    try {
      r = await gradeOne(tests[index], { document, cssText, js })
    } catch (err) {
      r = { passed: false, message: `Erro ao corrigir o teste: ${errorText(err)}` }
    }
    results.push({ index, passed: r.passed, message: r.message })
  }
  return { passed: results.length > 0 && results.every((r) => r.passed), results }
}
