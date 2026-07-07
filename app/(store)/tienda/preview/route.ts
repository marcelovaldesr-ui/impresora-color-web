import { NextRequest, NextResponse } from 'next/server'
import { TIENDA_PREVIEW_COOKIE, buildTiendaPreviewToken, tiendaPreviewKeyConfigurada } from '@/lib/tiendaPreview'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  const claveConfigurada = tiendaPreviewKeyConfigurada()

  const url = req.nextUrl.clone()
  url.pathname = '/tienda'
  url.search = ''

  if (!claveConfigurada || !key || key !== claveConfigurada) {
    // Clave invalida o no configurada: redirige igual a /tienda (mostrara "proximamente")
    return NextResponse.redirect(url)
  }

  const res = NextResponse.redirect(url)
  res.cookies.set(TIENDA_PREVIEW_COOKIE, buildTiendaPreviewToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 90, // 90 dias
  })
  return res
}
