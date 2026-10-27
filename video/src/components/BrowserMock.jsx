import React from 'react'
import { C, FONT } from '../theme.js'

// Janela de navegador genérica (sem marcas reais).
export const BrowserMock = ({ tabTitle = 'Nova aba', url = 'meusite.com.br', width = 760, height = 520, children, style, tabHighlight = false, highlightColor = C.purpleSoft }) => (
  <div style={{ width, height, borderRadius: 18, background: C.white, boxShadow: '0 24px 60px rgba(38,33,92,0.28)', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: FONT, border: `2px solid ${C.purpleSoft}55`, ...style }}>
    <div style={{ background: '#DDDAF6', padding: '12px 16px 0', display: 'flex', alignItems: 'flex-end', gap: 14 }}>
      <div style={{ display: 'flex', gap: 8, paddingBottom: 14 }}>
        {['#E87B7B', '#E8C47B', '#9CCF8A'].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c, opacity: 0.8 }} />)}
      </div>
      <div style={{ background: C.white, borderRadius: '12px 12px 0 0', padding: '10px 22px', fontSize: 22, color: C.night, minWidth: 220, maxWidth: 420, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxShadow: tabHighlight ? `0 0 0 4px ${highlightColor}` : 'none' }}>
        {tabTitle}
      </div>
    </div>
    <div style={{ background: C.white, padding: '10px 18px', borderBottom: '2px solid #ECEBFA' }}>
      <div style={{ background: C.lavender, borderRadius: 999, padding: '6px 20px', fontSize: 20, color: C.purple }}>{url}</div>
    </div>
    <div style={{ flex: 1, padding: 28, color: C.night, position: 'relative', overflow: 'hidden' }}>{children}</div>
  </div>
)

// Página-exemplo genérica (para o bloco 6 e bloco 2)
export const SamplePage = () => (
  <div style={{ fontFamily: FONT }}>
    <div style={{ height: 22, width: 260, background: C.purple, borderRadius: 6 }} />
    <div style={{ marginTop: 20, display: 'flex', gap: 20 }}>
      <div style={{ width: 150, height: 110, background: C.lavender, borderRadius: 10, border: `2px solid ${C.purpleSoft}` }} />
      <div style={{ flex: 1 }}>
        {[100, 92, 96, 70].map((w, i) => <div key={i} style={{ height: 12, width: `${w}%`, background: '#D5D2F2', borderRadius: 6, marginBottom: 12 }} />)}
      </div>
    </div>
    <div style={{ marginTop: 14, height: 40, width: 150, background: C.purpleSoft, borderRadius: 10 }} />
  </div>
)
