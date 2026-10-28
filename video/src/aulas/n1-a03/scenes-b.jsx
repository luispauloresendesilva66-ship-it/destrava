import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ImageIcon } from '../../components/Teaching.jsx'
import { ArrowLine, Cursor, SlideIn, cursorMotion } from '../../components/Navigation.jsx'
import { FileTree, treeGeom } from '../../components/FileTree.jsx'
import { CopyIcon, Loupe, LockIcon, SearchIcon } from '../../components/Icons.jsx'
import { AnaPage3, FULL, L, MAIL, ReceitasPage, lineNumbers, spanAt, codeAt } from './ana.jsx'
import { Label, abs, rampF, win } from './scenes-a.jsx'

// Cartão de código (sem numeração) com título opcional e marca (check / x) à direita.
const CodeBox = ({ segments, fontSize = 30, width, title, mark, highlights, children }) => (
  <div style={{ width, fontFamily: FONT }}>
    {title && <div style={{ fontFamily: MONO, fontSize: 26, color: C.purple, fontWeight: 700, marginBottom: 10 }}>{title}</div>}
    <div style={{ position: 'relative', background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 20, padding: '18px 26px', boxShadow: '0 18px 44px rgba(27,23,68,0.32)', display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <CodeTyping segments={segments} fontSize={fontSize} lineNumbers={false} highlights={highlights} />
        {children}
      </div>
      {mark && <div style={{ flexShrink: 0, display: 'flex' }}>{mark}</div>}
    </div>
  </div>
)

// ---------------------------------------------------------------- Bloco 7
export const Pastas = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tOrg = s('Conforme o site cresce')
  const tFolder = s('Imagina que ela crie')
  const tMove = s('e coloque o projetos')
  const tLink = s('O link do index agora')
  const tSlash = s('A barra separa')
  const tBack = s('E o caminho de volta')
  const tAbove = s('Ele está uma pasta acima')
  const tUp = s('Para subir uma pasta')
  const tLinkBack = s('Então o link de volta')
  const tThink = s('Pensa assim')
  const tAll = s('Com essas duas ideias')
  const fsT = 40
  const tg = treeGeom({ fontSize: fsT, rowH: 84 })
  const T = { x: 60, y: 60 }
  const shift = rampF(frame, tFolder, tFolder + 14)
  const drag = rampF(frame, tMove + 6, tMove + 34)
  const dragging = frame >= tMove && frame < tMove + 50
  const items = [
    { id: 'root', name: 'site-da-ana/', folder: true, depth: 0, row: 0, hl: frame >= tUp && frame < tThink ? rampF(frame, tUp + 30, tUp + 40) : 0 },
    { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'root' },
    { id: 'pag', name: 'paginas/', folder: true, depth: 1, row: 2, parent: 'root', opacity: fadeIn(frame, tFolder, 12), glow: frame >= tFolder && frame < tMove + 40 ? 0.5 + 0.5 * Math.sin((frame - tFolder) / 5) : 0 },
    { id: 'proj', name: 'projetos.html', depth: 1 + drag, row: 2 + shift, parent: drag >= 1 ? 'pag' : 'root', hl: dragging ? 1 : 0 },
  ]
  const yRow = (r) => T.y + tg.y(r)
  // seta "entra na pasta" (raiz -> paginas/projetos.html) e "../ sobe" (paginas -> raiz)
  const inP = win(frame, tLink + 20, tBack, 14)
  const upP = rampF(frame, tUp + 10, tUp + 34)
  const ax = T.x + 520
  // cartões
  const c1 = { x: 800, y: 60 }
  const c2 = { x: 800, y: 360 }
  const fix1 = tLink + 40
  const fix2 = tLinkBack + 20
  return (
    <AbsoluteFill>
      <div style={abs(T.x, T.y, { opacity: fadeIn(frame, tOrg, 12) })}>
        <FileTree items={items} fontSize={fsT} rowH={84} width={700} height={540} />
      </div>
      <ArrowLine x1={ax} y1={yRow(0)} x2={T.x + tg.textEnd(2, 'projetos.html') + 20} y2={yRow(3)} p={rampF(frame, tLink + 20, tLink + 44)} opacity={inP} bend={-70} color={C.lavender} width={6} />
      <div style={abs(T.x + 330, yRow(3) + 46, { opacity: inP })}>
        <Chip size={28} color={C.night} border={C.purpleSoft}>entra na pasta</Chip>
      </div>
      <ArrowLine x1={T.x + tg.textEnd(1, 'index.html') + 50} y1={yRow(2) - 6} x2={T.x + tg.textEnd(1, 'index.html') + 50} y2={yRow(0)} p={upP} bend={-50} color={C.lavender} width={6} />
      <div style={abs(T.x + 330, yRow(3) + 46, { opacity: upP })}>
        <Chip size={28} color={C.white} bg={C.purple} border={C.night}><span style={{ fontFamily: MONO }}>../</span> sobe uma pasta</Chip>
      </div>
      {/* cartão 1: link do index */}
      <div style={abs(c1.x, c1.y, { opacity: fadeIn(frame, tLink, 12) })}>
        <CodeBox
          width={1070}
          title="index.html"
          segments={[{ text: '<a href="', start: 0, frames: 0 }, { text: 'paginas/', start: fix1, frames: 16 }, { text: 'projetos.html">meus projetos</a>', start: 0, frames: 0 }]}
          highlights={[{ text: 'paginas/', at: tSlash, color: 'rgba(255,210,138,0.45)' }]}
          mark={frame >= fix1 + 16 ? <Check size={60} /> : frame >= tLink + 14 ? <Cross size={60} /> : null}
        />
      </div>
      <div style={abs(c1.x, c1.y + 170, { opacity: fadeIn(frame, tSlash, 12) })}>
        <Chip size={30} color={C.night} border={C.purple}>a barra separa a pasta do arquivo</Chip>
      </div>
      {/* cartão 2: link de volta */}
      <div style={abs(c2.x, c2.y, { opacity: fadeIn(frame, tBack, 12) })}>
        <CodeBox
          width={1070}
          title="paginas/projetos.html"
          segments={[{ text: '<a href="', start: 0, frames: 0 }, { text: '../', start: fix2, frames: 10 }, { text: 'index.html">Voltar para a página inicial</a>', start: 0, frames: 0 }]}
          highlights={[{ text: '../', at: fix2 + 10, color: 'rgba(255,210,138,0.45)' }]}
          mark={frame >= fix2 + 12 ? <Check size={60} /> : frame >= tAbove ? <Cross size={60} /> : null}
        />
      </div>
      <div style={abs(c2.x, c2.y + 170, { opacity: win(frame, tAbove, tUp, 12) })}>
        <Chip size={30} color={C.night} border={C.purpleSoft}>o index está uma pasta acima</Chip>
      </div>
      <div style={abs(c2.x, c2.y + 170, { opacity: fadeIn(frame, tUp, 12) })}>
        <Chip size={30} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>../</span> = sobe uma pasta</Chip>
      </div>
      {/* resumo fixo no canto */}
      <div style={abs(800, 640, { opacity: fadeIn(frame, tThink, 14) })}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 26, background: C.night, color: C.lavender, borderRadius: 22, padding: '18px 40px', fontFamily: FONT, fontSize: 44, fontWeight: 600, boxShadow: '0 18px 40px rgba(27,23,68,0.35)' }}>
          <span><span style={{ fontFamily: MONO, color: '#FFD28A' }}>pasta/</span> entra</span>
          <span style={{ color: C.purpleSoft }}>·</span>
          <span><span style={{ fontFamily: MONO, color: '#FFD28A' }}>../</span> sobe</span>
        </div>
      </div>
      <div style={abs(800, 780, { width: 1070, opacity: fadeIn(frame, tAll, 12) })}>
        <Chip size={32} color={C.night} border={C.purple}>com isso, você chega a qualquer arquivo</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
export const Target = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tTarget = s('Para isso existe o atributo target')
  const tBlank = s('Com o valor underline blank')
  const tUnder = s('que é o tracinho')
  const tOpen = s('o link abre em outra aba')
  const tMod = s('Mas use com moderação')
  const tRule = s('Uma boa regra')
  const tSpecial = s('O underline blank fica')
  const tRel = s('E, quando usar')
  const tSec = s('É um cuidado de segurança')
  const ed = { x: 50, y: 40, fs: 30 }
  const line = `<a href="${'https://receitas.example.com'}" target="_blank" rel="noopener">minhas receitas favoritas</a>`
  const segs = [
    { text: '<a href="https://receitas.example.com"', start: 0, frames: 0 },
    { text: ' target="', start: tTarget + 10, frames: 14 },
    { text: '_blank', start: tBlank + 6, frames: 14 },
    { text: '"', start: tTarget + 24, frames: 0 },
    { text: ' rel="noopener"', start: tRel + 8, frames: 22 },
    { text: '>minhas receitas favoritas</a>', start: 0, frames: 0 },
  ]
  // posições (no texto final; target vem antes de rel, então não se move depois de digitado)
  const sT = spanAt(ed, 0, line, 'target="_blank"')
  const sU = spanAt(ed, 0, line, '_')
  const sR = spanAt(ed, 0, line, 'rel="noopener"')
  const opT = fadeIn(frame, tOpen, 12)
  const click = tOpen + 4
  const cur = cursorMotion(frame, { arrive: click - 6, click, from: [200, 120], travel: 24 })
  const slide = rampF(frame, click + 8, click + 30)
  const BW = { x: 50, y: 400, w: 860, h: 400 }
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1820} height={170} filename="index.html">
          <CodeTyping
            segments={segs}
            fontSize={ed.fs}
            numbers={[8]}
            highlights={[
              { text: 'target="_blank"', at: tOpen, until: tRel, color: 'rgba(127,119,221,0.6)' },
              { text: 'rel="noopener"', at: tSec, color: 'rgba(127,119,221,0.6)' },
            ]}
          />
        </EditorWindow>
      </div>
      <Label x={sT.x - 520} y={240} w={420} op={opT} dark>abre em outra aba</Label>
      <ArrowLine x1={sT.x - 110} y1={262} x2={sT.x0 + 30} y2={sT.bottom + 6} p={opT} width={6} />
      <div style={abs(sU.x - 70, 200, { opacity: win(frame, tUnder, tRel, 12), display: 'flex', alignItems: 'center', gap: 10 })}>
        <Loupe text="_" size={110} />
        <Chip size={30} color={C.night} border={C.purple}>underline</Chip>
      </div>
      <div style={abs(sR.x - 60, 220, { opacity: fadeIn(frame, tSec, 12), display: 'flex', alignItems: 'center', gap: 16 })}>
        <LockIcon size={84} />
        <Chip size={32} color={C.white} bg={C.purple} border={C.night}>a página nova não mexe na sua</Chip>
      </div>
      <ArrowLine x1={sR.x - 20} y1={226} x2={sR.x - 10} y2={sR.bottom + 6} p={fadeIn(frame, tSec, 12)} width={6} />
      {/* prévia: a aba nova abre na frente, a "Sobre mim" continua atrás */}
      <div style={abs(BW.x, BW.y, { opacity: fadeIn(frame, tTarget, 12) })}>
        <BrowserMock width={BW.w} height={BW.h} tabTitle="Sobre mim" url="index.html">
          <AnaPage3 parts={['h1', 'p2', 'rec']} base={22} cursor={{ key: 'rec', node: <Cursor {...cur} /> }} />
        </BrowserMock>
      </div>
      <SlideIn p={slide} dx={50} dy={30} style={{ left: BW.x + 70, top: BW.y + 70 }}>
        <BrowserMock width={BW.w} height={BW.h - 10} tabs={[{ title: 'Sobre mim' }, { title: 'receitas.example.com', active: true }]} url="receitas.example.com" tabHighlight>
          <ReceitasPage base={20} />
        </BrowserMock>
      </SlideIn>
      {/* seis abas sem querer */}
      <div style={abs(1010, 410, { opacity: fadeIn(frame, tMod, 12) })}>
        <div style={{ position: 'relative' }}>
          <BrowserMock width={860} height={130} tabs={['Sobre mim', 'receitas', 'receitas', 'receitas', 'receitas', 'receitas'].map((t, i) => ({ title: t, active: i === 5, opacity: fadeIn(frame, tMod + i * 4, 6) }))} url="receitas.example.com" />
          <div style={abs(800, -24, { opacity: fadeIn(frame, tMod + 26, 8) })}><Cross size={70} /></div>
        </div>
      </div>
      <div style={abs(1010, 570, { opacity: fadeIn(frame, tMod + 20, 12) })}>
        <Chip size={34} color={C.night} border={C.red}>use com moderação</Chip>
      </div>
      <div style={abs(1010, 660, { display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' })}>
        <div style={{ opacity: fadeIn(frame, tRule, 12) }}>
          <Chip size={32} color={C.night} border={C.purple}>páginas do seu site: mesma aba</Chip>
        </div>
        <div style={{ opacity: fadeIn(frame, tSpecial, 12) }}>
          <Chip size={32} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>_blank</span>: só em casos especiais</Chip>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const Secao = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSec = s('Um link também pode levar')
  const tMenu = s('ela quer um menu')
  const tId = s('eu coloco o atributo id')
  const tUnique = s('O id é como um endereço único')
  const tTop = s('Depois, no topo')
  const tHash = s('A cerquilha')
  const tClick = s('Clica, e a página rola')
  const tCombo = s('Dá para combinar')
  const ed = { x: 50, y: 30, fs: 30 }
  const tQuick = tUnique + 50
  const navOn = frame >= tTop
  const navF = Math.max(50, Math.min(90, tHash - tTop - 10))
  const segs = [
    { text: L.h1, start: 0, frames: 0 },
    { text: '\n', start: tTop, frames: 0 },
    { text: L.nav.replace(/^ {2}/, ''), start: tTop + 4, frames: navF },
    { text: '\n' + L.c1 + '\n  <h2', start: 0, frames: 0 },
    { text: ' id="quem-sou"', start: tQuick, frames: 14 },
    { text: `>Quem sou eu</h2>\n${L.c2}\n  <h2`, start: 0, frames: 0 },
    { text: ' id="aprendendo"', start: tId + 6, frames: 16 },
    { text: '>O que estou aprendendo</h2>', start: 0, frames: 0 },
  ]
  // o "  " inicial da linha do menu entra junto com a quebra de linha
  segs[1].text = '\n  '
  const shown = navOn ? ['h1', 'nav', 'c1', 'h2a', 'c2', 'h2b'] : ['h1', 'c1', 'h2a', 'c2', 'h2b']
  const nums = lineNumbers(navOn ? FULL : FULL.filter((k) => k !== 'nav'), shown)
  const h2bLine = navOn ? 5 : 4
  const h2bEnd = codeAt(ed, h2bLine, L.h2bId.length)
  const navHash = spanAt(ed, 1, L.nav, '#aprendendo')
  const navQ = spanAt(ed, 1, L.nav, '#quem-sou')
  const navTyped = tTop + 4 + navF
  // prévia com rolagem
  const click = Math.max(tClick + 4, navTyped + 30)
  const cur = cursorMotion(frame, { arrive: click - 6, click, from: [160, 130], travel: 24 })
  const sc = rampF(frame, click + 6, click + 40)
  const ease = sc < 0.5 ? 2 * sc * sc : 1 - Math.pow(-2 * sc + 2, 2) / 2
  const flash = frame >= click + 40 ? 0.5 + 0.5 * Math.cos((frame - click - 40) / 4) : 0
  const flashOn = frame >= click + 40 && frame < click + 100 ? flash : 0
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1820} height={380} filename="index.html">
          <CodeTyping
            segments={segs}
            fontSize={ed.fs}
            numbers={nums}
            highlights={[
              { text: 'id="aprendendo"', at: tId + 22, color: 'rgba(255,210,138,0.45)' },
              { text: 'id="quem-sou"', at: tQuick + 14, color: 'rgba(255,210,138,0.3)' },
              { text: '#', at: tHash, occurrence: 1, color: 'rgba(127,119,221,0.8)' },
              { text: '#', at: tHash, occurrence: 0, color: 'rgba(127,119,221,0.8)' },
            ]}
            lineHighlights={[{ line: h2bLine, at: tId + 22, until: tTop }]}
          />
        </EditorWindow>
      </div>
      <div style={abs(h2bEnd.x + 60, h2bEnd.y - 30, { opacity: win(frame, tId + 22, tTop + 10, 12) })}>
        <Chip size={30} color={C.white} bg={C.purple} border={C.night}>id: nome único na página</Chip>
      </div>
      <ArrowLine x1={h2bEnd.x + 54} y1={h2bEnd.y} x2={h2bEnd.x + 8} y2={h2bEnd.y} p={win(frame, tId + 22, tTop + 10, 12)} width={5} />
      {/* ligação href="#aprendendo" -> id="aprendendo" */}
      <ArrowLine x1={navHash.x} y1={navHash.bottom + 2} x2={h2bEnd.x + 10} y2={h2bEnd.y - 6} p={rampF(frame, tHash + 40, tHash + 64)} bend={-60} dashed width={5} color={C.lavender} />
      <div style={abs(1130, 440, { display: 'flex', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tHash, 12) })}>
        <Loupe text="#" size={120} />
        <Chip size={32} color={C.white} bg={C.purple} border={C.night}>cerquilha = procure o id</Chip>
      </div>
      <ArrowLine x1={1190} y1={446} x2={navQ.x0 + 8} y2={navQ.bottom + 4} p={fadeIn(frame, tHash, 12) * (1 - rampF(frame, tHash + 36, tHash + 46))} bend={30} width={5} />
      {/* outra página + seção */}
      <div style={abs(1130, 640, { opacity: fadeIn(frame, tCombo, 12) })}>
        <CodeBox width={720} segments={[{ text: 'href="projetos.html#contato"', start: tCombo + 4, frames: 24 }]} fontSize={30} />
        <div style={{ marginTop: 14 }}>
          <Chip size={30} color={C.night} border={C.purple}>outra página + uma seção dela</Chip>
        </div>
      </div>
      <div style={abs(50, 450)}>
        <BrowserMock width={1020} height={430} tabTitle="Sobre mim" url={sc >= 1 ? 'index.html#aprendendo' : 'index.html'}>
          <div style={{ transform: `translateY(${-ease * 384}px)` }}>
            <AnaPage3 parts={['h1', ...(frame >= navTyped ? ['nav'] : []), 'h2a', 'p1', 'p2', 'rec', 'h2b', 'p3', 'proj', 'sig']} base={24} flash={{ h2b: flashOn }} cursor={{ key: 'nav2', node: <Cursor {...cur} opacity={cur.opacity * (1 - rampF(frame, click + 10, click + 16))} /> }} />
          </div>
        </BrowserMock>
      </div>
      <div style={abs(1130, 450, { opacity: win(frame, tMenu, tId, 12) })}>
        <Chip size={30} color={C.night} border={C.purpleSoft}>um menu no topo, para pular para cada seção</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
const MailWindow = ({ to }) => (
  <div style={{ width: 820, borderRadius: 18, overflow: 'hidden', background: C.white, boxShadow: '0 24px 60px rgba(38,33,92,0.35)', border: `2px solid ${C.purpleSoft}`, fontFamily: FONT }}>
    <div style={{ background: C.night, color: C.lavender, padding: '14px 24px', fontSize: 28, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>Nova mensagem</span>
      <span style={{ display: 'flex', gap: 8 }}>{['#E87B7B', '#E8C47B', '#9CCF8A'].map((c) => <span key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c, opacity: 0.8 }} />)}</span>
    </div>
    <div style={{ padding: '10px 24px', fontSize: 30, color: C.night }}>
      <div style={{ padding: '12px 0', borderBottom: '2px solid #ECEBFA' }}>
        <span style={{ color: '#6E69A8' }}>Para: </span>
        <span style={{ background: 'rgba(127,119,221,0.25)', borderRadius: 8, padding: '2px 10px', fontWeight: 600 }}>{to}</span>
      </div>
      <div style={{ padding: '12px 0', borderBottom: '2px solid #ECEBFA', color: '#6E69A8' }}>Assunto:</div>
      <div style={{ padding: '18px 0' }}>
        {[90, 76, 50].map((w, i) => <div key={i} style={{ height: 12, width: `${w}%`, background: '#E3E1F7', borderRadius: 6, marginBottom: 14 }} />)}
      </div>
    </div>
  </div>
)

export const Mailto = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tHref = s('No href, em vez')
  const tJunto = s('tudo junto, sem espaço')
  const tSig = s('Na assinatura da Ana')
  const tText = s('E o texto do link mostra')
  const tClick = s('Quando alguém clica')
  const tBut = s('Mas tem um detalhe')
  const tVis = s('Por isso, é uma boa ideia')
  const tCopy = s('Assim, quem não tiver')
  const ed = { x: 50, y: 40, fs: 32 }
  const segs = [
    { text: L.proj + '\n', start: 0, frames: 0 },
    { text: `  <p>Ana Souza<br>Cidade Exemplo`, start: 0, frames: 0 },
    { text: '<br><a href="', start: tSig + 6, frames: 16 },
    { text: 'mailto:', start: tSig + 24, frames: 10 },
    { text: MAIL, start: tSig + 36, frames: 18 },
    { text: '">', start: tSig + 54, frames: 2 },
    { text: MAIL, start: tText + 6, frames: 18 },
    { text: '</a>', start: tText + 24, frames: 6 },
    { text: '</p>', start: 0, frames: 0 },
  ]
  const typed = tText + 30
  const sM = spanAt(ed, 1, L.sigMail, 'mailto:')
  const sTx = spanAt(ed, 1, L.sigMail, MAIL, 1)
  const opM = fadeIn(frame, tSig + 40, 12)
  const opTx = fadeIn(frame, typed, 12)
  const click = tClick + 14
  const cur = cursorMotion(frame, { arrive: click - 6, click, from: [220, 130], travel: 24 })
  const mail = rampF(frame, click + 8, click + 30) * (1 - rampF(frame, tVis, tVis + 12))
  const sel = rampF(frame, tCopy, tCopy + 20)
  const curSel = cursorMotion(frame, { arrive: tCopy, from: [-150, 40], travel: 18 })
  const curNow = frame >= tCopy - 26 ? { ...curSel, hand: false, dx: curSel.dx + 90 * sel } : cur
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1820} height={220} filename="index.html">
          <CodeTyping segments={segs} fontSize={ed.fs} numbers={lineNumbers(FULL, ['proj', 'sig'])} highlights={[{ text: 'mailto:', at: tSig + 40, color: 'rgba(127,119,221,0.65)' }, { text: MAIL, occurrence: 1, at: typed, color: 'rgba(255,210,138,0.4)' }]} lineHighlights={[{ line: 1, at: typed }]} />
        </EditorWindow>
      </div>
      {/* fórmula antes da assinatura */}
      <div style={abs(0, 330, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, opacity: win(frame, tHref, tSig, 12) })}>
        <div style={{ background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 20, padding: '18px 34px', fontFamily: MONO, fontSize: 52 }}>
          <span style={{ color: '#FFD28A' }}>href</span><span style={{ color: '#A9A4E8' }}>=</span><span style={{ color: '#8FD3E8' }}>"mailto:<span style={{ color: C.white }}>o-e-mail</span>"</span>
        </div>
        <div style={{ opacity: fadeIn(frame, tJunto, 12) }}>
          <Chip size={38} color={C.night} border={C.purple}>tudo junto, sem espaço</Chip>
        </div>
      </div>
      <Label x={sM.x - 200} y={290} w={400} op={opM} dark>abre o e-mail</Label>
      <ArrowLine x1={sM.x} y1={288} x2={sM.x} y2={sM.bottom + 6} p={opM} width={6} />
      <Label x={sTx.x - 220} y={290} w={440} op={opTx}>o endereço visível</Label>
      <ArrowLine x1={sTx.x} y1={288} x2={sTx.x} y2={sTx.bottom + 6} p={opTx} width={6} />
      <div style={abs(50, 400, { opacity: fadeIn(frame, tSig, 12) })}>
        <BrowserMock width={900} height={460} tabTitle="Sobre mim" url="index.html">
          <AnaPage3 parts={['proj', 'sig', ...(frame >= typed ? ['mail'] : [])]} base={30} sel={sel} cursor={{ key: 'mail', node: <Cursor {...curNow} /> }} />
        </BrowserMock>
      </div>
      <SlideIn p={mail} dx={0} dy={220} style={{ left: 1010, top: 400 }}>
        <MailWindow to={MAIL} />
      </SlideIn>
      <div style={abs(1010, 790, { opacity: fadeIn(frame, tBut, 12) })}>
        <Chip size={32} color={C.night} border={C.purpleSoft}>só funciona com um programa de e-mail configurado</Chip>
      </div>
      <div style={abs(1010, 470, { opacity: fadeIn(frame, tCopy + 16, 12), display: 'flex', alignItems: 'center', gap: 20 })}>
        <CopyIcon size={90} />
        <Chip size={36} color={C.white} bg={C.purple} border={C.night}>dá para copiar também</Chip>
      </div>
      <div style={abs(1010, 620, { opacity: fadeIn(frame, tVis, 12) })}>
        <Chip size={32} color={C.night} border={C.purple}>deixe o endereço visível no texto do link</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 11
