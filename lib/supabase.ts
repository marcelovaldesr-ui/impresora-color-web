import { createClient } from '@supabase/supabase-js'

// Fallbacks evitan que el módulo lance durante el build-time de Next.js.
// Las rutas de la tienda fallarán en runtime si las vars reales no están configuradas,
// pero la landing page no las usa y se despliega correctamente.
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type EstadoPedido =
  | 'pendiente_pago'
  | 'pagado'
  | 'en_produccion'
  | 'listo'
  | 'entregado'
  | 'cancelado'

export interface Pedido {
  id: string
  numero_orden: string
  estado: EstadoPedido
  created_at: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  producto_nombre: string
  producto_slug: string
  opciones: Record<string, string>
  cantidad: number
  precio_neto: number
  precio_iva: number
  precio_total: number
  archivo_url: string | null
  archivo_nombre_original: string | null
  flow_token: string | null
  flow_orden: string | null
  pago_confirmado: boolean
  pago_confirmado_at: string | null
  notas: string | null
}
