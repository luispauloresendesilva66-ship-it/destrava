import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useSession } from '../auth/useSession.js'
import { useCourse } from './useCourse.js'
import './levels.css'

export default function DashboardPage() {
  const { profile } = useSession()
  const { stats, loading, error, refresh } = useCourse()

  return (
    <section className="course-page">
      <h1>Olá, {profile?.full_name ?? ''}</h1>

      {loading && <p role="status">Carregando...</p>}

      {error && (
        <div className="course-error" role="alert">
          <p>{error}</p>
          <button type="button" className="course-button" onClick={refresh}>
            Tentar de novo
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          <div className="stats">
            {stats.lives !== null && (
              <div className="stat">
                <strong>{stats.lives}</strong>
                <span>Vidas restantes</span>
              </div>
            )}
            <div className="stat">
              <strong>{stats.streakDays}</strong>
              <span>Dias seguidos</span>
            </div>
            <div className="stat">
              <strong>{stats.xp}</strong>
              <span>XP</span>
            </div>
          </div>

          <div className="course-card">
            <h2>Próxima aula</h2>
            {stats.nextLesson ? (
              <>
                <p>{stats.nextLesson.title}</p>
                <Link className="course-link" to={`/aula/${stats.nextLesson.id}`}>
                  Continuar
                </Link>
              </>
            ) : (
              <p>Nenhuma aula disponível por enquanto.</p>
            )}
          </div>

          <Link className="course-link" to="/niveis">
            Ver mapa de níveis
          </Link>
        </>
      )}

      <p>
        <button type="button" className="course-button" onClick={() => supabase.auth.signOut()}>
          Sair
        </button>
      </p>
    </section>
  )
}
