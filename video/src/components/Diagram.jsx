import React from 'react'
import { C, FONT, MONO } from '../theme.js'

const clamp = (v) => Math.max(0, Math.min(1, v))

// Ícone genérico de navegador
export const BrowserIcon = ({ size = 260, label }) => (
  <div style={{ width: size, textAlign: 'center', fontFamily: FONT }}>
    <svg viewBox="0 0 200 160" width={size} height={size * 0.8}>
      <rect x="6" y="6" width="188" height="148" rx="16" fill={C.white} stroke={C.purple} strokeWidth="6" />
      <path d="M6 22 a16 16 0 0 1 16 -16 H178 a16 16 0 0 1 16 16 V42 H6 Z" fill={C.purple} />
      <circle cx="26" cy="24" r="5" fill={C.lavender} />
      <circle cx="44" cy="24" r="5" fill={C.lavender} />
      <circle cx="62" cy="24" r="5" fill={C.lavender} />
      <rect x="22" y="62" width="156" height="12" rx="6" fill={C.lavender} />
      <rect x="22" y="86" width="110" height="12" rx="6" fill={C.lavender} />
    </svg>
    {label && <div style={{ fontSize: 38, color: C.night, fontWeight: 600, marginTop: 6 }}>{label}</div>}
  </div>
)

// Ícone de servidor (pilha de máquinas)
export const ServerIcon = ({ size = 220, label }) => (
  <div style={{ width: size, textAlign: 'center', fontFamily: FONT }}>
    <svg viewBox="0 0 160 170" width={size} height={size * 1.06}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 54})`}>
          <rect x="8" y="6" width="144" height="44" rx="10" fill={C.night} stroke={C.purple} strokeWidth="4" />
          <circle cx="32" cy="28" r="6" fill={C.purpleSoft} />
          <circle cx="52" cy="28" r="6" fill={C.purpleSoft} opacity="0.6" />
          <rect x="84" y="22" width="56" height="12" rx="6" fill={C.purple} />
        </g>
      ))}
    </svg>
    {label && <div style={{ fontSize: 38, color: C.night, fontWeight: 600, marginTop: 6 }}>{label}</div>}
  </div>
)

// Documento de texto com linhas de código
export const DocIcon = ({ size = 130, text = '<html>' }) => (
  <svg viewBox="0 0 120 150" width={size} height={size * 1.25} style={{ filter: 'drop-shadow(0 8px 14px rgba(38,33,92,0.3))' }}>
    <path d="M10 6 H80 L110 36 V144 H10 Z" fill={C.white} stroke={C.purple} strokeWidth="5" strokeLinejoin="round" />
    <path d="M80 6 V36 H110" fill={C.lavender} stroke={C.purple} strokeWidth="5" strokeLinejoin="round" />
    <text x="22" y="66" fontFamily={MONO} fontSize="15" fill={C.purple} fontWeight="700">{text}</text>
    {[84, 102, 120].map((y, i) => <rect key={y} x="22" y={y - 8} width={[70, 54, 62][i]} height="8" rx="4" fill="#CFCBF2" />)}
  </svg>
)

// Seta horizontal com rótulo. progress 0..1 desenha a seta; dir 'right' | 'left'.
export const Arrow = ({ progress = 1, dir = 'right', length = 520, label, color = C.purple, labelColor = C.night, thick = 10 }) => {
  const p = clamp(progress)
  const head = 38
  const shaft = Math.max(0, length - head)
  return (
    <div style={{ width: length, fontFamily: FONT, textAlign: 'center', opacity: p > 0 ? 1 : 0 }}>
      <div style={{ fontSize: 40, fontWeight: 600, color: labelColor, marginBottom: 6, opacity: clamp(p * 2) }}>{label}</div>
      <svg width={length} height={60} viewBox={`0 0 ${length} 60`} style={{ transform: dir === 'left' ? 'scaleX(-1)' : 'none', overflow: 'visible' }}>
        <line x1="0" y1="30" x2={shaft * p} y2="30" stroke={color} strokeWidth={thick} strokeLinecap="round" strokeDasharray="18 14" />
        <polygon points={`${shaft},6 ${length},30 ${shaft},54`} fill={color} opacity={clamp((p - 0.85) * 7)} />
      </svg>
    </div>
  )
}

// Casa em 3 camadas. structure/paint/power: 0..1 de cada camada.
export const House = ({ structure = 0, paint = 0, power = 0, lampOn = false, width = 680 }) => {
  const wall = { x: 120, y: 230, w: 360, h: 250 }
  const dash = 1400
  const so = (1 - clamp(structure)) * dash
  const fillOp = clamp(paint)
  return (
    <svg viewBox="0 0 600 520" width={width} height={width * (520 / 600)} style={{ overflow: 'visible' }}>
      {/* cor e acabamento */}
      <g opacity={fillOp}>
        <rect x={wall.x} y={wall.y} width={wall.w} height={wall.h} fill="#CFCBF2" />
        <path d={`M${wall.x - 30} ${wall.y} L300 70 L${wall.x + wall.w + 30} ${wall.y} Z`} fill={C.purple} />
        <rect x="255" y="340" width="90" height="140" rx="8" fill={C.night} />
        <circle cx="330" cy="415" r="6" fill={C.lavender} />
        <rect x="150" y="280" width="80" height="80" rx="6" fill="#FFE9A8" />
        <rect x="370" y="280" width="80" height="80" rx="6" fill="#FFE9A8" />
        <rect x="90" y="480" width="420" height="22" rx="8" fill={C.purpleSoft} />
      </g>
      {/* estrutura em linhas */}
      <g fill="none" stroke={C.night} strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={dash} strokeDashoffset={so}>
        <path d={`M${wall.x} ${wall.y} V${wall.y + wall.h} H${wall.x + wall.w} V${wall.y} Z`} />
        <path d={`M${wall.x - 30} ${wall.y} L300 70 L${wall.x + wall.w + 30} ${wall.y}`} />
        <rect x="255" y="340" width="90" height="140" />
        <rect x="150" y="280" width="80" height="80" />
        <rect x="370" y="280" width="80" height="80" />
        <path d="M190 280 V360 M150 320 H230 M410 280 V360 M370 320 H450" strokeWidth="4" />
      </g>
      {/* parte elétrica: lâmpada, fio e interruptor */}
      <g opacity={clamp(power)}>
        {lampOn && <circle cx="300" cy="306" r="78" fill="#FFE27A" opacity="0.35" />}
        <path d="M300 230 V276" stroke={C.night} strokeWidth="5" />
        <rect x="288" y="272" width="24" height="16" rx="4" fill={C.night} />
        <circle cx="300" cy="306" r="22" fill={lampOn ? '#FFD93D' : '#E7E5F7'} stroke={C.night} strokeWidth="5" />
        <rect x="498" y="300" width="36" height="60" rx="8" fill={C.white} stroke={C.night} strokeWidth="5" />
        <rect x="508" y={lampOn ? 308 : 326} width="16" height="22" rx="4" fill={C.purple} />
        <path d="M498 330 H478 V244 H300" fill="none" stroke={C.purpleSoft} strokeWidth="4" strokeDasharray="10 8" />
      </g>
    </svg>
  )
}
