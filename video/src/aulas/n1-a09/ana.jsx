// Aula 9: projeto final — o arquivo index.html completo da Ana (montado bloco a bloco no editor, com
// rolagem), a prévia da página pessoal inteira, e as ilustrações do rascunho, da checklist, da pasta
// do site e das telas do app (mapa de níveis, prova e certificado).
import React from 'react'
import { interpolate, random } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { FolderIcon, FileIcon } from '../../components/FileTree.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Check } from '../../components/Marks.jsx'
import { AvatarAna, CodeCard, TXT } from '../n1-a04/ana.jsx'
import { ListView, Tag } from '../n1-a05/ana.jsx'
import { TableView } from '../n1-a06/ana.jsx'
import { ButtonBox, InputBox, LabelText, TextAreaBox } from '../n1-a07/ana.jsx'
import { REG, RegTag, RegionFrame, tint, BuildPage } from '../n1-a08/ana.jsx'

export { AvatarAna, CodeCard, TXT, Tag, ListView, TableView, ButtonBox, InputBox, LabelText, TextAreaBox, REG, RegTag, RegionFrame, tint, BuildPage }

const ramp = (f, a, b) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

// ------------------------------------------------------------------ o arquivo index.html da Ana
// Cada linha: t (texto), b (bloco em que é digitada), k (chave de tempo dentro do bloco).
const L = (b, k, t) => ({ b, k, t })
export const FILE = [
  L(4, 'doctype', '<!DOCTYPE html>'),
  L(4, 'html', '<html lang="pt-BR">'),
  L(4, 'head', '  <head>'),
  L(4, 'meta', '    <meta charset="UTF-8">'),
  L(4, 'title', '    <title>Ana Souza, página pessoal</title>'),
  L(4, 'headC', '  </head>'),
  L(4, 'body', '  <body>'),
  // Bloco 5 — topo e menu
  L(5, 'hdr', '    <header>'),
  L(5, 'h1', '      <h1>Olá, eu sou a Ana</h1>'),
  L(5, 'nav', '      <nav>'),
  L(5, 'ul', '        <ul>'),
  L(5, 'li1', '          <li><a href="#sobre">Sobre mim</a></li>'),
  L(5, 'li2', '          <li><a href="#projetos">Meus projetos</a></li>'),
  L(5, 'li3', '          <li><a href="#rotina">Minha rotina</a></li>'),
  L(5, 'li4', '          <li><a href="#contato">Fale comigo</a></li>'),
  L(5, 'ulC', '        </ul>'),
  L(5, 'navC', '      </nav>'),
  L(5, 'hdrC', '    </header>'),
  // Bloco 6 — sobre mim
  L(6, 'main', '    <main>'),
  L(6, 'sec', '      <section id="sobre">'),
  L(6, 'h2', '        <h2>Sobre mim</h2>'),
  L(6, 'p', '        <p>Trabalho no atendimento de uma loja e estou'),
  L(6, 'p', '          fazendo a minha transição para a tecnologia.'),
  L(6, 'strong', '          Estou aprendendo <strong>HTML</strong>.</p>'),
  L(6, 'img', '        <img src="imagens/foto-ana.jpg"'),
  L(6, 'alt', '             alt="Ana sorrindo, com um caderno de anotações na mão"'),
  L(6, 'alt', '             width="200" height="200">'),
  L(6, 'secC', '      </section>'),
  // Bloco 7 — meus projetos
  L(7, 'sec', '      <section id="projetos">'),
  L(7, 'h2', '        <h2>Meus projetos</h2>'),
  L(7, 'ul', '        <ul>'),
  L(7, 'li1', '          <li><a href="paginas/projetos.html">'),
  L(7, 'li1', '            Todos os meus projetos</a></li>'),
  L(7, 'li2', '          <li><a href="https://receitas.example.com"'),
  L(7, 'tgt', '                 target="_blank" rel="noopener">'),
  L(7, 'li2b', '            Minhas receitas favoritas</a></li>'),
  L(7, 'ulC', '        </ul>'),
  L(7, 'secC', '      </section>'),
  // Bloco 8 — minha rotina
  L(8, 'sec', '      <section id="rotina">'),
  L(8, 'h2', '        <h2>Minha rotina</h2>'),
  L(8, 'table', '        <table>'),
  L(8, 'cap', '          <caption>Horário de estudos da semana</caption>'),
  L(8, 'thead', '          <thead>'),
  L(8, 'tr', '            <tr>'),
  L(8, 'th', '              <th>Dia</th>'),
  L(8, 'th', '              <th>Assunto</th>'),
  L(8, 'trC', '            </tr>'),
  L(8, 'theadC', '          </thead>'),
  L(8, 'tbody', '          <tbody>'),
  L(8, 'r1', '            <tr><td>Segunda</td><td>HTML</td></tr>'),
  L(8, 'r2', '            <tr><td>Terça</td><td>CSS</td></tr>'),
  L(8, 'r3', '            <tr><td>Quarta</td><td>Revisão</td></tr>'),
  L(8, 'tbodyC', '          </tbody>'),
  L(8, 'tableC', '        </table>'),
  L(8, 'secC', '      </section>'),
  // Bloco 9 — fale comigo
  L(9, 'sec', '      <section id="contato">'),
  L(9, 'h2', '        <h2>Fale comigo</h2>'),
  L(9, 'form', '        <form>'),
  L(9, 'lab1', '          <label for="nome">Nome</label>'),
  L(9, 'in1', '          <input type="text" id="nome" name="nome">'),
  L(9, 'f2', '          <label for="email">E-mail</label>'),
  L(9, 'f2', '          <input type="email" id="email" name="email">'),
  L(9, 'f3', '          <label for="mensagem">Mensagem</label>'),
  L(9, 'f3', '          <textarea id="mensagem" name="mensagem"></textarea>'),
  L(9, 'btn', '          <button type="submit">Enviar</button>'),
  L(9, 'formC', '        </form>'),
  L(9, 'secC', '      </section>'),
  L(9, 'mainC', '    </main>'),
  // Bloco 10 — rodapé
  L(10, 'ftr', '    <footer>'),
  L(10, 'fp', '      <p>Feito por Ana Souza, em 2026.'),
  L(10, 'fa', '        <a href="mailto:ana@example.com">ana@example.com</a></p>'),
  L(10, 'ftrC', '    </footer>'),
  L(4, 'bodyC', '  </body>'),
  L(4, 'htmlC', '</html>'),
]

