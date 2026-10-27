// Renderiza um PNG no ponto médio de cada bloco -> aulas/<pasta-da-aula>/out/stills/
// Uso: node scripts/stills.mjs [Composicao pasta-da-aula] [blocos...]  (padrão: AulaN1A01 n1-a01-o-que-e-html)
// Ex.: `node scripts/stills.mjs 5 8` só os blocos 5 e 8; STILLS_EXTRA=1 gera também q1/q3 de cada bloco.
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { bundle } from '@remotion/bundler'
import { renderStill, selectComposition } from '@remotion/renderer'

const here = path.dirname(fileURLToPath(import.meta.url))
const videoDir = path.resolve(here, '..')
let args = process.argv.slice(2)
let compId = 'AulaN1A01'
let aulaDir = 'n1-a01-o-que-e-html'
if (args.length && !/^\d+$/.test(args[0])) [compId, aulaDir, ...args] = args
const outDir = path.resolve(videoDir, `../aulas/${aulaDir}/out/stills`)
fs.mkdirSync(outDir, { recursive: true })
const only = args.map(Number)

const serveUrl = await bundle({ entryPoint: path.join(videoDir, 'src/index.js'), publicDir: path.join(videoDir, 'public') })
// Em pastas com caminho muito longo no Windows (>260 caracteres) o Chrome baixado pelo Remotion não abre;
// aponte REMOTION_BROWSER para uma cópia em caminho curto.
const browserExecutable = process.env.REMOTION_BROWSER || null
const comp = await selectComposition({ serveUrl, id: compId, browserExecutable })
let from = 0
for (const t of comp.props.timings) {
  const points = {
    mid: from + Math.round(t.totalFrames / 2),
    q1: from + Math.round(t.totalFrames * 0.25),
    q3: from + Math.round(t.totalFrames * 0.8),
  }
  from += t.totalFrames
  if (only.length && !only.includes(t.n)) continue
  const extra = (process.env.STILLS_FRACS || '').split(',').filter(Boolean) // ex.: STILLS_FRACS=0.05,0.9
  const keys = ['mid', ...(process.env.STILLS_EXTRA ? ['q1', 'q3'] : []), ...extra]
  for (const k of keys) {
    const frame = k in points ? points[k] : from - t.totalFrames + Math.round(t.totalFrames * parseFloat(k))
    const file = path.join(outDir, `bloco${String(t.n).padStart(2, '0')}${k === 'mid' ? '' : '-' + k}.png`)
    await renderStill({ composition: comp, serveUrl, frame, output: file, browserExecutable })
    console.log('still', path.relative(process.cwd(), file))
  }
}
