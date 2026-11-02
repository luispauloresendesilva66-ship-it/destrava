// Aula 8: tags semânticas — a página da Ana dividida em regiões (prévia do navegador com molduras
// coloridas), o diagrama de regiões que vira de "sopa de div" para regiões com nome, e as ilustrações
// (pilha de papéis, tigela de sopa, robô de busca, armários, tesoura, cartões de projeto).
import React from 'react'
import { C, FONT, MONO } from '../../theme.js'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { TXT, AvatarAna, CodeCard, SpeechBubble, cardAt, cardSpan } from '../n1-a04/ana.jsx'
import { ListView, Tag } from '../n1-a05/ana.jsx'
import { CAPTION, HEAD3, ROWS3, TableView } from '../n1-a06/ana.jsx'
import { ButtonBox, InputBox, LabelText, TextAreaBox, H2_FALE, RegionsIcon } from '../n1-a07/ana.jsx'

export { TXT, AvatarAna, CodeCard, SpeechBubble, cardAt, cardSpan, ListView, Tag, CAPTION, HEAD3, ROWS3, TableView, ButtonBox, InputBox, LabelText, TextAreaBox, H2_FALE, RegionsIcon }

// ------------------------------------------------------------------ dados do exemplo
export const FOOT = 'Feito pela Ana, em 2026.'
export const LEARN = ['HTML, começando agora', 'CSS', 'JavaScript']
export const MENU = [
  { id: 'quem-sou', t: 'Quem sou eu' },
  { id: 'aprendendo', t: 'O que estou aprendendo' },
  { id: 'contato', t: 'Fale comigo' },
]
export const IMG_LINE = '<img src="imagens/foto-ana.jpg" alt="Ana sorrindo, com um caderno de anotações na mão" width="200" height="200">'

// Cor de cada região (verde fica reservado para sucesso).
export const REG = {
  header: '#7F77DD',
  nav: '#5B8DEF',
  main: '#2FA89A',
  section: '#F0A04B',
  article: '#D46FA8',
  footer: '#D9A23A',
  div: '#9A97B8',
}
export const tint = (hex, a) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

// Etiqueta com o nome da tag (fundo da cor da região).
export const RegTag = ({ name, color, fs = 22, op = 1, style }) => (
  <span style={{ display: 'inline-block', fontFamily: MONO, fontSize: fs, fontWeight: 700, color: C.white, background: color, borderRadius: fs * 0.3, padding: `${fs * 0.05}px ${fs * 0.4}px`, lineHeight: 1.25, opacity: op, whiteSpace: 'nowrap', boxShadow: '0 3px 8px rgba(27,23,68,0.18)', ...style }}>{name}</span>
)

// Moldura de uma região: a borda e a etiqueta aparecem com f (0..1) sem mudar o layout.
export const RegionFrame = ({ name, color, f = 0, fs = 20, children, style, fill = 0, left = false }) => (
  <div style={{ position: 'relative', border: `3px solid ${tint(color, f)}`, background: fill ? tint(color, 0.12 * fill) : 'transparent', borderRadius: fs * 0.5, padding: `${fs * 0.55}px ${fs * 0.7}px`, ...style }}>
    {children}
    {f > 0 && <RegTag name={name} color={color} fs={fs * 0.85} op={f} style={{ position: 'absolute', ...(left ? { left: fs * 0.6 } : { right: fs * 0.6 }), top: -fs * 0.62 }} />}
  </div>
)

const Link = ({ children, hl }) => (
  <span style={{ color: C.link, textDecoration: 'underline', textUnderlineOffset: 3, background: hl ? 'rgba(255,210,138,0.8)' : 'transparent', borderRadius: 4 }}>{children}</span>
)

