/**
 * Escapa los caracteres especiales de HTML antes de insertar un dato en un
 * template de correo armado con template strings (Resend). Sin esto, un
 * campo de un formulario como "Nombre: <img src=x onerror=alert(1)>" se
 * interpreta como HTML de verdad al abrir el correo.
 *
 * Usar SOLO sobre datos que vienen del usuario (nombre, teléfono, email,
 * mensaje, nombre de archivo, etc.). NO usar sobre el HTML propio de las
 * plantillas que escribimos nosotros (las etiquetas <div>, <table>, etc.) —
 * eso rompería el layout del correo.
 *
 * El orden de los reemplazos importa: "&" va primero, si no, las entidades
 * generadas por los reemplazos siguientes (&lt; &gt; etc.) se escaparían
 * de nuevo.
 */
export function escapeHtml(valor: unknown): string {
  if (valor === null || valor === undefined) return ''
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
