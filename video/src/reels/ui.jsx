// Peças de interface dos Reels: ícones, celular, prévia de HTML, QR fictício.
import React from 'react'
import { random } from 'remotion'
import { CODE, DISPLAY, R, SANS } from './theme.js'
import { rgba } from './core.jsx'

// ---------------------------------------------------------------- ícones (traço branco, 64x64)
const P = {
  speaker: <><path d="M10 25 H21 L35 13 V51 L21 39 H10 Z" fill="currentColor" /><path d="M43 23 Q51 32 43 41 M49 17 Q61 32 49 47" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></>,
  wifi: <><path d="M8 26 Q32 4 56 26 M16 34 Q32 20 48 34 M24 42 Q32 35 40 42" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" /><circle cx="32" cy="50" r="4.5" fill="currentColor" /><path d="M12 56 L52 10" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" /></>,
  image: <><rect x="8" y="12" width="48" height="40" rx="7" fill="none" stroke="currentColor" strokeWidth="5" /><circle cx="22" cy="25" r="5" fill="currentColor" /><path d="M12 47 L26 34 L35 42 L42 36 L54 47" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" /><path d="M36 12 L30 30 L38 32 L32 52" fill="none" stroke="#120F33" strokeWidth="5" /></>,
  heart: <path d="M32 54 C32 54 9 40 9 24 A12 12 0 0 1 32 17 A12 12 0 0 1 55 24 C55 40 32 54 32 54 Z" fill="currentColor" />,
  refresh: <><path d="M50 30 A18 18 0 1 1 42 16" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><path d="M36 8 L46 16 L36 24" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></>,
  shield: <><path d="M32 6 L54 14 V30 C54 44 44 53 32 58 C20 53 10 44 10 30 V14 Z" fill="currentColor" /><path d="M22 32 L29 39 L43 24" fill="none" stroke="#120F33" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></>,
  link: <><path d="M27 37 L37 27" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><path d="M24 30 L17 37 A9 9 0 0 0 29 49 L36 42 M40 34 L47 27 A9 9 0 0 0 35 15 L28 22" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></>,
  spark: <path d="M32 6 L37 26 L57 32 L37 38 L32 58 L27 38 L7 32 L27 26 Z" fill="currentColor" />,
  unlock: <><path d="M20 28 V20 a12 12 0 0 1 23 -4" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><rect x="12" y="28" width="40" height="30" rx="8" fill="currentColor" /><circle cx="32" cy="42" r="5" fill="#120F33" /></>,
  lock: <><path d="M20 28 V20 a12 12 0 0 1 24 0 V28" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><rect x="12" y="28" width="40" height="30" rx="8" fill="currentColor" /><circle cx="32" cy="42" r="5" fill="#120F33" /></>,
  play: <path d="M22 14 L50 32 L22 50 Z" fill="currentColor" strokeLinejoin="round" />,
  pause: <><rect x="18" y="14" width="10" height="36" rx="3" fill="currentColor" /><rect x="36" y="14" width="10" height="36" rx="3" fill="currentColor" /></>,
  check: <path d="M14 33 L27 46 L51 19" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />,
  x: <path d="M18 18 L46 46 M46 18 L18 46" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />,
  bulb: <><path d="M32 6 A17 17 0 0 1 42 37 V44 H22 V37 A17 17 0 0 1 32 6 Z" fill="currentColor" /><rect x="23" y="48" width="18" height="6" rx="3" fill="currentColor" /></>,
  calendar: <><rect x="9" y="13" width="46" height="42" rx="8" fill="none" stroke="currentColor" strokeWidth="5" /><path d="M9 25 H55 M21 7 V17 M43 7 V17" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></>,
  phone: <><rect x="18" y="5" width="28" height="54" rx="7" fill="none" stroke="currentColor" strokeWidth="5" /><circle cx="32" cy="50" r="3" fill="currentColor" /></>,
  star: <path d="M32 6 L39 24 L58 25 L43 37 L48 56 L32 45 L16 56 L21 37 L6 25 L25 24 Z" fill="currentColor" />,
}
export const Icon = ({ name, size = 48, color = R.white, style }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ color, flexShrink: 0, overflow: 'visible', ...style }}>{P[name] || P.spark}</svg>
)

