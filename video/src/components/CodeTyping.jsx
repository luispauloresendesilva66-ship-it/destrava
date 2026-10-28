import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { C, MONO } from '../theme.js'

// Cores de sintaxe sobre fundo escuro (verde fica reservado para sucesso).
export const SYN = {
  text: '#F4F3FF',
  punct: '#A9A4E8',
  tag: '#B3ADFF',
  attr: '#FFD28A',
  string: '#8FD3E8',
  doctype: '#9C97D6',
  comment: '#7A76A8',
}

// Atribui uma cor a cada caractere do HTML.
export function colorize(text) {
  const colors = new Array(text.length).fill(SYN.text)
  let i = 0
  const paint = (a, b, c) => { for (let k = a; k < b && k < text.length; k++) colors[k] = c }
  while (i < text.length) {
    if (text.startsWith('<!--', i)) {
      const end = text.indexOf('-->', i)
      const e = end < 0 ? text.length : end + 3
      paint(i, e, SYN.comment); i = e; continue
    }
    if (text.startsWith('<!', i)) {
      const end = text.indexOf('>', i)
      const e = end < 0 ? text.length : end + 1
      paint(i, e, SYN.doctype); i = e; continue
    }
    if (text[i] === '<') {
      let j = i + 1
      paint(i, j, SYN.punct)
      if (text[j] === '/') { paint(j, j + 1, SYN.punct); j++ }
      const nameStart = j
      while (j < text.length && /[A-Za-z0-9-]/.test(text[j])) j++
      paint(nameStart, j, SYN.tag)
      // dentro da tag: atributos / strings até '>'
      while (j < text.length && text[j] !== '>') {
        if (text[j] === '"') {
          const e = text.indexOf('"', j + 1)
          const end = e < 0 ? text.length : e + 1
          paint(j, end, SYN.string); j = end
        } else if (/[A-Za-z-]/.test(text[j])) {
          const s = j
          while (j < text.length && /[A-Za-z0-9-]/.test(text[j])) j++
          paint(s, j, SYN.attr)
        } else { paint(j, j + 1, SYN.punct); j++ }
      }
      if (j < text.length) { paint(j, j + 1, SYN.punct); j++ }
      i = j; continue
    }
    i++
  }
  return colors
}

/**
 * segments: [{ text, start, frames }] — cada trecho digita em `frames` a partir de `start`
 *   (frames = 0 aparece de uma vez). O trecho só ocupa espaço depois de digitado, como inserção num editor.
 * highlights: [{ text, at, until?, occurrence? }] — marca-texto num trecho do código final.
 * lineHighlights: [{ line, at, until? }] — destaca a linha inteira (0-based, linhas exibidas).
 * highlights[].color — cor própria do marca-texto (padrão: highlightColor).
 * wrap — quebra linhas longas dentro da largura (a linha lógica continua uma só: numeração e destaque).
 * markSpaces — espaços seguidos (2+) aparecem como pontinhos cinza.
 * numbers — numeração própria por linha exibida (trechos de um arquivo maior); padrão 1, 2, 3...
 */
export const CodeTyping = ({ segments, highlights = [], lineHighlights = [], fontSize = 40, width, lineNumbers = true, cursor = true, highlightColor = 'rgba(127,119,221,0.55)', lineColor = 'rgba(127,119,221,0.22)', wrap = false, markSpaces = false, numbers, style }) => {
  const frame = useCurrentFrame()
  const full = segments.map((s) => s.text).join('')
  const colors = colorize(full)

  const shown = new Array(full.length).fill(false)
  let offset = 0
  let cursorAfter = -1
  let cursorActive = false
  let bestStart = -1
  for (const seg of segments) {
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
    for (let o = 0; o <= (h.occurrence || 0); o++) idx = full.indexOf(h.text, idx + 1)
    if (idx < 0) continue
    for (let k = idx; k < idx + h.text.length; k++) marks[k] = h.color || highlightColor
  }

  // monta as linhas só com os caracteres já exibidos
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
    // espaço "extra": faz parte de uma sequência de 2+ espaços que não é a indentação do início da linha
    const extra = markSpaces && full[k] === ' ' && (full[k - 1] === ' ' || full[k + 1] === ' ') && /\S/.test(full.slice(full.lastIndexOf('\n', k) + 1, k))
    lines[lines.length - 1].push({ ch: extra ? '·' : full[k], c: extra ? '#8E8AB8' : colors[k], m: marks[k] })
    if (k === cursorAfter) cursorLine = lines.length - 1
  }
  const blink = Math.floor(frame / 15) % 2 === 0
  const lineH = fontSize * 1.5
  return (
    <div style={{ fontFamily: MONO, fontSize, lineHeight: `${lineH}px`, color: SYN.text, width, ...style }}>
      {lines.map((chars, li) => {
        const hl = lineHighlights.some((h) => li === h.line && frame >= h.at && (h.until == null || frame < h.until))
        const runs = []
        for (const x of chars) {
          const key = x.c + '|' + (x.m || '')
          const last = runs[runs.length - 1]
          if (last && last.key === key) last.t += x.ch
          else runs.push({ key, t: x.ch, c: x.c, m: x.m })
        }
        return (
          <div key={li} style={{ display: 'flex', [wrap ? 'minHeight' : 'height']: lineH, background: hl ? lineColor : 'transparent', boxShadow: hl ? `inset 6px 0 0 ${C.purpleSoft}` : 'none' }}>
            {lineNumbers && <span style={{ width: fontSize * 1.8, textAlign: 'right', paddingRight: fontSize * 0.7, color: '#6E69A8', flexShrink: 0 }}>{numbers && numbers[li] != null ? numbers[li] : li + 1}</span>}
            <span style={wrap ? { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', minWidth: 0 } : { whiteSpace: 'pre' }}>
              {runs.map((r, ri) => (
                <span key={ri} style={{ color: r.c, background: r.m || 'transparent' }}>{r.t}</span>
              ))}
              {cursor && cursorActive && cursorLine === li && blink && <span style={{ display: 'inline-block', width: fontSize * 0.12, height: fontSize * 1.1, background: C.lavender, verticalAlign: 'text-bottom', marginLeft: 2 }} />}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// Moldura de editor (barra de título + aba com nome do arquivo).
export const EditorWindow = ({ filename = 'index.html', width = 900, height = 600, children, style }) => (
  <div style={{ width, height, borderRadius: 18, background: C.nightDeep, overflow: 'hidden', boxShadow: '0 24px 60px rgba(27,23,68,0.45)', display: 'flex', flexDirection: 'column', border: `2px solid ${C.purple}`, ...style }}>
    <div style={{ background: '#16123A', display: 'flex', alignItems: 'flex-end', gap: 14, padding: '12px 16px 0' }}>
      <div style={{ display: 'flex', gap: 8, paddingBottom: 14 }}>
        {['#E87B7B', '#E8C47B', '#9CCF8A'].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
      </div>
      <div style={{ background: C.nightDeep, color: C.lavender, fontFamily: MONO, fontSize: 22, padding: '10px 24px', borderRadius: '10px 10px 0 0', borderTop: `3px solid ${C.purpleSoft}` }}>{filename}</div>
    </div>
    <div style={{ flex: 1, padding: '22px 14px', overflow: 'hidden' }}>{children}</div>
  </div>
)