// Linhas do arquivo como estão no fim do bloco n.
export const fileLines = (n) => FILE.filter((l) => l.b <= n).map((l) => l.t)
// Índice (linha exibida, 0-based) da occ-ésima linha que contém `sub`, no arquivo do fim do bloco n.
export const lineOf = (n, sub, occ = 0) => {
  const ls = fileLines(n)
  let c = -1
  for (let i = 0; i < ls.length; i++) if (ls[i].includes(sub) && ++c === occ) return i
  throw new Error(`linha não encontrada: ${sub}`)
}
export const colOf = (n, sub, occ = 0) => fileLines(n)[lineOf(n, sub, occ)].indexOf(sub)

// Segmentos para o CodeTyping no bloco n: linhas de blocos anteriores aparecem prontas; as do bloco n
// são digitadas a partir de times[k] (linhas com a mesma chave, uma depois da outra).
export const typeSpeed = (len) => Math.max(5, Math.round(len * 0.45))
export const buildSegments = (n, times) => {
  const acc = {}
  const lines = FILE.filter((l) => l.b <= n)
  return lines.map((l, i) => {
    const text = (i ? '\n' : '') + l.t
    if (l.b < n) return { text, start: 0, frames: 0 }
    if (times[l.k] == null) throw new Error(`sem tempo para ${l.k}`)
    const len = l.t.trim().length
    const fr = typeSpeed(len)
    const start = times[l.k] + (acc[l.k] || 0)
    acc[l.k] = (acc[l.k] || 0) + fr + 2
    return { text, start, frames: fr }
  })
}

// Rolagem automática do editor (em linhas): acompanha a linha que está sendo digitada.
// anchor: em que linha visível a digitação fica; vis: quantas linhas cabem.
export const autoScroll = (n, times, frame, { anchor = 13, vis = 22, extra = [] } = {}) => {
  const lines = FILE.filter((l) => l.b <= n)
  const maxS = Math.max(0, lines.length - vis + 1)
  const pts = []
  const seen = new Set()
  lines.forEach((l, i) => {
    if (l.b !== n || seen.has(l.k)) return
    seen.add(l.k)
    const shown = lines.filter((m) => m.b < n || times[m.k] <= times[l.k]).length
    pts.push([times[l.k], Math.min(maxS, Math.max(0, Math.min(i - anchor, shown - vis + 1)))])
  })
  for (const e of extra) pts.push(e)
  pts.sort((a, b) => a[0] - b[0])
  let s = pts.length ? pts[0][1] : 0
  for (const [t, v] of pts) {
    if (frame < t - 14) break
    const prev = s
    s = prev + (v - prev) * ramp(frame, t - 14, t + 2)
    if (frame < t + 2) break
    s = v
  }
  return s
}

// ------------------------------------------------------------------ dados da página
export const SITE = {
  title: 'Ana Souza, página pessoal',
  h1: 'Olá, eu sou a Ana',
  menu: [['sobre', 'Sobre mim'], ['projetos', 'Meus projetos'], ['rotina', 'Minha rotina'], ['contato', 'Fale comigo']],
  p: 'Trabalho no atendimento de uma loja e estou fazendo a minha transição para a tecnologia. Estou aprendendo ',
  proj: ['Todos os meus projetos', 'Minhas receitas favoritas'],
  caption: 'Horário de estudos da semana',
  head: ['Dia', 'Assunto'],
  rows: [['Segunda', 'HTML'], ['Terça', 'CSS'], ['Quarta', 'Revisão']],
  foot: 'Feito por Ana Souza, em 2026.',
  mail: 'ana@example.com',
}

