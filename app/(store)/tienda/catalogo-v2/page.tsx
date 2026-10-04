import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATALOGO_V2 } from '@/lib/catalogo-v2'
import { formatCLP } from '@/lib/productos'
import { tieneAccesoCatalogoV2 } from '@/lib/catalogoV2Acceso'

// Vista previa PRIVADA del catálogo v2 (borrador armado desde el Excel maestro).
// Sin la cookie de acceso responde 404. No indexable. No se puede comprar desde aquí.
export const metadata: Metadata = {
  title: 'Catálogo v2 (vista previa privada)',
  robots: { index: false, follow: false },
}

const ETIQUETA_ESTADO = {
  si: null,
  mixto: 'Parte en revisión',
  no: 'En revisión',
} as const

export default async function CatalogoV2Page() {
  if (!(await tieneAccesoCatalogoV2())) notFound()

  // Agrupa por categoría respetando el orden del Excel.
  const categorias = new Map<string, typeof CATALOGO_V2>()
  for (const item of CATALOGO_V2) {
    const lista = categorias.get(item.categoria) ?? []
    lista.push(item)
    categorias.set(item.categoria, lista)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-bold">Vista previa privada · catálogo v2 (borrador)</p>
        <p className="mt-1 leading-relaxed">
          Esta página solo la ve quien tiene el enlace. Los precios son los del Excel maestro en revisión
          (IVA incluido) y desde aquí no se puede comprar. La tienda pública sigue con su catálogo actual.
          Los productos con la etiqueta &quot;En revisión&quot; están marcados &quot;No&quot; en el Excel.
        </p>
      </div>

      {[...categorias.entries()].map(([categoria, items]) => (
        <section key={categoria} className="mb-12">
          <h2 className="text-xl font-black text-[#2D3E9F] mb-4">{categoria}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(({ producto, estado, desde }) => {
              const etiqueta = ETIQUETA_ESTADO[estado]
              return (
                <Link
                  key={producto.slug}
                  href={`/tienda/catalogo-v2/${producto.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#2D3E9F]/30 transition-all overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-[#F5F6FB] border-b border-gray-100">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-6"
                    />
                    {etiqueta && (
                      <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {etiqueta}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#2D3E9F] transition-colors">
                      {producto.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{producto.descripcion}</p>
                    <p className="text-xs text-gray-500 mt-3">Desde</p>
                    <p className="text-[#2D3E9F] font-black text-xl">{formatCLP(desde)}</p>
                    <p className="text-xs text-gray-500">IVA incluido</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
