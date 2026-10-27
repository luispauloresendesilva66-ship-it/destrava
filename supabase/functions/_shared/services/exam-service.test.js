import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../grader/grade.js', () => ({ gradeCode: vi.fn() }))

import { gradeCode } from '../grader/grade.js'
import { startExam, submitExam } from './exam-service.js'

const L1 = { id: 'L1', position: 1, name: 'Primeiro Commit' }
const L2 = { id: 'L2', position: 2, name: 'Nível 2' }
const T0 = new Date('2026-10-27T10:00:00Z')
const at = (h) => new Date(`2026-10-27T${String(h).padStart(2, '0')}:00:00Z`)

const bank = [
  { id: 'q1', type: 'multiple_choice', topic: 'html', prompt: { question: 'a' }, answer: { correctIndex: 1 } },
  { id: 'q2', type: 'multiple_choice', topic: 'css', prompt: { question: 'b' }, answer: { correctIndex: 0 } },
  { id: 'q3', type: 'multiple_choice', topic: 'css', prompt: { question: 'c' }, answer: { correctIndex: 2 } },
  {
    id: 'q4',
    type: 'code',
    topic: 'js',
    prompt: { statement: 'd' },
    answer: { tests: [{ type: 'dom-exists', selector: 'h1' }] },
  },
]
const allCorrect = { q1: 1, q2: 0, q3: 2, q4: { html: '<h1></h1>', css: '', js: '' } }

function makeRepo({ plan = 'gold', fullName = 'Ana Souza', level = L1, passed = [], attempts = [], certificates = [], questions = bank } = {}) {
  const state = { attempts: [...attempts], certificates: [...certificates], seq: 0 }
  const repo = {
    getProfile: vi.fn(async () => ({ plan, fullName })),
    getLevel: vi.fn(async () => level),
    getExamConfig: vi.fn(async () => ({ questionCount: 4, exerciseMinutes: 240, examMinutes: 60 })),
    getQuestionBank: vi.fn(async () => questions),
    getPassedLevelPositions: vi.fn(async () => passed),
    getOpenAttempt: vi.fn(
      async (userId) => state.attempts.find((a) => a.userId === userId && !a.submittedAt) ?? null,
    ),
    getLastSubmittedAttempt: vi.fn(async (userId) => {
      const done = state.attempts.filter((a) => a.userId === userId && a.submittedAt)
      return done.sort((a, b) => b.submittedAt - a.submittedAt)[0] ?? null
    }),
    createAttempt: vi.fn(async ({ userId, levelId, questionIds, startedAt }) => {
      const a = { id: `att${++state.seq}`, userId, levelId, questionIds, startedAt, submittedAt: null }
      state.attempts.push(a)
      return a
    }),
    deleteOpenAttempt: vi.fn(async (id) => {
      state.attempts = state.attempts.filter((a) => a.id !== id)
    }),
    getAttempt: vi.fn(async (id) => state.attempts.find((a) => a.id === id) ?? null),
    getQuestionsByIds: vi.fn(async (ids) => questions.filter((q) => ids.includes(q.id))),
    submitAttemptIfOpen: vi.fn(async (id, result) => {
      const a = state.attempts.find((x) => x.id === id)
      if (a.submittedAt) return false
      Object.assign(a, result)
      return true
    }),
    getWorkloadInputs: vi.fn(async () => ({
      lessonDurationsSeconds: [3600, 3600],
      exerciseMinutes: 240,
      examMinutes: 60,
    })),
    getCertificate: vi.fn(
      async (userId, levelId) =>
        state.certificates.find((c) => c.userId === userId && c.levelId === levelId) ?? null,
    ),
    createCertificate: vi.fn(async (row) => {
      state.certificates.push(row)
      return row
    }),
  }
  return { repo, state }
}

const start = (repo, extra = {}) =>
  startExam({ userId: 'u1', levelId: 'L1', repo, now: T0, random: () => 0.5, ...extra })

const expectErr = async (promise, status, code) => {
  const err = await promise.then(
    () => null,
    (e) => e,
  )
  expect(err, 'expected rejection').not.toBeNull()
  expect(err.status).toBe(status)
  expect(err.code).toBe(code)
  return err
}

beforeEach(() => {
  vi.restoreAllMocks()
  gradeCode.mockReset()
  gradeCode.mockResolvedValue({ passed: true, results: [] })
})

