import { supabase } from '../../lib/supabase'
import { useSession } from './useSession.js'
import './auth.css'

// Placeholder para conferir o login manualmente; será substituído pelo painel real.
export default function DashboardPlaceholder() {
  const { profile } = useSession()

  return (
    <section className="auth-card">
      <h1>Olá, {profile?.full_name ?? ''}</h1>
      <button type="button" className="auth-button" onClick={() => supabase.auth.signOut()}>
        Sair
      </button>
    </section>
  )
}
