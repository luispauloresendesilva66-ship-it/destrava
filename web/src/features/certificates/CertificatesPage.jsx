import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useSession } from '../auth/useSession.js'
import { downloadCertificatePdf, formatIssuedDate } from './certificatePdf.js'
import './certificates.css'

export default function CertificatesPage() {
  const { session } = useSession()
  const [certs, setCerts] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')
  const userId = session?.user?.id

  const load = useCallback(async () => {
    setError('')
    const { data, error: err } = await supabase
      .from('certificates')
      .select('code, full_name, workload_hours, score, status, issued_at, levels(name, position)')
      .eq('user_id', userId)
    if (err) {
      setError('Não foi possível carregar seus certificados.')
      return
    }
    setCerts(
      [...(data ?? [])]
        .filter((c) => c.status !== 'revoked')
        .sort((a, b) => (a.levels?.position ?? 0) - (b.levels?.position ?? 0)),
    )
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  async function download(c) {
    setBusy(c.code)
    setError('')
    try {
      await downloadCertificatePdf({
        fullName: c.full_name,
        levelName: c.levels?.name ?? '',
        workloadHours: c.workload_hours,
        score: c.score,
        issuedAt: c.issued_at,
        code: c.code,
      })
    } catch {
      setError('Não foi possível gerar o PDF. Tente de novo.')
    } finally {
      setBusy('')
    }
  }

  return (
    <section className="course-page">
      <h1>Meus certificados</h1>
      {!certs && !error && <p role="status">Carregando...</p>}
      {error && (
        <div className="course-error" role="alert">
          <p>{error}</p>
        </div>
      )}
      {certs && certs.length === 0 && (
        <p>Você ainda não tem certificados. Passe na prova de um nível para conquistar o primeiro.</p>
      )}
      {certs && certs.length > 0 && (
        <ul className="cert-list">
          {certs.map((c) => (
            <li key={c.code} className="cert-item">
              <h2>{c.levels?.name}</h2>
              <p>
                Emitido em {formatIssuedDate(c.issued_at)} · Código {c.code}
              </p>
              {c.status === 'active' ? (
                <button
                  type="button"
                  className="course-button"
                  disabled={busy === c.code}
                  onClick={() => download(c)}
                >
                  Baixar PDF
                </button>
              ) : (
                <p>Certificado conquistado! Destrave por R$ 39 ou assine o Gold.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
