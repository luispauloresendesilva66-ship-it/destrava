import { describe, it, expect } from 'vitest'
import { JSDOM, VirtualConsole } from 'jsdom'
import { gradeCode } from '@grader/grade.js'
import { buildRunnerDoc } from './runInBrowser.js'

// Monta o documento exatamente como o srcdoc (buildRunnerDoc) e o executa num jsdom com
// scripts habilitados; devolve o que o iframe postaria no parent.
function runRunner({ html = '', js = '' }, tests) {
  const posted = []
  new JSDOM(buildRunnerDoc({ html, js }, tests, 't'), {
    runScripts: 'dangerously',
    virtualConsole: new VirtualConsole(), // erros do código do aluno não vão para o terminal
    beforeParse(win) {
      win.postMessage = (message) => posted.push(message) // parent === window no jsdom
    },
  })
  return posted.at(-1)?.results
}

const cases = {
  'js correto': { js: 'function soma(a,b){return a+b}', tests: [{ type: 'js-equals', expression: 'soma(2,3)', equals: 5 }] },
  'js resultado errado': { js: 'function soma(a,b){return a-b}', tests: [{ type: 'js-equals', expression: 'soma(2,3)', equals: 5 }] },
  'js objeto, ordem das chaves': { js: 'const o = {b:1,a:[1,2]}', tests: [{ type: 'js-equals', expression: 'o', equals: { a: [1, 2], b: 1 } }] },
  'js lança erro': { js: 'throw new Error("boom")', tests: [{ type: 'js-equals', expression: 'soma(2,3)', equals: 5 }] },
  'js com sintaxe errada': { engineMessage: true, js: 'function (', tests: [{ type: 'js-equals', expression: 'soma(2,3)', equals: 5 }] },
  'expressão que lança': { engineMessage: true, js: '', tests: [{ type: 'js-equals', expression: 'naoExiste()', equals: 1 }] },
  'dom certo': { html: '<h1> Meu site </h1>', tests: [{ type: 'dom-exists', selector: 'h1' }, { type: 'dom-text', selector: 'h1', equals: 'Meu site' }] },
  'dom elemento faltando': { html: '<p>a</p>', tests: [{ type: 'dom-exists', selector: 'h1' }, { type: 'dom-text', selector: 'h1', equals: 'x' }] },
  'dom texto errado': { html: '<h1>Oi</h1>', tests: [{ type: 'dom-text', selector: 'h1', equals: 'Meu site' }] },
  'tipo desconhecido': { tests: [{ type: 'xyz' }] },
}

describe('iframeRunner x gradeCode (servidor)', () => {
  for (const [name, c] of Object.entries(cases)) {
    it(name, async () => {
      const browser = runRunner(c, c.tests)
      const server = await gradeCode({ html: c.html ?? '', js: c.js ?? '' }, c.tests)
      expect(browser).toBeTruthy()
      const pick = (r) => ({
        passed: r.passed,
        // O texto do erro vem do motor (V8 x QuickJS): só o prefixo é comparável.
        message: c.engineMessage ? r.message.split(':')[0] : r.message,
      })
      expect(browser.map(pick)).toEqual(server.results.map(pick))
    })
  }
})
