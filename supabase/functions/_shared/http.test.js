import { describe, it, expect, vi } from 'vitest'
import { HttpError, json, withAuth } from './http.js'

const authClient = (user) => ({
  auth: { getUser: vi.fn(async () => (user ? { data: { user }, error: null } : { data: { user: null }, error: new Error('bad') })) },
})
const req = (headers = { Authorization: 'Bearer tok' }) => new Request('http://x/fn', { method: 'POST', headers })

describe('http', () => {
  it('json sets status and CORS headers', async () => {
    const res = json({ a: 1 }, 201)
    expect(res.status).toBe(201)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*')
    expect(await res.json()).toEqual({ a: 1 })
  })

  it('withAuth answers OPTIONS preflight', async () => {
    const h = withAuth(vi.fn(), authClient({ id: 'u1' }))
    const res = await h(new Request('http://x/fn', { method: 'OPTIONS' }))
    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Headers')).toContain('authorization')
  })

  it('401 without a valid JWT', async () => {
    const handler = vi.fn()
    const res = await withAuth(handler, authClient(null))(req())
    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Faça login para continuar.' })
    const res2 = await withAuth(handler, authClient({ id: 'u1' }))(req({}))
    expect(res2.status).toBe(401)
    expect(handler).not.toHaveBeenCalled()
  })

  it('passes userId to the handler', async () => {
    const handler = vi.fn(async ({ userId }) => json({ userId }))
    const res = await withAuth(handler, authClient({ id: 'u1' }))(req())
    expect(await res.json()).toEqual({ userId: 'u1' })
  })

  it('maps HttpError to status, message, code and extra', async () => {
    const handler = async () => {
      throw new HttpError(429, 'Espere.', 'cooldown', { retryAt: 'T' })
    }
    const res = await withAuth(handler, authClient({ id: 'u1' }))(req())
    expect(res.status).toBe(429)
    expect(await res.json()).toEqual({ error: 'Espere.', code: 'cooldown', retryAt: 'T' })
  })

  it('maps unknown errors to 500 without leaking', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const handler = async () => {
      throw new Error('secret db password leaked')
    }
    const res = await withAuth(handler, authClient({ id: 'u1' }))(req())
    const text = await res.text()
    expect(res.status).toBe(500)
    expect(JSON.parse(text)).toEqual({ error: 'Erro inesperado. Tente de novo.' })
    expect(text).not.toContain('secret')
    spy.mockRestore()
  })
})
