import crypto from 'crypto'

/**
 * Sesión firmada del panel admin.
 *
 * Reemplaza el hash estático anterior (SHA-256 de ADMIN_PASSWORD + ADMIN_SECRET),
 * que era el mismo valor siempre y por lo tanto no expiraba nunca ni podía
 * invalidarse. Ahora la cookie guarda un token con:
 *
 *   base64url({ iat, exp }) + "." + HMAC-SHA256(ese base64url, ADMIN_SECRET)
 *
 * - iat/exp viven en el payload, así que el token expira solo (no depende
 *   únicamente del Max-Age de la cookie, que el navegador podría ignorar).
 * - La firma HMAC hace que cualquier alteración del payload (o de la firma)
 *   invalide el token: no se puede fabricar ni extender una sesión sin conocer
 *   ADMIN_SECRET.
 * - El token NUNCA contiene ni permite reconstruir ADMIN_PASSWORD.
 */

const SESSION_HOURS = 10 // dentro del rango pedido (8-12h)
export const SESSION_SECONDS = SESSION_HOURS * 60 * 60

function secret(): string {
  // Si ADMIN_SECRET no está configurado, igual generamos tokens (con un valor
  // por defecto) para no romper el build, pero en producción SIEMPRE debe
  // estar seteado: sin él, cualquiera que adivine este valor por defecto
  // podría firmar tokens válidos.
  return process.env.ADMIN_SECRET ?? 'ic_salt_dev_only'
}

function hmac(data: string): string {
  return crypto.createHmac('sha256', secret()).update(data).digest('hex')
}

interface SesionPayload {
  iat: number
  exp: number
}

export function crearTokenSesion(): string {
  const ahora = Math.floor(Date.now() / 1000)
  const payload: SesionPayload = { iat: ahora, exp: ahora + SESSION_SECONDS }
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const firma = hmac(payloadB64)
  return `${payloadB64}.${firma}`
}

/** Verifica firma y expiración. No lanza: cualquier formato inválido → false. */
export function verificarTokenSesion(token: string | undefined | null): boolean {
  if (!token) return false

  const separador = token.indexOf('.')
  if (separador <= 0) return false

  const payloadB64 = token.slice(0, separador)
  const firmaRecibida = token.slice(separador + 1)
  const firmaEsperada = hmac(payloadB64)

  const bufRecibida = Buffer.from(firmaRecibida, 'utf8')
  const bufEsperada = Buffer.from(firmaEsperada, 'utf8')
  if (bufRecibida.length !== bufEsperada.length) return false
  if (!crypto.timingSafeEqual(bufRecibida, bufEsperada)) return false

  let payload: SesionPayload
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
  } catch {
    return false
  }

  if (typeof payload.exp !== 'number') return false
  const ahora = Math.floor(Date.now() / 1000)
  return ahora < payload.exp
}
