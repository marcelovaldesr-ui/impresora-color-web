import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatCLP } from '@/lib/productos'
import LimpiarCarrito from './LimpiarCarrito'

const WHATSAPP = 'https://wa.me/56998441157'

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ orden?: string; estado?: string; error?: string }>
}) {
  const { orden, estado, error } = await searchParams

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Problema con el pago</h1>
        <p className="text-gray-600 mb-6">
          Si completaste el pago, contáctanos por WhatsApp indicando tu número de orden.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
        >
          Contactar por WhatsApp
        </a>
      </div>
    )
  }

  let items: Array<{
    numero_orden: string
    producto_nombre: string
    opciones: Record<string, string>
    precio_total: number
    pago_confirmado: boolean
  }> = []

  if (orden) {
    const { data } = await supabase
      .from('pedidos')
      .select('numero_orden, producto_nombre, opciones, precio_total, pago_confirmado')
      .eq('grupo_orden', orden)
      .order('numero_orden', { ascending: true })
    items = data ?? []
  }

  const total = items.reduce((s, i) => s + Number(i.precio_total), 0)
  const pagoAprobado = Number(estado) === 2 || items.some((i) => i.pago_confirmado)

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      {pagoAprobado && <LimpiarCarrito />}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center">
        {pagoAprobado ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">¡Pedido confirmado!</h1>
            <p className="text-gray-600 mb-6">
              Recibirás un email de confirmación en los próximos minutos.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">🕐</div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">Verificando pago…</h1>
            <p className="text-gray-600 mb-6">
              Tu pago está siendo verificado. Recibirás un email al confirmarse.
            </p>
          </>
        )}

        {items.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-5 text-left mb-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Orden</span>
              <span className="font-bold text-[#2D3E9F]">#{orden}</span>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2">
              {items.map((item) => (
                <div key={item.numero_orden} className="flex justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-900">{item.producto_nombre}</p>
                    <p className="text-xs text-gray-400">{Object.values(item.opciones ?? {}).join(' · ')}</p>
                  </div>
                  <span className="font-medium shrink-0">{formatCLP(item.precio_total)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="text-gray-500">Total</span>
              <span className="font-bold">{formatCLP(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Retiro</span>
              <span className="font-medium">Arauco 1060, Chillán</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/tienda"
            className="block w-full bg-[#2D3E9F] hover:bg-[#1e2f7a] text-white font-bold py-3 rounded-full transition-colors"
          >
            Hacer otro pedido
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-full transition-colors"
          >
            Consultar estado por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
