import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { SpeakerIcon } from '../../components/Icons.jsx'
import { Acronym, Label, LinesBox, ScrollEditor, abs, edAt, rampF, win } from './scenes-a.jsx'
import { CAPTION, CodeCard, FormIcon, H2_ROTINA, HEAD3, OldLayout, ROWS3, SpeechBubble, TableView, Tag, cardAt } from './ana.jsx'

const RED = 'rgba(217,83,79,0.55)'
const GOOD = 'rgba(151,196,89,0.45)'
const YEL = 'rgba(255,210,138,0.5)'
const BLUE = '#5B8DEF'

// ---------------------------------------------------------------- Bloco 6
export const Partes = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tBig = s('Numa tabela maior')
  const tHead = s('A linha de cabeçalhos vai dentro')
  const tHeadDef = s('de table head')
  const tBody = s('E as linhas de dados vão dentro')
  const tBodyDef = s('de table body')
  const tOrder = s('A ordem fica assim')
  const tOpen = s('abre a têibol')
  const tCap = s('vem a quépchon')
  const tTh = s('depois a tê réd')
  const tTb = s('e por fim a tê bódi')
  const tNav = s('No navegador, quase nada muda')
  const tOrg = s('Mas o código fica mais organizado')
  const tCss = s('e mais tarde o CSS')
  const tCur = s('Um detalhe curioso')
  const tAuto = s('o navegador cria uma sozinho')
  const tWants = s('Ele faz questão')
  const A = win(frame, 0, tOrder, 14)
  const B = rampF(frame, tOrder - 4, tOrder + 10)
  const ed = { x: 50, y: 40, fs: 28 }
  const segs = [
    { text: '<table>', start: tOpen + 2, frames: 8 },
    { text: `\n  <caption>${CAPTION}</caption>`, start: tCap + 2, frames: 26 },
    { text: '\n  <thead>\n    <tr>\n      <th>Dia</th>\n      <th>Assunto</th>\n    </tr>\n  </thead>', start: tTh + 4, frames: 40 },
    { text: '\n  <tbody>\n    <tr>\n      <td>Segunda</td>\n      <td>HTML</td>\n    </tr>\n  </tbody>', start: tTb + 4, frames: 40 },
    { text: '\n</table>', start: tTb + 48, frames: 8 },
  ]
  const headBox = fadeIn(frame, tTh + 46, 10)
  const bodyBox = fadeIn(frame, tTb + 46, 10)
  const ghostCard = { x: 990, y: 600, fs: 26 }
  const lens = rampF(frame, tCur + 10, tAuto)
  const lensOp = win(frame, tCur + 4, tAuto + 16, 8)
  const ghost = fadeIn(frame, tAuto, 12)
  const g0 = cardAt(ghostCard, 1, 0)
  const g1 = cardAt(ghostCard, 3, 30)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(160, 140)}>
            <Acronym word="table head" keys={[0, 6, 7, 8, 9]} tag="thead" meaning="cabeça" op={fadeIn(frame, tHead, 12)} defOp={fadeIn(frame, tHeadDef, 12)} />
          </div>
          <div style={abs(160, 430)}>
            <Acronym word="table body" keys={[0, 6, 7, 8, 9]} tag="tbody" meaning="corpo" op={fadeIn(frame, tBody, 12)} defOp={fadeIn(frame, tBodyDef, 12)} />
          </div>
          <div style={abs(1100, 180, { opacity: fadeIn(frame, tBig, 12), background: C.white, borderRadius: 18, padding: 26, boxShadow: '0 14px 30px rgba(38,33,92,0.16)' })}>
            <TableView fs={36} head={HEAD3} rows={ROWS3.slice(0, 2).map((cells) => ({ cells }))}
              cellHl={(ci, c) => (HEAD3.includes(c.t) ? (frame >= tHead ? 'rgba(91,141,239,0.3)' : null) : frame >= tBody ? 'rgba(151,196,89,0.3)' : null)} />
            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
              <div style={{ opacity: fadeIn(frame, tHead, 10) }}><Chip size={28} color={C.night} border={BLUE}>cabeça</Chip></div>
              <div style={{ opacity: fadeIn(frame, tBody, 10) }}><Chip size={28} color={C.night} border={C.green}>corpo</Chip></div>
            </div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={750} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} />
            </EditorWindow>
          </div>
          <LinesBox ed={ed} l0={2} l1={7} c0={2} c1={22} op={headBox} color={BLUE} dashed={false} />
          <LinesBox ed={ed} l0={8} l1={13} c0={2} c1={22} op={bodyBox} color={C.green} dashed={false} />
          <div style={abs(edAt(ed, 4, 26).x, edAt(ed, 4, 0).y - 24, { opacity: headBox })}><Chip size={28} color={C.white} bg={BLUE} border={C.night}>cabeça</Chip></div>
          <div style={abs(edAt(ed, 10, 26).x, edAt(ed, 10, 0).y - 24, { opacity: bodyBox })}><Chip size={28} color={C.night} bg={C.green} border={C.night}>corpo</Chip></div>
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={380} tabTitle="Sobre mim" url="index.html">
              <TableView fs={34} caption={CAPTION} capOp={rampF(frame, tCap + 24, tCap + 32)} head={[{ t: 'Dia' }, { t: 'Assunto' }]} headOp={rampF(frame, tTh + 30, tTh + 40)}
                rows={[{ cells: ['Segunda', 'HTML'], op: rampF(frame, tTb + 30, tTb + 40) }]} />
            </BrowserMock>
          </div>
          <div style={abs(990, 450, { opacity: fadeIn(frame, tNav, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>no navegador, quase nada muda</Chip></div>
          <div style={abs(990, 530, { opacity: fadeIn(frame, tOrg, 12) * (1 - fadeIn(frame, tCur, 10)) })}><Chip size={30} color={C.night} border={C.purple}>código organizado · o CSS estiliza cada parte{frame >= tCss ? ' (depois)' : ''}</Chip></div>
          {/* raio-x: tabela sem tbody */}
          <div style={{ opacity: fadeIn(frame, tCur, 12) }}>
            <CodeCard x={ghostCard.x} y={ghostCard.y} fs={ghostCard.fs} title={ghost > 0 ? "o que o navegador monta" : "sem tbody no código"}
              text={ghost > 0 ? '<table>\n  <tbody>\n    <tr><td>Segunda</td></tr>\n  </tbody>\n</table>' : '<table>\n  <tr><td>Segunda</td></tr>\n</table>'} />
            {ghost > 0 && <div style={abs(g0.x - 12, g0.y - ghostCard.fs * 0.75 - 4, { width: g1.x - g0.x + 24, height: g1.y - g0.y + ghostCard.fs * 1.5 + 8, border: `3px dashed ${C.lavender}`, borderRadius: 10, boxSizing: 'border-box', opacity: ghost })} />}
            {ghost > 0 && [1, 3].map((l) => <div key={l} style={abs(g0.x + 2, cardAt(ghostCard, l, 0).y - ghostCard.fs * 0.75, { width: g1.x - g0.x - 4, height: ghostCard.fs * 1.5, background: 'rgba(27,23,68,0.45)' })} />)}
            <div style={abs(1530, 640, { opacity: ghost })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>o navegador cria sozinho</Chip></div>
            <div style={abs(1530, 730, { opacity: fadeIn(frame, tWants, 12) })}><Chip size={26} color={C.night} border={C.purple}>toda tabela tem um corpo</Chip></div>
          </div>
          {lensOp > 0 && (
            <div style={abs(ghostCard.x - 40 + lens * 360, ghostCard.y - 30, { opacity: lensOp })}>
              <svg width="230" height="230" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
                <line x1="190" y1="190" x2="270" y2="270" stroke={C.night} strokeWidth="22" strokeLinecap="round" />
                <circle cx="110" cy="110" r="100" fill="rgba(27,23,68,0.9)" stroke={C.purpleSoft} strokeWidth="10" />
                <text x="110" y="124" textAnchor="middle" fontFamily={MONO} fontSize="40" fontWeight="700" fill="#B3ADFF" opacity={lens > 0.3 ? 1 : 0.3}>{'<tbody>'}</text>
              </svg>
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
// Código completo do horário (sem recuo extra: começa no <h2>).
const rowCode = (r) => `\n    <tr>\n      <td>${r[0]}</td>\n      <td>${r[1]}</td>\n      <td>${r[2]}</td>\n    </tr>`
export const PaginaAna = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tStart = s('Agora, vamos montar')
  const tWant = s('Ela quer mostrar')
  const tThead = s('Na tê réd, uma linha')
  const tTbody = s('Na tê bódi, uma linha')
  const tR1 = s('Segunda, das sete')
  const tR2 = s('Quarta, no mesmo horário')
  const tR3 = s('E sábado')
  const tRep = s('Repara que cada linha')
  const tLess = s('Se uma linha ficar com menos')
  const tOrd = s('E a ordem das células')
  const tC1 = s('a primeira tê dê de cada linha')
  const tC2 = s('a segunda na coluna')
  const tC3 = s('e a terceira na coluna')
  const tSwap = s('Se você trocar a ordem')
  const tIndent = s('E, para o código ficar fácil')
  const ed0 = { x: 50, y: 40, fs: 28 }
  const rowFrames = (a, b) => Math.max(20, b - a - 8)
  const segs = [
    { text: `<h2>${H2_ROTINA}</h2>`, start: tStart + 4, frames: 22 },
    { text: `\n<table>\n  <caption>${CAPTION}</caption>`, start: tWant + 4, frames: 40 },
    { text: '\n  <thead>\n    <tr>' + HEAD3.map((h) => `\n      <th>${h}</th>`).join('') + '\n    </tr>\n  </thead>', start: tThead + 2, frames: rowFrames(tThead, tTbody) },
    { text: '\n  <tbody>', start: tTbody + 2, frames: 10 },
    { text: rowCode(ROWS3[0]), start: tR1, frames: rowFrames(tR1, tR2) },
    { text: rowCode(ROWS3[1]), start: tR2, frames: rowFrames(tR2, tR3) },
    { text: rowCode(ROWS3[2]), start: tR3, frames: rowFrames(tR3, tRep) },
    { text: '\n  </tbody>\n</table>', start: tRep - 6, frames: 10 },
  ]
  // linhas já digitadas (contínuo) -> rolagem do editor
  let lines = 1
  for (const g of segs) {
    const n = (g.text.match(/\n/g) || []).length
    lines += n * rampF(frame, g.start, g.start + g.frames)
  }
  const VISIBLE = 16
  const scroll = Math.max(0, lines - VISIBLE)
  const ed = { ...ed0, scroll }
  const full = segs.map((g) => g.text).join('')
  const allLines = full.split('\n')
  const numbers = allLines.map((_, i) => 20 + i)
  // prévia
  const cellsOf = (row, t, f) => row.map((c, k) => ({ t: c, op: rampF(frame, t + (f * (k + 2)) / 5, t + (f * (k + 2)) / 5 + 6) }))
  const swap = win(frame, tSwap + 10, tIndent, 10)
  const cnt = (i) => {
    const p = fadeIn(frame, tRep + 6 + i * 10, 8)
    return p > 0 ? (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, opacity: p, fontSize: 20, fontWeight: 600, color: C.night }}><Check size={30} />3 células</span>
    ) : null
  }
  const colHl = frame >= tC3 ? 2 : frame >= tC2 ? 1 : frame >= tC1 ? 0 : -1
  const colOp = win(frame, tC1, tSwap, 8)
  const rows = [
    { cells: cellsOf(ROWS3[0], tR1, rowFrames(tR1, tR2)), op: rampF(frame, tR1 + 4, tR1 + 10), after: cnt(0) },
    { cells: cellsOf(ROWS3[1], tR2, rowFrames(tR2, tR3)), op: rampF(frame, tR2 + 4, tR2 + 10), after: cnt(1) },
    swap > 0
      ? { cells: [ROWS3[2][1], ROWS3[2][0], ROWS3[2][2]], bad: true, key: 'swap' }
      : { cells: cellsOf(ROWS3[2], tR3, rowFrames(tR3, tRep)), op: rampF(frame, tR3 + 4, tR3 + 10), after: cnt(2) },
  ]
  const indentOn = fadeIn(frame, tIndent + 10, 10)
  return (
    <AbsoluteFill>
      <ScrollEditor ed={ed} width={870} height={800} scroll={scroll}>
        <CodeTyping segments={segs} fontSize={ed.fs} numbers={numbers} />
      </ScrollEditor>
      {/* recuo destacado em amarelo nas linhas visíveis */}
      {indentOn > 0 && allLines.map((ln, i) => {
        const n = ln.length - ln.trimStart().length
        if (!n || i < Math.floor(scroll) || i >= scroll + VISIBLE) return null
        const a = edAt(ed, i, 0)
        const b = edAt(ed, i, n)
        return <div key={i} style={abs(a.x, a.y - ed.fs * 0.62, { width: b.x - a.x - 3, height: ed.fs * 1.24, background: '#E8B860', opacity: 0.55 * indentOn, borderRadius: 4 })} />
      })}
      <div style={abs(950, 40, { opacity: fadeIn(frame, tStart, 12) })}>
        <BrowserMock width={920} height={540} tabTitle="Sobre mim" url="index.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            <div style={{ fontSize: 34, fontWeight: 700, opacity: rampF(frame, tStart + 20, tStart + 28) }}>{H2_ROTINA}</div>
            <TableView fs={25} style={{ marginTop: 16 }} caption={CAPTION} capOp={rampF(frame, tWant + 40, tWant + 48)}
              head={HEAD3} headOp={rampF(frame, tThead + 20, tThead + 30)} rows={rows} colHl={colHl} colHlOp={colOp} />
          </div>
        </BrowserMock>
      </div>
      <div style={abs(950, 610, { opacity: win(frame, tWant, tThead, 12) })}><Chip size={30} color={C.night} border={C.purple}>3 colunas: dia, horário e assunto</Chip></div>
      <div style={abs(950, 610, { opacity: win(frame, tRep, tOrd, 12) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>cada linha: exatamente 3 células</Chip></div>
      <div style={abs(950, 700, { opacity: win(frame, tLess, tOrd, 12), display: 'flex', alignItems: 'center', gap: 14 })}><Cross size={52} /><Chip size={28} color={C.night} border={C.red}>com menos células, a tabela fica torta</Chip></div>
      <div style={abs(950, 610, { opacity: win(frame, tOrd, tSwap, 12) })}><Chip size={30} color={C.night} border={C.purple}>1ª célula → Dia · 2ª → Horário · 3ª → Assunto</Chip></div>
      <div style={abs(950, 610, { opacity: swap, display: 'flex', alignItems: 'center', gap: 14 })}><Cross size={52} /><Chip size={30} color={C.night} border={C.red}>ordem trocada: o sábado foi parar em Horário</Chip></div>
      <Label x={950} y={640} w={920} op={indentOn} dark size={32}>cada nível mais para dentro</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
export const Acessivel = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tStart = s('Vamos falar de quem')
  const tSees = s('Uma pessoa com leitor de tela')
  const tOnly = s('Se a tabela só tem tê dê')
  const tSay = s('segunda, dezenove às vinte, HTML')
  const tWonder = s('E fica se perguntando')
  const tBig = s('Numa tabela grande')
  const tWith = s('Com a tê agá, o leitor')
  const tDia = s('dia, segunda')
  const tHor = s('Horário, dezenove')
  const tAss = s('Assunto, HTML')
  const tDiff = s('Faz toda a diferença')
  const tCap = s('E a quépchon dá o nome')
  const tRules = s('Então, duas regras')
  const tR1 = s('toda tabela de dados tem')
  const tR2 = s('e toda tabela tem uma quépchon')
  const P1 = win(frame, tOnly, tWith, 12)
  const P2 = fadeIn(frame, tWith, 12)
  const dim = 0.9 * fadeIn(frame, tSees, 16)
  const bad = ['Segunda', '19h às 20h', 'HTML']
  const good = [['Dia', 'Segunda', tDia], ['Horário', '19h às 20h', tHor], ['Assunto', 'HTML', tAss]]
  const qOp = fadeIn(frame, tWonder, 10)
  const step = 14
  return (
    <AbsoluteFill>
      <div style={abs(80, 40, { opacity: fadeIn(frame, tStart, 12) })}>
        <BrowserMock width={820} height={420} tabTitle="Sobre mim" url="index.html">
          <TableView fs={24} caption={CAPTION} head={HEAD3} headAsTd={P1 > 0 && P2 <= 0} rows={ROWS3.map((cells) => ({ cells }))} dim={dim} style={{ display: 'block' }} tableStyle={{ width: '100%' }} />
          <div style={abs(0, 0, { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: fadeIn(frame, tSees, 16) })}>
            <SpeakerIcon size={170} color={C.lavender} />
          </div>
        </BrowserMock>
      </div>
      <div style={abs(80, 480, { opacity: fadeIn(frame, tSees + 20, 12) * (1 - fadeIn(frame, tCap, 10)) })}><Chip size={30} color={C.night} border={C.purple}>não vê a grade: ouve célula por célula</Chip></div>
      <div style={abs(80, 480, { opacity: fadeIn(frame, tCap, 12) })}><SpeechBubble text={`Tabela: ${CAPTION}`} fs={30} icon={70} /></div>
      {/* só td */}
      {P1 > 0 && (
        <div style={{ opacity: P1 }}>
          {bad.map((t, i) => (
            <div key={t} style={abs(1000, 60 + i * 110)}><SpeechBubble text={t} fs={34} icon={70} op={fadeIn(frame, tSay + i * step, 10)} /></div>
          ))}
          {[[1420, 30], [1800, 60], [1370, 250], [1810, 290]].map(([x, y], i) => (
            <div key={i} style={abs(x, y, { fontFamily: FONT, fontSize: 80, fontWeight: 800, color: C.purpleSoft, opacity: qOp, transform: `rotate(${(i % 2 ? 1 : -1) * 12}deg)` })}>?</div>
          ))}
          <div style={abs(1440, 170, { opacity: fadeIn(frame, tWonder + 30, 10) })}><Chip size={26} color={C.night} border={C.red}>horário? nota? preço?</Chip></div>
          <Label x={1000} y={400} w={860} op={fadeIn(frame, tSay + 40, 12)} size={34} border={C.red}>só td: dados sem contexto</Label>
          <div style={abs(1000, 500, { opacity: fadeIn(frame, tBig, 12), display: 'flex', alignItems: 'center', gap: 16 })}>
            <Cross size={56} />
            <Chip size={30} color={C.night} border={C.red}>10 linhas × 5 colunas = confusão</Chip>
          </div>
        </div>
      )}
      {/* com th */}
      {P2 > 0 && (
        <div style={{ opacity: P2 }}>
          {good.map(([h, v, at]) => (
            <div key={h} style={abs(1000, 60 + good.findIndex((g) => g[0] === h) * 110, { display: 'flex', alignItems: 'center', gap: 16 })}>
              <SpeechBubble text={`${h}: ${v}`} fs={34} icon={70} op={fadeIn(frame, at, 10)} />
              <div style={{ opacity: fadeIn(frame, at + 10, 8) }}><Check size={52} /></div>
            </div>
          ))}
          <Label x={1000} y={400} w={860} op={fadeIn(frame, tDiff, 12)} dark size={34}>th dá contexto</Label>
        </div>
      )}
      {/* regras */}
      <div style={abs(80, 640, { width: 1760, display: 'flex', gap: 40, opacity: fadeIn(frame, tRules, 12) })}>
        {[
          { t: <>dados → <Tag color={C.purple}>{'<th>'}</Tag> nos cabeçalhos</>, at: tR1 },
          { t: <>toda tabela → <Tag color={C.purple}>{'<caption>'}</Tag></>, at: tR2 },
        ].map((r, i) => {
          const p = fadeIn(frame, r.at, 12)
          return (
            <div key={i} style={{ flex: 1, height: 150, opacity: p, transform: `translateY(${(1 - p) * 20}px)`, background: C.white, border: `5px solid ${C.purple}`, borderRadius: 26, display: 'flex', alignItems: 'center', gap: 24, padding: '0 36px', boxShadow: '0 16px 36px rgba(38,33,92,0.16)', fontFamily: FONT, fontSize: 46, fontWeight: 600, color: C.night }}>
              <Check size={64} />{r.t}
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
const ErrTitle = ({ n, children }) => (
  <div style={abs(120, 40, { display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT })}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: C.purple, color: C.white, fontSize: 40, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 700, color: C.night }}>{children}</div>
  </div>
)

export const Erros = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tE1 = s('O primeiro')
  const tLives = s('Toda célula mora')
  const tE2 = s('O segundo')
  const tStrong = s('às vezes com um strong')
  const tLooks = s('Fica com cara de título')
  const tSr = s('mas o leitor de tela não sabe')
  const tE3 = s('O terceiro')
  const tCrooked = s('e a tabela fica torta')
  const tCount = s('Antes de terminar, conte')
  const tSame = s('todas precisam ter o mesmo')
  const tE4 = s('E o quarto')
  const tNot = s('Se o conteúdo não é dado')
  const k1 = win(frame, tE1 - 6, tE2, 12)
  const k2 = win(frame, tE2, tE3, 12)
  const k3 = win(frame, tE3, tE4, 12)
  const k4 = rampF(frame, tE4, tE4 + 12)
  const fs = 40
  const fixAt = tCount + 10
  const fixed = frame >= fixAt + 16
  const checklist = [
    <><Tag>td</Tag> e <Tag>th</Tag> dentro de <Tag>tr</Tag></>,
    <>títulos com <Tag>th</Tag></>,
    'linhas completas',
    'tabela só para dados',
  ]
  return (
    <AbsoluteFill>
      {k1 > 0 && (
        <div style={{ opacity: k1 }}>
          <ErrTitle n={1}><Tag>td</Tag> solto, sem <Tag>tr</Tag></ErrTitle>
          <CodeCard x={120} y={190} fs={fs} text="<table><td>Segunda</td></table>" highlights={[{ text: '<td>Segunda</td>', at: tE1 + 20, color: RED }]} mark={frame >= tE1 + 20 ? <Cross size={70} /> : null} />
          <div style={abs(120, 320, { opacity: fadeIn(frame, tE1 + 26, 12) })}><Chip size={32} color={C.night} border={C.red}><Tag>td</Tag> solto</Chip></div>
          <CodeCard x={120} y={460} fs={fs} text="<table><tr><td>Segunda</td></tr></table>" op={fadeIn(frame, tLives, 12)} highlights={[{ text: '<tr>', at: tLives, color: GOOD }, { text: '</tr>', at: tLives, color: GOOD }]} mark={<Check size={70} />} />
          <div style={abs(120, 590, { opacity: fadeIn(frame, tLives + 14, 12) })}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>toda célula mora numa linha</Chip></div>
        </div>
      )}
      {k2 > 0 && (
        <div style={{ opacity: k2 }}>
          <ErrTitle n={2}>título de coluna como <Tag>td</Tag></ErrTitle>
          <CodeCard x={120} y={190} fs={fs} text="<td><strong>Dia</strong></td>" highlights={[{ text: '<strong>', at: tStrong + 10, color: RED }, { text: '</strong>', at: tStrong + 10, color: RED }]} mark={frame >= tLooks ? <Cross size={70} /> : null} />
          <div style={abs(120, 320, { opacity: fadeIn(frame, tLooks, 12) })}><Chip size={32} color={C.night} border={C.red}>parece cabeçalho, mas não é</Chip></div>
          <div style={abs(960, 200, { opacity: fadeIn(frame, tSr, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            <SpeakerIcon size={80} waves={0} />
            <Chip size={32} color={C.night} border={C.red}>o leitor de tela não sabe que é título</Chip>
          </div>
          <CodeCard x={120} y={460} fs={fs} text="<th>Dia</th>" op={fadeIn(frame, tSr + 24, 12)} highlights={[{ text: '<th>Dia</th>', at: tSr + 24, color: GOOD }]} mark={<Check size={70} />} />
          <div style={abs(120, 590, { opacity: fadeIn(frame, tSr + 36, 12) })}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>cabeçalho de verdade: <Tag>th</Tag></Chip></div>
        </div>
      )}
      {k3 > 0 && (
        <div style={{ opacity: k3 }}>
          <ErrTitle n={3}>linhas com células a menos</ErrTitle>
          <CodeCard x={100} y={190} fs={26} segments={[
            { text: '<tr><th>Dia</th><th>Horário</th><th>Assunto</th></tr>\n<tr><td>Segunda</td><td>19h às 20h</td><td>HTML</td></tr>\n<tr><td>Quarta</td><td>19h às 20h</td>', start: 0, frames: 0 },
            { text: '<td>CSS</td>', start: fixAt, frames: 14 },
            { text: '</tr>', start: 0, frames: 0 },
          ]} highlights={[{ text: '<td>CSS</td>', at: fixAt, color: GOOD }]} />
          <div style={abs(100, 400, { opacity: fadeIn(frame, tE3 + 20, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            {fixed ? <Check size={64} /> : <Cross size={64} />}
            <Chip size={32} color={C.night} border={fixed ? C.green : C.red}>{fixed ? 'mesmo número de células' : 'a linha da quarta tem só 2 células'}</Chip>
          </div>
          <div style={abs(100, 520, { opacity: fadeIn(frame, tCount, 12) })}><Chip size={30} color={C.night} border={C.purple}>conte as células de cada linha: 3, 3, {fixed ? 3 : 2}</Chip></div>
          <div style={abs(1040, 170, { opacity: fadeIn(frame, tE3 + 10, 12) })}>
            <BrowserMock width={830} height={380} tabTitle="Sobre mim" url="index.html">
              <TableView fs={28} head={HEAD3} rows={[
                { cells: ROWS3[0] },
                { cells: ['Quarta', '19h às 20h', { t: 'CSS', op: rampF(frame, fixAt + 14, fixAt + 22), hl: win(frame, fixAt + 14, tE4, 8) }], after: frame >= tCrooked && frame < fixAt + 14 ? <div style={{ opacity: fadeIn(frame, tCrooked, 10), display: 'flex' }}><Cross size={44} /></div> : null },
              ]} />
            </BrowserMock>
          </div>
          <div style={abs(1040, 580, { opacity: fadeIn(frame, tCrooked, 12) * (fixed ? 0 : 1) })}><Chip size={30} color={C.night} border={C.red}>um buraco no fim da linha: tabela torta</Chip></div>
          <Label x={1040} y={580} w={830} op={fadeIn(frame, tSame, 12)} dark size={32}>mesmo número de células</Label>
        </div>
      )}
      {k4 > 0 && (
        <div style={{ opacity: k4 }}>
          <ErrTitle n={4}>tabela para montar o layout</ErrTitle>
          <div style={abs(120, 170)}><OldLayout width={760} cells={1} bad={fadeIn(frame, tE4 + 10, 10)} /></div>
          <div style={abs(810, 140, { opacity: fadeIn(frame, tE4 + 10, 8) })}><Cross size={90} /></div>
          <Label x={120} y={680} w={760} op={fadeIn(frame, tE4 + 16, 12)} size={36} border={C.red}>tabela não é layout</Label>
          <div style={abs(1040, 150, { width: 820, opacity: fadeIn(frame, tE4 + 20, 14), background: C.white, border: `4px solid ${C.purple}`, borderRadius: 26, padding: '22px 30px', boxSizing: 'border-box', boxShadow: '0 18px 40px rgba(38,33,92,0.16)', fontFamily: FONT })}>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.night, marginBottom: 18 }}>checklist</div>
            {checklist.map((t, i) => {
              const p = fadeIn(frame, tE4 + 28 + i * 12, 10)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16, opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
                  <Check size={52} />
                  <div style={{ fontSize: 36, color: C.night }}>{t}</div>
                </div>
              )
            })}
          </div>
          <div style={abs(1040, 640, { opacity: fadeIn(frame, tNot, 12) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>não é dado em linhas e colunas? não é tabela</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
export const Resumo = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const P = (t) => <Tag color={C.purple}>{t}</Tag>
  const items = [
    { t: <>tabela: só para dados</>, at: s('Tabela é para dados') },
    { t: <>{P('table')}: a caixa</>, at: s('A têibol é a caixa') },
    { t: <>{P('tr')}: linha · {P('td')}: célula</>, at: s('Cada linha é uma tê erre') },
    { t: <>{P('th')}: cabeçalho</>, at: s('Os cabeçalhos usam') },
    { t: <>{P('caption')}: o título, logo no começo</>, at: s('A quépchon dá o título') },
    { t: <>{P('thead')} e {P('tbody')}: cabeça e corpo</>, at: s('E a tê réd e a tê bódi') },
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
      <div style={abs(460, 140, { display: 'flex', flexDirection: 'column', gap: 14 })}>
        {items.map((it, i) => {
          const p = fadeIn(frame, it.at, 12)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
              <Check size={58} />
              <div style={{ fontFamily: FONT, fontSize: 42, color: C.night, fontWeight: 500 }}>{it.t}</div>
            </div>
          )
        })}
      </div>
      <div style={abs(0, 660, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tBtn, 14) })}>
        <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 600, padding: '20px 64px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tBtn) / 5)}px ${C.purpleSoft}` }}>
          Fazer os exercícios
        </div>
      </div>
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background dark />
          <div style={abs(0, 80, { width: 1920, display: 'flex', justifyContent: 'center', opacity: next, transform: `translateY(${(1 - next) * 20}px)` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: '#ffffff10', border: `3px solid ${C.purpleSoft}`, borderRadius: 28, padding: '26px 50px' }}>
              <FormIcon size={110} />
              <div style={{ fontFamily: FONT, color: C.lavender }}>
                <div style={{ fontSize: 32, color: C.purpleSoft, fontWeight: 600 }}>Próxima aula</div>
                <div style={{ fontSize: 60, fontWeight: 700 }}>Aula 7 — Formulários</div>
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
