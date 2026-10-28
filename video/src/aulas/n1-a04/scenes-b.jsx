import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine, Cursor, SlideIn, cursorMotion } from '../../components/Navigation.jsx'
import { FileTree, treeGeom } from '../../components/FileTree.jsx'
import { LockIcon, SearchIcon } from '../../components/Icons.jsx'
import { ReceitasPage, codeAt, spanAt } from '../n1-a03/ana.jsx'
import { Label, abs, rampF, win } from './scenes-a.jsx'
import {
  ALT_ANA, ALT_LINK, ALT_REC, TXT, AvatarAna, BrokenImg, Cake, Checker, CodeCard, CopyrightTag, FigureView, FileCard, Landscape,
  ListIcon, Phone, PixelStar, ProjetosPreview, ReceitasThumb, Server, SpeechBubble, Star, cardAt,
} from './ana.jsx'

// ---------------------------------------------------------------- Bloco 7
const Pipe = ({ x, y, w, p, slow }) => (
  <div style={abs(x, y, { width: w, height: 70 })}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: 35, background: '#DDDAF6', border: `4px solid ${C.purple}`, boxSizing: 'border-box' }} />
    <div style={abs(14 + (w - 120) * p, 7, { width: 92, height: 56, borderRadius: 12, background: slow ? C.night : C.purple, color: C.white, fontFamily: FONT, fontWeight: 700, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(27,23,68,0.3)' })}>{slow ? '5 MB' : '60 KB'}</div>
  </div>
)

const FmtCard = ({ x, ext, label, op, active, children }) => (
  <div style={abs(x, 110, { width: 420, height: 640, opacity: op, transform: `translateY(${(1 - op) * 24}px)`, background: C.white, borderRadius: 26, border: `4px solid ${active ? C.purple : '#C9C5EE'}`, boxShadow: '0 18px 40px rgba(38,33,92,0.16)', boxSizing: 'border-box', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT })}>
    <div style={{ fontFamily: MONO, fontSize: 64, fontWeight: 700, color: C.purple }}>{ext}</div>
    <div style={{ height: 330, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>{children}</div>
    <div style={{ fontSize: 34, fontWeight: 600, color: C.night, textAlign: 'center', lineHeight: 1.25, marginTop: 10 }}>{label}</div>
  </div>
)

export const Formatos = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tShrink = s('Mas diminuir')
  const tDown = s('Se a foto original pesa')
  const tSlow = s('E imagens pesadas')
  const tSave = s('Então, antes de colocar')
  const tFmt = s('E os formatos')
  const tJpg = s('O jota pê gê')
  const tPng = s('O pê ene gê')
  const tWebp = s('O uébi pê')
  const tSvg = s('E o esse vê gê')
  const tIcons = s('É ótimo para ícones')
  const A = 1 - rampF(frame, tFmt - 4, tFmt + 10)
  const Bp = rampF(frame, tFmt, tFmt + 14)
  const pSlow = 0.55 * (1 - Math.pow(1 - rampF(frame, tDown + 10, tDown + 260), 2))
  const pFast = rampF(frame, tSave + 30, tSave + 60)
  const barSlow = Math.min(0.34, pSlow * 0.7)
  const fastDone = pFast >= 1
  const lane = (y, slow, p, show) => (
    <div style={{ opacity: show }}>
      <div style={abs(110, y)}>
        <FileCard name="foto-ana.jpg" size={slow ? '5 MB' : '60 KB'} heavy={slow} width={250}><AvatarAna size={slow ? 130 : 96} /></FileCard>
      </div>
      <Pipe x={400} y={y + 100} w={820} p={p} slow={slow} />
      <div style={abs(1270, y - 10)}>
        <Phone width={150}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            {!slow && fastDone ? <AvatarAna size={90} /> : <div style={{ width: 90, height: 90, borderRadius: 10, border: `3px dashed ${C.purpleSoft}` }} />}
            <div style={{ width: 100, height: 12, borderRadius: 6, background: '#D5D2F2', overflow: 'hidden' }}>
              <div style={{ width: `${(slow ? barSlow : pFast) * 100}%`, height: '100%', background: slow ? C.purpleSoft : C.green }} />
            </div>
          </div>
        </Phone>
      </div>
      <div style={abs(1460, y + 90)}>
        {slow ? (frame >= tSlow ? <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tSlow, 12) }}><Cross size={60} /><Chip size={30} color={C.night} border={C.red}>lenta no celular</Chip></div> : null)
          : fastDone ? <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Check size={60} /><Chip size={30} color={C.night} border={C.purple}>rapidinho</Chip></div> : null}
      </div>
    </div>
  )
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 40, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tShrink, 12) })}>
            <Chip size={44} color={C.white} bg={C.purple} border={C.night}>mostrar pequeno ≠ arquivo leve</Chip>
          </div>
          {lane(160, true, pSlow, fadeIn(frame, tDown, 12))}
          {lane(500, false, pFast, fadeIn(frame, tSave, 12))}
          <div style={abs(400, 790, { opacity: fadeIn(frame, tSave + 64, 12) })}>
            <Chip size={32} color={C.night} border={C.purple}>salve a imagem num tamanho próximo do que vai aparecer</Chip>
          </div>
        </div>
      )}
      {Bp > 0 && (
        <div style={{ opacity: Bp }}>
          <FmtCard x={60} ext=".jpg" label="fotos" op={fadeIn(frame, tJpg, 12)} active={frame >= tJpg && frame < tPng}>
            <Landscape width={360} />
          </FmtCard>
          <FmtCard x={515} ext=".png" label="desenhos, capturas de tela, fundo transparente" op={fadeIn(frame, tPng, 12)} active={frame >= tPng && frame < tWebp}>
            <Checker width={360} height={240}>
              <svg width="200" height="160" viewBox="0 0 100 80">
                <circle cx="34" cy="46" r="22" fill={C.purple} />
                <circle cx="58" cy="34" r="26" fill={C.purple} />
                <circle cx="76" cy="50" r="18" fill={C.purple} />
                <rect x="30" y="46" width="50" height="22" rx="10" fill={C.purple} />
              </svg>
            </Checker>
          </FmtCard>
          <FmtCard x={970} ext=".webp" label="moderno, arquivo menor" op={fadeIn(frame, tWebp, 12)} active={frame >= tWebp && frame < tSvg}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <svg width="150" height="150" viewBox="0 0 64 64">
                <path d="M24 16 a8 8 0 0 1 16 0" fill="none" stroke={C.night} strokeWidth="5" />
                <path d="M14 22 H50 L56 58 H8 Z" fill={C.night} stroke={C.purple} strokeWidth="3" strokeLinejoin="round" />
                <text x="32" y="47" textAnchor="middle" fontFamily={FONT} fontSize="14" fontWeight="700" fill={C.lavender}>KB</text>
              </svg>
              <svg width="80" height="170" viewBox="0 0 40 90" style={{ transform: `translateY(${10 * Math.sin(frame / 8)}px)` }}>
                <rect x="14" y="4" width="12" height="52" rx="4" fill={C.purple} />
                <polygon points="2,52 38,52 20,86" fill={C.purple} />
              </svg>
            </div>
          </FmtCard>
          <FmtCard x={1425} ext=".svg" label="formas: nítido em qualquer tamanho" op={fadeIn(frame, tSvg, 12)} active={frame >= tSvg}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 26 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 150, height: 150, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Star size={interpolate(frame, [tSvg + 10, tSvg + 50], [50, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 700, color: C.purple }}>.svg</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: fadeIn(frame, tSvg + 40, 12) }}>
                <div style={{ width: 150, height: 150, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}><PixelStar size={150} /></div>
                <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 700, color: '#8E8AB8', whiteSpace: 'nowrap' }}>.png</span>
              </div>
            </div>
          </FmtCard>
          <div style={abs(1425, 770, { width: 420, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tIcons, 12) })}>
            <Chip size={30} color={C.night} border={C.purple}>ótimo para ícones</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
