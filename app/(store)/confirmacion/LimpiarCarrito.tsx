'use client'

import { useEffect } from 'react'
import { useCarrito } from '@/lib/carrito'

// El carrito se vacía recién acá, cuando el pago ya está aprobado.
// Así un pago rechazado o abandonado no le borra el pedido al cliente.
export default function LimpiarCarrito() {
  const { limpiarCarrito } = useCarrito()
  useEffect(() => {
    limpiarCarrito()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
