// Nível 2, Aula 1: a página da Ana renderizada com o CSS aplicado DE VERDADE pelo navegador e as
// ilustrações (rolo de tinta, amostras de cor). As peças genéricas (cores de sintaxe, editor com abas,
// código digitado, escopo do CSS, prévia, notas) ficam em components/CssCode.jsx e são reexportadas aqui.
import React from 'react'
import { C, FONT } from '../../theme.js'
import { AvatarAna } from '../n1-a04/ana.jsx'
import { SYN, colorizeAny, Code, EditorTabs, scopeCss, Preview, Note, CodeChip } from '../../components/CssCode.jsx'

export { SYN, colorizeAny, Code, EditorTabs, scopeCss, Preview, Note, CodeChip }

export const ANA = {
  title: 'Ana Souza, página pessoal',
  h1: 'Olá, eu sou a Ana',
  menu: ['Sobre mim', 'Meus projetos', 'Minha rotina', 'Fale comigo'],
  p: 'Trabalho no atendimento de uma loja e estou fazendo a minha transição para a tecnologia. Estou aprendendo ',
}

// Página da Ana (index.html) ou de projetos, com o CSS `css` aplicado. zoom: escala da prévia inteira
// (o 18px do CSS continua sendo 18px da página, só que ampliado para o vídeo).
// variant: 'index' | 'projetos' | 'tres' (h1 + três parágrafos iguais, Bloco 10) | 'mini' (h1 + p).
// 'inline': um parágrafo com o atributo style (Bloco 7).
export const PageCss = ({ id, css = '', zoom = 1.25, variant = 'index', flashP = -1, flashOp = 0, children }) => {
  const base = `#${id} { display: block; margin: 0; padding: 8px; min-height: 100%; box-sizing: border-box; color: #000; background-color: #fff; font-family: ${FONT}; font-size: 16px; line-height: normal; zoom: ${zoom}; }
#${id} h1, #${id} h2, #${id} p, #${id} ul { color: inherit; }`
  const rules = scopeCss(css, id)
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <style>{base + '\n' + rules}</style>
      <div id={id}>
        {variant === 'index' && (
          <>
            <h1>{ANA.h1}</h1>
            <nav>
              <ul>{ANA.menu.map((t) => <li key={t}><a href="#sobre" onClick={(e) => e.preventDefault()}>{t}</a></li>)}</ul>
            </nav>
            <h2>Sobre mim</h2>
            <p>{ANA.p}<strong>HTML</strong>.</p>
            <div style={{ width: 150, height: 150 }}><AvatarAna size={150} /></div>
          </>
        )}
        {variant === 'projetos' && (
          <>
            <h1>Meus projetos</h1>
            <p>Os projetos que eu fiz enquanto aprendo a programar.</p>
            <ul>
              <li><a href="#receitas">Minhas receitas favoritas</a></li>
              <li><a href="#pagina">A minha página pessoal</a></li>
            </ul>
            <p><a href="#inicio">Voltar para a página inicial</a></p>
          </>
        )}
        {variant === 'mini' && (
          <>
            <h1>{ANA.h1}</h1>
            <p>Estou aprendendo CSS.</p>
          </>
        )}
        {variant === 'inline' && (
          <>
            <h1>{ANA.h1}</h1>
            <p style={{ color: 'red' }}>Texto vermelho</p>
            <p>Este parágrafo não muda.</p>
          </>
        )}
        {variant === 'tres' && (
          <>
            <h1>{ANA.h1}</h1>
            {[0, 1, 2].map((i) => (
              <p key={i} style={i === flashP && flashOp > 0 ? { outline: `${3}px solid rgba(240,160,75,${flashOp})`, outlineOffset: 2, background: `rgba(255,210,138,${0.9 * flashOp})`, borderRadius: 4 } : undefined}>Estou aprendendo CSS e a página está ganhando cor.</p>
            ))}
          </>
        )}
        {children}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ rolo de tinta
export const PaintRoller = ({ size = 200, color = '#B9B2F5' }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" style={{ overflow: 'visible', filter: 'drop-shadow(0 8px 10px rgba(38,33,92,0.3))' }}>
    <rect x="8" y="6" width="74" height="28" rx="10" fill={color} stroke={C.night} strokeWidth="4" />
    <rect x="14" y="12" width="62" height="6" rx="3" fill="#FFFFFF" opacity="0.5" />
    <path d="M82 20 H92 V48 H50 V66" fill="none" stroke={C.night} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
    <rect x="42" y="64" width="16" height="50" rx="7" fill={C.purple} stroke={C.night} strokeWidth="4" />
  </svg>
)

// Paleta pequena de amostras (uma cor + o nome).
export const Swatch = ({ color, name, fs = 30, op = 1, style }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, opacity: op, background: C.white, border: `3px solid ${C.purpleSoft}`, borderRadius: 14, padding: '6px 16px 6px 8px', fontFamily: FONT, fontSize: fs, fontWeight: 700, color: C.night, ...style }}>
    <span style={{ width: fs * 1.2, height: fs * 1.2, borderRadius: 8, background: color, border: '2px solid rgba(38,33,92,0.3)' }} />
    {name}
  </div>
)
