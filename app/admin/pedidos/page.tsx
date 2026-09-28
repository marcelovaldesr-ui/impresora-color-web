import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { verificarTokenSesion } from '@/lib/adminAuth'
import AdminPedidosClient from './AdminPedidosClient'

export default async function AdminPedidosPage() {
  const jar = await cookies()
  const token = jar.get('admin_ic')?.value

  if (!verificarTokenSesion(token)) {
    redirect('/admin/login')
  }

  const { data: pedidos } = await supabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  return <AdminPedidosClient pedidosIniciales={pedidos ?? []} />
}
