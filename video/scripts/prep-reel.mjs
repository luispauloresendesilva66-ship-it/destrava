// Prepara um Reel (ou todos): copia promo/<id>/roteiro.json e promo/<id>/audio/cenaNN.mp3 para
// video/public/reels/<id>/, mede cada áudio (ffprobe do Remotion) e estima o tempo de cada palavra
// para as legendas karaokê: as pausas reais da voz (silencedetect do ffmpeg) são casadas com a
// pontuação da fala; dentro de cada trecho, o tempo é dividido pelo tamanho das palavras.
// Uso: node scripts/prep-reel.mjs reel-02 | node scripts/prep-reel.mjs all
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const promoDir = path.join(root, 'promo')

const require = createRequire(import.meta.url)
const pkgName = `@remotion/compositor-${process.platform}-${process.arch}${process.platform === 'win32' ? '-msvc' : ''}`
const compositorDir = path.dirname(require.resolve(`${pkgName}/package.json`, { paths: [here] }))
const exe = (n) => path.join(compositorDir, process.platform === 'win32' ? `${n}.exe` : n)

export const listReels = () =>
  fs.readdirSync(promoDir).filter((d) => /^reel-\d+$/.test(d) && fs.existsSync(path.join(promoDir, d, 'roteiro.json'))).sort()

const probeDuration = (file) => {
  const r = spawnSync(exe('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' })
  return parseFloat((r.stdout || '').trim())
}

const silences = (file) => {
  const r = spawnSync(exe('ffmpeg'), ['-hide_banner', '-i', file, '-af', 'silencedetect=noise=-35dB:d=0.11', '-f', 'null', '-'], { encoding: 'utf8' })
  const out = (r.stderr || '') + (r.stdout || '')
  const list = []
  let cur = null
  for (const line of out.split(/\r?\n/)) {
    const s = line.match(/silence_start: ([\d.]+)/)
    const e = line.match(/silence_end: ([\d.]+)/)
    if (s) cur = { s: parseFloat(s[1]) }
    if (e && cur) { cur.e = parseFloat(e[1]); list.push(cur); cur = null }
  }
  if (cur) list.push({ s: cur.s, e: Infinity })
  return list
}

// Peso de leitura de uma palavra (vogais/sílabas ~ caracteres).
const weight = (w) => w.replace(/[^\p{L}\p{N}]/gu, '').length + 1.5

