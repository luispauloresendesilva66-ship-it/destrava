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
      <p className="loading" role="status">
        Carregando...
      </p>
    )
  }

  if (error) {
    return (
      <div className="page">
        <div className="alert alert--danger" role="alert">
          <p>{error}</p>
          <button type="button" className="btn btn--primary" onClick={refresh}>
            Tentar de novo
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="page">
      <h1>Mapa de níveis</h1>
      <ol className="level-list">
        {state.map((step, index) => {
          const { level, unlocked, passed, examAvailable, lessons } = step
          const cls = [
            'level-step',
            !unlocked && 'level-step--locked',
            passed && 'level-step--passed',
          ]
            .filter(Boolean)
            .join(' ')
          const onHeadClick = () => {
            setNoticeFor(!unlocked && plan === 'free' ? level.id : null)
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
                {passed && <span className="badge badge--success passed-tag">Aprovado</span>}
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
                      <Link to={`/aula/${lesson.id}`} className={done ? 'is-done' : undefined}>
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
              {examAvailable && !passed && (
                <Link className="btn btn--primary level-step__exam" to={`/prova/${level.id}`}>
                  Fazer a prova
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
