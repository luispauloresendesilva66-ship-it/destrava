import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, Recap, Rascunho, Esqueleto, Topo, Sobre, Projetos } from './scenes-a.jsx'
import { Rotina, Contato, Rodape, Checklist, Salvar, Prova, Final } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  recap: Recap,
  rascunho: Rascunho,
  esqueleto: Esqueleto,
  topo: Topo,
  sobre: Sobre,
  projetos: Projetos,
  rotina: Rotina,
  contato: Contato,
  rodape: Rodape,
  checklist: Checklist,
  salvar: Salvar,
  prova: Prova,
  final: Final,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a09', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A09 = Lesson
export const calculateAulaN1A09Metadata = calculateMetadata
