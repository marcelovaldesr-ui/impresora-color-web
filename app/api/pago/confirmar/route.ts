import { supabase } from '@/lib/supabase'
import { verificarPago } from '@/lib/flow'
import { Resend } from 'resend'
import { NextRequest } from 'next/server'

// Remitente: DEBE ser una dirección de un dominio verificado en Resend.
// La tienda usa su propio remitente (pedidos@) para no mezclarse con las
// cotizaciones del formulario de la web, que salen de cotizaciones@.
// Si RESEND_FROM_PEDIDOS no está definida, cae en el remitente general y,
// como último recurso, en pedidos@impresoracolor.cl.
const FROM =
  process.env.RESEND_FROM_PEDIDOS ??
  process.env.RESEND_FROM_EMAIL ??
  'Impresora Color <pedidos@impresoracolor.cl>'
const TO_INTERNO = process.env.RESEND_TO_EMAIL ?? 'impresoracolor3@gmail.com'
const WHATSAPP = 'https://wa.me/56998441157'

interface FilaPedido {
  id: string
  numero_orden: string
  grupo_orden: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  producto_nombre: string
  opciones: Record<string, string>
  cantidad: number
  precio_total: number
  archivo_url: string | null
  archivo_nombre_original: string | null
  pago_confirmado: boolean
}

// Flow.cl llama a este endpoint con POST cuando el pago se completa.
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
    const flowData = await verificarPago(token)

    const { data: pedidos } = await supabase
      .from('pedidos')
      .select('*')
      .eq('flow_token', token)
      .order('numero_orden', { ascending: true })

    if (!pedidos || pedidos.length === 0) {
      console.error('[confirmar] Pedido no encontrado para token:', token)
      return new Response('not found', { status: 404 })
    }

    const filas = pedidos as FilaPedido[]
    const grupo = filas[0].grupo_orden
    const estadoFlow = Number(flowData?.status ?? 0)

    // status 2 = pagado en Flow.cl · 3 = rechazado · 4 = anulado
    if (estadoFlow === 2) {
      const yaConfirmado = filas.every((p) => p.pago_confirmado)
      if (!yaConfirmado) {
        await supabase
          .from('pedidos')
          .update({
            estado: 'pagado',
            flow_orden: String(flowData.flowOrder ?? ''),
            pago_confirmado: true,
            pago_confirmado_at: new Date().toISOString(),
          })
          .eq('grupo_orden', grupo)

        // Los correos van después de guardar: si Resend falla, la venta igual
        // quedó registrada y visible en el panel.
        try {
          await enviarEmails(filas, grupo)
        } catch (err) {
          console.error('[confirmar] emails', err)
        }
      }
    } else if (estadoFlow === 3 || estadoFlow === 4) {
      await supabase
        .from('pedidos')
        .update({ estado: 'cancelado' })
        .eq('grupo_orden', grupo)
        .eq('pago_confirmado', false)
    }

    return new Response('ok', { status: 200 })
  } catch (err) {
    console.error('[confirmar]', err)
    return new Response('error', { status: 500 })
  }
}

function clp(n: number): string {
  return `$${Number(n).toLocaleString('es-CL')}`
}

/** Si el cliente compró sin subir su diseño, el pedido queda frenado hasta que lo
 *  envíe. Este bloque se lo recuerda con un botón de WhatsApp que ya trae escrito
 *  su número de orden, para que mandarlo le tome segundos. */
function bloqueFaltaArchivo(items: FilaPedido[], grupo: string): string {
  const sinArchivo = items.filter((i) => !i.archivo_url)
  if (sinArchivo.length === 0) return ''

  const texto = encodeURIComponent(
    `Hola, les envío el archivo de mi pedido ${grupo}.`
  )

  return `
    <div style="margin-top:18px;border:2px solid #E91E8F;border-radius:10px;padding:16px;background:#fff">
      <p style="margin:0 0 6px;font-weight:bold;color:#E91E8F;font-size:15px">Nos falta tu archivo de diseño</p>
      <p style="margin:0 0 12px;color:#444;font-size:14px">
        Tu pago está confirmado, pero <strong>no podemos empezar a producir hasta recibir tu diseño</strong>.
        Envíanoslo por WhatsApp y partimos de inmediato.
      </p>
      <a href="${WHATSAPP}?text=${texto}"
         style="display:inline-block;background:#25D366;color:#fff;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:15px">
        Enviar mi archivo por WhatsApp
      </a>
      <p style="margin:12px 0 0;color:#888;font-size:12px">
        Tu número de orden ya viene escrito en el mensaje. Formatos: PDF, AI, EPS, PNG, JPG o TIFF.
      </p>
    </div>`
}

