import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'

const query = vi.hoisted(() => ({ count: 0, calls: [], error: null }))
vi.mock('../../lib/supabase', () => {
  const chain = {
    select: (...a) => (query.calls.push(['select', ...a]), chain),
    eq: (...a) => (query.calls.push(['eq', ...a]), chain),
    gte: (...a) => (query.calls.push(['gte', ...a]), chain),
    then: (res) => res({ count: query.count, error: query.error }),
  }
  return { supabase: { from: () => chain } }
})
const session = vi.hoisted(() => ({ plan: 'free' }))
vi.mock('../auth/useSession.js', () => ({ useSession: () => ({ profile: { plan: session.plan } }) }))

import { useLives, LIVES_LOAD_ERROR } from './useLives.js'

beforeEach(() => {
  query.calls = []
  query.count = 0
  query.error = null
  session.plan = 'free'
})

describe('useLives', () => {
  it('free: 5 vidas menos os erros de hoje', async () => {
    query.count = 2
    const { result } = renderHook(() => useLives())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.remaining).toBe(3)
    expect(query.calls).toContainEqual(['eq', 'correct', false])
    const gte = query.calls.find((c) => c[0] === 'gte')
    expect(gte[1]).toBe('created_at')
    expect(gte[2]).toMatch(/T03:00:00\.000Z$/) // meia-noite de São Paulo
    expect(result.current.resetAt.getTime()).toBeGreaterThan(Date.now())
  })

  it('spend() tira uma vida e para em zero', async () => {
    query.count = 4
    const { result } = renderHook(() => useLives())
    await waitFor(() => expect(result.current.remaining).toBe(1))
    act(() => result.current.spend())
    expect(result.current.remaining).toBe(0)
    act(() => result.current.spend())
    expect(result.current.remaining).toBe(0)
  })

  it('plano pago: vidas infinitas, sem consultar o banco', () => {
    session.plan = 'gold'
    const { result } = renderHook(() => useLives())
    expect(result.current.remaining).toBe(Infinity)
    expect(result.current.loading).toBe(false)
    expect(query.calls).toEqual([])
  })

  it('falha na contagem vira erro (não finge 5 vidas) e reload tenta de novo', async () => {
    query.error = { message: 'boom' }
    const { result } = renderHook(() => useLives())
    await waitFor(() => expect(result.current.error).toBe(LIVES_LOAD_ERROR))
    expect(result.current.loading).toBe(false)
    query.error = null
    query.count = 1
    act(() => result.current.reload())
    await waitFor(() => expect(result.current.error).toBeNull())
    await waitFor(() => expect(result.current.remaining).toBe(4))
  })
})
