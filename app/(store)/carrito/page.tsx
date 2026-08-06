'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCarrito } from '@/lib/carrito'
import { formatCLP, calcularIVA } from '@/lib/productos'

export default function CarritoPage() {
  const { items, eliminarItem, totalPrecio } = useCarrito()
  const router = useRouter()
  const { neto, iva } = calcularIVA(totalPrecio)
  const [confirmandoEliminar, setConfirmandoEliminar] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">Agrega productos desde el catálogo para continuar.</p>
        <Link
          href="/tienda"
          className="inline-block bg-[#2D3E9F] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1e2f7a] transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-gray-900 mb-8">Tu carrito</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900">{item.productoNombre}</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                  {Object.entries(item.opciones).map(([k, v]) => (
                    <span key={k} className="text-xs text-gray-500 capitalize">
                      {k}: <strong className="text-gray-700">{v}</strong>
                    </span>
                  ))}
                </div>
                {item.archivoNombre ? (
                  <p className="text-xs text-green-700 mt-2 flex items-center gap-1">
                    <span>✅</span> {item.archivoNombre}
                  </p>
                ) : (
                  <p className="text-xs text-amber-700 mt-2 flex items-center gap-1">
                    <span>💬</span> Enviarás tu diseño por WhatsApp
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-[#2D3E9F] text-lg">{formatCLP(item.precio)}</p>
                {confirmandoEliminar === item.id ? (
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => { eliminarItem(item.id); setConfirmandoEliminar(null) }}
                      className="text-xs text-red-600 font-semibold hover:text-red-800 transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmandoEliminar(null)}
                      className="text-xs text-gray-500 hover:text-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmandoEliminar(item.id)}
                    className="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen y CTA */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-6">
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Neto</span>
            <span>{formatCLP(neto)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>IVA (19%)</span>
            <span>{formatCLP(iva)}</span>
          </div>
          <div className="flex justify-between font-black text-lg text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-[#2D3E9F]">{formatCLP(totalPrecio)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push('/pago')}
          className="w-full bg-[#E91E8F] hover:bg-[#c8186e] text-white font-bold py-4 rounded-full text-base transition-colors shadow-lg shadow-[#E91E8F]/20"
        >
          Ir a pagar →
        </button>

        <div className="mt-4 space-y-1.5 text-xs text-center text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span>🔒</span> Pago seguro vía Flow.cl · Tarjetas y transferencia
          </p>
          <p>Boleta electrónica · Revisamos tu archivo antes de imprimir</p>
          <p>Retiro en Arauco 1060, Chillán · Lun a Vie de 9:00 a 18:00</p>
        </div>
      </div>

      <Link href="/tienda" className="block text-center text-sm text-[#2D3E9F] mt-5 hover:underline">
        ← Seguir comprando
      </Link>
    </div>
  )
}
