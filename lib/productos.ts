export interface OpcionGrupo {
  id: string
  nombre: string
  valores: string[]
}

export interface Dimensiones {
  anchoCm: number
  altoCm: number
  /** Gran formato: se mira de lejos, así que tolera mucha menos resolución. */
  granFormato: boolean
}

export interface Producto {
  slug: string
  nombre: string
  descripcion: string
  tiempoEntrega: string
  imagen: string
  formatosAceptados: string[]
  opcionGrupos: OpcionGrupo[]
  calcularPrecio: (opciones: Record<string, string>) => number
  /** Tamaño físico impreso según las opciones elegidas. */
  dimensiones: (opciones: Record<string, string>) => Dimensiones
}

/** "150 x 200 cm" o "A5 (14,8 x 21 cm)" -> { anchoCm, altoCm } */
function medidasDeTexto(texto: string): { anchoCm: number; altoCm: number } | null {
  const m = texto.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/i)
  if (!m) return null
  return {
    anchoCm: parseFloat(m[1].replace(',', '.')),
    altoCm: parseFloat(m[2].replace(',', '.')),
  }
}

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function calcularIVA(precioConIVA: number) {
  const neto = Math.round(precioConIVA / 1.19)
  const iva = precioConIVA - neto
  return { neto, iva, total: precioConIVA }
}

// Precios cargados desde catalogo_tienda_onlineV2.xlsx (filas marcadas "Si"/"Si").
// Precios FINALES con IVA incluido (19%). Actualizar solo desde el Excel maestro.

// TARJETAS DE PRESENTACION — 9 x 5 cm, couche 300 grs
const TARJETAS: Record<string, Record<number, number>> = {
  '4x0 color (1 cara)': { 100: 8000, 200: 14000, 500: 30000 },
  '4x4 color (2 caras)': { 100: 14000, 200: 20000, 500: 35000 },
}

// FLYERS / VOLANTES — Couche 90g. Precios finales por fila (1 y 2 caras fijados a mano en el catalogo).
const FLYERS: Record<string, Record<string, Record<number, number>>> = {
  'A6 (10,5 x 14,8 cm)': {
    '1 cara': { 100: 15000, 200: 22000, 500: 42000 },
    '2 caras': { 100: 22000, 200: 32000, 500: 58000 },
  },
  'A5 (14,8 x 21 cm)': {
    '1 cara': { 100: 22000, 200: 32000, 500: 68000 },
    '2 caras': { 100: 28000, 200: 35000, 500: 75000 },
  },
}

// STICKERS / CALCOMANIAS — Vinilo brillante.
// El precio es el mismo sin importar la forma (Circular, Rectangular o Cuadrado); la forma
// solo se pide como referencia para el diseno.
const STICKERS: Record<string, Record<number, number>> = {
  '3 cm': { 100: 8000, 200: 14000, 500: 28000 },
  '5 cm': { 100: 10000, 200: 16000, 500: 32000 },
  '8 cm': { 100: 14000, 200: 22000, 500: 45000 },
}

// PENDON ROLLER RETRACTIL — todos los tamanos incluyen estuche de transporte
const PENDON: Record<string, number> = {
  '80 x 200 cm': 38000,
  '90 x 200 cm': 40000,
  '100 x 200 cm': 45000,
  '120 x 200 cm': 50000,
}

// TELA PVC IMPRESA (lona) — sin ojetillos
const TELA_PVC: Record<string, number> = {
  '80 x 60 cm': 8000,
  '100 x 80 cm': 11500,
  '150 x 100 cm': 15000,
  '150 x 200 cm': 18000,
}

// CREDENCIAL PVC — PVC blanco, impresion full color, tamano tipo carne.
// Precio por unidad, fijo hasta 5 unidades. Sobre 5 unidades se cotiza por privado.
const CREDENCIAL_PVC_UNITARIO = 2500

