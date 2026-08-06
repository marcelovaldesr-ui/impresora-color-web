'use client'

import { useState } from 'react'
import { formatCLP } from '@/lib/productos'
import type { Pedido, EstadoPedido } from '@/lib/supabase'

const ESTADOS: Record<EstadoPedido, { label: string; color: string }> = {
  pendiente_pago: { label: 'Pendiente pago', color: 'bg-yellow-100 text-yellow-800' },
  pagado: { label: 'Pagado', color: 'bg-blue-100 text-blue-800' },
  en_produccion: { label: 'En producción', color: 'bg-purple-100 text-purple-800' },
  listo: { label: 'Listo para retiro', color: 'bg-green-100 text-green-800' },
  entregado: { label: 'Entregado', color: 'bg-gray-100 text-gray-600' },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-700' },
}

const FLUJO: EstadoPedido[] = ['pendiente_pago', 'pagado', 'en_produccion', 'listo', 'entregado']

type Filtro = EstadoPedido | 'todos' | 'sin_archivo'

/** Normaliza el telefono del cliente a formato wa.me (56 + 9 digitos). */
function waLink(telefono: string, mensaje: string): string {
  const d = (telefono ?? '').replace(/\D/g, '')
  const numero = d.startsWith('56') ? d : d.length === 9 ? `56${d}` : d
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}

/** Un pedido pagado sin archivo esta frenado: no puede entrar a produccion. */
function faltaArchivo(p: Pedido): boolean {
  return !p.archivo_url && p.estado !== 'cancelado' && p.estado !== 'pendiente_pago'
}

export default function AdminPedidosClient({ pedidosIniciales }: { pedidosIniciales: Pedido[] }) {
  const [pedidos, setPedidos] = useState(pedidosIniciales)
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [actualizando, setActualizando] = useState<string | null>(null)

  const pedidosFiltrados =
    filtro === 'todos'
      ? pedidos
      : filtro === 'sin_archivo'
      ? pedidos.filter(faltaArchivo)
      : pedidos.filter((p) => p.estado === filtro)

  const totalSinArchivo = pedidos.filter(faltaArchivo).length

  const avanzarEstado = async (pedido: Pedido) => {
    const idx = FLUJO.indexOf(pedido.estado as EstadoPedido)
    if (idx < 0 || idx >= FLUJO.length - 1) return
    const nuevoEstado = FLUJO[idx + 1]

    setActualizando(pedido.id)
    const res = await fetch(`/api/admin/pedidos/${pedido.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    })

    if (res.ok) {
      setPedidos((prev) =>
        prev.map((p) => (p.id === pedido.id ? { ...p, estado: nuevoEstado } : p))
      )
    }
    setActualizando(null)
  }

  const cerrarSesion = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    window.location.href = '/admin/login'
  }

  const countPorEstado = (e: EstadoPedido) => pedidos.filter((p) => p.estado === e).length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Panel de pedidos</h1>
          <p className="text-sm text-gray-500 mt-1">{pedidos.length} pedidos · Impresora Color Ltda</p>
        </div>
        <button
          type="button"
          onClick={cerrarSesion}
          className="text-sm text-gray-400 hover:text-red-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setFiltro('todos')}
          aria-pressed={filtro === 'todos'}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filtro === 'todos' ? 'bg-[#2D3E9F] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#2D3E9F]'
          }`}
        >
          Todos ({pedidos.length})
        </button>
        {totalSinArchivo > 0 && (
          <button
            type="button"
            onClick={() => setFiltro('sin_archivo')}
            aria-pressed={filtro === 'sin_archivo'}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              filtro === 'sin_archivo'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 border border-red-300 text-red-700 hover:bg-red-100'
            }`}
          >
            Falta archivo ({totalSinArchivo})
          </button>
        )}
        {(Object.entries(ESTADOS) as [EstadoPedido, (typeof ESTADOS)[EstadoPedido]][]).map(
          ([estado, { label }]) => (
            <button
              key={estado}
              type="button"
              onClick={() => setFiltro(estado)}
              aria-pressed={filtro === estado}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filtro === estado
                  ? 'bg-[#2D3E9F] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#2D3E9F]'
              }`}
            >
              {label} ({countPorEstado(estado)})
            </button>
          )
        )}
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-3">
        {pedidosFiltrados.length === 0 && (
          <p className="text-center text-gray-400 py-16">No hay pedidos para este filtro</p>
        )}

        {pedidosFiltrados.map((pedido) => {
          const estadoInfo = ESTADOS[pedido.estado as EstadoPedido] ?? {
            label: pedido.estado,
            color: 'bg-gray-100 text-gray-700',
          }
          const idx = FLUJO.indexOf(pedido.estado as EstadoPedido)
          const puedeAvanzar = idx >= 0 && idx < FLUJO.length - 1
          const siguienteLabel = puedeAvanzar ? ESTADOS[FLUJO[idx + 1]]?.label : null

          return (
            <div
              key={pedido.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start gap-4 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-black text-[#2D3E9F]">#{pedido.numero_orden}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${estadoInfo.color}`}>
                      {estadoInfo.label}
                    </span>
                    {faltaArchivo(pedido) && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                        ⚠ Falta archivo
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(pedido.created_at).toLocaleDateString('es-CL', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="font-semibold text-gray-900">{pedido.producto_nombre}</p>
                  <p className="text-sm text-gray-500">
                    {Object.entries(pedido.opciones as Record<string, string>)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' · ')}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-sm text-gray-600">
                    <span className="font-medium">{pedido.cliente_nombre}</span>
                    <span>{pedido.cliente_telefono}</span>
                    <span className="text-gray-400">{pedido.cliente_email}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <p className="font-black text-gray-900 text-xl">
                    {formatCLP(pedido.precio_total)}
                  </p>

                  {pedido.archivo_url ? (
                    <a
                      href={pedido.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#2D3E9F] underline hover:text-[#E91E8F] transition-colors"
                    >
                      ↓ Descargar archivo
                    </a>
                  ) : (
                    faltaArchivo(pedido) && (
                      <a
                        href={waLink(
                          pedido.cliente_telefono,
                          `Hola ${pedido.cliente_nombre}, somos Impresora Color. Recibimos tu pedido ${pedido.numero_orden} (${pedido.producto_nombre}) y ya está pagado. Para empezar la producción necesitamos que nos envíes tu archivo de diseño por acá. ¡Gracias!`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1.5 rounded-full transition-colors"
                      >
                        Pedir archivo por WhatsApp
                      </a>
                    )
                  )}

                  {puedeAvanzar && (
                    <button
                      type="button"
                      onClick={() => avanzarEstado(pedido)}
                      disabled={actualizando === pedido.id}
                      className="bg-[#E91E8F] hover:bg-[#c8186e] disabled:bg-gray-200 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
                    >
                      {actualizando === pedido.id ? '…' : `→ ${siguienteLabel}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
