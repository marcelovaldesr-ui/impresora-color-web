export interface OpcionGrupo {
  id: string
  nombre: string
  valores: string[]
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

// Precios cargados desde catalogo_tienda_online.xlsx (filas marcadas "Sí").
// Precios FINALES con IVA incluido (19%). Actualizar solo desde el Excel maestro.

// TARJETAS DE PRESENTACIÓN — tamaño único 9 x 5 cm, couché 300 grs, cantidad única 100 un.
const TARJETAS: Record<string, Record<number, number>> = {
  '1 cara (4x0 color)': { 100: 9520 },
  '2 caras (4x4 color)': { 100: 16660 },
}

// FLYERS / VOLANTES — Couché 90g
const FLYERS: Record<string, Record<number, number>> = {
  'A6 (10,5 x 14,8 cm)': { 100: 16660, 200: 38080, 500: 53550, 1000: 80920 },
  'A5 (14,8 x 21 cm)': { 100: 26180, 200: 45220, 500: 69020, 1000: 92820 },
}

// STICKERS / CALCOMANÍAS — Vinilo brillante
// Nota: se dejan fuera "Circular 10 cm" (datos inconsistentes en el Excel, columnas de IVA
// no calzan) y "Circular 8 cm / 1000 un" (marcado "No" en el Excel) hasta que se confirmen precios.
const STICKERS: Record<string, Record<number, number>> = {
  'Circular 5 cm': { 100: 11900, 200: 16660, 500: 38080, 1000: 65450 },
  'Circular 8 cm': { 100: 14280, 200: 21420, 500: 41650 },
}

// PENDÓN ROLLER RETRÁCTIL — cada tamaño viene con un único tipo de estuche en el Excel
const PENDON: Record<string, number> = {
  '80 x 200 cm (sin estuche)': 38080,
  '90 x 200 cm (con estuche)': 42840,
  '100 x 200 cm (con estuche)': 45220,
}

// TELA PVC IMPRESA (lona) — sin ojetillos
const TELA_PVC: Record<string, number> = {
  '100 x 80 cm': 10115,
  '150 x 100 cm': 14280,
  '150 x 200 cm': 21420,
}

// ETIQUETAS ADHESIVAS — papel adhesivo mate
const ETIQUETAS: Record<string, Record<number, number>> = {
  'Rectangular 8x12 cm': { 1000: 65450, 2000: 104720, 5000: 214200 },
  'Rectangular 10x15 cm': { 1000: 80920, 2000: 130900, 5000: 249900 },
}

export const PRODUCTOS: Producto[] = [
  {
    slug: 'tarjetas-presentacion',
    nombre: 'Tarjetas de Presentación',
    descripcion:
      'Tarjetas profesionales para hacer crecer tu red de contactos. Tamaño 9 x 5 cm, papel couché 300 grs.',
    tiempoEntrega: '2-3 días hábiles',
    imagen: '/images/tarjetas.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'acabado', nombre: 'Impresión', valores: ['1 cara (4x0 color)', '2 caras (4x4 color)'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100'] },
    ],
    calcularPrecio: (opciones) => {
      const acabado = opciones.acabado ?? '1 cara (4x0 color)'
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      return TARJETAS[acabado]?.[cantidad] ?? 0
    },
  },
  {
    slug: 'flyers-volantes',
    nombre: 'Flyers / Volantes',
    descripcion:
      'Volantes de alta calidad para promocionar tu negocio. Papel couché 90g, impresión full color.',
    tiempoEntrega: '1-2 días hábiles',
    imagen: '/images/FLYER.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['A6 (10,5 x 14,8 cm)', 'A5 (14,8 x 21 cm)'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100', '200', '500', '1000'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? 'A6 (10,5 x 14,8 cm)'
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      return FLYERS[tamano]?.[cantidad] ?? 0
    },
  },
  {
    slug: 'stickers',
    nombre: 'Stickers / Calcomanías',
    descripcion:
      'Stickers circulares en vinilo brillante para packaging, branding y decoración. Corte de precisión.',
    tiempoEntrega: '2-4 días hábiles',
    imagen: '/images/sitkers.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['Circular 5 cm', 'Circular 8 cm'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100', '200', '500'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? 'Circular 5 cm'
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      return STICKERS[tamano]?.[cantidad] ?? 0
    },
  },
  {
    slug: 'pendon-roller',
    nombre: 'Pendón Roller Retráctil',
    descripcion:
      'Pendones con estructura enrollable, ideales para eventos, ferias y puntos de venta.',
    tiempoEntrega: '3-5 días hábiles',
    imagen: '/images/roller-producto.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      {
        id: 'tamano',
        nombre: 'Tamaño',
        valores: ['80 x 200 cm (sin estuche)', '90 x 200 cm (con estuche)', '100 x 200 cm (con estuche)'],
      },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '80 x 200 cm (sin estuche)'
      return PENDON[tamano] ?? 0
    },
  },
  {
    slug: 'tela-pvc-impresa',
    nombre: 'Tela PVC Impresa (Lona)',
    descripcion:
      'Lona impresa en PVC, sin ojetillos, ideal para publicidad exterior y de gran formato.',
    tiempoEntrega: '3-5 días hábiles',
    imagen: '/images/IMPRESIONES.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['100 x 80 cm', '150 x 100 cm', '150 x 200 cm'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '100 x 80 cm'
      return TELA_PVC[tamano] ?? 0
    },
  },
  {
    slug: 'etiquetas-adhesivas',
    nombre: 'Etiquetas Adhesivas',
    descripcion:
      'Etiquetas adhesivas rectangulares en papel mate, ideales para packaging y productos.',
    tiempoEntrega: '2-4 días hábiles',
    imagen: '/images/etiquetas.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['Rectangular 8x12 cm', 'Rectangular 10x15 cm'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['1000', '2000', '5000'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? 'Rectangular 8x12 cm'
      const cantidad = parseInt(opciones.cantidad ?? '1000', 10)
      return ETIQUETAS[tamano]?.[cantidad] ?? 0
    },
  },
]

export function getProducto(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug)
}