export function timeWords(fala, duration, sil) {
  const words = fala.trim().split(/\s+/)
  let start = 0
  let end = duration
  const inner = []
  for (const x of sil) {
    if (x.s <= 0.05) { start = Math.max(start, x.e); continue }
    if (x.e === Infinity || x.e >= duration - 0.03) { end = Math.min(end, x.s); continue }
    inner.push(x)
  }
  // grupos que terminam em pontuação
  const groups = []
  let g = []
  words.forEach((w, i) => {
    g.push(i)
    if (/[,.!?:;]["”]?$/.test(w) || i === words.length - 1) { groups.push(g); g = [] }
  })
  const gw = groups.map((idx) => idx.reduce((a, i) => a + weight(words[i]), 0))
  // Casa as fronteiras entre grupos (pontuação) com as pausas reais por programação dinâmica,
  // comparando posições em "tempo de fala" (sem os silêncios), onde o ritmo é quase constante.
  const totalW = gw.reduce((a, b) => a + b, 0)
  const B = groups.length - 1
  const S = inner.length
  const speechTotal = Math.max(0.001, end - start - inner.reduce((a, x) => a + (x.e - x.s), 0))
  const f = []
  for (let k = 0, acc = 0; k < B; k++) { acc += gw[k]; f.push(acc / totalW) }
  const p = []
  for (let j = 0, sil = 0; j < S; j++) { p.push((inner[j].s - start - sil) / speechTotal); sil += inner[j].e - inner[j].s }
  const SKIP_B = 0.09
  const skipS = (j) => Math.min(0.12, (inner[j].e - inner[j].s) * 0.25)
  const dp = Array.from({ length: B + 1 }, () => new Array(S + 1).fill(Infinity))
  const how = Array.from({ length: B + 1 }, () => new Array(S + 1).fill(null))
  dp[0][0] = 0
  for (let k = 0; k <= B; k++) {
    for (let j = 0; j <= S; j++) {
      const c = dp[k][j]
      if (c === Infinity) continue
      if (k < B && c + SKIP_B < dp[k + 1][j]) { dp[k + 1][j] = c + SKIP_B; how[k + 1][j] = 'b' }
      if (j < S && c + skipS(j) < dp[k][j + 1]) { dp[k][j + 1] = c + skipS(j); how[k][j + 1] = 's' }
      if (k < B && j < S) {
        const v = c + Math.abs(f[k] - p[j])
        if (v < dp[k + 1][j + 1]) { dp[k + 1][j + 1] = v; how[k + 1][j + 1] = 'm' }
      }
    }
  }
  const match = new Array(B).fill(-1)
  for (let k = B, j = S; k > 0 || j > 0;) {
    const h = how[k][j]
    if (h === 'm') { match[k - 1] = j - 1; k--; j-- } else if (h === 'b') k--
    else j--
  }
  // fronteiras sem pausa: interpolação linear entre as âncoras vizinhas
  const anchorsF = [0, ...f.filter((_, k) => match[k] >= 0), 1]
  const anchorsT = [start, ...f.map((_, k) => match[k]).filter((j) => j >= 0).map((j) => (inner[j].s + inner[j].e) / 2), end]
  const tAt = (x) => {
    for (let i = 1; i < anchorsF.length; i++) {
      if (x <= anchorsF[i]) {
        const a = anchorsF[i - 1]
        const b = anchorsF[i]
        return anchorsT[i - 1] + ((x - a) / Math.max(1e-6, b - a)) * (anchorsT[i] - anchorsT[i - 1])
      }
    }
    return end
  }
  const bounds = f.map((x, k) => (match[k] >= 0 ? { endPrev: inner[match[k]].s, startNext: inner[match[k]].e } : { endPrev: tAt(x), startNext: tAt(x) }))
  const out = []
  groups.forEach((idx, k) => {
    const a = k === 0 ? start : bounds[k - 1].startNext
    const b = k === groups.length - 1 ? end : bounds[k].endPrev
    const total = gw[k]
    let acc = 0
    for (const i of idx) {
      const s = a + (acc / total) * (b - a)
      acc += weight(words[i])
      const e = a + (acc / total) * (b - a)
      out.push({ w: words[i], s: +s.toFixed(3), e: +e.toFixed(3) })
    }
  })
  return out
}

export function prepReel(id) {
  const src = path.join(promoDir, id)
  const roteiro = JSON.parse(fs.readFileSync(path.join(src, 'roteiro.json'), 'utf8'))
  const dest = path.join(here, '..', 'public', 'reels', id)
  fs.rmSync(dest, { recursive: true, force: true })
  fs.mkdirSync(dest, { recursive: true })
  fs.writeFileSync(path.join(dest, 'roteiro.json'), JSON.stringify(roteiro, null, 2))
  const audioDir = path.join(src, 'audio')
  const files = fs.existsSync(audioDir) ? fs.readdirSync(audioDir) : []
  const scenes = roteiro.cenas.map((cena, i) => {
    const re = new RegExp(`^cena${String(i + 1).padStart(2, '0')}\\.(mp3|wav|m4a)$`, 'i')
    const f = files.find((x) => re.test(x))
    if (!f) {
      console.warn(`! ${id}: sem áudio para a cena ${i + 1} — duração estimada, sem som`)
      return { file: null, duration: null, words: null }
    }
    fs.copyFileSync(path.join(audioDir, f), path.join(dest, f))
    const file = path.join(dest, f)
    const duration = probeDuration(file)
    if (!Number.isFinite(duration)) throw new Error(`Não consegui medir ${file}`)
    return { file: f, duration, words: timeWords(cena.fala, duration, silences(file)) }
  })
  fs.writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify({ id, scenes }, null, 2))
  const total = scenes.reduce((a, s) => a + (s.duration || 0) + 0.25, 0)
  console.log(`[prep] ${id}: ${scenes.filter((s) => s.file).length}/${scenes.length} áudios · ~${total.toFixed(1)} s`)
  return roteiro
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2] || 'all'
  const ids = arg === 'all' ? listReels() : process.argv.slice(2)
  for (const id of ids) prepReel(id)
}
