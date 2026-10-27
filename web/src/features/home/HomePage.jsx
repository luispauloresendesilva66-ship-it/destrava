import { Link, Navigate } from 'react-router-dom'
import { useSession } from '../auth/useSession.js'

export default function HomePage() {
  const { session, loading } = useSession()
  if (loading) return <p role="status">Carregando...</p>
  if (session) return <Navigate to="/painel" replace />
  return (
    <section className="home">
      <h1>Destrava sua carreira. Um nível de cada vez.</h1>
      <p>Aprenda programação em português, passo a passo, no seu ritmo.</p>
      <div className="home__actions">
        <Link className="home__button" to="/entrar">
          Entrar
        </Link>
        <Link className="home__button home__button--secondary" to="/cadastro">
          Criar conta
        </Link>
      </div>
    </section>
  )
}
