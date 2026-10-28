// Visuais das cenas dos Reels (um por visual.tipo do roteiro.json).
// Cada visual recebe { v, frame, dur, fps, sync, words, hue, mode } — frame/dur em frames locais da cena.
import React from 'react'
import { CodeTyping, EditorWindow } from '../components/CodeTyping.jsx'
import { BrowserMock } from '../components/BrowserMock.jsx'
import { LogoReveal } from '../components/LogoReveal.jsx'
import { LogoMark, Wordmark } from '../components/Logo.jsx'
import { Check, Confetti } from '../components/Marks.jsx'
import { Cursor, cursorMotion } from '../components/Navigation.jsx'
import { CODE, CONTENT_W, DISPLAY, GRAD, HUES, R, SANS, SITE_URL } from './theme.js'
import { Glass, Headline, PillLabel, clamp, easeOut, pop, ramp, rgba } from './core.jsx'
import { FakeQR, Hearts, HtmlBlock, Icon, Phone, estimateHtmlHeight, iconFor, parseHtml } from './ui.jsx'

const lerp = (a, b, t) => a + (b - a) * t
const isTagLike = (s) => /^<.*>$/.test(s.trim())
const ordered = (arr, gap = 4) => { for (let i = 1; i < arr.length; i++) arr[i] = Math.max(arr[i], arr[i - 1] + gap); return arr }

