import { supabase } from './supabase'

/**
 * Rate limiting genérico para endpoints públicos de la tienda (no el login
 * admin, que ya tiene el suyo en adminRateLimit.ts, más agresivo porque ahí
 * sí se está adivinando una contraseña).
 *
 * Acá el objetivo es distinto: evitar abuso/bots/scrapers golpeando estos
 * endpoints (gasto de envíos de Resend, almacenamiento de Vercel Blob,
 * filas basura en Supabase, llamadas repetidas a la API de Flow.cl), sin
 * arriesgarse a bloquear a un cliente real que compra varios productos
 * seguidos. Por eso los límites son generosos a propósito.
 *
 * Mismo motivo que en adminRateLimit.ts para usar Supabase en vez de un
 * contador en memoria: Vercel corre cada request en una instancia
 * serverless potencialmente distinta, así que un Map en memoria no sirve
 * como límite real. Se reutiliza el stack existente (Supabase), no se
 * contrata ningún servicio nuevo ni de pago.
 *
 * Una sola tabla (rate_limit_publico) sirve para las 4 rutas: se distingue
 * por la columna `ruta`. Ver migracion-rate-limit-publico.sql — hay que
 * correr ese SQL una vez en Supabase antes de que esto tenga efecto.
 *
 * Si Supabase falla, se falla ABIERTO (no se bloquea): un cliente real
 * pagando no debe quedar bloqueado por una caída de un servicio externo.
 */

export type RutaLimitada = 'cotizar' | 'upload' | 'pedidos' | 'pago-iniciar'

interface Regla {
  ventanaMinutos: number
  maxSolicitudes: number
}

// Límites generosos: pensados para frenar un abuso automatizado (decenas o
// cientos de solicitudes en minutos), no para un cliente normal navegando
// o probando su pedido.
const REGLAS: Record<RutaLimitada, Regla> = {
  // 5-oct-2026: límites subidos. En redes móviles chilenas muchos clientes
  // comparten la misma IP pública (CGNAT); con los límites anteriores dos
  // personas en la misma antena podían bloquearse entre sí.
  cotizar: { ventanaMinutos: 10, maxSolicitudes: 15 }, // envía 2 correos (Resend) por solicitud
  upload: { ventanaMinutos: 10, maxSolicitudes: 50 }, // puede subir varios archivos probando productos
  pedidos: { ventanaMinutos: 10, maxSolicitudes: 30 }, // crea filas en Supabase, antes del pago
  'pago-iniciar': { ventanaMinutos: 10, maxSolicitudes: 30 }, // llama a la API de Flow.cl
}

const TABLA = 'rate_limit_publico'

export function obtenerIp(req: { headers: { get(name: string): string | null } }): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) {
    const primera = fwd.split(',')[0]?.trim()
    if (primera) return primera
  }
  const real = req.headers.get('x-real-ip')?.trim()
  if (real) return real
  return 'ip-desconocida'
}

export async function verificarLimite(
  ip: string,
  ruta: RutaLimitada
): Promise<{ excedido: boolean; segundosRestantes?: number }> {
  const { ventanaMinutos, maxSolicitudes } = REGLAS[ruta]
  try {
    const desde = new Date(Date.now() - ventanaMinutos * 60_000).toISOString()
    const { data, error } = await supabase
      .from(TABLA)
      .select('creado_en')
      .eq('ip', ip)
      .eq('ruta', ruta)
      .gte('creado_en', desde)
      .order('creado_en', { ascending: false })
      .limit(maxSolicitudes)

    if (error || !data || data.length < maxSolicitudes) return { excedido: false }

    const masAntiguaDeLasUltimas = data[maxSolicitudes - 1].creado_en as string
    const liberaEn = new Date(masAntiguaDeLasUltimas).getTime() + ventanaMinutos * 60_000
    const segundosRestantes = Math.max(0, Math.round((liberaEn - Date.now()) / 1000))

    return { excedido: segundosRestantes > 0, segundosRestantes }
  } catch {
    return { excedido: false } // fail-open — ver comentario arriba
  }
}

/** Registra la solicitud para el conteo. Llamar solo cuando NO fue bloqueada. */
export async function registrarSolicitud(ip: string, ruta: RutaLimitada): Promise<void> {
  try {
    await supabase.from(TABLA).insert({ ip, ruta })

    // Limpieza oportunista, igual que en adminRateLimit.ts: no hace falta
    // que sea exacta ni en cada request, solo evitar que la tabla crezca
    // para siempre.
    if (Math.random() < 0.05) {
      const limite = new Date(Date.now() - 24 * 60 * 60_000).toISOString()
      void supabase.from(TABLA).delete().lt('creado_en', limite)
    }
  } catch {
    // Si Supabase falla acá, la solicitud ya se procesó; solo perdemos el
    // registro para el rate limit. No debe tumbar la respuesta al cliente.
  }
}

/** Respuesta 429 estándar para los 4 endpoints — mismo formato que ya usa /api/admin/login. */
export function respuestaLimiteExcedido(segundosRestantes?: number): Response {
  return Response.json(
    { error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' },
    {
      status: 429,
      headers: segundosRestantes ? { 'Retry-After': String(segundosRestantes) } : undefined,
    }
  )
}