const LinkT = ({ children, hl }) => (
  <span style={{ color: C.link, textDecoration: 'underline', textUnderlineOffset: 3, background: hl ? 'rgba(255,210,138,0.85)' : 'transparent', borderRadius: 4 }}>{children}</span>
)

// Campo destacado que substitui um texto da Ana ("seu nome", "a sua história"...).
export const Mine = ({ children, fs = 18, style }) => (
  <span style={{ display: 'inline-block', background: '#FFF4D6', border: '3px dashed #E8B860', borderRadius: 8, padding: `${fs * 0.1}px ${fs * 0.5}px`, color: '#8A5A12', fontWeight: 700, fontFamily: FONT, ...style }}>{children}</span>
)

// ------------------------------------------------------------------ a página da Ana (prévia)
// upTo: blocos já escritos (partes de blocos > upTo não existem). op: { chave: 0..1 } sobrepõe a
// opacidade de uma parte (0 = ainda não existe, não ocupa espaço). fr: molduras { header, nav, main,
// s1..s4, footer } (0..1). mine: { name, story, photo, projects, routine } (0..1) troca pelos campos
// destacados. flash: chave da seção que pisca. linkHl: índice do link do menu destacado.
// focus: 0..1 anel de foco no campo Nome. strongHl / altHl: destaques.
const PART_BLOCK = { h1: 5, nav: 5, s1: 6, s2: 7, s3: 8, s4: 9, foot: 10 }
export const AnaSite = ({ fs = 18, upTo = 10, op = {}, fr = {}, mine = {}, flash = {}, linkHl = -1, focus = 0, labelHl = 0, strongHl = 0, frameFs }) => {
  const vis = (part, key) => {
    const v = op[key] != null ? op[key] : (PART_BLOCK[part] <= upTo ? 1 : 0)
    return v
  }
  const f = (k) => fr[k] || 0
  const M = (k) => mine[k] || 0
  const ffs = frameFs || fs
  const h2 = (t, o) => (o > 0 ? <div style={{ fontSize: fs * 1.35, fontWeight: 700, marginBottom: fs * 0.45, opacity: o }}>{t}</div> : null)
  const sec = (key, part) => vis(part, key)
  const block = (o, children, style) => (o > 0 ? <div style={{ opacity: Math.min(1, o * 1.5), ...style }}>{children}</div> : null)
  const fieldRow = (o, label, field, align = 'center') => block(o, (
    <div style={{ display: 'flex', alignItems: align, gap: fs * 0.5, marginBottom: fs * 0.55 }}>{label}{field}</div>
  ))
  const anyMain = ['s1', 's2', 's3', 's4'].some((p) => PART_BLOCK[p] <= upTo) || ['main', 's1', 's2', 's3', 's4'].some((p) => (op[p] || 0) > 0)
  const name = (t) => (M('name') > 0.5 ? <Mine fs={fs}>seu nome</Mine> : t)
  const navOn = vis('nav', 'nav')
  return (
    <div style={{ fontFamily: FONT, color: '#1A1A1A', fontSize: fs, lineHeight: 1.35, paddingTop: fs * 0.8, paddingBottom: fs * 0.6 }}>
      {(vis('h1', 'h1') > 0 || navOn > 0) && (
        <RegionFrame name="header" color={REG.header} f={f('header')} fs={ffs}>
          {block(vis('h1', 'h1'), <div style={{ fontSize: fs * 1.8, fontWeight: 700 }}>{M('name') > 0.5 ? <>Olá, eu sou <Mine fs={fs * 1.4}>seu nome</Mine></> : SITE.h1}</div>)}
          {navOn > 0 && (
            <RegionFrame name="nav" color={REG.nav} f={f('nav')} fs={ffs} style={{ marginTop: fs * 0.5 }}>
              {SITE.menu.map(([id, t], i) => {
                const o = op[`nav${i}`] != null ? op[`nav${i}`] : 1
                if (o <= 0) return null
                return (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: fs * 0.5, opacity: Math.min(1, o * 1.5), paddingLeft: fs * 0.6, height: fs * 1.45 }}>
                    <span style={{ width: fs * 0.3, height: fs * 0.3, borderRadius: '50%', background: '#1A1A1A', flexShrink: 0 }} />
                    <LinkT hl={linkHl === i}>{t}</LinkT>
                  </div>
                )
              })}
            </RegionFrame>
          )}
        </RegionFrame>
      )}
      {anyMain && (
        <RegionFrame name="main" color={REG.main} f={f('main')} fs={ffs} left style={{ marginTop: fs * 1.1 }}>
          {sec('s1', 's1') > 0 && (
            <RegionFrame name="section" color={REG.section} f={f('s1')} fs={ffs} fill={flash.s1 || 0}>
              {h2('Sobre mim', vis('s1', 's1h2'))}
              {block(vis('s1', 's1p'), M('story') > 0.5 ? <Mine fs={fs}>a sua história</Mine> : <div>{SITE.p}<b style={{ background: strongHl ? 'rgba(255,210,138,0.85)' : 'transparent', borderRadius: 4 }}>HTML</b>.</div>)}
              {block(vis('s1', 's1img'), M('photo') > 0.5 ? (
                <div style={{ marginTop: fs * 0.6, width: fs * 7, height: fs * 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#FFF4D6', border: '3px dashed #E8B860', borderRadius: 10, color: '#8A5A12', fontWeight: 700, fontSize: fs * 0.95, boxSizing: 'border-box', padding: 6 }}>a sua foto (com alt)</div>
              ) : <AvatarAna size={fs * 7} style={{ marginTop: fs * 0.6 }} />)}
            </RegionFrame>
          )}
          {sec('s2', 's2') > 0 && (
            <RegionFrame name="section" color={REG.section} f={f('s2')} fs={ffs} fill={flash.s2 || 0} style={{ marginTop: fs * 1.1 }}>
              {h2('Meus projetos', vis('s2', 's2h2'))}
              {M('projects') > 0.5 ? <Mine fs={fs}>os seus projetos</Mine> : (
                <ListView fs={fs} items={SITE.proj.map((t, i) => ({ t: <LinkT>{t}</LinkT>, op: vis('s2', `s2l${i}`) }))} />
              )}
            </RegionFrame>
          )}
          {sec('s3', 's3') > 0 && (
            <RegionFrame name="section" color={REG.section} f={f('s3')} fs={ffs} fill={flash.s3 || 0} style={{ marginTop: fs * 1.1 }}>
              {h2('Minha rotina', vis('s3', 's3h2'))}
              {M('routine') > 0.5 ? <Mine fs={fs}>a sua rotina</Mine> : (vis('s3', 's3cap') > 0 || vis('s3', 's3head') > 0) && (
                <TableView fs={fs * 0.9} caption={SITE.caption} capOp={vis('s3', 's3cap')} head={SITE.head} headOp={vis('s3', 's3head')}
                  rows={SITE.rows.map((cells, i) => ({ cells, op: vis('s3', `s3r${i}`) }))} />
              )}
            </RegionFrame>
          )}
          {sec('s4', 's4') > 0 && (
            <RegionFrame name="section" color={REG.section} f={f('s4')} fs={ffs} fill={flash.s4 || 0} style={{ marginTop: fs * 1.1 }}>
              {h2('Fale comigo', vis('s4', 's4h2'))}
              {fieldRow(vis('s4', 'f1'), <LabelText fs={fs} hl={labelHl ? 'rgba(255,210,138,0.85)' : undefined}>Nome</LabelText>, <InputBox w={fs * 12} fs={fs * 0.9} focus={focus} caret={focus > 0.5} />)}
              {fieldRow(vis('s4', 'f2'), <LabelText fs={fs}>E-mail</LabelText>, <InputBox w={fs * 12} fs={fs * 0.9} />)}
              {fieldRow(vis('s4', 'f3'), <LabelText fs={fs}>Mensagem</LabelText>, <TextAreaBox w={fs * 14} h={fs * 3.4} fs={fs * 0.8} />, 'flex-end')}
              {block(vis('s4', 'f4'), <ButtonBox fs={fs}>Enviar</ButtonBox>)}
            </RegionFrame>
          )}
        </RegionFrame>
      )}
      {vis('foot', 'foot') > 0 && (
        <div style={{ marginTop: fs * 1.1, opacity: Math.min(1, vis('foot', 'foot') * 1.5) }}>
          <RegionFrame name="footer" color={REG.footer} f={f('footer')} fs={ffs}>
            <div>{name(SITE.foot)} <LinkT>{SITE.mail}</LinkT></div>
          </RegionFrame>
        </div>
      )}
    </div>
  )
}

