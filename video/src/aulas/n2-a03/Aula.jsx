import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, OndeScene, HexScene, LendoScene, RgbScene } from './scenes-a.jsx'
import { EscolherScene, ContrasteScene, PaletaScene, ErrosScene, Final } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  onde: OndeScene,
  hex: HexScene,
  lendo: LendoScene,
  rgb: RgbScene,
  escolher: EscolherScene,
  contraste: ContrasteScene,
  paleta: PaletaScene,
  erros: ErrosScene,
  final: Final,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n2-a03', blocks: BLOCKS, scenes: SCENES })
export const AulaN2A03 = Lesson
export const calculateAulaN2A03Metadata = calculateMetadata
