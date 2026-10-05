import { createHmac } from 'crypto'

// Aviso "pedido listo" por WhatsApp a través del bot de Impresora Color (Tino / Respondo).
// La tienda NO habla con la API de Meta: le pide al bot que envíe la plantilla aprobada.
//
// Variables de entorno (solo servidor, sin NEXT_PUBLIC_):
//   WHATSAPP_BOT_URL      URL completa del endpoint del bot que recibe el pedido de envío.
//   WHATSAPP_BOT_SECRET   Secreto compartido (el mismo valor en el bot). Firma cada llamada.
// Si falta alguna, el aviso por WhatsApp se omite y el resto del flujo sigue igual.

export type ResultadoWhatsapp = 'enviado' | 'fallido' | 'no_configurado'

export interface PedidoParaWhatsapp {
  id: string
  numero_orden: string
  cliente_nombre: string
  cliente_telefono: string
  producto_nombre: string
}

/** Deja el teléfono en formato internacional sin "+": 56 + 9 dígitos. */
export function normalizarTelefonoCL(telefono: string): string | null {
  const d = (telefono ?? '').replace(/\D/g, '')
  if (d.startsWith('56') && d.length === 11) return d
  if (d.length === 9) return `56${d}`
  return null
}

export async function avisarListoPorWhatsapp(p: PedidoParaWhatsapp): Promise<ResultadoWhatsapp> {
  const url = process.env.WHATSAPP_BOT_URL
  const secreto = process.env.WHATSAPP_BOT_SECRET
  if (!url || !secreto) return 'no_configurado'

  const telefono = normalizarTelefonoCL(p.cliente_telefono)
  if (!telefono) {
    console.error('[whatsapp] teléfono inválido', p.cliente_telefono)
    return 'fallido'
  }

  const cuerpo = JSON.stringify({
    evento: 'pedido_listo',
    // Misma clave siempre para el mismo pedido: el bot puede descartar repetidos.
    idempotency_key: `pedido_listo:${p.id}`, // p.id = número de orden del grupo,
    telefono,
    nombre: p.cliente_nombre,
    numero_orden: p.numero_orden,
    producto: p.producto_nombre,
  })
  const ts = Math.floor(Date.now() / 1000).toString()
  // Firma sobre "timestamp.cuerpo": evita que alguien reutilice una llamada interceptada.
  const firma = createHmac('sha256', secreto).update(`${ts}.${cuerpo}`).digest('hex')

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-IC-Timestamp': ts,
        'X-IC-Signature': firma,
      },
      body: cuerpo,
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error('[whatsapp] el bot respondió', res.status)
      return 'fallido'
    }
    return 'enviado'
  } catch (err) {
    console.error('[whatsapp] error llamando al bot', err)
    return 'fallido'
  }
}
