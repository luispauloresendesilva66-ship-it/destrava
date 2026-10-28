// Aula 3: a página da Ana ganhando links — linhas de código, prévias renderizadas e utilitários de posição.
import React from 'react'
import { C, FONT } from '../../theme.js'
import { TXT } from '../n1-a02/ana.jsx'

export { TXT }
export const URL_REC = 'https://receitas.example.com'
export const MAIL = 'ana@example.com'

// Linhas do body (numeração relativa ao <body>, como na Aula 2).
export const L = {
  bodyOpen: '<body>',
  h1: `  <h1>${TXT.h1}</h1>`,
  nav: '  <p><a href="#quem-sou">Quem sou eu</a> · <a href="#aprendendo">O que estou aprendendo</a></p>',
  c1: '  <!-- Seção: apresentação -->',
  h2a: `  <h2>${TXT.h2a}</h2>`,
  h2aId: `  <h2 id="quem-sou">${TXT.h2a}</h2>`,
  p1: `  <p>${TXT.p1}</p>`,
  p2: `  <p>${TXT.p2}</p>`,
  rec: `  <p>Veja as <a href="${URL_REC}">minhas receitas favoritas</a>.</p>`,
  c2: '  <!-- Seção: o que estou aprendendo -->',
  h2b: `  <h2>${TXT.h2b}</h2>`,
  h2bId: `  <h2 id="aprendendo">${TXT.h2b}</h2>`,
  p3: '  <p>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</p>',
  proj: '  <p>Conheça os <a href="projetos.html">meus projetos</a>.</p>',
  sig: `  <p>${TXT.name}<br>${TXT.city}</p>`,
  sigMail: `  <p>${TXT.name}<br>${TXT.city}<br><a href="mailto:${MAIL}">${MAIL}</a></p>`,
  bodyClose: '</body>',
}
const ORDER = ['bodyOpen', 'h1', 'nav', 'c1', 'h2a', 'p1', 'p2', 'rec', 'c2', 'h2b', 'p3', 'proj', 'sig', 'bodyClose']

// Número da linha de cada chave, dado o que já existe no arquivo (sem 'nav' antes do bloco 9, etc.).
export const lineNumbers = (present, shown) => {
  const ord = ORDER.filter((k) => present.includes(k))
  return shown.map((k) => ord.indexOf(k) + 1)
}
export const BEFORE_NAV = ORDER.filter((k) => k !== 'nav' && k !== 'proj')
export const WITH_PROJ = ORDER.filter((k) => k !== 'nav')
export const FULL = ORDER

// Segmentos estáticos (aparecem de uma vez) a partir de uma lista de textos.
export const staticSegs = (lines) => lines.map((t, i) => ({ text: t + (i < lines.length - 1 ? '\n' : ''), start: 0, frames: 0 }))

// ------------------------------------------------------------------ posição de um caractere no editor
// ed: { x, y, fs } — canto do EditorWindow e fontSize do CodeTyping (com numeração de linhas).
export const codeAt = (ed, line, col) => ({
  x: ed.x + 2 + 14 + ed.fs * 2.5 + col * ed.fs * 0.55,
  y: ed.y + 87 + line * ed.fs * 1.5 + ed.fs * 0.75,
})
export const colOf = (text, sub, occ = 0) => {
  let i = -1
  for (let k = 0; k <= occ; k++) i = text.indexOf(sub, i + 1)
  return i
}
// centro horizontal / base de um trecho `sub` da linha `text`
export const spanAt = (ed, line, text, sub, occ = 0) => {
  const c = colOf(text, sub, occ)
  const a = codeAt(ed, line, c)
  const b = codeAt(ed, line, c + sub.length)
  return { x: (a.x + b.x) / 2, x0: a.x, x1: b.x, top: a.y - ed.fs * 0.7, bottom: a.y + ed.fs * 0.7, y: a.y }
}

// ------------------------------------------------------------------ prévias
export const LinkText = ({ children, k, cursor, sel = 0, hover = false }) => (
  <span style={{ position: 'relative', color: C.link, textDecoration: 'underline', textDecorationThickness: 2, textUnderlineOffset: 4, background: sel ? `rgba(127,119,221,${0.45 * sel})` : hover ? 'rgba(47,91,211,0.12)' : 'transparent', borderRadius: 4 }}>
    {children}
    {cursor && cursor.key === k && cursor.node}
  </span>
)

// parts: chaves visíveis — h1, nav, h2a, p1, p2, rec, h2b, p3, proj, sig, mail.
// cursor: { key, node } coloca o <Cursor> dentro do link `key`. flash: { key: 0..1 } realce piscando.
export const AnaPage3 = ({ parts = [], base = 20, cursor, flash = {}, sel = 0, recText = 'minhas receitas favoritas' }) => {
  const has = (k) => parts.includes(k)
  const gap = base * 0.75
  const fl = (k) => (flash[k] ? { background: `rgba(127,119,221,${0.5 * flash[k]})`, boxShadow: `0 0 0 8px rgba(127,119,221,${0.5 * flash[k]})`, borderRadius: 6 } : {})
  const H = (k, size, text, mt) => has(k) && <div style={{ fontSize: base * size, fontWeight: 700, lineHeight: 1.18, marginTop: mt, ...fl(k) }}>{text}</div>
  const P = (k, children, mt = gap) => has(k) && <div style={{ fontSize: base, lineHeight: 1.4, marginTop: mt, ...fl(k) }}>{children}</div>
  return (
    <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
      {H('h1', 2, TXT.h1, 0)}
      {P('nav', <><LinkText k="nav1" cursor={cursor}>Quem sou eu</LinkText> · <LinkText k="nav2" cursor={cursor}>O que estou aprendendo</LinkText></>)}
      {H('h2a', 1.5, TXT.h2a, gap)}
      {P('p1', TXT.p1)}
      {P('p2', TXT.p2)}
      {P('rec', <>Veja as <LinkText k="rec" cursor={cursor}>{recText}</LinkText>.</>)}
      {H('h2b', 1.5, TXT.h2b, gap)}
      {P('p3', <>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</>)}
      {P('proj', <>Conheça os <LinkText k="proj" cursor={cursor}>meus projetos</LinkText>.</>)}
      {P('sig', <>{TXT.name}<br />{TXT.city}{has('mail') && <><br /><LinkText k="mail" cursor={cursor} sel={sel}>{MAIL}</LinkText></>}</>)}
    </div>
  )
}

export const ProjetosPage = ({ base = 22, back = true, cursor }) => (
  <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
    <div style={{ fontSize: base * 2, fontWeight: 700, lineHeight: 1.18 }}>Meus projetos</div>
    {back && <div style={{ fontSize: base, marginTop: base * 0.75 }}><LinkText k="back" cursor={cursor}>Voltar para a página inicial</LinkText></div>}
  </div>
)

// Site fictício de receitas (endereço reservado example.com).
export const ReceitasPage = ({ base = 20 }) => (
  <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
    <div style={{ fontSize: base * 1.8, fontWeight: 700, color: C.night }}>Receitas de casa</div>
    <div style={{ display: 'flex', gap: base, marginTop: base }}>
      {['Bolo de cenoura', 'Sopa de legumes', 'Pão caseiro'].map((t) => (
        <div key={t} style={{ flex: 1, borderRadius: 12, border: `2px solid ${C.purpleSoft}`, overflow: 'hidden' }}>
          <div style={{ height: base * 4, background: C.lavender }} />
          <div style={{ padding: base * 0.5, fontSize: base * 0.9, fontWeight: 600 }}>{t}</div>
        </div>
      ))}
    </div>
  </div>
)
