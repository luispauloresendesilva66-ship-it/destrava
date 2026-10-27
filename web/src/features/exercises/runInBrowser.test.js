import { describe, it, expect, vi, afterEach } from 'vitest'
import { runInBrowser, TIMEOUT_MS, TIMEOUT_MESSAGE } from './runInBrowser.js'

// O jsdom não executa o conteúdo do iframe com sandbox: simulamos a mensagem que o
// iframe enviaria (mesmo token, mesma origem de janela) e checamos a lógica da página.
function lastIframe() {
  const frames = document.querySelectorAll('iframe')
  return frames[frames.length - 1]
}
function reply(iframe, results, { source = iframe.contentWindow, token = iframe.dataset.token } = {}) {
  window.dispatchEvent(new MessageEvent('message', { data: { token, results }, source }))
}

afterEach(() => {
  vi.useRealTimers()
})

describe('runInBrowser', () => {
  it('cria um iframe invisível com sandbox="allow-scripts" e o remove no fim', async () => {
    const promise = runInBrowser({ html: '<h1>Oi</h1>' }, [{ type: 'dom-exists', selector: 'h1' }])
    const iframe = lastIframe()
    expect(iframe.getAttribute('sandbox')).toBe('allow-scripts')
    expect(iframe.style.display).toBe('none')
    expect(iframe.srcdoc).toContain('<h1>Oi</h1>')
    reply(iframe, [{ passed: true, message: '' }])
    expect(await promise).toEqual({
      passed: true,
      results: [{ index: 0, passed: true, message: '' }],
    })
    expect(document.querySelector('iframe')).toBeNull()
  })

  it('repassa as mensagens de falha do iframe', async () => {
    const promise = runInBrowser({ html: '' }, [{ type: 'dom-exists', selector: 'h1' }])
    reply(lastIframe(), [{ passed: false, message: 'Não encontrei o elemento h1.' }])
    const out = await promise
    expect(out.passed).toBe(false)
    expect(out.results[0].message).toBe('Não encontrei o elemento h1.')
  })

  it('ignora mensagens de outra origem ou com token errado', async () => {
    const promise = runInBrowser({}, [{ type: 'dom-exists', selector: 'h1' }])
    const iframe = lastIframe()
    reply(iframe, [{ passed: true, message: '' }], { source: window })
    reply(iframe, [{ passed: true, message: '' }], { token: 'outro' })
    reply(iframe, [{ passed: false, message: 'x' }])
    expect((await promise).passed).toBe(false)
  })

  it('css-decl é conferido na página com findCssDeclaration (seletor com maiúsculas)', async () => {
    const tests = [
      { type: 'css-decl', selector: 'h1', property: 'color', value: 'red' },
      { type: 'css-decl', selector: 'H1', property: 'color', value: 'red' },
    ]
    const promise = runInBrowser({ html: '', css: 'h1 { COLOR: Red }' }, tests)
    reply(lastIframe(), [null, null])
    const out = await promise
    expect(out.results[0].passed).toBe(true)
    expect(out.results[1]).toEqual({
      index: 1,
      passed: false,
      message: 'Não encontrei "color: red" em H1.',
    })
  })

  it('css-decl também enxerga <style> dentro do HTML', async () => {
    const promise = runInBrowser(
      { html: '<style>p { margin: 0 }</style><p>a</p>' },
      [{ type: 'css-decl', selector: 'p', property: 'margin', value: '0' }],
    )
    reply(lastIframe(), [null])
    expect((await promise).passed).toBe(true)
  })

  it('timeout de 2 s: sem resposta, falha com a mensagem de loop infinito', async () => {
    vi.useFakeTimers()
    const promise = runInBrowser({ js: 'while(true){}' }, [
      { type: 'js-equals', expression: '1', equals: 1 },
    ])
    await vi.advanceTimersByTimeAsync(TIMEOUT_MS - 1)
    expect(document.querySelector('iframe')).not.toBeNull()
    await vi.advanceTimersByTimeAsync(2)
    const out = await promise
    expect(out).toEqual({
      passed: false,
      results: [{ index: 0, passed: false, message: TIMEOUT_MESSAGE }],
    })
    expect(TIMEOUT_MESSAGE).toBe('Seu código demorou demais (possível loop infinito).')
    expect(document.querySelector('iframe')).toBeNull()
  })

  it('sem testes nunca passa (como no servidor)', async () => {
    const promise = runInBrowser({}, [])
    expect((await promise).passed).toBe(false)
  })
})
