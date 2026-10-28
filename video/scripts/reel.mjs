// Stills e render dos Reels (composição "Reel", props { id }).
// Uso:
//   node scripts/reel.mjs render reel-02 [reel-03 ...]   -> promo/<id>/out/<id>.mp4
//   node scripts/reel.mjs render all                     -> os 15, um depois do outro
//   node scripts/reel.mjs still reel-02 | all            -> promo/<id>/out/stills/*.png (+ contato.png)
// No Windows, com a pasta num caminho longo, aponte REMOTION_BROWSER (ou --browser-executable=...) para um
// chrome-headless-shell em caminho curto.
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { bundle } from '@remotion/bundler'
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer'
import { listReels, prepReel } from './prep-reel.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const videoDir = path.resolve(here, '..')
const promoDir = path.resolve(videoDir, '../promo')

const argv = process.argv.slice(2)
const flag = argv.find((a) => a.startsWith('--browser-executable='))
const browserExecutable = (flag && flag.split('=')[1]) || process.env.REMOTION_BROWSER || null
const [cmd, ...rest] = argv.filter((a) => !a.startsWith('--'))
if (!['render', 'still'].includes(cmd)) {
  console.error('Uso: node scripts/reel.mjs <render|still> <reel-NN ...|all>')
  process.exit(1)
}
const ids = !rest.length || rest[0] === 'all' ? listReels() : rest

for (const id of ids) prepReel(id)
const serveUrl = await bundle({ entryPoint: path.join(videoDir, 'src/index.js'), publicDir: path.join(videoDir, 'public') })


for (const id of ids) {
  const inputProps = { id }
  const comp = await selectComposition({ serveUrl, id: 'Reel', inputProps, browserExecutable })
  const outDir = path.join(promoDir, id, 'out')
  if (cmd === 'still') {
    const dir = path.join(outDir, 'stills')
    fs.rmSync(dir, { recursive: true, force: true })
    fs.mkdirSync(dir, { recursive: true })
    const points = [{ name: '00-gancho', frame: 0 }]
    let from = 0
    comp.props.reel.scenes.forEach((s, i) => {
      const n = String(i + 1).padStart(2, '0')
      points.push({ name: `cena${n}-a`, frame: from + 14 })
      points.push({ name: `cena${n}-b`, frame: from + Math.round(s.audioFrames * 0.85) })
      points.push({ name: `cena${n}-c`, frame: from + s.totalFrames - 2 })
      from += s.totalFrames
    })
    for (const p of points) {
      await renderStill({ composition: comp, serveUrl, frame: p.frame, output: path.join(dir, `${p.name}.png`), inputProps, browserExecutable })
    }
    // folha de contato (miniaturas lado a lado) para revisar rápido — screenshot do próprio Chrome headless
    const cols = Math.min(points.length, 9)
    const rows = Math.ceil(points.length / cols)
    const html = `<html><body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(${cols},360px)">${points.map((p) => `<img src="${p.name}.png" style="width:360px;height:640px;display:block">`).join('')}</body></html>`
    fs.writeFileSync(path.join(dir, 'contato.html'), html)
    if (browserExecutable) {
      spawnSync(browserExecutable, ['--headless', '--disable-gpu', '--hide-scrollbars', `--screenshot=${path.join(dir, 'contato.png')}`, `--window-size=${cols * 360},${rows * 640}`, 'file:///' + path.join(dir, 'contato.html').split(path.sep).join('/')], { stdio: 'ignore' })
    }
    fs.rmSync(path.join(dir, 'contato.html'), { force: true })
    console.log(`[still] ${id}: ${points.length} stills em ${path.relative(process.cwd(), dir)}`)
  } else {
    fs.mkdirSync(outDir, { recursive: true })
    const output = path.join(outDir, `${id}.mp4`)
    const t0 = Date.now()
    let last = -1
    await renderMedia({
      composition: comp,
      serveUrl,
      codec: 'h264',
      crf: 23,
      audioCodec: 'aac',
      audioBitrate: '160k',
      pixelFormat: 'yuv420p',
      colorSpace: 'bt709', // yuv420p em faixa TV (sem isso sai yuvj420p)
      outputLocation: output,
      inputProps,
      browserExecutable,
      overwrite: true,
      onProgress: ({ progress }) => {
        const pct = Math.floor(progress * 10) * 10
        if (pct !== last) { last = pct; process.stdout.write(`\r[render] ${id} ${pct}%   `) }
      },
    })
    console.log(`\n[render] ${id}: ${path.relative(process.cwd(), output)} (${((Date.now() - t0) / 1000).toFixed(0)} s)`)
  }
}
