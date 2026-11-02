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
import { Loupe, SpeakerIcon } from '../../components/Icons.jsx'
import { ListGlyph } from '../n1-a05/ana.jsx'
import { Acronym, H2, Label, LinesBox, MouseAt, Warn, YEL, abs, blinkOn, edAt, rampF, win } from '../n1-a07/scenes-a.jsx'
import {
  TXT, REG, H2_FALE, MENU, AnaPage, ButtonBox, CodeCard, InputBox, LabelText, PageDiagram, PagePreview, RegTag, Robot, SHEETS, Sheet, SoupBowl,
  TextAreaBox, Tag, cardAt, tint, LAYOUT,
} from './ana.jsx'

export { Acronym, H2, Label, LinesBox, MouseAt, Warn, YEL, abs, blinkOn, edAt, rampF, win }

export const GRAY_HL = 'rgba(154,151,184,0.6)'
export const RED_HL = 'rgba(217,83,79,0.55)'
export const GOOD_HL = 'rgba(151,196,89,0.5)'
const pop = (frame, fps, t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })

// Destaques em todas as ocorrências de um trecho.
export const allOf = (code, text, at, color, until) => {
  const out = []
  let i = -1
  let occ = 0
  while ((i = code.indexOf(text, i + 1)) >= 0) out.push({ text, at, until, color, occurrence: occ++ })
  return out
}

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Na aula passada')
  const tSteps = s('a página da Ana aprendeu')
  const tPage = s('ganhou um formulário')
  const tPile = s('tudo está jogado')
  const tPapers = s('como uma pilha')
  const tToday = s('Hoje, a gente vai arrumar')
  const tDivide = s('Você vai aprender a dividir')
  const tR = [s('o topo, o menu'), s('o menu, o conteúdo'), s('o conteúdo principal'), s('as seções'), s('e o rodapé')]
  const tOut = s('Por fora, quase nada')
  const tIn = s('Mas, por dentro')
  const logoBig = 1 - rampF(frame, tTitle - 6, tTitle + 8)
  const logoSmall = rampF(frame, tTitle, tTitle + 14)
  const heights = [220, 270, 320, 370, 420]
  const pA = fadeIn(frame, tPage, 16)
  const A = { x: 980, y: 250, w: 520, h: 470 }
  const D = { x: 1545, y: 225, w: 335, h: 560 }
  // papéis soltos: aparecem em tPile..tPapers e voam para dentro do diagrama em tToday
  const fly = rampF(frame, tToday, tToday + 26)
  const sheetsOp = fadeIn(frame, tPile, 10) * (1 - rampF(frame, tToday + 14, tToday + 28))
  const spots = [[1560, 240, -8], [1690, 300, 7], [1580, 380, 4], [1700, 450, -10], [1570, 520, -3], [1690, 600, 9], [1600, 640, -6]]
  const targets = ['header', 'nav', 's1', 's2', 's2', 's3', 'footer']
  const names = { header: 'topo', nav: 'menu', main: 'conteúdo principal', s1: 'seção', s2: 'seção', s3: 'seção', footer: 'rodapé' }
  const dOp = {
    header: fadeIn(frame, tR[0], 10),
    nav: fadeIn(frame, tR[1], 10),
    main: fadeIn(frame, tR[2], 10),
    s1: fadeIn(frame, tR[3], 10),
    s2: fadeIn(frame, tR[3] + 5, 10),
    s3: fadeIn(frame, tR[3] + 10, 10),
    footer: fadeIn(frame, tR[4], 10),
  }
  const diagOp = fadeIn(frame, tToday + 10, 14)
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
        <Title start={tTitle} size={80}>Aula 8 — Tags semânticas</Title>
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
      {/* Sobre mim, da aula passada (com o formulário) */}
      <div style={abs(A.x, A.y, { opacity: pA, transform: `translateY(${(1 - pA) * 30}px)` })}>
        <BrowserMock width={A.w} height={A.h} tabTitle="Sobre mim" url="index.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{TXT.h1}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 18, marginBottom: 12 }}>{H2_FALE}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}><LabelText fs={20}>Nome</LabelText><InputBox w={220} fs={18} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}><LabelText fs={20}>E-mail</LabelText><InputBox w={220} fs={18} /></div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 12 }}><LabelText fs={20}>Mensagem</LabelText><TextAreaBox w={250} h={70} fs={16} /></div>
            <ButtonBox fs={20}>Enviar</ButtonBox>
          </div>
        </BrowserMock>
      </div>
      {/* pilha de papéis soltos */}
      {sheetsOp > 0 && SHEETS.map((t, i) => {
        const [x, y, r] = spots[i]
        const L = LAYOUT[targets[i]]
        const tx = D.x + L.x * D.w
        const ty = D.y + L.y * D.h
        const appear = fadeIn(frame, tPapers + i * 4, 8)
        return (
          <div key={t} style={abs(x + (tx - x) * fly, y + (ty - y) * fly, { opacity: sheetsOp * appear, transform: `scale(${1 - 0.4 * fly})`, transformOrigin: 'left top' })}>
            <Sheet text={t} w={170} h={110} rot={r * (1 - fly)} />
          </div>
        )
      })}
      <div style={abs(1545, 166, { opacity: fadeIn(frame, tPile + 6, 10) * (1 - fadeIn(frame, tToday, 8)) })}><Chip size={26} color={C.night} border={C.red}>tudo jogado em sequência</Chip></div>
      {/* as folhas viram regiões com significado */}
      <div style={abs(D.x, D.y, { opacity: diagOp })}>
        <PageDiagram w={D.w} h={D.h} m={1} fs={18} names={names} op={dOp} bars={false} />
      </div>
      <div style={abs(1545, 166, { opacity: fadeIn(frame, tDivide, 12) })}><Chip size={26} color={C.white} bg={C.purple} border={C.night}>regiões com significado</Chip></div>
      <Label x={A.x} y={846} w={895} op={fadeIn(frame, tDivide, 14) * (1 - fadeIn(frame, tOut, 8))} dark size={34}>o que a gente vai construir hoje</Label>
      <Label x={A.x} y={846} w={895} op={fadeIn(frame, tOut, 10) * (1 - fadeIn(frame, tIn, 8))} size={34} border={C.purple}>por fora, quase nada muda</Label>
      <Label x={A.x} y={846} w={895} op={fadeIn(frame, tIn, 10)} dark size={34}>por dentro, muito mais fácil de entender</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const SOUP = '<div>\n  <div><h1>Olá, eu sou a Ana</h1></div>\n  <div><a href="#quem-sou">Quem sou eu</a></div>\n  <div>\n    <div><h2>Quem sou eu</h2></div>\n  </div>\n  <div><p>Feito pela Ana</p></div>\n</div>'
