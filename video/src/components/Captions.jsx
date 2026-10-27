import React, { useMemo } from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { C, FONT } from '../theme.js'
import { timeCaptions } from '../lib/captions.js'

// Legendas queimadas: texto branco sobre faixa noite semitransparente, na base do quadro.
export const Captions = ({ text, audioFrames }) => {
  const frame = useCurrentFrame()
  const chunks = useMemo(() => timeCaptions(text, audioFrames), [text, audioFrames])
  const cur = chunks.find((c) => frame >= c.from && frame < c.to)
  if (!cur) return null
  const op = interpolate(frame, [cur.from, cur.from + 4, cur.to - 3, cur.to], [0, 1, 1, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 54, display: 'flex', justifyContent: 'center', opacity: op }}>
      <div
        style={{
          maxWidth: 1560,
          background: 'rgba(38,33,92,0.88)',
          color: C.white,
          fontFamily: FONT,
          fontSize: 50,
          fontWeight: 500,
          lineHeight: 1.25,
          textAlign: 'center',
          padding: '16px 40px 20px',
          borderRadius: 20,
          textShadow: '0 2px 4px rgba(0,0,0,0.25)',
        }}
      >
        {cur.text}
      </div>
    </div>
  )
}
