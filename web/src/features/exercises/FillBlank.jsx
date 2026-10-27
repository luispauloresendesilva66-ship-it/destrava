import { useState } from 'react'
import ExerciseShell from './ExerciseShell.jsx'

export default function FillBlank({ exercise, onSubmit, ...shell }) {
  const parts = exercise.prompt.code.split('___')
  const count = parts.length - 1
  const [values, setValues] = useState(() => Array(count).fill(''))
  return (
    <ExerciseShell
      exercise={exercise}
      title="Complete o código"
      onSubmit={onSubmit}
      getAnswer={() => values}
      canConfirm={values.every((v) => v.trim() !== '')}
      onReset={() => setValues(Array(count).fill(''))}
      {...shell}
    >
      <pre className="ex__code">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < count && (
              <input
                className="ex__blank"
                type="text"
                aria-label={`Lacuna ${i + 1}`}
                value={values[i]}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                size={Math.max(4, values[i].length + 1)}
                onChange={(e) => setValues(values.map((v, j) => (j === i ? e.target.value : v)))}
              />
            )}
          </span>
        ))}
      </pre>
    </ExerciseShell>
  )
}
