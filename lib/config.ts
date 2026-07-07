// Cambiar a false cuando los precios y productos de la tienda estén confirmados.
// Mientras esté en true: el público en general ve "próximamente" y la página lleva noindex.
// Nota: quien entre con el enlace privado de vista previa (ver /tienda/preview) ve el
// catálogo real igual, aunque esta constante esté en true.
export const TIENDA_EN_CONSTRUCCION = true

// Controla si el botón "Agregar al carrito" / compra está habilitado.
// Mientras esté en false: se puede navegar el catálogo, ver productos, variantes y precios,
// pero no se puede comprar (el flujo de carrito y pago queda deshabilitado).
// Cambiar a true recién cuando los precios estén confirmados y se quiera abrir la venta real.
export const TIENDA_COMPRA_HABILITADA = false
