import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { fetchAllRows } from '../../lib/fetchAllRows.js'
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

// Puro: números do painel. errorsToday vem de uma contagem exata feita no banco.
export function computeStats({ plan, errorsToday, attempts, passedExams, now }) {
  const correct = new Set(attempts.filter((a) => a.correct).map((a) => a.exercise_id))
  return {
    livesRemaining: plan === 'free' ? livesRemaining({ plan, errorsToday }) : null,
    streakDays: currentStreakDays({
      activityDates: attempts.map((a) => new Date(a.created_at)),
      now,
    }),
    xp: xpFor({ correctExercises: correct.size, passedExams }),
  }
}

async function fetchAll(now) {
  const startOfToday = startOfDaySaoPaulo(now).toISOString()
  const [levels, lessons, exercises, attempts, exams, errors] = await Promise.all([
    supabase.from('levels').select('id, position, slug, name, description').order('position'),
    supabase
      .from('lessons')
      .select('id, level_id, position, title, duration_seconds, is_free, is_sample')
      .order('position'),
    supabase.from('exercises').select('id, lesson_id, position, type, topic'),
    fetchAllRows((from, to) =>
      supabase
        .from('exercise_attempts')
        .select('id, exercise_id, correct, created_at')
        .order('id')
        .range(from, to),
    ),
    fetchAllRows((from, to) =>
      supabase
        .from('exam_attempts')
        .select('id, level_id, passed, submitted_at')
        .order('id')
        .range(from, to),
    ),
    supabase
      .from('exercise_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('correct', false)
      .gte('created_at', startOfToday),
  ])
  for (const r of [levels, lessons, exercises, errors]) if (r.error) throw r.error
  return {
    levels: levels.data ?? [],
    lessons: lessons.data ?? [],
    exercises: exercises.data ?? [],
    attempts,
    exams,
    errorsToday: errors.count ?? 0,
    now,
  }
}

export function useCourse() {
  const { profile } = useSession()
  const plan = profile?.plan
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const requestId = useRef(0)

  const refresh = useCallback(async () => {
    const id = ++requestId.current
    setLoading(true)
    setError(null)
    try {
      const result = await fetchAll(new Date())
      if (id === requestId.current) setData(result)
    } catch {
      if (id === requestId.current) setError(LOAD_ERROR)
    } finally {
      if (id === requestId.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    return () => {
      requestId.current += 1
    }
  }, [refresh])

  const computed = useMemo(() => {
    if (!data || !plan) return { state: null, stats: null }
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

    let nextLesson = null
    for (const step of state) {
      nextLesson = step.lessons.find((l) => l.watchable && !l.done)?.lesson ?? null
      if (nextLesson) break
    }

    const base = computeStats({
      plan,
      errorsToday: data.errorsToday,
      attempts: data.attempts,
      passedExams: passedLevelPositions.length,
      now: data.now,
    })
    return {
      state,
      stats: { lives: base.livesRemaining, streakDays: base.streakDays, xp: base.xp, nextLesson },
    }
  }, [data, plan])

  return {
    state: computed.state,
    stats: computed.stats,
    plan,
    loading: loading || (!plan && !error),
    error,
    refresh,
  }
}
