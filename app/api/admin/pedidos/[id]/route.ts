import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import crypto from 'crypto'

function buildToken(): string {
  const secret = (process.env.ADMIN_PASSWORD ?? '') + (process.env.ADMIN_SECRET ?? 'ic_salt')
  return crypto.createHash('sha256').update(secret).digest('hex')
}

async function autenticado(): Promise<boolean> {
  const jar = await cookies()
  const token = jar.get('admin_ic')?.value
  return !!token && token === buildToken()
}

const ESTADOS_VALIDOS = [
  'pendiente_pago',
  'pagado',
  'en_produccion',
  'listo',
  'entregado',
  'cancelado',
]

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

  const update: Record<string, unknown> = { estado }
  if (notas !== undefined) update.notas = notas

  const { error } = await supabase.from('pedidos').update(update).eq('id', id)
  if (error) return Response.json({ error: 'Error al actualizar.' }, { status: 500 })

  return Response.json({ ok: true })
}