describe('startExam', () => {
  it('requires a confirmed full name', async () => {
    for (const fullName of ['', '  a ', null]) {
      const { repo } = makeRepo({ fullName })
      const err = await expectErr(start(repo), 422, 'NAME_REQUIRED')
      expect(err.message).toBe('Confirme seu nome completo antes de começar a prova.')
      expect(repo.createAttempt).not.toHaveBeenCalled()
    }
  })

  it('always draws a code question when the bank has one', async () => {
    const big = Array.from({ length: 12 }, (_, i) => ({ ...bank[0], id: `m${i}` })).concat(bank[3])
    const { repo } = makeRepo({ questions: big })
    const { questions } = await start(repo, { random: () => 0 })
    expect(questions.some((q) => q.type === 'code')).toBe(true)
  })

  it('startExam returns the open attempt', async () => {
    const { repo } = makeRepo()
    const a = await start(repo)
    const b = await start(repo)
    expect(b.attemptId).toBe(a.attemptId)
    expect(b.questions.map((q) => q.id)).toEqual(a.questions.map((q) => q.id))
    expect(repo.createAttempt).toHaveBeenCalledTimes(1)
  })

  it('never returns the answer key', async () => {
    const { repo } = makeRepo()
    const { questions } = await start(repo)
    expect(questions).toHaveLength(4)
    for (const q of questions) {
      expect(Object.keys(q).sort()).toEqual(['id', 'prompt', 'topic', 'type'])
    }
  })

  it('free on level 2 -> PLAN_NOT_ALLOWED', async () => {
    const { repo } = makeRepo({ plan: 'free', level: L2 })
    await expectErr(start(repo, { levelId: 'L2' }), 403, 'PLAN_NOT_ALLOWED')
  })

  it('gold on level 2 without level 1 passed -> LEVEL_LOCKED', async () => {
    const { repo } = makeRepo({ level: L2, passed: [] })
    await expectErr(start(repo, { levelId: 'L2' }), 403, 'LEVEL_LOCKED')
  })

  it('already passed -> ALREADY_PASSED', async () => {
    const { repo } = makeRepo({ passed: [1] })
    await expectErr(start(repo), 409, 'ALREADY_PASSED')
  })

  it('unknown level -> 404', async () => {
    const { repo } = makeRepo()
    repo.getLevel.mockResolvedValue(null)
    await expectErr(start(repo), 404, undefined)
  })

  describe('cooldown', () => {
    const failed = (h) => ({
      id: 'old',
      userId: 'u1',
      levelId: 'L1',
      questionIds: ['q1'],
      submittedAt: at(h),
      passed: false,
    })

    it('gold failed at 10:00, trying at 11:00 -> COOLDOWN until 12:00', async () => {
      const { repo } = makeRepo({ attempts: [failed(10)] })
      const err = await expectErr(start(repo, { now: at(11) }), 429, 'COOLDOWN')
      expect(err.extra.retryAt).toBe('2026-10-27T12:00:00.000Z')
    })

    it('gold at 12:00 is allowed', async () => {
      const { repo } = makeRepo({ attempts: [failed(10)] })
      const out = await start(repo, { now: at(12) })
      expect(out.questions).toHaveLength(4)
    })

    it('platinum right after failing is allowed', async () => {
      const { repo } = makeRepo({ plan: 'platinum', attempts: [failed(10)] })
      const out = await start(repo, { now: at(10) })
      expect(out.attemptId).toBeTruthy()
    })
  })

  it('discards an open attempt that references a deleted question and creates a new one', async () => {
    const stale = { id: 'stale', userId: 'u1', levelId: 'L1', questionIds: ['q1', 'gone'], submittedAt: null }
    const { repo } = makeRepo({ attempts: [stale] })
    const out = await start(repo)
    expect(repo.deleteOpenAttempt).toHaveBeenCalledWith('stale')
    expect(out.attemptId).not.toBe('stale')
    expect(repo.createAttempt).toHaveBeenCalledTimes(1)
  })
})

