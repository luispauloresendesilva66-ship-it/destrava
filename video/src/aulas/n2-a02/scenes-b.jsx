import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { Background } from '../../components/Background.jsx'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { Code, CodeChip, EditorTabs, Preview } from '../../components/CssCode.jsx'
import { LessonTag } from '../n1-a09/ana.jsx'
import { RED_HL } from '../n2-a01/scenes-a.jsx'
import { MiniPage, PageSel } from './page.jsx'
import { CharMark, ED, ED_W, HEX, Label, PV, PVZ, SaveFlash, Warn, YEL, abs, blinking, cssUpTo, edAt, mix, pop, rampF, tailNumbers, tailOf, typed, win } from './scenes-a.jsx'

const GREEN_HL = 'rgba(151,196,89,0.6)'
const M = ({ children, color = C.purple }) => <span style={{ fontFamily: MONO, color }}>{children}</span>

// ---------------------------------------------------------------- ilustrações (Bloco 6)
const Player = ({ size = 150, n }) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 100 125" style={{ overflow: 'visible' }}>
    <circle cx="50" cy="24" r="17" fill="#F2C9A0" stroke={C.night} strokeWidth="3" />
    <path d="M20 52 L36 42 H64 L80 52 L74 70 L66 66 V112 H34 V66 L26 70 Z" fill={C.purple} stroke={C.night} strokeWidth="3" strokeLinejoin="round" />
    <path d="M42 42 Q50 52 58 42" fill="none" stroke={C.white} strokeWidth="3" />
    <text x="50" y="94" textAnchor="middle" fontFamily={MONO} fontSize="15" fontWeight="700" fill="#FFD28A">.time</text>
  </svg>
)
const IdCard = ({ w = 300 }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 300 186">
    <rect x="3" y="3" width="294" height="180" rx="18" fill="#FFF4D6" stroke="#E8B860" strokeWidth="5" />
    <rect x="3" y="3" width="294" height="40" rx="18" fill="#E8B860" />
    <rect x="3" y="26" width="294" height="17" fill="#E8B860" />
    <text x="150" y="31" textAnchor="middle" fontFamily={FONT} fontSize="20" fontWeight="800" fill={C.night}>DOCUMENTO</text>
    <rect x="22" y="60" width="78" height="98" rx="10" fill="#D8D5F6" stroke={C.night} strokeWidth="3" />
    <circle cx="61" cy="95" r="18" fill={C.purpleSoft} />
    <path d="M33 152 Q61 112 89 152 Z" fill={C.purpleSoft} />
    {[70, 96, 122].map((y, i) => <rect key={y} x="120" y={y} width={i === 2 ? 90 : 150} height="12" rx="6" fill="#C9C5EE" />)}
    <text x="120" y="160" fontFamily={MONO} fontSize="24" fontWeight="700" fill={C.night}># 000-001</text>
  </svg>
)

