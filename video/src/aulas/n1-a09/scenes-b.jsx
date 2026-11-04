import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { C, FONT } from '../../theme.js'
import { makeSync, fadeIn } from '../../lib/sync.js'
import { Check, Chip } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import {
  BuildEditor, ED, PV, PAIR, GREEN_HL, LineTag, Label, MouseAt, Warn, YEL, abs, after, blinkOn, edAt, hl, rampF, win,
} from './scenes-a.jsx'
import { AnaSite, REG, SITE, SitePreview, Tag, autoScroll, colOf, lineOf, tint } from './ana.jsx'

export { Final, Prova, Salvar, Checklist } from './scenes-c.jsx'

// ---------------------------------------------------------------- Bloco 8
export const Rotina = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSec = s('A terceira sécchon')
  const tData = s('Aqui, os dados têm')
  const tTable = s('trabalho para a têibol')
  const tCap = s('vem a quépchon')
  const tThead = s('Depois, a tê réd')
  const tTr = s('Uma tê erre, e dentro')
  const tTh = s('duas tê agá')
  const tTbody = s('Em seguida, a tê bódi')
  const tR = [s('Segunda, HTML'), s('Terça, CSS'), s('Quarta, revisão')]
  const tSame = s('Repara que todas as linhas')
  const tCrooked = s('Se uma linha tiver')
  const tFree = s('E, se você não tiver')
  const times = {
    sec: tSec + 4, secC: tSec + 18, h2: tSec + 30, table: tTable + 10, tableC: tTable + 20, cap: tCap + 8,
    thead: tThead + 6, theadC: tThead + 16, tr: tTr + 4, trC: tTr + 12, th: tTh + 4, tbody: tTbody + 6, tbodyC: tTbody + 16,
    r1: tR[0], r2: tR[1], r3: tR[2],
  }
  const scroll = autoScroll(8, times, frame, { anchor: 14 })
  const op = {
    s3: after(frame, times.sec + 6), s3h2: after(frame, times.h2 + 12), s3cap: after(frame, times.cap + 22), s3head: after(frame, times.th + 22),
    s3r0: after(frame, tR[0] + 20), s3r1: after(frame, tR[1] + 20), s3r2: after(frame, tR[2] + 20),
  }
  const blink = blinkOn(frame)
  const b6 = frame >= tCap + 30 && frame < tSame
  const hls = [
    ...(b6 && blink ? [hl('<caption>', 0, YEL), ...[0, 1].map((i) => hl('<th>', 0, YEL, i)), ...[0, 1, 2, 3, 4, 5].map((i) => hl('<td>', 0, YEL, i))] : []),
  ]
  const lCap = lineOf(8, '<caption>')
  const trLines = [lineOf(8, '<th>Dia') - 1, lineOf(8, 'Segunda'), lineOf(8, 'Terça'), lineOf(8, 'Quarta')]
  const sc = { ...ED, scroll }
  const bandOp = fadeIn(frame, tSame, 12) * (1 - fadeIn(frame, tFree + 30, 10))
  return (
    <AbsoluteFill>
      <BuildEditor n={8} times={times} highlights={hls} scroll={scroll} />
      <LineTag line={lCap} scroll={scroll} lesson={6} op={b6 ? 1 : 0} />
      {bandOp > 0 && trLines.slice(1).map((l, i) => {
        const p = edAt(sc, l, 0)
        if (l - scroll < 0 || l - scroll >= 22) return null
        return (
          <div key={i} style={abs(p.x + 12 * 12.1 - 6, p.y - 17, { opacity: bandOp, width: 41.5 * 12.1, height: 34, background: tint(['#7F77DD', '#2FA89A', '#F0A04B'][i], 0.3), borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' })}>
            <div style={{ marginRight: -54, width: 40, height: 40, borderRadius: 20, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 26, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
          </div>
        )
      })}
      <div style={abs(PV.x, PV.y)}>
        <SitePreview w={PV.w} h={PV.h} p={1}>
          <AnaSite fs={20} upTo={7} op={op} fr={{ header: 1, nav: 1, main: 1, s1: 1, s2: 1, s3: fadeIn(frame, times.sec + 6, 12) }} />
        </SitePreview>
      </div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tSec, tTable, 12) })}><Chip size={30} color={C.night} border={REG.section}>3ª <Tag color={C.purple}>section</Tag>: <Tag color={C.purple}>id="rotina"</Tag></Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tData, tTable + 30, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>linhas e colunas: trabalho para a <Tag color={C.purple}>table</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tCap, tTbody, 12) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860"><Tag color={C.purple}>caption</Tag>: o título da tabela</Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tThead, tTbody, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>thead</Tag>: linha de cabeçalho com <Tag color={C.purple}>th</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tTbody, tSame, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>tbody</Tag>: as linhas de dados</Chip></div>
      <div style={abs(PV.x, 790, { opacity: win(frame, tR[0], tSame, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>cada linha <Tag color={C.purple}>tr</Tag>, cada célula <Tag color={C.purple}>td</Tag></Chip></div>
      <Label x={PV.x} y={700} w={PV.w} op={win(frame, tSame, tFree, 12)} dark size={30}>mesmo número de células: 2 em cada linha</Label>
      <div style={abs(PV.x, 790, { opacity: win(frame, tCrooked, tFree, 12) })}><Chip size={28} color={C.night} border={C.red}>uma a mais ou a menos: a tabela fica torta</Chip></div>
      <div style={abs(PV.x, 700, { opacity: fadeIn(frame, tFree, 12) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">sem rotina de estudos? coloque os seus horários livres</Chip></div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const Contato = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tSec = s('A última sécchon')
  const tForm = s('que começa com a tag fórm')
  const tName = s('O primeiro campo é o nome')
  const tLab = s('Vem uma lêibol')
  const tIn = s('Depois, uma ínput')
  const tSameV = s('O fór da lêibol e o ái di')
  const tLink = s('e é isso que liga')
  const tEmail = s('O segundo campo é o e-mail')
  const tMsg = s('O terceiro é a mensagem')
  const tClose = s('Diferente da ínput')
  const tBtn = s('Por fim, o bâton')
  const tNot = s('E lembra: por enquanto')
  const times = {
    sec: tSec + 4, secC: tSec + 18, h2: tSec + 34, form: tForm + 12, formC: tForm + 22, lab1: tLab + 6, in1: tIn + 6,
    f2: tEmail + 10, f3: tMsg + 6, btn: tBtn + 6, mainC: tBtn + 40,
  }
  const scroll = autoScroll(9, times, frame, { anchor: 14 })
  const op = {
    s4: after(frame, times.sec + 6), s4h2: after(frame, times.h2 + 12), f1: after(frame, times.in1 + 22), f2: after(frame, times.f2 + 44),
    f3: after(frame, times.f3 + 50), f4: after(frame, times.btn + 20),
  }
  const pairOn = frame >= tSameV
  const hls = [
    ...(pairOn ? [hl('for="nome"', tSameV, PAIR), hl('id="nome"', tSameV, PAIR)] : []),
    ...(frame >= tEmail + 50 ? [hl('for="email"', 0, 'rgba(91,141,239,0.5)'), hl('id="email"', 0, 'rgba(91,141,239,0.5)')] : []),
    ...(frame >= tMsg + 56 ? [hl('for="mensagem"', 0, GREEN_HL), hl('id="mensagem"', 0, GREEN_HL)] : []),
    hl('</textarea>', tClose, YEL, 0, tBtn),
  ]
  const lLab = lineOf(9, 'for="nome"')
  const lIn = lineOf(9, 'id="nome"')
  const sc = { ...ED, scroll }
  const pFor = edAt(sc, lLab, colOf(9, 'for="nome"') + 5)
  const pId = edAt(sc, lIn, colOf(9, 'id="nome"') + 4)
  const click = tLink + 10
  const focus = rampF(frame, click + 4, click + 10)
  return (
    <AbsoluteFill>
      <BuildEditor n={9} times={times} highlights={hls} scroll={scroll} />
      <LineTag line={lLab} scroll={scroll} lesson={7} op={pairOn && frame < tEmail ? 1 : 0} />
      <ArrowLine x1={pFor.x - 40} y1={pFor.y + 12} x2={pId.x} y2={pId.y + 18} p={rampF(frame, tSameV + 10, tSameV + 26)} opacity={1 - fadeIn(frame, tEmail, 8)} bend={46} color="#F0A04B" width={5} />
      <div style={abs(PV.x, PV.y)}>
        <SitePreview w={PV.w} h={PV.h} p={1}>
          <AnaSite fs={20} upTo={8} op={op} fr={{ header: 1, nav: 1, main: 1, s1: 1, s2: 1, s3: 1, s4: fadeIn(frame, times.sec + 6, 12) }} focus={focus} labelHl={frame >= click - 10 && frame < tEmail ? 1 : 0} />
        </SitePreview>
        {frame >= tLink - 20 && frame < tEmail && (
          <div style={abs(80, PV.h - 150)}>
            <MouseAt frame={frame} x={0} y={0} arrive={click - 2} click={click} leave={tEmail - 6} from={[260, 120]} />
          </div>
        )}
      </div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tSec, tName, 12) })}><Chip size={30} color={C.night} border={REG.section}>última <Tag color={C.purple}>section</Tag>: <Tag color={C.purple}>id="contato"</Tag> + <Tag color={C.purple}>form</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tName, tSameV, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>campo nome: <Tag color={C.purple}>label</Tag> + <Tag color={C.purple}>input</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tSameV, tEmail, 12) })}><Chip size={30} color={C.night} bg="#FFE6CC" border="#F0A04B"><Tag color={C.purple}>for</Tag> e <Tag color={C.purple}>id</Tag> com o mesmo valor</Chip></div>
      <Label x={PV.x} y={790} w={PV.w} op={win(frame, click + 6, tEmail, 10)} dark size={28}>a label está ligada</Label>
      <div style={abs(PV.x, 700, { opacity: win(frame, tEmail, tClose, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>e-mail: <Tag color={C.purple}>type="email"</Tag> · mensagem: <Tag color={C.purple}>textarea</Tag></Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tClose, tBtn, 12) })}><Chip size={30} color={C.night} bg="#FFF4D6" border="#E8B860">a <Tag color={C.purple}>textarea</Tag> tem tag de fechamento</Chip></div>
      <div style={abs(PV.x, 700, { opacity: win(frame, tBtn, tNot, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}><Tag color={C.purple}>button</Tag>: Enviar</Chip></div>
      <div style={abs(PV.x, 700, { opacity: fadeIn(frame, tNot, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
        <Warn size={50} />
        <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">ainda não envia para lugar nenhum</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
const MINE = [['name', 'seu nome', 'Troca o nome pelo seu'], ['story', 'a sua história', 'Escreve a sua história'], ['photo', 'a sua foto (com alt)', 'Coloca a sua foto'], ['projects', 'os seus projetos', 'Lista o que você já fez'], ['routine', 'a sua rotina', 'Monta a sua rotina']]
export const Rodape = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tFoot = s('Para fechar, depois da mêin')
  const tP = s('A Ana coloca um parágrafo')
  const tMail = s('usando o mailto')
  const tLook = s('Agora, olha a prévia')
  const tWhole = s('A página está inteira')
  const tClick = s('Clica nos links do menu')
  const tImp = s('E agora vem a parte mais importante')
  const tYours = s('mas o projeto é seu')
  const tM = MINE.map(([, , ph]) => s(ph))
  const tPerf = s('Não precisa ficar perfeito')
  const times = { ftr: tFoot + 14, ftrC: tFoot + 24, fp: tP + 6, fa: tMail + 6 }
  const scroll = autoScroll(10, times, frame, { anchor: 14 })
  const blink = blinkOn(frame)
  const b3 = frame >= tMail + 20 && frame < tLook
  const hls = [...(b3 && blink ? [hl('mailto:', 0, YEL)] : [])]
  const lMail = lineOf(10, 'mailto:')
  const A = 1 - rampF(frame, tImp - 4, tImp + 10)
  const B = rampF(frame, tImp - 4, tImp + 10)
  const frOn = fadeIn(frame, tWhole, 14)
  const fr = { header: frOn, nav: frOn, main: frOn, s1: frOn, s2: frOn, s3: frOn, s4: frOn, footer: Math.max(frOn, fadeIn(frame, times.ftr + 6, 12)) }
  const click = tClick + 34
  // prévia: rola de cima a baixo, volta ao topo, clica em "Minha rotina" e pula para a tabela
  const p = interpolate(frame, [tLook, tLook + 6, tWhole + 10, tClick - 6, tClick + 10, click + 2, click + 8], [1, 0, 1, 1, 0, 0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const flashS3 = frame >= click + 8 && frame < click + 50 ? 0.6 + 0.6 * Math.sin((frame - click) / 3) : 0
  const mine = Object.fromEntries(MINE.map(([k], i) => [k, rampF(frame, tM[i] + 10, tM[i] + 14)]))
  // parte B: rola até o pedaço que está sendo trocado
  const pB = interpolate(frame, [tM[0], tM[2] + 20, tM[3], tM[4] + 10, tPerf, tPerf + 30], [0, 0.15, 0.45, 0.62, 0.62, 0.62], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <BuildEditor n={10} times={times} highlights={hls} scroll={scroll} />
          <LineTag line={lMail} scroll={scroll} lesson={3} op={b3 ? 1 : 0} />
          <div style={abs(PV.x, PV.y)}>
            <SitePreview w={PV.w} h={PV.h} p={p}>
              <AnaSite fs={20} upTo={9} op={{ foot: after(frame, times.fa + 30) }} fr={fr} flash={{ s3: flashS3 }} linkHl={frame >= click - 4 && frame < click + 10 ? 2 : -1} />
            </SitePreview>
            {frame >= tClick && frame < click + 30 && (
              <div style={abs(130, 230)}>
                <MouseAt frame={frame} x={0} y={0} arrive={click - 2} click={click} leave={click + 20} from={[300, 140]} />
              </div>
            )}
          </div>
          <div style={abs(PV.x, 700, { opacity: win(frame, tFoot, tLook, 12) })}><Chip size={30} color={C.white} bg={REG.footer} border={C.night}>o rodapé: <Tag>footer</Tag></Chip></div>
          <div style={abs(PV.x, 790, { opacity: win(frame, tMail, tLook, 12) })}><Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">link de e-mail: <Tag color={C.purple}>mailto:</Tag></Chip></div>
          <div style={abs(PV.x, 700, { opacity: win(frame, tWhole, tImp, 12) })}><Chip size={30} color={C.night} border={C.purple}>topo, menu, quatro seções e rodapé</Chip></div>
          <div style={abs(PV.x, 790, { opacity: win(frame, tClick, tImp, 12), display: 'flex', alignItems: 'center', gap: 12 })}><Check size={44} /><Chip size={28} color={C.night} border={C.green}>cada link leva para a sua seção</Chip></div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(80, 30)}>
            <SitePreview w={940} h={840} p={pB}>
              <AnaSite fs={22} upTo={10} mine={mine} />
            </SitePreview>
          </div>
          <div style={abs(1080, 40, { opacity: fadeIn(frame, tImp, 12) })}><Chip size={34} color={C.night} border={C.purple}>a página é da Ana{frame >= tYours ? ', o projeto é seu' : '...'}</Chip></div>
          <div style={abs(1080, 150, { display: 'flex', flexDirection: 'column', gap: 18 })}>
            {MINE.map(([k, t], i) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tM[i], 10), transform: `translateX(${(1 - fadeIn(frame, tM[i], 10)) * 30}px)` }}>
                <Check size={44} />
                <span style={{ background: '#FFF4D6', border: '3px dashed #E8B860', borderRadius: 10, padding: '4px 16px', fontFamily: FONT, fontSize: 32, fontWeight: 700, color: '#8A5A12' }}>{t}</span>
              </div>
            ))}
          </div>
          <Label x={1060} y={640} w={820} op={fadeIn(frame, tPerf, 12)} dark size={36}>não precisa ficar perfeito, precisa ficar seu</Label>
        </div>
      )}
    </AbsoluteFill>
  )
}
