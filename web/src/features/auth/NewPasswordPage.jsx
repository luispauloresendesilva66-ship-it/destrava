import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHORT, translateAuthError } from './authErrors.js'
import './auth.css'

export default function NewPasswordPage() {
  const navigate = useNavigate()
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
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (updateError) {
      setError(translateAuthError(updateError))
      return
    }
    navigate('/painel')
  }

  return (
    <section className="auth-card">
      <h1>Nova senha</h1>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="new-password">Nova senha</label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="auth-hint">Use pelo menos 8 caracteres.</p>
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="auth-button" disabled={busy}>
          {busy ? 'Salvando...' : 'Salvar nova senha'}
        </button>
      </form>
      <p className="auth-alt">
        <Link to="/entrar">Voltar para entrar</Link>
      </p>
    </section>
  )
}
