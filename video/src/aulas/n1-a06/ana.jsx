// Aula 6: tabelas — prévia de <table> como o navegador mostra (uma <table> de verdade, com uma grade
// clarinha para dar para ver as células), cartõezinhos do dia a dia, a página antiga "em tabela" e ícones.
import React from 'react'
import { C, FONT, MONO } from '../../theme.js'
import { TXT, AvatarAna, CodeCard, LinkSpan, SpeechBubble, cardAt, cardSpan } from '../n1-a04/ana.jsx'
import { ListView, NotePad, TableIcon, Tag } from '../n1-a05/ana.jsx'

export { TXT, AvatarAna, CodeCard, LinkSpan, SpeechBubble, cardAt, cardSpan, ListView, NotePad, TableIcon, Tag }

// ------------------------------------------------------------------ dados do exemplo
export const CAPTION = 'Horário de estudos da semana'
export const HEAD3 = ['Dia', 'Horário', 'Assunto']
export const ROWS3 = [
  ['Segunda', '19h às 20h', 'HTML'],
  ['Quarta', '19h às 20h', 'CSS'],
  ['Sábado', '9h às 11h', 'Projeto da página pessoal'],
]
export const H2_ROTINA = 'Minha rotina de estudos'

const GRID = '#CFCBEF'

// ------------------------------------------------------------------ tabela como o navegador mostra
// head: [string | { t, op?, tag? }] (linha de <th>); headAsTd: a mesma linha, mas como <td> (sem negrito).
// rows: [{ cells: [string | { t, th?, op?, hl?, bad? }], op?, hl?, bad?, after?, key? }]
// Linha ou célula com op <= 0 não existe (ainda não foi digitada) — uma célula a menos vira um buraco.
// colW / rowH: larguras e altura fixas (px) para posicionar coisas por cima das células.
// colHl: índice da coluna destacada (colHlOp 0..1). after: nó ao lado da linha (fora da grade).
export const TableView = ({ caption, capOp = 1, capHl = 0, head, headOp = 1, headAsTd = false, rows = [], fs = 30, colHl = -1, colHlOp = 0, cellHl, colW, rowH, style, tableStyle, dim = 0 }) => {
  const pad = `${fs * 0.32}px ${fs * 0.6}px`
  const cellStyle = (ci, extra = {}) => ({
    border: `2px solid ${GRID}`,
    padding: pad,
    whiteSpace: 'nowrap',
    ...(colW ? { width: colW[ci], minWidth: colW[ci], maxWidth: colW[ci], boxSizing: 'border-box' } : {}),
    ...(rowH ? { height: rowH, boxSizing: 'border-box' } : {}),
    background: ci === colHl && colHlOp > 0 ? `rgba(127,119,221,${0.32 * colHlOp})` : 'transparent',
    ...extra,
  })
  const norm = (c) => (typeof c === 'string' ? { t: c } : c)
  const opOf = (o) => (o == null ? 1 : o)
  const renderCell = (raw, ci, isTh, last, after) => {
    const c = norm(raw)
    const op = opOf(c.op)
    if (op <= 0) return null
    const th = isTh || c.th
    const bg = c.bad ? 'rgba(217,83,79,0.2)' : c.hl ? `rgba(151,196,89,${0.45 * c.hl})` : cellHl && cellHl(ci, c) ? cellHl(ci, c) : null
    const Tagn = th ? 'th' : 'td'
    return (
      <Tagn key={ci} style={cellStyle(ci, { fontWeight: th ? 700 : 400, textAlign: th ? 'center' : 'left', position: 'relative', ...(bg ? { background: bg } : {}) })}>
        <span style={{ opacity: Math.min(1, op * 1.4) }}>{c.t}</span>
        {c.tag && (
          <div style={{ position: 'absolute', left: '50%', bottom: '100%', marginBottom: fs * 0.3, transform: 'translateX(-50%)', opacity: c.tagOp == null ? 1 : c.tagOp, whiteSpace: 'nowrap' }}>{c.tag}</div>
        )}
        {last && after && <div style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: fs * 0.7, whiteSpace: 'nowrap', fontWeight: 400 }}>{after}</div>}
      </Tagn>
    )
  }
  const lastIdx = (cells) => {
    let k = -1
    cells.forEach((c, i) => { if (opOf(norm(c).op) > 0) k = i })
    return k
  }
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <table style={{ borderCollapse: 'collapse', fontFamily: FONT, fontSize: fs, color: '#1A1A1A', lineHeight: 1.3, ...tableStyle }}>
        {caption && capOp > 0 && (
          <caption style={{ captionSide: 'top', textAlign: 'center', paddingBottom: fs * 0.3, opacity: Math.min(1, capOp * 1.4), whiteSpace: 'nowrap' }}>
            <span style={{ background: capHl ? `rgba(127,119,221,${0.35 * capHl})` : 'transparent', borderRadius: 6, padding: '0 6px' }}>{caption}</span>
          </caption>
        )}
        <tbody>
          {head && headOp > 0 && (
            <tr style={{ opacity: Math.min(1, headOp * 1.4) }}>{head.map((h, ci) => renderCell(h, ci, !headAsTd, false))}</tr>
          )}
          {rows.map((r, ri) => {
            const op = opOf(r.op)
            if (op <= 0) return null
            const li = lastIdx(r.cells)
            return (
              <tr key={r.key || ri} style={{ opacity: Math.min(1, op * 1.4), background: r.bad ? 'rgba(217,83,79,0.16)' : r.hl ? `rgba(127,119,221,${0.25 * r.hl})` : 'transparent' }}>
                {r.cells.map((c, ci) => renderCell(c, ci, false, ci === li, r.after))}
              </tr>
            )
          })}
        </tbody>
      </table>
      {dim > 0 && <div style={{ position: 'absolute', inset: -12, background: C.nightDeep, opacity: dim, borderRadius: 10 }} />}
    </div>
  )
}

