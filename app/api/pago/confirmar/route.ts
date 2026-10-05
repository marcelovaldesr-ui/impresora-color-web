import { NextRequest } from 'next/server'
import { procesarPagoFlow } from '@/lib/procesarPagoFlow'

// Flow.cl llama a este endpoint con POST cuando el pago se completa.
// Toda la lógica vive en lib/procesarPagoFlow.ts (compartida con la
// reconciliación manual del panel).
export async function POST(req: NextRequest) {
  let token: string | null = null
  try {
    const formData = await req.formData()
    token = (formData.get('token') as string | null) ?? null
  } catch {
    return new Response('bad request', { status: 400 })
  }

  if (!token) return new Response('missing token', { status: 400 })

  try {
    const r = await procesarPagoFlow(token)
    return new Response(r.texto, { status: r.status })
  } catch (err) {
    console.error('[confirmar]', err)
    return new Response('error', { status: 500 })
  }
}
