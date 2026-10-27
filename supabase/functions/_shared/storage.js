import { AwsClient } from 'aws4fetch'

// Fallback: assinatura de URLs do Supabase Storage (bucket privado). O client deve ser o service-role.
export function createStoragePresign(serviceClient, bucket = 'lesson-videos') {
  return async function presign(key, expiresSeconds) {
    const { data, error } = await serviceClient.storage
      .from(bucket)
      .createSignedUrl(key, expiresSeconds)
    if (error) throw error
    if (!data?.signedUrl) throw new Error('Storage não devolveu a URL assinada.')
    return data.signedUrl
  }
}

// Principal: URL assinada (S3, path-style) em Backblaze B2 ou qualquer storage compatível com S3.
export function createS3Presign({ accessKeyId, secretAccessKey, endpoint, region, bucket }) {
  const client = new AwsClient({ accessKeyId, secretAccessKey, service: 's3', region })
  return async function presign(key, expiresSeconds) {
    const path = key.split('/').map(encodeURIComponent).join('/')
    const url = `https://${endpoint}/${bucket}/${path}`
    const signed = await client.sign(`${url}?X-Amz-Expires=${expiresSeconds}`, {
      method: 'GET',
      aws: { signQuery: true },
    })
    return signed.url
  }
}

// env: objeto simples (ex.: { B2_KEY_ID, ... }), não Deno.env. B2 completo => B2; senão Supabase.
export function selectPresign(env, serviceClient) {
  const { B2_KEY_ID, B2_APPLICATION_KEY, B2_BUCKET, B2_ENDPOINT, B2_REGION } = env
  if (B2_KEY_ID && B2_APPLICATION_KEY && B2_BUCKET && B2_ENDPOINT) {
    return createS3Presign({
      accessKeyId: B2_KEY_ID,
      secretAccessKey: B2_APPLICATION_KEY,
      endpoint: B2_ENDPOINT,
      region: B2_REGION || 'us-east-005',
      bucket: B2_BUCKET,
    })
  }
  return createStoragePresign(serviceClient)
}