// Instantes em que cada item é dito (ou distribuídos pela cena, quando não aparecem na fala).
const itemTimes = (items, sync, dur, a = 0.1, b = 0.72) => {
  let after = 0
  const n = items.length
  return ordered(items.map((it, i) => {
    const fallback = Math.round(dur * (n === 1 ? a : a + ((b - a) * i) / (n - 1)))
    const key = it.replace(/["“”.…]/g, ' ').trim().split(/\s+/).slice(0, 2).join(' ')
    const t = sync(key, null, after)
    if (t != null && Math.abs(t - fallback) < dur * 0.45) { after = t + 1; return Math.max(4, t - 3) }
    return fallback
  }), 5)
}

// ================================================================ price-tags
const TAG_COLORS = [
  { bg: GRAD.gold, fg: R.onGold },
  { bg: 'linear-gradient(135deg, #FF8CC4 0%, #F0509E 100%)', fg: R.night950 },
  { bg: 'linear-gradient(135deg, #FFB37E 0%, #FF8A3D 100%)', fg: R.night950 },
]
export const PriceTags = ({ v, frame, dur, fps }) => {
  const tags = v.tags || []
  const spots = [{ y: -215, r: -8, s: -1 }, { y: 0, r: 6, s: 1 }, { y: 215, r: -4, s: -1 }]
  const strikeAt = Math.round(dur * 0.48)
  const fallAt = Math.round(dur * 0.8)
  return (
    <div style={{ position: 'relative', width: CONTENT_W, height: 680 }}>
      {tags.map((t, i) => {
        const sp = spots[i % 3]
        const size = t.length > 16 ? 50 : t.length > 12 ? 58 : 66
        const estW = t.length * size * 0.6 + 150
        const x = sp.s * Math.max(0, Math.min(170, (CONTENT_W - estW) / 2 - 10))
        const p = pop(frame, fps, i * 4, { damping: 10, stiffness: 210 })
        const wig = Math.sin(frame / 5 + i * 2) * 2.2
        const st = easeOut(ramp(frame, strikeAt + i * 4, strikeAt + i * 4 + 8))
        const fall = Math.pow(ramp(frame, fallAt + i * 3, fallAt + i * 3 + 16), 2)
        const c = TAG_COLORS[i % 3]
        return (
          <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) translate(${x}px, ${sp.y + fall * 520}px) rotate(${sp.r + wig + fall * 28}deg) scale(${0.3 + 0.7 * p})`, opacity: clamp(p * 2) * (1 - fall * 0.9), filter: `drop-shadow(0 26px 40px rgba(5,3,25,0.55)) grayscale(${st * 0.75})` }}>
            <div style={{ position: 'relative', background: c.bg, color: c.fg, clipPath: 'polygon(54px 0, 100% 0, 100% 100%, 54px 100%, 0 50%)', borderRadius: 18, padding: '30px 54px 34px 96px', fontFamily: DISPLAY, fontWeight: 800, fontSize: size, letterSpacing: '-0.02em', whiteSpace: 'nowrap', lineHeight: 1.05 }}>
              <div style={{ position: 'absolute', left: 40, top: '50%', width: 26, height: 26, marginTop: -13, borderRadius: '50%', background: R.night900, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }} />
              {t}
            </div>
            <div style={{ position: 'absolute', left: 70, right: 24, top: '50%', height: 12, marginTop: -6, borderRadius: 6, background: R.red, transformOrigin: '0 50%', transform: `rotate(-5deg) scaleX(${st})`, boxShadow: '0 0 18px rgba(255,107,91,0.8)' }} />
          </div>
        )
      })}
    </div>
  )
}

// ================================================================ logo-unlock
export const LogoUnlock = ({ v, frame, dur, fps }) => {
  const chips = v.itens || ['Do zero', 'Em português', 'No seu ritmo']
  const unlock = 14
  const rays = ramp(frame, unlock + 2, unlock + 16)
  return (
    <div style={{ position: 'relative', width: CONTENT_W, height: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 80 }}>
      <div style={{ position: 'absolute', left: '50%', top: '42%', width: 1000, height: 1000, marginLeft: -500, marginTop: -500, borderRadius: '50%', background: `repeating-conic-gradient(from ${frame * 0.6}deg, rgba(201,194,255,0) 0deg 9deg, rgba(201,194,255,0.16) 9deg 13deg)`, WebkitMaskImage: 'radial-gradient(circle, #000 10%, transparent 62%)', maskImage: 'radial-gradient(circle, #000 10%, transparent 62%)', opacity: rays, transform: `scale(${0.6 + 0.4 * rays})` }} />
      <div style={{ position: 'absolute', left: '50%', top: '42%', width: 520, height: 520, marginLeft: -260, marginTop: -260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,108,255,0.55), transparent 65%)', opacity: 0.4 + rays * 0.6 }} />
      <div style={{ position: 'relative', filter: 'drop-shadow(0 20px 50px rgba(112,72,232,0.6))' }}>
        <LogoReveal start={-6} height={200} unlockAt={unlock + 6} wordColor={R.white} bodyColor={R.violet} />
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
        {chips.map((c, i) => {
          const p = pop(frame, fps, Math.round(dur * 0.3) + i * 6)
          const hue = HUES[i % HUES.length]
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 30px', borderRadius: 999, background: 'rgba(18,15,51,0.6)', border: `2px solid ${rgba(hue, 0.7)}`, boxShadow: `0 0 34px ${rgba(hue, 0.3)}`, fontFamily: DISPLAY, fontWeight: 800, fontSize: 38, color: R.white, transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + 0.3 * p})`, opacity: clamp(p * 1.5) }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: hue, boxShadow: `0 0 12px ${hue}` }} />
              {c}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ================================================================ level-steps
export const LevelSteps = ({ frame, dur, fps }) => {
  const N = 5
  const W = 176
  const GAP = 20
  const base = 172
  const stepH = (i) => base + i * 96
  const H = stepH(N - 1) + 40
  const at = Array.from({ length: N }, (_, i) => Math.round(dur * (0.05 + 0.15 * i)))
  const lit = at.map((a) => ramp(frame, a, a + 8))
  const cur = Math.max(0, at.filter((a) => frame >= a).length - 1)
  const h = easeOut(ramp(frame, at[cur], at[cur] + 10))
  const xOf = (i) => i * (W + GAP) + W / 2
  const topOf = (i) => H - stepH(i)
  const prev = Math.max(0, cur - 1)
  const tx = cur === 0 ? xOf(0) : lerp(xOf(prev), xOf(cur), h)
  const ty = (cur === 0 ? topOf(0) : lerp(topOf(prev), topOf(cur), h)) - Math.sin(h * Math.PI) * (cur === 0 ? 0 : 110)
  const tokenIn = pop(frame, fps, at[0])
  const totalW = N * W + (N - 1) * GAP
  return (
    <div style={{ position: 'relative', width: totalW, height: H + 30 }}>
      {Array.from({ length: N }).map((_, i) => {
        const l = lit[i]
        const hue = HUES[i]
        const p = pop(frame, fps, at[i])
        return (
          <div key={i} style={{ position: 'absolute', left: i * (W + GAP), bottom: 30, width: W, height: stepH(i), borderRadius: 26, overflow: 'hidden', border: `2px ${l > 0.5 ? 'solid' : 'dashed'} ${l > 0.5 ? rgba(hue, 0.9) : 'rgba(255,255,255,0.22)'}`, background: l > 0 ? `linear-gradient(180deg, ${rgba(hue, 0.95 * l)} 0%, ${rgba(hue, 0.55 * l)} 100%)` : 'rgba(255,255,255,0.05)', boxShadow: l > 0.5 ? `0 0 ${50 * l}px ${rgba(hue, 0.6)}, inset 0 3px 0 rgba(255,255,255,0.45)` : 'none', transform: `scaleY(${0.96 + 0.04 * p})`, transformOrigin: '50% 100%' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)', opacity: 1 - l }} />
            <div style={{ position: 'absolute', top: 18, left: 0, right: 0, textAlign: 'center', color: l > 0.5 ? R.night950 : 'rgba(255,255,255,0.55)', fontFamily: SANS, fontWeight: 800 }}>
              <div style={{ fontSize: 22, letterSpacing: '0.14em' }}>NÍVEL</div>
              <div style={{ fontFamily: DISPLAY, fontSize: 82, lineHeight: 1, letterSpacing: '-0.04em' }}>{i + 1}</div>
            </div>
            {l < 0.5 && <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}><Icon name="lock" size={46} color="rgba(255,255,255,0.4)" /></div>}
          </div>
        )
      })}
      <div style={{ position: 'absolute', left: tx - 50, top: ty - 92 - 30 + 30, width: 100, height: 100, borderRadius: '50%', background: R.white, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 6px ${rgba(HUES[cur], 0.6)}, 0 14px 40px rgba(5,3,25,0.5), 0 0 50px ${rgba(HUES[cur], 0.8)}`, transform: `scale(${tokenIn})` }}>
        <LogoMark height={62} keyColor={R.green} bodyColor={R.purple} />
      </div>
    </div>
  )
}

// ================================================================ certificate-qr
export const CertificateQR = ({ frame, dur, fps }) => {
  const enter = pop(frame, fps, 0, { damping: 15, stiffness: 140 })
  const scanA = Math.round(dur * 0.38)
  const scan = ramp(frame, scanA, scanA + 22)
  const validAt = scanA + 24
  const valid = pop(frame, fps, validAt, { damping: 11, stiffness: 180 })
  const qrSize = 196
  return (
    <div style={{ position: 'relative', width: CONTENT_W, height: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      <div style={{ width: 920, borderRadius: 30, padding: 18, background: GRAD.gold, boxShadow: '0 40px 90px -20px rgba(5,3,25,0.8), 0 0 80px -10px rgba(245,190,60,0.45)', transform: `translateX(${(1 - enter) * 500}px) rotate(${(1 - enter) * 10}deg)`, opacity: clamp(enter * 1.5) }}>
        <div style={{ borderRadius: 18, background: 'linear-gradient(155deg, #FFFFFF 0%, #F6F5FD 55%, #EAF7FF 100%)', padding: '34px 40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -120, top: -120, width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,108,255,0.18), transparent 70%)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <LogoMark height={54} />
              <Wordmark size={42} color={R.night} />
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: '0.22em', color: '#5B3FD6' }}>CERTIFICADO</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 30 }}>
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontFamily: SANS, fontSize: 26, color: '#5F5A86' }}>Certificamos que</div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 74, letterSpacing: '-0.03em', color: R.night, lineHeight: 1.05, marginTop: 6 }}>Ana Souza</div>
              <div style={{ fontFamily: SANS, fontSize: 28, color: '#3B3670', marginTop: 12, lineHeight: 1.3 }}>concluiu o <b>Nível 1 · HTML</b> e foi aprovada na prova do nível.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24 }}>
                <div style={{ width: 74, height: 74, borderRadius: '50%', background: GRAD.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(132,90,0,0.35)' }}><Icon name="star" size={40} color={R.onGold} /></div>
                <div style={{ fontFamily: SANS, fontSize: 22, color: '#5F5A86', lineHeight: 1.3 }}>Código de verificação<br /><b style={{ fontFamily: CODE, color: R.night }}>DTV-7K2Q-91XA</b></div>
              </div>
            </div>
            <div style={{ position: 'relative', padding: 12, background: R.white, borderRadius: 18, boxShadow: '0 8px 24px rgba(38,33,92,0.16)' }}>
              <FakeQR size={qrSize} seed="ana-souza" />
              {scan > 0 && scan < 1 && (
                <div style={{ position: 'absolute', left: 4, right: 4, top: 12 + Math.sin(scan * Math.PI * 2 - Math.PI / 2) * (qrSize / 2) + qrSize / 2, height: 6, borderRadius: 3, background: R.cyan, boxShadow: `0 0 24px 6px ${rgba(R.cyan, 0.8)}` }} />
              )}
              {scan > 0 && <div style={{ position: 'absolute', inset: -6, borderRadius: 22, border: `4px solid ${frame >= validAt ? R.green : R.cyan}`, opacity: 0.9 }} />}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 40px 20px 24px', borderRadius: 999, background: 'rgba(18,15,51,0.75)', border: `2.5px solid ${R.green}`, boxShadow: `0 0 50px ${rgba(R.green, 0.45)}`, transform: `scale(${valid})`, opacity: clamp(valid * 2) }}>
        <Check size={64} />
        <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 50, color: R.white, letterSpacing: '-0.02em' }}>Certificado válido</span>
      </div>
      <Confetti start={validAt} x0={40} spread={880} />
    </div>
  )
}

// ================================================================ plan-cards
const PLANS = [
  { name: 'Grátis', cur: 'R$', price: '0', per: 'pra sempre', lines: ['Para começar', 'Vidas diárias'], bg: 'linear-gradient(165deg, rgba(139,108,255,0.30) 0%, rgba(26,22,64,0.85) 100%)', fg: R.white, sub: R.muted, border: rgba(R.violet, 0.8) },
  { name: 'Gold', cur: 'R$', price: '39,99', per: '/mês', lines: ['Todos os níveis', 'Certificado incluso'], bg: GRAD.gold, fg: R.onGold, sub: '#6B4A00', border: '#FFE7A3', featured: true },
  { name: 'Platinum', cur: 'R$', price: '49,99', per: '/mês', lines: ['Tudo do Gold', 'Prova sem espera'], bg: GRAD.platinum, fg: R.night, sub: '#4A4480', border: '#F4F3FB' },
]
export const PlanCards = ({ frame, dur, fps, sync }) => {
  const chipsAt = sync('mensal', Math.round(dur * 0.45)) - 3
  const chips = ['Mensal', 'Sem fidelidade', 'Cancela quando quiser']
  return (
    <div style={{ width: CONTENT_W, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
      <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
        {PLANS.map((pl, i) => {
          const p = pop(frame, fps, i * 6, { damping: 12, stiffness: 160 })
          const said = sync(pl.name, null)
          const hl = said == null ? 0 : Math.max(0, 1 - Math.abs(frame - said - 8) / 18)
          const num = parseFloat(pl.price.replace(',', '.'))
          const count = easeOut(ramp(frame, i * 6 + 4, i * 6 + 22))
          const shown = num === 0 ? '0' : (num * count).toFixed(2).replace('.', ',')
          return (
            <div key={i} style={{ width: 300, height: pl.featured ? 500 : 470, borderRadius: 34, background: pl.bg, border: `2.5px solid ${pl.border}`, boxShadow: `0 30px 70px -20px rgba(5,3,25,0.8)${pl.featured ? ', 0 0 70px -6px rgba(245,190,60,0.6)' : ''}${hl > 0 ? `, 0 0 ${80 * hl}px ${rgba(R.cyan, 0.7 * hl)}` : ''}`, color: pl.fg, padding: '36px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transform: `translateY(${(1 - p) * 160}px) scale(${(0.8 + 0.2 * p) * (1 + hl * 0.05)})`, opacity: clamp(p * 1.6), position: 'relative' }}>
              {pl.featured && <div style={{ position: 'absolute', top: -22, padding: '8px 20px', borderRadius: 999, background: R.night950, color: R.gold, fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: '0.14em', border: `2px solid ${R.gold}` }}>COMPLETO</div>}
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 46, letterSpacing: '-0.02em' }}>{pl.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginTop: 26 }}>
                <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, marginTop: 12 }}>{pl.cur}</span>
                <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 76, letterSpacing: '-0.04em', lineHeight: 1 }}>{shown}</span>
              </div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, color: pl.sub, marginTop: 6 }}>{pl.per}</div>
              <div style={{ width: '80%', height: 2, background: pl.fg, opacity: 0.18, margin: '28px 0 22px' }} />
              {pl.lines.map((l, k) => <div key={k} style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, lineHeight: 1.25, marginBottom: 14 }}>{l}</div>)}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        {chips.map((c, i) => {
          const p = pop(frame, fps, chipsAt + i * 5)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px 14px 18px', borderRadius: 999, background: 'rgba(18,15,51,0.7)', border: `2px solid ${rgba(R.cyan, 0.6)}`, fontFamily: SANS, fontWeight: 800, fontSize: 32, color: R.white, transform: `scale(${0.6 + 0.4 * p})`, opacity: clamp(p * 1.5) }}>
              <Icon name="shield" size={34} color={R.cyan} />
              {c}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ================================================================ badges
export const Badges = ({ v, frame, dur, fps, sync }) => {
  const items = v.itens || []
  if (items.length && items.every((t) => t.trim().length <= 4)) return <Keycaps items={items} frame={frame} dur={dur} fps={fps} sync={sync} />
  const times = itemTimes(items, sync, dur, 0.06, 0.6)
  const echo = items.length > 1 && items.every((t) => t === items[0])
  return (
    <div style={{ width: CONTENT_W, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
      {items.map((t, i) => {
        const p = pop(frame, fps, times[i], { damping: 11, stiffness: 180 })
        const hue = echo ? R.cyan : HUES[(i + 1) % HUES.length]
        const icon = iconFor(t)
        const side = i % 2 === 0 ? -1 : 1
        const shake = echo && frame > times[items.length - 1] + 10 ? Math.sin(frame * 1.4 + i) * 5 : 0
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, padding: '22px 44px 22px 22px', borderRadius: 999, background: 'linear-gradient(160deg, rgba(255,255,255,0.13), rgba(255,255,255,0.04))', border: `2.5px solid ${rgba(hue, 0.75)}`, boxShadow: `0 24px 60px -20px rgba(5,3,25,0.8), 0 0 50px -8px ${rgba(hue, 0.55)}`, transform: `translateX(${(1 - p) * side * 260 + shake}px) rotate(${(1 - p) * side * 8 + (echo ? (i - 1) * 2 : 0)}deg) scale(${0.7 + 0.3 * p})`, opacity: clamp(p * 1.6) * (echo ? 1 - i * 0.18 : 1) }}>
            <div style={{ width: 92, height: 92, borderRadius: '50%', background: hue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${rgba(hue, 0.7)}` }}>
              <Icon name={icon} size={54} color={R.night950} />
            </div>
            <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: t.length > 18 ? 50 : 58, letterSpacing: '-0.02em', color: echo ? '#8FD8FF' : R.white, textDecoration: icon === 'link' ? 'underline' : 'none', textUnderlineOffset: 10, textDecorationThickness: 4, whiteSpace: 'nowrap' }}>{t}</span>
          </div>
        )
      })}
    </div>
  )
}

