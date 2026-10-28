// Template de Reel vertical (1080x1920) guiado por dados: promo/<id>/roteiro.json + áudios das cenas.
// Props: { id: 'reel-02' }. calculateMetadata (data.js) lê roteiro + manifest (scripts/prep-reel.mjs).
import React from 'react'
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { HUES, KICKER, RH, SAFE } from './theme.js'
import { Headline, KaraokeCaptions, Kicker, Stage, clamp, easeOut, mixHex, ramp, useReelFonts } from './core.jsx'
import { makeWordSync } from './data.js'
import { VISUALS } from './visuals.jsx'

const ENTER = 10 // frames de entrada da cena
const EXIT = 7 // frames de saída, sobrepostos à entrada da próxima
const CAPTION_BOTTOM = RH - 1500 // base da pílula de legenda (acima da zona de 380 px)

const enterStyle = (f, on) => {
  if (!on) return {}
  const p = easeOut(f / ENTER)
  return { transform: `translateY(${(1 - p) * 90}px) scale(${0.94 + 0.06 * p})`, filter: p < 0.98 ? `blur(${(1 - p) * 12}px)` : 'none', opacity: clamp(p * 1.3) }
}
const exitStyle = (f, total, on) => {
  if (!on) return {}
  const q = ramp(f, total - 2, total + EXIT - 2)
  if (q <= 0) return {}
  return { transform: `scale(${1 + 0.07 * q}) translateY(${-q * 40}px)`, filter: `blur(${q * 12}px)`, opacity: 1 - q }
}
const merge = (a, b) => ({ ...a, ...b, transform: [a.transform, b.transform].filter(Boolean).join(' ') || undefined, filter: [a.filter, b.filter].filter((x) => x && x !== 'none').join(' ') || 'none' })

const SceneView = ({ scene, isFirst, isLast, tipo, hue }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const v = scene.visual || { tipo: 'end-card' }
  const Visual = VISUALS[v.tipo]
  const sync = makeWordSync(scene.words)
  const dur = scene.audioFrames
  const isEnd = v.tipo === 'end-card'
  const total = scene.totalFrames
  if (!Visual) throw new Error(`Visual desconhecido: ${v.tipo}`)

  const head = merge(enterStyle(frame, !isFirst), exitStyle(frame, total, !isLast))
  const vis = merge(enterStyle(frame, !isFirst && !scene.continuesFromPrev), exitStyle(frame, total, !isLast && !scene.continuesToNext))
  const hideVisual = scene.continuesToNext && frame >= total
  const mode = scene.continuesFromPrev ? 'reveal' : 'question'
  const props = { v, frame: frame + (isFirst ? 8 : 0), dur, fps, sync, words: scene.words, hue, mode }

  if (isEnd) {
    return (
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: SAFE.top + 60, bottom: RH - SAFE.bottom + 30, left: SAFE.side, right: SAFE.side, display: 'flex', alignItems: 'center', justifyContent: 'center', ...vis }}>
          <Visual {...props} />
        </div>
      </AbsoluteFill>
    )
  }
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: SAFE.top + 22, left: SAFE.side, right: SAFE.side, bottom: RH - 1300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, width: '100%', ...head }}>
          <Kicker text={KICKER[tipo] || 'Destrava'} color={hue} start={isFirst ? -14 : 2} />
          <Headline title={scene.titulo} start={isFirst ? -14 : 3} />
        </div>
        <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, opacity: hideVisual ? 0 : 1, ...vis }}>
          <Visual {...props} />
        </div>
      </div>
    </AbsoluteFill>
  )
}

const AudioAndCaptions = ({ scene, isEnd }) => (
  <AbsoluteFill>
    {!isEnd && <KaraokeCaptions words={scene.words} bottom={CAPTION_BOTTOM} />}
    {scene.file && <Audio src={staticFile(scene.file)} />}
  </AbsoluteFill>
)

export const Reel = ({ reel }) => {
  useReelFonts()
  const frame = useCurrentFrame()
  if (!reel) return null
  const { scenes, tipo } = reel
  const starts = []
  let acc = 0
  for (const s of scenes) { starts.push(acc); acc += s.totalFrames }
  // cor de destaque do palco: muda a cada cena, misturando nos primeiros 15 frames
  let k = 0
  for (let i = 0; i < scenes.length; i++) if (frame >= starts[i]) k = i
  const hueOf = (i) => (scenes[i].visual && scenes[i].visual.tipo === 'end-card' ? HUES[0] : HUES[i % HUES.length])
  const accent = mixHex(hueOf(Math.max(0, k - 1)), hueOf(k), k === 0 ? 1 : ramp(frame - starts[k], 0, 15))
  return (
    <AbsoluteFill style={{ backgroundColor: '#120F33' }}>
      <Stage accent={accent} />
      {scenes.map((s, i) => {
        const isLast = i === scenes.length - 1
        return (
          <Sequence key={`v${i}`} from={starts[i]} durationInFrames={s.totalFrames + (isLast ? 0 : EXIT)} name={`Cena ${i + 1} — ${s.visual ? s.visual.tipo : ''}`}>
            <SceneView scene={s} isFirst={i === 0} isLast={isLast} tipo={tipo} hue={hueOf(i)} />
          </Sequence>
        )
      })}
      {scenes.map((s, i) => (
        <Sequence key={`a${i}`} from={starts[i]} durationInFrames={s.totalFrames} name={`Fala ${i + 1}`}>
          <AudioAndCaptions scene={s} isEnd={s.visual && s.visual.tipo === 'end-card'} />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
