import { supabase } from '@/lib/supabase'
import { verificarPago } from '@/lib/flow'
import { NextRequest } from 'next/server'

// Flow devuelve al pagador a esta URL después del pago.
// Se aceptan GET y POST porque Flow ha usado ambos según el método de pago.
// Importante: NO usamos redirect() de next/navigation acá — funciona lanzando
// una excepción y cualquier try/catch alrededor la convertiría en un error.
// Se responde con un 303 explícito, que además fuerza que el navegador
// haga GET a /confirmacion aunque haya llegado por POST.

export async function GET(req: NextRequest) {
  return responder(req.nextUrl.searchParams.get('token'), req)
}

export async function POST(req: NextRequest) {
  let token: string | null = null
  try {
    const form = await req.formData()
    token = (form.get('token') as string | null) ?? null
  } catch {
    // Flow puede no mandar body en algunos casos
  }
  if (!token) token = req.nextUrl.searchParams.get('token')
  return responder(token, req)
}

async function responder(token: string | null, req: NextRequest) {
  const destino = await resolverDestino(token)
  return new Response(null, {
    status: 303,
    headers: { Location: new URL(destino, req.nextUrl.origin).toString() },
  })
}

async function resolverDestino(token: string | null): Promise<string> {
  if (!token) return '/confirmacion?error=true'

  try {
    const [flowData, { data: pedido }] = await Promise.all([
      verificarPago(token),
      supabase.from('pedidos').select('grupo_orden').eq('flow_token', token).limit(1).maybeSingle(),
    ])

    if (pedido?.grupo_orden) {
      const estado = Number(flowData?.status ?? 0)
      return `/confirmacion?orden=${encodeURIComponent(pedido.grupo_orden)}&estado=${estado}`
    }
  } catch (err) {
    console.error('[pago/retorno]', err)
  }

  return '/confirmacion?error=true'
}