// ------------------------------------------------------------------ cartõezinhos do dia a dia (Bloco 1)
const MiniCard = ({ width, title, children }) => (
  <div style={{ width, background: C.white, borderRadius: 16, border: `4px solid ${C.purple}`, boxShadow: '0 16px 34px rgba(38,33,92,0.2)', padding: '10px 18px 12px', boxSizing: 'border-box', fontFamily: FONT }}>
    <div style={{ fontSize: 22, fontWeight: 700, color: C.night, marginBottom: 6 }}>{title}</div>
    {children}
  </div>
)
const miniTable = (head, rows, fs = 17) => (
  <table style={{ borderCollapse: 'collapse', fontFamily: FONT, fontSize: fs, color: '#1A1A1A', width: '100%' }}>
    <tbody>
      <tr>{head.map((h) => <th key={h} style={{ border: `2px solid ${GRID}`, padding: '2px 8px', background: C.lavender }}>{h}</th>)}</tr>
      {rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ border: `2px solid ${GRID}`, padding: '2px 8px', textAlign: j ? 'right' : 'left' }}>{c}</td>)}</tr>)}
    </tbody>
  </table>
)
export const BoletimCard = ({ width = 330 }) => (
  <MiniCard width={width} title="Boletim">{miniTable(['Matéria', 'Nota'], [['Português', '8,5'], ['Matemática', '9,0'], ['Ciências', '7,5']])}</MiniCard>
)
export const PrecosCard = ({ width = 330 }) => (
  <MiniCard width={width} title="Tabela de preços">{miniTable(['Item', 'Preço'], [['Café', 'R$ 5,00'], ['Pão de queijo', 'R$ 4,00'], ['Bolo', 'R$ 6,00']])}</MiniCard>
)
export const HorarioCard = ({ width = 330 }) => {
  const days = ['Seg', 'Ter', 'Qua', 'Qui']
  const on = [[1, 0, 1, 0], [0, 1, 0, 1], [1, 1, 0, 0]]
  const cols = ['#7F77DD', '#97C459', '#E8B860']
  return (
    <MiniCard width={width} title="Horário da semana">
      <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: FONT, fontSize: 17 }}>
        <tbody>
          <tr>{days.map((d) => <th key={d} style={{ border: `2px solid ${GRID}`, padding: '2px 4px', background: C.lavender }}>{d}</th>)}</tr>
          {on.map((r, i) => (
            <tr key={i}>{r.map((v, j) => <td key={j} style={{ border: `2px solid ${GRID}`, height: 20, padding: 3 }}>{v ? <div style={{ height: 14, borderRadius: 4, background: cols[i] }} /> : null}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </MiniCard>
  )
}

// ------------------------------------------------------------------ página antiga montada com tabela (Blocos 2 e 9)
// cells 0..1: as linhas tracejadas das células aparecem. bad 0..1: tinge de vermelho.
export const OldLayout = ({ width = 620, cells = 1, bad = 0 }) => {
  const h = width * 0.62
  const dash = { position: 'absolute', border: `3px dashed ${C.red}`, opacity: cells, borderRadius: 4 }
  return (
    <div style={{ position: 'relative', width, height: h, background: '#FBF7EC', border: `4px solid ${C.purpleSoft}`, borderRadius: 14, boxSizing: 'border-box', overflow: 'hidden', fontFamily: FONT, boxShadow: '0 16px 34px rgba(38,33,92,0.18)' }}>
      {/* topo */}
      <div style={{ position: 'absolute', left: 14, top: 14, right: 14, height: h * 0.18, background: '#C9C5EE', borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 18, fontSize: width * 0.045, fontWeight: 700, color: C.night }}>Meu site</div>
      {/* menu à esquerda */}
      <div style={{ position: 'absolute', left: 14, top: h * 0.18 + 28, width: width * 0.26, bottom: 14, background: '#E6E3FA', borderRadius: 6, padding: '10px 12px', boxSizing: 'border-box' }}>
        {['Início', 'Fotos', 'Contato'].map((t) => <div key={t} style={{ fontSize: width * 0.034, color: C.link, textDecoration: 'underline', marginBottom: 8 }}>{t}</div>)}
      </div>
      {/* texto */}
      <div style={{ position: 'absolute', left: width * 0.26 + 28, top: h * 0.18 + 28, right: 14, bottom: 14, padding: '12px 10px', boxSizing: 'border-box' }}>
        {[96, 88, 92, 70, 84].map((w, i) => <div key={i} style={{ height: width * 0.02, width: `${w}%`, background: '#D5D2F2', borderRadius: 6, marginBottom: width * 0.022 }} />)}
      </div>
      {/* células tracejadas */}
      <div style={{ ...dash, left: 8, top: 8, right: 8, height: h * 0.18 + 12 }} />
      <div style={{ ...dash, left: 8, top: h * 0.18 + 22, width: width * 0.26 + 12, bottom: 8 }} />
      <div style={{ ...dash, left: width * 0.26 + 24, top: h * 0.18 + 22, right: 8, bottom: 8 }} />
      {bad > 0 && <div style={{ position: 'absolute', inset: 0, background: `rgba(217,83,79,${0.12 * bad})` }} />}
    </div>
  )
}

// ------------------------------------------------------------------ ícone de formulário (próxima aula)
export const FormIcon = ({ size = 110, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={color} strokeWidth="4" />
    <rect x="12" y="14" width="22" height="5" rx="2.5" fill={color} opacity="0.6" />
    <rect x="12" y="23" width="40" height="11" rx="3" fill="none" stroke={color} strokeWidth="3" />
    <rect x="12" y="41" width="22" height="11" rx="4" fill={color} />
  </svg>
)

// Monoespaçado com os sinais de tag.
export const T = ({ children, color }) => <span style={{ fontFamily: MONO, color }}>{children}</span>