// ------------------------------------------------------------------ a página da Ana (prévia)
// fr: opacidade das molduras { header, nav, main, s1, s2, s3, footer, article }.
// nav: 'old' (parágrafo de links, Aula 3) | 'list' (nav > ul > li > a) | 'none'; navOp: [op de cada item].
// show: { main, footer } (0..1, 0 = não existe); scroll: px; flash 0..1 na seção de contato; linkHl: índice do link.
export const AnaPage = ({ fs = 20, fr = {}, nav = 'list', navOp = [1, 1, 1], show = {}, scroll = 0, flash = 0, linkHl = -1, fill = {}, parts = {} }) => {
  const po = (k) => (parts[k] == null ? 1 : parts[k])
  const f = (k) => fr[k] || 0
  const sh = (k) => (show[k] == null ? 1 : show[k])
  const h2 = (t) => <div style={{ fontSize: fs * 1.3, fontWeight: 700, marginBottom: fs * 0.4 }}>{t}</div>
  return (
    <div style={{ fontFamily: FONT, color: '#1A1A1A', fontSize: fs, lineHeight: 1.35, paddingTop: fs * 0.7, transform: `translateY(${-scroll}px)` }}>
      <RegionFrame name="header" color={REG.header} f={f('header')} fs={fs} fill={fill.header}>
        <div style={{ fontSize: fs * 1.7, fontWeight: 700, marginBottom: fs * 0.4, opacity: po('h1') }}>{TXT.h1}</div>
        <div style={{ opacity: po('img') }}><AvatarAna size={fs * 4} /></div>
        {nav === 'old' && (
          <div style={{ marginTop: fs * 0.6 }}><Link>Quem sou eu</Link> · <Link>O que estou aprendendo</Link></div>
        )}
        {nav === 'list' && (
          <RegionFrame name="nav" color={REG.nav} f={f('nav')} fs={fs} fill={fill.nav} style={{ marginTop: fs * 0.7 }}>
            {MENU.map((m, i) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: fs * 0.5, opacity: navOp[i] == null ? 1 : navOp[i], height: (navOp[i] == null || navOp[i] > 0) ? fs * 1.4 : 0, overflow: 'hidden', paddingLeft: fs * 0.6 }}>
                <span style={{ width: fs * 0.3, height: fs * 0.3, borderRadius: '50%', background: '#1A1A1A', flexShrink: 0 }} />
                <Link hl={linkHl === i}>{m.t}</Link>
              </div>
            ))}
          </RegionFrame>
        )}
      </RegionFrame>
      {sh('main') > 0 && (
        <div style={{ opacity: sh('main'), marginTop: fs * 1.1 }}>
          <RegionFrame name="main" color={REG.main} f={f('main')} fs={fs} fill={fill.main} left>
            <RegionFrame name="section" color={REG.section} f={f('s1')} fs={fs} fill={fill.s1}>
              {h2('Quem sou eu')}
              <div>{TXT.p1}</div>
            </RegionFrame>
            <RegionFrame name="section" color={REG.section} f={f('s2')} fs={fs} fill={fill.s2} style={{ marginTop: fs * 1.1 }}>
              {h2('O que estou aprendendo')}
              <ListView items={LEARN} fs={fs} />
              <TableView fs={fs * 0.75} style={{ marginTop: fs * 0.6 }} caption={CAPTION} head={HEAD3} rows={ROWS3.map((cells) => ({ cells }))} />
            </RegionFrame>
            <RegionFrame name="section" color={REG.section} f={f('s3')} fs={fs} fill={Math.max(fill.s3 || 0, flash * 3)} style={{ marginTop: fs * 1.1 }}>
              {h2(H2_FALE)}
              <div style={{ display: 'flex', alignItems: 'center', gap: fs * 0.5, marginBottom: fs * 0.6 }}><LabelText fs={fs}>Nome</LabelText><InputBox w={fs * 11} fs={fs * 0.9} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: fs * 0.5, marginBottom: fs * 0.6 }}><LabelText fs={fs}>E-mail</LabelText><InputBox w={fs * 11} fs={fs * 0.9} /></div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: fs * 0.5, marginBottom: fs * 0.6 }}><LabelText fs={fs}>Mensagem</LabelText><TextAreaBox w={fs * 14} h={fs * 3.6} fs={fs * 0.8} /></div>
              <ButtonBox fs={fs}>Enviar</ButtonBox>
            </RegionFrame>
          </RegionFrame>
        </div>
      )}
      {sh('footer') > 0 && (
        <div style={{ opacity: sh('footer'), marginTop: fs * 1.1 }}>
          <RegionFrame name="footer" color={REG.footer} f={f('footer')} fs={fs} fill={fill.footer}>
            <div>{FOOT}</div>
          </RegionFrame>
        </div>
      )}
    </div>
  )
}

