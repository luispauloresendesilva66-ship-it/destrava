// Gera os ícones do PWA a partir do símbolo do Logo.jsx.
// Uso: node scripts/generate-icons.js
import { Resvg } from '@resvg/resvg-js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const OUT = fileURLToPath(new URL('../web/public/icons/', import.meta.url))
const BG = '#26215C'
const PURPLE = '#7F77DD'
const GREEN = '#97C459'

// Símbolo (mesma geometria de web/src/components/Logo.jsx), viewBox 66x88.
// Sobre fundo noite usa o roxo claro do tema escuro para dar contraste.
const symbol = `
  <circle cx="32" cy="56" r="32" fill="${PURPLE}" />
  <rect x="52" y="0" width="14" height="88" rx="7" fill="${PURPLE}" />
  <circle cx="32" cy="50" r="9" fill="${GREEN}" />
  <path d="M28 55 L24 74 H40 L36 55 Z" fill="${GREEN}" />`

// size: lado do PNG; radius: fração do raio; scale: fração do lado ocupada pela altura do símbolo.
function icon(size, radius, scale) {
  const h = size * scale
  const k = h / 88
  const x = (size - 66 * k) / 2
  const y = (size - h) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * radius}" fill="${BG}" />
  <g transform="translate(${x} ${y}) scale(${k})">${symbol}</g>
</svg>`
}

const targets = [
  ['icon-192.png', 192, 0.22, 0.56],
  ['icon-512.png', 512, 0.22, 0.56],
  ['icon-maskable-512.png', 512, 0, 0.5], // sem raio; símbolo dentro da zona segura (~80%)
  ['apple-touch-icon.png', 180, 0, 0.56], // iOS aplica o próprio arredondamento
]

mkdirSync(OUT, { recursive: true })
for (const [name, size, radius, scale] of targets) {
  const png = new Resvg(icon(size, radius, scale), { fitTo: { mode: 'width', value: size } }).render().asPng()
  writeFileSync(OUT + name, png)
  console.log('gerado', name)
}
