import React from 'react'
import { random, useCurrentFrame } from 'remotion'
import { C, FONT } from '../theme.js'
import { clamp01 } from '../lib/sync.js'

// Chip de rótulo
export const Chip = ({ children, color = C.purple, bg = C.white, border, size = 36, style }) => (
  <div style={{ fontFamily: FONT, fontSize: size, fontWeight: 600, color, background: bg, border: `3px solid ${border || color}`, borderRadius: 16, padding: '8px 22px', display: 'inline-block', ...style }}>{children}</div>
)

// Check verde (só para acerto/conquista) e "x" vermelho (só para erro).
export const Check = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill={C.green} />
    <path d="M18 33 L28 43 L47 22" fill="none" stroke={C.night} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const Cross = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill={C.red} />
    <path d="M21 21 L43 43 M43 21 L21 43" fill="none" stroke={C.white} strokeWidth="7" strokeLinecap="round" />
  </svg>
)

// Confete verde discreto caindo a partir de `start` (frames locais). x0/spread: faixa horizontal.
export const Confetti = ({ start, x0 = 500, spread = 900, count = 46 }) => {
  const frame = useCurrentFrame()
  const f = frame - start
  if (f < 0 || f > 100) return null
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = x0 + random(`x${i}`) * spread
        const delay = random(`d${i}`) * 22
        const g = f - delay
        if (g < 0) return null
        const y = 80 + g * (6 + random(`v${i}`) * 5)
        const rot = g * (4 + random(`r${i}`) * 8)
        const col = i % 3 === 0 ? C.green : i % 3 === 1 ? '#C4E29A' : '#7FAE3E'
        return <div key={i} style={{ position: 'absolute', left: x + Math.sin(g / 6 + i) * 24, top: y, width: 16, height: 26, background: col, borderRadius: 4, transform: `rotate(${rot}deg)`, opacity: clamp01(1 - (f - 70) / 30) }} />
      })}
    </>
  )
}
