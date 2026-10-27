import { Link, Navigate } from 'react-router-dom'
import { useSession } from '../auth/useSession.js'
import './home.css'

// Escada decorativa: "um nível de cada vez". Só visual, escondida de leitores de tela.
function Steps() {
  return (
    <div className="home__steps" aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className={`home__step home__step--${n}`} />
      ))}
    </div>
  )
}

export default function HomePage() {
  const { session, loading } = useSession()
  if (loading) return <p className="loading" role="status">Carregando...</p>
  if (session) return <Navigate to="/painel" replace />
  return (
    <section className="home">
      <div className="home__copy">
        <h1>Destrava sua carreira. Um nível de cada vez.</h1>
        <p className="home__lead">Aprenda programação em português, passo a passo, no seu ritmo.</p>
        <div className="home__actions">
          <Link className="btn btn--primary btn--lg" to="/entrar">
            Entrar
          </Link>
          <Link className="btn btn--secondary btn--lg" to="/cadastro">
            Criar conta
          </Link>
        </div>
      </div>
      <Steps />
    </section>
  )
}
