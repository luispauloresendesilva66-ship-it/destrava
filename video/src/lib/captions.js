// Divide a fala em trechos curtos (~6-10 palavras) em fronteiras de frase/vírgula
// e distribui o tempo proporcionalmente ao número de caracteres.
const MAX_WORDS = 9
const MIN_WORDS = 4
const MAX_CHARS = 50 // cabe em uma linha a 50px em 1560px de largura

const wc = (s) => s.trim().split(/\s+/).filter(Boolean).length

export function splitCaptions(text) {
  // 1) frases (. ! ? :)
  const sentences = text.match(/[^.!?:]+[.!?:]+["”]?|[^.!?:]+$/g) || [text]
  const chunks = []
  for (const sRaw of sentences) {
    const s = sRaw.trim()
    if (!s) continue
    if (wc(s) <= MAX_WORDS) { chunks.push(s); continue }
    // 2) vírgulas
    const pieces = s.split(/(?<=,)\s+/)
    let cur = ''
    const flush = () => { if (cur.trim()) chunks.push(cur.trim()); cur = '' }
    for (const p of pieces) {
      if (!cur) { cur = p; continue }
      if (wc(cur + ' ' + p) <= MAX_WORDS) cur += ' ' + p
      else { flush(); cur = p }
    }
    flush()
  }
  // 3) quebra pedaços ainda longos (palavras ou caracteres) em partes equilibradas
  const out = []
  for (const c of chunks) {
    const words = c.split(/\s+/)
    if (words.length <= MAX_WORDS && c.length <= MAX_CHARS) { out.push(c); continue }
    const parts = Math.max(Math.ceil(words.length / MAX_WORDS), Math.ceil(c.length / MAX_CHARS))
    const size = Math.ceil(words.length / parts)
    for (let i = 0; i < words.length; i += size) out.push(words.slice(i, i + size).join(' '))
  }
  // 4) junta pedaços minúsculos ao anterior, se couber
  const merged = []
  for (const c of out) {
    const prev = merged[merged.length - 1]
    if (prev && wc(c) < MIN_WORDS && wc(prev) + wc(c) <= MAX_WORDS && prev.length + c.length < MAX_CHARS) merged[merged.length - 1] += ' ' + c
    else merged.push(c)
  }
  return merged
}

// [{text, from, to}] em frames, relativo ao início do bloco.
// fix (opcional): [[dito, mostrado], ...] — trechos que a voz diz por extenso (ex.: "u éle") e a legenda
// mostra como no código (ex.: "ul"). O tempo continua proporcional ao texto falado, e o trecho nunca é
// partido entre duas legendas (os espaços internos viram um "word joiner" durante a divisão).
const JOIN = "⁠"
export function timeCaptions(text, audioFrames, fix) {
  let spoken = text
  for (const [said] of fix || []) spoken = spoken.split(said).join(said.replace(/ /g, JOIN))
  const chunks = splitCaptions(spoken)
  const total = chunks.reduce((a, c) => a + c.length, 0)
  const show = (c) => {
    let t = c
    for (const [said, shown] of fix || []) t = t.split(said.replace(/ /g, JOIN)).join(shown)
    return t.split(JOIN).join(" ")
  }
  let acc = 0
  return chunks.map((c) => {
    const from = Math.round((acc / total) * audioFrames)
    acc += c.length
    const to = Math.round((acc / total) * audioFrames)
    return { text: show(c), from, to }
  })
}
