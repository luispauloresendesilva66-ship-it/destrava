// Peças de base do Reel: fontes, palco noturno animado, título cinético e legendas karaokê.
import React, { useEffect, useMemo, useState } from 'react'
import { AbsoluteFill, continueRender, delayRender, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { DISPLAY, GRAD, HUES, R, RH, RW, SAFE, SANS } from './theme.js'
import { chunkWords } from './data.js'

export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v))
export const ramp = (f, a, b) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
export const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3)
export const pop = (frame, fps, start, cfg) => spring({ frame: frame - start, fps, config: { damping: 13, stiffness: 170, mass: 0.7, ...cfg } })

// ---------------------------------------------------------------- fontes
const FONTS = [
  { family: 'Jakarta', file: 'fonts/plus-jakarta-sans-latin-wght-normal.woff2', style: 'normal', weight: '200 800' },
  { family: 'Jakarta', file: 'fonts/plus-jakarta-sans-latin-wght-italic.woff2', style: 'italic', weight: '200 800' },
  { family: 'InterR', file: 'fonts/inter-latin-wght-normal.woff2', style: 'normal', weight: '100 900' },
]
let fontsPromise = null
const loadFonts = () => {
  if (!fontsPromise) {
    fontsPromise = Promise.all(
      FONTS.map((f) => new FontFace(f.family, `url(${staticFile(f.file)}) format('woff2')`, { style: f.style, weight: f.weight }).load().then((ff) => document.fonts.add(ff))),
    )
  }
  return fontsPromise
}
export const useReelFonts = () => {
  const [handle] = useState(() => delayRender('Fontes do Reel'))
  useEffect(() => {
    loadFonts().then(() => continueRender(handle)).catch((e) => { console.error(e); continueRender(handle) })
  }, [handle])
}

// ---------------------------------------------------------------- palco
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
export const mixHex = (a, b, t) => {
  const [x, y] = [hexRgb(a), hexRgb(b)]
  return x.map((v, i) => Math.round(v + (y[i] - v) * t))
}
export const rgba = (hex, a) => `rgba(${hexRgb(hex).join(',')},${a})`

// Fundo contínuo do Reel inteiro. accent: cor da cena atual (já misturada na troca).
export const Stage = ({ accent = [139, 108, 255] }) => {
  const frame = useCurrentFrame()
  const t = frame / 30
  const a = `rgba(${accent.join(',')},`
  const gx = 78 + Math.sin(t * 0.5) * 8
  const gy = 12 + Math.cos(t * 0.4) * 5
  const cx = 12 + Math.cos(t * 0.35) * 8
  const cy = 88 + Math.sin(t * 0.45) * 4
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${R.night950} 0%, ${R.night900} 35%, ${R.night} 100%)`, overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          background: [
            `radial-gradient(60% 38% at ${gx}% ${gy}%, rgba(127,119,221,0.50), transparent 70%)`,
            `radial-gradient(55% 32% at ${cx}% ${cy}%, rgba(62,197,255,0.22), transparent 70%)`,
            `radial-gradient(40% 25% at ${40 + Math.sin(t * 0.3) * 10}% 2%, rgba(240,80,158,0.16), transparent 72%)`,
            `radial-gradient(62% 30% at 50% ${50 + Math.sin(t * 0.6) * 3}%, ${a}0.30), transparent 72%)`,
          ].join(','),
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1.4px, transparent 1.9px)',
          backgroundSize: '30px 30px',
          backgroundPosition: `0 ${(-frame * 0.4) % 30}px`,
          WebkitMaskImage: 'radial-gradient(80% 60% at 50% 45%, #000 20%, transparent 85%)',
          maskImage: 'radial-gradient(80% 60% at 50% 45%, #000 20%, transparent 85%)',
          opacity: 0.8,
        }}
      />
      {Array.from({ length: 18 }).map((_, i) => {
        const x = random(`px${i}`) * RW
        const speed = 0.6 + random(`ps${i}`) * 1.2
        const y = RH - ((random(`py${i}`) * RH + frame * speed) % (RH + 80))
        const s = 3 + random(`pz${i}`) * 5
        const col = HUES[i % HUES.length]
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: col, opacity: 0.25 + 0.35 * Math.abs(Math.sin(frame / 25 + i)), boxShadow: `0 0 ${s * 3}px ${col}` }} />
      })}
      <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(8,6,28,0.55) 100%)' }} />
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- título
// "Cansado de curso *caro*?" → palavras; a palavra entre * fica itálica e em degradê.
export const parseTitle = (title) => {
  const runs = []
  title.split(/(\*[^*]+\*)/).forEach((p) => { if (p) runs.push(p.startsWith('*') ? { t: p.slice(1, -1), it: true } : { t: p, it: false }) })
  const words = [[]]
  for (const r of runs) {
    const parts = r.t.split(/(\s+)/)
    for (const part of parts) {
      if (!part) continue
      if (/^\s+$/.test(part)) { if (words[words.length - 1].length) words.push([]); continue }
      words[words.length - 1].push({ t: part, it: r.it })
    }
  }
  return words.filter((w) => w.length)
}

export const titleSize = (title) => {
  const n = title.replace(/\*/g, '').length
  if (n <= 14) return 116
  if (n <= 19) return 108
  if (n <= 24) return 98
  return 90
}

export const Headline = ({ title, start = 0, size, align = 'center', upright = false, style }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const words = useMemo(() => parseTitle(title), [title])
  const fs = size || titleSize(title)
  return (
    <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: fs, lineHeight: 1.04, letterSpacing: '-0.03em', wordSpacing: '0.05em', color: R.white, textAlign: align, textWrap: 'balance', textShadow: '0 6px 30px rgba(10,8,40,0.45)', ...style }}>
      {words.map((w, i) => {
        const p = pop(frame, fps, start + i * 2.5, { damping: 12, stiffness: 190 })
        const blur = (1 - clamp(p)) * 10
        const italic = w.some((r) => r.it)
        return (
          <React.Fragment key={i}>
            <span style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 70}px) scale(${0.75 + 0.25 * p})`, opacity: clamp(p * 1.6), filter: blur > 0.3 ? `blur(${blur}px)` : 'none', transformOrigin: '50% 80%' }}>
              {w.map((r, k) =>
                r.it ? (
                  <span
                    key={k}
                    style={{
                      fontStyle: upright ? 'normal' : 'italic',
                      backgroundImage: GRAD.headline,
                      backgroundSize: '200% 100%',
                      backgroundPosition: `${50 + Math.sin((frame + i * 10) / 22) * 50}% 50%`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      paddingRight: '0.08em',
                      marginRight: '-0.08em',
                      textShadow: 'none',
                      filter: 'drop-shadow(0 4px 22px rgba(143,216,255,0.35))',
                    }}
                  >
                    {r.t}
                  </span>
                ) : (
                  <span key={k} style={{ fontStyle: italic ? 'normal' : 'normal' }}>{r.t}</span>
                ),
              )}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// Pílula pequena acima do título (tipo do Reel).