const Keycaps = ({ items, frame, dur, fps, sync }) => {
  const keys = items.filter((t) => t.trim() !== '+')
  let after = 0
  const pressAt = keys.map((k, i) => {
    const spoken = k.toLowerCase() === 'ctrl' ? 'control' : k
    const t = sync(spoken, null, after)
    if (t != null) { after = t + 1; return t }
    return Math.round(dur * (0.3 + 0.2 * i))
  })
  let ki = 0
  const both = Math.max(...pressAt) + 6
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 34, justifyContent: 'center' }}>
      {items.map((t, i) => {
        if (t.trim() === '+') {
          const p = pop(frame, fps, 6)
          return <span key={i} style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 120, color: R.accent, transform: `scale(${p})`, opacity: clamp(p * 1.5) }}>+</span>
        }
        const k = ki++
        const p = pop(frame, fps, k * 6, { damping: 11, stiffness: 180 })
        const press = frame >= pressAt[k] ? 1 - 0.6 * clamp((frame - pressAt[k]) / 3) * (frame > both + 14 ? 0 : 1) : 0
        const down = frame >= pressAt[k] && frame < both + 14 ? 1 : 0
        const hue = HUES[k % HUES.length]
        const w = t.length > 2 ? 330 : 240
        return (
          <div key={i} style={{ width: w, height: 240, borderRadius: 40, background: 'linear-gradient(180deg, #FFFFFF 0%, #E6E4F3 100%)', boxShadow: `0 ${down ? 6 : 22}px 0 #9E97D6, 0 ${down ? 10 : 34}px 50px rgba(5,3,25,0.6)${down ? `, 0 0 70px ${rgba(hue, 0.9)}` : ''}`, transform: `translateY(${down ? 16 : 0}px) scale(${0.6 + 0.4 * p})`, opacity: clamp(p * 1.5), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: t.length > 2 ? 96 : 120, color: R.night, letterSpacing: '-0.03em', border: `4px solid ${down ? hue : '#FFFFFF'}` }}>
            {t}
            {press > 0 ? null : null}
          </div>
        )
      })}
    </div>
  )
}

