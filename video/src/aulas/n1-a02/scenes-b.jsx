import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Confetti, Cross } from '../../components/Marks.jsx'
import { ImageIcon, LinkIcon, NestedBoxes, SpeechWave, TagPairs } from '../../components/Teaching.jsx'
import { AnaPage, LINES, bodySegments, lineOf } from './ana.jsx'
import { abs, rampF, win, CodeCard } from './scenes-a.jsx'

const STRONG_HL = 'rgba(127,119,221,0.6)'
const EM_HL = 'rgba(255,210,138,0.45)'
const EM_COLOR = '#FFD28A'

// ---------------------------------------------------------------- Bloco 7
export const QuebraBr = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tDiff = s('Ela é diferente das outras')
  const tNoClose = s('não tem conteúdo e nem tag de fechamento')
  const tUse = s('Ela é útil quando')
  const tAna = s('na assinatura da Ana')
  const tLines = s('o nome numa linha')
  const tCare = s('Agora, o cuidado')
  const tStack = s('Empilhar três')
  const tOther = s('Se é outro assunto')
  const tCss = s('E se você só quer mais espaço')
  const A = 1 - rampF(frame, tUse - 6, tUse + 6)
  const B = win(frame, tUse, tCare, 12)
  const Cp = rampF(frame, tCare, tCare + 12)
  const keys = ['bodyOpen', 'h1', 'h2a', 'p1', 'p2', 'h2b', 'sig', 'bodyClose']
  const sigF = 60
  const segs = bodySegments(['bodyOpen', 'h1', 'h2a', 'p1', 'p2', 'h2b', 'bodyClose'], { sig: [tAna, sigF] })
  const typed = frame >= tAna + sigF
  const parts = ['h1', 'h2a', 'p1', 'p2', 'h2b', ...(typed ? ['sig'] : [])]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 170, { width: 1920, display: 'flex', justifyContent: 'center' })}>
            <div style={{ background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 28, padding: '30px 70px', boxShadow: '0 24px 60px rgba(27,23,68,0.4)' }}>
              <CodeTyping segments={[{ text: '<br>', start: 4, frames: 14 }]} fontSize={170} lineNumbers={false} cursor={false} />
            </div>
          </div>
          <div style={abs(0, 520, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, 16, 12) })}>
            <Chip size={48} color={C.white} bg={C.purple} border={C.night}>br = break = quebra</Chip>
          </div>
          <div style={abs(0, 650, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26, opacity: fadeIn(frame, tNoClose, 12) })}>
            <span style={{ fontFamily: MONO, fontSize: 64, color: C.purple, textDecoration: 'line-through', textDecorationColor: C.red, textDecorationThickness: 6, opacity: 0.8 }}>{'</br>'}</span>
            <Cross size={72} />
            <Chip size={44} color={C.night} border={C.purple}>sem conteúdo · sem fechamento</Chip>
          </div>
          <div style={abs(0, 120, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tDiff, 12) * (1 - fadeIn(frame, tNoClose, 8)), fontFamily: FONT, fontSize: 44, color: C.night, fontWeight: 600 })}>
            diferente das outras tags
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(50, 40)}>
            <EditorWindow width={1060} height={640} filename="index.html">
              <CodeTyping segments={segs} fontSize={30} wrap highlights={[{ text: '<br>', at: tAna + sigF }]} lineHighlights={[{ line: lineOf(keys, 'sig'), at: tAna + sigF }]} />
            </EditorWindow>
          </div>
          <div style={abs(50, 712, { opacity: fadeIn(frame, tAna + sigF, 12), display: 'flex', gap: 20, alignItems: 'center' })}>
            <Chip size={40} color={C.white} bg={C.purple} border={C.night}><span style={{ fontFamily: MONO }}>{'<br>'}</span> sem fechamento</Chip>
          </div>
          <div style={abs(1150, 40)}>
            <BrowserMock width={720} height={640} tabTitle="Sobre mim" url="index.html">
              <AnaPage parts={parts} base={21} hl={frame >= tLines && typed ? ['sig'] : []} />
            </BrowserMock>
          </div>
          <div style={abs(1150, 712, { width: 720, textAlign: 'center', opacity: fadeIn(frame, tLines, 12) * (typed ? 1 : 0) })}>
            <Chip size={38} color={C.night} border={C.purple}>nome numa linha, cidade na de baixo</Chip>
          </div>
        </div>
      )}
      {Cp > 0 && (
        <div style={{ opacity: Cp }}>
          <div style={abs(110, 90, { opacity: fadeIn(frame, tStack, 12) })}>
            <CodeCard code={'<p>Um assunto.</p>\n<br><br><br><br>\n<p>Outro assunto.</p>'} mark={frame >= tStack + 20 && <Cross size={96} />} label={<Chip size={38} color={C.night} border={C.red}>br para dar espaço: erro clássico</Chip>} />
          </div>
          <div style={abs(1010, 90, { opacity: fadeIn(frame, tOther, 12) })}>
            <CodeCard code={'<p>Um assunto.</p>\n<p>Outro assunto.</p>'} mark={frame >= tOther + 16 && <Check size={96} />} label={<Chip size={38} color={C.night} border={C.green}>outro assunto, outro parágrafo</Chip>} />
          </div>
          <div style={abs(0, 560, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tCss, 12) })}>
            <Chip size={50} color={C.white} bg={C.purple} border={C.night}>mais espaço? isso é com o CSS</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
