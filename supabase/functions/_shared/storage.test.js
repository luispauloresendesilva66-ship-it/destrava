import { describe, it, expect, vi } from 'vitest'
import { createStoragePresign } from './storage.js'

function fakeClient(result) {
  const createSignedUrl = vi.fn(async () => result)
  const from = vi.fn(() => ({ createSignedUrl }))
  return { client: { storage: { from } }, from, createSignedUrl }
}

describe('createStoragePresign', () => {
  it('returns signedUrl and passes key, 10800 and default bucket through', async () => {
    const { client, from, createSignedUrl } = fakeClient({
      data: { signedUrl: 'https://s.test/x?token=1' },
      error: null,
    })
    const url = await createStoragePresign(client)('n1/a01.mp4', 10800)
    expect(url).toBe('https://s.test/x?token=1')
    expect(from).toHaveBeenCalledWith('lesson-videos')
    expect(createSignedUrl).toHaveBeenCalledWith('n1/a01.mp4', 10800)
  })

  it('uses a custom bucket', async () => {
    const { client, from } = fakeClient({ data: { signedUrl: 'u' }, error: null })
    await createStoragePresign(client, 'other')('k', 1)
    expect(from).toHaveBeenCalledWith('other')
  })

  it('throws on error', async () => {
    const boom = new Error('Object not found')
    const { client } = fakeClient({ data: null, error: boom })
    await expect(createStoragePresign(client)('k', 1)).rejects.toBe(boom)
  })

  it('throws when no signedUrl is returned', async () => {
    const { client } = fakeClient({ data: {}, error: null })
    await expect(createStoragePresign(client)('k', 1)).rejects.toThrow()
  })
})
