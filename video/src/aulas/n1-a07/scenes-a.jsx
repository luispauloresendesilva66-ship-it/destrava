import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine, Cursor, cursorMotion } from '../../components/Navigation.jsx'
import { SpeakerIcon } from '../../components/Icons.jsx'
import { Acronym, Label, LinesBox, ScrollEditor, Warn, abs, edAt, rampF, win } from '../n1-a06/scenes-a.jsx'
import {
  TXT, BLUE, ORANGE, CAPTION, H2_FALE, H2_ROTINA, HEAD3, ROWS3, CodeCard, CommentCard, ContactForm, DataTag, InputBox, LabelText,
  PhoneMock, SearchCard, SignupCard, SpeechBubble, TableView, Tag, VisitorIcon,
} from './ana.jsx'

export { Acronym, Label, LinesBox, ScrollEditor, Warn, abs, edAt, rampF, win }

export const YEL = 'rgba(255,210,138,0.55)'
export const PAIR = 'rgba(240,160,75,0.6)'
export const GREENT = '#97C459'
const FOCUS_BORDER = '#1A5FD6'

// Texto digitado aos poucos (prévia do navegador).
export const typed = (frame, text, a, dur) => text.slice(0, Math.floor(text.length * rampF(frame, a, a + dur) + 1e-6))
export const blinkOn = (frame) => Math.floor(frame / 15) % 2 === 0

// Cursor do mouse dentro de um contêiner posicionado (coordenadas locais do alvo).
export const MouseAt = ({ frame, x, y, arrive, click, leave, from = [200, 140], hand = false, size = 52 }) => {
  const m = cursorMotion(frame, { arrive, click, from, leave })
  return <Cursor left={x} top={y} {...m} hand={hand} size={size} />
}

