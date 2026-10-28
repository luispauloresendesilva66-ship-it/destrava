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
import { SearchIcon } from '../../components/Icons.jsx'
import { Label, abs, rampF, win } from '../n1-a03/scenes-a.jsx'
import { TXT, AvatarAna, Cake, ListGlyph, ListView, MenuBar, NotePad, PASSOS, PASSO_NOVO, RecipeCard, SpeechBubble, Tag } from './ana.jsx'

export { Label, abs, rampF, win }

// Posição de um caractere no EditorWindow + CodeTyping com numeração (medida nos stills: a coluna
// de números ocupa fs * 1.8 no total).
export const edAt = (ed, line, col) => ({
  x: ed.x + 16 + ed.fs * 1.8 + col * ed.fs * 0.55,
  y: ed.y + 87 + line * ed.fs * 1.5 + ed.fs * 0.75,
})

// Caixa tracejada em volta das linhas l0..l1 (cols c0..c1) de um editor ed = { x, y, fs }.
export const LinesBox = ({ ed, l0, l1, c0 = 0, c1 = 20, op = 1, color = C.lavender, pad = 8 }) => {
  if (op <= 0) return null
  const a = edAt(ed, l0, c0)
  const b = edAt(ed, l1, c1)
  return <div style={abs(a.x - pad - 4, a.y - ed.fs * 0.75 - pad / 2, { width: b.x - a.x + pad * 2 + 8, height: b.y - a.y + ed.fs * 1.5 + pad, border: `4px dashed ${color}`, borderRadius: 12, boxSizing: 'border-box', opacity: op })} />
}