export const Figure = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tWant = s('Na página de projetos')
  const tFig = s('Para isso existe a dupla')
  const tBox = s('A figure é uma caixa')
  const tOpen = s('Ela abre e, lá dentro')
  const tSrcP = s('com o src ponto')
  const tAlt = s('e um alt descrevendo')
  const tCap = s('Logo depois vem a figcaption')
  const tText = s('com o texto')
  const tClose = s('Aí fecha a figcaption')
  const tNote = s('Repara: legenda e alt')
  const tSee = s('A legenda, todo mundo vê')
  const tAltSub = s('O alt substitui')
  const ed = { x: 50, y: 40, fs: 23 }
  const fSrc = Math.max(30, Math.min(70, tAlt - tSrcP - 8))
  const fCapT = Math.max(30, Math.min(60, tClose - tText - 6))
  const segs = [
    { text: '  <h1>Meus projetos</h1>', start: 0, frames: 0 },
    { text: '\n  <figure>', start: tBox + 6, frames: 10 },
    { text: '\n    <img src="', start: tOpen + 4, frames: 10 },
    { text: '../imagens/projeto-receitas.png', start: tSrcP + 4, frames: fSrc },
    { text: '" alt="', start: tAlt, frames: 6 },
    { text: ALT_REC, start: tAlt + 6, frames: 40 },
    { text: '" width="320" height="180">', start: tAlt + 48, frames: 16 },
    { text: '\n    <figcaption>', start: tCap + 4, frames: 12 },
    { text: 'Meu primeiro projeto: um site de receitas', start: tText + 4, frames: fCapT },
    { text: '</figcaption>', start: tClose, frames: 10 },
    { text: '\n  </figure>', start: tClose + 14, frames: 10 },
  ]
  const imgOn = frame >= tAlt + 64
  const capOn = frame >= tText + 4 + fCapT
  const closed = tClose + 26
  const lineCap = '    <figcaption>Meu primeiro projeto: um site de receitas</figcaption>'
  const capEnd = codeAt(ed, 3, lineCap.length)
  const figEnd = codeAt(ed, 1, '  <figure>'.length)
  const boxTop = codeAt(ed, 1, 0).y - ed.fs * 0.75
  const boxBot = codeAt(ed, 4, 0).y + ed.fs * 0.75
  const boxP = fadeIn(frame, closed, 12)
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1820} height={300} filename="paginas/projetos.html">
          <CodeTyping
            segments={segs}
            fontSize={ed.fs}
            numbers={[8, 9, 10, 11, 12]}
            lineHighlights={[{ line: 1, at: tBox + 6, until: tOpen }, { line: 2, at: tOpen, until: tCap }, { line: 3, at: tCap, until: tClose + 14 }, { line: 4, at: tClose + 14, until: tNote }]}
            highlights={[{ text: '<figcaption>', at: tCap + 16, until: tNote, color: 'rgba(127,119,221,0.6)' }]}
          />
        </EditorWindow>
      </div>
      {/* caixa tracejada da figure */}
      <div style={abs(codeAt(ed, 1, 0).x + 14, boxTop - 2, { width: 1850 - codeAt(ed, 1, 0).x, height: boxBot - boxTop + 4, border: `3px dashed ${C.lavender}`, borderRadius: 10, opacity: boxP })} />
      <div style={abs(figEnd.x + 300, (codeAt(ed, 0, 0).y + figEnd.y) / 2 - 26, { opacity: win(frame, tBox + 16, tNote, 12) })}>
        <Chip size={28} color={C.white} bg={C.purple} border={C.lavender}><span style={{ fontFamily: MONO }}>figure</span>: agrupa imagem e legenda</Chip>
      </div>
      <div style={abs(capEnd.x + 120, (capEnd.y + codeAt(ed, 4, 0).y) / 2 - 26, { opacity: win(frame, tCap + 16, tNote, 12) })}>
        <Chip size={28} color={C.white} bg={C.purple} border={C.lavender}>a legenda</Chip>
      </div>
      {/* prévia */}
      <div style={abs(50, 370, { opacity: fadeIn(frame, tWant, 12) })}>
        <BrowserMock width={1000} height={490} tabTitle="Projetos" url="paginas/projetos.html">
          <ProjetosPreview base={22} fig={<FigureView base={22} img={imgOn ? <ReceitasThumb width={320} /> : <div style={{ width: 320, height: 180 }} />} capOp={capOn ? 1 : 0} capGlow={win(frame, tSee, tAltSub, 10)} />} />
        </BrowserMock>
      </div>
      {/* legenda x alt */}
      <div style={abs(1100, 420, { opacity: fadeIn(frame, tNote, 12) })}>
        <Chip size={36} color={C.night} border={C.purple}>legenda ≠ alt</Chip>
      </div>
      <div style={abs(1100, 520, { opacity: fadeIn(frame, tAltSub, 12) })}>
        <SpeechBubble text={`Imagem: ${ALT_REC}`} fs={26} icon={70} width={600} />
      </div>
      <div style={abs(1100, 660, { opacity: fadeIn(frame, tAltSub + 16, 12) })}>
        <Chip size={32} color={C.white} bg={C.purple} border={C.night}><span style={{ fontFamily: MONO }}>alt</span>: substitui a imagem</Chip>
      </div>
      <div style={abs(1100, 770, { opacity: fadeIn(frame, tSee, 12) })}>
        <Chip size={32} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>figcaption</span>: todo mundo vê</Chip>
      </div>
      <ArrowLine x1={1090} y1={800} x2={560} y2={800} p={rampF(frame, tSee + 6, tSee + 24)} bend={30} width={6} />
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const ImagemLink = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tLembra = s('Lembra da tag a')
  const tWant = s('A Ana quer que a miniatura')
  const tPut = s('Então, eu coloco a img')
  const tHref = s('com o href igual')
  const tThen = s('Depois vem a img')
  const tClick = s('clicou na imagem')
  const tDetail = s('Mas tem um detalhe')
  const tAltLink = s('Quando a imagem é um link')
  const tWhere = s('Então ele precisa dizer')
  const tInstead = s('Em vez de só descrever')
  const tFix = tInstead + 40
  const ed = { x: 50, y: 40, fs: 23 }
  const fUrl = Math.max(30, Math.min(70, tThen - tHref - 10))
  const fixed = frame >= tFix
  const segs = [
    { text: '  <figure>', start: 0, frames: 0 },
    { text: '\n    <a href="', start: tPut + 4, frames: 12 },
    { text: 'https://receitas.example.com', start: tHref + 4, frames: fUrl },
    { text: '">', start: tHref + 4 + fUrl, frames: 2 },
    { text: '\n', start: 0, frames: 0 },
    { text: '  ', start: tThen + 2, frames: 2 },
    { text: '    <img src="../imagens/projeto-receitas.png" alt="', start: 0, frames: 0 },
    fixed ? { text: ALT_LINK, start: tFix, frames: 36 } : { text: ALT_REC, start: 0, frames: 0 },
    { text: '" width="320" height="180">', start: 0, frames: 0 },
    { text: '\n    </a>', start: tThen + 8, frames: 8 },
    { text: '\n    <figcaption>Meu primeiro projeto: um site de receitas</figcaption>\n  </figure>', start: 0, frames: 0 },
  ]
  const wrapped = frame >= tThen + 16
  const blinkOn = frame >= tThen + 20 && frame < tClick && Math.floor((frame - tThen) / 10) % 2 === 0
  const aLineEnd = codeAt(ed, 1, '    <a href="https://receitas.example.com">'.length)
  // clique na miniatura
  const cur = cursorMotion(frame, { arrive: tClick - 4, click: tClick + 4, from: [220, 160], travel: 26 })
  const slide = rampF(frame, tClick + 12, tClick + 34) * (1 - rampF(frame, tDetail - 10, tDetail + 4))
  const thumb = (
    <div style={{ position: 'relative', width: 320, height: 180, borderRadius: 8, boxShadow: cur.hand && wrapped ? `0 0 0 4px ${C.link}` : 'none' }}>
      <ReceitasThumb width={320} />
      {wrapped && <Cursor {...cur} left="55%" top="55%" />}
    </div>
  )
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1820} height={320} filename="paginas/projetos.html">
          <CodeTyping
            segments={segs}
            fontSize={ed.fs}
            numbers={frame >= tPut + 4 ? [9, 10, 11, 12, 13, 14] : [9, 10, 11, 12]}
            highlights={[
              ...(blinkOn ? [{ text: '<a href=', at: 0, color: 'rgba(127,119,221,0.7)' }, { text: '</a>', at: 0, color: 'rgba(127,119,221,0.7)' }] : []),
              { text: fixed ? ALT_LINK : ALT_REC, at: fixed ? tFix + 36 : tWhere, color: fixed ? 'rgba(151,196,89,0.35)' : 'rgba(217,83,79,0.4)' },
            ]}
            lineHighlights={[{ line: 1, at: tPut + 4, until: tThen }]}
          />
        </EditorWindow>
      </div>
      <div style={abs(aLineEnd.x + 200, (aLineEnd.y + codeAt(ed, 0, 0).y) / 2 - 30, { opacity: fadeIn(frame, tThen + 20, 12) })}>
        <Chip size={28} color={C.white} bg={C.purple} border={C.lavender}>o link envolve a imagem</Chip>
      </div>
      <div style={abs(1100, 150, { opacity: win(frame, tLembra, tPut, 12) })}>
        <Chip size={32} color={C.white} bg={C.purple} border={C.lavender}>dentro do <span style={{ fontFamily: MONO }}>a</span>, em vez de texto: uma imagem</Chip>
      </div>
      {/* prévia */}
      <div style={abs(50, 390, { opacity: fadeIn(frame, tLembra, 12) })}>
        <BrowserMock width={1000} height={480} tabTitle="Projetos" url="paginas/projetos.html">
          <ProjetosPreview base={20} fig={<FigureView base={20} img={thumb} />} />
        </BrowserMock>
      </div>
      <SlideIn p={slide} dx={60} dy={30} style={{ left: 110, top: 430 }}>
        <BrowserMock width={960} height={390} tabTitle="Receitas de casa" url="receitas.example.com" tabHighlight>
          <ReceitasPage base={22} />
        </BrowserMock>
      </SlideIn>
      {/* o alt vira o texto do link */}
      <div style={abs(1100, 440, { opacity: fadeIn(frame, tAltLink, 12) })}>
        <Chip size={30} color={C.night} border={C.purple}>imagem com link: o alt vira o texto do link</Chip>
      </div>
      <div style={abs(1100, 525, { display: 'flex', alignItems: 'center', gap: 18, opacity: fadeIn(frame, tWhere, 12) })}>
        <div style={{ fontFamily: FONT, fontSize: 30, color: '#6E6A99', textDecoration: frame >= tInstead ? 'line-through' : 'none', textDecorationColor: C.red }}>“Tela do site de receitas...”</div>
        <div style={{ opacity: fadeIn(frame, tWhere + 10, 8) }}><Cross size={50} /></div>
      </div>
      <div style={abs(1100, 605, { display: 'flex', alignItems: 'center', gap: 18, opacity: fadeIn(frame, tFix, 12) })}>
        <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.night }}>“{ALT_LINK}”</div>
        <div style={{ opacity: fadeIn(frame, tFix + 36, 8) }}><Check size={50} /></div>
      </div>
      <div style={abs(1100, 685, { opacity: fadeIn(frame, tFix + 44, 12) })}>
        <SpeechBubble text={<><b style={{ color: C.purple }}>Link:</b> {ALT_LINK}</>} fs={28} icon={64} />
      </div>
      <Label x={1080} y={790} w={800} op={fadeIn(frame, tFix + 70, 12)} dark size={32}>imagem com link: o alt diz para onde vai</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
