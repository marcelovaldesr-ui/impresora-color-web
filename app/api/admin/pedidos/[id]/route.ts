import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { verificarTokenSesion } from '@/lib/adminAuth'
import { Resend } from 'resend'
import { escapeHtml } from '@/lib/escapeHtml'

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

interface DatosAviso {
  numero_orden: string
  cliente_nombre: string
  cliente_email: string
  producto_nombre: string
  cantidad: number
}

/** Avisa al cliente que su pedido ya se puede retirar. Lanza si Resend falla. */
async function enviarAvisoListo(p: DatosAviso) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: FROM,
    to: p.cliente_email,
    replyTo: 'contacto@impresoracolor.cl',
    subject: `Tu pedido #${p.numero_orden} está listo para retirar — Impresora Color`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#2D3E9F;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">¡Tu pedido está listo!</h1>
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <p>Hola <strong>${escapeHtml(p.cliente_nombre)}</strong>, ya puedes retirar tu pedido.</p>
          <p style="color:#555;margin:0 0 12px">N° de orden: <strong style="color:#2D3E9F">${escapeHtml(p.numero_orden)}</strong></p>
          <p style="margin:0 0 16px"><strong>${escapeHtml(p.producto_nombre)}</strong> × ${Number(p.cantidad)}</p>
          <div style="background:white;border:1px solid #e0e0e0;border-radius:8px;padding:16px">
            <p style="margin:0 0 6px"><strong>Dónde:</strong> Arauco 1060, Chillán</p>
            <p style="margin:0 0 6px"><strong>Horario:</strong> lunes a viernes de 9:00 a 18:00 horas</p>
            <p style="margin:0"><strong>Para retirar:</strong> indica tu número de orden</p>
          </div>
          <p style="margin-top:16px;color:#555;font-size:13px">Tu pedido queda guardado para retiro por 60 días corridos.</p>
          <p>¿Dudas o alguien más lo retirará por ti? <a href="${WHATSAPP}" style="color:#E91E8F">Escríbenos por WhatsApp</a></p>
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
    .select('estado, numero_orden, cliente_nombre, cliente_email, producto_nombre, cantidad')
    .eq('id', id)
    .maybeSingle()

  const update: Record<string, unknown> = { estado }
  if (notas !== undefined) update.notas = notas

  const { error } = await supabase.from('pedidos').update(update).eq('id', id)
  if (error) return Response.json({ error: 'Error al actualizar.' }, { status: 500 })

  // El estado ya quedó guardado: si el correo falla, no se revierte; se informa al panel.
  let aviso: 'enviado' | 'fallido' | null = null
  if (estado === 'listo' && previo && previo.estado !== 'listo' && previo.cliente_email) {
    try {
      await enviarAvisoListo(previo as DatosAviso)
      aviso = 'enviado'
    } catch (err) {
      console.error('[pedidos] aviso listo', err)
      aviso = 'fallido'
    }
  }

  return Response.json({ ok: true, aviso })
}
