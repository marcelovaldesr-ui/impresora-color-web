import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductoV2 } from '@/lib/catalogo-v2'
import { tieneAccesoCatalogoV2 } from '@/lib/catalogoV2Acceso'
import ProductoV2Client from './ProductoV2Client'

// Ficha de vista previa PRIVADA (catálogo v2). Sin cookie de acceso: 404. No indexable.
export const metadata: Metadata = {
  title: 'Catálogo v2 (vista previa privada)',
  robots: { index: false, follow: false },
}

export default async function ProductoV2Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  if (!(await tieneAccesoCatalogoV2())) notFound()
  const { slug } = await params
  if (!getProductoV2(slug)) notFound()

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-300 text-amber-900 text-xs text-center px-4 py-2">
        Vista previa privada del catálogo v2 (borrador). Precios en revisión; no se puede comprar desde aquí.
      </div>
      <ProductoV2Client slug={slug} />
    </>
  )
}