export const OutrosSites = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tAbs = s('O src também aceita')
  const tWorks = s('Funciona, mas')
  const tDelete = s('Se o outro site apagar')
  const tPrefer = s('Por isso, prefira guardar')
  const tImport = s('Agora, um ponto muito importante')
  const tOwner = s('Imagens têm dono')
  const tUse1 = s('Use fotos que você tirou')
  const tUse2 = s('desenhos que você fez')
  const tUse3 = s('ou imagens de acervos')
  const tLic = s('E respeite o que a licença')
  const tDoubt = s('Na dúvida, não use')
  const A = 1 - rampF(frame, tImport - 4, tImport + 10)
  const Bp = rampF(frame, tImport, tImport + 14)
  const ed = { x: 50, y: 40, fs: 28 }
  const absUrl = 'https://imagens.example.com/bolo.jpg'
  const local = frame >= tPrefer + 50
  const segs = [
    { text: '<img src="', start: 0, frames: 0 },
    local ? { text: 'imagens/bolo.jpg', start: tPrefer + 50, frames: 16 } : { text: absUrl, start: 0, frames: 0 },
    { text: '" alt="Bolo de chocolate">', start: 0, frames: 0 },
  ]
  const lineAbs = `<img src="${absUrl}" alt="Bolo de chocolate">`
  const sU = spanAt(ed, 0, lineAbs, absUrl)
  const gone = rampF(frame, tDelete + 8, tDelete + 22)
  const broken = frame >= tDelete + 24 && !(frame >= tPrefer + 66)
  // arrastar o arquivo para a pasta imagens
  const drag = rampF(frame, tPrefer + 6, tPrefer + 44)
  const T = { x: 900, y: 300 }
  const g = treeGeom({ fontSize: 30, rowH: 56 })
  const items = [
    { id: 'root', name: 'site-da-ana/', folder: true, depth: 0, row: 0 },
    { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'root' },
    { id: 'img', name: 'imagens/', folder: true, depth: 1, row: 2, parent: 'root', glow: frame >= tPrefer && frame < tPrefer + 50 ? 0.5 + 0.5 * Math.sin(frame / 5) : 0 },
    { id: 'foto', name: 'foto-ana.jpg', depth: 2, row: 3, parent: 'img' },
    { id: 'rec', name: 'projeto-receitas.png', depth: 2, row: 4, parent: 'img' },
    { id: 'bolo', name: 'bolo.jpg', depth: 2, row: 5, parent: 'img', opacity: fadeIn(frame, tPrefer + 44, 8), hl: frame >= tPrefer + 44 ? 1 : 0 },
  ]
  const from = { x: 1560, y: 120 }
  const to = { x: T.x + g.x(2) + 40, y: T.y + g.y(5) - 30 }
  const ease = 1 - Math.pow(1 - drag, 3)
  const fx = from.x + (to.x - from.x) * ease
  const fy = from.y + (to.y - from.y) * ease - Math.sin(drag * Math.PI) * 80
  const cards = [
    { t: 'foto que você tirou', at: tUse1 },
    { t: 'desenho que você fez', at: tUse2 },
    { t: <>acervo com uso liberado <b style={{ color: C.purple, background: frame >= tLic ? 'rgba(127,119,221,0.2)' : 'transparent', borderRadius: 6, padding: '0 6px' }}>+ crédito ao autor</b></>, at: tUse3 },
  ]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1300} height={140} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} numbers={[4]} highlights={[{ text: absUrl, at: tAbs + 10, color: 'rgba(143,211,232,0.35)' }, { text: 'imagens/bolo.jpg', at: tPrefer + 66, color: 'rgba(151,196,89,0.35)' }]} />
            </EditorWindow>
          </div>
          <div style={abs(1480, 20, { opacity: fadeIn(frame, tAbs + 6, 12) })}><Server width={300} gone={gone} /></div>
          {/* arquivo no servidor */}
          <div style={abs(1395, 120, { opacity: (1 - gone) * fadeIn(frame, tAbs + 14, 8) * (frame >= tDelete ? 1 : 1), transform: `scale(${1 - 0.4 * gone})` })}>
            <div style={{ background: C.white, borderRadius: 8, padding: 4, border: `3px solid ${C.purple}` }}><Cake width={80} /></div>
          </div>
          {frame >= tDelete + 8 && frame < tPrefer && <div style={abs(1410, 130, { opacity: fadeIn(frame, tDelete + 8, 8) })}><Cross size={56} /></div>}
          <ArrowLine x1={sU.x1 - 30} y1={sU.bottom + 4} x2={1500} y2={250} p={win(frame, tAbs + 10, tPrefer, 12)} bend={30} width={6} />
          <Label x={sU.x - 330} y={200} w={660} op={win(frame, tAbs + 20, tPrefer + 50, 12)} dark size={32}>caminho absoluto: outro site</Label>
          <div style={abs(1480, 380, { opacity: win(frame, tWorks, tPrefer, 12) })}>
            <Chip size={30} color={C.night} border={C.purple}>funciona, mas evite</Chip>
          </div>
          <div style={abs(50, 300, { opacity: fadeIn(frame, tAbs, 12) })}>
            <BrowserMock width={780} height={540} tabTitle="Sobre mim" url="index.html">
              <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
                <div style={{ fontSize: 34, fontWeight: 700 }}>Meu bolo favorito</div>
                <div style={{ marginTop: 18 }}>{broken ? <BrokenImg alt="Bolo de chocolate" fs={24} /> : <Cake width={380} />}</div>
              </div>
            </BrowserMock>
          </div>
          <div style={abs(700, 330, { opacity: broken ? fadeIn(frame, tDelete + 26, 8) : 0 })}><Cross size={70} /></div>
          <div style={abs(T.x, T.y, { opacity: fadeIn(frame, tPrefer, 12) })}>
            <FileTree items={items} fontSize={30} rowH={56} width={560} height={420} />
          </div>
          {drag > 0 && drag < 1 && <div style={abs(fx - 50, fy - 40)}><div style={{ background: C.white, borderRadius: 8, padding: 4, border: `3px solid ${C.purple}`, boxShadow: '0 10px 20px rgba(27,23,68,0.3)' }}><Cake width={90} /></div></div>}
          <div style={abs(T.x, 760, { display: 'flex', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tPrefer + 70, 12) })}>
            <Check size={56} />
            <Chip size={34} color={C.white} bg={C.purple} border={C.night}>prefira os seus arquivos</Chip>
          </div>
        </div>
      )}
      {Bp > 0 && (
        <div style={{ opacity: Bp }}>
          <div style={abs(90, 120)}>
            <div style={{ position: 'relative', background: C.white, padding: 18, borderRadius: 20, border: `4px solid ${C.purple}`, boxShadow: '0 18px 40px rgba(38,33,92,0.2)' }}>
              <Landscape width={520} />
              <div style={abs(470, -40, { opacity: fadeIn(frame, tOwner, 10), transform: `scale(${0.7 + 0.3 * fadeIn(frame, tOwner, 10)})` })}><CopyrightTag size={100} /></div>
              <div style={abs(-36, 290, { opacity: fadeIn(frame, tOwner + 12, 10) })}><LockIcon size={100} /></div>
            </div>
          </div>
          <div style={abs(90, 560, { opacity: fadeIn(frame, tImport + 10, 12) })}>
            <Chip size={27} color={C.night} border={C.purpleSoft}>estar na internet não quer dizer que pode usar</Chip>
          </div>
          <div style={abs(90, 650, { opacity: fadeIn(frame, tOwner, 12) })}>
            <Chip size={34} color={C.white} bg={C.purple} border={C.night}>imagens têm dono</Chip>
          </div>
          <div style={abs(800, 130, { display: 'flex', flexDirection: 'column', gap: 30 })}>
            {cards.map((c, i) => {
              const p = fadeIn(frame, c.at, 12)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, width: 1030, background: C.white, borderRadius: 22, border: `4px solid ${C.purple}`, padding: '22px 30px', boxSizing: 'border-box', opacity: p, transform: `translateX(${(1 - p) * 40}px)`, boxShadow: '0 12px 28px rgba(38,33,92,0.14)' }}>
                  <Check size={64} />
                  <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.night }}>{c.t}</div>
                </div>
              )
            })}
          </div>
          <div style={abs(800, 640, { width: 1030, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tDoubt, 12), transform: `scale(${0.9 + 0.1 * fadeIn(frame, tDoubt, 12)})` })}>
            <div style={{ background: C.night, color: C.lavender, borderRadius: 24, padding: '18px 60px', fontFamily: FONT, fontSize: 56, fontWeight: 700, boxShadow: '0 18px 40px rgba(27,23,68,0.35)' }}>na dúvida, não use</div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 11
