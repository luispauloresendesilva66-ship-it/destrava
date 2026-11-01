import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { C, FONT, MONO } from '../../theme.js'
import { makeSync, fadeIn, clamp01 } from '../../lib/sync.js'
import { LogoReveal } from '../../components/LogoReveal.jsx'
import { Background } from '../../components/Background.jsx'
import { CodeTyping, EditorWindow } from '../../components/CodeTyping.jsx'
import { BrowserMock } from '../../components/BrowserMock.jsx'
import { Check, Chip, Cross } from '../../components/Marks.jsx'
import { ArrowLine } from '../../components/Navigation.jsx'
import { SpeakerIcon } from '../../components/Icons.jsx'
import { Acronym, H2, Label, LinesBox, MouseAt, PAIR, ScrollEditor, Warn, YEL, abs, blinkOn, edAt, rampF, typed, win, FORM_NOME } from './scenes-a.jsx'
import { BLUE, ORANGE, H2_FALE, MSG_LINES, PH, ButtonBox, CodeCard, DataTag, InputBox, LabelText, PhoneMock, RegionsIcon, ServerCloud, TextAreaBox, ValidationBubble, Tag } from './ana.jsx'

const RED = 'rgba(217,83,79,0.55)'
const GOOD = 'rgba(151,196,89,0.5)'

