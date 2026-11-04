import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { Background } from '../../components/Background.jsx'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { Cursor } from '../../components/Navigation.jsx'
import { CodeChip, EditorTabs, Preview } from '../../components/CssCode.jsx'
import { MiniPage, PageSel } from '../../components/AnaPage.jsx'
import { LessonTag } from '../n1-a09/ana.jsx'
import { ED, ED_W, ED_H, HEX, Label, PV, PVZ, SaveFlash, Warn, abs, mix, pop, rampF, win } from '../n2-a02/scenes-a.jsx'
import { CSS_A2 } from './scenes-a.jsx'
import { Checker, M, PAL, Picker, Swatch, SwapCode, contrast, hexRgb, hsvHex, lerpHsv, pickerDot, ratioTxt, rgbHsv } from './kit.jsx'

const RED_HL = 'rgba(217,83,79,0.6)'
const GREEN_HL = 'rgba(151,196,89,0.6)'
// rodapé com respiro (estilo-base da prévia) e o e-mail como texto
const FOOT = (id) => `#${id} footer { padding: 6px 14px; margin-top: 12px; }`

// ---------------------------------------------------------------- ferramentas do navegador (genéricas)
const ContextMenu = ({ hi }) => (
  <div style={{ width: 260, background: '#FFFFFF', border: '1px solid #C9C7D6', borderRadius: 10, boxShadow: '0 12px 30px rgba(20,18,40,0.3)', padding: '6px 0', fontFamily: FONT, fontSize: 24, color: '#1D1B2E' }}>
    {['Voltar', 'Recarregar', 'Salvar como...', 'Inspecionar'].map((t, i) => (
      <div key={t} style={{ padding: '8px 20px', background: hi && i === 3 ? '#DCE6FF' : 'transparent', borderTop: i === 3 ? '1px solid #E4E2EE' : 'none', fontWeight: hi && i === 3 ? 700 : 400 }}>{t}</div>
    ))}
  </div>
)
const DevTools = ({ w, h, value, sq, sqGlow, children }) => (
  <div style={{ width: w, height: h, background: '#F7F7FA', border: '2px solid #C9C7D6', borderRadius: 14, overflow: 'hidden', fontFamily: FONT, boxShadow: '0 20px 44px rgba(20,18,40,0.3)', position: 'relative' }}>
    <div style={{ display: 'flex', gap: 4, background: '#E9E8F0', borderBottom: '1px solid #C9C7D6', padding: '8px 10px 0' }}>
      {['Elementos', 'Console', 'Rede'].map((t, i) => <div key={t} style={{ padding: '8px 18px', fontSize: 22, color: i === 0 ? '#1D1B2E' : '#6A6880', background: i === 0 ? '#F7F7FA' : 'transparent', borderRadius: '8px 8px 0 0', fontWeight: i === 0 ? 700 : 400 }}>{t}</div>)}
    </div>
    <div style={{ fontFamily: MONO, fontSize: 22, padding: '12px 16px', borderBottom: '1px solid #DAD8E4', lineHeight: '34px' }}>
      <div style={{ color: '#8A2B7A' }}>{'<header>'}</div>
      <div style={{ background: '#DCE6FF', margin: '0 -16px', padding: '0 16px 0 40px' }}><span style={{ color: '#8A2B7A' }}>{'<h1>'}</span><span style={{ color: '#1D1B2E' }}>Olá, eu sou a Ana</span><span style={{ color: '#8A2B7A' }}>{'</h1>'}</span></div>
      <div style={{ color: '#8A2B7A', paddingLeft: 24 }}>{'<nav>…</nav>'}</div>
      <div style={{ color: '#8A2B7A' }}>{'</header>'}</div>
    </div>
    <div style={{ padding: '10px 16px', fontSize: 22, fontWeight: 700, color: '#4A4860', borderBottom: '1px solid #DAD8E4' }}>Estilos</div>
    <div style={{ fontFamily: MONO, fontSize: 26, padding: '14px 20px', lineHeight: '40px', color: '#1D1B2E' }}>
      <div><span style={{ color: '#8A2B7A' }}>h1, h2</span> {'{'}</div>
      <div style={{ paddingLeft: 30, display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#C0392B' }}>color</span>:&nbsp;
        <span style={{ display: 'inline-block', width: 24, height: 24, backgroundColor: sq, border: '2px solid #8A889C', marginRight: 10, boxShadow: sqGlow ? `0 0 0 ${5 * sqGlow}px rgba(240,160,75,${sqGlow})` : 'none' }} />
        <span style={{ color: '#1A5FB4' }}>{value}</span>;
      </div>
      <div>{'}'}</div>
    </div>
    {children}
  </div>
)

// ---------------------------------------------------------------- Bloco 6
export const EscolherScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tQ = s('Tá, mas ninguém decora')
  const tHow = s('Como a Ana descobre')
  const tHelp = s('O próprio navegador ajuda')
  const tTools = s('Nas ferramentas de desenvolvedor')
  const tRight = s('que abrem com o botão direito')
  const tInsp = s('em inspecionar')
  const tSq = s('toda cor do cê ésse ésse ganha')
  const tClick = s('Clicando nele')
  const tDrag = s('você arrasta até o tom')
  const tCopy = s('e o código aparece pronto')
  const tTip = s('Agora, a dica mais importante')
  const tFew = s('escolha poucas cores')
  const tGood = s('Uma paleta boa')
  const tNeutral = s('mais os neutros')
  const tThree = s('A Ana ficou com três')
  const tCards = [s('o creme, para o fundo'), s('o azul-petróleo, para os títulos'), s('e um coral')]
  const tText = s('E, para o texto comum')
  const tInk = s('cerquilha, três três')
  const tRule = s('Poucas cores, repetidas')
  const B = rampF(frame, tTip - 6, tTip + 8)
  const A = 1 - B
  // seletor: de navy até o azul-petróleo
  const from = rgbHsv(hexRgb('#000080'))
  const to = rgbHsv(hexRgb(PAL.teal))
  const dragK = rampF(frame, tDrag, tDrag + 50)
  const hsv = lerpHsv(from, to, dragK)
  const cur = dragK >= 1 ? PAL.teal : hsvHex(hsv)
  const picking = frame >= tDrag
  const css = CSS_A2 + (picking ? `\n\nh1, h2 {\n  color: ${cur};\n}` : '')
  const devOp = rampF(frame, tInsp + 10, tInsp + 24)
  const pickOp = fadeIn(frame, tClick + 8, 8)
  const menuOp = win(frame, tRight + 14, tInsp + 14, 6)
  // posições (tela inteira)
  const pv = { x: 40, y: 60, w: 1000, h: 800 }
  const dv = { x: 1070, y: 60, w: 820, h: 800 }
  const pk = { x: dv.x + 200, y: dv.y + 408 }
  const PW = 480
  const PSQ = 220
  const sqAt = { x: dv.x + 160, y: dv.y + 335 }
  const dot = pickerDot(hsv, PW, PSQ)
  // cursor: vai ao título, clica com o direito, vai ao "Inspecionar", depois ao quadradinho, depois arrasta
  const h1At = { x: pv.x + 330, y: pv.y + 150 }
  const menuAt = { x: h1At.x + 10, y: h1At.y + 10 }
  const inspAt = { x: menuAt.x + 120, y: menuAt.y + 150 }
  const path = [
    [tRight - 20, h1At], [tRight + 10, h1At], [tInsp, inspAt], [tInsp + 12, inspAt], [tClick - 6, sqAt], [tClick + 10, sqAt],
    [tDrag - 4, { x: pk.x + pickerDot(from, PW, PSQ).x, y: pk.y + pickerDot(from, PW, PSQ).y }], [tCopy + 30, { x: pk.x + dot.x, y: pk.y + dot.y }],
  ]
  let cp = path[0][1]
  for (let i = 0; i < path.length - 1; i++) {
    const [ta, a] = path[i]
    const [tb, b] = path[i + 1]
    if (frame >= ta && frame <= tb) {
      const k = i === path.length - 2 ? 1 : rampF(frame, ta, tb)
      cp = i === path.length - 2 ? { x: pk.x + dot.x, y: pk.y + dot.y } : { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
    } else if (frame > tb) cp = i === path.length - 2 ? { x: pk.x + dot.x, y: pk.y + dot.y } : b
  }
  const press = (t) => (frame >= t && frame < t + 12 ? (frame - t) / 12 : 0)
  const cursorOp = win(frame, tRight - 20, tCopy + 40, 8)
  const cards = [[PAL.cream, 'fundo'], [PAL.teal, 'principal'], [PAL.coral, 'destaque']]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(pv.x, pv.y)}>
            <Preview w={pv.w} h={pv.h}><PageSel id="b6-pv" css={css} zoom={1.2} cls={{ pDest: 'destaque' }} /></Preview>
          </div>
          <div style={abs(menuAt.x, menuAt.y, { opacity: menuOp })}><ContextMenu hi={frame >= tInsp - 4} /></div>
          <div style={abs(dv.x, dv.y, { opacity: devOp, transform: `translateX(${(1 - devOp) * 60}px)` })}>
            <DevTools w={dv.w} h={dv.h} value={picking ? cur : 'navy'} sq={picking ? cur : 'navy'} sqGlow={win(frame, tSq + 10, tClick + 10, 6)} />
          </div>
          <div style={abs(pk.x, pk.y, { opacity: pickOp, transform: `scale(${0.9 + 0.1 * pickOp})`, transformOrigin: 'top left' })}>
            <Picker hsv={hsv} code={cur} w={PW} sq={PSQ} glow={win(frame, tCopy, tTip, 8)} />
          </div>
          <div style={abs(dv.x + 480, dv.y + 312, { opacity: fadeIn(frame, tCopy + 10, 10) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>copie o código</Chip></div>
          <div style={abs(dv.x + 300, dv.y + 316, { opacity: win(frame, tSq, tClick, 8) })}><Chip size={26} color={C.night} bg="#FFF4D6" border="#E8B860">o quadradinho da cor</Chip></div>
          <div style={abs(pv.x + 40, pv.y + pv.h - 90, { opacity: win(frame, tQ, tTools, 10) })}><Chip size={32} color={C.night} bg="#FFF4D6" border="#E8B860">{frame >= tHelp ? 'o próprio navegador ajuda' : frame >= tHow ? 'como descobrir o código?' : 'ninguém decora códigos'}</Chip></div>
          <div style={abs(dv.x + 40, dv.y + 300, { opacity: win(frame, tTools, tInsp + 14, 10), display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>ferramentas de desenvolvedor</Chip><Chip size={30} color={C.night} border={C.purple}>botão direito → Inspecionar</Chip></div>
          {cursorOp > 0 && <Cursor left={cp.x} top={cp.y} press={Math.max(press(tRight + 10), press(tInsp + 6), press(tClick + 4))} size={50} opacity={cursorOp} />}
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 50, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.night })}>escolha <span style={{ color: C.purple }}>poucas cores</span></div>
          <Label x={0} y={140} w={1920} op={fadeIn(frame, tGood, 10)} size={36} dark>2 ou 3 cores + neutros</Label>
          {cards.map(([c, nm], i) => {
            const o = pop(frame, fps, tCards[i])
            return (
              <div key={c} style={abs(110 + i * 360, 260, { opacity: clamp01(o * 2), transform: `scale(${0.6 + 0.4 * o})` })}>
                <Swatch color={c} size={300} h={260} label={c} sub={nm} fs={36} />
              </div>
            )
          })}
          {[0, 1, 2].map((i) => <div key={'slot' + i} style={abs(110 + i * 360 + 15, 260, { width: 300, height: 260, borderRadius: 26, border: '5px dashed #9A97B8', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 40, fontWeight: 800, color: '#9A97B8', opacity: fadeIn(frame, tFew + i * 6, 10) * (1 - fadeIn(frame, tCards[i], 6)) })}>cor {i + 1}</div>)}
          <div style={abs(1200, 250, { width: 4, height: 520, background: '#C9C5EE', borderRadius: 2, opacity: fadeIn(frame, tNeutral, 10) })} />
          <div style={abs(1250, 230, { fontFamily: FONT, fontSize: 34, fontWeight: 800, color: '#5F5A86', opacity: fadeIn(frame, tNeutral, 10) })}>neutros</div>
          <div style={abs(1250, 290, { display: 'flex', gap: 10, opacity: fadeIn(frame, tNeutral + 6, 10) })}>
            {['#ffffff', '#cccccc', '#999999', '#666666', '#000000'].map((c) => <div key={c} style={{ width: 90, height: 50, borderRadius: 10, backgroundColor: c, border: `3px solid ${C.night}` }} />)}
          </div>
          <div style={abs(1250, 350, { fontFamily: FONT, fontSize: 26, fontWeight: 600, color: '#5F5A86', opacity: fadeIn(frame, tNeutral + 6, 10) })}>branco, preto e os cinzas</div>
          {[[PAL.white, 'fundo de caixas', tThree + 20], [PAL.ink, 'texto comum', tInk]].map(([c, nm, at], i) => {
            const o = pop(frame, fps, at)
            return (
              <div key={c} style={abs(1250 + i * 300, 420, { opacity: clamp01(o * 2), transform: `scale(${0.6 + 0.4 * o})` })}>
                <Swatch color={c} size={240} h={170} label={c} sub={nm} fs={32} />
              </div>
            )
          })}
          <div style={abs(1250, 380, { opacity: win(frame, tText, tInk, 6) })}><Chip size={28} color={C.night} border={C.purple}>para o texto: cinza bem escuro</Chip></div>
          <Label x={0} y={790} w={1920} op={fadeIn(frame, tRule, 10)} size={34} border={C.purple}>poucas cores, repetidas com regra: cara de projeto</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
const TextCard = ({ fg, bg, ok, op, mark, w = 400, note }) => (
  <div style={{ width: w, opacity: op, transform: `translateY(${(1 - op) * 16}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
    <div style={{ position: 'relative', width: w, height: 240, borderRadius: 24, backgroundColor: bg, border: `4px solid ${C.night}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 26px rgba(38,33,92,0.18)' }}>
      <span style={{ fontFamily: FONT, fontSize: 52, fontWeight: 700, color: fg }}>Fale comigo</span>
      <div style={abs(w - 44, -26, { transform: `scale(${mark})` })}>{ok ? <Check size={64} /> : <Cross size={64} />}</div>
    </div>
    <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color: C.night }}>{fg} sobre {bg}</div>
    {note && <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: '#5F5A86' }}>{note}</div>}
  </div>
)
export const ContrasteScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tUgly = s('Cor bonita')
  const tCalled = s('Isso se chama contraste')
  const tLight = s('Texto claro em fundo claro')
  const tDark = s('Texto escuro em fundo escuro')
  const tGray = s('E um cinza médio')
  const tWorse = s('e é ainda pior')
  const tRule = s('A regra prática é')
  const tTool = s('Para não depender do olho')
  const tPut = s('Você coloca as duas cores')
  const tSays = s('ele diz se a combinação passa')
  const tBrowser = s('As ferramentas do navegador também')
  const tTest = s('A Ana testou')
  const tCoral = s('o coral dos links')
  const tFail = s('não passou')
  const tTeal = s('O título azul-petróleo passou')
  const B = rampF(frame, tTool - 6, tTool + 8)
  const A = 1 - B
  const cards = [
    ['#ffffe0', '#ffffff', false, tLight, 'claro sobre claro'],
    ['#333333', '#264653', false, tDark, 'escuro sobre escuro'],
    ['#777777', '#888888', false, tGray, 'cinza sobre cinza'],
    [PAL.teal, PAL.cream, true, tRule, 'escuro sobre claro'],
  ]
  const coral = frame >= tCoral
  const fg = coral ? PAL.coral : PAL.teal
  const css = `body {\n  background-color: #fdf6e3;\n}\n\nh1, h2 {\n  color: #264653;\n}\n\n.destaque, nav a {\n  color: #e76f51;\n}`
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 50, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tUgly, 10) })}>{frame >= tCalled ? <>contraste = <span style={{ color: C.purple }}>diferença entre texto e fundo</span></> : 'dá para ler?'}</div>
          <div style={abs(70, 200, { width: 1780, display: 'flex', justifyContent: 'space-between' })}>
            {cards.map(([f, b, ok, at, note]) => <TextCard key={f + b} fg={f} bg={b} ok={ok} op={fadeIn(frame, at, 10)} mark={pop(frame, fps, at + 18)} note={note} />)}
          </div>
          <div style={abs(70 + 2 * (400 + 393 / 3 * 1) - 30, 600, { opacity: fadeIn(frame, tWorse, 10) })}><Chip size={26} color={C.night} bg="#FFF4D6" border="#E8B860">pior para quem enxerga pouco, ou no sol</Chip></div>
          <Label x={0} y={720} w={1920} op={fadeIn(frame, tRule, 10)} size={38} dark>fundo claro, texto escuro (ou o contrário)</Label>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(110, 110, { opacity: fadeIn(frame, tPut - 10, 10) })}>
            <Checker fg={fg} bg={PAL.cream} w={900} result={coral ? fadeIn(frame, tFail, 8) : fadeIn(frame, tSays, 10)} />
          </div>
          <div style={abs(110, 40, { opacity: fadeIn(frame, tTool, 10) })}><Chip size={30} color={C.night} border={C.purple}>verificador: diz se a combinação passa</Chip></div>
          <div style={abs(110, 620, { opacity: fadeIn(frame, tBrowser, 10), display: 'flex', alignItems: 'center', gap: 14 })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">o seletor de cores do navegador também mostra o contraste</Chip></div>
          <div style={abs(1080, 90, { opacity: fadeIn(frame, tTest, 12) })}>
            <Preview w={780} h={500}><PageSel id="b7-pv" css={css} zoom={1.1} cls={{ pDest: 'destaque' }} hl={[{ sel: 'nav a', op: win(frame, tCoral, tTeal, 8), color: '217,83,79', w: 3 }, { sel: 'h1, h2', op: fadeIn(frame, tTeal, 8), color: '151,196,89', w: 3 }]} /></Preview>
          </div>
          <div style={abs(1080, 610, { display: 'flex', flexDirection: 'column', gap: 14 })}>
            {[[PAL.coral, 'links', tFail], [PAL.teal, 'títulos', tTeal]].map(([c, nm, at]) => {
              const pass = contrast(c, PAL.cream) >= 4.5
              return (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, at, 10), background: C.white, border: `3px solid ${pass ? C.green : C.red}`, borderRadius: 16, padding: '6px 18px' }}>
                  {pass ? <Check size={44} /> : <Cross size={44} />}
                  <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: c, border: '2px solid #9A97B8' }} />
                  <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: C.night }}>{nm}:</span>
                  <M color={C.night} style={{ fontSize: 28, fontWeight: 700 }}>{ratioTxt(c, PAL.cream)}</M>
                  <span style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: pass ? '#4E7A1F' : '#B5452C' }}>{pass ? 'passa com folga' : 'não passou'}</span>
                </div>
              )
            })}
          </div>
          <Label x={110} y={760} w={900} op={fadeIn(frame, tTeal + 30, 10)} size={34} dark>fundo claro, texto escuro (ou o contrário)</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
