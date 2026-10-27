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

  return { getProfile, getLesson, getPassedLevelPositions, isPreviousLessonDone }
}