// ---------------------------------------------------------------- Bloco 6
export const Placeholder = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tTrap = s('Agora, um atalho')
  const tExists = s('Existe um atributo chamado')
  const tLight = s('Ele coloca um texto clarinho')
  const tEx = s('Por exemplo')
  const tPretty = s('Fica bonito')
  const tMany = s('e é por isso que muita gente')
  const tType = s('no momento em que a pessoa começa')
  const tGone = s('a dica some')
  const tDistract = s('Se ela se distrair')
  const tAlso = s('Além disso')
  const tSr = s('e nem todo leitor de tela')
  const tUse = s('Então, use o plêis rôlder')
  const tReal = s('O rótulo de verdade')
  const A = win(frame, 0, tUse, 14)
  const B = rampF(frame, tUse - 4, tUse + 10)
  const blink = blinkOn(frame)
  const click = tType + 4
  const focus = rampF(frame, click + 4, click + 8)
  const value = typed(frame, 'An', click + 14, 14)
  const PHL = ` placeholder="${PH}"`
  const segs = [
    { text: '<input type="text" name="nome"', start: tExists, frames: 0 },
    { text: PHL, start: tEx + 4, frames: 30 },
    { text: '>', start: tExists, frames: 0 },
  ]
  const phOn = frame >= tEx + 34
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(80, 40, { display: 'flex', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tTrap, 12) })}>
            <Warn size={56} />
            <Chip size={32} color={C.night} bg="#FFF4D6" border="#E8B860">parece bom, mas é armadilha</Chip>
          </div>
          <div style={{ opacity: fadeIn(frame, tExists, 12) }}>
            <CodeCard x={80} y={140} fs={30} segments={segs} highlights={[{ text: PHL.trim(), at: tEx + 34, color: YEL }]} />
          </div>
          <div style={abs(80, 290, { opacity: fadeIn(frame, tExists + 6, 12) })}>
            <BrowserMock width={900} height={330} tabTitle="Sobre mim" url="index.html">
              <H2 fs={34}>{H2_FALE}</H2>
              <div style={{ marginTop: 40, position: 'relative' }}>
                <InputBox w={520} fs={36} value={value} placeholder={phOn ? PH : ''} focus={focus} caret={focus > 0 && blink} />
                <div style={abs(30, 26)}><MouseAt frame={frame} x={0} y={0} arrive={click} click={click} leave={click + 40} /></div>
              </div>
              <div style={abs(600, 70, { fontFamily: FONT, fontSize: 90, fontWeight: 800, color: C.purpleSoft, opacity: fadeIn(frame, tDistract, 10), transform: `translateY(${-8 * Math.sin(frame / 8)}px) rotate(12deg)` })}>?</div>
            </BrowserMock>
          </div>
          <div style={abs(80, 650, { opacity: win(frame, tLight, tType, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>texto clarinho dentro do campo: uma dica</Chip></div>
          <div style={abs(80, 650, { opacity: fadeIn(frame, tDistract, 12) })}><Chip size={32} color={C.night} border={C.red}>cadê a dica?</Chip></div>
          {/* lado direito */}
          <div style={abs(1060, 300, { opacity: win(frame, tPretty, tMany, 12) })}><Chip size={32} color={C.night} border={C.purple}>fica bonito...</Chip></div>
          <div style={abs(1060, 300, { display: 'flex', alignItems: 'center', gap: 16, opacity: fadeIn(frame, tMany, 12) })}>
            <Cross size={60} />
            <Chip size={30} color={C.night} border={C.red}><Tag color={C.purple}>placeholder</Tag> no lugar do <Tag color={C.purple}>label</Tag>: não</Chip>
          </div>
          <div style={abs(1060, 400, { opacity: fadeIn(frame, tGone, 12) })}><Chip size={30} color={C.night} border={C.red}>começou a digitar, a dica some</Chip></div>
          <div style={abs(1060, 490, { opacity: fadeIn(frame, tAlso, 12) })}><Chip size={30} color={C.night} border={C.red}>cinza clarinho: difícil de ler</Chip></div>
          <div style={abs(1060, 580, { display: 'flex', alignItems: 'center', gap: 14, opacity: fadeIn(frame, tSr, 12) })}>
            <SpeakerIcon size={64} />
            <Chip size={30} color={C.night} border={C.red}>nem todo leitor de tela anuncia igual</Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <CodeCard x={80} y={110} fs={26} text={`<label for="nome">Nome</label>\n<input type="text" id="nome" name="nome"${PHL}>`} highlights={[{ text: '<label for="nome">Nome</label>', at: tUse + 10, color: GOOD }, { text: PHL.trim(), at: tUse + 10, color: YEL }]} mark={<Check size={64} />} />
          <div style={abs(80, 300)}>
            <BrowserMock width={1000} height={300} tabTitle="Sobre mim" url="index.html">
              <H2 fs={34}>{H2_FALE}</H2>
              <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 14 }}>
                <LabelText fs={36} hl={frame >= tReal ? GOOD : null}>Nome</LabelText>
                <InputBox w={520} fs={34} placeholder={PH} />
              </div>
            </BrowserMock>
          </div>
          <div style={abs(1180, 360, { opacity: fadeIn(frame, tUse + 16, 12) })}><Chip size={32} color={C.night} border="#E8B860"><Tag color={C.purple}>placeholder</Tag>: só um exemplo extra</Chip></div>
          <Label x={80} y={660} w={1000} op={fadeIn(frame, tReal, 12)} dark size={36}>o rótulo de verdade: a <Tag>{'<label>'}</Tag></Label>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 7
const FORM_EMAIL = `\n  <label for="email">E-mail</label>\n  <input type="email" id="email" name="email" required>`
export const Email = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tCould = s('Ela podia usar outra ínput')
  const tEq = s('táip igual a i-mêil')
  const tSame = s('Por fora, parece')
  const tKnows = s('Mas o navegador passa a saber')
  const tPhone = s('No celular, o teclado')
  const tSend = s('E, na hora de enviar')
  const tOnly = s('Se a pessoa digitar só ana')
  const tWarnS = s('aparece um aviso')
  const tBuild = s('A Ana monta igual ao nome')
  const tLab = s('uma lêibol com fór igual a email')
  const tInp = s('e uma ínput com táip i-mêil')
  const tIdName = s('ái di email e nêim email')
  const tReq = s('o riquáiârd, que quer dizer')
  const tNoVal = s('Ele não precisa de valor')
  const tWith = s('Com ele, o navegador')
  const A = win(frame, 0, tBuild, 14)
  const B = rampF(frame, tBuild - 4, tBuild + 10)
  const blink = blinkOn(frame)
  // demo
  const dClick = tOnly - 10
  const dFocus = rampF(frame, dClick + 4, dClick + 8) * (1 - rampF(frame, tWarnS - 14, tWarnS - 10))
  const dVal = typed(frame, 'ana', dClick + 10, 16)
  const bClick = tWarnS - 12
  const bub = fadeIn(frame, tWarnS - 4, 8)
  // editor
  const ed = { x: 50, y: 40, fs: 26 }
  const segs = [
    { text: FORM_NOME, start: 0, frames: 0 },
    { text: '\n  <label for="email">E-mail</label>', start: tLab + 2, frames: 30 },
    { text: '\n  <input type="email"', start: tInp + 2, frames: 18 },
    { text: ' id="email" name="email"', start: tIdName + 2, frames: 24 },
    { text: ' required', start: tReq + 6, frames: 10 },
    { text: '>', start: tInp + 20, frames: 0 },
    { text: '\n</form>', start: 0, frames: 0 },
  ]
  const reqHl = frame >= tReq + 18 && frame < tWith && blink
  const hls = [
    { text: 'type="email"', at: tInp + 20, until: tReq, color: YEL },
    ...(reqHl ? [{ text: 'required', at: 0, color: YEL }] : []),
  ]
  const mailIn = rampF(frame, tInp + 20, tInp + 26)
  const reqBub = fadeIn(frame, tWith + 10, 10)
  const rq = edAt(ed, 5, 47)
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={{ opacity: fadeIn(frame, tCould, 12) * (1 - 0.55 * fadeIn(frame, tEq, 10)) }}>
            <CodeCard x={120} y={80} fs={36} text={'<input type="text">'} />
          </div>
          <div style={{ opacity: fadeIn(frame, tEq, 12) }}>
            <CodeCard x={120} y={200} fs={36} text={'<input type="email">'} highlights={[{ text: 'type="email"', at: tEq + 6, color: YEL }]} mark={<Check size={56} />} />
          </div>
          <div style={abs(700, 90, { opacity: fadeIn(frame, tCould + 10, 12) * (1 - fadeIn(frame, tEq, 10)) })}><Chip size={28} color={C.night} border={C.purpleSoft}>podia ser <Tag color={C.purple}>text</Tag>...</Chip></div>
          <div style={abs(700, 215, { opacity: win(frame, tSame, tKnows, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>por fora, a mesma caixinha</Chip></div>
          <div style={abs(700, 215, { opacity: win(frame, tKnows, tSend, 12) })}><Chip size={28} color={C.white} bg={C.purple} border={C.night}>o navegador sabe que é e-mail</Chip></div>
          <div style={abs(700, 215, { opacity: fadeIn(frame, tSend, 12) })}><Chip size={28} color={C.night} border={C.purple}>ao enviar, confere se tem cara de e-mail</Chip></div>
          {/* demo de validação */}
          <div style={abs(120, 350, { opacity: fadeIn(frame, tSend - 10, 12) })}>
            <BrowserMock width={1180} height={440} tabTitle="Sobre mim" url="index.html">
              <H2 fs={34}>{H2_FALE}</H2>
              <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
                <LabelText fs={34}>E-mail</LabelText>
                <InputBox w={420} fs={32} value={dVal} focus={dFocus} caret={dFocus > 0 && blink} />
                <ButtonBox fs={30} press={frame >= bClick && frame < bClick + 8 ? 1 : 0}>Enviar</ButtonBox>
                <div style={abs(120, 26)}><MouseAt frame={frame} x={0} y={0} arrive={dClick} click={dClick} leave={dClick + 20} /></div>
                <div style={abs(570, 30)}><MouseAt frame={frame} x={0} y={0} arrive={bClick} click={bClick} leave={tBuild} from={[-160, 40]} /></div>
              </div>
              <div style={abs(140, 160)}><ValidationBubble fs={26} op={bub} text={'Inclua um "@" no endereço de e-mail.'} /></div>
            </BrowserMock>
          </div>
          <div style={abs(700, 640, { opacity: fadeIn(frame, tWarnS + 8, 12), display: 'flex', alignItems: 'center', gap: 14 })}><Cross size={52} /><Chip size={32} color={C.night} border={C.red}>falta o @</Chip></div>
          {/* celular */}
          <div style={abs(1500, 60, { opacity: fadeIn(frame, tPhone, 12), transform: `translateY(${(1 - fadeIn(frame, tPhone, 12)) * 30}px)` })}>
            <PhoneMock w={330} h={620} keyboard="email" atHl={0.5 + 0.5 * Math.sin((frame - tPhone) / 5)}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 24 }}>{H2_FALE}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <LabelText fs={22}>E-mail</LabelText>
                <InputBox w={190} fs={20} focus={1} caret={blink} />
              </div>
            </PhoneMock>
          </div>
          <div style={abs(1500, 700, { opacity: fadeIn(frame, tPhone + 16, 12) })}><Chip size={26} color={C.night} border={ORANGE}>teclado com o @ à mão</Chip></div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={400} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={hls} />
            </EditorWindow>
          </div>
          <div style={abs(50, 480, { opacity: win(frame, tLab, tReq, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>igual ao nome: <Tag color={C.purple}>label</Tag> + <Tag color={C.purple}>input</Tag></Chip></div>
          {/* required */}
          <ArrowLine x1={rq.x + 40} y1={500} x2={rq.x + 50} y2={rq.y + 22} p={rampF(frame, tReq + 18, tReq + 30)} color="#E8B860" width={6} />
          <div style={abs(380, 500, { opacity: fadeIn(frame, tReq + 18, 12) })}><Chip size={32} color={C.night} border="#E8B860">obrigatório: não pode ficar vazio</Chip></div>
          <div style={abs(380, 600, { opacity: fadeIn(frame, tNoVal, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>sem valor: basta a palavra</Chip></div>
          {/* prévia */}
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={440} tabTitle="Sobre mim" url="index.html">
              <H2 fs={34}>{H2_FALE}</H2>
              <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, position: 'relative' }}>
                <LabelText fs={28}>Nome</LabelText>
                <InputBox w={250} fs={26} value="Ana" />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginLeft: 6, opacity: mailIn }}>
                  <LabelText fs={28}>E-mail</LabelText>
                  <InputBox w={250} fs={26} focus={reqBub} bad={0} />
                </span>
              </div>
              <div style={abs(500, 166)}><ValidationBubble fs={24} op={reqBub} text="Preencha este campo." /></div>
            </BrowserMock>
          </div>
          <div style={abs(990, 520, { opacity: fadeIn(frame, tInp + 26, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>sem parágrafos, os campos ficam lado a lado</Chip></div>
          <div style={abs(990, 610, { opacity: reqBub })}><Chip size={30} color={C.white} bg={C.purple} border={C.night}>campo vazio: o navegador não deixa enviar</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 8
export const FORM_MSG = '\n  <label for="mensagem">Mensagem</label>\n  <textarea id="mensagem" name="mensagem"></textarea>'
export const Textarea = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tOne = s('Para o nome e o e-mail')
  const tLong = s('Mas a mensagem pode ser')
  const tTa = s('Para isso existe a téxt érria')
  const tArea = s('que quer dizer área de texto')
  const tBig = s('É uma caixa maior')
  const tDiff = s('E aqui vai uma diferença')
  const tOpenClose = s('a téxt érria tem tag de abertura')
  const tBetween = s('Se você colocar um texto entre')
  const tSo = s('Por isso, na maioria')
  const tNothing = s('sem nada no meio')
  const tRest = s('O resto funciona igualzinho')
  const tWrite = s('A Ana escreve uma lêibol')
  const tTaW = s('e uma téxt érria com ái di')
  const A = win(frame, 0, tRest, 14)
  const B = rampF(frame, tRest - 4, tRest + 10)
  const blink = blinkOn(frame)
  const ed = { x: 50, y: 40, fs: 26 }
  const segs = [
    { text: FORM_NOME + FORM_EMAIL, start: 0, frames: 0 },
    { text: '\n  <label for="mensagem">Mensagem</label>', start: tWrite + 2, frames: 30 },
    { text: '\n  <textarea id="mensagem" name="mensagem"></textarea>', start: tTaW + 2, frames: 24 },
    { text: '\n</form>', start: 0, frames: 0 },
  ]
  const taIn = rampF(frame, tTaW + 26, tTaW + 32)
  const tClick = tTaW + 30
  const focus = rampF(frame, tClick + 4, tClick + 8)
  const l1 = typed(frame, MSG_LINES[0], tClick + 6, 22)
  const l2 = typed(frame, MSG_LINES[1], tClick + 30, 18)
  const msgLines = frame >= tClick + 30 ? [l1, l2] : [l1]
  const spaces = frame >= tSo
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(120, 70)}>
            <Acronym word="textarea" keys={[0, 1, 2, 3, 4, 5, 6, 7]} tag="textarea" meaning="área de texto" op={fadeIn(frame, tTa, 12)} defOp={fadeIn(frame, tArea, 12)} />
          </div>
          <div style={abs(1000, 60, { opacity: fadeIn(frame, tOne, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            <InputBox w={380} fs={32} value="ana@example.com" />
            <Chip size={26} color={C.night} border={C.purpleSoft}>uma linha basta</Chip>
          </div>
          <div style={abs(1000, 140, { opacity: fadeIn(frame, tBig, 12), display: 'flex', alignItems: 'flex-end', gap: 18 })}>
            <TextAreaBox w={380} h={140} fs={24} lines={['Oi, Ana! Adorei', 'a sua página.', 'Vamos estudar?']} />
            <Chip size={26} color={C.night} border={C.purpleSoft}>várias linhas</Chip>
          </div>
          <div style={abs(1000, 140, { opacity: fadeIn(frame, tLong, 12) * (1 - fadeIn(frame, tBig, 8)) })}><Chip size={28} color={C.night} border={C.purpleSoft}>a mensagem pode ser longa...</Chip></div>
          {/* input x textarea */}
          <div style={{ opacity: fadeIn(frame, tDiff, 12) }}>
            <CodeCard x={120} y={330} fs={34} text="<input>" />
            <div style={abs(120, 430)}><Chip size={28} color={C.night} border={C.purpleSoft}>sem fechamento, uma linha</Chip></div>
          </div>
          <div style={{ opacity: fadeIn(frame, tOpenClose, 12) }}>
            <CodeCard x={720} y={330} fs={34} text="<textarea></textarea>" highlights={[{ text: '<textarea>', at: tOpenClose, color: GOOD }, { text: '</textarea>', at: tOpenClose + 8, color: GOOD }]} />
            <div style={abs(720, 430)}><Chip size={28} color={C.night} border={C.green}>abre e fecha, várias linhas</Chip></div>
          </div>
          {/* mini exemplo: o que fica entre as tags aparece dentro da caixa */}
          <div style={{ opacity: fadeIn(frame, tBetween, 12) }}>
            <CodeCard x={120} y={560} fs={32} text={spaces ? '<textarea>   </textarea>' : '<textarea>Olá</textarea>'} highlights={[{ text: spaces ? '   ' : 'Olá', at: 0, color: spaces ? 'rgba(232,184,96,0.75)' : YEL }]} />
            <div style={abs(700, 560)}>
              <TextAreaBox w={340} h={110} fs={26} lines={[spaces ? '' : 'Olá']} lead={spaces ? '   ' : ''} caret={spaces && blink} focus={spaces ? 1 : 0} />
            </div>
            <div style={abs(1080, 575, { opacity: win(frame, tBetween + 20, tSo, 10) })}><Chip size={28} color={C.night} border={C.purpleSoft}>aparece já escrito dentro da caixa</Chip></div>
            <div style={abs(1080, 575, { opacity: fadeIn(frame, tSo, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
              <Warn size={54} />
              <Chip size={28} color={C.night} bg="#FFF4D6" border="#E8B860">espaços também aparecem</Chip>
            </div>
            <div style={abs(1080, 660, { opacity: fadeIn(frame, tNothing, 12) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>abre e fecha colado</Chip></div>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={460} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={[{ text: '></textarea>', at: tTaW + 26, color: GOOD }]} />
            </EditorWindow>
          </div>
          <div style={abs(50, 540, { opacity: fadeIn(frame, tRest, 12) })}><Chip size={30} color={C.night} border={C.purpleSoft}>também tem <Tag color={C.purple}>id</Tag>, <Tag color={C.purple}>name</Tag> e a sua <Tag color={C.purple}>label</Tag></Chip></div>
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={480} tabTitle="Sobre mim" url="index.html">
              <H2 fs={34}>{H2_FALE}</H2>
              <div style={{ marginTop: 30, display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 10, rowGap: 16, position: 'relative' }}>
                <LabelText fs={28}>Nome</LabelText>
                <InputBox w={250} fs={26} />
                <LabelText fs={28} style={{ marginLeft: 6 }}>E-mail</LabelText>
                <InputBox w={250} fs={26} />
                <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 10, opacity: rampF(frame, tWrite + 32, tWrite + 38) }}>
                  <LabelText fs={28}>Mensagem</LabelText>
                  <span style={{ opacity: taIn }}><TextAreaBox w={440} h={120} fs={22} lines={msgLines} focus={focus} caret={focus > 0 && blink} /></span>
                </span>
              </div>
              <div style={abs(320, 210)}><MouseAt frame={frame} x={0} y={0} arrive={tClick} click={tClick} leave={tClick + 30} /></div>
            </BrowserMock>
          </div>
          <div style={abs(990, 560, { opacity: fadeIn(frame, tClick + 30, 12) })}><Chip size={30} color={C.night} border={C.green}>a caixa maior acomoda várias linhas</Chip></div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 9
export const ButtonScene = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tTag = s('Ele é a tag bâton')
  const tInside = s('Dentro dela vai o texto')
  const tWrite = s('A Ana escreve: enviar')
  const tType = s('E coloca o atributo táip')
  const tMeans = s('que quer dizer enviar o formulário')
  const tClick = s('Quando a pessoa clica')
  const tTries = s('e tenta enviar')
  const tTruth = s('Agora, a verdade')
  const tWhere = s('Enviar para onde')
  const tAction = s('Quem decide isso é o atributo éction')
  const tServer = s('um programa que recebe')
  const tNoServer = s('A gente ainda não tem esse servidor')
  const tReload = s('a página só recarrega')
  const tEmpty = s('e os campos ficam vazios')
  const tOk = s('O formulário está certo')
  const A = win(frame, 0, tTruth, 14)
  const B = rampF(frame, tTruth - 4, tTruth + 10)
  const ed = { x: 50, y: 40, fs: 24 }
  const segs = [
    { text: FORM_NOME + FORM_EMAIL + FORM_MSG, start: 0, frames: 0 },
    { text: '\n  <button', start: tTag + 2, frames: 8 },
    { text: ' type="submit"', start: tType + 6, frames: 16 },
    { text: '>', start: tTag + 10, frames: 0 },
    { text: 'Enviar', start: tWrite + 8, frames: 10 },
    { text: '</button>', start: tTag + 12, frames: 10 },
    { text: '\n</form>', start: 0, frames: 0 },
  ]
  const btnIn = rampF(frame, tTag + 22, tTag + 28)
  const btnText = frame >= tWrite + 18 ? 'Enviar' : ''
  const click = tClick + 10
  const press = frame >= click && frame < click + 8 ? 1 : 0
  // parte B
  // os dados seguem a seta, mas param no meio do caminho (não há servidor)
  const prog = 0.5 * rampF(frame, tWhere + 6, tServer + 20)
  const flash = win(frame, tReload, tReload + 20, 6)
  const emptied = frame >= tReload + 10
  const P0 = { x: 1010, y: 300 }
  const P1 = { x: 1460, y: 260 }
  const tagsOp = win(frame, tWhere + 6, tReload + 6, 8)
  const tagList = ['nome', 'email', 'mensagem']
  const vals = emptied ? { n: '', e: '', m: [] } : { n: 'Ana Souza', e: 'ana@example.com', m: [MSG_LINES[0]] }
  const formPreview = (fs, w1, taW) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 10, rowGap: 16 }}>
      <LabelText fs={fs}>Nome</LabelText>
      <InputBox w={w1} fs={fs - 2} value={vals.n} />
      <LabelText fs={fs} style={{ marginLeft: 6 }}>E-mail</LabelText>
      <InputBox w={w1} fs={fs - 2} value={vals.e} />
      <LabelText fs={fs}>Mensagem</LabelText>
      <TextAreaBox w={taW} h={110} fs={fs - 6} lines={vals.m} />
      <ButtonBox fs={fs}>Enviar</ButtonBox>
    </div>
  )
  return (
    <AbsoluteFill>
      {A > 0 && (
        <div style={{ opacity: A }}>
          <div style={abs(ed.x, ed.y)}>
            <EditorWindow width={900} height={480} filename="index.html">
              <CodeTyping segments={segs} fontSize={ed.fs} highlights={[{ text: 'type="submit"', at: tType + 22, color: YEL }]} />
            </EditorWindow>
          </div>
          <div style={abs(60, 560)}>
            <Acronym size={64} word="button" keys={[0, 1, 2, 3, 4, 5]} tag="button" meaning="botão" op={fadeIn(frame, tTag - 10, 12)} defOp={fadeIn(frame, tTag + 4, 12)} />
          </div>
          <div style={abs(560, 600, { opacity: win(frame, tInside, tType, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>dentro: o texto do botão</Chip></div>
          <div style={abs(560, 600, { opacity: fadeIn(frame, tMeans, 12) })}><Chip size={28} color={C.night} border="#E8B860"><Tag color={C.purple}>submit</Tag> = enviar o formulário</Chip></div>
          <div style={abs(990, 40)}>
            <BrowserMock width={880} height={500} tabTitle="Sobre mim" url="index.html">
              <H2 fs={34}>{H2_FALE}</H2>
              <div style={{ marginTop: 30, display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 10, rowGap: 16 }}>
                <LabelText fs={28}>Nome</LabelText>
                <InputBox w={250} fs={26} value="Ana Souza" />
                <LabelText fs={28} style={{ marginLeft: 6 }}>E-mail</LabelText>
                <InputBox w={250} fs={26} value="ana@example.com" />
                <LabelText fs={28}>Mensagem</LabelText>
                <TextAreaBox w={380} h={110} fs={22} lines={[MSG_LINES[0]]} />
                <span style={{ opacity: btnIn, minWidth: 20 }}><ButtonBox fs={28} press={press} hl={frame >= tType + 22 && frame < tClick ? 'rgba(255,210,138,0.8)' : null}>{btnText || ' '}</ButtonBox></span>
              </div>
              <div style={abs(700, 228)}><MouseAt frame={frame} x={0} y={0} arrive={click} click={click} leave={tTruth} from={[-160, -60]} /></div>
            </BrowserMock>
          </div>
          <div style={abs(990, 580, { opacity: fadeIn(frame, click + 6, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
            <Check size={50} />
            <Chip size={28} color={C.night} border={C.purple}>confere o e-mail e os obrigatórios{frame >= tTries ? '... e tenta enviar' : ''}</Chip>
          </div>
        </div>
      )}
      {B > 0 && (
        <div style={{ opacity: B }}>
          <div style={abs(80, 60)}>
            <BrowserMock width={880} height={480} tabTitle="Sobre mim" url="index.html">
              <H2 fs={34}>{H2_FALE}</H2>
              <div style={{ marginTop: 30 }}>{formPreview(28, 250, 380)}</div>
              <div style={{ position: 'absolute', inset: 0, background: C.white, opacity: flash }} />
            </BrowserMock>
          </div>
          {/* os dados saem com as etiquetas... */}
          <ArrowLine x1={P0.x} y1={P0.y} x2={P1.x} y2={P1.y} p={rampF(frame, tWhere, tWhere + 20)} dashed color={C.purpleSoft} bend={-40} />
          {tagList.map((t, i) => {
            const p = clamp01(prog - i * 0.08)
            const x = P0.x + (P1.x - P0.x) * p - 40
            const y = P0.y + (P1.y - P0.y) * p - 30 * Math.sin(Math.PI * p) + i * 54 - 20
            return <div key={t} style={abs(x, y, { opacity: tagsOp * (p > 0 ? 1 : 0) })}><DataTag fs={24}>{t}</DataTag></div>
          })}
          <div style={abs(1460, 120, { opacity: fadeIn(frame, tServer, 12) })}><ServerCloud w={380} label="servidor" sub="(próximos níveis)" /></div>
          <div style={abs(1000, 60, { opacity: fadeIn(frame, tWhere, 12) * (1 - fadeIn(frame, tServer, 10)) })}><Chip size={40} color={C.white} bg={C.purple} border={C.night}>Enviar para onde?</Chip></div>
          <div style={{ opacity: win(frame, tAction, tReload, 12) }}>
            <CodeCard x={1000} y={450} fs={30} text={'<form action="...">'} highlights={[{ text: 'action="..."', at: tAction + 6, color: YEL }]} />
            <div style={abs(1000, 550)}><Chip size={28} color={C.night} border="#E8B860"><Tag color={C.purple}>action</Tag>: o servidor que recebe os dados</Chip></div>
          </div>
          <div style={abs(1330, 290, { fontFamily: FONT, fontSize: 80, fontWeight: 800, color: C.red, opacity: win(frame, tNoServer + 6, tReload, 10) })}>?</div>
          <div style={abs(1440, 400, { opacity: win(frame, tNoServer, tReload, 12) })}><Chip size={28} color={C.night} border={C.red}>ainda não temos servidor</Chip></div>
          <Label x={80} y={590} w={880} op={fadeIn(frame, tReload, 12)} size={32} border={C.purple}>sem servidor, a página só recarrega</Label>
          <div style={abs(80, 690, { opacity: fadeIn(frame, tEmpty, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>os campos ficam vazios de novo</Chip></div>
          <div style={abs(1040, 640, { opacity: fadeIn(frame, tOk, 12), display: 'flex', alignItems: 'center', gap: 18 })}>
            <Check size={76} />
            <Chip size={38} color={C.white} bg={C.purple} border={C.night}>o formulário está certo</Chip>
          </div>
        </div>
      )}
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 10
const P_NOME = '\n  <p>\n    <label for="nome">Nome</label>\n    <input type="text" id="nome" name="nome">\n  </p>'
const P_EMAIL = '\n  <p>\n    <label for="email">E-mail</label>\n    <input type="email" id="email" name="email" required>\n  </p>'
const P_MSG = '\n  <p>\n    <label for="mensagem">Mensagem</label>\n    <textarea id="mensagem" name="mensagem"></textarea>\n  </p>'
const PAIR_COLORS = { nome: 'rgba(91,141,239,0.5)', email: 'rgba(240,160,75,0.6)', mensagem: 'rgba(151,196,89,0.6)' }
export const PaginaAna = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tAll = s('Agora, vamos juntar')
  const tH2 = s('Ela cria um título novo')
  const tBelow = s('E, logo abaixo')
  const tOpen = s('Abre a fórm')
  const tNome = s('Primeiro, o nome')
  const tMail = s('Depois, o e-mail')
  const tMsg = s('Em seguida, a mensagem')
  const tBtn = s('E, por fim, o bâton')
  const tClose = s('Fecha a fórm')
  const tPar = s('Repara que cada par')
  const tNotReq = s('Isso não é obrigatório')
  const tLine = s('mas coloca cada par numa linha')
  const tIndent = s('E repara também na indentação')
  const tTest = s('Agora, faz o teste')
  const span = (a, b) => Math.max(20, b - a - 8)
  const ed = { x: 50, y: 40, fs: 25 }
  const segs = [
    { text: `<h2>${H2_FALE}</h2>`, start: tH2 + 4, frames: 18 },
    { text: '\n<form>', start: tOpen + 2, frames: 8 },
    { text: P_NOME, start: tNome + 4, frames: span(tNome, tMail) },
    { text: P_EMAIL, start: tMail + 4, frames: span(tMail, tMsg) },
    { text: P_MSG, start: tMsg + 4, frames: span(tMsg, tBtn) },
    { text: '\n  <button type="submit">Enviar</button>', start: tBtn + 4, frames: span(tBtn, tClose) },
    { text: '\n</form>', start: tClose + 4, frames: 8 },
  ]
  const full = segs.map((g) => g.text).join('')
  const allLines = full.split('\n')
  const numbers = allLines.map((_, i) => 41 + i)
  const pairOn = frame >= tPar
  const hls = pairOn ? Object.entries(PAIR_COLORS).flatMap(([k, c]) => [{ text: `for="${k}"`, at: tPar, color: c }, { text: `id="${k}"`, at: tPar, color: c }]) : []
  const done = (t, f) => rampF(frame, t + 4 + f - 4, t + 4 + f + 2)
  const rNome = done(tNome, span(tNome, tMail))
  const rMail = done(tMail, span(tMail, tMsg))
  const rMsg = done(tMsg, span(tMsg, tBtn))
  const rBtn = done(tBtn, span(tBtn, tClose))
  const indentOn = fadeIn(frame, tIndent + 10, 10)
  const blink = blinkOn(frame)
  const clicks = [tTest + 12, tTest + 40, tTest + 68]
  const active = clicks.reduce((a, c, i) => (frame >= c + 4 ? i : a), -1)
  const fcs = (i) => (active === i ? 1 : 0)
  const okOp = (i) => fadeIn(frame, clicks[i] + 8, 8)
  const pBox = fadeIn(frame, tPar + 6, 10)
  const pWrap = (key, i, children, op) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 10, opacity: op, margin: '0 0 18px', padding: '4px 0' }}>
      {children}
      <div style={{ opacity: okOp(i), marginLeft: 12, display: 'flex' }}><Check size={40} /></div>
      {pBox > 0 && <div style={{ position: 'absolute', inset: '-4px -10px', border: `3px dashed ${PAIR_COLORS[key].replace(/[\d.]+\)$/, '1)')}`, borderRadius: 10, opacity: pBox }} />}
    </div>
  )
  const lab = (t, key, i) => <LabelText fs={26} hl={pairOn ? PAIR_COLORS[key] : null}>{t}</LabelText>
  // posição de cada rótulo na prévia (para o cursor), relativa ao conteúdo
  const labelY = [92, 158, 282]
  return (
    <AbsoluteFill>
      <div style={abs(ed.x, ed.y, { opacity: fadeIn(frame, tAll, 12) })}>
        <EditorWindow width={900} height={760} filename="index.html">
          <CodeTyping segments={segs} fontSize={ed.fs} numbers={numbers} highlights={hls} />
        </EditorWindow>
      </div>
      {indentOn > 0 && allLines.map((ln, i) => {
        const n = ln.length - ln.trimStart().length
        if (!n) return null
        const a = edAt(ed, i, 0)
        const b = edAt(ed, i, n)
        return <div key={i} style={abs(a.x, a.y - ed.fs * 0.62, { width: b.x - a.x - 3, height: ed.fs * 1.24, background: '#E8B860', opacity: 0.55 * indentOn, borderRadius: 4 })} />
      })}
      <div style={abs(990, 40, { opacity: fadeIn(frame, tAll + 6, 12) })}>
        <BrowserMock width={880} height={560} tabTitle="Sobre mim" url="index.html">
          <div style={{ fontFamily: FONT, color: '#1A1A1A' }}>
            <H2 fs={34} op={rampF(frame, tH2 + 20, tH2 + 26)} style={{ marginBottom: 18 }}>{H2_FALE}</H2>
            {pWrap('nome', 0, <>{lab('Nome', 'nome', 0)}<InputBox w={300} fs={24} focus={fcs(0)} caret={fcs(0) > 0 && blink} /></>, rNome)}
            {pWrap('email', 1, <>{lab('E-mail', 'email', 1)}<InputBox w={300} fs={24} focus={fcs(1)} caret={fcs(1) > 0 && blink} /></>, rMail)}
            {pWrap('mensagem', 2, <>{lab('Mensagem', 'mensagem', 2)}<TextAreaBox w={380} h={96} fs={20} focus={fcs(2)} caret={fcs(2) > 0 && blink} /></>, rMsg)}
            <div style={{ opacity: rBtn }}><ButtonBox fs={26}>Enviar</ButtonBox></div>
          </div>
          {clicks.map((c, i) => (
            <div key={i} style={abs(28 + 30, 28 + labelY[i])}><MouseAt frame={frame} x={0} y={0} arrive={c} click={c} leave={i < 2 ? clicks[i + 1] - 18 : c + 40} from={i === 0 ? [200, -100] : [0, -50]} /></div>
          ))}
        </BrowserMock>
      </div>
      <div style={abs(990, 640, { opacity: fadeIn(frame, tBelow, 12) * (1 - fadeIn(frame, tPar, 10)) })}><Chip size={28} color={C.night} border={C.purpleSoft}>no <Tag color={C.purple}>index.html</Tag>, abaixo da tabela</Chip></div>
      <div style={abs(990, 640, { opacity: win(frame, tPar, tTest, 12) })}><Chip size={28} color={C.night} border={C.purple}>cada par <Tag color={C.purple}>for</Tag>/<Tag color={C.purple}>id</Tag> com a sua cor</Chip></div>
      <div style={abs(990, 730, { opacity: win(frame, tNotReq, tIndent, 12) })}><Chip size={28} color={C.night} border={C.purpleSoft}>{frame >= tLine ? <>cada par num <Tag color={C.purple}>{'<p>'}</Tag>: uma linha</> : <><Tag color={C.purple}>{'<p>'}</Tag> não é obrigatório...</>}</Chip></div>
      <Label x={990} y={730} w={880} op={win(frame, tIndent + 10, tTest, 12)} dark size={30}>cada nível mais para dentro</Label>
      <div style={abs(990, 640, { opacity: fadeIn(frame, tTest, 12), display: 'flex', alignItems: 'center', gap: 14 })}>
        <Chip size={30} color={C.white} bg={C.purple} border={C.night}>teste: clique em cada rótulo</Chip>
      </div>
    </AbsoluteFill>
  )
}

// ---------------------------------------------------------------- Bloco 11
const ErrTitle = ({ n, children }) => (
  <div style={abs(120, 40, { display: 'flex', alignItems: 'center', gap: 20, fontFamily: FONT })}>
    <div style={{ width: 70, height: 70, borderRadius: 35, background: C.purple, color: C.white, fontSize: 40, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 700, color: C.night }}>{children}</div>
  </div>
)
export const Erros = ({ block, frames }) => {
  const frame = useCurrentFrame()
  const s = makeSync(block.fala, frames)
  const tStart = s('Antes de terminar')
  const tE1 = s('O primeiro')
  const tE1b = s('O texto aparece')
  const tE2 = s('O segundo')
  const tHyph = s('tipo email com hífen')
  const tCase = s('ou com letra maiúscula')
  const tSame = s('Precisa ser igual')
  const tE3 = s('O terceiro')
  const tE3b = s('A ínput não tem fechamento')
  const tE4 = s('E o quarto')
  const tRecap = s('Agora, vamos recapitular')
  const k0 = win(frame, 0, tE1, 10)
  const k1 = win(frame, tE1 - 4, tE2, 12)
  const k2 = win(frame, tE2, tE3, 12)
  const k3 = win(frame, tE3, tE4, 12)
  const k4 = win(frame, tE4, tRecap, 12)
  const R = rampF(frame, tRecap - 4, tRecap + 10)
  const fs = 38
  // resumo
  const P = (t) => <Tag color={C.purple}>{t}</Tag>
  const items = [
    { t: <>{P('form')}: a caixa</>, at: s('A fórm é a caixa') },
    { t: <>{P('input')}: uma linha, {P('text')} ou {P('email')}</>, at: s('A ínput cria campos') },
    { t: <>{P('textarea')}: textos longos</>, at: s('A téxt érria é para') },
    { t: <>{P('label')} + {P('for')} + {P('id')}: rótulo ligado</>, at: s('A lêibol é o rótulo') },
    { t: <>{P('button type="submit"')}: envia</>, at: s('E o bâton do táip') },
  ]
  const tBtn = s('Os exercícios estão')
  const tNext = s('Na próxima aula')
  const tBye = s('Até lá')
  const end = rampF(frame, tNext, tNext + 18)
  const pulse = frame >= tBtn ? 1 + 0.05 * Math.sin((frame - tBtn) / 5) : 1
  const next = fadeIn(frame, tNext + 20, 14)
  const slogan = fadeIn(frame, tBye + 24, 14)
  return (
    <AbsoluteFill>
      {k0 > 0 && (
        <div style={abs(0, 300, { width: 1920, textAlign: 'center', opacity: k0 * fadeIn(frame, tStart, 10), fontFamily: FONT, fontSize: 70, fontWeight: 700, color: C.night })}>Os erros mais comuns</div>
      )}
      {k1 > 0 && (
        <div style={{ opacity: k1 }}>
          <ErrTitle n={1}><Tag>label</Tag> sem <Tag>for</Tag></ErrTitle>
          <CodeCard x={120} y={190} fs={fs} text={'<label>Nome</label>'} highlights={[{ text: '<label>', at: tE1 + 20, color: RED }]} mark={frame >= tE1 + 20 ? <Cross size={66} /> : null} />
          <div style={abs(120, 330, { opacity: fadeIn(frame, tE1b, 12) })}><Chip size={30} color={C.night} border={C.red}>o texto aparece, mas não está ligado a nada</Chip></div>
          <CodeCard x={120} y={450} fs={fs} text={'<label for="nome">Nome</label>'} op={fadeIn(frame, tE1b + 30, 12)} highlights={[{ text: 'for="nome"', at: tE1b + 30, color: GOOD }]} mark={<Check size={66} />} />
          <div style={abs(1100, 200, { opacity: fadeIn(frame, tE1 + 26, 12), background: C.white, borderRadius: 18, padding: '28px 32px', boxShadow: '0 14px 30px rgba(38,33,92,0.16)', display: 'flex', alignItems: 'center', gap: 14 })}>
            <LabelText fs={34}>Nome</LabelText>
            <InputBox w={300} fs={32} />
          </div>
        </div>
      )}
      {k2 > 0 && (
        <div style={{ opacity: k2 }}>
          <ErrTitle n={2}>valores diferentes</ErrTitle>
          <CodeCard x={120} y={180} fs={34} text={'<label for="email">E-mail</label>\n<input id="Email">'} highlights={[{ text: 'for="email"', at: tE2 + 20, color: RED }, { text: 'id="Email"', at: tE2 + 20, color: RED }]} mark={frame >= tE2 + 20 ? <Cross size={66} /> : null} />
          <div style={abs(120, 360, { opacity: fadeIn(frame, tE2 + 26, 12) })}><Chip size={30} color={C.night} border={C.red}>valores diferentes: não ligou</Chip></div>
          <div style={abs(1100, 180, { display: 'flex', flexDirection: 'column', gap: 18 })}>
            <div style={{ opacity: fadeIn(frame, tHyph, 12) }}><Chip size={34} color={C.night} border={C.red}><Tag>e-mail</Tag> ≠ <Tag>email</Tag></Chip></div>
            <div style={{ opacity: fadeIn(frame, tCase, 12) }}><Chip size={34} color={C.night} border={C.red}><Tag>Email</Tag> ≠ <Tag>email</Tag></Chip></div>
          </div>
          <CodeCard x={120} y={470} fs={34} text={'<label for="email">E-mail</label>\n<input id="email">'} op={fadeIn(frame, tSame, 12)} highlights={[{ text: 'for="email"', at: tSame, color: PAIR }, { text: 'id="email"', at: tSame, color: PAIR }]} mark={<Check size={66} />} />
          <div style={abs(1100, 520, { opacity: fadeIn(frame, tSame + 10, 12) })}><Chip size={34} color={C.white} bg={C.purple} border={C.night}>igual, letra por letra</Chip></div>
        </div>
      )}
      {k3 > 0 && (
        <div style={{ opacity: k3 }}>
          <ErrTitle n={3}><Tag>input</Tag> não fecha</ErrTitle>
          <CodeCard x={120} y={190} fs={fs} text={'<input type="text" name="nome"></input>'} highlights={[{ text: '</input>', at: tE3 + 20, color: RED }]} mark={frame >= tE3 + 20 ? <Cross size={66} /> : null} />
          <div style={abs(120, 330, { opacity: fadeIn(frame, tE3 + 26, 12) })}><Chip size={30} color={C.night} border={C.red}>a <Tag color={C.purple}>input</Tag> não é uma <Tag color={C.purple}>textarea</Tag></Chip></div>
          <CodeCard x={120} y={450} fs={fs} text={'<input type="text" name="nome">'} op={fadeIn(frame, tE3b, 12)} mark={<Check size={66} />} />
          <div style={abs(120, 570, { opacity: fadeIn(frame, tE3b + 10, 12) })}><Chip size={32} color={C.white} bg={C.purple} border={C.night}>abre e pronto</Chip></div>
        </div>
      )}
      {k4 > 0 && (
        <div style={{ opacity: k4 }}>
          <ErrTitle n={4}><Tag>placeholder</Tag> no lugar do <Tag>label</Tag></ErrTitle>
          <CodeCard x={120} y={190} fs={32} text={`<input type="text" name="nome" placeholder="${PH}">`} highlights={[{ text: `placeholder="${PH}"`, at: tE4 + 14, color: RED }]} mark={frame >= tE4 + 14 ? <Cross size={66} /> : null} />
          <div style={abs(120, 320, { background: C.white, borderRadius: 18, padding: '28px 32px', boxShadow: '0 14px 30px rgba(38,33,92,0.16)' })}>
            <InputBox w={520} fs={34} placeholder={PH} />
          </div>
          <div style={abs(120, 470, { opacity: fadeIn(frame, tE4 + 20, 12), display: 'flex', alignItems: 'center', gap: 16 })}><Cross size={56} /><Chip size={34} color={C.night} border={C.red}><Tag color={C.purple}>placeholder</Tag> não é rótulo</Chip></div>
        </div>
      )}
      {R > 0 && (
        <AbsoluteFill style={{ opacity: R }}>
          <div style={abs(0, 28, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 70, fontWeight: 700, color: C.night })}>Resumo da aula</div>
          <div style={abs(460, 150, { display: 'flex', flexDirection: 'column', gap: 18 })}>
            {items.map((it, i) => {
              const p = fadeIn(frame, it.at, 12)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
                  <Check size={58} />
                  <div style={{ fontFamily: FONT, fontSize: 44, color: C.night, fontWeight: 500 }}>{it.t}</div>
                </div>
              )
            })}
          </div>
          <div style={abs(0, 660, { width: 1920, textAlign: 'center', opacity: fadeIn(frame, tBtn, 14) })}>
            <div style={{ display: 'inline-block', transform: `scale(${pulse})`, background: C.purple, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 600, padding: '20px 64px', borderRadius: 24, boxShadow: `0 0 ${24 + 16 * Math.sin((frame - tBtn) / 5)}px ${C.purpleSoft}` }}>
              Fazer os exercícios
            </div>
          </div>
        </AbsoluteFill>
      )}
      {end > 0 && (
        <AbsoluteFill style={{ opacity: end }}>
          <Background dark />
          <div style={abs(0, 80, { width: 1920, display: 'flex', justifyContent: 'center', opacity: next, transform: `translateY(${(1 - next) * 20}px)` })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: '#ffffff10', border: `3px solid ${C.purpleSoft}`, borderRadius: 28, padding: '26px 50px' }}>
              <RegionsIcon size={110} />
              <div style={{ fontFamily: FONT, color: C.lavender }}>
                <div style={{ fontSize: 32, color: C.purpleSoft, fontWeight: 600 }}>Próxima aula</div>
                <div style={{ fontSize: 60, fontWeight: 700 }}>Aula 8 — Tags semânticas</div>
              </div>
            </div>
          </div>
          <div style={abs(0, 400, { width: 1920, display: 'flex', justifyContent: 'center' })}>
            {frame >= tBye - 4 && <LogoReveal start={tBye - 4} height={220} unlockAt={18} bodyColor={C.purpleSoft} wordColor={C.lavender} />}
          </div>
          <div style={abs(0, 700, { width: 1920, textAlign: 'center', fontFamily: FONT, fontSize: 56, color: C.lavender, opacity: slogan, transform: `translateY(${(1 - slogan) * 16}px)` })}>
            Destrava sua carreira. Um nível de cada vez.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}
