import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { checkAnswer } from './checkAnswer.js'
import { useLives, LIVES_OUT_MESSAGE } from './useLives.js'
import MultipleChoice from './MultipleChoice.jsx'
import FillBlank from './FillBlank.jsx'
import OrderBlocks from './OrderBlocks.jsx'
import CodeExercise from './CodeExercise.jsx'
import './exercises.css'

const LOAD_ERROR = 'Não foi possível carregar os exercícios. Tente de novo.'
const TYPES = {
  multiple_choice: MultipleChoice,
  fill_blank: FillBlank,
  order_blocks: OrderBlocks,
  code: CodeExercise,
}

async function loadExercises(lessonId) {
  const { data, error } = await supabase
    .from('exercises')
    .select('id, position, type, topic, prompt, solution, explanation')
    .eq('lesson_id', lessonId)
    .order('position')
  if (error) throw error
  const list = data ?? []
  if (list.length === 0) return { list, correctIds: [] }
  const res = await supabase
    .from('exercise_attempts')
    .select('exercise_id')
    .eq('correct', true)
    .in('exercise_id', list.map((e) => e.id))
  if (res.error) throw res.error
  return { list, correctIds: (res.data ?? []).map((r) => r.exercise_id) }
}

// Exercícios da aula, um de cada vez. onProgress() avisa a página quando há acerto novo.
export default function ExerciseRunner({ lessonId, onProgress }) {
  const { remaining, spend } = useLives()
  const [exercises, setExercises] = useState(null)
  const [done, setDone] = useState(() => new Set())
  const [index, setIndex] = useState(0)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setExercises(null)
    setError(null)
    loadExercises(lessonId)
      .then(({ list, correctIds }) => {
        if (cancelled) return
        const doneSet = new Set(correctIds)
        setDone(doneSet)
        setIndex(Math.max(0, list.findIndex((e) => !doneSet.has(e.id))))
        setExercises(list)
      })
      .catch(() => {
        if (!cancelled) setError(LOAD_ERROR)
      })
    return () => {
      cancelled = true
    }
  }, [lessonId, attempt])

  const submit = useCallback(
    async (exercise, answer) => {
      const result = await checkAnswer(exercise, answer)
      const { error: err } = await supabase
        .from('exercise_attempts')
        .insert({ exercise_id: exercise.id, correct: result.correct })
      if (err) throw err
      if (result.correct) {
        setDone((d) => new Set(d).add(exercise.id))
        onProgress?.()
      } else {
        spend()
      }
      return result
    },
    [spend, onProgress],
  )

  if (error) {
    return (
      <div className="course-error" role="alert">
        <p>{error}</p>
        <button type="button" className="course-button" onClick={() => setAttempt((n) => n + 1)}>
          Tentar de novo
        </button>
      </div>
    )
  }
  if (!exercises || exercises.length === 0 || remaining === null) return null

  const allDone = exercises.every((e) => done.has(e.id))
  const last = index >= exercises.length - 1
  const exercise = exercises[Math.min(index, exercises.length - 1)]
  const Component = TYPES[exercise.type]
  const outOfLives = remaining === 0

  return (
    <section className="exercises" aria-label="Exercícios">
      <h2>Exercícios</h2>
      <p className="ex__progress">
        Exercício {Math.min(index + 1, exercises.length)} de {exercises.length}
        {Number.isFinite(remaining) && <span> · Vidas: {remaining}</span>}
      </p>
      {Component ? (
        <Component
          key={exercise.id}
          exercise={exercise}
          locked={outOfLives}
          onSubmit={(answer) => submit(exercise, answer)}
          onContinue={last ? undefined : () => setIndex((i) => i + 1)}
        />
      ) : (
        <p role="alert">Tipo de exercício desconhecido.</p>
      )}
      {outOfLives && (
        <p className="course-error" role="alert">
          {LIVES_OUT_MESSAGE}
        </p>
      )}
      {allDone && <p className="ex__done">Você concluiu os exercícios desta aula!</p>}
    </section>
  )
}
