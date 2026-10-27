import { describe, it, expect, vi } from 'vitest'

vi.mock('../../lib/supabase', () => ({ supabase: {} }))

import { buildCourseState } from './useCourse.js'

const levels = [1, 2, 3, 4, 5].map((p) => ({ id: `L${p}`, position: p, name: `Nível ${p}` }))

const lessons = [
  { id: 'a1', level_id: 'L1', position: 1, title: 'A1', is_free: true, is_sample: false },
  { id: 'a2', level_id: 'L1', position: 2, title: 'A2', is_free: false, is_sample: false },
  { id: 'a3', level_id: 'L1', position: 3, title: 'A3', is_free: true, is_sample: false },
  { id: 'b1', level_id: 'L2', position: 1, title: 'B1', is_free: false, is_sample: false },
  { id: 'b2', level_id: 'L2', position: 2, title: 'B2', is_free: false, is_sample: false },
  { id: 'c1', level_id: 'L3', position: 1, title: 'C1', is_free: false, is_sample: true },
  { id: 'c2', level_id: 'L3', position: 2, title: 'C2', is_free: false, is_sample: false },
]

const exercises = [
  { id: 'e-a1-1', lesson_id: 'a1' },
  { id: 'e-a1-2', lesson_id: 'a1' },
  { id: 'e-a2-1', lesson_id: 'a2' },
  { id: 'e-a3-1', lesson_id: 'a3' },
  { id: 'e-b1-1', lesson_id: 'b1' },
]

function build(over) {
  return buildCourseState({
    plan: 'gold',
    levels,
    lessons,
    exercises,
    correctExerciseIds: new Set(),
    passedLevelPositions: [],
    ...over,
  })
}

const find = (state, levelPos, lessonId) =>
  state[levelPos - 1].lessons.find((l) => l.lesson.id === lessonId)

describe('buildCourseState', () => {
  it('gold sem nada aprovado: nível 1 liberado, nível 2 trancado, só a aula 1 assistível', () => {
    const s = build()
    expect(s).toHaveLength(5)
    expect(s[0].unlocked).toBe(true)
    expect(s[1].unlocked).toBe(false)
    expect(find(s, 1, 'a1').watchable).toBe(true)
    expect(find(s, 1, 'a2').watchable).toBe(false)
  })

  it('gold com exercícios da aula 1 corretos: aula 2 assistível', () => {
    const s = build({ correctExerciseIds: new Set(['e-a1-1', 'e-a1-2']) })
    expect(find(s, 1, 'a1').done).toBe(true)
    expect(find(s, 1, 'a2').watchable).toBe(true)
  })

  it('gold: aula 2 do nível 2 continua trancada até a aula 1 estar feita', () => {
    const base = { passedLevelPositions: [1] }
    const s1 = build(base)
    expect(s1[1].unlocked).toBe(true)
    expect(find(s1, 2, 'b1').watchable).toBe(true)
    expect(find(s1, 2, 'b2').watchable).toBe(false)
    const s2 = build({ ...base, correctExerciseIds: new Set(['e-b1-1']) })
    expect(find(s2, 2, 'b2').watchable).toBe(true)
  })

  it('free: aula de amostra do nível 3 é assistível e o nível 3 segue trancado', () => {
    const s = build({ plan: 'free' })
    expect(s[2].unlocked).toBe(false)
    expect(find(s, 3, 'c1').watchable).toBe(true)
    expect(find(s, 3, 'c2').watchable).toBe(false)
  })

  it('free: "anterior" considera só aulas free, pulando a paga do meio', () => {
    const before = build({ plan: 'free' })
    expect(find(before, 1, 'a3').watchable).toBe(false)
    const after = build({ plan: 'free', correctExerciseIds: new Set(['e-a1-1', 'e-a1-2']) })
    expect(find(after, 1, 'a3').watchable).toBe(true)
    expect(find(after, 1, 'a2').watchable).toBe(false)
  })

  it('examAvailable segue canTakeExam', () => {
    expect(build({ plan: 'free' }).map((l) => l.examAvailable)).toEqual([true, false, false, false, false])
    expect(build({ passedLevelPositions: [1] }).map((l) => l.examAvailable)).toEqual([true, true, false, false, false])
  })
})
