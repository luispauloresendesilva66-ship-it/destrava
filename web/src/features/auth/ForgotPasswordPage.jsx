import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { translateAuthError } from './authErrors.js'
import './auth.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/nova-senha`,
      })
      if (resetError) {
        setError(translateAuthError(resetError))
        return
      }
      setSent(true)
    } catch (thrown) {
      setError(translateAuthError(thrown))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="card auth-card">
      <h1>Recuperar senha</h1>
      {sent ? (
        <p className="alert" role="status">Se esse e-mail tiver cadastro, enviamos um link para criar uma nova senha.</p>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="forgot-email">E-mail</label>
          <input
            className="input"
            id="forgot-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--primary btn--block auth-submit" disabled={busy}>
            {busy ? 'Enviando...' : 'Enviar link'}
          </button>
        </form>
      )}
      <p className="auth-alt">
        <Link to="/entrar">Voltar para entrar</Link>
      </p>
    </section>
  )
}
