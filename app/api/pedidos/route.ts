import { supabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

function generarNumeroOrden(): string {
  const ahora = new Date()
  const yy = ahora.getFullYear().toString().slice(-2)
  const mm = String(ahora.getMonth() + 1).padStart(2, '0')
  const dd = String(ahora.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `IC${yy}${mm}${dd}-${rand}`
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    cliente_nombre,
    cliente_email,
    cliente_telefono,
    producto_nombre,
    producto_slug,
    opciones,
    cantidad,
    precio_total,
    archivo_url,
    archivo_nombre_original,
  } = body

  if (!cliente_nombre || !cliente_email || !cliente_telefono || !producto_slug || !precio_total) {
    return Response.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  const precio_neto = Math.round(precio_total / 1.19)
  const precio_iva = precio_total - precio_neto
  const numero_orden = generarNumeroOrden()

  const { data, error } = await supabase
    .from('pedidos')
    .insert({
      numero_orden,
      estado: 'pendiente_pago',
      cliente_nombre,
      cliente_email,
      cliente_telefono,
      producto_nombre,
      producto_slug,
      opciones: opciones ?? {},
      cantidad: cantidad ?? 1,
      precio_neto,
      precio_iva,
      precio_total,
      archivo_url: archivo_url ?? null,
      archivo_nombre_original: archivo_nombre_original ?? null,
    })
    .select('id, numero_orden')
    .single()

  if (error) {
    console.error('[pedidos POST]', error)
    return Response.json({ error: 'Error al crear el pedido.' }, { status: 500 })
  }

  return Response.json({ id: data.id, numero_orden: data.numero_orden })
}
