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
import { ArrowLine, Cursor } from '../../components/Navigation.jsx'
import { Label, abs, rampF, win } from '../n1-a03/scenes-a.jsx'
import { TXT, BoletimCard, CAPTION, CodeCard, HorarioCard, ListView, NotePad, OldLayout, PrecosCard, SpeechBubble, TableView, Tag } from './ana.jsx'

export { Label, abs, rampF, win }

// Posição de um caractere no EditorWindow + CodeTyping com numeração (mesma geometria da Aula 5).
// ed = { x, y, fs, scroll? } — scroll: quantas linhas o editor rolou para baixo.
export const edAt = (ed, line, col) => ({
  x: ed.x + 16 + ed.fs * 1.8 + col * ed.fs * 0.55,
  y: ed.y + 87 + (line - (ed.scroll || 0)) * ed.fs * 1.5 + ed.fs * 0.75,
})

// Caixa tracejada (ou faixa preenchida, fill) em volta das linhas l0..l1 (cols c0..c1).
export const LinesBox = ({ ed, l0, l1, c0 = 0, c1 = 20, op = 1, color = C.lavender, pad = 8, fill, dashed = true }) => {
  if (op <= 0) return null
  const a = edAt(ed, l0, c0)
  const b = edAt(ed, l1, c1)
  return <div style={abs(a.x - pad - 4, a.y - ed.fs * 0.75 - pad / 2, { width: b.x - a.x + pad * 2 + 8, height: b.y - a.y + ed.fs * 1.5 + pad, border: `4px ${dashed ? 'dashed' : 'solid'} ${color}`, background: fill || 'transparent', borderRadius: 12, boxSizing: 'border-box', opacity: op })} />
}

