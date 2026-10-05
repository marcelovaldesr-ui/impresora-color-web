import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATALOGO_V2 } from '@/lib/catalogo-v2'
import { tieneAccesoCatalogoV2 } from '@/lib/catalogoV2Acceso'
import CatalogoV2Lista, { type ItemLista } from './CatalogoV2Lista'

// Vista previa PRIVADA del catálogo v2 (borrador armado desde el Excel maestro).
// Sin la cookie de acceso responde 404. No indexable. No se puede comprar desde aquí.
export const metadata: Metadata = {
  title: 'Catálogo v2 (vista previa privada)',
  robots: { index: false, follow: false },
}

export default async function CatalogoV2Page() {
  if (!(await tieneAccesoCatalogoV2())) notFound()

  // Solo datos simples: el componente de lista es de cliente (filtros y buscador).
  const items: ItemLista[] = CATALOGO_V2.map((i) => ({
    slug: i.producto.slug,
    nombre: i.producto.nombre,
    familia: i.familia,
    imagen: i.producto.imagen,
    sinFoto: i.sinFoto,
    chips: i.chips,
    desde: i.desde,
    desdeCantidad: i.desdeCantidad,
    enRevision: i.estado !== 'si',
  }))

  return <CatalogoV2Lista items={items} />
}
