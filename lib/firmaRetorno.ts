import { createHmac, timingSafeEqual } from 'crypto'

// Firma del resultado que /api/pago/retorno le pasa a /confirmacion.
//
// Por qué existe: /confirmacion recibía "?estado=2" en la URL y lo creía tal
// cual. Cualquiera podía escribir /confirmacion?orden=IC...&estado=2 y ver
// "¡Pedido confirmado!" (y disparar la conversión de compra en GA4/Ads/Meta)
// sin haber pagado. Ahora /api/pago/retorno, que sí consulta el estado real
// a Flow, firma el par orden+estado con un secreto del servidor, y
// /confirmacion solo confía en el estado si la firma calza.
function secreto(): string {
  return process.env.FLOW_SECRET_KEY ?? process.env.ADMIN_SECRET ?? ''
}

export function firmarRetorno(orden: string, estado: number): string {
  return createHmac('sha256', secreto()).update(`${orden}:${estado}`).digest('base64url').slice(0, 22)
}

export function retornoValido(orden: string, estado: number, firma: string | undefined): boolean {
  if (!firma || !secreto()) return false
  const esperada = Buffer.from(firmarRetorno(orden, estado))
  const recibida = Buffer.from(firma)
  return esperada.length === recibida.length && timingSafeEqual(esperada, recibida)
}
