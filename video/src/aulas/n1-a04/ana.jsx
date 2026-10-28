// Aula 4: ilustrações genéricas das imagens do exemplo (desenhadas aqui, sem fotos reais),
// linhas de código, prévias e pequenos recursos visuais (imagem quebrada, balão do leitor de tela...).
import React from 'react'
import { C, FONT, MONO } from '../../theme.js'
import { CodeTyping } from '../../components/CodeTyping.jsx'
import { SpeakerIcon } from '../../components/Icons.jsx'
import { TXT } from '../n1-a03/ana.jsx'

export { TXT }
export const ALT_ANA = 'Ana sorrindo, com um caderno de anotações na mão'
export const ALT_REC = 'Tela do site de receitas, com a lista de pratos'
export const ALT_LINK = 'Abrir o site de receitas da Ana'
export const IMG_FOTO = `<img src="imagens/foto-ana.jpg">`
export const IMG_FOTO_ALT = `<img src="imagens/foto-ana.jpg" alt="${ALT_ANA}">`
export const IMG_PROJ = `<img src="../imagens/projeto-receitas.png">`

const SKIN = '#E9B994'

// ------------------------------------------------------------------ foto-ana.jpg (avatar ilustrado, quadrado)
// squash < 1 achata a imagem (proporção quebrada).
export const AvatarAna = ({ size = 200, squash = 1, rounded = 10, style }) => (
  <svg width={size} height={size * squash} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ display: 'block', borderRadius: rounded, flexShrink: 0, ...style }}>
    <rect width="100" height="100" fill="#DDDAF6" />
    <circle cx="50" cy="46" r="38" fill="#C9C5EE" />
    <path d="M30 40 Q27 64 36 68 L64 68 Q73 64 70 40 Z" fill={C.night} />
    <path d="M12 100 C14 78 30 69 50 69 C70 69 86 78 88 100 Z" fill={C.purple} />
    <path d="M42 69 L50 78 L58 69 Z" fill={C.lavender} />
    <rect x="44" y="56" width="12" height="15" rx="4" fill={SKIN} />
    <ellipse cx="50" cy="41" rx="15" ry="17" fill={SKIN} />
    <path d="M33 39 Q35 20 52 21 Q67 22 67 39 Q60 30 47 31 Q39 32 33 39 Z" fill={C.night} />
    <circle cx="44.5" cy="42" r="1.8" fill={C.night} />
    <circle cx="55.5" cy="42" r="1.8" fill={C.night} />
    <circle cx="41" cy="48" r="2.6" fill="#E58F8F" opacity="0.35" />
    <circle cx="59" cy="48" r="2.6" fill="#E58F8F" opacity="0.35" />
    <path d="M44 49 Q50 55 56 49" fill="none" stroke={C.night} strokeWidth="2" strokeLinecap="round" />
    {/* caderno de anotações na mão */}
    <g transform="rotate(-10 70 84)">
      <rect x="58" y="72" width="26" height="22" rx="2" fill={C.white} stroke={C.night} strokeWidth="1.6" />
      <line x1="62" y1="79" x2="80" y2="79" stroke={C.purpleSoft} strokeWidth="1.4" />
      <line x1="62" y1="84" x2="80" y2="84" stroke={C.purpleSoft} strokeWidth="1.4" />
      <line x1="62" y1="89" x2="74" y2="89" stroke={C.purpleSoft} strokeWidth="1.4" />
      {[61, 66, 71, 76, 81].map((x) => <circle key={x} cx={x} cy="72" r="1.2" fill={C.night} />)}
    </g>
    <circle cx="60" cy="88" r="4.2" fill={SKIN} stroke={C.night} strokeWidth="0.8" />
  </svg>
)

