import crypto from 'crypto'

// Acceso privado de vista previa a la tienda mientras TIENDA_EN_CONSTRUCCION = true.
// Quien entra a /tienda/preview?key=<TIENDA_PREVIEW_KEY> recibe una cookie que le permite
// ver el catalogo real; el resto de las visitas sigue viendo la pantalla "proximamente".
export const TIENDA_PREVIEW_COOKIE = 'tienda_preview_ic'

export function tiendaPreviewKeyConfigurada(): string | undefined {
  return process.env.TIENDA_PREVIEW_KEY
}

export function buildTiendaPreviewToken(): string {
  const secret = (process.env.TIENDA_PREVIEW_KEY ?? '') + (process.env.ADMIN_SECRET ?? 'ic_salt')
  return crypto.createHash('sha256').update(secret).digest('hex')
}
