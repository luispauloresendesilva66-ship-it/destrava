// A página "Sobre mim" da Ana: o código (por partes) e a prévia renderizada no navegador.
import React from 'react'
import { C, FONT } from '../../theme.js'
import { Brace } from '../../components/Teaching.jsx'

export const TXT = {
  h1: 'Olá, eu sou a Ana',
  h2a: 'Quem sou eu',
  p1: 'Trabalho no atendimento de uma loja e estou fazendo a minha transição para a área de tecnologia.',
  p2: 'Nas horas livres, gosto de cozinhar e de andar de bicicleta.',
  h2b: 'O que estou aprendendo',
  name: 'Ana Souza',
  city: 'Cidade Exemplo',
}

// Linhas do body, na ordem em que aparecem no arquivo final.
export const LINES = {
  bodyOpen: '<body>\n',
  h1: `  <h1>${TXT.h1}</h1>\n`,
  c1: '  <!-- Seção: apresentação -->\n',
  h2a: `  <h2>${TXT.h2a}</h2>\n`,
  p1: `  <p>${TXT.p1}</p>\n`,
  p2: `  <p>${TXT.p2}</p>\n`,
  c2: '  <!-- Seção: o que estou aprendendo -->\n',
  h2b: `  <h2>${TXT.h2b}</h2>\n`,
  p3: '  <p>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</p>\n',
  sig: `  <p>${TXT.name}<br>${TXT.city}</p>\n`,
  bodyClose: '</body>',
}
export const ORDER = ['bodyOpen', 'h1', 'c1', 'h2a', 'p1', 'p2', 'c2', 'h2b', 'p3', 'sig', 'bodyClose']

// present: chaves já existentes no arquivo; typing: { chave: [início, frames] } digitadas agora.
// A quebra de linha de uma linha digitada aparece logo no início, para o resto do arquivo descer antes.
export const bodySegments = (present, typing = {}) =>
  ORDER.filter((k) => present.includes(k) || typing[k]).flatMap((k) => {
    if (!typing[k]) return [{ text: LINES[k], start: 0, frames: 0 }]
    const [start, frames] = typing[k]
    const body = LINES[k].replace(/\n$/, '')
    return [{ text: body, start, frames }, ...(body !== LINES[k] ? [{ text: '\n', start, frames: 0 }] : [])]
  })

// Índice da linha lógica (0-based) de `key` dado o conjunto de linhas exibidas.
export const lineOf = (keys, key) => ORDER.filter((k) => keys.includes(k)).indexOf(key)

// Prévia renderizada. parts: chaves visíveis (h1, h2a, p1, p2, h2b, p3, sig). hl: chaves realçadas.
export const AnaPage = ({ parts = [], base = 20, hl = [], gapMark = 0, emph = 0, opacity = {} }) => {
  const has = (k) => parts.includes(k)
  const mark = (k) => (hl.includes(k) ? { background: `${C.purpleSoft}33`, boxShadow: `0 0 0 6px ${C.purpleSoft}33`, borderRadius: 6 } : {})
  const op = (k) => (opacity[k] == null ? 1 : opacity[k])
  const gap = base * 0.75
  const h = (k, size, text, mt) =>
    has(k) && <div style={{ fontSize: base * size, fontWeight: 700, lineHeight: 1.18, marginTop: mt, opacity: op(k), ...mark(k) }}>{text}</div>
  const p = (k, children, mt = gap) => has(k) && <div style={{ fontSize: base, lineHeight: 1.4, marginTop: mt, opacity: op(k), ...mark(k) }}>{children}</div>
  return (
    <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
      {h('h1', 2, TXT.h1, 0)}
      {h('h2a', 1.5, TXT.h2a, gap)}
      {p('p1', TXT.p1)}
      {has('p2') && (
        <div style={{ position: 'relative' }}>
          {gapMark > 0 && (
            <div style={{ position: 'absolute', left: -14, right: -14, top: -gap, height: gap, background: `${C.purpleSoft}55`, opacity: gapMark, borderRadius: 4 }}>
              <div style={{ position: 'absolute', right: -6, top: -10, opacity: gapMark }}><Brace height={gap + 20} width={30} /></div>
            </div>
          )}
          {p('p2', TXT.p2)}
        </div>
      )}
      {h('h2b', 1.5, TXT.h2b, gap)}
      {p(
        'p3',
        <>
          Estou aprendendo <strong style={{ background: emph ? `rgba(127,119,221,${0.45 * emph})` : 'none', borderRadius: 4 }}>HTML</strong> e estou gostando{' '}
          <em style={{ background: emph ? `rgba(255,210,138,${0.7 * emph})` : 'none', borderRadius: 4 }}>muito</em>.
        </>,
      )}
      {p(
        'sig',
        <>
          {TXT.name}
          <br />
          {TXT.city}
        </>,
      )}
    </div>
  )
}
