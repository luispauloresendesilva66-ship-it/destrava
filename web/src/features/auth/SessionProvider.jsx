import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { SessionContext } from './sessionContext.js'

// Montado uma única vez no App: assina a sessão e carrega o perfil.
// `loading` fica true até a sessão ser conhecida e, havendo usuário, o perfil dele ter sido buscado.
export function SessionProvider({ children }) {
  const [session, setSession] = useState(null)
  const [sessionReady, setSessionReady] = useState(false)
  const [profileState, setProfileState] = useState({ userId: null, profile: null })

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
      setProfileState({ userId: null, profile: null })
      return undefined
    }
    supabase
      .from('profiles')
      .select('id, full_name, plan, role')
      .eq('id', userId)
      .single()
      .then(({ data: row }) => {
        if (active) setProfileState({ userId, profile: row ?? null })
      })
      .catch(() => {
        if (active) setProfileState({ userId, profile: null })
      })
    return () => {
      active = false
    }
  }, [userId])

  const settled = profileState.userId === userId
  const value = useMemo(
    () => ({
      session,
      profile: userId && settled ? profileState.profile : null,
      loading: !sessionReady || (userId !== null && !settled),
    }),
    [session, userId, settled, profileState.profile, sessionReady],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