// ================================================================ editor (código digitando)
const codeFont = (code, max = 52, width = CONTENT_W - 28) => {
  const L = Math.max(...code.split('\n').map((l) => l.length))
  return Math.max(38, Math.min(max, Math.floor(width / (0.55 * L + 1.9))))
}
// linhas exibidas (com quebra automática) para dimensionar a janela do editor
const visualLines = (code, fs, width = CONTENT_W - 28 - 14 * 2) => code.split('\n').reduce((a, l) => a + Math.max(1, Math.ceil((l.length * 0.55 * fs) / (width - fs * 1.8))), 0)
const editorStyle = { background: 'rgba(14,11,42,0.94)', border: '2px solid rgba(139,108,255,0.6)', borderRadius: 30, boxShadow: '0 40px 90px -24px rgba(5,3,25,0.9), 0 0 70px -10px rgba(139,108,255,0.5)' }

export const CodeTypingVisual = ({ v, frame, dur, fps }) => {
  const code = v.codigo || ''
  const fs = codeFont(code)
  const lines = visualLines(code, fs)
  const height = lines * fs * 1.5 + 44 + 64 + 20
  const typeFrames = Math.min(Math.round(dur * 0.5), Math.round(code.length * 1.1))
  const hlAt = 4 + typeFrames + 6
  const enter = pop(frame, fps, 0, { damping: 15, stiffness: 150 })
  return (
    <div style={{ transform: `translateY(${(1 - enter) * 80}px) scale(${0.9 + 0.1 * enter})`, opacity: clamp(enter * 1.5) }}>
      <EditorWindow filename="index.html" width={CONTENT_W} height={height} style={editorStyle}>
        <CodeTyping
          segments={[{ text: code, start: 4, frames: typeFrames }]}
          lineHighlights={(v.destaque || []).map((l, k) => ({ line: l - 1, at: hlAt + k * 5 }))}
          lineColor="rgba(139,108,255,0.34)"
          fontSize={fs}
          wrap
        />
      </EditorWindow>
    </div>
  )
}

// ================================================================ browser-preview
const SCALE_B = 1.25
const PageContent = ({ blocks, frame, fps, scale = 1, stagger = 6, start = 6, animate = true }) => (
  <div>
    {blocks.map((b, i) => {
      const p = animate ? pop(frame, fps, start + i * stagger) : 1
      return (
        <div key={i} style={{ transform: `translateY(${(1 - p) * 30}px)`, opacity: clamp(p * 1.5) }}>
          <HtmlBlock block={b} scale={scale} />
        </div>
      )
    })}
  </div>
)

export const BrowserPreview = ({ v, frame, dur, fps }) => {
  const { blocks, title } = parseHtml(v.html || '')
  const est = estimateHtmlHeight(blocks)
  const innerMax = 560 - 160
  const scale = Math.min(1.5, innerMax / Math.max(1, est))
  const designH = Math.max(380, Math.min(560, est * scale + 170))
  const enter = pop(frame, fps, 0, { damping: 15, stiffness: 150 })
  return (
    <div style={{ width: 760 * SCALE_B, height: designH * SCALE_B, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ transform: `scale(${SCALE_B * (0.9 + 0.1 * enter)}) translateY(${(1 - enter) * 60}px)`, transformOrigin: '50% 0', opacity: clamp(enter * 1.5) }}>
        <BrowserMock tabTitle={title || 'Minha página'} url="ana.exemplo.com" width={760} height={designH} style={{ boxShadow: '0 40px 90px -20px rgba(5,3,25,0.85), 0 0 70px -10px rgba(62,197,255,0.45)', border: '2px solid rgba(255,255,255,0.6)', borderRadius: 24 }}>
          <PageContent blocks={blocks} frame={frame} fps={fps} scale={scale} />
        </BrowserMock>
      </div>
    </div>
  )
}

// ================================================================ code-and-preview
export const CodeAndPreview = ({ v, frame, dur, fps }) => {
  const code = v.codigo || ''
  const fs = Math.min(38, codeFont(code))
  const lines = visualLines(code, fs)
  const editorH = lines * fs * 1.5 + 44 + 64 + 10
  const typeStart = 4
  const typeFrames = Math.min(Math.round(dur * 0.55), Math.round(code.length * 1.3))
  const count = Math.floor(clamp((frame - typeStart) / Math.max(1, typeFrames)) * code.length + 1e-6)
  const finalBlocks = parseHtml(code).blocks
  const { blocks } = parseHtml(code.slice(0, count))
  const browserScreenH = Math.max(330, 760 - editorH - 50)
  const designH = browserScreenH / SCALE_B
  const avail = designH - 100 - 40
  const scale = Math.min(1.6, avail / Math.max(1, estimateHtmlHeight(finalBlocks)))
  const e1 = pop(frame, fps, 0, { damping: 15, stiffness: 150 })
  const e2 = pop(frame, fps, 5, { damping: 15, stiffness: 150 })
  const live = 0.5 + 0.5 * Math.sin(frame / 4)
  return (
    <div style={{ width: CONTENT_W, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50, position: 'relative' }}>
      <div style={{ transform: `translateY(${(1 - e1) * -60}px)`, opacity: clamp(e1 * 1.5) }}>
        <EditorWindow filename="index.html" width={CONTENT_W} height={editorH} style={editorStyle}>
          <CodeTyping segments={[{ text: code, start: typeStart, frames: typeFrames }]} fontSize={fs} wrap />
        </EditorWindow>
      </div>
      <div style={{ position: 'absolute', top: editorH + 2, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 999, background: R.night950, border: `2px solid ${rgba(R.cyan, 0.8)}`, fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: '0.14em', color: R.white, opacity: clamp(e2 * 1.5) }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: R.cyan, boxShadow: `0 0 ${10 + 10 * live}px ${R.cyan}`, opacity: 0.5 + 0.5 * live }} />
        RESULTADO AO VIVO
      </div>
      <div style={{ width: 760 * SCALE_B, height: browserScreenH, display: 'flex', justifyContent: 'center', transform: `translateY(${(1 - e2) * 80}px)`, opacity: clamp(e2 * 1.5) }}>
        <div style={{ transform: `scale(${SCALE_B})`, transformOrigin: '50% 0' }}>
          <BrowserMock tabTitle="Minha página" url="ana.exemplo.com" width={760} height={designH} style={{ boxShadow: '0 40px 90px -20px rgba(5,3,25,0.85), 0 0 70px -10px rgba(62,197,255,0.45)', border: '2px solid rgba(255,255,255,0.6)', borderRadius: 24 }}>
            <PageContent blocks={blocks} frame={frame} fps={fps} scale={scale} animate={false} />
          </BrowserMock>
        </div>
      </div>
    </div>
  )
}

