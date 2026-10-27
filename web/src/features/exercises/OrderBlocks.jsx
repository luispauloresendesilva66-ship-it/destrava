import { useMemo, useState } from 'react'
import ExerciseShell from './ExerciseShell.jsx'

// Embaralha garantindo que a ordem inicial não seja a resposta (quando há mais de um bloco).
function shuffled(n) {
  const idx = Array.from({ length: n }, (_, i) => i)
  for (let tries = 0; tries < 10; tries++) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = idx[i]
      idx[i] = idx[j]
      idx[j] = tmp
    }
    if (n < 2 || idx.some((v, i) => v !== i)) break
  }
  return idx
}

export default function OrderBlocks({ exercise, onSubmit, ...shell }) {
  const { blocks } = exercise.prompt
  const initial = useMemo(() => shuffled(blocks.length), [blocks.length])
  const [placed, setPlaced] = useState([]) // índices dos blocos na ordem escolhida
  const pool = initial.filter((i) => !placed.includes(i))
  return (
    <ExerciseShell
      exercise={exercise}
      title="Coloque os blocos na ordem certa"
      onSubmit={onSubmit}
      getAnswer={() => placed}
      canConfirm={pool.length === 0}
      onReset={() => setPlaced([])}
      {...shell}
    >
      <p className="ex__hint">Toque nos blocos para montar a resposta. Toque de novo para tirar.</p>
      <ol className="ex__blocks ex__blocks--answer" aria-label="Sua resposta">
        {placed.length === 0 && <li className="ex__empty">Nenhum bloco ainda</li>}
        {placed.map((i) => (
          <li key={i}>
            <button
              type="button"
              className="ex__block"
              onClick={() => setPlaced(placed.filter((p) => p !== i))}
            >
              {blocks[i]}
            </button>
          </li>
        ))}
      </ol>
      <ul className="ex__blocks" aria-label="Blocos disponíveis">
        {pool.map((i) => (
          <li key={i}>
            <button type="button" className="ex__block" onClick={() => setPlaced([...placed, i])}>
              {blocks[i]}
            </button>
          </li>
        ))}
      </ul>
    </ExerciseShell>
  )
}
