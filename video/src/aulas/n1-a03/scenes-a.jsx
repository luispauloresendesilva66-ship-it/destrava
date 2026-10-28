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
import { ArrowLine, Cursor, PageWeb, SlideIn, cursorMotion } from '../../components/Navigation.jsx'
import { FileTree, treeGeom } from '../../components/FileTree.jsx'
import { SpeakerIcon } from '../../components/Icons.jsx'
import { abs, rampF, win } from '../n1-a02/scenes-a.jsx'
import { AnaPage3, L, LinkText, ProjetosPage, ReceitasPage, BEFORE_NAV, WITH_PROJ, lineNumbers, spanAt, staticSegs, URL_REC } from './ana.jsx'

export { abs, rampF, win }

// Chip com largura máxima e texto centralizado (para rótulos com seta).
export const Label = ({ x, y, w, op = 1, children, dark = false, size = 34, border }) => (
  <div style={abs(x, y, { width: w, display: 'flex', justifyContent: 'center', opacity: op, transform: `translateY(${(1 - op) * 10}px)` })}>
    <Chip size={size} color={dark ? C.white : C.night} bg={dark ? C.purple : C.white} border={border || (dark ? C.night : C.purple)} style={{ textAlign: 'center' }}>{children}</Chip>
  </div>
)

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Na aula passada')
  const tSteps = s('Hoje é o dia dos links')
  const tBuild = s('Os links são o que transforma')
  const tSite = s('levar a pessoa para outro site')
  const tPag = s('para uma segunda página')
  const tSec = s('para um trecho')
  const tMail = s('até para o e-mail')
  const tLabel = s('E, no caminho')
  const logoBig = 1 - rampF(frame, tTitle - 6, tTitle + 8)
  const logoSmall = rampF(frame, tTitle, tTitle + 14)
  const heights = [220, 270, 320, 370, 420]
  const prev = fadeIn(frame, tBuild, 18)
  // prévia da página da Ana (linhas em posições fixas para as setas)
  const B = { x: 1010, y: 330, w: 620, h: 460 }
  const cx = B.x + 30
  const cy = B.y + 152
  const rows = [
    { key: 'sec', y: 64, at: tSec, card: 'uma seção' },
    { key: 'site', y: 116, at: tSite, card: 'outro site' },
    { key: 'pag', y: 166, at: tPag, card: 'outra página' },
    { key: 'mail', y: 280, at: tMail, card: 'e-mail' },
  ]
  const lit = (k) => frame >= rows.find((r) => r.key === k).at
  const LinkW = ({ k, children }) => <span style={{ color: lit(k) ? C.link : '#1A1A1A', textDecoration: lit(k) ? 'underline' : 'none', textUnderlineOffset: 4 }}>{children}</span>
  const row = (y, fs, children, bold) => <div style={{ position: 'absolute', left: 0, top: y, fontSize: fs, fontWeight: bold ? 700 : 400, whiteSpace: 'nowrap' }}>{children}</div>
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
        <Title start={tTitle} size={92}>Aula 3 — Links</Title>
      </div>
      {/* 5 degraus, o primeiro aceso */}
      <div style={abs(90, 810 - 420, { width: 860, height: 420, display: 'flex', alignItems: 'flex-end', gap: 12 })}>
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
      {/* página da Ana com links */}
      <div style={abs(B.x, B.y, { opacity: prev, transform: `translateY(${(1 - prev) * 30}px)` })}>
        <BrowserMock width={B.w} height={B.h} tabTitle="Sobre mim" url="index.html">
          <div style={{ position: 'relative', fontFamily: FONT, color: '#1A1A1A' }}>
            {row(0, 34, 'Olá, eu sou a Ana', true)}
            {row(rows[0].y, 23, <><LinkW k="sec">Quem sou eu</LinkW> · <LinkW k="sec">O que estou aprendendo</LinkW></>)}
            {row(rows[1].y, 23, <>Veja as <LinkW k="site">minhas receitas favoritas</LinkW>.</>)}
            {row(rows[2].y, 23, <>Conheça os <LinkW k="pag">meus projetos</LinkW>.</>)}
            {row(218, 23, 'Ana Souza')}
            {row(249, 23, 'Cidade Exemplo')}
            {row(rows[3].y, 23, <LinkW k="mail">ana@example.com</LinkW>)}
          </div>
        </BrowserMock>
      </div>
      {rows.map((r, i) => {
        const p = rampF(frame, r.at + 4, r.at + 18)
        const cardY = 380 + i * 104
        return (
          <React.Fragment key={r.key}>
            <ArrowLine x1={B.x + B.w - 12} y1={cy + r.y + 14} x2={1672} y2={cardY + 34} p={p} bend={0} width={6} />
            <div style={abs(1680, cardY, { opacity: fadeIn(frame, r.at + 14, 10) })}>
              <Chip size={32} color={C.night} border={C.purple}>{r.card}</Chip>
            </div>
          </React.Fragment>
        )
      })}
      <Label x={B.x - 40} y={800} w={B.w + 80} op={fadeIn(frame, tLabel, 14)} dark size={36}>o que a gente vai construir hoje</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
