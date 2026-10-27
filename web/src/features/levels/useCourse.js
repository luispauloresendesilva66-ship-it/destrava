import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useSession } from '../auth/useSession.js'
import { canAccessLevel, canWatchLesson, canTakeExam, isLessonDone } from '@domain/access.js'
import { livesRemaining, currentStreakDays, xpFor, startOfDaySaoPaulo } from '@domain/lives.js'

export const LOAD_ERROR = 'Não foi possível carregar o curso. Tente de novo.'

// Puro: monta o estado do curso (níveis, trancas e aulas) a partir dos dados lidos.
export function buildCourseState({
  plan,
  levels,
  lessons,
  exercises,
  correctExerciseIds,
  passedLevelPositions,
}) {
  const exercisesByLesson = new Map()
  for (const ex of exercises) {
    if (!exercisesByLesson.has(ex.lesson_id)) exercisesByLesson.set(ex.lesson_id, [])
    exercisesByLesson.get(ex.lesson_id).push(ex.id)
  }
  const doneOf = (lesson) =>
    isLessonDone({ exerciseIds: exercisesByLesson.get(lesson.id) ?? [], correctExerciseIds })

  return [...levels]
    .sort((a, b) => a.position - b.position)
    .map((level) => {
      const unlocked = canAccessLevel({
        plan,
        levelPosition: level.position,
        passedLevelPositions,
      })
      const examAvailable = canTakeExam({
        plan,
        levelPosition: level.position,
        levelUnlocked: unlocked,
      })
      const levelLessons = lessons
        .filter((l) => l.level_id === level.id)
        .sort((a, b) => a.position - b.position)

      return {
        level,
        unlocked,
        examAvailable,
        passed: passedLevelPositions.includes(level.position),
        lessons: levelLessons.map((lesson, index) => {
          // Free: "anterior" é a aula free anterior (pula as pagas). Pago: a aula anterior.
          const candidates = levelLessons.slice(0, index)
          const previous =
            plan === 'free' ? candidates.filter((l) => l.is_free).pop() : candidates.pop()
          const previousLessonDone = previous ? doneOf(previous) : true
          return {
            lesson,
            done: doneOf(lesson),
            watchable: canWatchLesson({
              plan,
              levelPosition: level.position,
              levelUnlocked: unlocked,
              lesson: {
                position: lesson.position,
                isFree: lesson.is_free,
                isSample: lesson.is_sample,
              },
              previousLessonDone,
            }),
          }
        }),
      }
    })
}

async function fetchAll() {
  const results = await Promise.all([
    supabase.from('levels').select('id, position, slug, name, description').order('position'),
    supabase
      .from('lessons')
      .select('id, level_id, position, title, duration_seconds, is_free, is_sample')
      .order('position'),
    supabase.from('exercises').select('id, lesson_id, position, type, topic'),
    supabase.from('exercise_attempts').select('exercise_id, correct, created_at'),
    supabase.from('exam_attempts').select('level_id, passed, submitted_at'),
  ])
  const failed = results.find((r) => r.error)
  if (failed) throw failed.error
  const [levels, lessons, exercises, attempts, exams] = results.map((r) => r.data ?? [])
  return { levels, lessons, exercises, attempts, exams }
}

export function useCourse() {
  const { profile } = useSession()
  const plan = profile?.plan ?? 'free'
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await fetchAll())
    } catch {
      setError(LOAD_ERROR)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const computed = useMemo(() => {
    if (!data) return { state: null, stats: null }
    const correctExerciseIds = new Set(
      data.attempts.filter((a) => a.correct).map((a) => a.exercise_id),
    )
    const positionById = new Map(data.levels.map((l) => [l.id, l.position]))
    const passedLevelPositions = [
      ...new Set(data.exams.filter((e) => e.passed).map((e) => positionById.get(e.level_id))),
    ].filter((p) => p !== undefined)

    const state = buildCourseState({
      plan,
      levels: data.levels,
      lessons: data.lessons,
      exercises: data.exercises,
      correctExerciseIds,
      passedLevelPositions,
    })

    const now = new Date()
    const startOfToday = startOfDaySaoPaulo(now)
    const errorsToday = data.attempts.filter(
      (a) => !a.correct && new Date(a.created_at) >= startOfToday,
    ).length

    let nextLesson = null
    for (const step of state) {
      nextLesson = step.lessons.find((l) => l.watchable && !l.done)?.lesson ?? null
      if (nextLesson) break
    }

    return {
      state,
      stats: {
        lives: plan === 'free' ? livesRemaining({ plan, errorsToday }) : null,
        streakDays: currentStreakDays({
          activityDates: data.attempts.map((a) => new Date(a.created_at)),
          now,
        }),
        xp: xpFor({
          correctExercises: correctExerciseIds.size,
          passedExams: passedLevelPositions.length,
        }),
        nextLesson,
      },
    }
  }, [data, plan])

  return { state: computed.state, stats: computed.stats, plan, loading, error, refresh }
}
