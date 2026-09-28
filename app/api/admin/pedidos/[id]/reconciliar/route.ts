import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { verificarTokenSesion } from '@/lib/adminAuth'
import { verificarPago } from '@/lib/flow'

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
    const flowData = await verificarPago(pedido.flow_token)
    const estadoFlow = Number(flowData?.status ?? 0)
    const estadoTexto = FLOW_STATUS_DESC[estadoFlow] ?? `Desconocido (${estadoFlow})`

    if (estadoFlow === 2) {
      // Flow confirma pago aprobado
      const updateData: Record<string, unknown> = {
        pago_confirmado: true,
        pago_confirmado_at: new Date().toISOString(),
        flow_orden: String(flowData.flowOrder ?? pedido.flow_orden ?? ''),
      }

      // Si el pedido aún estaba en pendiente_pago, avanzarlo a pagado
      if (pedido.estado === 'pendiente_pago') {
        updateData.estado = 'pagado'
      }

      const targetFilter = pedido.grupo_orden
        ? supabase.from('pedidos').update(updateData).eq('grupo_orden', pedido.grupo_orden)
        : supabase.from('pedidos').update(updateData).eq('id', id)

      const { error: updateError } = await targetFilter
      if (updateError) {
        return Response.json(
          { error: 'Error al actualizar el pedido en la base de datos.' },
          { status: 500 }
        )
      }

      return Response.json({
        ok: true,
        status: estadoFlow,
        statusText: estadoTexto,
        monto: flowData.amount,
        flowOrder: flowData.flowOrder,
        actualizado: true,
      })
    }

    return Response.json({
      ok: true,
      status: estadoFlow,
      statusText: estadoTexto,
      actualizado: false,
      flowData,
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
