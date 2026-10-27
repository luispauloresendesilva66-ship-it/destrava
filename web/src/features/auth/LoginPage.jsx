import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { translateAuthError } from './authErrors.js'
import { useSession } from './useSession.js'
import AuthShell from './AuthShell.jsx'
import './auth.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { session, loading } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError(translateAuthError(signInError))
        return
      }
      navigate('/painel')
    } catch (thrown) {
      setError(translateAuthError(thrown))
    } finally {
      setBusy(false)
    }
  }

  if (!loading && session) return <Navigate to="/painel" replace />

  return (
    <AuthShell>
      <section className="card auth-card">
        <h1>Entrar</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="login-email">E-mail</label>
          <input
            className="input"
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label" htmlFor="login-password">Senha</label>
          <input
            className="input"
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--primary btn--block auth-submit" disabled={busy}>
            {busy ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="auth-alt">
          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </p>
        <p className="auth-alt">
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </section>
    </AuthShell>
  )
}
