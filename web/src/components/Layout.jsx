import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Layout({ children }) {
  return (
    <>
      <header className="layout-header">
        <Link to="/" aria-label="Destrava, página inicial">
          <Logo variant="horizontal" size={32} />
        </Link>
        <nav className="layout-menu" aria-label="Menu principal">
          <Link to="/">Início</Link>
        </nav>
      </header>
      <main className="layout-main">{children}</main>
    </>
  )
}
