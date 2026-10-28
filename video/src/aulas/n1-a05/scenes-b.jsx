import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { SpeakerIcon } from '../../components/Icons.jsx'
import { Label, LinesBox, abs, edAt, rampF, win } from './scenes-a.jsx'
import { TXT, CodeCard, LinkSpan, ListView, MenuBar, TableIcon, Tag, cardAt } from './ana.jsx'

const RED = 'rgba(217,83,79,0.55)'
const GOOD = 'rgba(151,196,89,0.45)'
const YEL = 'rgba(255,210,138,0.4)'
const IND = '#E8B860'

// ---------------------------------------------------------------- Bloco 6
export const Aninhada = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tHas = s('Às vezes')
  const tFruits = s('a Ana quer separar')
  const tWhere = s('O detalhe que mais confunde')
  const tInside = s('Ela vai dentro de uma éle í')
  const tNot = s('e não solta dentro')
  const tFr = s('a éle í começa com a palavra frutas')
  const tNew = s('abre uma nova u éle')
  const tThree = s('com três éle í')
  const tC1 = s('Fecha essa u éle')
  const tC2 = s('e só então fecha')
  const tNav = s('No navegador, as frutas')
  const tMix = s('E dá para misturar')
  const ed = { x: 50, y: 40, fs: 30 }
  const step = Math.max(14, Math.round((tC1 - tThree - 8) / 3))
  const tB = [0, 1, 2].map((i) => tThree + 8 + i * step)
  const segs = [
    { text: '<ul>\n  <li>Arroz</li>\n  <li>Feijão</li>', start: 0, frames: 0 },
    { text: '\n  <li>Frutas', start: tFr + 4, frames: 14 },
    { text: '\n    <ul>', start: tNew + 4, frames: 10 },
    { text: '\n      <li>Banana</li>', start: tB[0], frames: 14 },
    { text: '\n      <li>Maçã</li>', start: tB[1], frames: 14 },
    { text: '\n      <li>Laranja</li>', start: tB[2], frames: 14 },
    { text: '\n    </ul>', start: tC1 + 4, frames: 10 },
    { text: '\n  </li>', start: tC2 + 6, frames: 10 },
    { text: '\n  <li>Café</li>\n</ul>', start: 0, frames: 0 },
  ]
  const done = frame >= tC2 + 20
  const sub = ['Banana', 'Maçã', 'Laranja'].map((t, i) => ({ t, op: rampF(frame, tB[i] + 16, tB[i] + 26) }))
  const items = [
    'Arroz', 'Feijão',
    { t: 'Frutas', op: rampF(frame, tFr + 18, tFr + 28), hl: win(frame, tNav, tMix, 10), sub: { type: 'ul', items: sub } },
    'Café',
  ]
  const blinkOn = Math.floor(frame / 8) % 2 === 0
  const hlUl = frame >= tC2 - 4 && frame < tC2 + 20 && blinkOn
  const hlLi = frame >= tC2 + 20 && frame < tNav && blinkOn
  const W = { x: 1390, y: 96, fs: 26 }
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tHas, 12) })}>
        <EditorWindow width={700} height={660} filename="index.html">
          <CodeTyping segments={segs} fontSize={ed.fs} highlights={[
            ...(hlUl ? [{ text: '</ul>', occurrence: 0, at: 0, color: YEL }] : []),
            ...(hlLi ? [{ text: '</li>', occurrence: 5, at: 0, color: YEL }] : []),
          ]} />
        </EditorWindow>
      </div>
      <LinesBox ed={ed} l0={3} l1={9} c0={2} c1={22} op={fadeIn(frame, tC2 + 24, 10)} />
      <Label x={50} y={720} w={700} op={fadeIn(frame, tC2 + 24, 12)} dark size={30}>a lista de dentro mora dentro do item</Label>
      <div style={abs(790, 40, { opacity: fadeIn(frame, tHas + 6, 12) })}>
        <BrowserMock width={560} height={540} tabTitle="Sobre mim" url="index.html">
          <ListView fs={32} items={items} />
        </BrowserMock>
      </div>
      <div style={abs(790, 610, { opacity: win(frame, tC2, tNav, 10) })}><Chip size={30} color={C.night} border="#E8B860">fecha a lista, depois o item</Chip></div>
      <div style={abs(790, 610, { opacity: fadeIn(frame, tNav + 10, 12) })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>outro nível, outro marcador</Chip></div>
      <div style={abs(790, 700, { opacity: fadeIn(frame, tMix, 12) })}><Chip size={30} color={C.night} border={C.purple}>dá para misturar: <Tag color={C.purple}>{'<ol>'}</Tag> dentro de <Tag color={C.purple}>{'<ul>'}</Tag></Chip></div>
      {/* versão errada */}
      <div style={{ opacity: fadeIn(frame, tNot, 12) }}>
        <CodeCard x={W.x} y={W.y} fs={W.fs} title="errado" text={'<ul>\n  <li>Frutas</li>\n  <ul>\n    <li>Banana</li>\n  </ul>\n</ul>'} highlights={[{ text: '  <ul>', occurrence: 0, at: tNot + 10, color: RED }]} />
        <div style={abs(W.x + 370, W.y - 30, { opacity: fadeIn(frame, tNot + 10, 8) })}><Cross size={64} /></div>
        <div style={abs(W.x, W.y + 290, { width: 470, opacity: fadeIn(frame, tNot + 20, 12) })}><Chip size={26} color={C.night} border={C.red}><Tag>{'<ul>'}</Tag> solto, fora do <Tag>{'<li>'}</Tag></Chip></div>
      </div>
      <div style={abs(1390, 470, { width: 480, opacity: win(frame, tWhere, tNot, 12) })}><Chip size={30} color={C.night} border={C.purple}>onde a lista de dentro entra?</Chip></div>
      <div style={abs(1390, 470, { opacity: fadeIn(frame, done ? tC2 + 24 : 1e9, 12), display: 'flex', alignItems: 'center', gap: 16 })}><Check size={60} /><Chip size={30} color={C.night} border={C.green}>dentro do <Tag>{'<li>'}</Tag> Frutas</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
export const PaginaAna = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSec = s('Lembra da seção')
  const tPar = s('Até agora, era um parágrafo')
  const tVira = s('Ela vira uma u éle')
  const tBeyond = s('E dá para ir além')
  const tStrong = s('Um strong')
  const tProj = s('Na página de projetos')
  const tFirst = s('O primeiro leva')
  const tText = s('Lembra que o texto do link')
  const tIndent = s('E, para o código ficar fácil')
  const A = win(frame, 0, tProj, 14)
  const B = rampF(frame, tProj - 4, tProj + 10)
  const ed = { x: 50, y: 40, fs: 30 }
  const H2 = `  <h2 id="aprendendo">${TXT.h2b}</h2>`
  const P3 = '  <p>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</p>'
  const typing = frame >= tVira + 4
  const st = Math.max(10, Math.round((tBeyond - tVira - 10) / 5))
  const segsA = typing
    ? [
        { text: H2 + '\n', start: 0, frames: 0 },
        { text: '  <ul>\n', start: tVira + 4, frames: st - 2 },
        { text: '    <li><strong>HTML</strong>, começando agora</li>\n', start: tVira + 4 + st, frames: st + 4 },
        { text: '    <li>CSS</li>\n', start: tVira + 8 + 2 * st, frames: st - 2 },
        { text: '    <li>JavaScript</li>\n', start: tVira + 8 + 3 * st, frames: st - 2 },
        { text: '  </ul>', start: tVira + 8 + 4 * st, frames: st - 4 },
      ]
    : [{ text: H2 + '\n' + P3, start: 0, frames: 0 }]
  const li1 = rampF(frame, tVira + 4 + 2 * st + 4, tVira + 4 + 2 * st + 12)
  const li2 = rampF(frame, tVira + 8 + 3 * st, tVira + 8 + 3 * st + 8)
  const li3 = rampF(frame, tVira + 8 + 4 * st, tVira + 8 + 4 * st + 8)
  const LI1 = '    <li><strong>HTML</strong>, começando agora</li>'
  const c0 = LI1.indexOf('<strong>')
  const sStrong = { x: (edAt(ed, 2, c0).x + edAt(ed, 2, c0 + 21).x) / 2, bottom: edAt(ed, 2, 0).y + ed.fs * 0.7 }
  // projetos.html
  const segsB = [
    { text: '  <h1>Meus projetos</h1>\n', start: 0, frames: 0 },
    { text: '  <ul>\n', start: tProj + 14, frames: 8 },
    { text: '    <li><a href="https://receitas.example.com">Site de receitas</a></li>\n', start: tFirst - 10, frames: 34 },
    { text: '    <li>Página pessoal (em construção)</li>\n', start: tFirst + 30, frames: 24 },
    { text: '  </ul>', start: tFirst + 58, frames: 8 },
  ]
  const indentOn = frame >= tIndent + 10
  const box = { x: 50, y: 470, w: 1100, h: 380 }
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tSec - 10, 12) })}>
            <EditorWindow width={1820} height={380} filename="index.html">
              <CodeTyping key={typing ? 't' : 'p'} segments={segsA} fontSize={ed.fs} numbers={[11, 12, 13, 14, 15, 16]} highlights={[
                ...(typing ? [] : [{ text: P3.trim(), at: tPar, color: 'rgba(217,83,79,0.35)' }]),
                { text: '<strong>HTML</strong>', at: tStrong, color: YEL },
              ]} />
            </EditorWindow>
          </div>
          <div style={abs(1000, 480, { opacity: win(frame, tPar + 10, tVira + 4, 10), display: 'flex', alignItems: 'center', gap: 16 })}><Chip size={30} color={C.night} border={C.red}>era um parágrafo</Chip></div>
          <ArrowLine x1={1000} y1={490} x2={sStrong.x} y2={sStrong.bottom + 6} p={fadeIn(frame, tStrong, 12)} bend={-40} width={6} />
          <div style={abs(1000, 480, { opacity: fadeIn(frame, tStrong, 12) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>dentro do <Tag>{'li'}</Tag> cabe outra tag</Chip></div>
          <div style={abs(box.x, box.y, { opacity: fadeIn(frame, tSec, 12) })}>
            <BrowserMock width={900} height={box.h} tabTitle="Sobre mim" url="index.html">
              <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
                <div style={{ fontSize: 36, fontWeight: 700 }}>{TXT.h2b}</div>
                {typing ? (
                  <ListView fs={28} style={{ marginTop: 12 }} items={[
                    { t: <><strong>HTML</strong>, começando agora</>, op: li1, hl: win(frame, tStrong, tProj, 10) },
                    { t: 'CSS', op: li2 },
                    { t: 'JavaScript', op: li3 },
                  ]} />
                ) : (
                  <div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 12, background: frame >= tPar ? 'rgba(217,83,79,0.12)' : 'transparent' }}>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</div>
                )}
              </div>
            </BrowserMock>
          </div>
          <div style={abs(1000, 600, { opacity: fadeIn(frame, tBeyond, 12) })}><Chip size={30} color={C.night} border={C.purple}>dentro do <Tag>li</Tag>: <Tag>strong</Tag>, links...</Chip></div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={1820} height={330} filename="paginas/projetos.html">
              <CodeTyping segments={segsB} fontSize={ed.fs} numbers={[9, 10, 11, 12, 13]} highlights={indentOn ? [0, 1].map((o) => ({ text: '    ', occurrence: o, at: 0, color: IND })) : []} />
            </EditorWindow>
          </div>
          <div style={abs(box.x, 430)}>
            <BrowserMock width={1000} height={400} tabTitle="Projetos" url="paginas/projetos.html">
              <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
                <div style={{ fontSize: 44, fontWeight: 700 }}>Meus projetos</div>
                <ListView fs={30} style={{ marginTop: 14 }} items={[
                  { t: <LinkSpan>Site de receitas</LinkSpan>, op: rampF(frame, tFirst + 26, tFirst + 36), hl: win(frame, tText, tIndent, 10) },
                  { t: 'Página pessoal (em construção)', op: rampF(frame, tFirst + 56, tFirst + 66) },
                ]} />
              </div>
            </BrowserMock>
          </div>
          <div style={abs(1100, 470, { opacity: fadeIn(frame, tFirst + 30, 12) })}><Chip size={30} color={C.night} border={C.purple}>um link em cada item</Chip></div>
          <div style={abs(1100, 570, { opacity: win(frame, tText, tIndent + 6, 12) })}><Chip size={30} color={C.night} border={C.purple}>o texto do link diz para onde ele leva</Chip></div>
          <div style={abs(1100, 570, { opacity: fadeIn(frame, tIndent + 10, 12) })}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, background: C.night, color: C.lavender, borderRadius: 20, padding: '14px 30px', fontFamily: FONT, fontSize: 36, fontWeight: 600 }}>
              <span><span style={{ background: IND, borderRadius: 6, padding: '0 18px', marginRight: 14 }} /> indentação</span>
              <span style={{ fontSize: 30, fontWeight: 400 }}>o código fica fácil de ler</span>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
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
  const tShows = s('O navegador até mostra')
  const tLives = s('Toda éle í mora')
  const tE2 = s('O segundo')
  const tOnly = s('Dentro da caixa da lista')
  const tE3 = s('O terceiro')
  const tShift = s('todo deslocado')
  const tNest = s('E, nas listas aninhadas')
  const tRule = s('A regra é a de sempre')
  const k1 = win(frame, tE1 - 6, tE2, 12)
  const k2 = win(frame, tE2, tE3, 12)
  const k3 = win(frame, tE3, tNest + 40, 12)
  const k4 = rampF(frame, tNest + 36, tNest + 48)
  const fs = 44
  const fixAt = tShift + 4
  const fixed = frame >= fixAt + 12
  const checklist = ['li dentro da lista', 'só li na caixa', 'fechar tudo, na ordem']
  return (
    <AbsoluteFill>
      {k1 > 0 && (
        <div style={{ opacity: k1 }}>
          <ErrTitle n={1}><Tag>li</Tag> solto, fora da lista</ErrTitle>
          <CodeCard x={160} y={180} fs={fs} text="<li>Arroz</li>" mark={frame >= tE1 + 20 ? <Cross size={70} /> : null} />
          <div style={abs(160, 310, { opacity: fadeIn(frame, tE1 + 26, 12) })}><Chip size={32} color={C.night} border={C.red}><Tag>li</Tag> solto</Chip></div>
          <div style={abs(820, 200, { opacity: fadeIn(frame, tShows, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            <SpeakerIcon size={80} waves={0} />
            <Chip size={32} color={C.night} border={C.red}>o leitor de tela não entende</Chip>
          </div>
          <CodeCard x={160} y={430} fs={fs} text={'<ul>\n  <li>Arroz</li>\n</ul>'} op={fadeIn(frame, tLives, 12)} highlights={[{ text: '<ul>', at: tLives, color: GOOD }, { text: '</ul>', at: tLives, color: GOOD }]} mark={<Check size={70} />} />
          <div style={abs(720, 520, { opacity: fadeIn(frame, tLives + 14, 12) })}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>todo <Tag>li</Tag> mora numa lista</Chip></div>
        </div>
      )}
      {k2 > 0 && (
        <div style={{ opacity: k2 }}>
          <ErrTitle n={2}>texto direto na caixa</ErrTitle>
          <CodeCard x={160} y={180} fs={fs} text="<ul>Arroz<li>Feijão</li></ul>" highlights={[{ text: 'Arroz', at: tE2 + 30, color: 'rgba(217,83,79,0.85)' }]} mark={frame >= tE2 + 30 ? <Cross size={70} /> : null} />
          <div style={abs(160, 310, { opacity: fadeIn(frame, tE2 + 40, 12) })}><Chip size={32} color={C.night} border={C.red}>"Arroz" sem <Tag>li</Tag></Chip></div>
          <CodeCard x={160} y={440} fs={fs} text="<ul><li>Arroz</li><li>Feijão</li></ul>" op={fadeIn(frame, tOnly, 12)} highlights={[{ text: '<li>Arroz</li>', at: tOnly, color: GOOD }]} mark={<Check size={70} />} />
          <div style={abs(160, 570, { opacity: fadeIn(frame, tOnly + 14, 12) })}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>na caixa, só itens</Chip></div>
        </div>
      )}
      {k3 > 0 && (
        <div style={{ opacity: k3 }}>
          <ErrTitle n={3}>esquecer de fechar</ErrTitle>
          <CodeCard x={160} y={170} fs={38} segments={[
            { text: '<ul>\n  <li>Arroz</li>\n  <li>Feijão</li>', start: 0, frames: 0 },
            { text: '\n</ul>', start: fixAt, frames: 10 },
            { text: '\n<p>Compro tudo no sábado.</p>', start: 0, frames: 0 },
          ]} highlights={[{ text: '</ul>', at: fixAt, color: GOOD }]} />
          <div style={abs(160, fixed ? 520 : 460, { opacity: fadeIn(frame, tE3 + 20, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            {fixed ? <Check size={64} /> : <Cross size={64} />}
            <Chip size={32} color={C.night} border={fixed ? C.green : C.red}>{fixed ? <>com <Tag>{'</ul>'}</Tag>, tudo no lugar</> : <>falta o <Tag>{'</ul>'}</Tag></>}</Chip>
          </div>
          <div style={abs(980, 150, { opacity: fadeIn(frame, tE3 + 10, 12) })}>
            <BrowserMock width={880} height={420} tabTitle="Compras" url="index.html">
              <ListView fs={34} items={['Arroz', 'Feijão']} />
              <div style={{ fontFamily: FONT, fontSize: 34, lineHeight: 1.4, marginTop: fixed ? 24 : 0, marginLeft: fixed ? 0 : 34 * 1.6, background: fixed ? 'transparent' : frame >= tE3 + 40 ? 'rgba(217,83,79,0.16)' : 'transparent', borderRadius: 8, color: '#1A1A1A' }}>Compro tudo no sábado.</div>
            </BrowserMock>
          </div>
          <div style={abs(980, 600, { opacity: fadeIn(frame, tE3 + 40, 12) * (fixed ? 0 : 1) })}><Chip size={30} color={C.night} border={C.red}>o parágrafo foi parar dentro da lista</Chip></div>
        </div>
      )}
      {k4 > 0 && (
        <div style={{ opacity: k4 }}>
          <ErrTitle n={4}>fechar na ordem errada</ErrTitle>
          <CodeCard x={120} y={170} fs={32} title="errado" text={'<ul>\n  <li>Frutas\n    <ul>\n      <li>Banana</li>\n  </li>\n    </ul>\n</ul>'} highlights={[{ text: '  </li>', at: tNest + 54, color: RED }]} mark={frame >= tNest + 54 ? <Cross size={60} /> : null} />
          <CodeCard x={680} y={170} fs={32} title="certo" op={fadeIn(frame, tRule - 10, 12)} text={'<ul>\n  <li>Frutas\n    <ul>\n      <li>Banana</li>\n    </ul>\n  </li>\n</ul>'} highlights={[{ text: '    </ul>', at: tRule, color: GOOD }, { text: '  </li>', at: tRule + 8, color: GOOD }]} mark={<Check size={60} />} />
          <Label x={120} y={650} w={1100} op={fadeIn(frame, tRule + 10, 12)} dark size={40}>abriu por último, fecha primeiro</Label>
          <div style={abs(1300, 150, { width: 560, opacity: fadeIn(frame, tRule + 24, 14), background: C.white, border: `4px solid ${C.purple}`, borderRadius: 26, padding: '22px 28px', boxSizing: 'border-box', boxShadow: '0 18px 40px rgba(38,33,92,0.16)', fontFamily: FONT })}>
            <div style={{ fontSize: 34, fontWeight: 700, color: C.night, marginBottom: 16 }}>checklist</div>
            {checklist.map((t, i) => {
              const p = fadeIn(frame, tRule + 30 + i * 10, 10)
              return (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
                  <Check size={48} />
                  <div style={{ fontSize: 32, color: C.night }}>{t}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const Menu = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tCur = s('Uma curiosidade')
  const tMenu = s('Sabe o menu de um site')
  const tUnder = s('Muitas vezes, por baixo')
  const tCss = s('Só que o CSS')
  const tNext = s('Você vai aprender')
  const tIdea = s('Por enquanto, guarde')
  const lens = rampF(frame, tUnder - 6, tUnder + 50)
  const lensOp = win(frame, tUnder - 10, tUnder + 70, 10)
  const stack = rampF(frame, tUnder + 62, tUnder + 82) * (1 - rampF(frame, tCss + 10, tCss + 30))
  const code = ['<ul>', '  <li><a href="index.html">Início</a></li>', '  <li><a href="paginas/projetos.html">Projetos</a></li>', '  <li><a href="mailto:ana@example.com">Contato</a></li>', '</ul>'].join('\n')
  const B = { x: 160, y: 40, w: 1600, h: 380 }
  const lx = B.x + 60 + lens * 560
  const ly = B.y + 110
  return (
    <AbsoluteFill>
      <div style={abs(B.x, B.y, { opacity: fadeIn(frame, tCur, 12) })}>
        <BrowserMock width={B.w} height={B.h} tabTitle="Ana Souza" url="index.html">
          <div style={{ opacity: fadeIn(frame, tMenu, 12) }}>
            <MenuBar width={1540} fs={32} stack={stack} />
          </div>
          <div style={{ marginTop: 26, opacity: 0.9 }}>
            {[70, 92, 60].map((w, i) => <div key={i} style={{ height: 16, width: `${w}%`, background: '#DAD7F5', borderRadius: 8, marginBottom: 16 }} />)}
          </div>
        </BrowserMock>
      </div>
      {/* lente de raio-x */}
      {lensOp > 0 && (
        <div style={abs(lx - 110, ly - 110 + 70, { opacity: lensOp })}>
          <svg width="300" height="300" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
            <line x1="190" y1="190" x2="270" y2="270" stroke={C.night} strokeWidth="22" strokeLinecap="round" />
            <circle cx="110" cy="110" r="100" fill="rgba(27,23,68,0.9)" stroke={C.purpleSoft} strokeWidth="10" />
            <text x="110" y="100" textAnchor="middle" fontFamily={MONO} fontSize="38" fontWeight="700" fill="#B3ADFF">{'<li>'}</text>
            <text x="110" y="146" textAnchor="middle" fontFamily={MONO} fontSize="30" fill="#FFD28A">{'<a>'}</text>
          </svg>
        </div>
      )}
      <div style={{ opacity: fadeIn(frame, tUnder + 30, 12) }}>
        <CodeCard x={160} y={480} fs={30} title="por baixo do menu" text={code} highlights={[{ text: '<ul>', at: tUnder + 40, color: YEL }, { text: '</ul>', at: tUnder + 40, color: YEL }]} />
      </div>
      <div style={abs(1250, 500, { opacity: fadeIn(frame, tUnder + 50, 12) })}><Chip size={32} color={C.night} border={C.purple}>uma <Tag color={C.purple}>li</Tag> para cada link</Chip></div>
      <div style={abs(1250, 600, { opacity: fadeIn(frame, tCss, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
        <div style={{ background: C.night, color: '#FFD28A', fontFamily: MONO, fontWeight: 700, fontSize: 40, borderRadius: 14, padding: '6px 22px', border: `3px solid ${C.purpleSoft}` }}>CSS</div>
        <Chip size={28} color={C.night} border={C.purpleSoft}>tira as bolinhas, põe lado a lado</Chip>
      </div>
      <Label x={1250 - 60} y={710} w={700} op={fadeIn(frame, tNext, 12)} dark size={32}>o visual vem depois (próximos níveis)</Label>
      <div style={abs(1250, 800, { opacity: fadeIn(frame, tIdea, 12) })}><Chip size={28} color={C.night} border={C.purple}>o HTML diz que é uma lista</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
export const Resumo = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const items = [
    { t: <><Tag color={C.purple}>ul</Tag>: ordem não importa</>, at: s('A u éle é a lista') },
    { t: <><Tag color={C.purple}>ol</Tag>: ordem importa</>, at: s('A ó éle é a lista') },
    { t: <><Tag color={C.purple}>li</Tag>: cada item, sempre dentro de uma lista</>, at: s('Nas duas, cada item') },
    { t: <>lista dentro de lista: dentro do <Tag color={C.purple}>li</Tag></>, at: s('Para colocar uma lista') },
    { t: 'fechar tudo, na ordem certa', at: s('E feche tudo') },
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
      <div style={abs(420, 150, { display: 'flex', flexDirection: 'column', gap: 22 })}>
        {items.map((it, i) => {
          const p = fadeIn(frame, it.at, 12)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
              <Check size={64} />
              <div style={{ fontFamily: FONT, fontSize: 42, color: C.night, fontWeight: 500 }}>{it.t}</div>
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
              <TableIcon size={110} />
              <div style={{ fontFamily: FONT, color: C.lavender }}>
                <div style={{ fontSize: 32, color: C.purpleSoft, fontWeight: 600 }}>Próxima aula</div>
                <div style={{ fontSize: 60, fontWeight: 700 }}>Aula 6 — Tabelas</div>
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
