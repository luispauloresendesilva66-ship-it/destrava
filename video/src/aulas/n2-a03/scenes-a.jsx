import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { Check, Chip } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { CodeChip, Preview, scopeCss } from '../../components/CssCode.jsx'
import { PageSel } from '../../components/AnaPage.jsx'
import { LessonTag } from '../n1-a09/ana.jsx'
import { Label, Warn, YEL, abs, cssUpTo, pop, rampF, win } from '../n2-a02/scenes-a.jsx'
import { Bars, LightMix, M, PAL, STRIPES, Swatch, hexRgb } from './kit.jsx'

// O estilo.css da Ana no fim da aula 2 (fundo lightyellow, títulos navy, links do menu tomato).
export const CSS_A2 = cssUpTo('nava')
export const RGBC = ['#E2463B', '#3FA34D', '#3C6FE0']
export const RGB_HL = ['rgba(226,70,59,0.55)', 'rgba(63,163,77,0.55)', 'rgba(60,111,224,0.55)']

// Código de cor grande, letra por letra (para separar os pares e colorir cada um).
export const BigCode = ({ code, fs = 140, split = 0, pairOp = 0, hashOp = 0, hiPair = -1, color = C.night }) => {
  const cw = fs * 0.55
  return (
    <div style={{ position: 'relative', height: fs * 1.3, width: cw * code.length + split * 2 * 40 + 20 }}>
      {[...code].map((ch, i) => {
        const pair = i === 0 ? -1 : Math.floor((i - 1) / 2)
        const x = i * cw + (pair >= 0 ? pair * 40 * split : 0) + (pair >= 0 ? 16 * split : 0)
        return (
          <div key={i} style={abs(x, 0, { width: cw, height: fs * 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: fs, fontWeight: 700, color: pair >= 0 && pairOp > 0.5 ? RGBC[pair] : color })}>{ch}</div>
        )
      })}
      {[0, 1, 2].map((p) => {
        const x = (1 + p * 2) * cw + p * 40 * split + 16 * split
        return <div key={p} style={abs(x - 6, 6, { width: cw * 2 + 12, height: fs * 1.3 - 12, borderRadius: 18, border: `5px solid ${RGBC[p]}`, background: hiPair === p ? RGB_HL[p] : 'transparent', opacity: pairOp })} />
      })}
      <div style={abs(-6, 6, { width: cw + 12, height: fs * 1.3 - 12, borderRadius: 18, border: '5px solid #E8B860', opacity: hashOp })} />
    </div>
  )
}

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tPast = s('Na aula passada')
  const tT = [s('a tag pega todos'), s('a classe usa o ponto'), s('o ái di usa a cerquilha')]
  const tWin = s('vence a mais específica')
  const tNow = s('Até agora, a Ana pintou')
  const tNames = s('nêivi, tomêitou')
  const tN = [tNames, s('tomêitou, pârpou'), s('pârpou, uáit'), s('uáit. Funciona')]
  const tShort = s('Funciona, mas a lista')
  const tExact = s('nem sempre tem o tom exato')
  const tToday = s('Hoje, você vai aprender')
  const tHex = s('o código réx')
  const tRgb = s('e o érre gê bê')
  const tThen = s('Depois, vai ver como escolher')
  const tRead = s('como garantir que o texto')
  const tBye = s('Abre o editor')
  const logoBig = 1 - rampF(frame, tPast - 8, tPast + 4)
  const logoSmall = rampF(frame, tPast, tPast + 14)
  const A = fadeIn(frame, tPast + 6, 12) * (1 - rampF(frame, tNow - 6, tNow + 6))
  const B = rampF(frame, tNow - 6, tNow + 6) * (1 - rampF(frame, tToday - 6, tToday + 6))
  const Cc = rampF(frame, tToday - 6, tToday + 6)
  const cards = [['p', 'tag'], ['.destaque', 'classe'], ['#contato', 'id']]
  const names = [['navy', 'títulos'], ['tomato', 'links do menu'], ['purple', 'o destaque'], ['white', 'o contato']]
  const forms = [['white', 'nome', tToday + 20], ['#ffffff', 'hex', tHex], ['rgb(255, 255, 255)', 'rgb', tRgb]]
  return (
    <AbsoluteFill>
      <div style={abs(0, 0, { width: 1920, height: 880, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: logoBig })}>
        <LogoReveal start={4} height={300} />
      </div>
      <div style={abs(60, 40, { opacity: logoSmall, display: 'flex', alignItems: 'center', gap: 14 })}>
        <LogoMark height={46} keyColor={C.green} />
        <Wordmark size={38} />
      </div>
      {frame >= tPast - 4 && (
        <div style={abs(0, 36, { width: 1920 })}>
          <Title start={tPast} size={58}>Aula 3 — Cores</Title>
        </div>
      )}
      {/* revisão da aula 2 */}
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 150, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.purple })}>na aula 2</div>
          <div style={abs(0, 240, { width: 1920, display: 'flex', justifyContent: 'center', gap: 60 })}>
            {cards.map(([code, name], i) => {
              const o = pop(frame, fps, tPast + 30 + i * 8)
              const lit = win(frame, tT[i], tT[i] + 50, 6)
              return (
                <div key={code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, opacity: clamp01(o * 2), transform: `scale(${(0.6 + 0.4 * o) * (1 + 0.06 * lit)})` }}>
                  <div style={{ minWidth: 340, textAlign: 'center', fontFamily: MONO, fontSize: 76, fontWeight: 700, color: '#FFD28A', background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 22, padding: '18px 34px', boxShadow: '0 16px 36px rgba(27,23,68,0.35)' }}>{code}</div>
                  <div style={{ opacity: fadeIn(frame, tT[i], 8) }}><Chip size={40} color={C.white} bg={C.purple} border={C.night}>{name}</Chip></div>
                </div>
              )
            })}
          </div>
          <Label x={0} y={600} w={1920} op={fadeIn(frame, tWin, 10)} size={44} dark>quem vence: <M color="#FFD28A">#id</M> &gt; <M color="#FFD28A">.classe</M> &gt; <M color="#FFD28A">tag</M></Label>
        </div>
      )}
      {/* a página da Ana na aula 2: nomes de cor */}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(110, 150)}>
            <Preview w={980} h={720}><PageSel id="b1-pv" css={CSS_A2} zoom={1.25} cls={{ pDest: 'destaque' }} /></Preview>
          </div>
          <div style={abs(1160, 170, { fontFamily: FONT, fontSize: 40, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tNow + 6, 10) })}>nomes de cor, em inglês</div>
          <div style={abs(1160, 250, { display: 'flex', flexDirection: 'column', gap: 22 })}>
            {names.map(([n, where], i) => {
              const o = pop(frame, fps, tN[i])
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: clamp01(o * 2), transform: `translateX(${(1 - clamp01(o)) * 40}px)` }}>
                  <div style={{ width: 70, height: 70, borderRadius: 16, backgroundColor: n, border: `4px solid ${C.night}` }} />
                  <CodeChip text={n} fs={40} pad="6px 22px" />
                  <span style={{ fontFamily: FONT, fontSize: 30, fontWeight: 600, color: '#5F5A86' }}>{where}</span>
                </div>
              )
            })}
          </div>
          <div style={abs(1160, 650, { display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tShort, 10) })}>
            <Warn size={50} /><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">{frame >= tExact ? 'nem sempre tem o tom exato' : 'funciona, mas a lista é curta'}</Chip>
          </div>
        </div>
      )}
      {/* hoje: três jeitos de dizer branco */}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(0, 150, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 46, fontWeight: 800, color: C.night })}>
            as outras formas de <span style={{ color: C.purple }}>escrever uma cor</span>
          </div>
          <div style={abs(0, 250, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 70 })}>
            {forms.map(([code, kind, at], i) => {
              const o = pop(frame, fps, at)
              return (
                <div key={code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: clamp01(o * 2), transform: `scale(${0.6 + 0.4 * o})` }}>
                  <div style={{ width: 200, height: 200, borderRadius: 28, backgroundColor: code, border: `5px solid ${C.night}`, boxShadow: '0 16px 30px rgba(38,33,92,0.2)' }} />
                  <CodeChip text={code} fs={44} pad="8px 24px" />
                  <Chip size={30} color={C.white} bg={C.purple} border={C.night}>{kind}</Chip>
                </div>
              )
            })}
          </div>
          <Label x={0} y={640} w={1920} op={fadeIn(frame, tRgb + 20, 10)} size={40} dark>três jeitos de dizer branco</Label>
          <div style={abs(0, 740, { width: 1920, display: 'flex', justifyContent: 'center', gap: 30 })}>
            {[['uma paleta pequena', tThen], ['texto fácil de ler', tRead]].map(([t, at]) => (
              <div key={t} style={{ opacity: fadeIn(frame, at, 10), transform: `translateY(${(1 - fadeIn(frame, at, 10)) * 16}px)` }}><Chip size={32} color={C.night} border={C.purpleSoft}>{t}</Chip></div>
            ))}
            <div style={{ opacity: fadeIn(frame, tBye, 10) }}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>bora destravar</Chip></div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