export const PRODUCTOS: Producto[] = [
  {
    slug: 'tarjetas-presentacion',
    nombre: 'Tarjetas de Presentación',
    descripcion:
      'Tarjetas profesionales para hacer crecer tu red de contactos. Tamaño 9 x 5 cm, papel couché 300 grs.',
    tiempoEntrega: '1-3 días hábiles',
    imagen: '/images/tarjetas-crop.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'acabado', nombre: 'Impresión', valores: ['4x0 color (1 cara)', '4x4 color (2 caras)'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100', '200', '500'] },
    ],
    calcularPrecio: (opciones) => {
      const acabado = opciones.acabado ?? '4x0 color (1 cara)'
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      return TARJETAS[acabado]?.[cantidad] ?? 0
    },
    dimensiones: () => ({ anchoCm: 9, altoCm: 5, granFormato: false }),
  },
  {
    slug: 'flyers-volantes',
    nombre: 'Flyers / Volantes',
    descripcion:
      'Volantes de alta calidad para promocionar tu negocio. Papel couché 90g, 1 o 2 caras.',
    tiempoEntrega: '1-3 días hábiles',
    imagen: '/images/FLYER.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['A6 (10,5 x 14,8 cm)', 'A5 (14,8 x 21 cm)'] },
      { id: 'caras', nombre: 'Impresión', valores: ['1 cara', '2 caras'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100', '200', '500'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? 'A6 (10,5 x 14,8 cm)'
      const caras = opciones.caras ?? '1 cara'
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      return FLYERS[tamano]?.[caras]?.[cantidad] ?? 0
    },
    dimensiones: (opciones) => {
      const m = medidasDeTexto(opciones.tamano ?? '') ?? { anchoCm: 10.5, altoCm: 14.8 }
      return { ...m, granFormato: false }
    },
  },
  {
    slug: 'stickers',
    nombre: 'Stickers / Calcomanías',
    descripcion:
      'Stickers en vinilo brillante para packaging, branding y decoración. Mismo precio en forma circular, rectangular o cuadrada.',
    tiempoEntrega: '1-3 días hábiles',
    imagen: '/images/sitkers.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'forma', nombre: 'Forma', valores: ['Circular', 'Rectangular', 'Cuadrado'] },
      { id: 'tamano', nombre: 'Tamaño', valores: ['3 cm', '5 cm', '8 cm'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100', '200', '500'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '3 cm'
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      return STICKERS[tamano]?.[cantidad] ?? 0
    },
    dimensiones: (opciones) => {
      const lado = parseFloat((opciones.tamano ?? '3 cm').replace(/[^\d.,]/g, '').replace(',', '.'))
      const cm = Number.isFinite(lado) && lado > 0 ? lado : 3
      return { anchoCm: cm, altoCm: cm, granFormato: false }
    },
  },
  {
    slug: 'pendon-roller',
    nombre: 'Pendón Roller Retráctil',
    descripcion:
      'Pendones con estructura enrollable y estuche de transporte incluido. Ideales para eventos, ferias y puntos de venta.',
    tiempoEntrega: '1-3 días hábiles',
    imagen: '/images/roller-producto-crop.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['80 x 200 cm', '90 x 200 cm', '100 x 200 cm', '120 x 200 cm'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '80 x 200 cm'
      return PENDON[tamano] ?? 0
    },
    dimensiones: (opciones) => {
      const m = medidasDeTexto(opciones.tamano ?? '') ?? { anchoCm: 80, altoCm: 200 }
      return { ...m, granFormato: true }
    },
  },
  {
    slug: 'tela-pvc-impresa',
    nombre: 'Tela PVC Impresa (Lona)',
    descripcion:
      'Lona impresa en PVC, sin ojetillos, ideal para publicidad exterior y de gran formato.',
    tiempoEntrega: '1-3 días hábiles',
    imagen: '/images/tela-pvc-impresa.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['80 x 60 cm', '100 x 80 cm', '150 x 100 cm', '150 x 200 cm'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '80 x 60 cm'
      return TELA_PVC[tamano] ?? 0
    },
    dimensiones: (opciones) => {
      const m = medidasDeTexto(opciones.tamano ?? '') ?? { anchoCm: 80, altoCm: 60 }
      return { ...m, granFormato: true }
    },
  },
  {
    slug: 'credencial-pvc',
    nombre: 'Credencial PVC',
    descripcion:
      'Credencial tipo carne en PVC blanco, impresion full color. Tamaño estándar 8,5 x 5,5 cm. Valor $2.500 por unidad (hasta 5 unidades); para mayores cantidades, cotiza por privado.',
    tiempoEntrega: '1-3 días hábiles',
    imagen: '/images/tarjetaspvc.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'cantidad', nombre: 'Cantidad', valores: ['1', '2', '3', '4', '5'] },
    ],
    calcularPrecio: (opciones) => {
      // Precio por unidad, fijo hasta 5 unidades. Sobre 5: cotizar por privado.
      const cantidad = parseInt(opciones.cantidad ?? '1', 10)
      return CREDENCIAL_PVC_UNITARIO * cantidad
    },
    dimensiones: () => ({ anchoCm: 8.5, altoCm: 5.5, granFormato: false }),
  },
]

export function getProducto(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug)
}

// ---------------------------------------------------------------------------
// Cálculo de precio en el SERVIDOR.
// Regla de oro: el precio que llega desde el navegador NO se usa nunca para
// cobrar. Se recalcula acá a partir del slug + las opciones, validando que cada
// opción exista realmente en el catálogo.
// ---------------------------------------------------------------------------
export type PrecioServidor =
  | { ok: true; producto: Producto; opciones: Record<string, string>; cantidad: number; precio: number }
  | { ok: false; error: string }

