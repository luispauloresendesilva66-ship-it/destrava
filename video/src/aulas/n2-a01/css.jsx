// Nível 2, Aula 1: o CSS de verdade. Cores de sintaxe para CSS (sozinho ou dentro de <style>), o editor
// com abas (index.html / estilo.css, ou HTML / CSS no editor da Destrava), a página da Ana renderizada com
// o CSS aplicado DE VERDADE pelo navegador (as regras viram um <style> escopado à prévia) e ilustrações
// (rolo de tinta, cartões de nota).
import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { SYN, colorize } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { AvatarAna } from '../n1-a04/ana.jsx'

export { SYN }

// ------------------------------------------------------------------ cores de sintaxe
// Seletor = cor de tag, propriedade = cor de atributo, valor = cor de string, sinais = pontuação.
const paintCss = (text, colors, a, b) => {
  let i = a
  let inBlock = false
  while (i < b) {
    const ch = text[i]
    if (ch === '{') { colors[i] = SYN.punct; inBlock = true; i++; continue }
    if (ch === '}') { colors[i] = SYN.punct; inBlock = false; i++; continue }
    if (/\s/.test(ch)) { i++; continue }
    if (!inBlock) {
      while (i < b && text[i] !== '{' && text[i] !== '}') { if (!/\s/.test(text[i])) colors[i] = SYN.tag; i++ }
      continue
    }
    // dentro do bloco: propriedade : valor ;
    let j = i
    while (j < b && !/[:;{}\n]/.test(text[j])) { colors[j] = SYN.attr; j++ }
    if (text[j] === ':') {
      colors[j] = SYN.punct
      j++
      while (j < b && !/[;{}\n]/.test(text[j])) { colors[j] = SYN.string; j++ }
    }
    if (text[j] === ';') { colors[j] = SYN.punct; j++ }
    i = j
  }
}
export function colorizeAny(text, lang = 'html') {
  if (lang === 'css') {
    const colors = new Array(text.length).fill(SYN.text)
    paintCss(text, colors, 0, text.length)
    return colors
  }
  const colors = colorize(text)
  let k = 0
  while ((k = text.indexOf('<style>', k)) >= 0) {
    const a = k + 7
    const e = text.indexOf('</style>', a)
    const b = e < 0 ? text.length : e
    for (let q = a; q < b; q++) colors[q] = SYN.text
    paintCss(text, colors, a, b)
    k = b
  }
  // valor do atributo style="..." também em CSS
  let s = 0
  while ((s = text.indexOf('style="', s)) >= 0) {
    const a = s + 7
    const e = text.indexOf('"', a)
    if (e < 0) break
    const colors2 = new Array(text.length).fill(SYN.text)
    // propriedade e valor dentro das aspas
    let j = a
    while (j < e && text[j] !== ':') { colors2[j] = SYN.attr; j++ }
    for (let q = a; q < e; q++) colors[q] = colors2[q] === SYN.attr ? SYN.attr : SYN.string
    for (let q = a; q < e; q++) if (text[q] === ':' || text[q] === ';') colors[q] = SYN.punct
    s = e
  }
  return colors
}

