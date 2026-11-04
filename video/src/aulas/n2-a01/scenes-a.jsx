import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { House, DocIcon } from '../../components/Diagram.jsx'
import { Label, LinesBox, Warn, abs, edAt, rampF, win } from '../n1-a08/scenes-a.jsx'
import { Flag } from '../n1-a09/ana.jsx'
import { Code, EditorTabs, Note, PageCss, PaintRoller, Preview } from './css.jsx'

export { Label, LinesBox, Warn, abs, edAt, rampF, win }

export const pop = (frame, fps, t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })
export const YEL = 'rgba(255,210,138,0.6)'
export const GREEN_HL = 'rgba(151,196,89,0.55)'
export const RED_HL = 'rgba(217,83,79,0.6)'

// Mistura de duas cores hex (para a prévia mudar de cor aos poucos — o valor continua sendo CSS de verdade).
export const mix = (a, b, t) => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const [x, y] = [p(a), p(b)]
  const k = clamp01(t)
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * k)).join(', ')})`
}
export const HEX = { black: '#000000', white: '#FFFFFF', navy: '#000080', lightyellow: '#FFFFE0', green: '#008000', purple: '#800080', tomato: '#FF6347' }

// ---------------------------------------------------------------- o index.html da Ana (Blocos 4 e 5)
// Cada linha: b = bloco em que é digitada (0 = já existe), parts = trechos com a chave de tempo.
const F = (b, k, t) => ({ b, parts: [{ k, t }] })
const FP = (b, parts) => ({ b, parts })
export const INDEX = [
  F(0, '', '<!DOCTYPE html>'),
  F(0, '', '<html lang="pt-BR">'),
  F(0, '', '  <head>'),
  F(0, '', '    <meta charset="UTF-8">'),
  F(0, '', '    <title>Ana Souza, página pessoal</title>'),
  F(4, 'style', '    <style>'),
  F(4, 'h1', '      h1 {'),
  F(4, 'color', '        color: navy;'),
  F(4, 'h1C', '      }'),
  F(5, 'body', ''),
  F(5, 'body', '      body {'),
  FP(5, [{ k: 'bg', t: '        background-color: ' }, { k: 'ly', t: 'lightyellow;' }]),
  F(5, 'bodyC', '      }'),
  F(5, 'p', ''),
  F(5, 'p', '      p {'),
  FP(5, [{ k: 'fs', t: '        font-size: ' }, { k: 'px', t: '18px;' }]),
  F(5, 'pC', '      }'),
  F(4, 'styleC', '    </style>'),
  F(0, '', '  </head>'),
  F(0, '', '  <body>'),
  F(0, '', '    <header>'),
  F(0, '', '      <h1>Olá, eu sou a Ana</h1>'),
  F(0, '', '      <nav>'),
  F(0, '', '        <ul>'),
  F(0, '', '          <li><a href="#sobre">Sobre mim</a></li>'),
  F(0, '', '          <li><a href="#projetos">Meus projetos</a></li>'),
]
export const typeSpeed = (len) => Math.max(5, Math.round(len * 0.45))
export const indexSegments = (n, times = {}) => {
  const acc = {}
  const out = []
  INDEX.filter((l) => l.b <= n).forEach((l, i) => {
    l.parts.forEach((p, j) => {
      const text = (i && j === 0 ? '\n' : '') + p.t
      if (l.b < n) { out.push({ text, start: 0, frames: 0 }); return }
      if (times[p.k] == null) throw new Error(`sem tempo para ${p.k}`)
      const fr = typeSpeed(p.t.trim().length)
      out.push({ text, start: times[p.k] + (acc[p.k] || 0), frames: fr })
      acc[p.k] = (acc[p.k] || 0) + fr + 2
    })
  })
  return out
}
export const indexLine = (n, sub) => INDEX.filter((l) => l.b <= n).findIndex((l) => l.parts.map((p) => p.t).join('').includes(sub))

// Geometria comum do editor + prévia (Blocos 4, 5).
export const ED = { x: 40, y: 30, fs: 24 }
export const ED_W = 1000
export const ED_H = 840
export const PV = { x: 1075, y: 30, w: 810, h: 600 }

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tLvl = s('Primeira Demão')
  const tHouse = s('Lembra da casa')
  const tStruct = s('O HTML é a estrutura')
  const tPast = s('No nível passado')
  const tDraft = s('mas ainda tem cara de rascunho')
  const tPaint = s('Agora chegou a hora do acabamento')
  const tCss = s('É aqui que entra')
  const tToday = s('Hoje, você vai entender')
  const tI = [s('o que ele é'), s('como se escreve uma regra'), s('as formas de ligar')]
  const tColors = s('E, no fim, a página da Ana')
  const tBye = s('Abre o editor')
  const logoBig = 1 - rampF(frame, tLvl - 8, tLvl + 4)
  const logoSmall = rampF(frame, tLvl, tLvl + 14)
  const stepsOp = 1 - rampF(frame, tPast - 6, tPast + 8)
  const lvlTitle = 1 - rampF(frame, tStruct - 4, tStruct + 8)
  const heights = [170, 210, 250, 290, 330]
  const SX = 90
  const SW = 820
  const stepW = (SW - 4 * 12) / 5
  // casa: entra à direita, vai para a esquerda quando a página da Ana aparece
  const move = rampF(frame, tPast - 4, tPast + 18)
  const hx = interpolate(move, [0, 1], [1130, 130])
  const houseOp = fadeIn(frame, tHouse, 12) * (1 - rampF(frame, tToday - 4, tToday + 8))
  const sweep = rampF(frame, tPaint + 4, tPaint + 46)
  const rollerOp = win(frame, tPaint, tPaint + 56, 8)
  const HW = 600
  const pageOp = fadeIn(frame, tPast, 14)
  const col = rampF(frame, tColors + 6, tColors + 30)
  const css = col > 0 ? `h1 {\n  color: ${mix(HEX.black, HEX.navy, col)};\n}\nbody {\n  background-color: ${mix(HEX.white, HEX.lightyellow, col)};\n}` : ''
  return (
    <AbsoluteFill>
      <div style={abs(0, 0, { width: 1920, height: 880, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: logoBig })}>
        <LogoReveal start={4} height={300} />
      </div>
      <div style={abs(70, 40, { opacity: logoSmall, display: 'flex', alignItems: 'center', gap: 18 })}>
        <LogoMark height={56} keyColor={C.green} />
        <Wordmark size={46} />
      </div>
      {/* título do nível, depois o da aula */}
      {lvlTitle > 0 && (
        <div style={abs(0, 120, { width: 1920, opacity: lvlTitle })}>
          <Title start={tLvl} size={84}>Nível 2 — Primeira Demão</Title>
        </div>
      )}
      {frame >= tStruct - 4 && (
        <div style={abs(0, 40, { width: 1920 })}>
          <Title start={tStruct} size={62}>Aula 1 — O que é CSS?</Title>
        </div>
      )}
      {/* 5 degraus: o primeiro com a bandeirinha, o segundo acendendo */}
      {stepsOp > 0 && (
        <div style={{ opacity: stepsOp }}>
          <div style={abs(SX, 760 - 330, { width: SW, height: 330, display: 'flex', alignItems: 'flex-end', gap: 12 })}>
            {block.levels.map((name, i) => {
              const p = spring({ frame: frame - (tLvl + 6 + i * 6), fps, config: { damping: 16, stiffness: 120 } })
              const on2 = i === 1 ? rampF(frame, tLvl + 20, tLvl + 32) : 0
              const done = i === 0
              const glow = i === 1 ? on2 * (0.7 + 0.3 * Math.sin(frame / 6)) : 0
              return (
                <div key={name} style={{ flex: 1, height: heights[i] * clamp01(p), opacity: clamp01(p * 2), background: done ? C.purple : on2 > 0.5 ? '#CDEFFF' : '#D8D5F6', border: `4px solid ${done ? C.night : on2 > 0.5 ? '#2E9BFF' : C.purpleSoft}`, borderRadius: '16px 16px 0 0', boxShadow: glow ? `0 0 ${46 * glow}px #3EC5FF` : 'none', fontFamily: FONT, color: done ? C.white : C.night, fontSize: 24, fontWeight: 600, textAlign: 'center', padding: '12px 6px', overflow: 'hidden', boxSizing: 'border-box', lineHeight: 1.15 }}>
                  <div style={{ fontSize: 44, opacity: 0.9, marginBottom: 2 }}>{i + 1}</div>
                  {name}
                </div>
              )
            })}
          </div>
          <div style={abs(SX + stepW / 2 - 18, 760 - heights[0] - 74, { opacity: clamp01(pop(frame, fps, tLvl + 30) * 2), transform: `scale(${0.4 + 0.6 * pop(frame, fps, tLvl + 30)})`, transformOrigin: 'left bottom' })}><Flag size={76} /></div>
        </div>
      )}
      {/* a casa: estrutura (HTML) e a pintura (CSS) */}
      {houseOp > 0 && (
        <div style={abs(hx, 200, { opacity: houseOp, width: HW })}>
          <div style={{ position: 'relative', width: HW, height: HW * (520 / 600) }}>
            <div style={abs(0, 0)}><House structure={rampF(frame, tStruct - 10, tStruct + 40)} paint={0} width={HW} /></div>
            <div style={abs(0, 0, { clipPath: `inset(-40px ${(1 - sweep) * 100}% -40px -40px)` })}><House structure={1} paint={sweep > 0 ? 1 : 0} width={HW} /></div>
            {rollerOp > 0 && <div style={abs(-40 + sweep * (HW - 60), 120 + 90 * Math.sin(sweep * Math.PI * 5), { opacity: rollerOp })}><PaintRoller size={150} /></div>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 6 }}>
            <div style={{ opacity: fadeIn(frame, tStruct + 20, 10), display: 'flex', alignItems: 'center', gap: 12 }}>
              <Chip size={30} color={C.night} border={C.purple}>HTML: nível 1</Chip><Check size={46} />
            </div>
            <div style={{ opacity: fadeIn(frame, tPaint + 10, 10) }}>
              <Chip size={30} color={C.white} bg={C.purple} border={C.night}>CSS: agora</Chip>
            </div>
          </div>
        </div>
      )}
      {/* hoje: três coisas */}
      <div style={abs(130, 230, { display: 'flex', flexDirection: 'column', gap: 30, opacity: fadeIn(frame, tToday, 10) })}>
        {['o que é o CSS', 'como se escreve uma regra', 'como ligar o CSS à página'].map((t, i) => {
          const o = pop(frame, fps, tI[i])
          return (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: clamp01(o * 2), transform: `translateX(${(1 - clamp01(o)) * -40}px)` }}>
              <div style={{ width: 84, height: 84, borderRadius: 22, background: C.purple, border: `4px solid ${C.night}`, color: C.white, fontFamily: FONT, fontSize: 46, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
              <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.night }}>{t}</div>
            </div>
          )
        })}
      </div>
      {/* a página da Ana, da aula 9 */}
      {pageOp > 0 && (
        <div style={abs(1010, 170, { opacity: pageOp, transform: `translateY(${(1 - pageOp) * 30}px)` })}>
          <Preview w={820} h={560}>
            <PageCss id="b1-ana" css={css} zoom={1.2} />
          </Preview>
        </div>
      )}
      <Label x={1010} y={756} w={820} op={win(frame, tDraft, tCss, 12)} size={30} border={C.purple}>estrutura pronta, falta o acabamento</Label>
      <Label x={1010} y={756} w={820} op={win(frame, tCss, tColors, 12)} dark size={30}>CSS: a linguagem da aparência</Label>
      <div style={abs(1010, 750, { width: 820, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tColors + 24, 12) })}>
        <Chip size={30} color={C.night} border={C.purple}>no fim da aula: as primeiras cores</Chip>
        <div style={{ transform: `scale(${pop(frame, fps, tColors + 30)})` }}><Check size={52} /></div>
      </div>
      <div style={abs(130, 760, { opacity: fadeIn(frame, tBye, 12) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>abre o editor e bora destravar</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
// Posições aproximadas (no quadro) dos elementos da página, para as etiquetas.
const THREE = [
  { id: 'v1', css: 'body {\n  background-color: #FFF4E0;\n  font-family: Georgia, serif;\n}\nh1 {\n  color: #B4532A;\n}\na {\n  color: #B4532A;\n}' },
  { id: 'v2', css: 'body {\n  background-color: #1B1744;\n  color: #EEEDFE;\n}\nh1 {\n  color: #8FD3E8;\n}\na {\n  color: #FFD28A;\n}' },
  { id: 'v3', css: 'body {\n  background-color: #E6F7FF;\n  font-family: Consolas, monospace;\n}\nh1 {\n  color: #2E6BD3;\n  font-size: 40px;\n}\np {\n  font-size: 14px;\n}' },
]
export const Papeis = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tHtml = s('O HTML diz o que')
  const tT = [s('isto é um título'), s('isto é um parágrafo'), s('isto é um menu')]
  const tCssC = s('O cê ésse ésse diz como')
  const tC = [s('de que cor'), s('de que tamanho'), s('com quanto espaço')]
  const tCur = s('Repara numa coisa curiosa')
  const tBig = s('O título é grande')
  const tLinks = s('e os links são azuis')
  const tWho = s('Quem fez isso')
  const tYou = s('Com o cê ésse ésse, você passa')
  const tBest = s('E o melhor')
  const tName = s('O nome vem do inglês')
  const tMean = s('que quer dizer')
  const tKeep = s('Guarde a palavra')
  const A = 1 - rampF(frame, tCur - 6, tCur + 6)
  const B = rampF(frame, tCur - 6, tCur + 6) * (1 - rampF(frame, tBest - 6, tBest + 6))
  const Cc = rampF(frame, tBest - 6, tBest + 6) * (1 - rampF(frame, tName - 6, tName + 6))
  const D = rampF(frame, tName - 6, tName + 6)
  // coluna do CSS: cada propriedade entra na hora em que é dita
  const c1 = rampF(frame, tC[0] + 4, tC[0] + 16)
  const c2 = rampF(frame, tC[1] + 4, tC[1] + 16)
  const c3 = rampF(frame, tC[2] + 4, tC[2] + 16)
  const cssR = [
    c1 > 0 ? `h1 {\n  color: ${mix(HEX.black, C.purple, c1)};\n}` : '',
    c2 > 0 ? `p {\n  font-size: ${(16 + 4 * c2).toFixed(2)}px;\n}` : '',
    c3 > 0 ? `nav {\n  padding: ${(14 * c3).toFixed(1)}px;\n  background-color: ${mix(HEX.white, C.lavender, c3)};\n}` : '',
  ].join('\n')
  const P1 = { x: 70, y: 190, w: 860, h: 640 }
  const P2 = { x: 990, y: 190, w: 860, h: 640 }
  const tag = (x, y, t, at, color = C.purple) => {
    const o = pop(frame, fps, at)
    return <div style={abs(x, y, { opacity: clamp01(o * 2), transform: `scale(${0.6 + 0.4 * o})`, transformOrigin: 'left center' })}><Chip size={30} color={C.white} bg={color} border={C.night}>{t}</Chip></div>
  }
  const split = rampF(frame, tBest + 20, tBest + 50)
  const e = 1 - Math.pow(1 - split, 3)
  const words = [['Cascading', 'em cascata'], ['Style', 'de estilo'], ['Sheets', 'folhas']]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(P1.x, 50, { width: P1.w, textAlign: 'center', fontFamily: FONT, fontSize: 56, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tHtml, 12) })}>HTML = <span style={{ color: C.purple }}>o que é</span></div>
          <div style={abs(P2.x, 50, { width: P2.w, textAlign: 'center', fontFamily: FONT, fontSize: 56, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tCssC, 12) })}>CSS = <span style={{ color: C.purple }}>como aparece</span></div>
          <div style={abs(P1.x, P1.y, { opacity: fadeIn(frame, 0, 12) })}><Preview w={P1.w} h={P1.h}><PageCss id="b2-html" zoom={1.1} /></Preview></div>
          <div style={abs(P2.x, P2.y, { opacity: fadeIn(frame, tCssC - 6, 12) })}><Preview w={P2.w} h={P2.h}><PageCss id="b2-css" css={cssR} zoom={1.1} /></Preview></div>
          {tag(P1.x + 340, P1.y + 153, 'título', tT[0])}
          {tag(P1.x + 300, P1.y + 466, 'parágrafo', tT[1])}
          {tag(P1.x + 300, P1.y + 245, 'menu', tT[2])}
          {tag(P2.x + 340, P2.y + 153, 'cor', tC[0], '#B4532A')}
          {tag(P2.x + 300, P2.y + 545, 'tamanho', tC[1], '#B4532A')}
          {tag(P2.x + 340, P2.y + 262, 'espaço', tC[2], '#B4532A')}
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(80, 60)}><Preview w={1000} h={780}><PageCss id="b2-raw" zoom={1.4} /></Preview></div>
          <Note x={0} head="título grande e em negrito" body="(estilo do navegador)" w={680} op={fadeIn(frame, tBig, 12)} style={abs(1170, 120)} />
          <ArrowLine x1={1170} y1={180} x2={480} y2={250} p={rampF(frame, tBig + 6, tBig + 22)} bend={-30} />
          <Note head="link azul e sublinhado" body="(estilo do navegador)" w={680} op={fadeIn(frame, tLinks, 12)} style={abs(1170, 330)} color="#2F5BD3" />
          <ArrowLine x1={1170} y1={390} x2={280} y2={334} p={rampF(frame, tLinks + 6, tLinks + 22)} bend={30} color="#2F5BD3" />
          <div style={abs(1170, 540, { width: 680, opacity: fadeIn(frame, tWho, 12) })}><Chip size={32} color={C.night} bg="#FFF4D6" border="#E8B860">quem fez: o navegador, com um estilo padrão para cada tag</Chip></div>
          <div style={abs(1170, 720, { opacity: fadeIn(frame, tYou, 12), transform: `scale(${0.8 + 0.2 * pop(frame, fps, tYou)})`, transformOrigin: 'left center' })}><Chip size={40} color={C.white} bg={C.purple} border={C.night}>com CSS, quem manda é você</Chip></div>
        </div>
      )}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(960 - 70, 40, { opacity: 1 - 0.3 * e })}><DocIcon size={140} text="<html>" /></div>
          <div style={abs(960 + 90, 90, { fontFamily: MONO, fontSize: 40, fontWeight: 700, color: C.night })}>index.html</div>
          {THREE.map((v, i) => {
            const x = 960 - 280 + (i - 1) * 620 * e
            return (
              <div key={v.id} style={abs(x, 270, { opacity: clamp01(split * 3), transform: `scale(${0.5 + 0.5 * e})` })}>
                <Preview w={560} h={480}><PageCss id={`b2-${v.id}`} css={v.css} zoom={0.85} /></Preview>
              </div>
            )
          })}
          {THREE.map((v, i) => {
            const x = 960 - 280 + (i - 1) * 620 * e
            return <ArrowLine key={i} x1={960} y1={230} x2={x + 280} y2={262} p={rampF(frame, tBest + 20, tBest + 40)} width={6} opacity={1 - split * 0.0} />
          })}
          <Label x={0} y={790} w={1920} op={fadeIn(frame, tBest + 60, 12)} dark size={40}>mesmo HTML, três visuais</Label>
        </div>
      )}
      {D > 0 && (
        <div style={{ opacity: D }}>
          <div style={abs(0, 210, { width: 1920, display: 'flex', justifyContent: 'center', gap: 46 })}>
            {words.map(([w, pt], i) => {
              const keep = i > 0 ? win(frame, tKeep, frames + 100, 12) : 0
              return (
                <div key={w} style={{ textAlign: 'center', opacity: fadeIn(frame, tName + 10 + i * 8, 10) }}>
                  <div style={{ fontFamily: FONT, fontSize: 120, fontWeight: 800, color: C.night, letterSpacing: -2, padding: '0 18px', borderRadius: 22, background: keep ? `rgba(255,210,138,${0.8 * keep})` : 'transparent' }}><span style={{ color: C.purple }}>{w[0]}</span>{w.slice(1)}</div>
                  <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 600, color: C.purple, marginTop: 10, opacity: fadeIn(frame, tMean + 10 + i * 8, 10) }}>{pt}</div>
                </div>
              )
            })}
          </div>
          <Label x={0} y={520} w={1920} op={fadeIn(frame, tMean + 40, 12)} size={44} border={C.purple}>folhas de estilo em cascata</Label>
          <div style={abs(0, 680, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tKeep, 12), transform: `scale(${0.85 + 0.15 * pop(frame, fps, tKeep)})` })}>
            <Chip size={48} color={C.night} bg="#FFF4D6" border="#E8B860"><b>Style Sheet</b> = folha de estilo</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
