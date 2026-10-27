import { describe, it, expect } from 'vitest'
import { createRepo } from './supabase-repo.js'

// Fake mínimo do query builder do supabase-js, sobre tabelas em memória.
function fakeDb(tables) {
  return {
    from(name) {
      let rows = [...tables[name]]
      let limit = null
      const q = {
        select: () => q,
        eq: (col, val) => ((rows = rows.filter((r) => r[col] === val)), q),
        lt: (col, val) => ((rows = rows.filter((r) => r[col] < val)), q),
        in: (col, vals) => ((rows = rows.filter((r) => vals.includes(r[col]))), q),
        order: (col, { ascending }) => (
          rows.sort((a, b) => (ascending ? a[col] - b[col] : b[col] - a[col])),
          q
        ),
        limit: (n) => ((limit = n), q),
        then: (resolve) => resolve({ data: limit ? rows.slice(0, limit) : rows, error: null }),
      }
      return q
    },
  }
}

const lessons = [
  { id: 'a', level_id: 'L1', position: 1, is_free: true },
  { id: 'b', level_id: 'L1', position: 2, is_free: false },
  { id: 'c', level_id: 'L1', position: 3, is_free: true },
  { id: 'z', level_id: 'L2', position: 1, is_free: true },
]
const exercises = [
  { id: 'ea', lesson_id: 'a' },
  { id: 'eb', lesson_id: 'b' },
]
const lessonC = { id: 'c', levelId: 'L1', position: 3 }

function repoWith(correct) {
  return createRepo(
    fakeDb({
      lessons,
      exercises,
      exercise_attempts: correct.map((exercise_id) => ({
        user_id: 'u1',
        exercise_id,
        correct: true,
      })),
    }),
  )
}

describe('isPreviousLessonDone', () => {
  it('free user skips a paid lesson in the middle (previous is "a", not "b")', async () => {
    expect(await repoWith(['ea']).isPreviousLessonDone('u1', lessonC, 'free')).toBe(true)
    expect(await repoWith(['eb']).isPreviousLessonDone('u1', lessonC, 'free')).toBe(false)
  })

  it('no previous lesson gives true', async () => {
    const first = { id: 'a', levelId: 'L1', position: 1 }
    expect(await repoWith([]).isPreviousLessonDone('u1', first, 'gold')).toBe(true)
    const levelTwoFirst = { id: 'z', levelId: 'L2', position: 1 }
    expect(await repoWith([]).isPreviousLessonDone('u1', levelTwoFirst, 'free')).toBe(true)
  })

  it('paid user uses the immediate previous lesson', async () => {
    expect(await repoWith(['eb']).isPreviousLessonDone('u1', lessonC, 'gold')).toBe(true)
    expect(await repoWith(['ea']).isPreviousLessonDone('u1', lessonC, 'gold')).toBe(false)
  })
})