// Sigla com as letras-chave destacadas: "unordered list" -> ul.
const Acronym = ({ word, keys, tag, meaning, op, defOp, size = 84 }) => (
  <div style={{ opacity: op, transform: `translateY(${(1 - op) * 20}px)` }}>
    <div style={{ fontFamily: MONO, fontSize: size, color: C.night, fontWeight: 600, whiteSpace: 'pre' }}>
      {word.split('').map((ch, i) => (
        <span key={i} style={keys.includes(i) ? { color: C.white, background: C.purple, borderRadius: 10, padding: '0 4px' } : { opacity: 0.75 }}>{ch}</span>
      ))}
    </div>
    <div style={{ marginTop: 22, opacity: defOp, transform: `translateX(${(1 - defOp) * 30}px)` }}>
      <Chip size={48} color={C.night} border={C.purple}><Tag color={C.purple}>{tag}</Tag> = {meaning}</Chip>
    </div>
  </div>
)

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Na aula passada')
  const tSteps = s('a página da Ana ganhou')
  const tPage = s('a foto de perfil')
  const tCount = s('Pensa em quantas listas')
  const tShop = s('a lista de compras')
  const tRec = s('o passo a passo')
  const tMenu = s('o menu de um site')
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
        <Title start={tTitle} size={92}>Aula 5 — Listas</Title>
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
            <AvatarAna size={150} style={{ marginTop: 14 }} />
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 14 }}>{TXT.h2a}</div>
            <div style={{ fontSize: 18, lineHeight: 1.4, marginTop: 6 }}>{TXT.p1}</div>
          </div>
        </BrowserMock>
      </div>
      {/* listas do dia a dia */}
      <div style={abs(1545, 250, { ...card(tShop), transformOrigin: 'left top' })}><NotePad width={330} /></div>
      <div style={abs(1545, 500, { ...card(tRec), transformOrigin: 'left top' })}><RecipeCard width={330} /></div>
      <div style={abs(980, 740, { ...card(tMenu), transformOrigin: 'left top' })}><MenuBar width={895} fs={28} /></div>
      <div style={abs(1545, 196, { opacity: fadeIn(frame, tCount, 12) * (1 - fadeIn(frame, tShop, 8)) })}><Chip size={28} color={C.night} border={C.purpleSoft}>listas por toda parte</Chip></div>
      <Label x={A.x} y={830} w={895} op={fadeIn(frame, tLabel, 14)} dark size={34}>o que a gente vai construir hoje</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const PorQueLista = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tWhy = s('Primeiro, por que')
  const tType = s('Se você digitar')
  const tGlue = s('eles aparecem grudados')
  const tBr = s('Dava para resolver com o br')
  const tNotList = s('mas aí o navegador não sabe')
  const tLoses = s('E quem usa leitor de tela perde')
  const tAvisa = s('Com as tags de lista')
  const tSize = s('A pessoa já sabe')
  const tHtml = s('Mais uma vez')
  const ed = { x: 50, y: 40, fs: 44 }
  const segs = [
    { text: 'Arroz', start: tType + 4, frames: 10 },
    { text: '<br>', start: tBr + 8, frames: 8 },
    { text: '\nFeijão', start: tType + 18, frames: 12 },
    { text: '<br>', start: tBr + 20, frames: 8 },
    { text: '\nCafé', start: tType + 34, frames: 10 },
  ]
  const words = ['Arroz', 'Feijão', 'Café'].filter((_, i) => frame >= tType + 14 + i * 14)
  const split = frame >= tBr + 32
  const scan = rampF(frame, tNotList + 6, tNotList + 70)
  const top = 40
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tWhy, 12) })}>
        <EditorWindow width={860} height={330} filename="index.html">
          <CodeTyping segments={segs} fontSize={ed.fs} />
        </EditorWindow>
      </div>
      <div style={abs(970, top, { opacity: fadeIn(frame, tWhy + 8, 12) })}>
        <BrowserMock width={900} height={330} tabTitle="Sobre mim" url="index.html">
          <div style={{ position: 'relative', fontFamily: FONT, fontSize: 40, color: '#1A1A1A', lineHeight: 1.4 }}>
            {split ? <div>Arroz<br />Feijão<br />Café</div> : <div>{words.join(' ')}</div>}
            {!split && frame >= tGlue && <div style={abs(520, -10)}><Cross size={64} /></div>}
            {/* lupa */}
            <div style={abs(-30 + scan * 380, 10 + Math.sin(scan * Math.PI * 2) * 30, { opacity: win(frame, tNotList, tLoses, 10) })}><SearchIcon size={120} /></div>
          </div>
        </BrowserMock>
      </div>
      <Label x={970} y={395} w={900} op={win(frame, tGlue, tBr + 32, 12)} size={34} border={C.red}>o navegador ignora as quebras de linha</Label>
      <Label x={970} y={395} w={900} op={win(frame, tNotList + 10, tLoses + 20, 12)} dark size={34}>parece lista, mas não é</Label>
      <div style={abs(50, 395, { opacity: win(frame, tBr + 20, tLoses + 20, 12) })}>
        <Chip size={30} color={C.night} border={C.purpleSoft}><Tag>{'<br>'}</Tag> só quebra a linha</Chip>
      </div>
      {/* leitor de tela */}
      <div style={abs(110, 500, { opacity: fadeIn(frame, tLoses, 12) })}>
        <SpeechBubble text="Arroz. Feijão. Café." fs={34} icon={84} strike={rampF(frame, tLoses + 30, tLoses + 44)} />
        <div style={{ marginTop: 18, marginLeft: 100, opacity: fadeIn(frame, tLoses + 40, 10) }}><Chip size={28} color={C.night} border={C.red}>sem lista: só texto picado</Chip></div>
      </div>
      <div style={abs(1000, 500, { opacity: fadeIn(frame, tAvisa, 12), display: 'flex', alignItems: 'center', gap: 22 })}>
        <SpeechBubble text="Lista, 3 itens" fs={40} icon={96} />
        <div style={{ opacity: fadeIn(frame, tAvisa + 20, 8) }}><Check size={70} /></div>
      </div>
      <div style={abs(1100, 640, { opacity: fadeIn(frame, tSize, 12) })}>
        <Chip size={28} color={C.night} border={C.purpleSoft}>já sabe o tamanho antes de ouvir</Chip>
      </div>
      <Label x={0} y={760} w={1920} op={fadeIn(frame, tHtml, 14)} dark size={42}>HTML diz o que cada coisa é</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
