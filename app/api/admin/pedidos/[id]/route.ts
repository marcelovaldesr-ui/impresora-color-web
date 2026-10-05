import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { verificarTokenSesion } from '@/lib/adminAuth'
import { Resend } from 'resend'
import { escapeHtml } from '@/lib/escapeHtml'
import { avisarListoPorWhatsapp, type ResultadoWhatsapp } from '@/lib/avisoWhatsapp'

async function autenticado(): Promise<boolean> {
  const jar = await cookies()
  return verificarTokenSesion(jar.get('admin_ic')?.value)
}

const ESTADOS_VALIDOS = [
  'pendiente_pago',
  'pagado',
  'en_produccion',
  'listo',
  'entregado',
  'cancelado',
]

// Mismo remitente que los correos de la tienda (dominio verificado en Resend).
const FROM =
  process.env.RESEND_FROM_PEDIDOS ??
  process.env.RESEND_FROM_EMAIL ??
  'Impresora Color <pedidos@impresoracolor.cl>'
const WHATSAPP = 'https://wa.me/56998441157'

interface ItemAviso {
  producto_nombre: string
  cantidad: number
}

interface DatosAviso {
  numero_orden: string // número de orden del grupo (el mismo que ve el cliente en su confirmación)
  cliente_nombre: string
  cliente_email: string
  items: ItemAviso[]
}

/** Avisa al cliente que su pedido ya se puede retirar. Lanza si Resend falla. */
async function enviarAvisoListo(p: DatosAviso) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: FROM,
    to: p.cliente_email,
    replyTo: 'contacto@impresoracolor.cl',
    subject: `Tu pedido #${p.numero_orden} está listo para retirar — Impresora Color`,
    // Versión de texto plano: un correo solo-HTML puntúa peor en los filtros de spam.
    text: [
      `Hola ${p.cliente_nombre}, tu pedido ya está listo para retirar.`,
      `N° de orden: ${p.numero_orden}`,
      ...p.items.map((i) => `- ${i.producto_nombre} x ${Number(i.cantidad)}`),
      '',
      'Dónde: Arauco 1060, Chillán',
      'Horario: lunes a viernes de 9:00 a 18:00 horas',
      'Para retirar: indica tu número de orden.',
      'Tu pedido queda guardado para retiro por 60 días corridos.',
      '',
      `¿Dudas? Escríbenos por WhatsApp: ${WHATSAPP}`,
      'Impresora Color Ltda · Arauco 1060, Chillán',
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#2D3E9F;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">¡Tu pedido está listo!</h1>
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <p>Hola <strong>${escapeHtml(p.cliente_nombre)}</strong>, ya puedes retirar tu pedido.</p>
          <p style="color:#555;margin:0 0 12px">N° de orden: <strong style="color:#2D3E9F">${escapeHtml(p.numero_orden)}</strong></p>
          <p style="margin:0 0 16px">${p.items
            .map((i) => `<strong>${escapeHtml(i.producto_nombre)}</strong> × ${Number(i.cantidad)}`)
            .join('<br>')}</p>
          <div style="background:white;border:1px solid #e0e0e0;border-radius:8px;padding:16px">
            <p style="margin:0 0 6px"><strong>Dónde:</strong> Arauco 1060, Chillán</p>
            <p style="margin:0 0 6px"><strong>Horario:</strong> lunes a viernes de 9:00 a 18:00 horas</p>
            <p style="margin:0"><strong>Para retirar:</strong> indica tu número de orden</p>
          </div>
          <p style="margin-top:16px;color:#555;font-size:13px">Tu pedido queda guardado para retiro por 60 días corridos.</p>
          <p>¿Dudas o alguien más lo retirará por ti? <a href="${WHATSAPP}" style="color:#E91E8F">Escríbenos por WhatsApp</a></p>
          <p style="color:#777;font-size:12px;margin-top:16px">Para no perderte nuestros avisos, agrega <strong>pedidos@impresoracolor.cl</strong> a tus contactos. Si algún correo nuestro llega a la carpeta de correo no deseado, márcalo como &quot;No es correo no deseado&quot;.</p>
        </div>
        <p style="color:#aaa;font-size:12px;margin-top:16px;text-align:center">Impresora Color Ltda · Arauco 1060, Chillán</p>
      </div>
    `,
  })
  if (error) throw new Error(error.message)
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await autenticado())) {
    return Response.json({ error: 'No autorizado.' }, { status: 401 })
  }

  const { id } = await ctx.params
  const { estado, notas } = await req.json()

  if (!ESTADOS_VALIDOS.includes(estado)) {
    return Response.json({ error: 'Estado inválido.' }, { status: 400 })
  }

  // Estado previo: el aviso "listo" se manda solo en la transición hacia 'listo',
  // así un doble clic o un reintento no le repite el correo al cliente.
  const { data: previo } = await supabase
    .from('pedidos')
    .select('estado, grupo_orden, cliente_nombre, cliente_email, cliente_telefono')
    .eq('id', id)
    .maybeSingle()

  const update: Record<string, unknown> = { estado }
  if (notas !== undefined) update.notas = notas

  const { error } = await supabase.from('pedidos').update(update).eq('id', id)
  if (error) return Response.json({ error: 'Error al actualizar.' }, { status: 500 })

  // El estado ya quedó guardado: si un aviso falla, no se revierte; se informa al panel.
  // Un carrito con varios productos es UN solo retiro: el aviso sale una vez, cuando el
  // último producto del grupo queda listo, con la lista completa y el número de orden
  // que el cliente ya vio en su confirmación de compra.
  let email: 'enviado' | 'fallido' | null = null
  let whatsapp: ResultadoWhatsapp | null = null
  let pendientes = 0
  if (estado === 'listo' && previo && previo.estado !== 'listo') {
    const { data: grupo } = await supabase
      .from('pedidos')
      .select('estado, producto_nombre, cantidad')
      .eq('grupo_orden', previo.grupo_orden)
    const activos = (grupo ?? []).filter((g) => g.estado !== 'cancelado')
    pendientes = activos.filter((g) => g.estado !== 'listo' && g.estado !== 'entregado').length

    if (pendientes === 0 && activos.length > 0) {
      const items = activos.map((g) => ({ producto_nombre: g.producto_nombre as string, cantidad: Number(g.cantidad) }))
      const [r1, r2] = await Promise.allSettled([
        previo.cliente_email
          ? enviarAvisoListo({
              numero_orden: previo.grupo_orden,
              cliente_nombre: previo.cliente_nombre,
              cliente_email: previo.cliente_email,
              items,
            })
          : Promise.reject(new Error('sin email')),
        avisarListoPorWhatsapp({
          id: previo.grupo_orden,
          numero_orden: previo.grupo_orden,
          cliente_nombre: previo.cliente_nombre,
          cliente_telefono: previo.cliente_telefono,
          producto_nombre: items.map((i) => `${i.producto_nombre} × ${i.cantidad}`).join(', '),
        }),
      ])
      if (r1.status === 'fulfilled') email = 'enviado'
      else {
        console.error('[pedidos] aviso listo (email)', r1.reason)
        email = 'fallido'
      }
      whatsapp = r2.status === 'fulfilled' ? r2.value : 'fallido'
    }
  }

  return Response.json({ ok: true, aviso: { email, whatsapp, pendientes } })
}
