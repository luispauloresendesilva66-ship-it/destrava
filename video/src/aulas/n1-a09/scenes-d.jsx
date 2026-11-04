import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { Background } from '../../components/Background.jsx'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { CodeTyping } from '../../components/CodeTyping.jsx'
import { Check, Chip, Confetti } from '../../components/Marks.jsx'
import { House } from '../../components/Diagram.jsx'
import { Label, MouseAt, abs, rampF, win } from '../n1-a08/scenes-a.jsx'
import { APP, AnaSite, AppButton, AppFrame, Certificate, Flag, LevelMap, Palette, Phone, SitePreview, Seal } from './ana.jsx'

const pop = (frame, fps, t) => spring({ frame: frame - t, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } })
const NAME_WARNING = 'Este nome vai no seu certificado e não poderá ser alterado depois.'

// ---------------------------------------------------------------- Bloco 13
export const Prova = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tStart = s('Agora, falta um passo')
  const tMap = s('vai no mapa de níveis')
  const tClick = s('clica em fazer a prova')
  const tName = s('Antes de começar, o app pede')
  const tCap = s('Capricha')
  const tDraw = s('A prova sorteia perguntas')
  const tCode = s('sempre tem pelo menos uma pergunta de código')
  const tPass = s('Para passar')
  const tWhy = s('Parece muito')
  const tFail = s('Se não der dessa vez')
  const tReview = s('O app mostra os assuntos')
  const tCert = s('E, quando passar')
  const tQR = s('com um QR Code')
  const levels = ['Primeiro Commit', 'Nível 2', 'Nível 3', 'Nível 4', 'Nível 5']
  const screen = frame < tName ? 0 : frame < tDraw ? 1 : 2
  const certOn = rampF(frame, tCert - 4, tCert + 12)
  const appOp = 1 - certOn
  const click = tClick + 14
  const nameTyped = 'Ana Souza'.slice(0, Math.floor(9 * rampF(frame, tName + 30, tName + 60)))
  const gauge = 90 * (1 - Math.pow(1 - rampF(frame, tPass + 10, tPass + 60), 3))
  const slide = rampF(frame, tReview + 30, tReview + 50)
  const scan = rampF(frame, tQR + 30, tQR + 55)
  const valid = pop(frame, fps, tQR + 58)
  const qBar = rampF(frame, tDraw, tCode + 10)
  return (
    <AbsoluteFill>
      {appOp > 0 && (
        <div style={{ opacity: appOp }}>
          <div style={abs(60, 40, { opacity: fadeIn(frame, tStart, 12) })}>
            <AppFrame w={1060} h={820}>
              {screen === 0 && (
                <div style={{ position: 'relative' }}>
                  <LevelMap levels={levels} btnGlow={frame >= tMap ? 0.6 + 0.4 * Math.sin(frame / 5) : 0} btnScale={frame >= tMap ? 1 + 0.03 * Math.sin(frame / 5) : 1} />
                  <div style={abs(250, 230)}><MouseAt frame={frame} x={0} y={0} arrive={click - 2} click={click} leave={click + 30} from={[300, 160]} /></div>
                </div>
              )}
              {screen === 1 && (
                <div style={{ opacity: fadeIn(frame, tName, 10) }}>
                  <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 22 }}>Prova do nível</div>
                  <div style={{ background: C.white, border: `1px solid ${APP.border}`, borderRadius: 20, padding: 30, boxShadow: '0 10px 26px rgba(38,33,92,0.10)' }}>
                    <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Nome completo</div>
                    <div style={{ height: 64, border: `2px solid ${frame >= tName + 24 ? C.purple : APP.border}`, borderRadius: 14, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 30, boxShadow: frame >= tName + 24 ? '0 0 0 4px #DCD9FB' : 'none' }}>
                      {nameTyped}<span style={{ display: 'inline-block', width: 3, height: 34, background: Math.floor(frame / 15) % 2 ? 'transparent' : C.night, marginLeft: 2 }} />
                    </div>
                    <div style={{ marginTop: 20, background: '#FFF6DD', border: '2px solid #F5BE3C', borderRadius: 14, padding: '14px 18px', fontSize: 26, color: '#5C3F00', opacity: fadeIn(frame, tName + 14, 10), boxShadow: frame >= tCap ? `0 0 ${18 + 8 * Math.sin(frame / 5)}px #F5BE3C` : 'none' }}>{NAME_WARNING}</div>
                    <div style={{ marginTop: 22 }}><AppButton fs={26}>Começar prova</AppButton></div>
                  </div>
                </div>
              )}
              {screen === 2 && (
                <div style={{ opacity: fadeIn(frame, tDraw, 10) }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: APP.muted }}>Pergunta 4 de 10</div>
                  <div style={{ height: 14, borderRadius: 7, background: '#E6E4F3', overflow: 'hidden', margin: '12px 0 22px' }}><div style={{ width: `${30 + 10 * qBar}%`, height: '100%', background: APP.grad }} /></div>
                  <div style={{ background: C.white, border: `1px solid ${APP.border}`, borderRadius: 20, padding: 28, boxShadow: '0 10px 26px rgba(38,33,92,0.10)' }}>
                    <div style={{ fontSize: 30, fontWeight: 700, marginBottom: 18 }}>Escreva um link para a seção de contato da página.</div>
                    <div style={{ background: C.nightDeep, borderRadius: 14, padding: '18px 22px', minHeight: 130 }}>
                      <CodeTyping segments={[{ text: '<a href="#contato">Fale comigo</a>', start: tCode - 10, frames: 30 }]} fontSize={30} lineNumbers={false} />
                    </div>
                    <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end' }}><AppButton fs={24}>Próxima</AppButton></div>
                  </div>
                </div>
              )}
            </AppFrame>
          </div>
          <div style={abs(1170, 60, { opacity: win(frame, tMap, tName, 12), width: 700 })}><Chip size={32} color={C.night} border={C.purple}>mapa de níveis → <b>Fazer a prova</b></Chip></div>
          <div style={abs(1170, 60, { opacity: win(frame, tName, tDraw, 12), width: 700 })}><Chip size={32} color={C.night} border={C.purple}>antes: o seu nome completo</Chip></div>
          <div style={abs(1170, 160, { opacity: win(frame, tCap, tDraw, 12), width: 700 })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">capricha: vai no certificado</Chip></div>
          <div style={abs(1170, 60, { opacity: win(frame, tDraw, tPass, 12) })}><Chip size={30} color={C.night} border={C.purple}>perguntas sorteadas das 9 aulas</Chip></div>
          <Label x={1170} y={160} w={700} op={win(frame, tCode, tPass, 12)} dark size={32}>pelo menos uma de código</Label>
          {/* medidor */}
          <div style={abs(1250, 160, { opacity: win(frame, tPass, tFail, 12) })}>
            <svg width="520" height="520" viewBox="0 0 520 520">
              <circle cx="260" cy="260" r="200" fill={C.white} stroke="#E6E4F3" strokeWidth="40" />
              <circle cx="260" cy="260" r="200" fill="none" stroke={gauge >= 89.5 ? C.green : '#8B6CFF'} strokeWidth="40" strokeLinecap="round" strokeDasharray={`${(2 * Math.PI * 200 * gauge) / 100} 2000`} transform="rotate(-90 260 260)" />
              <text x="260" y="285" textAnchor="middle" fontFamily={FONT} fontSize="110" fontWeight="800" fill={C.night}>{Math.round(gauge)}%</text>
            </svg>
            <div style={abs(0, 540, { width: 520, display: 'flex', justifyContent: 'center', opacity: fadeIn(frame, tPass + 60, 10) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>nota mínima</Chip></div>
          </div>
          <div style={abs(1170, 60, { opacity: win(frame, tWhy, tFail, 12), width: 700 })}><Chip size={28} color={C.night} border={C.purpleSoft}>avança quem aprendeu de verdade</Chip></div>
          {/* assuntos para revisar */}
          <div style={abs(1180 + 420 * slide, 240, { opacity: win(frame, tFail, tCert, 12) * (1 - 0.5 * slide), width: 640, background: C.white, borderRadius: 20, border: `1px solid ${APP.border}`, boxShadow: '0 16px 36px rgba(38,33,92,0.2)', padding: '24px 28px', fontFamily: FONT, transform: `rotate(${4 * slide}deg)`, boxSizing: 'border-box' })}>
            <div style={{ fontSize: 30, fontWeight: 800, color: C.night }}>Assuntos para revisar</div>
            {['Tabelas — Aula 6', 'Formulários — Aula 7'].map((t) => <div key={t} style={{ fontSize: 26, color: C.purple, marginTop: 12, textDecoration: 'underline' }}>{t}</div>)}
            <div style={{ fontSize: 22, color: APP.muted, marginTop: 14 }}>Você já pode tentar de novo.</div>
          </div>
          <Label x={1170} y={700} w={700} op={win(frame, tReview, tCert, 12)} size={30} border={C.purple}>não passou? revisa e tenta de novo</Label>
        </div>
      )}
      {certOn > 0 && (
        <div style={{ opacity: certOn }}>
          <div style={abs(80, 120, { transform: `scale(${0.9 + 0.1 * certOn})`, transformOrigin: 'left top' })}><Certificate w={1060} nameGlow={win(frame, tCert + 10, tQR, 10)} qrGlow={frame >= tQR + 58 ? 1 : 0} /></div>
          <div style={abs(1290, 120 + 40 * Math.sin(Math.PI * rampF(frame, tQR, tQR + 30)), { opacity: fadeIn(frame, tQR, 12) })}>
            <Phone w={300} h={560}>
              {frame < tQR + 58 ? (
                <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 200, height: 200, border: '4px solid #3EC5FF', borderRadius: 16, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 6, right: 6, top: 10 + 170 * scan, height: 5, background: '#3EC5FF', boxShadow: '0 0 16px #3EC5FF' }} />
                  </div>
                </div>
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 20, textAlign: 'center' }}>
                  <div style={{ transform: `scale(${valid})` }}><Check size={110} /></div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: '#3B6413' }}>Certificado válido</div>
                  <div style={{ fontSize: 22, color: APP.muted }}>Ana Souza<br />Primeiro Commit</div>
                </div>
              )}
            </Phone>
          </div>
          <div style={abs(80, 50, { opacity: fadeIn(frame, tCert, 12) })}><Chip size={32} color={C.night} border={C.purple}>passou? o certificado do nível é seu</Chip></div>
          <Label x={80} y={720} w={1060} op={fadeIn(frame, tQR + 10, 12)} dark size={32}>qualquer pessoa confere pelo QR Code</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 14
