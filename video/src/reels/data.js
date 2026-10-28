import { staticFile } from 'remotion'
import { RFPS, SCENE_PAD } from './theme.js'

const WPM = 150

// Palavras sem tempo (cena sem áudio): ritmo constante.
const estimateWords = (fala) => {
  const words = fala.trim().split(/\s+/)
  const total = words.reduce((a, w) => a + w.length + 1.5, 0)
  const dur = (words.length / WPM) * 60
  let acc = 0
  return {
    duration: dur,
    words: words.map((w) => {
      const s = (acc / total) * dur
      acc += w.length + 1.5
      return { w, s, e: (acc / total) * dur }
    }),
  }
}

export const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

// O visual continua da cena anterior? (quiz em cenas seguidas: pergunta → resposta)
const continues = (prev, cur) => prev && cur && prev.tipo === 'quiz' && cur.tipo === 'quiz' && prev.pergunta === cur.pergunta

// Lê public/reels/<id>/roteiro.json + manifest.json (gerados por scripts/prep-reel.mjs).
export async function loadReel(id) {
  const roteiro = await fetch(staticFile(`reels/${id}/roteiro.json`)).then((r) => {
    if (!r.ok) throw new Error(`Rode "node scripts/prep-reel.mjs ${id}" antes (faltou public/reels/${id}/roteiro.json)`)
    return r.json()
  })
  let manifest = { scenes: [] }
  try {
    const r = await fetch(staticFile(`reels/${id}/manifest.json`))
    if (r.ok) manifest = await r.json()
  } catch {
    manifest = { scenes: [] }
  }
  const scenes = roteiro.cenas.map((cena, i) => {
    const m = manifest.scenes[i]
    const base = m && m.file ? m : { file: null, ...estimateWords(cena.fala) }
    const audioFrames = Math.ceil(base.duration * RFPS)
    const prev = roteiro.cenas[i - 1]
    const next = roteiro.cenas[i + 1]
    return {
      index: i,
      fala: cena.fala,
      titulo: cena.titulo,
      visual: cena.visual,
      file: base.file ? `reels/${id}/${base.file}` : null,
      audioFrames,
      totalFrames: audioFrames + Math.round(SCENE_PAD * RFPS),
      words: base.words.map((w) => ({ w: w.w, s: Math.round(w.s * RFPS), e: Math.round(w.e * RFPS) })),
      continuesFromPrev: continues(prev && prev.visual, cena.visual),
      continuesToNext: continues(cena.visual, next && next.visual),
    }
  })
  return { id, titulo: roteiro.titulo, tipo: roteiro.tipo, scenes }
}

export const calculateReelMetadata = async ({ props }) => {
  const reel = await loadReel(props.id || 'reel-01')
  return {
    durationInFrames: reel.scenes.reduce((a, s) => a + s.totalFrames, 0),
    props: { ...props, reel },
  }
}

// Frame (local da cena) em que a frase começa a ser falada; fallback quando não acha.
export const makeWordSync = (words) => (phrase, fallback, after = 0) => {
  const target = norm(phrase).split(' ').filter(Boolean)
  if (!target.length) return fallback
  const toks = words.map((w) => norm(w.w))
  for (let i = 0; i < toks.length; i++) {
    if (words[i].s < after) continue
    let ok = true
    for (let k = 0; k < target.length; k++) if (toks[i + k] !== target[k]) { ok = false; break }
    if (ok) return words[i].s
  }
  return fallback
}

// Legendas karaokê: blocos de 2–4 palavras, quebrando na pontuação.
export function chunkWords(words, maxWords = 4, maxChars = 22) {
  const chunks = []
  let cur = []
  const flush = () => { if (cur.length) chunks.push(cur); cur = [] }
  words.forEach((w, i) => {
    const len = cur.reduce((a, x) => a + x.w.length + 1, 0)
    if (cur.length >= maxWords || (cur.length >= 2 && len + w.w.length > maxChars)) flush()
    cur.push({ ...w, i })
    if (/[,.!?:;]["”]?$/.test(w.w)) flush()
  })
  flush()
  // um bloco de uma palavra só gruda no vizinho quando cabe
  const out = []
  for (const c of chunks) {
    const prev = out[out.length - 1]
    const prevEndsSentence = prev && /[.!?]["”]?$/.test(prev[prev.length - 1].w)
    const len = (arr) => arr.reduce((a, x) => a + x.w.length + 1, 0)
    if (prev && c.length === 1 && !prevEndsSentence && prev.length < maxWords && len(prev) + len(c) <= maxChars + 2) prev.push(...c)
    else out.push(c)
  }
  return out
}
