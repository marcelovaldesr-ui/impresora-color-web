import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { verificarTokenSesion } from '@/lib/adminAuth'
import { procesarPagoFlow } from '@/lib/procesarPagoFlow'

async function autenticado(): Promise<boolean> {
  const jar = await cookies()
  return verificarTokenSesion(jar.get('admin_ic')?.value)
}

const FLOW_STATUS_DESC: Record<number, string> = {
  1: 'Pendiente de pago',
  2: 'Pagada',
  3: 'Rechazada',
  4: 'Anulada',
}

export async function POST(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await autenticado())) {
    return Response.json({ error: 'No autorizado.' }, { status: 401 })
  }

  const { id } = await ctx.params

  const { data: pedido, error: dbError } = await supabase
    .from('pedidos')
    .select('*')
    .eq('id', id)
    .single()

  if (dbError || !pedido) {
    return Response.json({ error: 'Pedido no encontrado.' }, { status: 404 })
  }

  if (!pedido.flow_token) {
    return Response.json(
      { error: 'El pedido no tiene un token de pago registrado en Flow.' },
      { status: 400 }
    )
  }

  try {
    // Mismo proceso que el webhook de Flow (lib/procesarPagoFlow.ts): valida
    // orden y monto, marca pagado una sola vez y envía los correos al cliente
    // y a la imprenta. Antes este botón marcaba pagado sin mandar correos y
    // sin revisar si el pago era parcial.
    const r = await procesarPagoFlow(pedido.flow_token)
    const estadoFlow = Number(r.estadoFlow ?? 0)
    const estadoTexto = FLOW_STATUS_DESC[estadoFlow] ?? `Desconocido (${estadoFlow})`

    if (r.status >= 400) {
      return Response.json(
        { error: `No se pudo procesar el pago (${r.texto}).`, status: estadoFlow, statusText: estadoTexto },
        { status: r.status === 404 ? 404 : 409 }
      )
    }

    return Response.json({
      ok: true,
      status: estadoFlow,
      statusText:
        r.resultado === 'pago_parcial'
          ? `${estadoTexto} — PAGO PARCIAL: no se marcó pagado, revisa el correo de alerta`
          : estadoTexto,
      monto: r.flowData?.amount,
      flowOrder: r.flowData?.flowOrder,
      actualizado: r.resultado === 'pagado',
      resultado: r.resultado,
    })
  } catch (err) {
    console.error('[admin/reconciliar] Error consultando Flow:', err)
    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Error al comunicarse con Flow.cl para consultar el estado.',
      },
      { status: 502 }
    )
  }
}
