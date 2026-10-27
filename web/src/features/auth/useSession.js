import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

// Sessão atual + perfil (tabela profiles).
// `loading` fica true até sabermos se há sessão e, havendo, até o perfil chegar.
export function useSession() {
  const [session, setSession] = useState(null)
  const [sessionReady, setSessionReady] = useState(false)
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    let active = true

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return
      setSession(nextSession ?? null)
      setSessionReady(true)
    })

    supabase.auth.getSession().then(({ data: current }) => {
      if (!active) return
      setSession((prev) => prev ?? current?.session ?? null)
      setSessionReady(true)
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  const userId = session?.user?.id ?? null

  useEffect(() => {
    let active = true
    if (!userId) {
      setProfile(null)
      setProfileLoading(false)
      return undefined
    }
    setProfileLoading(true)
    supabase
      .from('profiles')
      .select('id, full_name, plan, role')
      .eq('id', userId)
      .single()
      .then(({ data: row }) => {
        if (!active) return
        setProfile(row ?? null)
        setProfileLoading(false)
      })
    return () => {
      active = false
    }
  }, [userId])

  return { session, profile, loading: !sessionReady || profileLoading }
}
