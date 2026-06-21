import { getProducto, PRODUCTOS } from '@/lib/productos'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductoClient from './ProductoClient'

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) return {}
  return {
    title: `${producto.nombre} | Impresora Color Ltda`,
    description: producto.descripcion,
    alternates: { canonical: `/tienda/${slug}` },
  }
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const producto = getProducto(slug)
  if (!producto) notFound()

  return <ProductoClient slug={slug} />
}
