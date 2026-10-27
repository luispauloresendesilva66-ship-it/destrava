import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { getVideoUrl, VIDEO_ERROR } from '../../lib/api.js'
import { useCourse } from '../levels/useCourse.js'
import VideoPlayer from './VideoPlayer.jsx'
import './lessons.css'

async function loadStartAt(lessonId) {
  try {
    const { data } = await supabase
      .from('lesson_progress')
      .select('watched_seconds')
      .eq('lesson_id', lessonId)
      .maybeSingle()
    return data?.watched_seconds ?? 0
  } catch {
    return 0
  }
}

export default function LessonPage() {
  const { lessonId } = useParams()
  const { state } = useCourse()
  const [video, setVideo] = useState(null)
  const [problem, setProblem] = useState(null) // { message, forbidden }
  const [attempt, setAttempt] = useState(0)
  const lessonRef = useRef(lessonId)
  lessonRef.current = lessonId

  useEffect(() => {
    let cancelled = false
    setVideo(null)
    setProblem(null)
    Promise.all([getVideoUrl(lessonId), loadStartAt(lessonId)])
      .then(([data, startAt]) => {
        if (!cancelled) setVideo({ ...data, startAt })
      })
      .catch((err) => {
        if (cancelled) return
        setProblem({ message: err.message || VIDEO_ERROR, forbidden: err.status === 403 })
      })
    return () => {
      cancelled = true
    }
  }, [lessonId, attempt])

  const save = useCallback(async (seconds) => {
    try {
      await supabase.from('lesson_progress').upsert({
        lesson_id: lessonRef.current,
        watched_seconds: seconds,
        updated_at: new Date().toISOString(),
      })
    } catch {
      // progresso é best-effort; tenta de novo no próximo ciclo
    }
  }, [])

  const refreshUrl = useCallback(() => getVideoUrl(lessonRef.current), [])

  const step = state?.find((s) => s.lessons.some((l) => l.lesson.id === lessonId))
  const current = step?.lessons.find((l) => l.lesson.id === lessonId)?.lesson

  return (
    <section className="lesson-page">
      <h1>{current?.title ?? 'Aula'}</h1>
      {problem ? (
        <div className="course-error" role="alert">
          <p>{problem.message}</p>
          {problem.forbidden ? (
            <Link to="/niveis" className="course-link">
              Voltar aos níveis
            </Link>
          ) : (
            <button
              type="button"
              className="course-button"
              onClick={() => setAttempt((n) => n + 1)}
            >
              Tentar de novo
            </button>
          )}
        </div>
      ) : !video ? (
        <p role="status">Carregando...</p>
      ) : (
        <VideoPlayer
          key={`${lessonId}-${attempt}`}
          url={video.url}
          captionsUrl={video.captionsUrl}
          startAt={video.startAt}
          onSave={save}
          onExpired={refreshUrl}
        />
      )}
      {step && (
        <nav aria-label="Aulas do nível">
          <h2>{step.level.name}</h2>
          <ul className="lesson-list">
            {step.lessons.map(({ lesson, watchable }) => (
              <li key={lesson.id}>
                {watchable ? (
                  <Link
                    to={`/aula/${lesson.id}`}
                    aria-current={lesson.id === lessonId ? 'page' : undefined}
                  >
                    {lesson.title}
                  </Link>
                ) : (
                  <span className="lesson-off">{lesson.title}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  )
}
