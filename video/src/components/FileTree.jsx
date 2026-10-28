// Árvore de arquivos genérica (painel lateral de um editor). Aula 3 em diante.
import React from 'react'
import { C, FONT, MONO } from '../theme.js'

export const FolderIcon = ({ size = 34, open = true }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <path d="M2 8 a3 3 0 0 1 3 -3 H12 L15 8 H27 a3 3 0 0 1 3 3 V25 a3 3 0 0 1 -3 3 H5 a3 3 0 0 1 -3 -3 Z" fill={open ? C.purpleSoft : C.purple} stroke={C.night} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
)
export const FileIcon = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <path d="M7 3 H19 L26 10 V29 H7 Z" fill={C.white} stroke={C.purple} strokeWidth="2" strokeLinejoin="round" />
    <path d="M19 3 V10 H26" fill={C.lavender} stroke={C.purple} strokeWidth="2" strokeLinejoin="round" />
    <path d="M11 17 L9 19.5 L11 22 M16 17 L18 19.5 L16 22" fill="none" stroke={C.purple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Geometria compartilhada: posição (no contêiner) do centro de uma linha da árvore.
export const treeGeom = ({ fontSize = 34, rowH, indent, pad = 24 } = {}) => {
  const rh = rowH || fontSize * 1.75
  const ind = indent || fontSize * 1.3
  return {
    rowH: rh,
    indent: ind,
    pad,
    // canto esquerdo do ícone e centro vertical da linha
    x: (depth) => pad + depth * ind,
    y: (row) => pad + 44 + row * rh + rh / 2,
    // fim do texto (aprox.) para apontar setas
    textEnd: (depth, name) => pad + depth * ind + fontSize * 1.25 + name.length * fontSize * 0.55,
  }
}

// items: [{ id, name, folder?, depth, row, opacity?, glow?, hl?, color?, strike? }]
// row/depth podem ser fracionários (para animar um arquivo sendo arrastado para dentro de uma pasta).
export const FileTree = ({ items, fontSize = 34, rowH, indent, width = 440, height = 360, title = 'arquivos', children, style }) => {
  const g = treeGeom({ fontSize, rowH, indent })
  return (
    <div style={{ position: 'relative', width, height, borderRadius: 18, background: '#16123A', border: `2px solid ${C.purple}`, boxShadow: '0 24px 60px rgba(27,23,68,0.45)', overflow: 'hidden', fontFamily: FONT, ...style }}>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 20, letterSpacing: 2, textTransform: 'uppercase', color: C.purpleSoft, fontWeight: 700, borderBottom: '2px solid #2C2766' }}>{title}</div>
      {/* guias verticais de indentação */}
      {items.filter((it) => it.folder).map((it) => {
        const kids = items.filter((k) => k.parent === it.id)
        if (!kids.length) return null
        const last = Math.max(...kids.map((k) => k.row))
        return <div key={`guide-${it.id}`} style={{ position: 'absolute', left: g.x(it.depth) + fontSize * 0.5, top: g.y(it.row) + g.rowH * 0.36, width: 2, height: g.y(last) - g.y(it.row) - g.rowH * 0.36, background: '#3B3580', opacity: Math.min(1, ...kids.map((k) => (k.opacity == null ? 1 : k.opacity)), it.opacity == null ? 1 : it.opacity) }} />
      })}
      {items.map((it) => {
        const op = it.opacity == null ? 1 : it.opacity
        if (op <= 0) return null
        const top = g.y(it.row) - g.rowH / 2
        return (
          <div key={it.id} style={{ position: 'absolute', left: g.x(it.depth) - 10, top: top + 4, height: g.rowH - 8, display: 'flex', alignItems: 'center', gap: fontSize * 0.35, padding: '0 14px 0 10px', borderRadius: 10, opacity: op, background: it.hl ? `rgba(127,119,221,${0.45 * it.hl})` : 'transparent', boxShadow: it.glow ? `0 0 ${34 * it.glow}px rgba(238,237,254,${0.8 * it.glow}), inset 0 0 0 3px rgba(238,237,254,${0.9 * it.glow})` : 'none' }}>
            {it.folder ? <FolderIcon size={fontSize * 0.95} /> : <FileIcon size={fontSize * 0.95} />}
            <span style={{ fontFamily: MONO, fontSize, color: it.color || (it.folder ? C.lavender : '#F4F3FF'), fontWeight: it.folder ? 700 : 400, whiteSpace: 'pre', textDecoration: it.strike ? 'line-through' : 'none', textDecorationColor: C.red }}>{it.name}</span>
          </div>
        )
      })}
      {children}
    </div>
  )
}
