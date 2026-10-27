import { describe, it, expect, vi } from 'vitest'

const doc = vi.hoisted(() => {
  const d = {}
  for (const m of ['setFillColor', 'setDrawColor', 'setLineWidth', 'setTextColor', 'setFont', 'setFontSize', 'rect', 'roundedRect', 'circle', 'triangle', 'text', 'addImage']) d[m] = vi.fn()
  d.save = vi.fn()
  return d
})
vi.mock('jspdf', () => ({ jsPDF: vi.fn(() => doc) }))
const toDataURL = vi.hoisted(() => vi.fn(async () => 'data:image/png;base64,AAAA'))
vi.mock('qrcode', () => ({ default: { toDataURL } }))

import { downloadCertificatePdf } from './certificatePdf.js'

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
  })
})
