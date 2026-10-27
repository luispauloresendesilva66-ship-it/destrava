import { staticFile } from 'remotion'
import { FPS, PAD_SECONDS, WORDS_PER_MINUTE } from '../theme.js'

export const estimateSeconds = (fala) => (fala.trim().split(/\s+/).length / WORDS_PER_MINUTE) * 60

// Lê o manifest gerado por scripts/prep-audio.mjs (áudios copiados para public/aulas/<id>/,
// já com a duração medida) e devolve, por bloco, { n, file, audioFrames, totalFrames }.
// Bloco sem áudio: duração estimada pela contagem de palavras (140 palavras/min), sem som.
export async function loadTimings(publicId, blocks) {
  let manifest = {}
  try {
    const res = await fetch(staticFile(`aulas/${publicId}/manifest.json`))
    if (res.ok) manifest = await res.json()
  } catch {
    manifest = {}
  }
  return blocks.map((b) => {
    const m = manifest[b.n]
    const seconds = m ? m.duration : estimateSeconds(b.fala)
    const audioFrames = Math.round(seconds * FPS)
    return {
      n: b.n,
      file: m ? `aulas/${publicId}/${m.file}` : null,
      audioFrames,
      totalFrames: audioFrames + Math.round(PAD_SECONDS * FPS),
    }
  })
}
