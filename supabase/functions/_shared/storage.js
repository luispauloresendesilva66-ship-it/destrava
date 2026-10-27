// Assinatura de URLs do Supabase Storage (bucket privado). O client deve ser o service-role.
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
