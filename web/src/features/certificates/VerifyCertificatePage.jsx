import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { formatIssuedDate } from './certificatePdf.js'
import './certificates.css'

export default function VerifyCertificatePage() {
  const { code } = useParams()
  const [state, setState] = useState({ loading: true, cert: null, failed: false })

  useEffect(() => {
    let cancelled = false
    supabase.rpc('verify_certificate', { p_code: code }).then(({ data, error }) => {
      if (cancelled) return
      if (error) setState({ loading: false, cert: null, failed: true })
      else setState({ loading: false, cert: data?.[0] ?? null, failed: false })
    })
    return () => {
      cancelled = true
    }
  }, [code])

  const { loading, cert, failed } = state
  if (loading) {
    return (
      <section className="page page--narrow verify-page">
        <p className="loading" role="status">Verificando...</p>
      </section>
    )
  }
  if (failed) {
    return (
      <section className="page page--narrow verify-page">
        <p className="alert alert--danger" role="alert">Não foi possível verificar agora. Tente de novo em instantes.</p>
      </section>
    )
  }

  if (cert?.status === 'active') {
    const hours = `${cert.workload_hours} ${cert.workload_hours === 1 ? 'hora' : 'horas'}`
    return (
      <section className="page page--narrow verify-page">
        <div className="cert-verify cert-verify--valid">
          <div className="cert-verify__head">
            <span className="cert-verify__seal" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
                <path
                  d="m6 12.5 4 4 8-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h1>Certificado válido</h1>
          </div>
          <dl>
            <dt>Nome</dt>
            <dd>{cert.full_name}</dd>
            <dt>Nível</dt>
            <dd>{cert.level_name}</dd>
            <dt>Carga horária</dt>
            <dd>{hours}</dd>
            <dt>Média</dt>
            <dd>{cert.score}%</dd>
            <dt>Emitido em</dt>
            <dd>{formatIssuedDate(cert.issued_at)}</dd>
          </dl>
        </div>
      </section>
    )
  }

  return (
    <section className="page page--narrow verify-page">
      <div className="cert-verify cert-verify--invalid">
        <p>{cert?.status === 'revoked' ? 'Este certificado foi revogado.' : 'Certificado não encontrado.'}</p>
      </div>
    </section>
  )
}
