import { describe, it, expect } from 'vitest'
import {
  MAX_LIVES,
  startOfDaySaoPaulo,
  nextLivesResetAt,
  livesRemaining,
  currentStreakDays,
  xpFor,
} from './lives.js'

const d = (s) => new Date(s)

describe('MAX_LIVES', () => {
  it('is 5', () => expect(MAX_LIVES).toBe(5))
})

describe('startOfDaySaoPaulo', () => {
  it('uses the previous local day before 03:00Z', () => {
    expect(startOfDaySaoPaulo(d('2026-10-27T02:30:00Z')).toISOString()).toBe('2026-10-26T03:00:00.000Z')
  })
  it('returns the same instant at local midnight', () => {
    expect(startOfDaySaoPaulo(d('2026-10-27T03:00:00Z')).toISOString()).toBe('2026-10-27T03:00:00.000Z')
  })
})

describe('nextLivesResetAt', () => {
  it('is the next local midnight', () => {
    expect(nextLivesResetAt(d('2026-10-27T15:00:00Z')).toISOString()).toBe('2026-10-28T03:00:00.000Z')
  })
})

describe('livesRemaining', () => {
  it('free plan subtracts errors', () => expect(livesRemaining({ plan: 'free', errorsToday: 2 })).toBe(3))
  it('never negative', () => expect(livesRemaining({ plan: 'free', errorsToday: 7 })).toBe(0))
  it('paid plans are unlimited', () => {
    expect(livesRemaining({ plan: 'gold', errorsToday: 9 })).toBe(Infinity)
    expect(livesRemaining({ plan: 'platinum', errorsToday: 0 })).toBe(Infinity)
  })
  it('throws on unknown plan', () => {
    expect(() => livesRemaining({ plan: 'x', errorsToday: 0 })).toThrow()
  })
})

describe('currentStreakDays', () => {
  const now = d('2026-10-27T15:00:00Z')
  it('counts 3 consecutive days including today', () => {
    const activityDates = [d('2026-10-25T15:00:00Z'), d('2026-10-26T15:00:00Z'), d('2026-10-27T12:00:00Z')]
    expect(currentStreakDays({ activityDates, now })).toBe(3)
  })
  it('does not break when today has no activity yet', () => {
    const activityDates = [d('2026-10-25T15:00:00Z'), d('2026-10-26T15:00:00Z')]
    expect(currentStreakDays({ activityDates, now })).toBe(2)
  })
  it('breaks on a gap', () => {
    const activityDates = [d('2026-10-24T15:00:00Z'), d('2026-10-26T15:00:00Z')]
    expect(currentStreakDays({ activityDates, now })).toBe(1)
  })
  it('is 0 without activity or when last activity is older than yesterday', () => {
    expect(currentStreakDays({ activityDates: [], now })).toBe(0)
    expect(currentStreakDays({ activityDates: [d('2026-10-24T15:00:00Z')], now })).toBe(0)
  })
  it('uses the Sao Paulo day, not UTC', () => {
    // 02:00Z on 27th is still the 26th in SP
    const activityDates = [d('2026-10-27T02:00:00Z'), d('2026-10-25T15:00:00Z')]
    expect(currentStreakDays({ activityDates, now: d('2026-10-27T02:30:00Z') })).toBe(2)
  })
  it('ignores duplicates on the same day', () => {
    const activityDates = [d('2026-10-27T10:00:00Z'), d('2026-10-27T14:00:00Z')]
    expect(currentStreakDays({ activityDates, now })).toBe(1)
  })
})

describe('xpFor', () => {
  it('10 per exercise + 100 per exam', () => expect(xpFor({ correctExercises: 7, passedExams: 1 })).toBe(170))
})