// ------------------------------------------------------------------ projeto-receitas.png (miniatura 16:9)
export const ReceitasThumb = ({ width = 320, style }) => (
  <svg width={width} height={(width * 180) / 320} viewBox="0 0 320 180" style={{ display: 'block', flexShrink: 0, ...style }}>
    <rect x="1" y="1" width="318" height="178" rx="8" fill={C.white} stroke={C.purpleSoft} strokeWidth="2" />
    <path d="M1 9 a8 8 0 0 1 8 -8 H311 a8 8 0 0 1 8 8 V30 H1 Z" fill={C.purple} />
    <text x="14" y="21" fontFamily={FONT} fontSize="14" fontWeight="700" fill={C.white}>Receitas de casa</text>
    {[0, 1, 2].map((i) => <circle key={i} cx={268 + i * 14} cy="15.5" r="3.5" fill={C.lavender} opacity="0.8" />)}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${14 + i * 100} 42)`}>
        <rect width="92" height="124" rx="8" fill={C.lavender} stroke={C.purpleSoft} strokeWidth="1.6" />
        <circle cx="46" cy="44" r="28" fill={C.white} stroke={C.purpleSoft} strokeWidth="1.6" />
        <circle cx="46" cy="44" r="17" fill={['#F2C57C', '#E59A6B', '#B9B3EC'][i]} />
        <circle cx={40 + i * 3} cy="39" r="4" fill={C.white} opacity="0.6" />
        <rect x="12" y="86" width="68" height="8" rx="4" fill={C.purpleSoft} />
        <rect x="12" y="102" width="44" height="7" rx="3.5" fill="#C9C5EE" />
      </g>
    ))}
  </svg>
)

// ------------------------------------------------------------------ enfeite.svg (linha ondulada)
export const Enfeite = ({ width = 600, color = C.purpleSoft }) => {
  const n = 10
  const step = width / n
  let d = `M0 14`
  for (let i = 0; i < n; i++) d += ` Q${i * step + step / 4} ${i % 2 ? 26 : 2} ${i * step + step / 2} 14 T${(i + 1) * step} 14`
  return (
    <svg width={width} height="28" viewBox={`0 0 ${width} 28`} style={{ display: 'block', overflow: 'visible' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

// ------------------------------------------------------------------ ícone de imagem quebrada + texto do alt
export const BrokenIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
    <path d="M4 5 H28 V15 L23 19 L19 15 L14 20 L10 17 L4 21 Z" fill={C.white} stroke="#8E8AB8" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 25 L10 21 L14 24 L19 19 L23 23 L28 19 V28 H4 Z" fill={C.white} stroke="#8E8AB8" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="11" cy="10" r="2.4" fill="#8E8AB8" />
  </svg>
)
// Como o navegador mostra uma imagem que não carregou: ícone quebrado e o alt ao lado.
export const BrokenImg = ({ alt, fs = 22, width, height, style }) => (
  <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: fs * 0.4, width, height, boxSizing: 'border-box', padding: fs * 0.3, border: '2px solid #D5D2F2', borderRadius: 6, fontFamily: FONT, fontSize: fs, color: '#4A4A4A', lineHeight: 1.3, ...style }}>
    <BrokenIcon size={fs * 1.5} />
    {alt && <span>{alt}</span>}
  </div>
)

// Espaço tracejado à espera de uma imagem.
export const Slot = ({ width, height, children, fill = 0, style }) => (
  <div style={{ position: 'relative', width, height, borderRadius: 10, border: `3px dashed ${C.purpleSoft}`, boxSizing: 'border-box', background: `rgba(238,237,254,${0.6 * (1 - fill)})`, ...style }}>
    <div style={{ position: 'absolute', inset: -3, opacity: fill, transform: `scale(${0.9 + 0.1 * fill})` }}>{children}</div>
  </div>
)

// ------------------------------------------------------------------ leitor de tela: alto-falante + balão
// strike: balão riscado (o que NÃO queremos ouvir). silent: alto-falante sem ondas.
export const SpeechBubble = ({ text, fs = 30, strike = 0, width, silent = false, icon = 84, op = 1 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: op, transform: `translateY(${(1 - op) * 12}px)` }}>
    <div style={{ flexShrink: 0 }}><SpeakerIcon size={icon} waves={silent ? 0 : 2} /></div>
    <div style={{ position: 'relative', width, background: C.white, border: `4px solid ${strike ? '#B9B5DE' : C.purple}`, borderRadius: 24, padding: '12px 24px', fontFamily: FONT, fontSize: fs, fontWeight: 600, color: strike ? '#6E6A99' : C.night, lineHeight: 1.25, boxShadow: '0 12px 28px rgba(38,33,92,0.16)' }}>
      “{text}”
      <div style={{ position: 'absolute', left: -20, top: '50%', marginTop: -12, width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderRight: `20px solid ${strike ? '#B9B5DE' : C.purple}` }} />
      {strike > 0 && (
        <svg style={{ position: 'absolute', inset: 0, overflow: 'visible' }} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="2" y1="88" x2={2 + 96 * strike} y2={88 - 76 * strike} stroke={C.red} strokeWidth="5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        </svg>
      )}
    </div>
  </div>
)

// ------------------------------------------------------------------ cartão de código (sem numeração)
// Geometria: caractere `col` da linha `line` fica em cardAt(...). Posicionado em (x, y).
export const CARD_PAD = { x: 26, y: 18, b: 3 }
export const cardAt = (card, line, col) => ({
  x: card.x + CARD_PAD.b + CARD_PAD.x + col * card.fs * 0.55,
  y: card.y + CARD_PAD.b + CARD_PAD.y + line * card.fs * 1.5 + card.fs * 0.75,
})
export const cardSpan = (card, line, text, sub, occ = 0) => {
  let c = -1
  for (let k = 0; k <= occ; k++) c = text.indexOf(sub, c + 1)
  const a = cardAt(card, line, c)
  const b = cardAt(card, line, c + sub.length)
  return { x: (a.x + b.x) / 2, x0: a.x, x1: b.x, y: a.y, top: a.y - card.fs * 0.75, bottom: a.y + card.fs * 0.75 }
}
export const CodeCard = ({ x, y, fs = 40, segments, text, highlights, width, mark, op = 1, title, children, glow = 0 }) => (
  <div style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `translateY(${(1 - op) * 14}px)` }}>
    {title && <div style={{ position: 'absolute', bottom: '100%', marginBottom: 8, left: 4, fontFamily: MONO, fontSize: 24, color: C.purple, fontWeight: 700, whiteSpace: 'nowrap' }}>{title}</div>}
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20, width, background: C.nightDeep, border: `${CARD_PAD.b}px solid ${C.purple}`, borderRadius: 18, padding: `${CARD_PAD.y}px ${CARD_PAD.x}px`, boxShadow: `0 16px 40px rgba(27,23,68,0.3)${glow ? `, 0 0 ${36 * glow}px ${C.purpleSoft}` : ''}` }}>
      <div style={{ position: 'relative' }}>
        <CodeTyping segments={segments || [{ text, start: 0, frames: 0 }]} fontSize={fs} lineNumbers={false} cursor={!!segments} highlights={highlights} />
        {children}
      </div>
      {mark && <div style={{ flexShrink: 0, display: 'flex' }}>{mark}</div>}
    </div>
  </div>
)

// ------------------------------------------------------------------ prévias da página da Ana
const linkStyle = { color: C.link, textDecoration: 'underline', textDecorationThickness: 2, textUnderlineOffset: 4 }
export const LinkSpan = ({ children }) => <span style={linkStyle}>{children}</span>

// index.html: título, imagem (nó livre) e o começo do texto.
export const IndexPreview = ({ base = 22, img, lines = ['p1', 'rec'] }) => (
  <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
    <div style={{ fontSize: base * 2, fontWeight: 700, lineHeight: 1.18 }}>{TXT.h1}</div>
    {img && <div style={{ marginTop: base * 0.75 }}>{img}</div>}
    {lines.includes('p1') && <div style={{ fontSize: base, lineHeight: 1.4, marginTop: base * 0.75 }}>{TXT.p1}</div>}
    {lines.includes('rec') && <div style={{ fontSize: base, lineHeight: 1.4, marginTop: base * 0.75 }}>Veja as <LinkSpan>minhas receitas favoritas</LinkSpan>.</div>}
  </div>
)

// paginas/projetos.html: título, link de volta e a figura (nó livre).
export const ProjetosPreview = ({ base = 22, fig, back = true }) => (
  <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
    <div style={{ fontSize: base * 2, fontWeight: 700, lineHeight: 1.18 }}>Meus projetos</div>
    {back && <div style={{ fontSize: base, marginTop: base * 0.6 }}><LinkSpan>Voltar para a página inicial</LinkSpan></div>}
    {fig && <div style={{ marginTop: base * 0.9 }}>{fig}</div>}
  </div>
)

// <figure> com a miniatura e a legenda, como o navegador mostra (recuo padrão da figure).
export const FigureView = ({ base = 22, thumbW = 320, caption = 'Meu primeiro projeto: um site de receitas', img, capOp = 1, box = 0, capGlow = 0 }) => (
  <div style={{ position: 'relative', marginLeft: base * 1.6, display: 'inline-block' }}>
    {box > 0 && <div style={{ position: 'absolute', inset: -14, border: `3px dashed ${C.purple}`, borderRadius: 12, opacity: box }} />}
    {img || <ReceitasThumb width={thumbW} />}
    <div style={{ fontSize: base * 0.9, marginTop: base * 0.4, opacity: capOp, maxWidth: thumbW + 120, color: '#333', background: capGlow ? `rgba(127,119,221,${0.35 * capGlow})` : 'transparent', borderRadius: 6 }}>{caption}</div>
  </div>
)

// ------------------------------------------------------------------ ilustrações auxiliares
export const Phone = ({ width = 220, children }) => (
  <div style={{ position: 'relative', width, height: width * 1.9, borderRadius: width * 0.16, background: C.night, border: `5px solid ${C.purple}`, boxShadow: '0 20px 44px rgba(27,23,68,0.35)', boxSizing: 'border-box', padding: `${width * 0.14}px ${width * 0.06}px` }}>
    <div style={{ position: 'absolute', top: width * 0.05, left: '50%', marginLeft: -width * 0.12, width: width * 0.24, height: width * 0.04, borderRadius: 99, background: C.purple }} />
    <div style={{ width: '100%', height: '100%', borderRadius: width * 0.06, background: C.lavender, overflow: 'hidden', position: 'relative' }}>{children}</div>
  </div>
)

export const Server = ({ width = 260, fileOp = 1, gone = 0, label = 'imagens.example.com' }) => (
  <div style={{ width, fontFamily: FONT, textAlign: 'center' }}>
    <svg width={width} height={width * 0.9} viewBox="0 0 100 90">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(10 ${8 + i * 26})`}>
          <rect width="80" height="22" rx="5" fill={C.purple} stroke={C.night} strokeWidth="2" />
          <circle cx="12" cy="11" r="3" fill={i === 1 && gone > 0 ? C.red : C.green} />
          <rect x="22" y="9" width="30" height="4" rx="2" fill={C.lavender} opacity="0.6" />
        </g>
      ))}
    </svg>
    <div style={{ fontFamily: MONO, fontSize: width * 0.085, color: C.night, fontWeight: 700, marginTop: 4 }}>{label}</div>
  </div>
)

