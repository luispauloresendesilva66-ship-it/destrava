// Regras do certificado: carga horaria fixa por nivel e codigo verificavel.
// ESM puro, sem dependencias (Deno Edge Functions e navegador).

export const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

// round((aulas em min + exercicios + prova) / 60), minimo 1.
export function computeWorkloadHours({ lessonDurationsSeconds, exerciseMinutes, examMinutes }) {
  const lessonSeconds = lessonDurationsSeconds.reduce((sum, s) => sum + s, 0)
  const totalMinutes = lessonSeconds / 60 + exerciseMinutes + examMinutes
  return Math.max(1, Math.round(totalMinutes / 60))
}

// Formato DTV-XXXX-XXXX; indice = byte % tamanho do alfabeto.
export function generateCertificateCode(
  randomBytes = (n) => crypto.getRandomValues(new Uint8Array(n)),
) {
  const bytes = randomBytes(8)
  const chars = Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length])
  return `DTV-${chars.slice(0, 4).join('')}-${chars.slice(4, 8).join('')}`
}
