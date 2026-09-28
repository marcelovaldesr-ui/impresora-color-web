'use client'

import { useEffect } from 'react'
import { trackPurchase, type ItemCompra } from '@/app/components/GoogleAds'
import { trackMetaPurchase } from '@/app/components/MetaPixel'

/**
 * Registra la compra en GA4, Google Ads y Meta Pixel al cargarse la confirmación.
 * Va en un componente aparte porque la página es un Server Component y el
 * evento tiene que dispararse en el navegador, con el valor real del pedido.
 */
export default function TrackCompra({
  orden,
  valor,
  items,
}: {
  orden: string
  valor: number
  items: ItemCompra[]
}) {
  useEffect(() => {
    if (!orden || valor <= 0) return
    trackPurchase({ orden, valor, items })
    trackMetaPurchase({ orden, valor, items })
  }, [orden, valor, items])

  return null
}