// Prévia do navegador. p 0..1 rola do topo até o fim da página (se ela for maior que a janela).
export const SitePreview = ({ w = 800, h = 640, p = 0, title = SITE.title, tabHighlight = false, children }) => (
  <BrowserMock width={w} height={h} tabTitle={title} url="index.html" tabHighlight={tabHighlight}>
    <div style={{ position: 'absolute', inset: 28, top: 8, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: `${p * 100}%`, minHeight: '100%', transform: `translateY(${-p * 100}%)` }}>{children}</div>
    </div>
  </BrowserMock>
)

// Cartãozinho "aula N" (lembrete de onde aquilo foi ensinado).
export const LessonTag = ({ n, op = 1, size = 22, style }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: size, fontWeight: 700, color: C.night, background: '#FFF4D6', border: '3px solid #E8B860', borderRadius: 10, padding: '2px 12px', opacity: op, transform: `scale(${0.8 + 0.2 * op})`, transformOrigin: 'left center', whiteSpace: 'nowrap', boxShadow: '0 6px 14px rgba(38,33,92,0.18)', ...style }}>aula {n}</div>
)

// ------------------------------------------------------------------ ícones (Bloco 1)
export const PencilIcon = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={C.purple} strokeWidth="4" />
    <g transform="rotate(45 32 32)">
      <rect x="27" y="10" width="10" height="34" rx="2" fill="#F2C14E" stroke={C.night} strokeWidth="2.5" />
      <rect x="27" y="10" width="10" height="6" fill="#E58F8F" stroke={C.night} strokeWidth="2.5" />
      <path d="M27 44 L32 54 L37 44 Z" fill="#F4DDB8" stroke={C.night} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30.5 51 L32 54 L33.5 51 Z" fill={C.night} />
    </g>
  </svg>
)
export const EditorIcon = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={C.purple} strokeWidth="4" />
    <rect x="11" y="14" width="42" height="36" rx="5" fill={C.nightDeep} />
    <rect x="11" y="14" width="42" height="7" rx="3" fill={C.purple} />
    <path d="M22 30 L17 35 L22 40 M42 30 L47 35 L42 40 M35 28 L29 42" fill="none" stroke={C.lavender} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const ClipboardIcon = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="16" fill={C.white} stroke={C.purple} strokeWidth="4" />
    <rect x="15" y="12" width="34" height="42" rx="4" fill="#C9A26B" stroke={C.night} strokeWidth="2.5" />
    <rect x="19" y="17" width="26" height="33" rx="2" fill={C.white} />
    <rect x="25" y="9" width="14" height="7" rx="2" fill={C.purple} stroke={C.night} strokeWidth="2" />
    {[24, 32, 40].map((y) => (
      <g key={y}>
        <path d={`M21 ${y} L23.5 ${y + 2.5} L27.5 ${y - 2}`} fill="none" stroke="#5E9A2A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y={y - 1.5} width="12" height="3" rx="1.5" fill="#C9C5EE" />
      </g>
    ))}
  </svg>
)
// Bandeirinha no topo do degrau.
export const Flag = ({ size = 70, color = C.green }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <line x1="8" y1="4" x2="8" y2="38" stroke={C.night} strokeWidth="3" strokeLinecap="round" />
    <path d="M9 5 L34 11 L9 19 Z" fill={color} stroke={C.night} strokeWidth="2" strokeLinejoin="round" />
  </svg>
)

