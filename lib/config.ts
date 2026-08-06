// Cambiar a false cuando los precios y productos de la tienda estén confirmados.
// Mientras esté en true: el público en general ve "próximamente" y la página lleva noindex.
// Nota: quien entre con el enlace privado de vista previa (ver /tienda/preview) ve el
// catálogo real igual, aunque esta constante esté en true.
export const TIENDA_EN_CONSTRUCCION = true

// Controla si el botón "Agregar al carrito" / compra está habilitado.
// Mientras esté en false: se puede navegar el catálogo, ver productos, variantes y precios,
// pero no se puede comprar (el flujo de carrito y pago queda deshabilitado).
//
// 2026-08-04: se habilita la compra PERO TIENDA_EN_CONSTRUCCION sigue en true.
// Combinacion intencional para la prueba de compra real: el publico general sigue
// viendo "proximamente" y solo quien entre con /tienda/preview?key=... puede comprar.
export const TIENDA_COMPRA_HABILITADA = true
