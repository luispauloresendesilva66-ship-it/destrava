import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { C } from '../theme.js'

// Fundo lavanda com padrão sutil de degraus (escada = níveis do curso).
export const Background = ({ dark = false }) => {
  const frame = useCurrentFrame()
  const drift = (frame * 0.25) % 160
  const bg = dark ? C.night : C.lavender
  const stroke = dark ? C.purpleSoft : C.purple
  return (
    <AbsoluteFill style={{ background: bg }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="steps" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform={`translate(${drift} ${-drift})`}>
            <path d="M-20 140 H40 V100 H100 V60 H160 V20 H200" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" opacity={dark ? 0.16 : 0.09} />
          </pattern>
          <radialGradient id="vig" cx="50%" cy="45%" r="75%">
            <stop offset="60%" stopColor={dark ? '#000' : C.purple} stopOpacity="0" />
            <stop offset="100%" stopColor={dark ? '#000' : C.purple} stopOpacity={dark ? 0.35 : 0.12} />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#steps)" />
        <rect width="100%" height="100%" fill="url(#vig)" />
      </svg>
    </AbsoluteFill>
  )
}
