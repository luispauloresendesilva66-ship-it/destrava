import { useState } from 'react'
import ExerciseShell from './ExerciseShell.jsx'

export default function MultipleChoice({ exercise, onSubmit, ...shell }) {
  const [choice, setChoice] = useState(null)
  const { question, options } = exercise.prompt
  return (
    <ExerciseShell
      exercise={exercise}
      title={question}
      onSubmit={onSubmit}
      getAnswer={() => choice}
      canConfirm={choice !== null}
      onReset={() => setChoice(null)}
      {...shell}
    >
      <div role="radiogroup" aria-label={question} className="ex__options">
        {options.map((option, i) => (
          <label key={i} className={`ex__option${choice === i ? ' ex__option--on' : ''}`}>
            <input
              type="radio"
              name={`mc-${exercise.id}`}
              checked={choice === i}
              onChange={() => setChoice(i)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </ExerciseShell>
  )
}
