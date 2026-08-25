// Mientras esté en true: el público en general ve "próximamente", las páginas de la
// tienda llevan noindex y no entran al sitemap. Quien tenga el enlace privado de vista
// previa (/tienda/preview?key=...) ve el catálogo real igual.
//
// 2026-08-06: se abrió al público tras verificar el flujo completo en producción, y ese
// mismo día se volvió a cerrar por decisión de Marcelo: se va a preparar una versión más
// avanzada (más productos, fotos reales propias y mejoras de ficha) antes de reabrir.
// El flujo de compra sigue funcionando: quien entra con el enlace de vista previa puede
// comprar igual, así que se puede seguir probando sin exponerlo al público.
export const TIENDA_EN_CONSTRUCCION = true

// Controla si el botón "Agregar al carrito" / compra está habilitado.
// Mientras esté en false: se puede navegar el catálogo, ver productos, variantes y precios,
// pero no se puede comprar (el flujo de carrito y pago queda deshabilitado).
//
// 2026-08-04: se habilita la compra PERO TIENDA_EN_CONSTRUCCION sigue en true.
// Combinacion intencional para la prueba de compra real: el publico general sigue
// viendo "proximamente" y solo quien entre con /tienda/preview?key=... puede comprar.
export const TIENDA_COMPRA_HABILITADA = true
