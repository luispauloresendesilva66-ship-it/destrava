import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useSession } from '../auth/useSession.js'
import { livesRemaining, nextLivesResetAt, startOfDaySaoPaulo } from '@domain/lives.js'

export const LIVES_LOAD_ERROR = 'Não foi possível verificar suas vidas. Tente de novo.'
export const LIVES_OUT_MESSAGE =
  'Suas vidas acabaram. Elas voltam à meia-noite — ou destrave vidas infinitas no Gold.'

// Vidas do dia: conta os erros de hoje (desde a meia-noite de São Paulo) em exercise_attempts.
// Planos pagos têm vidas infinitas (remaining = Infinity). spend() registra um erro localmente.
export function useLives() {
  const { profile } = useSession()
  const plan = profile?.plan
  const [errorsToday, setErrorsToday] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const [now] = useState(() => new Date())

  useEffect(() => {
    if (plan !== 'free') return undefined
    let cancelled = false
    setLoaded(false)
    setError(null)
    Promise.resolve(
      supabase
      .from('exercise_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('correct', false)
      .gte('created_at', startOfDaySaoPaulo(now).toISOString()),
    )
      .then(({ count, error: err }) => {
        if (cancelled) return
        if (err) setError(LIVES_LOAD_ERROR)
        else setErrorsToday(count ?? 0)
        setLoaded(true)
      })
      .catch(() => {
        if (cancelled) return
        setError(LIVES_LOAD_ERROR)
        setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [plan, now, attempt])

  const reload = useCallback(() => setAttempt((n) => n + 1), [])
  const spend = useCallback(() => setErrorsToday((n) => n + 1), [])
  const resetAt = useMemo(() => nextLivesResetAt(now), [now])
  const remaining = plan ? livesRemaining({ plan, errorsToday }) : null
  return {
    remaining,
    resetAt,
    spend,
    reload,
    error,
    loading: !plan || (plan === 'free' && !loaded),
  }
}
