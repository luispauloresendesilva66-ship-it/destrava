// Copia aulas/<pasta>/audio/bloco{NN}.* para video/public/aulas/<id>/ e mede a duração (ffprobe do Remotion).
// Uso: node scripts/prep-audio.mjs <pasta-da-aula> <id-publico>
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'

const [, , aulaDir, publicId] = process.argv
const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const src = path.join(root, 'aulas', aulaDir, 'audio')
const dest = path.join(here, '..', 'public', 'aulas', publicId)

const require = createRequire(import.meta.url)
const pkgName = `@remotion/compositor-${process.platform}-${process.arch}${process.platform === 'win32' ? '-msvc' : ''}`
const compositorDir = path.dirname(require.resolve(`${pkgName}/package.json`, { paths: [here] }))
const ffprobe = path.join(compositorDir, process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe')

fs.rmSync(dest, { recursive: true, force: true })
fs.mkdirSync(dest, { recursive: true })

const manifest = {}
if (fs.existsSync(src)) {
  const files = fs.readdirSync(src).sort()
  for (let n = 1; n <= 99; n++) {
    const re = new RegExp(`^bloco${String(n).padStart(2, '0')}\\.[A-Za-z0-9]+$`, 'i')
    const f = files.find((x) => re.test(x))
    if (!f) continue
    fs.copyFileSync(path.join(src, f), path.join(dest, f))
    const r = spawnSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path.join(dest, f)], { encoding: 'utf8' })
    const duration = parseFloat((r.stdout || '').trim())
    if (!Number.isFinite(duration)) {
      console.warn(`! Não consegui medir ${f}: ${r.stderr}`)
      continue
    }
    manifest[n] = { file: f, duration }
  }
}
fs.writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify(manifest, null, 2))
const count = Object.keys(manifest).length
console.log(`[prep] ${count} áudio(s) encontrado(s) em ${src}${count === 0 ? ' — blocos sem áudio serão renderizados mudos (duração estimada)' : ''}`)
