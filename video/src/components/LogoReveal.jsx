import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C } from '../theme.js'
import { LogoMark, Wordmark } from './Logo.jsx'

const mix = (a, b, t) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const [x, y] = [p(a), p(b)]
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`
}
const ramp = (f, a, b) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

// Logo entra, a fechadura fica clara (trancada) e vira verde (destrava) com um anel de pulso.
// `start` em frames locais.
export const LogoReveal = ({ start = 0, height = 260, showWordmark = true, unlockAt = 28, wordColor = C.night, bodyColor = C.purple }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const f = frame - start
  const enter = spring({ frame: f, fps, config: { damping: 15, stiffness: 110 } })
  const t = ramp(f, unlockAt, unlockAt + 14)
  const keyColor = mix('#EEEDFE', C.green, t)
  const ring = ramp(f, unlockAt + 2, unlockAt + 34)
  const word = ramp(f, unlockAt + 8, unlockAt + 26)
  const markW = (height * 66) / 88
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: height * 0.25, opacity: Math.min(1, enter * 1.4), transform: `scale(${0.7 + 0.3 * enter})` }}>
      <div style={{ position: 'relative', width: markW, height }}>
        <div
          style={{
            position: 'absolute',
            left: markW * 0.48,
            top: height * 0.57,
            width: height * 0.9,
            height: height * 0.9,
            marginLeft: -height * 0.45,
            marginTop: -height * 0.45,
            borderRadius: '50%',
            border: `6px solid ${C.green}`,
            opacity: ring > 0 ? (1 - ring) * 0.8 : 0,
            transform: `scale(${0.3 + ring * 1.1})`,
          }}
        />
        <LogoMark height={height} keyColor={keyColor} bodyColor={bodyColor} />
      </div>
      {showWordmark && (
        <div style={{ opacity: word, transform: `translateX(${(1 - word) * 30}px)` }}>
          <Wordmark size={height * 0.72} color={wordColor} />
        </div>
      )}
    </div>
  )
}
