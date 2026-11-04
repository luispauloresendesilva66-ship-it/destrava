import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { Background } from '../../components/Background.jsx'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { Check, Chip, Confetti, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { House } from '../../components/Diagram.jsx'
import { Label, MouseAt, YEL, abs, edAt, rampF, win } from '../n1-a08/scenes-a.jsx'
import {
  APP, AnaSite, AppButton, AppFrame, BranchIcon, Certificate, Clipboard, FloppyIcon, FolderWindow, Flag, LevelMap, Palette, Phone, REG, SitePreview,
  Seal, Tag, fileLines, lineOf, tint,
} from './ana.jsx'

const pop = (frame, fps, t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })
const PAIR = 'rgba(240,160,75,0.6)'

// ---------------------------------------------------------------- Bloco 11
const ITEMS = [
  <>Um <Tag color={C.purple}>{'<h1>'}</Tag> só</>,
  <>Toda <Tag color={C.purple}>{'<img>'}</Tag> tem <Tag color={C.purple}>alt</Tag></>,
  <>Todo <Tag color={C.purple}>for</Tag> igual ao <Tag color={C.purple}>id</Tag> do campo</>,
  <>Toda tag aberta foi fechada<br /><span style={{ fontSize: 24, color: '#5F5A86' }}>(menos <Tag color={C.purple}>{'<img>'}</Tag> e <Tag color={C.purple}>{'<input>'}</Tag>)</span></>,
  <>Indentação em ordem</>,
  <>Testei no navegador</>,
]
export const Checklist = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tStart = s('Página pronta?')
  const tPro = s('Quem trabalha com desenvolvimento')
  const tI = [s('Um: a página'), s('Dois: toda imagem'), s('Três: toda lêibol'), s('Quatro: toda tag'), s('Cinco: a indentação'), s('E seis: abre o arquivo')]
  const tLabelClick = s('Clica no texto de cada rótulo')
  const tLinks = s('Clica em cada link do menu')
  const tAll = s('Marcou os seis')
  const done = tI.map((t, i) => pop(frame, fps, (tI[i + 1] || tAll) - 12))
  const active = tI.reduce((a, t, i) => (frame >= t ? i : a), -1)
  const fs = 20
  const lh = fs * 1.5
  const ed = { x: 880, y: 30, fs }
  const code = fileLines(10).join('\n')
  const L = (sub, o) => lineOf(10, sub, o)
  const scroll = interpolate(frame, [tI[1] - 10, tI[1] + 6, tI[2] - 10, tI[2] + 6, tI[4] - 10, tI[4] + 6], [0, L('<img') - 8, L('<img') - 8, L('<form>') - 8, L('<form>') - 8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const sc = { ...ed, scroll }
  const in1 = frame >= tI[0] && frame < tI[1]
  const in2 = frame >= tI[1] && frame < tI[2]
  const in3 = frame >= tI[2] && frame < tI[3]
  const in4 = frame >= tI[3] && frame < tI[4]
  const in5 = frame >= tI[4] && frame < tI[5]
  const H2C = 'rgba(127,119,221,0.45)'
  const hls = [
    ...(in1 ? [{ text: '<h1>Olá, eu sou a Ana</h1>', at: 0, color: YEL }, ...[0, 1, 2, 3].map((o) => ({ text: '<h2>', at: tI[0] + 30, color: H2C, occurrence: o }))] : []),
    ...(in2 ? [{ text: 'alt="Ana sorrindo, com um caderno de anotações na mão"', at: tI[1] + 10, color: YEL }] : []),
    ...(in3 ? [['nome', PAIR], ['email', 'rgba(91,141,239,0.5)'], ['mensagem', 'rgba(151,196,89,0.55)']].flatMap(([v, c]) => [{ text: `for="${v}"`, at: tI[2] + 10, color: c }, { text: `id="${v}"`, at: tI[2] + 10, color: c }]) : []),
    ...(in4 ? [{ text: '<img', at: tI[3] + 30, color: 'rgba(154,151,184,0.6)' }, ...[0, 1, 2].map((o) => ({ text: '<input', at: tI[3] + 30, color: 'rgba(154,151,184,0.6)', occurrence: o }))] : []),
  ]
  const pairs = [['<section id="contato">', '</section>', 3, '#F0A04B'], ['<form>', '</form>', 0, REG.nav]]
  const edOp = 1 - rampF(frame, tI[5], tI[5] + 12)
  const B = rampF(frame, tI[5], tI[5] + 12)
  const dbl = tI[5] + 24
  const clicks = [0, 1, 2, 3].map((i) => tLinks + 12 + i * 22)
  const cur = clicks.reduce((a, t, i) => (frame >= t ? i : a), -1)
  const pPrev = cur < 0 ? 0 : [0.15, 0.35, 0.55, 1][cur]
  const flash = cur >= 0 ? { [`s${cur + 1}`]: clamp01(1 - (frame - clicks[cur]) / 20) } : {}
  return (
    <AbsoluteFill>
      <div style={abs(50, 90, { opacity: fadeIn(frame, tStart, 12) })}>
        <Clipboard w={790} items={ITEMS} done={done} active={active} fs={30} />
      </div>
      <div style={abs(50, 20, { opacity: win(frame, tPro, tI[0], 12) })}><Chip size={26} color={C.night} border={C.purpleSoft}>quem desenvolve revisa o próprio código</Chip></div>
      <Label x={50} y={760} w={790} op={fadeIn(frame, tAll, 12)} dark size={36}>6 de 6, página revisada</Label>
      {edOp > 0 && (
        <div style={abs(ed.x, ed.y, { opacity: edOp * fadeIn(frame, tStart + 6, 12) })}>
          <EditorWindow width={1000} height={840} filename="index.html">
            <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'relative', transform: `translateY(${-scroll * lh}px)` }}>
                {in5 && fileLines(10).map((ln, i) => {
                  const n = ln.length - ln.trimStart().length
                  if (!n) return null
                  return <div key={i} style={{ position: 'absolute', left: fs * 1.8, top: i * lh + 3, width: n * fs * 0.55 - 2, height: lh - 6, background: '#E8B860', opacity: 0.5 * fadeIn(frame, tI[4] + 10, 10), borderRadius: 4 }} />
                })}
                <div style={{ position: 'relative' }}><CodeTyping segments={[{ text: code, start: 0, frames: 0 }]} fontSize={fs} cursor={false} highlights={hls} /></div>
              </div>
            </div>
          </EditorWindow>
        </div>
      )}
      {edOp > 0 && in4 && pairs.map(([o, c, occ, color], i) => {
        const l0 = lineOf(10, o, occ === 3 ? 0 : 0)
        let l1 = -1
        const ls = fileLines(10)
        for (let k = l0 + 1; k < ls.length; k++) if (ls[k].includes(c) && ls[k].length - ls[k].trimStart().length === ls[l0].length - ls[l0].trimStart().length) { l1 = k; break }
        const col = ls[l0].length - ls[l0].trimStart().length
        const a = edAt(sc, l0, col)
        const b = edAt(sc, l1, col)
        return <ArrowLine key={i} x1={a.x - 4} y1={a.y} x2={b.x - 4} y2={b.y} p={rampF(frame, tI[3] + 10 + i * 10, tI[3] + 28 + i * 10)} bend={40 + i * 12} color={color} width={5} />
      })}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(900, 40, { opacity: 1 - rampF(frame, dbl + 20, dbl + 30) })}>
            <FolderWindow w={520} rows={[{ name: 'index.html', hl: frame >= dbl ? 1 : 0 }, { name: 'imagens', folder: true }, { name: 'paginas', folder: true }]} />
            <div style={abs(250, 110)}><MouseAt frame={frame} x={0} y={0} arrive={dbl - 4} click={dbl} leave={dbl + 20} from={[200, 120]} /></div>
          </div>
          <div style={abs(900, 40, { opacity: rampF(frame, dbl + 20, dbl + 32) })}>
            <SitePreview w={980} h={800} p={pPrev}>
              <AnaSite fs={20} upTo={10} flash={flash} linkHl={cur} />
            </SitePreview>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 12
