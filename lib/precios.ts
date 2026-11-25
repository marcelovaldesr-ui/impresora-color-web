// Ajuste general de precios. Vive aparte para que lib/productos.ts y lib/catalogo-v2.ts
// lo compartan sin importarse el uno al otro (evita ciclos de módulos).

/** Recargo de la tienda sobre la lista de la imprenta. Fue +3 % desde el 11-oct-2026, 1 desde el
 *  24-nov-2026 y +4 % desde el 25-nov-2026 (Marcelo: «los precios de la tienda deben ir un 4 % más
 *  caros»). La lista base es el catálogo que usa Tino (lib/precios-catalogo.ts). Redondea a la decena. */
export const AJUSTE_PRECIOS = 1.04

export function conAjuste(precioBase: number): number {
  return precioBase > 0 ? Math.round((precioBase * AJUSTE_PRECIOS) / 10) * 10 : 0
}
