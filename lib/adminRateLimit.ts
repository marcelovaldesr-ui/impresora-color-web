import type { NextRequest } from 'next/server'
import { supabase } from './supabase'

/**
 * Protección anti fuerza-bruta para /api/admin/login.
 *
 * Vercel ejecuta cada request en una instancia serverless potencialmente
 * distinta, así que un contador en memoria (una variable, un Map) NO sirve:
 * cada instancia tendría su propio contador y el límite real sería N veces
 * más alto de lo pensado (o directamente inútil). Por eso los intentos se
 * guardan en Supabase (ya es parte del stack, no se agrega ningún servicio
 * nuevo ni de pago) en una tabla aparte de "pedidos": admin_login_intentos.
 * Ver migracion-admin-login-intentos.sql — hay que correr ese SQL una vez
 * en Supabase antes de que esto funcione.
 *
 * Regla: 5 intentos fallidos de la misma IP en una ventana de 15 minutos →
 * bloqueado hasta que, por el paso del tiempo, dejen de existir 5 fallos en
 * esa ventana. Es una ventana deslizante, no un temporizador fijo: si el
 * ataque continúa, el bloqueo se mantiene; si se detiene, se libera solo en
 * ≤15 minutos. Nunca queda bloqueado para siempre.
 *
 * Si Supabase falla o no está configurado, se falla ABIERTO (no se bloquea):
 * preferimos un login sin rate-limit temporalmente a un panel admin
 * inaccesible por una caída de un servicio externo.
 */

const VENTANA_MINUTOS = 15
const MAX_INTENTOS = 5
const TABLA = 'admin_login_intentos'

export function obtenerIp(req: NextRequest): string {
  // Vercel entrega la IP real del cliente en x-forwarded-for (primer valor
  // de la lista; los siguientes son proxies intermedios). req.ip no existe
  // en NextRequest de App Router, por eso se lee del header.
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) {
    const primera = fwd.split(',')[0]?.trim()
    if (primera) return primera
  }
  const real = req.headers.get('x-real-ip')?.trim()
  if (real) return real
  return 'ip-desconocida'
}

export async function estaBloqueado(
  ip: string
): Promise<{ bloqueado: boolean; segundosRestantes?: number }> {
  try {
    const desde = new Date(Date.now() - VENTANA_MINUTOS * 60_000).toISOString()
    const { data, error } = await supabase
      .from(TABLA)
      .select('creado_en')
      .eq('ip', ip)
      .eq('ok', false)
      .gte('creado_en', desde)
      .order('creado_en', { ascending: false })
      .limit(MAX_INTENTOS)

    if (error || !data || data.length < MAX_INTENTOS) return { bloqueado: false }

    // El intento número 5 (el más antiguo de los 5 más recientes) marca
    // cuándo empezó a cumplirse la condición de bloqueo.
    const quintoMasReciente = data[MAX_INTENTOS - 1].creado_en as string
    const desbloqueaEn = new Date(quintoMasReciente).getTime() + VENTANA_MINUTOS * 60_000
    const segundosRestantes = Math.max(0, Math.round((desbloqueaEn - Date.now()) / 1000))

    return { bloqueado: segundosRestantes > 0, segundosRestantes }
  } catch {
    return { bloqueado: false } // fail-open — ver comentario arriba
  }
}

export async function registrarIntento(ip: string, ok: boolean): Promise<void> {
  try {
    await supabase.from(TABLA).insert({ ip, ok })

    // Limpieza oportunista (no bloquea la respuesta al usuario): sin esto la
    // tabla crecería para siempre. No hace falta que sea exacta ni en cada
    // request, solo evitar que se acumule basura indefinidamente.
    if (Math.random() < 0.05) {
      const limite = new Date(Date.now() - 24 * 60 * 60_000).toISOString()
      void supabase.from(TABLA).delete().lt('creado_en', limite)
    }
  } catch {
    // Si Supabase falla acá, el login ya se resolvió (ok o no) con la
    // contraseña; solo perdemos el registro de este intento para el rate
    // limit. No debe tumbar el login.
  }
}
