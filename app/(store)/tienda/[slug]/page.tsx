import { getProducto, PRODUCTOS, precioDesde } from '@/lib/productos'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductoClient from './ProductoClient'
import { TIENDA_EN_CONSTRUCCION } from '@/lib/config'

const SITIO = 'https://impresoracolor.cl'

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
    title: `${producto.nombre} en Chillán | Impresora Color Ltda`,
    description: `${producto.descripcion} Desde ${precioDesde(producto).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}, IVA incluido. Listo en ${producto.tiempoEntrega}. Compra online y retira en Chillán.`,
    alternates: { canonical: `/tienda/${slug}` },
    // Mientras la tienda esté en construcción los bots solo verían la pantalla
    // "próximamente": mejor no indexar una página vacía que después cuesta limpiar.
    robots: TIENDA_EN_CONSTRUCCION ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${producto.nombre} | Impresora Color`,
      description: producto.descripcion,
      url: `${SITIO}/tienda/${slug}`,
      images: [{ url: `${SITIO}${producto.imagen}` }],
      type: 'website',
    },
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

  // Datos estructurados: permiten que Google muestre precio y disponibilidad
  // en el resultado de búsqueda. Solo se emiten con la tienda abierta, porque
  // declarar una oferta que nadie puede comprar es motivo de penalización.
  const jsonLd = TIENDA_EN_CONSTRUCCION
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: producto.nombre,
        description: producto.descripcion,
        image: `${SITIO}${producto.imagen}`,
        sku: producto.slug,
        brand: { '@type': 'Brand', name: 'Impresora Color Ltda' },
        offers: {
          '@type': 'Offer',
          url: `${SITIO}/tienda/${slug}`,
          priceCurrency: 'CLP',
          price: precioDesde(producto),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'Impresora Color Ltda' },
        },
      }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO },
      { '@type': 'ListItem', position: 2, name: 'Tienda', item: `${SITIO}/tienda` },
      { '@type': 'ListItem', position: 3, name: producto.nombre, item: `${SITIO}/tienda/${slug}` },
    ],
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ProductoClient slug={slug} />
    </>
  )
}
