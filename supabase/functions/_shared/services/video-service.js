import { canAccessLevel, canWatchLesson } from '../domain/access.js'
import { HttpError } from '../http.js'

export const VIDEO_URL_TTL_SECONDS = 10800
const FORBIDDEN = 'Você não tem acesso a esta aula.'

export async function getLessonVideoUrl({ userId, lessonId, repo, presign, now }) {
  const [profile, lesson] = await Promise.all([repo.getProfile(userId), repo.getLesson(lessonId)])
  if (!profile || !lesson) throw new HttpError(404, 'Aula não encontrada.')
  const { plan } = profile

  const passedLevelPositions = await repo.getPassedLevelPositions(userId)
  const levelUnlocked = canAccessLevel({
    plan,
    levelPosition: lesson.levelPosition,
    passedLevelPositions,
  })
  const previousLessonDone = await repo.isPreviousLessonDone(userId, lesson, plan)
  const allowed = canWatchLesson({
    plan,
    levelPosition: lesson.levelPosition,
    levelUnlocked,
    lesson,
    previousLessonDone,
  })
  if (!allowed) throw new HttpError(403, FORBIDDEN)
  if (!lesson.videoKey) throw new HttpError(404, 'Vídeo ainda não disponível.')

  const [url, captionsUrl] = await Promise.all([
    presign(lesson.videoKey, VIDEO_URL_TTL_SECONDS),
    lesson.captionsKey ? presign(lesson.captionsKey, VIDEO_URL_TTL_SECONDS) : null,
  ])
  return {
    url,
    captionsUrl: captionsUrl ?? null,
    expiresAt: new Date(now.getTime() + VIDEO_URL_TTL_SECONDS * 1000).toISOString(),
  }
}