// Escolhe um ícone pelo texto do selo.
export const iconFor = (text) => {
  const t = text.toLowerCase()
  if (/leitor|ouv|tela/.test(t)) return 'speaker'
  if (/internet|lent|conex/.test(t)) return 'wifi'
  if (/imagem|foto/.test(t)) return 'image'
  if (/vida/.test(t)) return 'heart'
  if (/recarreg|amanh|volta/.test(t)) return 'refresh'
  if (/fidelidade|cancela|parcela|spc|d[ií]vida|nome/.test(t)) return 'shield'
  if (/clique|link/.test(t)) return 'link'
  if (/celular/.test(t)) return 'phone'
  if (/dia|hora/.test(t)) return 'calendar'
  return 'spark'
}

// ---------------------------------------------------------------- celular
export const Phone = ({ width = 420, height = 760, children, style, glow = R.violet }) => (
  <div style={{ width, height, borderRadius: 66, padding: 14, background: 'linear-gradient(160deg, #3A3470 0%, #17133A 60%, #2A2460 100%)', boxShadow: `0 40px 90px -20px rgba(5,3,25,0.85), 0 0 80px -10px ${rgba(glow, 0.45)}, inset 0 0 0 2px rgba(255,255,255,0.14)`, position: 'relative', ...style }}>
    <div style={{ width: '100%', height: '100%', borderRadius: 54, overflow: 'hidden', position: 'relative', background: `radial-gradient(90% 50% at 85% 0%, rgba(127,119,221,0.45), transparent 70%), linear-gradient(180deg, ${R.night900}, ${R.night})` }}>
      <div style={{ position: 'absolute', top: 14, left: '50%', marginLeft: -60, width: 120, height: 34, borderRadius: 20, background: '#07051A', zIndex: 5 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 34px 0', fontFamily: SANS, fontWeight: 700, fontSize: 22, color: R.white }}>
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 26, height: 13, borderRadius: 4, border: '2px solid #fff', position: 'relative' }}><span style={{ position: 'absolute', inset: 2, right: 6, background: '#fff', borderRadius: 1 }} /></span>
        </span>
      </div>
      <div style={{ position: 'absolute', inset: '64px 0 0 0' }}>{children}</div>
    </div>
  </div>
)

export const Hearts = ({ n = 5, lost = 0, size = 30 }) => (
  <div style={{ display: 'flex', gap: 6 }}>
    {Array.from({ length: n }).map((_, i) => (
      <Icon key={i} name="heart" size={size} color={i < n - lost ? R.magenta : 'rgba(255,255,255,0.22)'} style={{ filter: i < n - lost ? `drop-shadow(0 0 6px ${rgba(R.magenta, 0.7)})` : 'none' }} />
    ))}
  </div>
)

// ---------------------------------------------------------------- prévia de HTML
// Converte um HTML simples (h1-h6, p, a, img, br, strong, em) em elementos estilizados de "página".
const H_SIZES = { h1: 50, h2: 40, h3: 33, h4: 28, h5: 24, h6: 20 }
export const PREVIEW = { link: '#2F5BD3', text: '#26215C' }

export const FakePhoto = ({ alt, w = 230, h = 170, broken = false }) =>
  broken ? (
    <div style={{ width: w, height: h, borderRadius: 12, border: '3px dashed #B9B5D6', background: '#F1F0FA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#5F5A86' }}>
      <Icon name="image" size={64} color="#9E97D6" />
      {alt ? <span style={{ fontFamily: SANS, fontSize: 20, padding: '0 10px', textAlign: 'center' }}>{alt}</span> : null}
    </div>
  ) : (
    <div style={{ width: w, height: h, borderRadius: 14, overflow: 'hidden', position: 'relative', background: 'linear-gradient(160deg, #FFD9A8 0%, #F7A3D2 55%, #B3ADFF 100%)', boxShadow: '0 6px 18px rgba(38,33,92,0.18)' }}>
      <div style={{ position: 'absolute', left: w * 0.5 - h * 0.17, top: h * 0.2, width: h * 0.34, height: h * 0.34, borderRadius: '50%', background: '#7A4A35' }} />
      <div style={{ position: 'absolute', left: w * 0.5 - h * 0.14, top: h * 0.24, width: h * 0.28, height: h * 0.3, borderRadius: '50%', background: '#E9B48E' }} />
      <div style={{ position: 'absolute', left: w * 0.5 - h * 0.06, top: h * 0.4, width: h * 0.12, height: h * 0.05, borderRadius: '0 0 20px 20px', borderBottom: '3px solid #8A3A2A' }} />
      <div style={{ position: 'absolute', left: w * 0.5 - h * 0.32, top: h * 0.62, width: h * 0.64, height: h * 0.5, borderRadius: '50% 50% 0 0', background: R.violet }} />
    </div>
  )