// ------------------------------------------------------------------ código digitado (HTML ou CSS)
// Mesma geometria e API do CodeTyping (segments / highlights / lineHighlights), com lang 'html' | 'css'.
export const Code = ({ segments, text, lang = 'html', highlights = [], lineHighlights = [], fontSize = 40, width, lineNumbers = true, cursor = true, highlightColor = 'rgba(127,119,221,0.55)', lineColor = 'rgba(127,119,221,0.22)', numbers, dim = [], style }) => {
  const frame = useCurrentFrame()
  const segs = segments || [{ text, start: 0, frames: 0 }]
  const full = segs.map((s) => s.text).join('')
  const colors = colorizeAny(full, lang)
  const shown = new Array(full.length).fill(false)
  let offset = 0
  let cursorAfter = -1
  let cursorActive = false
  let bestStart = -1
  for (const seg of segs) {
    const n = seg.text.length
    const frac = seg.frames <= 0 ? (frame >= seg.start ? 1 : 0) : interpolate(frame, [seg.start, seg.start + seg.frames], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    const count = Math.floor(frac * n + 1e-6)
    for (let k = 0; k < count; k++) shown[offset + k] = true
    if (seg.frames > 0 && count > 0 && seg.start >= bestStart) {
      bestStart = seg.start
      cursorAfter = offset + count - 1
      cursorActive = frac < 1 || frame < seg.start + seg.frames + 25
    }
    offset += n
  }
  const marks = new Array(full.length).fill(null)
  for (const h of highlights) {
    if (frame < h.at || (h.until != null && frame >= h.until)) continue
    let idx = -1
    if (h.index != null) idx = h.index
    else for (let o = 0; o <= (h.occurrence || 0); o++) idx = full.indexOf(h.text, idx + 1)
    if (idx < 0) continue
    for (let k = idx; k < idx + h.text.length; k++) marks[k] = h.color || highlightColor
  }
  const lines = [[]]
  let cursorLine = -1
  for (let k = 0; k < full.length; k++) {
    if (!shown[k]) continue
    if (full[k] === '\n') {
      if (k === cursorAfter) cursorLine = lines.length - 1
      lines.push([])
      if (k === cursorAfter) cursorLine = lines.length - 1
      continue
    }
    lines[lines.length - 1].push({ ch: full[k], c: colors[k], m: marks[k] })
    if (k === cursorAfter) cursorLine = lines.length - 1
  }
  const blink = Math.floor(frame / 15) % 2 === 0
  const lineH = fontSize * 1.5
  return (
    <div style={{ fontFamily: MONO, fontSize, lineHeight: `${lineH}px`, color: SYN.text, width, ...style }}>
      {lines.map((chars, li) => {
        const hl = lineHighlights.some((h) => li === h.line && frame >= h.at && (h.until == null || frame < h.until))
        const dimOp = dim.find((d) => d.line === li)
        const runs = []
        for (const x of chars) {
          const key = x.c + '|' + (x.m || '')
          const last = runs[runs.length - 1]
          if (last && last.key === key) last.t += x.ch
          else runs.push({ key, t: x.ch, c: x.c, m: x.m })
        }
        return (
          <div key={li} style={{ display: 'flex', height: lineH, background: hl ? lineColor : 'transparent', boxShadow: hl ? `inset 6px 0 0 ${C.purpleSoft}` : 'none', opacity: dimOp ? dimOp.op : 1 }}>
            {lineNumbers && <span style={{ width: fontSize * 1.8, textAlign: 'right', paddingRight: fontSize * 0.7, color: '#6E69A8', flexShrink: 0 }}>{numbers && numbers[li] != null ? numbers[li] : li + 1}</span>}
            <span style={{ whiteSpace: 'pre' }}>
              {runs.map((r, ri) => <span key={ri} style={{ color: r.c, background: r.m || 'transparent', borderRadius: 4 }}>{r.t}</span>)}
              {cursor && cursorActive && cursorLine === li && blink && <span style={{ display: 'inline-block', width: fontSize * 0.12, height: fontSize * 1.1, background: C.lavender, verticalAlign: 'text-bottom', marginLeft: 2 }} />}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------------ editor com abas
// Mesma geometria do EditorWindow (o código começa no mesmo ponto: vale o edAt das aulas do nível 1).
// tabs: [{ name, active?, glow? (0..1), op? }]
export const EditorTabs = ({ tabs, width = 900, height = 600, children, style, mono = true }) => (
  <div style={{ width, height, borderRadius: 18, background: C.nightDeep, overflow: 'hidden', boxShadow: '0 24px 60px rgba(27,23,68,0.45)', display: 'flex', flexDirection: 'column', border: `2px solid ${C.purple}`, ...style }}>
    <div style={{ background: '#16123A', display: 'flex', alignItems: 'flex-end', gap: 8, padding: '12px 16px 0' }}>
      <div style={{ display: 'flex', gap: 8, paddingBottom: 14, marginRight: 6 }}>
        {['#E87B7B', '#E8C47B', '#9CCF8A'].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
      </div>
      {tabs.map((t) => (
        <div key={t.name} style={{ background: t.active ? C.nightDeep : '#211C50', color: t.active ? C.lavender : '#8E89C8', fontFamily: mono ? MONO : FONT, fontWeight: mono ? 400 : 700, fontSize: 22, padding: '10px 24px', borderRadius: '10px 10px 0 0', borderTop: `3px solid ${t.active ? C.purpleSoft : 'transparent'}`, opacity: t.op == null ? 1 : t.op, boxShadow: t.glow ? `0 0 ${26 * t.glow}px rgba(238,237,254,${0.7 * t.glow}), inset 0 0 0 ${3 * t.glow}px rgba(238,237,254,${0.9 * t.glow})` : 'none', whiteSpace: 'nowrap' }}>{t.name}</div>
      ))}
    </div>
    <div style={{ flex: 1, padding: '22px 14px', overflow: 'hidden', position: 'relative' }}>{children}</div>
  </div>
)

// ------------------------------------------------------------------ CSS aplicado de verdade
// As regras do aluno viram um <style> escopado ao id da prévia: "body" passa a ser o contêiner da página,
// e os outros seletores ficam "#id seletor". Antes delas, o estilo padrão do navegador para o "body".
export const scopeCss = (css, id) =>
  css.replace(/(^|\})(\s*)([^{}]+?)(\s*)\{/g, (m, a, s1, sel, s2) => {
    const scoped = sel.split(',').map((x) => {
      const t = x.trim()
      if (t === 'body' || t === 'html') return `#${id}`
      return `#${id} ${t}`
    }).join(', ')
    return `${a}${s1}${scoped}${s2}{`
  })

export const ANA = {
  title: 'Ana Souza, página pessoal',
  h1: 'Olá, eu sou a Ana',
  menu: ['Sobre mim', 'Meus projetos', 'Minha rotina', 'Fale comigo'],
  p: 'Trabalho no atendimento de uma loja e estou fazendo a minha transição para a tecnologia. Estou aprendendo ',
}

// Página da Ana (index.html) ou de projetos, com o CSS `css` aplicado. zoom: escala da prévia inteira
// (o 18px do CSS continua sendo 18px da página, só que ampliado para o vídeo).
// variant: 'index' | 'projetos' | 'tres' (h1 + três parágrafos iguais, Bloco 10) | 'mini' (h1 + p).
// 'inline': um parágrafo com o atributo style (Bloco 7).
export const PageCss = ({ id, css = '', zoom = 1.25, variant = 'index', flashP = -1, flashOp = 0, children }) => {
  const base = `#${id} { display: block; margin: 0; padding: 8px; min-height: 100%; box-sizing: border-box; color: #000; background-color: #fff; font-family: ${FONT}; font-size: 16px; line-height: normal; zoom: ${zoom}; }
#${id} h1, #${id} h2, #${id} p, #${id} ul { color: inherit; }`
  const rules = scopeCss(css, id)
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <style>{base + '\n' + rules}</style>
      <div id={id}>
        {variant === 'index' && (
          <>
            <h1>{ANA.h1}</h1>
            <nav>
              <ul>{ANA.menu.map((t) => <li key={t}><a href="#sobre" onClick={(e) => e.preventDefault()}>{t}</a></li>)}</ul>
            </nav>
            <h2>Sobre mim</h2>
            <p>{ANA.p}<strong>HTML</strong>.</p>
            <div style={{ width: 150, height: 150 }}><AvatarAna size={150} /></div>
          </>
        )}
        {variant === 'projetos' && (
          <>
            <h1>Meus projetos</h1>
            <p>Os projetos que eu fiz enquanto aprendo a programar.</p>
            <ul>
              <li><a href="#receitas">Minhas receitas favoritas</a></li>
              <li><a href="#pagina">A minha página pessoal</a></li>
            </ul>
            <p><a href="#inicio">Voltar para a página inicial</a></p>
          </>
        )}
        {variant === 'mini' && (
          <>
            <h1>{ANA.h1}</h1>
            <p>Estou aprendendo CSS.</p>
          </>
        )}
        {variant === 'inline' && (
          <>
            <h1>{ANA.h1}</h1>
            <p style={{ color: 'red' }}>Texto vermelho</p>
            <p>Este parágrafo não muda.</p>
          </>
        )}
        {variant === 'tres' && (
          <>
            <h1>{ANA.h1}</h1>
            {[0, 1, 2].map((i) => (
              <p key={i} style={i === flashP && flashOp > 0 ? { outline: `${3}px solid rgba(240,160,75,${flashOp})`, outlineOffset: 2, background: `rgba(255,210,138,${0.9 * flashOp})`, borderRadius: 4 } : undefined}>Estou aprendendo CSS e a página está ganhando cor.</p>
            ))}
          </>
        )}
        {children}
      </div>
    </div>
  )
}

// Prévia do navegador com a página real dentro.
export const Preview = ({ w = 800, h = 640, url = 'index.html', title = ANA.title, style, children }) => (
  <BrowserMock width={w} height={h} tabTitle={title} url={url} style={style}>
    <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
  </BrowserMock>
)

// ------------------------------------------------------------------ cartão de nota (rótulo com título)
export const Note = ({ head, body, color = C.purple, w = 420, op = 1, size = 30, style, align = 'left' }) => (
  <div style={{ width: w, opacity: op, transform: `translateY(${(1 - op) * 12}px)`, background: C.white, border: `4px solid ${color}`, borderRadius: 18, padding: '12px 20px', boxSizing: 'border-box', fontFamily: FONT, boxShadow: '0 12px 26px rgba(38,33,92,0.16)', textAlign: align, ...style }}>
    <div style={{ fontSize: size, fontWeight: 800, color, lineHeight: 1.15 }}>{head}</div>
    {body && <div style={{ fontSize: size * 0.85, fontWeight: 500, color: C.night, lineHeight: 1.2, marginTop: 4 }}>{body}</div>}
  </div>
)

// Trecho de código solto (fundo escuro), em uma ou mais linhas.
export const CodeChip = ({ text, lang = 'css', fs = 40, highlights, style, pad = '14px 26px', lineNumbers = false, children }) => (
  <div style={{ position: 'relative', display: 'inline-block', background: C.nightDeep, borderRadius: 18, padding: pad, border: `2px solid ${C.purple}`, boxShadow: '0 16px 36px rgba(27,23,68,0.35)', ...style }}>
    <Code text={text} lang={lang} fontSize={fs} lineNumbers={lineNumbers} highlights={highlights} cursor={false} />
    {children}
  </div>
)

// ------------------------------------------------------------------ rolo de tinta
export const PaintRoller = ({ size = 200, color = '#B9B2F5' }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" style={{ overflow: 'visible', filter: 'drop-shadow(0 8px 10px rgba(38,33,92,0.3))' }}>
    <rect x="8" y="6" width="74" height="28" rx="10" fill={color} stroke={C.night} strokeWidth="4" />
    <rect x="14" y="12" width="62" height="6" rx="3" fill="#FFFFFF" opacity="0.5" />
    <path d="M82 20 H92 V48 H50 V66" fill="none" stroke={C.night} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
    <rect x="42" y="64" width="16" height="50" rx="7" fill={C.purple} stroke={C.night} strokeWidth="4" />
  </svg>
)

// Paleta pequena de amostras (uma cor + o nome).
export const Swatch = ({ color, name, fs = 30, op = 1, style }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, opacity: op, background: C.white, border: `3px solid ${C.purpleSoft}`, borderRadius: 14, padding: '6px 16px 6px 8px', fontFamily: FONT, fontSize: fs, fontWeight: 700, color: C.night, ...style }}>
    <span style={{ width: fs * 1.2, height: fs * 1.2, borderRadius: 8, background: color, border: '2px solid rgba(38,33,92,0.3)' }} />
    {name}
  </div>
)
