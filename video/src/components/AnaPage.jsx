// Nível 2 (veio da Aula 2): a página inteira da Ana (topo, menu, seções #sobre, #projetos, #rotina e #contato,
// rodapé), com o CSS do aluno aplicado DE VERDADE pelo navegador (escopado à prévia). Os destaques que
// mostram "quem o seletor pega" também são CSS de verdade: cada { sel } vira uma regra de outline com o
// mesmo seletor, então quem acende é exatamente quem o navegador casou.
import React from 'react'
import { FONT } from '../theme.js'
import { scopeCss } from './CssCode.jsx'

// O estilo.css da Ana no fim da aula 1.
export const CSS_A1 = 'h1 {\n  color: navy;\n}\n\nbody {\n  background-color: lightyellow;\n}\n\np {\n  font-size: 18px;\n}'

export const TXT = {
  h1: 'Olá, eu sou a Ana',
  menu: ['Sobre mim', 'Meus projetos', 'Minha rotina', 'Fale comigo'],
  hrefs: ['#sobre', '#projetos', '#rotina', '#contato'],
  sobre: 'Trabalho no atendimento de uma loja e estou fazendo a minha transição para a tecnologia.',
  dest: 'Estou procurando o meu primeiro emprego na área.',
  proj: 'Os projetos que eu fiz enquanto aprendo a programar.',
  li: ['Minhas receitas favoritas', 'Esta página pessoal (em andamento)'],
  rotina: 'Estudo um pouco todos os dias, depois do trabalho.',
  footer: 'Feito pela Ana · ',
  mail: 'ana@example.com',
}

// hl: [{ sel, op = 1, color = '240,160,75', dashed, w = 4 }]
const hlCss = (hl) => hl.filter((h) => (h.op == null ? 1 : h.op) > 0).map((h) => {
  const op = h.op == null ? 1 : h.op
  const c = h.color || '240,160,75'
  return `${h.sel} {\n  outline: ${h.w || 4}px ${h.dashed ? 'dashed' : 'solid'} rgba(${c},${op});\n  outline-offset: 3px;\n  box-shadow: 0 0 ${14 * op}px rgba(${c},${0.8 * op});\n}`
}).join('\n')

// cls: classes no HTML, por elemento ({ pDest: 'destaque', li1: 'destaque' }).
// scroll: quanto (em px da página) a prévia rola para baixo.
// extraBase: estilo-base extra da prévia (antes do CSS do aluno). mailLink = false: o e-mail do rodapé vira texto.
export const PageSel = ({ id, css = '', zoom = 1.15, cls = {}, hl = [], scroll = 0, extraBase = '', mailLink = true, children }) => {
  const base = `#${id} { display: block; margin: 0; padding: 6px 14px 14px; min-height: 100%; box-sizing: border-box; color: #000; background-color: #fff; font-family: ${FONT}; font-size: 16px; line-height: 1.25; zoom: ${zoom}; transform: translateY(${-scroll}px); }
#${id} h1, #${id} h2, #${id} p, #${id} ul, #${id} li, #${id} nav, #${id} section, #${id} footer { color: inherit; }
#${id} h1 { margin: 4px 0 4px; }
#${id} h2 { margin: 10px 0 2px; font-size: 22px; }
#${id} p { margin: 2px 0 4px; }
#${id} ul { margin: 2px 0; padding-left: 26px; }
#${id} section, #${id} footer { display: block; }
#${id} form { display: flex; gap: 8px; align-items: center; margin: 4px 0; font-size: 15px; }
#${id} input { font: inherit; width: 150px; padding: 2px 6px; }
#${id} button { font: inherit; padding: 2px 10px; }
${extraBase}`
  const rules = scopeCss(css, id)
  const marks = scopeCss(hlCss(hl), id)
  const c = (k) => cls[k] || undefined
  const no = (e) => e.preventDefault()
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <style>{base + '\n' + rules + '\n' + marks}</style>
      <div id={id}>
        <header>
          <h1 className={c('h1')}>{TXT.h1}</h1>
          <nav>
            <ul>{TXT.menu.map((t, i) => <li key={t}><a href={TXT.hrefs[i]} onClick={no}>{t}</a></li>)}</ul>
          </nav>
        </header>
        <section id="sobre">
          <h2>Sobre mim</h2>
          <p className={c('pSobre')}>{TXT.sobre}</p>
          <p className={c('pDest')}>{TXT.dest}</p>
        </section>
        <section id="projetos">
          <h2>Meus projetos</h2>
          <p className={c('pProj')}>{TXT.proj}</p>
          <ul>
            <li className={c('li0')}>{TXT.li[0]}</li>
            <li className={c('li1')}>{TXT.li[1]}</li>
          </ul>
        </section>
        <section id="rotina">
          <h2>Minha rotina</h2>
          <p>{TXT.rotina}</p>
        </section>
        <section id="contato">
          <h2>Fale comigo</h2>
          <form onSubmit={no}>
            <label htmlFor={`${id}-nome`}>Seu nome</label>
            <input id={`${id}-nome`} type="text" readOnly value="" />
            <button type="button">Enviar</button>
          </form>
        </section>
        <footer>
          <p>{TXT.footer}{mailLink ? <a href={`mailto:${TXT.mail}`} onClick={no}>{TXT.mail}</a> : TXT.mail}</p>
        </footer>
        {children}
      </div>
    </div>
  )
}

// Página pequena com N parágrafos (Bloco 9: duas regras de p).
export const MiniPage = ({ id, css = '', zoom = 1.3, n = 2, hl = [], cls = {} }) => {
  const base = `#${id} { display: block; margin: 0; padding: 8px 14px; min-height: 100%; box-sizing: border-box; color: #000; background-color: #fff; font-family: ${FONT}; font-size: 16px; zoom: ${zoom}; }
#${id} h1, #${id} p { color: inherit; }
#${id} h1 { margin: 4px 0 8px; }
#${id} p { margin: 4px 0 8px; }`
  const paras = ['Trabalho no atendimento de uma loja.', TXT.dest, 'Estudo um pouco todos os dias.']
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <style>{base + '\n' + scopeCss(css, id) + '\n' + scopeCss(hlCss(hl), id)}</style>
      <div id={id}>
        <h1>{TXT.h1}</h1>
        {paras.slice(0, n).map((t, i) => <p key={i} className={cls[`p${i}`]}>{t}</p>)}
      </div>
    </div>
  )
}
