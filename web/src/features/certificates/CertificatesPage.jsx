import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useSession } from '../auth/useSession.js'
import { downloadCertificatePdf, formatIssuedDate } from './certificatePdf.js'
import { LOCKED_CERTIFICATE_MESSAGE } from './messages.js'
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
    <section className="page">
      <h1>Meus certificados</h1>
      {!certs && !error && <p className="loading" role="status">Carregando...</p>}
      {error && (
        <div className="alert alert--danger" role="alert">
          <p>{error}</p>
        </div>
      )}
      {certs && certs.length === 0 && (
        <p className="empty-state">Você ainda não tem certificados. Passe na prova de um nível para conquistar o primeiro.</p>
      )}
      {certs && certs.length > 0 && (
        <ul className="cert-list">
          {certs.map((c) => (
            <li key={c.code} className="cert-item">
              <span
                className={`cert-item__icon${c.status === 'active' ? ' cert-item__icon--active' : ''}`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" focusable="false">
                  <circle cx="12" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="cert-item__body">
                <h2>{c.levels?.name}</h2>
                <p className="cert-item__meta">
                  Emitido em {formatIssuedDate(c.issued_at)} · Código {c.code}
                </p>
              </div>
              {c.status === 'active' ? (
                <button
                  type="button"
                  className="btn btn--primary cert-item__action"
                  disabled={busy === c.code}
                  onClick={() => download(c)}
                >
                  Baixar PDF
                </button>
              ) : (
                <p className="cert-item__locked">{LOCKED_CERTIFICATE_MESSAGE}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