const SENT = [
  { t: 'Estou' }, { t: 'aprendendo' }, { t: 'HTML', strong: 'b' }, { t: 'e' }, { t: 'estou' }, { t: 'gostando' }, { t: 'muito.', strong: 'i' },
]

export const Enfase = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tStrong = s('A strong marca algo importante')
  const tEm = s('E a em marca uma ênfase')
  const tBold = s('No navegador, a strong aparece em negrito')
  const tItal = s('e a em aparece em itálico')
  const tMean = s('Mas, de novo')
  const tReader = s('Quem usa um leitor de tela')
  const tAna = s('Na página da Ana')
  const tType = s('vai assim')
  const A = 1 - rampF(frame, tAna - 6, tAna + 6)
  const B = rampF(frame, tAna, tAna + 12)
  const pF = Math.max(60, frames - tType - 90)
  const segs = bodySegments(['bodyOpen', 'h1', 'h2a', 'p1', 'p2', 'h2b', 'sig', 'bodyClose'], { p3: [tType, pF] })
  const typed = frame >= tType + pF
  const parts = ['h1', 'h2a', 'p1', 'p2', 'h2b', 'sig', ...(typed ? ['p3'] : [])]
  const card = (tag, label, sample, styleOn, at, onAt, color) => {
    const p = fadeIn(frame, at, 14)
    const on = frame >= onAt
    return (
      <div style={{ width: 760, opacity: p, transform: `translateY(${(1 - p) * 30}px)`, background: C.white, border: `4px solid ${color}`, borderRadius: 28, padding: '30px 40px', boxShadow: '0 20px 50px rgba(38,33,92,0.2)', fontFamily: FONT, textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 70, fontWeight: 700, color: C.purple }}>{tag}</div>
        <div style={{ fontSize: 46, color: C.night, fontWeight: 600, marginTop: 6 }}>{label}</div>
        <div style={{ fontSize: 56, color: '#1A1A1A', marginTop: 26, ...(on ? styleOn : {}) }}>{sample}</div>
      </div>
    )
  }
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 70, { width: 1920, display: 'flex', justifyContent: 'center', gap: 80 })}>
            {card('<strong>', 'importante', 'Não esqueça a chave', { fontWeight: 800 }, tStrong, tBold, C.purple)}
            {card('<em>', 'ênfase', 'Eu adoro café', { fontStyle: 'italic' }, tEm, tItal, '#E8B65E')}
          </div>
          <div style={abs(0, 500, { width: 1920, textAlign: 'center', opacity: win(frame, tMean, tReader, 12) })}>
            <Chip size={48} color={C.white} bg={C.purple} border={C.night}>o que importa é o significado, não a aparência</Chip>
          </div>
          <div style={abs(0, 470, { width: 1920, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, opacity: fadeIn(frame, tReader, 14) })}>
            <Chip size={40} color={C.night} border={C.purple}>leitor de tela: lê a página em voz alta</Chip>
            <div style={{ background: C.white, borderRadius: 24, border: `3px solid ${C.purpleSoft}`, padding: '20px 40px' }}>
              <SpeechWave words={SENT} fontSize={44} />
            </div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(50, 30)}>
            <EditorWindow width={1060} height={800} filename="index.html">
              <CodeTyping
                segments={segs}
                fontSize={30}
                wrap
                highlights={[
                  { text: '<strong>HTML</strong>', at: tType + pF, color: STRONG_HL },
                  { text: '<em>muito</em>', at: tType + pF, color: EM_HL },
                ]}
              />
              <div style={{ display: 'flex', gap: 22, marginTop: 36, paddingLeft: 20, opacity: fadeIn(frame, tType + pF, 12) }}>
                <Chip size={36} color={C.white} bg={C.purple} border={C.night}><span style={{ fontFamily: MONO }}>{'<strong>'}</span> importante</Chip>
                <Chip size={36} color={C.night} bg={EM_COLOR} border={C.night}><span style={{ fontFamily: MONO }}>{'<em>'}</span> ênfase</Chip>
              </div>
            </EditorWindow>
          </div>
          <div style={abs(1150, 30)}>
            <BrowserMock width={720} height={560} tabTitle="Sobre mim" url="index.html">
              <AnaPage parts={parts} base={19} emph={typed ? 1 : 0} />
            </BrowserMock>
          </div>
          <div style={abs(1150, 612, { width: 720, opacity: fadeIn(frame, tType + pF, 14) })}>
            <div style={{ background: C.white, borderRadius: 22, border: `3px solid ${C.purpleSoft}`, padding: '14px 22px' }}>
              <SpeechWave words={SENT} fontSize={30} />
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const Comentarios = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tWhat = s('Um comentário é um recado')
  const tHide = s('que o navegador não mostra na página')
  const tStart = s('Ele começa com sinal de menor')
  const tEnd = s('E termina com dois tracinhos')
  const tMid = s('Tudo o que estiver no meio')
  const tAna = s('Na página da Ana, eu vou deixar')
  const tBob = s('Parece bobagem')
  const tCare = s('Só um cuidado')
  const tPass = s('Então nada de senha')
  const A = 1 - rampF(frame, tAna - 6, tAna + 6)
  const B = rampF(frame, tAna, tAna + 12)
  const segs = bodySegments(['bodyOpen', 'h1', 'h2a', 'p1', 'p2', 'h2b', 'p3', 'sig', 'bodyClose'], { c1: [tAna + 30, 40], c2: [tAna + 90, 50] })
  const done = tAna + 140
  const parts = ['h1', 'h2a', 'p1', 'p2', 'h2b', 'p3', 'sig']
  const anat = '<!-- um recado -->'
  const fsA = 110
  const cw = fsA * 0.55
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 90, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tWhat, 12), fontFamily: FONT, fontSize: 50, color: C.night, fontWeight: 600 })}>
            {frame >= tHide ? 'um recado no código que o navegador não mostra' : 'um recado no código'}
          </div>
          <div style={abs((1920 - anat.length * cw) / 2 - 60, 220, { background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 28, padding: '30px 60px', boxShadow: '0 24px 60px rgba(27,23,68,0.4)' })}>
            <CodeTyping
              segments={[{ text: anat, start: tWhat, frames: 30 }]}
              fontSize={fsA}
              lineNumbers={false}
              cursor={false}
              highlights={[
                { text: '<!--', at: tStart, until: tMid },
                { text: '-->', at: tEnd, until: tMid },
                { text: ' um recado ', at: tMid },
              ]}
            />
          </div>
          {[
            { label: 'começa', at: tStart, x: 0, len: 4 },
            { label: 'termina', at: tEnd, x: 15, len: 3 },
          ].map((l) => {
            const left = (1920 - anat.length * cw) / 2 + (l.x + l.len / 2) * cw
            return (
              <div key={l.label} style={abs(left - 200, 450, { width: 400, textAlign: 'center', opacity: fadeIn(frame, l.at, 10) })}>
                <svg width="40" height="50" viewBox="0 0 40 50" style={{ display: 'block', margin: '0 auto' }}><path d="M20 48 V6 M6 18 L20 4 L34 18" fill="none" stroke={C.purple} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <Chip size={42} color={C.night} border={C.purple}>{l.label}</Chip>
              </div>
            )
          })}
          <div style={abs(0, 640, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tMid, 12) })}>
            <Chip size={46} color={C.white} bg={C.purple} border={C.night}>o meio é ignorado pelo navegador</Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(50, 30)}>
            <EditorWindow width={1060} height={800} filename="index.html">
              <CodeTyping
                segments={segs}
                fontSize={30}
                wrap
                highlights={[
                  { text: '<!--', at: done, until: tCare },
                  { text: '-->', at: done, until: tCare },
                  { text: '<!--', occurrence: 1, at: done, until: tCare },
                  { text: '-->', occurrence: 1, at: done, until: tCare },
                ]}
              />
            </EditorWindow>
          </div>
          <div style={abs(1150, 30)}>
            <BrowserMock width={720} height={520} tabTitle="Sobre mim" url="index.html">
              <AnaPage parts={parts} base={17} />
            </BrowserMock>
          </div>
          <div style={abs(1150, 576, { width: 720, textAlign: 'center', opacity: fadeIn(frame, done, 12) })}>
            <Chip size={38} color={C.white} bg={C.purple} border={C.night}>o navegador não mostra</Chip>
          </div>
          <div style={abs(1150, 660, { width: 720, opacity: fadeIn(frame, tBob, 12) * (1 - fadeIn(frame, tCare, 8)), textAlign: 'center' })}>
            <Chip size={34} color={C.night} border={C.purpleSoft}>quando o código crescer, ajuda muito</Chip>
          </div>
          <div style={abs(1150, 650, { width: 720, opacity: fadeIn(frame, tCare, 12) })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: C.nightDeep, border: `3px solid ${C.red}`, borderRadius: 20, padding: '14px 20px' }}>
              <CodeTyping segments={[{ text: '<!-- senha: 1234 -->', start: 0, frames: 0 }]} fontSize={34} lineNumbers={false} cursor={false} />
              {frame >= tCare + 18 && <Cross size={72} />}
            </div>
            <div style={{ marginTop: 14, textAlign: 'center', opacity: fadeIn(frame, tPass, 10) }}>
              <Chip size={32} color={C.night} border={C.red}>quem abre o código-fonte consegue ler</Chip>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
