import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { FileTree } from '../../components/FileTree.jsx'
import { House } from '../../components/Diagram.jsx'
import { Label, LinesBox, MouseAt, Warn, YEL, abs, blinkOn, edAt, rampF, win } from '../n1-a08/scenes-a.jsx'
import {
  AnaSite, ClipboardIcon, EditorIcon, Flag, GridPaper, HAND, LessonTag, PencilIcon, PuzzlePiece, REG, RegTag, SITE, SitePreview, SketchRect, Seal,
  FloppyIcon, Tag, autoScroll, buildSegments, colOf, lineOf, tint,
} from './ana.jsx'

export { Label, LinesBox, MouseAt, Warn, YEL, abs, blinkOn, edAt, rampF, win }

const pop = (frame, fps, t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })
export const PAIR = 'rgba(240,160,75,0.6)'
export const GREEN_HL = 'rgba(151,196,89,0.55)'
export const SEC_HL = tint(REG.section, 0.5)

// ---------------------------------------------------------------- montagem (Blocos 5 a 10)
// Editor à esquerda (arquivo inteiro, rolando) e prévia à direita.
export const ED = { x: 40, y: 30, fs: 22 }
export const ED_W = 1000
export const ED_H = 840
export const VIS = 22
export const PV = { x: 1075, y: 30, w: 810, h: 640 }

export const BuildEditor = ({ n, times, highlights = [], scroll = 0, children, op = 1 }) => (
  <div style={abs(ED.x, ED.y, { opacity: op })}>
    <EditorWindow width={ED_W} height={ED_H} filename="index.html">
      <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
        <div style={{ transform: `translateY(${-scroll * ED.fs * 1.5}px)` }}>
          <CodeTyping segments={buildSegments(n, times)} fontSize={ED.fs} highlights={highlights} />
        </div>
      </div>
    </EditorWindow>
    {children}
  </div>
)

// Destaque de um trecho (occ-ésima ocorrência no arquivo inteiro).
export const hl = (text, at, color, occurrence = 0, until) => ({ text, at, color, occurrence, until })
// "aula N" ao lado de uma linha do editor (só se a linha estiver à vista).
export const LineTag = ({ n, line, scroll, op, lesson, dx = 0 }) => {
  if (op <= 0) return null
  const row = line - scroll
  if (row < -0.5 || row > VIS - 0.5) return null
  const p = edAt({ ...ED, scroll }, line, 0)
  void n
  return <div style={abs(ED.x + ED_W - 128 + dx, p.y - 19)}><LessonTag n={lesson} op={op} /></div>
}

// Opacidade de uma parte da prévia: aparece logo depois de a linha ser digitada.
export const after = (frame, t, d = 6) => rampF(frame, t, t + d)

