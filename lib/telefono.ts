// Validación de teléfono chileno, compartida entre el checkout (navegador) y
// /api/pedidos (servidor). Acepta 9 dígitos (celular 9XXXXXXXX o fijo con
// código de área) o el mismo número con +56 adelante, con o sin espacios.
// Es la misma regla que usa lib/avisoWhatsapp.ts para mandar el aviso de
// "pedido listo": si el número no pasa acá, el aviso por WhatsApp fallaría.
export function telefonoValidoCL(telefono: string): boolean {
  const d = (telefono ?? '').replace(/\D/g, '')
  return (d.length === 9) || (d.length === 11 && d.startsWith('56'))
}

export const MENSAJE_TELEFONO_INVALIDO =
  'Revisa tu teléfono: debe tener 9 dígitos (ej. 9 1234 5678), con o sin +56. Lo usamos para avisarte por WhatsApp cuando tu pedido esté listo.'
