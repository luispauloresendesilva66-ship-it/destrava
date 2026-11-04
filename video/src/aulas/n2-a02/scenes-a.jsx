import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { Check, Chip } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { Code, CodeChip, EditorTabs, Preview } from '../../components/CssCode.jsx'
import { LessonTag } from '../n1-a09/ana.jsx'
import { PageCss } from '../n2-a01/css.jsx'
import { HEX, Label, Warn, YEL, abs, edAt, mix, pop, rampF, typeSpeed, win } from '../n2-a01/scenes-a.jsx'
import { CSS_A1, PageSel } from './page.jsx'

export { HEX, Label, Warn, YEL, abs, edAt, mix, pop, rampF, typeSpeed, win }

// ---------------------------------------------------------------- o estilo.css da Ana ao longo da aula
export const RULES = [
  { k: 'h1', t: 'h1 {\n  color: navy;\n}' },
  { k: 'body', t: 'body {\n  background-color: lightyellow;\n}' },
  { k: 'pfs', t: 'p {\n  font-size: 18px;\n}' },
  { k: 'pnavy', t: 'p {\n  color: navy;\n}' }, // Bloco 2
  { k: 'dest', t: '.destaque {\n  color: purple;\n}' }, // Bloco 3
  { k: 'contato', t: '#contato {\n  background-color: white;\n}' }, // Bloco 5
  { k: 'h1h2', t: 'h1, h2 {\n  color: navy;\n}' }, // Bloco 7
  { k: 'nava', t: 'nav a {\n  color: tomato;\n}' }, // Bloco 8
]
// O arquivo até a regra k (inclusive).
export const cssUpTo = (k) => RULES.slice(0, RULES.findIndex((r) => r.k === k) + 1).map((r) => r.t).join('\n\n')
export const lineOfRule = (k) => cssUpTo(k).split('\n').length - 3 // primeira linha (0-based) da regra k

// Segmentos: trecho fixo, partes digitadas [[texto, início], ...], trecho fixo.
export const typed = (pre, parts, post = '') => [
  { text: pre, start: 0, frames: 0 },
  ...parts.map(([t, at]) => ({ text: t, start: at, frames: typeSpeed(t.trim().length) })),
  { text: post, start: 0, frames: 0 },
]
// Só as últimas linhas do arquivo (com a numeração real).
export const tailNumbers = (from, n = 60) => Array.from({ length: n }, (_, i) => from + 1 + i)
export const tailOf = (text, from) => text.split('\n').slice(from).join('\n')

// Geometria comum: editor à esquerda, prévia à direita.
export const ED = { x: 40, y: 30, fs: 26 }
export const ED_W = 1020
export const ED_H = 840
export const PV = { x: 1090, y: 30, w: 790, h: 700 }
export const PVZ = 1.1

export const GRAY_X = ({ size = 90, op = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ opacity: op }}>
    <circle cx="32" cy="32" r="30" fill="#9A97B8" />
    <path d="M21 21 L43 43 M43 21 L21 43" fill="none" stroke={C.white} strokeWidth="7" strokeLinecap="round" />
  </svg>
)

// Moldura que pisca no "salvou" da prévia.
const SaveFlash = ({ frame, at, w = PV.w, h = PV.h }) => (frame >= at && frame < at + 16 ? <div style={abs(0, 0, { width: w, height: h, borderRadius: 18, boxShadow: `inset 0 0 0 ${6 * (1 - (frame - at) / 16)}px ${C.purpleSoft}` })} /> : null)
export { SaveFlash }

