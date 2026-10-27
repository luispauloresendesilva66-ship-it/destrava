import React from 'react'
import { AbsoluteFill, interpolate, random, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { LogoMark } from '../../components/Logo.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { BrowserIcon } from '../../components/Diagram.jsx'
import { Chip } from './scenes-a.jsx'

const abs = (x, y, extra) => ({ position: 'absolute', left: x, top: y, ...extra })
const rampF = (f, a, b) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

const Check = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill={C.green} />
    <path d="M18 33 L28 43 L47 22" fill="none" stroke={C.night} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Cross = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill={C.red} />
    <path d="M21 21 L43 43 M43 21 L21 43" fill="none" stroke={C.white} strokeWidth="7" strokeLinecap="round" />
  </svg>
)

// ---------------------------------------------------------------- Bloco 7
const Card = ({ title, sub, children, op, shift }) => (
  <div style={{ width: 640, height: 560, background: C.white, borderRadius: 28, border: `4px solid ${C.purple}`, boxShadow: '0 24px 60px rgba(38,33,92,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: FONT, opacity: op, transform: `translateY(${shift}px)` }}>
    {children}
    <div style={{ fontSize: 60, fontWeight: 700, color: C.night }}>{title}</div>
    <div style={{ fontSize: 40, color: C.purple, minHeight: 50 }}>{sub}</div>
  </div>
)

export const Ferramentas = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tEd = s('duas coisas')
  const tBr = s('O navegador você já tem')
  const tVs = s('Visual Studio Code')
  const tApp = s('dentro do app')
  const cards = 1 - rampF(frame, tApp, tApp + 14)
  const prev = rampF(frame, tApp + 6, tApp + 22)
  const pEd = fadeIn(frame, tEd, 14)
  const pBr = fadeIn(frame, tBr, 14)
  return (
    <AbsoluteFill>
      <div style={abs(0, 120, { width: 1920, display: 'flex', justifyContent: 'center', gap: 90, opacity: cards })}>
        <Card title="Editor de texto" sub={frame >= tVs ? 'VS Code — grátis' : ''} op={pEd} shift={(1 - pEd) * 40}>
          <svg width="260" height="200" viewBox="0 0 260 200">
            <rect x="8" y="8" width="244" height="184" rx="18" fill={C.nightDeep} stroke={C.purple} strokeWidth="6" />
            <text x="130" y="122" textAnchor="middle" fontFamily={MONO} fontSize="84" fontWeight="700" fill="#B3ADFF">{'</>'}</text>
          </svg>
        </Card>
        <Card title="Navegador" sub="você já tem" op={pBr} shift={(1 - pBr) * 40}>
          <BrowserIcon size={260} />
        </Card>
      </div>
      {prev > 0 && (
        <div style={abs(0, 60, { width: 1920, opacity: prev, transform: `translateY(${(1 - prev) * 30}px)` })}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, marginBottom: 22 }}>
            <LogoMark height={56} keyColor={C.green} />
            <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 600, color: C.night }}>Editor de exercícios da Destrava</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 50 }}>
            <EditorWindow width={820} height={560} filename="exercicio.html">
              <CodeTyping segments={[{ text: '<h1>Olá!</h1>\n<p>Meu primeiro exercício.</p>', start: tApp + 20, frames: 50 }]} fontSize={38} />
            </EditorWindow>
            <BrowserMock width={780} height={560} tabTitle="Resultado" url="resultado ao vivo">
              <div style={{ fontFamily: FONT, opacity: rampF(frame, tApp + 45, tApp + 60) }}>
                <div style={{ fontSize: 60, fontWeight: 700 }}>Olá!</div>
                <div style={{ fontSize: 34, marginTop: 10 }}>Meu primeiro exercício.</div>
              </div>
            </BrowserMock>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
