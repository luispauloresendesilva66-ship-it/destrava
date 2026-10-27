import { describe, it, expect, vi } from 'vitest'

const doc = vi.hoisted(() => {
  const d = {}
  for (const m of ['setFillColor', 'setDrawColor', 'setLineWidth', 'setTextColor', 'setFont', 'setFontSize', 'rect', 'roundedRect', 'circle', 'triangle', 'text', 'addImage']) d[m] = vi.fn()
  d.save = vi.fn()
  d.getTextWidth = vi.fn(() => 10)
  return d
})
vi.mock('jspdf', () => ({ jsPDF: vi.fn(() => doc) }))
const toDataURL = vi.hoisted(() => vi.fn(async () => 'data:image/png;base64,AAAA'))
vi.mock('qrcode', () => ({ default: { toDataURL } }))

import { downloadCertificatePdf, CERTIFICATE_FOOTER } from './certificatePdf.js'

describe('downloadCertificatePdf', () => {
  it('gera QR de verificação e salva o PDF', async () => {
    await downloadCertificatePdf({
      fullName: 'Ana Souza',
      levelName: 'Primeiro Commit',
      workloadHours: 10,
      score: 94,
      issuedAt: '2026-10-27T15:00:00Z',
      code: 'DTV-7K2M-QX9P',
    })
    expect(toDataURL).toHaveBeenCalledWith(
      `${window.location.origin}/certificado/DTV-7K2M-QX9P`,
      expect.anything(),
    )
    expect(doc.save).toHaveBeenCalledWith('certificado-DTV-7K2M-QX9P.pdf')
    expect(doc.text).toHaveBeenCalledWith(CERTIFICATE_FOOTER, 148.5, 182, { align: 'center' })
  })

  it('encolhe a fonte de nomes longos para caber em uma linha', async () => {
    const fullName = 'Maria Aparecida dos Santos Oliveira Pereira'
    let size = 12
    doc.setFontSize.mockImplementation((n) => {
      size = n
    })
    // largura proporcional ao tamanho: ~0,6 mm por caractere por 3 pt de fonte
    doc.getTextWidth.mockImplementation((t) => t.length * size * 0.2)
    doc.text.mockClear()
    const sizes = []
    doc.text.mockImplementation((t) => {
      if (t === fullName) sizes.push({ size, width: t.length * size * 0.2 })
    })
    await downloadCertificatePdf({
      fullName,
      levelName: 'Primeiro Commit',
      workloadHours: 10,
      score: 94,
      issuedAt: '2026-10-27T15:00:00Z',
      code: 'DTV-7K2M-QX9P',
    })
    expect(sizes).toHaveLength(1)
    expect(sizes[0].size).toBeLessThan(30)
    expect(sizes[0].size).toBeGreaterThanOrEqual(16)
    expect(sizes[0].width).toBeLessThanOrEqual(237)
    expect(doc.text.mock.calls.find((c) => c[0] === fullName)[3]).not.toHaveProperty('maxWidth')
  })
})
