import crypto from 'crypto'
import { cookies } from 'next/headers'

// Acceso privado a la vista previa del catálogo v2 (/tienda/catalogo-v2).
// Quien entra por /tienda/catalogo-v2/acceso?key=<clave> recibe una cookie que
// le permite ver el catálogo borrador; el resto de las visitas recibe un 404.
//
// La clave es CATALOGO_V2_KEY si está definida en Vercel; si no, se reutiliza
// TIENDA_PREVIEW_KEY (la misma del enlace /tienda/preview).
export const CATALOGO_V2_COOKIE = 'catalogo_v2_ic'

export function catalogoV2Clave(): string | undefined {
  return process.env.CATALOGO_V2_KEY || process.env.TIENDA_PREVIEW_KEY || undefined
}

function sha256(texto: string): string {
  return crypto.createHash('sha256').update(texto).digest('hex')
}

export function buildCatalogoV2Token(): string {
  const secret = (catalogoV2Clave() ?? '') + (process.env.ADMIN_SECRET ?? 'ic_salt') + '|catalogo-v2'
  return sha256(secret)
}

/** Compara la clave recibida con la configurada sin filtrar información por tiempo. */
export function claveCatalogoV2Valida(recibida: string | null): boolean {
  const configurada = catalogoV2Clave()
  if (!configurada || !recibida) return false
  return crypto.timingSafeEqual(
    Buffer.from(sha256('a|' + configurada), 'hex'),
    Buffer.from(sha256('a|' + recibida), 'hex')
  )
}

export async function tieneAccesoCatalogoV2(): Promise<boolean> {
  if (!catalogoV2Clave()) return false
  const jar = await cookies()
  return jar.get(CATALOGO_V2_COOKIE)?.value === buildCatalogoV2Token()
}
