import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, PontoDePartida, SeisNiveis, Hierarquia, Paragrafos, Espacos } from './scenes-a.jsx'
import { QuebraBr, Enfase, Comentarios, PaginaCompleta, TagsCruzadas, Resumo } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  pontoDePartida: PontoDePartida,
  seisNiveis: SeisNiveis,
  hierarquia: Hierarquia,
  paragrafos: Paragrafos,
  espacos: Espacos,
  quebraBr: QuebraBr,
  enfase: Enfase,
  comentarios: Comentarios,
  paginaCompleta: PaginaCompleta,
  tagsCruzadas: TagsCruzadas,
  resumo: Resumo,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a02', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A02 = Lesson
export const calculateAulaN1A02Metadata = calculateMetadata