// Prévia com a página rolada: p 0 = topo, 1 = fim da página (alinhada à base). k: zoom (com p = 0).
export const PagePreview = ({ w = 880, h = 600, p = 0, k = 1, url = 'index.html', children }) => (
  <BrowserMock width={w} height={h} tabTitle="Sobre mim" url={url}>
    <div style={{ position: 'absolute', inset: 28, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: `${p * 100}%`, width: w - 56, transformOrigin: 'top center', transform: `translateX(-50%) translateY(${-p * 100}%) scale(${k})` }}>{children}</div>
    </div>
  </BrowserMock>
)

// ------------------------------------------------------------------ diagrama de regiões (wireframe)
// m 0..1: caixas cinzas "div" -> caixas coloridas com nome. names: rótulo de cada região quando m = 1.
// op: opacidade de cada região; dim: apaga a região (0..1); hl: brilho em volta (0..1).
export const LAYOUT = {
  header: { x: 0.04, y: 0.03, w: 0.92, h: 0.15 },
  nav: { x: 0.04, y: 0.205, w: 0.92, h: 0.085 },
  main: { x: 0.04, y: 0.315, w: 0.92, h: 0.53 },
  s1: { x: 0.08, y: 0.37, w: 0.84, h: 0.13 },
  s2: { x: 0.08, y: 0.52, w: 0.84, h: 0.13 },
  s3: { x: 0.08, y: 0.67, w: 0.84, h: 0.13 },
  footer: { x: 0.04, y: 0.87, w: 0.92, h: 0.10 },
}
const COLOR_OF = { header: REG.header, nav: REG.nav, main: REG.main, s1: REG.section, s2: REG.section, s3: REG.section, footer: REG.footer }
export const SEM_NAMES = { header: 'header', nav: 'nav', main: 'main', s1: 'section', s2: 'section', s3: 'section', footer: 'footer' }
const mix = (a, b, t) => {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const ch = (s) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t)
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`
}
export const PageDiagram = ({ w = 600, h = 640, m = 1, names = SEM_NAMES, op = {}, dim = {}, hl = {}, fs = 24, sections = true, bars = true, regions, colors = {}, style }) => {
  const keys = regions ? Object.keys(regions) : ['header', 'nav', 'main', ...(sections ? ['s1', 's2', 's3'] : []), 'footer']
  return (
    <div style={{ position: 'relative', width: w, height: h, background: C.white, borderRadius: 22, border: `4px solid ${C.purpleSoft}`, boxShadow: '0 18px 40px rgba(38,33,92,0.2)', ...style }}>
      {keys.map((k) => {
        const L = (regions && regions[k]) || LAYOUT[k]
        const o = op[k] == null ? 1 : op[k]
        if (o <= 0) return null
        const col = mix(REG.div, colors[k] || L.color || COLOR_OF[k], m)
        const d = dim[k] || 0
        const g = hl[k] || 0
        const isMain = L.box != null ? L.box : k === 'main'
        const label = m > 0.5 ? (L.name || names[k]) : 'div'
        return (
          <div key={k} style={{ position: 'absolute', left: L.x * w, top: L.y * h, width: L.w * w, height: L.h * h, boxSizing: 'border-box', border: `${m > 0.5 ? 4 : 3}px ${m > 0.5 ? 'solid' : 'dashed'} ${col}`, borderRadius: 12, background: isMain ? 'transparent' : `rgba(${m > 0.5 ? '255,255,255' : '240,239,248'},1)`, opacity: o * (1 - 0.7 * d), boxShadow: g > 0 ? `0 0 ${30 * g}px ${col}` : 'none' }}>
            {!isMain && <div style={{ position: 'absolute', inset: 0, borderRadius: 9, background: col, opacity: 0.14 + 0.1 * m }} />}
            {bars && !isMain && (
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: '46%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ height: 8, borderRadius: 4, background: col, opacity: 0.55 }} />
                {L.h * h > 60 && <div style={{ height: 8, width: '70%', borderRadius: 4, background: col, opacity: 0.35 }} />}
              </div>
            )}
            <div style={{ position: 'absolute', right: 10, top: isMain ? -fs * 0.55 : '50%', transform: isMain ? 'none' : 'translateY(-50%)' }}>
              <RegTag name={label} color={col} fs={fs} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------------ pilha de papéis soltos (Bloco 1)
export const SHEETS = ['<h1>', '<p>', '<a>', '<img>', '<ul>', '<table>', '<form>']
export const Sheet = ({ text, w = 200, h = 130, rot = 0, style }) => (
  <div style={{ width: w, height: h, background: '#FFFDF6', border: '2px solid #D9D4C2', borderRadius: 6, boxShadow: '0 6px 14px rgba(38,33,92,0.18)', transform: `rotate(${rot}deg)`, padding: 12, boxSizing: 'border-box', ...style }}>
    <div style={{ fontFamily: MONO, fontSize: 26, fontWeight: 700, color: C.purple }}>{text}</div>
    {[90, 70, 80].map((p, i) => <div key={i} style={{ height: 6, width: `${p}%`, background: '#E3DFCF', borderRadius: 3, marginTop: 9 }} />)}
  </div>
)

// ------------------------------------------------------------------ tigela de sopa de letrinhas "div" (Bloco 2)
export const SoupBowl = ({ w = 420, fill = 1, t = 0 }) => {
  const letters = [[0.18, 0.2], [0.42, 0.12], [0.66, 0.22], [0.3, 0.42], [0.55, 0.38], [0.78, 0.45], [0.12, 0.5], [0.45, 0.6]]
  const h = w * 0.62
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <svg width={w} height={h} viewBox="0 0 200 124" style={{ position: 'absolute', inset: 0 }}>
        <ellipse cx="100" cy="34" rx="92" ry="22" fill="#F4C27A" stroke={C.night} strokeWidth="4" />
        <path d="M8 34 Q14 112 100 116 Q186 112 192 34" fill={C.purple} stroke={C.night} strokeWidth="4" />
        <path d="M36 70 Q100 90 164 70" fill="none" stroke={C.purpleSoft} strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="100" cy="120" rx="40" ry="5" fill={C.night} opacity="0.25" />
      </svg>
      {letters.map(([x, y], i) => {
        const o = Math.max(0, Math.min(1, fill * letters.length - i))
        return (
          <div key={i} style={{ position: 'absolute', left: w * (0.08 + x * 0.78), top: h * (-0.32 + y * 0.95) - 6 * Math.sin(t / 9 + i), fontFamily: MONO, fontWeight: 800, fontSize: w * 0.085, color: '#8A5A12', opacity: o, transform: `rotate(${(i % 3 - 1) * 14}deg) scale(${0.6 + 0.4 * o})` }}>div</div>
        )
      })}
    </div>
  )
}

// ------------------------------------------------------------------ robozinho de busca (Blocos 2 e 8)
export const Robot = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <line x1="50" y1="6" x2="50" y2="18" stroke={C.night} strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="6" r="5" fill={REG.section} stroke={C.night} strokeWidth="2.5" />
    <rect x="18" y="18" width="64" height="46" rx="14" fill={C.lavender} stroke={C.night} strokeWidth="4" />
    <rect x="27" y="29" width="46" height="22" rx="10" fill={C.nightDeep} />
    <circle cx="40" cy="40" r="5" fill="#8FD3E8" />
    <circle cx="60" cy="40" r="5" fill="#8FD3E8" />
    <rect x="28" y="66" width="44" height="28" rx="10" fill={C.purple} stroke={C.night} strokeWidth="4" />
    <rect x="42" y="74" width="16" height="6" rx="3" fill={C.lavender} />
  </svg>
)

// ------------------------------------------------------------------ armário de gavetas (Bloco 8)
export const Cabinet = ({ w = 300, labels, fs = 26 }) => (
  <div style={{ width: w, background: '#B98A5A', border: `5px solid ${C.night}`, borderRadius: 16, padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 16px 34px rgba(38,33,92,0.25)' }}>
    {labels.map((l, i) => (
      <div key={i} style={{ height: fs * 2.4, background: '#D7AE7E', border: `3px solid ${C.night}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative' }}>
        {l ? (
          <span style={{ background: C.white, border: `2px solid ${C.night}`, borderRadius: 6, padding: '2px 14px', fontFamily: MONO, fontSize: fs, fontWeight: 700, color: C.night }}>{l}</span>
        ) : (
          <span style={{ width: w * 0.36, height: fs * 1.1, background: '#EAD3B4', border: `2px dashed #8E6A43`, borderRadius: 6 }} />
        )}
        <span style={{ position: 'absolute', right: 16, width: 22, height: 10, borderRadius: 5, background: C.night }} />
      </div>
    ))}
  </div>
)

