'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatCLP } from '@/lib/productos'

export interface ItemLista {
  slug: string
  nombre: string
  familia: string
  imagen: string
  sinFoto: boolean
  chips: string[]
  desde: number
  desdeCantidad: number | null
  enRevision: boolean
}

const TODOS = 'Todos'

function normalizar(t: string): string {
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function Tarjeta({ item }: { item: ItemLista }) {
  return (
    <Link
      href={`/tienda/catalogo-v2/${item.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-[#2D3E9F]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="relative aspect-square bg-[#F5F6FB]">
        {item.sinFoto ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#2D3E9F]/10 to-[#E91E8F]/10 text-[#2D3E9F]/60">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v7H6v-7z" />
            </svg>
            <span className="text-[11px] font-medium">Foto próximamente</span>
          </div>
        ) : (
          <Image
            src={item.imagen}
            alt={item.nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 group-hover:scale-[1.04] transition-transform duration-300"
          />
        )}
        {item.enRevision && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            En revisión
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-[15px] leading-snug text-gray-900 group-hover:text-[#2D3E9F] transition-colors line-clamp-2 min-h-[2.5rem]">
          {item.nombre}
        </h3>

        <div className="mt-2 flex flex-wrap gap-1 min-h-[1.75rem]">
          {item.chips.map((c) => (
            <span key={c} className="text-[10.5px] leading-none text-gray-600 bg-gray-100 rounded-full px-2 py-1">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3">
          <p className="text-[11px] text-gray-500 leading-none">Desde</p>
          <p className="text-[#2D3E9F] font-black text-xl sm:text-2xl leading-tight">{formatCLP(item.desde)}</p>
          <p className="text-[11px] text-gray-500">
            IVA incluido
            {item.desdeCantidad && item.desdeCantidad > 1 ? ` · ${item.desdeCantidad.toLocaleString('es-CL')} u.` : ''}
          </p>
          <span className="mt-3 block text-center text-sm font-bold rounded-full py-2 bg-[#E91E8F]/10 text-[#E91E8F] group-hover:bg-[#E91E8F] group-hover:text-white transition-colors">
            Ver opciones →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function CatalogoV2Lista({ items }: { items: ItemLista[] }) {
  const [familia, setFamilia] = useState(TODOS)
  const [busqueda, setBusqueda] = useState('')

  const familias = useMemo(() => {
    const m = new Map<string, number>()
    for (const i of items) m.set(i.familia, (m.get(i.familia) ?? 0) + 1)
    return [...m.entries()].map(([nombre, total]) => ({ nombre, total }))
  }, [items])

  const q = normalizar(busqueda.trim())
  const visibles = items.filter(
    (i) =>
      (familia === TODOS || i.familia === familia) &&
      (q === '' || normalizar(i.nombre + ' ' + i.familia + ' ' + i.chips.join(' ')).includes(q))
  )

  // Con "Todos" y sin búsqueda se muestra por secciones; si no, una sola grilla.
  const porSecciones = familia === TODOS && q === ''
  const secciones = familias
    .map((f) => ({ ...f, items: visibles.filter((i) => i.familia === f.nombre) }))
    .filter((s) => s.items.length > 0)

  const grilla = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5'

  return (
    <div>
      <div className="bg-amber-50 border-b border-amber-300 text-amber-900 text-xs text-center px-4 py-2">
        Vista previa privada del catálogo v2 (borrador). Precios en revisión; no se puede comprar desde aquí.
      </div>

      {/* Encabezado + buscador */}
      <div className="bg-gradient-to-br from-[#2D3E9F] to-[#1f2d78] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Catálogo de impresión</h1>
          <p className="mt-1.5 text-white/80 text-sm sm:text-base max-w-xl">
            Elige tu producto, configura las opciones y mira el precio al instante. Imprimimos en Chillán desde 1991.
          </p>
          <div className="mt-5 relative max-w-xl">
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar: tarjetas, stickers, calendario, etiquetas…"
              aria-label="Buscar productos"
              className="w-full rounded-full bg-white text-gray-900 placeholder-gray-400 pl-12 pr-4 py-3 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E91E8F]"
            />
          </div>
        </div>
      </div>

      {/* Filtros por familia (se quedan arriba al bajar) */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {[{ nombre: TODOS, total: items.length }, ...familias].map((f) => {
            const activo = familia === f.nombre
            return (
              <button
                key={f.nombre}
                type="button"
                onClick={() => setFamilia(f.nombre)}
                aria-pressed={activo}
                className={`shrink-0 text-sm font-medium rounded-full px-4 py-2 border transition-colors ${
                  activo
                    ? 'bg-[#2D3E9F] text-white border-[#2D3E9F]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#2D3E9F] hover:text-[#2D3E9F]'
                }`}
              >
                {f.nombre}
                <span className={`ml-1.5 text-xs ${activo ? 'text-white/70' : 'text-gray-400'}`}>{f.total}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {visibles.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="font-semibold">No encontramos productos con esa búsqueda.</p>
            <p className="text-sm mt-1">
              Prueba con otra palabra o{' '}
              <a
                href="https://wa.me/56998441157?text=Hola%2C%20necesito%20cotizar%20un%20trabajo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E91E8F] font-medium underline"
              >
                cotiza por WhatsApp
              </a>
              .
            </p>
          </div>
        ) : porSecciones ? (
          secciones.map((s) => (
            <section key={s.nombre} className="mb-10">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-black text-gray-900">{s.nombre}</h2>
                <span className="text-xs text-gray-500">{s.items.length} {s.items.length === 1 ? 'producto' : 'productos'}</span>
              </div>
              <div className={grilla}>
                {s.items.map((i) => <Tarjeta key={i.slug} item={i} />)}
              </div>
            </section>
          ))
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {visibles.length} {visibles.length === 1 ? 'producto' : 'productos'}
            </p>
            <div className={grilla}>
              {visibles.map((i) => <Tarjeta key={i.slug} item={i} />)}
            </div>
          </>
        )}

        <div className="mt-6 grid sm:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-5 text-sm text-gray-600">
          <p><strong className="text-gray-900">Producción propia</strong><br />Imprimimos en Chillán, no tercerizamos.</p>
          <p><strong className="text-gray-900">Revisamos tu archivo</strong><br />Sin costo, antes de imprimir.</p>
          <p><strong className="text-gray-900">¿Algo a medida?</strong><br />Cotiza por WhatsApp y lo armamos contigo.</p>
        </div>
      </div>
    </div>
  )
}
