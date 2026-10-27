import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { formatRetry } from './formatRetry.js'
import { LOCKED_CERTIFICATE_MESSAGE } from '../certificates/messages.js'
import './exams.css'

// Aulas do nível que ensinam os assuntos errados: { [topic]: [{ id, title }] }.
async function loadReviewLessons(levelId, topics) {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('topic, lessons!inner(id, title, level_id)')
      .in('topic', topics)
      .eq('lessons.level_id', levelId)
    if (error) return {}
    const byTopic = {}
    for (const row of data ?? []) {
      const list = (byTopic[row.topic] ??= [])
      if (!list.some((l) => l.id === row.lessons.id)) {
        list.push({ id: row.lessons.id, title: row.lessons.title })
      }
    }
    return byTopic
  } catch {
    return {}
  }
}

// Confete decorativo (formas paradas que flutuam de leve; parado com movimento reduzido).
function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className={`confetti__piece confetti__piece--${i + 1}`} />
      ))}
    </div>
  )
}

export default function ExamResultPage() {
  const { levelId } = useParams()
  const result = useLocation().state?.result
  const wrongTopics = result?.wrongTopics ?? []
  const [lessons, setLessons] = useState({})

  useEffect(() => {
    if (!result || result.passed || wrongTopics.length === 0) return undefined
    let active = true
    loadReviewLessons(levelId, wrongTopics).then((found) => {
      if (active) setLessons(found)
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId, result])

  if (!result) {
    return (
      <section className="page page--narrow exam-page exam-result">
        <p>Não encontramos o resultado desta prova.</p>
        <Link className="btn btn--primary" to="/niveis">
          Voltar ao mapa de níveis
        </Link>
      </section>
    )
  }

  if (result.passed) {
    return (
      <section className="page page--narrow exam-page exam-result exam-result--passed">
        <Confetti />
        <h1>Parabéns, você foi aprovado!</h1>
        <p className="exam__score exam__score--passed">{result.percent}%</p>
        {result.certificate && (
          <>
            {result.certificate.status === 'locked' && (
              <p>{LOCKED_CERTIFICATE_MESSAGE}</p>
            )}
            <Link className="btn btn--primary" to="/certificados">
              Ver meu certificado
            </Link>
          </>
        )}
      </section>
    )
  }

  return (
    <section className="page page--narrow exam-page exam-result exam-result--failed">
      <h1>Você ainda não passou desta vez</h1>
      <p className="exam__score">{result.percent}%</p>
      <p>É preciso acertar pelo menos 90% para passar.</p>
      {wrongTopics.length > 0 && (
        <>
          <h2>Assuntos para revisar</h2>
          <ul className="exam__topics">
            {wrongTopics.map((topic) => (
              <li key={topic}>
                {topic}
                {(lessons[topic] ?? []).map((lesson) => (
                  <span key={lesson.id}>
                    {' — '}
                    <Link to={`/aula/${lesson.id}`}>{lesson.title}</Link>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
      <p role="status">
        {result.nextAttemptAt ? formatRetry(result.nextAttemptAt) : 'Você já pode tentar de novo.'}
      </p>
      <Link className="btn btn--secondary" to="/niveis">
        Voltar ao mapa de níveis
      </Link>
    </section>
  )
}