// ---------------------------------------------------------------- Bloco 6
export const ClasseOuId = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tWhen = s('Então, quando usar')
  const tPrefer = s('Para estilo, prefira')
  const tReuse = s('Ela pode ser reaproveitada')
  const tCombine = s('combina com outras classes')
  const tFight = s('não briga tanto')
  const tIdJobs = s('O ái di tem trabalhos')
  const tAddr = s('ser o endereço de uma seção')
  const tLabel = s('e ligar o lêibol')
  const tOk = s('Não tem problema usar')
  const tCreate = s('Mas, se você está criando')
  const tTip = s('Uma dica para lembrar')
  const tUni = s('a classe é como o uniforme')
  const tDoc = s('O ái di é como o número')
  const tOwn = s('cada pessoa tem o seu')
  const COL = [{ x: 70, head: <>Classe <M color="#FFD28A">.</M></>, at: tPrefer }, { x: 990, head: <>Id <M color="#FFD28A">#</M></>, at: tIdJobs }]
  const items = [
    [['pode repetir', tReuse], ['várias por elemento', tCombine], ['a escolha para estilo', tPrefer + 30]],
    [['único na página', tIdJobs + 20], [<>endereço de seção (<M>href="#contato"</M>)</>, tAddr], [<>liga <M>{'<label for>'}</M> ao campo</>, tLabel, '7 do nível 1']],
  ]
  return (
    <AbsoluteFill>
      <div style={abs(0, 30, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tWhen, 10) })}>classe ou id?</div>
      {COL.map((c, ci) => (
        <div key={ci} style={abs(c.x, 120, { width: 860, height: 640, background: C.white, border: `4px solid ${ci === 0 ? C.purple : '#E8B860'}`, borderRadius: 26, boxShadow: '0 14px 30px rgba(38,33,92,0.14)', opacity: fadeIn(frame, c.at, 12), boxSizing: 'border-box', padding: '20px 36px' })}>
          <div style={{ fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.night, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ background: C.nightDeep, color: C.white, borderRadius: 16, padding: '0 22px' }}>{c.head}</span>
          </div>
          <div style={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            {ci === 0
              ? [0, 1, 2].map((i) => <div key={i} style={{ opacity: fadeIn(frame, tUni + i * 6, 8), transform: `translateY(${(1 - pop(frame, fps, tUni + i * 6)) * 30}px)` }}><Player size={140} /></div>)
              : <div style={{ opacity: fadeIn(frame, tDoc, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tDoc)})` }}><IdCard w={330} /></div>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {items[ci].map(([t, at, lesson], i) => {
              const o = fadeIn(frame, at, 10)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: o, transform: `translateX(${(1 - o) * 30}px)` }}>
                  <div style={{ transform: `scale(${pop(frame, fps, at + 4)})` }}><Check size={52} /></div>
                  <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 600, color: C.night }}>{t}</div>
                  {lesson && <LessonTag n={lesson} size={24} />}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <div style={abs(70, 690, { width: 860, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tFight, 10) * (1 - fadeIn(frame, tUni, 8)) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">e briga menos com as outras regras (já já)</Chip></div>
      <div style={abs(70, 690, { width: 860, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tUni + 10, 10) })}><Chip size={28} color={C.night} border={C.purple}>uniforme: muita gente veste igual</Chip></div>
      <div style={abs(990, 690, { width: 860, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tOk, 10) * (1 - fadeIn(frame, tDoc, 8)) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">ajuste pontual num id que já existe: tudo bem (<M>#contato</M>)</Chip></div>
      <div style={abs(990, 690, { width: 860, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tOwn, 10) })}><Chip size={28} color={C.night} border="#E8B860">documento: cada um tem o seu</Chip></div>
      <Label x={0} y={790} w={1920} op={fadeIn(frame, tCreate, 12) * (1 - fadeIn(frame, tTip, 8) * 0.0)} size={38} dark>vai pintar? crie uma classe</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
export const VirgulaScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tShort = s('Agora, um atalho')
  const tWant = s('A Ana quer que o agá um')
  const tTwo = s('Ela poderia escrever')
  const tJoin = s('Mas dá para juntar')
  const tRule = s('agá um, vírgula, agá dois, abre')
  const tMeans = s('A vírgula quer dizer')
  const tBoth = s('esta regra vale para o agá um')
  const tList = s('Dá para colocar quantos')
  const tMixT = s('e até misturar os tipos')
  const tAvoid = s('Isso evita repetir')
  const tOnce = s('troca num lugar só')
  const tCare = s('Um cuidado')
  const tWithout = s('Sem ela, o significado')
  const merge = rampF(frame, tJoin + 4, tJoin + 30)
  const e = 1 - Math.pow(1 - merge, 3)
  const twoOp = fadeIn(frame, tTwo, 10) * (1 - rampF(frame, tJoin + 14, tJoin + 30))
  const oneOp = rampF(frame, tJoin + 18, tJoin + 32)
  const commaBlink = blinking(frame, tMeans, tMeans + 60)
  const navyT = rampF(frame, tRule + 30, tRule + 46)
  const css = cssUpTo('contato') + (navyT > 0 ? `\n\nh1, h2 {\n  color: ${mix(HEX.black, HEX.navy, navyT)};\n}` : '')
  const LX = 120
  return (
    <AbsoluteFill>
      <div style={abs(LX, 50, { fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tShort, 10) })}>um atalho: <span style={{ color: C.purple }}>a vírgula</span></div>
      <div style={abs(LX, 130, { opacity: win(frame, tWant, tTwo + 10, 10) })}><Chip size={30} color={C.night} border={C.purple}>h1 e h2 com a mesma cor: <M>navy</M></Chip></div>
      {/* duas regras iguais */}
      {twoOp > 0 && [0, 1].map((i) => (
        <div key={i} style={abs(LX + i * 440 * (1 - e) + 220 * e, 220 + 30 * e, { opacity: twoOp })}>
          <CodeChip text={`h${i + 1} {\n  color: navy;\n}`} fs={48} highlights={[{ text: 'color: navy;', at: tTwo + 20, color: YEL }]} />
        </div>
      ))}
      <div style={abs(LX, 470, { opacity: win(frame, tTwo + 20, tJoin + 10, 10) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">a mesma declaração, repetida</Chip></div>
      {oneOp > 0 && (
        <div style={abs(LX + 160, 240, { opacity: oneOp, transform: `scale(${0.85 + 0.15 * oneOp})`, transformOrigin: 'left top' })}>
          <CodeChip text={'h1, h2 {\n  color: navy;\n}'} fs={60} highlights={commaBlink ? [{ text: ',', at: 0, color: 'rgba(255,210,138,0.95)' }] : []} />
        </div>
      )}
      <div style={abs(LX + 160, 562, { opacity: fadeIn(frame, tMeans, 10) })}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>vírgula = "e"</Chip></div>
      <div style={abs(LX, 640, { opacity: fadeIn(frame, tMixT, 10) * (1 - fadeIn(frame, tAvoid + 10, 8)), display: 'flex', alignItems: 'center', gap: 16 })}>
        <CodeChip text={'h1, h2, .destaque { }'} fs={40} pad="10px 22px" />
        <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">dá para misturar tag e classe</Chip>
      </div>
      <div style={abs(LX, 650, { opacity: win(frame, tList, tMixT, 8) })}><Chip size={30} color={C.night} border={C.purple}>quantos seletores quiser na lista</Chip></div>
      <div style={abs(LX, 650, { opacity: fadeIn(frame, tAvoid + 10, 10) * (1 - fadeIn(frame, tCare, 8)) })}><Chip size={30} color={C.night} border={C.green}>{frame >= tOnce ? 'mudou de ideia? troca num lugar só' : 'nada de repetir a declaração'}</Chip></div>
      <div style={abs(LX, 650, { opacity: fadeIn(frame, tCare, 10), display: 'flex', alignItems: 'center', gap: 14 })}><Warn size={50} /><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">{frame >= tWithout ? 'sem a vírgula, o significado muda' : 'a vírgula faz toda a diferença'}</Chip></div>
      <div style={abs(PV.x, PV.y)}>
        <Preview w={PV.w} h={PV.h}><PageSel id="b7-pv" css={css} zoom={PVZ} cls={{ pDest: 'destaque' }} hl={[{ sel: 'h1, h2', op: win(frame, tBoth, tList, 8), color: '151,196,89' }, { sel: 'h1, h2, .destaque', op: win(frame, tMixT + 10, tAvoid + 6, 8), color: '240,160,75' }]} /></Preview>
        <SaveFlash frame={frame} at={tRule + 26} />
      </div>
      <Label x={PV.x} y={PV.y + PV.h + 26} w={PV.w} op={fadeIn(frame, tBoth, 10)} size={30} border={C.purple}>o h1 e todos os h2, azul-marinho</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
const Nest = ({ frame, path = [], fs = 30 }) => {
  const box = (tag, color, lit, children, extra) => (
    <div style={{ border: `4px solid ${color}`, borderRadius: 18, padding: '8px 16px 14px', background: lit ? 'rgba(255,210,138,0.35)' : 'rgba(255,255,255,0.75)', boxShadow: lit ? '0 0 22px rgba(240,160,75,0.7)' : 'none', ...extra }}>
      <div style={{ fontFamily: MONO, fontSize: fs, fontWeight: 700, color }}>{`<${tag}>`}</div>
      {children}
    </div>
  )
  return box('nav', C.purple, path.includes('nav'),
    box('ul', '#2FA89A', path.includes('ul'),
      box('li', '#D46FA8', path.includes('li'),
        box('a', '#F0A04B', path.includes('a'), <div style={{ fontFamily: FONT, fontSize: fs * 0.85, color: C.night }}>Sobre mim</div>, { marginTop: 6 }),
        { marginTop: 6 }),
      { marginTop: 6 }))
}
export const DescendenteScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tMenu = s('Lembra do menu')
  const tNav = s('É uma név')
  const tWant = s('A Ana quer que os links')
  const tFooter = s('como os do fúter')
  const tDesc = s('Para isso existe o seletor')
  const tSel = s('név, espaço, é. Lendo')
  const tRead = s('Lendo em português')
  const tSpace = s('O espaço entre os dois')
  const tDeep = s('E não precisa estar logo')
  const tPath = [s('o link está numa'), s('que está na u éle'), s('que está na név, e mesmo')]
  const tCmp = s('Agora compare')
  const tComma = s('Név, vírgula, é')
  const tNoComma = s('Név, espaço, é')
  const tAll = s('Uma vírgula a mais')
  const full = cssUpTo('h1h2') + '\n\n'
  const FROM = 24
  const pre = tailOf(full, FROM)
  const segs = typed(pre, [['nav a {', tSel + 4], ['\n  color: ', tSel + 22], ['tomato;', tSel + 34], ['\n}', tSel + 46]])
  const tSave = tSel + 60
  const edC = { x: ED.x, y: 450, fs: 28 }
  const lRule = pre.split('\n').length - 1
  const col = rampF(frame, tSave + 4, tSave + 18)
  const css = cssUpTo('h1h2') + (col > 0 ? `\n\nnav a {\n  color: ${mix('#0000EE', HEX.tomato, col)};\n}` : '')
  const path = []
  if (frame >= tPath[0] && frame < tCmp) path.push('a', 'li')
  if (frame >= tPath[1] && frame < tCmp) path.push('ul')
  if (frame >= tPath[2] && frame < tCmp) path.push('nav')
  const spaceOn = blinking(frame, tSpace, tSpace + 70) || (frame >= tSpace + 70 && frame < tCmp)
  const B = rampF(frame, tCmp - 6, tCmp + 8)
  const hl = [
    { sel: 'nav a', op: win(frame, tWant, tFooter, 8), color: '240,160,75' },
    { sel: 'footer a', op: win(frame, tFooter, tDesc + 10, 8), color: '75,166,200' },
    { sel: 'nav, a', op: win(frame, tComma, tNoComma, 8), color: '240,160,75' },
    { sel: 'nav a', op: fadeIn(frame, tNoComma, 8), color: '151,196,89' },
  ]
  return (
    <AbsoluteFill>
      <div style={{ opacity: 1 - B }}>
        <div style={abs(ED.x, 30, { width: ED_W, height: 390, display: 'flex', alignItems: 'flex-start', gap: 30, opacity: fadeIn(frame, tNav, 12) })}>
          <div style={{ width: 520 }}><Nest frame={frame} path={path} fs={28} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 20 }}>
            <div style={{ opacity: fadeIn(frame, tNav + 10, 10) }}><Chip size={28} color={C.night} border={C.purple}>caixas uma dentro da outra</Chip></div>
            <div style={{ opacity: fadeIn(frame, tDeep, 10) }}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">não precisa estar logo dentro</Chip></div>
          </div>
        </div>
        <div style={abs(edC.x, edC.y, { opacity: fadeIn(frame, tDesc - 10, 12) })}>
          <EditorTabs tabs={[{ name: 'estilo.css', active: true }]} width={ED_W} height={420}>
            <Code segments={segs} lang="css" fontSize={edC.fs} numbers={tailNumbers(FROM)} />
          </EditorTabs>
        </div>
        <CharMark ed={edC} line={lRule} col={3} on={spaceOn} />
        <div style={abs(edAt(edC, lRule, 10).x, edAt(edC, lRule, 0).y - 64, { opacity: fadeIn(frame, tSpace, 10) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">espaço = "dentro de"</Chip></div>
        <div style={abs(edAt(edC, lRule, 10).x, edAt(edC, lRule, 0).y - 64, { opacity: win(frame, tRead, tSpace, 8) })}><Chip size={28} color={C.night} border={C.purple}>todo <M>{'<a>'}</M> dentro de uma <M>{'<nav>'}</M></Chip></div>
        <div style={abs(edAt(edC, lRule, 10).x, edAt(edC, lRule, 0).y - 64, { opacity: win(frame, tDesc, tRead, 8) })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>seletor de descendente</Chip></div>
      </div>
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(80, 60, { fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.night })}>compare</div>
          {[['nav, a', 'a nav e todos os links', tComma, '#F0A04B'], ['nav a', 'só os links dentro da nav', tNoComma, C.green]].map(([code, t, at, color], i) => {
            const o = fadeIn(frame, at, 10)
            const active = i === 0 ? frame >= tComma && frame < tNoComma : frame >= tNoComma
            return (
              <div key={code} style={abs(80, 190 + i * 250, { opacity: 0.35 + 0.65 * o, display: 'flex', flexDirection: 'column', gap: 16 })}>
                <CodeChip text={code + ' { }'} fs={64} style={{ boxShadow: active ? `0 0 0 6px ${color}, 0 16px 36px rgba(27,23,68,0.35)` : undefined }} highlights={[{ text: i === 0 ? ',' : ' ', at: at, color: 'rgba(255,210,138,0.95)', index: 3 }]} />
                <div style={{ opacity: o }}><Chip size={32} color={C.night} border={color}>{t}</Chip></div>
              </div>
            )
          })}
          <Label x={80} y={720} w={900} op={fadeIn(frame, tAll, 10)} size={34} dark>uma vírgula a mais ou a menos muda tudo</Label>
        </div>
      )}
      <div style={abs(PV.x, PV.y, { opacity: fadeIn(frame, tMenu, 10) })}>
        <Preview w={PV.w} h={PV.h}><PageSel id="b8-pv" css={css} zoom={PVZ} cls={{ pDest: 'destaque' }} hl={hl} /></Preview>
        <SaveFlash frame={frame} at={tSave} />
      </div>
      <div style={abs(PV.x, PV.y + PV.h + 26, { width: PV.w, display: 'flex', justifyContent: 'center', opacity: win(frame, tWant, tFooter, 8) })}><Chip size={30} color={C.night} border="#F0A04B">os links do menu: <M>tomato</M></Chip></div>
      <div style={abs(PV.x, PV.y + PV.h + 26, { width: PV.w, display: 'flex', justifyContent: 'center', opacity: win(frame, tFooter, tDesc, 8) })}><Chip size={30} color={C.night} border="#4BA6C8">o link do rodapé: sem mudar</Chip></div>
      <div style={abs(PV.x, PV.y + PV.h + 26, { width: PV.w, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tSave + 20, 10) * (1 - B) })}><Check size={48} /><Chip size={30} color={C.night} border="#4BA6C8">o do rodapé: fora da nav, não muda</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const CascataScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tQ = s('Agora, uma pergunta')
  const tTwo = s('tem duas regras falando')
  const tP = s('a do pê, que diz')
  const tD = s('ponto destaque, que diz')
  const tPurple = s('E ele ficou roxo')
  const tWhy = s('Por quê?')
  const tCasc = s('Aqui entra a cascata')
  const tFirst = s('Primeiro: a regra mais')
  const tId = s('O ái di é o mais')
  const tCls = s('Depois vem a classe')
  const tTag = s('e por último a tag')
  const tSo = s('Então, ái di vence classe')
  const tSecond = s('Segundo: se as duas')
  const tLast = s('vence a que vem por último')
  const tName = s('Essa conta tem nome')
  const tKeep = s('Por enquanto, guarde')
  const A = 1 - rampF(frame, tFirst - 6, tFirst + 6)
  const B = rampF(frame, tFirst - 6, tFirst + 6) * (1 - rampF(frame, tSecond - 6, tSecond + 6))
  const Cc = rampF(frame, tSecond - 6, tSecond + 6)
  const tug = Math.sin(frame / 5) * 6
  const win2 = rampF(frame, tPurple, tPurple + 12)
  const podium = [
    { place: 2, code: '.classe', h: 220, at: tCls, x: 560 },
    { place: 1, code: '#id', h: 300, at: tId, x: 820 },
    { place: 3, code: 'tag', h: 150, at: tTag, x: 1080 },
  ]
  const lastOn = frame >= tLast
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 40, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tQ, 10) })}>duas regras, um parágrafo</div>
          <div style={abs(640, 170, { opacity: fadeIn(frame, tTwo - 10, 10) })}>
            <Preview w={640} h={340} title="Ana Souza"><MiniPage id="b9-mini" css={'p {\n  color: navy;\n}\n.destaque {\n  color: purple;\n}'} n={2} cls={win2 > 0 ? { p1: 'destaque' } : {}} zoom={1.5} hl={[{ sel: '.destaque', op: fadeIn(frame, tPurple + 6, 8), color: '151,196,89' }]} /></Preview>
          </div>
          <div style={abs(640, 540, { width: 640, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tTwo, 10) })}><CodeChip text={'<p class="destaque">'} lang="html" fs={36} pad="8px 20px" /></div>
          <div style={abs(80 - (win2 > 0 ? 0 : tug), 300, { opacity: fadeIn(frame, tP, 10) * (1 - 0.5 * win2) })}><CodeChip text={'p {\n  color: navy;\n}'} fs={44} /></div>
          <div style={abs(1380 + (win2 > 0 ? 0 : tug), 300, { opacity: fadeIn(frame, tD, 10) })}><CodeChip text={'.destaque {\n  color: purple;\n}'} fs={44} style={{ boxShadow: win2 > 0 ? `0 0 0 ${6 * win2}px ${C.green}, 0 16px 36px rgba(27,23,68,0.35)` : undefined }} /></div>
          <ArrowLine x1={420} y1={380} x2={630} y2={400} p={rampF(frame, tP + 4, tP + 18)} width={6} color="#9A97B8" />
          <ArrowLine x1={1370} y1={380} x2={1290} y2={400} p={rampF(frame, tD + 4, tD + 18)} width={6} color={C.purple} />
          <div style={abs(640, 640, { width: 640, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tPurple + 10, 10) })}>
            <div style={{ transform: `scale(${pop(frame, fps, tPurple + 12)})` }}><Check size={56} /></div>
            <Chip size={36} color={C.white} bg={C.purple} border={C.night}>classe vence tag</Chip>
          </div>
          <div style={abs(1380, 560, { opacity: fadeIn(frame, tWhy, 8) })}><Chip size={34} color={C.night} bg="#FFF4D6" border="#E8B860">{frame >= tCasc ? 'a cascata decide' : 'por quê?'}</Chip></div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 40, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night })}>especificidade <span style={{ color: C.purple }}>(o básico)</span></div>
          <div style={abs(0, 120, { width: 1920, display: 'flex', justifyContent: 'center' })}><Chip size={34} color={C.night} border={C.purple}>1. a regra mais específica vence</Chip></div>
          {podium.map((p) => {
            const o = pop(frame, fps, p.at)
            return (
              <div key={p.code} style={abs(p.x, 760 - p.h * clamp01(o) - 110, { width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: clamp01(o * 2) })}>
                <div style={{ fontFamily: MONO, fontSize: 50, fontWeight: 700, color: '#FFD28A', background: C.nightDeep, borderRadius: 16, padding: '6px 22px', border: `3px solid ${C.purple}`, marginBottom: 14 }}>{p.code}</div>
                <div style={{ width: 240, height: p.h * clamp01(o), background: p.place === 1 ? C.purple : p.place === 2 ? C.purpleSoft : '#D8D5F6', border: `4px solid ${C.night}`, borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'center', paddingTop: 14, boxSizing: 'border-box', fontFamily: FONT, fontSize: 64, fontWeight: 900, color: p.place === 3 ? C.night : C.white }}>{p.place}º</div>
              </div>
            )
          })}
          <div style={abs(1380, 380, { opacity: fadeIn(frame, tId + 10, 10), width: 420 })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">id: mira um elemento só</Chip></div>
          <Label x={0} y={790} w={1920} op={fadeIn(frame, tSo, 10)} size={40} dark><M color={C.white}>#id</M> &gt; <M color={C.white}>.classe</M> &gt; <M color={C.white}>tag</M></Label>
        </div>
      )}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(0, 40, { width: 1920, display: 'flex', justifyContent: 'center' })}><Chip size={34} color={C.night} border={C.purple}>2. empate (mesmo tipo): vence a última</Chip></div>
          <div style={abs(120, 150)}>
            <EditorTabs tabs={[{ name: 'estilo.css', active: true }]} width={760} height={520}>
              <Code text={'p {\n  color: navy;\n}\n\np {\n  color: green;\n}'} lang="css" fontSize={36} cursor={false} dim={lastOn ? [0, 1, 2].map((l) => ({ line: l, op: 0.35 })) : []} lineHighlights={lastOn ? [4, 5, 6].map((l) => ({ line: l, at: tLast })) : []} />
            </EditorTabs>
            <div style={abs(0, 540, { opacity: fadeIn(frame, tLast, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tLast)})`, transformOrigin: 'left center' })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>vem por último: vence</Chip></div>
          </div>
          <div style={abs(1000, 150, { opacity: fadeIn(frame, tSecond + 20, 10) })}>
            <Preview w={820} h={460} title="Ana Souza"><MiniPage id="b9-last" css={lastOn ? 'p {\n  color: navy;\n}\n\np {\n  color: green;\n}' : 'p {\n  color: navy;\n}'} n={3} zoom={1.6} /></Preview>
          </div>
          <div style={abs(1000, 630, { width: 820, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tLast + 10, 10) })}><Chip size={30} color={C.night} border={C.green}>os parágrafos ficam verdes</Chip></div>
          <Label x={0} y={760} w={1920} op={fadeIn(frame, tName, 10)} size={38} dark>mais específica vence; empate, vence a última</Label>
          <div style={abs(0, 845, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tKeep, 10) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">especificidade: mais detalhes numa aula futura</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
const ERR = [
  { title: 'esqueceu o ponto', bad: 'destaque { color: purple; }', badNote: <>sem ponto, procura a tag <M>{'<destaque>'}</M></>, good: '.destaque { color: purple; }', badHl: [{ text: 'destaque', color: RED_HL }], goodHl: [{ text: '.', color: GREEN_HL, index: 0 }], pv: { bad: 'destaque {\n  color: purple;\n}', good: '.destaque {\n  color: purple;\n}', cls: { p1: 'destaque' } } },
  { title: 'espaço no nome da classe', bad: 'class="foto perfil"', badNote: 'duas classes: foto e perfil', good: 'class="foto-perfil"', lang: 'html', badHl: [{ text: ' ', color: 'rgba(217,83,79,0.9)', index: 11 }], goodHl: [{ text: '-', color: GREEN_HL }], pv: { bad: '.foto-perfil {\n  color: purple;\n}', good: '.foto-perfil {\n  color: purple;\n}', cls: { p1: 'foto perfil' }, clsGood: { p1: 'foto-perfil' } } },
  { title: 'maiúscula e minúscula', bad: '.Destaque { color: purple; }', badNote: <>maiúscula ≠ minúscula (<M>class="destaque"</M>)</>, good: '.destaque { color: purple; }', badHl: [{ text: 'D', color: 'rgba(217,83,79,0.9)' }], goodHl: [{ text: 'd', color: GREEN_HL, index: 1 }], pv: { bad: '.Destaque {\n  color: purple;\n}', good: '.destaque {\n  color: purple;\n}', cls: { p1: 'destaque' } } },
  { title: 'o mesmo id duas vezes', bad: '<section id="contato">...</section>\n<section id="contato">...</section>', badNote: 'id repetido: o menu pode pular para o lugar errado', good: '<section id="contato">...</section>', lang: 'html', badHl: [{ text: 'id="contato"', color: RED_HL }, { text: 'id="contato"', color: RED_HL, occurrence: 1 }], goodHl: [] },
]
export const ErrosScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tNames = s('Para dar nome às classes')
  const tN = [s('Use letras minúsculas'), s('ligue com um tracinho'), s('E evite acento')]
  const tBotao = s('em vez de botão')
  const tErr = s('Agora, os erros mais comuns')
  const tE = [s('O primeiro: esquecer'), s('O segundo: espaço'), s('O terceiro: maiúscula'), s('O quarto: usar o mesmo')]
  const noteAt = [s('procura uma tag chamada'), s('vira duas classes'), s('não acha a classe'), s('O menu pode pular')]
  const goodAt = [s('que não existe'), s('classes, foto e perfil') + 10, s('Para o seletor, são nomes'), s('O menu pode pular') + 30]
  const tSilent = s('E, como você viu')
  const A = 1 - rampF(frame, tErr - 6, tErr + 6)
  const listOn = rampF(frame, tSilent - 6, tSilent + 8)
  const cur = tE.filter((t) => frame >= t - 6).length - 1
  const names = [['minúsculas:', 'destaque'], ['tracinho entre palavras:', 'foto-perfil'], ['sem acento e cedilha:', 'botao']]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(360, 110, { width: 1200, background: C.white, border: `4px solid ${C.purple}`, borderRadius: 26, padding: '28px 44px', boxSizing: 'border-box', boxShadow: '0 14px 30px rgba(38,33,92,0.14)', opacity: fadeIn(frame, tNames, 12) })}>
            <div style={{ fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night, marginBottom: 26 }}>nomes de classe</div>
            {names.map(([t, code], i) => {
              const o = fadeIn(frame, tN[i], 10)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 26, opacity: o, transform: `translateX(${(1 - o) * 30}px)` }}>
                  <div style={{ transform: `scale(${pop(frame, fps, tN[i] + 4)})` }}><Check size={60} /></div>
                  <div style={{ fontFamily: FONT, fontSize: 42, fontWeight: 600, color: C.night }}>{t}</div>
                  <CodeChip text={code} lang="css" fs={42} pad="4px 20px" />
                  {i === 2 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 20, opacity: fadeIn(frame, tBotao, 10) }}>
                      <span style={{ fontFamily: FONT, fontSize: 34, color: '#5F5A86' }}>em vez de</span>
                      <span style={{ fontFamily: MONO, fontSize: 42, fontWeight: 700, color: C.night, textDecoration: 'line-through', textDecorationColor: '#E8B860' }}>botão</span>
                      <Warn size={50} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
      <div style={abs(0, 120, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 60, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tErr, 10) * (1 - fadeIn(frame, tE[0] - 6, 8)) })}>Os erros mais comuns</div>
      {cur >= 0 && listOn < 1 && (() => {
        const e = ERR[cur]
        const t0 = tE[cur]
        const op = fadeIn(frame, t0 - 4, 10) * (1 - listOn)
        const goodOp = fadeIn(frame, goodAt[cur], 10)
        const fs = cur === 3 ? 34 : 42
        const bh = e.bad.split('\n').length * fs * 1.5 + 28
        return (
          <div key={cur} style={{ opacity: op }}>
            <div style={abs(100, 50, { display: 'flex', alignItems: 'center', gap: 20 })}>
              <div style={{ width: 70, height: 70, borderRadius: 18, background: C.purple, border: `4px solid ${C.night}`, color: C.white, fontFamily: FONT, fontSize: 42, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cur + 1}</div>
              <div style={{ fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.night }}>{e.title}</div>
            </div>
            <div style={abs(100, 170, { display: 'flex', alignItems: 'flex-start', gap: 24, opacity: fadeIn(frame, t0 + 10, 10) })}>
              <CodeChip text={e.bad} lang={e.lang || 'css'} fs={fs} highlights={e.badHl.map((h) => ({ ...h, at: t0 + 24 }))} />
              <Cross size={60} />
            </div>
            <div style={abs(100, 170 + bh + 18, { opacity: fadeIn(frame, noteAt[cur], 10) })}><Chip size={30} color={C.night} border={C.red}>{e.badNote}</Chip></div>
            <div style={abs(100, 520, { display: 'flex', alignItems: 'flex-start', gap: 24, opacity: goodOp })}>
              <CodeChip text={e.good} lang={e.lang || 'css'} fs={fs} highlights={e.goodHl.map((h) => ({ ...h, at: goodAt[cur] + 8 }))} />
              <div style={{ transform: `scale(${pop(frame, fps, goodAt[cur] + 6)})` }}><Check size={60} /></div>
            </div>
            {e.pv && (
              <>
                <div style={abs(1240, 170, { opacity: fadeIn(frame, t0 + 16, 10) })}>
                  <Preview w={620} h={340} title="Ana Souza"><MiniPage id={`b10-bad-${cur}`} css={e.pv.bad} n={2} cls={e.pv.cls} zoom={1.4} /></Preview>
                  <div style={abs(620 - 30, -14)}><Cross size={48} /></div>
                </div>
                <div style={abs(1240, 520, { opacity: goodOp })}>
                  <Preview w={620} h={340} title="Ana Souza"><MiniPage id={`b10-good-${cur}`} css={e.pv.good} n={2} cls={e.pv.clsGood || e.pv.cls} zoom={1.4} /></Preview>
                  <div style={abs(620 - 30, -14)}><Check size={48} /></div>
                </div>
              </>
            )}
            {cur === 3 && (
              <div style={abs(1240, 200, { width: 620, opacity: fadeIn(frame, noteAt[3], 10), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 })}>
                <CodeChip text={'<a href="#contato">'} lang="html" fs={36} pad="8px 20px" />
                <div style={{ display: 'flex', gap: 40 }}>
                  {[0, 1].map((i) => <div key={i} style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.night, background: C.white, border: `3px dashed ${C.red}`, borderRadius: 14, padding: '10px 18px' }}>seção {i + 1}?</div>)}
                </div>
              </div>
            )}
          </div>
        )
      })()}
      {listOn > 0 && (
        <div style={abs(0, 330, { width: 1920, display: 'flex', justifyContent: 'center', opacity: listOn, transform: `scale(${0.85 + 0.15 * listOn})` })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: '#FFF4D6', border: '4px solid #E8B860', borderRadius: 26, padding: '22px 40px', fontFamily: FONT, fontSize: 50, fontWeight: 700, color: C.night }}>
            <Warn size={76} />CSS com erro não dá mensagem
            <LessonTag n="1" size={30} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 11
export const Final = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tRecap = s('Vamos recapitular')
  const tI = [s('O seletor de tag pega'), s('A classe entra no HTML'), s('O ái di usa a cerquilha'), s('Para estilo, prefira'), s('A vírgula junta'), s('e o espaço escolhe'), s('Quando duas regras brigam')]
  const tEx = s('Agora é a sua vez')
  const tNext = s('Na próxima aula')
  const tHex = s('hexadecimal, rgb')
  const tBye = s('Até lá')
  const A = 1 - rampF(frame, tNext - 6, tNext + 6)
  const B = rampF(frame, tNext - 6, tNext + 6) * (1 - rampF(frame, tBye - 6, tBye + 6))
  const E = rampF(frame, tBye - 6, tBye + 6)
  const items = [
    <><M>p</M>: todos os parágrafos</>,
    <><M>.destaque</M>: quem tem <M>class="destaque"</M></>,
    <><M>#contato</M>: o único com <M>id="contato"</M></>,
    <>para estilo, prefira classe</>,
    <><M>h1, h2</M>: vírgula = e</>,
    <><M>nav a</M>: espaço = dentro de</>,
    <><M>#id</M> &gt; <M>.classe</M> &gt; <M>tag</M>; empate, vence a última</>,
  ]
  const pulse = frame >= tEx ? 1 + 0.05 * Math.sin((frame - tEx) / 5) : 1
  const sw = [['#1e3a8a', '#1e3a8a'], ['rgb(255, 99, 71)', 'rgb(255, 99, 71)'], ['#FFFFE0', 'lightyellow']]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(120, 36, { fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tRecap, 10) })}>Resumo da aula</div>
          <div style={abs(120, 130, { display: 'flex', flexDirection: 'column', gap: 14 })}>
            {items.map((t, i) => {
              const o = fadeIn(frame, tI[i], 10)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: o, transform: `translateX(${(1 - o) * 40}px)` }}>
                  <div style={{ transform: `scale(${pop(frame, fps, tI[i] + 4)})` }}><Check size={52} /></div>
                  <div style={{ fontFamily: FONT, fontSize: 38, fontWeight: 600, color: C.night }}>{t}</div>
                </div>
              )
            })}
          </div>
          <div style={abs(0, 780, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tEx, 12) })}>
            <div style={{ transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 46, fontWeight: 600, padding: '14px 50px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tEx) / 5)}px ${C.purpleSoft}` }}>Fazer os exercícios</div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 120, { width: 1920, textAlign: 'center' })}>
            <div style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.purple, marginBottom: 14 }}>Próxima aula</div>
            <div style={{ fontFamily: FONT, fontSize: 70, fontWeight: 800, color: C.night }}>Aula 3 — Cores</div>
          </div>
          <div style={abs(0, 380, { width: 1920, display: 'flex', justifyContent: 'center', gap: 50 })}>
            {sw.map(([c, label], i) => {
              const at = tHex + i * 12
              const o = pop(frame, fps, at)
              return (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, opacity: clamp01(o * 2), transform: `scale(${0.6 + 0.4 * o})` }}>
                  <div style={{ width: 220, height: 220, borderRadius: 30, background: c, border: `5px solid ${C.night}`, boxShadow: '0 16px 30px rgba(38,33,92,0.25)' }} />
                  <div style={{ fontFamily: MONO, fontSize: 36, fontWeight: 700, color: C.night, background: C.white, border: `3px solid ${C.purpleSoft}`, borderRadius: 14, padding: '6px 18px' }}>{label}</div>
                </div>
              )
            })}
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

export { interpolate }
