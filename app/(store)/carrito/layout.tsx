import type { Metadata } from 'next'

// /carrito es una página de flujo de compra (no tiene valor de contenido
// para buscar en Google) y no debería indexarse. Un layout aparte porque
// carrito/page.tsx es 'use client' y los Client Components no pueden
// exportar metadata directamente.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function CarritoLayout({ children }: { children: React.ReactNode }) {
  return children
}