// Caractere piscando no editor (marcador amarelo).
export const CharMark = ({ ed, line, col, n = 1, on, color = '#FFD28A' }) => {
  if (!on) return null
  const a = edAt(ed, line, col)
  return <div style={abs(a.x - 4, a.y - ed.fs * 0.8, { width: ed.fs * 0.55 * n + 8, height: ed.fs * 1.6, borderRadius: 8, border: `4px solid ${color}`, boxShadow: `0 0 18px ${color}` })} />
}
export const blinking = (frame, a, b, period = 8) => frame >= a && frame < b && Math.floor((frame - a) / period) % 2 === 0

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tPast = s('Na aula passada')
  const tColors = s('a página da Ana ganhou')
  const tRev = s('Você viu que toda regra')
  const tSel = s('tem um seletor')
  const tDecl = s('as declarações')
  const tLink = s('E ligou o arquivo')
  const tLinkTag = s('com a tag línk')
  const tQ = s('Mas ficou uma pergunta')
  const tOne = s('e se a Ana quiser pintar')
  const tToday = s('Hoje, você vai aprender')
  const tThree = s('São três tipos')
  const tT = [s('por tag'), s('por classe'), s('por ái di')]
  const tThen = s('Depois, você vai juntar')
  const tX = [s('juntar seletores com vírgula'), s('mirar um elemento'), s('entender quem vence')]
  const tBye = s('Abre o editor')
  const logoBig = 1 - rampF(frame, tPast - 8, tPast + 4)
  const logoSmall = rampF(frame, tPast, tPast + 14)
  const A = fadeIn(frame, tColors, 12) * (1 - rampF(frame, tQ - 6, tQ + 6))
  const B = rampF(frame, tQ - 6, tQ + 6) * (1 - rampF(frame, tToday - 6, tToday + 6))
  const Cc = rampF(frame, tToday - 6, tToday + 6)
  // a regra da aula 1, com as etiquetas
  const RX = 556
  const RY = 200
  const RF = 72
  const cw = RF * 0.55
  const colX = (c) => RX + 28 + c * cw
  const flashOp = frame >= tOne ? 0.55 + 0.45 * Math.sin((frame - tOne) / 4) : 0
  const cards = [['p', 'tag', 'todos daquela tag'], ['.destaque', 'classe', 'quem tem a classe'], ['#contato', 'id', 'um elemento só']]
  const extras = [['h1, h2', 'vírgula: junta'], ['nav a', 'espaço: dentro de'], ['quem vence?', 'regras brigando']]
  return (
    <AbsoluteFill>
      <div style={abs(0, 0, { width: 1920, height: 880, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: logoBig })}>
        <LogoReveal start={4} height={300} />
      </div>
      <div style={abs(60, 40, { opacity: logoSmall, display: 'flex', alignItems: 'center', gap: 14 })}>
        <LogoMark height={46} keyColor={C.green} />
        <Wordmark size={38} />
      </div>
      {frame >= tPast - 4 && (
        <div style={abs(0, 36, { width: 1920 })}>
          <Title start={tPast} size={58}>Aula 2 — Seletores: tag, classe e id</Title>
        </div>
      )}
      {/* revisão da aula 1 */}
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 140, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.purple })}>na aula 1</div>
          <div style={abs(RX, RY + 20)}><CodeChip text="h1 { color: navy; }" fs={RF} /></div>
          {[[0, 2, 'seletor', '#7F77DD', tSel], [5, 10, 'propriedade', '#D46FA8', tDecl], [12, 16, 'valor', '#2F5BD3', tDecl + 8]].map(([c0, c1, t, col, at]) => {
            const o = fadeIn(frame, at, 10)
            const x = (colX(c0) + colX(c1)) / 2
            return (
              <React.Fragment key={t}>
                <div style={abs(colX(c0), RY + 150, { width: colX(c1) - colX(c0), height: 8, borderRadius: 4, background: col, opacity: o })} />
                <div style={abs(x - 150, RY + 190, { width: 300, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${(1 - o) * 10}px)` })}><Chip size={34} color={C.white} bg={col} border={C.night}>{t}</Chip></div>
              </React.Fragment>
            )
          })}
          <div style={abs(460, 560, { display: 'flex', alignItems: 'center', gap: 24, opacity: fadeIn(frame, tLink, 12) })}>
            <CodeChip text={'<link rel="stylesheet" href="estilo.css">'} lang="html" fs={42} />
            <div style={{ transform: `scale(${pop(frame, fps, tLinkTag)})` }}><Check size={72} /></div>
          </div>
        </div>
      )}
      {/* a pergunta: só um parágrafo */}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(120, 150)}>
            <Preview w={1000} h={700}><PageCss id="b1-tres" variant="tres" css={CSS_A1} zoom={1.8} flashP={1} flashOp={flashOp} /></Preview>
            <div style={abs(890, 330, { opacity: fadeIn(frame, tOne, 8), transform: `scale(${pop(frame, fps, tOne)})`, fontFamily: FONT, fontSize: 130, fontWeight: 900, color: '#F0A04B', textShadow: '0 4px 10px rgba(38,33,92,0.3)' })}>?</div>
          </div>
          <div style={abs(1200, 360, { opacity: fadeIn(frame, tOne + 10, 10) })}><Chip size={46} color={C.night} border="#F0A04B">e se for só este?</Chip></div>
          <div style={abs(1200, 480, { width: 640, opacity: fadeIn(frame, tOne + 30, 10), fontFamily: FONT, fontSize: 34, fontWeight: 600, color: '#5F5A86', lineHeight: 1.3 })}>
            com <span style={{ fontFamily: MONO, color: C.purple }}>{'p { }'}</span>, os três mudam juntos
          </div>
        </div>
      )}
      {/* hoje: três seletores e mais três ideias */}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(0, 150, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.night })}>
            escolher <span style={{ color: C.purple }}>quem recebe o estilo</span>
          </div>
          <div style={abs(0, 250, { width: 1920, display: 'flex', justifyContent: 'center', gap: 60, opacity: fadeIn(frame, tThree, 8) })}>
            {cards.map(([code, name, sub], i) => {
              const o = pop(frame, fps, tT[i])
              return (
                <div key={code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, opacity: clamp01(o * 2), transform: `scale(${0.6 + 0.4 * o})` }}>
                  <div style={{ minWidth: 340, textAlign: 'center', fontFamily: MONO, fontSize: 76, fontWeight: 700, color: '#FFD28A', background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 22, padding: '18px 34px', boxShadow: '0 16px 36px rgba(27,23,68,0.35)' }}>{code}</div>
                  <Chip size={40} color={C.white} bg={C.purple} border={C.night}>{name}</Chip>
                  <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 600, color: '#5F5A86' }}>{sub}</div>
                </div>
              )
            })}
          </div>
          <div style={abs(0, 660, { width: 1920, display: 'flex', justifyContent: 'center', gap: 36 })}>
            {extras.map(([code, sub], i) => {
              const o = fadeIn(frame, tX[i], 10)
              return (
                <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: o, transform: `translateY(${(1 - o) * 16}px)`, background: C.white, border: `3px solid ${C.purpleSoft}`, borderRadius: 18, padding: '10px 22px' }}>
                  <span style={{ fontFamily: i === 2 ? FONT : MONO, fontSize: 36, fontWeight: 700, color: C.purple }}>{code}</span>
                  <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: C.night }}>{sub}</span>
                </div>
              )
            })}
          </div>
          <div style={abs(0, 790, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tBye, 12) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>abre o editor e bora destravar</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const TagScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tSel = s('todo seletor era o nome')
  const tH = [s('agá um, body, pê'), s('body, pê.'), s('pê. Esse')]
  const tThis = s('Esse é o seletor de tag')
  const tAll = s('pega todos os elementos')
  const tWrite = s('Se a Ana escreve')
  const tAllP = s('todos os parágrafos ficam')
  const tP = [s('O do sobre mim'), s('o dos projetos'), s('e até o do rodapé')]
  const tGeneral = s('Para o visual geral')
  const tSpecial = s('Mas a Ana tem um parágrafo')
  const tOnly = s('Ela quer que só esse')
  const tNo = s('Com o seletor de tag, não dá')
  const tClasses = s('Para isso existem as classes')
  const pre = CSS_A1 + '\n\n'
  const segs = typed(pre, [['p {', tWrite + 4], ['\n  color: ', tWrite + 14], ['navy;', tWrite + 26], ['\n}', tWrite + 38]])
  const tSave = tWrite + 52
  const col = rampF(frame, tSave + 6, tSave + 20)
  const css = CSS_A1 + (col > 0 ? `\n\np {\n  color: ${mix(HEX.black, HEX.navy, col)};\n}` : '')
  const ed = { ...ED, fs: 30 }
  const selHl = [
    { text: 'h1', at: tH[0], until: tH[0] + 30, color: YEL },
    { text: 'body', at: tH[1], until: tH[1] + 30, color: YEL },
    { text: 'p {', at: tH[2], until: tH[2] + 30, color: YEL },
  ]
  const lNew = 12
  const newHl = frame >= tThis && frame < tWrite ? [] : [{ text: 'p', at: tAllP, until: tSpecial, color: YEL, index: pre.length }]
  // destaques reais na prévia: cada parágrafo, um depois do outro
  const hl = [
    { sel: 'p', op: win(frame, tAllP, tP[0], 8) },
    { sel: '#sobre p', op: win(frame, tP[0], tP[0] + 34, 6) },
    { sel: '#projetos p', op: win(frame, tP[1], tP[1] + 34, 6) },
    { sel: 'footer p', op: win(frame, tP[2], tP[2] + 40, 6) },
    { sel: '#sobre p + p', op: fadeIn(frame, tSpecial + 10, 10), dashed: true, color: '127,119,221' },
  ]
  const xOp = fadeIn(frame, tNo, 10)
  const xAt = edAt(ed, lNew, 0)
  return (
    <AbsoluteFill>
      <div style={abs(ED.x, ED.y)}>
        <EditorTabs tabs={[{ name: 'index.html' }, { name: 'estilo.css', active: true }]} width={ED_W} height={ED_H}>
          <Code segments={segs} lang="css" fontSize={ed.fs} highlights={[...selHl, ...newHl]} />
        </EditorTabs>
      </div>
      <div style={abs(xAt.x - 20, xAt.y - 46, { opacity: xOp, transform: `scale(${0.6 + 0.4 * pop(frame, fps, tNo)})` })}><GRAY_X size={92} /></div>
      <div style={abs(xAt.x + 90, xAt.y - 30, { opacity: xOp })}><Chip size={30} color={C.night} border="#9A97B8">a tag não escolhe</Chip></div>
      <div style={abs(edAt(ed, 0, 18).x, edAt(ed, 1, 0).y - 20, { opacity: win(frame, tSel, tWrite, 10) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">até agora: só nomes de tag</Chip></div>
      <div style={abs(edAt(ed, 0, 18).x, edAt(ed, 3, 0).y - 20, { opacity: win(frame, tThis, tWrite, 10) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>seletor de tag</Chip></div>
      <div style={abs(edAt(ed, 0, 18).x, edAt(ed, 5, 0).y - 20, { opacity: win(frame, tAll, tWrite, 10) })}><Chip size={30} color={C.night} border={C.purple}>pega todos daquela tag</Chip></div>
      <div style={abs(PV.x, PV.y)}>
        <Preview w={PV.w} h={PV.h}><PageSel id="b2-pv" css={css} zoom={PVZ} hl={hl} /></Preview>
        <SaveFlash frame={frame} at={tSave} />
      </div>
      <Label x={PV.x} y={PV.y + PV.h + 26} w={PV.w} op={fadeIn(frame, tAllP, 10) * (1 - fadeIn(frame, tSpecial, 8))} size={32} dark>seletor de tag = todos os <span style={{ fontFamily: MONO }}>{'<p>'}</span> da página</Label>
      <Label x={PV.x} y={PV.y + PV.h + 26} w={PV.w} op={win(frame, tGeneral, tSpecial, 10)} size={30} border={C.purple}>ótimo para o visual geral: cor, tamanho, fundo</Label>
      <Label x={PV.x} y={PV.y + PV.h + 26} w={PV.w} op={fadeIn(frame, tSpecial + 10, 10) * (1 - fadeIn(frame, tClasses, 8))} size={32} border={C.purpleSoft}>{frame >= tOnly ? 'só este, como?' : 'o parágrafo especial'}</Label>
      <Label x={PV.x} y={PV.y + PV.h + 26} w={PV.w} op={fadeIn(frame, tClasses, 10)} size={32} dark>a resposta: classes</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- trechos do index.html
export const SOBRE = [
  '  <section id="sobre">',
  '    <h2>Sobre mim</h2>',
  '    <p>Trabalho no atendimento de uma loja e estou',
  '      fazendo a minha transição para a tecnologia.</p>',
]
export const P_DEST = (cls) => `    <p${cls}>Estou procurando o meu primeiro emprego na área.</p>`
export const SOBRE_END = ['  </section>']
export const SOBRE_N0 = 24 // número da linha de <section id="sobre">

// ---------------------------------------------------------------- Bloco 3
export const ClasseScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tWhat = s('Uma classe é um apelido')
  const tAttr = s('Ela entra com o atributo')
  const tHere = s('pê, cléss igual a destaque')
  const tName = s('O nome é você que escolhe')
  const tCss = s('Agora, no cê ésse ésse')
  const tDot = s('você escreve um ponto')
  const tDotIs = s('O ponto é o jeito')
  const tRule = s('Então a regra fica')
  const tOpen = s('ponto destaque, abre chaves')
  const tDecl = s('cálor, dois pontos, pârpou')
  const tClose = s('fecha chaves. Salva')
  const tSave = s('Salva e olha a prévia')
  const tOnly = s('só aquele parágrafo ficou roxo')
  const tOthers = s('Os outros continuam')
  const tDetail = s('Repara num detalhe')
  const tNoDot = s('no HTML, o nome vai sem')
  const tDotCss = s('O ponto só aparece')
  const cssTab = frame >= tCss
  const ed = { ...ED, fs: 24 }
  const pre = SOBRE.join('\n') + '\n    <p'
  const htmlSegs = typed(pre, [[' class="destaque"', tHere + 6]], '>Estou procurando o meu primeiro emprego na área.</p>\n' + SOBRE_END.join('\n'))
  const typedClass = frame >= tHere + 6 + typeSpeed(16)
  const cssPre = cssUpTo('pnavy') + '\n\n'
  const cssSegs = typed(cssPre, [['.destaque', tDot + 8], [' {', tOpen + 10], ['\n  color: ', tDecl], ['purple;', tDecl + 16], ['\n}', tClose]])
  const edC = { ...ED, fs: 24 }
  const lDest = cssPre.split('\n').length - 1
  const col = rampF(frame, tSave + 10, tSave + 24)
  const css = cssUpTo('pnavy') + (col > 0 ? `\n\n.destaque {\n  color: ${mix(HEX.navy, HEX.purple, col)};\n}` : '')
  const End = rampF(frame, tDetail - 6, tDetail + 8)
  const dotBlink = blinking(frame, tDotIs, tDotIs + 70)
  const clsAt = edAt(ed, 4, 6)
  return (
    <AbsoluteFill>
      <div style={{ opacity: 1 - End }}>
        <div style={abs(ED.x, ED.y)}>
          <EditorTabs tabs={[{ name: 'index.html', active: !cssTab }, { name: 'estilo.css', active: cssTab, glow: win(frame, tCss, tCss + 30, 8) }]} width={ED_W} height={ED_H}>
            {!cssTab ? (
              <Code segments={htmlSegs} fontSize={ed.fs} numbers={tailNumbers(SOBRE_N0 - 1)} highlights={[{ text: 'class="destaque"', at: tHere + 30, color: YEL }]} />
            ) : (
              <Code segments={cssSegs} lang="css" fontSize={edC.fs} highlights={[{ text: '.destaque', at: tOthers, color: YEL }]} />
            )}
          </EditorTabs>
        </div>
        {!cssTab && (
          <>
            <div style={abs(120, 420, { opacity: win(frame, tWhat, tHere, 10) })}><Chip size={36} color={C.night} bg="#FFF4D6" border="#E8B860">classe = um apelido para o elemento</Chip></div>
            <div style={abs(120, 500, { opacity: win(frame, tAttr, tHere + 10, 10) })}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>entra no HTML com o atributo <span style={{ fontFamily: MONO }}>class</span></Chip></div>
            <div style={abs(clsAt.x - 10, clsAt.y + 40, { opacity: fadeIn(frame, tHere + 30, 10) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">atributo class: o apelido</Chip></div>
            <ArrowLine x1={clsAt.x + 100} y1={clsAt.y + 40} x2={clsAt.x + 100} y2={clsAt.y + 16} p={rampF(frame, tHere + 32, tHere + 42)} color="#E8B860" width={5} />
            <div style={abs(clsAt.x - 10, clsAt.y + 130, { opacity: fadeIn(frame, tName, 10) })}><Chip size={30} color={C.night} border={C.purple}>o nome é você que escolhe: diz para que serve</Chip></div>
          </>
        )}
        {cssTab && (
          <>
            <CharMark ed={edC} line={lDest} col={0} on={dotBlink} />
            <div style={abs(edAt(edC, lDest, 11).x, edAt(edC, lDest, 0).y - 26, { opacity: fadeIn(frame, tDotIs, 10) * (1 - fadeIn(frame, tRule, 8)) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">ponto = classe</Chip></div>
            <div style={abs(edAt(edC, lDest, 11).x, edAt(edC, lDest, 0).y - 58, { opacity: fadeIn(frame, tOthers, 10) })}><Chip size={28} color={C.night} border={C.purple}>só quem tem a classe</Chip></div>
          </>
        )}
        <div style={abs(PV.x, PV.y)}>
          <Preview w={PV.w} h={PV.h}><PageSel id="b3-pv" css={css} zoom={PVZ} cls={typedClass ? { pDest: 'destaque' } : {}} hl={[{ sel: '.destaque', op: win(frame, tOnly, tOthers + 10, 8), color: '151,196,89' }, { sel: 'p:not(.destaque)', op: win(frame, tOthers, tDetail, 8), color: '127,119,221' }]} /></Preview>
          <SaveFlash frame={frame} at={tSave} />
        </div>
        <div style={abs(PV.x, PV.y + PV.h + 26, { width: PV.w, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tOnly, 10) })}>
          <div style={{ transform: `scale(${pop(frame, fps, tOnly + 4)})` }}><Check size={56} /></div>
          <Chip size={30} color={C.night} border={C.green}>{frame >= tOthers ? 'só ele roxo; os outros, azul-marinho' : 'só aquele parágrafo ficou roxo'}</Chip>
        </div>
      </div>
      {/* lado a lado: sem ponto x com ponto */}
      {End > 0 && (
        <div style={{ opacity: End }}>
          <div style={abs(0, 110, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night })}>o mesmo nome, em dois lugares</div>
          <div style={abs(0, 260, { width: 1920, display: 'flex', justifyContent: 'center', gap: 120 })}>
            {[['HTML', 'class="destaque"', 'html', 'sem ponto', tNoDot], ['CSS', '.destaque', 'css', 'com ponto', tDotCss]].map(([k, code, lang, note, at]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.purple }}>{k}</div>
                <CodeChip text={code} lang={lang} fs={70} highlights={lang === 'css' ? [{ text: '.', at: at, color: YEL, index: 0 }] : []} />
                <div style={{ opacity: fadeIn(frame, at, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, at)})` }}><Chip size={40} color={C.white} bg={C.purple} border={C.night}>{note}</Chip></div>
              </div>
            ))}
          </div>
          <ArrowLine x1={1045} y1={405} x2={1145} y2={405} p={rampF(frame, tDetail + 10, tDetail + 26)} width={7} />
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
export const PROJ = [
  '  <section id="projetos">',
  '    <h2>Meus projetos</h2>',
  '    <p>Os projetos que eu fiz enquanto aprendo a programar.</p>',
  '    <ul>',
  '      <li>Minhas receitas favoritas</li>',
]
export const PROJ_N0 = 30
export const ReusoScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tBig = s('A grande vantagem')
  const tLiked = s('A Ana gostou do destaque')
  const tPut = s('É só colocar')
  const tReady = s('Pronto: a mesma regra')
  const tTags = s('e nem precisa ser a mesma tag')
  const tSwap = s('Se um dia ela trocar')
  const tFollow = s('todos os destaques acompanham')
  const tMulti = s('E um elemento pode ter mais')
  const tSpace = s('É só separar os nomes')
  const tQuotes = s('dentro das mesmas aspas')
  const tTwo = s('Isso quer dizer duas classes')
  const tBoth = s('e o elemento recebe o estilo')
  const tKeep = s('Guarde isso')
  const ed = { ...ED, fs: 24 }
  const htmlSegs = typed(PROJ.join('\n') + '\n      <li', [[' class="destaque"', tPut + 6]], '>Esta página pessoal (em andamento)</li>\n    </ul>\n  </section>')
  const liOn = frame >= tPut + 6 + typeSpeed(16)
  // purple -> tomato -> purple
  const toT = rampF(frame, tSwap + 14, tSwap + 28)
  const back = rampF(frame, tFollow + 30, tFollow + 44)
  const colr = back > 0 ? mix(HEX.tomato, HEX.purple, back) : mix(HEX.purple, HEX.tomato, toT)
  const shownVal = toT > 0.5 && back < 0.5 ? 'tomato;' : 'purple;'
  const css = cssUpTo('pnavy') + `\n\n.destaque {\n  color: ${colr};\n}`
  const B = rampF(frame, tMulti - 6, tMulti + 8)
  const A = 1 - B
  const ruleChip = { x: 120, y: 520 }
  // pontos aproximados do <p> e do <li> com a classe, na prévia (medidos nos stills)
  const pP = { x: PV.x + 8, y: PV.y + 382 }
  const pLi = { x: PV.x + 34, y: PV.y + 500 }
  const split = rampF(frame, tReady, tReady + 20)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(ED.x, ED.y)}>
            <EditorTabs tabs={[{ name: 'index.html', active: true }, { name: 'estilo.css' }]} width={ED_W} height={460}>
              <Code segments={htmlSegs} fontSize={ed.fs} numbers={tailNumbers(PROJ_N0 - 1)} highlights={[{ text: 'class="destaque"', at: tPut + 26, color: YEL }]} />
            </EditorTabs>
          </div>
          <div style={abs(ruleChip.x, ruleChip.y, { opacity: fadeIn(frame, tLiked, 10) })}>
            <div style={{ fontFamily: MONO, fontSize: 26, color: '#5F5A86', marginBottom: 8 }}>estilo.css</div>
            <CodeChip text={`.destaque {\n  color: ${shownVal}\n}`} fs={44} highlights={toT > 0 && back < 1 ? [{ text: shownVal, at: tSwap + 14, color: YEL }] : []} />
          </div>
          <div style={abs(ruleChip.x, 800, { opacity: fadeIn(frame, tTags, 10) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>uma regra, vários elementos (até de tags diferentes)</Chip></div>
          <div style={abs(ruleChip.x + 460, ruleChip.y + 170, { opacity: win(frame, tSwap + 14, tFollow + 50, 10) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">muda num lugar só</Chip></div>
          <div style={abs(PV.x, PV.y)}>
            <Preview w={PV.w} h={PV.h}><PageSel id="b4-pv" css={css} zoom={PVZ} cls={liOn ? { pDest: 'destaque', li1: 'destaque' } : { pDest: 'destaque' }} hl={[{ sel: '.destaque', op: win(frame, tReady, tSwap, 8), color: '151,196,89' }]} /></Preview>
          </div>
          {[pP, pLi].map((pt, i) => (
            <ArrowLine key={i} x1={ruleChip.x + 430} y1={ruleChip.y + 110} x2={pt.x} y2={pt.y} p={rampF(frame, tReady + 4 + i * 8, tReady + 22 + i * 8) * split} bend={i ? 40 : -40} width={6} color={C.purple} />
          ))}
          <div style={abs(PV.x, PV.y + PV.h + 26, { width: PV.w, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tBig, 10) * (1 - fadeIn(frame, tPut, 8)) })}><Chip size={32} color={C.night} border={C.purple}>a classe pode ser usada quantas vezes quiser</Chip></div>
          <div style={abs(PV.x, PV.y + PV.h + 26, { width: PV.w, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tReady, 10) })}>
            <Check size={50} /><Chip size={30} color={C.night} border={C.green}>o <span style={{ fontFamily: MONO }}>{'<p>'}</span> e o <span style={{ fontFamily: MONO }}>{'<li>'}</span>, com a mesma regra</Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 80, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night })}>um elemento, <span style={{ color: C.purple }}>várias classes</span></div>
          <div style={abs(0, 200, { width: 1920, display: 'flex', justifyContent: 'center' })}>
            <CodeChip text={'<p class="destaque grande">...</p>'} lang="html" fs={60} highlights={[{ text: ' ', at: tSpace, color: 'rgba(255,210,138,0.95)', index: 18 }]}>
              {frame >= tSpace && <div style={abs(26 + 18 * 33, 14 + 84, { width: 33, height: 8, borderRadius: 4, background: '#FFD28A', boxShadow: '0 0 12px #FFD28A', opacity: fadeIn(frame, tSpace, 6) })} />}
            </CodeChip>
          </div>
          <div style={abs(994 - 260, 345, { width: 520, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tSpace + 10, 10) })}><Chip size={34} color={C.night} bg="#FFF4D6" border="#E8B860">espaço = separa duas classes</Chip></div>
          <div style={abs(0, 600, { width: 1920, display: 'flex', justifyContent: 'center', gap: 200 })}>
            {['.destaque { }', '.grande { }'].map((t, i) => (
              <div key={t} style={{ opacity: fadeIn(frame, tTwo + 10 + i * 12, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tTwo + 10 + i * 12)})` }}><CodeChip text={t} fs={50} /></div>
            ))}
          </div>
          <ArrowLine x1={770} y1={420} x2={660} y2={594} p={rampF(frame, tTwo + 10, tTwo + 26)} width={6} bend={-30} />
          <ArrowLine x1={1220} y1={420} x2={1270} y2={594} p={rampF(frame, tTwo + 22, tTwo + 38)} width={6} bend={30} />
          <Label x={0} y={730} w={1920} op={fadeIn(frame, tBoth, 10)} size={34} dark>o elemento recebe o estilo das duas regras</Label>
          <div style={abs(0, 815, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tKeep, 10) })}><Warn size={46} /><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">guarde: vai aparecer nos erros comuns</Chip></div>
          <div style={abs(0, 480, { width: 1920, display: 'flex', justifyContent: 'center', opacity: win(frame, tQuotes, tTwo, 10) })}><Chip size={30} color={C.night} border={C.purple}>dentro das mesmas aspas</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
const ID_HTML = [
  '    <nav>',
  '      <ul>',
  '        <li><a href="#sobre">Sobre mim</a></li>',
  '        <li><a href="#projetos">Meus projetos</a></li>',
  '        <li><a href="#rotina">Minha rotina</a></li>',
  '        <li><a href="#contato">Fale comigo</a></li>',
  '      </ul>',
  '    </nav>',
  '    ...',
  '  <section id="contato">',
  '    <h2>Fale comigo</h2>',
  '    <form>',
  '      ...',
  '    </form>',
  '  </section>',
]
const ID_NUMS = [15, 16, 17, 18, 19, 20, 21, 22, '', 47, 48, 49, 50, 51, 52]
export const IdScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tThird = s('O terceiro tipo')
  const tKnow = s('Você já conhece o atributo')
  const tEach = s('a Ana deu um ái di para cada')
  const tForm = s('A seção do formulário')
  const tLink = s('Lembra do link')
  const tCss = s('No cê ésse ésse, o seletor')
  const tSym = s('a cerquilha e o nome')
  const tRule = s('Então: cerquilha contato')
  const tBg = s('béquigráund cálor, dois pontos, uáit')
  const tClose = s('fecha chaves. A seção')
  const tWhite = s('A seção de contato ganha')
  const tDiff = s('A diferença principal')
  const tUnique = s('o ái di é único')
  const tOne = s('Só um elemento da página')
  const tAlways = s('Por isso, a regra')
  const cssTab = frame >= tCss
  const ed = { ...ED, fs: 24 }
  const full = cssUpTo('dest') + '\n\n'
  const FROM = 12 // mostra o arquivo da linha 13 em diante
  const cssPre = tailOf(full, FROM)
  const cssSegs = typed(cssPre, [['#contato {', tRule + 6], ['\n  background-color: ', tBg], ['white;', tBg + 20], ['\n}', tClose]])
  const edC = { ...ED, fs: 28 }
  const lRule = cssPre.split('\n').length - 1
  const tSave = tClose + 12
  const w = rampF(frame, tWhite, tWhite + 16)
  const css = cssUpTo('dest') + (w > 0 ? `\n\n#contato {\n  background-color: ${mix(HEX.lightyellow, HEX.white, w)};\n}` : '')
  const hashBlink = blinking(frame, tSym, tSym + 60)
  const lSec = 9
  const lA = 5
  const aSec = edAt(ed, lSec, 11)
  const aA = edAt(ed, lA, 20)
  const U = fadeIn(frame, tDiff, 10)
  return (
    <AbsoluteFill>
      <div style={abs(ED.x, ED.y)}>
        <EditorTabs tabs={[{ name: 'index.html', active: !cssTab }, { name: 'estilo.css', active: cssTab, glow: win(frame, tCss, tCss + 30, 8) }]} width={ED_W} height={ED_H}>
          {!cssTab ? (
            <Code text={ID_HTML.join('\n')} fontSize={ed.fs} numbers={ID_NUMS} cursor={false} highlights={[{ text: 'id="contato"', at: tForm, color: YEL }, { text: 'href="#contato"', at: tLink, color: 'rgba(143,211,232,0.5)' }]} />
          ) : (
            <Code segments={cssSegs} lang="css" fontSize={edC.fs} numbers={tailNumbers(FROM)} />
          )}
        </EditorTabs>
      </div>
      {!cssTab && (
        <>
          <div style={abs(120, 690, { opacity: win(frame, tThird, tForm, 10) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>seletor de id</Chip></div>
          <div style={abs(120, 775, { opacity: win(frame, tEach, tForm, 10) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">um id para cada seção (nível 1)</Chip></div>
          <ArrowLine x1={aSec.x + 40} y1={aSec.y - 18} x2={aA.x + 60} y2={aA.y + 20} p={rampF(frame, tLink + 6, tLink + 24)} bend={-80} width={6} color="#4BA6C8" />
          <div style={abs(aSec.x + 200, aSec.y - 110, { opacity: fadeIn(frame, tLink + 16, 10) })}><LessonTag n="3 do nível 1" size={28} /></div>
        </>
      )}
      {cssTab && (
        <>
          <CharMark ed={edC} line={lRule} col={0} on={hashBlink || blinking(frame, tRule + 6, tRule + 40)} />
          <div style={abs(edAt(edC, lRule, 12).x, edAt(edC, lRule, 0).y - 58, { opacity: fadeIn(frame, tSym, 10) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">cerquilha = id</Chip></div>
        </>
      )}
      <div style={abs(PV.x, PV.y)}>
        <Preview w={PV.w} h={PV.h}><PageSel id="b5-pv" css={css} zoom={PVZ} cls={{ pDest: 'destaque' }} hl={[{ sel: '#contato', op: win(frame, tWhite + 10, tDiff, 8), color: '151,196,89' }, { sel: 'a[href="#contato"]', op: win(frame, tLink, tCss, 8), color: '75,166,200' }]} /></Preview>
        <SaveFlash frame={frame} at={tSave} />
      </div>
      {/* o mesmo símbolo no href */}
      <div style={abs(PV.x, PV.y + PV.h + 24, { width: PV.w, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tSym, 10) * (1 - U) })}>
        <CodeChip text={'<a href="#contato">'} lang="html" fs={32} pad="8px 20px" highlights={hashBlink ? [{ text: '#', at: 0, color: 'rgba(255,210,138,0.9)' }] : []} />
        <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">o mesmo símbolo</Chip>
      </div>
      <div style={abs(PV.x, PV.y + PV.h + 24, { width: PV.w, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: U })}>
        <Chip size={34} color={C.white} bg={C.purple} border={C.night}>id: um por página</Chip>
        <div style={{ opacity: fadeIn(frame, tUnique, 8), transform: `scale(${pop(frame, fps, tUnique)}) rotate(-8deg)`, width: 120, height: 120, borderRadius: '50%', background: '#FFF4D6', border: '6px double #E8B860', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 28, fontWeight: 900, color: '#8A5A12' }}>único</div>
      </div>
      <div style={abs(edAt(edC, lRule, 0).x, edAt(edC, lRule + 3, 0).y + 30, { opacity: cssTab ? fadeIn(frame, tOne, 10) : 0 })}><Chip size={30} color={C.night} border={C.purple}>{frame >= tAlways ? 'a regra com # mira um elemento só' : 'só um elemento pode ter cada id'}</Chip></div>
      {!cssTab && <div style={abs(120, 775, { opacity: win(frame, tKnow, tEach, 10) })}><Chip size={30} color={C.night} border={C.purple}>o atributo id, do nível 1</Chip></div>}
    </AbsoluteFill>
  )
}

export { interpolate }