export const Cake = ({ width = 300 }) => (
  <svg width={width} height={width * 0.75} viewBox="0 0 120 90" style={{ display: 'block' }}>
    <rect width="120" height="90" rx="6" fill="#FFF4E0" />
    <ellipse cx="60" cy="76" rx="44" ry="6" fill="#DDDAF6" />
    <rect x="26" y="46" width="68" height="28" rx="4" fill="#7A4A32" />
    <rect x="32" y="26" width="56" height="22" rx="4" fill="#8E5B3F" />
    <path d="M32 30 Q38 36 44 30 Q50 36 56 30 Q62 36 68 30 Q74 36 80 30 Q86 36 88 30 V26 H32 Z" fill="#4A2A1C" />
    <path d="M26 50 Q33 56 40 50 Q47 56 54 50 Q61 56 68 50 Q75 56 82 50 Q89 56 94 50 V46 H26 Z" fill="#4A2A1C" />
    <rect x="58" y="12" width="4" height="14" rx="1.5" fill={C.purpleSoft} />
    <path d="M60 4 Q64 9 60 12 Q56 9 60 4 Z" fill="#FFD28A" />
  </svg>
)

// Paisagem ilustrada (exemplo de foto), quadriculado de transparência, estrela nítida x pixelada.
export const Landscape = ({ width = 300 }) => (
  <svg width={width} height={width * 0.66} viewBox="0 0 150 100" style={{ display: 'block', borderRadius: 10 }}>
    <rect width="150" height="100" fill="#CFE0F5" />
    <circle cx="112" cy="26" r="12" fill="#FFD28A" />
    <path d="M0 80 L40 40 L70 70 L95 48 L150 90 V100 H0 Z" fill={C.purpleSoft} />
    <path d="M0 100 V84 Q40 72 80 86 T150 82 V100 Z" fill={C.purple} />
  </svg>
)
export const Checker = ({ width = 300, height = 200, children }) => (
  <div style={{ position: 'relative', width, height, borderRadius: 10, overflow: 'hidden', backgroundColor: C.white, backgroundImage: 'linear-gradient(45deg, #D9D7EE 25%, transparent 25%), linear-gradient(-45deg, #D9D7EE 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #D9D7EE 75%), linear-gradient(-45deg, transparent 75%, #D9D7EE 75%)', backgroundSize: '28px 28px', backgroundPosition: '0 0, 0 14px, 14px -14px, -14px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
)

const starPts = (cx, cy, R, r) => Array.from({ length: 10 }).map((_, i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 5
  const rad = i % 2 ? r : R
  return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]
})
const inside = (pts, x, y) => {
  let c = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i]
    const [xj, yj] = pts[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}
export const Star = ({ size = 120, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
    <polygon points={starPts(50, 54, 48, 24).map((p) => p.join(',')).join(' ')} fill={color} stroke={C.night} strokeWidth="3" strokeLinejoin="round" />
  </svg>
)
// Estrela "ampliada" a partir de poucos pixels: blocos visíveis.
export const PixelStar = ({ size = 120, grid = 15, color = C.purpleSoft }) => {
  const pts = starPts(50, 54, 48, 24)
  const cell = 100 / grid
  const cells = []
  for (let gy = 0; gy < grid; gy++) for (let gx = 0; gx < grid; gx++) if (inside(pts, (gx + 0.5) * cell, (gy + 0.5) * cell)) cells.push([gx, gy])
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }} shapeRendering="crispEdges">
      {cells.map(([gx, gy]) => <rect key={`${gx}-${gy}`} x={gx * cell} y={gy * cell} width={cell + 0.2} height={cell + 0.2} fill={color} />)}
    </svg>
  )
}

