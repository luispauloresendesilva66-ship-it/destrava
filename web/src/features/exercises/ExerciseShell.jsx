import { useState } from 'react'

// Casca comum dos quatro tipos: enunciado, área de resposta, feedback e rodapé fixo
// (o botão fica colado no fim da tela, acima do teclado do celular).
export default function ExerciseShell({
  exercise,
  title,
  onSubmit,
  getAnswer,
  canConfirm,
  onReset,
  locked = false,
  onContinue,
  confirmLabel = 'Confirmar',
  extraActions = null,
  children,
}) {
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState(null)

  async function confirm() {
    setBusy(true)
    setFailure(null)
    try {
      setResult(await onSubmit(getAnswer()))
    } catch {
      setFailure('Não foi possível registrar sua resposta. Tente de novo.')
    } finally {
      setBusy(false)
    }
  }

  function retry() {
    setResult(null)
    setFailure(null)
    onReset?.()
  }

  const frozen = busy || locked || result !== null
  return (
    <div className="ex">
      <h3 className="ex__title">{title}</h3>
      <fieldset className="ex__body" disabled={frozen}>
        {children}
      </fieldset>
      {failure && (
        <p className="ex__feedback ex__feedback--wrong" role="alert">
          {failure}
        </p>
      )}
      {result && (
        <div
          className={`ex__feedback ${result.correct ? 'ex__feedback--ok' : 'ex__feedback--wrong'}`}
          role="status"
        >
          <strong>{result.correct ? 'Correto!' : 'Quase!'}</strong>
          {result.messages?.length > 0 && (
            <ul>
              {result.messages.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          )}
          {exercise.explanation && <p>{exercise.explanation}</p>}
        </div>
      )}
      <div className="ex__footer">
        {!result && extraActions}
        {!result && (
          <button
            type="button"
            className="course-button ex__confirm"
            disabled={!canConfirm || frozen}
            onClick={confirm}
          >
            {busy ? 'Conferindo...' : confirmLabel}
          </button>
        )}
        {result && !result.correct && !locked && (
          <button type="button" className="course-button ex__confirm" onClick={retry}>
            Tentar de novo
          </button>
        )}
        {result?.correct && onContinue && (
          <button type="button" className="course-button ex__confirm" onClick={onContinue}>
            Continuar
          </button>
        )}
      </div>
    </div>
  )
}
