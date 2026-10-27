import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import {
  INVALID_LINK,
  MIN_PASSWORD_LENGTH,
  PASSWORD_TOO_SHORT,
  translateAuthError,
} from './authErrors.js'
import { useSession } from './useSession.js'
import AuthShell from './AuthShell.jsx'
import './auth.css'

export default function NewPasswordPage() {
  const navigate = useNavigate()
  const { session, loading } = useSession()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(PASSWORD_TOO_SHORT)
      return
    }
    setBusy(true)
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        setError(translateAuthError(updateError))
        return
      }
      navigate('/painel')
    } catch (thrown) {
      setError(translateAuthError(thrown))
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <AuthShell>
        <section className="card auth-card">
          <h1>Nova senha</h1>
          <p className="loading" role="status">Carregando...</p>
        </section>
      </AuthShell>
    )
  }

  if (!session) {
    return (
      <AuthShell>
        <section className="card auth-card">
          <h1>Nova senha</h1>
          <p className="form-error" role="alert">
            {INVALID_LINK}
          </p>
          <p className="auth-alt">
            <Link to="/esqueci-senha">Pedir um novo link</Link>
          </p>
        </section>
      </AuthShell>
    )
  }

  return (
    <AuthShell>
      <section className="card auth-card">
        <h1>Nova senha</h1>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="label" htmlFor="new-password">Nova senha</label>
          <input
            className="input"
            id="new-password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="help-text">Use pelo menos 8 caracteres.</p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--primary btn--block auth-submit" disabled={busy}>
            {busy ? 'Salvando...' : 'Salvar nova senha'}
          </button>
        </form>
        <p className="auth-alt">
          <Link to="/entrar">Voltar para entrar</Link>
        </p>
      </section>
    </AuthShell>
  )
}
