import { Link } from 'react-router-dom'
import { useSession } from '../features/auth/useSession.js'
import Logo from './Logo.jsx'

export default function Layout({ children }) {
  const { session } = useSession()
  return (
    <>
      <header className="layout-header">
        <Link to="/" aria-label="Destrava, página inicial">
          <Logo variant="horizontal" size={32} />
        </Link>
        <nav className="layout-menu" aria-label="Menu principal">
          {session ? (
            <>
              <Link to="/painel">Painel</Link>
              <Link to="/niveis">Níveis</Link>
              <Link to="/certificados">Certificados</Link>
            </>
          ) : (
            <Link to="/">Início</Link>
          )}
        </nav>
      </header>
      <main className="layout-main">{children}</main>
    </>
  )
}