const NAMED = { lightyellow: HEX.lightyellow, navy: HEX.navy, purple: HEX.purple, tomato: HEX.tomato }
export const PaletaScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tFix = s('Para resolver o coral')
  const tDarker = s('escureceu o tom')
  const tGot = s('Ficou cerquilha, bê cinco')
  const tTerra = s('um terracota')
  const tApply = s('Agora, ela aplica a paleta')
  const tBody = s('béquigráund cálor, cerquilha, éfe dê')
  const tP = s('Pê: cálor')
  const tH = s('cálor, o azul-petróleo')
  const tD = s('cálor, o terracota')
  const tFoot = s('E o fúter faz o caminho')
  const tFootBg = s('fundo azul-petróleo')
  const tFp = s('Os parágrafos dele')
  const tWhite = s('ficam com o texto branco')
  const tSame = s('Repare que são as mesmas regras')
  const tVals = s('Só os valores mudaram')
  const tNames = s('Os nomes, nêivi')
  const tSwap = s('E, se um dia')
  const B = rampF(frame, tApply - 6, tApply + 8)
  const A = 1 - B
  // Parte A: o seletor escurece o coral; o verificador recalcula de verdade
  const from = rgbHsv(hexRgb(PAL.coral))
  const to = rgbHsv(hexRgb(PAL.terra))
  const k = rampF(frame, tDarker, tGot)
  const hsv = lerpHsv(from, to, k)
  const cur = k >= 1 ? PAL.terra : hsvHex(hsv)
  // Parte B: o estilo.css, valor por valor
  const swaps = { body: tBody, p: tP + 6, h: tH, d: tD, n: tD + 10 }
  const typedFoot = tFoot + 10
  const typedFp = tFp + 10
  const lines = [
    { sel: 'body' },
    { ind: 1, prop: 'background-color', old: 'lightyellow;', neu: '#fdf6e3;', at: swaps.body },
    { close: 1 }, { t: '' },
    { sel: 'p' },
    { ind: 1, prop: 'color', old: 'navy;', neu: '#333333;', at: swaps.p },
    { close: 1 }, { t: '' },
    { sel: 'h1, h2' },
    { ind: 1, prop: 'color', old: 'navy;', neu: '#264653;', at: swaps.h },
    { close: 1 }, { t: '' },
    { sel: '.destaque' },
    { ind: 1, prop: 'color', old: 'purple;', neu: '#b5452c;', at: swaps.d },
    { close: 1 }, { t: '' },
    { sel: 'nav a' },
    { ind: 1, prop: 'color', old: 'tomato;', neu: '#b5452c;', at: swaps.n },
    { close: 1 }, { t: '', show: typedFoot },
    { sel: 'footer', typedAt: typedFoot, show: typedFoot },
    { ind: 1, prop: 'background-color', neu: '#264653;', typedAt: typedFoot + 18, show: typedFoot + 18 },
    { close: 1, typedAt: typedFoot + 70, show: typedFoot + 18 }, { t: '', show: typedFp },
    { sel: 'footer p', typedAt: typedFp, show: typedFp },
    { ind: 1, prop: 'color', neu: '#ffffff;', typedAt: typedFp + 22, show: typedFp + 22 },
    { close: 1, typedAt: typedFp + 64, show: typedFp + 22 },
  ]
  const val = (old, neu, at) => mix(NAMED[old] || old, neu, rampF(frame, at + 14, at + 30))
  const footBgOn = frame >= typedFoot + 18 + 34 + 16
  const footPOn = frame >= typedFp + 22 + 12 + 16
  const css = [
    `body {\n  background-color: ${val('lightyellow', PAL.cream, swaps.body)};\n}`,
    `p {\n  color: ${val('navy', PAL.ink, swaps.p)};\n}`,
    `h1, h2 {\n  color: ${val('navy', PAL.teal, swaps.h)};\n}`,
    `.destaque {\n  color: ${val('purple', PAL.terra, swaps.d)};\n}`,
    `nav a {\n  color: ${val('tomato', PAL.terra, swaps.n)};\n}`,
    footBgOn ? `footer {\n  background-color: #264653;\n}` : '',
    footPOn ? `footer p {\n  color: #ffffff;\n}` : '',
  ].join('\n\n')
  const scroll = 8 * rampF(frame, tFoot - 10, tFoot + 10)
  const pageScroll = 0
  const edFs = 26
  const fpNote = fadeIn(frame, tFp, 10)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 50, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tFix, 10) })}>escurecendo o coral até passar</div>
          <div style={abs(150, 160, { opacity: fadeIn(frame, tFix + 6, 10) })}><Picker hsv={hsv} code={cur} w={560} sq={360} glow={fadeIn(frame, tGot, 8)} /></div>
          <div style={abs(860, 160, { opacity: fadeIn(frame, tFix + 12, 10) })}><Checker fg={cur} bg={PAL.cream} w={900} sample="Meus projetos" /></div>
          <div style={abs(860, 650, { display: 'flex', alignItems: 'center', gap: 26, opacity: fadeIn(frame, tTerra - 10, 10) })}>
            <Swatch color={PAL.coral} size={110} radius={18} label={PAL.coral} fs={26} />
            <span style={{ fontFamily: FONT, fontSize: 60, fontWeight: 800, color: C.purple }}>→</span>
            <Swatch color={PAL.terra} size={110} radius={18} label={PAL.terra} fs={26} />
            <div style={{ transform: `scale(${0.7 + 0.3 * pop(frame, fps, tTerra)})` }}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>terracota</Chip></div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ED.x, ED.y)}>
            <EditorTabs tabs={[{ name: 'index.html' }, { name: 'estilo.css', active: true }]} width={ED_W} height={ED_H}>
              <SwapCode frame={frame} lines={lines} fs={edFs} scroll={scroll} />
            </EditorTabs>
          </div>
          <div style={abs(PV.x, PV.y)}>
            <Preview w={PV.w} h={PV.h}><PageSel id="b8-pv" css={css} zoom={1.04} cls={{ pDest: 'destaque' }} scroll={pageScroll} extraBase={FOOT('b8-pv')} mailLink={false} hl={[{ sel: 'footer p', op: win(frame, tFp, tWhite + 40, 8), color: '240,160,75' }]} /></Preview>
            {[swaps.body, swaps.p, swaps.h, swaps.d, footBgOn ? typedFoot + 68 : 1e9, footPOn ? typedFp + 50 : 1e9].map((t, i) => <SaveFlash key={i} frame={frame} at={t + 14} />)}
          </div>
          <Label x={PV.x} y={PV.y + PV.h + 24} w={PV.w} op={win(frame, tApply + 10, tFp, 10)} size={30} border={C.purple}>a paleta no <M>estilo.css</M>, um valor por vez</Label>
          <div style={abs(PV.x, PV.y + PV.h + 18, { width: PV.w, opacity: fpNote * (1 - fadeIn(frame, tSame, 8)) })}>
            <Chip size={25} color={C.night} bg="#FFF4D6" border="#E8B860" style={{ textAlign: 'center' }}>o <M>p</M> do rodapé precisa da sua própria regra, senão fica cinza-escuro no fundo escuro</Chip>
          </div>
          <Label x={PV.x} y={PV.y + PV.h + 24} w={PV.w} op={fadeIn(frame, tSame, 10) * (1 - fadeIn(frame, tNames, 8))} size={34} dark>{frame >= tVals ? 'só os valores mudaram' : 'mesmas regras, novos valores'}</Label>
          <Label x={PV.x} y={PV.y + PV.h + 24} w={PV.w} op={fadeIn(frame, tNames, 10) * (1 - fadeIn(frame, tSwap, 8))} size={32} border={C.purple}>saem os nomes, entram os códigos</Label>
          <Label x={PV.x} y={PV.y + PV.h + 24} w={PV.w} op={fadeIn(frame, tSwap, 10)} size={32} dark>outra paleta? troque os códigos</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