// ---------------------------------------------------------------- Bloco 1
const PIECES = [
  { t: 'topo', c: REG.header, x: 0.04, y: 0.04, w: 0.92, h: 0.15 },
  { t: 'menu', c: REG.nav, x: 0.04, y: 0.22, w: 0.92, h: 0.09 },
  { t: 'seções', c: REG.section, x: 0.04, y: 0.34, w: 0.92, h: 0.2 },
  { t: 'tabela', c: REG.main, x: 0.04, y: 0.57, w: 0.45, h: 0.22 },
  { t: 'formulário', c: REG.article, x: 0.51, y: 0.57, w: 0.45, h: 0.22 },
  { t: 'rodapé', c: REG.footer, x: 0.04, y: 0.83, w: 0.92, h: 0.12 },
]
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tDay = s('Chegou o dia')
  const tLast = s('Esta é a última aula')
  const tNoTag = s('Hoje não tem tag nova')
  const tPage = s('construir uma página pessoal')
  const tPlan = s('Primeiro, você vai planejar')
  const tCode = s('Depois, vai escrever')
  const tRev = s('Em seguida, vai revisar')
  const tSave = s('E, no fim, vai salvar')
  const tExam = s('eu vou te contar como funciona')
  const logoBig = 1 - rampF(frame, tDay - 6, tDay + 8)
  const logoSmall = rampF(frame, tDay, tDay + 14)
  const heights = [180, 220, 260, 300, 340]
  const stepW = (860 - 4 * 12) / 5
  const P = { x: 1150, y: 270, w: 640, h: 360 }
  const icons = [
    [<PencilIcon size={100} />, 'planejar', tPlan],
    [<EditorIcon size={100} />, 'construir', tCode],
    [<ClipboardIcon size={100} />, 'revisar', tRev],
    [<div style={{ width: 100, height: 100, borderRadius: 26, background: C.white, border: `4px solid ${C.purple}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}><FloppyIcon size={70} /></div>, 'salvar', tSave],
    [<div style={{ width: 100, height: 100, borderRadius: 26, background: C.white, border: `4px solid ${C.purple}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}><Seal size={80} /></div>, 'prova e certificado', tExam],
  ]
  const flagP = pop(frame, fps, tLast + 52)
  return (
    <AbsoluteFill>
      <div style={abs(0, 0, { width: 1920, height: 880, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: logoBig })}>
        <LogoReveal start={4} height={300} />
      </div>
      <div style={abs(70, 40, { opacity: logoSmall, display: 'flex', alignItems: 'center', gap: 18 })}>
        <LogoMark height={56} keyColor={C.green} />
        <Wordmark size={46} />
      </div>
      <div style={abs(0, interpolate(frame, [tLast - 8, tLast + 14], [380, 115], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), { width: 1920 })}>
        <Title start={tDay} size={64}>Aula 9 — Projeto final: seu primeiro site pessoal</Title>
      </div>
      {/* 5 degraus, o primeiro aceso com a bandeirinha */}
      <div style={abs(70, 640 - 340, { width: 860, height: 340, display: 'flex', alignItems: 'flex-end', gap: 12 })}>
        {block.levels.map((name, i) => {
          const at = tLast + 4 + i * 8
          const p = spring({ frame: frame - at, fps, config: { damping: 16, stiffness: 120 } })
          const on = i === 0 ? rampF(frame, tLast + 44, tLast + 54) : 0
          return (
            <div key={name} style={{ flex: 1, height: heights[i] * clamp01(p), opacity: clamp01(p * 2), background: on > 0 ? C.purple : '#D8D5F6', border: `4px solid ${on > 0 ? C.night : C.purpleSoft}`, borderRadius: '16px 16px 0 0', boxShadow: on > 0 ? `0 0 ${50 * on}px ${C.purpleSoft}` : 'none', fontFamily: FONT, color: on > 0 ? C.white : C.night, fontSize: 24, fontWeight: 600, textAlign: 'center', padding: '12px 6px', overflow: 'hidden', boxSizing: 'border-box' }}>
              <div style={{ fontSize: 44, opacity: 0.9, marginBottom: 2 }}>{i + 1}</div>
              {name}
            </div>
          )
        })}
      </div>
      <div style={abs(70 + stepW / 2 - 18, 640 - heights[0] - 74, { opacity: clamp01(flagP * 2), transform: `scale(${0.4 + 0.6 * flagP})`, transformOrigin: 'left bottom' })}><Flag size={76} /></div>
      <Label x={20} y={656} w={560} op={fadeIn(frame, tLast + 58, 12)} dark size={30}>último passo do degrau 1</Label>
      {/* hoje não tem tag nova */}
      <div style={abs(P.x, P.y + 120, { opacity: win(frame, tNoTag, tPage, 12), width: P.w, display: 'flex', justifyContent: 'center' })}>
        <Chip size={40} color={C.night} border={C.purple}>hoje não tem tag nova: <b>junta tudo</b></Chip>
      </div>
      {/* a página que vai se montando */}
      <div style={abs(P.x, P.y, { opacity: fadeIn(frame, tPage - 4, 12), width: P.w, height: P.h, background: C.white, borderRadius: 18, border: `4px solid ${C.purpleSoft}`, boxShadow: '0 18px 40px rgba(38,33,92,0.2)' })}>
        {PIECES.map((q, i) => {
          const o = fadeIn(frame, tPage + 6 + i * 9, 10)
          return (
            <div key={q.t} style={{ position: 'absolute', left: q.x * P.w, top: q.y * P.h, width: q.w * P.w, height: q.h * P.h, borderRadius: 10, background: tint(q.c, 0.25), border: `3px solid ${q.c}`, boxSizing: 'border-box', opacity: o, transform: `translateY(${(1 - o) * -24}px)`, display: 'flex', alignItems: 'center', paddingLeft: 16, fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.night }}>{q.t}</div>
          )
        })}
      </div>
      <Label x={P.x} y={P.y + P.h + 14} w={P.w} op={fadeIn(frame, tPage + 20, 12)} dark size={30}>o que a gente vai construir hoje</Label>
      {/* planejar, construir, revisar, salvar, prova */}
      <div style={abs(0, 728, { width: 1920, display: 'flex', justifyContent: 'center', gap: 70 })}>
        {icons.map(([ic, t, at]) => {
          const o = pop(frame, fps, at)
          return (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: clamp01(o * 2), transform: `scale(${0.6 + 0.4 * o})` }}>
              {ic}
              <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.night }}>{t}</div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
const RECAP = [
  ['Estrutura básica', 'Na aula um'],
  ['Títulos e textos', 'Na dois'],
  ['Links', 'Na três'],
  ['Imagens', 'Na quatro'],
  ['Listas', 'Na cinco'],
  ['Tabelas', 'Na seis'],
  ['Formulários', 'Na sete'],
  ['Tags semânticas', 'E, na oito'],
]
const HUES = ['#B3ADFF', '#8FD3E8', '#F7A8CF', '#FFC08A', '#FFDC7A', '#9FD8CF', '#A9C4F5', '#E2B4F0']
export const Recap = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tStart = s('Antes de começar')
  const tAt = RECAP.map(([, ph]) => s(ph))
  const tEight = s('São oito aulas')
  const tPiece = s('cada uma virou uma peça')
  const tFit = s('Hoje, a gente encaixa')
  const tSeen = s('quase tudo o que vem')
  const tNew = s('Se alguma parte parecer nova')
  const tThere = s('Ela continua lá')
  const cw = 200
  const ch = 150
  const gap = 26
  const x0 = (1920 - (8 * cw + 7 * gap)) / 2
  const morph = rampF(frame, tPiece, tPiece + 18)
  const G = { x: (1920 - 4 * cw) / 2, y: 380 }
  return (
    <AbsoluteFill>
      <div style={abs(0, 36, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 52, fontWeight: 700, color: C.night, opacity: fadeIn(frame, tStart, 12) })}>O caminho que você fez</div>
      {/* linha do tempo */}
      <div style={abs(x0 + cw / 2, 300 + ch / 2 - 3, { width: (8 - 1) * (cw + gap) * rampF(frame, tStart + 6, tAt[7] + 10), height: 6, background: C.purpleSoft, borderRadius: 3, opacity: 1 - morph })} />
      {/* página onde as peças se encaixam */}
      <div style={abs(G.x - 40, G.y - 90, { width: 4 * cw + 80, height: 2 * ch + 130, borderRadius: 22, background: C.white, border: `4px solid ${C.purpleSoft}`, boxShadow: '0 18px 40px rgba(38,33,92,0.2)', opacity: fadeIn(frame, tFit - 6, 14) })}>
        <div style={{ height: 50, background: '#DDDAF6', borderRadius: '18px 18px 0 0', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 18 }}>
          {['#E87B7B', '#E8C47B', '#9CCF8A'].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />)}
          <div style={{ marginLeft: 14, background: C.white, borderRadius: 10, padding: '4px 18px', fontFamily: FONT, fontSize: 20, color: C.night }}>seu primeiro site</div>
        </div>
      </div>
      {RECAP.map(([t], i) => {
        const on = fadeIn(frame, tAt[i], 10)
        const fly = rampF(frame, tFit + i * 4, tFit + 26 + i * 4)
        const e = 1 - Math.pow(1 - fly, 3)
        const r = Math.floor(i / 4)
        const c = i % 4
        const ax = x0 + i * (cw + gap)
        const ay = 300
        const bx = G.x + c * cw
        const by = G.y + r * ch
        const x = ax + (bx - ax) * e
        const y = ay + (by - ay) * e - 120 * Math.sin(Math.PI * e)
        return (
          <div key={t} style={abs(x, y, { width: cw, height: ch })}>
            <div style={{ position: 'absolute', inset: 0, opacity: 1 - morph, borderRadius: 18, background: on > 0.5 ? C.white : '#ECEAFB', color: on > 0.5 ? C.night : '#A9A4D8', border: `4px solid ${on > 0.5 ? C.purple : C.purpleSoft}`, boxShadow: on > 0.5 ? `0 0 ${26 * on}px ${C.purpleSoft}` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, textAlign: 'center', padding: 10, boxSizing: 'border-box', transform: `scale(${0.92 + 0.08 * on})` }}>
              <div style={{ fontSize: 50, fontWeight: 800, color: on > 0.5 ? C.purple : '#B9B5E6', lineHeight: 1 }}>{i + 1}</div>
              <div style={{ fontSize: 25, fontWeight: 700, marginTop: 8, lineHeight: 1.15 }}>{t}</div>
            </div>
            {morph > 0 && (
              <div style={{ position: 'absolute', inset: 0, opacity: morph }}>
                <PuzzlePiece w={cw} h={ch} color={HUES[i]} n={i + 1} label={t} fs={22} right={c < 3 ? 1 : 0} bottom={r < 1 ? 1 : 0} left={c > 0 ? 1 : 0} top={r > 0 ? 1 : 0} />
              </div>
            )}
          </div>
        )
      })}
      <div style={abs(0, 560, { width: 1920, display: 'flex', justifyContent: 'center', opacity: win(frame, tEight, tFit, 12) })}>
        <Chip size={38} color={C.night} border={C.purple}>8 aulas = 8 peças de quebra-cabeça</Chip>
      </div>
      <Label x={0} y={760} w={1920} op={fadeIn(frame, tFit + 40, 12) * (1 - fadeIn(frame, tSeen, 8))} dark size={40}>tudo junto, hoje</Label>
      <Label x={0} y={760} w={1920} op={win(frame, tSeen, tNew, 12)} size={36} border={C.purple}>quase tudo o que vem a seguir, você já viu</Label>
      <div style={abs(0, 760, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tNew, 12) })}>
        <Chip size={34} color={C.night} bg="#FFF4D6" border="#E8B860">parece novo? volta na aula daquele assunto</Chip>
        <div style={{ opacity: fadeIn(frame, tThere, 10) }}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>ela continua lá</Chip></div>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
