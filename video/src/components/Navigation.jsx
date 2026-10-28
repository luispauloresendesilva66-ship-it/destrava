// Recursos genéricos de navegação (Aula 3 em diante): cursor do mouse, páginas que deslizam por cima,
// setas livres entre dois pontos da tela e a "teia" de páginas ligadas por links.
import React from 'react'
import { useCurrentFrame } from 'remotion'
import { C, FONT } from '../theme.js'
import { clamp01 } from '../lib/sync.js'

// ------------------------------------------------------------------ Cursor
// Ponta do cursor em (0,0) do elemento pai posicionado (left/top em %), deslocada por (dx, dy).
// hand: vira a mãozinha (passando por cima de um link). press 0..1: onda do clique.
export const Cursor = ({ dx = 0, dy = 0, hand = false, press = 0, left = '50%', top = '60%', size = 46, opacity = 1 }) => (
  <span style={{ position: 'absolute', left, top, width: 0, height: 0, transform: `translate(${dx}px, ${dy}px)`, zIndex: 20, pointerEvents: 'none', opacity }}>
    {press > 0 && press < 1 && (
      <span style={{ position: 'absolute', left: -size * 0.9 * press, top: -size * 0.9 * press, width: size * 1.8 * press, height: size * 1.8 * press, borderRadius: '50%', border: `4px solid ${C.purple}`, opacity: 1 - press }} />
    )}
    {hand ? (
      <svg width={size} height={size} viewBox="0 0 32 32" style={{ position: 'absolute', left: -size * 0.34, top: -size * 0.04, overflow: 'visible', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.3))' }}>
        <path d="M11 2 a2.4 2.4 0 0 1 4.8 0 V13 l0.4 -1.6 a2.3 2.3 0 0 1 4.4 0.6 V14 a2.3 2.3 0 0 1 4.4 0.4 V16 a2.3 2.3 0 0 1 4.4 0.6 V23 c0 5 -3.5 8.5 -8.5 8.5 h-2.4 c-3 0 -5 -1.4 -6.6 -3.6 L4.4 20.4 a2.3 2.3 0 0 1 3.4 -3 L11 20 Z" fill={C.white} stroke={C.night} strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width={size} height={size} viewBox="0 0 32 32" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.3))' }}>
        <path d="M2 2 L2 26 L8.5 20 L13 30 L17.5 28 L13 18.5 L22 18.5 Z" fill={C.white} stroke={C.night} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )}
  </span>
)

// Anima o cursor até o alvo e clica. Retorna as props do <Cursor> para o frame atual.
// arrive: frame em que chega ao alvo; click: frame do clique; from: deslocamento inicial.
export const cursorMotion = (frame, { arrive, click, from = [220, 160], travel = 22, leave = click == null ? null : click + 14 }) => {
  const p = clamp01((frame - (arrive - travel)) / travel)
  const e = 1 - Math.pow(1 - p, 3)
  return {
    dx: from[0] * (1 - e),
    dy: from[1] * (1 - e),
    hand: p >= 1,
    press: click == null ? 0 : clamp01((frame - click) / 14),
    opacity: clamp01((frame - (arrive - travel - 6)) / 6) * (leave == null ? 1 : 1 - clamp01((frame - leave) / 6)),
  }
}

// ------------------------------------------------------------------ Página que desliza por cima
// p 0..1: entra a partir de (dx, dy) (em px), com sombra e opacidade.
export const SlideIn = ({ p, dx = 0, dy = 60, children, style }) => {
  const e = 1 - Math.pow(1 - clamp01(p), 3)
  if (p <= 0) return null
  return <div style={{ position: 'absolute', transform: `translate(${dx * (1 - e)}px, ${dy * (1 - e)}px)`, opacity: clamp01(p * 2.5), ...style }}>{children}</div>
}