// ================================================================ quiz
export const Quiz = ({ v, frame, dur, fps, sync, words, mode }) => {
  const reveal = mode === 'reveal'
  const opts = v.opcoes || []
  const tres = sync('três', null)
  const dois = sync('dois', null, tres || 0)
  const um = sync('um', null, dois || 0)
  const last = words.length ? words[words.length - 1].s : Math.round(dur * 0.8)
  const revealAt = reveal ? (um != null ? um + 8 : last + 6) : Infinity
  const countEnd = reveal ? revealAt : dur
  const timer = reveal ? lerp(0.5, 0, clamp(frame / Math.max(1, countEnd))) : lerp(1, 0.5, clamp(frame / Math.max(1, dur)))
  const num = !reveal ? null : frame >= revealAt ? null : um != null && frame >= um ? '1' : dois != null && frame >= dois ? '2' : tres != null && frame >= tres ? '3' : null
  const numAt = num === '1' ? um : num === '2' ? dois : tres
  const np = num ? pop(frame, fps, numAt, { damping: 9, stiffness: 220 }) : 0
  const r = 62
  const circ = 2 * Math.PI * r
  const qp = reveal ? 1 : pop(frame, fps, 0, { damping: 14, stiffness: 160 })
  const rv = Number.isFinite(revealAt) ? pop(frame, fps, revealAt, { damping: 10, stiffness: 200 }) : 0
  const scanIdx = reveal && frame < revealAt && tres != null && frame >= tres ? Math.floor((frame - tres) / 7) % opts.length : -1
  return (
    <div style={{ width: CONTENT_W, display: 'flex', flexDirection: 'column', gap: 30, position: 'relative' }}>
      <Glass glow={R.violet} style={{ padding: '34px 40px', display: 'flex', alignItems: 'center', gap: 30, transform: `scale(${0.85 + 0.15 * qp})`, opacity: clamp(qp * 1.5) }}>
        <div style={{ flex: 1, fontFamily: DISPLAY, fontWeight: 800, fontSize: 56, lineHeight: 1.1, letterSpacing: '-0.025em', color: R.white }}>{v.pergunta}</div>
        <div style={{ position: 'relative', width: 150, height: 150, flexShrink: 0 }}>
          <svg width={150} height={150} viewBox="0 0 150 150" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={75} cy={75} r={r} fill="rgba(18,15,51,0.6)" stroke="rgba(255,255,255,0.14)" strokeWidth={12} />
            <circle cx={75} cy={75} r={r} fill="none" stroke={frame >= revealAt ? R.green : timer < 0.2 ? R.magenta : R.cyan} strokeWidth={12} strokeLinecap="round" strokeDasharray={`${circ * (frame >= revealAt ? 1 : timer)} ${circ}`} style={{ filter: `drop-shadow(0 0 10px ${frame >= revealAt ? R.green : R.cyan})` }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 78, color: R.white }}>
            {frame >= revealAt ? <span style={{ transform: `scale(${rv})` }}><Icon name="check" size={70} color={R.green} /></span> : num ? <span style={{ display: 'inline-block', transform: `scale(${0.4 + 0.6 * np})`, textShadow: `0 0 30px ${R.cyan}` }}>{num}</span> : <Icon name="spark" size={56} color={R.accent} style={{ transform: `rotate(${frame * 3}deg)` }} />}
          </div>
        </div>
      </Glass>
      {opts.map((o, i) => {
        const p = reveal ? 1 : pop(frame, fps, 8 + i * 5, { damping: 12, stiffness: 180 })
        const correct = i === v.correta
        const done = frame >= revealAt
        const hue = HUES[i % HUES.length]
        const scan = scanIdx === i
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 28, height: 132, padding: '0 34px 0 24px', borderRadius: 34, background: done && correct ? GRAD.success : 'linear-gradient(160deg, rgba(255,255,255,0.13), rgba(255,255,255,0.04))', border: `2.5px solid ${done && correct ? R.greenLight : scan ? R.accent : 'rgba(255,255,255,0.16)'}`, boxShadow: done && correct ? `0 0 70px ${rgba(R.green, 0.7)}` : scan ? `0 0 40px ${rgba(R.violet, 0.7)}` : '0 20px 50px -20px rgba(5,3,25,0.8)', transform: `translateX(${(1 - p) * (i % 2 ? 1 : -1) * 300}px) scale(${done && correct ? 1 + 0.05 * rv : scan ? 1.02 : 1})`, opacity: clamp(p * 1.6) * (done && !correct ? 0.35 : 1) }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: done && correct ? R.night950 : hue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 40, color: done && correct ? R.green : R.night950, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</div>
            <span style={{ flex: 1, fontFamily: isTagLike(o) ? CODE : DISPLAY, fontWeight: 800, fontSize: isTagLike(o) ? 64 : 52, color: done && correct ? R.night950 : R.white, letterSpacing: isTagLike(o) ? 0 : '-0.02em' }}>{o}</span>
            {done && correct && <span style={{ transform: `scale(${rv})` }}><Icon name="check" size={70} color={R.night950} /></span>}
          </div>
        )
      })}
      {reveal && <Confetti start={revealAt} x0={20} spread={920} count={54} />}
    </div>
  )
}

