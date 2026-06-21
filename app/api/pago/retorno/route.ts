import { supabase } from '@/lib/supabase'
import { verificarPago } from '@/lib/flow'
import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

// Flow.cl redirige al cliente aquí después del pago
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) redirect('/')

  try {
    const [flowData, { data: pedido }] = await Promise.all([
      verificarPago(token!),
      supabase.from('pedidos').select('numero_orden').eq('flow_token', token).single(),
    ])

    if (pedido?.numero_orden) {
      redirect(`/confirmacion?orden=${pedido.numero_orden}&estado=${flowData.status ?? 0}`)
    }
  } catch {
    // fall through
  }

  redirect('/confirmacion?error=true')
}
