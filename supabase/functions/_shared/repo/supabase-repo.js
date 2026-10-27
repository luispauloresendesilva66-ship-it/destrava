import { isLessonDone } from '../domain/access.js'

function check({ data, error }) {
  if (error) throw error
  return data
}

// Repositório sobre o cliente service-role (ignora RLS). Interface usada pelas Tasks 11 e 13.
export function createRepo(db) {
  async function getProfile(userId) {
    const row = check(
      await db.from('profiles').select('plan, full_name').eq('id', userId).maybeSingle(),
    )
    return row ? { plan: row.plan, fullName: row.full_name } : null
  }

  async function getLesson(lessonId) {
    const row = check(
      await db
        .from('lessons')
        .select(
          'id, level_id, position, is_free, is_sample, video_key, captions_key, levels(position)',
        )
        .eq('id', lessonId)
        .maybeSingle(),
    )
    if (!row) return null
    return {
      id: row.id,
      levelId: row.level_id,
      levelPosition: row.levels.position,
      position: row.position,
      isFree: row.is_free,
      isSample: row.is_sample,
      videoKey: row.video_key,
      captionsKey: row.captions_key,
    }
  }

  async function getPassedLevelPositions(userId) {
    const rows = check(
      await db
        .from('exam_attempts')
        .select('levels(position)')
        .eq('user_id', userId)
        .eq('passed', true),
    )
    return [...new Set(rows.map((r) => r.levels?.position).filter((p) => p !== undefined))]
  }

  // Free: "anterior" é a aula is_free anterior do nível; pago: position - 1.
  // Sem anterior => true. Concluída = todo exercício tem tentativa correta do usuário.
  async function isPreviousLessonDone(userId, lesson, plan) {
    let query = db
      .from('lessons')
      .select('id')
      .eq('level_id', lesson.levelId)
      .lt('position', lesson.position)
      .order('position', { ascending: false })
      .limit(1)
    if (plan === 'free') query = query.eq('is_free', true)
    const previous = check(await query)[0]
    if (!previous) return true

    const exercises = check(await db.from('exercises').select('id').eq('lesson_id', previous.id))
    const exerciseIds = exercises.map((e) => e.id)
    const attempts = exerciseIds.length
      ? check(
          await db
            .from('exercise_attempts')
            .select('exercise_id')
            .eq('user_id', userId)
            .eq('correct', true)
            .in('exercise_id', exerciseIds),
        )
      : []
    return isLessonDone({
      exerciseIds,
      correctExerciseIds: new Set(attempts.map((a) => a.exercise_id)),
    })
  }

  // ---------------------------------------------------------------- provas (Task 13)
  const toQuestion = (row) => {
    const joined = Array.isArray(row.exam_answers) ? row.exam_answers[0] : row.exam_answers
    return {
      id: row.id,
      type: row.type,
      topic: row.topic,
      prompt: row.prompt,
      answer: joined?.answer ?? null,
    }
  }

  const toAttempt = (row) =>
    row && {
      id: row.id,
      userId: row.user_id,
      levelId: row.level_id,
      questionIds: row.question_ids ?? [],
      startedAt: row.started_at,
      submittedAt: row.submitted_at,
      passed: row.passed,
    }

  const ATTEMPT_COLUMNS = 'id, user_id, level_id, question_ids, started_at, submitted_at, passed'

  async function getLevel(levelId) {
    return check(
      await db.from('levels').select('id, position, name').eq('id', levelId).maybeSingle(),
    )
  }

  async function getExamConfig(levelId) {
    const row = check(
      await db
        .from('exam_configs')
        .select('question_count, exercise_minutes, exam_minutes')
        .eq('level_id', levelId)
        .maybeSingle(),
    )
    return row && {
      questionCount: row.question_count,
      exerciseMinutes: row.exercise_minutes ?? 0,
      examMinutes: row.exam_minutes ?? 0,
    }
  }

  async function getQuestionBank(levelId) {
    const rows = check(
      await db
        .from('exam_questions')
        .select('id, type, topic, prompt, exam_answers(answer)')
        .eq('level_id', levelId),
    )
    return rows.map(toQuestion)
  }

  async function getQuestionsByIds(ids) {
    if (ids.length === 0) return []
    const rows = check(
      await db
        .from('exam_questions')
        .select('id, type, topic, prompt, exam_answers(answer)')
        .in('id', ids),
    )
    return rows.map(toQuestion)
  }

  async function getOpenAttempt(userId, levelId) {
    return toAttempt(
      check(
        await db
          .from('exam_attempts')
          .select(ATTEMPT_COLUMNS)
          .eq('user_id', userId)
          .eq('level_id', levelId)
          .is('submitted_at', null)
          .maybeSingle(),
      ),
    )
  }

  async function getLastSubmittedAttempt(userId, levelId) {
    const rows = check(
      await db
        .from('exam_attempts')
        .select(ATTEMPT_COLUMNS)
        .eq('user_id', userId)
        .eq('level_id', levelId)
        .not('submitted_at', 'is', null)
        .order('submitted_at', { ascending: false })
        .limit(1),
    )
    return toAttempt(rows[0] ?? null)
  }

  async function createAttempt({ userId, levelId, questionIds, startedAt }) {
    const row = check(
      await db
        .from('exam_attempts')
        .insert({
          user_id: userId,
          level_id: levelId,
          question_ids: questionIds,
          started_at: startedAt.toISOString(),
        })
        .select(ATTEMPT_COLUMNS)
        .single(),
    )
    return toAttempt(row)
  }

  async function deleteOpenAttempt(attemptId) {
    check(await db.from('exam_attempts').delete().eq('id', attemptId).is('submitted_at', null))
  }

  async function getAttempt(attemptId) {
    return toAttempt(
      check(
        await db.from('exam_attempts').select(ATTEMPT_COLUMNS).eq('id', attemptId).maybeSingle(),
      ),
    )
  }

  // Atômico: só grava se ainda estiver aberta. false = outra requisição já enviou.
  async function submitAttemptIfOpen(attemptId, result) {
    const rows = check(
      await db
        .from('exam_attempts')
        .update({
          submitted_at: result.submittedAt.toISOString(),
          correct: result.correct,
          total: result.total,
          percent: result.percent,
          passed: result.passed,
          wrong_topics: result.wrongTopics,
        })
        .eq('id', attemptId)
        .is('submitted_at', null)
        .select('id'),
    )
    return rows.length > 0
  }

  async function getWorkloadInputs(levelId, { freeOnly }) {
    let query = db.from('lessons').select('duration_seconds').eq('level_id', levelId)
    if (freeOnly) query = query.eq('is_free', true)
    const [lessons, config] = await Promise.all([query, getExamConfig(levelId)])
    return {
      lessonDurationsSeconds: check(lessons).map((l) => l.duration_seconds),
      exerciseMinutes: config?.exerciseMinutes ?? 0,
      examMinutes: config?.examMinutes ?? 0,
    }
  }

  async function getCertificate(userId, levelId) {
    return check(
      await db
        .from('certificates')
        .select('code, status')
        .eq('user_id', userId)
        .eq('level_id', levelId)
        .maybeSingle(),
    )
  }

  async function createCertificate(cert) {
    check(
      await db.from('certificates').insert({
        code: cert.code,
        user_id: cert.userId,
        level_id: cert.levelId,
        full_name: cert.fullName,
        workload_hours: cert.workloadHours,
        score: cert.score,
        status: cert.status,
        issued_at: cert.issuedAt.toISOString(),
      }),
    )
  }

  return {
    getProfile,
    getLesson,
    getPassedLevelPositions,
    isPreviousLessonDone,
    getLevel,
    getExamConfig,
    getQuestionBank,
    getQuestionsByIds,
    getOpenAttempt,
    getLastSubmittedAttempt,
    createAttempt,
    deleteOpenAttempt,
    getAttempt,
    submitAttemptIfOpen,
    getWorkloadInputs,
    getCertificate,
    createCertificate,
  }
}
