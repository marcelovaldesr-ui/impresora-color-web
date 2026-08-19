'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCarrito, precioItem } from '@/lib/carrito'
import { formatCLP, calcularIVA } from '@/lib/productos'
import { trackEcommerce } from '@/app/components/GoogleAds'

export default function PagoPage() {
  const { items, totalPrecio } = useCarrito()
  const router = useRouter()
  const { neto, iva } = calcularIVA(totalPrecio)

  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' })
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirigir si el carrito está vacío (después de hidratación)
  useEffect(() => {
    if (items.length === 0) router.replace('/tienda')
  }, [items, router])

  // begin_checkout: al llegar a la pantalla de datos, una sola vez.
  // La distancia entre este evento y purchase es la que muestra cuánta
  // gente se cae justo en el último paso.
  const disparado = useRef(false)
  useEffect(() => {
    if (disparado.current || items.length === 0) return
    disparado.current = true
    trackEcommerce('begin_checkout', {
      valor: totalPrecio,
      items: items.map((i) => ({
        item_id: i.productoSlug,
        item_name: i.productoNombre,
        price: precioItem(i),
        quantity: 1,
      })),
    })
  }, [items, totalPrecio])

  if (items.length === 0) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Se mandan TODOS los items del carrito. El precio no viaja: lo calcula
      // el servidor a partir del producto y las opciones.
      const pedidoRes = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_nombre: form.nombre,
          cliente_email: form.email,
          cliente_telefono: form.telefono,
          items: items.map((item) => ({
            producto_slug: item.productoSlug,
            opciones: item.opciones,
            archivo_url: item.archivoBlobUrl ?? null,
            archivo_nombre_original: item.archivoNombre ?? null,
          })),
        }),
      })

      const pedidoData = await pedidoRes.json()
      if (!pedidoRes.ok) throw new Error(pedidoData.error ?? 'Error al registrar el pedido.')

      const pagoRes = await fetch('/api/pago/iniciar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grupoOrden: pedidoData.grupoOrden }),
      })

      const pagoData = await pagoRes.json()
      if (!pagoRes.ok) throw new Error(pagoData.error ?? 'Error al iniciar el pago.')

      // Ojo: el carrito NO se vacía acá. Si el cliente se arrepiente en Flow o
      // le rechazan la tarjeta, vuelve y encuentra su pedido intacto.
      // Se vacía en /confirmacion, recién cuando el pago está aprobado.
      window.location.href = pagoData.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado. Intenta de nuevo.')
      setLoading(false)
    }
  }

  const campo = (id: keyof typeof form, label: string, type: string, placeholder: string, autocomplete: string) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        autoComplete={autocomplete}
        value={form[id]}
        onChange={(e) => setForm((p) => ({ ...p, [id]: e.target.value }))}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2D3E9F] focus:ring-1 focus:ring-[#2D3E9F] transition-colors"
      />
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <Link href="/carrito" className="text-sm text-gray-500 hover:text-[#2D3E9F] transition-colors mb-6 block">
        ← Volver al carrito
      </Link>

      <h1 className="text-2xl font-black text-gray-900 mb-8">Datos del pedido</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos de contacto */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900">Tus datos de contacto</h2>
          <p className="text-xs text-gray-500 -mt-2">
            Los usamos para avisarte cuando tu pedido esté listo. No los compartimos con nadie.
          </p>
          {campo('nombre', 'Nombre completo', 'text', 'Juan Pérez', 'name')}
          {campo('email', 'Correo electrónico', 'email', 'juan@ejemplo.cl', 'email')}
          {campo('telefono', 'Teléfono (WhatsApp)', 'tel', '+56 9 1234 5678', 'tel')}
        </div>

        {/* Resumen pedido */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 mb-3">Resumen</h2>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start text-sm text-gray-600 py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900">{item.productoNombre}</p>
                <p className="text-xs text-gray-500">{Object.values(item.opciones).join(' · ')}</p>
              </div>
              <span className="font-semibold ml-4 shrink-0">{formatCLP(precioItem(item))}</span>
            </div>
          ))}
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Neto</span>
              <span>{formatCLP(neto)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>IVA 19%</span>
              <span>{formatCLP(iva)}</span>
            </div>
            <div className="flex justify-between font-black text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-[#2D3E9F]">{formatCLP(totalPrecio)}</span>
            </div>
          </div>
        </div>

        {/* Retiro en tienda */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-1.5">Retiro en tienda</h2>
          <p className="text-sm text-gray-600">
            Por ahora <strong>no hacemos despachos</strong>. Tu pedido se retira en{' '}
            <strong>Arauco 1060, Chillán</strong>, de lunes a viernes de 9:00 a 18:00 hrs.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Te avisamos apenas esté listo. Lo guardamos por 30 días.
          </p>
        </div>

        {/* Aceptacion de terminos */}
        <label className="flex gap-3 items-start cursor-pointer">
          <input
            type="checkbox"
            required
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            className="mt-0.5 w-5 h-5 shrink-0 accent-[#E91E8F] cursor-pointer"
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            He revisado mi archivo y acepto los{' '}
            <Link href="/terminos" target="_blank" className="text-[#2D3E9F] underline hover:text-[#E91E8F]">
              Términos y Condiciones
            </Link>{' '}
            y la{' '}
            <Link href="/privacidad" target="_blank" className="text-[#2D3E9F] underline hover:text-[#E91E8F]">
              Política de Privacidad
            </Link>
            . Entiendo que se trata de productos personalizados que se imprimen tal como los envío.
          </span>
        </label>

        {error && (
          <div role="alert" className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !aceptaTerminos}
          className="w-full bg-[#E91E8F] hover:bg-[#c8186e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full text-base transition-colors shadow-lg shadow-[#E91E8F]/20"
        >
          {loading ? 'Redirigiendo al pago…' : `Pagar ${formatCLP(totalPrecio)} →`}
        </button>

        <div className="space-y-1.5 text-xs text-center text-gray-500">
          <p>
            Serás redirigido a Flow.cl para completar el pago de forma segura. Aceptamos tarjetas de
            crédito, débito y transferencia bancaria.
          </p>
          <p>Impresora Color Ltda · 35 años imprimiendo en Chillán · Producción propia.</p>
        </div>
      </form>
    </div>
  )
}
