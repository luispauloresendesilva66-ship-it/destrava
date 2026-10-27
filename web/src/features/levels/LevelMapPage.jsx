import { useState } from 'react'
import { Link } from 'react-router-dom'
import LockBadge from '../../components/LockBadge.jsx'
import { useCourse } from './useCourse.js'
import './levels.css'

export default function LevelMapPage() {
  const { state, plan, loading, error, refresh } = useCourse()
  const [noticeFor, setNoticeFor] = useState(null)

  if (loading) {
    return (
      <p className="course-page" role="status">
        Carregando...
      </p>
    )
  }

  if (error) {
    return (
      <div className="course-page">
        <div className="course-error" role="alert">
          <p>{error}</p>
          <button type="button" className="course-button" onClick={refresh}>
            Tentar de novo
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="course-page">
      <h1>Mapa de níveis</h1>
      <ol className="level-list">
        {state.map((step, index) => {
          const { level, unlocked, passed, lessons } = step
          const cls = [
            'level-step',
            !unlocked && 'level-step--locked',
            passed && 'level-step--passed',
          ]
            .filter(Boolean)
            .join(' ')
          const onHeadClick = () => {
            if (!unlocked && plan === 'free') setNoticeFor(level.id)
          }
          return (
            <li key={level.id} className={cls}>
              <button
                type="button"
                className="level-step__head"
                aria-label={`Degrau ${index + 1}: ${level.name}${unlocked ? '' : ', bloqueado'}${passed ? ', aprovado' : ''}`}
                onClick={onHeadClick}
              >
                <span className="level-step__num" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="level-step__name">{level.name}</span>
                {!unlocked && <LockBadge />}
                {passed && <span className="passed-tag">Aprovado</span>}
              </button>
              {noticeFor === level.id && !unlocked && (
                <p className="level-notice" role="status">
                  Disponível no plano Gold
                </p>
              )}
              <ul className="lesson-list">
                {lessons.map(({ lesson, done, watchable }) => (
                  <li key={lesson.id}>
                    {watchable ? (
                      <Link to={`/aula/${lesson.id}`}>
                        {lesson.title}
                        {done ? ' (concluída)' : ''}
                      </Link>
                    ) : (
                      <span className="lesson-off">
                        <LockBadge />
                        {lesson.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
