import { describe, it, expect, vi } from 'vitest'
import { getLessonVideoUrl } from './video-service.js'
import { HttpError } from '../http.js'

const NOW = new Date('2026-10-27T12:00:00Z')

function setup({ plan = 'free', lesson, passed = [], previousDone = true } = {}) {
  const base = {
    id: 'l1',
    levelId: 'L1',
    levelPosition: 1,
    position: 1,
    isFree: true,
    isSample: false,
    videoKey: 'n1/a01.mp4',
    captionsKey: 'n1/a01.vtt',
  }
  const repo = {
    getProfile: vi.fn(async () => ({ plan, fullName: 'Ana' })),
    getLesson: vi.fn(async () => ({ ...base, ...lesson })),
    getPassedLevelPositions: vi.fn(async () => passed),
    isPreviousLessonDone: vi.fn(async () => previousDone),
  }
  const presign = vi.fn(async (key) => `https://r2.test/${key}?sig=1`)
  const run = () => getLessonVideoUrl({ userId: 'u1', lessonId: 'l1', repo, presign, now: NOW })
  return { repo, presign, run }
}

describe('getLessonVideoUrl', () => {
  it('forbidden for free on paid lesson, without presigning', async () => {
    const { run, presign } = setup({ plan: 'free', lesson: { isFree: false } })
    const err = await run().catch((e) => e)
    expect(err).toBeInstanceOf(HttpError)
    expect(err.status).toBe(403)
    expect(err.message).toBe('Você não tem acesso a esta aula.')
    expect(presign).not.toHaveBeenCalled()
  })

  it('free on the level 4 sample returns the url and presigns (videoKey, 10800)', async () => {
    const { run, presign } = setup({
      plan: 'free',
      lesson: { levelPosition: 4, isFree: false, isSample: true, videoKey: 'n4/a01.mp4' },
    })
    const out = await run()
    expect(out.url).toBe('https://r2.test/n4/a01.mp4?sig=1')
    expect(presign).toHaveBeenCalledWith('n4/a01.mp4', 10800)
  })

  it('gold on level 2 without level 1 passed, non-sample, is forbidden', async () => {
    const { run, presign } = setup({
      plan: 'gold',
      passed: [],
      lesson: { levelPosition: 2, isFree: false },
    })
    await expect(run()).rejects.toMatchObject({ status: 403 })
    expect(presign).not.toHaveBeenCalled()
  })

  it('expiresAt is now + 10800 s', async () => {
    const { run } = setup()
    const out = await run()
    expect(out.expiresAt).toBe(new Date(NOW.getTime() + 10800 * 1000).toISOString())
  })

  it('without captionsKey, captionsUrl is null', async () => {
    const { run, presign } = setup({ lesson: { captionsKey: null } })
    const out = await run()
    expect(out.captionsUrl).toBeNull()
    expect(presign).toHaveBeenCalledTimes(1)
  })

  it('with captionsKey, presigns the captions too', async () => {
    const { run } = setup()
    const out = await run()
    expect(out.captionsUrl).toBe('https://r2.test/n1/a01.vtt?sig=1')
  })
})
