/**
 * Feriados legales de Chile que afectan el cálculo de "días hábiles" para la
 * fecha estimada de retiro de un pedido (ver sumarDiasHabiles en
 * ProductoClient.tsx). Centralizados acá para no repetir fechas sueltas
 * dentro de la lógica de negocio y para que actualizarlos sea agregar
 * líneas a un arreglo, no tocar código.
 *
 * Incluye el feriado comunal de Chillán y Chillán Viejo (20 de agosto, Ley
 * N° 20.768 — "Nacimiento del Prócer de la Independencia" Bernardo
 * O'Higgins), que es el que de verdad importa acá: Impresora Color está en
 * Chillán y ese día la imprenta no trabaja aunque en el resto del país sea
 * un día hábil normal.
 *
 * Fuentes cruzadas para las fechas 2026-2027: feriados.cl, calculaferiados.cl,
 * y cálculo propio (algoritmo de Gauss/Meeus) para Viernes y Sábado Santo,
 * que dependen de la fecha de Pascua y cambian cada año.
 *
 * ---------------------------------------------------------------------
 * CÓMO ACTUALIZAR ESTA LISTA (idealmente todos los años, en diciembre,
 * agregando el año subsiguiente):
 *
 * 1. Feriados de fecha FIJA (Año Nuevo, 1 de mayo, 21 de mayo, 16 de julio,
 *    15 de agosto, 20 de agosto Chillán, 18-19 de septiembre, 31 de octubre,
 *    1 de noviembre, 8 de diciembre, 25 de diciembre): son siempre el mismo
 *    día calendario, se copian tal cual al año nuevo.
 *
 * 2. Viernes Santo y Sábado Santo: dependen de la fecha de Pascua (distinta
 *    cada año). Buscar "feriados Chile [año]" en una fuente confiable, o
 *    calcular la Pascua con el algoritmo de Gauss y restarle 2 y 1 días.
 *
 * 3. San Pedro y San Pablo (base 29 de junio) y Encuentro de Dos Mundos
 *    (base 12 de octubre) se trasladan por ley al lunes más cercano: si la
 *    fecha base cae martes/miércoles/jueves/viernes, se traslada al lunes
 *    ANTERIOR; si cae sábado/domingo, al lunes SIGUIENTE; si ya cae lunes,
 *    no se mueve. Confirmar contra una fuente oficial, no asumir.
 *
 * 4. ⚠️ Día Nacional de los Pueblos Indígenas: NO tiene fecha fija — la ley
 *    (N° 21.357) la fija el día del solsticio de invierno, que varía entre
 *    el 19 y el 22 de junio según el año. Para 2027 se dejó el 21 de junio
 *    según la fuente consultada, pero conviene reconfirmarlo más cerca de
 *    la fecha contra un decreto/fuente oficial del año correspondiente.
 *
 * 5. ⚠️ "Feriado adicional" de Fiestas Patrias: algunos años el Congreso
 *    agrega un día extra (ej. el viernes anterior) para hacer fin de semana
 *    largo. Es una ley aparte, caso a caso, y normalmente NO está decidida
 *    con más de un año de anticipación — por eso NO se incluyó ninguno para
 *    2027 todavía. Si se promulga, agregar la fecha acá cuando se confirme.
 * ---------------------------------------------------------------------
 */
export const FERIADOS_CHILE: readonly string[] = [
  // ---- 2026 ----
  '2026-01-01', // Año Nuevo
  '2026-04-03', // Viernes Santo
  '2026-04-04', // Sábado Santo
  '2026-05-01', // Día Nacional del Trabajo
  '2026-05-21', // Día de las Glorias Navales
  '2026-06-21', // Día Nacional de los Pueblos Indígenas
  '2026-06-29', // San Pedro y San Pablo (cae lunes, sin traslado)
  '2026-07-16', // Virgen del Carmen
  '2026-08-15', // Asunción de la Virgen
  '2026-08-20', // Chillán y Chillán Viejo (Ley 20.768) — el que aplica a esta imprenta
  '2026-09-18', // Independencia Nacional
  '2026-09-19', // Día de las Glorias del Ejército
  '2026-10-12', // Encuentro de Dos Mundos (cae lunes, sin traslado)
  '2026-10-31', // Iglesias Evangélicas y Protestantes
  '2026-11-01', // Todos los Santos
  '2026-12-08', // Inmaculada Concepción
  '2026-12-25', // Navidad

  // ---- 2027 ----
  '2027-01-01', // Año Nuevo
  '2027-03-26', // Viernes Santo
  '2027-03-27', // Sábado Santo
  '2027-05-01', // Día Nacional del Trabajo
  '2027-05-21', // Día de las Glorias Navales
  '2027-06-21', // Día Nacional de los Pueblos Indígenas (reconfirmar, ver nota arriba)
  '2027-06-28', // San Pedro y San Pablo (trasladado: el 29 cae martes)
  '2027-07-16', // Virgen del Carmen
  '2027-08-15', // Asunción de la Virgen
  '2027-08-20', // Chillán y Chillán Viejo (Ley 20.768)
  '2027-09-18', // Independencia Nacional
  '2027-09-19', // Día de las Glorias del Ejército
  '2027-10-11', // Encuentro de Dos Mundos (trasladado: el 12 cae martes)
  '2027-10-31', // Iglesias Evangélicas y Protestantes
  '2027-11-01', // Todos los Santos
  '2027-12-08', // Inmaculada Concepción
  '2027-12-25', // Navidad
]

/** "YYYY-MM-DD" en hora LOCAL (no usar toISOString(): convierte a UTC y
 *  puede correr la fecha un día para horarios de Chile). */
function fechaLocalISO(fecha: Date): string {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function esFeriadoChile(fecha: Date): boolean {
  return FERIADOS_CHILE.includes(fechaLocalISO(fecha))
}
