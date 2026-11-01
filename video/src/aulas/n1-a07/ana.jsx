// Aula 7: formulários — campos como o navegador mostra (caixa de texto, área de texto, botão, anel de foco,
// balão de aviso do navegador), o formulário de contato ilustrado, celular com teclado, servidor e ícones.
import React from 'react'
import { C, FONT, MONO } from '../../theme.js'
import { TXT, CodeCard, SpeechBubble, cardAt, cardSpan } from '../n1-a04/ana.jsx'
import { Tag } from '../n1-a05/ana.jsx'
import { CAPTION, HEAD3, ROWS3, H2_ROTINA, TableView } from '../n1-a06/ana.jsx'

export { TXT, CodeCard, SpeechBubble, cardAt, cardSpan, Tag, CAPTION, HEAD3, ROWS3, H2_ROTINA, TableView }

// ------------------------------------------------------------------ dados do exemplo
export const H2_FALE = 'Fale comigo'
export const PH = 'Seu nome completo'
export const MSG_LINES = ['Oi, Ana! Adorei a sua página.', 'Vamos estudar juntas?']

export const BLUE = '#5B8DEF'
export const ORANGE = '#F0A04B'
export const FOCUS = '#1A5FD6'

// ------------------------------------------------------------------ campos como o navegador mostra
// value: texto já digitado; placeholder: dica cinza (some quando há value); focus 0..1: anel azul;
// caret: cursor de texto piscando; hl: fundo destacado; bad 0..1: borda vermelha.
export const InputBox = ({ w = 300, fs = 28, value = '', placeholder, focus = 0, caret = false, hl, bad = 0, style }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', width: w, height: fs * 1.6, boxSizing: 'border-box', padding: `0 ${fs * 0.3}px`, background: hl || C.white, border: `2px solid ${bad > 0 ? C.red : focus > 0 ? '#1A1A1A' : '#767676'}`, borderRadius: 4, boxShadow: focus > 0 ? `0 0 0 ${4 * focus}px rgba(26,95,214,${0.9 * focus})` : 'none', fontFamily: FONT, fontSize: fs, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', flexShrink: 0, ...style }}>
    {!value && caret && <Caret fs={fs} />}
    {value ? <span>{value}</span> : placeholder ? <span style={{ color: '#9A9A9A' }}>{placeholder}</span> : null}
    {value && caret && <Caret fs={fs} />}
  </span>
)
const Caret = ({ fs }) => <span style={{ display: 'inline-block', width: Math.max(2, fs * 0.08), height: fs * 1.05, background: '#1A1A1A', margin: '0 1px', flexShrink: 0 }} />

// Área de texto: fonte monoespaçada, como o padrão do navegador. lines: linhas já digitadas.
export const TextAreaBox = ({ w = 420, h = 120, fs = 24, lines = [], focus = 0, caret = false, lead = '', style }) => (
  <span style={{ display: 'inline-block', verticalAlign: 'bottom', width: w, height: h, boxSizing: 'border-box', padding: `${fs * 0.2}px ${fs * 0.3}px`, background: C.white, border: `2px solid ${focus > 0 ? '#1A1A1A' : '#767676'}`, borderRadius: 4, boxShadow: focus > 0 ? `0 0 0 ${4 * focus}px rgba(26,95,214,${0.9 * focus})` : 'none', fontFamily: MONO, fontSize: fs, lineHeight: 1.3, color: '#1A1A1A', overflow: 'hidden', position: 'relative', flexShrink: 0, whiteSpace: 'pre', ...style }}>
    {(lines.length ? lines : ['']).map((ln, i, arr) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', height: fs * 1.3 }}>
        <span>{(i === 0 ? lead : '') + ln}</span>
        {caret && i === arr.length - 1 && <Caret fs={fs} />}
      </div>
    ))}
    {/* alça de redimensionar */}
    <svg width={fs * 0.6} height={fs * 0.6} viewBox="0 0 10 10" style={{ position: 'absolute', right: 2, bottom: 2 }}>
      <path d="M9 3 L3 9 M9 6 L6 9" stroke="#8A8A8A" strokeWidth="1.2" />
    </svg>
  </span>
)

