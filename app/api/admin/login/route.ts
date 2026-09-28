import { NextRequest } from 'next/server'
import { crearTokenSesion, SESSION_SECONDS } from '@/lib/adminAuth'
import { estaBloqueado, obtenerIp, registrarIntento } from '@/lib/adminRateLimit'

const COOKIE = 'admin_ic'

export async function POST(req: NextRequest) {
  const ip = obtenerIp(req)

  const bloqueo = await estaBloqueado(ip)
  if (bloqueo.bloqueado) {
    return Response.json(
      { error: 'Demasiados intentos fallidos. Vuelve a intentar en unos minutos.' },
      {
        status: 429,
        headers: bloqueo.segundosRestantes
          ? { 'Retry-After': String(bloqueo.segundosRestantes) }
          : undefined,
      }
    )
  }

  const { password } = await req.json()
  const correcta = !!process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD

  // Se registra el intento (éxito o fallo) para el rate limit ANTES de
  // responder, así un fallo siempre cuenta aunque el cliente no espere la
  // respuesta completa.
  await registrarIntento(ip, correcta)

  if (!correcta) {
    return Response.json({ error: 'Contraseña incorrecta.' }, { status: 401 })
  }

  const token = crearTokenSesion()
  const res = Response.json({ ok: true })
  res.headers.set(
    'Set-Cookie',
    `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_SECONDS}`
  )
  return res
}

export async function DELETE() {
  const res = Response.json({ ok: true })
  // Mismos atributos que al crearla (HttpOnly/Secure/SameSite/Path) — si no
  // coinciden el navegador puede no borrar la cookie correcta.
  res.headers.set('Set-Cookie', `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`)
  return res
}
