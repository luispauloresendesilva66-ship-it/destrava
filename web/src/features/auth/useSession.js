import { useContext } from 'react'
import { SessionContext } from './sessionContext.js'

// { session, profile, loading } do <SessionProvider> mais próximo.
export function useSession() {
  const value = useContext(SessionContext)
  if (!value) {
    throw new Error('useSession precisa estar dentro de <SessionProvider>.')
  }
  return value
}
