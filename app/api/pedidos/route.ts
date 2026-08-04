import { supabase } from '@/lib/supabase'
import { precioServidor } from '@/lib/productos'
import { NextRequest } from 'next/server'

const MAX_ITEMS = 10

interface ItemEntrada {
  producto_slug?: unknown
  opciones?: unknown
  archivo_url?: unknown
  archivo_nombre_original?: unknown
}

function generarGrupoOrden(): string {
  const ahora = new Date()
  const yy = ahora.getFullYear().toString().slice(-2)
  const mm = String(ahora.getMonth() + 1).padStart(2, '0')
  const dd = String(ahora.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `IC${yy}${mm}${dd}-${rand}`
}

function textoLimpio(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function emailValido(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

// Solo aceptamos archivos alojados en nuestro propio Vercel Blob: así nadie
// puede inyectar un enlace externo que después alguien de la imprenta abriría.
function urlArchivoValida(v: unknown): string | null {
  if (typeof v !== 'string' || !v) return null
  try {
    const u = new URL(v)
    const ok = u.protocol === 'https:' && u.hostname.endsWith('.public.blob.vercel-storage.com')
    return ok ? u.toString() : null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const cliente_nombre = textoLimpio(body.cliente_nombre, 120)
  const cliente_email = textoLimpio(body.cliente_email, 160).toLowerCase()
  const cliente_telefono = textoLimpio(body.cliente_telefono, 40)

  if (!cliente_nombre || !cliente_telefono) {
    return Response.json({ error: 'Faltan tu nombre o tu teléfono.' }, { status: 400 })
  }
  if (!emailValido(cliente_email)) {
    return Response.json({ error: 'El correo electrónico no es válido.' }, { status: 400 })
  }

  const items = Array.isArray(body.items) ? (body.items as ItemEntrada[]) : []
  if (items.length === 0) {
    return Response.json({ error: 'El carrito está vacío.' }, { status: 400 })
  }
  if (items.length > MAX_ITEMS) {
    return Response.json(
      { error: `Máximo ${MAX_ITEMS} productos por compra. Para pedidos más grandes, escríbenos por WhatsApp.` },
      { status: 400 }
    )
  }

  // --- Precio calculado en el servidor, ignorando lo que mande el navegador ---
  const validados = []
  for (const item of items) {
    const r = precioServidor(item.producto_slug, item.opciones)
    if (!r.ok) return Response.json({ error: r.error }, { status: 400 })

    validados.push({
      producto_nombre: r.producto.nombre,
      producto_slug: r.producto.slug,
      opciones: r.opciones,
      cantidad: r.cantidad,
      precio_total: r.precio,
      precio_neto: Math.round(r.precio / 1.19),
      precio_iva: r.precio - Math.round(r.precio / 1.19),
      archivo_url: urlArchivoValida(item.archivo_url),
      archivo_nombre_original: textoLimpio(item.archivo_nombre_original, 200) || null,
    })
  }

  const total = validados.reduce((s, v) => s + v.precio_total, 0)

  // numero_orden es UNIQUE: si el número aleatorio choca, reintentamos.
  for (let intento = 0; intento < 5; intento++) {
    const grupo_orden = generarGrupoOrden()

    const filas = validados.map((v, i) => ({
      ...v,
      numero_orden: validados.length === 1 ? grupo_orden : `${grupo_orden}-${i + 1}`,
      grupo_orden,
      estado: 'pendiente_pago',
      cliente_nombre,
      cliente_email,
      cliente_telefono,
    }))

    const { error } = await supabase.from('pedidos').insert(filas)

    if (!error) {
      return Response.json({ grupoOrden: grupo_orden, total, items: validados.length })
    }
    if (error.code !== '23505') {
      console.error('[pedidos POST]', error)
      return Response.json({ error: 'No pudimos registrar el pedido. Intenta de nuevo.' }, { status: 500 })
    }
  }

  return Response.json({ error: 'No pudimos generar el número de orden. Intenta de nuevo.' }, { status: 500 })
}
