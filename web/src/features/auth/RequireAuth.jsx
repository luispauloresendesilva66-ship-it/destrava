import { Navigate } from 'react-router-dom'
import { useSession } from './useSession.js'

export default function RequireAuth({ children }) {
  const { session, loading } = useSession()
  if (loading) return <p className="auth-status">Carregando...</p>
  if (!session) return <Navigate to="/entrar" replace />
  return children
}