// ------------------------------------------------------------------ tesoura (Bloco 6)
export const Scissors = ({ size = 120, open = 0.5 }) => {
  const a = 8 + 20 * open
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <g transform={`rotate(${-a} 50 50)`}>
        <path d="M50 50 L96 44 L96 50 Z" fill="#C9C5EE" stroke={C.night} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="22" cy="40" r="13" fill="none" stroke={C.purple} strokeWidth="7" />
        <line x1="33" y1="44" x2="50" y2="50" stroke={C.purple} strokeWidth="7" strokeLinecap="round" />
      </g>
      <g transform={`rotate(${a} 50 50)`}>
        <path d="M50 50 L96 56 L96 50 Z" fill="#DDDAF6" stroke={C.night} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="22" cy="60" r="13" fill="none" stroke={C.purple} strokeWidth="7" />
        <line x1="33" y1="56" x2="50" y2="50" stroke={C.purple} strokeWidth="7" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="4" fill={C.night} />
    </svg>
  )
}

// ------------------------------------------------------------------ cartão de post (article, Bloco 6)
export const PostCard = ({ w = 420, fs = 24, style }) => (
  <div style={{ width: w, background: C.white, border: `4px solid ${REG.article}`, borderRadius: 16, padding: `${fs * 0.7}px ${fs * 0.8}px`, boxSizing: 'border-box', fontFamily: FONT, color: '#1A1A1A', boxShadow: '0 12px 28px rgba(38,33,92,0.18)', ...style }}>
    <div style={{ fontSize: fs * 1.05, fontWeight: 700, lineHeight: 1.25 }}>Meu primeiro post: por que comecei a programar</div>
    <div style={{ fontSize: fs * 0.7, color: '#6E6A99', marginTop: fs * 0.3 }}>por Ana Souza</div>
    {[100, 94, 72].map((p, i) => <div key={i} style={{ height: fs * 0.35, width: `${p}%`, background: '#E4E1F7', borderRadius: 4, marginTop: fs * 0.45 }} />)}
  </div>
)

