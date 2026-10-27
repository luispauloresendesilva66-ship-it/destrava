import { assertPlan } from './plans.js'

export const MAX_LIVES = 5

// America/Sao_Paulo is treated as a fixed UTC-3 offset (no DST).
const OFFSET_MS = 3 * 3_600_000
const DAY_MS = 86_400_000

function saoPauloDayIndex(date) {
  return Math.floor((date.getTime() - OFFSET_MS) / DAY_MS)
}

export function startOfDaySaoPaulo(now) {
  return new Date(saoPauloDayIndex(now) * DAY_MS + OFFSET_MS)
}

export function nextLivesResetAt(now) {
  return new Date(startOfDaySaoPaulo(now).getTime() + DAY_MS)
}

export function livesRemaining({ plan, errorsToday }) {
  if (assertPlan(plan) !== 'free') return Infinity
  return Math.max(0, MAX_LIVES - errorsToday)
}

export function currentStreakDays({ activityDates, now }) {
  const days = new Set(activityDates.map(saoPauloDayIndex))
  const today = saoPauloDayIndex(now)
  let day = days.has(today) ? today : today - 1
  let streak = 0
  while (days.has(day)) {
    streak += 1
    day -= 1
  }
  return streak
}

export function xpFor({ correctExercises, passedExams }) {
  return correctExercises * 10 + passedExams * 100
}