export const PaginaCompleta = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tH1 = s('No topo, o h1')
  const tC1 = s('Depois, um comentário marcando')
  const tC2 = s('Em seguida, outro comentário')
  const tSig = s('E, no final, a assinatura')
  const tInd = s('Repara na indentação')
  const tSave = s('Salva e olha o navegador')
  const tSimple = s('Uma página simples')
  const tYou = s('E foi você que escreveu')
  // arquivo completo, com linhas em branco entre as seções
  const full = [LINES.bodyOpen, LINES.h1, '\n', LINES.c1, LINES.h2a, LINES.p1, LINES.p2, '\n', LINES.c2, LINES.h2b, LINES.p3, '\n', LINES.sig, LINES.bodyClose].join('')
  const ranges = [
    { lines: [1], at: tH1, until: tC1, parts: ['h1'] },
    { lines: [3, 4, 5, 6], at: tC1, until: tC2, parts: ['h2a', 'p1', 'p2'] },
    { lines: [8, 9, 10], at: tC2, until: tSig, parts: ['h2b', 'p3'] },
    { lines: [12], at: tSig, until: tInd, parts: ['sig'] },
  ]
  const lineHighlights = ranges.flatMap((r) => r.lines.map((line) => ({ line, at: r.at, until: r.until })))
  const indent = frame >= tInd && frame < tSave
  if (indent) [1, 3, 4, 5, 6, 8, 9, 10, 12].forEach((line) => lineHighlights.push({ line, at: tInd, until: tSave }))
  const cur = ranges.find((r) => frame >= r.at && frame < r.until)
  const all = frame >= tSave + 10
  const opacity = {}
  for (const k of ['h1', 'h2a', 'p1', 'p2', 'h2b', 'p3', 'sig']) {
    const r = ranges.find((x) => x.parts.includes(k))
    opacity[k] = all || frame >= r.at ? 1 : 0.25
  }
  return (
    <AbsoluteFill>
      <div style={abs(50, 20)}>
        <EditorWindow width={1060} height={840} filename="index.html">
          <CodeTyping segments={[{ text: full, start: 0, frames: 0 }]} fontSize={28} wrap cursor={false} lineHighlights={lineHighlights} />
        </EditorWindow>
      </div>
      <div style={abs(1150, 30)}>
        <BrowserMock width={720} height={620} tabTitle="Sobre mim" url="index.html">
          <AnaPage parts={['h1', 'h2a', 'p1', 'p2', 'h2b', 'p3', 'sig']} base={20} opacity={opacity} hl={cur && !all ? cur.parts : []} />
          {all && <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: fadeIn(frame, tSave + 10, 10) }}><Check size={84} /></div>}
        </BrowserMock>
      </div>
      <div style={abs(1150, 690, { width: 720, textAlign: 'center' })}>
        <div style={{ position: 'absolute', width: 720, opacity: win(frame, tInd, tSave, 12) }}>
          <Chip size={36} color={C.night} border={C.purple}>dentro do body: mais para a direita</Chip>
        </div>
        <div style={{ position: 'absolute', width: 720, opacity: win(frame, tSimple, tYou, 12) }}>
          <Chip size={38} color={C.white} bg={C.purple} border={C.night}>hierarquia + significado</Chip>
        </div>
        <div style={{ position: 'absolute', width: 720, opacity: fadeIn(frame, tYou, 12) }}>
          <Chip size={42} color={C.night} bg={C.white} border={C.green}>foi você que escreveu</Chip>
        </div>
      </div>
      <Confetti start={tSave + 10} x0={1150} spread={720} />
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 11
const PAIR_COLORS = { strong: '#B3ADFF', em: EM_COLOR }
const crossed = '<strong><em>muito</strong></em>'
const nested = '<strong><em>muito</em></strong>'
const PAIRS = [
  { open: '<strong>', close: '</strong>', color: PAIR_COLORS.strong },
  { open: '<em>', close: '</em>', color: PAIR_COLORS.em },
]
const PairsCard = ({ code, progress, mark, scale = 1 }) => (
  <div style={{ position: 'relative', display: 'inline-block', transform: `scale(${scale})`, transformOrigin: 'top center', background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 28, padding: '26px 50px 30px', boxShadow: '0 24px 60px rgba(27,23,68,0.4)' }}>
    <TagPairs code={code} pairs={PAIRS} fontSize={76} progress={progress} />
    {mark && <div style={{ position: 'absolute', right: -34, top: -34 }}>{mark}</div>}
  </div>
)

