import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { FileTree, treeGeom } from '../../components/FileTree.jsx'
import { Loupe, SearchIcon, SpeakerIcon } from '../../components/Icons.jsx'
import { Label, abs, rampF, win } from '../n1-a03/scenes-a.jsx'
import { spanAt } from '../n1-a03/ana.jsx'
import {
  ALT_ANA, IMG_FOTO, IMG_FOTO_ALT, TXT, AvatarAna, BrokenIcon, BrokenImg, CodeCard, Enfeite, FileCard, IndexPreview, LinkSpan,
  Phone, ProjetosPreview, ReceitasThumb, Ruler, Slot, SpeechBubble, cardSpan,
} from './ana.jsx'

export { Label, abs, rampF, win }

// Resumo fixo "pasta/ entra · ../ sobe" (da Aula 3).
export const PathRule = ({ op = 1, size = 40 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 22, background: C.night, color: C.lavender, borderRadius: 22, padding: '14px 34px', fontFamily: FONT, fontSize: size, fontWeight: 600, boxShadow: '0 18px 40px rgba(27,23,68,0.35)', opacity: op }}>
    <span><span style={{ fontFamily: MONO, color: '#FFD28A' }}>pasta/</span> entra</span>
    <span style={{ color: C.purpleSoft }}>·</span>
    <span><span style={{ fontFamily: MONO, color: '#FFD28A' }}>../</span> sobe</span>
  </div>
)

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Na aula passada')
  const tSteps = s('Chegou a hora')
  const tPages = s('Uma página só com texto')
  const tSlot = s('mas uma imagem bem colocada')
  const tFoto = s('Hoje a Ana vai ganhar')
  const tThumb = s('e uma miniatura')
  const tLabel = s('Você vai aprender')
  const logoBig = 1 - rampF(frame, tTitle - 6, tTitle + 8)
  const logoSmall = rampF(frame, tTitle, tTitle + 14)
  const heights = [220, 270, 320, 370, 420]
  const pA = fadeIn(frame, tPages, 16)
  const pB = fadeIn(frame, tFoto + 10, 16)
  const slotA = fadeIn(frame, tSlot, 12)
  const fillA = rampF(frame, tFoto + 4, tFoto + 22)
  const slotB = fadeIn(frame, tFoto + 26, 12)
  const fillB = rampF(frame, tThumb + 4, tThumb + 22)
  const A = { x: 990, y: 250, w: 440, h: 520 }
  const B = { x: 1450, y: 250, w: 440, h: 520 }
  return (
    <AbsoluteFill>
      <div style={abs(0, 0, { width: 1920, height: 880, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: logoBig })}>
        <LogoReveal start={4} height={300} />
      </div>
      <div style={abs(70, 50, { opacity: logoSmall, display: 'flex', alignItems: 'center', gap: 18 })}>
        <LogoMark height={64} keyColor={C.green} />
        <Wordmark size={52} />
      </div>
      <div style={abs(0, interpolate(frame, [tSteps - 8, tSteps + 14], [380, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), { width: 1920 })}>
        <Title start={tTitle} size={92}>Aula 4 — Imagens</Title>
      </div>
      {/* 5 degraus, o primeiro aceso */}
      <div style={abs(70, 810 - 420, { width: 860, height: 420, display: 'flex', alignItems: 'flex-end', gap: 12 })}>
        {block.levels.map((name, i) => {
          const at = tSteps + 4 + i * 9
          const p = spring({ frame: frame - at, fps, config: { damping: 16, stiffness: 120 } })
          const on = i === 0 ? rampF(frame, tSteps + 50, tSteps + 60) : 0
          return (
            <div key={name} style={{ flex: 1, height: heights[i] * clamp01(p), opacity: clamp01(p * 2), background: on > 0 ? C.purple : '#D8D5F6', border: `4px solid ${on > 0 ? C.night : C.purpleSoft}`, borderRadius: '16px 16px 0 0', boxShadow: on > 0 ? `0 0 ${50 * on}px ${C.purpleSoft}` : 'none', fontFamily: FONT, color: on > 0 ? C.white : C.night, fontSize: 28, fontWeight: 600, textAlign: 'center', padding: '14px 6px', overflow: 'hidden' }}>
              <div style={{ fontSize: 50, opacity: 0.9, marginBottom: 4 }}>{i + 1}</div>
              {name}
            </div>
          )
        })}
      </div>
      {/* Sobre mim: só texto e links -> ganha o avatar */}
      <div style={abs(A.x, A.y, { opacity: pA, transform: `translateY(${(1 - pA) * 30}px)` })}>
        <BrowserMock width={A.w} height={A.h} tabTitle="Sobre mim" url="index.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            <div style={{ fontSize: 31, fontWeight: 700 }}>{TXT.h1}</div>
            <Slot width={150} height={150} fill={fillA} style={{ marginTop: 14, opacity: slotA }}>
              <AvatarAna size={150} />
            </Slot>
            <div style={{ fontSize: 20, lineHeight: 1.4, marginTop: 14 }}>Veja as <LinkSpan>minhas receitas favoritas</LinkSpan>.</div>
            <div style={{ fontSize: 20, lineHeight: 1.4, marginTop: 10 }}>Conheça os <LinkSpan>meus projetos</LinkSpan>.</div>
          </div>
        </BrowserMock>
      </div>
      {/* Projetos: ganha a miniatura com legenda */}
      <div style={abs(B.x, B.y, { opacity: pB, transform: `translateY(${(1 - pB) * 30}px)` })}>
        <BrowserMock width={B.w} height={B.h} tabTitle="Projetos" url="paginas/projetos.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            <div style={{ fontSize: 31, fontWeight: 700 }}>Meus projetos</div>
            <div style={{ fontSize: 18, marginTop: 8 }}><LinkSpan>Voltar para a página inicial</LinkSpan></div>
            <Slot width={340} height={191} fill={fillB} style={{ marginTop: 16, opacity: slotB }}>
              <ReceitasThumb width={340} />
            </Slot>
            <div style={{ fontSize: 18, marginTop: 10, color: '#333', opacity: fadeIn(frame, tThumb + 24, 12) }}>Meu primeiro projeto: um site de receitas</div>
          </div>
        </BrowserMock>
      </div>
      <Label x={A.x} y={800} w={B.x + B.w - A.x} op={fadeIn(frame, tLabel, 14)} dark size={36}>o que a gente vai construir hoje</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const TagImg = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tImg = s('A imagem é a tag img')
  const tNoClose = s('ela não tem fechamento')
  const tP = s('o parágrafo tem um texto dentro')
  const tA = s('e o link tem as palavras')
  const tEmpty = s('Mas a imagem não envolve')
  const tVazia = s('Por isso, a gente chama')
  const tNoBar = s('sem nenhuma barra img')
  const tBr = s('Lembra do br')
  const tSrc = s('a imagem precisa do src')
  const tSource = s('que vem de source')
  const fs = 40
  const T1 = '<p>texto</p>'
  const T2 = '<a href="...">texto</a>'
  const T3 = '<img src="...">'
  const cw = fs * 0.55
  const wOf = (t) => t.length * cw + 58
  const gap = 50
  const total = wOf(T1) + wOf(T2) + wOf(T3) + wOf('</img>') + gap * 2 + 30
  const x1 = Math.round((1920 - total) / 2)
  const c1 = { x: x1, y: 320, fs }
  const c2 = { x: x1 + wOf(T1) + gap, y: 320, fs }
  const c3 = { x: c2.x + wOf(T2) + gap, y: 320, fs }
  const c4 = { x: c3.x + wOf(T3) + 30, y: 320, fs }
  const content = 'rgba(255,210,138,0.45)'
  const sHref = cardSpan(c2, 0, T2, 'href="..."')
  const sSrc = cardSpan(c3, 0, T3, 'src="..."')
  const bridge = rampF(frame, tSrc + 16, tSrc + 40)
  const closeOp = win(frame, tNoBar, tBr, 10)
  return (
    <AbsoluteFill>
      <div style={abs(0, 150, { width: 1920, textAlign: 'center', opacity: win(frame, tImg, tSrc, 12) })}>
        <Chip size={46} color={C.white} bg={C.purple} border={C.night}><span style={{ fontFamily: MONO }}>img</span> = image = imagem</Chip>
      </div>
      <CodeCard x={c1.x} y={c1.y} fs={fs} text={T1} op={fadeIn(frame, tNoClose, 12)} highlights={[{ text: 'texto', at: tP, color: content }]} glow={win(frame, tP, tA, 8)} />
      <CodeCard x={c2.x} y={c2.y} fs={fs} text={T2} op={fadeIn(frame, tNoClose + 8, 12)} highlights={[{ text: 'texto', at: tA, color: content }, { text: 'href="..."', at: tSrc + 16, color: 'rgba(127,119,221,0.6)' }]} glow={win(frame, tA, tEmpty, 8)} />
      <CodeCard x={c3.x} y={c3.y} fs={fs} text={T3} op={fadeIn(frame, tImg + 6, 12)} highlights={[{ text: 'src="..."', at: tSrc, color: 'rgba(127,119,221,0.6)' }]} glow={win(frame, tEmpty, tNoBar, 8)} />
      {/* </img> aparece, leva um "x" e some */}
      <div style={{ opacity: closeOp }}>
        <CodeCard x={c4.x} y={c4.y} fs={fs} text="</img>" />
        <div style={abs(c4.x + wOf('</img>') - 40, c4.y - 34, { opacity: fadeIn(frame, tNoBar + 10, 8) })}><Cross size={64} /></div>
      </div>
      <Label x={c1.x - 20} y={460} w={c2.x + wOf(T2) - c1.x + 40} op={fadeIn(frame, tA + 20, 12)} size={32}>tem conteúdo dentro</Label>
      <ArrowLine x1={cardSpan(c1, 0, T1, 'texto').x + 60} y1={462} x2={cardSpan(c1, 0, T1, 'texto').x} y2={cardSpan(c1, 0, T1, 'texto').bottom + 6} p={fadeIn(frame, tA + 20, 12)} bend={-20} width={5} />
      <ArrowLine x1={cardSpan(c2, 0, T2, 'texto').x - 60} y1={462} x2={cardSpan(c2, 0, T2, 'texto').x} y2={cardSpan(c2, 0, T2, 'texto').bottom + 6} p={fadeIn(frame, tA + 20, 12)} bend={20} width={5} />
      <Label x={c3.x - 60} y={460} w={wOf(T3) + 120} op={win(frame, tVazia, tSrc, 12)} dark size={32}>tag vazia: sem fechamento</Label>
      <Label x={sSrc.x - 360} y={470} w={720} op={fadeIn(frame, tSource, 12)} dark size={32}>source = fonte: qual arquivo mostrar</Label>
      <ArrowLine x1={sSrc.x} y1={468} x2={sSrc.x} y2={sSrc.bottom + 8} p={fadeIn(frame, tSource, 12)} width={6} />
      {/* <br>: mesma ideia */}
      <CodeCard x={c1.x} y={600} fs={fs} text="<br>" op={fadeIn(frame, tBr, 12)} />
      <div style={abs(c1.x + wOf('<br>') + 26, 616, { opacity: fadeIn(frame, tBr + 12, 12) })}>
        <Chip size={34} color={C.night} border={C.purple}>quebra de linha: também é tag vazia — mesma ideia</Chip>
      </div>
      {/* href -> src */}
      <ArrowLine x1={sHref.x} y1={sHref.top - 4} x2={sSrc.x} y2={sSrc.top - 4} p={bridge} bend={-170} width={6} />
      <div style={abs(0, 150, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tSrc + 34, 12) })}>
        <Chip size={40} color={C.night} border={C.purple}>cada um com o seu endereço</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
export const PastaImagens = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tOrg = s('Antes de escrever o src')
  const tPag = s('Lembra da pasta paginas')
  const tCreate = s('Agora ela cria')
  const tFoto = s('foto traço ana')
  const tProj = s('e projeto traço receitas')
  const tIndex = s('No index, logo abaixo')
  const tSrc = s('com o src igual a imagens')
  const tRel = s('É um caminho relativo')
  const tProjPage = s('E na página de projetos')
  const tAbove = s('De lá, a pasta imagens')
  const tDots = s('Então o caminho começa')
  const tRule = s('Mesma regra')
  const fsT = 32
  const rowH = 62
  const g = treeGeom({ fontSize: fsT, rowH })
  const T = { x: 50, y: 40 }
  const shift = rampF(frame, tCreate - 8, tCreate + 6)
  const pulse = (a, b) => (frame >= a && frame < b ? 0.5 + 0.5 * Math.sin((frame - a) / 5) : 0)
  const phase2 = frame >= tProjPage
  const items = [
    { id: 'root', name: 'site-da-ana/', folder: true, depth: 0, row: 0, hl: phase2 && frame >= tAbove ? rampF(frame, tAbove + 10, tAbove + 20) * (1 - rampF(frame, tDots + 30, tDots + 40)) : 0 },
    { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'root', hl: frame >= tIndex && !phase2 ? 1 : 0 },
    { id: 'img', name: 'imagens/', folder: true, depth: 1, row: 2, parent: 'root', opacity: fadeIn(frame, tCreate, 12), glow: pulse(tCreate, tFoto) },
    { id: 'foto', name: 'foto-ana.jpg', depth: 2, row: 3, parent: 'img', opacity: fadeIn(frame, tFoto, 12), hl: !phase2 && frame >= tSrc ? 1 : 0 },
    { id: 'rec', name: 'projeto-receitas.png', depth: 2, row: 4, parent: 'img', opacity: fadeIn(frame, tProj, 12), hl: phase2 && frame >= tDots ? 1 : 0 },
    { id: 'pag', name: 'paginas/', folder: true, depth: 1, row: 2 + 3 * shift, parent: 'root', glow: pulse(tPag, tCreate) },
    { id: 'proj', name: 'projetos.html', depth: 2, row: 3 + 3 * shift, parent: 'pag', hl: phase2 ? 1 : 0 },
  ]
  const Y = (r) => T.y + g.y(r)
  const thumbX = (name) => T.x + g.textEnd(2, name) + 18
  // setas na árvore
  const inP = win(frame, tRel, tProjPage, 12)
  const up = rampF(frame, tAbove + 6, tAbove + 30)
  const down = rampF(frame, tDots + 10, tDots + 34)
  const ax = T.x + 640
  // lado direito
  const show = win(frame, tFoto - 10, tIndex, 14)
  const ed = { x: 740, y: 40, fs: 32 }
  const edP = rampF(frame, tIndex, tIndex + 14)
  const typeF = Math.max(40, Math.min(80, tRel - tSrc - 10))
  const typed1 = tSrc + 6 + typeF
  const typeF2 = Math.max(40, Math.min(80, tRule - tDots - 10))
  const typed2 = tDots + 6 + typeF2
  const segs1 = [
    { text: `  <h1>${TXT.h1}</h1>\n`, start: 0, frames: 0 },
    { text: '  ' + IMG_FOTO, start: tSrc + 6, frames: typeF },
  ]
  const segs2 = [
    { text: '  <h1>Meus projetos</h1>\n', start: 0, frames: 0 },
    { text: '  <img src="../imagens/projeto-receitas.png">', start: tDots + 6, frames: typeF2 },
  ]
  const bigImg = phase2 ? fadeIn(frame, typed2, 12) : fadeIn(frame, typed1, 12)
  return (
    <AbsoluteFill>
      <div style={abs(T.x, T.y, { opacity: fadeIn(frame, tOrg, 12) })}>
        <FileTree items={items} fontSize={fsT} rowH={rowH} width={660} height={520}>
          <div style={abs(thumbX('foto-ana.jpg'), g.y(3) - 22, { opacity: fadeIn(frame, tFoto + 6, 12) })}><AvatarAna size={40} rounded={6} /></div>
          <div style={abs(thumbX('projeto-receitas.png'), g.y(4) - 17, { opacity: fadeIn(frame, tProj + 6, 12) })}><ReceitasThumb width={60} /></div>
        </FileTree>
      </div>
      {/* entra na pasta (index -> imagens/) */}
      <ArrowLine x1={T.x + g.textEnd(0, 'site-da-ana/') + 14} y1={Y(0) + 6} x2={T.x + g.textEnd(1, 'imagens/') + 16} y2={Y(2)} p={rampF(frame, tRel, tRel + 22)} opacity={inP} bend={-30} color={C.lavender} width={6} />
      <div style={abs(T.x + 400, Y(1) - 28, { opacity: inP })}>
        <Chip size={28} color={C.night} border={C.purpleSoft}>entra na pasta</Chip>
      </div>
      {/* ../ sobe (paginas -> raiz) e imagens/ entra */}
      <ArrowLine x1={ax} y1={Y(5)} x2={ax} y2={Y(0)} p={up} opacity={phase2 ? 1 : 0} color={C.lavender} width={6} />
      <ArrowLine x1={ax - 10} y1={Y(0) + 4} x2={T.x + g.textEnd(1, 'imagens/') + 16} y2={Y(2)} p={down} opacity={phase2 ? 1 : 0} bend={40} color={C.lavender} width={6} />
      <div style={abs(T.x, 580, { opacity: phase2 ? fadeIn(frame, tDots + 30, 12) : 0 })}>
        <Chip size={30} color={C.white} bg={C.purple} border={C.night}><span style={{ fontFamily: MONO }}>../</span> sobe, <span style={{ fontFamily: MONO }}>imagens/</span> entra</Chip>
      </div>
      <div style={abs(T.x, 680)}><PathRule op={fadeIn(frame, tRule, 14)} size={38} /></div>
      {/* antes do editor: os dois arquivos, grandes */}
      {show > 0 && (
        <div style={{ opacity: show }}>
          <div style={abs(760, 80, { opacity: fadeIn(frame, tCreate, 12) })}>
            <Chip size={34} color={C.night} border={C.purple}>nova pasta: <span style={{ fontFamily: MONO, color: C.purple }}>imagens</span>, sem acento</Chip>
          </div>
          <div style={abs(780, 220, { opacity: fadeIn(frame, tFoto, 12) })}>
            <FileCard name="foto-ana.jpg" width={330}><AvatarAna size={290} /></FileCard>
          </div>
          <div style={abs(1180, 300, { opacity: fadeIn(frame, tProj, 12) })}>
            <FileCard name="projeto-receitas.png" width={620}><ReceitasThumb width={580} /></FileCard>
          </div>
        </div>
      )}
      {edP > 0 && (
        <div style={{ opacity: edP }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1130} height={200} filename={phase2 ? 'paginas/projetos.html' : 'index.html'}>
              {phase2 ? (
                <CodeTyping key="p" segments={segs2} fontSize={ed.fs} numbers={[8, 9]} lineHighlights={[{ line: 1, at: tDots + 6 }]} highlights={[{ text: '../', at: typed2, color: 'rgba(255,210,138,0.45)' }, { text: 'imagens/', at: typed2 + 10, color: 'rgba(143,211,232,0.35)' }]} />
              ) : (
                <CodeTyping key="i" segments={segs1} fontSize={ed.fs} numbers={[2, 3]} lineHighlights={[{ line: 1, at: tSrc + 6 }]} highlights={[{ text: 'imagens/', at: tRel, color: 'rgba(255,210,138,0.45)' }]} />
              )}
            </EditorWindow>
          </div>
          <div style={abs(ed.x, 280)}>
            <BrowserMock width={1130} height={570} tabTitle={phase2 ? 'Projetos' : 'Sobre mim'} url={phase2 ? 'paginas/projetos.html' : 'index.html'}>
              {phase2 ? (
                <ProjetosPreview base={24} fig={<div style={{ opacity: bigImg }}><ReceitasThumb width={640} /></div>} />
              ) : (
                <IndexPreview base={24} lines={['p1']} img={<div style={{ opacity: bigImg }}><AvatarAna size={460} /></div>} />
              )}
            </BrowserMock>
          </div>
          <div style={abs(1300, 560, { opacity: phase2 ? 0 : fadeIn(frame, typed1 + 10, 12) })}>
            <Chip size={30} color={C.night} border={C.purple}>sem tamanho: bem grande</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
const Card = ({ x, y, w, h, n, title, op, active, children }) => (
  <div style={abs(x, y, { width: w, height: h, opacity: op, transform: `translateY(${(1 - op) * 24}px)`, background: C.white, borderRadius: 24, border: `4px solid ${active ? C.purple : '#C9C5EE'}`, boxShadow: '0 18px 40px rgba(38,33,92,0.16)', boxSizing: 'border-box', padding: '20px 22px', fontFamily: FONT })}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      <div style={{ width: 50, height: 50, borderRadius: 25, background: C.purple, color: C.white, fontSize: 28, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: C.night }}>{title}</div>
    </div>
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
)

export const Alt = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tAlt = s('o atributo mais importante')
  const tDesc = s('Ele descreve a imagem')
  const t1 = s('A primeira')
  const tReads = s('Ele lê o alt')
  const tNoAlt = s('Sem alt')
  const t2 = s('A segunda')
  const tPlace = s('No lugar da imagem')
  const tKeep = s('e a informação não se perde')
  const t3 = s('A terceira')
  const tAll = s('Toda imagem precisa')
  const ed = { x: 50, y: 40, fs: 30 }
  const base = IMG_FOTO.slice(0, -1)
  const altTxt = ` alt="${ALT_ANA}"`
  const segs = [
    { text: '  ' + base, start: 0, frames: 0 },
    { text: altTxt, start: tAlt + 10, frames: Math.max(40, Math.min(70, tDesc - tAlt)) },
    { text: '>', start: 0, frames: 0 },
  ]
  const line = '  ' + IMG_FOTO_ALT
  const sAlt = spanAt(ed, 0, line, altTxt.trim())
  const cards = [
    { x: 50, at: t1, until: t2 },
    { x: 675, at: t2, until: t3 },
    { x: 1300, at: t3, until: tAll },
  ]
  const cw = 570
  const ch = 470
  const broken = frame >= tPlace
  // lupa passando sobre o alt
  const scan = rampF(frame, t3 + 20, t3 + 90)
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1820} height={150} filename="index.html">
          <CodeTyping segments={segs} fontSize={ed.fs} numbers={[3]} highlights={[{ text: altTxt.trim(), at: tDesc, color: 'rgba(255,210,138,0.35)' }]} />
        </EditorWindow>
      </div>
      <Label x={sAlt.x - 220} y={212} w={440} op={fadeIn(frame, tDesc, 12)} dark size={32}>texto alternativo</Label>
      <ArrowLine x1={sAlt.x} y1={210} x2={sAlt.x} y2={sAlt.bottom + 6} p={fadeIn(frame, tDesc, 12)} width={6} />
      {/* 1) leitor de tela */}
      <Card x={cards[0].x} y={300} w={cw} h={ch} n={1} title="leitor de tela" op={fadeIn(frame, t1, 12)} active={frame >= t1 && frame < t2}>
        <div style={{ opacity: fadeIn(frame, tNoAlt, 12) }}>
          <div style={{ position: 'relative' }}>
            <SpeechBubble text="foto-ana.jpg" fs={28} icon={64} strike={rampF(frame, tNoAlt + 10, tNoAlt + 22)} />
            <div style={abs(330, -6)}><Chip size={24} color={C.white} bg={C.red} border={C.red}>sem alt</Chip></div>
          </div>
        </div>
        <div style={{ marginTop: 34, opacity: fadeIn(frame, tReads, 12) }}>
          <SpeechBubble text={`Imagem: ${ALT_ANA}`} fs={27} icon={64} width={390} />
        </div>
      </Card>
      {/* 2) a imagem não carregou */}
      <Card x={cards[1].x} y={300} w={cw} h={ch} n={2} title="imagem que não carrega" op={fadeIn(frame, t2, 12)} active={frame >= t2 && frame < t3}>
        <BrowserMock width={cw - 48} height={260} tabTitle="Sobre mim" url="index.html" style={{ boxShadow: 'none' }}>
          <div style={{ fontFamily: FONT, color: '#1A1A1A', marginTop: -10 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{TXT.h1}</div>
            <div style={{ marginTop: 10 }}>
              {broken ? <BrokenImg alt={ALT_ANA} fs={17} width={300} style={{ opacity: fadeIn(frame, tPlace, 8) }} /> : <AvatarAna size={92} style={{ opacity: 1 - rampF(frame, tPlace - 10, tPlace) }} />}
            </div>
          </div>
        </BrowserMock>
        <div style={{ marginTop: 18, opacity: fadeIn(frame, tKeep, 12), fontSize: 26, fontWeight: 600, color: C.night, lineHeight: 1.25, textAlign: 'center' }}>a imagem não carregou,<br />mas a informação ficou</div>
      </Card>
      {/* 3) busca */}
      <Card x={cards[2].x} y={300} w={cw} h={ch} n={3} title="sites de busca" op={fadeIn(frame, t3, 12)} active={frame >= t3 && frame < tAll}>
        <div style={{ position: 'relative', background: C.nightDeep, borderRadius: 16, padding: '18px 22px', fontFamily: MONO, fontSize: 26, lineHeight: 1.45, color: '#8FD3E8', height: 150, boxSizing: 'border-box' }}>
          <span style={{ color: '#FFD28A' }}>alt</span><span style={{ color: '#A9A4E8' }}>=</span>"{ALT_ANA}"
        </div>
        <div style={abs(-10 + scan * 360, 40 + Math.sin(scan * Math.PI * 2) * 30, { opacity: fadeIn(frame, t3 + 14, 8) })}><svg width="110" height="110" viewBox="0 0 64 64"><circle cx="26" cy="26" r="18" fill="rgba(255,255,255,0.14)" stroke={C.lavender} strokeWidth="5" /><line x1="40" y1="40" x2="58" y2="58" stroke={C.purpleSoft} strokeWidth="8" strokeLinecap="round" /></svg></div>
        <div style={{ marginTop: 50, opacity: fadeIn(frame, t3 + 60, 12), textAlign: 'center' }}>
          <Chip size={30} color={C.night} border={C.purple}>busca entende a imagem</Chip>
        </div>
      </Card>
      {/* os três juntos */}
      <div style={abs(0, 795, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tAll, 14), transform: `translateY(${(1 - fadeIn(frame, tAll, 14)) * 12}px)` })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: C.purple, border: `3px solid ${C.night}`, borderRadius: 20, padding: '8px 30px' }}>
          <SpeakerIcon size={56} color={C.lavender} />
          <div style={{ background: C.white, borderRadius: 10, padding: 4, display: 'flex' }}><BrokenIcon size={44} /></div>
          <div style={{ background: C.white, borderRadius: 10, padding: 2, display: 'flex' }}><SearchIcon size={48} /></div>
          <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.white, marginLeft: 8 }}>toda imagem precisa de alt</div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
