// Utilidades HTTP das Edge Functions. Sem Deno.env aqui: o index.ts injeta os clientes.

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export class HttpError extends Error {
  constructor(status, message, code = undefined, extra = {}) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
    this.extra = extra
  }
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function errorResponse(err) {
  if (err instanceof HttpError) {
    const body = { error: err.message }
    if (err.code !== undefined) body.code = err.code
    return json({ ...body, ...err.extra }, err.status)
  }
  console.error(err)
  return json({ error: 'Erro inesperado. Tente de novo.' }, 500)
}

// authClient: cliente supabase-js (anon key) criado no index.ts.
// Devolve um handler (req) => Response; chama handler({ req, userId }).
export function withAuth(handler, authClient) {
  return async (req) => {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders })
    try {
      const header = req.headers.get('Authorization') ?? ''
      const jwt = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
      if (!jwt) throw new HttpError(401, 'Faça login para continuar.')
      const { data, error } = await authClient.auth.getUser(jwt)
      if (error || !data?.user) throw new HttpError(401, 'Faça login para continuar.')
      return await handler({ req, userId: data.user.id })
    } catch (err) {
      return errorResponse(err)
    }
  }
}