const ErrTitle = ({ n, children }) => (
  <div style={abs(160, 40, { display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT })}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: C.purple, color: C.white, fontSize: 40, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 700, color: C.night }}>{children}</div>
  </div>
)

export const Erros = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tE1 = s('O primeiro')
  const tDots = s('ou falta o ponto')
  const tE2 = s('O segundo')
  const tDiff = s('podem ser arquivos diferentes')
  const tE3 = s('O terceiro')
  const tNoExt = s('Sem ela')
  const tE4 = s('E o quarto')
  const tOut = s('Esse não quebra')
  const tList = s('Se a imagem não aparecer')
  const k1 = win(frame, tE1 - 6, tE2, 12)
  const k2 = win(frame, tE2, tE3, 12)
  const k3 = win(frame, tE3, tE4, 12)
  const k4 = win(frame, tE4, tList, 12)
  const k5 = rampF(frame, tList, tList + 14)
  const fs = 44
  const blink = Math.floor(frame / 8) % 2 === 0
  const tree = (extra = {}, search) => (
    <FileTree
      fontSize={30}
      rowH={56}
      width={620}
      height={460}
      items={[
        { id: 'root', name: 'site-da-ana/', folder: true, depth: 0, row: 0 },
        { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'root' },
        { id: 'img', name: 'imagens/', folder: true, depth: 1, row: 2, parent: 'root' },
        { id: 'foto', name: 'foto-ana.jpg', depth: 2, row: 3, parent: 'img', ...(extra.foto || {}) },
        { id: 'rec', name: 'projeto-receitas.png', depth: 2, row: 4, parent: 'img' },
        { id: 'pag', name: 'paginas/', folder: true, depth: 1, row: 5, parent: 'root', ...(extra.pag || {}) },
        { id: 'proj', name: 'projetos.html', depth: 2, row: 6, parent: 'pag' },
      ]}
    >
      {search}
    </FileTree>
  )
  const scan = rampF(frame, tE1 + 30, tE1 + 110)
  const c3 = { x: 160, y: 190, fs }
  const extCol = '<img src="imagens/foto-ana'.length
  const extAt = cardAt(c3, 0, extCol)
  const tiles = ['caminho', 'maiúsculas', 'extensão', 'alt']
  return (
    <AbsoluteFill>
      {k1 > 0 && (
        <div style={{ opacity: k1 }}>
          <ErrTitle n={1}>o caminho errado</ErrTitle>
          <CodeCard x={160} y={210} fs={40} title="paginas/projetos.html" text={'<img src="imagens/projeto-receitas.png">'} highlights={[{ text: 'imagens/', at: tE1 + 20, color: 'rgba(217,83,79,0.55)' }]} mark={frame >= tE1 + 20 ? <Cross size={70} /> : null} />
          <div style={abs(160, 360, { display: 'flex', alignItems: 'center', gap: 24, opacity: fadeIn(frame, tE1 + 40, 12) })}>
            <BrokenImg fs={30} width={90} height={80} />
            <Chip size={32} color={C.night} border={C.red}>procura <span style={{ fontFamily: MONO }}>imagens/</span> dentro de <span style={{ fontFamily: MONO }}>paginas/</span>: não acha</Chip>
          </div>
          <div style={abs(1270, 150, { opacity: fadeIn(frame, tE1 + 10, 12) })}>
            {tree({ pag: { hl: frame >= tE1 + 30 && frame < tDots ? 1 : 0 } }, (
              <div style={abs(130 + scan * 200, 340 + Math.sin(scan * Math.PI * 3) * 20, { opacity: win(frame, tE1 + 30, tDots + 10, 8) })}><SearchIcon size={84} color={C.red} /></div>
            ))}
          </div>
          <CodeCard x={160} y={540} fs={40} text={'src="../imagens/projeto-receitas.png"'} op={fadeIn(frame, tDots, 12)} highlights={[{ text: '../', at: tDots, color: 'rgba(151,196,89,0.45)' }]} mark={<Check size={70} />} />
        </div>
      )}
      {k2 > 0 && (
        <div style={{ opacity: k2 }}>
          <ErrTitle n={2}>maiúsculas e minúsculas</ErrTitle>
          <CodeCard x={160} y={190} fs={fs} text={'<img src="imagens/Foto-ana.jpg">'} highlights={[{ text: 'F', at: tE2 + 30, color: 'rgba(217,83,79,0.85)' }]} mark={frame >= tE2 + 30 ? <Cross size={70} /> : null} />
          <div style={abs(160, 340, { opacity: fadeIn(frame, tE2 + 40, 12) })}>
            <Chip size={36} color={C.night} border={C.red}>maiúscula ≠ minúscula</Chip>
          </div>
          <div style={abs(1240, 150, { opacity: fadeIn(frame, tE2 + 10, 12) })}>{tree({ foto: { hl: frame >= tE2 + 30 ? 1 : 0 } })}</div>
          <CodeCard x={160} y={480} fs={fs} text={'src="imagens/foto-ana.jpg"'} op={fadeIn(frame, tDiff, 12)} highlights={[{ text: 'f', occurrence: 0, at: tDiff, color: 'rgba(151,196,89,0.45)' }]} mark={<Check size={70} />} />
          <div style={abs(160, 630, { opacity: fadeIn(frame, tDiff + 20, 12) })}>
            <Chip size={32} color={C.white} bg={C.purple} border={C.night}>principalmente quando o site vai para a internet</Chip>
          </div>
        </div>
      )}
      {k3 > 0 && (
        <div style={{ opacity: k3 }}>
          <ErrTitle n={3}>esquecer a extensão</ErrTitle>
          <CodeCard x={c3.x} y={c3.y} fs={fs} text={'<img src="imagens/foto-ana">'} mark={frame >= tE3 + 24 ? <Cross size={70} /> : null} />
          {blink && frame >= tE3 + 24 && <div style={abs(extAt.x - 2, extAt.y - fs * 0.62, { width: fs * 2.2, height: fs * 1.24, border: `5px dashed ${C.red}`, borderRadius: 8, boxSizing: 'border-box' })} />}
          <div style={abs(160, 340, { opacity: fadeIn(frame, tE3 + 40, 12) })}>
            <Chip size={34} color={C.night} border={C.red}>sem <span style={{ fontFamily: MONO }}>.jpg</span> ou <span style={{ fontFamily: MONO }}>.png</span>, o navegador não acha</Chip>
          </div>
          <CodeCard x={160} y={480} fs={fs} text={'src="imagens/foto-ana.jpg"'} op={fadeIn(frame, tNoExt, 12)} highlights={[{ text: '.jpg', at: tNoExt, color: 'rgba(151,196,89,0.45)' }]} mark={<Check size={70} />} />
          <div style={abs(160, 630, { opacity: fadeIn(frame, tNoExt + 16, 12) })}>
            <Chip size={34} color={C.white} bg={C.purple} border={C.night}>a extensão faz parte do nome</Chip>
          </div>
        </div>
      )}
      {k4 > 0 && (
        <div style={{ opacity: k4 }}>
          <ErrTitle n={4}>esquecer o alt</ErrTitle>
          <CodeCard x={160} y={190} fs={fs} text={'<img src="imagens/foto-ana.jpg">'} mark={frame >= tE4 + 20 ? <Cross size={70} /> : null} />
          <div style={abs(1180, 196, { opacity: fadeIn(frame, tE4 + 26, 12) })}>
            <SpeechBubble text="foto-ana.jpg" fs={32} icon={80} strike={rampF(frame, tE4 + 40, tE4 + 54)} />
          </div>
          <div style={abs(160, 340, { opacity: fadeIn(frame, tOut, 12) })}>
            <Chip size={34} color={C.night} border={C.red}>não quebra a imagem, mas deixa muita gente de fora</Chip>
          </div>
          <CodeCard x={160} y={480} fs={30} text={`<img src="imagens/foto-ana.jpg" alt="${ALT_ANA}">`} op={fadeIn(frame, tOut + 30, 12)} highlights={[{ text: `alt="${ALT_ANA}"`, at: tOut + 30, color: 'rgba(151,196,89,0.35)' }]} mark={<Check size={64} />} />
        </div>
      )}
      {k5 > 0 && (
        <div style={{ opacity: k5 }}>
          <div style={abs(0, 80, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 60, fontWeight: 700, color: C.night })}>a imagem não apareceu?</div>
          <div style={abs(110, 240, { display: 'flex', gap: 40 })}>
            {tiles.map((t, i) => {
              const p = fadeIn(frame, tList + 10 + i * 10, 12)
              return (
                <div key={t} style={{ width: 395, height: 250, background: C.white, borderRadius: 26, border: `4px solid ${C.purple}`, boxShadow: '0 18px 40px rgba(38,33,92,0.16)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, opacity: p, transform: `scale(${0.8 + 0.2 * p})`, fontFamily: FONT }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 28, background: C.purple, color: C.white, fontSize: 32, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                    <Check size={56} />
                  </div>
                  <div style={{ fontSize: 44, fontWeight: 700, color: C.night }}>{t}</div>
                </div>
              )
            })}
          </div>
          <Label x={0} y={600} w={1920} op={fadeIn(frame, tList + 60, 12)} dark size={40}>confira primeiro o caminho, o nome e a extensão</Label>
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
    { t: 'img: tag vazia', at: s('A imagem é a tag img') },
    { t: 'src e caminhos', at: s('O src diz qual arquivo') },
    { t: 'alt que descreve (ou vazio no enfeite)', at: s('O alt descreve') },
    { t: 'width e height na proporção', at: s('O width e o height') },
    { t: 'arquivos leves e formatos', at: s('e arquivos leves') },
    { t: 'figure e figcaption', at: s('A figure e a figcaption') },
    { t: 'imagem com link', at: s('Uma imagem pode virar') },
    { t: 'imagens que você pode usar', at: s('E use só imagens') },
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
      <div style={abs(130, 150, { display: 'grid', gridTemplateColumns: '820px 820px', gridAutoFlow: 'column', gridTemplateRows: 'repeat(4, auto)', columnGap: 60, rowGap: 24 })}>
        {items.map((it, i) => {
          const p = fadeIn(frame, it.at, 12)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
              <Check size={64} />
              <div style={{ fontFamily: FONT, fontSize: 40, color: C.night, fontWeight: 500 }}>{it.t}</div>
            </div>
          )
        })}
      </div>
      <div style={abs(0, 640, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tBtn, 14) })}>
        <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 600, padding: '20px 64px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tBtn) / 5)}px ${C.purpleSoft}` }}>
          Fazer os exercícios
        </div>
      </div>
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background dark />
          <div style={abs(0, 80, { width: 1920, display: 'flex', justifyContent: 'center', opacity: next, transform: `translateY(${(1 - next) * 20}px)` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: '#ffffff10', border: `3px solid ${C.purpleSoft}`, borderRadius: 28, padding: '26px 50px' }}>
              <ListIcon size={110} />
              <div style={{ fontFamily: FONT, color: C.lavender }}>
                <div style={{ fontSize: 32, color: C.purpleSoft, fontWeight: 600 }}>Próxima aula</div>
                <div style={{ fontSize: 60, fontWeight: 700 }}>Aula 5 — Listas</div>
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
