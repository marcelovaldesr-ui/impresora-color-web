'use client'
import { setPreciosCatalogo, type MapaPrecios } from '@/lib/precios-catalogo'

/** Deja en el navegador la misma lista de precios que usa el servidor, antes de pintar la tienda. */
export default function PreciosCatalogo({ valores, children }: { valores: MapaPrecios | null; children: React.ReactNode }) {
  setPreciosCatalogo(valores)
  return <>{children}</>
}