// Editor com rolagem: o conteúdo sobe `scroll` linhas (cortado dentro da janela).
export const ScrollEditor = ({ ed, width, height, filename = 'index.html', scroll = 0, children }) => (
  <div style={abs(ed.x, ed.y)}>
    <EditorWindow width={width} height={height} filename={filename}>
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${-scroll * ed.fs * 1.5}px)` }}>{children}</div>
      </div>
    </EditorWindow>
  </div>
)

// Sigla com as letras-chave destacadas: "table row" -> tr.
export const Acronym = ({ word, keys, tag, meaning, op, defOp, size = 84 }) => (
  <div style={{ opacity: op, transform: `translateY(${(1 - op) * 20}px)` }}>
    <div style={{ fontFamily: MONO, fontSize: size, color: C.night, fontWeight: 600, whiteSpace: 'pre' }}>
      {word.split('').map((ch, i) => (
        <span key={i} style={keys.includes(i) ? { color: C.white, background: C.purple, borderRadius: 10, padding: '0 4px' } : { opacity: 0.75 }}>{ch}</span>
      ))}
    </div>
    <div style={{ marginTop: 18, opacity: defOp, transform: `translateX(${(1 - defOp) * 30}px)` }}>
      <Chip size={44} color={C.night} border={C.purple}><Tag color={C.purple}>{tag}</Tag> = {meaning}</Chip>
    </div>
  </div>
)

// Triângulo de aviso (amarelo).
export const Warn = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M32 5 L61 57 H3 Z" fill="#F2C14E" stroke={C.night} strokeWidth="4" strokeLinejoin="round" />
    <rect x="29" y="22" width="6" height="19" rx="3" fill={C.night} />
    <circle cx="32" cy="48" r="3.6" fill={C.night} />
  </svg>
)

// Código final da tabela pequena (Blocos 3–5).
export const ROWS_SMALL = '\n  <tr>\n    <td>Segunda</td>\n    <td>HTML</td>\n  </tr>\n  <tr>\n    <td>Terça</td>\n    <td>CSS</td>\n  </tr>'
export const TH_ROW = '\n  <tr>\n    <th>Dia</th>\n    <th>Assunto</th>\n  </tr>'

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Na aula passada')
  const tSteps = s('a página da Ana ganhou listas')
  const tPage = s('a lista de compras com marcadores')
  const tCount = s('Tem informação que não cabe')
  const tB1 = s('num boletim')
  const tB2 = s('numa tabela de preços')
  const tB3 = s('no horário das aulas')
  const tLabel = s('Você vai aprender')
  const logoBig = 1 - rampF(frame, tTitle - 6, tTitle + 8)
  const logoSmall = rampF(frame, tTitle, tTitle + 14)
  const heights = [220, 270, 320, 370, 420]
  const pA = fadeIn(frame, tPage, 16)
  const pop = (t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })
  const card = (t) => ({ opacity: clamp01(pop(t) * 2), transform: `scale(${0.6 + 0.4 * pop(t)})` })
  const A = { x: 980, y: 250, w: 520, h: 470 }
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
        <Title start={tTitle} size={92}>Aula 6 — Tabelas</Title>
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
      {/* Sobre mim, da aula passada */}
      <div style={abs(A.x, A.y, { opacity: pA, transform: `translateY(${(1 - pA) * 30}px)` })}>
        <BrowserMock width={A.w} height={A.h} tabTitle="Sobre mim" url="index.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            <div style={{ fontSize: 31, fontWeight: 700 }}>{TXT.h1}</div>
            <div style={{ fontSize: 26, fontWeight: 700, marginTop: 22 }}>{TXT.h2b}</div>
            <ListView fs={28} style={{ marginTop: 12 }} items={[{ t: <><strong>HTML</strong>, começando agora</> }, 'CSS', 'JavaScript']} />
          </div>
        </BrowserMock>
      </div>
      {/* dados em linhas e colunas */}
      <div style={abs(1545, 225, { ...card(tB1), transformOrigin: 'left top' })}><BoletimCard width={330} /></div>
      <div style={abs(1545, 420, { ...card(tB2), transformOrigin: 'left top' })}><PrecosCard width={330} /></div>
      <div style={abs(1545, 615, { ...card(tB3), transformOrigin: 'left top' })}><HorarioCard width={330} /></div>
      <div style={abs(1545, 166, { opacity: fadeIn(frame, tCount, 12) * (1 - fadeIn(frame, tB1, 8)) })}><Chip size={28} color={C.night} border={C.purpleSoft}>linhas e colunas</Chip></div>
      <Label x={A.x} y={846} w={895} op={fadeIn(frame, tLabel, 14)} dark size={34}>o que a gente vai construir hoje</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const QuandoUsar = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tQ = s('uma pergunta importante')
  const tRes = s('A resposta é')
  const tTest = s('Um bom teste')
  const tRow = s('Na linha de segunda-feira')
  const tCol = s('na coluna do assunto')
  const tHtml = s('está escrito HTML')
  const tYes = s('Se esse cruzamento')
  const tList = s('E se os itens só vêm')
  const tWrong = s('Agora, o uso errado')
  const tYears = s('Há muitos anos')
  const tCells = s('o menu numa célula')
  const tLayout = s('Isso é usar tabela para layout')
  const tSr = s('O leitor de tela anuncia')
  const tHard = s('e a página fica difícil')
  const tData = s('Tabela é para dados')
  const tCss = s('O visual fica com o CSS')
  const A = win(frame, 0, tWrong, 14)
  const B = win(frame, tWrong - 4, tData, 14)
  const Cc = rampF(frame, tData - 4, tData + 10)
  // grade com larguras fixas para o "dedo" saber onde está cada célula
  const G = { x: 230, y: 250, colW: [300, 320], rowH: 92, fs: 44 }
  const colX = (c) => G.x + G.colW.slice(0, c).reduce((a, b) => a + b, 0) + G.colW[c] / 2
  const rowY = (r) => G.y + r * G.rowH + G.rowH / 2
  const pRow = rampF(frame, tRow, tRow + 34)
  const pCol = rampF(frame, tCol, tCol + 30)
  let cx = colX(0) - 90 + (colX(1) - colX(0) + 90) * pRow
  let cy = rowY(1)
  if (frame >= tCol) { cx = colX(1); cy = rowY(0) + (rowY(1) - rowY(0)) * pCol }
  const cursorOp = win(frame, tRow - 6, tYes + 20, 8)
  const rowHl = frame >= tRow ? 1 : 0
  const colOp = fadeIn(frame, tCol, 10)
  const hit = frame >= tHtml ? 1 : 0
  return (
    <AbsoluteFill>
      <div style={abs(0, 50, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tQ, 12) * A })}>
        <div style={{ background: C.night, color: C.lavender, borderRadius: 24, padding: '18px 56px', fontFamily: FONT, fontSize: 54, fontWeight: 700, boxShadow: '0 18px 40px rgba(27,23,68,0.35)' }}>Quando usar uma tabela?</div>
      </div>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(G.x, G.y, { opacity: fadeIn(frame, tRes, 12) })}>
            <TableView fs={G.fs} colW={G.colW} rowH={G.rowH} colHl={1} colHlOp={colOp} head={['Dia', 'Assunto']}
              rows={[
                { cells: ['Segunda', { t: 'HTML', hl: hit }], hl: rowHl },
                { cells: ['Terça', 'CSS'] },
                { cells: ['Quarta', 'JavaScript'] },
              ]} />
          </div>
          <div style={abs(G.x + G.colW[0] + G.colW[1] + 24, rowY(1) - 32, { opacity: fadeIn(frame, tHtml, 8) })}><Check size={64} /></div>
          <div style={abs(G.x - 40, G.y - 60, { width: 0, height: 0, opacity: cursorOp })}>
            <Cursor hand left={cx - G.x + 40} top={cy - G.y + 60} size={70} />
          </div>
          <div style={abs(G.x + 20, 650, { opacity: fadeIn(frame, tTest, 12) * (1 - fadeIn(frame, tYes, 10)) })}><Chip size={32} color={C.night} border={C.purpleSoft}>teste: cruzar a linha com a coluna</Chip></div>
          <div style={abs(G.x + 20, 650, { opacity: fadeIn(frame, tYes, 12) })}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>linha + coluna = faz sentido</Chip></div>
          {/* lista: um depois do outro */}
          <div style={abs(1230, 230, { opacity: fadeIn(frame, tList, 12), display: 'flex', flexDirection: 'column', gap: 26, alignItems: 'flex-start' })}>
            <NotePad width={360} />
            <Chip size={32} color={C.night} border={C.purple}>um depois do outro → lista</Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(160, 120, { opacity: fadeIn(frame, tYears, 12) })}>
            <OldLayout width={760} cells={fadeIn(frame, tCells, 14)} bad={fadeIn(frame, tLayout, 12)} />
            <div style={{ fontFamily: MONO, fontSize: 26, color: C.red, marginTop: 10, opacity: fadeIn(frame, tCells, 14) }}>{'<table>  <tr>  <td>menu</td>  <td>texto</td> ...'}</div>
          </div>
          <div style={abs(840, 90, { opacity: fadeIn(frame, tLayout, 8) })}><Cross size={90} /></div>
          <Label x={160} y={690} w={760} op={fadeIn(frame, tLayout + 6, 12)} size={36} border={C.red}>tabela para layout: não</Label>
          <div style={abs(1040, 170, { opacity: fadeIn(frame, tSr, 12) })}>
            <SpeechBubble text="Tabela, 2 linhas, 2 colunas" fs={34} icon={84} strike={rampF(frame, tSr + 40, tSr + 54)} />
            <div style={{ marginTop: 18, marginLeft: 100, opacity: fadeIn(frame, tSr + 40, 10) }}><Chip size={28} color={C.night} border={C.red}>anuncia uma tabela que não existe</Chip></div>
          </div>
          <div style={abs(1140, 430, { opacity: fadeIn(frame, tHard, 12) })}><Chip size={30} color={C.night} border={C.red}>a página fica difícil de mudar</Chip></div>
        </div>
      )}
      {Cc > 0 && (
        <div style={{ opacity: Cc, ...abs(0, 230, { width: 1920, display: 'flex', justifyContent: 'center', gap: 80 }) }}>
          {[
            { a: 'dados', b: 'tabela', ok: true, at: tData },
            { a: 'visual', b: 'CSS', sub: '(próximos níveis)', at: tCss },
          ].map((c) => {
            const p = fadeIn(frame, c.at, 12)
            return (
              <div key={c.a} style={{ width: 640, height: 300, opacity: p, transform: `scale(${0.85 + 0.15 * p})`, background: C.white, border: `5px solid ${C.purple}`, borderRadius: 30, boxShadow: '0 18px 40px rgba(38,33,92,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: FONT }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 64, fontWeight: 700, color: C.night }}>
                  {c.a} <span style={{ color: C.purple }}>→</span> {c.b}
                  {c.ok && <Check size={70} />}
                </div>
                {c.sub && <div style={{ fontSize: 36, color: C.purple }}>{c.sub}</div>}
              </div>
            )
          })}
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
export const Estrutura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tTable = s('Toda tabela começa')
  const tBoxDef = s('que é a caixa')
  const tRowBy = s('montada linha por linha')
  const tTr = s('Cada linha é uma tê erre')
  const tTrDef = s('de table row')
  const tCells = s('E dentro de cada linha vão')
  const tTdDef = s('Tê dê vem de table data')
  const tLet = s('Vamos fazer uma tabela')
  const tOpenT = s('Abre a têibol')
  const tOpenTr = s('Abre uma tê erre')
  const tTd1 = s('uma tê dê com segunda')
  const tTd2 = s('e outra tê dê com HTML')
  const tCloseTr1 = s('Fecha a tê erre')
  const tLine2 = s('Outra linha')
  const tTd3 = s('tê dê com terça')
  const tTd4 = s('tê dê com CSS')
  const tCloseTr2 = s('fecha a tê erre')
  const tCloseT = s('E fecha a têibol')
  const tNoCol = s('Repara: não existe')
  const tPos = s('As colunas aparecem sozinhas')
  const A = win(frame, 0, tLet, 14)
  const B = rampF(frame, tLet - 4, tLet + 10)
  const ed = { x: 50, y: 40, fs: 40 }
  const segs = [
    { text: '<table>', start: tOpenT + 2, frames: 10 },
    { text: '\n  <tr>', start: tOpenTr + 2, frames: 8 },
    { text: '\n    <td>Segunda</td>', start: tTd1 + 4, frames: 18 },
    { text: '\n    <td>HTML</td>', start: tTd2 + 4, frames: 16 },
    { text: '\n  </tr>', start: tCloseTr1 + 2, frames: 8 },
    { text: '\n  <tr>', start: tLine2 + 8, frames: 8 },
    { text: '\n    <td>Terça</td>', start: tTd3 + 2, frames: 16 },
    { text: '\n    <td>CSS</td>', start: tTd4 + 2, frames: 14 },
    { text: '\n  </tr>', start: tCloseTr2 + 2, frames: 8 },
    { text: '\n</table>', start: tCloseT + 4, frames: 10 },
  ]
  const tds = [
    { line: 2, text: '<td>Segunda</td>', at: tTd1 + 4 },
    { line: 3, text: '<td>HTML</td>', at: tTd2 + 4 },
    { line: 6, text: '<td>Terça</td>', at: tTd3 + 2 },
    { line: 7, text: '<td>CSS</td>', at: tTd4 + 2 },
  ]
  const blinkOn = Math.floor(frame / 6) % 2 === 0
  const curTd = tds.findIndex((t, i) => frame >= t.at && frame < t.at + 34)
  const tdHl = curTd >= 0 && blinkOn ? [{ text: tds[curTd].text, at: 0, color: 'rgba(255,210,138,0.55)' }] : []
  const cellOp = (t) => rampF(frame, t + 16, t + 26)
  const band1 = fadeIn(frame, tCloseTr1 + 10, 10)
  const band2 = fadeIn(frame, tCloseTr2 + 10, 10)
  const tdPos = curTd >= 0 ? edAt(ed, tds[curTd].line, 21) : null
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(160, 90)}>
            <Acronym word="table" keys={[0, 1, 2, 3, 4]} tag="table" meaning="a caixa da tabela" op={fadeIn(frame, tTable, 12)} defOp={fadeIn(frame, tBoxDef, 12)} />
          </div>
          <div style={abs(160, 330)}>
            <Acronym word="table row" keys={[0, 6]} tag="tr" meaning="linha" op={fadeIn(frame, tTr, 12)} defOp={fadeIn(frame, tTrDef, 12)} />
          </div>
          <div style={abs(160, 570)}>
            <Acronym word="table data" keys={[0, 6]} tag="td" meaning="célula" op={fadeIn(frame, tCells, 12)} defOp={fadeIn(frame, tTdDef, 12)} />
          </div>
          {/* grade ilustrando caixa, linhas e células */}
          <div style={abs(1150, 250, { opacity: fadeIn(frame, tTable + 10, 12) })}>
            <div style={{ position: 'relative', padding: 18, border: `4px dashed ${C.purple}`, borderRadius: 16, background: C.white }}>
              <TableView fs={42} colW={[260, 220]} rowH={86}
                rows={[
                  { cells: [{ t: 'Segunda', hl: win(frame, tCells, tLet, 8) }, 'HTML'], hl: fadeIn(frame, tRowBy, 10) },
                  { cells: ['Terça', 'CSS'], hl: fadeIn(frame, tTr, 10) },
                ]} />
            </div>
            <div style={{ marginTop: 18, display: 'flex', gap: 14, flexWrap: 'wrap', width: 560 }}>
              <div style={{ opacity: fadeIn(frame, tBoxDef, 10) }}><Chip size={28} color={C.night} border={C.purple}>tracejado: a <Tag color={C.purple}>table</Tag></Chip></div>
              <div style={{ opacity: fadeIn(frame, tTr, 10) }}><Chip size={28} color={C.night} border={C.purpleSoft}>faixa: um <Tag color={C.purple}>tr</Tag></Chip></div>
              <div style={{ opacity: fadeIn(frame, tCells, 10) }}><Chip size={28} color={C.night} border={C.green}>verde: um <Tag color={C.purple}>td</Tag></Chip></div>
            </div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={730} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={tdHl} />
            </EditorWindow>
          </div>
          {/* faixas por cima do editor (translúcidas) */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <LinesBox ed={ed} l0={1} l1={4} c0={0} c1={22} op={band1 * 0.9} color="rgba(127,119,221,0.9)" fill="rgba(127,119,221,0.14)" dashed={false} />
            <LinesBox ed={ed} l0={5} l1={8} c0={0} c1={22} op={band2 * 0.9} color="rgba(143,211,232,0.9)" fill="rgba(143,211,232,0.14)" dashed={false} />
          </div>
          {band1 > 0 && <div style={abs(edAt(ed, 1, 10).x, edAt(ed, 1, 0).y - 26, { opacity: band1 * (1 - fadeIn(frame, tCloseT + 14, 10)) })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>uma linha</Chip></div>}
          {band2 > 0 && <div style={abs(edAt(ed, 5, 10).x, edAt(ed, 5, 0).y - 26, { opacity: band2 * (1 - fadeIn(frame, tCloseT + 14, 10)) })}><Chip size={28} color={C.night} border="#8FD3E8">outra linha</Chip></div>}
          {tdPos && <div style={abs(tdPos.x, tdPos.y - 26)}><Chip size={28} color={C.night} border="#E8B860">uma célula</Chip></div>}
          <LinesBox ed={ed} l0={0} l1={9} c0={0} c1={23} op={fadeIn(frame, tCloseT + 14, 10)} color={C.lavender} />
          <Label x={50} y={790} w={900} op={fadeIn(frame, tCloseT + 14, 12)} dark size={34}>a caixa da tabela</Label>
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={450} tabTitle="Sobre mim" url="index.html">
              <TableView fs={40} colHl={1} colHlOp={fadeIn(frame, tPos, 12)}
                rows={[
                  { cells: [{ t: 'Segunda', op: cellOp(tTd1 + 4) }, { t: 'HTML', op: cellOp(tTd2 + 4) }] },
                  { cells: [{ t: 'Terça', op: cellOp(tTd3 + 2) }, { t: 'CSS', op: cellOp(tTd4 + 2) }] },
                ]} />
            </BrowserMock>
          </div>
          <div style={abs(990, 530, { opacity: fadeIn(frame, tNoCol, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            <Cross size={60} />
            <Chip size={32} color={C.night} border={C.red}>não existe tag de coluna</Chip>
          </div>
          <Label x={990} y={640} w={880} op={fadeIn(frame, tPos, 12)} dark size={32}>coluna = a mesma posição em cada linha</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
export const TagTh = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tWorks = s('A tabela funciona')
  const tTh = s('Para isso existe a tê agá')
  const tDef = s('de table header')
  const tCell = s('Ela é uma célula')
  const tSo = s('Fica assim')
  const tNewTr = s('a Ana cria uma tê erre nova')
  const tTh1 = s('uma tê agá com dia')
  const tTh2 = s('e outra tê agá com assunto')
  const tNav = s('No navegador, os cabeçalhos')
  const tLook = s('Mas, como sempre')
  const tName = s('isto aqui é o nome da coluna')
  const tRowTh = s('E dá para usar a tê agá também')
  const A = win(frame, 0, tSo, 14)
  const B = rampF(frame, tSo - 4, tSo + 10)
  const ed = { x: 50, y: 40, fs: 32 }
  const segs = [
    { text: '<table>', start: 0, frames: 0 },
    { text: '\n  <tr>', start: tNewTr + 4, frames: 8 },
    { text: '\n    <th>Dia</th>', start: tTh1 + 4, frames: 14 },
    { text: '\n    <th>Assunto</th>', start: tTh2 + 4, frames: 16 },
    { text: '\n  </tr>', start: tTh2 + 26, frames: 8 },
    { text: ROWS_SMALL + '\n</table>', start: 0, frames: 0 },
  ]
  const hOp = (t) => rampF(frame, t + 16, t + 26)
  const tagOp = fadeIn(frame, tName, 12)
  const tagChip = (op) => <div style={{ opacity: op }}><Chip size={21} color={C.white} bg={C.purple} border={C.night} style={{ padding: '4px 14px' }}>nome da coluna</Chip></div>
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(160, 130, { opacity: fadeIn(frame, tWorks, 12) })}>
            <TableView fs={42} rows={[{ cells: ['Segunda', 'HTML'] }, { cells: ['Terça', 'CSS'] }]} style={{ background: C.white, padding: 20, borderRadius: 16 }} />
            <div style={{ marginTop: 18 }}><Chip size={30} color={C.night} border={C.red}>o que é cada coluna?</Chip></div>
          </div>
          <div style={abs(760, 150)}>
            <Acronym word="table header" keys={[0, 6]} tag="th" meaning="célula de cabeçalho" op={fadeIn(frame, tTh, 12)} defOp={fadeIn(frame, tDef, 12)} />
          </div>
          <div style={abs(760, 430, { opacity: fadeIn(frame, tCell, 12) })}>
            <Chip size={36} color={C.night} border={C.purpleSoft}>uma célula, igual à <Tag color={C.purple}>td</Tag>, só que é um título</Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={880} height={790} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} lineHighlights={[1, 2, 3, 4].map((l) => ({ line: l, at: tNewTr + 4, until: tRowTh }))} />
            </EditorWindow>
          </div>
          <div style={abs(edAt(ed, 2, 20).x, edAt(ed, 2, 0).y - 24, { opacity: win(frame, tTh1 + 10, tRowTh, 10) })}><Chip size={26} color={C.white} bg={C.purple} border={C.night}>linha nova, no topo</Chip></div>
          <div style={abs(980, 40)}>
            <BrowserMock width={890} height={440} tabTitle="Sobre mim" url="index.html">
              <TableView fs={34} colW={[250, 250]} style={{ marginTop: 50 }}
                head={[
                  { t: 'Dia', op: hOp(tTh1 + 4), tag: tagChip(tagOp) },
                  { t: 'Assunto', op: hOp(tTh2 + 4), tag: tagChip(tagOp) },
                ]}
                rows={[{ cells: ['Segunda', 'HTML'] }, { cells: ['Terça', 'CSS'] }]}
                cellHl={(ci, c) => (frame >= tNav && frame < tLook && ['Dia', 'Assunto'].includes(c.t) ? 'rgba(255,210,138,0.45)' : null)} />
            </BrowserMock>
          </div>
          <div style={abs(980, 510, { opacity: win(frame, tNav, tRowTh, 12) })}><Chip size={30} color={C.night} border="#E8B860">negrito e centralizado, sozinho</Chip></div>
          <div style={abs(1468, 510, { opacity: win(frame, tLook, tRowTh, 12) })}><Chip size={30} color={C.night} border={C.purple}>o que vale é o significado</Chip></div>
          {/* th no começo da linha */}
          <div style={{ opacity: fadeIn(frame, tRowTh, 12) }}>
            <CodeCard x={980} y={560} fs={28} text={'<tr>\n  <th>Segunda</th>\n  <td>HTML</td>\n</tr>'} highlights={[{ text: '<th>Segunda</th>', at: tRowTh + 10, color: 'rgba(255,210,138,0.45)' }]} />
            <div style={abs(1450, 590, { background: C.white, borderRadius: 16, padding: '24px 28px', boxShadow: '0 14px 30px rgba(38,33,92,0.16)' })}>
              <TableView fs={34} rows={[{ cells: [{ t: 'Segunda', th: true }, 'HTML'] }, { cells: [{ t: 'Terça', th: true }, 'CSS'] }]} />
            </div>
            <Label x={980} y={790} w={890} op={fadeIn(frame, tRowTh + 16, 12)} dark size={30}>th também serve para o título da linha</Label>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
export const TagCaption = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tAll = s('Toda tabela merece')
  const tLoose = s('E não um título solto')
  const tCap = s('É a tag quépchon')
  const tFig = s('Lembra da legenda da imagem')
  const tPos = s('A quépchon vai logo depois')
  const tMust = s('Essa posição é obrigatória')
  const tType = s('A Ana escreve')
  const tNav = s('No navegador, o texto aparece')
  const tAdv = s('E tem uma vantagem')
  const tHears = s('ouve primeiro o nome dela')
  const tDecide = s('Assim, a pessoa decide')
  const ed = { x: 50, y: 40, fs: 30 }
  const CAP_LINE = `\n  <caption>${CAPTION}</caption>`
  const segs = [
    { text: '<table>', start: 0, frames: 0 },
    { text: CAP_LINE, start: tType + 4, frames: 40 },
    { text: TH_ROW + ROWS_SMALL + '\n</table>', start: 0, frames: 0 },
  ]
  const capOp = rampF(frame, tType + 44, tType + 54)
  const arrowOp = win(frame, tPos, tType + 4, 10)
  const a0 = edAt(ed, 0, 0)
  const chipAt = edAt(ed, 0, 24)
  return (
    <AbsoluteFill>
      <div style={{ opacity: fadeIn(frame, tAll, 12) }}>
        <div style={abs(ed.x, ed.y)}>
          <EditorWindow width={960} height={790} filename="index.html">
            <CodeTyping segments={segs} fontSize={ed.fs} highlights={[{ text: CAP_LINE.trim(), at: tType + 44, until: tAdv, color: 'rgba(127,119,221,0.45)' }]} />
          </EditorWindow>
        </div>
        <div style={abs(chipAt.x, chipAt.y - 30, { opacity: arrowOp })}>
          <Chip size={28} color={C.white} bg={C.purple} border={C.night}>logo depois de abrir a <Tag>table</Tag></Chip>
          <div style={{ marginTop: 8, opacity: fadeIn(frame, tMust, 10) }}><Chip size={24} color={C.night} border={C.purple}>obrigatório: a primeira coisa dentro</Chip></div>
        </div>
        <ArrowLine x1={chipAt.x - 10} y1={chipAt.y} x2={a0.x + 6} y2={a0.y + ed.fs * 0.85} p={arrowOp} bend={-20} width={6} />
        {arrowOp > 0 && <div style={abs(a0.x, a0.y + ed.fs * 0.75 - 3, { width: 300, height: 6, borderRadius: 3, background: '#FFD28A', opacity: arrowOp })} />}
        <div style={abs(1050, 40, { opacity: fadeIn(frame, tAll + 6, 12) })}>
          <BrowserMock width={820} height={440} tabTitle="Sobre mim" url="index.html">
            <TableView fs={32} caption={CAPTION} capOp={capOp} capHl={win(frame, tNav, tAdv, 10)} head={['Dia', 'Assunto']} rows={[{ cells: ['Segunda', 'HTML'] }, { cells: ['Terça', 'CSS'] }]} />
          </BrowserMock>
        </div>
      </div>
      {/* versão errada: <h3> solto acima da tabela */}
      <div style={{ opacity: win(frame, tLoose, tNav, 12) }}>
        <CodeCard x={1050} y={520} fs={26} title="parece certo..." text={'<h3>Horário de estudos</h3>\n<table>\n  <tr>...</tr>\n</table>'} highlights={[{ text: '<h3>Horário de estudos</h3>', at: tLoose + 16, color: 'rgba(255,210,138,0.45)' }]} />
        <div style={abs(1050, 740, { display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tLoose + 16, 10) })}>
          <Warn size={56} />
          <Chip size={28} color={C.night} border="#E8B860">parece título, mas não pertence à tabela</Chip>
        </div>
        <div style={abs(1540, 560, { opacity: win(frame, tCap, tPos + 20, 10) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}><Tag>caption</Tag> = legenda</Chip></div>
        <div style={abs(1540, 640, { width: 330, opacity: win(frame, tFig, tPos + 20, 10) })}><Chip size={24} color={C.night} border={C.purpleSoft}>como a legenda da imagem (aula 4)</Chip></div>
      </div>
      {/* leitor de tela */}
      <div style={abs(1050, 530, { opacity: fadeIn(frame, tAdv, 12) })}>
        <SpeechBubble text={`Tabela: ${CAPTION}, 2 colunas, 3 linhas`} fs={30} icon={80} width={680} />
      </div>
      <div style={abs(1150, 700, { opacity: fadeIn(frame, tHears, 12) })}><Chip size={30} color={C.night} border={C.purple}>ouve o nome da tabela primeiro</Chip></div>
      <div style={abs(1150, 790, { opacity: fadeIn(frame, tDecide, 12) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>decide: ler ou pular</Chip></div>
    </AbsoluteFill>
  )
}
