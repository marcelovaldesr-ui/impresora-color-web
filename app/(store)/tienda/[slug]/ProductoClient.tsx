'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCarrito } from '@/lib/carrito'
import { formatCLP, calcularIVA, getProducto } from '@/lib/productos'
import { TIENDA_COMPRA_HABILITADA } from '@/lib/config'
import { trackEcommerce } from '@/app/components/GoogleAds'

const WA_DISENO =
  'https://wa.me/56998441157?text=Hola%2C%20necesito%20ayuda%20con%20el%20dise%C3%B1o%20de%20mi%20pedido'

/** Suma días hábiles (lun-vie) a una fecha. Sirve para decirle al cliente una
 *  fecha concreta en vez de "2-3 días hábiles", que nadie traduce mentalmente. */
function sumarDiasHabiles(desde: Date, dias: number): Date {
  const d = new Date(desde)
  let restantes = dias
  while (restantes > 0) {
    d.setDate(d.getDate() + 1)
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) restantes--
  }
  return d
}

/** "2-3 días hábiles" -> 3 */
function diasMaximos(texto: string): number {
  const nums = texto.match(/\d+/g)
  if (!nums || nums.length === 0) return 3
  return Math.max(...nums.map(Number))
}

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
  const [enviarDespues, setEnviarDespues] = useState(false)
  const [montado, setMontado] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const zonaArchivoRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMontado(true), [])

  // view_item: una sola vez por producto, no en cada cambio de opción —
  // si no, alguien que prueba cinco combinaciones contaría cinco vistas.
  useEffect(() => {
    trackEcommerce('view_item', {
      valor: producto.calcularPrecio(
        Object.fromEntries(producto.opcionGrupos.map((g) => [g.id, g.valores[0]]))
      ),
      items: [
        {
          item_id: producto.slug,
          item_name: producto.nombre,
          price: producto.calcularPrecio(
            Object.fromEntries(producto.opcionGrupos.map((g) => [g.id, g.valores[0]]))
          ),
          quantity: 1,
        },
      ],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [producto.slug])

  const precio = producto.calcularPrecio(opciones)
  const { neto, iva } = calcularIVA(precio)

  // --- Precio por unidad y mejor oferta por cantidad -----------------------
  const grupoCantidad = producto.opcionGrupos.find((g) => g.id === 'cantidad')
  const cantidadActual = Number(opciones.cantidad ?? '0')
  const precioUnitario =
    grupoCantidad && cantidadActual > 0 ? precio / cantidadActual : null

  const mejorCantidad = useMemo(() => {
    if (!grupoCantidad) return null
    const unitarios = grupoCantidad.valores.map((v) => {
      const cant = Number(v)
      const p = producto.calcularPrecio({ ...opciones, cantidad: v })
      return { valor: v, unitario: cant > 0 ? p / cant : Infinity }
    })
    const mejor = unitarios.reduce((a, b) => (b.unitario < a.unitario ? b : a))
    const peor = unitarios.reduce((a, b) => (b.unitario > a.unitario ? b : a))
    // Solo destacamos si el ahorro es real (>=10%), si no es ruido visual
    if (!isFinite(mejor.unitario) || peor.unitario / mejor.unitario < 1.1) return null
    return mejor.valor
  }, [grupoCantidad, opciones, producto])

  // --- Fecha estimada de retiro -------------------------------------------
  const fechaRetiro = useMemo(() => {
    if (!montado) return null
    const d = sumarDiasHabiles(new Date(), diasMaximos(producto.tiempoEntrega))
    return d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })
  }, [montado, producto.tiempoEntrega])

  const handleOpcion = (grupoId: string, valor: string) =>
    setOpciones((prev) => ({ ...prev, [grupoId]: valor }))

  const handleArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setErrorArchivo(null)
    setAdvertenciaResolucion(false)
    setEnviarDespues(false)
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
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img')
          img.src = URL.createObjectURL(file)
          img.onload = () => {
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

  const puedeContinuar = !subiendo && (!!archivoBlobUrl || enviarDespues)

  const handleAgregarAlCarrito = () => {
    if (!puedeContinuar) {
      zonaArchivoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    trackEcommerce('add_to_cart', {
      valor: precio,
      items: [
        { item_id: producto.slug, item_name: producto.nombre, price: precio, quantity: 1 },
      ],
    })

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

  const textoCta = subiendo
    ? 'Subiendo archivo…'
    : puedeContinuar
    ? 'Continuar con mi pedido →'
    : 'Sube tu diseño para continuar'

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 pb-32 md:pb-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-5 flex items-center gap-2">
        <Link href="/tienda" className="hover:text-[#2D3E9F] transition-colors">
          Tienda
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{producto.nombre}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
        {/* Imagen — más baja en móvil para que el precio entre en pantalla */}
        <div className="relative h-52 sm:h-64 md:h-96 bg-[#F5F6FB] border border-gray-100 rounded-2xl overflow-hidden md:sticky md:top-24">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>

        {/* Opciones */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{producto.nombre}</h1>
          <p className="text-gray-600 mt-2 leading-relaxed">{producto.descripcion}</p>

          {/* Fecha concreta de retiro: responde "¿cuándo lo tengo?" sin hacer cuentas */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
            <span className="flex items-center gap-1.5 text-gray-600">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {fechaRetiro ? (
                <span>
                  Listo para retirar el <strong className="text-gray-900">{fechaRetiro}</strong>
                </span>
              ) : (
                <span>
                  Entrega estimada: <strong className="text-gray-900">{producto.tiempoEntrega}</strong>
                </span>
              )}
            </span>
          </div>

          {/* Selectores de opciones */}
          <div className="mt-6 space-y-5">
            {producto.opcionGrupos.map((grupo) => (
              <div key={grupo.id}>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {grupo.nombre}
                  {grupo.id === 'cantidad' && precioUnitario !== null && (
                    <span className="ml-2 font-normal text-gray-500">
                      ({formatCLP(Math.round(precioUnitario))} c/u)
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {grupo.valores.map((valor) => {
                    const activo = opciones[grupo.id] === valor
                    const esMejor = grupo.id === 'cantidad' && mejorCantidad === valor
                    return (
                      <button
                        key={valor}
                        type="button"
                        onClick={() => handleOpcion(grupo.id, valor)}
                        aria-pressed={activo}
                        className={`relative min-h-[48px] px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          activo
                            ? 'bg-[#2D3E9F] text-white border-[#2D3E9F] shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#2D3E9F] hover:text-[#2D3E9F]'
                        } ${esMejor && !activo ? 'border-[#E91E8F]/40' : ''}`}
                      >
                        {valor}
                        {esMejor && (
                          <span className="absolute -top-2 -right-1 bg-[#E91E8F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                            mejor precio
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Precio */}
          <div className="mt-6 bg-[#2D3E9F]/5 border border-[#2D3E9F]/15 rounded-2xl p-4">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl font-black text-[#2D3E9F]">{formatCLP(precio)}</span>
              <span className="text-sm text-gray-500">IVA incluido</span>
              {precioUnitario !== null && (
                <span className="text-sm font-semibold text-[#2D3E9F]/80">
                  · {formatCLP(Math.round(precioUnitario))} c/u
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Neto: {formatCLP(neto)} + IVA: {formatCLP(iva)}
            </p>
          </div>

          {/* Subida de archivo */}
          {TIENDA_COMPRA_HABILITADA && (
            <div className="mt-5" ref={zonaArchivoRef}>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Tu diseño{' '}
                <span className="font-normal text-gray-500">
                  ({producto.formatosAceptados.join(', ')} — máx. 50 MB)
                </span>
              </p>

              <div
                role="button"
                tabIndex={0}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
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
                  <p className="text-sm text-gray-500 animate-pulse">Subiendo archivo…</p>
                ) : archivoBlobUrl ? (
                  <div>
                    <p className="text-green-700 font-semibold text-sm">✓ {archivo?.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Toca para reemplazarlo</p>
                  </div>
                ) : (
                  <div>
                    <svg className="w-8 h-8 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-700 font-semibold">Toca para subir tu diseño</p>
                    <p className="text-xs text-gray-500 mt-1">PDF · AI · EPS · PNG · JPG · TIFF</p>
                  </div>
                )}
              </div>

              {errorArchivo && (
                <p role="alert" className="text-red-600 text-sm mt-2">{errorArchivo}</p>
              )}

              {advertenciaResolucion && (
                <div role="status" aria-live="polite" className="mt-2 bg-yellow-50 border border-yellow-200 rounded-2xl p-3 text-sm text-yellow-800">
                  La imagen parece de baja resolución y podría no verse nítida impresa. Si tienes una
                  versión de mayor calidad, úsala. Ante la duda, la revisamos gratis antes de imprimir.
                </div>
              )}

              {/* Salida para quien no tiene el archivo a mano: evita perder la venta */}
              {!archivoBlobUrl && !subiendo && (
                <label className="mt-3 flex gap-3 items-start cursor-pointer bg-white border border-gray-200 rounded-xl p-3.5 hover:border-[#2D3E9F]/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={enviarDespues}
                    onChange={(e) => setEnviarDespues(e.target.checked)}
                    className="mt-0.5 w-5 h-5 shrink-0 accent-[#E91E8F] cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 leading-snug">
                    <strong className="text-gray-800">No tengo el archivo ahora.</strong> Quiero pagar
                    y enviarlo después por WhatsApp.
                    <span className="block text-xs text-gray-500 mt-0.5">
                      Te escribimos al confirmar el pedido. La producción parte cuando recibimos tu diseño.
                    </span>
                  </span>
                </label>
              )}

              <p className="text-xs text-gray-500 mt-3">
                ¿No tienes diseño?{' '}
                <a href={WA_DISENO} className="text-[#E91E8F] font-medium underline" target="_blank" rel="noopener noreferrer">
                  Lo hacemos por ti — cotiza por WhatsApp
                </a>
              </p>
            </div>
          )}

          {/* CTA escritorio */}
          {TIENDA_COMPRA_HABILITADA ? (
            <button
              type="button"
              onClick={handleAgregarAlCarrito}
              aria-disabled={!puedeContinuar}
              className={`mt-6 hidden md:block w-full font-bold py-4 rounded-full text-base transition-colors shadow-lg ${
                puedeContinuar
                  ? 'bg-[#E91E8F] hover:bg-[#c8186e] text-white shadow-[#E91E8F]/25'
                  : 'bg-gray-200 text-gray-500 shadow-none'
              }`}
            >
              {textoCta}
            </button>
          ) : (
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-gray-500">Compra en preparación</p>
              <p className="text-xs text-gray-500 mt-1">
                Estamos revisando precios y variantes. Por ahora puedes explorar el catálogo; muy
                pronto podrás comprar directamente aquí.
              </p>
            </div>
          )}

          {/* Señales de confianza */}
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-gray-600">
            {[
              'Revisamos tu archivo gratis antes de imprimir',
              'Producción propia en Chillán, no tercerizamos',
              'Si sale mal por nuestra culpa, lo reimprimimos',
              'Pago seguro con Flow.cl · Boleta electrónica',
            ].map((t) => (
              <li key={t} className="flex gap-2 items-start">
                <svg className="w-4 h-4 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* Qué pasa después de comprar */}
          <div className="mt-7 bg-gray-50 rounded-2xl p-5">
            <p className="font-bold text-gray-900 text-sm mb-3">¿Qué pasa después de pagar?</p>
            <ol className="space-y-2.5">
              {[
                'Recibes un correo con tu número de orden.',
                'Revisamos tu archivo. Si algo no sirve para imprenta, te escribimos antes de producir.',
                'Te avisamos cuando esté listo para retirar en Arauco 1060, Chillán.',
              ].map((paso, i) => (
                <li key={paso} className="flex gap-3 text-sm text-gray-600">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[#2D3E9F] text-white text-[11px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{paso}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Barra fija en móvil: precio + CTA siempre a la vista */}
      {TIENDA_COMPRA_HABILITADA && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <p className="text-xl font-black text-[#2D3E9F] leading-none">{formatCLP(precio)}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {precioUnitario !== null
                  ? `${formatCLP(Math.round(precioUnitario))} c/u · IVA incl.`
                  : 'IVA incluido'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAgregarAlCarrito}
              aria-disabled={!puedeContinuar}
              className={`flex-1 min-h-[52px] font-bold rounded-full text-sm px-4 transition-colors ${
                puedeContinuar
                  ? 'bg-[#E91E8F] text-white shadow-lg shadow-[#E91E8F]/25'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {textoCta}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