export const TagsCruzadas = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tEx = s('Olha esse exemplo')
  const tOpenS = s('Eu abri o strong')
  const tCrossed = s('As tags ficaram cruzadas')
  const tFixes = s('O navegador tenta consertar')
  const tRule = s('A regra é')
  const tBoxes = s('Pensa em caixas')
  const tSmall = s('precisa fechar a pequena')
  const tBig = s('antes de fechar a grande')
  const tFix = s('Abriu strong, abriu em')
  const tClose = s('Então fecha em')
  const P1 = 1 - rampF(frame, tBoxes - 6, tBoxes + 6)
  const P2 = win(frame, tBoxes, tFix, 12)
  const P3 = rampF(frame, tFix, tFix + 12)
  const arcs1 = rampF(frame, tOpenS, tCrossed)
  const ruleChip = <Chip size={46} color={C.white} bg={C.purple} border={C.night}>a última que abriu é a primeira que fecha</Chip>
  return (
    <AbsoluteFill>
      {P1 > 0 && (
        <div style={{ opacity: P1 }}>
          <div style={abs(0, 90, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tEx - 10, 12) })}>
            <PairsCard code={crossed} progress={arcs1} mark={frame >= tCrossed + 6 && <Cross size={110} />} />
          </div>
          <div style={abs(0, 530, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tCrossed, 12) })}>
            <Chip size={42} color={C.night} border={C.red}>tags cruzadas</Chip>
          </div>
          <div style={abs(0, 650, { width: 1920, textAlign: 'center', opacity: win(frame, tFixes, tRule, 12) })}>
            <Chip size={40} color={C.night} border={C.purpleSoft}>o navegador "conserta" do jeito dele</Chip>
          </div>
          <div style={abs(0, 650, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tRule, 12) })}>{ruleChip}</div>
        </div>
      )}
      {P2 > 0 && (
        <div style={{ opacity: P2 }}>
          <div style={abs(0, 40, { width: 1920, textAlign: 'center' })}>{ruleChip}</div>
          <div style={abs(650, 160)}>
            <NestedBoxes smallIn={rampF(frame, tBoxes + 10, tBoxes + 40)} smallClosed={rampF(frame, tSmall, tSmall + 20)} bigClosed={rampF(frame, tBig + 10, tBig + 30)} />
          </div>
          <div style={abs(130, 380, { opacity: fadeIn(frame, tSmall, 10) })}>
            <Chip size={40} color={C.night} border={C.purple}>1º fecha a pequena: em</Chip>
          </div>
          <div style={abs(1320, 380, { opacity: fadeIn(frame, tBig + 10, 10) })}>
            <Chip size={40} color={C.night} border={C.purple}>2º fecha a grande: strong</Chip>
          </div>
        </div>
      )}
      {P3 > 0 && (
        <div style={{ opacity: P3 }}>
          <div style={abs(0, 40, { width: 1920, textAlign: 'center', opacity: 0.75 })}>
            <PairsCard code={crossed} progress={1} mark={<Cross size={100} />} scale={0.72} />
          </div>
          <div style={abs(0, 390, { width: 1920, textAlign: 'center' })}>
            <PairsCard code={nested} progress={rampF(frame, tClose, tClose + 40)} mark={frame >= tClose + 44 && <Check size={110} />} scale={0.9} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 12
export const Resumo = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const items = [
    { t: 'h1 a h6 e hierarquia', at: s('Os títulos vão do h1 ao h6') },
    { t: 'p', at: s('Texto corrido vai em parágrafos'), mono: true },
    { t: 'espaços extras', at: s('O navegador ignora os espaços') },
    { t: 'br', at: s('e a br quebra a linha'), mono: true },
    { t: 'strong e em', at: s('A strong marca o que é importante') },
    { t: 'comentários', at: s('E os comentários guardam') },
  ]
  const tBtn = s('Agora é a sua vez')
  const tNext = s('Na próxima aula')
  const tBye = s('Até lá')
  const end = rampF(frame, tNext, tNext + 18)
  const pulse = frame >= tBtn ? 1 + 0.05 * Math.sin((frame - tBtn) / 5) : 1
  const next = fadeIn(frame, tNext + 20, 14)
  const slogan = fadeIn(frame, tBye + 24, 14)
  return (
    <AbsoluteFill>
      <div style={abs(0, 28, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 70, fontWeight: 700, color: C.night, opacity: fadeIn(frame, 2, 12) })}>Resumo da aula</div>
      <div style={abs(380, 150, { display: 'grid', gridTemplateColumns: '580px 580px', columnGap: 60, rowGap: 34 })}>
        {items.map((it, i) => {
          const p = fadeIn(frame, it.at, 12)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
              <Check size={76} />
              <div style={{ fontFamily: it.mono ? MONO : FONT, fontSize: 52, color: C.night, fontWeight: it.mono ? 700 : 500 }}>{it.mono ? `<${it.t}>` : it.t}</div>
            </div>
          )
        })}
      </div>
      <div style={abs(0, 560, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tBtn, 14) })}>
        <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 600, padding: '20px 64px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tBtn) / 5)}px ${C.purpleSoft}` }}>
          Fazer os exercícios
        </div>
      </div>
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background dark />
          <div style={abs(0, 80, { width: 1920, display: 'flex', justifyContent: 'center', opacity: next, transform: `translateY(${(1 - next) * 20}px)` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: '#ffffff10', border: `3px solid ${C.purpleSoft}`, borderRadius: 28, padding: '26px 50px' }}>
              <LinkIcon size={110} />
              <ImageIcon size={110} />
              <div style={{ fontFamily: FONT, color: C.lavender }}>
                <div style={{ fontSize: 32, color: C.purpleSoft, fontWeight: 600 }}>Próxima aula</div>
                <div style={{ fontSize: 60, fontWeight: 700 }}>Aula 3 — Links e imagens</div>
              </div>
            </div>
          </div>
          <div style={abs(0, 400, { width: 1920, display: 'flex', justifyContent: 'center' })}>
            {frame >= tBye - 4 && <LogoReveal start={tBye - 4} height={220} unlockAt={18} bodyColor={C.purpleSoft} wordColor={C.lavender} />}
          </div>
          <div style={abs(0, 700, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 56, color: C.lavender, opacity: slogan, transform: `translateY(${(1 - slogan) * 16}px)` })}>
            Destrava sua carreira. Um nível de cada vez.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}
