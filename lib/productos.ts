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

// ⚠️ PRECIOS DE REFERENCIA CON IVA INCLUIDO — Actualizar antes de publicar
const TARJETAS: Record<string, Record<number, number>> = {
  satinado: { 100: 12000, 250: 20000, 500: 32000, 1000: 50000 },
  mate: { 100: 14000, 250: 23000, 500: 37000, 1000: 58000 },
}

const FLYERS_BASE: Record<string, Record<number, number>> = {
  '90g': { 100: 8000, 250: 13000, 500: 20000, 1000: 32000 },
  '115g couché': { 100: 10000, 250: 16000, 500: 25000, 1000: 40000 },
}

const FLYERS_FACTOR_TAMANO: Record<string, number> = {
  A6: 1.0,
  A5: 1.6,
  A4: 2.5,
  Carta: 2.8,
}

const STICKERS_BASE: Record<number, number> = {
  50: 6000,
  100: 10000,
  250: 20000,
  500: 35000,
}

const STICKERS_FACTOR_TAMANO: Record<string, number> = {
  '5cm': 1.0,
  '8cm': 1.6,
  '10cm': 2.2,
  Personalizado: 1.8,
}

const PENDON_PRECIOS: Record<string, Record<string, number>> = {
  '80x200cm': { 'Sin estuche': 35000, 'Con estuche': 45000 },
  '100x200cm': { 'Sin estuche': 42000, 'Con estuche': 52000 },
}

export const PRODUCTOS: Producto[] = [
  {
    slug: 'tarjetas-presentacion',
    nombre: 'Tarjetas de Presentación',
    descripcion:
      'Tarjetas profesionales para hacer crecer tu red de contactos. Impresión a doble cara, acabado premium.',
    tiempoEntrega: '2-3 días hábiles',
    imagen: '/images/tarjetas.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['9x5cm', '9x5.5cm'] },
      { id: 'papel', nombre: 'Tipo de papel', valores: ['satinado', 'mate'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100', '250', '500', '1000'] },
    ],
    calcularPrecio: (opciones) => {
      const papel = (opciones.papel ?? 'satinado').toLowerCase()
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      return TARJETAS[papel]?.[cantidad] ?? 0
    },
  },
  {
    slug: 'flyers-volantes',
    nombre: 'Flyers / Volantes',
    descripcion:
      'Volantes de alta calidad para promocionar tu negocio. Impresión a full color, ambas caras.',
    tiempoEntrega: '1-2 días hábiles',
    imagen: '/images/FLYER.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['A6', 'A5', 'A4', 'Carta'] },
      { id: 'papel', nombre: 'Gramaje', valores: ['90g', '115g couché'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['100', '250', '500', '1000'] },
    ],
    calcularPrecio: (opciones) => {
      const papel = opciones.papel ?? '90g'
      const tamano = opciones.tamano ?? 'A6'
      const cantidad = parseInt(opciones.cantidad ?? '100', 10)
      const base = FLYERS_BASE[papel]?.[cantidad] ?? 0
      const factor = FLYERS_FACTOR_TAMANO[tamano] ?? 1
      return Math.round((base * factor) / 1000) * 1000
    },
  },
  {
    slug: 'stickers',
    nombre: 'Stickers / Calcomanías',
    descripcion:
      'Stickers adhesivos de alta calidad para packaging, branding y decoración. Corte de precisión.',
    tiempoEntrega: '2-4 días hábiles',
    imagen: '/images/sitkers.png',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'forma', nombre: 'Forma', valores: ['Circular', 'Cuadrado', 'Rectangular'] },
      { id: 'tamano', nombre: 'Tamaño', valores: ['5cm', '8cm', '10cm', 'Personalizado'] },
      { id: 'cantidad', nombre: 'Cantidad', valores: ['50', '100', '250', '500'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '5cm'
      const cantidad = parseInt(opciones.cantidad ?? '50', 10)
      const base = STICKERS_BASE[cantidad] ?? 0
      const factor = STICKERS_FACTOR_TAMANO[tamano] ?? 1
      return Math.round((base * factor) / 1000) * 1000
    },
  },
  {
    slug: 'pendon-roller',
    nombre: 'Pendón Roller',
    descripcion:
      'Pendones de alta calidad con estructura enrollable. Ideales para eventos, ferias y puntos de venta.',
    tiempoEntrega: '3-5 días hábiles',
    imagen: '/images/roller-producto.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['80x200cm', '100x200cm'] },
      { id: 'estuche', nombre: 'Estuche de transporte', valores: ['Sin estuche', 'Con estuche'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '80x200cm'
      const estuche = opciones.estuche ?? 'Sin estuche'
      return PENDON_PRECIOS[tamano]?.[estuche] ?? 0
    },
  },
]

export function getProducto(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug)
}
