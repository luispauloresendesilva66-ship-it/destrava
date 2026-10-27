import { useCallback, useEffect, useRef, useState } from 'react'

const SPEEDS = [1, 1.25, 1.5, 2]
const SAVE_EVERY_MS = 15000

// Player HTML5. onSave(seconds) grava o progresso; onExpired() devolve { url } novo.
export default function VideoPlayer({ url, captionsUrl, startAt = 0, onSave, onExpired }) {
  const videoRef = useRef(null)
  const resumeAt = useRef(startAt)
  const refreshing = useRef(false)
  const [src, setSrc] = useState(url)
  const [rate, setRate] = useState(1)
  const [failed, setFailed] = useState(false)

  const save = useCallback(() => {
    const video = videoRef.current
    if (video && video.currentTime > 0) onSave(Math.floor(video.currentTime))
  }, [onSave])

  useEffect(() => {
    const id = setInterval(() => {
      const video = videoRef.current
      if (video && !video.paused) save()
    }, SAVE_EVERY_MS)
    return () => clearInterval(id)
  }, [save])

  const onLoadedMetadata = () => {
    const video = videoRef.current
    if (resumeAt.current > 0) video.currentTime = resumeAt.current
    video.playbackRate = rate
  }

  // URL expirada (ou falha de rede): pede uma nova uma vez e retoma do mesmo ponto.
  const onError = async () => {
    if (refreshing.current) {
      setFailed(true)
      return
    }
    refreshing.current = true
    resumeAt.current = videoRef.current?.currentTime || resumeAt.current
    try {
      const fresh = await onExpired()
      setSrc(fresh.url)
    } catch {
      setFailed(true)
    }
  }

  const changeRate = (value) => {
    setRate(value)
    if (videoRef.current) videoRef.current.playbackRate = value
  }

  return (
    <div className="player">
      <video
        ref={videoRef}
        className="player__video"
        src={src}
        controls
        playsInline
        onLoadedMetadata={onLoadedMetadata}
        onPlaying={() => {
          refreshing.current = false
        }}
        onPause={save}
        onError={onError}
      >
        {captionsUrl && (
          <track kind="captions" src={captionsUrl} srcLang="pt-BR" label="Português" default />
        )}
      </video>
      {failed && (
        <p className="course-error" role="alert">
          Não foi possível carregar o vídeo. Tente de novo.
        </p>
      )}
      <div className="player__speeds" role="group" aria-label="Velocidade">
        {SPEEDS.map((s) => (
          <button
            key={s}
            type="button"
            className="player__speed"
            aria-pressed={rate === s}
            onClick={() => changeRate(s)}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  )
}
