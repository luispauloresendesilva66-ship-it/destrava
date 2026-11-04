import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, TagScene, ClasseScene, ReusoScene, IdScene } from './scenes-a.jsx'
import { ClasseOuId, VirgulaScene, DescendenteScene, CascataScene, ErrosScene, Final } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  tag: TagScene,
  classe: ClasseScene,
  reuso: ReusoScene,
  id: IdScene,
  classeOuId: ClasseOuId,
  virgula: VirgulaScene,
  descendente: DescendenteScene,
  cascata: CascataScene,
  erros: ErrosScene,
  final: Final,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n2-a02', blocks: BLOCKS, scenes: SCENES })
export const AulaN2A02 = Lesson
export const calculateAulaN2A02Metadata = calculateMetadata