describe('submitExam', () => {
  async function started(opts) {
    const ctx = makeRepo(opts)
    const { attemptId } = await start(ctx.repo)
    return { ...ctx, attemptId }
  }
  const submit = (repo, attemptId, answers, extra = {}) =>
    submitExam({ userId: 'u1', attemptId, answers, repo, now: at(10), ...extra })

  it('4/4 as gold -> passed, active certificate with workload and score 100', async () => {
    const { repo, attemptId, state } = await started()
    const out = await submit(repo, attemptId, allCorrect)
    expect(out).toMatchObject({ percent: 100, passed: true, wrongTopics: [], nextAttemptAt: null })
    expect(out.certificate.status).toBe('active')
    expect(out.certificate.code).toMatch(/^DTV-[A-Z2-9]{4}-[A-Z2-9]{4}$/)
    expect(state.certificates[0]).toMatchObject({
      userId: 'u1',
      levelId: 'L1',
      fullName: 'Ana Souza',
      workloadHours: 7, // (120 + 240 + 60) min / 60
      score: 100,
      status: 'active',
    })
    expect(repo.getWorkloadInputs).toHaveBeenCalledWith('L1', { freeOnly: false })
  })

  it('free -> locked certificate and freeOnly workload', async () => {
    const { repo, attemptId } = await started({ plan: 'free' })
    const out = await submit(repo, attemptId, allCorrect)
    expect(out.certificate.status).toBe('locked')
    expect(repo.getWorkloadInputs).toHaveBeenCalledWith('L1', { freeOnly: true })
  })

  it('3/4 fails with wrongTopics, nextAttemptAt by plan and no certificate', async () => {
    const { repo, attemptId } = await started()
    const out = await submit(repo, attemptId, { ...allCorrect, q2: 3 })
    expect(out).toMatchObject({ percent: 75, passed: false, wrongTopics: ['css'], certificate: null })
    expect(out.nextAttemptAt).toBe('2026-10-27T12:00:00.000Z')
    expect(repo.createCertificate).not.toHaveBeenCalled()
  })

  it('platinum failure has no nextAttemptAt', async () => {
    const { repo, attemptId } = await started({ plan: 'platinum' })
    const out = await submit(repo, attemptId, {})
    expect(out.passed).toBe(false)
    expect(out.nextAttemptAt).toBeNull()
  })

  it('code question goes through gradeCode with answer.tests; missing answer is wrong', async () => {
    const { repo, attemptId } = await started()
    await submit(repo, attemptId, allCorrect)
    expect(gradeCode).toHaveBeenCalledWith({ html: '<h1></h1>', css: '', js: '' }, bank[3].answer.tests)

    gradeCode.mockClear()
    const second = await started()
    const out = await submit(second.repo, second.attemptId, { q1: 1, q2: 0, q3: 2 })
    expect(gradeCode).not.toHaveBeenCalled()
    expect(out).toMatchObject({ percent: 75, passed: false, wrongTopics: ['js'] })
  })

  it('code answer that fails the tests is wrong', async () => {
    gradeCode.mockResolvedValue({ passed: false, results: [] })
    const { repo, attemptId } = await started()
    const out = await submit(repo, attemptId, allCorrect)
    expect(out.wrongTopics).toEqual(['js'])
  })

  it('submitExam twice -> ALREADY_SUBMITTED, one certificate', async () => {
    const { repo, attemptId } = await started()
    await submit(repo, attemptId, allCorrect)
    await expectErr(submit(repo, attemptId, allCorrect), 409, 'ALREADY_SUBMITTED')
    expect(repo.createCertificate).toHaveBeenCalledTimes(1)
  })

  it('concurrent double submit creates one certificate', async () => {
    const { repo, attemptId } = await started()
    const results = await Promise.allSettled([
      submit(repo, attemptId, allCorrect),
      submit(repo, attemptId, allCorrect),
    ])
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1)
    expect(repo.createCertificate).toHaveBeenCalledTimes(1)
  })

  it('does not create a second certificate when one already exists', async () => {
    const existing = { userId: 'u1', levelId: 'L1', code: 'DTV-AAAA-BBBB', status: 'active' }
    const { repo, attemptId } = await started({ certificates: [existing] })
    const out = await submit(repo, attemptId, allCorrect)
    expect(repo.createCertificate).not.toHaveBeenCalled()
    expect(out.certificate).toEqual({ code: 'DTV-AAAA-BBBB', status: 'active' })
  })

  it('another user attempt -> ATTEMPT_NOT_FOUND', async () => {
    const { repo, attemptId } = await started()
    await expectErr(
      submitExam({ userId: 'intruder', attemptId, answers: allCorrect, repo, now: at(10) }),
      404,
      'ATTEMPT_NOT_FOUND',
    )
    await expectErr(submit(repo, 'nope', allCorrect), 404, 'ATTEMPT_NOT_FOUND')
  })

  it('grading failure leaves the attempt open and throws 503 GRADING_FAILED', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    gradeCode.mockRejectedValue(new Error('wasm'))
    const { repo, attemptId, state } = await started()
    await expectErr(submit(repo, attemptId, allCorrect), 503, 'GRADING_FAILED')
    expect(repo.submitAttemptIfOpen).not.toHaveBeenCalled()
    expect(state.attempts[0].submittedAt).toBeNull()
  })

  it('a deleted question counts as wrong and total stays the attempt size', async () => {
    const { repo, attemptId } = await started()
    repo.getQuestionsByIds.mockResolvedValue(bank.slice(0, 3))
    const out = await submit(repo, attemptId, allCorrect)
    expect(out).toMatchObject({ percent: 75, passed: false, wrongTopics: [] })
  })

  describe('certificate issuing is idempotent', () => {
    const unique = () => Object.assign(new Error('duplicate key'), { code: '23505' })

    it('createCertificate fails once: first submit errors, second call recovers one certificate', async () => {
      const { repo, attemptId, state } = await started()
      repo.createCertificate.mockRejectedValueOnce(new Error('db down'))
      await expect(submit(repo, attemptId, allCorrect)).rejects.toThrow('db down')
      expect(state.certificates).toHaveLength(0)

      const out = await submit(repo, attemptId, {})
      expect(out).toMatchObject({ passed: true, percent: 100 })
      expect(out.certificate.status).toBe('active')
      expect(state.certificates).toHaveLength(1)

      await expectErr(submit(repo, attemptId, {}), 409, 'ALREADY_SUBMITTED')
      expect(state.certificates).toHaveLength(1)
    })

    it('getWorkloadInputs failing is recoverable the same way', async () => {
      const { repo, attemptId, state } = await started()
      repo.getWorkloadInputs.mockRejectedValueOnce(new Error('db down'))
      await expect(submit(repo, attemptId, allCorrect)).rejects.toThrow('db down')
      const out = await submit(repo, attemptId, {})
      expect(out.certificate).not.toBeNull()
      expect(state.certificates).toHaveLength(1)
    })

    it('retries with a fresh code on a code collision', async () => {
      const { repo, attemptId, state } = await started()
      repo.createCertificate.mockRejectedValueOnce(unique()).mockRejectedValueOnce(unique())
      const out = await submit(repo, attemptId, allCorrect)
      expect(repo.createCertificate).toHaveBeenCalledTimes(3)
      const codes = repo.createCertificate.mock.calls.map(([row]) => row.code)
      expect(new Set(codes).size).toBe(3)
      expect(state.certificates).toHaveLength(1)
      expect(out.certificate.code).toBe(codes[2])
    })

    it('a user+level conflict resolves to the existing row', async () => {
      const { repo, attemptId } = await started()
      const winner = { userId: 'u1', levelId: 'L1', code: 'DTV-WWWW-XXXX', status: 'active' }
      repo.createCertificate.mockImplementationOnce(async () => {
        repo.getCertificate.mockResolvedValue(winner)
        throw unique()
      })
      const out = await submit(repo, attemptId, allCorrect)
      expect(out.certificate).toEqual({ code: 'DTV-WWWW-XXXX', status: 'active' })
      expect(repo.createCertificate).toHaveBeenCalledTimes(1)
    })

    it('gives up after a few collisions', async () => {
      const { repo, attemptId } = await started()
      repo.createCertificate.mockRejectedValue(unique())
      await expect(submit(repo, attemptId, allCorrect)).rejects.toMatchObject({ code: '23505' })
      expect(repo.createCertificate).toHaveBeenCalledTimes(5)
    })

    it('a failed (not passed) submitted attempt stays ALREADY_SUBMITTED', async () => {
      const { repo, attemptId } = await started()
      await submit(repo, attemptId, {})
      await expectErr(submit(repo, attemptId, {}), 409, 'ALREADY_SUBMITTED')
      expect(repo.createCertificate).not.toHaveBeenCalled()
    })
  })
})