// ================================================================ myth-fact
export const MythFact = ({ v, frame, dur, fps }) => {
  const strikeAt = Math.round(dur * 0.4)
  const verdAt = Math.round(dur * 0.52)
  const p1 = pop(frame, fps, 0, { damping: 13, stiffness: 170 })
  const st = easeOut(ramp(frame, strikeAt, strikeAt + 9))
  const stamp = pop(frame, fps, strikeAt + 4, { damping: 9, stiffness: 220 })
  const p2 = pop(frame, fps, verdAt, { damping: 13, stiffness: 160 })
  return (
    <div style={{ width: CONTENT_W, display: 'flex', flexDirection: 'column', gap: 34 }}>
      <Glass glow={R.magenta} style={{ padding: '36px 44px 44px', position: 'relative', border: `2.5px solid ${rgba(R.magenta, 0.7)}`, transform: `translateY(${(1 - p1) * 80}px) scale(${(0.88 + 0.12 * p1) * (1 - st * 0.04)})`, opacity: clamp(p1 * 1.5) * (1 - st * 0.3) }}>
        <PillLabel color={R.magenta}>Mito</PillLabel>
        <div style={{ position: 'relative', marginTop: 22, fontFamily: DISPLAY, fontWeight: 800, fontSize: 62, lineHeight: 1.1, letterSpacing: '-0.025em', color: R.white, paddingRight: 120 }}>
          “{v.mito}”
        </div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: '58%', height: 10, borderRadius: 5, background: R.magenta, transformOrigin: '0 50%', transform: `rotate(-4deg) scaleX(${st})`, boxShadow: `0 0 20px ${R.magenta}` }} />
        <div style={{ position: 'absolute', right: 30, top: 26, width: 120, height: 120, borderRadius: '50%', background: R.magenta, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${stamp}) rotate(${(1 - stamp) * -40}deg)`, boxShadow: `0 0 40px ${rgba(R.magenta, 0.8)}` }}>
          <Icon name="x" size={66} color={R.white} />
        </div>
      </Glass>
      <Glass glow={R.cyan} style={{ padding: '36px 44px 44px', border: `2.5px solid ${rgba(R.cyan, 0.8)}`, transform: `translateY(${(1 - p2) * 200}px) scale(${0.85 + 0.15 * p2})`, opacity: clamp(p2 * 1.5), background: 'linear-gradient(160deg, rgba(62,197,255,0.22), rgba(255,255,255,0.04))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <PillLabel color={R.cyan}>Verdade</PillLabel>
          <Icon name="bulb" size={50} color={R.gold} style={{ filter: `drop-shadow(0 0 12px ${R.gold})` }} />
        </div>
        <div style={{ marginTop: 22, fontFamily: DISPLAY, fontWeight: 800, fontSize: 62, lineHeight: 1.1, letterSpacing: '-0.025em', color: R.white }}>{v.verdade}</div>
      </Glass>
    </div>
  )
}

// ================================================================ checklist
export const Checklist = ({ v, frame, dur, fps, sync }) => {
  const items = v.itens || []
  const times = itemTimes(items, sync, dur, 0.1, 0.66)
  const enter = pop(frame, fps, 0, { damping: 14, stiffness: 160 })
  if (items.every((t) => /^[a-z0-9]{1,4}$/i.test(t))) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, width: CONTENT_W - 60 }}>
        {items.map((t, i) => {
          const p = pop(frame, fps, i * 4)
          const c = pop(frame, fps, times[i], { damping: 9, stiffness: 220 })
          const hue = HUES[i % HUES.length]
          const on = frame >= times[i]
          return (
            <div key={i} style={{ position: 'relative', height: 210, borderRadius: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? `linear-gradient(160deg, ${rgba(hue, 0.4)}, rgba(18,15,51,0.6))` : 'rgba(255,255,255,0.06)', border: `2.5px solid ${on ? hue : 'rgba(255,255,255,0.18)'}`, boxShadow: on ? `0 0 60px ${rgba(hue, 0.5)}` : 'none', transform: `scale(${(0.7 + 0.3 * p) * (1 + 0.04 * (on ? Math.max(0, 1 - (frame - times[i]) / 8) : 0))})`, opacity: clamp(p * 1.5) }}>
              <span style={{ fontFamily: CODE, fontWeight: 700, fontSize: 92, color: on ? R.white : 'rgba(255,255,255,0.45)' }}>&lt;{t}&gt;</span>
              <div style={{ position: 'absolute', top: -18, right: -14, width: 70, height: 70, borderRadius: '50%', background: GRAD.vivid, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? c : 0})`, boxShadow: '0 8px 24px rgba(5,3,25,0.5)' }}>
                <Icon name="check" size={44} color={R.white} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <Glass glow={R.violet} style={{ width: CONTENT_W, padding: '46px 48px', display: 'flex', flexDirection: 'column', gap: 34, transform: `translateY(${(1 - enter) * 80}px) scale(${0.9 + 0.1 * enter})`, opacity: clamp(enter * 1.5) }}>
      {items.map((t, i) => {
        const on = frame >= times[i]
        const c = pop(frame, fps, times[i], { damping: 9, stiffness: 220 })
        const hue = HUES[i % HUES.length]
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 30, transform: `translateX(${on ? (1 - c) * 20 : 0}px)` }}>
            <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0, borderRadius: '50%', border: `4px solid ${on ? 'transparent' : 'rgba(255,255,255,0.3)'}` }}>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: i % 2 ? `linear-gradient(135deg, ${R.cyan}, ${R.violet})` : `linear-gradient(135deg, ${R.violet}, ${R.cyan})`, transform: `scale(${on ? c : 0})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 34px ${rgba(hue, 0.7)}` }}>
                <Icon name="check" size={54} color={R.night950} />
              </div>
            </div>
            <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: t.length > 18 ? 52 : 60, letterSpacing: '-0.025em', lineHeight: 1.1, color: on ? R.white : 'rgba(255,255,255,0.42)' }}>{t}</span>
          </div>
        )
      })}
    </Glass>
  )
}

// ================================================================ celular: aula
const FloatChips = ({ chips, frame, fps, start = 10 }) => (
  <>
    {chips.map((c, i) => {
      const spots = [{ left: 0, top: 70 }, { right: 0, top: 300 }, { left: 10, top: 540 }]
      const sp = spots[i % 3]
      const p = pop(frame, fps, start + i * 7)
      const hue = HUES[(i * 2) % HUES.length]
      const fy = Math.sin(frame / 18 + i * 2) * 10
      return (
        <div key={i} style={{ position: 'absolute', ...sp, zIndex: 4, display: 'flex', alignItems: 'center', gap: 12, padding: '18px 28px 18px 20px', borderRadius: 999, background: 'rgba(22,18,58,0.88)', border: `2.5px solid ${rgba(hue, 0.8)}`, boxShadow: `0 20px 50px -10px rgba(5,3,25,0.8), 0 0 40px ${rgba(hue, 0.4)}`, fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, color: R.white, transform: `translateY(${fy + (1 - p) * 40}px) scale(${0.6 + 0.4 * p}) rotate(${(i % 2 ? 3 : -3)}deg)`, opacity: clamp(p * 1.5) }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: hue, boxShadow: `0 0 12px ${hue}` }} />
          {c}
        </div>
      )
    })}
  </>
)

