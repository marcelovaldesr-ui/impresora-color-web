import { put } from '@vercel/blob'
import { NextRequest } from 'next/server'

const MAX_SIZE = 50 * 1024 * 1024 // 50 MB

export async function POST(req: NextRequest) {
  const formData = await req.formData()
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
    const blob = await put(nombreBlob, file, { access: 'public' })
    return Response.json({ url: blob.url, nombre: file.name })
  } catch (err) {
    console.error('[upload]', err)
    return Response.json({ error: 'Error al subir el archivo.' }, { status: 500 })
  }
}