const SK = { x: 60, y: 40, w: 1120, h: 820 }
const BOXES = [
  { t: 'Sobre mim', note: '(texto + foto)', x: 110, y: 300 },
  { t: 'Meus projetos', note: '(lista de links)', x: 575, y: 300 },
  { t: 'Minha rotina', note: '(tabela)', x: 110, y: 480 },
  { t: 'Fale comigo', note: '(formulário)', x: 575, y: 480 },
]
export const Rascunho = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tStart = s('Todo site bom')
  const tRect = s('desenha um retângulo')
  const tTop = s('Lá em cima, uma faixa')
  const tMid = s('No meio, um espaço grande')
  const tFoot = s('E embaixo, uma faixa fininha')
  const tDivide = s('Agora, divide o meio')
  const tB = [s('sobre mim, meus'), s('meus projetos, minha'), s('minha rotina e fale'), s('fale comigo. Ao lado')]
  const tN = [s('Sobre mim tem um texto'), s('Meus projetos, uma lista'), s('Minha rotina, uma tabela'), s('E fale comigo, um formulário')]
  const tPlant = s('Esse desenho simples')
  const tTags = s('E repara que cada caixa')
  const tH = s('rédêr, név')
  const tNav = s('név, mêin')
  const tMain = s('mêin, sécchon')
  const tSec = s('sécchon e fúter')
  const tF = s('fúter.')
  const dr = (t, d = 18) => rampF(frame, t, t + d)
  const page = { x: 60, y: 50, w: 1000, h: 720 }
  const parts = [
    { x: 80, y: 70, w: 960, h: 130, label: 'topo: nome + menu', t: tTop },
    { x: 80, y: 220, w: 960, h: 440, label: 'conteúdo principal', t: tMid },
    { x: 80, y: 680, w: 960, h: 72, label: 'rodapé', t: tFoot },
  ]
  // etiquetas que voam até as caixas: [nome, cor, alvo (coord. da folha), t]
  const tags = [
    ['header', REG.header, [820, 62], tH],
    ['nav', REG.nav, [700, 150], tNav],
    ['main', REG.main, [880, 212], tMain],
    ['section', REG.section, [370, 292], tSec],
    ['section', REG.section, [835, 292], tSec + 5],
    ['section', REG.section, [370, 472], tSec + 10],
    ['section', REG.section, [835, 472], tSec + 15],
    ['footer', REG.footer, [880, 672], tF],
  ]
  // lápis: segue o último traço
  const pencilAt = (() => {
    const pts = [[tRect, page.x + page.w, page.y + page.h], ...parts.map((p) => [p.t, p.x + p.w, p.y + p.h]), ...BOXES.map((b, i) => [tB[i], b.x + 420, b.y + 150])]
    let cur = null
    for (const [t, x, y] of pts) if (frame >= t) cur = { x, y, t }
    return cur
  })()
  const pencilOp = pencilAt ? win(frame, tRect, tPlant, 10) : 0
  const houseOp = fadeIn(frame, tPlant, 14)
  return (
    <AbsoluteFill>
      <div style={abs(SK.x, SK.y, { opacity: fadeIn(frame, tStart, 14) })}>
        <GridPaper w={SK.w} h={SK.h}>
          <SketchRect x={page.x} y={page.y} w={page.w} h={page.h} p={dr(tRect, 26)} sw={5} />
          {parts.map((p) => <SketchRect key={p.label} x={p.x} y={p.y} w={p.w} h={p.h} p={dr(p.t)} label={p.label} fs={30} labelOp={fadeIn(frame, p.t + 10, 10)} />)}
          {BOXES.map((b, i) => (
            <div key={b.t}>
              <SketchRect x={b.x} y={b.y} w={420} h={150} p={dr(tB[i], 14)} color={C.purple} fill={frame >= tB[i] ? 'rgba(127,119,221,0.06)' : 'transparent'} />
              <div style={abs(b.x + 18, b.y + 30, { fontFamily: HAND, fontSize: 32, color: C.purple, opacity: fadeIn(frame, tB[i] + 8, 10), lineHeight: 1.2 })}>
                {b.t}
                <div style={{ fontSize: 26, color: '#3B3670', opacity: fadeIn(frame, tN[i], 10) }}>{b.note}</div>
              </div>
            </div>
          ))}
          {/* etiquetas de código coladas nas caixas */}
          {tags.map(([name, color, [tx, ty], t], i) => {
            const p = rampF(frame, t, t + 16)
            if (p <= 0) return null
            const e = 1 - Math.pow(1 - p, 3)
            const sx = SK.w + 200
            const sy = 380
            return (
              <div key={i} style={abs(sx + (tx - sx) * e, sy + (ty - sy) * e, { transform: `rotate(${(i % 2 ? 4 : -4) * e}deg) scale(${1.3 - 0.3 * e})` })}>
                <RegTag name={name} color={color} fs={28} />
              </div>
            )
          })}
        </GridPaper>
      </div>
      {pencilOp > 0 && (
        <div style={abs(SK.x + pencilAt.x - 10, SK.y + pencilAt.y - 96, { opacity: pencilOp, transform: `rotate(${-8 + 6 * Math.sin(frame / 4)}deg)` })}>
          <svg width="100" height="100" viewBox="0 0 64 64"><g transform="rotate(45 32 32)"><rect x="27" y="4" width="10" height="40" rx="2" fill="#F2C14E" stroke={C.night} strokeWidth="2.5" /><rect x="27" y="4" width="10" height="7" fill="#E58F8F" stroke={C.night} strokeWidth="2.5" /><path d="M27 44 L32 56 L37 44 Z" fill="#F4DDB8" stroke={C.night} strokeWidth="2.5" strokeLinejoin="round" /><path d="M30.5 52 L32 56 L33.5 52 Z" fill={C.night} /></g></svg>
        </div>
      )}
      <div style={abs(1250, 60, { opacity: win(frame, tStart, tTop, 12), width: 600 })}>
        <Chip size={34} color={C.night} border={C.purple}>antes do código: um rascunho</Chip>
      </div>
      <div style={abs(1250, 60, { opacity: win(frame, tDivide, tPlant, 12), width: 600 })}>
        <Chip size={30} color={C.night} border={C.purple}>o meio em 4 partes, cada uma com o que vai dentro</Chip>
      </div>
      <div style={abs(1250, 150, { opacity: houseOp, transform: `scale(${0.8 + 0.2 * pop(frame, fps, tPlant)})`, transformOrigin: 'center top' })}>
        <House structure={rampF(frame, tPlant, tPlant + 40)} width={560} />
      </div>
      <Label x={1220} y={680} w={640} op={fadeIn(frame, tPlant + 20, 12)} dark size={34}>o rascunho é a planta da casa</Label>
      <div style={abs(1220, 770, { width: 640, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tTags, 12) })}>
        <Chip size={28} color={C.night} border={C.purpleSoft}>cada caixa já tem uma tag esperando</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
