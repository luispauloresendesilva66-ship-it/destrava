import { interpolate, spring } from 'remotion'

// Retorna fn(frase, ocorrência) => frame em que a frase começa na fala,
// assumindo fala em ritmo constante (mesma proporção usada nas legendas).
export const makeSync = (fala, audioFrames) => (phrase, occurrence = 0) => {
  let idx = -1
  for (let i = 0; i <= occurrence; i++) idx = fala.indexOf(phrase, idx + 1)
  if (idx < 0) throw new Error(`Frase não encontrada na fala: "${phrase}"`)
  return Math.round((idx / fala.length) * audioFrames)
}

export const fadeIn = (frame, start, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

export const pop = (frame, fps, start) =>
  spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })

export const clamp01 = (v) => Math.max(0, Math.min(1, v))
