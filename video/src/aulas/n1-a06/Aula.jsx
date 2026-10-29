import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, QuandoUsar, Estrutura, TagTh, TagCaption } from './scenes-a.jsx'
import { Partes, PaginaAna, Acessivel, Erros, Resumo } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  quandoUsar: QuandoUsar,
  estrutura: Estrutura,
  th: TagTh,
  caption: TagCaption,
  partes: Partes,
  paginaAna: PaginaAna,
  acessivel: Acessivel,
  erros: Erros,
  resumo: Resumo,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a06', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A06 = Lesson
export const calculateAulaN1A06Metadata = calculateMetadata
