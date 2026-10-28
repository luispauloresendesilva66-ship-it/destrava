import React from 'react'
import { Composition } from 'remotion'
import { AulaN1A01, calculateAulaMetadata } from './aulas/n1-a01/Aula.jsx'
import { BLOCKS } from './aulas/n1-a01/blocks.js'
import { AulaN1A02, calculateAulaN1A02Metadata } from './aulas/n1-a02/Aula.jsx'
import { BLOCKS as BLOCKS_A02 } from './aulas/n1-a02/blocks.js'
import { AulaN1A03, calculateAulaN1A03Metadata } from './aulas/n1-a03/Aula.jsx'
import { BLOCKS as BLOCKS_A03 } from './aulas/n1-a03/blocks.js'
import { AulaN1A04, calculateAulaN1A04Metadata } from './aulas/n1-a04/Aula.jsx'
import { BLOCKS as BLOCKS_A04 } from './aulas/n1-a04/blocks.js'
import { FPS, H, W } from './theme.js'
import { Reel } from './reels/Reel.jsx'
import { calculateReelMetadata } from './reels/data.js'
import { RFPS, RH, RW } from './reels/theme.js'

const placeholder = (blocks) => ({ timings: blocks.map((b) => ({ n: b.n, file: null, audioFrames: FPS * 5, totalFrames: FPS * 6 })) })

export const Root = () => (
  <>
    <Composition
      id="AulaN1A01"
      component={AulaN1A01}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS)}
      calculateMetadata={calculateAulaMetadata}
    />
    <Composition
      id="AulaN1A02"
      component={AulaN1A02}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A02)}
      calculateMetadata={calculateAulaN1A02Metadata}
    />
    <Composition
      id="AulaN1A03"
      component={AulaN1A03}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A03)}
      calculateMetadata={calculateAulaN1A03Metadata}
    />
    <Composition
      id="AulaN1A04"
      component={AulaN1A04}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A04)}
      calculateMetadata={calculateAulaN1A04Metadata}
    />
    {/* Reels verticais: um template para todos — props { id: 'reel-NN' } (promo/<id>/roteiro.json) */}
    <Composition
      id="Reel"
      component={Reel}
      width={RW}
      height={RH}
      fps={RFPS}
      durationInFrames={RFPS * 30}
      defaultProps={{ id: 'reel-01' }}
      calculateMetadata={calculateReelMetadata}
    />
  </>
)