export const Esqueleto = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tEd = s('Agora, o editor')
  const tFile = s('Cria um arquivo novo')
  const tFolder = s('numa pasta só para o seu site')
  const tDoc = s('A primeira linha é o DOCTYPE')
  const tModern = s('que avisa o navegador')
  const tHtml = s('Depois, a tag html')
  const tLang = s('porque a página está em português')
  const tHB = s('Dentro dela, o head e o body')
  const tHead = s('No head vão as informações')
  const tMeta = s('Primeiro, a meta charset')
  const tTitle = s('Depois, o title')
  const tAna = s('A Ana escreve')
  const tYou = s('E você escreve o seu nome')
  const tSame = s('Repara que esse começo')
  const tSkel = s('É o esqueleto')
  const tBody = s('Daqui para frente')
  const times = {
    doctype: tDoc + 4, html: tHtml + 4, htmlC: tHtml + 16, head: tHB + 2, headC: tHB + 10, body: tHB + 20, bodyC: tHB + 28,
    meta: tMeta + 4, title: tTitle + 4,
  }
  const ed = { x: 450, y: 40, fs: 28 }
  const segs = buildSegments(4, times)
  // cartão "aula 1" piscando ao lado de cada linha logo depois de digitada
  const tagFor = { doctype: times.doctype, html: times.html, head: times.head, meta: times.meta, title: times.title, body: times.body }
  const lineIdx = { doctype: 0, html: 1, head: 2, meta: 3, title: 4, body: 6 }
  const tabMine = rampF(frame, tYou + 30, tYou + 36)
  const tabTitle = tabMine > 0 ? (
    <span><span style={{ background: '#FFF4D6', border: '2px dashed #E8B860', borderRadius: 6, padding: '0 6px', color: '#8A5A12', fontWeight: 700 }}>seu nome aqui</span>, página pessoal</span>
  ) : frame >= times.title + 24 ? SITE.title : 'index.html'
  const pTitle = edAt(ed, 4, 11)
  const bodyBox = fadeIn(frame, tBody, 12)
  return (
    <AbsoluteFill>
      {/* pasta do site com o index.html */}
      <div style={abs(40, 40, { opacity: fadeIn(frame, tEd, 12) })}>
        <FileTree width={380} height={250} fontSize={30} title="arquivos" items={[
          { id: 'site', name: 'meu-site', folder: true, depth: 0, row: 0, glow: win(frame, tFolder, tFolder + 50, 10) },
          { id: 'idx', parent: 'site', name: 'index.html', depth: 1, row: 1, opacity: fadeIn(frame, tFile + 10, 10), glow: win(frame, tFile + 10, tDoc, 10) },
        ]} />
      </div>
      <div style={abs(40, 320, { opacity: win(frame, tFile + 10, tDoc + 20, 12), width: 380 })}><Chip size={28} color={C.night} border={C.purple}>uma pasta só para o seu site</Chip></div>
      <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tEd, 12) })}>
        <EditorWindow width={880} height={520} filename="index.html">
          <CodeTyping segments={segs} fontSize={ed.fs} highlights={[
            hl('pt-BR', tLang, YEL, 0, tHB),
            hl('UTF-8', tMeta + 30, YEL, 0, tTitle),
            hl('Ana Souza', tYou + 20, YEL, 0),
          ]} />
        </EditorWindow>
      </div>
      {Object.entries(tagFor).map(([k, t]) => (
        <div key={k} style={abs(ed.x + 880 - 140, edAt(ed, lineIdx[k], 0).y - 19)}>
          <LessonTag n={1} op={win(frame, t + 6, t + 70, 8)} />
        </div>
      ))}
      <LinesBox ed={ed} l0={6} l1={7} c0={0} c1={28} op={bodyBox} color={C.purple} fill="rgba(127,119,221,0.12)" />
      {/* cursor troca "Ana Souza" pelo seu nome */}
      <div style={abs(pTitle.x + 40, pTitle.y + 6)}>
        <MouseAt frame={frame} x={0} y={0} arrive={tYou + 14} click={tYou + 22} leave={tYou + 50} from={[260, 160]} />
      </div>
      {/* prévia: a aba do navegador */}
      <div style={abs(1360, 40, { opacity: fadeIn(frame, tEd + 10, 12) })}>
        <SitePreview w={520} h={420} title={tabTitle} tabHighlight={win(frame, times.title + 24, tSame, 10) > 0.5}>
          <div />
        </SitePreview>
      </div>
      <ArrowLine x1={1600} y1={150} x2={1520} y2={98} p={rampF(frame, tAna, tAna + 14)} opacity={1 - fadeIn(frame, tSame, 8)} color={C.purple} />
      <div style={abs(1360, 160, { opacity: win(frame, tAna, tSame, 12), width: 520, display: 'flex', justifyContent: 'center' })}><Chip size={26} color={C.night} border={C.purple}>o <Tag color={C.purple}>title</Tag> vira o texto da aba</Chip></div>
      <Label x={1360} y={480} w={520} op={fadeIn(frame, tYou + 32, 12)} dark size={32}>use o seu nome</Label>
      {/* chips de explicação, embaixo do editor */}
      <div style={abs(450, 600, { opacity: win(frame, tModern, tHtml, 10) })}><Chip size={30} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>{'<!DOCTYPE html>'}</Tag>: documento HTML moderno</Chip></div>
      <div style={abs(450, 600, { opacity: win(frame, tLang, tHB, 10) })}><Chip size={30} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>lang="pt-BR"</Tag>: a página está em português</Chip></div>
      <div style={abs(450, 600, { opacity: win(frame, tHead, tMeta, 10) })}><Chip size={30} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>head</Tag>: o que não aparece no meio da página</Chip></div>
      <div style={abs(450, 600, { opacity: win(frame, tMeta + 20, tTitle, 10) })}><Chip size={30} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>UTF-8</Tag>: acentos certinhos</Chip></div>
      <div style={abs(450, 600, { opacity: win(frame, tSame, tBody, 10), display: 'flex', alignItems: 'center', gap: 16 })}>
        <Chip size={32} color={C.night} border={C.purple}>esse começo é sempre igual</Chip>
        <div style={{ opacity: fadeIn(frame, tSkel, 10) }}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>é o esqueleto</Chip></div>
      </div>
      <div style={abs(450, 600, { opacity: fadeIn(frame, tBody, 12) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>daqui para frente, tudo vai dentro do <Tag>body</Tag></Chip></div>
      <div style={abs(450, 700, { opacity: fadeIn(frame, tBody + 30, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>o <Tag color={C.purple}>body</Tag> é o que a pessoa vê na tela</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
export const Topo = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tIn = s('Dentro do body')
  const tH = s('a rédêr. Nela')
  const tH1 = s('Nela vai o agá um')
  const tAna = s('A Ana escreve')
  const tNav = s('Logo abaixo, o menu')
  const tList = s('o menu é uma lista')
  const tUl = s('uma u éle, com uma')
  const tA = s('e um link, a tag é')
  const tFour = s('São quatro links')
  const tHref = s('No href')
  const tC = [s('cerquilha sobre'), s('cerquilha projetos'), s('cerquilha rotina'), s('cerquilha contato')]
  const tNot = s('Esses ái dis ainda')
  const tText = s('E o texto de cada link')
  const tNada = s('Nada de clique aqui')
  const times = {
    hdr: tH + 2, hdrC: tH + 12, h1: tAna + 4, nav: tNav + 14, navC: tNav + 24, ul: tUl, ulC: tUl + 10,
    li1: tC[0], li2: tC[1], li3: tC[2], li4: tC[3],
  }
  const scroll = autoScroll(5, times, frame)
  const liDone = [0, 1, 2, 3].map((i) => times[`li${i + 1}`] + 20)
  const op = {
    h1: after(frame, times.h1 + 14), nav: after(frame, times.nav + 4),
    nav0: after(frame, liDone[0]), nav1: after(frame, liDone[1]), nav2: after(frame, liDone[2]), nav3: after(frame, liDone[3]),
  }
  const hdrF = fadeIn(frame, times.h1 + 18, 12)
  const navF = fadeIn(frame, times.nav + 8, 12)
  const blink = blinkOn(frame)
  const b8 = frame >= tNav + 30 && frame < tList
  const b5 = frame >= tList && frame < tHref
  const b3 = frame >= tHref && frame < tNot
  const hls = [
    ...(b8 && blink ? [hl('<header>', 0, YEL), hl('</header>', 0, YEL), hl('<nav>', 0, YEL), hl('</nav>', 0, YEL)] : []),
    ...(b5 && blink ? [hl('<ul>', 0, YEL), hl('</ul>', 0, YEL), ...[0, 1, 2, 3].map((i) => hl('<li>', 0, YEL, i))] : []),
    ...(b3 && blink ? SITE.menu.map(([id]) => hl(`href="#${id}"`, 0, PAIR)) : []),
    ...(frame >= tText ? SITE.menu.map(([, t]) => hl(`>${t}<`, tText, GREEN_HL)) : []),
  ]
  const lHdr = lineOf(5, '<header>')
  const lNav = lineOf(5, '<nav>')
  const lUl = lineOf(5, '<ul>')
  const lLi = lineOf(5, '#sobre')
  const pQ = edAt({ ...ED, scroll }, lLi, colOf(5, '#sobre') + 2)
  const qOp = fadeIn(frame, tNot, 10)
  return (
    <AbsoluteFill>
      <BuildEditor n={5} times={times} highlights={hls} scroll={scroll} />
      <LineTag line={lHdr} scroll={scroll} lesson={8} op={b8 ? 1 : 0} />
      <LineTag line={lNav} scroll={scroll} lesson={8} op={b8 ? 1 : 0} />
      <LineTag line={lUl} scroll={scroll} lesson={5} op={b5 ? 1 : 0} />
      <LineTag line={lLi} scroll={scroll} lesson={3} op={b3 ? 1 : 0} />
      {/* ponto de interrogação sobre #sobre */}
      {qOp > 0 && (
        <div style={abs(pQ.x - 26, pQ.y - 70 + 6 * Math.sin(frame / 8), { opacity: qOp, width: 56, height: 56, borderRadius: 28, background: '#FFF4D6', border: '3px solid #E8B860', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 38, fontWeight: 800, color: '#8A5A12' })}>?</div>
      )}
      <div style={abs(PV.x, PV.y, { opacity: fadeIn(frame, tIn, 12) })}>
        <SitePreview w={PV.w} h={PV.h} p={1}>
          <AnaSite fs={20} upTo={4} op={op} fr={{ header: hdrF, nav: navF }} />
        </SitePreview>
      </div>
      {/* chips */}
      <div style={abs(PV.x, 700, { opacity: win(frame, tIn, tNav, 12) })}><Chip size={30} color={C.white} bg={REG.header} border={C.night}>a primeira região: o topo, <Tag>header</Tag></Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tH1, tNav, 12) })}><Chip size={28} color={C.night} border={REG.header}><Tag color={C.purple}>h1</Tag>: o título mais importante</Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tNav, tFour, 12) })}><Chip size={30} color={C.white} bg={REG.nav} border={C.night}>o menu: <Tag>nav</Tag> com uma lista</Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tA, tFour, 12) })}><Chip size={28} color={C.night} border={REG.nav}><Tag color={C.purple}>{'ul > li > a'}</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tFour, tNot, 12) })}><Chip size={30} color={C.night} border="#F0A04B">4 links, um para cada seção do rascunho</Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tHref, tNot, 12) })}><Chip size={28} color={C.night} border="#F0A04B"><Tag color={C.purple}>href</Tag> = cerquilha + o <Tag color={C.purple}>id</Tag> da seção</Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tNot, tText, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">o <Tag color={C.purple}>id</Tag> vem já já</Chip></div>
      <div style={abs(PV.x, 700, { opacity: fadeIn(frame, tText, 12) })}><Chip size={30} color={C.night} border={C.green}>o texto do link diz para onde ele leva</Chip></div>
      <div style={abs(PV.x, 790, { opacity: fadeIn(frame, tNada, 10), display: 'flex', alignItems: 'center', gap: 14 })}>
        <Cross size={46} />
        <span style={{ position: 'relative' }}>
          <Chip size={30} color={C.night} border={C.red}>“clique aqui”</Chip>
          <span style={{ position: 'absolute', left: 10, right: 10, top: '50%', height: 4, background: C.red }} />
        </span>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 6