const OpenBook = ({ width = 720, arrow = 0 }) => {
  const h = width * 0.6
  const half = width / 2
  const lines = (x0) => [0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={x0 + 40} y={50 + i * 46} width={half - 80 - (i % 3) * 30} height="12" rx="6" fill="#DAD7F5" />)
  return (
    <svg width={width} height={h + 60} viewBox={`0 0 ${width} ${h + 60}`} style={{ overflow: 'visible', filter: 'drop-shadow(0 18px 30px rgba(38,33,92,0.22))' }}>
      <path d={`M0 10 Q${half / 2} -6 ${half} 14 V${h} Q${half / 2} ${h - 18} 0 ${h - 4} Z`} fill={C.white} stroke={C.purpleSoft} strokeWidth="4" />
      <path d={`M${width} 10 Q${half * 1.5} -6 ${half} 14 V${h} Q${half * 1.5} ${h - 18} ${width} ${h - 4} Z`} fill={C.white} stroke={C.purpleSoft} strokeWidth="4" />
      {lines(0)}
      {lines(half)}
      <line x1={half} y1="14" x2={half} y2={h} stroke={C.purple} strokeWidth="5" />
      <line x1="40" y1={h + 36} x2={40 + (width - 110) * clamp01(arrow)} y2={h + 36} stroke={C.purple} strokeWidth="10" strokeLinecap="round" />
      {arrow >= 1 && <polygon points={`${width - 74},${h + 16} ${width - 34},${h + 36} ${width - 74},${h + 56}`} fill={C.purple} />}
    </svg>
  )
}