export const Sopa = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tStart = s('Antes das tags novas')
  const tDiv = s('a dív. Ela')
  const tBox = s('Ela é uma caixa genérica')
  const tNothing = s('mas não diz nada')
  const tTopo = s('Uma dív para o topo')
  const tMenu = s('uma dív para o menu')
  const tTexto = s('uma dív para o texto')
  const tRod = s('uma dív para o rodapé')
  const tNest = s('E dív dentro de dív')
  const tSoup = s('Esse código ganhou até apelido')
  const tSoupW = s('sopa de dív.')
  const tBrowser = s('O navegador mostra')
  const tSame = s('para quem lê o código')
  const tHunt = s('Você precisa caçar pistas')
  const tSr = s('O leitor de tela')
  const tSol = s('A solução são as tags')
  const tNames = s('que são caixas com nome')
  const ed = { x: 50, y: 40, fs: 28 }
  const L = SOUP.split('\n')
  const segs = [
    { text: L[0], start: tDiv, frames: 6 },
    { text: '\n' + L[1], start: tTopo, frames: 14 },
    { text: '\n' + L[2], start: tMenu, frames: 14 },
    { text: '\n' + L[3] + '\n' + L[4] + '\n' + L[5], start: tTexto, frames: 18 },
    { text: '\n' + L[6], start: tRod, frames: 14 },
    { text: '\n' + L[7], start: tNest - 4, frames: 6 },
  ]
  const grayOn = tNest + 6
  const hls = [...allOf(SOUP, 'div', grayOn, GRAY_HL, tSol + 10), ...allOf(SOUP, 'div', tSol + 10, 'rgba(127,119,221,0.6)')]
  const m = rampF(frame, tSol + 4, tSol + 30)
  const dOp = {
    header: fadeIn(frame, tTopo, 10),
    nav: fadeIn(frame, tMenu, 10),
    main: fadeIn(frame, tTexto, 10),
    s1: fadeIn(frame, tNest, 10),
    s2: fadeIn(frame, tNest + 8, 10),
    s3: fadeIn(frame, tNest + 16, 10),
    footer: fadeIn(frame, tRod, 10),
  }
  // lupa caçando pistas pelo código
  const lp = rampF(frame, tHunt - 10, tSr - 10)
  const lx = 120 + 620 * (0.5 - 0.5 * Math.cos(lp * Math.PI * 2))
  const ly = 110 + 260 * lp
  const loupeOp = win(frame, tBrowser + 10, tSr, 10)
  const soup = win(frame, tSoup, tBrowser, 12)
  const sr = win(frame, tSr, tSol, 12)
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tStart, 12) })}>
        <EditorWindow width={900} height={470} filename="index.html">
          <CodeTyping segments={segs} fontSize={ed.fs} highlights={hls} />
        </EditorWindow>
      </div>
      <div style={abs(50, 540, { opacity: win(frame, tBox, tSoup, 12), display: 'flex', flexDirection: 'column', gap: 18 })}>
        <Chip size={32} color={C.night} border={REG.div}><Tag color={C.purple}>{'<div>'}</Tag>: uma caixa genérica, que agrupa</Chip>
        <div style={{ opacity: fadeIn(frame, tNothing, 12) }}><Chip size={32} color={C.night} border={C.red}>mas não diz o que tem dentro</Chip></div>
        <div style={{ opacity: fadeIn(frame, tNest, 12) }}><Chip size={32} color={C.night} border={REG.div}>div dentro de div, dentro de div...</Chip></div>
      </div>
      {/* sopa de div */}
      {soup > 0 && (
        <div style={{ opacity: soup }}>
          <div style={abs(110, 560)}><SoupBowl w={380} fill={rampF(frame, tSoup, tSoupW + 10)} t={frame} /></div>
          <Label x={520} y={640} w={400} op={fadeIn(frame, tSoupW, 12)} dark size={40}>sopa de div</Label>
        </div>
      )}
      {/* lupa: onde está o menu? */}
      {loupeOp > 0 && (
        <div style={{ opacity: loupeOp }}>
          <div style={abs(lx, ly)}><Loupe text="?" size={110} /></div>
          <div style={abs(50, 560, { display: 'flex', flexDirection: 'column', gap: 18 })}>
            <Chip size={32} color={C.night} border={C.purpleSoft}>na tela: tudo certo</Chip>
            <div style={{ opacity: fadeIn(frame, tSame, 12) }}><Chip size={32} color={C.night} border={REG.div}>no código: é tudo igual</Chip></div>
            <div style={{ opacity: fadeIn(frame, tHunt, 12) }}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>onde está o menu?</Chip></div>
          </div>
        </div>
      )}
      {/* leitor de tela e buscador também ficam perdidos */}
      {sr > 0 && (
        <div style={abs(60, 560, { opacity: sr, display: 'flex', alignItems: 'center', gap: 40 })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SpeakerIcon size={130} />
            <div style={{ fontFamily: FONT, fontSize: 90, fontWeight: 800, color: C.purpleSoft }}>?</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: fadeIn(frame, tSr + 12, 10) }}>
            <Robot size={150} />
            <div style={{ fontFamily: FONT, fontSize: 90, fontWeight: 800, color: C.purpleSoft }}>?</div>
          </div>
        </div>
      )}
      <div style={abs(60, 760, { opacity: win(frame, tSr + 16, tSol, 12) })}><Chip size={28} color={C.night} border={C.red}>leitor de tela e buscadores: o que é cada parte?</Chip></div>
      <div style={abs(50, 600, { opacity: fadeIn(frame, tSol, 12) })}>
        <Chip size={34} color={C.white} bg={C.purple} border={C.night}>a solução: tags semânticas</Chip>
        <div style={{ marginTop: 22, opacity: fadeIn(frame, tNames, 12) }}><Chip size={32} color={C.night} border={C.purple}>caixas com nome e com significado</Chip></div>
      </div>
      {/* diagrama: caixas cinzas -> regiões com nome */}
      <div style={abs(1080, 40, { opacity: fadeIn(frame, tTopo, 12) })}>
        <PageDiagram w={720} h={680} m={m} op={dOp} fs={26} />
      </div>
      <Label x={1080} y={760} w={720} op={fadeIn(frame, tNames + 6, 12)} dark size={36}>semântica = significado</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
