import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { Background } from '../../components/Background.jsx'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { FileTree, FileIcon } from '../../components/FileTree.jsx'
import { Clipboard, LessonTag } from '../n1-a09/ana.jsx'
import { MouseAt } from '../n1-a08/scenes-a.jsx'
import { Code, CodeChip, EditorTabs, PageCss, Preview, Swatch } from './css.jsx'
import { HEX, Label, RED_HL, Warn, YEL, abs, edAt, mix, pop, rampF, typeSpeed, win } from './scenes-a.jsx'

// O estilo.css da Ana (as três regras da aula).
export const CSS3 = 'h1 {\n  color: navy;\n}\n\nbody {\n  background-color: lightyellow;\n}\n\np {\n  font-size: 18px;\n}'
const STYLE_BLOCK = ['    <style>', '      h1 {', '        color: navy;', '      }', '', '      body {', '        background-color: lightyellow;', '      }', '', '      p {', '        font-size: 18px;', '      }', '    </style>']
const HEAD_TOP = ['<!DOCTYPE html>', '<html lang="pt-BR">', '  <head>', '    <meta charset="UTF-8">', '    <title>Ana Souza, página pessoal</title>']
const HEAD_END = ['  </head>', '  <body>', '    <header>', '      <h1>Olá, eu sou a Ana</h1>']
const LINK = '    <link rel="stylesheet" href="estilo.css">'
const LINK_PROJ = '    <link rel="stylesheet" href="../estilo.css">'
const PROJ_HEAD = ['<!DOCTYPE html>', '<html lang="pt-BR">', '  <head>', '    <meta charset="UTF-8">', '    <title>Meus projetos</title>']
const PROJ_END = ['  </head>', '  <body>', '    <h1>Meus projetos</h1>']
const st = (lines) => [{ text: lines.join('\n'), start: 0, frames: 0 }]
// Linha digitada em partes: [[texto, início], ...]
const typedLine = (prefix, parts, suffix) => {
  const segs = [{ text: prefix, start: 0, frames: 0 }]
  for (const [t, at] of parts) segs.push({ text: t, start: at, frames: typeSpeed(t.trim().length) })
  segs.push({ text: suffix, start: 0, frames: 0 })
  return segs
}

