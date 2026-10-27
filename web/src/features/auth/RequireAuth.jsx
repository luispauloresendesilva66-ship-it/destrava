import './auth.css'
import { Navigate } from 'react-router-dom'
import { useSession } from './useSession.js'

export default function RequireAuth({ children }) {
  const { session, loading, profileError, retryProfile } = useSession()
  if (loading) return <p className="loading" role="status">Carregando...</p>
  if (!session) return <Navigate to="/entrar" replace />
  if (profileError) {
    return (
      <div className="auth-status">
        <p role="alert">Não foi possível carregar seu perfil. Verifique sua conexão.</p>
        <button type="button" className="btn btn--primary" onClick={retryProfile}>
          Tentar de novo
        </button>
      </div>
    )
  }
  return children
}
