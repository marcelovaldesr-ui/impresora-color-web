import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { verificarTokenSesion } from '@/lib/adminAuth'

async function autenticado(): Promise<boolean> {
  const jar = await cookies()
  return verificarTokenSesion(jar.get('admin_ic')?.value)
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
