import { describe, it, expect, vi } from 'vitest'

vi.mock('../../lib/supabase', () => ({ supabase: {} }))

import { computeStats } from './useCourse.js'

const at = (iso) => ({ exercise_id: 'e', correct: true, created_at: iso })

describe('computeStats', () => {
  const now = new Date('2026-10-27T15:00:00Z')

  it('02:59Z e 03:00Z do mesmo dia UTC caem em dias diferentes em São Paulo', () => {
    // 02:59Z = 23:59 do dia 25 em SP; 03:00Z = 00:00 do dia 26 em SP.
    const two = computeStats({
      plan: 'gold',
      errorsToday: 0,
      passedExams: 0,
      now: new Date('2026-10-26T12:00:00Z'),
      attempts: [at('2026-10-26T02:59:00Z'), at('2026-10-26T03:00:00Z')],
    })
    expect(two.streakDays).toBe(2)
    const one = computeStats({
      plan: 'gold',
      errorsToday: 0,
      passedExams: 0,
      now: new Date('2026-10-26T12:00:00Z'),
      attempts: [at('2026-10-26T03:00:00Z'), at('2026-10-26T20:00:00Z')],
    })
    expect(one.streakDays).toBe(1)
  })

  it('vidas: free desconta erros de hoje, pago não tem limite', () => {
    const base = { errorsToday: 2, attempts: [], passedExams: 0, now }
    expect(computeStats({ ...base, plan: 'free' }).livesRemaining).toBe(3)
    expect(computeStats({ ...base, errorsToday: 9, plan: 'free' }).livesRemaining).toBe(0)
    expect(computeStats({ ...base, plan: 'gold' }).livesRemaining).toBe(null)
  })

  it('XP conta exercícios corretos distintos e provas aprovadas', () => {
    const attempts = [
      { exercise_id: 'a', correct: true, created_at: '2026-10-27T10:00:00Z' },
      { exercise_id: 'a', correct: true, created_at: '2026-10-27T11:00:00Z' },
      { exercise_id: 'b', correct: true, created_at: '2026-10-27T11:00:00Z' },
      { exercise_id: 'c', correct: false, created_at: '2026-10-27T11:00:00Z' },
    ]
    const stats = computeStats({ plan: 'gold', errorsToday: 0, attempts, passedExams: 1, now })
    expect(stats.xp).toBe(2 * 10 + 100)
  })
})
