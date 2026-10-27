const NIGHT = [38, 33, 92]
const PURPLE = [83, 74, 183]
const LAVENDER = [238, 237, 254]
const GREEN = [151, 196, 89]

export const CERTIFICATE_FOOTER =
  'Curso livre de formação inicial e continuada, conforme a Lei nº 9.394/96 e o Decreto nº 5.154/2004.'

export function formatIssuedDate(issuedAt) {
  // America/Sao_Paulo é UTC−3 fixo (sem horário de verão).
  const d = new Date(new Date(issuedAt).getTime() - 3 * 60 * 60 * 1000)
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${d.getUTCFullYear()}`
}

export function buildCertificateLines({ fullName, levelName, workloadHours, score, issuedAt, code }) {
  const hours = `${workloadHours} ${workloadHours === 1 ? 'hora' : 'horas'}`
  return [
    `Certificamos que ${fullName}`,
    `concluiu o nível ${levelName} da Destrava`,
    `com carga horária de ${hours} e média ${score}%.`,
    `Emitido em ${formatIssuedDate(issuedAt)} · Código ${code}`,
  ]
}

// Reduz a fonte (já em negrito) até o texto caber em uma linha; piso de minSize.
export function fitFontSize(doc, text, maxWidth, startSize = 30, minSize = 16) {
  let size = startSize
  doc.setFontSize(size)
  while (size > minSize && doc.getTextWidth(text) > maxWidth) {
    size -= 1
    doc.setFontSize(size)
  }
  return size
}

function drawLogo(doc, x, y, h) {
  // "d com buraco de fechadura" em primitivas; o desenho original mede 66x88.
  const s = h / 88
  doc.setFillColor(...PURPLE)
  doc.circle(x + 32 * s, y + 56 * s, 32 * s, 'F')
  doc.roundedRect(x + 52 * s, y, 14 * s, 88 * s, 7 * s, 7 * s, 'F')
  doc.setFillColor(...GREEN)
  doc.circle(x + 32 * s, y + 50 * s, 9 * s, 'F')
  doc.triangle(x + 28 * s, y + 55 * s, x + 36 * s, y + 55 * s, x + 40 * s, y + 74 * s, 'F')
  doc.triangle(x + 28 * s, y + 55 * s, x + 40 * s, y + 74 * s, x + 24 * s, y + 74 * s, 'F')
}

export async function downloadCertificatePdf(cert) {
  const [{ jsPDF }, qrcode] = await Promise.all([import('jspdf'), import('qrcode')])
  const QR = qrcode.default ?? qrcode
  const url = `${window.location.origin}/certificado/${cert.code}`
  const qr = await QR.toDataURL(url, { margin: 1, width: 240 })

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const W = 297
  const H = 210

  // Estampa: moldura dupla.
  doc.setFillColor(...LAVENDER)
  doc.rect(0, 0, W, H, 'F')
  doc.setFillColor(255, 255, 255)
  doc.rect(8, 8, W - 16, H - 16, 'F')
  doc.setDrawColor(...PURPLE)
  doc.setLineWidth(1.2)
  doc.rect(10, 10, W - 20, H - 20)
  doc.setLineWidth(0.3)
  doc.rect(13, 13, W - 26, H - 26)

  // Logo + marca.
  drawLogo(doc, W / 2 - 40, 22, 20)
  doc.setTextColor(...NIGHT)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.text('destrava', W / 2 - 24, 38)

  doc.setFontSize(30)
  doc.text('CERTIFICADO DE CONCLUSÃO', W / 2, 66, { align: 'center' })

  const [l1, l2, l3, l4] = buildCertificateLines(cert)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(16)
  doc.text(l1.slice(0, l1.length - cert.fullName.length).trim(), W / 2, 86, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...PURPLE)
  fitFontSize(doc, cert.fullName, W - 60)
  doc.text(cert.fullName, W / 2, 102, { align: 'center' })
  doc.setTextColor(...NIGHT)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(18)
  doc.text(l2, W / 2, 118, { align: 'center', maxWidth: W - 60 })
  doc.text(l3, W / 2, 128, { align: 'center' })

  // Selo (verde só aparece em conquista: este é o certificado de uma aprovação).
  doc.setFillColor(...GREEN)
  doc.circle(50, 160, 17, 'F')
  doc.setDrawColor(255, 255, 255)
  doc.setLineWidth(0.8)
  doc.circle(50, 160, 14)
  doc.setTextColor(...NIGHT)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('APROVADO', 50, 161.5, { align: 'center' })

  // QR de verificação.
  doc.addImage(qr, 'PNG', W - 62, 140, 32, 32)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('Verifique a autenticidade', W - 46, 176, { align: 'center' })

  doc.setFontSize(12)
  doc.setTextColor(...NIGHT)
  doc.text(l4, W / 2, 160, { align: 'center' })
  doc.setFontSize(9)
  doc.text(url, W / 2, 167, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...NIGHT)
  doc.text(CERTIFICATE_FOOTER, W / 2, 182, { align: 'center' })

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(11)
  doc.setTextColor(...PURPLE)
  doc.text('Destrava sua carreira. Um nível de cada vez.', W / 2, 190, { align: 'center' })

  doc.save(`certificado-${cert.code}.pdf`)
  return doc
}