// ------------------------------------------------------------------ Seta livre (coordenadas da tela)
// Desenha de (x1,y1) até (x2,y2), curvando `bend` px para o lado. p 0..1 desenha aos poucos.
export const ArrowLine = ({ x1, y1, x2, y2, p = 1, bend = 0, color = C.purple, width = 7, dashed = false, head = true, opacity = 1 }) => {
  const mid = 'm' + React.useId().replace(/[^a-zA-Z0-9]/g, '')
  if (p <= 0 || opacity <= 0) return null
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const len = Math.hypot(x2 - x1, y2 - y1) || 1
  const nx = -(y2 - y1) / len
  const ny = (x2 - x1) / len
  const cx = mx + nx * bend
  const cy = my + ny * bend
  const d = `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`
  const L = len + Math.abs(bend) * 1.2
  const ang = (Math.atan2(y2 - cy, x2 - cx) * 180) / Math.PI
  const hs = width * 3.4
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none', opacity }}>
      {dashed ? (
        <>
          <mask id={mid}>
            <path d={d} fill="none" stroke="#fff" strokeWidth={width + 4} strokeDasharray={L} strokeDashoffset={L * (1 - clamp01(p))} />
          </mask>
          <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray="14 12" mask={`url(#${mid})`} />
        </>
      ) : (
        <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - clamp01(p))} />
      )}
      {head && p >= 0.98 && (
        <polygon points={`0,0 ${-hs},${-hs * 0.55} ${-hs},${hs * 0.55}`} fill={color} transform={`translate(${x2} ${y2}) rotate(${ang})`} />
      )}
    </svg>
  )
}

// ------------------------------------------------------------------ Página em miniatura
export const MiniPage = ({ w = 150, h = 190, title, accent = C.purple, glow = 0 }) => (
  <div style={{ width: w, height: h, background: C.white, borderRadius: 12, border: `3px solid ${accent}`, boxShadow: `0 10px 24px rgba(38,33,92,0.2)${glow ? `, 0 0 ${30 * glow}px ${C.purpleSoft}` : ''}`, padding: 12, boxSizing: 'border-box', fontFamily: FONT, overflow: 'hidden' }}>
    <div style={{ height: 10, background: accent, borderRadius: 5, width: '70%', marginBottom: 10 }} />
    {title && <div style={{ fontSize: Math.max(14, w * 0.13), fontWeight: 700, color: C.night, marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>}
    {[100, 86, 94, 62].map((p, i) => <div key={i} style={{ height: 7, width: `${p}%`, background: '#DAD7F5', borderRadius: 4, marginBottom: 8 }} />)}
  </div>
)

// ------------------------------------------------------------------ Teia de páginas
// nodes: [{ x, y, at, title? }] (centro, coordenadas do contêiner); edges: [{ a, b, at }].
// As linhas crescem de `a` até `b` a partir de `at` (frames locais). linkOpacity apaga as linhas.
export const PageWeb = ({ nodes, edges, width = 1920, height = 1080, w = 130, h = 165, color = C.link, linkOpacity = 1 }) => {
  const frame = useCurrentFrame()
  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, overflow: 'visible', opacity: linkOpacity }}>
        {edges.map((e, i) => {
          const A = nodes[e.a]
          const B = nodes[e.b]
          const g = clamp01((frame - e.at) / 16)
          if (g <= 0) return null
          return <line key={i} x1={A.x} y1={A.y} x2={A.x + (B.x - A.x) * g} y2={A.y + (B.y - A.y) * g} stroke={color} strokeWidth="6" strokeLinecap="round" />
        })}
      </svg>
      {nodes.map((n, i) => {
        const g = clamp01((frame - n.at) / 12)
        return (
          <div key={i} style={{ position: 'absolute', left: n.x - w / 2, top: n.y - h / 2, opacity: g, transform: `scale(${0.8 + 0.2 * g})` }}>
            <MiniPage w={w} h={h} title={n.title} />
          </div>
        )
      })}
    </div>
  )
}
