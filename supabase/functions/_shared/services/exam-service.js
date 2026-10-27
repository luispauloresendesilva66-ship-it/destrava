import { canAccessLevel, canTakeExam, certificateStatusOnPass } from '../domain/access.js'
import { drawQuestions, scoreAttempt, nextAttemptAt } from '../domain/exam.js'
import { computeWorkloadHours, generateCertificateCode } from '../domain/certificate.js'
import { gradeCode } from '../grader/grade.js'
import { HttpError } from '../http.js'

// Nunca inclui a resposta: é o que vai para o navegador.
const publicQuestion = ({ id, type, topic, prompt }) => ({ id, type, topic, prompt })

export async function startExam({ userId, levelId, repo, now, random = Math.random }) {
  const [profile, level] = await Promise.all([repo.getProfile(userId), repo.getLevel(levelId)])
  if (!profile || !level) throw new HttpError(404, 'Nível não encontrado.')
  const { plan } = profile
  if (typeof profile.fullName !== 'string' || profile.fullName.trim().length < 3) {
    throw new HttpError(422, 'Confirme seu nome completo antes de começar a prova.', 'NAME_REQUIRED')
  }

  const passedLevelPositions = await repo.getPassedLevelPositions(userId)
  const levelUnlocked = canAccessLevel({
    plan,
    levelPosition: level.position,
    passedLevelPositions,
  })
  if (!canTakeExam({ plan, levelPosition: level.position, levelUnlocked })) {
    if (plan === 'free') {
      throw new HttpError(403, 'A prova deste nível está disponível no plano Gold.', 'PLAN_NOT_ALLOWED')
    }
    throw new HttpError(403, 'Passe na prova do nível anterior para liberar este.', 'LEVEL_LOCKED')
  }
  if (passedLevelPositions.includes(level.position)) {
    throw new HttpError(409, 'Você já foi aprovado neste nível.', 'ALREADY_PASSED')
  }

  const open = await repo.getOpenAttempt(userId, levelId)
  if (open) {
    const existing = await repo.getQuestionsByIds(open.questionIds)
    if (existing.length === open.questionIds.length) {
      const byId = new Map(existing.map((q) => [q.id, q]))
      return {
        attemptId: open.id,
        questions: open.questionIds.map((id) => publicQuestion(byId.get(id))),
      }
    }
    // O conteúdo foi reimportado e apagou perguntas dessa tentativa: descarta e sorteia de novo.
    await repo.deleteOpenAttempt(open.id)
  }

  const last = await repo.getLastSubmittedAttempt(userId, levelId)
  const retryAt = last ? nextAttemptAt({ lastSubmittedAt: new Date(last.submittedAt), plan }) : null
  if (retryAt && now.getTime() < retryAt.getTime()) {
    throw new HttpError(429, 'Aguarde para tentar a prova de novo.', 'COOLDOWN', {
      retryAt: retryAt.toISOString(),
    })
  }

  const [config, bank] = await Promise.all([repo.getExamConfig(levelId), repo.getQuestionBank(levelId)])
  if (!config || bank.length < config.questionCount) {
    throw new HttpError(503, 'A prova deste nível ainda não está disponível.', 'EXAM_UNAVAILABLE')
  }
  const drawn = drawQuestions(bank, config.questionCount, random)
  const attempt = await repo.createAttempt({
    userId,
    levelId,
    questionIds: drawn.map((q) => q.id),
    startedAt: now,
  })
  return { attemptId: attempt.id, questions: drawn.map(publicQuestion) }
}

async function isCorrect(question, answer) {
  if (!question) return false
  if (question.type === 'multiple_choice') {
    return typeof answer === 'number' && answer === question.answer?.correctIndex
  }
  if (question.type === 'code') {
    if (!answer || typeof answer !== 'object') return false
    const text = (v) => (typeof v === 'string' ? v : '')
    const { passed } = await gradeCode(
      { html: text(answer.html), css: text(answer.css), js: text(answer.js) },
      question.answer?.tests ?? [],
    )
    return passed === true
  }
  return false
}

const CERT_ATTEMPTS = 5
const UNIQUE_VIOLATION = '23505'