const ErrTitle = ({ n, children, op }) => (
  <div style={abs(160, 40, { opacity: op, display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT })}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: C.purple, color: C.white, fontSize: 40, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 700, color: C.night }}>{children}</div>
  </div>
)

export const Erros = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tE1 = s('O primeiro')
  const tBreak = s('e o link quebra')
  const tE2 = s('O segundo')
  const tSame = s('Escreva o nome exatamente igual')
  const tPref = s('e prefira nomes')
  const tE3 = s('O terceiro')
  const tThinks = s('Sem ele, o navegador acha')
  const tList = s('Se um link não funcionar')
  const k1 = win(frame, tE1 - 6, tE2, 12)
  const k2 = win(frame, tE2, tE3, 12)
  const k3 = win(frame, tE3, tList, 12)
  const k4 = rampF(frame, tList, tList + 14)
  const fs = 52
  const cw = fs * 0.55
  const blink = Math.floor(frame / 8) % 2 === 0
  const tree = (extra) => (
    <FileTree
      fontSize={32}
      width={520}
      height={290}
      items={[
        { id: 'root', name: 'site-da-ana/', folder: true, depth: 0, row: 0 },
        { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'root' },
        { id: 'proj', name: 'projetos.html', depth: 1, row: 2, parent: 'root', ...extra },
      ]}
    />
  )
  // lupa procurando "receitas.example.com" dentro da pasta
  const search = rampF(frame, tThinks, tThinks + 70)
  const lupaY = 70 + search * 150
  return (
    <AbsoluteFill>
      {k1 > 0 && (
        <div style={{ opacity: k1 }}>
          <ErrTitle n={1} op={1}>esquecer as aspas</ErrTitle>
          <div style={abs(160, 170)}>
            <CodeBox width={1300} fontSize={fs} segments={[{ text: '<a href="projetos.html>meus projetos</a>', start: 0, frames: 0 }]} mark={frame >= tE1 + 20 ? <Cross size={80} /> : null}>
              {blink && frame >= tE1 + 20 && <div style={{ position: 'absolute', left: 22 * cw - 4, top: fs * 0.2, width: cw * 0.7, height: fs * 1.1, border: `5px solid ${C.red}`, borderRadius: 6 }} />}
            </CodeBox>
          </div>
          <div style={abs(160, 340, { opacity: fadeIn(frame, tE1 + 40, 12) })}>
            <Chip size={34} color={C.night} border={C.red}>sem a aspa do final, o navegador não sabe onde o endereço termina</Chip>
          </div>
          <div style={abs(160, 470, { opacity: fadeIn(frame, tBreak + 10, 12) })}>
            <CodeBox width={1300} fontSize={fs} segments={[{ text: '<a href="projetos.html">meus projetos</a>', start: 0, frames: 0 }]} highlights={[{ text: '"', occurrence: 1, at: 0, color: 'rgba(151,196,89,0.45)' }]} mark={<Check size={80} />} />
          </div>
        </div>
      )}
      {k2 > 0 && (
        <div style={{ opacity: k2 }}>
          <ErrTitle n={2} op={1}>errar o nome do arquivo</ErrTitle>
          <div style={abs(160, 170)}>
            <CodeBox width={880} fontSize={fs} segments={[{ text: '<a href="Projetos.html">', start: 0, frames: 0 }]} highlights={[{ text: 'P', at: tE2 + 30, color: 'rgba(217,83,79,0.85)' }]} mark={frame >= tE2 + 30 ? <Cross size={80} /> : null} />
          </div>
          <div style={abs(160, 340, { opacity: fadeIn(frame, tE2 + 40, 12) })}>
            <Chip size={36} color={C.night} border={C.red}>maiúscula ≠ minúscula</Chip>
          </div>
          <div style={abs(1200, 150, { opacity: fadeIn(frame, tE2 + 10, 12) })}>{tree({ hl: frame >= tE2 + 30 ? 1 : 0 })}</div>
          <div style={abs(160, 470, { opacity: fadeIn(frame, tSame, 12) })}>
            <CodeBox width={880} fontSize={fs} segments={[{ text: 'href="projetos.html"', start: 0, frames: 0 }]} mark={<Check size={80} />} />
          </div>
          <div style={abs(160, 650, { opacity: fadeIn(frame, tPref, 12) })}>
            <Chip size={36} color={C.white} bg={C.purple} border={C.night}>nomes em minúsculas, sem acento e sem espaço</Chip>
          </div>
        </div>
      )}
      {k3 > 0 && (
        <div style={{ opacity: k3 }}>
          <ErrTitle n={3} op={1}>esquecer o https</ErrTitle>
          <div style={abs(160, 170)}>
            <CodeBox width={1080} fontSize={fs} segments={[{ text: '<a href="receitas.example.com">', start: 0, frames: 0 }]} mark={frame >= tE3 + 30 ? <Cross size={80} /> : null} />
          </div>
          <ArrowLine x1={1250} y1={225} x2={1320} y2={300} p={rampF(frame, tThinks, tThinks + 18)} bend={-40} width={6} />
          <div style={abs(1340, 280, { opacity: fadeIn(frame, tThinks, 12) })}>
            <div style={{ position: 'relative' }}>
              {tree({})}
              <div style={abs(300, lupaY)}>
                <SearchIcon size={84} />
              </div>
              <div style={abs(30, 300, { opacity: fadeIn(frame, tThinks + 70, 10) })}>
                <Chip size={28} color={C.night} border={C.red}>“receitas.example.com”? nada aqui</Chip>
              </div>
            </div>
          </div>
          <div style={abs(160, 340, { opacity: fadeIn(frame, tThinks, 12), width: 1000 })}>
            <Chip size={32} color={C.night} border={C.red}>sem https, o navegador procura na sua pasta</Chip>
          </div>
          <div style={abs(160, 470, { opacity: fadeIn(frame, tThinks + 90, 12) })}>
            <CodeBox width={1180} fontSize={fs} segments={[{ text: 'href="https://receitas.example.com"', start: 0, frames: 0 }]} highlights={[{ text: 'https://', at: 0, color: 'rgba(151,196,89,0.4)' }]} mark={<Check size={80} />} />
          </div>
        </div>
      )}
      {k4 > 0 && (
        <div style={{ opacity: k4 }}>
          <div style={abs(0, 80, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 64, fontWeight: 700, color: C.night })}>link não funcionou? confira:</div>
          <div style={abs(0, 230, { width: 1920, display: 'flex', justifyContent: 'center', gap: 60 })}>
            {['aspas', 'nome do arquivo', 'https'].map((t, i) => {
              const p = fadeIn(frame, tList + 10 + i * 14, 12)
              return (
                <div key={t} style={{ opacity: p, transform: `scale(${0.7 + 0.3 * p})`, display: 'flex', alignItems: 'center', gap: 22, background: C.white, border: `4px solid ${C.purple}`, borderRadius: 26, padding: '26px 40px', boxShadow: '0 18px 40px rgba(38,33,92,0.18)' }}>
                  <Check size={76} />
                  <span style={{ fontFamily: FONT, fontSize: 50, fontWeight: 600, color: C.night }}>{t}</span>
                </div>
              )
            })}
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
    { t: 'a e href', at: s('Um link é a tag a') },
    { t: 'caminho absoluto', at: s('Endereços de outros sites') },
    { t: 'caminho relativo e ../', at: s('Páginas do seu site') },
    { t: 'texto do link que faz sentido', at: s('O texto do link precisa') },
    { t: 'target e rel', at: s('O target underline blank') },
    { t: 'id e #', at: s('Com o id e a cerquilha') },
    { t: 'mailto:', at: s('E o mailto') },
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
      <div style={abs(240, 150, { display: 'grid', gridTemplateColumns: '760px 760px', columnGap: 60, rowGap: 26 })}>
        {items.map((it, i) => {
          const p = fadeIn(frame, it.at, 12)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
              <Check size={70} />
              <div style={{ fontFamily: FONT, fontSize: 48, color: C.night, fontWeight: 500 }}>{it.t}</div>
            </div>
          )
        })}
      </div>
      <div style={abs(0, 630, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tBtn, 14) })}>
        <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 600, padding: '20px 64px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tBtn) / 5)}px ${C.purpleSoft}` }}>
          Fazer os exercícios
        </div>
      </div>
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background dark />
          <div style={abs(0, 80, { width: 1920, display: 'flex', justifyContent: 'center', opacity: next, transform: `translateY(${(1 - next) * 20}px)` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: '#ffffff10', border: `3px solid ${C.purpleSoft}`, borderRadius: 28, padding: '26px 50px' }}>
              <ImageIcon size={110} />
              <div style={{ fontFamily: FONT, color: C.lavender }}>
                <div style={{ fontSize: 32, color: C.purpleSoft, fontWeight: 600 }}>Próxima aula</div>
                <div style={{ fontSize: 60, fontWeight: 700 }}>Aula 4 — Imagens</div>
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