const AN = { x: 600, y: 290, fs: 84 }
const cw = AN.fs * 0.55
const lh = AN.fs * 1.5
const BOXR = AN.x - 50 + 16 * cw + 100
const at = (line, col) => ({ x: AN.x + col * cw, y: AN.y + line * lh + lh / 2 })
const PIECE = {
  sel: { line: 0, c0: 0, c1: 2, color: '#7F77DD' },
  open: { line: 0, c0: 3, c1: 4, color: '#F0A04B' },
  close: { line: 2, c0: 0, c1: 1, color: '#F0A04B' },
  prop: { line: 1, c0: 2, c1: 7, color: '#D46FA8' },
  colon: { line: 1, c0: 7, c1: 8, color: '#2FA89A' },
  val: { line: 1, c0: 9, c1: 13, color: '#2F5BD3' },
  semi: { line: 1, c0: 13, c1: 14, color: '#8A5A12' },
}
export const Anatomia = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tAll = s('Todo cê ésse ésse')
  const tForm = s('E toda regra tem a mesma forma')
  const tSel = s('Primeiro vem o seletor')
  const tH1 = s('Por exemplo, agá um')
  const tOpen = s('Depois, abre chaves')
  const tDecl = s('Dentro das chaves vem a declaração')
  const tProp = s('o nome de uma propriedade')
  const tColon = s('dois pontos, o valor')
  const tVal = s('o valor, e um ponto')
  const tSemi = s('e um ponto e vírgula no fim')
  const tColor = s('A primeira propriedade')
  const tRead = s('agá um, abre chaves, cálor')
  const tR = [tRead, s('abre chaves, cálor'), s('cálor, dois pontos, nêivi'), s('dois pontos, nêivi'), s('nêivi, ponto e vírgula'), s('ponto e vírgula, fecha'), s('fecha chaves. Nêivi')]
  const tNavy = s('Nêivi é um azul-marinho')
  const tPt = s('Lendo em português')
  const tDiff = s('Repara que, diferente do HTML')
  const tTag = s('O seletor é só o nome da tag')
  const show = { sel: tH1, open: tOpen, close: tOpen + 8, prop: tProp, colon: tColon, val: tVal, semi: tSemi }
  const order = ['sel', 'open', 'prop', 'colon', 'val', 'semi', 'close']
  const readIdx = frame >= tR[0] && frame < tNavy ? tR.filter((t) => frame >= t).length - 1 : -1
  const labelsOp = 1 - rampF(frame, tDiff - 6, tDiff + 6)
  const up = rampF(frame, tDiff - 6, tDiff + 14)
  const ruleText = ['h1 {', '  color: navy;', '}']
  const piece = (k) => {
    const p = PIECE[k]
    const o = fadeIn(frame, show[k], 8)
    const reading = readIdx >= 0 && order[readIdx] === k
    const a = at(p.line, p.c0)
    const w = (p.c1 - p.c0) * cw
    return (
      <div key={k} style={abs(a.x - 4, a.y - lh / 2 + 10, { width: w + 8, height: lh - 20, opacity: o * labelsOp, borderBottom: `8px solid ${p.color}`, borderRadius: 8, background: reading ? `${p.color}55` : 'transparent', boxShadow: reading ? `0 0 26px ${p.color}` : 'none', boxSizing: 'border-box' })} />
    )
  }
  const charOp = (line, col) => {
    for (const k of Object.keys(PIECE)) {
      const p = PIECE[k]
      if (p.line === line && col >= p.c0 && col < p.c1) return fadeIn(frame, show[k], 8)
    }
    return 1
  }
  const navyOp = fadeIn(frame, tNavy, 12)
  return (
    <AbsoluteFill>
      <div style={abs(0, 40, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 54, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tAll, 12) })}>
        Todo CSS é feito de <span style={{ color: C.purple }}>regras</span>
      </div>
      <div style={abs(0, 120, { width: 1920, textAlign: 'center', fontFamily: MONO, fontSize: 40, color: '#5F5A86', opacity: win(frame, tForm, tH1, 12) })}>seletor {'{'} propriedade: valor; {'}'}</div>
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-90 * up}px) scale(${1 - 0.2 * up})`, transformOrigin: '960px 200px' }}>
        {/* a regra, peça por peça */}
        <div style={abs(AN.x - 50, AN.y - 30, { width: 16 * cw + 100, height: 3 * lh + 60, background: C.nightDeep, borderRadius: 26, border: `3px solid ${C.purple}`, boxShadow: '0 24px 60px rgba(27,23,68,0.4)', opacity: fadeIn(frame, tSel, 12) })} />
        {ruleText.map((ln, li) => (
          <div key={li} style={abs(AN.x, AN.y + li * lh, { fontFamily: MONO, fontSize: AN.fs, lineHeight: `${lh}px`, whiteSpace: 'pre', fontWeight: 700 })}>
            {ln.split('').map((ch, ci) => {
              const colr = li === 1 ? (ci < 7 ? '#FFD28A' : ci >= 9 && ci < 13 ? '#8FD3E8' : '#A9A4E8') : ci < 2 && li === 0 ? '#B3ADFF' : '#A9A4E8'
              return <span key={ci} style={{ color: colr, opacity: charOp(li, ci) }}>{ch}</span>
            })}
          </div>
        ))}
        {Object.keys(PIECE).map(piece)}
        {/* amostra da cor navy ao lado do valor */}
        <div style={abs(at(1, 14).x + 24, at(1, 0).y - 34, { width: 68, height: 68, borderRadius: 14, background: HEX.navy, border: `4px solid ${C.white}`, boxShadow: '0 6px 14px rgba(0,0,0,0.3)', opacity: navyOp * labelsOp })} />
        {/* etiquetas */}
        <div style={{ opacity: labelsOp }}>
          <Note head="seletor" body="quem recebe o estilo" color={PIECE.sel.color} w={400} op={fadeIn(frame, tSel, 12)} style={abs(70, 300)} />
          <ArrowLine x1={470} y1={350} x2={at(0, 0).x - 14} y2={at(0, 1).y} p={rampF(frame, tH1, tH1 + 14)} color={PIECE.sel.color} width={6} />
          <Note head="chaves" body="o começo e o fim da regra" color={PIECE.open.color} w={400} op={fadeIn(frame, tOpen, 12)} style={abs(70, 570)} />
          <ArrowLine x1={470} y1={615} x2={at(2, 0).x - 14} y2={at(2, 0).y} p={rampF(frame, tOpen + 4, tOpen + 18)} color={PIECE.open.color} width={6} />
          <Note head="propriedade" body="o que muda" color={PIECE.prop.color} w={400} op={fadeIn(frame, tProp, 12)} style={abs(70, 435)} />
          <ArrowLine x1={470} y1={480} x2={at(1, 2).x - 14} y2={at(1, 2).y} p={rampF(frame, tProp + 4, tProp + 18)} color={PIECE.prop.color} width={6} />
          <Note head="dois pontos" body="separam" color={PIECE.colon.color} w={300} op={fadeIn(frame, tColon, 12)} style={abs(900, 140)} />
          <ArrowLine x1={980} y1={245} x2={at(1, 7).x + cw / 2} y2={at(1, 0).y - 50} p={rampF(frame, tColon + 4, tColon + 16)} color={PIECE.colon.color} width={6} />
          <Note head="valor" body="como fica" color={PIECE.val.color} w={300} op={fadeIn(frame, tVal, 12)} style={abs(1240, 140)} />
          <ArrowLine x1={1300} y1={245} x2={at(1, 11).x} y2={at(1, 0).y - 50} p={rampF(frame, tVal + 4, tVal + 16)} color={PIECE.val.color} width={6} />
          <Note head="ponto e vírgula" body="fecha a declaração" color={PIECE.semi.color} w={400} op={fadeIn(frame, tSemi, 12)} style={abs(1440, 570)} />
          <ArrowLine x1={1440} y1={620} x2={at(1, 13).x + cw / 2 + 6} y2={at(1, 0).y + 52} p={rampF(frame, tSemi + 4, tSemi + 18)} bend={-40} color={PIECE.semi.color} width={6} />
          <div style={abs(BOXR + 24, at(1, 0).y - 30, { opacity: win(frame, tColor, tRead, 10) })}><Chip size={30} color={C.night} border={PIECE.prop.color}>color = cor do texto</Chip></div>
          <div style={abs(BOXR + 24, at(1, 0).y - 30, { opacity: fadeIn(frame, tNavy, 10) })}><Chip size={30} color={C.night} border={PIECE.val.color}>navy = azul-marinho</Chip></div>
        </div>
      </div>
      {/* lendo em português */}
      <div style={abs(0, 735, { width: 1920, display: 'flex', justifyContent: 'center', opacity: win(frame, tPt, tDiff, 12) })}>
        <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 600, color: C.night, background: C.white, border: `4px solid ${C.purple}`, borderRadius: 20, padding: '14px 34px' }}>
          todo <span style={{ fontFamily: MONO, color: C.purple }}>{'<h1>'}</span> fica com o texto <span style={{ color: HEX.navy, fontWeight: 800 }}>azul-marinho</span>
        </div>
      </div>
      {/* HTML x CSS */}
      <div style={abs(0, 560, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 120, opacity: fadeIn(frame, tDiff + 6, 12) })}>
        {[['HTML', '<h1>'], ['CSS', 'h1']].map(([k, t], i) => (
          <div key={k} style={{ textAlign: 'center', opacity: fadeIn(frame, tDiff + 6 + i * 14, 10) }}>
            <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.purple, marginBottom: 10 }}>{k}</div>
            <div style={{ fontFamily: MONO, fontSize: 90, fontWeight: 700, background: C.nightDeep, color: '#B3ADFF', borderRadius: 20, padding: '10px 40px', border: `3px solid ${C.purple}` }}>
              {i === 0 ? <><span style={{ color: '#FF9C9C', background: frame >= tDiff + 40 ? RED_HL : 'transparent', borderRadius: 8 }}>{'<'}</span>h1<span style={{ color: '#FF9C9C', background: frame >= tDiff + 40 ? RED_HL : 'transparent', borderRadius: 8 }}>{'>'}</span></> : 'h1'}
            </div>
          </div>
        ))}
      </div>
      <Label x={0} y={800} w={1920} op={fadeIn(frame, tDiff + 40, 12)} dark size={38}>{frame >= tTag ? 'no CSS, sem < e >: o seletor é só o nome da tag' : 'no CSS, sem < e >'}</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
export const IndexEditor = ({ n, times, highlights = [], children, op = 1, x = ED.x, y = ED.y }) => (
  <div style={abs(x, y, { opacity: op })}>
    <EditorTabs tabs={[{ name: 'index.html', active: true }]} width={ED_W} height={ED_H}>
      <Code segments={indexSegments(n, times)} fontSize={ED.fs} highlights={highlights} />
    </EditorTabs>
    {children}
  </div>
)

export const TagStyle = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tWhere = s('Agora, onde a regra vai')
  const tFirst = s('A primeira forma é a tag stáil')
  const tOpenF = s('Abre o index ponto html')
  const tHead = s('Dentro do head, logo depois')
  const tStyle = s('abre a tag stáil')
  const times = { style: tStyle + 6, h1: s('agá um, abre chaves'), color: s('cálor, dois pontos'), h1C: s('fecha chaves. E fecha'), styleC: s('E fecha a tag stáil') + 8 }
  const tSave = s('Salva e olha a prévia')
  const tNavy = s('o olá, eu sou a Ana ficou')
  const tWorks = s('Esse é o seu primeiro')
  const tWhy = s('Por que no head')
  const tInfo = s('Porque o head guarda')
  const tNot = s('Ele não aparece como texto')
  const tShape = s('Ele muda a forma')
  const edOp = fadeIn(frame, tOpenF, 12)
  const col = rampF(frame, tSave + 18, tSave + 34)
  const css = col > 0 ? `h1 {\n  color: ${mix(HEX.black, HEX.navy, col)};\n}` : ''
  const ed = { ...ED }
  const lStyle = indexLine(4, '<style>')
  const lStyleC = indexLine(4, '</style>')
  const hls = [
    { text: '<style>', at: times.styleC + 24, color: YEL },
    { text: '</style>', at: times.styleC + 24, color: YEL },
  ]
  return (
    <AbsoluteFill>
      {/* antes do editor: a pergunta */}
      <div style={abs(0, 300, { width: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: 1 - rampF(frame, tOpenF - 6, tOpenF + 6) })}>
        <div style={{ opacity: fadeIn(frame, tWhere, 10) }}><Chip size={60} color={C.night} border={C.purple}>onde a regra vai?</Chip></div>
        <div style={{ opacity: fadeIn(frame, tFirst, 10), display: 'flex', alignItems: 'center', gap: 20 }}>
          <Chip size={44} color={C.white} bg={C.purple} border={C.night}>1ª forma: a tag <span style={{ fontFamily: MONO }}>{'<style>'}</span>, dentro do <span style={{ fontFamily: MONO }}>{'<head>'}</span></Chip>
        </div>
      </div>
      {edOp > 0 && (
        <>
          <IndexEditor n={4} times={times} highlights={hls} op={edOp} />
          <LinesBox ed={ed} l0={2} l1={4} c0={2} c1={44} op={win(frame, tHead, tStyle + 4, 10)} color={C.purpleSoft} />
          <LinesBox ed={ed} l0={2} l1={indexLine(4, '</head>')} c0={2} c1={44} op={fadeIn(frame, tWhy, 12)} color={C.purpleSoft} />
          <LinesBox ed={ed} l0={lStyle} l1={lStyleC} c0={4} c1={20} op={fadeIn(frame, times.styleC + 24, 10) * (1 - fadeIn(frame, tWhy, 10))} color="#E8B860" />
          <div style={abs(edAt(ed, 4, 46).x + 20, edAt(ed, 4, 0).y - 24, { opacity: win(frame, tHead, tStyle + 10, 10) })}><Chip size={26} color={C.night} border={C.purple}>logo depois do title</Chip></div>
          <div style={abs(edAt(ed, lStyle, 24).x, edAt(ed, lStyle + 2, 0).y - 30, { opacity: fadeIn(frame, times.styleC + 30, 10) * (1 - fadeIn(frame, tWhy, 10)) })}>
            <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">a caixa do CSS, dentro do head</Chip>
          </div>
        </>
      )}
      <div style={abs(PV.x, PV.y, { opacity: fadeIn(frame, tOpenF + 6, 12) })}>
        <Preview w={PV.w} h={PV.h}><PageCss id="b4-pv" css={css} zoom={1.2} /></Preview>
        {frame >= tSave && frame < tSave + 16 && <div style={abs(0, 0, { width: PV.w, height: PV.h, borderRadius: 18, boxShadow: `inset 0 0 0 ${6 * (1 - (frame - tSave) / 16)}px ${C.purpleSoft}` })} />}
      </div>
      <div style={abs(PV.x, PV.y + PV.h + 30, { width: PV.w, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: win(frame, tNavy, tWhy, 12) })}>
        <div style={{ transform: `scale(${pop(frame, fps, tWorks)})` }}><Check size={64} /></div>
        <Chip size={34} color={C.night} border={C.green}>primeiro CSS funcionando</Chip>
      </div>
      <div style={abs(PV.x, PV.y + PV.h + 30, { width: PV.w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 })}>
        <div style={{ opacity: fadeIn(frame, tInfo, 12) }}><Chip size={30} color={C.night} border={C.purpleSoft}>head: informações sobre a página</Chip></div>
        <div style={{ opacity: fadeIn(frame, tNot, 12) }}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>{frame >= tShape ? 'não aparece: muda a forma do resto' : 'o estilo não aparece como texto'}</Chip></div>
      </div>
      <div style={abs(PV.x + PV.w - 190, PV.y + 130, { opacity: win(frame, tSave, tSave + 50, 8) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>salvou</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
export const Declaracoes = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tMany = s('Uma regra pode ter várias')
  const tTwo = s('Vamos dar mais duas pinceladas')
  const times = {
    body: s('Uma regra nova para o body'),
    bg: s('com a propriedade béquigráund'),
    ly: s('com o valor láit iélou'),
    p: s('E outra regra para o pê'),
    fs: s('com a fónti sáiz'),
    px: s('igual a dezoito'),
  }
  times.bodyC = times.ly + 16
  times.pC = times.px + 12
  const tYellow = s('Agora o fundo da página')
  const tPx = s('Pê xis é de pixels')
  const tLater = s('Mais para frente')
  const tDash = s('Repara que a béquigráund')
  const tNoSp = s('nada de espaço')
  const bgT = rampF(frame, times.bodyC + 4, times.bodyC + 20)
  const pT = rampF(frame, times.pC + 4, times.pC + 18)
  const css = `h1 {\n  color: navy;\n}` + (bgT > 0 ? `\nbody {\n  background-color: ${mix(HEX.white, HEX.lightyellow, bgT)};\n}` : '') + (pT > 0 ? `\np {\n  font-size: ${(16 + 2 * pT).toFixed(2)}px;\n}` : '')
  const ed = { ...ED }
  const lBg = indexLine(5, 'background-color')
  const lFs = indexLine(5, 'font-size')
  const dash = edAt(ed, lBg, 18)
  const blink = frame >= tDash && frame < tNoSp + 40 && Math.floor((frame - tDash) / 8) % 2 === 0
  const px = edAt(ed, lFs, 25)
  return (
    <AbsoluteFill>
      <IndexEditor n={5} times={times} highlights={[{ text: 'background-color', at: tYellow, until: tYellow + 50, color: YEL }, { text: 'font-size', at: times.pC + 10, until: times.pC + 60, color: YEL }]} />
      <LinesBox ed={ed} l0={indexLine(5, '      h1 {')} l1={indexLine(5, '      h1 {') + 2} c0={6} c1={20} op={win(frame, tMany, tTwo + 10, 10)} color="#E8B860" />
      <div style={abs(edAt(ed, 6, 22).x, edAt(ed, 6, 0).y - 4, { opacity: win(frame, tMany, tTwo + 10, 10) })}><Chip size={26} color={C.night} bg="#FFF4D6" border="#E8B860">várias declarações, cada uma com ;</Chip></div>
      {/* tracinho piscando */}
      {blink && <div style={abs(dash.x - 4, dash.y - ed.fs * 0.8, { width: ed.fs * 0.55 + 8, height: ed.fs * 1.6, borderRadius: 8, border: `4px solid #FFD28A`, boxShadow: '0 0 18px #FFD28A' })} />}
      {/* px */}
      <div style={abs(px.x, px.y - 24, { opacity: fadeIn(frame, tPx, 10) })}><Chip size={26} color={C.night} bg="#FFF4D6" border="#E8B860">px = pixels {frame >= tLater ? '(aula 6)' : ''}</Chip></div>
      <div style={abs(PV.x, PV.y)}>
        <Preview w={PV.w} h={PV.h}><PageCss id="b5-pv" css={css} zoom={1.2} /></Preview>
      </div>
      <div style={abs(PV.x, PV.y + PV.h + 24, { width: PV.w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 })}>
        <div style={{ opacity: fadeIn(frame, tYellow, 10) * (1 - fadeIn(frame, tDash, 10)) }}><Chip size={30} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>background-color</span> = cor do fundo</Chip></div>
        <div style={{ opacity: fadeIn(frame, times.pC + 10, 10) * (1 - fadeIn(frame, tDash, 10)) }}><Chip size={30} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>font-size</span> = tamanho da letra</Chip></div>
      </div>
      <div style={abs(PV.x, PV.y + PV.h + 24, { width: PV.w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tDash, 10) })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Chip size={32} color={C.night} border={C.green}><span style={{ fontFamily: MONO }}>background<span style={{ background: YEL, borderRadius: 4 }}>-</span>color</span></Chip>
          <Check size={52} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tNoSp, 10) }}>
          <Chip size={32} color={C.night} border={C.red}><span style={{ fontFamily: MONO, textDecoration: 'line-through', textDecorationColor: C.red }}>background color</span></Chip>
          <Cross size={52} />
        </div>
      </div>
      <div style={abs(PV.x, PV.y + PV.h + 178, { width: PV.w, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tDash + 20, 10) })}><Chip size={26} color={C.night} bg="#FFF4D6" border="#E8B860">nome com tracinho, sem espaço</Chip></div>
    </AbsoluteFill>
  )
}
