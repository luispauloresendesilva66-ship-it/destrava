// Ícones genéricos (sem marcas): lupa, cadeado, alto-falante, copiar, envelope.
import React from 'react'
import { C, MONO } from '../theme.js'

// Lupa com um caractere ampliado dentro (ex.: "_" ou "#"). size = diâmetro da lente.
export const Loupe = ({ text, size = 150, color = C.purple }) => (
  <div style={{ position: 'relative', width: size * 1.35, height: size * 1.35 }}>
    <svg width={size * 1.35} height={size * 1.35} viewBox="0 0 135 135" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <line x1="92" y1="92" x2="128" y2="128" stroke={C.night} strokeWidth="14" strokeLinecap="round" />
      <circle cx="50" cy="50" r="46" fill={C.nightDeep} stroke={color} strokeWidth="8" />
    </svg>
    <div style={{ position: 'absolute', left: size * 0.04, top: size * 0.04, width: size * 0.92, height: size * 0.92, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: size * 0.62, color: '#FFD28A', lineHeight: 1 }}>{text}</div>
  </div>
)

export const SearchIcon = ({ size = 90, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="26" cy="26" r="18" fill={C.white} stroke={color} strokeWidth="6" />
    <line x1="40" y1="40" x2="58" y2="58" stroke={C.night} strokeWidth="8" strokeLinecap="round" />
  </svg>
)

export const LockIcon = ({ size = 90, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M20 28 V20 a12 12 0 0 1 24 0 V28" fill="none" stroke={C.night} strokeWidth="6" strokeLinecap="round" />
    <rect x="12" y="27" width="40" height="32" rx="8" fill={color} stroke={C.night} strokeWidth="4" />
    <circle cx="32" cy="41" r="5" fill={C.lavender} />
    <rect x="30" y="42" width="4" height="9" rx="2" fill={C.lavender} />
  </svg>
)

export const SpeakerIcon = ({ size = 90, waves = 2, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M8 24 H20 L34 12 V52 L20 40 H8 Z" fill={color} stroke={C.night} strokeWidth="3" strokeLinejoin="round" />
    {waves > 0 && <path d="M42 22 Q50 32 42 42" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />}
    {waves > 1 && <path d="M48 16 Q60 32 48 48" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />}
  </svg>
)

export const CopyIcon = ({ size = 80, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="20" y="18" width="32" height="38" rx="6" fill={C.white} stroke={color} strokeWidth="5" />
    <path d="M14 46 H12 a4 4 0 0 1 -4 -4 V12 a4 4 0 0 1 4 -4 H36 a4 4 0 0 1 4 4 V14" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
  </svg>
)

export const MailIcon = ({ size = 80, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="6" y="14" width="52" height="36" rx="6" fill={C.white} stroke={color} strokeWidth="5" />
    <path d="M8 18 L32 36 L56 18" fill="none" stroke={color} strokeWidth="5" strokeLinejoin="round" />
  </svg>
)
