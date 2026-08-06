import { supabase } from '@/lib/supabase'
import { crearPago } from '@/lib/flow'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  let grupoOrden: unknown
  try {
    ;({ grupoOrden } = await req.json())
  } catch {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  if (typeof grupoOrden !== 'string' || !/^IC\d{6}-\d{4}$/.test(grupoOrden)) {
    return Response.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const { data: pedidos, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('grupo_orden', grupoOrden)
    .order('numero_orden', { ascending: true })

  if (error || !pedidos || pedidos.length === 0) {
    return Response.json({ error: 'Pedido no encontrado.' }, { status: 404 })
  }

  if (pedidos.some((p) => p.pago_confirmado)) {
    return Response.json({ error: 'Este pedido ya fue pagado.' }, { status: 409 })
  }

  // El monto sale de la base de datos, que a su vez se llenó con precios
  // calculados en el servidor. Nunca de la petición del cliente.
  const total = pedidos.reduce((s, p) => s + Number(p.precio_total), 0)
  if (!Number.isFinite(total) || total <= 0) {
    return Response.json({ error: 'Monto del pedido inválido.' }, { status: 400 })
  }

  // OJO con el www: vercel.json redirige www.impresoracolor.cl -> impresoracolor.cl
  // con un 308 permanente. El navegador sigue esa redireccion, pero Flow NO: si le
  // pasamos la urlConfirmation con www, su webhook recibe 308, lo da por fallido y
  // el pedido nunca se marca como pagado ni se envian los correos.
  // Por eso el host canonico se fuerza aca, sin depender de como este cargada la variable.
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://impresoracolor.cl')
    .replace(/\/+$/, '')
    .replace(/^(https?:\/\/)www\./i, '$1')
  const subject =
    pedidos.length === 1
      ? `Pedido ${grupoOrden} — ${pedidos[0].producto_nombre}`
      : `Pedido ${grupoOrden} — ${pedidos.length} productos`

  try {
    const { url, token } = await crearPago({
      comercioOrder: grupoOrden,
      subject: subject.slice(0, 240),
      amount: total,
      email: pedidos[0].cliente_email,
      urlReturn: `${baseUrl}/api/pago/retorno`,
      urlConfirmation: `${baseUrl}/api/pago/confirmar`,
    })

    await supabase.from('pedidos').update({ flow_token: token }).eq('grupo_orden', grupoOrden)

    return Response.json({ url })
  } catch (err) {
    console.error('[pago/iniciar]', err)
    return Response.json(
      { error: 'No pudimos conectar con el sistema de pagos. Intenta de nuevo o escríbenos por WhatsApp.' },
      { status: 502 }
    )
  }
}