export const Hipertexto = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tAcr = s('HTML quer dizer')
  const tHyper = s('chegou a hora de entender')
  const tComum = s('Um texto comum')
  const tHip = s('Um hipertexto é um texto com portas')
  const tPortas = s('Essas portas são os links')
  const tNav = s('Quando você navega')
  const tIlha = s('Sem eles')
  const tBrowser = s('No navegador, um link costuma')
  const tHand = s('e o cursor do mouse')
  const A = win(frame, 0, tComum, 12)
  const Bp = win(frame, tComum, tBrowser, 12)
  const Cp = rampF(frame, tBrowser, tBrowser + 12)
  const hl = rampF(frame, tHyper, tHyper + 14)
  const words = [
    { t: 'HyperText', key: true },
    { t: 'Markup' },
    { t: 'Language' },
  ]
  const nodes = [
    { x: 130, y: 120, at: tHip + 6, title: 'Início' },
    { x: 470, y: 90, at: tHip + 12, title: 'Receitas' },
    { x: 790, y: 160, at: tHip + 18, title: 'Projetos' },
    { x: 220, y: 400, at: tHip + 24, title: 'Contato' },
    { x: 560, y: 360, at: tHip + 30, title: 'Notícias' },
    { x: 830, y: 450, at: tHip + 36, title: 'Fotos' },
  ]
  const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [4, 5], [2, 5], [2, 4]].map(([a, b], i) => ({ a, b, at: tPortas + i * 9 }))
  const linkOp = 1 - 0.85 * rampF(frame, tIlha, tIlha + 16)
  const cur = cursorMotion(frame, { arrive: tHand + 24, from: [260, 140], travel: 30 })
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 240, { width: 1920, display: 'flex', justifyContent: 'center', gap: 34, opacity: fadeIn(frame, tAcr, 12) })}>
            {words.map((w) => (
              <div key={w.t} style={{ fontFamily: FONT, fontSize: 104, fontWeight: 700, color: w.key ? (hl > 0.5 ? C.white : C.night) : C.night, background: w.key ? `rgba(83,74,183,${hl})` : 'transparent', borderRadius: 20, padding: '4px 24px', opacity: w.key ? 1 : 1 - 0.55 * hl }}>
                <span style={{ color: w.key ? (hl > 0.5 ? C.white : C.purple) : C.purple }}>{w.t[0]}</span>{w.t.slice(1)}
              </div>
            ))}
          </div>
          <div style={abs(0, 470, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tHyper + 10, 12) })}>
            <Chip size={58} color={C.white} bg={C.purple} border={C.night}>HyperText = hipertexto</Chip>
          </div>
        </div>
      )}
      {Bp > 0 && (
        <div style={{ opacity: Bp }}>
          <div style={abs(80, 150, { opacity: fadeIn(frame, tComum, 12) })}>
            <OpenBook width={720} arrow={rampF(frame, tComum + 14, tComum + 60)} />
          </div>
          <Label x={80} y={700} w={720} op={fadeIn(frame, tComum + 40, 12)} size={40}>texto comum: do começo ao fim</Label>
          <div style={abs(950, 110)}>
            <PageWeb nodes={nodes} edges={edges} width={920} height={560} w={150} h={180} linkOpacity={linkOp} />
          </div>
          <div style={abs(950, 700, { width: 920 })}>
            <div style={{ position: 'absolute', width: 920, display: 'flex', justifyContent: 'center', opacity: win(frame, tHip, tPortas, 10) }}>
              <Chip size={40} color={C.night} border={C.purple}>hipertexto = texto com portas</Chip>
            </div>
            <div style={{ position: 'absolute', width: 920, display: 'flex', justifyContent: 'center', opacity: win(frame, tPortas, tIlha, 10) }}>
              <Chip size={40} color={C.white} bg={C.purple} border={C.night}>hipertexto = texto com links</Chip>
            </div>
            <div style={{ position: 'absolute', width: 920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tIlha, 10) }}>
              <Chip size={40} color={C.night} border={C.purpleSoft}>sem links: cada página é uma ilha</Chip>
            </div>
          </div>
        </div>
      )}
      {Cp > 0 && (
        <div style={{ opacity: Cp }}>
          <div style={abs(360, 70)}>
            <BrowserMock width={1200} height={520} tabTitle="Sobre mim" url="index.html">
              <div style={{ fontFamily: FONT, color: '#1A1A1A', padding: '30px 20px' }}>
                <div style={{ fontSize: 56, fontWeight: 700 }}>Olá, eu sou a Ana</div>
                <div style={{ fontSize: 44, marginTop: 40, lineHeight: 1.5 }}>
                  Veja as{' '}
                  <LinkText k="w" cursor={{ key: 'w', node: <Cursor {...cur} size={60} /> }} hover={cur.hand}>minhas receitas favoritas</LinkText>.
                </div>
              </div>
            </BrowserMock>
          </div>
          <div style={abs(0, 640, { width: 1920, display: 'flex', justifyContent: 'center', gap: 30 })}>
            <div style={{ opacity: fadeIn(frame, tBrowser + 20, 12) }}>
              <Chip size={40} color={C.night} border={C.purple}>link: azul e sublinhado</Chip>
            </div>
            <div style={{ opacity: fadeIn(frame, tHand + 30, 12) }}>
              <Chip size={40} color={C.white} bg={C.purple} border={C.night}>o cursor vira uma mãozinha</Chip>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
export const TagA = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tA = s('O link é a tag a')
  const tAlone = s('Só que, sozinha')
  const tAttr = s('O href é um atributo')
  const tWrite = s('Você escreve href')
  const tAna = s('A Ana adora cozinhar')
  const tUrl = s('agá tê tê pê esse')
  const tCam = s('A gente chama isso')
  const tText = s('E, entre a abertura')
  const ed = { x: 50, y: 60, fs: 34 }
  const urlF = Math.max(40, tCam - tUrl - 30)
  const segs = [
    { text: L.p2 + '\n', start: 0, frames: 0 },
    { text: '  <p>Veja as <a', start: tA, frames: 18 },
    { text: ' href="', start: tWrite, frames: 12 },
    { text: URL_REC, start: tUrl, frames: urlF },
    { text: '"', start: tWrite + 12, frames: 0 },
    { text: '>', start: tA + 18, frames: 0 },
    { text: 'minhas receitas favoritas', start: tText + 6, frames: 30 },
    { text: '</a>.</p>', start: tA + 22, frames: 12 },
  ]
  const line = L.rec
  const sA = spanAt(ed, 1, line, '<a')
  const sH = spanAt(ed, 1, line, 'href')
  const sU = spanAt(ed, 1, line, URL_REC)
  const sT = spanAt(ed, 1, line, 'minhas receitas favoritas')
  const opA = fadeIn(frame, tA + 34, 12)
  const opH = fadeIn(frame, tAttr, 12)
  const opU = fadeIn(frame, tCam, 12)
  const opT = fadeIn(frame, tText + 40, 12)
  const typedAll = tText + 36
  const click = typedAll + 52
  const cur = cursorMotion(frame, { arrive: click - 8, click, from: [240, 160], travel: 26 })
  const slide = rampF(frame, click + 8, click + 30)
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1820} height={220} filename="index.html">
          <CodeTyping
            segments={segs}
            fontSize={ed.fs}
            numbers={lineNumbers(BEFORE_NAV, ['p2', 'rec'])}
            highlights={[
              { text: '<a', at: tA + 34, until: tAttr, color: 'rgba(127,119,221,0.6)' },
              { text: 'href=', at: tAttr, until: tAna },
              { text: URL_REC, at: tCam, until: tText, color: 'rgba(143,211,232,0.35)' },
              { text: 'minhas receitas favoritas', at: tText + 40, color: 'rgba(255,210,138,0.35)' },
            ]}
            lineHighlights={[{ line: 1, at: tAna }]}
          />
        </EditorWindow>
      </div>
      {/* rótulos abaixo do código (linha 1) */}
      <Label x={60} y={316} w={420} op={opA}>a tag do link</Label>
      <ArrowLine x1={330} y1={314} x2={sA.x} y2={sA.bottom + 6} p={opA} width={6} />
      <Label x={sT.x - 300} y={316} w={600} op={opT}>o texto que a pessoa clica</Label>
      <ArrowLine x1={sT.x} y1={314} x2={sT.x} y2={sT.bottom + 6} p={opT} width={6} />
      <Label x={0} y={406} w={1920} op={win(frame, tAlone, tAttr, 12)} border={C.purpleSoft}>sozinha, ela não sabe para onde ir</Label>
      <Label x={sH.x - 40} y={406} w={460} op={win(frame, tAttr, tCam, 12)}>atributo: para onde vai</Label>
      <ArrowLine x1={sH.x + 20} y1={404} x2={sH.x} y2={sH.bottom + 6} p={win(frame, tAttr, tCam, 12)} width={6} />
      <Label x={sU.x - 400} y={406} w={800} op={opU} dark>caminho absoluto: o endereço completo</Label>
      <ArrowLine x1={sU.x} y1={404} x2={sU.x} y2={sU.bottom + 6} p={opU} width={6} />
      {/* prévia */}
      <div style={abs(460, 500, { opacity: fadeIn(frame, tA, 12) })}>
        <BrowserMock width={1000} height={370} tabTitle="Sobre mim" url="index.html">
          <AnaPage3 parts={['p2', ...(frame >= typedAll ? ['rec'] : [])]} base={32} cursor={{ key: 'rec', node: <Cursor {...cur} /> }} />
        </BrowserMock>
      </div>
      <SlideIn p={slide} dx={0} dy={40} style={{ left: 520, top: 520 }}>
        <BrowserMock width={1000} height={360} tabTitle="Receitas de casa" url="receitas.example.com" tabHighlight>
          <ReceitasPage base={22} />
        </BrowserMock>
      </SlideIn>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
const CLIQUE = [
  { pre: 'Para ler o regulamento, ', post: '.' },
  { pre: 'Quer saber os horários? ', post: '.' },
  { pre: 'As fotos do evento estão no ar: ', post: '.' },
]
const Balloon = ({ children, op }) => (
  <div style={{ position: 'relative', opacity: op, transform: `scale(${0.85 + 0.15 * op})`, transformOrigin: 'left center' }}>
    <div style={{ background: C.white, border: `4px solid ${C.purple}`, borderRadius: 26, padding: '14px 30px', fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.night, boxShadow: '0 12px 28px rgba(38,33,92,0.18)' }}>{children}</div>
    <div style={{ position: 'absolute', left: -22, top: 26, width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderRight: `24px solid ${C.purple}` }} />
  </div>
)

export const TextoDoLink = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSabe = s('Sabe aqueles sites')
  const tProb = s('Isso é um problema')
  const tJump = s('muitas vezes pula')
  const tHear = s('Imagina ouvir')
  const tNo = s('Não dá para saber')
  const tSkim = s('E quem só passa o olho')
  const tRule = s('A regra é simples')
  const tInstead = s('Em vez de')
  const tWrite = s('escreva')
  const tWords = s('com o link nessas palavras')
  const tClear = s('Fica claro')
  const A = win(frame, 0, tInstead, 12)
  const Bp = rampF(frame, tInstead, tInstead + 12)
  const focus = frame >= tJump && frame < tHear + 90 ? Math.floor((frame - tJump) / 22) % 3 : -1
  const bad = '<p>Para ver as minhas receitas, <a href="https://receitas.example.com">clique aqui</a>.</p>'
  const good = '<p>Veja as <a href="https://receitas.example.com">minhas receitas favoritas</a>.</p>'
  const ed = { x: 50, y: 60, fs: 32 }
  const goodTyped = tWrite + 10 + 50
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(70, 50, { opacity: fadeIn(frame, tSabe, 12) })}>
            <BrowserMock width={1060} height={600} tabTitle="Página de exemplo" url="exemplo.example.com">
              <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
                <div style={{ fontSize: 46, fontWeight: 700, marginBottom: 24 }}>Festa do bairro</div>
                {CLIQUE.map((c, i) => {
                  const on = frame >= tProb
                  return (
                    <div key={i} style={{ fontSize: 32, lineHeight: 1.4, marginTop: 26 }}>
                      {c.pre}
                      <span style={{ color: C.link, textDecoration: 'underline', textUnderlineOffset: 4, background: on ? 'rgba(127,119,221,0.3)' : 'transparent', borderRadius: 6, padding: '0 4px', boxShadow: focus === i ? `0 0 0 5px ${C.purple}` : 'none' }}>clique aqui</span>
                      {c.post}
                    </div>
                  )
                })}
                <div style={{ marginTop: 40 }}>
                  {[96, 88, 70].map((w, i) => <div key={i} style={{ height: 14, width: `${w}%`, background: '#E3E1F7', borderRadius: 7, marginBottom: 14 }} />)}
                </div>
              </div>
            </BrowserMock>
          </div>
          <div style={abs(1200, 60, { display: 'flex', alignItems: 'center', gap: 20, opacity: fadeIn(frame, s('Quem usa um leitor de tela'), 12) })}>
            <SpeakerIcon size={110} waves={frame >= tJump ? 1 + (Math.floor(frame / 8) % 2) : 2} />
            <div style={{ fontFamily: FONT, fontSize: 34, fontWeight: 600, color: C.night, lineHeight: 1.15 }}>leitor de tela<br /><span style={{ color: C.purple, fontWeight: 400, fontSize: 30 }}>lê a página em voz alta</span></div>
          </div>
          <div style={abs(1230, 250, { display: 'flex', flexDirection: 'column', gap: 34 })}>
            {[0, 1, 2].map((i) => <Balloon key={i} op={fadeIn(frame, tHear + 6 + i * 22, 10)}>“clique aqui”?</Balloon>)}
          </div>
          <div style={abs(1200, 600, { opacity: win(frame, tNo, tSkim, 12) })}>
            <Chip size={34} color={C.night} border={C.purpleSoft}>para onde leva cada um?</Chip>
          </div>
          <div style={abs(1200, 600, { opacity: win(frame, tSkim, tRule, 12) })}>
            <Chip size={34} color={C.night} border={C.purpleSoft}>quem passa o olho também se perde</Chip>
          </div>
          <Label x={70} y={720} w={1780} op={fadeIn(frame, tRule, 12)} dark size={44}>o texto do link diz para onde ele leva, mesmo lido sozinho</Label>
        </div>
      )}
      {Bp > 0 && (
        <div style={{ opacity: Bp }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1820} height={230} filename="index.html">
              <CodeTyping
                segments={[{ text: bad + '\n', start: tInstead, frames: 0 }, { text: good, start: tWrite + 10, frames: 50 }]}
                fontSize={ed.fs}
                highlights={[{ text: 'clique aqui', at: tInstead + 10, color: 'rgba(217,83,79,0.45)' }, { text: 'minhas receitas favoritas', at: tWords, color: 'rgba(255,210,138,0.4)' }]}
              />
            </EditorWindow>
          </div>
          <div style={abs(1760, spanAt(ed, 0, bad, '<p>').y - 30, { opacity: fadeIn(frame, tInstead + 16, 8) })}><Cross size={60} /></div>
          <div style={abs(1760, spanAt(ed, 1, good, '<p>').y - 30, { opacity: fadeIn(frame, Math.max(goodTyped, tWords), 8) })}><Check size={60} /></div>
          <div style={abs(360, 340)}>
            <BrowserMock width={1200} height={320} tabTitle="Sobre mim" url="index.html">
              <div style={{ fontFamily: FONT, color: '#1A1A1A', fontSize: 34, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: 0.85 }}>
                  <span>Para ver as minhas receitas, <span style={{ color: C.link, textDecoration: 'underline' }}>clique aqui</span>.</span>
                  <Cross size={44} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 34, opacity: frame >= goodTyped ? 1 : 0 }}>
                  <span>Veja as <span style={{ color: C.link, textDecoration: 'underline' }}>minhas receitas favoritas</span>.</span>
                  {frame >= Math.max(goodTyped, tWords) && <Check size={44} />}
                </div>
              </div>
            </BrowserMock>
          </div>
          <Label x={0} y={730} w={1920} op={fadeIn(frame, tWords + 10, 12)} dark size={46}>{frame >= tClear ? 'o texto diz para onde vai: claro para todo mundo' : 'o texto diz para onde vai'}</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
