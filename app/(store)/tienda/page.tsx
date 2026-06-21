import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTOS, formatCLP } from '@/lib/productos'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tienda Online | Impresora Color Ltda — Chillán',
  description:
    'Compra online tarjetas, flyers, stickers y pendones en Chillán. Sube tu diseño listo, elige cantidad y paga de forma segura.',
  alternates: { canonical: '/tienda' },
}

export default function TiendaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-[#2D3E9F] mb-3">Tienda Online</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Sube tu diseño listo, elige las opciones y paga. Tu pedido en días.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ¿Necesitas diseño o algo diferente?{' '}
          <a
            href="https://wa.me/56998441157?text=Hola%2C%20necesito%20cotizar%20un%20trabajo"
            className="text-[#E91E8F] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotiza por WhatsApp
          </a>
        </p>
      </div>

      {/* Products grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {PRODUCTOS.map((producto) => {
          const precioMinimo = producto.calcularPrecio(
            Object.fromEntries(producto.opcionGrupos.map((g) => [g.id, g.valores[0]]))
          )

          return (
            <Link
              key={producto.slug}
              href={`/tienda/${producto.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#2D3E9F]/30 transition-all overflow-hidden"
            >
              <div className="relative h-52 bg-gray-50">
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-lg text-gray-900 group-hover:text-[#2D3E9F] transition-colors">
                  {producto.nombre}
                </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{producto.descripcion}</p>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-400">Desde</p>
                    <p className="text-[#2D3E9F] font-black text-2xl">{formatCLP(precioMinimo)}</p>
                    <p className="text-xs text-gray-400">IVA incluido</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {producto.tiempoEntrega}
                    </span>
                    <span className="bg-[#2D3E9F] group-hover:bg-[#E91E8F] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                      Ver opciones →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Reassurance strip */}
      <div className="mt-12 grid sm:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-6">
        {[
          { icon: '📁', title: 'Tu archivo', desc: 'PDF, AI, EPS, PNG o JPG. Hasta 50 MB.' },
          { icon: '🔒', title: 'Pago seguro', desc: 'Tarjetas y transferencia vía Flow.cl.' },
          { icon: '⚡', title: 'Entrega rápida', desc: 'Listo en 1–5 días hábiles.' },
        ].map((item) => (
          <div key={item.title} className="flex gap-3 items-start">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-bold text-sm text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