export const PhoneLesson = ({ v, frame, dur, fps }) => {
  const enter = pop(frame, fps, 0, { damping: 14, stiffness: 140 })
  const tapAt = 16
  const playing = frame >= tapAt + 3
  const prog = clamp((frame - tapAt) / Math.max(1, dur * 0.9))
  const unlockAt = Math.round(dur * 0.62)
  const unlocked = frame >= unlockAt
  const btn = pop(frame, fps, unlockAt + 4)
  const cur = cursorMotion(frame, { arrive: tapAt, click: tapAt, from: [160, 200], travel: 12 })
  return (
    <div style={{ position: 'relative', width: CONTENT_W, height: 740, display: 'flex', justifyContent: 'center' }}>
      <div style={{ transform: `translateY(${(1 - enter) * 120}px) rotate(${(1 - enter) * -6}deg)`, opacity: clamp(enter * 1.5) }}>
        <Phone width={410} height={740}>
          <div style={{ padding: '14px 26px', display: 'flex', flexDirection: 'column', gap: 18, fontFamily: SANS, color: R.white, position: 'relative', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LogoMark height={34} bodyColor={R.violet} />
                <span style={{ padding: '4px 14px', borderRadius: 999, background: rgba(R.violet, 0.3), border: `1.5px solid ${R.violet}`, fontWeight: 800, fontSize: 18 }}>NÍVEL 1</span>
              </div>
              <Hearts size={24} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: R.muted }}>Aula 3 · Links</div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Ligando páginas</div>
            </div>
            <div style={{ position: 'relative', height: 200, borderRadius: 22, overflow: 'hidden', background: `linear-gradient(135deg, ${R.night700} 0%, #4B3BB0 60%, #2C7FB8 100%)`, boxShadow: '0 12px 30px rgba(5,3,25,0.5)' }}>
              <div style={{ position: 'absolute', left: 22, top: 28, fontFamily: CODE, fontWeight: 700, fontSize: 34, color: '#FFD28A', transform: `translateX(${playing ? -prog * 30 : 0}px)` }}>&lt;a href&gt;</div>
              <div style={{ position: 'absolute', left: 22, top: 82, width: 200, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.35)' }} />
              <div style={{ position: 'absolute', left: 22, top: 104, width: 150, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.22)' }} />
              <div style={{ position: 'absolute', right: playing ? 16 : '50%', top: playing ? 16 : '50%', marginRight: playing ? 0 : -42, marginTop: playing ? 0 : -42, width: playing ? 54 : 84, height: playing ? 54 : 84, borderRadius: '50%', background: R.white, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(5,3,25,0.4)' }}>
                <Icon name={playing ? 'pause' : 'play'} size={playing ? 30 : 46} color={R.violetDeep} />
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: 'rgba(255,255,255,0.2)' }}>
                <div style={{ width: `${prog * 100}%`, height: '100%', background: GRAD.vivid }} />
              </div>
            </div>
            {[
              { t: 'Videoaula curta', icon: 'play', on: true, hue: R.violet },
              { t: 'Exercícios', icon: unlocked ? 'unlock' : 'lock', on: unlocked, hue: R.cyan },
              { t: 'Prova do nível', icon: 'lock', on: false, hue: R.magenta },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 18, background: row.on ? rgba(row.hue, 0.18) : 'rgba(255,255,255,0.05)', border: `1.5px solid ${row.on ? rgba(row.hue, 0.7) : 'rgba(255,255,255,0.1)'}` }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: row.on ? row.hue : 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={row.icon} size={26} color={row.on ? R.night950 : 'rgba(255,255,255,0.5)'} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 24, color: row.on ? R.white : 'rgba(255,255,255,0.5)' }}>{row.t}</span>
              </div>
            ))}
            <div style={{ position: 'absolute', left: 26, right: 26, bottom: 30, height: 76, borderRadius: 22, background: GRAD.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 28, boxShadow: `0 12px 30px rgba(112,72,232,0.6)`, transform: `scale(${(0.8 + 0.2 * btn) * (1 + 0.03 * Math.sin(frame / 5))})`, opacity: clamp(btn * 1.5) }}>
              Praticar agora
            </div>
            <Cursor {...cur} left="50%" top="226px" size={56} />
          </div>
        </Phone>
      </div>
      <FloatChips chips={v.chips || ['Aula curta', 'Em português', 'Até no celular']} frame={frame} fps={fps} />
    </div>
  )
}

