import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { startExam, submitExam } from '../../lib/api.js'
import { useSession } from '../auth/useSession.js'
import { formatRetry } from './formatRetry.js'
import './exams.css'

const NAME_WARNING = 'Este nome vai no seu certificado e não poderá ser alterado depois.'
const NAME_ERROR = 'Não foi possível salvar seu nome. Tente de novo.'
const FILE_LABELS = { html: 'HTML', css: 'CSS', js: 'JS' }

function startMessage(err) {
  return err.code === 'COOLDOWN' && err.retryAt ? formatRetry(err.retryAt) : err.message
}

function QuestionBody({ question, value, onChange }) {
  if (question.type === 'multiple_choice') {
    const { question: text, options } = question.prompt
    return (
      <div role="radiogroup" aria-label={text} className="ex__options">
        {options.map((option, i) => (
          <label key={i} className={`ex__option${value === i ? ' ex__option--on' : ''}`}>
            <input
              type="radio"
              name={`q-${question.id}`}
              checked={value === i}
              onChange={() => onChange(i)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    )
  }
  const { starter } = question.prompt
  const files = Object.keys(FILE_LABELS).filter((k) => k in (starter ?? {}))
  const keys = files.length ? files : ['html']
  const current = { html: starter?.html ?? '', css: starter?.css ?? '', js: starter?.js ?? '', ...value }
  return (
    <div className="exam__files">
      {keys.map((key) => (
        <label key={key} className="exam__file">
          <span>{FILE_LABELS[key]}</span>
          <textarea
            className="textarea"
            rows={8}
            spellCheck={false}
            value={current[key]}
            onChange={(e) => onChange({ ...current, [key]: e.target.value })}
          />
        </label>
      ))}
    </div>
  )
}

export default function ExamPage() {
  const { levelId } = useParams()
  const { profile } = useSession()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [exam, setExam] = useState(null) // { attemptId, questions }
  const [answers, setAnswers] = useState({})
  const [index, setIndex] = useState(0)
  const [busy, setBusy] = useState(false)
  const [problem, setProblem] = useState(null)
  const [blocked, setBlocked] = useState(null)

  async function begin(event) {
    event.preventDefault()
    setBusy(true)
    setProblem(null)
    try {
      const { error } = await supabase.rpc('update_my_name', { new_name: fullName })
      if (error) {
        setProblem(error.message || NAME_ERROR)
        return
      }
    } catch {
      setProblem(NAME_ERROR)
      return
    } finally {
      setBusy(false)
    }
    setBusy(true)
    try {
      setExam(await startExam(levelId))
    } catch (err) {
      if (err.code === 'NAME_REQUIRED') setProblem(err.message)
      else setBlocked(startMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function send() {
    setBusy(true)
    setProblem(null)
    try {
      const result = await submitExam(exam.attemptId, answers)
      navigate(`/prova/${levelId}/resultado`, { state: { result }, replace: true })
    } catch (err) {
      setProblem(err.message)
      setBusy(false)
    }
  }

  if (blocked) {
    return (
      <section className="page page--narrow exam-page">
        <p className="alert alert--danger" role="alert">
          {blocked}
        </p>
        <Link className="btn btn--secondary" to="/niveis">
          Voltar ao mapa de níveis
        </Link>
      </section>
    )
  }

  if (!exam) {
    return (
      <section className="page page--narrow exam-page">
        <h1>Prova do nível</h1>
        <form onSubmit={begin} className="card exam__name">
          <label>
            Nome completo
            <input
              className="input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
              minLength={3}
            />
          </label>
          <p className="alert exam__warning">{NAME_WARNING}</p>
          {problem && (
            <p className="alert alert--danger" role="alert">
              {problem}
            </p>
          )}
          <button type="submit" className="btn btn--primary" disabled={busy || fullName.trim().length < 3}>
            {busy ? 'Carregando...' : 'Começar prova'}
          </button>
        </form>
      </section>
    )
  }

  const total = exam.questions.length
  const question = exam.questions[index]
  const last = index === total - 1
  const answered = question.type === 'code' || typeof answers[question.id] === 'number'
  const title = question.type === 'multiple_choice' ? question.prompt.question : question.prompt.statement

  return (
    <section className="page page--narrow exam-page">
      <p className="ex__progress">
        Pergunta {index + 1} de {total}
      </p>
      <div
        className="progress exam__bar"
        role="progressbar"
        aria-label="Progresso da prova"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index + 1}
      >
        <div className="progress__fill exam__bar-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <div className="card exam__question">
        <h2 className="ex__title">{title}</h2>
        <QuestionBody
          key={question.id}
          question={question}
          value={answers[question.id]}
          onChange={(value) => setAnswers((a) => ({ ...a, [question.id]: value }))}
        />
      </div>
      {problem && (
        <p className="alert alert--danger" role="alert">
          {problem}
        </p>
      )}
      <div className="ex__footer">
        {last ? (
          <button type="button" className="btn btn--primary" disabled={busy || !answered} onClick={send}>
            {busy ? 'Enviando...' : 'Enviar prova'}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            disabled={!answered}
            onClick={() => setIndex(index + 1)}
          >
            Próxima
          </button>
        )}
      </div>
    </section>
  )
}
