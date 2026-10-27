import { describe, it, expect } from 'vitest'
import { gradeCode } from './grade.js'
import { findCssDeclaration } from './cssCheck.js'

const one = async (files, test) => (await gradeCode(files, [test])).results[0]

describe('dom-exists', () => {
  it('passes when element exists', async () => {
    const r = await one({ html: '<h1>Oi</h1>' }, { type: 'dom-exists', selector: 'h1' })
    expect(r.passed).toBe(true)
  })
  it('fails with message', async () => {
    const r = await one({ html: '<h1>Oi</h1>' }, { type: 'dom-exists', selector: 'h2' })
    expect(r.passed).toBe(false)
    expect(r.message).toBe('Não encontrei o elemento h2.')
  })
})

describe('dom-text', () => {
  it('compares trimmed text', async () => {
    const r = await one({ html: '<p class="a"> Olá </p>' }, { type: 'dom-text', selector: '.a', equals: 'Olá' })
    expect(r.passed).toBe(true)
  })
  it('fails on mismatch', async () => {
    const r = await one({ html: '<p class="a">x</p>' }, { type: 'dom-text', selector: '.a', equals: 'Olá' })
    expect(r.passed).toBe(false)
    expect(r.message).toBe('O texto de .a deveria ser "Olá".')
  })
})

describe('css-decl', () => {
  const t = { type: 'css-decl', selector: '.box', property: 'display', value: 'flex' }
  it('finds in css', async () => {
    expect((await one({ css: '.box { display: FLEX; }' }, t)).passed).toBe(true)
  })
  it('finds in <style>', async () => {
    expect((await one({ html: '<style>.box { display: FLEX; }</style>' }, t)).passed).toBe(true)
  })
  it('fails for other selector', async () => {
    const r = await one({ css: '.box { display: flex; }' }, { ...t, selector: '.caixa' })
    expect(r.passed).toBe(false)
    expect(r.message).toBe('Não encontrei "display: flex" em .caixa.')
  })
  it('findCssDeclaration tolerates invalid css', () => {
    expect(findCssDeclaration('.a { color: ', { selector: '.a', property: 'color', value: 'red' })).toBe(false)
  })
})

describe('js-equals', () => {
  it('evaluates function', async () => {
    const r = await one({ js: 'function soma(a,b){return a+b}' }, { type: 'js-equals', expression: 'soma(2,3)', equals: 5 })
    expect(r.passed).toBe(true)
  })
  it('deep equals arrays', async () => {
    const r = await one({ js: '' }, { type: 'js-equals', expression: '[1,2]', equals: [1, 2] })
    expect(r.passed).toBe(true)
  })
  it('fails on wrong value', async () => {
    const r = await one({ js: '' }, { type: 'js-equals', expression: '1+1', equals: 3 })
    expect(r.passed).toBe(false)
  })
  it('times out', async () => {
    const start = Date.now()
    const r = await one({ js: 'while(true){}' }, { type: 'js-equals', expression: '1', equals: 1 })
    expect(Date.now() - start).toBeLessThan(3000)
    expect(r.passed).toBe(false)
    expect(r.message).toBe('Seu código demorou demais (possível loop infinito).')
  })
  it('reports syntax error', async () => {
    const r = await one({ js: 'function (' }, { type: 'js-equals', expression: '1', equals: 1 })
    expect(r.passed).toBe(false)
    expect(r.message.startsWith('Erro no seu código:')).toBe(true)
  })
  it('reports runtime error', async () => {
    const r = await one({ js: 'throw new Error("boom")' }, { type: 'js-equals', expression: '1', equals: 1 })
    expect(r.message).toContain('Erro no seu código:')
    expect(r.message).toContain('boom')
  })
})

describe('gradeCode', () => {
  it('unknown type does not throw', async () => {
    const r = await one({}, { type: 'xyz' })
    expect(r).toEqual({ index: 0, passed: false, message: 'Tipo de teste desconhecido: xyz.' })
  })
  it('passed only if all pass and at least one test', async () => {
    expect((await gradeCode({}, [])).passed).toBe(false)
    const res = await gradeCode({ html: '<h1>a</h1>' }, [
      { type: 'dom-exists', selector: 'h1' },
      { type: 'dom-exists', selector: 'h2' },
    ])
    expect(res.passed).toBe(false)
    expect(res.results.map((x) => x.passed)).toEqual([true, false])
  })
})
