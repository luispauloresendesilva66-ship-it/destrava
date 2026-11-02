import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, Sopa, HeaderScene, NavScene, MainScene } from './scenes-a.jsx'
import { SectionScene, FooterScene, PorQue, PaginaAna, Erros } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  sopa: Sopa,
  header: HeaderScene,
  nav: NavScene,
  main: MainScene,
  section: SectionScene,
  footer: FooterScene,
  porQue: PorQue,
  paginaAna: PaginaAna,
  erros: Erros,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a08', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A08 = Lesson
export const calculateAulaN1A08Metadata = calculateMetadata