// Botão padrão do navegador. press 0..1 escurece (clique).
export const ButtonBox = ({ fs = 26, children = 'Enviar', press = 0, hl, style }) => (
  <span style={{ display: 'inline-block', verticalAlign: 'middle', fontFamily: FONT, fontSize: fs, color: '#1A1A1A', background: hl || `rgb(${239 - 40 * press},${239 - 40 * press},${239 - 40 * press})`, border: '2px solid #767676', borderRadius: 4, padding: `${fs * 0.12}px ${fs * 0.45}px`, lineHeight: 1.25, flexShrink: 0, ...style }}>{children}</span>
)

// Texto de rótulo (o que a <label> mostra). hl: fundo destacado.
export const LabelText = ({ children, fs = 28, hl, style }) => (
  <span style={{ fontFamily: FONT, fontSize: fs, color: '#1A1A1A', background: hl || 'transparent', borderRadius: 6, padding: hl ? '0 4px' : 0, margin: hl ? '0 -4px' : 0, ...style }}>{children}</span>
)

// Balão de aviso do navegador (validação), com a setinha apontando para o campo acima.
export const ValidationBubble = ({ text, fs = 24, op = 1, style }) => (
  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: fs * 0.5, background: C.white, border: '1px solid #BDBDBD', borderRadius: 6, padding: `${fs * 0.45}px ${fs * 0.7}px`, boxShadow: '0 6px 18px rgba(0,0,0,0.25)', fontFamily: FONT, fontSize: fs, color: '#1A1A1A', whiteSpace: 'nowrap', opacity: op, transform: `translateY(${(1 - op) * 8}px)`, ...style }}>
    <div style={{ position: 'absolute', left: fs * 0.9, top: -fs * 0.42, width: fs * 0.8, height: fs * 0.8, background: C.white, borderLeft: '1px solid #BDBDBD', borderTop: '1px solid #BDBDBD', transform: 'rotate(45deg)' }} />
    <span style={{ position: 'relative', width: fs * 1.2, height: fs * 1.2, borderRadius: 4, background: '#F29D38', color: C.white, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: fs * 0.9, flexShrink: 0 }}>!</span>
    <span style={{ position: 'relative' }}>{text}</span>
  </div>
)

// Etiqueta pendurada (o "name" do campo).
export const DataTag = ({ children, fs = 26, style }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: fs * 0.35, background: '#FFF4D6', border: '3px solid #E8B860', borderRadius: `${fs * 0.25}px ${fs * 0.7}px ${fs * 0.7}px ${fs * 0.25}px`, padding: `${fs * 0.15}px ${fs * 0.6}px ${fs * 0.15}px ${fs * 0.35}px`, fontFamily: MONO, fontSize: fs, color: C.night, fontWeight: 600, whiteSpace: 'nowrap', ...style }}>
    <span style={{ width: fs * 0.38, height: fs * 0.38, borderRadius: '50%', border: `2px solid ${C.night}`, background: C.white, flexShrink: 0 }} />
    {children}
  </span>
)

