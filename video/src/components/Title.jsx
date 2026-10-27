import React from 'react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT } from '../theme.js'

export const Title = ({ children, start = 0, size = 96, color = C.night, sub, subColor = C.purple, align = 'center' }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: frame - start, fps, config: { damping: 16, stiffness: 100 } })
  return (
    <div style={{ fontFamily: FONT, textAlign: align, opacity: Math.min(1, s * 1.5), transform: `translateY(${(1 - s) * 40}px)` }}>
      <div style={{ fontSize: size, fontWeight: 600, color, letterSpacing: -1, lineHeight: 1.1 }}>{children}</div>
      {sub && <div style={{ fontSize: size * 0.42, fontWeight: 400, color: subColor, marginTop: 14 }}>{sub}</div>}
    </div>
  )
}
