import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, Hipertexto, TagA, TextoDoLink, SegundaPagina, CaminhoDeVolta } from './scenes-a.jsx'
import { Pastas, Target, Secao, Mailto, Erros, Resumo } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  hipertexto: Hipertexto,
  tagA: TagA,
  textoDoLink: TextoDoLink,
  segundaPagina: SegundaPagina,
  caminhoDeVolta: CaminhoDeVolta,
  pastas: Pastas,
  target: Target,
  secao: Secao,
  mailto: Mailto,
  erros: Erros,
  resumo: Resumo,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a03', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A03 = Lesson
export const calculateAulaN1A03Metadata = calculateMetadata
