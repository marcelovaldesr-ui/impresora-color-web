import { supabase } from '@/lib/supabase'
import { crearPago } from '@/lib/flow'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { pedidoId } = await req.json()

  const { data: pedido, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('id', pedidoId)
    .single()

  if (error || !pedido) {
    return Response.json({ error: 'Pedido no encontrado.' }, { status: 404 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.impresoracolor.cl'

  try {
    const { url, token } = await crearPago({
      comercioOrder: pedido.numero_orden,
      subject: `Pedido ${pedido.numero_orden} — ${pedido.producto_nombre}`,
      amount: pedido.precio_total,
      email: pedido.cliente_email,
      urlReturn: `${baseUrl}/api/pago/retorno`,
      urlConfirmation: `${baseUrl}/api/pago/confirmar`,
    })

    await supabase.from('pedidos').update({ flow_token: token }).eq('id', pedidoId)

    return Response.json({ url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al iniciar el pago'
    console.error('[pago/iniciar]', err)
    return Response.json({ error: msg }, { status: 500 })
  }
}