// Título h2 da prévia.
export const H2 = ({ children, fs = 34, op = 1, style }) => (
  <div style={{ fontFamily: FONT, fontSize: fs, fontWeight: 700, color: '#1A1A1A', opacity: op, ...style }}>{children}</div>
)

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Na aula passada')
  const tSteps = s('a página da Ana ganhou uma tabela')
  const tPage = s('o horário de estudos da semana')
  const tShows = s('Até agora, a página só mostra')
  const tLeaves = s('A pessoa chega')
  const tListen = s('A página da Ana vai começar a ouvir')
  const tThink = s('Pensa naquela caixinha')
  const tBtn = s('e um botão de enviar')
  const tIs = s('Isso é um formulário')
  const tLabel = s('Você vai aprender')
  const logoBig = 1 - rampF(frame, tTitle - 6, tTitle + 8)
  const logoSmall = rampF(frame, tTitle, tTitle + 14)
  const heights = [220, 270, 320, 370, 420]
  const pA = fadeIn(frame, tPage, 16)
  const pop = (t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })
  const A = { x: 980, y: 250, w: 520, h: 470 }
  const visit = win(frame, tShows, tThink, 12)
  const formP = pop(tThink)
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
        <Title start={tTitle} size={80}>Aula 7 — Formulários: o básico</Title>
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
      {/* Sobre mim, da aula passada (com a tabela) */}
      <div style={abs(A.x, A.y, { opacity: pA, transform: `translateY(${(1 - pA) * 30}px)` })}>
        <BrowserMock width={A.w} height={A.h} tabTitle="Sobre mim" url="index.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{TXT.h1}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 18 }}>{H2_ROTINA}</div>
            <TableView fs={16} style={{ marginTop: 10 }} caption={CAPTION} head={HEAD3} rows={ROWS3.map((cells) => ({ cells }))} />
          </div>
        </BrowserMock>
      </div>
      {/* a página fala com quem visita... e quem visita responde */}
      <div style={{ opacity: visit }}>
        <div style={abs(1640, 250, { opacity: fadeIn(frame, tShows, 12) })}><VisitorIcon size={170} /></div>
        <ArrowLine x1={1510} y1={360} x2={1630} y2={330} p={rampF(frame, tShows + 4, tShows + 20)} bend={-20} />
        <div style={abs(1545, 215, { opacity: fadeIn(frame, tShows + 10, 10) * (1 - fadeIn(frame, tListen, 8)) })}><Chip size={26} color={C.night} border={C.purpleSoft}>a página só mostra</Chip></div>
        <div style={abs(1680, 440, { opacity: fadeIn(frame, tLeaves + 20, 10) * (1 - fadeIn(frame, tListen, 8)), fontFamily: FONT, fontSize: 30, color: C.purple, fontWeight: 600 })}>...e vai embora</div>
        <ArrowLine x1={1690} y1={450} x2={1515} y2={560} p={rampF(frame, tListen + 4, tListen + 22)} bend={-30} color={GREENT} dashed />
        <div style={abs(1560, 590, { opacity: fadeIn(frame, tListen + 16, 10) })}>
          <div style={{ position: 'relative', background: C.white, border: `4px solid ${C.green}`, borderRadius: 22, padding: '10px 22px', fontFamily: FONT, fontSize: 30, fontWeight: 600, color: C.night }}>Oi, Ana!</div>
        </div>
        <div style={abs(1545, 700, { opacity: fadeIn(frame, tListen + 24, 10) })}><Chip size={26} color={C.night} border={C.green}>a página ouve quem visita</Chip></div>
      </div>
      {/* formulário de contato ilustrado */}
      <div style={abs(1545, 225, { opacity: clamp01(formP * 2), transform: `scale(${0.6 + 0.4 * formP})`, transformOrigin: 'left top' })}>
        <ContactForm w={335} fs={22} op={{ b: fadeIn(frame, tBtn, 10) }} />
      </div>
      <div style={abs(1545, 166, { opacity: fadeIn(frame, tIs, 12) })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>isso é um formulário</Chip></div>
      <Label x={A.x} y={846} w={895} op={fadeIn(frame, tLabel, 14)} dark size={34}>o que a gente vai construir hoje</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const OQueE = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tIdea = s('Antes do código')
  const tPiece = s('Um formulário é um pedaço')
  const tUse = s('Você usa formulários')
  const tSearch = s('A caixa de busca')
  const tSignup = s('A tela de cadastro')
  const tComment = s('O campo para deixar')
  const tThree = s('Todo formulário tem três peças')
  const tFirst = s('Primeiro, os campos')
  const tSecond = s('Segundo, os rótulos')
  const tThird = s('E terceiro, um botão')
  const tToday = s('Hoje, a gente vai montar')
  const tWarn = s('já adianto uma coisa')
  const A = win(frame, 0, tThree, 14)
  const B = rampF(frame, tThree - 4, tThree + 10)
  const pop = (t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })
  const card = (t) => ({ opacity: clamp01(pop(t) * 2), transform: `scale(${0.7 + 0.3 * pop(t)})`, transformOrigin: 'center top' })
  const ease = (p) => 1 - Math.pow(1 - p, 3)
  const goF = ease(rampF(frame, tFirst - 6, tFirst + 16))
  const goB = ease(rampF(frame, tThird - 6, tThird + 16))
  const CX = 750
  const cols = [
    { key: 'f', x: CX + (150 - CX) * goF, op: { l: 0, f: 1, b: 0 }, tint: { f: frame >= tFirst ? BLUE : null }, chip: 'campos: onde se digita', border: BLUE, at: tFirst + 10 },
    { key: 'l', x: CX, op: { l: 1, f: 0, b: 0 }, tint: { l: frame >= tSecond ? C.green : null }, chip: 'rótulos: o que vai em cada campo', border: C.green, at: tSecond },
    { key: 'b', x: CX + (1350 - CX) * goB, op: { l: 0, f: 0, b: 1 }, tint: { b: frame >= tThird ? ORANGE : null }, chip: 'botão: terminei', border: ORANGE, at: tThird + 10 },
  ]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 50, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tIdea, 12) })}>
            <div style={{ background: C.night, color: C.lavender, borderRadius: 24, padding: '18px 56px', fontFamily: FONT, fontSize: 54, fontWeight: 700, boxShadow: '0 18px 40px rgba(27,23,68,0.35)' }}>O que é um formulário?</div>
          </div>
          <div style={abs(0, 180, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tPiece, 12) })}>
            <Chip size={34} color={C.night} border={C.purpleSoft}>um pedaço da página onde quem visita escreve ou escolhe</Chip>
          </div>
          <div style={abs(130, 300, card(tSearch))}><SearchCard width={500} /></div>
          <div style={abs(710, 300, card(tSignup))}><SignupCard width={500} /></div>
          <div style={abs(1290, 300, card(tComment))}><CommentCard width={500} /></div>
          <Label x={130} y={700} w={1660} op={fadeIn(frame, tComment + 40, 12) * fadeIn(frame, tUse, 1)} dark size={40}>tudo isso é formulário</Label>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          {cols.map((c) => (
            <div key={c.key} style={abs(c.x, 130)}>
              <ContactForm w={420} fs={24} op={c.op} tint={c.tint} style={{ background: c.key === 'l' ? C.white : 'transparent', boxShadow: c.key === 'l' ? undefined : 'none' }} />
            </div>
          ))}
          {cols.map((c) => (
            <Label key={c.key + 'c'} x={c.x - 110} y={632} w={640} op={fadeIn(frame, c.at, 12)} size={28} border={c.border}>{c.chip}</Label>
          ))}
          <div style={abs(0, 740, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: fadeIn(frame, tToday, 12) })}>
            <Check size={56} />
            <Chip size={32} color={C.white} bg={C.purple} border={C.night}>hoje: as três peças</Chip>
          </div>
          <div style={abs(0, 36, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tWarn, 12) })}>
            <Warn size={52} />
            <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">por enquanto, não envia para lugar nenhum</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
