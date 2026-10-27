import { findCssDeclaration } from '@grader/cssCheck.js'

export const TIMEOUT_MS = 2000
// Mesma mensagem do corretor do servidor (supabase/functions/_shared/grader/grade.js).
export const TIMEOUT_MESSAGE = 'Seu código demorou demais (possível loop infinito).'

// Roda DENTRO do iframe (é serializado com toString): executa o JS do aluno e confere os
// testes que dependem de DOM ou de JS. Os de css-decl ficam com a página (resultado null).
// Mantém as mensagens e a comparação canônica de grade.js.
function iframeRunner(win) {
  const document = win.document
  const stringify = JSON.stringify
  const parse = JSON.parse
  const { token, js, tests } = parse(document.getElementById('__destrava').textContent)
  const indirectEval = win.eval

  const canonical = (value) => {
    if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
    if (value && typeof value === 'object') {
      return `{${Object.keys(value)
        .sort()
        .map((k) => `${stringify(k)}:${canonical(value[k])}`)
        .join(',')}}`
    }
    return stringify(value)
  }
  const errorText = (err) => {
    if (err && typeof err === 'object') {
      const msg = err.message ?? err.name
      // Chrome embrulha erros de sintaxe do <script> num "Failed to execute 'appendChild'...".
      if (msg) return String(msg).replace(/^Failed to execute '[^']*' on '[^']*': /, '')
    }
    return String(err)
  }

  let failure = null
  win.addEventListener('error', (e) => {
    if (!failure) failure = `Erro no seu código: ${errorText(e.error ?? e.message)}`
  })
  const script = document.createElement('script')
  script.textContent = js
  // Com HTML vazio o <body> ainda não existe (os scripts caem no <head>).
  ;(document.body ?? document.head).appendChild(script)

  const results = tests.map((test) => {
    try {
      switch (test?.type) {
        case 'dom-exists':
          return document.querySelector(test.selector)
            ? { passed: true, message: '' }
            : { passed: false, message: `Não encontrei o elemento ${test.selector}.` }
        case 'dom-text': {
          const el = document.querySelector(test.selector)
          if (!el) return { passed: false, message: `Não encontrei o elemento ${test.selector}.` }
          return (el.textContent ?? '').trim() === test.equals
            ? { passed: true, message: '' }
            : { passed: false, message: `O texto de ${test.selector} deveria ser "${test.equals}".` }
        }
        case 'css-decl':
          return null
        case 'js-equals': {
          if (failure) return { passed: false, message: failure }
          let json
          try {
            json = stringify(indirectEval(`(\n${test.expression}\n)`))
          } catch (err) {
            return { passed: false, message: `Erro no seu código: ${errorText(err)}` }
          }
          if (typeof json !== 'string') {
            return {
              passed: false,
              message: `O resultado de ${test.expression} deveria ser ${stringify(test.equals)}.`,
            }
          }
          if (canonical(parse(json)) === canonical(test.equals)) return { passed: true, message: '' }
          return {
            passed: false,
            message: `O resultado de ${test.expression} deveria ser ${stringify(test.equals)}, mas foi ${json}.`,
          }
        }
        default:
          return { passed: false, message: `Tipo de teste desconhecido: ${test?.type}.` }
      }
    } catch (err) {
      return { passed: false, message: `Erro ao corrigir o teste: ${errorText(err)}` }
    }
  })
  win.parent.postMessage({ token, results }, '*')
}

// JSON dentro de <script>: escapa "<" para o texto do aluno não fechar a tag.
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

export function buildRunnerDoc({ html = '', css = '', js = '' }, tests, token) {
  const data = safeJson({ token, js: String(js ?? ''), tests })
  return (
    `${String(html ?? '')}\n<style>${String(css ?? '').replace(/<\/style/gi, '<\\/style')}</style>\n` +
    `<script type="application/json" id="__destrava">${data}</script>\n` +
    `<script>(${iframeRunner.toString()})(window)</script>`
  )
}

// Documento da pré-visualização (sem testes).
export function buildPreviewDoc({ html = '', css = '', js = '' }) {
  return (
    `${String(html ?? '')}\n<style>${String(css ?? '').replace(/<\/style/gi, '<\\/style')}</style>\n` +
    `<script>${String(js ?? '').replace(/<\/script/gi, '<\\/script')}</script>`
  )
}

// Mesmo critério do servidor: o CSS do aluno mais o conteúdo dos <style> do HTML.
function collectCss(html, css) {
  let cssText = String(css ?? '')
  try {
    const doc = new DOMParser().parseFromString(String(html ?? ''), 'text/html')
    for (const style of doc.querySelectorAll('style')) cssText += `\n${style.textContent ?? ''}`
  } catch {
    // HTML ilegível: só o CSS próprio
  }
  return cssText
}

function randomToken() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

// Roda o código num <iframe sandbox="allow-scripts"> invisível e devolve { passed, results },
// o mesmo formato de gradeCode (servidor).
export function runInBrowser({ html = '', css = '', js = '' } = {}, tests = []) {
  const cssText = collectCss(html, css)
  const token = randomToken()

  const finish = (fromIframe) => {
    const results = tests.map((test, index) => {
      if (test?.type === 'css-decl') {
        return findCssDeclaration(cssText, test)
          ? { index, passed: true, message: '' }
          : {
              index,
              passed: false,
              message: `Não encontrei "${test.property}: ${test.value}" em ${test.selector}.`,
            }
      }
      const r = fromIframe?.[index]
      if (r) return { index, passed: !!r.passed, message: r.message ?? '' }
      return { index, passed: false, message: TIMEOUT_MESSAGE }
    })
    return { passed: results.length > 0 && results.every((r) => r.passed), results }
  }

  if (tests.length === 0) return Promise.resolve(finish(null))

  return new Promise((resolve) => {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('sandbox', 'allow-scripts')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.tabIndex = -1
    iframe.style.display = 'none'
    iframe.dataset.token = token

    let timer = null
    const done = (fromIframe) => {
      clearTimeout(timer)
      window.removeEventListener('message', onMessage)
      iframe.remove()
      resolve(finish(fromIframe))
    }
    function onMessage(event) {
      if (event.source !== iframe.contentWindow || event.data?.token !== token) return
      done(Array.isArray(event.data.results) ? event.data.results : null)
    }

    window.addEventListener('message', onMessage)
    timer = setTimeout(() => done(null), TIMEOUT_MS)
    iframe.srcdoc = buildRunnerDoc({ html, css, js }, tests, token)
    document.body.appendChild(iframe)
  })
}
