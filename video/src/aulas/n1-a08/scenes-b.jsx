import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { SpeakerIcon } from '../../components/Icons.jsx'
import { Acronym, Label, MouseAt, Warn, YEL, abs, blinkOn, edAt, rampF, win, allOf, RED_HL, GOOD_HL, TWO_MAINS, ONE_MAIN } from './scenes-a.jsx'
import {
  TXT, REG, MENU, FOOT, AnaPage, BuildPage, Cabinet, CodeCard, PageDiagram, PagePreview, PostCard, ProjectCard, RegTag, Robot, Scissors, Tag, tint,
} from './ana.jsx'

const pop = (frame, fps, t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })

// ---------------------------------------------------------------- Bloco 6
const SEC_BEFORE = [
  '<li><a href="#quem-sou">Quem sou eu</a></li>',
  '...',
  '<main>',
  '  <section>',
  '    <h2 id="quem-sou">Quem sou eu</h2>',
  '    <p>Estou aprendendo a programar...</p>',
  '  </section>',
]
export const SectionScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tIn = s('Dentro da mêin, o conteúdo')
  const tTwo = s('Para isso existem duas tags')
  const tFirst = s('A primeira é a sécchon')
  const tGroups = s('Ela agrupa um assunto')
  const tTitle = s('e toda sécchon tem um')
  const tCreates = s('A Ana cria uma sécchon para quem sou eu')
  const tS2 = s('outra para o que estou aprendendo')
  const tS3 = s('e outra para fale comigo')
  const tId = s('o ái di que antes ficava')
  const tMove = s('pode ir para a própria sécchon')
  const tWorks = s('e o link do menu continua')
  const tArt = s('A segunda tag é a ártikol')
  const tArtMeans = s('que quer dizer artigo')
  const tAlone = s('Ela é para um conteúdo')
  const tOutside = s('mesmo fora da página')
  const tPost = s('um post de blog')
  const tNews = s('uma notícia')
  const tComment = s('um comentário')
  const tTest = s('O teste é simples')
  const tCut = s('se você pudesse recortar')
  const tPaste = s('e colar em outro site')
  const tStill = s('e ele ainda fizesse sentido')
  const A = win(frame, 0, tCreates, 14)
  const B = win(frame, tCreates - 4, tArt, 14)
  const Cc = rampF(frame, tArt - 4, tArt + 10)
  const ed = { x: 50, y: 40, fs: 27 }
  const moved = frame >= tMove + 16
  const secOpen = moved ? '\n  <section id="quem-sou">' : '\n  <section>'
  const h2 = moved ? '\n    <h2>Quem sou eu</h2>' : '\n    <h2 id="quem-sou">Quem sou eu</h2>'
  const segs = [
    { text: SEC_BEFORE.slice(0, 3).join('\n'), start: 0, frames: 0 },
    { text: secOpen, start: tCreates + 4, frames: moved ? 0 : 8 },
    { text: h2 + '\n    <p>Estou aprendendo a programar...</p>', start: 0, frames: 0 },
    { text: '\n  </section>', start: tCreates + 12, frames: 8 },
    { text: moved ? '\n  <section id="aprendendo">...</section>' : '\n  <section>...</section>', start: tS2 + 2, frames: moved ? 0 : 12 },
    { text: moved ? '\n  <section id="contato">...</section>' : '\n  <section>...</section>', start: tS3 + 2, frames: moved ? 0 : 12 },
    { text: '\n</main>', start: 0, frames: 0 },
  ]
  const secHl = tint(REG.section, 0.5)
  const full = segs.map((g) => g.text).join('')
  const hls = [
    ...allOf(full, '<section', tCreates + 20, secHl),
    ...allOf(full, '</section>', tCreates + 20, secHl),
    { text: 'id="quem-sou"', at: tId, color: YEL, occurrence: 0 },
    { text: 'href="#quem-sou"', at: tWorks, color: 'rgba(240,160,75,0.6)' },
  ]
  // id voando do h2 para a section
  const fly = rampF(frame, tMove, tMove + 16)
  const pFrom = edAt(ed, 4, 8)
  const pTo = edAt(ed, 3, 11)
  const flyOp = frame >= tMove && frame < tMove + 18 ? 1 : 0
  const pHref = edAt(ed, 0, 25)
  const pSec = edAt(ed, 3, 25)
  const secBoxes = [['Quem sou eu', tCreates], ['O que estou aprendendo', tS2], ['Fale comigo', tS3]]
  // article: recorta e cola
  const cut = rampF(frame, tCut, tCut + 40)
  const move = rampF(frame, tPaste, tPaste + 24)
  const P0 = { x: 1035, y: 332 }
  const P1 = { x: 1490, y: 495 }
  const sx = P0.x - 40 + 420 * cut
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(120, 40, { opacity: fadeIn(frame, tTwo, 12) })}><Chip size={30} color={C.night} border={REG.main}>dentro da <Tag color={C.purple}>main</Tag>: duas tags parecidas, usos diferentes</Chip></div>
          <div style={abs(120, 170)}>
            <Acronym word="section" keys={[0, 1, 2, 3, 4, 5, 6]} tag="section" meaning="seção" op={fadeIn(frame, tFirst - 6, 12)} defOp={fadeIn(frame, tFirst + 12, 12)} />
          </div>
          <div style={abs(120, 470, { display: 'flex', flexDirection: 'column', gap: 20 })}>
            <div style={{ opacity: fadeIn(frame, tGroups, 12) }}><Chip size={32} color={C.white} bg={REG.section} border={C.night}>um assunto da página</Chip></div>
            <div style={{ opacity: fadeIn(frame, tTitle, 12) }}><Chip size={32} color={C.night} border={REG.section}>sempre com título, normalmente um <Tag color={C.purple}>{'<h2>'}</Tag></Chip></div>
          </div>
          <div style={abs(1160, 60, { opacity: fadeIn(frame, tIn, 12) })}>
            <PageDiagram w={600} h={680} fs={24} hl={{ main: fadeIn(frame, tIn, 12) * (1 - fadeIn(frame, tFirst, 10)), s1: fadeIn(frame, tFirst, 10), s2: fadeIn(frame, tFirst, 10), s3: fadeIn(frame, tFirst, 10) }} dim={{ header: 1, nav: 1, footer: 1 }} />
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={960} height={540} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={hls} />
            </EditorWindow>
          </div>
          {flyOp > 0 && (
            <div style={abs(pFrom.x + (pTo.x - pFrom.x) * fly, pFrom.y - ed.fs * 0.75 + (pTo.y - pFrom.y) * fly - 30 * Math.sin(Math.PI * fly), { fontFamily: MONO, fontSize: ed.fs, background: '#FFD28A', color: C.night, borderRadius: 6, padding: '0 6px', boxShadow: '0 6px 14px rgba(0,0,0,0.3)' })}>id="quem-sou"</div>
          )}
          <ArrowLine x1={pHref.x + 230} y1={pHref.y} x2={pSec.x + 150} y2={pSec.y} p={rampF(frame, tWorks, tWorks + 20)} bend={-70} color="#F0A04B" width={6} />
          <div style={abs(50, 620, { opacity: win(frame, tId, tWorks, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">o <Tag color={C.purple}>id</Tag> sobe do <Tag color={C.purple}>{'<h2>'}</Tag> para a <Tag color={C.purple}>{'<section>'}</Tag></Chip></div>
          <div style={abs(50, 620, { opacity: fadeIn(frame, tWorks + 10, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
            <Check size={52} />
            <Chip size={30} color={C.night} border="#F0A04B">o link do menu continua funcionando</Chip>
          </div>
          <div style={abs(1080, 60, { fontFamily: FONT, fontSize: 32, color: C.purple, fontWeight: 700, opacity: fadeIn(frame, tCreates, 12) })}>as seções da Ana</div>
          {secBoxes.map(([t, at], i) => (
            <div key={t} style={abs(1080, 130 + i * 150, { opacity: fadeIn(frame, at, 10), transform: `translateX(${(1 - fadeIn(frame, at, 10)) * 30}px)`, width: 780, height: 120, border: `5px solid ${REG.section}`, borderRadius: 18, background: tint(REG.section, 0.12), boxSizing: 'border-box', padding: '16px 22px', fontFamily: FONT })}>
              <RegTag name={moved ? `section #${MENU[i].id}` : 'section'} color={REG.section} fs={22} />
              <div style={{ fontSize: 32, fontWeight: 700, color: C.night, marginTop: 8 }}>{t}</div>
            </div>
          ))}
        </div>
      )}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(120, 60)}>
            <Acronym word="article" keys={[0, 1, 2, 3, 4, 5, 6]} tag="article" meaning="artigo" op={fadeIn(frame, tArt, 12)} defOp={fadeIn(frame, tArtMeans, 12)} />
          </div>
          <div style={abs(120, 360, { opacity: fadeIn(frame, tAlone, 12) })}><Chip size={34} color={C.white} bg={REG.article} border={C.night}>faz sentido sozinho{frame >= tOutside ? ', mesmo fora da página' : ''}</Chip></div>
          <div style={abs(120, 470, { display: 'flex', gap: 16 })}>
            {[['post de blog', tPost], ['notícia', tNews], ['comentário', tComment]].map(([t, at]) => (
              <div key={t} style={{ opacity: fadeIn(frame, at, 10) }}><Chip size={30} color={C.night} border={REG.article}>{t}</Chip></div>
            ))}
          </div>
          <div style={abs(120, 580, { opacity: fadeIn(frame, tTest, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>o teste: recortar e colar em outro site</Chip></div>
          {/* página da Ana com o post */}
          <div style={abs(1000, 60, { opacity: fadeIn(frame, tArt + 10, 12) })}>
            <BrowserMock width={430} height={560} tabTitle="Sobre mim" url="index.html">
              <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>{TXT.h1}</div>
              {[100, 80, 92].map((p, i) => <div key={i} style={{ height: 10, width: `${p}%`, background: '#E4E1F7', borderRadius: 5, marginTop: 12 }} />)}
              <div style={{ marginTop: 22, marginLeft: -4, marginRight: -4, height: 190, borderRadius: 16, border: `3px dashed ${cut > 0 ? REG.article : 'transparent'}`, boxSizing: 'border-box' }} />
            </BrowserMock>
          </div>
          <div style={abs(1460, 300, { opacity: fadeIn(frame, tPaste - 10, 12) })}>
            <BrowserMock width={420} height={470} tabTitle="Blog" url="blog.example.com">
              <div style={{ height: 16, width: '60%', background: C.purpleSoft, borderRadius: 6 }} />
              <div style={{ height: 10, width: '90%', background: '#E4E1F7', borderRadius: 5, marginTop: 14 }} />
            </BrowserMock>
          </div>
          <div style={abs(P0.x + (P1.x - P0.x) * move, P0.y + (P1.y - P0.y) * move - 60 * Math.sin(Math.PI * move), { opacity: fadeIn(frame, tArt + 20, 12), transform: `rotate(${4 * Math.sin(Math.PI * move)}deg)` })}>
            <PostCard w={360} fs={22} />
          </div>
          {cut > 0 && cut < 1 && <div style={abs(sx, 272)}><Scissors size={110} open={0.5 + 0.5 * Math.sin(frame / 2)} /></div>}
          <div style={abs(1700, 230, { opacity: fadeIn(frame, tStill, 10), transform: `scale(${0.6 + 0.4 * pop(frame, fps, tStill)})` })}><Check size={90} /></div>
          <Label x={120} y={700} w={800} op={fadeIn(frame, tStill + 6, 12)} dark size={36}>recortou e ainda faz sentido</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
export const FooterScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tClose = s('Para fechar a página')
  const tMeans = s('que quer dizer rodapé')
  const tBottom = s('É a parte de baixo')
  const tWho = s('onde costuma ficar quem fez')
  const tAnaP = s('A Ana coloca na fúter')
  const tFeito = s('feito pela Ana,')
  const tQ = s('Agora, uma pergunta justa')
  const tDied = s('a dív morreu')
  const tNo = s('Não. A dív continua')
  const tCase = s('mas para um caso específico')
  const tGroup = s('quando você precisa de uma')
  const tLook = s('por causa da aparência')
  const tNoMeaning = s('e esse grupo não tem')
  const tCss = s('daqui a alguns níveis')
  const tCards = s('você vai querer colocar dois cartões')
  const tHolder = s('Aquela caixa que segura')
  const tJust = s('É só uma caixa')
  const tRight = s('Aí sim, a dív')
  const A = win(frame, 0, tQ, 14)
  const B = rampF(frame, tQ - 4, tQ + 10)
  const ed = { x: 50, y: 40, fs: 30 }
  const segs = [
    { text: '  <main>\n    ...\n  </main>', start: 0, frames: 0 },
    { text: '\n  <footer>', start: tAnaP + 2, frames: 8 },
    { text: `\n    <p>${FOOT}</p>`, start: tFeito, frames: 30 },
    { text: '\n  </footer>', start: tAnaP + 10, frames: 8 },
  ]
  const ftHl = tint(REG.footer, 0.6)
  const footOp = rampF(frame, tFeito + 30, tFeito + 36)
  const footF = fadeIn(frame, tFeito + 40, 12)
  const accOp = win(frame, tClose, tAnaP, 12)
  const edOp = fadeIn(frame, tAnaP - 6, 12)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          {accOp > 0 && (
            <div style={{ opacity: accOp }}>
              <div style={abs(120, 80)}>
                <Acronym word="footer" keys={[0, 1, 2, 3, 4, 5]} tag="footer" meaning="rodapé" op={fadeIn(frame, tClose, 12)} defOp={fadeIn(frame, tMeans, 12)} />
              </div>
              <div style={abs(120, 400, { display: 'flex', flexDirection: 'column', gap: 20 })}>
                <div style={{ opacity: fadeIn(frame, tBottom, 12) }}><Chip size={34} color={C.night} bg={tint(REG.footer, 0.35)} border={REG.footer}>a parte de baixo da página</Chip></div>
                <div style={{ opacity: fadeIn(frame, tWho, 12) }}><Chip size={30} color={C.night} border={REG.footer}>quem fez, o ano, contato, redes</Chip></div>
              </div>
            </div>
          )}
          {edOp > 0 && (
            <div style={{ opacity: edOp }}>
              <div style={abs(ed.x, ed.y)}>
                <EditorWindow width={900} height={380} filename="index.html">
                  <CodeTyping segments={segs} fontSize={ed.fs} numbers={[38, 39, 40, 41, 42, 43]} highlights={[{ text: '<footer>', at: tFeito + 40, color: ftHl }, { text: '</footer>', at: tFeito + 40, color: ftHl }]} />
                </EditorWindow>
              </div>
              <div style={abs(50, 470, { opacity: fadeIn(frame, tAnaP + 8, 12) })}><Chip size={32} color={C.night} border={REG.footer}>logo abaixo da <Tag color={C.purple}>{'</main>'}</Tag></Chip></div>
              <div style={abs(50, 570, { opacity: footF })}><Chip size={32} color={C.white} bg={REG.footer} border={C.night}>o rodapé ganhou a moldura: <Tag>footer</Tag></Chip></div>
            </div>
          )}
          <div style={abs(990, 40, { opacity: fadeIn(frame, tClose + 6, 12) })}>
            <PagePreview w={880} h={640} p={1}>
              <AnaPage fs={22} show={{ footer: footOp }} fr={{ footer: footF }} fill={{ footer: footF }} />
            </PagePreview>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(120, 50, { opacity: fadeIn(frame, tQ, 12) })}><Chip size={34} color={C.night} border={C.purpleSoft}>tantas tags com significado... a <Tag color={C.purple}>div</Tag> morreu?</Chip></div>
          <div style={abs(120, 150, { opacity: fadeIn(frame, tNo, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tNo)})`, transformOrigin: 'left center' })}><Chip size={40} color={C.white} bg={C.purple} border={C.night}>Não! Ela continua útil.</Chip></div>
          <div style={abs(120, 270, { opacity: fadeIn(frame, tCase, 12), width: 800, background: C.white, border: `4px dashed ${REG.div}`, borderRadius: 22, padding: '18px 26px', boxSizing: 'border-box', fontFamily: FONT, boxShadow: '0 14px 30px rgba(38,33,92,0.14)' })}>
            <div style={{ fontSize: 40, fontWeight: 700, color: C.night }}><Tag color={C.purple}>{'<div>'}</Tag></div>
            <div style={{ fontSize: 30, color: C.night, marginTop: 6, opacity: fadeIn(frame, tGroup, 12) }}>caixa sem significado, só para agrupar</div>
          </div>
          <div style={abs(120, 460, { display: 'flex', flexDirection: 'column', gap: 18 })}>
            <div style={{ opacity: fadeIn(frame, tLook, 12) }}><Chip size={30} color={C.night} border={REG.div}>por causa da aparência</Chip></div>
            <div style={{ opacity: fadeIn(frame, tNoMeaning, 12) }}><Chip size={30} color={C.night} border={REG.div}>o grupo não tem significado próprio</Chip></div>
          </div>
          {/* dois cartões lado a lado, numa div */}
          <div style={abs(1020, 160, { opacity: fadeIn(frame, tCss, 12) })}>
            <div style={{ position: 'relative', width: 800, height: 400, border: `5px dashed ${REG.div}`, borderRadius: 24, background: 'rgba(255,255,255,0.5)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
              <div style={abs(22, -24)}><RegTag name="div" color={REG.div} fs={30} /></div>
              {['Site de receitas', 'Página pessoal'].map((t, i) => (
                <div key={t} style={{ opacity: fadeIn(frame, tCards + i * 8, 10), transform: `translateY(${(1 - fadeIn(frame, tCards + i * 8, 10)) * 20}px)` }}><ProjectCard w={300} title={t} color={i ? REG.section : C.purpleSoft} /></div>
              ))}
            </div>
            <div style={{ marginTop: 26, display: 'flex', gap: 14, alignItems: 'center', opacity: fadeIn(frame, tHolder, 12) }}>
              {['header', 'nav', 'section'].map((n) => (
                <span key={n} style={{ position: 'relative' }}>
                  <RegTag name={n} color={REG[n]} fs={30} style={{ opacity: 0.85 }} />
                  <span style={{ position: 'absolute', left: -4, right: -4, top: '50%', height: 3, background: C.red, opacity: 0.85 }} />
                </span>
              ))}
              <span style={{ fontFamily: FONT, fontSize: 30, color: C.night, fontWeight: 600, marginLeft: 8 }}>{frame >= tJust ? 'é só uma caixa' : 'não é...'}</span>
            </div>
          </div>
          <div style={abs(120, 700, { opacity: fadeIn(frame, tRight, 12), display: 'flex', alignItems: 'center', gap: 20 })}>
            <Check size={70} />
            <Chip size={36} color={C.white} bg={C.purple} border={C.night}>só uma caixa para o visual (CSS, próximos níveis)</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
const CardTitle = ({ n, children, dark }) => (
  <div style={abs(100, 40, { display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT })}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: C.purple, color: C.white, fontSize: 40, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: dark ? `3px solid ${C.lavender}` : 'none' }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 700, color: dark ? C.lavender : C.night }}>{children}</div>
  </div>
)
export const PorQue = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tThink = s('Você pode estar pensando')
  const tSame = s('se a página fica igualzinha')
  const tWhy = s('por que tanto trabalho')
  const tThree = s('Por três motivos')
  const tFirst = s('O primeiro:')
  const tRef = s('Cada uma dessas tags vira')
  const tShort = s('Com um atalho')
  const tJump = s('a pessoa pula direto para o menu')
  const tMain = s('ou direto para o conteúdo principal')
  const tNoHear = s('sem ter que ouvir')
  const tIndex = s('É como ter um índice')
  const tSecond = s('O segundo: os buscadores')
  const tProg = s('Os programas que leem')
  const tBetter = s('entendem melhor')
  const tOnly = s('o que é só menu ou rodapé')
  const tThird = s('E o terceiro motivo')
  const tSix = s('Daqui a seis meses')
  const tOpen = s('abrir um código e ver')
  const tCab = s('é como abrir um armário')
  const tFind = s('Você acha tudo na hora')
  const k0 = win(frame, 0, tFirst, 12)
  const k1 = win(frame, tFirst - 4, tSecond, 12)
  const k2 = win(frame, tSecond - 4, tThird, 12)
  const k3 = rampF(frame, tThird - 4, tThird + 10)
  // menu de pontos de referência
  const marks = [['banner', 'header'], ['navegação', 'nav'], ['principal', 'main'], ['rodapé', 'footer']]
  const sel = frame >= tMain ? 2 : frame >= tJump ? 1 : -1
  const selKey = sel >= 0 ? marks[sel][1] : null
  const hl1 = selKey ? { [selKey]: 1 } : {}
  return (
    <AbsoluteFill>
      {k0 > 0 && (
        <div style={{ opacity: k0 }}>
          <div style={abs(260, 120, { opacity: fadeIn(frame, tThink, 12) })}><PageDiagram w={480} h={540} m={0} fs={22} /></div>
          <div style={abs(910, 330, { fontFamily: FONT, fontSize: 120, fontWeight: 800, color: C.purple, opacity: fadeIn(frame, tSame, 10) })}>=</div>
          <div style={abs(1180, 120, { opacity: fadeIn(frame, tThink + 10, 12) })}><PageDiagram w={480} h={540} m={1} fs={22} /></div>
          <div style={abs(0, 40, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tSame, 12) })}><Chip size={32} color={C.night} border={C.purpleSoft}>na tela: igualzinho</Chip></div>
          <Label x={0} y={700} w={1920} op={fadeIn(frame, tWhy, 12) * (1 - fadeIn(frame, tThree, 8))} size={38} border={C.purple}>por que tanto trabalho?</Label>
          <div style={abs(0, 700, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, opacity: fadeIn(frame, tThree, 12) })}>
            <Chip size={38} color={C.white} bg={C.purple} border={C.night}>três motivos</Chip>
            {[1, 2, 3].map((n, i) => (
              <div key={n} style={{ width: 64, height: 64, borderRadius: 32, background: C.purpleSoft, color: C.white, fontFamily: FONT, fontSize: 36, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: fadeIn(frame, tThree + 6 + i * 6, 8) }}>{n}</div>
            ))}
          </div>
        </div>
      )}
      {k1 > 0 && (
        <AbsoluteFill style={{ opacity: k1 }}>
          <AbsoluteFill style={{ background: C.nightDeep, opacity: 0.96 }} />
          <CardTitle n={1} dark>quem usa leitor de tela</CardTitle>
          <div style={abs(130, 180)}><SpeakerIcon size={130} color={C.lavender} /></div>
          <div style={abs(300, 190, { opacity: fadeIn(frame, tRef, 12) })}><Chip size={30} color={C.night} bg={C.lavender} border={C.purpleSoft}>cada tag vira um ponto de referência</Chip></div>
          <div style={abs(130, 340, { opacity: fadeIn(frame, tFirst + 20, 12), width: 560, background: '#2E2870', border: `3px solid ${C.purpleSoft}`, borderRadius: 18, padding: '16px 0', fontFamily: FONT })}>
            <div style={{ fontSize: 24, color: C.purpleSoft, fontWeight: 700, padding: '0 24px 10px' }}>pontos de referência</div>
            {marks.map(([t], i) => (
              <div key={t} style={{ fontSize: 36, color: i === sel ? C.night : C.lavender, background: i === sel ? '#FFD28A' : 'transparent', padding: '8px 24px', fontWeight: i === sel ? 700 : 500 }}>{t}</div>
            ))}
          </div>
          <div style={abs(1150, 150, { opacity: fadeIn(frame, tFirst + 20, 12) })}>
            <PageDiagram w={560} h={620} fs={24} hl={hl1} dim={selKey ? Object.fromEntries(['header', 'nav', 'main', 'footer'].filter((x) => x !== selKey).map((x) => [x, 0.6])) : {}} />
          </div>
          {sel >= 0 && <ArrowLine x1={700} y1={sel === 1 ? 470 : 530} x2={1140} y2={sel === 1 ? 300 : 500} p={rampF(frame, sel === 1 ? tJump : tMain, (sel === 1 ? tJump : tMain) + 14)} color="#FFD28A" />}
          <Label x={130} y={730} w={900} op={fadeIn(frame, tNoHear, 12) * (1 - fadeIn(frame, tIndex, 8))} size={34} border={C.purpleSoft}>pular direto para o que importa</Label>
          <Label x={130} y={730} w={900} op={fadeIn(frame, tIndex, 12)} dark size={34}>como um índice da página</Label>
        </AbsoluteFill>
      )}
      {k2 > 0 && (
        <AbsoluteFill style={{ opacity: k2 }}>
          <CardTitle n={2}>os buscadores</CardTitle>
          <div style={abs(200, 260, { opacity: fadeIn(frame, tProg, 12), transform: `translateY(${-8 * Math.sin(frame / 10)}px)` })}><Robot size={300} /></div>
          <div style={abs(120, 620, { opacity: fadeIn(frame, tProg + 10, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>programas que leem a internet</Chip></div>
          <ArrowLine x1={520} y1={400} x2={1130} y2={420} p={rampF(frame, tBetter - 10, tBetter + 10)} color={C.purpleSoft} dashed />
          <div style={abs(1150, 150)}>
            <PageDiagram w={560} h={620} fs={24} sections={false} colors={{ main: C.green, nav: REG.div, footer: REG.div, header: REG.div }} hl={{ main: fadeIn(frame, tBetter, 12) }} dim={{ nav: fadeIn(frame, tOnly, 12), footer: fadeIn(frame, tOnly, 12), header: fadeIn(frame, tOnly, 12) }} />
          </div>
          <Label x={120} y={720} w={900} op={fadeIn(frame, tBetter + 10, 12)} dark size={34}>o buscador entende o que é conteúdo</Label>
        </AbsoluteFill>
      )}
      {k3 > 0 && (
        <AbsoluteFill style={{ opacity: k3 }}>
          <CardTitle n={3}>você e quem trabalha com você</CardTitle>
          <div style={abs(1200, 60, { opacity: fadeIn(frame, tSix, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>daqui a 6 meses, ou numa equipe</Chip></div>
          <div style={abs(380, 170, { opacity: fadeIn(frame, tOpen, 12) })}><Cabinet w={380} labels={['', '', '', '']} /></div>
          <Label x={330} y={540} w={480} op={fadeIn(frame, tOpen + 10, 12)} size={32} border={REG.div}>sopa de div</Label>
          <div style={abs(1140, 170, { opacity: fadeIn(frame, tCab, 12) })}><Cabinet w={380} labels={['header', 'nav', 'main', 'footer']} /></div>
          <div style={abs(1540, 380, { opacity: fadeIn(frame, tCab + 12, 10), transform: `scale(${0.6 + 0.4 * pop(frame, fps, tCab + 12)})` })}><Check size={90} /></div>
          <Label x={1090} y={540} w={480} op={fadeIn(frame, tFind, 12)} dark size={32}>você acha tudo na hora</Label>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
const BODY = [
  '<body>',
  '  <header>',
  `    <h1>${TXT.h1}</h1>`,
  '    <img src="imagens/foto-ana.jpg"',
  '         alt="Ana sorrindo, com um caderno de anotações na mão"',
  '         width="200" height="200">',
  '    <nav>',
  '      <ul>',
  ...MENU.map((m) => `        <li><a href="#${m.id}">${m.t}</a></li>`),
  '      </ul>',
  '    </nav>',
  '  </header>',
  '  <main>',
  '    <section id="quem-sou">',
  '      <h2>Quem sou eu</h2>',
  '      ...',
  '    </section>',
  '    <section id="aprendendo">',
  '      <h2>O que estou aprendendo</h2>',
  '      ...',
  '    </section>',
  '    <section id="contato">',
  '      <h2>Fale comigo</h2>',
  '      <form>...</form>',
  '    </section>',
  '  </main>',
  '  <footer>',
  `    <p>${FOOT}</p>`,
  '  </footer>',
  '</body>',
]
const BANDS = [
  { l0: 1, l1: 13, color: REG.header, key: 'h' },
  { l0: 14, l1: 27, color: REG.main, key: 'm' },
  { l0: 28, l1: 30, color: REG.footer, key: 'f' },
]
export const PaginaAna = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tNow = s('Agora, vamos ver')
  const tBody = s('Logo depois do body')
  const tFoto = s('a foto e a név')
  const tCloseH = s('Fecha a rédêr')
  const tMain = s('Depois, abre a mêin')
  const tS1 = s('uma sécchon para quem sou eu')
  const tS2 = s('uma para o que estou aprendendo')
  const tS3 = s('e uma para fale comigo')
  const tEach = s('Cada sécchon com o seu')
  const tFoot = s('Por fim, a fúter')
  const tIndent = s('Repara na indentação')
  const tTest = s('Agora, faz o teste')
  const tAlmost = s('Está quase igual')
  const tChange = s('A mudança não é na aparência')
  const tClick = s('Clica nos links do menu')
  const fs = 22
  const lh = fs * 1.5
  const ed = { x: 40, y: 30, fs }
  const scroll = interpolate(frame, [tMain - 10, tS3, tFoot - 10, tFoot + 10], [0, 8, 8, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const bandOp = { h: fadeIn(frame, tBody, 12), m: fadeIn(frame, tMain, 12), f: fadeIn(frame, tFoot, 12) }
  const indentOn = fadeIn(frame, tIndent + 6, 10)
  const gut = fs * 1.8
  const cw = fs * 0.55
  // prévia
  const fr = {
    header: bandOp.h, nav: fadeIn(frame, tFoto, 12), main: bandOp.m,
    s1: fadeIn(frame, tS1, 10), s2: fadeIn(frame, tS2, 10), s3: fadeIn(frame, tS3, 10), footer: bandOp.f,
  }
  const click = tClick + 20
  const pPrev = interpolate(frame, [tMain - 10, tS3 + 10, tFoot, tFoot + 14, tTest, tTest + 14, click + 6, click + 26], [0, 0.6, 0.6, 1, 1, 0, 0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const flash = frame >= click + 26 ? 0.5 + 0.5 * Math.sin((frame - click - 26) / 3) : 0
  const flashOp = frame >= click + 26 && frame < click + 70 ? flash : 0
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tNow, 12) })}>
        <EditorWindow width={980} height={830} filename="index.html">
          <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'relative', transform: `translateY(${-scroll * lh}px)` }}>
              {BANDS.map((b) => (
                <div key={b.key} style={{ position: 'absolute', left: gut - 6, right: 0, top: b.l0 * lh, height: (b.l1 - b.l0 + 1) * lh, background: tint(b.color, 0.22), borderLeft: `6px solid ${b.color}`, opacity: bandOp[b.key] }} />
              ))}
              {indentOn > 0 && BODY.map((ln, i) => {
                const n = ln.length - ln.trimStart().length
                if (!n) return null
                return <div key={i} style={{ position: 'absolute', left: gut, top: i * lh + 3, width: n * cw - 2, height: lh - 6, background: '#E8B860', opacity: 0.5 * indentOn, borderRadius: 4 }} />
              })}
              <div style={{ position: 'relative' }}>
                <CodeTyping segments={[{ text: BODY.join('\n'), start: 0, frames: 0 }]} fontSize={fs} cursor={false} />
              </div>
            </div>
          </div>
        </EditorWindow>
      </div>
      <Label x={40} y={780} w={980} op={win(frame, tIndent + 6, tTest, 12)} dark size={32}>cada região um nível para dentro</Label>
      <div style={abs(1060, 30, { opacity: fadeIn(frame, tNow + 6, 12) })}>
        <PagePreview w={820} h={740} p={pPrev}>
          <AnaPage fs={18} fr={fr} flash={flashOp} linkHl={frame >= click && frame < click + 20 ? 2 : -1} />
        </PagePreview>
        {/* cursor clica em "Fale comigo" */}
        <div style={abs(28 + 28 + 60, 122 + 28 + 230)}>
          <MouseAt frame={frame} x={0} y={0} arrive={click} click={click} leave={click + 24} from={[300, -100]} />
        </div>
      </div>
      <div style={abs(1060, 790, { opacity: win(frame, tEach, tAlmost, 12) })}><Chip size={28} color={C.night} border={REG.section}>cada <Tag color={C.purple}>section</Tag> com seu <Tag color={C.purple}>h2</Tag> e seu <Tag color={C.purple}>id</Tag></Chip></div>
      <div style={abs(1060, 790, { opacity: win(frame, tAlmost, tClick, 12) })}><Chip size={28} color={C.night} border={C.purple}>{frame >= tChange ? 'muda o significado, não a aparência' : 'quase igual a antes'}</Chip></div>
      <div style={abs(1060, 790, { opacity: fadeIn(frame, tClick, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
        <Check size={48} />
        <Chip size={28} color={C.white} bg={C.purple} border={C.night}>cada link leva para a sua seção</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
const ErrTitle = ({ n, children }) => (
  <div style={abs(120, 40, { display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT })}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: C.purple, color: C.white, fontSize: 40, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 700, color: C.night }}>{children}</div>
  </div>
)
export const Erros = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tStart = s('Antes de terminar')
  const tE1 = s('O primeiro: colocar')
  const tOnly1 = s('É só uma')
  const tE2 = s('O segundo: usar név')
  const tMenu = s('A név é para a navegação')
  const tSolto = s('Um link solto')
  const tE3 = s('O terceiro: sécchon')
  const tNoH2 = s('Se você não consegue')
  const tE4 = s('E o quarto: trocar')
  const tIdea = s('A ideia não é sumir')
  const tChoose = s('é escolher a tag')
  const tRecap = s('Recapitulando')
  const k0 = win(frame, 0, tE1, 10)
  const k1 = win(frame, tE1 - 4, tE2, 12)
  const k2 = win(frame, tE2, tE3, 12)
  const k3 = win(frame, tE3, tE4, 12)
  const k4 = win(frame, tE4, tRecap, 12)
  const R = rampF(frame, tRecap - 4, tRecap + 10)
  const fs = 34
  const P = (t) => <Tag color={C.purple}>{t}</Tag>
  const items = [
    { t: <>{P('header')}: o topo</>, at: s('rédêr é o topo') },
    { t: <>{P('nav')}: o menu</>, at: s('név é o menu') },
    { t: <>{P('main')}: o principal, só um</>, at: s('mêin é o conteúdo principal') },
    { t: <>{P('section')}: um assunto com título</>, at: s('sécchon é um assunto') },
    { t: <>{P('article')}: faz sentido sozinho</>, at: s('ártikol é um conteúdo') },
    { t: <>{P('footer')}: o rodapé</>, at: s('fúter é o rodapé') },
    { t: <>{P('div')}: caixa sem significado</>, at: s('e a dív é a caixa') },
  ]
  const tBtn = s('Os exercícios estão')
  const tNext = s('Na próxima aula')
  const tBye = s('Até lá')
  const end = rampF(frame, tNext, tNext + 18)
  const pulse = frame >= tBtn ? 1 + 0.05 * Math.sin((frame - tBtn) / 5) : 1
  const next = fadeIn(frame, tNext + 20, 14)
  const slogan = fadeIn(frame, tBye + 24, 14)
  return (
    <AbsoluteFill>
      {k0 > 0 && (
        <div style={abs(0, 300, { width: 1920, textAlign: 'center', opacity: k0 * fadeIn(frame, tStart, 10), fontFamily: FONT, fontSize: 70, fontWeight: 700, color: C.night })}>Os erros mais comuns</div>
      )}
      {k1 > 0 && (
        <div style={{ opacity: k1 }}>
          <ErrTitle n={1}>mais de um <Tag>main</Tag></ErrTitle>
          <div style={abs(200, 170)}><PageDiagram w={420} h={500} regions={TWO_MAINS} fs={22} /></div>
          <div style={abs(640, 360, { opacity: fadeIn(frame, tE1 + 16, 10) })}><Cross size={90} /></div>
          <div style={abs(1100, 170, { opacity: fadeIn(frame, tOnly1, 12) })}><PageDiagram w={420} h={500} regions={ONE_MAIN} fs={22} /></div>
          <div style={abs(1540, 360, { opacity: fadeIn(frame, tOnly1 + 6, 10) })}><Check size={90} /></div>
          <Label x={200} y={700} w={420} op={fadeIn(frame, tE1 + 20, 12)} size={32} border={C.red}>mais de um main</Label>
          <Label x={1100} y={700} w={420} op={fadeIn(frame, tOnly1 + 6, 12)} dark size={32}>é só uma</Label>
        </div>
      )}
      {k2 > 0 && (
        <div style={{ opacity: k2 }}>
          <ErrTitle n={2}><Tag>nav</Tag> em qualquer grupinho de links</ErrTitle>
          <CodeCard x={120} y={180} fs={fs} text={'<footer>\n  <nav>\n    <a href="#contato">Contato</a>\n  </nav>\n</footer>'} highlights={[{ text: '<nav>', at: tE2 + 20, color: RED_HL }, { text: '</nav>', at: tE2 + 20, color: RED_HL }]} mark={frame >= tE2 + 20 ? <Cross size={66} /> : null} />
          <div style={abs(120, 520, { opacity: fadeIn(frame, tMenu, 12) })}><Chip size={30} color={C.night} border={C.red}><Tag color={C.purple}>nav</Tag> é para o menu principal</Chip></div>
          <CodeCard x={1000} y={180} fs={fs} text={'<footer>\n  <a href="#contato">Contato</a>\n</footer>'} op={fadeIn(frame, tSolto, 12)} highlights={[{ text: '<a href="#contato">Contato</a>', at: tSolto, color: GOOD_HL }]} mark={<Check size={66} />} />
          <div style={abs(1000, 420, { opacity: fadeIn(frame, tSolto + 10, 12) })}><Chip size={30} color={C.night} border={C.green}>link solto: sem <Tag color={C.purple}>nav</Tag></Chip></div>
        </div>
      )}
      {k3 > 0 && (
        <div style={{ opacity: k3 }}>
          <ErrTitle n={3}><Tag>section</Tag> sem título</ErrTitle>
          <CodeCard x={120} y={180} fs={fs} text={'<section>\n  <p>...</p>\n</section>'} highlights={[{ text: '<section>', at: tE3 + 20, color: RED_HL }]} mark={frame >= tE3 + 20 ? <Cross size={66} /> : null} />
          <div style={abs(120, 420, { opacity: fadeIn(frame, tE3 + 24, 12) })}><Chip size={30} color={C.night} border={C.red}>sem <Tag color={C.purple}>h2</Tag>: talvez não seja uma seção</Chip></div>
          <CodeCard x={1000} y={180} fs={fs} text={'<section>\n  <h2>...</h2>\n  <p>...</p>\n</section>'} op={fadeIn(frame, tNoH2, 12)} highlights={[{ text: '<h2>...</h2>', at: tNoH2, color: GOOD_HL }]} mark={<Check size={66} />} />
        </div>
      )}
      {k4 > 0 && (
        <div style={{ opacity: k4 }}>
          <ErrTitle n={4}>trocar no automático</ErrTitle>
          <CodeCard x={120} y={180} fs={fs} text={'<section>\n  <p>Projeto 1</p>\n  <p>Projeto 2</p>\n</section>'} title="caixa de layout, sem título" highlights={[{ text: '<section>', at: tE4 + 20, color: RED_HL }, { text: '</section>', at: tE4 + 20, color: RED_HL }]} mark={frame >= tE4 + 20 ? <Cross size={66} /> : null} />
          <div style={abs(120, 480, { opacity: fadeIn(frame, tE4 + 24, 12) })}><Chip size={30} color={C.night} border={C.red}>toda <Tag color={C.purple}>div</Tag> virou tag semântica? não</Chip></div>
          <CodeCard x={1000} y={180} fs={fs} text={'<div>\n  <p>Projeto 1</p>\n  <p>Projeto 2</p>\n</div>'} op={fadeIn(frame, tIdea, 12)} highlights={[{ text: '<div>', at: tIdea, color: GOOD_HL }, { text: '</div>', at: tIdea, color: GOOD_HL }]} mark={<Check size={66} />} />
          <Label x={1000} y={480} w={700} op={fadeIn(frame, tChoose, 12)} dark size={32}>escolha a tag pelo significado</Label>
        </div>
      )}
      {R > 0 && (
        <AbsoluteFill style={{ opacity: R }}>
          <div style={abs(0, 24, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 64, fontWeight: 700, color: C.night })}>Resumo da aula</div>
          <div style={abs(520, 130, { display: 'flex', flexDirection: 'column', gap: 10 })}>
            {items.map((it, i) => {
              const p = fadeIn(frame, it.at, 12)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
                  <Check size={50} />
                  <div style={{ fontFamily: FONT, fontSize: 40, color: C.night, fontWeight: 500 }}>{it.t}</div>
                </div>
              )
            })}
          </div>
          <div style={abs(0, 720, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tBtn, 14) })}>
            <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 50, fontWeight: 600, padding: '16px 60px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tBtn) / 5)}px ${C.purpleSoft}` }}>
              Fazer os exercícios
            </div>
          </div>
        </AbsoluteFill>
      )}
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background dark />
          <div style={abs(0, 60, { width: 1920, display: 'flex', justifyContent: 'center', opacity: next, transform: `translateY(${(1 - next) * 20}px)` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: '#ffffff10', border: `3px solid ${C.purpleSoft}`, borderRadius: 28, padding: '22px 46px' }}>
              <BuildPage w={150} h={180} p={rampF(frame, tNext + 24, tNext + 80)} />
              <div style={{ fontFamily: FONT, color: C.lavender }}>
                <div style={{ fontSize: 32, color: C.purpleSoft, fontWeight: 600 }}>Próxima aula</div>
                <div style={{ fontSize: 54, fontWeight: 700 }}>Aula 9 — Projeto final: seu primeiro site pessoal</div>
              </div>
            </div>
          </div>
          <div style={abs(0, 420, { width: 1920, display: 'flex', justifyContent: 'center' })}>
            {frame >= tBye - 4 && <LogoReveal start={tBye - 4} height={220} unlockAt={18} bodyColor={C.purpleSoft} wordColor={C.lavender} />}
          </div>
          <div style={abs(0, 720, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 56, color: C.lavender, opacity: slogan, transform: `translateY(${(1 - slogan) * 16}px)` })}>
            Destrava sua carreira. Um nível de cada vez.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}