const ERR = [
  { title: 'sem a cerquilha', bad: 'background-color: fdf6e3;', good: 'background-color: #fdf6e3;', badHl: [{ text: 'fdf6e3', color: RED_HL }], goodHl: [{ text: '#', color: GREEN_HL }], badNote: 'não é cor: a declaração é ignorada', pv: { bad: 'body {\n  background-color: fdf6e3;\n}', good: 'body {\n  background-color: #fdf6e3;\n}' } },
  { title: 'número errado de dígitos', bad: 'color: #26465;', good: 'color: #264653;', badHl: [{ text: '#26465', color: RED_HL }], goodHl: [{ text: '#264653', color: GREEN_HL }], badNote: '5 dígitos: não funciona', goodNote: '6 ou 3 dígitos', pv: { bad: 'h1, p {\n  color: #26465;\n}', good: 'h1, p {\n  color: #264653;\n}' } },
  { title: 'espaço no meio do código', bad: 'color: #fd f6e3;', good: 'color: #fdf6e3;', badHl: [{ text: ' ', color: 'rgba(217,83,79,0.95)', index: 10 }], goodHl: [{ text: '#fdf6e3', color: GREEN_HL }], badNote: 'o código vai todo junto', pv: { bad: 'body {\n  background-color: #264653;\n}\n\nh1, p {\n  color: #fd f6e3;\n}', good: 'body {\n  background-color: #264653;\n}\n\nh1, p {\n  color: #fdf6e3;\n}' }, pvNote: 'fundo #264653' },
  { title: 'número maior que 255', bad: 'color: rgb(300, 70, 83);', good: 'color: rgb(38, 70, 83);', badHl: [{ text: '300', color: RED_HL }], goodHl: [{ text: '38', color: GREEN_HL }], badNote: 'máximo: 255 (o navegador corta, e sai outra cor)', pv: { bad: 'h1, p {\n  color: rgb(300, 70, 83);\n}', good: 'h1, p {\n  color: rgb(38, 70, 83);\n}' } },
]
export const ErrosScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tErr = s('Agora, os erros mais comuns')
  const tE = [s('O primeiro: esquecer'), s('O segundo: o número'), s('O terceiro: espaço'), s('O quarto é no érre gê bê')]
  const noteAt = [s('não é cor para o navegador'), s('Com cinco, ou com sete'), s('não é uma cor'), s('como trezentos')]
  const goodAt = [s('e a declaração é ignorada') + 20, s('O código réx tem seis'), s('O código vai todo junto'), s('O máximo é duzentos')]
  const tSilent = s('E lembra que o cê ésse ésse')
  const tCheck = s('Se a cor não mudou')
  const tEx = s('Ah, e nos exercícios')
  const listOn = rampF(frame, tSilent - 6, tSilent + 8)
  const cur = tE.filter((t) => frame >= t - 6).length - 1
  return (
    <AbsoluteFill>
      <div style={abs(0, 120, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 60, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tErr, 10) * (1 - fadeIn(frame, tE[0] - 6, 8)) })}>Os erros mais comuns com cores</div>
      {cur >= 0 && listOn < 1 && (() => {
        const e = ERR[cur]
        const t0 = tE[cur]
        const op = fadeIn(frame, t0 - 4, 10) * (1 - listOn)
        const goodOp = fadeIn(frame, goodAt[cur], 10)
        const fs = 42
        return (
          <div key={cur} style={{ opacity: op }}>
            <div style={abs(100, 50, { display: 'flex', alignItems: 'center', gap: 20 })}>
              <div style={{ width: 70, height: 70, borderRadius: 18, background: C.purple, border: `4px solid ${C.night}`, color: C.white, fontFamily: FONT, fontSize: 42, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cur + 1}</div>
              <div style={{ fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.night }}>{e.title}</div>
            </div>
            <div style={abs(100, 190, { display: 'flex', alignItems: 'flex-start', gap: 24, opacity: fadeIn(frame, t0 + 10, 10) })}>
              <CodeChip text={e.bad} fs={fs} highlights={e.badHl.map((h) => ({ ...h, at: t0 + 24 }))} />
              <Cross size={60} />
            </div>
            <div style={abs(100, 310, { opacity: fadeIn(frame, noteAt[cur], 10) })}><Chip size={30} color={C.night} border={C.red}>{e.badNote}</Chip></div>
            <div style={abs(100, 520, { display: 'flex', alignItems: 'flex-start', gap: 24, opacity: goodOp })}>
              <CodeChip text={e.good} fs={fs} highlights={e.goodHl.map((h) => ({ ...h, at: goodAt[cur] + 8 }))} />
              <div style={{ transform: `scale(${pop(frame, fps, goodAt[cur] + 6)})` }}><Check size={60} /></div>
            </div>
            {e.goodNote && <div style={abs(100, 640, { opacity: fadeIn(frame, goodAt[cur] + 10, 10) })}><Chip size={30} color={C.night} border={C.green}>{e.goodNote}</Chip></div>}
            <div style={abs(1240, 170, { opacity: fadeIn(frame, t0 + 16, 10) })}>
              <Preview w={620} h={320} title="Ana Souza"><MiniPage id={`b9-bad-${cur}`} css={e.pv.bad} n={1} zoom={1.4} /></Preview>
              <div style={abs(620 - 30, -14)}><Cross size={48} /></div>
            </div>
            <div style={abs(1240, 520, { opacity: goodOp })}>
              <Preview w={620} h={320} title="Ana Souza"><MiniPage id={`b9-good-${cur}`} css={e.pv.good} n={1} zoom={1.4} /></Preview>
              <div style={abs(620 - 30, -14)}><Check size={48} /></div>
            </div>
            {e.pvNote && <div style={abs(1240, 850, { width: 620, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, t0 + 16, 10) })}><Chip size={22} color={C.night} border={C.purpleSoft}>nas duas prévias: <M>body</M> com fundo <M>#264653</M></Chip></div>}
          </div>
        )
      })()}
      {listOn > 0 && (
        <div style={{ opacity: listOn }}>
          <div style={abs(0, 250, { width: 1920, display: 'flex', justifyContent: 'center', transform: `scale(${0.85 + 0.15 * listOn})` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: '#FFF4D6', border: '4px solid #E8B860', borderRadius: 26, padding: '22px 40px', fontFamily: FONT, fontSize: 50, fontWeight: 700, color: C.night }}>
              <Warn size={76} />CSS com erro não dá mensagem
              <LessonTag n="1" size={30} />
            </div>
          </div>
          <div style={abs(0, 450, { width: 1920, display: 'flex', justifyContent: 'center', gap: 20, opacity: fadeIn(frame, tCheck, 10) })}>
            {['# na frente', '6 ou 3 dígitos', 'sem espaço', 'até 255'].map((t, i) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: fadeIn(frame, tCheck + 6 + i * 6, 8) }}><Check size={44} /><Chip size={30} color={C.night} border={C.purple}>{t}</Chip></div>
            ))}
          </div>
          <Label x={0} y={640} w={1920} op={fadeIn(frame, tEx, 10)} size={36} dark>nos exercícios, escreva o valor exatamente como no enunciado</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
const FONTS = ["'Segoe UI', sans-serif", 'Georgia, serif', "Consolas, monospace", "'Trebuchet MS', sans-serif"]
export const Final = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tRecap = s('Vamos recapitular')
  const tI = [s('As cores entram no cálor'), s('pelo nome em inglês'), s('pelo código réx'), s('ou pelo érre gê bê'), s('O érre gê bê á acrescenta'), s('Para escolher'), s('E sempre confira')]
  const tShort = s('O código curto')
  const tEx = s('Agora é a sua vez')
  const tNext = s('Na próxima aula')
  const tFonts = s('fontes, tamanhos')
  const tBye = s('Até lá')
  const A = 1 - rampF(frame, tNext - 6, tNext + 6)
  const B = rampF(frame, tNext - 6, tNext + 6) * (1 - rampF(frame, tBye - 6, tBye + 6))
  const E = rampF(frame, tBye - 6, tBye + 6)
  const items = [
    <><M>color</M>, <M>background-color</M>, <M>border-color</M></>,
    <>nome: <M>white</M></>,
    <>hex: <M>#ffffff</M> <span style={{ opacity: 0.35 + 0.65 * fadeIn(frame, tShort, 10) }}>(<M>#fff</M>)</span></>,
    <><M>rgb(255, 255, 255)</M>: de 0 a 255</>,
    <><M>rgba(…, 0.5)</M>: transparência</>,
    <>2 ou 3 cores + neutros</>,
    <>contraste: dá para ler?</>,
  ]
  const pulse = frame >= tEx ? 1 + 0.05 * Math.sin((frame - tEx) / 5) : 1
  const fi = Math.max(0, Math.floor((frame - tFonts) / 18)) % FONTS.length
  const size = frame >= tFonts ? [80, 64, 96, 72][Math.max(0, Math.floor((frame - tFonts) / 18)) % 4] : 72
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(120, 36, { fontFamily: FONT, fontSize: 52, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tRecap, 10) })}>Resumo da aula</div>
          <div style={abs(120, 130, { display: 'flex', flexDirection: 'column', gap: 16 })}>
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
          <div style={abs(1340, 160, { display: 'flex', flexDirection: 'column', gap: 18, opacity: fadeIn(frame, tI[5], 10) })}>
            {[PAL.cream, PAL.teal, PAL.terra, PAL.white, PAL.ink].map((c, i) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tI[5] + i * 5, 8) }}>
                <div style={{ width: 90, height: 70, borderRadius: 14, backgroundColor: c, border: `4px solid ${C.night}` }} />
                <M color={C.night} style={{ fontSize: 34, fontWeight: 700 }}>{c}</M>
              </div>
            ))}
          </div>
          <div style={abs(0, 790, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tEx, 12) })}>
            <div style={{ transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 46, fontWeight: 600, padding: '14px 50px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tEx) / 5)}px ${C.purpleSoft}` }}>Fazer os exercícios</div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 120, { width: 1920, textAlign: 'center' })}>
            <div style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, color: C.purple, marginBottom: 14 }}>Próxima aula</div>
            <div style={{ fontFamily: FONT, fontSize: 70, fontWeight: 800, color: C.night }}>Aula 4 — Texto e fontes</div>
          </div>
          <div style={abs(460, 380)}>
            <Preview w={1000} h={380} title="Ana Souza">
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: PAL.cream }}>
                <span style={{ fontFamily: FONTS[fi], fontSize: size, fontWeight: 700, color: PAL.teal }}>Olá, eu sou a Ana</span>
              </div>
            </Preview>
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
