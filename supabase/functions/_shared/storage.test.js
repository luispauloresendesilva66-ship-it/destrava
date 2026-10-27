import { describe, it, expect, vi } from 'vitest'
import { createStoragePresign, createS3Presign, selectPresign } from './storage.js'

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

const B2 = {
  B2_KEY_ID: 'keyid',
  B2_APPLICATION_KEY: 'secret',
  B2_BUCKET: 'destrava-videos-',
  B2_ENDPOINT: 's3.us-east-005.backblazeb2.com',
}

describe('createS3Presign', () => {
  it('signs a path-style GET with encoded key segments', async () => {
    const presign = createS3Presign({
      accessKeyId: 'keyid',
      secretAccessKey: 'secret',
      endpoint: 's3.us-east-005.backblazeb2.com',
      region: 'us-east-005',
      bucket: 'destrava-videos-',
    })
    const url = new URL(await presign('n1/aula 01.mp4', 10800))
    expect(url.host).toBe('s3.us-east-005.backblazeb2.com')
    expect(url.pathname).toBe('/destrava-videos-/n1/aula%2001.mp4')
    expect(url.searchParams.get('X-Amz-Expires')).toBe('10800')
    expect(url.searchParams.get('X-Amz-Credential')).toContain('/us-east-005/s3/aws4_request')
    expect(url.searchParams.get('X-Amz-Signature')).toBeTruthy()
  })
})

describe('selectPresign', () => {
  const client = (signedUrl) => ({
    storage: { from: () => ({ createSignedUrl: async () => ({ data: { signedUrl }, error: null }) }) },
  })

  it('uses B2 when all variables are set (region defaults to us-east-005)', async () => {
    const presign = selectPresign(B2, client('supabase'))
    const url = new URL(await presign('a.mp4', 60))
    expect(url.host).toBe('s3.us-east-005.backblazeb2.com')
    expect(url.searchParams.get('X-Amz-Credential')).toContain('/us-east-005/s3/')
  })

  it('honors B2_REGION', async () => {
    const presign = selectPresign({ ...B2, B2_REGION: 'us-west-004' }, client('supabase'))
    const url = new URL(await presign('a.mp4', 60))
    expect(url.searchParams.get('X-Amz-Credential')).toContain('/us-west-004/s3/')
  })

  it('falls back to Supabase Storage without B2 variables', async () => {
    expect(await selectPresign({}, client('supabase-url'))('a.mp4', 60)).toBe('supabase-url')
  })

  it('falls back to Supabase on partial or empty B2 variables', async () => {
    expect(await selectPresign({ ...B2, B2_BUCKET: '' }, client('supabase-url'))('k', 1)).toBe('supabase-url')
    expect(await selectPresign({ B2_KEY_ID: 'x' }, client('supabase-url'))('k', 1)).toBe('supabase-url')
  })
})
