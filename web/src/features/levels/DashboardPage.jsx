import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useSession } from '../auth/useSession.js'
import { useCourse } from './useCourse.js'
import './levels.css'

// Ícones decorativos dos cartões de estatística (o texto do cartão já diz o que é).
const ICONS = {
  lives: 'M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z',
  streak: 'M12 3c.6 3.2 4.5 5.1 4.5 9.6A4.5 4.5 0 0 1 12 17.1a4.5 4.5 0 0 1-4.5-4.5c0-1.9 1-3.2 2-4.1.1 1.6.9 2.7 2 3 .1-3.2-.3-5.8.5-8.5Z',
  xp: 'm12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z',
}

function StatIcon({ name }) {
  return (
    <span className={`stat__icon stat__icon--${name}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
        <path d={ICONS[name]} fill="currentColor" />
      </svg>
    </span>
  )
}

export default function DashboardPage() {
  const { profile } = useSession()
  const { stats, loading, error, refresh } = useCourse()

  return (
    <section className="page dashboard">
      <h1>Olá, {profile?.full_name ?? ''}</h1>

      {loading && <p className="loading" role="status">Carregando...</p>}

      {error && (
        <div className="alert alert--danger" role="alert">
          <p>{error}</p>
          <button type="button" className="btn btn--primary" onClick={refresh}>
            Tentar de novo
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          <div className="stats">
            {stats.lives !== null && (
              <div className="stat">
                <StatIcon name="lives" />
                <strong>{stats.lives}</strong>
                <span>Vidas restantes</span>
              </div>
            )}
            <div className="stat">
              <StatIcon name="streak" />
              <strong>{stats.streakDays}</strong>
              <span>Dias seguidos</span>
            </div>
            <div className="stat">
              <StatIcon name="xp" />
              <strong>{stats.xp}</strong>
              <span>XP</span>
            </div>
          </div>

          <div className="card card--accent next-lesson">
            <h2>Próxima aula</h2>
            {stats.nextLesson ? (
              <>
                <p className="next-lesson__title">{stats.nextLesson.title}</p>
                <Link className="btn btn--primary" to={`/aula/${stats.nextLesson.id}`}>
                  Continuar
                </Link>
              </>
            ) : (
              <p className="muted">Nenhuma aula disponível por enquanto.</p>
            )}
          </div>

          <div className="dashboard__links">
            <Link className="btn btn--secondary" to="/niveis">
              Ver mapa de níveis
            </Link>
            <Link className="btn btn--secondary" to="/certificados">
              Meus certificados
            </Link>
          </div>
        </>
      )}

      <p className="dashboard__signout">
        <button type="button" className="btn btn--ghost" onClick={() => supabase.auth.signOut()}>
          Sair
        </button>
      </p>
    </section>
  )
}