export const Sobre = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tMain = s('Depois do topo, abre a mêin')
  const tOne = s('Só uma por página')
  const tSec = s('a primeira sécchon')
  const tId = s('É esse ái di que faz')
  const tH2 = s('Toda sécchon tem um título')
  const tH2b = s('então vem um agá dois')
  const tP = s('Depois, um parágrafo')
  const tAna = s('A Ana escreve que trabalha')
  const tStrong = s('E que está aprendendo HTML')
  const tStrong2 = s('dentro de um strong')
  const tImg = s('Por fim, a foto')
  const tSrc = s('No src, o caminho')
  const tAlt = s('E no alt')
  const tAltTxt = s('Ana sorrindo, com um caderno')
  const times = {
    main: tMain + 14, sec: tSec + 4, secC: tSec + 18, h2: tH2b + 4, p: tAna + 4, strong: tStrong + 4, img: tImg + 18, alt: tAlt + 4,
  }
  const scroll = autoScroll(6, times, frame)
  const op = {
    main: after(frame, times.main + 4), s1: after(frame, times.sec + 6), s1h2: after(frame, times.h2 + 12), s1p: after(frame, times.strong + 22), s1img: after(frame, times.img + 16),
  }
  const blink = blinkOn(frame)
  const b2 = frame >= tStrong2 && frame < tImg
  const b4 = frame >= tAlt + 10
  const hls = [
    hl('<main>', times.main + 6, tint(REG.main, 0.5)),
    hl('id="sobre"', tId, YEL),
    ...(b2 && blink ? [hl('<strong>', 0, YEL), hl('</strong>', 0, YEL)] : []),
    hl('src="imagens/foto-ana.jpg"', tSrc, PAIR, 0, tAlt),
    ...(b4 && blink ? [hl('alt=', 0, YEL)] : []),
  ]
  const lSec = lineOf(6, 'id="sobre"')
  const lStrong = lineOf(6, '<strong>')
  const lAlt = lineOf(6, 'alt=')
  const pId = edAt({ ...ED, scroll }, lSec, colOf(6, 'id="sobre"') + 10)
  return (
    <AbsoluteFill>
      <BuildEditor n={6} times={times} highlights={hls} scroll={scroll} />
      <LineTag line={lStrong} scroll={scroll} lesson={2} op={b2 ? 1 : 0} />
      <LineTag line={lAlt} scroll={scroll} lesson={4} op={b4 ? 1 : 0} />
      <div style={abs(PV.x, PV.y)}>
        <SitePreview w={PV.w} h={PV.h} p={1}>
          <AnaSite fs={20} upTo={5} op={op} fr={{ header: 1, nav: 1, main: fadeIn(frame, times.main + 6, 12), s1: fadeIn(frame, times.sec + 6, 12) }} linkHl={frame >= tId + 10 && frame < tH2 + 20 ? 0 : -1} strongHl={b2 && blink ? 1 : 0} />
        </SitePreview>
      </div>
      {/* id="sobre" liga ao primeiro link do menu */}
      <ArrowLine x1={pId.x + 10} y1={pId.y - 14} x2={PV.x + 150} y2={PV.y + 210} p={rampF(frame, tId + 4, tId + 22)} opacity={1 - fadeIn(frame, tH2 + 20, 8)} bend={-90} color="#F0A04B" width={6} />
      <div style={abs(PV.x, 700, { opacity: win(frame, tMain, tSec, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
        <Chip size={30} color={C.white} bg={REG.main} border={C.night}><Tag>main</Tag>: o conteúdo principal</Chip>
        <div style={{ opacity: fadeIn(frame, tOne, 10) }}><Chip size={28} color={C.night} border={REG.main}>só uma por página</Chip></div>
      </div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tSec, tH2, 12) })}><Chip size={30} color={C.night} border="#F0A04B"><Tag color={C.purple}>id="sobre"</Tag> faz o link <b>Sobre mim</b> funcionar</Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tH2, tStrong2, 12) })}><Chip size={30} color={C.night} border={REG.section}>toda <Tag color={C.purple}>section</Tag> tem um título: <Tag color={C.purple}>h2</Tag></Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tP, tStrong2, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>um parágrafo contando quem você é</Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tStrong2, tImg, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860"><Tag color={C.purple}>strong</Tag>: HTML é importante</Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tImg, tAlt, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>a foto: <Tag color={C.purple}>img</Tag> com o caminho no <Tag color={C.purple}>src</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: fadeIn(frame, tAlt + 10, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860"><Tag color={C.purple}>alt</Tag>: descreve a imagem</Chip></div>
      <div style={abs(PV.x, 790, { opacity: fadeIn(frame, tAltTxt, 12) })}><Chip size={26} color={C.night} border={C.purpleSoft}>para quem não consegue ver a foto</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