export const Final = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tLook = s('Para, respira')
  const tDone = [s('você planejou'), s('construiu, revisou'), s('revisou e salvou'), s('salvou um site')]
  const tFirst = s('Esse é o seu primeiro site')
  const tEx = s('Os exercícios desta aula')
  const tMini = s('o último deles é um mini projeto')
  const tExam = s('Depois, é a prova')
  const tNext = s('E, no próximo nível')
  const tHouse = s('Lembra da casa?')
  const tFinish = s('Agora vem o acabamento')
  const tCongr = s('Parabéns por chegar')
  const tBye = s('Até o próximo nível')
  const A = 1 - rampF(frame, tNext - 4, tNext + 10)
  const B = rampF(frame, tNext - 4, tNext + 10) * (1 - rampF(frame, tBye - 6, tBye + 6))
  const E = rampF(frame, tBye - 6, tBye + 6)
  const seal = pop(frame, fps, tFirst)
  const pulse = frame >= tEx ? 1 + 0.05 * Math.sin((frame - tEx) / 5) : 1
  const heights = [200, 250, 300, 350, 400]
  const paint = rampF(frame, tNext + 60, tNext + 110)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(120, 40, { opacity: fadeIn(frame, tLook, 12) })}>
            <SitePreview w={760} h={820} p={interpolate(frame, [tLook + 10, tNext - 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
              <AnaSite fs={18} upTo={10} />
            </SitePreview>
          </div>
          <div style={abs(1040, 60, { opacity: clamp01(seal * 2), transform: `scale(${0.4 + 0.6 * seal}) rotate(-4deg)` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.purple, border: `5px solid ${C.night}`, borderRadius: 999, padding: '10px 28px 10px 12px', boxShadow: '0 14px 30px rgba(38,33,92,0.3)' }}>
              <Seal size={74} />
              <span style={{ fontFamily: FONT, fontSize: 38, fontWeight: 800, color: C.white }}>Meu primeiro site</span>
            </div>
          </div>
          <Confetti start={tFirst} x0={100} spread={1700} count={60} />
          <div style={abs(1040, 200, { display: 'flex', flexDirection: 'column', gap: 18 })}>
            {['planejei', 'construí', 'revisei', 'salvei'].map((t, i) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: fadeIn(frame, tDone[i], 10), transform: `translateX(${(1 - fadeIn(frame, tDone[i], 10)) * 40}px)` }}>
                <Check size={56} />
                <span style={{ fontFamily: FONT, fontSize: 44, fontWeight: 700, color: C.night }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={abs(1040, 560, { opacity: fadeIn(frame, tEx, 12) })}>
            <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 46, fontWeight: 600, padding: '14px 50px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tEx) / 5)}px ${C.purpleSoft}` }}>Fazer os exercícios</div>
            <div style={{ marginTop: 20, opacity: fadeIn(frame, tMini, 12) }}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">mini projeto final no último exercício</Chip></div>
            <div style={{ marginTop: 16, opacity: fadeIn(frame, tExam, 12) }}><Chip size={30} color={C.night} border={C.purple}>depois: a prova do nível</Chip></div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(70, 830 - 400, { width: 900, height: 400, display: 'flex', alignItems: 'flex-end', gap: 12 })}>
            {block.levels.map((name, i) => {
              const p = spring({ frame: frame - (tNext + i * 6), fps, config: { damping: 16, stiffness: 120 } })
              const glow = i === 1 ? 0.6 + 0.4 * Math.sin(frame / 6) : 0
              return (
                <div key={name} style={{ flex: 1, height: heights[i] * clamp01(p), background: i === 0 ? C.purple : i === 1 ? '#CDEFFF' : '#D8D5F6', border: `4px solid ${i === 0 ? C.night : i === 1 ? '#2E9BFF' : C.purpleSoft}`, borderRadius: '16px 16px 0 0', boxShadow: i === 1 ? `0 0 ${40 * glow}px #3EC5FF` : i === 0 ? `0 0 30px ${C.purpleSoft}` : 'none', fontFamily: FONT, color: i === 0 ? C.white : C.night, fontSize: 26, fontWeight: 600, textAlign: 'center', padding: '12px 6px', boxSizing: 'border-box', overflow: 'hidden' }}>
                  <div style={{ fontSize: 46 }}>{i + 1}</div>{name}
                </div>
              )
            })}
          </div>
          <div style={abs(70 + 40, 830 - 200 - 78)}><Flag size={80} /></div>
          <div style={abs(150, 480, { opacity: fadeIn(frame, tNext + 20, 12) })}><Chip size={36} color={C.night} bg="#E6F7FF" border="#2E9BFF">Próximo nível: CSS</Chip></div>
          {/* paleta pintando a página da Ana */}
          <div style={abs(1080, 60, { opacity: fadeIn(frame, tNext + 30, 12) * (1 - fadeIn(frame, tHouse, 10)) })}>
            <div style={{ width: 640, height: 560, borderRadius: 20, overflow: 'hidden', border: `4px solid ${C.purpleSoft}`, background: C.white, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(139,108,255,${0.25 * paint}), rgba(62,197,255,${0.25 * paint}))` }} />
              <div style={{ position: 'relative', margin: 26, padding: 22, borderRadius: 16, background: `rgba(83,74,183,${paint})`, color: paint > 0.5 ? C.white : C.night, fontFamily: paint > 0.5 ? "Georgia, serif" : FONT, fontSize: 40, fontWeight: 700 }}>Olá, eu sou a Ana</div>
              {['Sobre mim', 'Meus projetos', 'Minha rotina'].map((t, i) => (
                <div key={t} style={{ position: 'relative', margin: '0 26px 18px', padding: '16px 20px', borderRadius: 14 * paint, background: `rgba(${['240,80,158', '62,197,255', '245,190,60'][i]},${0.3 * paint})`, border: `2px solid rgba(38,33,92,${0.15 + 0.2 * paint})`, fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.night }}>{t}</div>
              ))}
            </div>
            <div style={abs(470 - 300 * paint, 400 - 260 * paint, { transform: `rotate(${-10 + 20 * paint}deg)` })}><Palette size={170} /></div>
          </div>
          <div style={abs(1180, 80, { opacity: fadeIn(frame, tHouse, 12) })}>
            <House structure={1} paint={rampF(frame, tFinish, tFinish + 40)} width={520} />
          </div>
          <Label x={1080} y={640} w={640} op={fadeIn(frame, tHouse + 10, 12)} size={32} border={C.purple}>{frame >= tFinish ? 'agora vem o acabamento' : 'a estrutura está de pé'}</Label>
          <Label x={70} y={120} w={900} op={fadeIn(frame, tCongr, 12)} dark size={40}>Parabéns por chegar até aqui!</Label>
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

void MONO
