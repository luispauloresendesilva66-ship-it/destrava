// Aula 5: listas — prévia de <ul>/<ol> como o navegador mostra (marcadores padrão), linhas de código
// dos exemplos e pequenas ilustrações (bloco de notas, cartão de receita, barra de menu, tabela).
import React from 'react'
import { C, FONT, MONO } from '../../theme.js'
import { TXT, AvatarAna, Cake, CodeCard, LinkSpan, SpeechBubble, cardAt, cardSpan } from '../n1-a04/ana.jsx'

export { TXT, AvatarAna, Cake, CodeCard, LinkSpan, SpeechBubble, cardAt, cardSpan }

// ------------------------------------------------------------------ código dos exemplos
export const UL_COMPRAS = ['<ul>', '  <li>Arroz</li>', '  <li>Feijão</li>', '  <li>Café</li>', '</ul>']
export const PASSOS = ['Misture os ingredientes na caneca', 'Leve ao micro-ondas por três minutos', 'Espere esfriar e sirva']
export const PASSO_NOVO = 'Polvilhe açúcar por cima'

// ------------------------------------------------------------------ marcadores padrão do navegador
// depth 0: disco cheio · 1: círculo vazado · 2: quadradinho. ol: "1." "2." ...
const Marker = ({ type, depth, n, fs }) => {
  if (type === 'ol') return <span>{n}.</span>
  const d = fs * 0.3
  if (depth % 3 === 1) return <span style={{ width: d, height: d, borderRadius: '50%', border: `${Math.max(2, fs * 0.06)}px solid #1A1A1A`, boxSizing: 'border-box' }} />
  if (depth % 3 === 2) return <span style={{ width: d * 0.9, height: d * 0.9, background: '#1A1A1A' }} />
  return <span style={{ width: d, height: d, borderRadius: '50%', background: '#1A1A1A' }} />
}

