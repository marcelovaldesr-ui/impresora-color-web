'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCarrito } from '@/lib/carrito'
import { formatCLP, calcularIVA, getProducto } from '@/lib/productos'

export default function ProductoClient({ slug }: { slug: string }) {
  const producto = getProducto(slug)!

  const router = useRouter()
  const { agregarItem } = useCarrito()

  const [opciones, setOpciones] = useState<Record<string, string>>(
    Object.fromEntries(producto.opcionGrupos.map((g) => [g.id, g.valores[0]]))
  )
  const [archivo, setArchivo] = useState<File | null>(null)
  const [archivoBlobUrl, setArchivoBlobUrl] = useState<string | null>(null)
  const [subiendo, setSubiendo] = useState(false)
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null)
  const [advertenciaResolucion, setAdvertenciaResolucion] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const precio = producto.calcularPrecio(opciones)
  const { neto, iva } = calcularIVA(precio)

  const handleOpcion = (grupoId: string, valor: string) =>
    setOpciones((prev) => ({ ...prev, [grupoId]: valor }))

  const handleArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setErrorArchivo(null)
    setAdvertenciaResolucion(false)
    setArchivo(file)
    setSubiendo(true)
    setArchivoBlobUrl(null)

    const fd = new FormData()
    fd.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) {
        setErrorArchivo(data.error ?? 'Error al subir el archivo.')
        setArchivo(null)
      } else {
        setArchivoBlobUrl(data.url)
        // Advertencia de resolución solo para imágenes raster
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img')
          img.src = URL.createObjectURL(file)
          img.onload = () => {
            // Heurística simple: si la imagen es pequeña, probablemente baja res para imprenta
            if (img.width < 1000 || img.height < 1000) setAdvertenciaResolucion(true)
            URL.revokeObjectURL(img.src)
          }
        }
      }
    } catch {
      setErrorArchivo('Error de red al subir el archivo. Intenta de nuevo.')
      setArchivo(null)
    } finally {
      setSubiendo(false)
    }
  }

  const handleAgregarAlCarrito = () => {
    agregarItem({
      id: crypto.randomUUID(),
      productoSlug: producto.slug,
      productoNombre: producto.nombre,
      opciones,
      cantidad: 1,
      precio,
      archivoNombre: archivo?.name,
      archivoBlobUrl: archivoBlobUrl ?? undefined,
    })
    router.push('/carrito')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/tienda" className="hover:text-[#2D3E9F] transition-colors">
          Tienda
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{producto.nombre}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Imagen */}
        <div className="relative h-72 md:h-96 bg-gray-50 rounded-2xl overflow-hidden">
          <Image src={producto.imagen} alt={producto.nombre} fill className="object-contain p-8" />
        </div>

        {/* Opciones */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">{producto.nombre}</h1>
          <p className="text-gray-600 mt-2 leading-relaxed">{producto.descripcion}</p>

          <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-3">
            <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tiempo de entrega estimado: <strong>{producto.tiempoEntrega}</strong>
          </p>

          {/* Selectores de opciones */}
          <div className="mt-6 space-y-5">
            {producto.opcionGrupos.map((grupo) => (
              <div key={grupo.id}>
                <p className="text-sm font-semibold text-gray-700 mb-2">{grupo.nombre}</p>
                <div className="flex flex-wrap gap-2">
                  {grupo.valores.map((valor) => (
                    <button
                      key={valor}
                      type="button"
                      onClick={() => handleOpcion(grupo.id, valor)}
                      aria-pressed={opciones[grupo.id] === valor}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        opciones[grupo.id] === valor
                          ? 'bg-[#2D3E9F] text-white border-[#2D3E9F] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#2D3E9F] hover:text-[#2D3E9F]'
                      }`}
                    >
                      {valor}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Precio en tiempo real */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#2D3E9F]">{formatCLP(precio)}</span>
              <span className="text-sm text-gray-500">IVA incluido</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Neto: {formatCLP(neto)} + IVA: {formatCLP(iva)}
            </p>
          </div>

          {/* Subida de archivo */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Archivo de diseño{' '}
              <span className="font-normal text-gray-400">
                ({producto.formatosAceptados.join(', ')} — máx. 50 MB)
              </span>
            </p>

            <div
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                archivoBlobUrl
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-200 bg-gray-50 hover:border-[#2D3E9F] hover:bg-blue-50'
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.ai,.eps,.png,.jpg,.jpeg,.tiff,.tif"
                onChange={handleArchivo}
                className="hidden"
              />
              {subiendo ? (
                <p className="text-sm text-gray-500 animate-pulse">Subiendo archivo...</p>
              ) : archivoBlobUrl ? (
                <div>
                  <p className="text-green-700 font-semibold text-sm">✅ {archivo?.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Haz clic para reemplazar el archivo</p>
                </div>
              ) : (
                <div>
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600 font-medium">Haz clic para subir tu diseño</p>
                  <p className="text-xs text-gray-400 mt-1">PDF · AI · EPS · PNG · JPG · TIFF</p>
                </div>
              )}
            </div>

            {errorArchivo && (
              <p role="alert" className="text-red-600 text-sm mt-2">{errorArchivo}</p>
            )}

            {advertenciaResolucion && (
              <div role="status" aria-live="polite" className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                ⚠️ La imagen parece de baja resolución. La impresión podría no verse nítida. Si tienes una versión en mayor calidad, úsala.
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
              ¿No tienes tu archivo listo?{' '}
              <a
                href="https://wa.me/56998441157?text=Hola%2C%20necesito%20ayuda%20con%20dise%C3%B1o"
                className="text-[#E91E8F] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotiza con diseño incluido por WhatsApp
              </a>
            </p>
          </div>

          {/* Botón agregar al carrito */}
          <button
            type="button"
            onClick={handleAgregarAlCarrito}
            disabled={!archivoBlobUrl || subiendo}
            className="mt-6 w-full bg-[#E91E8F] hover:bg-[#c8186e] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full text-base transition-colors shadow-lg shadow-[#E91E8F]/20"
          >
            {subiendo
              ? 'Subiendo archivo...'
              : !archivoBlobUrl
              ? 'Sube tu archivo para continuar'
              : 'Agregar al carrito →'}
          </button>
        </div>
      </div>
    </div>
  )
}