function filasHtml(items: FilaPedido[]): string {
  return items
    .map((i) => {
      const opciones = Object.entries(i.opciones ?? {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(' · ')
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee">
          <strong>${i.producto_nombre}</strong><br>
          <span style="color:#888;font-size:13px">${opciones}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">
          <strong>${clp(i.precio_total)}</strong>
        </td>
      </tr>`
    })
    .join('')
}

async function enviarEmails(items: FilaPedido[], grupo: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const cliente = items[0]
  const total = items.reduce((s, i) => s + Number(i.precio_total), 0)

  // --- Confirmación al cliente ---
  await resend.emails.send({
    from: FROM,
    to: cliente.cliente_email,
    subject: `Pedido confirmado #${grupo} — Impresora Color`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#2D3E9F;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">¡Pedido confirmado!</h1>
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <p>Hola <strong>${cliente.cliente_nombre}</strong>, recibimos tu pago con éxito.</p>
          <p style="color:#555;margin:0 0 12px">N° de orden: <strong style="color:#2D3E9F">${grupo}</strong></p>
          <table style="width:100%;border-collapse:collapse">
            ${filasHtml(items)}
            <tr>
              <td style="padding:12px 0;font-weight:bold">Total pagado (IVA incluido)</td>
              <td style="padding:12px 0;text-align:right;font-weight:bold;font-size:16px">${clp(total)}</td>
            </tr>
          </table>
          ${bloqueFaltaArchivo(items, grupo)}
          <p style="margin-top:16px">Tu pedido estará listo en <strong>2 a 5 días hábiles</strong>. Te avisaremos cuando puedas retirarlo en <strong>Arauco 1060, Chillán</strong>.</p>
          <p>¿Tienes dudas? <a href="${WHATSAPP}" style="color:#E91E8F">Escríbenos por WhatsApp</a></p>
        </div>
        <p style="color:#aaa;font-size:12px;margin-top:16px;text-align:center">Impresora Color Ltda · Arauco 1060, Chillán</p>
      </div>
    `,
  })

  // --- Aviso interno a la imprenta ---
  const archivos = items
    .map((i) =>
      i.archivo_url
        ? `<li><a href="${i.archivo_url}" style="color:#2D3E9F;font-weight:bold">${i.producto_nombre}</a> <small style="color:#888">${i.archivo_nombre_original ?? ''}</small></li>`
        : `<li style="color:#c00">${i.producto_nombre} — SIN ARCHIVO, contactar al cliente</li>`
    )
    .join('')

  await resend.emails.send({
    from: FROM,
    to: TO_INTERNO,
    replyTo: cliente.cliente_email,
    subject: `Nuevo pedido pagado #${grupo} — ${clp(total)}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#E91E8F;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Nuevo pedido pagado</h1>
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            <tr><td style="padding:6px 0;color:#555;width:35%">Orden</td><td style="padding:6px 0;font-weight:bold;color:#E91E8F">${grupo}</td></tr>
            <tr><td style="padding:6px 0;color:#555">Cliente</td><td style="padding:6px 0">${cliente.cliente_nombre}</td></tr>
            <tr><td style="padding:6px 0;color:#555">Teléfono</td><td style="padding:6px 0">${cliente.cliente_telefono}</td></tr>
            <tr><td style="padding:6px 0;color:#555">Email</td><td style="padding:6px 0">${cliente.cliente_email}</td></tr>
          </table>
          <table style="width:100%;border-collapse:collapse">
            ${filasHtml(items)}
            <tr><td style="padding:12px 0;font-weight:bold">Total</td><td style="padding:12px 0;text-align:right;font-weight:bold">${clp(total)}</td></tr>
          </table>
          <p style="margin:18px 0 6px;font-weight:bold;color:#555">Archivos del cliente</p>
          <ul style="margin:0;padding-left:18px">${archivos}</ul>
          ${
            items.some((i) => !i.archivo_url)
              ? `<p style="margin:16px 0 0">
                   <a href="https://wa.me/${(cliente.cliente_telefono ?? '').replace(/\D/g, '').replace(/^(?!56)(\d{9})$/, '56$1')}?text=${encodeURIComponent(
                     `Hola ${cliente.cliente_nombre}, somos Impresora Color. Recibimos tu pedido ${grupo} y ya está pagado. Para empezar la producción necesitamos tu archivo de diseño.`
                   )}"
                      style="display:inline-block;background:#25D366;color:#fff;font-weight:bold;text-decoration:none;padding:10px 18px;border-radius:999px;font-size:14px">
                     Pedirle el archivo por WhatsApp
                   </a>
                 </p>`
              : ''
          }
        </div>
        <p style="color:#aaa;font-size:12px;margin-top:16px;text-align:center">Recuerda emitir la boleta electrónica de este pedido.</p>
      </div>
    `,
  })
}
