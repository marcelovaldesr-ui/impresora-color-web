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

export async function GET(req: NextRequest) {
  if (!(await autenticado())) {
    return Response.json({ error: 'No autorizado.' }, { status: 401 })
  }

  const estado = req.nextUrl.searchParams.get('estado')

  let query = supabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (estado) query = query.eq('estado', estado)

  const { data, error } = await query
  if (error) return Response.json({ error: 'Error al obtener pedidos.' }, { status: 500 })

  return Response.json({ pedidos: data })
}