// ================================================================ celular: exercício
export const PhoneExercise = ({ v, frame, dur, fps }) => {
  const enter = pop(frame, fps, 0, { damping: 14, stiffness: 140 })
  const opts = v.opcoes || []
  const tapAt = Math.round(dur * 0.42)
  const done = frame >= tapAt + 2
  const ban = pop(frame, fps, tapAt + 6, { damping: 13, stiffness: 160 })
  const optTop = 300
  const optStep = 98
  const cur = cursorMotion(frame, { arrive: tapAt, click: tapAt, from: [140, 260], travel: 16 })
  const qSize = (v.pergunta || '').length > 30 ? 32 : 36
  return (
    <div style={{ position: 'relative', width: CONTENT_W, height: 740, display: 'flex', justifyContent: 'center' }}>
      <div style={{ transform: `translateY(${(1 - enter) * 120}px) rotate(${(1 - enter) * 6}deg)`, opacity: clamp(enter * 1.5) }}>
        <Phone width={410} height={740} glow={R.cyan}>
          <div style={{ padding: '14px 26px', fontFamily: SANS, color: R.white, position: 'relative', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Icon name="x" size={26} color={R.muted} />
              <div style={{ flex: 1, display: 'flex', gap: 6 }}>
                {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ flex: 1, height: 10, borderRadius: 5, background: k < 2 || (k === 2 && done) ? GRAD.vivid : 'rgba(255,255,255,0.15)' }} />)}
              </div>
              <Hearts n={5} size={22} />
            </div>
            <div style={{ marginTop: 34, fontSize: 20, fontWeight: 800, letterSpacing: '0.12em', color: R.cyan }}>ESCOLHA A CERTA</div>
            <div style={{ marginTop: 10, fontFamily: DISPLAY, fontWeight: 800, fontSize: qSize, lineHeight: 1.15, letterSpacing: '-0.02em' }}>{v.pergunta}</div>
            {opts.map((o, i) => {
              const correct = i === v.correta
              const p = pop(frame, fps, 8 + i * 4)
              const ok = done && correct
              return (
                <div key={i} style={{ position: 'absolute', left: 26, right: 26, top: optTop + i * optStep, height: 82, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', background: ok ? GRAD.success : 'rgba(255,255,255,0.07)', border: `2px solid ${ok ? R.greenLight : 'rgba(255,255,255,0.18)'}`, boxShadow: ok ? `0 0 40px ${rgba(R.green, 0.6)}` : 'none', transform: `translateX(${(1 - p) * 80}px) scale(${ok ? 1.03 : 1})`, opacity: clamp(p * 1.5) * (done && !correct ? 0.5 : 1) }}>
                  <span style={{ fontFamily: isTagLike(o) ? CODE : SANS, fontWeight: 800, fontSize: isTagLike(o) ? 34 : o.length > 16 ? 24 : 28, color: ok ? R.night950 : R.white }}>{o}</span>
                  {ok && <Icon name="check" size={36} color={R.night950} />}
                </div>
              )
            })}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 170, borderRadius: '28px 28px 0 0', background: 'linear-gradient(180deg, #2C3A1A, #1E2A10)', borderTop: `3px solid ${R.green}`, padding: '24px 26px', transform: `translateY(${(1 - ban) * 180}px)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Check size={44} />
                <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, color: R.greenLight }}>Mandou bem!</span>
              </div>
              <div style={{ marginTop: 16, height: 62, borderRadius: 18, background: GRAD.success, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, color: R.night950 }}>Continuar</div>
            </div>
            <Cursor {...cur} left="72%" top={`${optTop + (v.correta || 0) * optStep + 48}px`} size={56} />
          </div>
        </Phone>
      </div>
      <FloatChips chips={v.chips || ['Exercício rápido', 'Resposta na hora']} frame={frame} fps={fps} />
      <Confetti start={tapAt + 6} x0={60} spread={840} count={40} />
    </div>
  )
}

// ================================================================ exam-progress
export const ExamProgress = ({ v, frame, dur, fps }) => {
  const target = v.percent || 92
  const enter = pop(frame, fps, 0, { damping: 14, stiffness: 150 })
  const fillEnd = Math.round(dur * 0.62)
  const val = target * easeOut(ramp(frame, 6, fillEnd))
  const passAt = (() => { for (let f = 6; f <= fillEnd; f++) if (target * easeOut(ramp(f, 6, fillEnd)) >= 90) return f; return fillEnd })()
  const passed = frame >= passAt && target >= 90
  const ok = pop(frame, fps, passAt + 2, { damping: 10, stiffness: 190 })
  const D = 440
  const sw = 36
  const r = (D - sw) / 2 - 6
  const circ = 2 * Math.PI * r
  const tickA = (0.9 * 360 - 90) * (Math.PI / 180)
  return (
    <div style={{ position: 'relative', width: CONTENT_W, height: 720, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, transform: `scale(${0.85 + 0.15 * enter})`, opacity: clamp(enter * 1.5) }}>
      <PillLabel color={R.cyan} size={30}>Prova do Nível 1</PillLabel>
      <div style={{ position: 'relative', width: D, height: D }}>
        <div style={{ position: 'absolute', inset: 30, borderRadius: '50%', background: `radial-gradient(circle, ${passed ? rgba(R.green, 0.28) : rgba(R.violet, 0.3)}, transparent 70%)` }} />
        <svg width={D} height={D} viewBox={`0 0 ${D} ${D}`} style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="examg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={passed ? R.greenLight : R.violet} />
              <stop offset="100%" stopColor={passed ? R.green : R.cyan} />
            </linearGradient>
          </defs>
          <circle cx={D / 2} cy={D / 2} r={r} fill="rgba(18,15,51,0.55)" stroke="rgba(255,255,255,0.12)" strokeWidth={sw} />
          <circle cx={D / 2} cy={D / 2} r={r} fill="none" stroke="url(#examg)" strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${(circ * val) / 100} ${circ}`} transform={`rotate(-90 ${D / 2} ${D / 2})`} style={{ filter: `drop-shadow(0 0 16px ${passed ? R.green : R.violet})` }} />
          <line x1={D / 2 + Math.cos(tickA) * (r - sw / 2 - 8)} y1={D / 2 + Math.sin(tickA) * (r - sw / 2 - 8)} x2={D / 2 + Math.cos(tickA) * (r + sw / 2 + 8)} y2={D / 2 + Math.sin(tickA) * (r + sw / 2 + 8)} stroke={R.white} strokeWidth={6} strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 150, letterSpacing: '-0.05em', color: R.white, lineHeight: 1 }}>{Math.round(val)}<span style={{ fontSize: 80 }}>%</span></div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, color: R.muted, marginTop: 8 }}>mínimo: 90%</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 40px 18px 22px', borderRadius: 999, background: GRAD.success, boxShadow: `0 0 60px ${rgba(R.green, 0.6)}`, transform: `scale(${passed ? ok : 0})`, opacity: passed ? 1 : 0 }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: R.night950, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={40} color={R.green} /></div>
        <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 50, color: R.night950 }}>Aprovado! Próximo nível</span>
      </div>
      <Confetti start={passAt + 2} x0={40} spread={880} />
    </div>
  )
}

// ================================================================ end-card
export const EndCard = ({ frame, dur, fps, sync }) => {
  const l2 = Math.max(10, sync('um nível', Math.round(dur * 0.3)) - 4)
  const cta = Math.max(l2 + 8, sync('comece', Math.round(dur * 0.62)) - 4)
  const b = pop(frame, fps, cta, { damping: 10, stiffness: 170 })
  const pulse = 1 + 0.035 * Math.sin((frame - cta) / 4.5) * (frame > cta + 10 ? 1 : 0)
  const shine = ((frame - cta) % 50) / 50
  const u = pop(frame, fps, cta + 8)
  return (
    <div style={{ width: CONTENT_W, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ position: 'relative', filter: 'drop-shadow(0 20px 50px rgba(112,72,232,0.65))' }}>
        <LogoReveal start={-4} height={170} unlockAt={10} wordColor={R.white} bodyColor={R.violet} />
      </div>
      <div style={{ height: 80 }} />
      <Headline title="Destrava sua carreira." start={0} size={100} />
      <div style={{ height: 16 }} />
      <Headline title="*Um* *nível* *de* *cada* *vez.*" start={l2} size={100} upright />
      <div style={{ height: 90 }} />
      <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 22, padding: '34px 70px 36px 76px', borderRadius: 999, background: GRAD.primary, border: '2px solid rgba(255,255,255,0.35)', boxShadow: '0 24px 60px -10px rgba(112,72,232,0.85), 0 0 90px rgba(139,108,255,0.55)', fontFamily: DISPLAY, fontWeight: 800, fontSize: 62, letterSpacing: '-0.02em', color: R.white, transform: `scale(${(0.5 + 0.5 * b) * pulse})`, opacity: clamp(b * 1.6) }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${-30 + shine * 160}%`, width: '30%', background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)', transform: 'skewX(-20deg)' }} />
        Comece grátis
        <svg width={54} height={54} viewBox="0 0 64 64"><path d="M14 32 H48 M34 16 L50 32 L34 48" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ height: 56 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: SANS, fontWeight: 700, fontSize: 32, color: R.lavender, opacity: clamp(u * 1.4), transform: `translateY(${(1 - u) * 20}px)`, padding: '12px 26px', borderRadius: 999, background: 'rgba(18,15,51,0.55)', border: '1.5px solid rgba(255,255,255,0.14)' }}>
        <Icon name="link" size={34} color={R.accent} />
        {SITE_URL}
      </div>
    </div>
  )
}

export const VISUALS = {
  'price-tags': PriceTags,
  'logo-unlock': LogoUnlock,
  'phone-lesson': PhoneLesson,
  'phone-exercise': PhoneExercise,
  'exam-progress': ExamProgress,
  'level-steps': LevelSteps,
  'certificate-qr': CertificateQR,
  'plan-cards': PlanCards,
  badges: Badges,
  'code-typing': CodeTypingVisual,
  'browser-preview': BrowserPreview,
  'code-and-preview': CodeAndPreview,
  quiz: Quiz,
  'myth-fact': MythFact,
  checklist: Checklist,
  'end-card': EndCard,
}
