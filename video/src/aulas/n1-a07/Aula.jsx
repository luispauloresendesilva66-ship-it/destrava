import { makeLesson } from '../../components/Lesson.jsx'
import { BLOCKS } from './blocks.js'
import { Abertura, OQueE, FormInput, LabelScene, PorQue } from './scenes-a.jsx'
import { Placeholder, Email, Textarea, ButtonScene, PaginaAna, Erros } from './scenes-b.jsx'

const SCENES = {
  abertura: Abertura,
  oQueE: OQueE,
  formInput: FormInput,
  label: LabelScene,
  porQue: PorQue,
  placeholder: Placeholder,
  email: Email,
  textarea: Textarea,
  button: ButtonScene,
  paginaAna: PaginaAna,
  erros: Erros,
}

const { Lesson, calculateMetadata } = makeLesson({ publicId: 'n1-a07', blocks: BLOCKS, scenes: SCENES })
export const AulaN1A07 = Lesson
export const calculateAulaN1A07Metadata = calculateMetadata
