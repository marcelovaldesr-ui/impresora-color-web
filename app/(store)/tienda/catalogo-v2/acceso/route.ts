import { NextRequest, NextResponse } from 'next/server'
import { CATALOGO_V2_COOKIE, buildCatalogoV2Token, claveCatalogoV2Valida } from '@/lib/catalogoV2Acceso'

// Enlace privado: /tienda/catalogo-v2/acceso?key=<clave>
// Con la clave correcta deja una cookie y lleva al catálogo borrador.
// Con una clave incorrecta responde 404, igual que si la página no existiera.
export async function GET(req: NextRequest) {
  if (!claveCatalogoV2Valida(req.nextUrl.searchParams.get('key'))) {
    return new NextResponse('Not found', { status: 404 })
  }

  const url = req.nextUrl.clone()
  url.pathname = '/tienda/catalogo-v2'
  url.search = ''

  const res = NextResponse.redirect(url)
  res.cookies.set(CATALOGO_V2_COOKIE, buildCatalogoV2Token(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 días
  })
  return res
}