// ------------------------------------------------------------------ peça de quebra-cabeça (Bloco 2)
// Encaixe à direita e embaixo (saliências), à esquerda e em cima (reentrâncias), conforme a posição.
export const PuzzlePiece = ({ w = 200, h = 160, color, right = 1, bottom = 1, left = 0, top = 0, label, n, fs = 26 }) => {
  const k = Math.min(w, h) * 0.18
  const path = [
    `M0 0`,
    top ? `L${w / 2 - k} 0 C${w / 2 - k} ${k * 1.3}, ${w / 2 + k} ${k * 1.3}, ${w / 2 + k} 0` : '',
    `L${w} 0`,
    right ? `L${w} ${h / 2 - k} C${w + k * 1.3} ${h / 2 - k}, ${w + k * 1.3} ${h / 2 + k}, ${w} ${h / 2 + k}` : '',
    `L${w} ${h}`,
    bottom ? `L${w / 2 + k} ${h} C${w / 2 + k} ${h + k * 1.3}, ${w / 2 - k} ${h + k * 1.3}, ${w / 2 - k} ${h}` : '',
    `L0 ${h}`,
    left ? `L0 ${h / 2 + k} C${k * 1.3} ${h / 2 + k}, ${k * 1.3} ${h / 2 - k}, 0 ${h / 2 - k}` : '',
    'Z',
  ].join(' ')
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <svg width={w + k * 1.4} height={h + k * 1.4} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <path d={path} fill={color} stroke={C.night} strokeWidth="4" strokeLinejoin="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, color: C.night, textAlign: 'center', padding: 8, boxSizing: 'border-box' }}>
        {n != null && <div style={{ fontSize: fs * 1.3, fontWeight: 800, lineHeight: 1 }}>{n}</div>}
        {label && <div style={{ fontSize: fs, fontWeight: 700, lineHeight: 1.15, marginTop: 4 }}>{label}</div>}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ folha quadriculada (Bloco 3)
export const HAND = "'Segoe Print', 'Comic Sans MS', 'Segoe UI', cursive"
export const GridPaper = ({ w, h, children, style }) => (
  <div style={{ position: 'relative', width: w, height: h, background: '#FFFEF8', borderRadius: 10, boxShadow: '0 18px 40px rgba(38,33,92,0.22)', backgroundImage: 'linear-gradient(#DCE6F2 1.5px, transparent 1.5px), linear-gradient(90deg, #DCE6F2 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', border: '2px solid #D9D4C2', ...style }}>{children}</div>
)
// Retângulo desenhado a lápis: p 0..1 desenha o contorno.
export const SketchRect = ({ x, y, w, h, p = 1, color = '#3B3670', sw = 4, label, fs = 26, labelOp = 1, fill = 'transparent' }) => {
  const per = 2 * (w + h)
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
      <svg width={w + 8} height={h + 8} style={{ position: 'absolute', left: -4, top: -4, overflow: 'visible' }}>
        <path d={`M4 ${5} L${w + 3} 3 L${w + 5} ${h + 4} L3 ${h + 3} Z`} fill={fill} stroke={color} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={per + 20} strokeDashoffset={(per + 20) * (1 - p)} />
      </svg>
      {label && <div style={{ position: 'absolute', left: 14, top: 8, right: 10, fontFamily: HAND, fontSize: fs, color, opacity: labelOp, lineHeight: 1.2 }}>{label}</div>}
    </div>
  )
}

