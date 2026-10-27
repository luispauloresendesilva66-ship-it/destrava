import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSession } from '../features/auth/useSession.js'
import Logo from './Logo.jsx'

// Telas que usam o palco noturno de ponta a ponta (sem o container padrão).
const STAGE_ROUTES = ['/', '/entrar', '/cadastro', '/esqueci-senha', '/nova-senha']

export default function Layout({ children }) {
  const { session } = useSession()
  const { pathname } = useLocation()
  const stage = STAGE_ROUTES.includes(pathname)
  return (
    <>
      <header className={`layout-header${session ? ' layout-header--app' : ''}`}>
        <Link to="/" className="layout-brand" aria-label="Destrava, página inicial">
          <span className="layout-brand__full">
            <Logo variant="horizontal" theme="dark" size={32} />
          </span>
          <span className="layout-brand__mark">
            <Logo variant="mark" theme="dark" size={32} />
          </span>
        </Link>
        <nav className="layout-menu" aria-label="Menu principal">
          {session ? (
            <>
              <NavLink to="/painel">Painel</NavLink>
              <NavLink to="/niveis">Níveis</NavLink>
              <NavLink to="/certificados">Certificados</NavLink>
            </>
          ) : (
            <NavLink to="/" end>
              Início
            </NavLink>
          )}
        </nav>
      </header>
      <main className={`layout-main${stage ? ' layout-main--stage' : ''}`}>{children}</main>
    </>
  )
}