export const Estrutura = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tD = s('A primeira linha é o DOCTYPE')
  const tHtml = s('Depois vem a tag html')
  const tLang = s('Repara que nela')
  const tIn = s('Dentro do html')
  const tHead = s('o head, que é a cabeça')
  const tBody = s('o body, que é o corpo')
  const tEnd = s('Não se preocupa')
  const segments = [
    { text: '<!DOCTYPE html>\n', start: tD, frames: 26 },
    { text: '<html lang="pt-BR">\n', start: tHtml, frames: 30 },
    { text: '  <head>\n' + block.tail, start: tIn, frames: 50 },
  ]
  const highlights = [
    { text: '<!DOCTYPE html>', at: tD + 26, until: tHtml },
    { text: 'lang="pt-BR"', at: tLang, until: tIn },
    { text: '<head>', at: tHead, until: tBody },
    { text: '<body>', at: tBody, until: tEnd },
  ]
  const notes = [
    { code: '<!DOCTYPE html>', desc: 'documento HTML moderno', at: tD + 10, active: [tD, tHtml] },
    { code: 'lang="pt-BR"', desc: 'página em português do Brasil', at: tLang, active: [tLang, tIn] },
    { code: '<head>', desc: 'a cabeça', at: tHead, active: [tHead, tBody] },
    { code: '<body>', desc: 'o corpo', at: tBody, active: [tBody, tEnd] },
  ]
  return (
    <AbsoluteFill>
      <div style={abs(70, 60)}>
        <EditorWindow width={1180} height={620} filename="index.html">
          <CodeTyping segments={segments} highlights={highlights} fontSize={46} />
        </EditorWindow>
      </div>
      <div style={abs(1310, 90, { width: 560, display: 'flex', flexDirection: 'column', gap: 26 })}>
        {notes.map((n) => {
          const p = fadeIn(frame, n.at, 12)
          const act = frame >= n.active[0] && frame < n.active[1]
          return (
            <div key={n.code} style={{ opacity: p * (act || frame >= tEnd ? 1 : 0.55), transform: `translateX(${(1 - p) * 40}px)`, background: act ? C.white : '#F8F7FF', border: `4px solid ${act ? C.purple : C.purpleSoft}`, borderRadius: 20, padding: '16px 24px', boxShadow: act ? `0 10px 30px ${C.purple}44` : 'none' }}>
              <div style={{ fontFamily: MONO, fontSize: 40, color: C.purple, fontWeight: 700 }}>{n.code}</div>
              <div style={{ fontFamily: FONT, fontSize: 38, color: C.night, marginTop: 4 }}>{n.desc}</div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const HeadBody = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tMeta = s('a tag meta charset')
  const tTitle = s('E a tag title')
  const tTab = s('lá em cima')
  const tBody = s('Já o body é o corpo')
  const tRule = s('Então, regra simples')
  const tBodyChip = s('Conteúdo que a pessoa')
  const titleDone = tTitle + 45
  const tabTitle = frame >= titleDone ? 'Minha primeira página' : 'Nova aba'
  const segments = [
    { text: block.headOpen, start: 0, frames: 0 },
    { text: '    <meta charset="UTF-8">\n', start: tMeta, frames: 30 },
    { text: '    <title>Minha primeira página</title>\n', start: tTitle, frames: 45 },
    { text: block.tail, start: 0, frames: 0 },
  ]
  const highlights = [
    { text: 'charset="UTF-8"', at: tMeta + 30, until: tTitle },
    { text: '<title>Minha primeira página</title>', at: titleDone, until: tBody },
  ]
  const arrow = fadeIn(frame, tTab, 14)
  const bodyP = fadeIn(frame, tBody, 14)
  return (
    <AbsoluteFill>
      <div style={abs(60, 50)}>
        <EditorWindow width={1060} height={640} filename="index.html">
          <CodeTyping segments={segments} highlights={highlights} fontSize={36} />
        </EditorWindow>
      </div>
      <div style={abs(1180, 50)}>
        <BrowserMock width={680} height={520} tabTitle={tabTitle} url="index.html" tabHighlight={frame >= tTab && frame < tBody}>
          <div style={{ position: 'absolute', inset: 24, border: `5px dashed ${C.purpleSoft}`, borderRadius: 16, opacity: bodyP, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: FONT }}>
            <div style={{ fontSize: 46, fontWeight: 700, color: C.purple, fontFamily: MONO }}>{'<body>'}</div>
            <div style={{ fontSize: 38, color: C.night, textAlign: 'center', padding: '0 24px' }}>tudo aqui aparece para o visitante</div>
          </div>
        </BrowserMock>
      </div>
      {arrow > 0 && frame < tBody + 10 && (
        <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: arrow }}>
          <defs>
            <marker id="ah" markerUnits="userSpaceOnUse" markerWidth="30" markerHeight="30" refX="22" refY="15" orient="auto"><path d="M0 2 L30 15 L0 28 Z" fill={C.purple} /></marker>
          </defs>
          <path d="M960 392 C1080 392 1180 300 1330 118" fill="none" stroke={C.purple} strokeWidth="8" strokeLinecap="round" strokeDasharray="14 12" markerEnd="url(#ah)" />
        </svg>
      )}
      <div style={abs(0, 735, { width: 1920, display: 'flex', justifyContent: 'center', gap: 50 })}>
        <div style={{ opacity: fadeIn(frame, tRule, 12) }}>
          <Chip size={40} color={C.white} bg={C.purple} border={C.night}>head: informação sobre a página</Chip>
        </div>
        <div style={{ opacity: fadeIn(frame, tBodyChip, 12) }}>
          <Chip size={40} color={C.night} bg={C.white} border={C.purple}>body: o que a pessoa vê</Chip>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
const Confetti = ({ start }) => {
  const frame = useCurrentFrame()
  const f = frame - start
  if (f < 0 || f > 100) return null
  return (
    <>
      {Array.from({ length: 46 }).map((_, i) => {
        const x = 500 + random(`x${i}`) * 900
        const delay = random(`d${i}`) * 22
        const g = f - delay
        if (g < 0) return null
        const y = 80 + g * (6 + random(`v${i}`) * 5)
        const rot = g * (4 + random(`r${i}`) * 8)
        const col = i % 3 === 0 ? C.green : i % 3 === 1 ? '#C4E29A' : '#7FAE3E'
        return <div key={i} style={{ position: 'absolute', left: x + Math.sin(g / 6 + i) * 24, top: y, width: 16, height: 26, background: col, borderRadius: 4, transform: `rotate(${rot}deg)`, opacity: clamp01(1 - (f - 70) / 30) }} />
      })}
    </>
  )
}

export const Conteudo = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tH1 = s('eu vou escrever uma tag h1')
  const tP = s('E logo abaixo')
  const tName = s('index ponto html')
  const tOpen = s('abrir no navegador')
  const tSee = s('E olha aí')
  const tPar = s('Parabéns')
  const split = rampF(frame, tOpen - 10, tOpen + 14)
  const edX = interpolate(split, [0, 1], [430, 60])
  const prefix = block.headOpen + '    <meta charset="UTF-8">\n    <title>Minha primeira página</title>\n  </head>\n  <body>\n'
  const segments = [
    { text: prefix, start: 0, frames: 0 },
    { text: '    <h1>Minha primeira página</h1>\n', start: tH1, frames: 40 },
    { text: '    <p>Estou aprendendo HTML na Destrava.</p>\n', start: tP, frames: 62 },
    { text: '  </body>\n</html>', start: 0, frames: 0 },
  ]
  const named = frame >= tName
  const pulse = named ? 1 + 0.06 * Math.max(0, 1 - (frame - tName) / 12) : 1
  const show = fadeIn(frame, tSee, 12)
  return (
    <AbsoluteFill>
      <div style={abs(edX, 40, { transform: `scale(${pulse})`, transformOrigin: 'top left' })}>
        <EditorWindow width={1060} height={720} filename={named ? 'index.html' : 'sem título.html'}>
          <CodeTyping segments={segments} highlights={[{ text: '<h1>Minha primeira página</h1>', at: tH1 + 40, until: tP }, { text: '<p>Estou aprendendo HTML na Destrava.</p>', at: tP + 62, until: tName }]} fontSize={36} />
        </EditorWindow>
      </div>
      {named && (
        <div style={abs(edX, 780, { opacity: fadeIn(frame, tName, 10) })}>
          <Chip size={34} color={C.night} bg={C.white} border={C.purpleSoft}>Arquivo salvo: index.html</Chip>
        </div>
      )}
      <div style={abs(1180, 40, { opacity: split, transform: `translateX(${(1 - split) * 120}px)` })}>
        <BrowserMock width={680} height={560} tabTitle="Minha primeira página" url="index.html">
          <div style={{ fontFamily: FONT, opacity: show, transform: `translateY(${(1 - show) * 16}px)` }}>
            <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.15 }}>Minha primeira página</div>
            <div style={{ fontSize: 30, fontWeight: 400, marginTop: 16 }}>Estou aprendendo HTML na Destrava.</div>
          </div>
        </BrowserMock>
      </div>
      <Confetti start={tPar} />
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 11
export const ErroComum = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tFix = s('Por isso, crie o hábito')
  const tInd = s('E outra dica')
  const tIndName = s('Isso se chama indentação')
  const A = 1 - rampF(frame, tInd - 6, tInd + 8)
  const B = rampF(frame, tInd, tInd + 14)
  const fixed = frame >= tFix + 14
  const bad = '<html>\n<body>\n<h1>Título</h1>\n<p>Texto</p>\n</body>\n</html>'
  const good = '<html>\n  <body>\n    <h1>Título</h1>\n    <p>Texto</p>\n  </body>\n</html>'
  const hBig = { fontSize: 50, fontWeight: 700, lineHeight: 1.15 }
  return (
    <AbsoluteFill>
      <div style={{ opacity: A }}>
        <div style={abs(60, 70)}>
          <EditorWindow width={1000} height={260} filename="index.html">
            <CodeTyping
              segments={[
                { text: '<h1>Minha primeira página', start: 0, frames: 0 },
                { text: '</h1>', start: tFix, frames: 12 },
                { text: '\n<p>Estou aprendendo HTML na Destrava.</p>', start: 0, frames: 0 },
              ]}
              highlights={[{ text: '</h1>', at: tFix + 12 }]}
              fontSize={36}
            />
          </EditorWindow>
        </div>
        <div style={abs(60, 400, { opacity: fadeIn(frame, 10, 12) })}>
          {!fixed ? (
            <Chip size={42} color={C.white} bg={C.red} border={C.red}>faltou fechar o h1</Chip>
          ) : (
            <Chip size={42} color={C.night} bg={C.white} border={C.green}>abriu, já fecha</Chip>
          )}
        </div>
        <div style={abs(1130, 70)}>
          <BrowserMock width={730} height={520} tabTitle="Minha primeira página" url="index.html">
            <div style={{ fontFamily: FONT }}>
              <div style={hBig}>Minha primeira página</div>
              <div style={fixed ? { fontSize: 32, marginTop: 14 } : { ...hBig, marginTop: 6 }}>Estou aprendendo HTML na Destrava.</div>
            </div>
            <div style={{ position: 'absolute', right: 28, bottom: 24 }}>{fixed ? <Check size={110} /> : <Cross size={110} />}</div>
          </BrowserMock>
        </div>
      </div>
      {B > 0 && (
        <div style={{ opacity: B }}>
          {[{ code: bad, x: 90, label: 'sem indentação', ok: false }, { code: good, x: 990, label: 'com indentação', ok: true }].map((p) => (
            <React.Fragment key={p.label}>
              <div style={abs(p.x, 60)}>
                <EditorWindow width={840} height={560} filename="index.html">
                  <CodeTyping
                    segments={[{ text: p.code, start: 0, frames: 0 }]}
                    lineHighlights={p.ok ? [2, 3, 4].map((line) => ({ line, at: tIndName })) : []}
                    cursor={false}
                    fontSize={40}
                  />
                </EditorWindow>
              </div>
              <div style={abs(p.x, 660, { width: 840, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18 })}>
                <Chip size={44} color={p.ok ? C.white : C.night} bg={p.ok ? C.purple : C.white} border={p.ok ? C.night : C.purpleSoft}>{p.label}</Chip>
                {p.ok && frame >= tIndName && <Check size={60} />}
              </div>
            </React.Fragment>
          ))}
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
    { t: 'HTML dá estrutura às páginas da internet', at: s('O HTML é a linguagem') },
    { t: 'Tags têm abertura, conteúdo e fechamento', at: s('Ele funciona com tags') },
    { t: 'head: informações · body: o que aparece', at: s('Toda página tem o head') },
    { t: 'Você escreveu sua primeira página', at: s('E você já escreveu') },
  ]
  const tBtn = s('Logo abaixo deste vídeo')
  const tEnd = s('Nos vemos na próxima aula')
  const end = rampF(frame, tEnd, tEnd + 22)
  const pulse = frame >= tBtn ? 1 + 0.05 * Math.sin((frame - tBtn) / 5) : 1
  const slogan = fadeIn(frame, tEnd + 62, 16)
  return (
    <AbsoluteFill>
      <div style={abs(0, 28, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 70, fontWeight: 700, color: C.night, opacity: fadeIn(frame, 2, 12) })}>Resumo da aula</div>
      <div style={abs(300, 150, { display: 'flex', flexDirection: 'column', gap: 34 })}>
        {items.map((it, i) => {
          const p = fadeIn(frame, it.at, 12)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 28, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
              <Check size={78} />
              <div style={{ fontFamily: FONT, fontSize: 54, color: C.night, fontWeight: 500 }}>{it.t}</div>
            </div>
          )
        })}
      </div>
      <div style={abs(0, 700, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tBtn, 14) })}>
        <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 600, padding: '20px 64px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tBtn) / 5)}px ${C.purpleSoft}` }}>
          Fazer os exercícios
        </div>
      </div>
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background dark />
          <div style={{ position: 'absolute', left: 0, top: 230, width: 1920, display: 'flex', justifyContent: 'center' }}>
            <LogoReveal start={tEnd + 12} height={270} bodyColor={C.purpleSoft} wordColor={C.lavender} />
          </div>
          <div style={{ position: 'absolute', left: 0, top: 610, width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 58, color: C.lavender, opacity: slogan, transform: `translateY(${(1 - slogan) * 16}px)` }}>
            Destrava sua carreira. Um nível de cada vez.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}
