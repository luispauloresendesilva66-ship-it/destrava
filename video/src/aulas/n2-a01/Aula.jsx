import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, Papeis, Anatomia, TagStyle, Declaracoes } from './scenes-a.jsx'
import { Arquivo, EditorDestrava, Erros, Experimente, Final } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  papeis: Papeis,
  anatomia: Anatomia,
  tagStyle: TagStyle,
  declaracoes: Declaracoes,
  arquivo: Arquivo,
  editor: EditorDestrava,
  erros: Erros,
  experimente: Experimente,
  final: Final,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n2-a01', blocks: BLOCKS, scenes: SCENES })
export const AulaN2A01 = Lesson
export const calculateAulaN2A01Metadata = calculateMetadata
