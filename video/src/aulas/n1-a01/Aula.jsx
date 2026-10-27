import React from 'react'
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion'
import { Background } from '../../components/Background.jsx'
import { Captions } from '../../components/Captions.jsx'
import { loadTimings } from '../../lib/timing.js'
import { BLOCKS } from './blocks.js'
import { Abertura, Internet, Casa, Marcacao, Tag, CodigoFonte } from './scenes-a.jsx'
import { Ferramentas, Estrutura, HeadBody, Conteudo, ErroComum, Resumo } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  internet: Internet,
  casa: Casa,
  marcacao: Marcacao,
  tag: Tag,
  codigoFonte: CodigoFonte,
  ferramentas: Ferramentas,
  estrutura: Estrutura,
  headBody: HeadBody,
  conteudo: Conteudo,
  erroComum: ErroComum,
  resumo: Resumo,
}

export const calculateAulaMetadata = async () => {
  const timings = await loadTimings('n1-a01', BLOCKS)
  return { durationInFrames: timings.reduce((a, t) => a + t.totalFrames, 0), props: { timings } }
}

const BlockView = ({ block, timing }) => {
  const frame = useCurrentFrame()
  const Scene = SCENES[block.scene]
  const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ opacity: fadeIn }}>
        <Scene block={block} frames={timing.audioFrames} />
      </AbsoluteFill>
      <Captions text={block.fala} audioFrames={timing.audioFrames} />
      {timing.file && <Audio src={staticFile(timing.file)} />}
    </AbsoluteFill>
  )
}

export const AulaN1A01 = ({ timings }) => {
  let from = 0
  return (
    <AbsoluteFill>
      {BLOCKS.map((block, i) => {
        const timing = timings[i]
        const el = (
          <Sequence key={block.n} from={from} durationInFrames={timing.totalFrames} name={`Bloco ${String(block.n).padStart(2, '0')} — ${block.title}`}>
            <BlockView block={block} timing={timing} />
          </Sequence>
        )
        from += timing.totalFrames
        return el
      })}
    </AbsoluteFill>
  )
}
