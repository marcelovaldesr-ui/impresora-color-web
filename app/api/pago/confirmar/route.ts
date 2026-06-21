import { supabase } from '@/lib/supabase'
import { verificarPago } from '@/lib/flow'
import { Resend } from 'resend'
import { NextRequest } from 'next/server'

// Flow.cl llama a este endpoint con POST cuando el pago se completa
export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const formData = await req.formData()
  const token = formData.get('token') as string | null

  if (!token) return new Response('missing token', { status: 400 })

  try {
    const flowData = await verificarPago(token)

    const { data: pedido } = await supabase
      .from('pedidos')
      .select('*')
      .eq('flow_token', token)
      .single()

    if (!pedido) {
      console.error('[confirmar] Pedido no encontrado para token:', token)
      return new Response('not found', { status: 404 })
    }

    // status 2 = pagado en Flow.cl
    if (flowData.status === 2 && !pedido.pago_confirmado) {
      await supabase
        .from('pedidos')
        .update({
          estado: 'pagado',
          flow_orden: String(flowData.flowOrder ?? ''),
          pago_confirmado: true,
          pago_confirmado_at: new Date().toISOString(),
        })
        .eq('id', pedido.id)

      await enviarEmails(pedido, resend)
    }

    return new Response('ok', { status: 200 })
  } catch (err) {
    console.error('[confirmar]', err)
    return new Response('error', { status: 500 })
  }
}

async function enviarEmails(pedido: Record<string, unknown>, resend: Resend) {
  const opciones = pedido.opciones as Record<string, string>
  const opcionesTexto = Object.entries(opciones)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ')
  const totalCLP = `$${Number(pedido.precio_total).toLocaleString('es-CL')} CLP`

  // Confirmación al cliente
  await resend.emails.send({
    from: 'Impresora Color <onboarding@resend.dev>',
    to: pedido.cliente_email as string,
    subject: `✅ Pedido confirmado #${pedido.numero_orden}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#2D3E9F;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">¡Pedido confirmado!</h1>
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <p>Hola <strong>${pedido.cliente_nombre}</strong>, recibimos tu pago con éxito.</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555;width:40%">N° de orden</td><td style="padding:8px 0;border-bottom:1px solid #eee;color:#2D3E9F;font-weight:bold">${pedido.numero_orden}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Producto</td><td style="padding:8px 0;border-bottom:1px solid #eee">${pedido.producto_nombre}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Opciones</td><td style="padding:8px 0;border-bottom:1px solid #eee">${opcionesTexto}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#555">Total pagado</td><td style="padding:8px 0;font-weight:bold">${totalCLP}</td></tr>
          </table>
          <p style="margin-top:16px">Tu pedido estará listo en <strong>2-5 días hábiles</strong>. Te avisaremos cuando esté listo para retiro en <strong>Arauco 1060, Chillán</strong>.</p>
          <p>¿Tienes dudas? <a href="https://wa.me/56998441157" style="color:#E91E8F">Escríbenos por WhatsApp</a></p>
        </div>
        <p style="color:#aaa;font-size:12px;margin-top:16px;text-align:center">Impresora Color Ltda · Arauco 1060, Chillán</p>
      </div>
    `,
  })

  // Notificación a la imprenta
  await resend.emails.send({
    from: 'Tienda Online <onboarding@resend.dev>',
    to: 'impresoracolor3@gmail.com',
    subject: `🛒 Nuevo pedido #${pedido.numero_orden} — ${pedido.producto_nombre}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#E91E8F;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">Nuevo pedido pagado</h1>
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555;width:40%">Orden</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#E91E8F">${pedido.numero_orden}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Cliente</td><td style="padding:8px 0;border-bottom:1px solid #eee">${pedido.cliente_nombre}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Teléfono</td><td style="padding:8px 0;border-bottom:1px solid #eee">${pedido.cliente_telefono}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee">${pedido.cliente_email}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Producto</td><td style="padding:8px 0;border-bottom:1px solid #eee">${pedido.producto_nombre}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Opciones</td><td style="padding:8px 0;border-bottom:1px solid #eee">${opcionesTexto}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;color:#555">Total</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">${totalCLP}</td></tr>
            ${pedido.archivo_url ? `<tr><td style="padding:8px 0;font-weight:bold;color:#555;vertical-align:top">Archivo</td><td style="padding:8px 0"><a href="${pedido.archivo_url}" style="color:#2D3E9F;font-weight:bold">Descargar archivo de diseño</a><br><small style="color:#888">${pedido.archivo_nombre_original}</small></td></tr>` : '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Archivo</td><td style="padding:8px 0;color:#e55">Sin archivo subido — contactar al cliente</td></tr>'}
          </table>
        </div>
        <p style="color:#aaa;font-size:12px;margin-top:16px;text-align:center">Sistema de pedidos online · Impresora Color Ltda</p>
      </div>
    `,
  })
}