// ------------------------------------------------------------------ prancheta com a checklist (Bloco 11)
export const Clipboard = ({ w = 760, items, done = [], active = -1, fs = 30, title = 'Checklist de revisão' }) => (
  <div style={{ position: 'relative', width: w, background: '#C9A26B', border: `5px solid ${C.night}`, borderRadius: 22, padding: '46px 22px 22px', boxSizing: 'border-box', boxShadow: '0 20px 44px rgba(38,33,92,0.28)' }}>
    <div style={{ position: 'absolute', left: '50%', top: -26, transform: 'translateX(-50%)', width: 200, height: 54, background: C.purple, border: `4px solid ${C.night}`, borderRadius: 14 }} />
    <div style={{ background: C.white, borderRadius: 10, padding: '18px 22px', fontFamily: FONT }}>
      <div style={{ fontSize: fs * 1.05, fontWeight: 800, color: C.night, marginBottom: 10 }}>{title}</div>
      {items.map((it, i) => {
        const d = done[i] || 0
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 10px', borderRadius: 10, background: i === active ? C.lavender : 'transparent', borderBottom: i < items.length - 1 ? '2px solid #EEECF8' : 'none' }}>
            <div style={{ position: 'relative', width: fs * 1.5, height: fs * 1.5, flexShrink: 0, border: `3px solid ${C.purpleSoft}`, borderRadius: 8, boxSizing: 'border-box' }}>
              {d > 0 && <div style={{ position: 'absolute', left: -fs * 0.15, top: -fs * 0.15, transform: `scale(${d})` }}><Check size={fs * 1.8} /></div>}
            </div>
            <div style={{ fontSize: fs, color: C.night, fontWeight: i === active ? 700 : 500, lineHeight: 1.2 }}>{it}</div>
          </div>
        )
      })}
    </div>
  </div>
)

// ------------------------------------------------------------------ janela de pasta (Bloco 12)
// rows: [{ name, folder?, depth?, op?, check? (0..1), hl? }]
export const FolderWindow = ({ w = 620, title = 'meu-site', rows = [], fs = 30, style, glow = 0, children }) => (
  <div style={{ position: 'relative', width: w, background: C.white, borderRadius: 18, border: `3px solid ${C.purpleSoft}`, boxShadow: `0 20px 44px rgba(38,33,92,0.22)${glow ? `, 0 0 ${40 * glow}px ${C.purpleSoft}` : ''}`, overflow: 'hidden', fontFamily: FONT, ...style }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#DDDAF6', padding: '12px 18px' }}>
      <div style={{ display: 'flex', gap: 8 }}>{['#E87B7B', '#E8C47B', '#9CCF8A'].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />)}</div>
      <FolderIcon size={30} />
      <div style={{ fontSize: fs * 0.8, fontWeight: 700, color: C.night, fontFamily: MONO }}>{title}</div>
    </div>
    <div style={{ padding: '12px 18px 16px' }}>
      {rows.map((r, i) => {
        const o = r.op == null ? 1 : r.op
        if (o <= 0) return null
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, height: fs * 1.7, paddingLeft: (r.depth || 0) * fs * 1.3, opacity: Math.min(1, o * 1.5), background: r.hl ? `rgba(127,119,221,${0.25 * r.hl})` : 'transparent', borderRadius: 8 }}>
            {r.folder ? <FolderIcon size={fs * 1.05} /> : <FileIcon size={fs * 1.05} />}
            <span style={{ fontFamily: MONO, fontSize: fs, color: C.night, fontWeight: r.folder ? 700 : 400 }}>{r.name}</span>
            {r.check > 0 && <span style={{ marginLeft: 'auto', transform: `scale(${r.check})`, display: 'flex' }}><Check size={fs * 1.3} /></span>}
          </div>
        )
      })}
      {children}
    </div>
  </div>
)
export const FloppyIcon = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M8 6 H48 L58 16 V58 H8 Z" fill={C.purple} stroke={C.night} strokeWidth="3.5" strokeLinejoin="round" />
    <rect x="18" y="6" width="26" height="16" fill={C.lavender} stroke={C.night} strokeWidth="3" />
    <rect x="35" y="9" width="6" height="10" fill={C.night} />
    <rect x="15" y="34" width="36" height="24" rx="2" fill={C.white} stroke={C.night} strokeWidth="3" />
    <line x1="20" y1="42" x2="46" y2="42" stroke="#C9C5EE" strokeWidth="3" />
    <line x1="20" y1="50" x2="40" y2="50" stroke="#C9C5EE" strokeWidth="3" />
  </svg>
)
export const BranchIcon = ({ size = 70, color = C.purple }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <line x1="20" y1="12" x2="20" y2="52" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <path d="M20 40 C20 28 44 32 44 20" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <circle cx="20" cy="12" r="7" fill={C.white} stroke={color} strokeWidth="5" />
    <circle cx="20" cy="52" r="7" fill={C.white} stroke={color} strokeWidth="5" />
    <circle cx="44" cy="16" r="7" fill={C.white} stroke={color} strokeWidth="5" />
  </svg>
)