const toReact = (node, key, opts) => {
  if (node.nodeType === 3) return node.textContent
  if (node.nodeType !== 1) return null
  const tag = node.tagName.toLowerCase()
  const kids = Array.from(node.childNodes).map((c, i) => toReact(c, i, opts))
  const s = opts.scale || 1
  if (H_SIZES[tag]) return <div key={key} style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: H_SIZES[tag] * s, lineHeight: 1.12, letterSpacing: '-0.02em', color: PREVIEW.text, margin: `0 0 ${12 * s}px` }}>{kids}</div>
  if (tag === 'p') return <div key={key} style={{ fontFamily: SANS, fontSize: 28 * s, lineHeight: 1.35, color: '#3B3670', margin: `0 0 ${12 * s}px` }}>{kids}</div>
  if (tag === 'a') return <span key={key} style={{ color: PREVIEW.link, textDecoration: 'underline', textUnderlineOffset: 4, fontFamily: SANS, fontSize: opts.inline ? undefined : 28 * s, fontWeight: 600 }}>{kids}</span>
  if (tag === 'br') return <br key={key} />
  if (tag === 'strong' || tag === 'b') return <strong key={key}>{kids}</strong>
  if (tag === 'em' || tag === 'i') return <em key={key}>{kids}</em>
  if (tag === 'img') {
    const src = node.getAttribute('src') || ''
    const alt = node.getAttribute('alt')
    const broken = /quebrad|broken/.test(src) || !src
    return <div key={key} style={{ display: 'inline-block', margin: `${6 * s}px 0` }}><FakePhoto alt={alt} broken={broken} w={230 * s} h={170 * s} /></div>
  }
  return <span key={key}>{kids}</span>
}

// Retorna os blocos de topo (para animar um a um) e o título da aba.
export const parseHtml = (html) => {
  if (typeof DOMParser === 'undefined') return { blocks: [], title: null }
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const title = doc.querySelector('title') ? doc.querySelector('title').textContent : null
  const blocks = []
  let inline = []
  const flush = () => { if (inline.length) blocks.push({ kind: 'inline', nodes: inline }); inline = [] }
  for (const n of Array.from(doc.body.childNodes)) {
    const tag = n.nodeType === 1 ? n.tagName.toLowerCase() : '#text'
    if (H_SIZES[tag] || tag === 'p') { flush(); blocks.push({ kind: 'block', nodes: [n] }) }
    else if (tag === 'br') flush()
    else if (tag === '#text' && !n.textContent.trim()) continue
    else inline.push(n)
  }
  flush()
  return { blocks, title }
}

export const HtmlBlock = ({ block, scale = 1 }) =>
  block.kind === 'block' ? (
    toReact(block.nodes[0], 0, { scale })
  ) : (
    <div style={{ fontFamily: SANS, fontSize: 28 * scale, color: '#3B3670', margin: `0 0 ${12 * scale}px`, display: 'flex', alignItems: 'center', gap: 16 * scale, flexWrap: 'wrap' }}>
      {block.nodes.map((n, i) => toReact(n, i, { scale, inline: true }))}
    </div>
  )

// Altura estimada (px de design) de uma página, para caber na janela.
export const estimateHtmlHeight = (blocks) =>
  blocks.reduce((a, b) => {
    if (b.kind === 'inline') return a + (b.nodes.some((n) => n.nodeType === 1 && n.tagName.toLowerCase() === 'img') ? 190 : 50)
    const tag = b.nodes[0].tagName.toLowerCase()
    return a + (H_SIZES[tag] ? H_SIZES[tag] * 1.12 : 28 * 1.35 * Math.ceil((b.nodes[0].textContent.length * 15) / 640)) + 12
  }, 0)

// ---------------------------------------------------------------- QR fictício (padrão determinístico)
export const FakeQR = ({ size = 220, seed = 'destrava', color = R.night950 }) => {
  const N = 25
  const c = size / N
  const finder = (x, y) => {
    for (const [fx, fy] of [[0, 0], [N - 7, 0], [0, N - 7]]) {
      if (x >= fx && x < fx + 7 && y >= fy && y < fy + 7) {
        const dx = x - fx
        const dy = y - fy
        return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0
      }
      if (x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7) return 0
    }
    return -1
  }
  const cells = []
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const f = finder(x, y)
      const on = f === -1 ? random(`${seed}-${x}-${y}`) > 0.52 : f === 1
      if (on) cells.push(<rect key={`${x}-${y}`} x={x * c} y={y * c} width={c + 0.4} height={c + 0.4} fill={color} />)
    }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{cells}</svg>
}

export const Mono = ({ children, style }) => <span style={{ fontFamily: CODE, fontWeight: 700, ...style }}>{children}</span>
