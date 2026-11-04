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
import { AulaN1A05, calculateAulaN1A05Metadata } from './aulas/n1-a05/Aula.jsx'
import { BLOCKS as BLOCKS_A05 } from './aulas/n1-a05/blocks.js'
import { AulaN1A06, calculateAulaN1A06Metadata } from './aulas/n1-a06/Aula.jsx'
import { BLOCKS as BLOCKS_A06 } from './aulas/n1-a06/blocks.js'
import { AulaN1A07, calculateAulaN1A07Metadata } from './aulas/n1-a07/Aula.jsx'
import { BLOCKS as BLOCKS_A07 } from './aulas/n1-a07/blocks.js'
import { AulaN1A08, calculateAulaN1A08Metadata } from './aulas/n1-a08/Aula.jsx'
import { BLOCKS as BLOCKS_A08 } from './aulas/n1-a08/blocks.js'
import { AulaN1A09, calculateAulaN1A09Metadata } from './aulas/n1-a09/Aula.jsx'
import { BLOCKS as BLOCKS_A09 } from './aulas/n1-a09/blocks.js'
import { AulaN2A01, calculateAulaN2A01Metadata } from './aulas/n2-a01/Aula.jsx'
import { BLOCKS as BLOCKS_N2A01 } from './aulas/n2-a01/blocks.js'
import { AulaN2A02, calculateAulaN2A02Metadata } from './aulas/n2-a02/Aula.jsx'
import { BLOCKS as BLOCKS_N2A02 } from './aulas/n2-a02/blocks.js'
import { AulaN2A03, calculateAulaN2A03Metadata } from './aulas/n2-a03/Aula.jsx'
import { BLOCKS as BLOCKS_N2A03 } from './aulas/n2-a03/blocks.js'
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
    <Composition
      id="AulaN1A05"
      component={AulaN1A05}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A05)}
      calculateMetadata={calculateAulaN1A05Metadata}
    />
    <Composition
      id="AulaN1A06"
      component={AulaN1A06}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A06)}
      calculateMetadata={calculateAulaN1A06Metadata}
    />
    <Composition
      id="AulaN1A07"
      component={AulaN1A07}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A07)}
      calculateMetadata={calculateAulaN1A07Metadata}
    />
    <Composition
      id="AulaN1A08"
      component={AulaN1A08}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A08)}
      calculateMetadata={calculateAulaN1A08Metadata}
    />
    <Composition
      id="AulaN1A09"
      component={AulaN1A09}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_A09)}
      calculateMetadata={calculateAulaN1A09Metadata}
    />
    <Composition
      id="AulaN2A01"
      component={AulaN2A01}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_N2A01)}
      calculateMetadata={calculateAulaN2A01Metadata}
    />
    <Composition
      id="AulaN2A02"
      component={AulaN2A02}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_N2A02)}
      calculateMetadata={calculateAulaN2A02Metadata}
    />
    <Composition
      id="AulaN2A03"
      component={AulaN2A03}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={FPS * 60}
      defaultProps={placeholder(BLOCKS_N2A03)}
      calculateMetadata={calculateAulaN2A03Metadata}
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
