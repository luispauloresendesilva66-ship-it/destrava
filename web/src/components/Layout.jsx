import { Link, NavLink } from 'react-router-dom'
import { useSession } from '../features/auth/useSession.js'
import Logo from './Logo.jsx'

export default function Layout({ children }) {
  const { session } = useSession()
  return (
    <>
      <header className="layout-header">
        <Link to="/" className="layout-brand" aria-label="Destrava, página inicial">
          <Logo variant="horizontal" size={32} />
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
      <main className="layout-main">{children}</main>
    </>
  )
}