// Idempotente: reaproveita o certificado existente; senão insere, sorteando outro código se
// houver colisão (e lendo a linha existente se o conflito for usuário+nível).
async function ensureCertificate({ userId, levelId, profile, percent, now, repo }) {
  const existing = await repo.getCertificate(userId, levelId)
  if (existing) return { code: existing.code, status: existing.status }
  const { plan } = profile
  const inputs = await repo.getWorkloadInputs(levelId, { freeOnly: plan === 'free' })
  const base = {
    userId,
    levelId,
    fullName: profile.fullName,
    workloadHours: computeWorkloadHours(inputs),
    score: percent,
    status: certificateStatusOnPass(plan),
    issuedAt: now,
  }
  let lastError
  for (let i = 0; i < CERT_ATTEMPTS; i++) {
    const row = { ...base, code: generateCertificateCode() }
    try {
      await repo.createCertificate(row)
      return { code: row.code, status: row.status }
    } catch (err) {
      if (err?.code !== UNIQUE_VIOLATION) throw err
      lastError = err
      const raced = await repo.getCertificate(userId, levelId)
      if (raced) return { code: raced.code, status: raced.status }
    }
  }
  throw lastError
}

export async function submitExam({ userId, attemptId, answers, repo, now }) {
  const attempt = await repo.getAttempt(attemptId)
  if (!attempt || attempt.userId !== userId) {
    throw new HttpError(404, 'Prova não encontrada.', 'ATTEMPT_NOT_FOUND')
  }
  if (attempt.submittedAt) {
    // Aprovada mas sem certificado (falha depois de gravar a nota): emite agora.
    if (attempt.passed === true && !(await repo.getCertificate(userId, attempt.levelId))) {
      const profile = await repo.getProfile(userId)
      if (profile) {
        const certificate = await ensureCertificate({
          userId,
          levelId: attempt.levelId,
          profile,
          percent: attempt.percent,
          now,
          repo,
        })
        return { percent: attempt.percent, passed: true, wrongTopics: [], nextAttemptAt: null, certificate }
      }
    }
    throw new HttpError(409, 'Esta prova já foi enviada.', 'ALREADY_SUBMITTED')
  }
  const [profile, found] = await Promise.all([
    repo.getProfile(userId),
    repo.getQuestionsByIds(attempt.questionIds),
  ])
  if (!profile) throw new HttpError(404, 'Prova não encontrada.', 'ATTEMPT_NOT_FOUND')
  const { plan } = profile

  // Pergunta apagada por reimportação: continua no total e conta como errada.
  const byId = new Map(found.map((q) => [q.id, q]))
  const questions = attempt.questionIds.map((id) => ({ id, topic: byId.get(id)?.topic }))
  const given = answers && typeof answers === 'object' ? answers : {}
  const results = {}
  try {
    for (const id of attempt.questionIds) results[id] = await isCorrect(byId.get(id), given[id])
  } catch (err) {
    console.error(err)
    // Falha ao corrigir (timeout, WASM): a tentativa continua aberta para reenviar.
    throw new HttpError(
      503,
      'Não conseguimos corrigir sua prova agora. Tente enviar de novo.',
      'GRADING_FAILED',
    )
  }
  const score = scoreAttempt({ questions, results })
  const wrongTopics = score.wrongTopics.filter(Boolean)

  const won = await repo.submitAttemptIfOpen(attemptId, {
    submittedAt: now,
    correct: score.correct,
    total: score.total,
    percent: score.percent,
    passed: score.passed,
    wrongTopics,
  })
  if (!won) throw new HttpError(409, 'Esta prova já foi enviada.', 'ALREADY_SUBMITTED')

  const certificate = score.passed
    ? await ensureCertificate({ userId, levelId: attempt.levelId, profile, percent: score.percent, now, repo })
    : null

  const retryAt = score.passed ? null : nextAttemptAt({ lastSubmittedAt: now, plan })
  return {
    percent: score.percent,
    passed: score.passed,
    wrongTopics,
    nextAttemptAt: retryAt ? retryAt.toISOString() : null,
    certificate,
  }
}
