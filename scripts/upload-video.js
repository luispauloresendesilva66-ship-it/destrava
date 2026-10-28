// Envia um vídeo de aula para o bucket do Backblaze B2 (S3, path-style).
// Uso: node scripts/upload-video.js <arquivo.mp4> <chave no bucket, ex.: N1/a02.mp4>
// Lê B2_UPLOAD_KEY_ID e B2_UPLOAD_APPLICATION_KEY de .env.upload (chave com permissão de escrita,
// separada da chave somente-leitura que a Edge Function usa) e B2_BUCKET/B2_ENDPOINT/B2_REGION
// de supabase/functions/.env.
import { readFileSync, statSync } from 'node:fs'
import dotenv from 'dotenv'
import { AwsClient } from 'aws4fetch'

dotenv.config({ path: '.env.upload', quiet: true })
dotenv.config({ path: 'supabase/functions/.env', quiet: true })

const [, , src, key] = process.argv
if (!src || !key) {
  console.error('Uso: node scripts/upload-video.js <arquivo.mp4> <N1/a02.mp4>')
  process.exit(1)
}
const { B2_UPLOAD_KEY_ID, B2_UPLOAD_APPLICATION_KEY, B2_BUCKET, B2_ENDPOINT } = process.env
if (!B2_UPLOAD_KEY_ID || !B2_UPLOAD_APPLICATION_KEY || !B2_BUCKET || !B2_ENDPOINT) {
  console.error('Faltam variáveis: preencha .env.upload e supabase/functions/.env.')
  process.exit(1)
}

const client = new AwsClient({
  accessKeyId: B2_UPLOAD_KEY_ID,
  secretAccessKey: B2_UPLOAD_APPLICATION_KEY,
  service: 's3',
  region: process.env.B2_REGION || 'us-east-005',
})
const path = key.split('/').map(encodeURIComponent).join('/')
const url = `https://${B2_ENDPOINT}/${B2_BUCKET}/${path}`
const type = key.endsWith('.vtt') ? 'text/vtt' : 'video/mp4'

const res = await client.fetch(url, {
  method: 'PUT',
  body: readFileSync(src),
  headers: { 'Content-Type': type },
})
if (!res.ok) {
  console.error(`Falhou (${res.status}): ${(await res.text()).slice(0, 300)}`)
  process.exit(1)
}
console.log(`Enviado ${key} (${(statSync(src).size / 1e6).toFixed(1)} MB)`)
