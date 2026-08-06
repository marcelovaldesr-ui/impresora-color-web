import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTOS, formatCLP, precioDesde } from '@/lib/productos'
import type { Metadata } from 'next'
import { TIENDA_EN_CONSTRUCCION } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Tienda Online | Impresora Color Ltda — Chillán',
  description:
    'Compra online tarjetas, flyers, stickers y pendones en Chillán. Sube tu diseño listo, elige cantidad y paga de forma segura.',
  alternates: { canonical: '/tienda' },
  // Mientras la tienda esté en construcción, no indexar (contenido "próximamente")
  robots: TIENDA_EN_CONSTRUCCION ? { index: false, follow: true } : undefined,
}

export default function TiendaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-black text-[#2D3E9F] mb-3">
          Imprime online en Chillán
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Elige tu producto, sube el diseño y paga. Lo produces con nosotros y lo retiras en
          días, sin cotizar ni esperar respuesta.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ¿Necesitas diseño o algo diferente?{' '}
          <a
            href="https://wa.me/56998441157?text=Hola%2C%20necesito%20cotizar%20un%20trabajo"
            className="text-[#E91E8F] font-medium underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotiza por WhatsApp
          </a>
        </p>
      </div>

      {/* Barra de confianza — visible antes de elegir producto */}
      <div className="mb-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
        {[
          '35 años imprimiendo en Chillán',
          'Producción propia, no tercerizamos',
          'Revisamos tu archivo gratis',
        ].map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {t}
          </span>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {PRODUCTOS.map((producto) => {
          const precioMinimo = precioDesde(producto)

          return (
            <Link
              key={producto.slug}
              href={`/tienda/${producto.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#2D3E9F]/30 transition-all overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-[#F5F6FB] border-b border-gray-100">
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-lg text-gray-900 group-hover:text-[#2D3E9F] transition-colors">
                  {producto.nombre}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{producto.descripcion}</p>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-500">Desde</p>
                    <p className="text-[#2D3E9F] font-black text-2xl">{formatCLP(precioMinimo)}</p>
                    <p className="text-xs text-gray-500">IVA incluido</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {producto.tiempoEntrega}
                    </span>
                    <span className="bg-[#E91E8F] group-hover:bg-[#c8186e] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors shadow-sm shadow-[#E91E8F]/20">
                      Personalizar →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Reassurance strip */}
      <div className="mt-12 grid sm:grid-cols-3 gap-5 bg-gray-50 rounded-2xl p-6">
        {[
          {
            title: 'Tu archivo',
            desc: 'PDF, AI, EPS, PNG o JPG. Hasta 50 MB.',
            d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
          },
          {
            title: 'Pago seguro',
            desc: 'Tarjetas y transferencia vía Flow.cl.',
            d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
          },
          {
            title: 'Retiro en tienda',
            desc: 'Listo en 1–3 días hábiles. Arauco 1060, Chillán.',
            d: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-3 items-start">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#2D3E9F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={item.d} />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-sm text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
