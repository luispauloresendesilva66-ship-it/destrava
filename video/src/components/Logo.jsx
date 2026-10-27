import React from 'react'
import { C, FONT } from '../theme.js'

// Marca "d com fechadura". keyColor controla a cor da fechadura (verde = destravado).
export const LogoMark = ({ height = 200, keyColor = C.green, bodyColor = C.purple, style }) => (
  <svg viewBox="0 0 66 88" height={height} width={(height * 66) / 88} style={style}>
    <circle cx="32" cy="56" r="32" fill={bodyColor} />
    <rect x="52" y="0" width="14" height="88" rx="7" fill={bodyColor} />
    <circle cx="32" cy="50" r="9" fill={keyColor} />
    <path d="M28 55 L24 74 H40 L36 55 Z" fill={keyColor} />
  </svg>
)

export const Wordmark = ({ size = 120, color = C.night, style }) => (
  <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: size, color, letterSpacing: -size * 0.01, lineHeight: 1, ...style }}>
    destrava
  </span>
)
