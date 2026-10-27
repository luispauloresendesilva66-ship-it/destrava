import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHORT, translateAuthError } from './authErrors.js'
import './auth.css'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(PASSWORD_TOO_SHORT)
      return
    }
    if (!accepted) {
      setError('Você precisa aceitar os termos de uso.')
      return
    }
    setBusy(true)
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName.trim() } },
    })
    setBusy(false)
    if (signUpError) {
      setError(translateAuthError(signUpError))
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <section className="auth-card">
        <h1>Quase lá!</h1>
        <p role="status">Enviamos um link de confirmação para o seu e-mail.</p>
        <p>
          Depois de confirmar, <Link to="/entrar">entre na sua conta</Link>.
        </p>
      </section>
    )
  }

  return (
    <section className="auth-card">
      <h1>Criar conta</h1>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="signup-name">Nome completo</label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="signup-email">E-mail</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="signup-password">Senha</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="auth-hint">Use pelo menos 8 caracteres.</p>
        <div className="auth-check">
          <input
            id="signup-terms"
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <label htmlFor="signup-terms">
            Li e aceito os <Link to="/termos">termos de uso</Link> e a{' '}
            <Link to="/privacidade">política de privacidade</Link>
          </label>
        </div>
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="auth-button" disabled={busy}>
          {busy ? 'Criando...' : 'Criar conta'}
        </button>
      </form>
      <p className="auth-alt">
        Já tem conta? <Link to="/entrar">Entrar</Link>
      </p>
    </section>
  )
}
