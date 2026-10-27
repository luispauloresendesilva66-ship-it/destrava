import { useEffect, useMemo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import ExerciseShell from './ExerciseShell.jsx'
import { buildPreviewDoc } from './runInBrowser.js'

const FILES = {
  html: { label: 'HTML', extension: () => htmlLang() },
  css: { label: 'CSS', extension: () => cssLang() },
  js: { label: 'JS', extension: () => javascript() },
}

export default function CodeExercise({ exercise, onSubmit, ...shell }) {
  const { statement, starter } = exercise.prompt
  const tabs = useMemo(() => {
    const keys = Object.keys(FILES).filter((k) => k in (starter ?? {}))
    return keys.length ? keys : ['html']
  }, [starter])
  const initial = useMemo(
    () => ({ html: starter?.html ?? '', css: starter?.css ?? '', js: starter?.js ?? '' }),
    [starter],
  )
  const [files, setFiles] = useState(initial)
  const [tab, setTab] = useState(tabs[0])
  const [previewDoc, setPreviewDoc] = useState(() => buildPreviewDoc(initial))

  // Pré-visualização ao vivo, com um pequeno atraso para não recarregar a cada tecla.
  useEffect(() => {
    const id = setTimeout(() => setPreviewDoc(buildPreviewDoc(files)), 400)
    return () => clearTimeout(id)
  }, [files])

  return (
    <ExerciseShell
      exercise={exercise}
      title={statement}
      onSubmit={onSubmit}
      getAnswer={() => files}
      canConfirm
      confirmLabel="Testar"
      {...shell}
    >
      <div className="ex__tabs" role="tablist" aria-label="Arquivos">
        {tabs.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className="ex__tab"
            onClick={() => setTab(key)}
          >
            {FILES[key].label}
          </button>
        ))}
      </div>
      <CodeMirror
        key={tab}
        className="ex__editor"
        value={files[tab]}
        height="200px"
        extensions={[FILES[tab].extension()]}
        basicSetup={{ lineNumbers: true, foldGutter: false }}
        aria-label={`Editor de ${FILES[tab].label}`}
        onChange={(value) => setFiles((f) => ({ ...f, [tab]: value }))}
      />
      <p className="ex__hint">Pré-visualização</p>
      <iframe
        className="ex__preview"
        title="Pré-visualização"
        sandbox="allow-scripts"
        srcDoc={previewDoc}
      />
    </ExerciseShell>
  )
}
