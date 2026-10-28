import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, TagImg, PastaImagens, Alt, BomAlt, Tamanho } from './scenes-a.jsx'
import { Formatos, Figure, ImagemLink, OutrosSites, Erros, Resumo } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  tagImg: TagImg,
  pastaImagens: PastaImagens,
  alt: Alt,
  bomAlt: BomAlt,
  tamanho: Tamanho,
  formatos: Formatos,
  figure: Figure,
  imagemLink: ImagemLink,
  outrosSites: OutrosSites,
  erros: Erros,
  resumo: Resumo,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a04', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A04 = Lesson
export const calculateAulaN1A04Metadata = calculateMetadata