export const BomAlt = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tThink = s('Pensa assim')
  const tAna = s('Para a foto da Ana')
  const tShort = s('Curto, direto')
  const tNoImg = s('Não precisa começar')
  const tAvisa = s('porque o leitor de tela já avisa')
  const tNoFile = s('E nada de repetir')
  const tDeco = s('Agora, tem imagens que são só enfeite')
  const tNone = s('Elas não trazem informação')
  const tEmpty = s('Para essas, você escreve')
  const tSkip = s('Assim, o leitor de tela entende')
  const tPresent = s('Vazio, mas presente')
  const A = win(frame, 0, tShort + 20, 14)
  const Bp = win(frame, tShort + 20, tDeco, 14)
  const Cp = rampF(frame, tDeco, tDeco + 14)
  const ed = { x: 50, y: 60, fs: 30 }
  const L1 = '<img src="imagens/foto-ana.jpg" alt="foto-ana.jpg">'
  const L2 = '<img src="imagens/foto-ana.jpg" alt="Foto de uma imagem da Ana">'
  const L3 = IMG_FOTO_ALT
  const sGood = cardSpan({ x: 120, y: 310, fs: 30 }, 0, L3, ALT_ANA)
  // fase C
  const edC = { x: 1000, y: 60, fs: 30 }
  const LC = '<img src="imagens/enfeite.svg" alt="">'
  const sQ = spanAt(edC, 0, LC, '""')
  const hop = rampF(frame, tSkip + 6, tSkip + 50)
  const spkY = hop <= 0 ? 0 : hop >= 1 ? 250 : 250 * hop
  const wave = Math.floor(frame / 8) % 2
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(330, 150, { opacity: fadeIn(frame, tThink, 12) })}>
            <Phone width={260}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
                <div style={{ width: 96, height: 96, borderRadius: 48, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="54" height="54" viewBox="0 0 32 32"><path d="M9 4 L13 4 L15 10 L12 12 Q14 18 20 20 L22 17 L28 19 L28 23 Q28 28 23 28 Q6 26 4 9 Q4 4 9 4 Z" fill={C.lavender} /></svg>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', height: 50 }}>
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => <div key={i} style={{ width: 8, borderRadius: 4, background: C.purpleSoft, height: frame >= tAna ? 14 + 30 * Math.abs(Math.sin(frame / 4 + i)) : 10 }} />)}
                </div>
              </div>
            </Phone>
          </div>
          <div style={abs(700, 170, { opacity: fadeIn(frame, tThink + 10, 12) })}>
            <Chip size={36} color={C.night} border={C.purple}>se fosse contar a imagem por telefone, o que você diria?</Chip>
          </div>
          <div style={abs(720, 320, { opacity: fadeIn(frame, tAna, 12), transform: `scale(${0.9 + 0.1 * fadeIn(frame, tAna, 12)})`, transformOrigin: 'left center' })}>
            <div style={{ position: 'relative', background: C.white, border: `5px solid ${C.purple}`, borderRadius: 34, padding: '28px 44px', width: 900, fontFamily: FONT, fontSize: 52, fontWeight: 600, color: C.night, lineHeight: 1.25, boxShadow: '0 18px 40px rgba(38,33,92,0.18)' }}>
              “{ALT_ANA}”
              <div style={{ position: 'absolute', left: -34, top: 60, width: 0, height: 0, borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderRight: `34px solid ${C.purple}` }} />
            </div>
          </div>
          <div style={abs(720, 600, { opacity: fadeIn(frame, tShort - 10, 12) })}>
            <Chip size={34} color={C.white} bg={C.purple} border={C.night}>curto, direto, com o que importa</Chip>
          </div>
        </div>
      )}
      {Bp > 0 && (
        <div style={{ opacity: Bp }}>
          {[
            { t: L1, y: 70, bad: 'alt="foto-ana.jpg"', at: tNoFile, label: 'nome do arquivo' },
            { t: L2, y: 190, bad: 'Foto de uma imagem da', at: tNoImg, label: '“foto de” sobra' },
          ].map((r) => {
            const w = r.t.length * 30 * 0.55 + 58 + 80
            return (
              <React.Fragment key={r.y}>
                <CodeCard x={120} y={r.y} fs={30} text={r.t} highlights={[{ text: r.bad, at: r.at, color: 'rgba(217,83,79,0.45)' }]} mark={<div style={{ opacity: fadeIn(frame, r.at, 8) }}><Cross size={56} /></div>} />
                <div style={abs(120 + w + 30, r.y + 16, { opacity: fadeIn(frame, r.at + 8, 10) })}>
                  <Chip size={30} color={C.night} border={C.red}>{r.label}</Chip>
                </div>
              </React.Fragment>
            )
          })}
          <CodeCard x={120} y={310} fs={30} text={L3} highlights={[{ text: ALT_ANA, at: tShort + 30, color: 'rgba(255,210,138,0.35)' }]} mark={<div style={{ opacity: fadeIn(frame, tShort + 30, 8) }}><Check size={56} /></div>} />
          <Label x={sGood.x - 300} y={440} w={600} op={fadeIn(frame, tShort + 36, 12)} dark size={32}>curto e diz o que importa</Label>
          <ArrowLine x1={sGood.x} y1={438} x2={sGood.x} y2={sGood.bottom + 6} p={fadeIn(frame, tShort + 36, 12)} width={6} />
          <div style={abs(300, 560, { opacity: fadeIn(frame, tAvisa, 12) })}>
            <SpeechBubble text={<><b style={{ color: C.purple }}>Imagem:</b> {ALT_ANA}</>} fs={36} icon={90} width={1150} />
          </div>
          <div style={abs(410, 710, { opacity: fadeIn(frame, tAvisa + 30, 12) })}>
            <Chip size={30} color={C.night} border={C.purple}>o leitor de tela já avisa que é uma imagem</Chip>
          </div>
        </div>
      )}
      {Cp > 0 && (
        <div style={{ opacity: Cp }}>
          <div style={abs(50, 60)}>
            <BrowserMock width={900} height={620} tabTitle="Sobre mim" url="index.html">
              <div style={{ position: 'relative', fontFamily: FONT, color: '#1A1A1A', height: 460 }}>
                <div style={abs(0, 0, { fontSize: 36, fontWeight: 700 })}>{TXT.h2a}</div>
                <div style={abs(0, 56, { fontSize: 23, lineHeight: 1.4, width: 640 })}>{TXT.p1}</div>
                <div style={abs(0, 190, { opacity: fadeIn(frame, tDeco + 10, 12), borderRadius: 8, boxShadow: frame >= tNone && frame < tSkip ? `0 0 0 6px rgba(127,119,221,0.35)` : 'none' })}><Enfeite width={620} /></div>
                <div style={abs(0, 250, { fontSize: 36, fontWeight: 700 })}>{TXT.h2b}</div>
                <div style={abs(0, 306, { fontSize: 23, lineHeight: 1.4, width: 640 })}>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</div>
                {/* leitor de tela pulando o enfeite */}
                <div style={abs(620, spkY - 6, { opacity: fadeIn(frame, tSkip, 10) })}><SpeakerIcon size={80} waves={hop > 0.25 && hop < 0.85 ? 0 : 1 + wave} /></div>
                <svg width="200" height="320" style={abs(600, 0, { overflow: 'visible', opacity: fadeIn(frame, tSkip + 6, 10) })}>
                  <path d="M60 80 Q150 165 60 250" fill="none" stroke={C.purple} strokeWidth="5" strokeDasharray="12 10" strokeLinecap="round" />
                  <polygon points="48,238 72,252 52,264" fill={C.purple} />
                  <text x="122" y="172" fontFamily={FONT} fontSize="28" fontWeight="700" fill={C.purple}>pular</text>
                </svg>
              </div>
            </BrowserMock>
          </div>
          <div style={abs(edC.x, edC.y, { opacity: fadeIn(frame, tEmpty - 6, 12) })}>
            <EditorWindow width={870} height={150} filename="index.html">
              <CodeTyping segments={[{ text: LC, start: 0, frames: 0 }]} fontSize={edC.fs} numbers={[7]} cursor={false} highlights={[{ text: '""', at: tEmpty + 20, color: 'rgba(255,210,138,0.5)' }]} />
            </EditorWindow>
          </div>
          <div style={abs(sQ.x - 100, 230, { opacity: fadeIn(frame, tEmpty + 20, 12) })}><Loupe text={'""'} size={150} /></div>
          <div style={abs(edC.x + 20, 470, { opacity: fadeIn(frame, tEmpty + 36, 12) })}>
            <Chip size={34} color={C.night} border={C.purple}>imagem de enfeite: <span style={{ fontFamily: MONO }}>alt=""</span></Chip>
          </div>
          <div style={abs(edC.x + 20, 570, { opacity: fadeIn(frame, tSkip + 10, 12) })}>
            <Chip size={34} color={C.night} border={C.purpleSoft}>o leitor de tela pula em silêncio</Chip>
          </div>
          <div style={abs(edC.x + 20, 690, { opacity: fadeIn(frame, tPresent, 12) })}>
            <Chip size={40} color={C.white} bg={C.purple} border={C.night}>vazio, mas presente</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 6
export const Tamanho = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const t800 = s('A foto da Ana tem oitocentos')
  const tWidth = s('width, que quer dizer')
  const tHeight = s('e height, que quer dizer')
  const tPx = s('Os valores são números')
  const tAna = s('Na foto da Ana: width')
  const tH200 = s('e height igual a duzentos')
  const tProp = s('Mas cuidado com a proporção')
  const tSquare = s('A foto é quadrada')
  const tWrong = s('Se você colocar duzentos de largura')
  const tFlat = s('a Ana fica achatada')
  const tRule = s('A regra é')
  const tBonus = s('E tem um bônus')
  const Main = 1 - rampF(frame, tBonus - 4, tBonus + 10)
  const Bonus = rampF(frame, tBonus, tBonus + 14)
  const ed = { x: 50, y: 40, fs: 26 }
  const wrong = frame >= tWrong + 10 && frame < tRule + 10
  const hVal = wrong ? '100' : '200'
  const base = '  ' + IMG_FOTO_ALT.slice(0, -1)
  const segs = [
    { text: base, start: 0, frames: 0 },
    { text: ' width="200"', start: tAna + 4, frames: 14 },
    { text: ` height="${hVal}"`, start: tH200 + 2, frames: 14 },
    { text: '>', start: 0, frames: 0 },
  ]
  const full = `${base} width="200" height="${hVal}">`
  const sW = spanAt(ed, 0, full, 'width="200"')
  const sH = spanAt(ed, 0, full, `height="${hVal}"`)
  const shrink = rampF(frame, tH200 + 20, tH200 + 44)
  const size = 560 - 420 * shrink
  const sq = rampF(frame, tWrong + 10, tWrong + 26) * (1 - rampF(frame, tRule + 10, tRule + 26))
  const rulerTxt = shrink < 1 ? '800 × 800' : sq > 0.5 ? '200 × 100' : '200 × 200'
  // carregando a página (bônus)
  const cyc = (frame - tBonus - 16) % 100
  const arrived = frame >= tBonus + 16 && cyc >= 46
  const jump = frame < tBonus + 16 ? 0 : clamp01((cyc - 46) / 5)
  const once = frame >= tBonus + 62
  return (
    <AbsoluteFill>
      {Main > 0 && (
        <div style={{ opacity: Main }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1820} height={140} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} numbers={[3]} highlights={[{ text: 'width="200"', at: tAna + 18, color: 'rgba(255,210,138,0.45)' }, { text: `height="${hVal}"`, at: tH200 + 16, color: wrong ? 'rgba(217,83,79,0.55)' : 'rgba(143,211,232,0.4)' }]} />
            </EditorWindow>
          </div>
          <div style={abs(sW.x - 90, 200, { width: 180, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tAna + 18, 10) })}><Chip size={28} color={C.night} border={C.purple}>largura</Chip></div>
          <div style={abs(sH.x - 90, 200, { width: 180, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tH200 + 16, 10) })}><Chip size={28} color={C.night} border={C.purple}>altura</Chip></div>
          <div style={abs(50, 270, { opacity: fadeIn(frame, 0, 12) })}>
            <BrowserMock width={1100} height={590} tabTitle="Sobre mim" url="index.html">
              <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
                <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.18 }}>{TXT.h1}</div>
                <div style={{ display: 'flex', gap: 28, marginTop: 12, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Ruler width={size} label={rulerTxt} op={fadeIn(frame, t800, 12)} />
                      {shrink >= 1 && (sq > 0.5 ? <Cross size={44} /> : <div style={{ opacity: fadeIn(frame, tH200 + 44, 8) }}><Check size={44} /></div>)}
                    </div>
                    <AvatarAna size={size} squash={1 - 0.5 * sq} />
                  </div>
                  <div style={{ fontSize: 24, lineHeight: 1.45, marginTop: 50 }}>{TXT.p1}<br /><br />{TXT.p2}</div>
                </div>
              </div>
            </BrowserMock>
          </div>
          {/* coluna da direita */}
          <div style={abs(1200, 290, { display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start', opacity: win(frame, tWidth, tProp, 12) })}>
            <div style={{ opacity: fadeIn(frame, tWidth, 12) }}><Chip size={36} color={C.night} border={C.purple}><span style={{ fontFamily: MONO, color: C.purple }}>width</span> = largura</Chip></div>
            <div style={{ opacity: fadeIn(frame, tHeight, 12) }}><Chip size={36} color={C.night} border={C.purple}><span style={{ fontFamily: MONO, color: C.purple }}>height</span> = altura</Chip></div>
            <div style={{ opacity: fadeIn(frame, tPx, 12) }}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>números em pixels, sem nada depois</Chip></div>
          </div>
          <div style={abs(1200, 290, { opacity: win(frame, tSquare, tBonus, 12) })}>
            <Chip size={32} color={C.night} border={C.purple}>foto quadrada: largura = altura</Chip>
          </div>
          <div style={{ opacity: win(frame, tWrong, tRule + 10, 12) }}>
            <CodeCard x={1200} y={390} fs={30} text={'width="200" height="100"'} mark={<Cross size={50} />} />
            <div style={abs(1200, 500, { display: 'flex', alignItems: 'center', gap: 24 })}>
              <AvatarAna size={200} squash={0.5} />
              <div style={{ opacity: fadeIn(frame, tFlat, 10) }}><Chip size={32} color={C.night} border={C.red}>proporção quebrada</Chip></div>
            </div>
          </div>
          <div style={abs(1200, 640, { opacity: win(frame, tRule, tBonus, 12) })}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, background: C.night, color: C.lavender, borderRadius: 20, padding: '14px 30px', fontFamily: FONT, fontSize: 36, fontWeight: 600 }}>
              <span>divida os dois pelo mesmo número</span>
              <span style={{ fontFamily: MONO, color: '#FFD28A', fontSize: 34 }}>800 ÷ 4 = 200 · 800 ÷ 4 = 200</span>
            </div>
          </div>
        </div>
      )}
      {Bonus > 0 && (
        <div style={{ opacity: Bonus }}>
          {[
            { x: 50, title: 'sem width e height', ok: false },
            { x: 990, title: 'com width e height', ok: true },
          ].map((p) => (
            <div key={p.x}>
              <div style={abs(p.x, 60, { display: 'flex', alignItems: 'center', gap: 18 })}>
                <Chip size={36} color={C.night} border={p.ok ? C.purple : C.purpleSoft}><span style={{ fontFamily: MONO }}>{p.title}</span></Chip>
                {once && (p.ok ? <Check size={56} /> : <Cross size={56} />)}
              </div>
              <div style={abs(p.x, 150)}>
                <BrowserMock width={880} height={560} tabTitle="Sobre mim" url="index.html">
                  <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
                    <div style={{ fontSize: 38, fontWeight: 700 }}>{TXT.h1}</div>
                    {p.ok ? (
                      <Slot width={180} height={180} fill={arrived ? 1 : 0} style={{ marginTop: 14 }}><AvatarAna size={180} /></Slot>
                    ) : (
                      <div style={{ height: 194 * jump, overflow: 'hidden' }}><div style={{ marginTop: 14 }}><AvatarAna size={180} /></div></div>
                    )}
                    <div style={{ fontSize: 24, lineHeight: 1.45, marginTop: 16, background: !p.ok && jump > 0 && jump < 1 ? 'rgba(217,83,79,0.15)' : 'transparent' }}>{TXT.p1}</div>
                    <div style={{ fontSize: 24, lineHeight: 1.45, marginTop: 12 }}>{TXT.p2}</div>
                  </div>
                </BrowserMock>
              </div>
            </div>
          ))}
          <Label x={0} y={760} w={1920} op={fadeIn(frame, tBonus + 70, 12)} dark size={38}>o navegador reserva o espaço antes da imagem chegar: a página não pula</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}
