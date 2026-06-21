import { NextRequest } from 'next/server'
import crypto from 'crypto'

const COOKIE = 'admin_ic'

function buildToken(): string {
  const secret = (process.env.ADMIN_PASSWORD ?? '') + (process.env.ADMIN_SECRET ?? 'ic_salt')
  return crypto.createHash('sha256').update(secret).digest('hex')
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Contraseña incorrecta.' }, { status: 401 })
  }

  const token = buildToken()
  const res = Response.json({ ok: true })
  res.headers.set(
    'Set-Cookie',
    `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`
  )
  return res
}

export async function DELETE() {
  const res = Response.json({ ok: true })
  res.headers.set('Set-Cookie', `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`)
  return res
}