export const FormInput = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tForm = s('Todo formulário começa')
  const tBox = s('Ela é a caixa que guarda')
  const tLike = s('assim como a têibol')
  const tInput = s('que é a tag ínput')
  const tEnters = s('É por ali que a informação')
  const tDetail = s('A ínput tem um detalhe')
  const tNoClose = s('ela não tem tag de fechamento')
  const tImg = s('Igual à tag de imagem')
  const tTypeAttr = s('Para dizer que tipo')
  const tTypeText = s('Com táip igual a téxt')
  const tOneLine = s('ela vira uma caixa de texto')
  const tName = s('E tem mais um atributo importante')
  const tNameNome = s('A Ana escreve nêim igual a nome')
  const tHidden = s('Quem visita não vê')
  const tLater = s('mais tarde, quando o formulário')
  const A = win(frame, 0, tDetail, 14)
  const B = rampF(frame, tDetail - 4, tDetail + 10)
  const ed = { x: 50, y: 40, fs: 36 }
  const segs = [
    { text: `<h2>${H2_FALE}</h2>`, start: 0, frames: 0 },
    { text: '\n<form>\n  <input', start: tDetail + 2, frames: 18 },
    { text: ' type="text"', start: tTypeText + 2, frames: 14 },
    { text: ' name="nome"', start: tNameNome + 6, frames: 14 },
    { text: '>\n</form>', start: tDetail + 22, frames: 10 },
  ]
  const boxOn = tDetail + 32
  const blink = blinkOn(frame)
  const hls = [
    ...(frame >= tNoClose && frame < tTypeAttr && blink ? [{ text: '<input', at: 0, color: YEL }] : []),
    { text: 'type="text"', at: tTypeText + 16, until: tName, color: YEL },
    { text: 'name="nome"', at: tNameNome + 20, color: 'rgba(232,184,96,0.6)' },
  ]
  const click = tOneLine + 14
  const focus = rampF(frame, click + 4, click + 8)
  const value = typed(frame, 'Ana', click + 16, 18)
  const pType = edAt(ed, 2, 9)
  const pName = edAt(ed, 2, 21)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(160, 130)}>
            <Acronym word="form" keys={[0, 1, 2, 3]} tag="form" meaning="a caixa do formulário" op={fadeIn(frame, tForm, 12)} defOp={fadeIn(frame, tBox, 12)} />
          </div>
          <div style={abs(160, 430)}>
            <Acronym word="input" keys={[0, 1, 2, 3, 4]} tag="input" meaning="entrada" op={fadeIn(frame, tInput - 10, 12)} defOp={fadeIn(frame, tInput + 14, 12)} />
          </div>
          {/* ilustração: a caixa (form) com um campo dentro */}
          <div style={abs(1060, 170, { opacity: fadeIn(frame, tBox, 12) })}>
            <div style={{ position: 'relative', width: 700, height: 340, border: `5px dashed ${C.purple}`, borderRadius: 24, background: 'rgba(255,255,255,0.55)', boxSizing: 'border-box' }}>
              <div style={abs(24, -26)}><Chip size={30} color={C.white} bg={C.purple} border={C.night}><Tag>{'<form>'}</Tag></Chip></div>
              <div style={abs(110, 140, { opacity: fadeIn(frame, tInput, 12) })}>
                <InputBox w={480} fs={40} value={typed(frame, 'Ana', tEnters + 16, 18)} caret={frame >= tEnters + 10 && blink} focus={rampF(frame, tEnters + 6, tEnters + 12)} />
              </div>
              <div style={abs(110, 228, { opacity: fadeIn(frame, tInput + 6, 12) })}><Chip size={26} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>{'<input>'}</Tag>: um campo</Chip></div>
            </div>
            <div style={{ marginTop: 26, opacity: fadeIn(frame, tLike, 12) }}><Chip size={28} color={C.night} border={C.purpleSoft}>como a <Tag color={C.purple}>{'<table>'}</Tag> guarda a tabela inteira</Chip></div>
          </div>
          <ArrowLine x1={1100} y1={110} x2={1200} y2={330} p={rampF(frame, tEnters, tEnters + 14)} bend={-40} color={C.green} />
          <div style={abs(1000, 60, { opacity: fadeIn(frame, tEnters, 10) })}><Chip size={26} color={C.night} border={C.green}>a informação entra</Chip></div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={380} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={hls} />
            </EditorWindow>
          </div>
          <LinesBox ed={ed} l0={1} l1={3} c0={0} c1={33} op={fadeIn(frame, boxOn + 4, 10)} color={C.lavender} />
          <div style={abs(edAt(ed, 1, 9).x, edAt(ed, 1, 0).y - 26, { opacity: fadeIn(frame, boxOn + 4, 10) * (1 - fadeIn(frame, tTypeText, 8)) })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>a caixa do formulário</Chip></div>
          {/* sem fechamento */}
          <div style={abs(50, 460, { opacity: win(frame, tNoClose, tTypeAttr, 12), display: 'flex', alignItems: 'center', gap: 16 })}>
            <Chip size={32} color={C.night} border="#E8B860">sem tag de fechamento, igual ao <Tag color={C.purple}>{'<img>'}</Tag></Chip>
          </div>
          <div style={abs(50, 550, { opacity: win(frame, tImg, tTypeAttr, 12) })}>
            <CodeCard x={0} y={0} fs={30} text={'<img src="imagens/foto-ana.jpg">'} />
          </div>
          {/* type="text" */}
          <ArrowLine x1={pType.x + 120} y1={500} x2={pType.x + 110} y2={pType.y + 26} p={win(frame, tTypeText + 16, tName, 8)} color="#E8B860" width={6} />
          <div style={abs(pType.x - 20, 500, { opacity: win(frame, tTypeText + 16, tName, 10) })}><Chip size={32} color={C.night} border="#E8B860">texto de uma linha</Chip></div>
          {/* name="nome": etiqueta pendurada */}
          <div style={{ opacity: fadeIn(frame, tNameNome + 20, 10) }}>
            <div style={abs(pName.x + 110, pName.y + 26, { width: 4, height: 70, background: '#E8B860' })} />
            <div style={abs(pName.x + 40, pName.y + 92)}><DataTag fs={30}>nome</DataTag></div>
          </div>
          <div style={abs(50, 470, { opacity: fadeIn(frame, tHidden, 12) })}>
            <Chip size={30} color={C.night} border="#E8B860">o nome do dado, invisível para quem visita</Chip>
          </div>
          {/* prévia */}
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={440} tabTitle="Sobre mim" url="index.html">
              <H2 fs={36}>{H2_FALE}</H2>
              <div style={abs(28, 110, { opacity: rampF(frame, boxOn, boxOn + 6) })}>
                <InputBox w={380} fs={32} value={value} caret={focus > 0 && blink} focus={focus} />
              </div>
              <div style={abs(28, 110)}>
                <MouseAt frame={frame} x={140} y={30} arrive={click} click={click} leave={click + 40} />
              </div>
            </BrowserMock>
          </div>
          <div style={abs(990, 520, { opacity: fadeIn(frame, click + 4, 12) * (1 - fadeIn(frame, tHidden, 10)) })}><Chip size={30} color={C.night} border={C.purpleSoft}>uma caixinha de texto, de uma linha</Chip></div>
          <div style={abs(990, 520, { opacity: fadeIn(frame, tHidden + 6, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>na tela: só a caixinha (o <Tag color={C.purple}>name</Tag> não aparece)</Chip></div>
          <div style={abs(990, 620, { opacity: fadeIn(frame, tLater, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            <Chip size={28} color={C.night} border={C.purple}>ao enviar:</Chip>
            <DataTag fs={30}>nome</DataTag>
            <span style={{ fontFamily: FONT, fontSize: 40, color: C.purple, fontWeight: 700 }}>→</span>
            <span style={{ fontFamily: FONT, fontSize: 36, color: C.night, fontWeight: 600, background: C.white, padding: '4px 18px', borderRadius: 10, border: `3px solid ${C.purpleSoft}` }}>Ana</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// Linha que liga dois trechos do código passando só por espaço vazio: sobe do trecho `from` [linha, coluna]
// até a linha viaLineTop, vai até a coluna viaCol, desce até viaLineBottom e volta até o trecho `to`.
export const LinkPath = ({ ed, from, to, viaLineTop, viaLineBottom, viaCol, p = 1, color = ORANGE, width = 5 }) => {
  if (p <= 0) return null
  const a = edAt(ed, from[0], from[1])
  const b = edAt(ed, to[0], to[1])
  const yTop = edAt(ed, viaLineTop, 0).y
  const yBot = edAt(ed, viaLineBottom, 0).y
  const xR = edAt(ed, 0, viaCol).x
  const pts = [[a.x, a.y - ed.fs * 0.62], [a.x, yTop], [xR, yTop], [xR, yBot], [b.x, yBot], [b.x, b.y + ed.fs * 0.62]]
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ')
  let L = 0
  for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={L} strokeDashoffset={L * (1 - clamp01(p))} />
      <circle cx={pts[0][0]} cy={pts[0][1]} r={width * 1.3} fill={color} />
      {p >= 0.98 && <circle cx={pts[5][0]} cy={pts[5][1]} r={width * 1.3} fill={color} />}
    </svg>
  )
}

// ---------------------------------------------------------------- Bloco 4
export const FORM_NOME = `<h2>${H2_FALE}</h2>\n<form>\n  <label for="nome">Nome</label>\n  <input type="text" id="nome" name="nome">`
export const LabelScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tProb = s('Tem um problema')
  const tNobody = s('ninguém sabe o que escrever')
  const tMissing = s('Falta o rótulo')
  const tLabel = s('Para isso existe a tag lêibol')
  const tEtq = s('que quer dizer etiqueta')
  const tGuard = s('Ela guarda o texto')
  const tWrite = s('A Ana escreve uma lêibol')
  const tNotEnough = s('Mas não basta colocar')
  const tLink = s('É preciso ligar os dois')
  const tId = s('No campo, a gente coloca um ái di')
  const tUnique = s('que é a identidade dele')
  const tIdEx = s('Por exemplo, ái di igual a nome')
  const tFor = s('E na lêibol, a gente coloca')
  const tForEx = s('fór igual a nome. Pronto')
  const tSays = s('A lêibol diz')
  const tAttn = s('Atenção, porque')
  const A = win(frame, 0, tWrite, 14)
  const B = rampF(frame, tWrite - 4, tWrite + 10)
  const ed = { x: 50, y: 40, fs: 32 }
  const segs = [
    { text: `<h2>${H2_FALE}</h2>\n<form>`, start: 0, frames: 0 },
    { text: '\n  <label', start: tWrite + 4, frames: 8 },
    { text: ' for="nome"', start: tForEx + 2, frames: 12 },
    { text: '>Nome</label>', start: tWrite + 12, frames: 14 },
    { text: '\n  <input type="text"', start: 0, frames: 0 },
    { text: ' id="nome"', start: tIdEx + 4, frames: 12 },
    { text: ' name="nome">\n</form>', start: 0, frames: 0 },
  ]
  const linked = frame >= tForEx + 16
  const hls = [
    { text: 'id="nome"', at: tIdEx + 16, color: linked ? PAIR : YEL },
    { text: 'for="nome"', at: tForEx + 16, color: PAIR },
  ]
  const labOp = rampF(frame, tWrite + 22, tWrite + 28)
  const pairOn = fadeIn(frame, tSays, 12)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(100, 80, { opacity: fadeIn(frame, tProb, 12) })}>
            <BrowserMock width={820} height={400} tabTitle="Sobre mim" url="index.html">
              <H2 fs={36}>{H2_FALE}</H2>
              <div style={{ marginTop: 40 }}><InputBox w={420} fs={36} /></div>
              {[[470, 30], [570, 80], [640, 150]].map(([x, y], i) => (
                <div key={i} style={abs(x, y, { fontFamily: FONT, fontSize: 80, fontWeight: 800, color: C.purpleSoft, opacity: fadeIn(frame, tNobody + i * 6, 10), transform: `rotate(${(i % 2 ? 1 : -1) * 12}deg)` })}>?</div>
              ))}
            </BrowserMock>
          </div>
          <div style={abs(100, 520, { opacity: fadeIn(frame, tNobody, 12) })}><Chip size={32} color={C.night} border={C.red}>o que eu escrevo aqui?</Chip></div>
          <div style={abs(100, 620, { opacity: fadeIn(frame, tMissing, 12) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>falta o rótulo</Chip></div>
          <div style={abs(1060, 150)}>
            <Acronym word="label" keys={[0, 1, 2, 3, 4]} tag="label" meaning="etiqueta" op={fadeIn(frame, tLabel, 12)} defOp={fadeIn(frame, tEtq, 12)} />
          </div>
          <div style={abs(1060, 450, { opacity: fadeIn(frame, tGuard, 12) })}>
            <Chip size={32} color={C.night} border={C.purpleSoft}>guarda o texto que explica o campo</Chip>
            <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 16, background: C.white, borderRadius: 14, padding: '18px 24px', boxShadow: '0 12px 28px rgba(38,33,92,0.16)', width: 'fit-content' }}>
              <LabelText fs={36} hl={YEL}>Nome</LabelText>
              <InputBox w={300} fs={34} />
            </div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={400} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={hls} />
            </EditorWindow>
          </div>
          {/* ligação for <-> id */}
          <LinkPath ed={ed} from={[2, 14]} to={[3, 25.5]} viaLineTop={1} viaLineBottom={4} viaCol={45} p={rampF(frame, tSays, tSays + 24)} color={ORANGE} />
          <div style={abs(470, 470, { opacity: pairOn })}><Chip size={34} color={C.night} bg="#FFF4D6" border={ORANGE}>mesmo valor = ligados</Chip></div>
          <div style={abs(50, 470, { opacity: win(frame, tNotEnough, tId, 12) })}><Chip size={32} color={C.night} border={C.red}>não basta ficar perto</Chip></div>
          <div style={abs(50, 560, { opacity: win(frame, tLink, tId, 12) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>é preciso ligar os dois</Chip></div>
          <div style={abs(50, 470, { opacity: win(frame, tId, tSays, 12) })}><Chip size={30} color={C.night} border="#E8B860">no campo: <Tag color={C.purple}>id</Tag> = a identidade, única na página</Chip></div>
          <div style={abs(50, 560, { opacity: win(frame, tFor, tSays, 12) })}><Chip size={30} color={C.night} border="#E8B860">na label: <Tag color={C.purple}>for</Tag> = para, com o mesmo valor</Chip></div>
          <div style={abs(50, 600, { opacity: fadeIn(frame, tSays + 10, 12) })}>
            <Chip size={30} color={C.night} border={C.purple}>“eu sou o rótulo do campo com esse <Tag color={C.purple}>id</Tag>”</Chip>
          </div>
          <Label x={50} y={720} w={900} op={fadeIn(frame, tAttn, 12)} dark size={34}>os dois valores iguais, letra por letra</Label>
          {/* prévia */}
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={400} tabTitle="Sobre mim" url="index.html">
              <H2 fs={36}>{H2_FALE}</H2>
              <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ opacity: labOp }}><LabelText fs={34} hl={linked && pairOn > 0 ? PAIR : null}>Nome</LabelText></span>
                <InputBox w={380} fs={32} hl={linked && pairOn > 0 ? 'rgba(240,160,75,0.18)' : null} />
              </div>
            </BrowserMock>
          </div>
          <div style={abs(990, 480, { opacity: fadeIn(frame, tWrite + 26, 12) * (1 - fadeIn(frame, tUnique, 10)) })}><Chip size={30} color={C.night} border={C.purpleSoft}>o texto “Nome” aparece ao lado da caixinha</Chip></div>
          <div style={abs(990, 480, { opacity: win(frame, tUnique, tAttn, 12), width: 880, background: C.white, border: `4px solid ${C.purpleSoft}`, borderRadius: 22, padding: '18px 26px', boxSizing: 'border-box', fontFamily: FONT, boxShadow: '0 14px 30px rgba(38,33,92,0.14)' })}>
            <div style={{ fontSize: 24, color: C.purple, fontWeight: 700, marginBottom: 6 }}>lembra da aula 3?</div>
            <div style={{ fontSize: 32, color: C.night, fontWeight: 600 }}>o <Tag color={C.purple}>id</Tag> também serve de destino para links com <Tag color={C.purple}>#</Tag></div>
          </div>
          <div style={abs(990, 640, { opacity: fadeIn(frame, tSays + 16, 12), display: 'flex', alignItems: 'center', gap: 16 })}>
            <Check size={52} />
            <Chip size={30} color={C.night} border={ORANGE}>“Nome” ligado à caixinha</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
export const PorQue = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tThink = s('Você pode estar pensando')
  const tWhy = s('por que ligar')
  const tFirst = s('O primeiro você mesmo')
  const tClick = s('Clica no texto nome')
  const tLook = s('Repara: o cursor pula')
  const tLinked = s('Quando a lêibol está ligada')
  const tPhone = s('Isso ajuda muito no celular')
  const tFinger = s('e o dedo é grande')
  const tSecond = s('O segundo motivo')
  const tAnn = s('Quando a pessoa chega no campo')
  const tGood = s('nome, caixa de texto')
  const tNo = s('Sem a ligação')
  const tBad = s('ele diz só')
  const tLost = s('E a pessoa fica sem saber')
  const tTable = s('Lembra da tabela')
  const tCtx = s('O rótulo dá contexto')
  const tRule = s('Então, a regra é simples')
  const tR2 = s('e toda lêibol aponta')
  const blink = blinkOn(frame)
  const click = tClick + 24
  const focus = rampF(frame, click + 4, click + 8)
  const dark = win(frame, tSecond - 4, tRule, 14)
  const end = fadeIn(frame, tRule, 14)
  const tap = tFinger + 4
  const tapFocus = rampF(frame, tap + 6, tap + 10)
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - dark }}>
      <div style={abs(100, 60, { opacity: fadeIn(frame, tThink, 12) })}>
        <BrowserMock width={960} height={420} tabTitle="Sobre mim" url="index.html">
          <H2 fs={36}>{H2_FALE}</H2>
          <div style={{ marginTop: 50, display: 'flex', alignItems: 'center', gap: 16 }}>
            <LabelText fs={44} hl={frame >= click && frame < click + 30 ? YEL : null}>Nome</LabelText>
            <InputBox w={460} fs={40} focus={focus} caret={focus > 0 && blink} />
          </div>
          <div style={abs(28, 108)}>
            <MouseAt frame={frame} x={60} y={52} arrive={click} click={click} leave={click + 50} />
          </div>
        </BrowserMock>
      </div>
      <div style={abs(100, 520, { opacity: fadeIn(frame, tWhy, 12) * (1 - fadeIn(frame, tLook, 10)) })}><Chip size={32} color={C.night} border={C.purpleSoft}>o texto já está do lado... por que ligar?</Chip></div>
      <div style={abs(100, 520, { opacity: fadeIn(frame, tLook, 12) })}><Chip size={32} color={C.night} border={FOCUS_BORDER}>clicou no rótulo, foi para o campo</Chip></div>
      <div style={abs(100, 620, { opacity: fadeIn(frame, tLinked, 12) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>clicar no rótulo = clicar no campo</Chip></div>
      <div style={abs(100, 720, { opacity: fadeIn(frame, tFirst, 10) * (1 - fadeIn(frame, tClick, 8)) })}><Chip size={28} color={C.night} border={C.purple}>motivo 1: teste na prévia</Chip></div>
      {/* celular */}
      <div style={abs(1300, 60, { opacity: fadeIn(frame, tPhone, 12), transform: `translateY(${(1 - fadeIn(frame, tPhone, 12)) * 30}px)` })}>
        <PhoneMock w={320} h={560}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 30 }}>{H2_FALE}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LabelText fs={30}>Nome</LabelText>
            <InputBox w={150} fs={20} focus={tapFocus} caret={tapFocus > 0 && blink} />
          </div>
          <div style={abs(32, 106)}>
            <MouseAt frame={frame} x={30} y={20} arrive={tap} click={tap} leave={tap + 60} hand size={90} from={[60, 200]} />
          </div>
        </PhoneMock>
      </div>
      <div style={abs(1650, 300, { opacity: fadeIn(frame, tap + 16, 10) })}><Check size={80} /></div>
      <div style={abs(1180, 650, { opacity: fadeIn(frame, tPhone + 10, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>campo pequeno, dedo grande: o rótulo ajuda</Chip></div>
      </AbsoluteFill>
      {/* leitor de tela */}
      {dark > 0 && (
        <AbsoluteFill style={{ opacity: dark }}>
          <AbsoluteFill style={{ background: C.nightDeep, opacity: 0.96 }} />
          <div style={abs(860, 50)}><SpeakerIcon size={200} color={C.lavender} /></div>
          <div style={abs(380, 300, { display: 'flex', alignItems: 'center', gap: 22, opacity: fadeIn(frame, tAnn, 12) })}>
            <Chip size={28} color={C.white} bg={C.purple} border={C.lavender} style={{ width: 220, textAlign: 'center' }}>com ligação</Chip>
            <SpeechBubble text="Nome, caixa de texto" fs={40} icon={80} op={fadeIn(frame, tGood, 10)} />
            <div style={{ opacity: fadeIn(frame, tGood + 14, 8) }}><Check size={70} /></div>
          </div>
          <div style={abs(380, 470, { display: 'flex', alignItems: 'center', gap: 22, opacity: fadeIn(frame, tNo, 12) })}>
            <Chip size={28} color={C.night} bg={C.lavender} border={C.red} style={{ width: 220, textAlign: 'center' }}>sem ligação</Chip>
            <SpeechBubble text="Caixa de texto" fs={40} icon={80} op={fadeIn(frame, tBad, 10)} />
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ fontFamily: FONT, fontSize: 70, fontWeight: 800, color: C.purpleSoft, opacity: fadeIn(frame, tLost + i * 6, 8), transform: `rotate(${(i % 2 ? 1 : -1) * 12}deg)` }}>?</div>
            ))}
          </div>
          <div style={abs(380, 640, { opacity: fadeIn(frame, tTable, 12) })}>
            <Chip size={32} color={C.night} bg={C.lavender} border={C.purpleSoft}>como a <Tag color={C.purple}>{'<th>'}</Tag> na tabela{frame >= tCtx ? ': o rótulo dá contexto' : ''}</Chip>
          </div>
        </AbsoluteFill>
      )}
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background />
          <div style={abs(0, 250, { width: 1920, display: 'flex', justifyContent: 'center' })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: C.white, border: `6px solid ${C.purple}`, borderRadius: 34, padding: '40px 70px', boxShadow: '0 22px 50px rgba(38,33,92,0.2)', fontFamily: FONT, fontSize: 70, fontWeight: 700, color: C.night }}>
              <Check size={90} />todo campo tem um <Tag color={C.purple}>{'<label>'}</Tag>
            </div>
          </div>
          <div style={abs(0, 520, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tR2, 12) })}>
            <Chip size={44} color={C.white} bg={C.purple} border={C.night}>e toda <Tag>{'<label>'}</Tag> aponta para o seu campo</Chip>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}