// ------------------------------------------------------------------ cartõezinhos de projeto (div, Bloco 7)
export const ProjectCard = ({ w = 260, title, color = C.purpleSoft }) => (
  <div style={{ width: w, background: C.white, border: `3px solid ${color}`, borderRadius: 14, padding: 14, boxSizing: 'border-box', fontFamily: FONT, boxShadow: '0 10px 22px rgba(38,33,92,0.15)' }}>
    <div style={{ height: w * 0.42, borderRadius: 8, background: tint(color, 0.25), marginBottom: 10 }} />
    <div style={{ fontSize: 24, fontWeight: 700, color: C.night }}>{title}</div>
    <div style={{ height: 8, width: '80%', background: '#E4E1F7', borderRadius: 4, marginTop: 8 }} />
  </div>
)

// Página genérica em branco (próxima aula), montada peça por peça: p 0..1.
export const BuildPage = ({ w = 300, h = 360, p = 1 }) => {
  const parts = [
    { y: 0.05, h: 0.16, c: REG.header },
    { y: 0.25, h: 0.08, c: REG.nav },
    { y: 0.37, h: 0.2, c: REG.section },
    { y: 0.6, h: 0.2, c: REG.section },
    { y: 0.84, h: 0.11, c: REG.footer },
  ]
  return (
    <div style={{ position: 'relative', width: w, height: h, background: C.white, borderRadius: 18, border: `4px solid ${C.purpleSoft}`, boxShadow: '0 16px 34px rgba(0,0,0,0.25)' }}>
      {parts.map((q, i) => {
        const o = Math.max(0, Math.min(1, p * parts.length - i))
        return <div key={i} style={{ position: 'absolute', left: w * 0.07, width: w * 0.86, top: h * q.y, height: h * q.h, borderRadius: 8, background: tint(q.c, 0.35), border: `3px solid ${q.c}`, boxSizing: 'border-box', opacity: o, transform: `translateY(${(1 - o) * -20}px)` }} />
      })}
    </div>
  )
}

// Monoespaçado com os sinais de tag.
export const T = ({ children, color }) => <span style={{ fontFamily: MONO, color }}>{children}</span>
