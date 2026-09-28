import { put } from '@vercel/blob'
import { NextRequest } from 'next/server'
import { obtenerIp, verificarLimite, registrarSolicitud, respuestaLimiteExcedido } from '@/lib/publicRateLimit'

const MAX_SIZE = 50 * 1024 * 1024 // 50 MB

export async function POST(req: NextRequest) {
  const ip = obtenerIp(req)
  const limite = await verificarLimite(ip, 'upload')
  if (limite.excedido) return respuestaLimiteExcedido(limite.segundosRestantes)

  // Hallazgo incidental al tocar este archivo para el rate limit: si la
  // solicitud no trae Content-Type multipart/form-data (un formulario roto,
  // un bot, alguien probando el endpoint a mano), req.formData() lanzaba una
  // excepción no capturada y el framework respondía 500 con detalle del
  // error interno en vez de un 400 normal. Se corrige acá mismo porque es de
  // una línea y es exactamente el mismo tipo de endurecimiento del endpoint
  // que motiva este bloque.
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }
  const file = formData.get('file') as File | null

  if (!file) {
    return Response.json({ error: 'No se recibió archivo.' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return Response.json({ error: 'El archivo supera el límite de 50 MB.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase()
  const extensionesPermitidas = ['pdf', 'ai', 'eps', 'png', 'jpg', 'jpeg', 'tiff', 'tif']
  if (!ext || !extensionesPermitidas.includes(ext)) {
    return Response.json(
      { error: 'Formato no permitido. Acepta: PDF, AI, EPS, PNG, JPG, TIFF.' },
      { status: 400 }
    )
  }

  try {
    const nombreBlob = `uploads/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    // addRandomSuffix agrega un texto aleatorio al nombre del archivo. El store es
    // publico (cualquiera con la URL puede bajar el archivo), asi que esto evita
    // que alguien adivine la direccion del diseno de otro cliente probando nombres.
    const blob = await put(nombreBlob, file, { access: 'public', addRandomSuffix: true })
    await registrarSolicitud(ip, 'upload')
    return Response.json({ url: blob.url, nombre: file.name })
  } catch (err) {
    console.error('[upload]', err)
    return Response.json({ error: 'Error al subir el archivo.' }, { status: 500 })
  }
}
