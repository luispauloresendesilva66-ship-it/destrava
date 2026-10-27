import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Chip, Cross } from '../../components/Marks.jsx'
import { Book, HeadingTree, WhitespaceCollapse } from '../../components/Teaching.jsx'
import { AnaPage, bodySegments, lineOf } from './ana.jsx'

export const abs = (x, y, extra) => ({ position: 'absolute', left: x, top: y, ...extra })
export const rampF = (f, a, b) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
// opacidade de algo visível só no intervalo [a, b)
export const win = (f, a, b, d = 10) => rampF(f, a, a + d) * (1 - rampF(f, b - d / 2, b + d / 2))

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Na aula passada')
  const tSteps = s('Hoje a gente vai colocar')
  const tBuild = s('Vamos construir')
  const tPath = s('No caminho')
  const topics = [
    { t: 'títulos', at: s('organizar títulos') },
    { t: 'parágrafos', at: s('escrever parágrafos') },
    { t: 'quebra de linha', at: s('quebrar linhas') },
    { t: 'ênfase', at: s('dar ênfase') },
    { t: 'comentários', at: s('deixar recados') },
  ]
  const logoBig = 1 - rampF(frame, tTitle - 6, tTitle + 8)
  const logoSmall = rampF(frame, tTitle, tTitle + 14)
  const heights = [220, 270, 320, 370, 420]
  const prev = fadeIn(frame, tBuild, 18)
  return (
    <AbsoluteFill>
      <div style={abs(0, 0, { width: 1920, height: 880, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: logoBig })}>
        <LogoReveal start={4} height={300} />
      </div>
      <div style={abs(70, 50, { opacity: logoSmall, display: 'flex', alignItems: 'center', gap: 18 })}>
        <LogoMark height={64} keyColor={C.green} />
        <Wordmark size={52} />
      </div>
      <div style={abs(0, interpolate(frame, [tSteps - 8, tSteps + 14], [380, 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), { width: 1920 })}>
        <Title start={tTitle} size={92}>Aula 2 — Sua primeira página</Title>
      </div>
      {/* tópicos da aula */}
      <div style={abs(0, 262, { width: 1920, display: 'flex', justifyContent: 'center', gap: 22, opacity: frame >= tPath ? 1 : 0 })}>
        {topics.map((tp) => {
          const p = fadeIn(frame, tp.at, 10)
          return (
            <div key={tp.t} style={{ opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
              <Chip size={34} color={C.night} border={C.purpleSoft}>{tp.t}</Chip>
            </div>
          )
        })}
      </div>
      {/* 5 degraus, o primeiro aceso */}
      <div style={abs(110, 810 - 420, { width: 900, height: 420, display: 'flex', alignItems: 'flex-end', gap: 12 })}>
        {block.levels.map((name, i) => {
          const at = tSteps + 4 + i * 9
          const p = spring({ frame: frame - at, fps, config: { damping: 16, stiffness: 120 } })
          const lit = i === 0 ? rampF(frame, tSteps + 50, tSteps + 60) : 0
          return (
            <div key={name} style={{ flex: 1, height: heights[i] * clamp01(p), opacity: clamp01(p * 2), background: lit > 0 ? C.purple : '#D8D5F6', border: `4px solid ${lit > 0 ? C.night : C.purpleSoft}`, borderRadius: '16px 16px 0 0', boxShadow: lit > 0 ? `0 0 ${50 * lit}px ${C.purpleSoft}` : 'none', fontFamily: FONT, color: lit > 0 ? C.white : C.night, fontSize: 28, fontWeight: 600, textAlign: 'center', padding: '14px 6px', overflow: 'hidden' }}>
              <div style={{ fontSize: 50, opacity: 0.9, marginBottom: 4 }}>{i + 1}</div>
              {name}
            </div>
          )
        })}
      </div>
      {/* prévia desfocada do resultado */}
      <div style={abs(1110, 360, { opacity: prev, transform: `translateY(${(1 - prev) * 30}px)` })}>
        <div style={{ filter: 'blur(5px)' }}>
          <BrowserMock width={700} height={450} tabTitle="Sobre mim" url="index.html">
            <AnaPage parts={['h1', 'h2a', 'p1', 'p2', 'h2b', 'p3', 'sig']} base={15} />
          </BrowserMock>
        </div>
        <div style={abs(0, 190, { width: 700, textAlign: 'center' })}>
          <Chip size={38} color={C.white} bg={C.purple} border={C.night}>o que a gente vai construir hoje</Chip>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const PontoDePartida = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tD = s('o DOCTYPE')
  const tHtml = s('a tag html')
  const tHead = s('o head e o body')
  const tMeta = s('a meta charset')
  const tTitle = s('e o title')
  const tTab = s('Dessa vez')
  const tHands = s('Repara que eu estou')
  const tSave = s('Salva o arquivo')
  const tBlank = s('A página ainda está em branco')
  const tBody = s('Agora é encher o body')
  const segments = [
    { text: '<!DOCTYPE html>\n', start: tD, frames: 22 },
    { text: '<html lang="pt-BR">\n', start: tHtml, frames: 26 },
    { text: '  <head>\n', start: tHead, frames: 12 },
    { text: '    <meta charset="UTF-8">\n', start: tMeta, frames: 30 },
    { text: '    <title>Sobre mim</title>\n', start: tTitle, frames: 34 },
    { text: '  </head>\n  <body>\n  </body>\n</html>', start: tHead + 14, frames: 30 },
  ]
  const titled = frame >= tTitle + 34
  const arrow = win(frame, tTab, tHands, 14) + win(frame, tBlank, tBody, 14)
  const saved = frame >= tSave
  const blink = frame >= tBody ? 0.5 + 0.5 * Math.sin((frame - tBody) / 4) : 0
  return (
    <AbsoluteFill>
      <div style={abs(50, 40)}>
        <EditorWindow width={1040} height={690} filename={saved ? 'index.html' : 'sem título.html'}>
          <CodeTyping
            segments={segments}
            fontSize={42}
            highlights={[{ text: 'charset="UTF-8"', at: tMeta + 30, until: tTitle }]}
            lineHighlights={[
              { line: 4, at: tTab, until: tHands },
              { line: 4, at: tBlank, until: tBody },
              ...(blink > 0.5 ? [{ line: 6, at: tBody }, { line: 7, at: tBody }] : []),
            ]}
          />
        </EditorWindow>
      </div>
      <div style={abs(1180, 40)}>
        <BrowserMock width={690} height={560} tabTitle={titled ? 'Sobre mim' : 'Nova aba'} url="index.html" tabHighlight={arrow > 0.5}>
          {frame >= tBody && <div style={{ position: 'absolute', inset: 24, border: `5px dashed ${C.purpleSoft}`, borderRadius: 16, opacity: 0.35 + 0.65 * blink }} />}
        </BrowserMock>
      </div>
      {arrow > 0 && (
        <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: arrow }}>
          <defs>
            <marker id="ah2" markerUnits="userSpaceOnUse" markerWidth="30" markerHeight="30" refX="22" refY="15" orient="auto"><path d="M0 2 L30 15 L0 28 Z" fill={C.purple} /></marker>
          </defs>
          <path d="M800 400 C1150 400 1390 300 1390 112" fill="none" stroke={C.purple} strokeWidth="8" strokeLinecap="round" strokeDasharray="14 12" markerEnd="url(#ah2)" />
        </svg>
      )}
      <div style={abs(50, 760, { display: 'flex', gap: 24 })}>
        <div style={{ opacity: win(frame, tHands, tSave, 12) }}>
          <Chip size={38} color={C.white} bg={C.purple} border={C.night}>escreva com as próprias mãos</Chip>
        </div>
      </div>
      <div style={abs(50, 760, { opacity: win(frame, tSave, tBody, 12) })}>
        <Chip size={38} color={C.night} bg={C.white} border={C.purpleSoft}>Arquivo salvo: index.html</Chip>
      </div>
      <div style={abs(1180, 640, { width: 690, textAlign: 'center', opacity: fadeIn(frame, tBody, 12) })}>
        <Chip size={38} color={C.white} bg={C.purple} border={C.night}>é aqui que a gente vai trabalhar</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
const HEADS = [1, 2, 3, 4, 5, 6].map((n) => ({ n, code: `<h${n}>Título nível ${n}</h${n}>\n`, size: [2, 1.5, 1.17, 1, 0.83, 0.67][n - 1] }))

export const SeisNiveis = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const t0 = s('O HTML tem seis tags')
  const tH = s('A letra h vem de heading')
  const tImp = s('O h1 é o mais importante')
  const tWarn = s('Esses números não existem')
  const tHier = s('Eles existem para mostrar a hierarquia')
  const per = Math.max(18, Math.round((tH - t0 - 10) / 6))
  const segs = HEADS.map((h, i) => ({ text: i === 5 ? h.code.trim() : h.code, start: t0 + 10 + i * per, frames: per - 4 }))
  const arrowP = rampF(frame, tImp, tImp + 40)
  const base = 30
  return (
    <AbsoluteFill>
      <div style={abs(50, 60)}>
        <EditorWindow width={960} height={540} filename="index.html">
          <CodeTyping segments={segs} fontSize={44} />
        </EditorWindow>
      </div>
      <div style={abs(50, 640, { display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' })}>
        <div style={{ opacity: fadeIn(frame, tH, 12) }}>
          <Chip size={38} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>h</span> = heading = título</Chip>
        </div>
        <div style={{ opacity: fadeIn(frame, tWarn, 12) }}>
          <Chip size={38} color={C.white} bg={C.purple} border={C.night}>{frame >= tHier ? 'o número mostra a hierarquia (como capítulos de um livro)' : 'o número não é sobre o tamanho da letra'}</Chip>
        </div>
      </div>
      <div style={abs(1050, 60)}>
        <BrowserMock width={580} height={640} tabTitle="Sobre mim" url="index.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            {HEADS.map((h, i) => {
              const seg = segs[i]
              const op = rampF(frame, seg.start + seg.frames, seg.start + seg.frames + 8)
              return <div key={h.n} style={{ fontSize: base * h.size, fontWeight: 700, lineHeight: 1.2, marginBottom: base * 0.45, opacity: op }}>Título nível {h.n}</div>
            })}
          </div>
        </BrowserMock>
      </div>
      {/* seta vertical: mais importante -> menos importante */}
      <div style={abs(1650, 60, { width: 240, height: 640, opacity: clamp01(arrowP * 3), fontFamily: FONT, textAlign: 'center' })}>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.night, lineHeight: 1.15 }}>mais<br />importante</div>
        <svg width="240" height="460" viewBox="0 0 240 460">
          <line x1="120" y1="10" x2="120" y2={10 + 400 * arrowP} stroke={C.purple} strokeWidth="12" strokeLinecap="round" />
          <polygon points="92,400 148,400 120,446" fill={C.purple} opacity={arrowP >= 1 ? 1 : 0} />
        </svg>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.purple, lineHeight: 1.15, opacity: arrowP >= 1 ? 1 : 0 }}>menos<br />importante</div>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
