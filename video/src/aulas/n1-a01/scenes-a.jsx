import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../../components/Logo.jsx'
import { Title } from '../../components/Title.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock, SamplePage } from '../../components/BrowserMock.jsx'
import { Arrow, BrowserIcon, DocIcon, House, ServerIcon } from '../../components/Diagram.jsx'
import { Chip } from '../../components/Marks.jsx'

const abs = (x, y, extra) => ({ position: 'absolute', left: x, top: y, ...extra })
const rampF = (f, a, b) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

// Chip de rótulo (componente compartilhado)
export { Chip }

// ---------------------------------------------------------------- Bloco 1
export const Abertura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = makeSync(block.fala, frames)
  const tTitle = s('Antes de começar')
  const tSteps = s('um degrau de cada vez')
  const tLight = s('Você só sobe')
  const logoBig = 1 - rampF(frame, tTitle - 6, tTitle + 8)
  const logoSmall = rampF(frame, tTitle, tTitle + 14)
  const heights = [270, 320, 370, 420, 470]
  return (
    <AbsoluteFill>
      <div style={abs(0, 0, { width: 1920, height: 880, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: logoBig })}>
        <LogoReveal start={4} height={300} />
      </div>
      <div style={abs(70, 50, { opacity: logoSmall, display: 'flex', alignItems: 'center', gap: 18 })}>
        <LogoMark height={64} keyColor={C.green} />
        <Wordmark size={52} />
      </div>
      <div style={abs(0, interpolate(frame, [tSteps - 8, tSteps + 14], [330, 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), { width: 1920 })}>
        <Title start={tTitle} size={92}>Aula 1 — O que é HTML?</Title>
      </div>
      {/* 5 degraus */}
      <div style={abs(260, 800 - 470, { width: 1400, height: 470, display: 'flex', alignItems: 'flex-end', gap: 14 })}>
        {block.levels.map((name, i) => {
          const at = tSteps + 4 + i * 9
          const p = spring({ frame: frame - at, fps, config: { damping: 16, stiffness: 120 } })
          const lit = i === 0 ? rampF(frame, tLight, tLight + 10) : 0
          return (
            <div
              key={name}
              style={{
                flex: 1,
                height: heights[i] * clamp01(p),
                opacity: clamp01(p * 2),
                background: lit > 0 ? C.purple : '#D8D5F6',
                border: `4px solid ${lit > 0 ? C.night : C.purpleSoft}`,
                borderRadius: '16px 16px 0 0',
                boxShadow: lit > 0 ? `0 0 ${50 * lit}px ${C.purpleSoft}` : 'none',
                fontFamily: FONT,
                color: lit > 0 ? C.white : C.night,
                fontSize: 34,
                fontWeight: 600,
                textAlign: 'center',
                padding: '18px 8px',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: 56, opacity: 0.9, marginBottom: 6 }}>{i + 1}</div>
              {name}
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 2
export const Internet = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tReq = s('manda um pedido')
  const tRes = s('E o servidor responde')
  const tText = s('esse arquivo é só texto')
  const tEnter = s('que o navegador lê')
  const tHtml = s('Esse jeito especial')
  const req = rampF(frame, tReq, tReq + 40)
  const res = rampF(frame, tRes, tRes + 50)
  const docX = interpolate(res, [0, 1], [1260, 560])
  const docIn = rampF(frame, tEnter, tEnter + 25)
  const pageShown = docIn >= 1
  const iconOp = 1 - rampF(frame, tEnter + 18, tEnter + 30)
  const pageOp = rampF(frame, tEnter + 18, tEnter + 32)
  return (
    <AbsoluteFill>
      <div style={abs(90, 120, { opacity: iconOp })}>
        <BrowserIcon size={420} label="navegador" />
      </div>
      <div style={abs(70, 100, { opacity: pageOp })}>
        <BrowserMock width={480} height={380} tabTitle="Minha página" url="meusite.com.br">
          <SamplePage />
        </BrowserMock>
        <div style={{ fontFamily: FONT, fontSize: 38, fontWeight: 600, color: C.night, textAlign: 'center', marginTop: 18 }}>navegador</div>
      </div>
      <div style={abs(1450, 110)}>
        <ServerIcon size={340} label="servidor" />
      </div>
      <div style={abs(620, 190)}>
        <Arrow progress={req} dir="right" length={730} label="pedido" />
      </div>
      <div style={abs(620, 420)}>
        <Arrow progress={res} dir="left" length={730} label="resposta" color={C.purpleSoft} />
      </div>
      {res > 0 && docIn < 1 && (
        <div style={abs(docX, 430, { transform: `scale(${1 - docIn * 0.5})`, opacity: 1 - docIn * 0.6 })}>
          <DocIcon size={120} />
        </div>
      )}
      {frame >= tText && docIn < 1 && (
        <div style={abs(docX - 40, 600, { opacity: fadeIn(frame, tText), fontFamily: FONT })}>
          <Chip size={34}>só texto</Chip>
        </div>
      )}
      {frame >= tHtml && (
        <div style={abs(0, 600, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tHtml, 14), transform: `translateY(${(1 - fadeIn(frame, tHtml, 14)) * 20}px)` })}>
          <Chip size={52} color={C.white} bg={C.purple} border={C.night}>Esse jeito de escrever é o HTML</Chip>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 3
export const Casa = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tH = s('O HTML é a estrutura')
  const tC = s('O CSS é o acabamento')
  const tJ = s('E o JavaScript é a parte elétrica')
  const tClick = s('quando você clica num botão')
  const tNow = s('E hoje a gente começa')
  const structure = rampF(frame, tH, tH + 70)
  const paint = rampF(frame, tC, tC + 30)
  const power = rampF(frame, tJ, tJ + 25)
  const on = frame >= tClick + 20
  const rows = [
    { name: 'HTML', desc: 'estrutura', at: tH, color: C.night },
    { name: 'CSS', desc: 'aparência', at: tC, color: C.purple },
    { name: 'JavaScript', desc: 'comportamento', at: tJ, color: C.purpleSoft },
  ]
  const hlHtml = frame >= tNow
  const width = 760
  const k = width / 600
  const clickP = rampF(frame, tClick, tClick + 20)
  return (
    <AbsoluteFill>
      <div style={abs(130, 110)}>
        <House structure={structure} paint={paint} power={power} lampOn={on} width={width} />
        {frame >= tClick && (
          <div style={abs(516 * k - 10 + (1 - clickP) * 150, 330 * k - 4 + (1 - clickP) * 120, { transform: `scale(${frame >= tClick + 18 && frame < tClick + 26 ? 0.85 : 1})` })}>
            <svg width="54" height="64" viewBox="0 0 24 28"><path d="M3 2 L3 22 L8 17 L12 26 L15 24.5 L11 16 L18 16 Z" fill={C.white} stroke={C.night} strokeWidth="2" strokeLinejoin="round" /></svg>
          </div>
        )}
      </div>
      <div style={abs(1030, 190, { display: 'flex', flexDirection: 'column', gap: 36 })}>
        {rows.map((r) => {
          const p = fadeIn(frame, r.at, 14)
          const dim = hlHtml && r.name !== 'HTML' ? 0.4 : 1
          return (
            <div key={r.name} style={{ opacity: p * dim, transform: `translateX(${(1 - p) * 60}px)`, display: 'flex', alignItems: 'center', gap: 26 }}>
              <div style={{ width: 24, height: 90, borderRadius: 8, background: r.color }} />
              <div style={{ fontFamily: FONT }}>
                <div style={{ fontSize: 78, fontWeight: 700, color: C.night, lineHeight: 1, transform: hlHtml && r.name === 'HTML' ? 'scale(1.08)' : 'none', transformOrigin: 'left' }}>{r.name}</div>
                <div style={{ fontSize: 42, color: C.purple, marginTop: 6 }}>{r.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 4
const Marker = ({ progress, color, children, style }) => (
  <span style={{ position: 'relative', display: 'inline-block', ...style }}>
    <span style={{ position: 'absolute', left: -8, right: -8, top: '10%', bottom: '4%', background: color, borderRadius: 8, transformOrigin: 'left', transform: `scaleX(${clamp01(progress)})`, opacity: 0.85 }} />
    <span style={{ position: 'relative' }}>{children}</span>
  </span>
)

export const Marcacao = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tHyper = s('HyperText')
  const tMarkup = s('Markup')
  const tLang = s('Language')
  const tPt = s('linguagem de marcação de hipertexto')
  const tKey = s('A palavra mais importante')
  const tPaper = s('É como pegar um texto impresso')
  const tT = s('isso aqui é o título')
  const tP = s('isso aqui é um parágrafo')
  const tL = s('isso aqui é um link')
  const words = [
    { w: 'HyperText', at: tHyper },
    { w: 'Markup', at: tMarkup },
    { w: 'Language', at: tLang },
  ]
  const key = fadeIn(frame, tKey, 12)
  const paper = fadeIn(frame, tPaper, 16)
  const yel = '#FFE27A'
  const blu = '#9BD4F5'
  const pnk = '#F6B3D6'
  return (
    <AbsoluteFill>
      <div style={abs(0, 40, { width: 1920, display: 'flex', justifyContent: 'center', gap: 44, fontFamily: FONT })}>
        {words.map(({ w, at }) => {
          const p = fadeIn(frame, at, 10)
          const isKey = w === 'Markup'
          return (
            <div key={w} style={{ fontSize: 100, fontWeight: 700, color: C.night, opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${isKey ? 1 + key * 0.08 : 1})` }}>
              <span style={{ background: isKey && key > 0 ? `${C.purpleSoft}66` : 'transparent', borderRadius: 14, padding: '0 14px', boxShadow: isKey && key > 0 ? `0 0 0 4px ${C.purpleSoft}` : 'none' }}>
                <span style={{ color: C.purple }}>{w.slice(0, w === 'HyperText' ? 1 : 1)}</span>
                {w.slice(1)}
              </span>
            </div>
          )
        })}
      </div>
      <div style={abs(0, 180, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 48, color: C.purple, opacity: fadeIn(frame, tPt, 12) })}>
        linguagem de marcação de hipertexto
      </div>
      {key > 0 && (
        <div style={abs(0, 250, { width: 1920, textAlign: 'center', opacity: key, transform: `translateY(${(1 - key) * 14}px)` })}>
          <Chip size={50} color={C.white} bg={C.purple} border={C.night}>Markup = Marcação</Chip>
        </div>
      )}
      {/* papel com marca-texto */}
      <div style={abs(360, 345, { width: 1200, opacity: paper, transform: `translateY(${(1 - paper) * 30}px)` })}>
        <div style={{ background: C.white, borderRadius: 18, boxShadow: '0 20px 50px rgba(38,33,92,0.25)', padding: '30px 54px 34px', fontFamily: FONT, color: C.night, border: '2px solid #D9D6F3' }}>
          <div style={{ fontSize: 58, fontWeight: 700, marginBottom: 18 }}>
            <Marker progress={rampF(frame, tT, tT + 22)} color={yel}>Meu primeiro texto</Marker>
          </div>
          <div style={{ fontSize: 40, lineHeight: 1.5, marginBottom: 14 }}>
            <Marker progress={rampF(frame, tP, tP + 30)} color={blu}>O HTML organiza o conteúdo de uma página.</Marker>
          </div>
          <div style={{ fontSize: 40, color: C.purple, textDecoration: 'underline' }}>
            <Marker progress={rampF(frame, tL, tL + 20)} color={pnk}>Saiba mais aqui</Marker>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 24 }}>
          <div style={{ opacity: fadeIn(frame, tT + 6, 10) }}><Chip size={36} color={C.night} bg={yel} border={C.night}>título</Chip></div>
          <div style={{ opacity: fadeIn(frame, tP + 6, 10) }}><Chip size={36} color={C.night} bg={blu} border={C.night}>parágrafo</Chip></div>
          <div style={{ opacity: fadeIn(frame, tL + 6, 10) }}><Chip size={36} color={C.night} bg={pnk} border={C.night}>link</Chip></div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 5
export const Tag = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tOpen = s('Essa é a tag de abertura')
  const tContent = s('Depois vem o conteúdo')
  const tClose = s('E no final vem a tag de fechamento')
  const tSlash = s('com uma barra antes do nome')
  const tP = s('A letra p vem de parágrafo')
  const tRecap = s('Abertura, conteúdo, fechamento')
  const code = block.code
  const fs = 130
  const ch = fs * 0.55
  const left = 1920 / 2 - (code.length * ch) / 2
  const parts = [
    { text: '<p>', start: 0, label: 'tag de abertura', at: tOpen, until: tContent },
    { text: 'Olá, mundo', start: 3, label: 'conteúdo', at: tContent, until: tClose },
    { text: '</p>', start: 13, label: 'tag de fechamento', at: tClose, until: tRecap },
  ]
  const blink = Math.floor(frame / 8) % 2 === 0
  const highlights = parts.map((p) => ({ text: p.text, at: p.at, until: p.until }))
  if (frame >= tSlash && frame < tRecap && blink) highlights.push({ text: '/', at: 0, until: 99999 })
  if (frame >= tRecap) highlights.push({ text: code, at: tRecap })
  return (
    <AbsoluteFill>
      <div style={abs(left - 70, 270, { background: C.nightDeep, borderRadius: 28, padding: '40px 70px', boxShadow: '0 24px 60px rgba(27,23,68,0.4)', border: `3px solid ${C.purple}` })}>
        <CodeTyping segments={[{ text: code, start: 6, frames: 24 }]} highlights={highlights} fontSize={fs} lineNumbers={false} cursor highlightColor="rgba(127,119,221,0.6)" />
      </div>
      {parts.map((p) => {
        const op = frame >= p.at && frame < p.until ? 1 : frame >= p.until ? 0.5 : 0
        const x = left + p.start * ch + (p.text.length * ch) / 2
        return (
          <div key={p.label} style={abs(x - 300, 520, { width: 600, textAlign: 'center', opacity: op })}>
            <svg width="40" height="50" viewBox="0 0 40 50" style={{ display: 'block', margin: '0 auto' }}><path d="M20 48 V6 M6 18 L20 4 L34 18" fill="none" stroke={C.purple} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <Chip size={42} color={C.night} border={C.purple}>{p.label}</Chip>
          </div>
        )
      })}
      {frame >= tP && (
        <div style={abs(0, 140, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tP, 10) * (frame >= tRecap ? 0 : 1) })}>
          <Chip size={46} color={C.white} bg={C.purple} border={C.night}>p = parágrafo</Chip>
        </div>
      )}
      {frame >= tRecap && (
        <div style={abs(0, 140, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tRecap, 10), fontFamily: FONT, fontSize: 56, color: C.night, fontWeight: 600 })}>
          abertura · conteúdo · fechamento
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 6
const Key = ({ children, pressed }) => (
  <div style={{ fontFamily: FONT, fontSize: 64, fontWeight: 700, color: C.night, background: C.white, border: `4px solid ${C.night}`, borderBottomWidth: pressed ? 4 : 12, borderRadius: 18, padding: '14px 36px', transform: `translateY(${pressed ? 8 : 0}px)`, boxShadow: pressed ? `0 0 0 6px ${C.purpleSoft}88` : 'none' }}>{children}</div>
)

export const CodigoFonte = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tKeys = s('Control e U')
  const tFlip = s('Vai aparecer um monte')
  const tTags = s('repara: no meio')
  const tEnd = s('Hoje parece um idioma')
  const flip = rampF(frame, tFlip, tFlip + 14)
  const pressed = frame >= tKeys + 20 && frame < tFlip
  const keysOp = fadeIn(frame, tKeys, 10) * (1 - rampF(frame, tFlip, tFlip + 8))
  const tagList = ['<html lang="pt-BR">', '<head>', '<title>', '<body>', '<h1>', '<p>', '<a href="#">']
  const span = Math.max(10, Math.round((tEnd - tTags) / tagList.length))
  const hl = tagList.map((t, i) => ({ text: t, at: tTags + i * span }))
  const pageOp = 1 - flip
  return (
    <AbsoluteFill>
      <div style={abs(300, 30)}>
        <div style={{ opacity: pageOp, position: 'absolute', inset: 0 }}>
          <BrowserMock width={1320} height={790} tabTitle="Página de exemplo" url="meusite.com.br">
            <div style={{ transform: 'scale(1.7)', transformOrigin: 'top left', width: 700 }}><SamplePage /></div>
          </BrowserMock>
        </div>
        <div style={{ opacity: flip }}>
          <BrowserMock width={1320} height={790} tabTitle="view-source:meusite.com.br" url="view-source:meusite.com.br">
            <div style={{ position: 'absolute', inset: 0, background: C.nightDeep, padding: '14px 10px' }}>
              <CodeTyping segments={[{ text: block.source, start: 0, frames: 0 }]} highlights={hl} fontSize={38} cursor={false} />
            </div>
          </BrowserMock>
        </div>
      </div>
      <div style={abs(0, 330, { width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, opacity: keysOp, fontFamily: FONT })}>
        <Key pressed={pressed}>Ctrl</Key>
        <div style={{ fontSize: 64, fontWeight: 700, color: C.night, textShadow: '0 0 12px #fff' }}>+</div>
        <Key pressed={pressed}>U</Key>
      </div>
    </AbsoluteFill>
  )
}
