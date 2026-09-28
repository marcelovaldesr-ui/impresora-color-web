import type { Metadata } from 'next'

// Igual razón que carrito/layout.tsx: /pago es el checkout (datos del
// cliente, no contenido) y pago/page.tsx es 'use client', así que la
// metadata tiene que ir en un layout aparte.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function PagoLayout({ children }: { children: React.ReactNode }) {
  return children
}