const SAMPLE_GRID = ['red', 'blue', 'black', 'gray', 'white', 'navy', 'tomato', 'purple', 'green', 'lightyellow']
export const OndeScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tFirst = s('Primeiro, onde uma cor')
  const tTwo = s('Você já conhece duas')
  const tColor = s('Cálor muda a cor do texto')
  const tBg = s('Béquigráund cálor muda')
  const tThird = s('E existe uma terceira')
  const tBorder = s('bórder cálor, a cor da borda')
  const tLine = s('A borda é a linha')
  const tA5 = s('na aula cinco')
  const tSame = s('as três aceitam')
  const tAll = s('Tudo o que você aprender')
  const tName = s('E o jeito mais simples')
  const tCss = s('O cê ésse ésse conhece')
  const tW = [s('Réd é vermelho'), s('blú é azul'), s('bléc é preto'), s('grêi é cinza')]
  const B = rampF(frame, tName - 6, tName + 8)
  const A = 1 - B
  const cA = rampF(frame, tColor, tColor + 14)
  const bA = rampF(frame, tBg, tBg + 14)
  const dA = rampF(frame, tBorder, tBorder + 14)
  const decl = [`  color: navy;`, `  background-color: lightyellow;`, `  border-color: tomato;`]
  const shown = [frame >= tColor, frame >= tBg, frame >= tBorder]
  const code = 'p {\n' + decl.filter((_, i) => shown[i]).join('\n') + (shown[0] ? '\n' : '') + '}'
  // CSS de verdade na prévia (o valor muda aos poucos: navy -> preto no começo é o padrão)
  const css = [
    cA > 0 ? `p {\n  color: navy;\n}` : '',
    bA > 0 ? `p {\n  background-color: lightyellow;\n}` : '',
    dA > 0 ? `p {\n  border-color: tomato;\n}` : '',
  ].join('\n')
  const id = 'b2-box'
  const base = `#${id} { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #fff; font-family: ${FONT}; }
#${id} p { margin: 0; width: 560px; font-size: 40px; font-weight: 600; line-height: 1.3; padding: 30px 36px 30px 80px; border-width: 10px; border-style: ${frame >= tThird ? 'solid' : 'none'}; border-color: #9A97B8; color: #000; background-color: #fff; }`
  const pv = { x: 860, y: 120, w: 960, h: 600 }
  const cx = pv.x + pv.w / 2
  const cy = pv.y + 90 + (pv.h - 90) / 2
  const highlights = [
    { text: 'color: navy;', at: tColor, until: tBg, color: YEL },
    { text: 'background-color: lightyellow;', at: tBg, until: tThird, color: YEL },
    { text: 'border-color: tomato;', at: tBorder, until: tSame, color: YEL },
  ]
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(100, 60, { fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tFirst, 10) })}>onde uma cor pode entrar</div>
          <div style={abs(100, 170, { opacity: fadeIn(frame, tTwo, 10) })}><CodeChip text={code} fs={36} highlights={highlights} /></div>
          <div style={abs(pv.x, pv.y, { opacity: fadeIn(frame, tFirst + 10, 12) })}>
            <Preview w={pv.w} h={pv.h} url="exemplo.html" title="Exemplo">
              <style>{base + '\n' + scopeCss(css, id)}</style>
              <div id={id}><p>Olá, eu sou a Ana e estou aprendendo CSS.</p></div>
            </Preview>
          </div>
          {/* setas: texto, fundo, borda */}
          {[
            ['texto', 'color', tColor, 120, 500, 1136, 470],
            ['fundo', 'background-color', tBg, 120, 620, 1098, 528],
            ['borda', 'border-color', tBorder, 120, 740, 1064, 566],
          ].map(([t, prop, at, x, y, x2, y2]) => (
            <React.Fragment key={t}>
              <div style={abs(x, y, { display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, at + 6, 10) })}>
                <Chip size={32} color={C.white} bg={C.purple} border={C.night}>{t}</Chip>
                <span style={{ fontFamily: FONT, fontSize: 32, fontWeight: 700, color: C.night }}>→</span>
                <span style={{ fontFamily: MONO, fontSize: 34, fontWeight: 700, color: C.purple }}>{prop}</span>
              </div>
              <ArrowLine x1={x + 610} y1={y + 28} x2={x2} y2={y2} p={rampF(frame, at + 10, at + 26) * (1 - rampF(frame, tSame - 6, tSame + 4))} width={5} color="#E8B860" bend={0} />
            </React.Fragment>
          ))}
          <div style={abs(pv.x + pv.w - 330, pv.y + pv.h + 20, { display: 'flex', alignItems: 'center', gap: 12, opacity: fadeIn(frame, tLine, 10) })}>
            <Chip size={28} color={C.night} border={C.purple}>{frame >= tA5 ? 'borda:' : 'a linha em volta da caixa'}</Chip>
            {frame >= tA5 && <LessonTag n="5" size={28} op={fadeIn(frame, tA5, 8)} />}
          </div>
          <Label x={pv.x} y={pv.y + pv.h + 100} w={pv.w} op={fadeIn(frame, tSame, 10)} size={34} dark>{frame >= tAll ? 'texto, fundo e borda: os mesmos valores' : 'os mesmos valores servem para as três'}</Label>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(0, 60, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night })}>pelo <span style={{ color: C.purple }}>nome</span></div>
          <div style={abs(160, 160, { width: 1600, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px 46px' })}>
            {SAMPLE_GRID.map((n, i) => {
              const at = tName + 12 + i * 5
              const o = pop(frame, fps, at)
              const lit = i < 4 && frame >= tW[i]
              return (
                <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: 260, opacity: clamp01(o * 2), transform: `scale(${(0.6 + 0.4 * o) * (lit ? 1.06 : 1)})` }}>
                  <div style={{ width: 170, height: 170, borderRadius: 24, backgroundColor: n, border: `5px solid ${lit ? '#E8B860' : C.night}`, boxShadow: lit ? '0 0 0 6px rgba(232,184,96,0.5), 0 14px 26px rgba(38,33,92,0.2)' : '0 14px 26px rgba(38,33,92,0.2)' }} />
                  <div style={{ fontFamily: MONO, fontSize: 32, fontWeight: 700, color: C.night }}>{n}</div>
                </div>
              )
            })}
          </div>
          {/* traduções */}
          <div style={abs(0, 700, { width: 1920, display: 'flex', justifyContent: 'center', gap: 26 })}>
            {[['red', 'vermelho'], ['blue', 'azul'], ['black', 'preto'], ['gray', 'cinza']].map(([en, pt], i) => (
              <div key={en} style={{ opacity: fadeIn(frame, tW[i], 8), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tW[i])})` }}>
                <Chip size={32} color={C.night} bg="#FFF4D6" border="#E8B860"><M>{en}</M> = {pt}</Chip>
              </div>
            ))}
          </div>
          <Label x={0} y={800} w={1920} op={fadeIn(frame, tCss, 10)} size={36} dark>cerca de 140 nomes, em inglês</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
export const HexScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tLim = s('Os nomes são práticos')
  const tHex = s('existe o código réx')
  const tHash = s('Ele começa com uma cerquilha')
  const tSix = s('e tem seis caracteres')
  const tPairs = s('Esses seis caracteres são três pares')
  const tP = [s('O primeiro par'), s('O segundo, a de verde'), s('O terceiro, a de azul')]
  const tMix = s('Toda cor da tela')
  const tScale = s('Cada par vai de zero zero')
  const tMax = s('até éfe éfe, que é o máximo')
  const tRed = s('Então, cerquilha, éfe éfe')
  const tPure = s('vermelho puro')
  const tBlack = s('Tudo zero é preto')
  const tWhite = s('E tudo éfe')
  const code = frame >= tWhite ? '#ffffff' : frame >= tBlack ? '#000000' : '#ff0000'
  const target = hexRgb(code)
  // luzes: apagadas; acendem uma por par; todas juntas na "mistura"; depois seguem o código
  const lv = (() => {
    if (frame < tP[0]) return [0, 0, 0]
    if (frame < tMix) return [0, 1, 2].map((i) => (frame >= tP[i] ? 255 * rampF(frame, tP[i], tP[i] + 12) : 0))
    if (frame < tScale) return [255, 255, 255]
    if (frame < tRed) {
      const k = rampF(frame, tScale, tScale + 14) * (1 - rampF(frame, tMax, tMax + 14))
      return [255 * (1 - k), 255 * (1 - k), 255 * (1 - k)]
    }
    const k = rampF(frame, frame >= tWhite ? tWhite : frame >= tBlack ? tBlack : tRed, (frame >= tWhite ? tWhite : frame >= tBlack ? tBlack : tRed) + 14)
    const from = frame >= tWhite ? [0, 0, 0] : frame >= tBlack ? [255, 0, 0] : [255, 255, 255]
    return from.map((v, i) => v + (target[i] - v) * k)
  })()
  const split = rampF(frame, tPairs, tPairs + 18)
  const hi = frame >= tMix ? -1 : tP.filter((t) => frame >= t).length - 1
  const sw = frame >= tRed
  const swNote = frame >= tWhite ? 'tudo no máximo = branco' : frame >= tBlack ? 'sem luz = preto' : frame >= tPure ? 'vermelho puro' : ''
  const swAt = frame >= tWhite ? tWhite : frame >= tBlack ? tBlack : tPure
  return (
    <AbsoluteFill>
      <div style={abs(110, 50, { fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tLim, 10) })}>o código <span style={{ color: C.purple }}>hex</span> <span style={{ fontSize: 34, color: '#5F5A86' }}>(hexadecimal)</span></div>
      <div style={abs(110, 210, { opacity: fadeIn(frame, tHex, 10), transform: `scale(${0.8 + 0.2 * pop(frame, fps, tHex)})`, transformOrigin: 'left center' })}>
        <BigCode code={code} fs={140} split={split} pairOp={split} hashOp={win(frame, tHash, tPairs, 8)} hiPair={hi} />
      </div>
      <div style={abs(110, 150, { opacity: win(frame, tHash, tPairs, 8) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">começa com cerquilha</Chip></div>
      <div style={abs(440, 150, { opacity: win(frame, tSix, tPairs, 8) })}><Chip size={30} color={C.night} border={C.purple}>6 caracteres</Chip></div>
      {/* R, G, B debaixo de cada par */}
      {[0, 1, 2].map((p) => {
        const cw = 140 * 0.55
        const x = 110 + (1 + p * 2) * cw + p * 40 * split + 16 * split
        const o = fadeIn(frame, tP[p], 10)
        return (
          <div key={p} style={abs(x, 410, { width: cw * 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: o })}>
            <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 900, color: RGBC[p] }}>{'RGB'[p]}</div>
            <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.night }}>{['vermelho', 'verde', 'azul'][p]}</div>
          </div>
        )
      })}
      {/* escala 00 -> ff */}
      <div style={abs(110, 560, { display: 'flex', alignItems: 'center', gap: 18, opacity: win(frame, tScale, tRed, 10) })}>
        <M color={C.night} style={{ fontSize: 44, fontWeight: 700 }}>00</M>
        <div style={{ width: 380, height: 40, borderRadius: 20, background: 'linear-gradient(to right, #000, #E2463B)', border: `3px solid ${C.night}` }} />
        <M color={C.night} style={{ fontSize: 44, fontWeight: 700 }}>ff</M>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginLeft: 10 }}>
          <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: '#5F5A86' }}>00 = nada</span>
          <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: '#5F5A86', opacity: fadeIn(frame, tMax, 8) }}>ff = o máximo</span>
        </div>
      </div>
      {/* amostra com o código de verdade */}
      <div style={abs(110, 540, { display: 'flex', alignItems: 'center', gap: 30, opacity: fadeIn(frame, tRed, 10) })}>
        {sw && <Swatch color={code} size={180} radius={24} />}
        <div style={{ opacity: swNote ? fadeIn(frame, swAt, 8) : 0, transform: `scale(${0.8 + 0.2 * pop(frame, fps, swAt)})`, transformOrigin: 'left center' }}>
          <Chip size={34} color={C.white} bg={C.purple} border={C.night}>{swNote}</Chip>
        </div>
      </div>
      {/* lanternas */}
      <div style={abs(1080, 130, { opacity: fadeIn(frame, tPairs + 10, 12) })}>
        <LightMix lv={lv} w={740} h={580} r={170} />
      </div>
      <div style={abs(1080, 730, { width: 740, display: 'flex', justifyContent: 'center', opacity: win(frame, tMix, tScale, 10) })}><Chip size={30} color={C.night} border={C.purple}>toda cor da tela: mistura de três luzes</Chip></div>
      <Label x={110} y={800} w={820} op={fadeIn(frame, tPairs + 20, 10)} size={34} dark><M color="#FFD28A">#RRGGBB</M>: vermelho, verde, azul</Label>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
const DIG = '0123456789abcdef'
const PairCode = ({ code, fs = 70 }) => (
  <div style={{ display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: fs, fontWeight: 700, background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 20, padding: '8px 26px', boxShadow: '0 16px 36px rgba(27,23,68,0.35)' }}>
    <span style={{ color: '#FFD28A' }}>#</span>
    {[0, 1, 2].map((p) => <span key={p} style={{ color: ['#FF8A80', '#8FE39A', '#8FB2FF'][p], marginLeft: fs * 0.18 }}>{code.slice(1 + p * 2, 3 + p * 2)}</span>)}
  </div>
)
export const LendoScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tWhy = s('Mas por que tem letra')
  const tDigit = s('cada dígito vai de zero a nove')
  const tLetters = s('continua com as letras')
  const tA = s('O á vale dez')
  const tF = s('e o éfe vale quinze')
  const tNo = s('Você não precisa fazer conta')
  const tLow = s('perto de zero é pouco')
  const tHigh = s('perto de éfe é muito')
  const tLook = s('Olha a cor que a Ana')
  const tLowAll = s('Pouco vermelho')
  const tRes = s('Resultado: um azul-petróleo')
  const tBg = s('Agora, o fundo')
  const tHiAll = s('Tudo alto')
  const tCream = s('um creme')
  const tShort = s('E tem um atalho')
  const tEq = s('Quando cada par tem')
  const tThree = s('dá para escrever só três')
  const tSame = s('é o mesmo que seis éfes')
  const A = 1 - rampF(frame, tLook - 6, tLook + 6)
  const B = rampF(frame, tLook - 6, tLook + 6) * (1 - rampF(frame, tShort - 6, tShort + 6))
  const Cc = rampF(frame, tShort - 6, tShort + 6)
  const cellW = 100
  const rx = 160
  const ry = 300
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(0, 70, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tWhy, 10) })}>por que tem <span style={{ color: C.purple }}>letra</span> no meio?</div>
          <div style={abs(rx, ry, { display: 'flex' })}>
            {[...DIG].map((d, i) => {
              const at = i < 10 ? tDigit + i * 3 : tLetters + 10 + (i - 10) * 4
              const o = fadeIn(frame, at, 8)
              const v = Math.round(20 + i * (225 / 15))
              return (
                <div key={d} style={{ width: cellW, height: 130, boxSizing: 'border-box', border: `3px solid ${C.night}`, marginLeft: i ? -3 : 0, backgroundColor: `rgb(${v}, ${v}, ${v})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 64, fontWeight: 700, color: v > 130 ? C.night : C.white, opacity: o, borderRadius: i === 0 ? '18px 0 0 18px' : i === 15 ? '0 18px 18px 0' : 0, boxShadow: (i === 10 && frame >= tA) || (i === 15 && frame >= tF) ? 'inset 0 0 0 6px #E8B860' : 'none' }}>{d}</div>
              )
            })}
          </div>
          <div style={abs(rx + 10 * (cellW - 3) - 20, ry - 80, { opacity: fadeIn(frame, tA, 8), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tA)})` })}><Chip size={34} color={C.night} bg="#FFF4D6" border="#E8B860"><M>a</M> = 10</Chip></div>
          <div style={abs(rx + 15 * (cellW - 3) - 40, ry - 80, { opacity: fadeIn(frame, tF, 8), transform: `scale(${0.7 + 0.3 * pop(frame, fps, tF)})` })}><Chip size={34} color={C.night} bg="#FFF4D6" border="#E8B860"><M>f</M> = 15</Chip></div>
          <div style={abs(rx + 10 * (cellW - 3), ry + 150, { width: 6 * (cellW - 3), display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tLetters + 10, 10) })}><Chip size={28} color={C.night} border={C.purple}>depois do 9: letras de a até f</Chip></div>
          <div style={abs(rx, ry + 240, { opacity: fadeIn(frame, tLow, 10) })}><Chip size={36} color={C.white} bg={C.night} border={C.night}>← pouco</Chip></div>
          <div style={abs(rx + 16 * (cellW - 3) - 210, ry + 240, { opacity: fadeIn(frame, tHigh, 10) })}><Chip size={36} color={C.night} bg={C.white} border={C.night}>muito →</Chip></div>
          <Label x={0} y={720} w={1920} op={fadeIn(frame, tNo, 10)} size={36} dark>sem conta: perto de 0 é pouco, perto de f é muito</Label>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          {[
            { code: PAL.teal, x: 120, at: tLook + 10, lvAt: tLowAll, note: 'tudo baixo = escuro', noteAt: tRes, what: 'títulos' },
            { code: PAL.cream, x: 1000, at: tBg, lvAt: tHiAll, note: 'tudo alto = claro', noteAt: tCream, what: 'fundo' },
          ].map((c) => {
            const o = fadeIn(frame, c.at, 12)
            return (
              <div key={c.code} style={abs(c.x, 60, { width: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: o, transform: `translateY(${(1 - o) * 20}px)` })}>
                <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: C.purple }}>{c.what}</div>
                <PairCode code={c.code} fs={70} />
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 50 }}>
                  <Bars lv={hexRgb(c.code)} p={rampF(frame, c.lvAt, c.lvAt + 24)} w={84} h={250} />
                  <Swatch color={c.code} size={250} radius={28} op={fadeIn(frame, c.noteAt - 10, 10)} />
                </div>
                <div style={{ opacity: fadeIn(frame, c.noteAt, 10), transform: `scale(${0.7 + 0.3 * pop(frame, fps, c.noteAt)})` }}><Chip size={36} color={C.white} bg={C.purple} border={C.night}>{c.note}</Chip></div>
              </div>
            )
          })}
        </div>
      )}
      {Cc > 0 && (
        <div style={{ opacity: Cc }}>
          <div style={abs(0, 70, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 50, fontWeight: 800, color: C.night })}>o atalho: <span style={{ color: C.purple }}>3 dígitos</span></div>
          {[['#fff', '#ffffff', tThree, 'branco'], ['#f00', '#ff0000', tThree + 45, 'vermelho']].map(([short, long, at, nm], i) => {
            const y = 200 + i * 270
            const d = rampF(frame, at + 8, at + 26)
            return (
              <div key={short} style={abs(200, y, { display: 'flex', alignItems: 'center', gap: 40, opacity: fadeIn(frame, at - 6, 10) })}>
                <Swatch color={short} size={150} radius={22} />
                <div style={{ display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 80, fontWeight: 700, background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 18, padding: '10px 30px' }}>
                  <span style={{ color: '#FFD28A' }}>#</span>
                  {[0, 1, 2].map((p) => <span key={p} style={{ color: ['#FF8A80', '#8FE39A', '#8FB2FF'][p], marginLeft: 12 }}>{short[1 + p]}</span>)}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 70, fontWeight: 800, color: C.purple, opacity: d }}>→</div>
                <div style={{ opacity: d, transform: `translateX(${(1 - d) * -30}px)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', fontFamily: MONO, fontSize: 80, fontWeight: 700, background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 18, padding: '10px 30px' }}>
                    <span style={{ color: '#FFD28A' }}>#</span>
                    {[0, 1, 2].map((p) => <span key={p} style={{ color: ['#FF8A80', '#8FE39A', '#8FB2FF'][p], marginLeft: 12 }}>{long.slice(1 + p * 2, 3 + p * 2)}</span>)}
                  </div>
                </div>
                <span style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, color: '#5F5A86', opacity: d }}>{nm}</span>
              </div>
            )
          })}
          <div style={abs(200, 150, { opacity: win(frame, tEq, tThree + 10, 10) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">os dois dígitos de cada par iguais?</Chip></div>
          <Label x={0} y={730} w={1920} op={fadeIn(frame, tSame, 10)} size={36} dark>3 dígitos: cada um vale dobrado</Label>
          <div style={abs(0, 820, { width: 1920, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tSame + 30, 10) })}><Chip size={30} color={C.night} border={C.purple}>maiúscula ou minúscula, tanto faz: <M>#FDF6E3</M> = <M>#fdf6e3</M></Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
const Slider = ({ label, color, v, max = 255, w = 640, fmt = (x) => Math.round(x), track }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
    <div style={{ width: 50, fontFamily: FONT, fontSize: 44, fontWeight: 900, color }}>{label}</div>
    <div style={{ position: 'relative', width: w, height: 34, borderRadius: 17, background: track || `linear-gradient(to right, #000, ${color})`, border: `3px solid ${C.night}` }}>
      <div style={abs((v / max) * (w - 6) - 18, -10, { width: 36, height: 50, borderRadius: 12, background: C.white, border: `4px solid ${C.night}`, boxSizing: 'border-box' })} />
    </div>
    <div style={{ width: 110, fontFamily: MONO, fontSize: 44, fontWeight: 700, color: C.night, textAlign: 'right' }}>{fmt(v)}</div>
  </div>
)
const RgbText = ({ nums, fs = 110, fn = 'rgb', hiParen = false, hiAlpha = false, hiDot = false, numsOp = 1 }) => {
  const sep = <span style={{ color: '#C9C5EE' }}>, </span>
  const paren = (c) => <span style={{ color: '#FFD28A', background: hiParen ? 'rgba(255,210,138,0.3)' : 'transparent', borderRadius: 10 }}>{c}</span>
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', fontFamily: MONO, fontSize: fs, fontWeight: 700, background: C.nightDeep, border: `3px solid ${C.purple}`, borderRadius: 24, padding: '10px 34px', boxShadow: '0 16px 36px rgba(27,23,68,0.35)', whiteSpace: 'pre' }}>
      <span style={{ color: '#B7B1F5' }}>{fn}</span>{paren('(')}
      <span style={{ opacity: numsOp }}>
        {nums.slice(0, 3).map((n, i) => <React.Fragment key={i}>{i ? sep : null}<span style={{ color: ['#FF8A80', '#8FE39A', '#8FB2FF'][i] }}>{n}</span></React.Fragment>)}
        {nums.length > 3 && <>{sep}<span style={{ color: C.white, background: hiAlpha ? 'rgba(255,210,138,0.35)' : 'transparent', borderRadius: 10 }}>{String(nums[3]).split('.').map((p, i, a) => <React.Fragment key={i}>{p}{i < a.length - 1 && <span style={{ background: hiDot ? '#E8B860' : 'transparent', color: hiDot ? C.night : C.white, borderRadius: 6 }}>.</span>}</React.Fragment>)}</span></>}
      </span>
      {paren(')')}
    </div>
  )
}
export const RgbScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tThird = s('A terceira forma')
  const tInit = s('As letras são as iniciais')
  const tWrite = s('Você escreve érre gê bê')
  const tOpen = s('abre parênteses')
  const tClose = s('e fecha parênteses')
  const tRange = s('Cada número vai de zero')
  const tZero = s('Zero é nada')
  const tMax = s('o equivalente ao éfe éfe')
  const tTeal = s('O azul-petróleo da Ana')
  const tNums = s('trinta e oito, setenta')
  const tSame = s('É exatamente a mesma cor')
  const tOther = s('só escrita de outro jeito')
  const tPrima = s('E existe uma prima')
  const tAlpha = s('O á é de alfa')
  const tFourth = s('um quarto número')
  const tInv = s('Zero é invisível')
  const tFull = s('um é a cor inteira')
  const tHalf = s('e zero vírgula cinco')
  const tJust = s('Por enquanto, é só')
  const B = rampF(frame, tPrima - 6, tPrima + 8)
  const A = 1 - B
  const target = [38, 70, 83]
  const sweep = rampF(frame, tRange, tRange + 30)
  const toT = rampF(frame, tNums, tNums + 30)
  const vals = target.map((t) => (frame < tNums ? 255 * sweep : 255 + (t - 255) * toT))
  const shownNums = frame >= tNums ? target : ['38', '70', '83']
  const alpha = frame >= tHalf ? 0.5 : frame >= tFull ? 1 : frame >= tInv ? 0 : 0.5
  const alphaAt = frame >= tHalf ? tHalf : frame >= tFull ? tFull : tInv
  const alphaShown = frame >= tInv ? alpha : 0.5
  const alphaV = [[tInv, 0], [tFull, 1], [tHalf, 0.5]].reduce((v, [t, a]) => v + (a - v) * rampF(frame, t, t + 14), 0.5)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(110, 50, { fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.night, opacity: fadeIn(frame, tThird, 10) })}>a terceira forma: <span style={{ color: C.purple }}>rgb</span></div>
          <div style={abs(110, 150, { opacity: fadeIn(frame, tWrite - 20, 10), transform: `scale(${0.85 + 0.15 * pop(frame, fps, tWrite - 20)})`, transformOrigin: 'left center' })}>
            <RgbText nums={shownNums} fs={100} hiParen={frame >= tOpen && frame < tRange} numsOp={fadeIn(frame, tWrite + 20, 10)} />
          </div>
          <div style={abs(110, 330, { opacity: fadeIn(frame, tInit, 10) * (1 - fadeIn(frame, tOpen, 8)), display: 'flex', gap: 14 })}>
            <Chip size={30} color={C.white} bg="#E2463B" border={C.night}>R = vermelho</Chip>
            <Chip size={30} color={C.white} bg="#3FA34D" border={C.night}>G = verde</Chip>
            <Chip size={30} color={C.white} bg="#3C6FE0" border={C.night}>B = azul</Chip>
          </div>
          <div style={abs(110, 330, { opacity: fadeIn(frame, tOpen, 10) * (1 - fadeIn(frame, tRange, 8)) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">{frame >= tClose ? 'abre e fecha parênteses' : 'abre parênteses, três números separados por vírgula'}</Chip></div>
          {/* sliders de 0 a 255 */}
          <div style={abs(110, 420, { display: 'flex', flexDirection: 'column', gap: 30, opacity: fadeIn(frame, tRange, 10) })}>
            {[0, 1, 2].map((i) => <Slider key={i} label={'RGB'[i]} color={RGBC[i]} v={vals[i]} />)}
          </div>
          <div style={abs(110 + 72 + 640 - 200, 360, { opacity: fadeIn(frame, tZero, 10) * (1 - fadeIn(frame, tTeal, 8)) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">{frame >= tMax ? <>255 = <M>ff</M>, o máximo</> : '0 = nada · 255 = máximo'}</Chip></div>
          {/* mesma cor, duas escritas */}
          <div style={abs(1120, 140, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, opacity: fadeIn(frame, tNums + 20, 12) })}>
            <Swatch color="rgb(38, 70, 83)" size={230} label="rgb(38, 70, 83)" fs={34} />
          </div>
          <div style={abs(1520, 140, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, opacity: fadeIn(frame, tSame, 12) })}>
            <Swatch color={PAL.teal} size={230} label={PAL.teal} fs={34} />
          </div>
          <div style={abs(1418, 205, { opacity: fadeIn(frame, tSame + 6, 10), fontFamily: FONT, fontSize: 80, fontWeight: 900, color: C.purple })}>⇄</div>
          <div style={abs(1120, 470, { width: 650, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tOther, 10) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>mesma cor, outra escrita</Chip></div>
          <div style={abs(1120, 560, { width: 650, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tTeal, 10) })}><Chip size={30} color={C.night} border={C.purple}>o azul-petróleo da Ana</Chip></div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(110, 50, { fontFamily: FONT, fontSize: 48, fontWeight: 800, color: C.night })}>a prima: <span style={{ color: C.purple }}>rgba</span></div>
          <div style={abs(110, 150)}>
            <RgbText fn="rgba" nums={[38, 70, 83, alphaShown]} fs={72} hiAlpha={frame >= tAlpha && Math.floor((frame - tAlpha) / 8) % 2 === 0 && frame < tAlpha + 64} hiDot={frame >= tHalf + 24} />
          </div>
          <div style={abs(110, 320, { opacity: fadeIn(frame, tAlpha, 10) })}><Chip size={32} color={C.night} bg="#FFF4D6" border="#E8B860">alfa: 0 = invisível, 1 = inteira</Chip></div>
          <div style={abs(110, 420, { opacity: fadeIn(frame, tFourth, 10) })}>
            <Slider label="a" color={C.purple} v={alphaV} max={1} fmt={(x) => String(x)} track={`linear-gradient(to right, rgba(38,70,83,0), rgba(38,70,83,1)), ${STRIPES}`} />
          </div>
          <div style={abs(110, 540, { opacity: fadeIn(frame, tHalf + 24, 10), display: 'flex', alignItems: 'center', gap: 14 })}><Warn size={46} /><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">no CSS, ponto em vez de vírgula: <M>0.5</M></Chip></div>
          {/* a amostra sobre o fundo listrado: CSS de verdade com a transparência */}
          <div style={abs(1120, 130, { width: 640, height: 560, borderRadius: 28, background: STRIPES, border: `4px solid ${C.night}`, overflow: 'hidden', boxShadow: '0 16px 30px rgba(38,33,92,0.22)' }, )}>
            <div style={abs(110, 100, { width: 420, height: 360, borderRadius: 24, backgroundColor: `rgba(38, 70, 83, ${alphaV.toFixed(3)})`, border: '4px dashed rgba(255,255,255,0.6)' })} />
          </div>
          <div style={abs(1120, 720, { width: 640, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tInv, 8) })}>
            <Chip size={32} color={C.night} border={C.purple}>{frame >= tHalf ? 'metade: as listras aparecem' : frame >= tFull ? '1: a cor inteira' : '0: invisível'}</Chip>
          </div>
          <Label x={110} y={680} w={880} op={fadeIn(frame, tJust, 10)} size={32} dark>por enquanto: só para reconhecer</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

export { Check }
