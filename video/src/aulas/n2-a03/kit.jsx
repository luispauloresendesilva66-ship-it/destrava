// Peças da Aula 3 do Nível 2 (Cores): paleta da Ana, contas de cor (contraste de verdade, HSV do seletor),
// amostras, lanternas de luz (mistura aditiva), barras de nível, seletor de cores genérico, verificador de
// contraste genérico e o editor com valores trocados (antigo riscado, novo digitado).
import React from 'react'
import { interpolate } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { clamp01 } from '../../lib/sync.js'
import { SYN } from '../../components/CssCode.jsx'
import { Check, Cross } from '../../components/Marks.jsx'
import { Warn, abs } from '../n2-a02/scenes-a.jsx'

export const PAL = { cream: '#fdf6e3', teal: '#264653', coral: '#e76f51', terra: '#b5452c', white: '#ffffff', ink: '#333333' }
export const M = ({ children, color = C.purple, style }) => <span style={{ fontFamily: MONO, color, ...style }}>{children}</span>

// ---------------------------------------------------------------- contas de cor
export const hexRgb = (h) => {
  const x = h.length === 4 ? '#' + [...h.slice(1)].map((c) => c + c).join('') : h
  return [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16))
}
const lum = (h) => {
  const c = hexRgb(h).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
// Razão de contraste (fórmula da recomendação de acessibilidade da web), calculada de verdade.
export const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
export const ratioTxt = (a, b) => contrast(a, b).toFixed(1).replace('.', ',') + ' : 1'

export const rgbHsv = ([r, g, b]) => {
  const [R, G, B] = [r / 255, g / 255, b / 255]
  const mx = Math.max(R, G, B)
  const mn = Math.min(R, G, B)
  const d = mx - mn
  let h = 0
  if (d) h = mx === R ? ((G - B) / d) % 6 : mx === G ? (B - R) / d + 2 : (R - G) / d + 4
  h = (h * 60 + 360) % 360
  return [h, mx ? d / mx : 0, mx]
}
export const hsvHex = ([h, s, v]) => {
  const f = (n) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  return '#' + [f(5), f(3), f(1)].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

// ---------------------------------------------------------------- amostra de cor (CSS de verdade no fundo)
export const Swatch = ({ color, size = 200, h, radius = 26, label, sub, op = 1, scale = 1, border = C.night, style, fs = 34 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: op, transform: `scale(${scale})`, ...style }}>
    <div style={{ width: size, height: h || size, borderRadius: radius, backgroundColor: color, border: `5px solid ${border}`, boxShadow: '0 16px 30px rgba(38,33,92,0.22)', boxSizing: 'border-box' }} />
    {label && <div style={{ fontFamily: MONO, fontSize: fs, fontWeight: 700, color: C.night, background: C.white, border: `3px solid ${C.purpleSoft}`, borderRadius: 14, padding: '4px 16px', whiteSpace: 'nowrap' }}>{label}</div>}
    {sub && <div style={{ fontFamily: FONT, fontSize: fs * 0.85, fontWeight: 700, color: '#5F5A86' }}>{sub}</div>}
  </div>
)

// Fundo quadriculado (para enxergar a transparência).
export const STRIPES = 'repeating-linear-gradient(45deg, #26215C 0 22px, #FFFFFF 22px 44px)'

// ---------------------------------------------------------------- lanternas: mistura de luz (aditiva)
// lv = [r, g, b] de 0 a 255. Três círculos sobre fundo preto, somados com mix-blend-mode: screen.
export const LightMix = ({ lv, w = 700, h = 560, r = 160, labels = true }) => {
  const cx = w / 2
  const cy = h / 2 + 10
  const pos = [[cx - r * 0.62, cy - r * 0.42], [cx + r * 0.62, cy - r * 0.42], [cx, cy + r * 0.62]]
  const cols = (i, v) => (i === 0 ? `rgb(${v},0,0)` : i === 1 ? `rgb(0,${v},0)` : `rgb(0,0,${v})`)
  const names = ['R', 'G', 'B']
  return (
    <div style={{ position: 'relative', width: w, height: h, background: '#05040F', borderRadius: 28, overflow: 'hidden', border: `3px solid ${C.purple}`, boxShadow: '0 20px 44px rgba(27,23,68,0.4)', isolation: 'isolate' }}>
      {pos.map(([x, y], i) => (
        <div key={i} style={abs(x - r, y - r, { width: r * 2, height: r * 2, borderRadius: '50%', background: cols(i, Math.round(lv[i])), mixBlendMode: 'screen', boxSizing: 'border-box', border: lv[i] < 60 ? '3px dashed rgba(255,255,255,0.3)' : 'none', boxShadow: lv[i] > 8 ? `0 0 ${60 * lv[i] / 255}px ${cols(i, Math.round(lv[i]))}` : 'none' })} />
      ))}
      {labels && pos.map(([x, y], i) => {
        const lx = i === 0 ? x - r * 0.55 : i === 1 ? x + r * 0.55 : x
        const ly = i === 2 ? y + r * 0.5 : y - r * 0.45
        return <div key={'l' + i} style={abs(lx - 30, ly - 30, { width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 40, fontWeight: 900, color: lv[i] > 120 ? '#05040F' : '#8E89C8' })}>{names[i]}</div>
      })}
    </div>
  )
}

// ---------------------------------------------------------------- barras de nível (um por par do hex)
export const Bars = ({ lv, p = 1, w = 90, h = 260, gap = 26 }) => {
  const cols = ['#E2463B', '#3FA34D', '#3C6FE0']
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap, height: h + 50 }}>
      {lv.map((v, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: w, height: h, borderRadius: 14, background: '#E7E5F8', border: `3px solid ${C.night}`, position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${(v / 255) * 100 * clamp01(p)}%`, background: cols[i] }} />
          </div>
          <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 900, color: cols[i] }}>{'RGB'[i]}</div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------- seletor de cores genérico
// hsv = cor atual; mostra a área de tons (saturação x brilho), a barra de matiz e o campo com o código.
export const Picker = ({ hsv, code, w = 520, sq = 330, glow = 0, style }) => {
  const [hh, s, v] = hsv
  return (
    <div style={{ width: w, background: '#FFFFFF', borderRadius: 16, border: '2px solid #C9C7D6', boxShadow: '0 18px 40px rgba(20,18,40,0.35)', padding: 18, boxSizing: 'border-box', fontFamily: FONT, ...style }}>
      <div style={{ position: 'relative', width: w - 36, height: sq, borderRadius: 8, overflow: 'hidden', background: `linear-gradient(to top, #000, rgba(0,0,0,0)), linear-gradient(to right, #fff, hsl(${hh}, 100%, 50%))` }}>
        <div style={abs(s * (w - 36) - 14, (1 - v) * sq - 14, { width: 28, height: 28, borderRadius: '50%', border: '4px solid #fff', boxShadow: '0 0 0 2px #333, 0 2px 6px rgba(0,0,0,0.5)', boxSizing: 'border-box' })} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', backgroundColor: hsvHex(hsv), border: '2px solid #C9C7D6', flexShrink: 0 }} />
        <div style={{ position: 'relative', flex: 1, height: 20, borderRadius: 10, background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }}>
          <div style={abs((hh / 360) * (w - 36 - 68) - 12, -4, { width: 24, height: 28, borderRadius: 6, background: '#fff', boxShadow: '0 0 0 2px #333' })} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
        <div style={{ fontSize: 22, color: '#5A5870', fontWeight: 600 }}>HEX</div>
        <div style={{ flex: 1, fontFamily: MONO, fontSize: 32, fontWeight: 700, color: '#1D1B2E', border: '2px solid #C9C7D6', borderRadius: 8, padding: '6px 14px', boxShadow: glow ? `0 0 0 ${5 * glow}px rgba(240,160,75,${glow})` : 'none' }}>{code}</div>
      </div>
    </div>
  )
}
// Posição da área de tons em que o seletor está, para o cursor do mouse.
export const pickerDot = (hsv, w = 520, sq = 330) => ({ x: 18 + hsv[1] * (w - 36), y: 18 + (1 - hsv[2]) * sq })
// HSV interpolado de a até b (t de 0 a 1); no fim, o código exato de b.
export const lerpHsv = (a, b, t) => {
  const k = clamp01(t)
  const e = 1 - Math.pow(1 - k, 3)
  return a.map((x, i) => x + (b[i] - x) * e)
}

// ---------------------------------------------------------------- verificador de contraste genérico
export const Checker = ({ fg, bg, w = 760, op = 1, result = 1, sample = 'Fale comigo', style }) => {
  const r = contrast(fg, bg)
  const pass = r >= 4.5
  return (
    <div style={{ width: w, opacity: op, background: C.white, border: `4px solid ${C.purple}`, borderRadius: 24, padding: '20px 28px', boxSizing: 'border-box', boxShadow: '0 14px 30px rgba(38,33,92,0.16)', fontFamily: FONT, ...style }}>
      <div style={{ fontSize: 30, fontWeight: 800, color: C.night, marginBottom: 14 }}>verificador de contraste</div>
      <div style={{ display: 'flex', gap: 20 }}>
        {[['texto', fg], ['fundo', bg]].map(([k, v]) => (
          <div key={k} style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#5F5A86', marginBottom: 6 }}>{k}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '3px solid #C9C5EE', borderRadius: 12, padding: '6px 12px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: v, border: '2px solid #9A97B8' }} />
              <span style={{ fontFamily: MONO, fontSize: 32, fontWeight: 700, color: C.night }}>{v}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, borderRadius: 14, backgroundColor: bg, padding: '14px 20px', fontSize: 40, fontWeight: 700, color: fg, border: '2px solid #E2E0F2' }}>{sample}</div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 16, opacity: result }}>
        {pass ? <Check size={56} /> : <Warn size={56} />}
        <span style={{ fontFamily: MONO, fontSize: 44, fontWeight: 700, color: C.night }}>{ratioTxt(fg, bg)}</span>
        <span style={{ fontSize: 34, fontWeight: 700, color: pass ? '#4E7A1F' : '#B5452C' }}>{pass ? '— passa' : '— não passa para texto'}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- editor: valores trocados
// lines: [{ t } | { sel } | { prop, old, neu, at, typedAt }]. Valor antigo: cinza e riscado a partir de at;
// o novo é digitado depois. Mesma geometria do Code (fs, linha = 1,5 fs, numeração à esquerda).
export const SwapCode = ({ frame, lines, fs = 26, scroll = 0, speed = 2 }) => {
  const lineH = fs * 1.5
  const P = ({ c, children, style }) => <span style={{ color: c, ...style }}>{children}</span>
  return (
    <div style={{ fontFamily: MONO, fontSize: fs, lineHeight: `${lineH}px`, color: SYN.text, transform: `translateY(${-scroll * lineH}px)` }}>
      {lines.map((l, i) => {
        if (l.show != null && frame < l.show) return null
        let body = null
        const typedN = (txt, at) => (at == null ? txt.length : Math.max(0, Math.min(txt.length, Math.floor((frame - at) / speed))))
        if (l.sel != null) {
          const n = typedN(l.sel + ' {', l.typedAt)
          const s = (l.sel + ' {').slice(0, n)
          const k = Math.min(n, l.sel.length)
          body = <><P c={SYN.tag}>{s.slice(0, k)}</P><P c={SYN.punct}>{s.slice(k)}</P></>
        } else if (l.close) {
          body = (l.typedAt == null || frame >= l.typedAt) ? <P c={SYN.punct}>{'}'}</P> : null
        } else if (l.prop != null) {
          const pn = typedN(l.prop + ': ', l.typedAt)
          const struck = l.at != null && frame >= l.at
          const strikeP = l.at != null ? clamp01((frame - l.at) / 10) : 0
          const neuAt = l.at != null ? l.at + 14 : l.typedAt != null ? l.typedAt + Math.ceil((l.prop.length + 2) * speed) : null
          const nn = neuAt == null ? (l.neu || '').length : typedN(l.neu || '', neuAt)
          const neu = (l.neu || '').slice(0, nn)
          const ps = (l.prop + ': ').slice(0, pn)
          body = (
            <>
              <P c={SYN.attr}>{ps.slice(0, Math.min(pn, l.prop.length))}</P><P c={SYN.punct}>{ps.slice(l.prop.length)}</P>
              {l.old && (l.at == null || frame < l.at + 60 || !l.drop) && (
                <span style={{ position: 'relative', color: struck ? '#8E89A8' : SYN.string, opacity: struck ? 1 - 0.35 * strikeP : 1, marginRight: struck && neu ? fs * 0.5 : 0 }}>
                  {l.old}
                  {struck && <span style={{ position: 'absolute', left: -2, top: '52%', height: 3, width: `calc(${strikeP * 100}% + 4px)`, background: '#E8B860' }} />}
                </span>
              )}
              {neu && <><P c={SYN.string}>{neu.replace(/;$/, '')}</P><P c={SYN.punct}>{neu.endsWith(';') ? ';' : ''}</P></>}
            </>
          )
        } else body = l.t || ''
        return (
          <div key={i} style={{ display: 'flex', height: lineH, background: l.hl && frame >= l.hl[0] && frame < l.hl[1] ? 'rgba(127,119,221,0.22)' : 'transparent' }}>
            <span style={{ width: fs * 1.8, textAlign: 'right', paddingRight: fs * 0.7, color: '#6E69A8', flexShrink: 0 }}>{i + 1}</span>
            <span style={{ whiteSpace: 'pre' }}>{l.ind ? '  ' : ''}{body}</span>
          </div>
        )
      })}
    </div>
  )
}

export { interpolate, Cross }
