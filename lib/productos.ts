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
    '1 cara': { 100: 13000, 200: 17500, 500: 35000 },
    '2 caras': { 100: 18500, 200: 28000, 500: 52000 },
  },
  'A5 (14,8 x 21 cm)': {
    '1 cara': { 100: 14000, 200: 26000, 500: 58000 },
    '2 caras': { 100: 22000, 200: 35000, 500: 75000 },
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
    tiempoEntrega: '2-3 días hábiles',
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
  },
  {
    slug: 'flyers-volantes',
    nombre: 'Flyers / Volantes',
    descripcion:
      'Volantes de alta calidad para promocionar tu negocio. Papel couché 90g, 1 o 2 caras.',
    tiempoEntrega: '1-2 días hábiles',
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
  },
  {
    slug: 'stickers',
    nombre: 'Stickers / Calcomanías',
    descripcion:
      'Stickers en vinilo brillante para packaging, branding y decoración. Mismo precio en forma circular, rectangular o cuadrada.',
    tiempoEntrega: '2-4 días hábiles',
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
  },
  {
    slug: 'pendon-roller',
    nombre: 'Pendón Roller Retráctil',
    descripcion:
      'Pendones con estructura enrollable y estuche de transporte incluido. Ideales para eventos, ferias y puntos de venta.',
    tiempoEntrega: '3-5 días hábiles',
    imagen: '/images/roller-producto-crop.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['80 x 200 cm', '90 x 200 cm', '100 x 200 cm', '120 x 200 cm'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '80 x 200 cm'
      return PENDON[tamano] ?? 0
    },
  },
  {
    slug: 'tela-pvc-impresa',
    nombre: 'Tela PVC Impresa (Lona)',
    descripcion:
      'Lona impresa en PVC, sin ojetillos, ideal para publicidad exterior y de gran formato.',
    tiempoEntrega: '3-5 días hábiles',
    imagen: '/images/tela-pvc-impresa.jpg',
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: [
      { id: 'tamano', nombre: 'Tamaño', valores: ['80 x 60 cm', '100 x 80 cm', '150 x 100 cm', '150 x 200 cm'] },
    ],
    calcularPrecio: (opciones) => {
      const tamano = opciones.tamano ?? '80 x 60 cm'
      return TELA_PVC[tamano] ?? 0
    },
  },
  {
    slug: 'credencial-pvc',
    nombre: 'Credencial PVC',
    descripcion:
      'Credencial tipo carne en PVC blanco, impresion full color. Tamaño estándar 8,5 x 5,5 cm. Valor $2.500 por unidad (hasta 5 unidades); para mayores cantidades, cotiza por privado.',
    tiempoEntrega: '2-4 días hábiles',
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
  },
]

export function getProducto(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug)
}