export const Projetos = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSec = s('A segunda sécchon')
  const tH2 = s('com ái di igual a projetos')
  const tTwo = s('Aqui, a Ana junta')
  const tUl = s('Ela cria uma u éle')
  const tFirst = s('O primeiro leva')
  const tRel = s('Então, o href é um caminho relativo')
  const tSecond = s('O segundo leva')
  const tAbs = s('Esse usa o caminho absoluto')
  const tExt = s('E, como é um site externo')
  const tTarget = s('a Ana coloca o target')
  const tRelNo = s('junto com o rel noopener')
  const tSame = s('Os links do seu próprio site')
  const times = {
    sec: tSec + 4, secC: tSec + 18, h2: tH2 + 10, ul: tUl + 4, ulC: tUl + 12, li1: tFirst + 10, li2: tSecond + 10, tgt: tTarget + 8, li2b: tTarget + 30,
  }
  const scroll = autoScroll(7, times, frame)
  const op = {
    s2: after(frame, times.sec + 6), s2h2: after(frame, times.h2 + 12), s2l0: after(frame, times.li1 + 34), s2l1: after(frame, times.li2b + 18),
  }
  const blink = blinkOn(frame)
  const b3 = frame >= tTarget + 24 && frame < tSame
  const hls = [
    hl('href="paginas/projetos.html"', tRel, YEL),
    hl('href="https://receitas.example.com"', tAbs, PAIR),
    ...(b3 && blink ? [hl('target="_blank"', 0, YEL), hl('rel="noopener"', 0, YEL)] : []),
  ]
  const lRel = lineOf(7, 'paginas/projetos.html')
  const lAbs = lineOf(7, 'receitas.example.com')
  const lTgt = lineOf(7, 'target=')
  const sc = { ...ED, scroll }
  const pRel = edAt(sc, lRel, 46)
  const pAbs = edAt(sc, lAbs, 53)
  const relOp = fadeIn(frame, tRel, 12)
  const absOp = fadeIn(frame, tAbs, 12)
  const inView = (l) => l - scroll >= 0 && l - scroll < VIS
  return (
    <AbsoluteFill>
      <BuildEditor n={7} times={times} highlights={hls} scroll={scroll} />
      <LineTag line={lTgt} scroll={scroll} lesson={3} op={b3 ? 1 : 0} dx={-40} />
      {inView(lRel) && <div style={abs(pRel.x + 10, pRel.y - 22, { opacity: relOp })}><Chip size={24} color={C.night} bg="#FFF4D6" border="#E8B860">caminho relativo</Chip></div>}
      {inView(lAbs) && <div style={abs(pAbs.x + 10, pAbs.y - 22, { opacity: absOp })}><Chip size={24} color={C.night} bg="#FFE6CC" border="#F0A04B">caminho absoluto</Chip></div>}
      <div style={abs(PV.x, PV.y)}>
        <SitePreview w={PV.w} h={PV.h} p={1}>
          <AnaSite fs={20} upTo={6} op={op} fr={{ header: 1, nav: 1, main: 1, s1: 1, s2: fadeIn(frame, times.sec + 6, 12) }} />
        </SitePreview>
      </div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tSec, tTwo, 12) })}><Chip size={30} color={C.night} border={REG.section}>2ª <Tag color={C.purple}>section</Tag>: <Tag color={C.purple}>id="projetos"</Tag> + <Tag color={C.purple}>h2</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tTwo, tFirst, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>duas coisas que você já sabe: lista + links</Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tFirst, tSecond, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">dentro do próprio site: caminho relativo</Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tRel + 20, tSecond, 12) })}><Chip size={26} color={C.night} border={C.purpleSoft}>pasta <Tag color={C.purple}>paginas</Tag> → <Tag color={C.purple}>projetos.html</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tSecond, tExt, 12) })}><Chip size={30} color={C.night} bg="#FFE6CC" border="#F0A04B">site de fora: caminho absoluto, com <Tag color={C.purple}>https</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: fadeIn(frame, tExt, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">site externo: aba nova (<Tag color={C.purple}>_blank</Tag>) + <Tag color={C.purple}>noopener</Tag></Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tRelNo, tSame, 12) })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>aba nova, com moderação</Chip></div>
      <div style={abs(PV.x, 790, { opacity: fadeIn(frame, tSame, 12), display: 'flex', alignItems: 'center', gap: 12 })}>
        <Check size={44} />
        <Chip size={26} color={C.night} border={C.green}>links do seu site: mesma aba</Chip>
      </div>
    </AbsoluteFill>
  )
}