const HDR_IMG = '\n    <img src="imagens/foto-ana.jpg"\n         alt="Ana sorrindo, com um caderno de anotações na mão"\n         width="200" height="200">'
const SKEL = '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <title>Sobre mim</title>\n</head>\n<body>\n  <header>...</header>\n</body>\n</html>'
export const HeaderScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tFirst = s('A primeira tag semântica')
  const tMeans = s('que quer dizer cabeçalho')
  const tTop = s('Ela guarda o topo')
  const tUsual = s('Normalmente, é ali')
  const tH1 = s('o agá um, às vezes')
  const tImg = s('às vezes uma imagem')
  const tPhrase = s('e uma frase curta')
  const tAna = s('No caso da Ana')
  const tH1b = s('guarda o agá um, olá')
  const tFoto = s('e a foto de perfil')
  const tImportant = s('Repara numa coisa importante')
  const tHeadTag = s('que a tag head')
  const tHeadInv = s('A head guarda informações')
  const tBody = s('Já a rédêr fica dentro')
  const tNames = s('Os nomes parecem')
  const tRemember = s('Na dúvida, lembre')
  const A = win(frame, 0, tAna, 14)
  const B = win(frame, tAna - 4, tImportant, 14)
  const Cc = rampF(frame, tImportant - 4, tImportant + 10)
  const ed = { x: 50, y: 40, fs: 26 }
  const segs = [
    { text: '<body>', start: 0, frames: 0 },
    { text: '\n  <header>', start: tAna + 6, frames: 8 },
    { text: `\n    <h1>${TXT.h1}</h1>`, start: tH1b + 2, frames: 16 },
    { text: HDR_IMG, start: tFoto + 2, frames: 28 },
    { text: '\n  </header>', start: tAna + 16, frames: 8 },
  ]
  const h1Op = rampF(frame, tH1b + 18, tH1b + 22)
  const imgOp = rampF(frame, tFoto + 30, tFoto + 36)
  const hdrF = fadeIn(frame, tFoto + 40, 12)
  const card = { x: 120, y: 130, fs: 32 }
  const ph = cardAt(card, 2, 0)
  const pb = cardAt(card, 6, 0)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(140, 110)}>
            <Acronym word="header" keys={[0, 1, 2, 3, 4, 5]} tag="header" meaning="cabeçalho" op={fadeIn(frame, tFirst, 12)} defOp={fadeIn(frame, tMeans, 12)} />
          </div>
          <div style={abs(140, 420, { display: 'flex', flexDirection: 'column', gap: 20 })}>
            <div style={{ opacity: fadeIn(frame, tTop, 12) }}><Chip size={34} color={C.white} bg={REG.header} border={C.night}>o topo da página, lá em cima</Chip></div>
            <div style={{ opacity: fadeIn(frame, tUsual, 12) }}><Chip size={28} color={C.purple} bg="transparent" border="transparent" style={{ padding: 0 }}>normalmente, ali ficam:</Chip></div>
            <div style={{ opacity: fadeIn(frame, tH1, 12) }}><Chip size={30} color={C.night} border={REG.header}>o título principal, o <Tag color={C.purple}>{'<h1>'}</Tag></Chip></div>
            <div style={{ opacity: fadeIn(frame, tImg, 12) }}><Chip size={30} color={C.night} border={REG.header}>às vezes, uma imagem ou um logo</Chip></div>
            <div style={{ opacity: fadeIn(frame, tPhrase, 12) }}><Chip size={30} color={C.night} border={REG.header}>uma frase curta de apresentação</Chip></div>
          </div>
          <div style={abs(1160, 60, { opacity: fadeIn(frame, tFirst + 10, 12) })}>
            <PageDiagram w={600} h={680} fs={24} hl={{ header: fadeIn(frame, tTop, 12) }} dim={{ nav: fadeIn(frame, tTop, 12), main: fadeIn(frame, tTop, 12), s1: fadeIn(frame, tTop, 12), s2: fadeIn(frame, tTop, 12), s3: fadeIn(frame, tTop, 12), footer: fadeIn(frame, tTop, 12) }} />
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1010} height={400} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={[{ text: '<header>', at: tFoto + 40, color: tint(REG.header, 0.6) }, { text: '</header>', at: tFoto + 40, color: tint(REG.header, 0.6) }]} />
            </EditorWindow>
          </div>
          <div style={abs(1100, 40)}>
            <PagePreview w={770} h={560}>
              <AnaPage fs={22} nav="none" show={{ main: 0, footer: 0 }} parts={{ h1: h1Op, img: imgOp }} fr={{ header: hdrF }} fill={{ header: hdrF }} />
            </PagePreview>
          </div>
          <div style={abs(50, 480, { opacity: fadeIn(frame, tAna + 10, 12) })}><Chip size={32} color={C.night} border={REG.header}>logo depois do <Tag color={C.purple}>{'<body>'}</Tag></Chip></div>
          <div style={abs(50, 580, { opacity: fadeIn(frame, tFoto + 8, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>a foto de perfil, da aula 4</Chip></div>
          <div style={abs(1100, 650, { opacity: hdrF })}><Chip size={32} color={C.white} bg={REG.header} border={C.night}>o topo ganhou uma moldura: <Tag>header</Tag></Chip></div>
        </div>
      )}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(120, 40, { opacity: fadeIn(frame, tImportant, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">os nomes parecem, mas são tags diferentes</Chip></div>
          <CodeCard x={card.x} y={card.y} fs={card.fs} text={SKEL} highlights={[{ text: '<head>', at: tHeadTag, color: YEL }, { text: '</head>', at: tHeadTag, color: YEL }, { text: '<header>...</header>', at: tBody, color: tint(REG.header, 0.6) }, { text: '<body>', at: tBody + 8, color: 'rgba(127,119,221,0.35)' }]} />
          {/* cartões */}
          <div style={abs(1080, 150, { opacity: fadeIn(frame, tHeadTag, 12), width: 740, background: C.white, border: '4px solid #E8B860', borderRadius: 22, padding: '20px 28px', boxSizing: 'border-box', fontFamily: FONT, boxShadow: '0 14px 30px rgba(38,33,92,0.14)' })}>
            <div style={{ fontSize: 40, fontWeight: 700, color: C.night }}><Tag color={C.purple}>{'<head>'}</Tag></div>
            <div style={{ fontSize: 30, color: C.night, marginTop: 6, opacity: fadeIn(frame, tHeadInv, 12) }}>informações invisíveis, fora da tela</div>
            <div style={{ marginTop: 14, opacity: fadeIn(frame, tHeadInv + 16, 12), display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 24, color: C.purple, fontWeight: 600 }}>ex.: o título da aba</span>
              <span style={{ background: '#DDDAF6', borderRadius: '12px 12px 0 0', padding: '6px 20px', fontSize: 22, color: C.night }}>Sobre mim</span>
            </div>
          </div>
          <div style={abs(1080, 470, { opacity: fadeIn(frame, tBody, 12), width: 740, background: C.white, border: `4px solid ${REG.header}`, borderRadius: 22, padding: '20px 28px', boxSizing: 'border-box', fontFamily: FONT, boxShadow: '0 14px 30px rgba(38,33,92,0.14)' })}>
            <div style={{ fontSize: 40, fontWeight: 700, color: C.night }}><Tag color={C.purple}>{'<header>'}</Tag></div>
            <div style={{ fontSize: 30, color: C.night, marginTop: 6 }}>o topo visível, dentro do <Tag color={C.purple}>{'<body>'}</Tag></div>
          </div>
          <ArrowLine x1={1074} y1={240} x2={650} y2={ph.y + 50} p={rampF(frame, tHeadTag + 10, tHeadTag + 26)} color="#E8B860" bend={20} />
          <ArrowLine x1={1074} y1={540} x2={650} y2={pb.y} p={rampF(frame, tBody + 10, tBody + 26)} color={REG.header} bend={-20} />
          <div style={abs(120, 650, { opacity: fadeIn(frame, tNames, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>nomes parecidos, trabalhos bem diferentes</Chip></div>
          <Label x={120} y={750} w={1700} op={fadeIn(frame, tRemember, 12)} dark size={40}><Tag>header</Tag> é o topo que a pessoa vê</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
const NAV_HEAD = `<header>\n  <h1>${TXT.h1}</h1>\n  <img src="imagens/foto-ana.jpg" ...>`
const OLD_P = '\n  <p><a href="#quem-sou">Quem sou eu</a> · ...</p>'
const LI = MENU.map((m) => `\n      <li><a href="#${m.id}">${m.t}</a></li>`)
// Caixas aninhadas nav > ul > li > a.
const Nest = ({ op = [1, 1, 1, 1], w = 760 }) => {
  const box = (name, color, o, children, extra) => (
    <div style={{ position: 'relative', border: `4px solid ${color}`, borderRadius: 16, background: tint(color, 0.1), padding: '34px 18px 14px', opacity: o, ...extra }}>
      <div style={{ position: 'absolute', left: 14, top: 4 }}><RegTag name={name} color={color} fs={22} /></div>
      {children}
    </div>
  )
  return (
    <div style={{ width: w }}>
      {box('nav', REG.nav, op[0], box('ul', C.purpleSoft, op[1], (
        <div style={{ display: 'flex', gap: 14 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ flex: 1 }}>{box('li', REG.section, op[2], box('a', C.link, op[3], <div style={{ height: 6 }} />, { padding: '30px 10px 6px' }), { padding: '32px 10px 10px' })}</div>)}
        </div>
      )))}
    </div>
  )
}
export const NavScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tBelow = s('Logo abaixo do topo')
  const tAula3 = s('Da aula três')
  const tMenu = s('Esse conjunto de links é um menu')
  const tNav = s('a név, de navegação')
  const tSays = s('A név diz')
  const tWay = s('E tem um jeito muito comum')
  const tList = s('uma lista. Isso')
  const tUl = s('a u éle da aula cinco')
  const tLi = s('Cada item do menu vira')
  const tA = s('e dentro de cada éle í vai um link')
  const tWrite = s('Assim, a Ana escreve')
  const tNavW = s('név, dentro dela')
  const tUlW = s('uma u éle, e dentro')
  const tI = [s('quem sou eu, o que'), s('o que estou aprendendo e fale'), s('e fale comigo')]
  const tSense = s('Faz sentido')
  const tPlaces = s('uma lista de lugares')
  const A = win(frame, 0, tWrite, 14)
  const B = rampF(frame, tWrite - 4, tWrite + 10)
  const ed = { x: 50, y: 40, fs: 25 }
  const delAt = tWrite + 16
  const segs = frame < delAt
    ? [{ text: NAV_HEAD + OLD_P + '\n</header>', start: 0, frames: 0 }]
    : [
      { text: NAV_HEAD, start: 0, frames: 0 },
      { text: '\n  <nav>', start: tNavW + 2, frames: 6 },
      { text: '\n    <ul>', start: tUlW + 2, frames: 6 },
      { text: LI[0], start: tI[0] + 2, frames: 16 },
      { text: LI[1], start: tI[1] + 2, frames: 18 },
      { text: LI[2], start: tI[2] + 2, frames: 14 },
      { text: '\n    </ul>', start: tUlW + 10, frames: 6 },
      { text: '\n  </nav>', start: tNavW + 10, frames: 6 },
      { text: '\n</header>', start: 0, frames: 0 },
    ]
  const blink = blinkOn(frame)
  const full = segs.map((g) => g.text).join('')
  const listBlink = frame >= tI[2] + 24 && frame < tSense + 50
  const hrefBlink = frame >= tSense + 50
  const hls = [
    ...(frame < delAt ? [{ text: OLD_P.trim(), at: tWrite + 2, color: RED_HL }] : []),
    { text: '<nav>', at: tNavW + 10, color: tint(REG.nav, 0.55) },
    { text: '</nav>', at: tNavW + 10, color: tint(REG.nav, 0.55) },
    ...(listBlink && blink ? [...allOf(full, '<ul>', 0, YEL), ...allOf(full, '</ul>', 0, YEL), ...allOf(full, '<li>', 0, YEL), ...allOf(full, '</li>', 0, YEL)] : []),
    ...(hrefBlink && blink ? MENU.map((m) => ({ text: `href="#${m.id}"`, at: 0, color: 'rgba(240,160,75,0.6)' })) : []),
  ]
  const navMode = frame < delAt ? 'old' : 'list'
  const navOp = tI.map((t) => rampF(frame, t + 14, t + 20))
  const navF = fadeIn(frame, tNavW + 12, 12)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(80, 50, { opacity: fadeIn(frame, tBelow, 12) })}>
            <PagePreview w={820} h={430}>
              <AnaPage fs={22} nav="old" show={{ main: 0, footer: 0 }} />
            </PagePreview>
          </div>
          <div style={abs(80, 510, { opacity: fadeIn(frame, tAula3, 12) })}>
            <div style={{ fontFamily: FONT, fontSize: 26, color: C.purple, fontWeight: 700, marginBottom: 10 }}>aula 3: links com #id</div>
            <CodeCard x={0} y={40} fs={28} text={'<a href="#quem-sou">Quem sou eu</a>'} highlights={[{ text: 'href="#quem-sou"', at: tAula3 + 10, color: 'rgba(240,160,75,0.6)' }]} />
          </div>
          <div style={abs(80, 700, { opacity: fadeIn(frame, tMenu, 12) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>esse conjunto de links é um menu</Chip></div>
          <div style={abs(1040, 50)}>
            <Acronym word="navegação" keys={[0, 1, 2]} tag="nav" meaning="navegação" op={fadeIn(frame, tNav - 6, 12)} defOp={fadeIn(frame, tNav + 10, 12)} />
          </div>
          <div style={abs(1040, 320, { opacity: fadeIn(frame, tSays, 12) })}><Chip size={30} color={C.night} border={REG.nav}>“aqui estão os caminhos principais do site”</Chip></div>
          <div style={abs(1040, 420, { opacity: fadeIn(frame, tList, 12), display: 'flex', alignItems: 'center', gap: 16 })}>
            <ListGlyph size={70} />
            <Chip size={30} color={C.night} border={C.purpleSoft}>por dentro, uma lista{frame >= tUl ? <> — <Tag color={C.purple}>{'<ul>'}</Tag>, aula 5</> : ''}</Chip>
          </div>
          <div style={abs(1040, 530, { opacity: fadeIn(frame, tWay, 12) })}>
            <Nest w={800} op={[1, fadeIn(frame, tUl, 10), fadeIn(frame, tLi, 10), fadeIn(frame, tA, 10)]} />
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={960} height={560} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={hls} />
            </EditorWindow>
          </div>
          <div style={abs(50, 640, { opacity: win(frame, tWrite + 2, delAt + 20, 8) })}><Chip size={30} color={C.night} border={C.red}>sai o parágrafo de links...</Chip></div>
          <div style={abs(50, 640, { opacity: fadeIn(frame, delAt + 20, 10) * (1 - fadeIn(frame, tI[2] + 24, 8)) })}><Chip size={30} color={C.night} border={REG.nav}>...entra a <Tag color={C.purple}>{'<nav>'}</Tag> com uma lista</Chip></div>
          <div style={abs(50, 640, { opacity: listBlink ? 1 : 0, display: 'flex', alignItems: 'center', gap: 14 })}>
            <ListGlyph size={60} />
            <Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">aula 5: listas (<Tag color={C.purple}>ul</Tag> e <Tag color={C.purple}>li</Tag>)</Chip>
          </div>
          <div style={abs(50, 640, { opacity: hrefBlink ? 1 : 0 })}><Chip size={30} color={C.night} bg="#FFF4D6" border={'#F0A04B'}>aula 3: links com <Tag color={C.purple}>#id</Tag></Chip></div>
          <div style={abs(1040, 40)}>
            <PagePreview w={830} h={560}>
              <AnaPage fs={22} nav={navMode} navOp={navOp} show={{ main: 0, footer: 0 }} fr={{ nav: navF }} fill={{ nav: navF }} />
            </PagePreview>
          </div>
          <div style={abs(1040, 640, { opacity: fadeIn(frame, tPlaces, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
            <Check size={52} />
            <Chip size={30} color={C.white} bg={C.purple} border={C.night}>menu = uma lista de lugares para ir</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
const MAIN_LINES = [
  '<h2 id="quem-sou">Quem sou eu</h2>',
  '<p>Trabalho no atendimento...</p>',
  '<h2 id="aprendendo">O que estou aprendendo</h2>',
  '<ul>...</ul>',
  '<table>...</table>',
  `<h2 id="contato">${H2_FALE}</h2>`,
  '<form>...</form>',
]
const TWO_MAINS = {
  header: { ...LAYOUT.header, h: 0.14 },
  main: { x: 0.04, y: 0.2, w: 0.92, h: 0.3, name: 'main', box: false },
  main2: { x: 0.04, y: 0.53, w: 0.92, h: 0.3, name: 'main', color: REG.main, box: false },
  footer: { ...LAYOUT.footer, y: 0.87 },
}
const ONE_MAIN = {
  header: { ...LAYOUT.header, h: 0.14 },
  main: { x: 0.04, y: 0.2, w: 0.92, h: 0.63, name: 'main', box: false },
  footer: { ...LAYOUT.footer, y: 0.87 },
}
export { TWO_MAINS, ONE_MAIN }
export const MainScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tNow = s('Agora vem a parte')
  const tTag = s('Para ele existe a tag mêin')
  const tMeans = s('que quer dizer principal')
  const tInside = s('Dentro da mêin vai')
  const tOnly = s('que só existe nesta página')
  const tAna = s('No caso da Ana')
  const tTexto = s('é o texto sobre ela')
  const tLista = s('a lista do que está')
  const tTabela = s('a tabela de estudos')
  const tForm = s('e o formulário')
  const tOut = s('O topo e o rodapé')
  const tRepeat = s('que costumam se repetir')
  const tGold = s('E aqui vai a regra de ouro')
  const tOne = s('só uma por página')
  const tTwo = s('Uma página não pode ter')
  const tIf = s('Se tivesse')
  const tStruct = s('Então, a estrutura')
  const tH = s('primeiro a rédêr')
  const tM = s('depois a mêin')
  const tF = s('e, no final, o rodapé')
  const A = win(frame, 0, tGold, 14)
  const B = rampF(frame, tGold - 4, tGold + 10)
  const ed = { x: 50, y: 40, fs: 26 }
  const segs = [
    { text: '<header>\n  ...\n</header>', start: 0, frames: 0 },
    { text: '\n<main>', start: tInside + 2, frames: 6 },
    ...MAIN_LINES.flatMap((ln, i) => [
      { text: '\n', start: 0, frames: 0 },
      { text: '  ', start: tInside + 12 + i * 3, frames: 2 },
      { text: ln, start: 0, frames: 0 },
    ]),
    { text: '\n</main>', start: tInside + 6, frames: 6 },
  ]
  const mainHl = tint(REG.main, 0.55)
  const hls = [
    { text: '<main>', at: tInside + 10, color: mainHl },
    { text: '</main>', at: tInside + 10, color: mainHl },
    { text: '<p>Trabalho no atendimento...</p>', at: tTexto, until: tOut, color: YEL },
    { text: '<ul>...</ul>', at: tLista, until: tOut, color: YEL },
    { text: '<table>...</table>', at: tTabela, until: tOut, color: YEL },
    { text: '<form>...</form>', at: tForm, until: tOut, color: YEL },
  ]
  const mainF = fadeIn(frame, tInside + 20, 12)
  const outOp = fadeIn(frame, tOut, 12)
  // prévia: rola pelo conteúdo e depois afasta para mostrar a página inteira
  const pScroll = interpolate(frame, [tAna, tForm + 20], [0, 0.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const accOp = win(frame, tTag - 8, tInside + 6, 12)
  const prevOp = fadeIn(frame, tInside + 4, 12)
  const skel = [['header', REG.header, tH], ['main', REG.main, tM], ['footer', REG.footer, tF]]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tNow, 12) })}>
            <EditorWindow width={900} height={560} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={hls} />
            </EditorWindow>
          </div>
          <LinesBox ed={ed} l0={0} l1={2} c0={0} c1={9} op={outOp} color={REG.div} fill="rgba(154,151,184,0.18)" />
          <div style={abs(50, 640, { opacity: fadeIn(frame, tNow + 10, 12) * (1 - fadeIn(frame, tInside, 8)) })}><Chip size={32} color={C.night} border={REG.main}>a parte mais importante: o conteúdo principal</Chip></div>
          <div style={abs(50, 640, { opacity: win(frame, tInside, tOut, 12) })}><Chip size={30} color={C.night} border={REG.main}>só existe nesta página: o motivo da visita</Chip></div>
          <div style={abs(50, 640, { opacity: outOp })}><Chip size={30} color={C.night} border={REG.div}>topo e rodapé se repetem: ficam de fora</Chip></div>
          {/* sigla */}
          {accOp > 0 && (
            <div style={abs(1080, 160, { opacity: accOp })}>
              <Acronym word="main" keys={[0, 1, 2, 3]} tag="main" meaning="principal" op={fadeIn(frame, tTag - 6, 12)} defOp={fadeIn(frame, tMeans, 12)} size={120} />
            </div>
          )}
          {/* prévia */}
          <div style={abs(990, 40, { opacity: prevOp })}>
            <div style={{ opacity: 1 - outOp }}>
              <PagePreview w={880} h={600} p={pScroll}>
                <AnaPage fs={20} fr={{ main: mainF }} fill={{ main: mainF * 0.6 }} />
              </PagePreview>
            </div>
          </div>
          {outOp > 0 && (
            <div style={abs(1150, 40, { opacity: outOp })}>
              <PageDiagram w={560} h={600} fs={24} sections={false} hl={{ main: 1 }} dim={{ header: 0.7, nav: 0.7, footer: 0.7 }} />
            </div>
          )}
          <div style={abs(990, 680, { opacity: fadeIn(frame, tInside + 24, 12) * (1 - outOp) })}><Chip size={30} color={C.white} bg={REG.main} border={C.night}>uma moldura grande no meio: <Tag>main</Tag></Chip></div>
          <div style={abs(990, 680, { opacity: fadeIn(frame, tRepeat, 12) })}><Chip size={28} color={C.night} border={REG.div}><Tag color={C.purple}>header</Tag> e <Tag color={C.purple}>footer</Tag>: fora da <Tag color={C.purple}>main</Tag></Chip></div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(160, 40, { display: 'flex', alignItems: 'center', gap: 18, opacity: fadeIn(frame, tGold, 12) })}>
            <Warn size={56} />
            <Chip size={34} color={C.night} bg="#FFF4D6" border="#E8B860">a regra de ouro da <Tag color={C.purple}>main</Tag></Chip>
          </div>
          <div style={abs(160, 150, { opacity: fadeIn(frame, tOne - 6, 12) })}>
            <PageDiagram w={460} h={560} regions={TWO_MAINS} fs={24} />
          </div>
          <div style={abs(560, 360, { opacity: fadeIn(frame, tOne + 6, 8), transform: `scale(${0.6 + 0.4 * pop(frame, fps, tOne + 6)})` })}><Cross size={110} /></div>
          <Label x={160} y={740} w={460} op={fadeIn(frame, tOne + 10, 12)} size={34} border={C.red}>só uma por página</Label>
          <div style={abs(720, 220, { opacity: fadeIn(frame, tTwo, 12), width: 580 })}>
            <Chip size={30} color={C.night} border={C.red}>dois conteúdos principais?</Chip>
            <div style={{ marginTop: 20, opacity: fadeIn(frame, tIf, 12) }}><Chip size={30} color={C.night} border={C.purpleSoft}>nenhum seria principal de verdade</Chip></div>
          </div>
          {/* esqueleto */}
          <div style={abs(1340, 120, { opacity: fadeIn(frame, tStruct, 12) })}>
            <div style={{ fontFamily: FONT, fontSize: 30, color: C.purple, fontWeight: 700, marginBottom: 20 }}>a estrutura da Ana</div>
            {skel.map(([name, color, t], i) => (
              <div key={name} style={{ opacity: fadeIn(frame, t, 10), transform: `translateY(${(1 - fadeIn(frame, t, 10)) * 16}px)` }}>
                {i > 0 && <div style={{ fontFamily: FONT, fontSize: 44, color: C.purpleSoft, textAlign: 'center', width: 380, lineHeight: 1.2 }}>↓</div>}
                <div style={{ width: 380, height: name === 'main' ? 200 : 90, borderRadius: 18, border: `5px solid ${color}`, background: tint(color, 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                  <RegTag name={name} color={color} fs={40} />
                </div>
              </div>
            ))}
          </div>
          <div style={abs(1300, 720, { opacity: fadeIn(frame, tF + 14, 12) })}><Chip size={26} color={C.night} border={REG.footer}>o rodapé vem daqui a pouco</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}