export const Salvar = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tSave = s('Revisou? Agora, salva')
  const tLose = s('Parece óbvio')
  const tFile = s('Salva o arquivo no editor')
  const tCheck = s('confere se a pasta')
  const tIdx = s('o index ponto html, a')
  const tImg = s('a pasta imagens')
  const tPag = s('e a pasta paginas')
  const tCopy = s('Depois, faz uma cópia')
  const tName = s('e dá um nome')
  const tV1 = s('como meu site, versão um')
  const tBreak = s('Assim, se amanhã')
  const tKept = s('a versão que funcionava está guardada')
  const tIdea = s('Essa é a ideia')
  const tCommit = s('o primeiro commit é')
  const tGit = s('E, num próximo nível')
  const A = 1 - rampF(frame, tBreak - 6, tBreak + 8)
  const B = rampF(frame, tBreak - 6, tBreak + 8)
  const saved = pop(frame, fps, tFile + 14)
  const copy = rampF(frame, tCopy + 10, tCopy + 40)
  const rows = (chk) => [
    { name: 'index.html', check: chk ? pop(frame, fps, tIdx) : 0 },
    { name: 'imagens', folder: true, check: chk ? pop(frame, fps, tImg + 6) : 0 },
    { name: 'foto-ana.jpg', depth: 1, check: chk ? pop(frame, fps, tImg + 14) : 0 },
    { name: 'paginas', folder: true, check: chk ? pop(frame, fps, tPag + 6) : 0 },
    { name: 'projetos.html', depth: 1, check: chk ? pop(frame, fps, tPag + 14) : 0 },
  ]
  const v1 = frame >= tV1 + 10
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(60, 150, { opacity: fadeIn(frame, tSave, 12) * (1 - rampF(frame, tCopy, tCopy + 12)) })}>
            <EditorWindow width={760} height={330} filename={frame >= tFile + 14 ? 'index.html' : 'index.html ●'}>
              <CodeTyping segments={[{ text: fileLines(10).slice(0, 8).join('\n'), start: 0, frames: 0 }]} fontSize={24} cursor={false} />
            </EditorWindow>
            <div style={abs(0, 350, { display: 'flex', alignItems: 'center', gap: 12, opacity: fadeIn(frame, tFile, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tFile)})` })}>
              {['Ctrl', 'S'].map((k) => <span key={k} style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, background: C.white, border: `3px solid ${C.night}`, borderBottomWidth: 7, borderRadius: 10, padding: '4px 16px', color: C.night }}>{k}</span>)}
            </div>
            <div style={abs(230, 340, { display: 'flex', alignItems: 'center', gap: 10, opacity: clamp01(saved * 2) })}><FloppyIcon size={80} /><Check size={60} /></div>
          </div>
          <div style={abs(60, 640, { opacity: win(frame, tLose, tCheck, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">muita gente perde trabalho por esquecer de salvar</Chip></div>
          <div style={abs(960, 150, { opacity: fadeIn(frame, tCheck - 10, 12), transform: `translateX(${-500 * copy}px)` })}>
            <FolderWindow w={620} title="meu-site" rows={rows(true)} />
          </div>
          {copy > 0 && (
            <div style={abs(460 + 660 * copy, 150 - 60 * Math.sin(Math.PI * copy), { opacity: clamp01(copy * 3) })}>
              <FolderWindow w={620} title={v1 ? 'meu-site-v1' : 'meu-site - cópia'} rows={rows(false)} glow={v1 ? fadeIn(frame, tV1 + 10, 10) : 0} />
              <div style={abs(330, -30, { opacity: fadeIn(frame, tV1 + 16, 10) })}><Chip style={{ whiteSpace: 'nowrap' }} size={28} color={C.white} bg={C.purple} border={C.night}>primeira versão</Chip></div>
            </div>
          )}
          <Label x={60} y={640} w={1800} op={fadeIn(frame, tName, 12)} size={32} border={C.purple}>uma cópia da pasta inteira, com um nome que diz que é a primeira versão</Label>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 40, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 48, fontWeight: 700, color: C.night })}>Se algo quebrar...</div>
          {/* linha do tempo v1 -> v2 */}
          <div style={abs(360, 250, { width: 900, height: 8, borderRadius: 4, background: C.purpleSoft })} />
          {[['v1', 300, tBreak, true], ['v2', 1160, tBreak + 30, false]].map(([v, x, t, ok]) => (
            <div key={v} style={abs(x, 160, { opacity: fadeIn(frame, t, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, t)})` })}>
              <div style={{ width: 200, height: 190, borderRadius: 24, background: C.white, border: `5px solid ${ok ? C.green : C.red}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 14px 30px rgba(38,33,92,0.18)' }}>
                <div style={{ fontFamily: MONO, fontSize: 54, fontWeight: 800, color: C.night }}>{v}</div>
                {ok ? <Check size={56} /> : <Cross size={56} />}
              </div>
              <div style={{ textAlign: 'center', marginTop: 12, fontFamily: FONT, fontSize: 28, fontWeight: 700, color: ok ? C.night : C.red }}>{ok ? 'guardada' : 'quebrou'}</div>
            </div>
          ))}
          <ArrowLine x1={1150} y1={330} x2={520} y2={330} p={rampF(frame, tKept - 10, tKept + 10)} bend={-120} color={C.purple} width={8} />
          <Label x={360} y={480} w={1000} op={fadeIn(frame, tKept, 12)} dark size={36}>a versão que funcionava está salva</Label>
          <div style={abs(0, 600, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tIdea, 12) })}>
            <Chip size={34} color={C.night} border={C.purple}><b>Primeiro Commit</b>{frame >= tCommit ? ' = o primeiro registro de um trabalho que funciona' : ''}</Chip>
          </div>
          <div style={abs(1440, 720, { opacity: fadeIn(frame, tGit, 12), display: 'flex', alignItems: 'center', gap: 14, background: C.white, border: `3px solid ${C.purpleSoft}`, borderRadius: 18, padding: '12px 22px' })}>
            <BranchIcon size={60} />
            <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.night }}>Git: num próximo nível</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

export { Prova, Final } from './scenes-d.jsx'