export const FileCard = ({ name, size, heavy = false, width = 260, children }) => (
  <div style={{ width, background: C.white, border: `4px solid ${C.purple}`, borderRadius: 18, padding: 14, boxSizing: 'border-box', boxShadow: '0 14px 30px rgba(38,33,92,0.22)', fontFamily: FONT, textAlign: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
    <div style={{ fontFamily: MONO, fontSize: 26, color: C.night, fontWeight: 700, marginTop: 10 }}>{name}</div>
    {size && <div style={{ display: 'inline-block', marginTop: 8, fontSize: 28, fontWeight: 700, color: heavy ? C.white : C.night, background: heavy ? C.night : C.lavender, borderRadius: 10, padding: '2px 16px' }}>{size}</div>}
  </div>
)

export const CopyrightTag = ({ size = 90 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: C.night, color: C.lavender, border: `4px solid ${C.purpleSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: size * 0.62, fontWeight: 700, lineHeight: 1 }}>©</div>
)

export const ListIcon = ({ size = 110, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={color} strokeWidth="4" />
    {[18, 32, 46].map((y) => (
      <g key={y}>
        <circle cx="17" cy={y} r="4" fill={color} />
        <rect x="26" y={y - 3} width="24" height="6" rx="3" fill={color} />
      </g>
    ))}
  </svg>
)

// Régua de medida (largura) acima de uma imagem.
export const Ruler = ({ width, label, op = 1 }) => (
  <div style={{ position: 'relative', width, height: 44, opacity: op }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 30, height: 4, background: C.purple, borderRadius: 2 }} />
    <div style={{ position: 'absolute', left: 0, top: 20, width: 4, height: 24, background: C.purple }} />
    <div style={{ position: 'absolute', right: 0, top: 20, width: 4, height: 24, background: C.purple }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: -4, display: 'flex', justifyContent: 'center' }}>
      <span style={{ background: C.purple, color: C.white, fontFamily: FONT, fontWeight: 700, fontSize: 24, padding: '2px 14px', borderRadius: 10, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  </div>
)
