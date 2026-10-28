import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, PorQueLista, TagUl, TagOl, QuandoUsar } from './scenes-a.jsx'
import { Aninhada, PaginaAna, Erros, Menu, Resumo } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  porQueLista: PorQueLista,
  ul: TagUl,
  ol: TagOl,
  quandoUsar: QuandoUsar,
  aninhada: Aninhada,
  paginaAna: PaginaAna,
  erros: Erros,
  menu: Menu,
  resumo: Resumo,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a05', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A05 = Lesson
export const calculateAulaN1A05Metadata = calculateMetadata
