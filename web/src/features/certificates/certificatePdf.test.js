import { describe, it, expect } from 'vitest'
import { buildCertificateLines } from './certificatePdf.js'

const base = {
  fullName: 'Ana Souza',
  levelName: 'Primeiro Commit',
  workloadHours: 10,
  score: 94,
  issuedAt: '2026-10-27T15:00:00Z',
  code: 'DTV-7K2M-QX9P',
}

describe('buildCertificateLines', () => {
  it('monta as linhas na ordem', () => {
    expect(buildCertificateLines(base)).toEqual([
      'Certificamos que Ana Souza',
      'concluiu o nível Primeiro Commit da Destrava',
      'com carga horária de 10 horas e média 94%.',
      'Emitido em 27/10/2026 · Código DTV-7K2M-QX9P',
    ])
  })
  it('singular para 1 hora', () => {
    expect(buildCertificateLines({ ...base, workloadHours: 1 })[2]).toBe(
      'com carga horária de 1 hora e média 94%.',
    )
  })
  it('data no fuso de São Paulo (madrugada UTC vira dia anterior)', () => {
    expect(buildCertificateLines({ ...base, issuedAt: '2026-10-28T01:00:00Z' })[3]).toContain('27/10/2026')
  })
})