// ------------------------------------------------------------------ telas do app (Bloco 13)
// Mesmo visual do app: fundo claro lavanda, cartões brancos, botão primário roxo, cor do nível 1 violeta.
export const APP = {
  bg: '#F6F5FD',
  border: '#E6E4F3',
  text: C.night,
  muted: '#5F5A86',
  violet: '#8B6CFF',
  violetTint: '#F1EDFF',
  grad: 'linear-gradient(135deg, #534AB7 0%, #7048E8 100%)',
  lvlGrad: ['linear-gradient(135deg, #A48BFF, #6A4BE0)', 'linear-gradient(135deg, #7FDCFF, #2E9BFF)', 'linear-gradient(135deg, #FF8CC6, #E03A8A)', 'linear-gradient(135deg, #FFB067, #F2711C)', 'linear-gradient(135deg, #FFDC7A, #E5A21F)'],
  lvlHue: ['#8B6CFF', '#3EC5FF', '#F0509E', '#FF8A3D', '#F5BE3C'],
  lvlTint: ['#F1EDFF', '#E6F7FF', '#FDEAF3', '#FFF1E6', '#FFF6DD'],
  goldTint: '#FFF6DD',
  gold: '#F5BE3C',
}
// Moldura do app: barra do topo escura com o logo + conteúdo claro.
export const AppFrame = ({ w = 900, h = 700, children, style }) => (
  <div style={{ width: w, height: h, borderRadius: 24, overflow: 'hidden', background: APP.bg, border: `2px solid ${APP.border}`, boxShadow: '0 30px 70px rgba(38,33,92,0.28)', display: 'flex', flexDirection: 'column', fontFamily: FONT, ...style }}>
    <div style={{ background: '#1A1640', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <LogoMark height={38} />
      <Wordmark size={32} color={C.white} />
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 22, color: '#B8B3E6', fontSize: 22, fontWeight: 600 }}>
        <span>Início</span><span style={{ color: C.white }}>Níveis</span><span>Certificados</span>
      </div>
    </div>
    <div style={{ flex: 1, padding: 30, position: 'relative', color: APP.text }}>{children}</div>
  </div>
)
export const AppButton = ({ children, fs = 26, glow = 0, scale = 1, secondary = false, style }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: `${fs * 0.45}px ${fs * 1.1}px`, borderRadius: 14, fontSize: fs, fontWeight: 700, color: secondary ? C.purple : C.white, background: secondary ? C.white : APP.grad, border: secondary ? `2px solid ${C.purple}` : '1px solid rgba(255,255,255,0.08)', boxShadow: glow ? `0 0 ${30 * glow}px rgba(112,72,232,${0.7 * glow})` : '0 2px 4px rgba(38,33,92,0.2)', transform: `scale(${scale})`, ...style }}>{children}</div>
)
export const LvlBadge = ({ n, size = 52 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: APP.lvlHue[(n - 1) % 5], color: '#120F33', fontSize: size * 0.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 4px ${C.white}, 0 6px 18px -4px ${APP.lvlHue[(n - 1) % 5]}`, flexShrink: 0 }}>{n}</div>
)
const LockSmall = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" fill="#B9B5D6" /><path d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke="#B9B5D6" strokeWidth="2.5" /></svg>
)
// Mapa de níveis: o primeiro degrau aberto com as 9 aulas concluídas e o botão "Fazer a prova".
export const LevelMap = ({ levels, btnGlow = 0, btnScale = 1, fs = 26 }) => (
  <div>
    <div style={{ fontSize: fs * 1.4, fontWeight: 800, marginBottom: 18 }}>Mapa de níveis</div>
    {levels.map((name, i) => (
      <div key={name} style={{ position: 'relative', overflow: 'hidden', background: i === 0 ? `linear-gradient(100deg, ${APP.lvlTint[0]} 0%, #FFFFFF 45%)` : '#F1F0FA', border: `1px solid ${APP.border}`, borderRadius: 18, marginBottom: 14, boxShadow: i === 0 ? '0 10px 26px rgba(38,33,92,0.10)' : 'none' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: APP.lvlGrad[i], opacity: i === 0 ? 1 : 0.35 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: i === 0 ? '18px 22px 10px' : '12px 22px' }}>
          <LvlBadge n={i + 1} size={i === 0 ? 50 : 40} />
          <div style={{ fontSize: i === 0 ? fs * 1.05 : fs * 0.85, fontWeight: 700, color: i === 0 ? APP.text : APP.muted }}>{name}</div>
          {i > 0 && <span style={{ marginLeft: 'auto' }}><LockSmall /></span>}
        </div>
        {i === 0 && (
          <div style={{ padding: '0 22px 18px 88px' }}>
            <div style={{ height: 10, borderRadius: 5, background: '#E6E4F3', overflow: 'hidden', marginBottom: 12 }}><div style={{ width: '100%', height: '100%', background: APP.lvlGrad[0] }} /></div>
            <div style={{ fontSize: fs * 0.75, color: APP.muted, marginBottom: 14 }}>9 de 9 aulas concluídas</div>
            <AppButton fs={fs * 0.95} glow={btnGlow} scale={btnScale}>Fazer a prova</AppButton>
          </div>
        )}
      </div>
    ))}
  </div>
)
// Selo/medalha do certificado.
export const Seal = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M22 40 L16 62 L26 56 L32 62 L34 42 Z M42 40 L48 62 L38 56 L32 62 L30 42 Z" fill={C.purple} stroke={C.night} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="32" cy="28" r="22" fill={APP.gold} stroke="#845A00" strokeWidth="3" />
    <circle cx="32" cy="28" r="15" fill="none" stroke="#845A00" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M32 17 L35 25 L43 25 L37 30 L39 38 L32 33 L25 38 L27 30 L21 25 L29 25 Z" fill={C.white} stroke="#845A00" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
