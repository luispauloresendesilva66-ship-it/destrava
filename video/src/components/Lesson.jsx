import React from 'react'
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion'
import { Background } from './Background.jsx'
import { Captions } from './Captions.jsx'
import { loadTimings } from '../lib/timing.js'

// Monta uma aula a partir de { publicId, blocks, scenes }: um <Sequence> por bloco, com fundo,
// cena, legendas queimadas (fala) e o áudio do bloco. Mesmo formato da Aula 1.
export const makeLesson = ({ publicId, blocks, scenes }) => {
  const calculateMetadata = async () => {
    const timings = await loadTimings(publicId, blocks)
    return { durationInFrames: timings.reduce((a, t) => a + t.totalFrames, 0), props: { timings } }
  }

  const BlockView = ({ block, timing }) => {
    const frame = useCurrentFrame()
    const Scene = scenes[block.scene]
    const fadeIn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' })
    return (
      <AbsoluteFill>
        <Background />
        <AbsoluteFill style={{ opacity: fadeIn }}>
          <Scene block={block} frames={timing.audioFrames} />
        </AbsoluteFill>
        <Captions text={block.fala} audioFrames={timing.audioFrames} fix={block.captionFix} />
        {timing.file && <Audio src={staticFile(timing.file)} />}
      </AbsoluteFill>
    )
  }

  const Lesson = ({ timings }) => {
    let from = 0
    return (
      <AbsoluteFill>
        {blocks.map((block, i) => {
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

  return { Lesson, calculateMetadata }
}