const CodeCard = ({ code, width = 820, fontSize = 38, mark, label, children }) => (
  <div style={{ width, fontFamily: FONT }}>
    <div style={{ position: 'relative', background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 22, padding: '22px 10px', boxShadow: '0 20px 50px rgba(27,23,68,0.35)' }}>
      <CodeTyping segments={[{ text: code, start: 0, frames: 0 }]} fontSize={fontSize} cursor={false} />
      {mark && <div style={{ position: 'absolute', right: -26, top: -26 }}>{mark}</div>}
    </div>
    {label && <div style={{ marginTop: 22, textAlign: 'center' }}>{label}</div>}
    {children}
  </div>
)
export { CodeCard }

export const Hierarquia = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tCapa = s('um título na capa')
  const tCaps = s('depois capítulos')
  const tSec = s('seções')
  const tSame = s('O h1 é o título da capa')
  const tOne = s('a regra é usar um h1 por página')
  const tAna = s('Na página da Ana')
  const tH1 = s('o h1 vai ser')
  const tH2 = s('Depois vêm os capítulos')
  const tH2b = s('O que estou aprendendo')
  const tH3 = s('aí entra o h3')
  const tRule2 = s('E tem uma segunda regra')
  const tSize = s('nunca escolha um título pelo tamanho')
  const tCss = s('Isso é trabalho do CSS')
  const tEnd = s('O número do título diz')
  const A = 1 - rampF(frame, tAna - 6, tAna + 6)
  const B = win(frame, tAna, tRule2, 12)
  const Cp = rampF(frame, tRule2, tRule2 + 12)
  const open = rampF(frame, tCaps, tCaps + 26)
  const hl = frame >= tSec ? 'secoes' : frame >= tCaps + 26 ? 'capitulos' : frame >= tCapa ? 'capa' : null
  const keys = ['bodyOpen', 'h1', 'h2a', 'h2b', 'bodyClose']
  const segs = bodySegments(['bodyOpen', 'bodyClose'], { h1: [tH1 + 6, 40], h2a: [tH2 + 6, 26], h2b: [tH2b, 34] })
  const labels = [
    { t: 'capa = h1', at: tCapa },
    { t: 'capítulos = h2', at: tCaps },
    { t: 'seções = h3', at: tSec },
  ]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(110, 120)}>
            <Book open={open} hl={hl} width={940} title="Meu livro" />
          </div>
          <div style={abs(1170, 150, { display: 'flex', flexDirection: 'column', gap: 34, alignItems: 'flex-start' })}>
            {labels.map((l) => {
              const p = fadeIn(frame, l.at, 12)
              return (
                <div key={l.t} style={{ opacity: p, transform: `translateX(${(1 - p) * 40}px)` }}>
                  <Chip size={50} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>{l.t}</span></Chip>
                </div>
              )
            })}
            <div style={{ opacity: fadeIn(frame, tSame, 12), marginTop: 30 }}>
              <Chip size={44} color={C.white} bg={C.purple} border={C.night}>h1 = assunto principal da página</Chip>
            </div>
            <div style={{ opacity: fadeIn(frame, tOne, 12) }}>
              <Chip size={44} color={C.white} bg={C.night} border={C.night}>regra: um h1 por página</Chip>
            </div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(50, 60)}>
            <EditorWindow width={1000} height={420} filename="index.html">
              <CodeTyping segments={segs} fontSize={36} lineHighlights={[{ line: lineOf(keys, 'h1'), at: tH1 + 46, until: tH2 }]} />
            </EditorWindow>
          </div>
          <div style={abs(1100, 70)}>
            <HeadingTree
              width={760}
              nodeW={350}
              fontSize={28}
              rowGap={200}
              root={{ tag: 'h1', text: 'Olá, eu sou a Ana', at: tH1 + 30, children: [
                { tag: 'h2', text: 'Quem sou eu', at: tH2 + 26, children: [{ tag: 'h3', text: 'uma parte menor', at: tH3, dashed: true }] },
                { tag: 'h2', text: 'O que estou aprendendo', at: tH2b + 30 },
              ] }}
            />
          </div>
          <div style={abs(50, 520, { width: 1000 })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ opacity: fadeIn(frame, tH1, 12) }}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>h1 = capa</Chip></div>
              <div style={{ opacity: fadeIn(frame, tH2, 12) }}><Chip size={36} color={C.night} border={C.purple}>h2 = capítulos</Chip></div>
              <div style={{ opacity: fadeIn(frame, tH3, 12) }}><Chip size={36} color={C.night} border={C.purpleSoft}>h3 = seções</Chip></div>
            </div>
          </div>
        </div>
      )}
      {Cp > 0 && (
        <div style={{ opacity: Cp }}>
          <div style={abs(110, 110, { opacity: fadeIn(frame, tRule2, 12) })}>
            <CodeCard code={'<h1>Olá, eu sou a Ana</h1>\n<h1>Quem sou eu</h1>'} mark={frame >= tRule2 + 16 && <Cross size={96} />} label={<Chip size={38} color={C.night} border={C.red}>dois h1 na mesma página</Chip>} />
          </div>
          <div style={abs(1010, 110, { opacity: fadeIn(frame, tSize, 12) })}>
            <CodeCard code={'<h4>Quem sou eu</h4>'} mark={frame >= tSize + 24 && <Cross size={96} />} label={<Chip size={38} color={C.night} border={C.red}>“porque é pequenininho”</Chip>} />
          </div>
          <div style={abs(0, 470, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tCss, 12) })}>
            <Chip size={52} color={C.white} bg={C.purple} border={C.night}>tamanho é com o CSS</Chip>
          </div>
          <div style={abs(0, 600, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tEnd, 12), fontFamily: FONT, fontSize: 50, fontWeight: 600, color: C.night })}>
            o número diz a importância, não a aparência
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
export const Paragrafos = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tTag = s('Texto corrido vai dentro da tag p')
  const tP1 = s('Trabalho no atendimento')
  const tP2s = s('E logo depois')
  const tP2 = s('Nas horas livres')
  const tLook = s('Repara no navegador')
  const tGap = s('com um espacinho entre eles')
  const tIdea = s('Uma ideia, um parágrafo')
  const p1F = Math.max(40, tP2s - tP1 - 6)
  const p2F = Math.max(30, tLook - tP2 - 6)
  const keys = ['bodyOpen', 'h1', 'h2a', 'p1', 'p2', 'h2b', 'bodyClose']
  const segs = bodySegments(['bodyOpen', 'h1', 'h2a', 'h2b', 'bodyClose'], { p1: [tP1, p1F], p2: [tP2, p2F] })
  const parts = ['h1', 'h2a', 'h2b']
  if (frame >= tP1 + p1F) parts.push('p1')
  if (frame >= tP2 + p2F) parts.push('p2')
  const gap = fadeIn(frame, tGap, 14)
  return (
    <AbsoluteFill>
      <div style={abs(50, 40)}>
        <EditorWindow width={1060} height={600} filename="index.html">
          <CodeTyping
            segments={segs}
            fontSize={30}
            wrap
            lineHighlights={[lineOf(keys, 'p1'), lineOf(keys, 'p2')].map((line) => ({ line, at: tLook }))}
          />
        </EditorWindow>
      </div>
      <div style={abs(50, 680, { opacity: win(frame, tTag, tLook, 12) })}>
        <Chip size={40} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>{'<p>'}</span> = parágrafo: texto corrido</Chip>
      </div>
      <div style={abs(50, 680, { opacity: fadeIn(frame, tIdea, 12) })}>
        <Chip size={44} color={C.white} bg={C.purple} border={C.night}>uma ideia, um parágrafo</Chip>
      </div>
      <div style={abs(1150, 40)}>
        <BrowserMock width={720} height={600} tabTitle="Sobre mim" url="index.html">
          <AnaPage parts={parts} base={22} gapMark={gap} hl={frame >= tLook && frame < tGap ? ['p1', 'p2'] : []} />
        </BrowserMock>
      </div>
      <div style={abs(1150, 680, { width: 720, textAlign: 'center', opacity: gap })}>
        <Chip size={40} color={C.white} bg={C.purple} border={C.night}>o navegador separa sozinho</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 6
export const Espacos = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSp = s('Imagina que eu aperte')
  const tEn = s('Ou que eu dê vários enters')
  const tAsk = s('O que você acha')
  const tNo = s('Nada disso')
  const tJoin = s('O navegador junta')
  const tGood = s('Isso tem até um lado bom')
  const tBut = s('Mas também quer dizer')
  const tTag = s('Para isso, existe uma tag própria')
  const segs = [
    { text: '<p>Eu', start: tSp - 4, frames: 10 },
    { text: '          ', start: tSp + 30, frames: 40 },
    { text: 'gosto de', start: tSp + 76, frames: 18 },
    { text: '       ', start: tSp + 98, frames: 24 },
    { text: '\n\n\n', start: tEn + 16, frames: 24 },
    { text: 'programar.</p>', start: tEn + 46, frames: 24 },
  ]
  const collapse = rampF(frame, tJoin + 30, tJoin + 80)
  const card = fadeIn(frame, tJoin, 14)
  return (
    <AbsoluteFill>
      <div style={abs(50, 40)}>
        <EditorWindow width={1060} height={440} filename="index.html">
          <CodeTyping segments={segs} fontSize={44} markSpaces />
        </EditorWindow>
      </div>
      <div style={abs(1150, 40)}>
        <BrowserMock width={720} height={440} tabTitle="Sobre mim" url="index.html">
          {frame >= tAsk && frame < tNo && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 150, fontWeight: 700, color: C.purpleSoft, opacity: fadeIn(frame, tAsk, 10) }}>?</div>
          )}
          <div style={{ fontFamily: FONT, fontSize: 34, color: '#1A1A1A', opacity: fadeIn(frame, tNo, 12) }}>Eu gosto de programar.</div>
        </BrowserMock>
      </div>
      <div style={abs(110, 530, { width: 1700, opacity: card, transform: `translateY(${(1 - card) * 20}px)` })}>
        <div style={{ background: C.white, borderRadius: 24, border: `3px solid ${C.purpleSoft}`, boxShadow: '0 18px 40px rgba(38,33,92,0.18)', padding: '26px 40px', display: 'flex', justifyContent: 'center' }}>
          <WhitespaceCollapse text={'Eu          gosto de       \n\nprogramar.'} progress={collapse} fontSize={58} />
        </div>
      </div>
      <div style={abs(0, 735, { width: 1920, textAlign: 'center' })}>
        <div style={{ position: 'absolute', left: 0, width: 1920, opacity: win(frame, tJoin + 40, tGood, 12) }}>
          <Chip size={44} color={C.white} bg={C.purple} border={C.night}>vários espaços = um espaço</Chip>
        </div>
        <div style={{ position: 'absolute', left: 0, width: 1920, opacity: win(frame, tGood, tBut, 12) }}>
          <Chip size={44} color={C.night} border={C.purple}>por isso dá para indentar o código à vontade</Chip>
        </div>
        <div style={{ position: 'absolute', left: 0, width: 1920, opacity: fadeIn(frame, tBut, 12) }}>
          <Chip size={44} color={C.white} bg={C.purple} border={C.night}>{frame >= tTag ? 'para quebrar a linha: uma tag própria' : 'enter no editor não quebra a linha na tela'}</Chip>
        </div>
      </div>
    </AbsoluteFill>
  )
}