export function precioServidor(slug: unknown, opciones: unknown): PrecioServidor {
  if (typeof slug !== 'string') return { ok: false, error: 'Producto no especificado.' }

  const producto = getProducto(slug)
  if (!producto) return { ok: false, error: 'Producto no disponible en la tienda.' }

  const entrada = (opciones ?? {}) as Record<string, unknown>
  const limpias: Record<string, string> = {}

  for (const grupo of producto.opcionGrupos) {
    const valor = entrada[grupo.id]
    if (typeof valor !== 'string' || !grupo.valores.includes(valor)) {
      return { ok: false, error: `Opción inválida en "${grupo.nombre}" para ${producto.nombre}.` }
    }
    limpias[grupo.id] = valor
  }

  const precio = producto.calcularPrecio(limpias)
  if (!Number.isFinite(precio) || precio <= 0) {
    return { ok: false, error: `No hay precio publicado para esa combinación de ${producto.nombre}.` }
  }

  const cantidad = Number.parseInt(limpias.cantidad ?? '1', 10)

  return {
    ok: true,
    producto,
    opciones: limpias,
    cantidad: Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 1,
    precio: Math.round(precio),
  }
}

/** Precio más bajo publicado de un producto (la primera opción de cada grupo).
 *  Se usa en el catálogo y en el schema.org de la ficha. */
export function precioDesde(producto: Producto): number {
  return producto.calcularPrecio(
    Object.fromEntries(producto.opcionGrupos.map((g) => [g.id, g.valores[0]]))
  )
}

// ---------------------------------------------------------------------------
// Revisión de resolución del archivo del cliente.
// Un archivo con poca resolución sale borroso impreso, y el reproceso lo paga
// la imprenta. Acá se compara la resolución real contra el tamaño físico que
// va a tener el producto: una tarjeta de 9 cm y un pendón de 2 metros no
// necesitan lo mismo.
// ---------------------------------------------------------------------------
export type EstadoResolucion = 'ok' | 'advertencia' | 'rechazado'

export interface Resolucion {
  estado: EstadoResolucion
  dpi: number
  /** Píxeles recomendados para que quede nítido en el tamaño elegido. */
  anchoIdealPx: number
  altoIdealPx: number
  mensaje: string
}

export function evaluarResolucion(
  anchoPx: number,
  altoPx: number,
  dim: Dimensiones
): Resolucion {
  // Gran formato se ve de lejos: con 100 dpi ya se ve bien y 50 es el piso.
  const dpiIdeal = dim.granFormato ? 100 : 300
  const dpiMinimo = dim.granFormato ? 50 : 150

  // Si el archivo viene en la orientación contraria al producto, comparamos
  // lado largo con lado largo: si no, un diseño horizontal correcto para un
  // pendón vertical se calificaría mal por un problema que no es de calidad.
  let { anchoCm, altoCm } = dim
  if (anchoPx > altoPx !== anchoCm > altoCm) {
    ;[anchoCm, altoCm] = [altoCm, anchoCm]
  }

  const dpi = Math.floor(
    Math.min(anchoPx / (anchoCm / 2.54), altoPx / (altoCm / 2.54))
  )

  const anchoIdealPx = Math.round((dim.anchoCm / 2.54) * dpiIdeal)
  const altoIdealPx = Math.round((dim.altoCm / 2.54) * dpiIdeal)

  if (dpi >= dpiIdeal) {
    return {
      estado: 'ok',
      dpi,
      anchoIdealPx,
      altoIdealPx,
      mensaje: `Resolución excelente (${dpi} dpi). Tu diseño va a salir nítido.`,
    }
  }

  if (dpi >= dpiMinimo) {
    return {
      estado: 'advertencia',
      dpi,
      anchoIdealPx,
      altoIdealPx,
      mensaje: `Tu archivo tiene ${dpi} dpi para el tamaño elegido. Se puede imprimir, pero los bordes y los textos chicos pueden verse un poco blandos. Lo ideal serían ${anchoIdealPx} × ${altoIdealPx} px.`,
    }
  }

  return {
    estado: 'rechazado',
    dpi,
    anchoIdealPx,
    altoIdealPx,
    mensaje: `Con ${dpi} dpi el diseño va a salir borroso o pixelado impreso a ${dim.anchoCm} × ${dim.altoCm} cm. Necesitamos un archivo de al menos ${anchoIdealPx} × ${altoIdealPx} px, o el original en PDF, AI o EPS.`,
  }
}