// ------------------------------------------------------------------ formulário de contato ilustrado (Blocos 1 e 2)
// op: { l, f, b } opacidade dos rótulos, campos e botão; tint: { l, f, b } cor de destaque de cada camada.
export const ContactForm = ({ w = 340, fs = 24, op = {}, tint = {}, style }) => {
  const o = (k) => (op[k] == null ? 1 : op[k])
  const fieldBorder = tint.f || '#8E8AB8'
  const lab = (t) => (
    <div style={{ opacity: o('l'), fontSize: fs, fontWeight: 600, color: tint.l ? C.night : C.night, marginBottom: fs * 0.25 }}>
      <span style={{ background: tint.l ? `${tint.l}88` : 'transparent', borderRadius: 6, padding: tint.l ? '0 6px' : 0 }}>{t}</span>
    </div>
  )
  const field = (h) => <div style={{ opacity: o('f'), height: h, borderRadius: 8, border: `3px solid ${fieldBorder}`, background: tint.f ? `${tint.f}22` : C.white, marginBottom: fs * 0.6 }} />
  return (
    <div style={{ width: w, background: C.white, borderRadius: 20, border: `4px solid ${C.purple}`, boxShadow: '0 16px 34px rgba(38,33,92,0.2)', padding: `${fs * 0.8}px ${fs * 0.9}px`, boxSizing: 'border-box', fontFamily: FONT, ...style }}>
      <div style={{ fontSize: fs * 1.15, fontWeight: 700, color: C.night, marginBottom: fs * 0.6 }}>Contato</div>
      {lab('Nome')}
      {field(fs * 1.6)}
      {lab('E-mail')}
      {field(fs * 1.6)}
      {lab('Mensagem')}
      {field(fs * 4)}
      <div style={{ opacity: o('b'), display: 'inline-block', background: tint.b || C.purple, color: tint.b ? C.night : C.white, fontSize: fs, fontWeight: 700, borderRadius: 10, padding: `${fs * 0.3}px ${fs * 1.1}px`, border: tint.b ? `3px solid ${C.night}` : 'none' }}>Enviar</div>
    </div>
  )
}

// ------------------------------------------------------------------ cartõezinhos "tudo isso é formulário" (Bloco 2)
const Mini = ({ width, title, children }) => (
  <div style={{ width, background: C.white, borderRadius: 20, border: `4px solid ${C.purple}`, boxShadow: '0 16px 34px rgba(38,33,92,0.2)', padding: '16px 22px 20px', boxSizing: 'border-box', fontFamily: FONT }}>
    <div style={{ fontSize: 30, fontWeight: 700, color: C.night, marginBottom: 14 }}>{title}</div>
    {children}
  </div>
)
const bar = (w, extra) => <div style={{ height: 44, width: w, borderRadius: 8, border: '3px solid #8E8AB8', background: C.white, boxSizing: 'border-box', ...extra }} />
export const SearchCard = ({ width = 460 }) => (
  <Mini width={width} title="Busca">
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 52, borderRadius: 26, border: '3px solid #8E8AB8', display: 'flex', alignItems: 'center', padding: '0 18px', color: '#9A9A9A', fontSize: 24 }}>bolo de caneca</div>
      <svg width="52" height="52" viewBox="0 0 64 64"><circle cx="26" cy="26" r="17" fill="none" stroke={C.purple} strokeWidth="6" /><line x1="39" y1="39" x2="56" y2="56" stroke={C.night} strokeWidth="8" strokeLinecap="round" /></svg>
    </div>
  </Mini>
)
export const SignupCard = ({ width = 460 }) => (
  <Mini width={width} title="Cadastro">
    {['Nome', 'E-mail'].map((t) => (
      <div key={t} style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 20, color: C.night, marginBottom: 4 }}>{t}</div>
        {bar('100%')}
      </div>
    ))}
    <div style={{ display: 'inline-block', marginTop: 6, background: C.purple, color: C.white, borderRadius: 10, padding: '6px 22px', fontSize: 22, fontWeight: 700 }}>Criar conta</div>
  </Mini>
)
export const CommentCard = ({ width = 460 }) => (
  <Mini width={width} title="Comentários">
    <div style={{ height: 96, borderRadius: 8, border: '3px solid #8E8AB8', padding: '8px 12px', boxSizing: 'border-box', color: '#9A9A9A', fontSize: 22 }}>Escreva um comentário...</div>
    <div style={{ display: 'inline-block', marginTop: 12, background: C.purple, color: C.white, borderRadius: 10, padding: '6px 22px', fontSize: 22, fontWeight: 700 }}>Publicar</div>
  </Mini>
)