export const TagUl = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tCommon = s('A lista mais comum')
  const tUl = s('A tag é a u éle')
  const tUn = s('que quer dizer lista não ordenada')
  const tBox = s('Ela é a caixa')
  const tLi = s('E cada item vai dentro')
  const tLiDef = s('de list item')
  const tLet = s('Vamos fazer a lista')
  const tOpen = s('Abre a u éle')
  const t1 = s('Dentro dela')
  const t2 = s('Outra éle í')
  const t3 = s('E mais uma')
  const tClose = s('Por fim, fecha')
  const tNav = s('No navegador, aparecem')
  const tBul = s('E as bolinhas')
  const A = win(frame, 0, tLet, 14)
  const B = rampF(frame, tLet - 4, tLet + 10)
  const ed = { x: 50, y: 40, fs: 44 }
  const typed = [t1, t2, t3]
  const segs = [
    { text: '<ul>', start: tOpen, frames: 8 },
    { text: '\n  <li>Arroz</li>', start: t1 + 4, frames: 22 },
    { text: '\n  <li>Feijão</li>', start: t2 + 4, frames: 22 },
    { text: '\n  <li>Café</li>', start: t3 + 4, frames: 20 },
    { text: '\n</ul>', start: tClose + 4, frames: 8 },
  ]
  const cur = typed.findIndex((t, i) => frame >= t && frame < (typed[i + 1] || tClose))
  const items = ['Arroz', 'Feijão', 'Café'].map((t, i) => ({ t, op: rampF(frame, typed[i] + 26, typed[i] + 36), hl: frame >= tNav && frame < tBul ? 1 : 0 }))
  const curLine = cur + 1
  const itemPos = edAt(ed, curLine, 18)
  const bul = { x: 990 + 2 + 28 + 40 * 1.6 - 40 * 0.45 - 6, y: 186 + 40 * 0.7 }
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(110, 170, { opacity: fadeIn(frame, tCommon, 12) })}>
            <BrowserMock width={620} height={400} tabTitle="Lista" url="exemplo.html">
              <ListView fs={40} items={['primeiro item', 'segundo item', 'terceiro item']} />
            </BrowserMock>
          </div>
          <div style={abs(110, 600, { opacity: fadeIn(frame, tCommon + 20, 12) })}><Chip size={32} color={C.night} border={C.purple}>lista com marcadores: as bolinhas</Chip></div>
          <div style={abs(860, 150)}>
            <Acronym word="unordered list" keys={[0, 10]} tag="ul" meaning="lista não ordenada" op={fadeIn(frame, tUl, 12)} defOp={fadeIn(frame, tUn, 12)} />
          </div>
          <div style={abs(860, 380, { opacity: fadeIn(frame, tBox, 12) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>a caixa que guarda a lista inteira</Chip></div>
          <div style={abs(860, 500)}>
            <Acronym word="list item" keys={[0, 5]} tag="li" meaning="item da lista" op={fadeIn(frame, tLi, 12)} defOp={fadeIn(frame, tLiDef, 12)} />
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={450} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} lineHighlights={typed.map((t, i) => ({ line: i + 1, at: t + 4, until: typed[i + 1] || tClose }))} />
            </EditorWindow>
          </div>
          <LinesBox ed={ed} l0={0} l1={4} c1={17} op={fadeIn(frame, tClose + 14, 10)} />
          {cur >= 0 && frame >= typed[cur] + 22 && (
            <div style={abs(itemPos.x + 10, itemPos.y - 26)}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>um item</Chip></div>
          )}
          <Label x={50} y={520} w={900} op={fadeIn(frame, tClose + 14, 12)} dark size={34}>a caixa da lista</Label>
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={450} tabTitle="Sobre mim" url="index.html">
              <ListView fs={40} items={items} />
            </BrowserMock>
          </div>
          <ArrowLine x1={1030} y1={542} x2={bul.x - 8} y2={bul.y + 2 * 56 + 16} p={fadeIn(frame, tBul, 14)} bend={-14} width={6} />
          <Label x={990} y={540} w={600} op={fadeIn(frame, tBul, 12)} size={34}>o navegador coloca sozinho</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
export const TagOl = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tRec = s('Agora, uma receita')
  const tOrder = s('a ordem importa')
  const tOl = s('Para isso existe a ó éle')
  const tDef = s('lista ordenada')
  const tDiff = s('A diferença é só a caixa')
  const tAna = s('A Ana escreve')
  const tOpen = s('Abre a ó éle')
  const t1 = s('Primeiro item')
  const t2 = s('Segundo')
  const t3 = s('Terceiro')
  const tClose = s('Fecha a ó éle')
  const tNav = s('No navegador, cada passo')
  const tNoNum = s('você não escreve os números')
  const tIns = s('Se a Ana colocar')
  const tAuto = s('a numeração se ajusta')
  const A = win(frame, 0, tAna, 14)
  const B = rampF(frame, tAna - 4, tAna + 10)
  const ed = { x: 50, y: 40, fs: 34 }
  const segs = [
    { text: '<ol>', start: tOpen + 2, frames: 8 },
    { text: `\n  <li>${PASSOS[0]}</li>`, start: t1 + 8, frames: 30 },
    { text: `\n  <li>${PASSOS[1]}</li>`, start: t2 + 6, frames: 30 },
    { text: `\n  <li>${PASSO_NOVO}</li>`, start: tIns + 10, frames: 26 },
    { text: `\n  <li>${PASSOS[2]}</li>`, start: t3 + 6, frames: 26 },
    { text: '\n</ol>', start: tClose + 2, frames: 8 },
  ]
  const ins = frame >= tIns + 10
  const boxHl = { at: tClose + 16, color: 'rgba(255,210,138,0.5)' }
  const liHl = { at: tClose + 40, color: 'rgba(143,211,232,0.35)' }
  const items = [
    { t: PASSOS[0], op: rampF(frame, t1 + 34, t1 + 44) },
    { t: PASSOS[1], op: rampF(frame, t2 + 32, t2 + 42) },
    { t: PASSO_NOVO, op: rampF(frame, tIns + 36, tIns + 50), hl: win(frame, tIns + 36, tAuto + 60, 10), key: 'novo' },
    { t: PASSOS[2], op: rampF(frame, t3 + 30, t3 + 40) },
  ]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(110, 170, { opacity: fadeIn(frame, tRec, 12) })}>
            <RecipeCard width={560} />
          </div>
          <div style={abs(110, 560, { opacity: fadeIn(frame, tOrder, 12) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>no passo a passo, a ordem importa</Chip></div>
          <div style={abs(860, 170)}>
            <Acronym word="ordered list" keys={[0, 8]} tag="ol" meaning="lista ordenada" op={fadeIn(frame, tOl, 12)} defOp={fadeIn(frame, tDef, 12)} />
          </div>
          <div style={abs(860, 450, { opacity: fadeIn(frame, tDiff, 12), display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' })}>
            <Chip size={36} color={C.night} border={C.purple}>só a caixa muda: <Tag color={C.purple}>{'<ul>'}</Tag> → <Tag color={C.purple}>{'<ol>'}</Tag></Chip>
            <Chip size={36} color={C.night} border={C.purpleSoft}>os itens continuam sendo <Tag color={C.purple}>{'<li>'}</Tag></Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1010} height={420} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={[
                { text: '<ol>', ...boxHl }, { text: '</ol>', ...boxHl },
                ...[0, 1, 2, 3].map((o) => ({ text: '<li>', occurrence: o, ...liHl })),
              ]} lineHighlights={ins ? [{ line: 3, at: tIns + 10, until: tAuto + 60 }] : []} />
            </EditorWindow>
          </div>
          <div style={abs(50, 490, { display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' })}>
            <div style={{ opacity: fadeIn(frame, boxHl.at, 12) }}><Chip size={32} color={C.night} border="#E8B860"><Tag>{'<ol>'}</Tag> e <Tag>{'</ol>'}</Tag>: só a caixa muda</Chip></div>
            <div style={{ opacity: fadeIn(frame, liHl.at, 12) }}><Chip size={32} color={C.night} border="#8FD3E8"><Tag>{'<li>'}</Tag>: itens, os mesmos de sempre</Chip></div>
          </div>
          <div style={abs(1100, 40)}>
            <BrowserMock width={770} height={420} tabTitle="Bolo de caneca" url="receita.html">
              <ListView type="ol" fs={30} items={items} />
            </BrowserMock>
          </div>
          <div style={abs(1100, 490, { opacity: win(frame, tNoNum, tIns + 30, 12) })}><Chip size={32} color={C.night} border={C.purple}>você não escreve os números</Chip></div>
          <div style={abs(1100, 490, { opacity: fadeIn(frame, tAuto, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            <Check size={64} />
            <Chip size={36} color={C.white} bg={C.purple} border={C.night}>numeração automática</Chip>
          </div>
          <div style={abs(1100, 600, { opacity: fadeIn(frame, tNav, 12) * (1 - fadeIn(frame, tIns, 12)) })}><Chip size={30} color={C.night} border={C.purpleSoft}>1, 2, 3: o navegador numera</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
// Itens que trocam de lugar: perm[i] = nova posição do item i. p 0..1.
const Shuffle = ({ items, perm, p, rowH, render }) => (
  <div style={{ position: 'relative', height: rowH * items.length }}>
    {items.map((it, i) => {
      const e = 0.5 - 0.5 * Math.cos(Math.PI * clamp01(p))
      const y = (i + (perm[i] - i) * e) * rowH
      const x = Math.sin(Math.PI * e) * (perm[i] === i ? 0 : (i % 2 ? 60 : -40))
      return <div key={i} style={abs(x, y, { width: '100%' })}>{render(it, i)}</div>
    })}
  </div>
)

const Panel = ({ x, y, w, h, title, op, children }) => (
  <div style={abs(x, y, { width: w, height: h, opacity: op, transform: `translateY(${(1 - op) * 24}px)`, background: C.white, borderRadius: 26, border: `4px solid ${C.purple}`, boxShadow: '0 18px 40px rgba(38,33,92,0.16)', boxSizing: 'border-box', padding: '22px 30px', fontFamily: FONT })}>
    <div style={{ fontSize: 34, fontWeight: 700, color: C.night, marginBottom: 18 }}>{title}</div>
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
)

const Bullet = ({ fs }) => <span style={{ width: fs * 0.3, height: fs * 0.3, borderRadius: '50%', background: '#1A1A1A', flexShrink: 0 }} />

export const QuandoUsar = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tQ = s('Faça uma pergunta')
  const tShop = s('Na lista de compras, tanto faz')
  const tUl = s('A ordem não importa, então')
  const tRec = s('Na receita, trocar')
  const tOl = s('A ordem importa, então')
  const tEx = s('Outros exemplos')
  const tH = s('os seus hobbies')
  const tL = s('as linguagens que você quer')
  const tM = s('os itens de uma mala')
  const tR = s('Um ranking')
  const tI = s('as instruções para instalar')
  const tT = s('os passos de um tutorial')
  const tSig = s('Repara que a escolha')
  const A = win(frame, 0, tEx, 14)
  const B = rampF(frame, tEx - 4, tEx + 10)
  const fs = 34
  const rowH = 62
  const pShop = rampF(frame, tShop + 20, tShop + 56)
  const pRec = rampF(frame, tRec + 14, tRec + 50)
  const fall = rampF(frame, tRec + 50, tRec + 70)
  const cols = [
    { x: 160, tag: '<ul>', hint: 'a ordem não importa', items: [['hobbies', tH], ['linguagens para aprender', tL], ['itens da mala', tM]] },
    { x: 1000, tag: '<ol>', hint: 'a ordem importa', items: [['ranking de filmes', tR], ['instalar um programa', tI], ['passos de um tutorial', tT]] },
  ]
  return (
    <AbsoluteFill>
      <div style={abs(0, 50, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tQ, 12) * (1 - B) })}>
        <div style={{ background: C.night, color: C.lavender, borderRadius: 24, padding: '18px 56px', fontFamily: FONT, fontSize: 54, fontWeight: 700, boxShadow: '0 18px 40px rgba(27,23,68,0.35)' }}>Se eu trocar a ordem, muda alguma coisa?</div>
      </div>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <Panel x={120} y={220} w={780} h={420} title="lista de compras" op={fadeIn(frame, tShop, 12)}>
            <Shuffle items={['Arroz', 'Feijão', 'Café']} perm={[2, 0, 1]} p={pShop} rowH={rowH} render={(t) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: fs * 1.15, height: rowH, color: '#1A1A1A' }}><Bullet fs={fs * 1.15} />{t}</div>
            )} />
            <div style={abs(470, 10, { opacity: fadeIn(frame, tShop + 60, 10) })}><Check size={90} /></div>
          </Panel>
          <div style={abs(160, 670, { opacity: fadeIn(frame, tUl, 12) })}>
            <Chip size={36} color={C.night} border={C.purple}>não muda → <Tag color={C.purple}>{'<ul>'}</Tag></Chip>
          </div>
          <Panel x={1020} y={220} w={780} h={420} title="bolo de caneca" op={fadeIn(frame, tRec, 12)}>
            <div style={{ position: 'relative', display: 'flex', gap: 18 }}>
              <div style={{ width: 40 }}>
                {[1, 2, 3].map((n) => <div key={n} style={{ height: rowH, display: 'flex', alignItems: 'center', fontSize: fs, fontWeight: 600, color: '#1A1A1A' }}>{n}.</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <Shuffle items={['Misture', 'Leve ao micro-ondas', 'Espere esfriar']} perm={[2, 1, 0]} p={pRec} rowH={rowH} render={(t) => (
                  <div style={{ height: rowH, display: 'flex', alignItems: 'center', fontSize: fs, color: pRec > 0.5 ? C.red : '#1A1A1A' }}>{t}</div>
                )} />
              </div>
            </div>
            <div style={abs(480, 130, { width: 220, transformOrigin: "50% 100%", transform: `translateY(${fall * 14}px) rotate(${fall * 9}deg) scaleY(${1 - 0.4 * fall})`, opacity: fadeIn(frame, tRec + 6, 10) })}><Cake width={220} /></div>
            <div style={abs(560, 0, { opacity: fadeIn(frame, tRec + 66, 10) })}><Cross size={90} /></div>
          </Panel>
          <div style={abs(1060, 670, { opacity: fadeIn(frame, tOl, 12) })}>
            <Chip size={36} color={C.night} border={C.purple}>muda → <Tag color={C.purple}>{'<ol>'}</Tag></Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          {cols.map((c, ci) => (
            <div key={c.tag}>
              <div style={abs(c.x, 60, { display: 'flex', alignItems: 'center', gap: 22 })}>
                <ListGlyph size={84} ordered={ci === 1} />
                <div style={{ fontFamily: MONO, fontSize: 64, fontWeight: 700, color: C.purple }}>{c.tag}</div>
                <div style={{ fontFamily: FONT, fontSize: 34, color: C.night }}>{c.hint}</div>
              </div>
              {c.items.map(([t, at], i) => {
                const p = fadeIn(frame, at, 12)
                return (
                  <div key={t} style={abs(c.x, 200 + i * 150, { width: 760, height: 120, opacity: p, transform: `scale(${0.85 + 0.15 * p})`, transformOrigin: 'left center', background: C.white, border: `4px solid ${C.purple}`, borderRadius: 22, boxShadow: '0 14px 30px rgba(38,33,92,0.14)', display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', boxSizing: 'border-box', fontFamily: FONT })}>
                    <div style={{ width: 56, height: 56, borderRadius: 28, background: ci ? C.purple : C.lavender, border: `3px solid ${C.purple}`, color: ci ? C.white : C.purple, fontWeight: 700, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ci ? i + 1 : <span style={{ width: 18, height: 18, borderRadius: 9, background: C.purple }} />}</div>
                    <div style={{ fontSize: 42, fontWeight: 600, color: C.night }}>{t}</div>
                  </div>
                )
              })}
            </div>
          ))}
          <Label x={0} y={700} w={1920} op={fadeIn(frame, tSig, 14)} dark size={42}>escolha pelo significado, não pela aparência</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}
