import { assertPlan, includesCertificate } from './plans.js'

export function canAccessLevel({ plan, levelPosition, passedLevelPositions }) {
  assertPlan(plan)
  if (levelPosition === 1) return true
  if (plan === 'free') return false
  return passedLevelPositions.includes(levelPosition - 1)
}

export function canWatchLesson({ plan, levelPosition, levelUnlocked, lesson, previousLessonDone }) {
  assertPlan(plan)
  if (lesson.isSample) return true
  if (plan === 'free') {
    return levelPosition === 1 && Boolean(lesson.isFree) && Boolean(previousLessonDone)
  }
  return Boolean(levelUnlocked) && (lesson.position === 1 || Boolean(previousLessonDone))
}

export function canTakeExam({ plan, levelPosition, levelUnlocked }) {
  assertPlan(plan)
  if (plan === 'free') return levelPosition === 1
  return Boolean(levelUnlocked)
}

export function isLessonDone({ exerciseIds, correctExerciseIds }) {
  return exerciseIds.every((id) => correctExerciseIds.has(id))
}

export function certificateStatusOnPass(plan) {
  return includesCertificate(plan) ? 'active' : 'locked'
}
