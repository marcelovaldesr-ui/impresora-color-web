// Ajuste general de precios. Vive aparte para que lib/productos.ts y lib/catalogo-v2.ts
// lo compartan sin importarse el uno al otro (evita ciclos de módulos).

/** Ajuste general sobre las tablas de datos. Fue +3 % desde el 11-oct-2026; desde el 24-nov-2026
 *  vuelve a 1 para que la tienda cobre exactamente la lista que confirmó Cecilia (la misma con que
 *  cotiza Tino por WhatsApp). Redondea a la decena de pesos. */
export const AJUSTE_PRECIOS = 1

export function conAjuste(precioBase: number): number {
  return precioBase > 0 ? Math.round((precioBase * AJUSTE_PRECIOS) / 10) * 10 : 0
}
