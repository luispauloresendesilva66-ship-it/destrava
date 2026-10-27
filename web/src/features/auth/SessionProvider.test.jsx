import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'

let authCallback
const unsubscribe = vi.fn()
let resolveProfile
const single = vi.fn()

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn((cb) => {
        authCallback = cb
        return { data: { subscription: { unsubscribe } } }
      }),
      getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
    },
    from: vi.fn(() => ({
      select: () => ({ eq: () => ({ single }) }),
    })),
  },
}))

import { SessionProvider } from './SessionProvider.jsx'
import { useSession } from './useSession.js'

function Probe() {
  const { session, profile, loading } = useSession()
  return (
    <p data-testid="state">
      {loading ? 'loading' : 'ready'}|{session ? 'in' : 'out'}|{profile?.full_name ?? 'none'}
    </p>
  )
}

const userSession = { user: { id: 'u1' } }

describe('SessionProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    single.mockImplementation(
      () => new Promise((resolve) => {
        resolveProfile = resolve
      }),
    )
  })

  it('mantém loading até o perfil chegar e limpa o perfil ao sair', async () => {
    render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    )
    expect(screen.getByTestId('state')).toHaveTextContent('loading|out|none')

    await act(async () => {
      authCallback('INITIAL_SESSION', userSession)
    })
    // sessão conhecida, perfil ainda não: continua carregando
    expect(screen.getByTestId('state')).toHaveTextContent('loading|in|none')

    await act(async () => {
      resolveProfile({ data: { id: 'u1', full_name: 'Maria' }, error: null })
    })
    await waitFor(() =>
      expect(screen.getByTestId('state')).toHaveTextContent('ready|in|Maria'),
    )

    await act(async () => {
      authCallback('SIGNED_OUT', null)
    })
    expect(screen.getByTestId('state')).toHaveTextContent('ready|out|none')
  })

  it('fica pronto sem sessão', async () => {
    render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    )
    await waitFor(() =>
      expect(screen.getByTestId('state')).toHaveTextContent('ready|out|none'),
    )
  })

  it('cancela a assinatura ao desmontar', () => {
    const { unmount } = render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    )
    unmount()
    expect(unsubscribe).toHaveBeenCalled()
  })
})