// ------------------------------------------------------------------ quem visita (Bloco 1)
export const VisitorIcon = ({ size = 150 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#DDDAF6" stroke={C.purpleSoft} strokeWidth="3" />
    <circle cx="50" cy="38" r="17" fill={C.purple} />
    <path d="M18 86 C20 66 34 58 50 58 C66 58 80 66 82 86 Z" fill={C.purple} />
  </svg>
)

// ------------------------------------------------------------------ celular (Blocos 5 e 7)
// children: o que aparece na tela; keyboard: 'text' | 'email' | null; atHl 0..1: destaca a tecla "@".
export const PhoneMock = ({ w = 300, h = 560, children, keyboard = null, atHl = 0 }) => {
  const rows = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm']]
  const kw = (w - 40) / 10 - 3
  const key = (k, extra) => (
    <div key={k} style={{ width: kw, height: kw * 1.3, borderRadius: 5, background: C.white, boxShadow: '0 1px 0 #9A97B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: kw * 0.6, color: C.night, ...extra }}>{k}</div>
  )
  return (
    <div style={{ position: 'relative', width: w, height: h, borderRadius: 40, background: C.night, padding: 12, boxSizing: 'border-box', boxShadow: '0 20px 44px rgba(27,23,68,0.35)' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 30, background: C.white, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 26, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div style={{ width: 70, height: 8, borderRadius: 4, background: '#C9C5EE' }} /></div>
        <div style={{ flex: 1, padding: '14px 16px', fontFamily: FONT }}>{children}</div>
        {keyboard && (
          <div style={{ background: '#D9D7EC', padding: '8px 4px 12px', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            {rows.map((r, i) => <div key={i} style={{ display: 'flex', gap: 3 }}>{r.map((k) => key(k))}</div>)}
            <div style={{ display: 'flex', gap: 3 }}>
              {keyboard === 'email' && key('@', { width: kw * 1.4, background: atHl > 0 ? `rgba(240,160,75,${0.4 + 0.6 * atHl})` : C.white, fontWeight: 700, boxShadow: atHl > 0 ? `0 0 0 ${3 * atHl}px ${C.night}` : '0 1px 0 #9A97B8' })}
              {key('espaço', { width: kw * (keyboard === 'email' ? 4.6 : 6), fontSize: kw * 0.4 })}
              {keyboard === 'email' && key('.', { width: kw * 1.2 })}
              {key('ok', { width: kw * 1.6, fontSize: kw * 0.45, background: C.purpleSoft, color: C.white })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ servidor (nuvem tracejada, Bloco 9)
export const ServerCloud = ({ w = 360, op = 1, label = 'servidor', sub }) => (
  <div style={{ position: 'relative', width: w, height: w * 0.62, opacity: op }}>
    <svg width={w} height={w * 0.62} viewBox="0 0 200 124" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <path d="M50 110 H160 A34 34 0 0 0 158 42 A44 44 0 0 0 78 30 A34 34 0 0 0 30 58 A26 26 0 0 0 50 110 Z" fill="rgba(238,237,254,0.85)" stroke={C.purpleSoft} strokeWidth="4" strokeDasharray="10 8" />
    </svg>
    <div style={{ position: 'absolute', left: 0, right: 0, top: w * 0.27, textAlign: 'center', fontFamily: FONT, color: C.night }}>
      <div style={{ fontSize: w * 0.09, fontWeight: 700 }}>{label}</div>
      {sub && <div style={{ fontSize: w * 0.065, color: C.purple, fontWeight: 600 }}>{sub}</div>}
    </div>
  </div>
)

// ------------------------------------------------------------------ página dividida em regiões (próxima aula)
export const RegionsIcon = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="2" y="2" width="60" height="60" rx="12" fill={C.white} stroke={C.purple} strokeWidth="4" />
    <rect x="8" y="8" width="48" height="10" rx="3" fill="#7F77DD" />
    <rect x="8" y="21" width="14" height="27" rx="3" fill="#8FD3E8" />
    <rect x="25" y="21" width="31" height="27" rx="3" fill="#97C459" />
    <rect x="8" y="51" width="48" height="6" rx="3" fill="#E8B860" />
  </svg>
)

// Monoespaçado com os sinais de tag.
export const T = ({ children, color }) => <span style={{ fontFamily: MONO, color }}>{children}</span>
