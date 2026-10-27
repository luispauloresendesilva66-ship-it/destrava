import { describe, it, expect } from 'vitest'
import { canAccessLevel, canWatchLesson, canTakeExam, isLessonDone, certificateStatusOnPass } from './access.js'

describe('canAccessLevel', () => {
  it('level 1 always', () => expect(canAccessLevel({ plan: 'free', levelPosition: 1, passedLevelPositions: [] })).toBe(true))
  it('gold with previous passed', () => expect(canAccessLevel({ plan: 'gold', levelPosition: 2, passedLevelPositions: [1] })).toBe(true))
  it('gold without previous passed', () => expect(canAccessLevel({ plan: 'gold', levelPosition: 2, passedLevelPositions: [] })).toBe(false))
  it('free never beyond level 1', () => expect(canAccessLevel({ plan: 'free', levelPosition: 2, passedLevelPositions: [1] })).toBe(false))
})

describe('canWatchLesson', () => {
  it('sample ignores locks', () =>
    expect(canWatchLesson({ plan: 'free', levelPosition: 3, levelUnlocked: false, lesson: { position: 1, isSample: true }, previousLessonDone: false })).toBe(true))
  it('free non-free lesson', () =>
    expect(canWatchLesson({ plan: 'free', levelPosition: 1, levelUnlocked: true, lesson: { position: 2, isFree: false }, previousLessonDone: true })).toBe(false))
  it('free lesson needs previous done', () => {
    const base = { plan: 'free', levelPosition: 1, levelUnlocked: true, lesson: { position: 2, isFree: true } }
    expect(canWatchLesson({ ...base, previousLessonDone: false })).toBe(false)
    expect(canWatchLesson({ ...base, previousLessonDone: true })).toBe(true)
  })
  it('paid first lesson needs no previous', () =>
    expect(canWatchLesson({ plan: 'gold', levelPosition: 2, levelUnlocked: true, lesson: { position: 1 }, previousLessonDone: false })).toBe(true))
  it('paid locked level blocks', () =>
    expect(canWatchLesson({ plan: 'gold', levelPosition: 2, levelUnlocked: false, lesson: { position: 1 }, previousLessonDone: true })).toBe(false))
  it('sample valid for paid too', () =>
    expect(canWatchLesson({ plan: 'gold', levelPosition: 2, levelUnlocked: false, lesson: { position: 1, isSample: true }, previousLessonDone: false })).toBe(true))
})

describe('canTakeExam', () => {
  it('free level 1', () => expect(canTakeExam({ plan: 'free', levelPosition: 1, levelUnlocked: true })).toBe(true))
  it('free level 2', () => expect(canTakeExam({ plan: 'free', levelPosition: 2, levelUnlocked: true })).toBe(false))
  it('gold level 2 unlocked', () => expect(canTakeExam({ plan: 'gold', levelPosition: 2, levelUnlocked: true })).toBe(true))
  it('gold level locked', () => expect(canTakeExam({ plan: 'gold', levelPosition: 2, levelUnlocked: false })).toBe(false))
})

describe('isLessonDone', () => {
  it('no exercises', () => expect(isLessonDone({ exerciseIds: [], correctExerciseIds: new Set() })).toBe(true))
  it('missing one', () => expect(isLessonDone({ exerciseIds: ['a', 'b'], correctExerciseIds: new Set(['a']) })).toBe(false))
  it('all correct', () => expect(isLessonDone({ exerciseIds: ['a', 'b'], correctExerciseIds: new Set(['a', 'b']) })).toBe(true))
})

describe('certificateStatusOnPass', () => {
  it('free locked', () => expect(certificateStatusOnPass('free')).toBe('locked'))
  it('gold active', () => expect(certificateStatusOnPass('gold')).toBe('active'))
})
