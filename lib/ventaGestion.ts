import { createHmac } from 'crypto'

// Copia de cada compra PAGADA al sistema de gestión de la imprenta (24-nov-2026).
// Antes la venta solo llegaba por correo; ahora además se crea el trabajo en
// Gestión (gestion-impresoracolor), con lo comprado, el cliente y el pago de Flow.
//
// Firma: la misma que el aviso de WhatsApp (HMAC de `${ts}.${cuerpo}` con
// WHATSAPP_BOT_SECRET). En Gestión ese mismo valor se llama TIENDA_IC_SECRET.
// GESTION_URL es opcional (por defecto la de producción).
// Nunca lanza ni frena el pago: si Gestión no responde, se reintenta solo en el
// próximo aviso de Flow o con "Consultar Flow" del panel (Gestión no duplica).

export interface FilaParaGestion {
  grupo_orden: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  producto_nombre: string
  opciones: Record<string, string> | null
  cantidad: number
  precio_total: number
  archivo_url: string | null
}

export type ResultadoGestion = 'creado' | 'ya_estaba' | 'fallido' | 'no_configurado'

export async function enviarVentaAGestion(filas: FilaParaGestion[], flowOrden: string | null): Promise<ResultadoGestion> {
  const secreto = process.env.WHATSAPP_BOT_SECRET
  const base = (process.env.GESTION_URL || 'https://gestion-impresoracolor.vercel.app').replace(/\/+$/, '')
  if (!secreto || !filas.length) return 'no_configurado'

  const cuerpo = JSON.stringify({
    evento: 'pedido_pagado',
    orden: filas[0].grupo_orden,
    cliente: { nombre: filas[0].cliente_nombre, email: filas[0].cliente_email, telefono: filas[0].cliente_telefono },
    lineas: filas.map((f) => ({
      producto: f.producto_nombre,
      detalle: Object.entries(f.opciones ?? {})
        .filter(([k]) => k !== 'cantidad')
        .map(([, v]) => v)
        .join(', '),
      cantidad: Number(f.cantidad) || 1,
      total: Math.round(Number(f.precio_total)),
    })),
    flowOrden,
    archivos: filas.map((f) => f.archivo_url).filter((u): u is string => Boolean(u)),
  })
  const ts = Math.floor(Date.now() / 1000).toString()
  const firma = createHmac('sha256', secreto).update(`${ts}.${cuerpo}`).digest('hex')
  try {
    const res = await fetch(`${base}/api/externo/tienda/venta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-IC-Timestamp': ts, 'X-IC-Signature': firma },
      body: cuerpo,
      signal: AbortSignal.timeout(8000),
    })
    const j = (await res.json().catch(() => null)) as { ok?: boolean; repetida?: boolean } | null
    if (!res.ok || !j?.ok) {
      console.error('[gestion] respondió', res.status)
      return res.status === 503 ? 'no_configurado' : 'fallido'
    }
    return j.repetida ? 'ya_estaba' : 'creado'
  } catch (err) {
    console.error('[gestion] error llamando a Gestión', err)
    return 'fallido'
  }
}
