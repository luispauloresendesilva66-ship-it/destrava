// Recursos visuais genéricos para explicar conceitos de HTML (Aula 2 em diante).
import React from 'react'
import { useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../theme.js'
import { SYN, colorize } from './CodeTyping.jsx'
import { clamp01 } from '../lib/sync.js'

// ------------------------------------------------------------------ Árvore de títulos
// root: { tag, text, at, dashed?, children: [...] }. Desenha a hierarquia de cima para baixo.
// Cada nó aparece em `at` (frames locais); as linhas crescem do pai até o filho.
export const HeadingTree = ({ root, width = 720, rowGap = 190, nodeW = 300, fontSize = 30 }) => {
  const frame = useCurrentFrame()
  const placed = []
  const place = (node, depth, x0, x1, parent) => {
    const cx = (x0 + x1) / 2
    const me = { node, depth, cx, cy: 50 + depth * rowGap, parent }
    placed.push(me)
    const kids = node.children || []
    kids.forEach((k, i) => place(k, depth + 1, x0 + ((x1 - x0) * i) / kids.length, x0 + ((x1 - x0) * (i + 1)) / kids.length, me))
  }
  place(root, 0, 0, width, null)
  const height = 50 + Math.max(...placed.map((p) => p.depth)) * rowGap + 70
  return (
    <div style={{ position: 'relative', width, height, fontFamily: FONT }}>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {placed.filter((p) => p.parent).map((p, i) => {
          const g = clamp01((frame - p.node.at) / 14)
          const x1 = p.parent.cx
          const y1 = p.parent.cy + 44
          const x2 = x1 + (p.cx - x1) * g
          const y2 = y1 + (p.cy - 44 - y1) * g
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.purple} strokeWidth="6" strokeLinecap="round" strokeDasharray={p.node.dashed ? '12 12' : 'none'} opacity={g > 0 ? 1 : 0} />
        })}
      </svg>
      {placed.map((p, i) => {
        const g = clamp01((frame - p.node.at - (p.parent ? 8 : 0)) / 12)
        const top = p.depth === 0
        return (
          <div key={i} style={{ position: 'absolute', left: p.cx - nodeW / 2, top: p.cy - 44, width: nodeW, height: 88, opacity: g * (p.node.dashed ? 0.75 : 1), transform: `scale(${0.85 + 0.15 * g})`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', boxSizing: 'border-box', borderRadius: 18, background: top ? C.purple : C.white, border: `4px ${p.node.dashed ? 'dashed' : 'solid'} ${top ? C.night : C.purple}`, boxShadow: '0 10px 26px rgba(38,33,92,0.18)' }}>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: fontSize * 1.05, color: top ? C.lavender : C.purple, flexShrink: 0 }}>{p.node.tag}</span>
            <span style={{ fontSize, fontWeight: 600, color: top ? C.white : C.night, lineHeight: 1.1 }}>{p.node.text}</span>
          </div>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------------ Livro (capa → capítulos → seções)
// open: 0 (fechado, capa à mostra) .. 1 (aberto). hl: 'capa' | 'capitulos' | 'secoes' realça a parte.
export const Book = ({ open = 0, hl, width = 900, title = 'Título do livro' }) => {
  const h = width * 0.62
  const half = width / 2
  const coverScale = open < 0.5 ? 1 - open * 2 : 0
  const pagesOp = clamp01((open - 0.4) * 4)
  const tint = (part) => (hl === part ? C.purpleSoft : 'transparent')
  const Page = ({ chapter, x }) => (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="0" width={half} height={h} fill={C.white} stroke={C.purpleSoft} strokeWidth="4" />
      <rect x="40" y="46" width={half - 80} height="62" rx="10" fill={tint('capitulos')} opacity="0.45" />
      <text x="56" y="92" fontFamily={FONT} fontSize="40" fontWeight="700" fill={C.night}>{`Capítulo ${chapter}`}</text>
      {[0, 1].map((s) => (
        <g key={s} transform={`translate(0 ${140 + s * 130})`}>
          <rect x="40" y="0" width={half - 80} height="46" rx="8" fill={tint('secoes')} opacity="0.45" />
          <text x="56" y="34" fontFamily={FONT} fontSize="30" fontWeight="600" fill={C.purple}>{`Seção ${chapter}.${s + 1}`}</text>
          {[0, 1].map((l) => <rect key={l} x="56" y={62 + l * 26} width={half - 120 - l * 60} height="12" rx="6" fill="#DAD7F5" />)}
        </g>
      ))}
    </g>
  )
  return (
    <svg width={width} height={h + 20} viewBox={`0 0 ${width} ${h + 20}`} style={{ overflow: 'visible', filter: 'drop-shadow(0 18px 30px rgba(38,33,92,0.25))' }}>
      <g opacity={pagesOp}>
        <Page chapter={1} x={0} />
        <Page chapter={2} x={half} />
        <line x1={half} y1="0" x2={half} y2={h} stroke={C.purple} strokeWidth="6" />
      </g>
      {coverScale > 0 && (
        <g transform={`translate(${half} 0) scale(${coverScale} 1)`}>
          <rect x="0" y="0" width={half} height={h} rx="14" fill={C.purple} stroke={C.night} strokeWidth="6" />
          <rect x="0" y="0" width="26" height={h} fill={C.night} />
          <rect x="60" y={h * 0.3} width={half - 110} height="110" rx="14" fill={hl === 'capa' ? C.purpleSoft : C.night} stroke={C.lavender} strokeWidth="4" />
          <text x={half / 2 + 8} y={h * 0.3 + 70} textAnchor="middle" fontFamily={FONT} fontSize="40" fontWeight="700" fill={C.white}>{title}</text>
        </g>
      )}
    </svg>
  )
}

// ------------------------------------------------------------------ Espaços que "encolhem"
// text: frase com espaços seguidos e quebras de linha (\n). progress 0..1: as sobras encolhem até sobrar um espaço.
export const WhitespaceCollapse = ({ text, progress = 0, fontSize = 64 }) => {
  const p = clamp01(progress)
  const tokens = text.match(/[^\s]+|\s+/g) || []
  const unitW = fontSize * 0.55
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize, color: C.night, fontWeight: 600, height: fontSize * 1.5 }}>
      {tokens.map((tk, i) => {
        if (/\S/.test(tk)) return <span key={i} style={{ whiteSpace: 'pre' }}>{tk}</span>
        const units = tk.split('')
        return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {units.map((u, k) => {
              const keep = k === 0
              const w = keep ? unitW : unitW * (1 - p)
              return (
                <span key={k} style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: w, overflow: 'hidden', opacity: keep ? 1 : 1 - p, height: fontSize * 1.2 }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: unitW * 0.82, height: fontSize * 0.9, borderRadius: 8, background: keep && p >= 1 ? 'transparent' : '#DDDAF6', color: '#8E8AB8', fontSize: fontSize * 0.6, flexShrink: 0 }}>
                    {u === '\n' ? '↵' : '·'}
                  </span>
                </span>
              )
            })}
          </span>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------------ Pares de abertura/fechamento
// code: linha de HTML. pairs: [{ open, close, color }] (texto da tag; occurrence opcional em openOcc/closeOcc).
// Desenha arcos com seta ligando cada abertura ao seu fechamento (acima do código).
export const TagPairs = ({ code, pairs, fontSize = 80, progress = 1 }) => {
  const cw = fontSize * 0.55
  const colors = colorize(code)
  const find = (t) => code.indexOf(t)
  const arcs = pairs.map((pr) => {
    const a = find(pr.open)
    const b = code.indexOf(pr.close, a + pr.open.length)
    const x1 = (a + pr.open.length / 2) * cw
    const x2 = (b + pr.close.length / 2) * cw
    return { ...pr, x1, x2, span: x2 - x1 }
  })
  const arcH = (span) => 50 + span * 0.12
  const top = Math.max(...arcs.map((a) => arcH(a.span))) + 40
  const width = code.length * cw
  return (
    <div style={{ position: 'relative', width, paddingTop: top }}>
      <svg width={width} height={top} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        {arcs.map((a, i) => {
          const hgt = arcH(a.span)
          const d = `M${a.x1} ${top - 6} C${a.x1} ${top - 6 - hgt * 1.33}, ${a.x2} ${top - 6 - hgt * 1.33}, ${a.x2} ${top - 6}`
          const len = a.span * 1.9 + hgt * 2
          const p = clamp01(progress * pairs.length - i)
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={a.color} strokeWidth="9" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
              <polygon points={`${a.x2 - 16},${top - 34} ${a.x2 + 16},${top - 34} ${a.x2},${top - 4}`} fill={a.color} opacity={p >= 1 ? 1 : 0} />
            </g>
          )
        })}
      </svg>
      <div style={{ fontFamily: MONO, fontSize, whiteSpace: 'pre', lineHeight: 1.3 }}>
        {code.split('').map((ch, i) => {
          const pr = arcs.find((a) => (i >= find(a.open) && i < find(a.open) + a.open.length) || (i >= code.indexOf(a.close, find(a.open) + a.open.length) && i < code.indexOf(a.close, find(a.open) + a.open.length) + a.close.length))
          return <span key={i} style={{ color: colors[i], borderBottom: pr ? `6px solid ${pr.color}` : 'none' }}>{ch}</span>
        })}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Caixa pequena dentro da grande
// smallIn 0..1 (a caixa pequena entra), smallClosed / bigClosed 0..1 (tampa descendo até fechar).
export const NestedBoxes = ({ smallIn = 1, smallClosed = 0, bigClosed = 0, bigLabel = 'strong', smallLabel = 'em', width = 620 }) => {
  const k = width / 620
  const lid = (x, y, w, t, color) => (
    <g transform={`translate(${x} ${y - 110 * (1 - clamp01(t))})`} opacity={clamp01(t * 1.5)}>
      <rect x="0" y="-18" width={w} height="22" rx="6" fill={color} stroke={C.night} strokeWidth="5" />
    </g>
  )
  const sy = 150 + (1 - clamp01(smallIn)) * -260
  return (
    <svg width={width} height={460 * k} viewBox="0 0 620 460" style={{ overflow: 'visible' }}>
      {/* caixa grande */}
      <rect x="60" y="110" width="500" height="320" rx="10" fill="#DDDAF6" stroke={C.night} strokeWidth="6" />
      <text x="310" y="410" textAnchor="middle" fontFamily={MONO} fontSize="40" fontWeight="700" fill={C.purple}>{bigLabel}</text>
      {/* caixa pequena */}
      <g opacity={clamp01(smallIn * 3)} transform={`translate(0 ${sy - 150})`}>
        <rect x="200" y="190" width="220" height="160" rx="8" fill={C.white} stroke={C.purple} strokeWidth="6" />
        <text x="310" y="300" textAnchor="middle" fontFamily={MONO} fontSize="40" fontWeight="700" fill={C.purple}>{smallLabel}</text>
        {lid(200, 190, 220, smallClosed, C.purpleSoft)}
      </g>
      {lid(60, 110, 500, bigClosed, C.purple)}
    </svg>
  )
}

// ------------------------------------------------------------------ Leitor de tela: onda sonora por palavra
// words: [{ t, strong }] — palavras com ênfase ganham ondas mais altas.
export const SpeechWave = ({ words, fontSize = 34, active = true }) => {
  const frame = useCurrentFrame()
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, fontFamily: FONT }}>
      <svg width="86" height="86" viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
        <path d="M8 24 H20 L34 12 V52 L20 40 H8 Z" fill={C.purple} stroke={C.night} strokeWidth="3" strokeLinejoin="round" />
        <path d="M42 22 Q50 32 42 42 M48 16 Q60 32 48 48" fill="none" stroke={C.purple} strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', columnGap: fontSize * 0.32 }}>
        {words.map((w, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 70 }}>
              {Array.from({ length: Math.max(2, Math.round(w.t.length / 1.6)) }).map((_, b) => {
                const base = w.strong ? 46 : 14
                const amp = w.strong ? 20 : 6
                const hgt = active ? base + amp * (0.5 + 0.5 * Math.sin(frame / 3 + b * 1.7 + i)) : 6
                return <div key={b} style={{ width: 6, height: hgt, borderRadius: 3, background: w.strong ? C.purple : C.purpleSoft, opacity: w.strong ? 1 : 0.6 }} />
              })}
            </div>
            <div style={{ fontSize, color: C.night, fontWeight: w.strong === 'b' ? 700 : 400, fontStyle: w.strong === 'i' ? 'italic' : 'normal', marginTop: 6 }}>{w.t}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Chave vertical "}"
export const Brace = ({ height = 120, color = C.purple, width = 40, flip = false }) => (
  <svg width={width} height={height} viewBox={`0 0 40 ${height}`} style={{ transform: flip ? 'scaleX(-1)' : 'none', overflow: 'visible' }}>
    <path d={`M4 4 Q20 4 20 20 V${height / 2 - 14} Q20 ${height / 2} 36 ${height / 2} Q20 ${height / 2} 20 ${height / 2 + 14} V${height - 20} Q20 ${height - 4} 4 ${height - 4}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ------------------------------------------------------------------ Ícones de link e imagem
export const LinkIcon = ({ size = 120, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={color} strokeWidth="4" />
    <path d="M28 36 L36 28 M24 30 L19 35 A6 6 0 0 0 29 45 L34 40 M40 34 L45 29 A6 6 0 0 0 35 19 L30 24" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
  </svg>
)
export const ImageIcon = ({ size = 120, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={color} strokeWidth="4" />
    <rect x="12" y="15" width="40" height="34" rx="5" fill="none" stroke={color} strokeWidth="4" />
    <circle cx="24" cy="26" r="4" fill={color} />
    <path d="M14 46 L26 34 L34 41 L40 35 L50 46 Z" fill={color} />
  </svg>
)

export { SYN }