const PROJ_DOC = ['<!DOCTYPE html>', '<html lang="pt-BR">', '  <head>', '    <meta charset="UTF-8">', '    <title>Projetos</title>', '  </head>', '  <body>', '    <h1>Meus projetos</h1>', '  </body>', '</html>']
export { PROJ_DOC }

export const SegundaPagina = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSecond = s('ela vai criar uma segunda página')
  const tNew = s('eu crio um arquivo novo')
  const tStruct = s('Ele recebe a estrutura básica')
  const tTitle = s('com o title')
  const tH1 = s('e um h1')
  const tBack = s('Agora, de volta ao index')
  const tHref = s('com o href igual a projetos')
  const tNote = s('Repara: não tem')
  const tRel = s('Isso é um caminho relativo')
  const tMeans = s('Ele quer dizer')
  const tSame = s('Como os dois arquivos')
  const phaseP = frame >= tStruct && frame < tBack
  const phaseI1 = frame >= tBack
  const fs = 28
  const ed = { x: 500, y: 40, fs }
  const edH = phaseP ? 560 : 250
  const tg = treeGeom({ fontSize: 30 })
  const TREE = { x: 50, y: 40 }
  const newGlow = frame >= tNew ? 0.5 + 0.5 * Math.sin((frame - tNew) / 5) : 0
  const items = [
    { id: 'root', name: 'site-da-ana', folder: true, depth: 0, row: 0 },
    { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'root', hl: !phaseP && frame >= tBack ? 1 : frame < tStruct ? 1 : 0 },
    { id: 'proj', name: 'projetos.html', depth: 1, row: 2, parent: 'root', opacity: fadeIn(frame, tNew, 12), glow: frame < tStruct + 30 ? newGlow : 0, hl: phaseP ? 1 : frame >= tMeans ? rampF(frame, tMeans + 10, tMeans + 20) : 0 },
  ]
  const typeF = Math.max(50, tNote - tBack - 20)
  const segsI = phaseI1
    ? [
        { text: L.p3 + '\n', start: 0, frames: 0 },
        { text: L.proj, start: tBack + 10, frames: typeF },
      ]
    : staticSegs([L.p3])
  const numsI = phaseI1 ? lineNumbers(WITH_PROJ, ['p3', 'proj']) : lineNumbers(BEFORE_NAV, ['p3'])
  const sHref = spanAt(ed, 1, L.proj, 'href="projetos.html"')
  const sVal = spanAt(ed, 1, L.proj, 'projetos.html')
  const typed = tBack + 10 + typeF
  const click = tSame + 6
  const cur = cursorMotion(frame, { arrive: click - 8, click, from: [200, 150], travel: 26 })
  const slide = rampF(frame, click + 8, click + 30)
  const treeTarget = { x: TREE.x + tg.textEnd(1, 'projetos.html') + 8, y: TREE.y + tg.y(2) }
  return (
    <AbsoluteFill>
      <div style={abs(TREE.x, TREE.y)}>
        <FileTree items={items} fontSize={30} width={420} height={300} />
      </div>
      <div style={abs(ed.x, ed.y)}>
        <EditorWindow width={1370} height={edH} filename={phaseP ? 'projetos.html' : 'index.html'}>
          {phaseP ? (
            <CodeTyping
              segments={PROJ_DOC.map((t, i) => ({ text: t + (i < PROJ_DOC.length - 1 ? '\n' : ''), start: tStruct + i * 3, frames: 0 }))}
              fontSize={fs}
              cursor={false}
              highlights={[{ text: '<title>Projetos</title>', at: tTitle }, { text: '<h1>Meus projetos</h1>', at: tH1 }]}
            />
          ) : (
            <CodeTyping segments={segsI} fontSize={fs} numbers={numsI} highlights={[{ text: 'href="projetos.html"', at: tRel, color: 'rgba(255,210,138,0.4)' }]} lineHighlights={phaseI1 ? [{ line: 1, at: typed }] : []} />
          )}
        </EditorWindow>
      </div>
      {phaseI1 && (
        <>
          <Label x={sHref.x - 360} y={310} w={720} op={fadeIn(frame, tRel, 12)} dark>caminho relativo: a partir de onde eu estou</Label>
          <ArrowLine x1={sHref.x} y1={308} x2={sHref.x} y2={sHref.bottom + 6} p={fadeIn(frame, tRel, 12)} width={6} />
          <ArrowLine x1={sVal.x0 + 30} y1={sVal.bottom + 18} x2={treeTarget.x} y2={treeTarget.y} p={rampF(frame, tMeans, tMeans + 24)} bend={20} dashed width={6} color={C.purple} />
        </>
      )}
      <div style={abs(50, 390, { width: 420, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' })}>
        <div style={{ opacity: win(frame, tSecond, tStruct, 12) }}>
          <Chip size={30} color={C.night} border={C.purple}>uma segunda página, na mesma pasta</Chip>
        </div>
      </div>
      <div style={abs(50, 390, { width: 420, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' })}>
        <div style={{ opacity: fadeIn(frame, tNote, 12) }}>
          <Chip size={30} color={C.night} border={C.purpleSoft}>sem https, sem nome de site: só o arquivo</Chip>
        </div>
        <div style={{ opacity: fadeIn(frame, tSame, 12) }}>
          <Chip size={30} color={C.white} bg={C.purple} border={C.night}>mesma pasta: o nome basta</Chip>
        </div>
      </div>
      <div style={abs(500, 400, { opacity: phaseP ? 0 : 1 })}>
        <BrowserMock width={860} height={470} tabTitle="Sobre mim" url="index.html">
          <AnaPage3 parts={['h1', 'h2b', 'p3', ...(frame >= typed ? ['proj'] : []), 'sig']} base={22} cursor={{ key: 'proj', node: <Cursor {...cur} /> }} />
        </BrowserMock>
      </div>
      <SlideIn p={slide} dx={60} dy={30} style={{ left: 580, top: 440 }}>
        <BrowserMock width={860} height={430} tabTitle="Projetos" url="projetos.html" tabHighlight>
          <ProjetosPage back={false} base={24} />
        </BrowserMock>
      </SlideIn>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 6
export const CaminhoDeVolta = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tNo = s('Só que agora')
  const tRule = s('Todo caminho de ida')
  const tType = s('Então, no projetos')
  const tHref = s('com o href igual a index')
  const tText = s('e o texto')
  const tDone = s('Pronto')
  const tGo = s('Clica num link, vai')
  const tBackC = s('Clica no outro, volta')
  const tSite = s('Parece pouco')
  const tWeb = s('Todo site que você visita')
  const Main = 1 - rampF(frame, tWeb - 4, tWeb + 10)
  const Web = rampF(frame, tWeb, tWeb + 14)
  const fs = 30
  const ed = { x: 710, y: 40, fs }
  const segs = [
    { text: '  <body>\n    <h1>Meus projetos</h1>\n', start: 0, frames: 0 },
    { text: '    <p><a href="', start: tType + 6, frames: 16 },
    { text: 'index.html', start: tHref + 6, frames: 16 },
    { text: '">', start: tHref + 22, frames: 2 },
    { text: 'Voltar para a página inicial', start: tText + 6, frames: 36 },
    { text: '</a></p>', start: tText + 44, frames: 8 },
    { text: '\n  </body>', start: 0, frames: 0 },
  ]
  const typed = tText + 52
  const tg = treeGeom({ fontSize: 30, rowH: 100 })
  const TREE = { x: 50, y: 40 }
  const items = [
    { id: 'root', name: 'site-da-ana', folder: true, depth: 0, row: 0 },
    { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'root' },
    { id: 'proj', name: 'projetos.html', depth: 1, row: 2, parent: 'root', hl: frame < typed ? 1 : 0 },
  ]
  const ax = TREE.x + tg.textEnd(1, 'projetos.html') + 30
  const y1 = TREE.y + tg.y(1)
  const y2 = TREE.y + tg.y(2)
  const ida = rampF(frame, tDone, tDone + 20)
  const volta = rampF(frame, tDone + 16, tDone + 36)
  // cliques: Projetos (Voltar) -> Sobre mim; Sobre mim (meus projetos) -> Projetos
  const c1 = tGo + 8
  const c2 = tBackC + 8
  const cur1 = cursorMotion(frame, { arrive: c1 - 6, click: c1, from: [200, 120], travel: 24 })
  const cur2 = cursorMotion(frame, { arrive: c2 - 6, click: c2, from: [-160, 140], travel: 24 })
  const s1 = rampF(frame, c1 + 8, c1 + 28)
  const s2 = rampF(frame, c2 + 8, c2 + 28)
  const BW = { x: 710, y: 390, w: 900, h: 480 }
  const projWin = (cursor, keyed) => (
    <BrowserMock width={BW.w} height={BW.h} tabTitle="Projetos" url="projetos.html">
      <ProjetosPage base={26} back={frame >= typed} cursor={keyed ? { key: 'back', node: <Cursor {...cursor} /> } : undefined} />
    </BrowserMock>
  )
  const nodes = [
    { x: 760, y: 330, at: tWeb + 4, title: 'Sobre mim' },
    { x: 1160, y: 330, at: tWeb + 4, title: 'Projetos' },
    { x: 380, y: 170, at: tWeb + 16 },
    { x: 400, y: 560, at: tWeb + 20 },
    { x: 960, y: 110, at: tWeb + 24 },
    { x: 1540, y: 170, at: tWeb + 28 },
    { x: 1540, y: 560, at: tWeb + 32 },
    { x: 960, y: 610, at: tWeb + 36 },
    { x: 140, y: 380, at: tWeb + 40 },
    { x: 1780, y: 380, at: tWeb + 44 },
  ]
  const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [1, 6], [0, 7], [7, 6], [2, 8], [3, 8], [5, 9], [6, 9], [4, 2], [7, 3]].map(([a, b], i) => ({ a, b, at: tWeb + 10 + i * 5 }))
  return (
    <AbsoluteFill>
      {Main > 0 && (
        <div style={{ opacity: Main }}>
          <div style={abs(TREE.x, TREE.y)}>
            <FileTree items={items} fontSize={30} rowH={100} width={630} height={380} />
          </div>
          <ArrowLine x1={ax} y1={y1 - 10} x2={ax} y2={y2 + 4} p={ida} color={C.lavender} width={6} />
          <ArrowLine x1={ax + 100} y1={y2 + 10} x2={ax + 100} y2={y1 - 4} p={volta} color={C.purpleSoft} width={6} />
          <div style={abs(ax + 14, (y1 + y2) / 2 - 20, { opacity: ida, fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.lavender })}>ida</div>
          <div style={abs(ax + 114, (y1 + y2) / 2 - 20, { opacity: volta, fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.purpleSoft })}>volta</div>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1160} height={300} filename="projetos.html">
              <CodeTyping segments={segs} fontSize={fs} numbers={[7, 8, 9, 10]} lineHighlights={[{ line: 2, at: typed }]} highlights={[{ text: 'index.html', at: tHref + 22, until: tGo, color: 'rgba(255,210,138,0.4)' }]} />
            </EditorWindow>
          </div>
          <div style={abs(50, 450, { width: 630, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' })}>
            <div style={{ opacity: win(frame, tNo, tType, 12) }}>
              <Chip size={32} color={C.night} border={C.purpleSoft}>e agora, como volta?</Chip>
            </div>
          </div>
          <div style={abs(50, 450, { width: 630, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' })}>
            <div style={{ opacity: win(frame, tRule, tDone, 12) }}>
              <Chip size={32} color={C.white} bg={C.purple} border={C.night}>todo caminho de ida merece um caminho de volta</Chip>
            </div>
          </div>
          <div style={abs(50, 450, { width: 630, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' })}>
            <div style={{ opacity: fadeIn(frame, tDone, 12) }}>
              <Chip size={32} color={C.night} border={C.purple}>duas páginas, uma apontando para a outra</Chip>
            </div>
            <div style={{ opacity: fadeIn(frame, tSite, 12) }}>
              <Chip size={32} color={C.white} bg={C.purple} border={C.night}>isso já é um site de verdade</Chip>
            </div>
          </div>
          <div style={abs(BW.x, BW.y)}>{projWin(cur1, frame < c1 + 8)}</div>
          <SlideIn p={s1} dx={0} dy={40} style={{ left: BW.x, top: BW.y }}>
            <BrowserMock width={BW.w} height={BW.h} tabTitle="Sobre mim" url="index.html">
              <AnaPage3 parts={['h1', 'h2b', 'p3', 'proj', 'sig']} base={24} cursor={frame >= c1 + 20 ? { key: 'proj', node: <Cursor {...cur2} /> } : undefined} />
            </BrowserMock>
          </SlideIn>
          <SlideIn p={s2} dx={0} dy={40} style={{ left: BW.x, top: BW.y }}>{projWin(null, false)}</SlideIn>
        </div>
      )}
      {Web > 0 && (
        <div style={{ opacity: Web }}>
          <div style={abs(0, 40)}>
            <PageWeb nodes={nodes} edges={edges} width={1920} height={720} w={150} h={180} />
          </div>
          <Label x={0} y={800} w={1920} op={fadeIn(frame, tWeb + 30, 12)} dark size={46}>um site = páginas ligadas por links</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}