// Lista como o navegador mostra. items: string | { t, op?, hl?, bad?, key?, sub?: { type, items } }.
// Itens com op <= 0 não ocupam espaço (ainda não foram digitados); a numeração conta só os visíveis.
export const ListView = ({ type = 'ul', items, fs = 34, depth = 0, style, markerOp = 1 }) => {
  let n = 0
  return (
    <div style={{ fontFamily: FONT, fontSize: fs, color: '#1A1A1A', lineHeight: 1.4, ...style }}>
      {items.map((raw, i) => {
        const it = typeof raw === 'string' ? { t: raw } : raw
        const op = it.op == null ? 1 : it.op
        if (op <= 0) return null
        n += 1
        const hl = it.hl || 0
        return (
          <div key={it.key || i} style={{ opacity: Math.min(1, op * 1.5), transform: `translateX(${(1 - Math.min(1, op)) * 16}px)` }}>
            <div style={{ display: 'flex', borderRadius: 8, background: it.bad ? 'rgba(217,83,79,0.16)' : hl ? `rgba(127,119,221,${0.3 * hl})` : 'transparent', boxShadow: 'none' }}>
              <span style={{ width: fs * 1.6, flexShrink: 0, height: fs * 1.4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: fs * 0.45, boxSizing: 'border-box', opacity: markerOp }}>
                <Marker type={type} depth={depth} n={n} fs={fs} />
              </span>
              <span>{it.t}</span>
            </div>
            {it.sub && <ListView {...it.sub} fs={fs} depth={depth + 1} style={{ marginLeft: fs * 1.6, ...(it.sub.style || {}) }} />}
          </div>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------------ ilustrações
// Bloco de notas com a lista de compras.
export const NotePad = ({ width = 330, items = ['arroz', 'feijão', 'café'] }) => (
  <div style={{ width, background: '#FFF8DC', borderRadius: 16, border: `4px solid ${C.purple}`, boxShadow: '0 16px 34px rgba(38,33,92,0.2)', padding: '0 0 18px', boxSizing: 'border-box', fontFamily: FONT, overflow: 'hidden' }}>
    <div style={{ height: 30, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 20px' }}>
      {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: C.lavender }} />)}
    </div>
    {items.map((t) => (
      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: width * 0.1, color: C.night, padding: '8px 24px 6px', borderBottom: '2px solid #EADFB4' }}>
        <span style={{ width: 12, height: 12, borderRadius: 6, background: C.night, flexShrink: 0 }} />{t}
      </div>
    ))}
  </div>
)

// Cartão de receita com os passos numerados.
export const RecipeCard = ({ width = 330 }) => (
  <div style={{ width, background: C.white, borderRadius: 16, border: `4px solid ${C.purple}`, boxShadow: '0 16px 34px rgba(38,33,92,0.2)', padding: '16px 22px', boxSizing: 'border-box', fontFamily: FONT }}>
    <div style={{ fontSize: width * 0.085, fontWeight: 700, color: C.night, marginBottom: 10 }}>Bolo de caneca</div>
    {[1, 2, 3].map((n, i) => (
      <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 19, background: C.purple, color: C.white, fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</div>
        <div style={{ height: 12, borderRadius: 6, background: '#D5D2F2', width: [170, 200, 140][i] }} />
      </div>
    ))}
  </div>
)

// Barra de menu de um site fictício. layout 0 = lado a lado, 1 = empilhado (com bolinhas).
export const MenuBar = ({ width = 860, items = ['Início', 'Projetos', 'Contato'], fs = 30, stack = 0, height }) => {
  const rowGap = fs * 1.5
  const xs = items.map((_, i) => items.slice(0, i).reduce((a, t) => a + t.length * fs * 0.56 + fs * 2.2, 0))
  const h = height || fs * 2.2 + stack * (rowGap * (items.length - 1))
  return (
    <div style={{ position: 'relative', width, height: h, background: C.lavender, borderRadius: 14, border: `3px solid ${C.purpleSoft}`, boxSizing: 'border-box', fontFamily: FONT, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: fs * 0.8, top: fs * 0.55, width: fs * 1.1, height: fs * 1.1, borderRadius: 8, background: C.purple, opacity: 1 - stack }} />
      {items.map((t, i) => {
        const x0 = fs * 2.8 + xs[i]
        const y0 = fs * 0.4
        const x1 = fs * 1.9
        const y1 = fs * 0.4 + i * rowGap
        return (
          <div key={t} style={{ position: 'absolute', left: x0 + (x1 - x0) * stack, top: y0 + (y1 - y0) * stack, display: 'flex', alignItems: 'center', fontSize: fs, lineHeight: `${fs * 1.4}px`, whiteSpace: 'nowrap' }}>
            <span style={{ position: 'absolute', left: -fs * 0.75, top: fs * 0.55, width: fs * 0.3, height: fs * 0.3, borderRadius: '50%', background: '#1A1A1A', opacity: stack }} />
            <LinkSpan>{t}</LinkSpan>
            {i < items.length - 1 && <span style={{ marginLeft: fs * 0.8, color: C.purpleSoft, opacity: 1 - stack }}>·</span>}
          </div>
        )
      })}
    </div>
  )
}

// Ícone genérico de tabela (próxima aula).
export const TableIcon = ({ size = 110, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={color} strokeWidth="4" />
    <rect x="12" y="14" width="40" height="36" rx="4" fill="none" stroke={color} strokeWidth="4" />
    <rect x="12" y="14" width="40" height="10" rx="3" fill={color} />
    <line x1="12" y1="37" x2="52" y2="37" stroke={color} strokeWidth="3" />
    <line x1="26" y1="24" x2="26" y2="50" stroke={color} strokeWidth="3" />
    <line x1="39" y1="24" x2="39" y2="50" stroke={color} strokeWidth="3" />
  </svg>
)

// Ícone de lista (bolinhas) e de lista numerada.
export const ListGlyph = ({ size = 80, ordered = false, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={color} strokeWidth="4" />
    {[18, 32, 46].map((y, i) => (
      <g key={y}>
        {ordered ? <text x="17" y={y + 5} textAnchor="middle" fontFamily={FONT} fontSize="15" fontWeight="700" fill={color}>{i + 1}</text> : <circle cx="17" cy={y} r="4" fill={color} />}
        <rect x="26" y={y - 3} width="24" height="6" rx="3" fill={color} />
      </g>
    ))}
  </svg>
)

// Monoespaçado em linha (para nomes de tag dentro de rótulos).
export const Tag = ({ children, color }) => <span style={{ fontFamily: MONO, color }}>{children}</span>