export const Kicker = ({ text, color = R.violet, start = 0 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const p = pop(frame, fps, start)
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '12px 26px 12px 20px', borderRadius: 999, background: 'rgba(18,15,51,0.55)', border: `2px solid ${rgba(color, 0.55)}`, boxShadow: `0 0 30px ${rgba(color, 0.25)}`, fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: '0.14em', textTransform: 'uppercase', color: R.lavender, transform: `scale(${0.8 + 0.2 * p})`, opacity: clamp(p * 1.5) }}>
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: color, boxShadow: `0 0 14px ${color}` }} />
      {text}
    </div>
  )
}

// ---------------------------------------------------------------- legendas karaokê
export const KaraokeCaptions = ({ words, bottom = RH - SAFE.bottom + 40 }) => {
  const frame = useCurrentFrame()
  const chunks = useMemo(() => chunkWords(words), [words])
  let ci = -1
  for (let i = 0; i < chunks.length; i++) if (frame >= chunks[i][0].s - 2) ci = i
  if (ci < 0) return null
  const chunk = chunks[ci]
  const last = chunk[chunk.length - 1]
  const nextStart = chunks[ci + 1] ? chunks[ci + 1][0].s - 2 : last.e + 30
  if (frame >= nextStart) return null
  const local = frame - (chunk[0].s - 2)
  const enter = easeOut(local / 5)
  return (
    <div style={{ position: 'absolute', left: SAFE.side, right: SAFE.side, bottom, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div
        style={{
          maxWidth: RW - SAFE.side * 2,
          padding: '18px 30px 22px',
          borderRadius: 30,
          background: 'rgba(14,11,42,0.72)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 18px 50px rgba(5,3,25,0.45)',
          backdropFilter: 'blur(12px)',
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 62,
          lineHeight: 1.18,
          letterSpacing: '-0.01em',
          color: R.white,
          textAlign: 'center',
          transform: `translateY(${(1 - enter) * 18}px) scale(${0.92 + 0.08 * enter})`,
          opacity: clamp(enter * 1.4),
        }}
      >
        {chunk.map((w, k) => {
          const active = frame >= w.s - 1 && (k === chunk.length - 1 || frame < chunk[k + 1].s - 1)
          const spoken = frame >= w.s - 1
          return (
            <React.Fragment key={k}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0 0.12em',
                  margin: '0 -0.07em',
                  borderRadius: 14,
                  background: active ? GRAD.primary : 'transparent',
                  boxShadow: active ? '0 6px 22px rgba(112,72,232,0.55)' : 'none',
                  color: spoken ? R.white : 'rgba(255,255,255,0.55)',
                  transform: active ? 'scale(1.04)' : 'none',
                }}
              >
                {w.w}
              </span>
              {k < chunk.length - 1 ? ' ' : null}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- utilidades visuais
export const Glass = ({ children, style, glow = R.violet }) => (
  <div style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)', border: '1.5px solid rgba(255,255,255,0.14)', borderRadius: 36, boxShadow: `0 30px 80px -20px rgba(5,3,25,0.7), 0 0 60px -10px ${rgba(glow, 0.35)}, inset 0 1px 0 rgba(255,255,255,0.12)`, ...style }}>
    {children}
  </div>
)

export const PillLabel = ({ children, color = R.violet, size = 30, style }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 999, background: rgba(color, 0.18), border: `2px solid ${rgba(color, 0.7)}`, color: R.white, fontFamily: SANS, fontWeight: 800, fontSize: size, letterSpacing: '0.12em', textTransform: 'uppercase', ...style }}>
    {children}
  </span>
)
