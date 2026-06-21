import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import crypto from 'crypto'
import AdminPedidosClient from './AdminPedidosClient'

function buildToken(): string {
  const secret = (process.env.ADMIN_PASSWORD ?? '') + (process.env.ADMIN_SECRET ?? 'ic_salt')
  return crypto.createHash('sha256').update(secret).digest('hex')
}

export default async function AdminPedidosPage() {
  const jar = await cookies()
  const token = jar.get('admin_ic')?.value

  if (!token || token !== buildToken()) {
    redirect('/admin/login')
  }

  const { data: pedidos } = await supabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  return <AdminPedidosClient pedidosIniciales={pedidos ?? []} />
}
