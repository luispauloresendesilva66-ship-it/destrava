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
      <section className="course-page">
        <p role="status">Verificando...</p>
      </section>
    )
  }
  if (failed) {
    return (
      <section className="course-page">
        <p role="alert">Não foi possível verificar agora. Tente de novo em instantes.</p>
      </section>
    )
  }

  if (cert?.status === 'active') {
    const hours = `${cert.workload_hours} ${cert.workload_hours === 1 ? 'hora' : 'horas'}`
    return (
      <section className="course-page">
        <div className="cert-verify cert-verify--valid">
          <h1>Certificado válido</h1>
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
    <section className="course-page">
      <div className="cert-verify">
        <p>{cert?.status === 'revoked' ? 'Este certificado foi revogado.' : 'Certificado não encontrado.'}</p>
      </div>
    </section>
  )
}
