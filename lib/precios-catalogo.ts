// PRECIOS DESDE EL CATÁLOGO DE LA IMPRENTA (25-nov-2026, pedido de Marcelo).
//
// La lista de precios la edita la imprenta en BrainRoot (pantalla «Catálogo») y vive en el portal
// de Respondo: es la misma con que cotiza Tino. La tienda la toma de ahí y le suma su recargo
// (AJUSTE_PRECIOS en lib/precios.ts, hoy 4 %).
//
// - Si el portal no responde o un producto no está en el catálogo, se usan las tablas de
//   lib/productos.ts (las de siempre): la tienda nunca queda sin precio.
// - El servidor guarda la lista 5 minutos. El navegador la recibe desde el layout de la tienda
//   (<PreciosCatalogo/>), así el carrito muestra lo mismo que después se cobra.
// - El cobro SIEMPRE se recalcula en el servidor (precioServidor en /api/pedidos).
import { createHmac } from 'crypto'

/** codigo del catálogo → cantidad → precio CON IVA (antes del recargo de la tienda). */
export type MapaPrecios = Record<string, Record<string, number>>

let mapa: MapaPrecios | null = null

export function setPreciosCatalogo(m: MapaPrecios | null): void {
  mapa = m
}

/** Precio del catálogo para ese código y cantidad, o `respaldo` si no está. */
export function precioCatalogo(codigo: string, cantidad: number, respaldo: number | undefined): number {
  const v = mapa?.[codigo]?.[String(cantidad)]
  return typeof v === 'number' && v > 0 ? v : respaldo ?? 0
}

type ProductoPortal = { codigo: string; modo: string; tramos: Record<string, number>; neto: boolean }

/** Puro: lo que manda el portal → mapa con precios CON IVA. Exportada para pruebas. */
export function mapaDesdePortal(productos: unknown): MapaPrecios | null {
  if (!Array.isArray(productos)) return null
  const out: MapaPrecios = {}
  for (const p of productos as ProductoPortal[]) {
    if (!p || typeof p.codigo !== 'string' || !p.tramos || typeof p.tramos !== 'object') continue
    const t: Record<string, number> = {}
    for (const [c, v] of Object.entries(p.tramos)) {
      const n = Number(v)
      if (Number.isFinite(n) && n > 0) t[c] = p.neto ? Math.round(n * 1.19) : Math.round(n)
    }
    if (Object.keys(t).length) out[p.codigo] = t
  }
  return Object.keys(out).length ? out : null
}

let cache: { at: number; valor: MapaPrecios | null } | null = null
const DURA_MS = 5 * 60_000

function urlPortal(): string | null {
  const directa = process.env.RESPONDO_PORTAL_URL?.trim()
  const base = directa || (process.env.WHATSAPP_BOT_URL ? new URL(process.env.WHATSAPP_BOT_URL).origin : '')
  return base ? `${base.replace(/\/+$/, '')}/api/externo/tienda-precios` : null
}

/** Solo servidor: trae el catálogo (5 min en memoria) y lo deja activo. Nunca lanza. */
export async function cargarPreciosCatalogo(): Promise<MapaPrecios | null> {
  if (cache && Date.now() - cache.at < DURA_MS) {
    setPreciosCatalogo(cache.valor)
    return cache.valor
  }
  let valor: MapaPrecios | null = cache?.valor ?? null
  try {
    const url = urlPortal()
    const secreto = process.env.WHATSAPP_BOT_SECRET
    if (url && secreto) {
      const cuerpo = '{}'
      const ts = Math.floor(Date.now() / 1000).toString()
      const firma = createHmac('sha256', secreto).update(`${ts}.${cuerpo}`).digest('hex')
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-IC-Timestamp': ts, 'X-IC-Signature': firma },
        body: cuerpo,
        cache: 'no-store',
        signal: AbortSignal.timeout(4000),
      })
      const j = (await r.json().catch(() => null)) as { ok?: boolean; productos?: unknown } | null
      if (r.ok && j?.ok) valor = mapaDesdePortal(j.productos) ?? valor
      else console.error('[precios] el portal respondió', r.status)
    }
  } catch (e) {
    console.error('[precios] no se pudo leer el catálogo; uso las tablas de respaldo', e)
  }
  cache = { at: Date.now(), valor }
  setPreciosCatalogo(valor)
  return valor
}
