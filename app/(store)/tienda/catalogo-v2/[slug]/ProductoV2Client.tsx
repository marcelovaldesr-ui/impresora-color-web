'use client'

import ProductoClient from '@/app/(store)/tienda/[slug]/ProductoClient'
import { getProductoV2 } from '@/lib/catalogo-v2'

// Puente cliente: los datos del catálogo v2 se importan SOLO desde aquí, así que
// quedan en el paquete de esta ruta privada y no en el de la tienda pública.
export default function ProductoV2Client({ slug }: { slug: string }) {
  const producto = getProductoV2(slug)
  if (!producto) return null
  return <ProductoClient slug={slug} producto={producto} soloVista />
}