// QR fictício (padrão determinístico, mesmo desenho dos reels).
export const FakeQR = ({ size = 180, seed = 'ana-souza', color = '#120F33' }) => {
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
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>{cells}</svg>
}
export const Certificate = ({ w = 900, name = 'Ana Souza', nameGlow = 0, qrGlow = 0 }) => (
  <div style={{ width: w, borderRadius: 26, padding: 14, background: 'linear-gradient(135deg, #FFDC7A, #E5A21F)', boxShadow: '0 30px 70px rgba(38,33,92,0.3)' }}>
    <div style={{ borderRadius: 16, background: 'linear-gradient(155deg, #FFFFFF 0%, #F6F5FD 60%, #EEF6FF 100%)', padding: '30px 38px', fontFamily: FONT, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoMark height={46} />
          <Wordmark size={36} color={C.night} />
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.22em', color: '#5B3FD6' }}>CERTIFICADO</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 24, gap: 24 }}>
        <div>
          <div style={{ fontSize: 24, color: APP.muted }}>Certificamos que</div>
          <div style={{ display: 'inline-block', fontSize: 64, fontWeight: 800, color: C.night, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 4, borderRadius: 12, padding: '0 10px', margin: '4px -10px 0', background: nameGlow ? `rgba(255,210,138,${0.7 * nameGlow})` : 'transparent' }}>{name}</div>
          <div style={{ fontSize: 26, color: '#3B3670', marginTop: 10, lineHeight: 1.3 }}>concluiu o nível <b>Primeiro Commit</b><br />e foi aprovada na prova do nível.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
            <Seal size={70} />
            <div style={{ fontSize: 20, color: APP.muted, lineHeight: 1.3 }}>Código de verificação<br /><b style={{ fontFamily: MONO, color: C.night }}>DTV-7K2Q-91XA</b></div>
          </div>
        </div>
        <div style={{ padding: 10, background: C.white, borderRadius: 16, boxShadow: `0 8px 24px rgba(38,33,92,0.16)${qrGlow ? `, 0 0 0 ${5 * qrGlow}px ${C.green}` : ''}`, flexShrink: 0 }}>
          <FakeQR size={170} />
        </div>
      </div>
    </div>
  </div>
)
// Celular simples (para conferir o QR Code).
export const Phone = ({ w = 280, h = 520, children, style }) => (
  <div style={{ width: w, height: h, borderRadius: 44, background: '#1A1640', padding: 12, boxSizing: 'border-box', boxShadow: '0 24px 50px rgba(38,33,92,0.35)', ...style }}>
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 34, background: APP.bg, overflow: 'hidden', fontFamily: FONT }}>
      <div style={{ position: 'absolute', left: '50%', top: 10, width: 90, height: 22, borderRadius: 11, background: '#1A1640', transform: 'translateX(-50%)' }} />
      {children}
    </div>
  </div>
)

// Paleta de pintor (Bloco 14).
export const Palette = ({ size = 160 }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 100 80">
    <path d="M50 4 C80 4 98 22 96 42 C94 58 80 56 72 58 C64 60 66 74 54 76 C26 80 4 62 4 40 C4 18 24 4 50 4 Z" fill="#F4DDB8" stroke={C.night} strokeWidth="3" />
    <circle cx="26" cy="30" r="8" fill="#F0509E" stroke={C.night} strokeWidth="2" />
    <circle cx="46" cy="18" r="8" fill="#3EC5FF" stroke={C.night} strokeWidth="2" />
    <circle cx="70" cy="22" r="8" fill="#F5BE3C" stroke={C.night} strokeWidth="2" />
    <circle cx="24" cy="54" r="8" fill="#8B6CFF" stroke={C.night} strokeWidth="2" />
    <ellipse cx="56" cy="50" rx="7" ry="6" fill={C.white} stroke={C.night} strokeWidth="2" />
  </svg>
)

// Monoespaçado com os sinais de tag.
export const T = ({ children, color }) => <span style={{ fontFamily: MONO, color }}>{children}</span>
