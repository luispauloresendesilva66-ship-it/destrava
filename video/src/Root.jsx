import React from 'react'
import { Composition } from 'remotion'
import { AulaN1A01, calculateAulaMetadata } from './aulas/n1-a01/Aula.jsx'
import { BLOCKS } from './aulas/n1-a01/blocks.js'
import { FPS, H, W } from './theme.js'

export const Root = () => (
  <Composition
    id="AulaN1A01"
    component={AulaN1A01}
    width={W}
    height={H}
    fps={FPS}
    durationInFrames={FPS * 60}
    defaultProps={{ timings: BLOCKS.map((b) => ({ n: b.n, file: null, audioFrames: FPS * 5, totalFrames: FPS * 6 })) }}
    calculateMetadata={calculateAulaMetadata}
  />
)
