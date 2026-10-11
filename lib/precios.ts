// Ajuste general de precios. Vive aparte para que lib/productos.ts y lib/catalogo-v2.ts
// lo compartan sin importarse el uno al otro (evita ciclos de módulos).

/** Alza general de precios sobre las tablas de datos (3 %, 11-oct-2026). Las tablas guardan
 *  el precio base de la lista; este ajuste se aplica al calcular. Redondea a la decena de pesos. */
export const AJUSTE_PRECIOS = 1.03

export function conAjuste(precioBase: number): number {
  return precioBase > 0 ? Math.round((precioBase * AJUSTE_PRECIOS) / 10) * 10 : 0
}