// ---------------------------------------------------------------- Bloco 6
export const Arquivo = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tProb = s('mas tem um problema')
  const tProj = s('Lembra que a Ana também')
  const tStays = s('a página de projetos continua sem cor')
  const tCopy = s('E copiar o mesmo')
  const tSol = s('A solução é um arquivo')
  const tFile = s('estilo ponto cê ésse ésse, na pasta')
  const tMove = s('As regras saem da tag stáil')
  const tNoTag = s('sem a tag')
  const tHeadL = s('No head, no lugar da stáil')
  const tLinkT = s('entra a tag línk')
  const tRel = s('O rél, igual a stáil xíti')
  const tHref = s('E o agá réf')
  const tNoClose = s('A línk não tem fechamento')
  const tTwo = s('Agora é só colocar')
  const tPath = s('com o caminho certo')
  const tSame = s('e as duas ficam com o mesmo visual')
  const A = 1 - rampF(frame, tSol - 6, tSol + 6)
  const B = rampF(frame, tSol - 6, tSol + 6) * (1 - rampF(frame, tSame - 16, tSame - 4))
  const Cc = rampF(frame, tSame - 16, tSame - 4)
  const ED = { x: 500, y: 30, fs: 26 }
  const EW = 1380
  const EH = 840
  // fases do editor: 'index' (com style) -> 'css' -> 'link' -> 'proj'
  const tab = frame < tMove + 44 ? 'index' : frame < tHeadL ? 'css' : frame < tTwo ? 'link' : 'proj'
  const fly = rampF(frame, tMove + 12, tMove + 44)
  const fe = 1 - Math.pow(1 - fly, 3)
  const tabs = [
    { name: 'index.html', active: tab === 'index' || tab === 'link' },
    { name: 'estilo.css', active: tab === 'css', op: fadeIn(frame, tFile, 10), glow: win(frame, tFile, tFile + 40, 8) + win(frame, tMove + 30, tMove + 56, 6) },
    { name: 'projetos.html', active: tab === 'proj', op: fadeIn(frame, tTwo, 10) },
  ]
  const tree = [
    { id: 'site', name: 'meu-site', folder: true, depth: 0, row: 0 },
    { id: 'index', name: 'index.html', depth: 1, row: 1, parent: 'site', hl: tab === 'index' || tab === 'link' ? 1 : 0 },
    { id: 'css', name: 'estilo.css', depth: 1, row: 2, parent: 'site', opacity: fadeIn(frame, tFile, 10), glow: win(frame, tFile, tFile + 50, 10), hl: tab === 'css' ? 1 : 0 },
    { id: 'img', name: 'imagens', folder: true, depth: 1, row: 3, parent: 'site' },
    { id: 'pag', name: 'paginas', folder: true, depth: 1, row: 4, parent: 'site' },
    { id: 'proj', name: 'projetos.html', depth: 2, row: 5, parent: 'pag', hl: tab === 'proj' ? 1 : 0 },
  ]
  // index.html com o style: as linhas do CSS somem enquanto voam para o estilo.css
  const styleOp = 1 - rampF(frame, tMove + 30, tMove + 44)
  const linkStart = 5
  const linkX = (col) => edAt(ED, linkStart, col).x
  const linkY = edAt(ED, linkStart, 0).y
  const linkSegs = typedLine(HEAD_TOP.join('\n') + '\n', [['    <link ', tLinkT + 4], ['rel="stylesheet" ', tRel + 4], ['href="estilo.css"', tHref + 4], ['>', tNoClose]], '\n' + HEAD_END.slice(0, 2).join('\n'))
  const projSegs = typedLine(PROJ_HEAD.join('\n') + '\n', [['    <link rel="stylesheet" ', tTwo + 14], ['href="../estilo.css">', tTwo + 30]], '\n' + PROJ_END.join('\n'))
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(80, 60, { opacity: fadeIn(frame, 0, 10) })}>
            <Preview w={860} h={660}><PageCss id="b6-a-index" css={CSS3} zoom={1.15} /></Preview>
          </div>
          <div style={abs(980, 60, { opacity: fadeIn(frame, tProj, 12), transform: `translateX(${(1 - fadeIn(frame, tProj, 12)) * 40}px)` })}>
            <Preview w={860} h={660} url="paginas/projetos.html" title="Meus projetos"><PageCss id="b6-a-proj" css="" variant="projetos" zoom={1.15} /></Preview>
          </div>
          <div style={abs(80, 740, { width: 860, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tProb, 10) })}><Chip size={30} color={C.night} border={C.purple}><span style={{ fontFamily: MONO }}>{'<style>'}</span> só no index.html</Chip></div>
          <div style={abs(980, 740, { width: 860, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, opacity: fadeIn(frame, tStays, 10) * (1 - fadeIn(frame, tCopy, 8)) })}>
            <Warn size={50} /><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">projetos.html continua sem cor</Chip>
          </div>
          <div style={abs(980, 740, { width: 860, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, opacity: fadeIn(frame, tCopy, 10) })}>
            <Cross size={50} /><Chip size={30} color={C.night} border={C.red}>copiar o CSS em cada página: trabalho e confusão</Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(40, 30)}><FileTree items={tree} fontSize={30} width={430} height={400} title="arquivos" /></div>
          <div style={abs(40, 450, { width: 430, display: 'flex', justifyContent: 'center', opacity: win(frame, tFile, tMove, 10) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">um arquivo só para o estilo</Chip></div>
          <div style={abs(ED.x, ED.y)}>
            <EditorTabs tabs={tabs} width={EW} height={EH}>
              {tab === 'index' && (
                <Code fontSize={ED.fs} text={[...HEAD_TOP, ...STYLE_BLOCK, ...HEAD_END].join('\n')} cursor={false}
                  dim={STYLE_BLOCK.map((_, i) => ({ line: 5 + i, op: styleOp }))}
                  lineHighlights={STYLE_BLOCK.slice(1, -1).map((_, i) => ({ line: 6 + i, at: tMove, until: tMove + 44 }))} />
              )}
              {tab === 'css' && <Code fontSize={ED.fs} text={CSS3} lang="css" cursor={false} />}
              {tab === 'link' && (
                <Code fontSize={ED.fs} segments={linkSegs} highlights={[{ text: 'rel="stylesheet"', at: tRel + 24, color: YEL }, { text: 'href="estilo.css"', at: tHref + 30, color: 'rgba(143,211,232,0.45)' }, { text: '>', at: tNoClose + 8, color: 'rgba(240,160,75,0.6)', index: (HEAD_TOP.join('\n') + '\n' + LINK).length - 1 }]} />
              )}
              {tab === 'proj' && <Code fontSize={ED.fs} segments={projSegs} highlights={[{ text: '../', at: tPath - 6, color: YEL }]} />}
            </EditorTabs>
          </div>
          {/* as regras voando para a aba estilo.css */}
          {fly > 0 && fly < 1 && (
            <div style={abs(interpolate(fe, [0, 1], [ED.x + 120, ED.x + 330]), interpolate(fe, [0, 1], [edAt(ED, 6, 0).y - 30, 40]), { transform: `scale(${1 - 0.75 * fe})`, transformOrigin: 'left top', opacity: 1 - 0.4 * fe })}>
              <CodeChip text={CSS3} fs={24} />
            </div>
          )}
          <div style={abs(ED.x + 560, 220, { opacity: win(frame, tNoTag, tHeadL, 10) })}>
            <Chip size={32} color={C.night} bg="#FFF4D6" border="#E8B860">no estilo.css: só as regras, sem a tag <span style={{ fontFamily: MONO }}>{'<style>'}</span></Chip>
          </div>
          {/* rótulos da tag link */}
          {tab === 'link' && (
            <>
              <div style={abs(linkX(10), linkY + 150, { opacity: fadeIn(frame, tRel + 24, 10) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">é uma folha de estilo</Chip></div>
              <ArrowLine x1={linkX(18)} y1={linkY + 150} x2={linkX(18)} y2={linkY + 22} p={rampF(frame, tRel + 26, tRel + 38)} color="#E8B860" width={5} />
              <div style={abs(linkX(28), linkY + 270, { opacity: fadeIn(frame, tHref + 30, 10) })}><Chip size={28} color={C.night} border="#4BA6C8">onde está o arquivo</Chip></div>
              <ArrowLine x1={linkX(36)} y1={linkY + 270} x2={linkX(36)} y2={linkY + 22} p={rampF(frame, tHref + 32, tHref + 44)} color="#4BA6C8" width={5} />
              <div style={abs(linkX(47), linkY - 26, { opacity: fadeIn(frame, tNoClose + 8, 10) })}><Chip size={28} color={C.night} border="#F0A04B">sem fechamento</Chip></div>
              <div style={abs(linkX(4), linkY + 400, { opacity: fadeIn(frame, tLinkT + 10, 10) * (1 - fadeIn(frame, tRel, 8)) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>no lugar do <span style={{ fontFamily: MONO }}>{'<style>'}</span>: a tag <span style={{ fontFamily: MONO }}>{'<link>'}</span></Chip></div>
            </>
          )}
          {tab === 'proj' && (
            <div style={abs(ED.x + 720, edAt(ED, 5, 0).y + 60, { opacity: fadeIn(frame, tPath, 10), display: 'flex', alignItems: 'center', gap: 12 })}>
              <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860"><span style={{ fontFamily: MONO }}>../</span> sobe uma pasta</Chip>
              <LessonTag n="3 do nível 1" size={26} style={{ transformOrigin: 'left center' }} />
            </div>
          )}
        </div>
      )}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(80, 60)}><Preview w={860} h={660}><PageCss id="b6-c-index" css={CSS3} zoom={1.15} /></Preview></div>
          <div style={abs(980, 60)}><Preview w={860} h={660} url="paginas/projetos.html" title="Meus projetos"><PageCss id="b6-c-proj" css={CSS3} variant="projetos" zoom={1.15} /></Preview></div>
          <div style={abs(0, 750, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 })}>
            <div style={{ transform: `scale(${pop(frame, fps, tSame)})` }}><Check size={58} /></div>
            <Chip size={36} color={C.white} bg={C.purple} border={C.night}>um arquivo, todas as páginas</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
const HTML_TAB = ['<h1>Olá, eu sou a Ana</h1>', '<nav>', '  <ul>', '    <li><a href="#sobre">Sobre mim</a></li>', '    <li><a href="#projetos">Meus projetos</a></li>', '    <li><a href="#rotina">Minha rotina</a></li>', '    <li><a href="#contato">Fale comigo</a></li>', '  </ul>', '</nav>', '<h2>Sobre mim</h2>', '<p>Trabalho no atendimento de uma loja e', '  estou fazendo a minha transição para a', '  tecnologia. Estou aprendendo', '  <strong>HTML</strong>.</p>']
const INLINE = '<p style="color: red;">Texto vermelho</p>'
export const EditorDestrava = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTabs = s('o editor tem uma aba HTML')
  const tCssTab = s('A aba cê ésse ésse faz o papel')
  const tPrev = s('o que você escreve ali já vale')
  const tEx = s('Então, nos exercícios')
  const tThird = s('Existe ainda uma terceira forma')
  const tAttr = s('o atributo stáil, direto na tag')
  const tEg = s('Por exemplo, um pê')
  const tWorks = s('Funciona, mas só para aquele')
  const tMix = s('e mistura a estrutura')
  const tHard = s('Fica difícil de achar')
  const tNo = s('Neste curso, a gente não usa')
  const tRank = s('Arquivo separado sempre')
  const tQuick = s('e a tag stáil para testes')
  const A = 1 - rampF(frame, tThird - 6, tThird + 6)
  const B = rampF(frame, tThird - 6, tThird + 6) * (1 - rampF(frame, tNo - 6, tNo + 6))
  const R = rampF(frame, tNo - 6, tNo + 6)
  const click = tCssTab + 6
  const cssTab = frame >= click
  const ED = { x: 40, y: 170, fs: 24 }
  const tabCss = { x: 296, y: 210 }
  const rows = [
    { n: 1, t: <>arquivo separado (<span style={{ fontFamily: MONO }}>{'<link>'}</span>)</>, icon: 'ok', at: tRank },
    { n: 2, t: <>tag <span style={{ fontFamily: MONO }}>{'<style>'}</span> (testes rápidos)</>, icon: 'ok', at: tQuick },
    { n: 3, t: <>atributo <span style={{ fontFamily: MONO }}>style</span> (evite)</>, icon: 'warn', at: tNo + 6 },
  ]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(40, 50, { opacity: fadeIn(frame, 0, 10) })}><Chip size={34} color={C.night} border={C.purple}>exercícios da Destrava</Chip></div>
          <div style={abs(ED.x, ED.y, { opacity: fadeIn(frame, 0, 12) })}>
            <EditorTabs mono={false} width={1080} height={600} tabs={[{ name: 'HTML', active: !cssTab, glow: win(frame, tTabs, tTabs + 40, 8) }, { name: 'CSS', active: cssTab, glow: win(frame, tTabs + 20, tTabs + 60, 8) + win(frame, click, click + 30, 6) }]}>
              {!cssTab ? <Code fontSize={ED.fs} text={HTML_TAB.join('\n')} cursor={false} /> : <Code fontSize={ED.fs + 6} text={CSS3} lang="css" cursor={false} />}
            </EditorTabs>
            <div style={abs(tabCss.x - ED.x, tabCss.y - ED.y)}><MouseAt frame={frame} x={0} y={0} arrive={click - 2} click={click} leave={click + 30} from={[260, 220]} /></div>
          </div>
          {/* aba CSS = estilo.css */}
          <div style={abs(560, 40, { opacity: fadeIn(frame, tCssTab + 20, 10), display: 'flex', alignItems: 'center', gap: 14 })}>
            <FileIcon size={64} />
            <span style={{ fontFamily: MONO, fontSize: 36, fontWeight: 700, color: C.night }}>estilo.css</span>
            <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">a aba CSS = o seu estilo.css</Chip>
          </div>
          <ArrowLine x1={tabCss.x + 30} y1={tabCss.y - 26} x2={550} y2={76} p={rampF(frame, tCssTab + 20, tCssTab + 36)} bend={-40} width={6} />
          <div style={abs(1160, ED.y, { opacity: fadeIn(frame, 0, 12) })}>
            <Preview w={720} h={600}><PageCss id="b7-pv" css={cssTab ? CSS3 : ''} zoom={1.05} /></Preview>
          </div>
          <div style={abs(1160, 100, { width: 720, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tPrev, 10) })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>vale na hora para a prévia</Chip></div>
          <Label x={40} y={ED.y + 625} w={1080} op={fadeIn(frame, tEx, 10)} dark size={30}>nos exercícios: as regras vão na aba CSS</Label>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 60, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tThird, 10) })}>3ª forma: o atributo <span style={{ fontFamily: MONO, color: C.purple }}>style</span></div>
          <div style={abs(100, 240, { opacity: fadeIn(frame, tEg - 10, 12) })}>
            <CodeChip text={INLINE} lang="html" fs={44} highlights={[{ text: 'style="color: red;"', at: tEg + 20, color: YEL }]} />
          </div>
          <div style={abs(100, 260, { opacity: fadeIn(frame, tAttr, 10) * (1 - fadeIn(frame, tEg - 10, 8)) })}><Chip size={34} color={C.night} border={C.purple}>direto na tag</Chip></div>
          <div style={abs(100, 400, { opacity: fadeIn(frame, tWorks, 10) })}><Chip size={32} color={C.night} bg="#FFF4D6" border="#E8B860">atributo style: só aquele elemento</Chip></div>
          <div style={abs(100, 520, { opacity: fadeIn(frame, tMix, 10), display: 'flex', alignItems: 'center', gap: 12 })}><Warn size={50} /><Chip size={32} color={C.night} border={C.purpleSoft}>mistura estrutura e aparência no mesmo lugar</Chip></div>
          <div style={abs(100, 640, { opacity: fadeIn(frame, tHard, 10), display: 'flex', alignItems: 'center', gap: 12 })}><Warn size={50} /><Chip size={32} color={C.night} border={C.purpleSoft}>difícil de achar e de mudar depois</Chip></div>
          <div style={abs(1180, 400, { opacity: fadeIn(frame, tEg + 20, 12) })}>
            <Preview w={680} h={420}><PageCss id="b7-inline" variant="inline" zoom={1.3} /></Preview>
          </div>
        </div>
      )}
      {R > 0 && (
        <div style={{ opacity: R }}>
          <div style={abs(0, 80, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 54, fontWeight: 800, color: C.night })}>Onde colocar o CSS</div>
          <div style={abs(380, 240, { display: 'flex', flexDirection: 'column', gap: 34 })}>
            {rows.map((r) => {
              const o = pop(frame, fps, r.at)
              return (
                <div key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 28, opacity: clamp01(o * 2), transform: `translateX(${(1 - clamp01(o)) * -40}px)` }}>
                  <div style={{ width: 90, height: 90, borderRadius: 22, background: r.n < 3 ? C.purple : '#D8D5F6', border: `4px solid ${C.night}`, color: r.n < 3 ? C.white : C.night, fontFamily: FONT, fontSize: 48, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.n}</div>
                  <div style={{ width: 860, background: C.white, border: `4px solid ${r.n < 3 ? C.purple : '#E8B860'}`, borderRadius: 20, padding: '18px 28px', fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.night, boxSizing: 'border-box' }}>{r.t}</div>
                  {r.icon === 'ok' ? <Check size={76} /> : <Warn size={76} />}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
const ERR = [
  { title: 'esqueceu o ponto e vírgula', bad: 'p {\n  color: navy\n  font-size: 18px;\n}', badNote: 'sem ponto e vírgula, as duas falham', good: 'p {\n  color: navy;\n  font-size: 18px;\n}', goodNote: 'cada declaração com o seu ;', lang: 'css' },
  { title: 'propriedade errada (ou em português)', bad: 'h1 {\n  cor: azul;\n}', badNote: 'cor e azul não existem no CSS', good: 'h1 {\n  color: blue;\n}', goodNote: 'propriedade e valor em inglês', lang: 'css' },
  { title: 'esqueceu de fechar as chaves', bad: 'h1 {\n  color: navy;\n\np {\n  font-size: 18px;\n}', badDim: [3, 4, 5], badNote: 'abriu, fechou', good: 'h1 {\n  color: navy;\n}\n\np {\n  font-size: 18px;\n}', goodNote: 'toda chave aberta é fechada', lang: 'css' },
  { title: 'a tag link sem rel ou com o caminho errado', bad: '<link href="estilo.css">\n<link rel="stylesheet" href="estilos.css">', badNote: 'sem rel / nome do arquivo errado', good: '<link rel="stylesheet" href="estilo.css">', goodNote: 'rel e caminho certos', lang: 'html', badCss: '', goodCss: 'h1 {\n  color: navy;\n}\np {\n  font-size: 18px;\n}' },
]
const pvCss = (e, which) => (e.lang === 'html' ? (which === 'bad' ? e.badCss : e.goodCss) : which === 'bad' ? e.bad : e.good)
export const Erros = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tIntro = s('Agora, os erros')
  const tSilent = s('quando o cê ésse ésse tem um erro')
  const tIgnore = s('Ele só ignora')
  const tE = [s('O primeiro erro'), s('O segundo: escrever'), s('O terceiro: esquecer'), s('O quarto é na línk')]
  const tGlue = s('A declaração seguinte gruda')
  const tPt = s('Cor, dois pontos, azul')
  const tEn = s('É cálor, e o valor')
  const tLost = s('e a regra seguinte se perde')
  const tRel = s('esquecer o rél')
  const tName = s('ou errar o nome do arquivo')
  const tCheck = s('Se nada mudou na página')
  const top = rampF(frame, tE[0] - 10, tE[0] + 6)
  const cur = tE.filter((t) => frame >= t - 6).length - 1
  const listOn = rampF(frame, tCheck - 6, tCheck + 8)
  const goodAt = [tGlue + 50, tEn, tLost + 20, tName + 40]
  const noteAt = [tGlue + 20, tPt + 20, tLost, tRel + 10]
  const bannerY = interpolate(top, [0, 1], [330, 30])
  const bannerS = interpolate(top, [0, 1], [1.25, 0.8])
  return (
    <AbsoluteFill>
      <div style={abs(0, 120, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 60, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tIntro, 10) * (1 - top) })}>Os erros mais comuns</div>
      <div style={abs(0, bannerY, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tSilent, 10) * (1 - listOn), transform: `scale(${bannerS})` })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, background: '#FFF4D6', border: '4px solid #E8B860', borderRadius: 22, padding: '14px 30px', fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.night }}>
          <Warn size={60} />CSS com erro não dá mensagem: {frame >= tIgnore ? 'o navegador só ignora' : '...'}
        </div>
      </div>
      {cur >= 0 && listOn < 1 && (() => {
        const e = ERR[cur]
        const t0 = tE[cur]
        const op = fadeIn(frame, t0 - 4, 10) * (1 - listOn)
        const fs = cur === 2 ? 26 : 32
        const goodOp = fadeIn(frame, goodAt[cur], 10)
        const badHls = []
        if (cur === 0) badHls.push({ text: 'color: navy', at: tGlue, color: RED_HL }, { text: 'font-size: 18px;', at: tGlue + 12, color: RED_HL })
        if (cur === 1) badHls.push({ text: 'cor: azul;', at: tPt + 10, color: RED_HL })
        if (cur === 3) {
          badHls.push({ text: '<link href', at: tRel, color: RED_HL })
          badHls.push({ text: 's', at: tName + 10, color: RED_HL, index: e.bad.indexOf('estilos') + 6 })
        }
        const goodHls = cur === 0 ? [{ text: ';', at: goodAt[0] + 10, color: 'rgba(151,196,89,0.6)', index: e.good.indexOf('navy;') + 4 }] : cur === 2 ? [{ text: '}', at: goodAt[2] + 10, color: 'rgba(151,196,89,0.6)', index: e.good.indexOf('}') }] : cur === 3 ? [{ text: 'rel="stylesheet"', at: goodAt[3] + 10, color: 'rgba(151,196,89,0.5)' }] : []
        return (
          <div key={cur} style={{ opacity: op }}>
            <div style={abs(100, 140, { display: 'flex', alignItems: 'center', gap: 20 })}>
              <div style={{ width: 70, height: 70, borderRadius: 18, background: C.purple, border: `4px solid ${C.night}`, color: C.white, fontFamily: FONT, fontSize: 42, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cur + 1}</div>
              <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 800, color: C.night }}>{e.title}</div>
            </div>
            {/* errado */}
            <div style={abs(100, 240, { display: 'flex', alignItems: 'flex-start', gap: 24, opacity: fadeIn(frame, t0 + 14, 10) })}>
              <CodeChip text={e.bad} lang={e.lang} fs={fs} highlights={badHls} style={{ minWidth: 520 }}>
                {e.badDim && <div style={abs(0, 14 + 3 * fs * 1.5, { width: '100%', height: 3 * fs * 1.5 + 10, background: 'rgba(27,23,68,0.6)', borderRadius: '0 0 18px 18px' })} />}
              </CodeChip>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 6 }}>
                <Cross size={60} />
              </div>
            </div>
            <div style={abs(100, 240 + (e.bad.split('\n').length) * fs * 1.5 + 44, { opacity: fadeIn(frame, noteAt[cur], 10) })}><Chip size={28} color={C.night} border={C.red}>{e.badNote}</Chip></div>
            {/* certo */}
            <div style={abs(100, 590, { display: 'flex', alignItems: 'flex-start', gap: 24, opacity: goodOp })}>
              <CodeChip text={e.good} lang={e.lang} fs={fs} highlights={goodHls} style={{ minWidth: 520 }} />
              <div style={{ marginTop: 6, transform: `scale(${pop(frame, fps, goodAt[cur] + 6)})` }}><Check size={60} /></div>
              <div style={{ marginTop: 10 }}><Chip size={28} color={C.night} border={C.green}>{e.goodNote}</Chip></div>
            </div>
            {/* prévias: o navegador aplica o CSS de verdade (o errado é ignorado) */}
            <div style={abs(1300, 230, { opacity: fadeIn(frame, t0 + 10, 10) })}>
              <Preview w={560} h={300} title="Ana Souza"><PageCss id={`b8-bad-${cur}`} css={pvCss(e, 'bad')} variant="mini" zoom={1.25} /></Preview>
              <div style={abs(560 - 30, -14)}><Cross size={48} /></div>
            </div>
            <div style={abs(1300, 570, { opacity: goodOp })}>
              <Preview w={560} h={300} title="Ana Souza"><PageCss id={`b8-good-${cur}`} css={pvCss(e, 'good')} variant="mini" zoom={1.25} /></Preview>
              <div style={abs(560 - 30, -14)}><Check size={48} /></div>
            </div>
          </div>
        )
      })()}
      {listOn > 0 && (
        <div style={abs(560, 190, { opacity: listOn, transform: `scale(${0.85 + 0.15 * listOn})`, transformOrigin: 'center top' })}>
          <Clipboard w={800} fs={40} title="Nada mudou? Confira:" items={['ponto e vírgula', 'nome em inglês', 'chaves fechadas', 'link com rel e caminho certo']} done={[0, 1, 2, 3].map((i) => pop(frame, fps, tCheck + 16 + i * 10))} />
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const Experimente = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tPlay = s('brinque um pouco')
  const tLearn = s('O cê ésse ésse se aprende')
  const tSwap = s('Troque o nêivi')
  const tG = s('grín, que é verde')
  const tPu = s('pârpou, que é roxo')
  const tTo = s('ou tomêitou')
  const tSize = s('Mude o tamanho')
  const t20 = s('para vinte')
  const t14 = s('ou para quatorze')
  const tBg = s('Pinte o fundo')
  const tRead = s('repare se o texto continua')
  const tBack = s('é só voltar o valor')
  const tNothing = s('Nada quebra a estrutura')
  const tSameH = s('O HTML continua o mesmo')
  const tColors = s('Na aula de cores')
  const colorSteps = [[0, 'navy'], [tG, 'green'], [tPu, 'purple'], [tTo, 'tomato']]
  const sizeSteps = [[0, 18], [t20 + 6, 20], [t14 + 6, 14]]
  const bgSteps = [[0, 'lightyellow'], [tBg + 16, 'black'], [tBack + 14, 'lightyellow']]
  const stepAt = (steps) => { let k = 0; steps.forEach((st, i) => { if (frame >= st[0]) k = i }); return k }
  const ci = stepAt(colorSteps)
  const si = stepAt(sizeSteps)
  const bi = stepAt(bgSteps)
  const tr = (steps, i) => rampF(frame, steps[i][0], steps[i][0] + 10)
  const hColor = ci === 0 ? HEX.navy : mix(HEX[colorSteps[ci - 1][1]], HEX[colorSteps[ci][1]], tr(colorSteps, ci))
  const pSize = si === 0 ? 18 : sizeSteps[si - 1][1] + (sizeSteps[si][1] - sizeSteps[si - 1][1]) * tr(sizeSteps, si)
  const bgColor = bi === 0 ? HEX.lightyellow : mix(HEX[bgSteps[bi - 1][1]], HEX[bgSteps[bi][1]], tr(bgSteps, bi))
  const pvCss = `h1 {\n  color: ${hColor};\n}\nbody {\n  background-color: ${bgColor};\n}\np {\n  font-size: ${pSize.toFixed(2)}px;\n}`
  const shown = `h1 {\n  color: ${colorSteps[ci][1]};\n}\n\nbody {\n  background-color: ${bgSteps[bi][1]};\n}\n\np {\n  font-size: ${sizeSteps[si][1]}px;\n}`
  const flash = (steps, i, text) => (i > 0 && frame < steps[i][0] + 30 ? [{ text, at: steps[i][0], color: YEL }] : [])
  const hls = [...flash(colorSteps, ci, colorSteps[ci][1] + ';'), ...flash(sizeSteps, si, sizeSteps[si][1] + 'px;'), ...flash(bgSteps, bi, bgSteps[bi][1] + ';')]
  const swatches = [['green', 'verde', tG], ['purple', 'roxo', tPu], ['tomato', 'vermelho alaranjado', tTo]]
  const dark = frame >= tBg + 16 && frame < tBack + 14
  return (
    <AbsoluteFill>
      <div style={abs(40, 30, { opacity: fadeIn(frame, 0, 10) })}>
        <EditorTabs tabs={[{ name: 'estilo.css', active: true }]} width={820} height={620}>
          <Code fontSize={30} text={shown} lang="css" cursor={false} highlights={hls} />
        </EditorTabs>
      </div>
      <div style={abs(900, 30)}>
        <Preview w={980} h={640}><PageCss id="b9-pv" css={pvCss} zoom={1.3} /></Preview>
        {dark && frame >= tRead && (
          <div style={abs(560, 360, { display: 'flex', alignItems: 'center', gap: 12, transform: `scale(${pop(frame, fps, tRead)})` })}><Warn size={64} /><Chip size={34} color={C.night} bg="#FFF4D6" border="#E8B860">dá para ler?</Chip></div>
        )}
        {frame >= tBack + 14 && frame < tNothing + 20 && <div style={abs(860, 520, { transform: `scale(${pop(frame, fps, tBack + 16)})` })}><Check size={80} /></div>}
      </div>
      <div style={abs(40, 70 + 620 - 40, { opacity: win(frame, tPlay, tSwap, 10) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>{frame >= tLearn ? 'CSS se aprende mexendo' : 'brinque um pouco'}</Chip></div>
      <div style={abs(40, 680, { display: 'flex', flexWrap: 'wrap', gap: 14, width: 840, opacity: win(frame, tSwap, tSize + 20, 10) })}>
        {swatches.map(([c, pt, at]) => <Swatch key={c} color={HEX[c]} name={<><span style={{ fontFamily: MONO }}>{c}</span> = {pt}</>} fs={28} op={fadeIn(frame, at, 8)} />)}
      </div>
      <div style={abs(40, 680, { display: 'flex', gap: 14, opacity: win(frame, tSize, tBg, 10) })}>
        {[['18px', 0], ['20px', t20], ['14px', t14]].map(([t, at], i) => (
          <div key={t} style={{ opacity: i === 0 ? 1 : fadeIn(frame, at, 8) }}><Chip size={32} color={C.night} border={i === si ? C.purple : C.purpleSoft} bg={i === si ? '#FFF4D6' : C.white}><span style={{ fontFamily: MONO }}>{t}</span></Chip></div>
        ))}
      </div>
      <div style={abs(40, 680, { opacity: win(frame, tBg, tNothing, 10) })}><Chip size={30} color={C.night} border={C.purpleSoft}>ficou estranho? é só voltar o valor</Chip></div>
      <Label x={900} y={700} w={980} op={fadeIn(frame, tNothing, 10) * (1 - fadeIn(frame, tSameH, 8))} dark size={36}>mexeu, viu, voltou: nada quebra</Label>
      <Label x={900} y={700} w={980} op={fadeIn(frame, tSameH, 10)} size={32} border={C.purple}>mesmo HTML, quantos visuais quiser</Label>
      <div style={abs(40, 680, { opacity: fadeIn(frame, tColors, 10) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">aula de cores: combinações bonitas e legíveis</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
export const Final = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tRecap = s('Vamos recapitular')
  const tI = [s('O HTML é a estrutura'), s('Toda regra tem um seletor'), s('Você conheceu três'), s('O cê ésse ésse pode ficar na tag stáil'), s('ou, melhor ainda')]
  const tEx = s('Agora é a sua vez')
  const tQ = s('E fica uma pergunta')
  const tOne = s('e se a Ana quiser pintar')
  const tSel = s('Para isso existem os seletores')
  const tBye = s('Até lá')
  const A = 1 - rampF(frame, tQ - 6, tQ + 6)
  const B = rampF(frame, tQ - 6, tQ + 6) * (1 - rampF(frame, tBye - 6, tBye + 6))
  const E = rampF(frame, tBye - 6, tBye + 6)
  const M = ({ children }) => <span style={{ fontFamily: MONO, color: C.purple }}>{children}</span>
  const items = [
    <>HTML = estrutura, CSS = aparência</>,
    <>regra: <M>{'seletor { propriedade: valor; }'}</M></>,
    <><M>color</M>, <M>background-color</M>, <M>font-size</M></>,
    <><M>{'<style>'}</M> no head</>,
    <><M>{'<link rel="stylesheet" href="estilo.css">'}</M>: o melhor jeito</>,
  ]
  const pulse = frame >= tEx ? 1 + 0.05 * Math.sin((frame - tEx) / 5) : 1
  const flashOp = frame >= tOne ? 0.55 + 0.45 * Math.sin((frame - tOne) / 4) : 0
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(120, 50, { fontFamily: FONT, fontSize: 56, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tRecap, 10) })}>Resumo da aula</div>
          <div style={abs(120, 160, { display: 'flex', flexDirection: 'column', gap: 26 })}>
            {items.map((t, i) => {
              const o = fadeIn(frame, tI[i], 10)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: o, transform: `translateX(${(1 - o) * 40}px)` }}>
                  <div style={{ transform: `scale(${pop(frame, fps, tI[i] + 4)})` }}><Check size={60} /></div>
                  <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.night }}>{t}</div>
                </div>
              )
            })}
          </div>
          <div style={abs(0, 740, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tEx, 12) })}>
            <div style={{ transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 46, fontWeight: 600, padding: '14px 50px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tEx) / 5)}px ${C.purpleSoft}` }}>Fazer os exercícios</div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(80, 60)}>
            <Preview w={900} h={700}><PageCss id="b10-tres" variant="tres" css={CSS3} zoom={1.7} flashP={1} flashOp={flashOp} /></Preview>
            <div style={abs(800, 290, { opacity: fadeIn(frame, tOne, 8), transform: `scale(${pop(frame, fps, tOne)})`, fontFamily: FONT, fontSize: 120, fontWeight: 900, color: '#F0A04B', textShadow: '0 4px 10px rgba(38,33,92,0.3)' })}>?</div>
          </div>
          <Label x={80} y={780} w={900} op={fadeIn(frame, tOne + 10, 10)} size={34} border="#F0A04B">e se for só este?</Label>
          <div style={abs(1060, 150, { width: 800, opacity: fadeIn(frame, tSel, 12) })}>
            <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.purple, marginBottom: 14 }}>Próxima aula</div>
            <div style={{ fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night, lineHeight: 1.15 }}>Aula 2 — Seletores: tag, classe e id</div>
            <div style={{ display: 'flex', gap: 30, marginTop: 50 }}>
              {['.classe', '#id'].map((t, i) => (
                <div key={t} style={{ opacity: fadeIn(frame, tSel + 20 + i * 14, 10), transform: `scale(${0.6 + 0.4 * pop(frame, fps, tSel + 20 + i * 14)})`, fontFamily: MONO, fontSize: 72, fontWeight: 700, color: '#FFD28A', background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 22, padding: '14px 36px', boxShadow: '0 16px 36px rgba(27,23,68,0.35)' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      )}
      {E > 0 && (
        <AbsoluteFill style={{ opacity: E }}>
          <Background dark />
          <div style={abs(0, 300, { width: 1920, display: 'flex', justifyContent: 'center' })}>
            {frame >= tBye - 6 && <LogoReveal start={tBye - 6} height={240} unlockAt={18} bodyColor={C.purpleSoft} wordColor={C.lavender} />}
          </div>
          <div style={abs(0, 640, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 56, color: C.lavender, opacity: fadeIn(frame, tBye + 24, 14) })}>
            Destrava sua carreira. Um nível de cada vez.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}
