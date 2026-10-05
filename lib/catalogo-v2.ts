// ARCHIVO GENERADO desde catalogo_final_ampliado.xlsx (catálogo maestro v2, borrador).
// Alimenta SOLO la vista previa privada /tienda/catalogo-v2 (ver lib/catalogoV2Acceso.ts).
// NO lo usa la tienda pública (que sigue leyendo lib/productos.ts) y NO se puede comprar desde aquí.
// Precios FINALES con IVA incluido (19%), total por la cantidad elegida.
// Para actualizar: editar el Excel maestro y pedir que se regenere este archivo.
import type { Producto, OpcionGrupo } from './productos'

export interface DatosProductoV2 {
  slug: string
  nombre: string
  categoria: string
  /** Familia de tienda (agrupación visual del catálogo). */
  familia: string
  orden: number
  sinFoto: boolean
  chips: string[]
  /** Cantidad del pack más barato (para "desde $X por N u."). */
  desdeCantidad: number | null
  descripcion: string
  tiempoEntrega: string
  imagen: string
  /** Grupos que cambian el precio y grupos solo informativos (forma, color de anillo, etc.). */
  grupos: { id: string; nombre: string; valores: string[]; soloInformativo: boolean }[]
  filas: { o: Record<string, string>; p: number }[]
  /** 'si' = todas las filas marcadas Sí en el Excel; 'no' = todas No; 'mixto' = ambas. */
  estado: 'si' | 'no' | 'mixto'
}

const DATOS: DatosProductoV2[] = [
 {
  "slug": "v2-tarjetas-de-presentacion",
  "nombre": "Tarjetas de presentación",
  "categoria": "Tarjetas de presentación",
  "descripcion": "Tarjetas de presentación: 9 × 5 cm.",
  "familia": "Papelería e impresos",
  "orden": 0,
  "sinFoto": false,
  "chips": [
   "9 × 5 cm",
   "Couché 300 g",
   "1 o 2 caras"
  ],
  "desdeCantidad": 100,
  "tiempoEntrega": "1-3 días hábiles",
  "imagen": "/images/tarjetas-crop.png",
  "grupos": [
   {
    "id": "acabado",
    "nombre": "Impresión",
    "valores": [
     "couche 300 grs 4x0 color",
     "couche 300 grs 4x4 color"
    ],
    "soloInformativo": false
   },
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "100",
     "200",
     "500"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "acabado": "couche 300 grs 4x0 color",
     "cantidad": "100"
    },
    "p": 8000
   },
   {
    "o": {
     "acabado": "couche 300 grs 4x0 color",
     "cantidad": "200"
    },
    "p": 14000
   },
   {
    "o": {
     "acabado": "couche 300 grs 4x0 color",
     "cantidad": "500"
    },
    "p": 30000
   },
   {
    "o": {
     "acabado": "couche 300 grs 4x4 color",
     "cantidad": "100"
    },
    "p": 14000
   },
   {
    "o": {
     "acabado": "couche 300 grs 4x4 color",
     "cantidad": "200"
    },
    "p": 20000
   },
   {
    "o": {
     "acabado": "couche 300 grs 4x4 color",
     "cantidad": "500"
    },
    "p": 35000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-flyers-volantes",
  "nombre": "Flyers / Volantes",
  "categoria": "Flyers y volantes",
  "descripcion": "Flyers / Volantes.",
  "familia": "Papelería e impresos",
  "orden": 1,
  "sinFoto": false,
  "chips": [
   "A6 y A5",
   "Couché 90 g",
   "1 o 2 caras"
  ],
  "desdeCantidad": 100,
  "tiempoEntrega": "1-3 días hábiles",
  "imagen": "/images/FLYER.jpg",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Tamaño",
    "valores": [
     "A6 (10,5 × 14,8 cm)",
     "A5 (14,8 × 21 cm)"
    ],
    "soloInformativo": false
   },
   {
    "id": "acabado",
    "nombre": "Papel e impresión",
    "valores": [
     "Couché 90g — 1 cara",
     "Couché 90g — 2 caras"
    ],
    "soloInformativo": false
   },
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "100",
     "200",
     "500"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "A6 (10,5 × 14,8 cm)",
     "acabado": "Couché 90g — 1 cara",
     "cantidad": "100"
    },
    "p": 15000
   },
   {
    "o": {
     "medida": "A6 (10,5 × 14,8 cm)",
     "acabado": "Couché 90g — 1 cara",
     "cantidad": "200"
    },
    "p": 22000
   },
   {
    "o": {
     "medida": "A6 (10,5 × 14,8 cm)",
     "acabado": "Couché 90g — 1 cara",
     "cantidad": "500"
    },
    "p": 42000
   },
   {
    "o": {
     "medida": "A6 (10,5 × 14,8 cm)",
     "acabado": "Couché 90g — 2 caras",
     "cantidad": "100"
    },
    "p": 22000
   },
   {
    "o": {
     "medida": "A6 (10,5 × 14,8 cm)",
     "acabado": "Couché 90g — 2 caras",
     "cantidad": "200"
    },
    "p": 32000
   },
   {
    "o": {
     "medida": "A6 (10,5 × 14,8 cm)",
     "acabado": "Couché 90g — 2 caras",
     "cantidad": "500"
    },
    "p": 58000
   },
   {
    "o": {
     "medida": "A5 (14,8 × 21 cm)",
     "acabado": "Couché 90g — 1 cara",
     "cantidad": "100"
    },
    "p": 22000
   },
   {
    "o": {
     "medida": "A5 (14,8 × 21 cm)",
     "acabado": "Couché 90g — 1 cara",
     "cantidad": "200"
    },
    "p": 32000
   },
   {
    "o": {
     "medida": "A5 (14,8 × 21 cm)",
     "acabado": "Couché 90g — 1 cara",
     "cantidad": "500"
    },
    "p": 68000
   },
   {
    "o": {
     "medida": "A5 (14,8 × 21 cm)",
     "acabado": "Couché 90g — 2 caras",
     "cantidad": "100"
    },
    "p": 28000
   },
   {
    "o": {
     "medida": "A5 (14,8 × 21 cm)",
     "acabado": "Couché 90g — 2 caras",
     "cantidad": "200"
    },
    "p": 35000
   },
   {
    "o": {
     "medida": "A5 (14,8 × 21 cm)",
     "acabado": "Couché 90g — 2 caras",
     "cantidad": "500"
    },
    "p": 75000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-stickers",
  "nombre": "Stickers",
  "categoria": "Stickers",
  "descripcion": "Stickers: Vinilo brillante.",
  "familia": "Stickers y etiquetas",
  "orden": 106,
  "sinFoto": false,
  "chips": [
   "Vinilo brillante",
   "3 tamaños",
   "Forma a elección"
  ],
  "desdeCantidad": 100,
  "tiempoEntrega": "1-3 días hábiles",
  "imagen": "/images/sitkers.png",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Tamaño",
    "valores": [
     "3 cm",
     "5 cm",
     "8 cm"
    ],
    "soloInformativo": false
   },
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "100",
     "200",
     "500"
    ],
    "soloInformativo": false
   },
   {
    "id": "forma",
    "nombre": "Forma",
    "valores": [
     "Circular",
     "Rectangular",
     "Cuadrado"
    ],
    "soloInformativo": true
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "3 cm",
     "cantidad": "100"
    },
    "p": 8000
   },
   {
    "o": {
     "medida": "3 cm",
     "cantidad": "200"
    },
    "p": 14000
   },
   {
    "o": {
     "medida": "3 cm",
     "cantidad": "500"
    },
    "p": 28000
   },
   {
    "o": {
     "medida": "5 cm",
     "cantidad": "100"
    },
    "p": 10000
   },
   {
    "o": {
     "medida": "5 cm",
     "cantidad": "200"
    },
    "p": 16000
   },
   {
    "o": {
     "medida": "5 cm",
     "cantidad": "500"
    },
    "p": 32000
   },
   {
    "o": {
     "medida": "8 cm",
     "cantidad": "100"
    },
    "p": 14000
   },
   {
    "o": {
     "medida": "8 cm",
     "cantidad": "200"
    },
    "p": 22000
   },
   {
    "o": {
     "medida": "8 cm",
     "cantidad": "500"
    },
    "p": 45000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-pendon-roller-retractil",
  "nombre": "Pendón Roller retráctil",
  "categoria": "Pendones roller retráctiles",
  "descripcion": "Pendón Roller retráctil: Con estuche de transporte.",
  "familia": "Gran formato y publicidad",
  "orden": 211,
  "sinFoto": false,
  "chips": [
   "Con estuche",
   "4 tamaños"
  ],
  "desdeCantidad": null,
  "tiempoEntrega": "1-3 días hábiles",
  "imagen": "/images/roller-producto-crop.jpg",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Tamaño",
    "valores": [
     "80 × 200 cm",
     "90 × 200 cm",
     "100 × 200 cm",
     "120 × 200 cm"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "80 × 200 cm"
    },
    "p": 38000
   },
   {
    "o": {
     "medida": "90 × 200 cm"
    },
    "p": 40000
   },
   {
    "o": {
     "medida": "100 × 200 cm"
    },
    "p": 45000
   },
   {
    "o": {
     "medida": "120 × 200 cm"
    },
    "p": 50000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-tela-pvc-impresa",
  "nombre": "Tela PVC impresa",
  "categoria": "Tela PVC impresa",
  "descripcion": "Tela PVC impresa: Sin ojetillos.",
  "familia": "Gran formato y publicidad",
  "orden": 212,
  "sinFoto": false,
  "chips": [
   "Sin ojetillos",
   "4 tamaños"
  ],
  "desdeCantidad": null,
  "tiempoEntrega": "1-3 días hábiles",
  "imagen": "/images/tela-pvc-impresa.jpg",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Tamaño",
    "valores": [
     "100 × 80 cm",
     "150 × 100 cm",
     "150 × 200 cm",
     "80 × 60 cm"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "100 × 80 cm"
    },
    "p": 11500
   },
   {
    "o": {
     "medida": "150 × 100 cm"
    },
    "p": 15000
   },
   {
    "o": {
     "medida": "150 × 200 cm"
    },
    "p": 18000
   },
   {
    "o": {
     "medida": "80 × 60 cm"
    },
    "p": 8000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-credencial-pvc",
  "nombre": "Credencial PVC",
  "categoria": "Credencial PVC",
  "descripcion": "Credencial PVC: 8,5 × 5,5 cm, PVC blanco, impresión full color.",
  "familia": "Credenciales y PVC",
  "orden": 418,
  "sinFoto": false,
  "chips": [
   "PVC blanco",
   "Full color",
   "8,5 × 5,5 cm"
  ],
  "desdeCantidad": 1,
  "tiempoEntrega": "1-3 días hábiles",
  "imagen": "/images/tarjetaspvc.png",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "1",
     "2",
     "3",
     "4",
     "5"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "1"
    },
    "p": 2500
   },
   {
    "o": {
     "cantidad": "2"
    },
    "p": 5000
   },
   {
    "o": {
     "cantidad": "3"
    },
    "p": 7500
   },
   {
    "o": {
     "cantidad": "4"
    },
    "p": 10000
   },
   {
    "o": {
     "cantidad": "5"
    },
    "p": 12500
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-paloma-publicitaria",
  "nombre": "Paloma Publicitaria",
  "categoria": "Paloma Publicitaria",
  "descripcion": "Paloma Publicitaria.",
  "familia": "Gran formato y publicidad",
  "orden": 213,
  "sinFoto": false,
  "chips": [
   "1 o 2 caras",
   "3 tamaños"
  ],
  "desdeCantidad": null,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/paloma-publicitaria.jpg",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Tamaño",
    "valores": [
     "1,25X70",
     "1,5x70",
     "2x1m"
    ],
    "soloInformativo": false
   },
   {
    "id": "acabado",
    "nombre": "Impresión",
    "valores": [
     "1 Cara",
     "2 Cara"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "1,25X70",
     "acabado": "1 Cara"
    },
    "p": 22000
   },
   {
    "o": {
     "medida": "1,25X70",
     "acabado": "2 Cara"
    },
    "p": 32000
   },
   {
    "o": {
     "medida": "1,5x70",
     "acabado": "1 Cara"
    },
    "p": 24000
   },
   {
    "o": {
     "medida": "1,5x70",
     "acabado": "2 Cara"
    },
    "p": 38000
   },
   {
    "o": {
     "medida": "2x1m",
     "acabado": "1 Cara"
    },
    "p": 28000
   },
   {
    "o": {
     "medida": "2x1m",
     "acabado": "2 Cara"
    },
    "p": 42000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-calendario-mural",
  "nombre": "Calendario mural",
  "categoria": "Calendarios",
  "descripcion": "Calendario mural: 33 × 45 cm.",
  "familia": "Calendarios",
  "orden": 314,
  "sinFoto": false,
  "chips": [
   "33 × 45 cm"
  ],
  "desdeCantidad": 300,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/calendario-mural.jpg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "300",
     "500",
     "1000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "300"
    },
    "p": 600000
   },
   {
    "o": {
     "cantidad": "500"
    },
    "p": 800000
   },
   {
    "o": {
     "cantidad": "1000"
    },
    "p": 800000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-calendario-iman",
  "nombre": "Calendario imán",
  "categoria": "Calendarios",
  "descripcion": "Calendario imán.",
  "familia": "Calendarios",
  "orden": 317,
  "sinFoto": false,
  "chips": [
   "Imán"
  ],
  "desdeCantidad": 100,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/calendario-iman.jpg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "100",
     "250",
     "1000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "100"
    },
    "p": 50000
   },
   {
    "o": {
     "cantidad": "250"
    },
    "p": 87500
   },
   {
    "o": {
     "cantidad": "1000"
    },
    "p": 280000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-calendario-comercial-12-meses",
  "nombre": "Calendario comercial 12 meses",
  "categoria": "Calendarios",
  "descripcion": "Calendario comercial 12 meses: 31 × 38 cm, Taco comercial 38 × 26 cm.",
  "familia": "Calendarios",
  "orden": 315,
  "sinFoto": false,
  "chips": [
   "31 × 38 cm",
   "Taco 38 × 26 cm"
  ],
  "desdeCantidad": 100,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/calendario-comercial.jpg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "100",
     "200",
     "500",
     "1000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "100"
    },
    "p": 140000
   },
   {
    "o": {
     "cantidad": "200"
    },
    "p": 240000
   },
   {
    "o": {
     "cantidad": "500"
    },
    "p": 500000
   },
   {
    "o": {
     "cantidad": "1000"
    },
    "p": 1000000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-calendario-de-escritorio",
  "nombre": "Calendario de escritorio",
  "categoria": "Calendarios",
  "descripcion": "Calendario de escritorio: 6 láminas por ambas caras más portada de una cara, base de cartulina dúplex 325 g, portada y láminas en couché mate 200 g. Anillo a elección.",
  "familia": "Calendarios",
  "orden": 316,
  "sinFoto": false,
  "chips": [
   "22 × 14 cm",
   "6 láminas + portada",
   "Anillo a elección"
  ],
  "desdeCantidad": 50,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/calendario-escritorio.jpg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "50",
     "100",
     "250",
     "500"
    ],
    "soloInformativo": false
   },
   {
    "id": "anillo",
    "nombre": "Color del anillo",
    "valores": [
     "Plata",
     "Blanco",
     "Negro"
    ],
    "soloInformativo": true
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "50"
    },
    "p": 150000
   },
   {
    "o": {
     "cantidad": "100"
    },
    "p": 280000
   },
   {
    "o": {
     "cantidad": "250"
    },
    "p": 550000
   },
   {
    "o": {
     "cantidad": "500"
    },
    "p": 900000
   }
  ],
  "estado": "si"
 },
 {
  "slug": "v2-diplomas",
  "nombre": "Diplomas",
  "categoria": "Diplomas",
  "descripcion": "Diplomas: Opalina lisa 240 g, full color.",
  "familia": "Papelería e impresos",
  "orden": 3,
  "sinFoto": false,
  "chips": [
   "Opalina 240 g",
   "Full color",
   "3 tamaños"
  ],
  "desdeCantidad": 1,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/diplomas.jpg",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Tamaño",
    "valores": [
     "Tamaño carta",
     "Tamaño oficio",
     "Tamaño 9"
    ],
    "soloInformativo": false
   },
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "1",
     "50",
     "100"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "Tamaño carta",
     "cantidad": "1"
    },
    "p": 1500
   },
   {
    "o": {
     "medida": "Tamaño carta",
     "cantidad": "50"
    },
    "p": 75000
   },
   {
    "o": {
     "medida": "Tamaño carta",
     "cantidad": "100"
    },
    "p": 120000
   },
   {
    "o": {
     "medida": "Tamaño oficio",
     "cantidad": "1"
    },
    "p": 1800
   },
   {
    "o": {
     "medida": "Tamaño oficio",
     "cantidad": "50"
    },
    "p": 90000
   },
   {
    "o": {
     "medida": "Tamaño oficio",
     "cantidad": "100"
    },
    "p": 140000
   },
   {
    "o": {
     "medida": "Tamaño 9",
     "cantidad": "1"
    },
    "p": 2200
   },
   {
    "o": {
     "medida": "Tamaño 9",
     "cantidad": "50"
    },
    "p": 110000
   },
   {
    "o": {
     "medida": "Tamaño 9",
     "cantidad": "100"
    },
    "p": 170000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-papel-fotocopia-office",
  "nombre": "Papel fotocopia Office",
  "categoria": "Papel fotocopia (resmas)",
  "descripcion": "Papel fotocopia Office: Blanco 80 g, resma de 500 hojas.",
  "familia": "Papelería e impresos",
  "orden": 5,
  "sinFoto": false,
  "chips": [
   "Office 80 g",
   "Carta u oficio",
   "Resma 500 hojas"
  ],
  "desdeCantidad": 1,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/fotocopias.png",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Tamaño / Medida",
    "valores": [
     "Carta",
     "Oficio"
    ],
    "soloInformativo": false
   },
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "1",
     "10",
     "100"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "Carta",
     "cantidad": "1"
    },
    "p": 3800
   },
   {
    "o": {
     "medida": "Carta",
     "cantidad": "10"
    },
    "p": 38000
   },
   {
    "o": {
     "medida": "Carta",
     "cantidad": "100"
    },
    "p": 380000
   },
   {
    "o": {
     "medida": "Oficio",
     "cantidad": "1"
    },
    "p": 4500
   },
   {
    "o": {
     "medida": "Oficio",
     "cantidad": "10"
    },
    "p": 45000
   },
   {
    "o": {
     "medida": "Oficio",
     "cantidad": "100"
    },
    "p": 450000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-individuales",
  "nombre": "Individuales",
  "categoria": "Individuales",
  "descripcion": "Individuales.",
  "familia": "Papelería e impresos",
  "orden": 4,
  "sinFoto": false,
  "chips": [
   "Kraft o bond",
   "3 formatos"
  ],
  "desdeCantidad": 200,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/individuales.jpg",
  "grupos": [
   {
    "id": "acabado",
    "nombre": "Papel",
    "valores": [
     "Papel kraft 70 g",
     "Papel bond 80 g"
    ],
    "soloInformativo": false
   },
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "200",
     "500",
     "1000"
    ],
    "soloInformativo": false
   },
   {
    "id": "formato",
    "nombre": "Formato",
    "valores": [
     "Oficio (33 × 22 cm)",
     "Tamaño 9 (36 × 25 cm)",
     "Especial (42 × 35 cm)"
    ],
    "soloInformativo": true
   }
  ],
  "filas": [
   {
    "o": {
     "acabado": "Papel kraft 70 g",
     "cantidad": "200"
    },
    "p": 20000
   },
   {
    "o": {
     "acabado": "Papel kraft 70 g",
     "cantidad": "500"
    },
    "p": 40000
   },
   {
    "o": {
     "acabado": "Papel kraft 70 g",
     "cantidad": "1000"
    },
    "p": 65000
   },
   {
    "o": {
     "acabado": "Papel bond 80 g",
     "cantidad": "200"
    },
    "p": 16000
   },
   {
    "o": {
     "acabado": "Papel bond 80 g",
     "cantidad": "500"
    },
    "p": 35000
   },
   {
    "o": {
     "acabado": "Papel bond 80 g",
     "cantidad": "1000"
    },
    "p": 55000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-dipticos-y-tripticos",
  "nombre": "Dípticos y trípticos",
  "categoria": "Dípticos y trípticos",
  "descripcion": "Dípticos y trípticos: Couché 170 g, full color 4/0.",
  "familia": "Papelería e impresos",
  "orden": 2,
  "sinFoto": false,
  "chips": [
   "Couché 170 g",
   "Full color",
   "Carta u oficio"
  ],
  "desdeCantidad": 100,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/triptico.png",
  "grupos": [
   {
    "id": "medida",
    "nombre": "Formato",
    "valores": [
     "Carta",
     "Oficio"
    ],
    "soloInformativo": false
   },
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "100",
     "200",
     "300",
     "500"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "medida": "Carta",
     "cantidad": "100"
    },
    "p": 58000
   },
   {
    "o": {
     "medida": "Carta",
     "cantidad": "200"
    },
    "p": 85000
   },
   {
    "o": {
     "medida": "Carta",
     "cantidad": "300"
    },
    "p": 105000
   },
   {
    "o": {
     "medida": "Carta",
     "cantidad": "500"
    },
    "p": 150000
   },
   {
    "o": {
     "medida": "Oficio",
     "cantidad": "100"
    },
    "p": 72000
   },
   {
    "o": {
     "medida": "Oficio",
     "cantidad": "200"
    },
    "p": 110000
   },
   {
    "o": {
     "medida": "Oficio",
     "cantidad": "300"
    },
    "p": 125000
   },
   {
    "o": {
     "medida": "Oficio",
     "cantidad": "500"
    },
    "p": 175000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-etiquetas-de-longaniza",
  "nombre": "Etiquetas de longaniza",
  "categoria": "Etiquetas de longaniza",
  "descripcion": "Etiquetas de longaniza: Papel adhesivo Ritrama semibrillo. (Medida por confirmar.)",
  "familia": "Stickers y etiquetas",
  "orden": 107,
  "sinFoto": false,
  "chips": [
   "Adhesivo Ritrama",
   "Semibrillo"
  ],
  "desdeCantidad": 5000,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/etiquetas.png",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "5000",
     "10000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "5000"
    },
    "p": 160000
   },
   {
    "o": {
     "cantidad": "10000"
    },
    "p": 250000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-etiqueta-de-vino-15-4-cm",
  "nombre": "Etiqueta de vino 15 × 4 cm",
  "categoria": "Etiquetas de vino",
  "descripcion": "Etiqueta de vino 15 × 4 cm: 15 × 4 cm, Couché 170 g, 4/0, barniz UV.",
  "familia": "Stickers y etiquetas",
  "orden": 108,
  "sinFoto": true,
  "chips": [
   "15 × 4 cm",
   "Couché 170 g",
   "Barniz UV"
  ],
  "desdeCantidad": 5000,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/brand/logo-impresora-color.jpg.jpeg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "5000",
     "10000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "5000"
    },
    "p": 145000
   },
   {
    "o": {
     "cantidad": "10000"
    },
    "p": 185000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-etiqueta-adhesiva-botella-750-ml",
  "nombre": "Etiqueta adhesiva botella 750 ml",
  "categoria": "Etiquetas de vino",
  "descripcion": "Etiqueta adhesiva botella 750 ml: 10 × 12 cm, Papel adhesivo.",
  "familia": "Stickers y etiquetas",
  "orden": 109,
  "sinFoto": true,
  "chips": [
   "10 × 12 cm",
   "Papel adhesivo"
  ],
  "desdeCantidad": 200,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/brand/logo-impresora-color.jpg.jpeg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "200",
     "500",
     "1000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "200"
    },
    "p": 50000
   },
   {
    "o": {
     "cantidad": "500"
    },
    "p": 90000
   },
   {
    "o": {
     "cantidad": "1000"
    },
    "p": 110000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-etiqueta-de-vino-12-15-cm",
  "nombre": "Etiqueta de vino 12 × 15 cm",
  "categoria": "Etiquetas de vino",
  "descripcion": "Etiqueta de vino 12 × 15 cm: 12 × 15 cm, Couché 170 g, 4/0, barniz UV.",
  "familia": "Stickers y etiquetas",
  "orden": 110,
  "sinFoto": true,
  "chips": [
   "12 × 15 cm",
   "Couché 170 g",
   "Barniz UV"
  ],
  "desdeCantidad": 300,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/brand/logo-impresora-color.jpg.jpeg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "300",
     "500",
     "1000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "300"
    },
    "p": 48000
   },
   {
    "o": {
     "cantidad": "500"
    },
    "p": 68000
   },
   {
    "o": {
     "cantidad": "1000"
    },
    "p": 105000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-agenda-con-espiral",
  "nombre": "Agenda con espiral",
  "categoria": "Agendas de colegio",
  "descripcion": "Agenda con espiral: 14 × 20 cm, Tapa papel doble 300 g · interior 80 págs. B/N bond 80 g.",
  "familia": "Agendas",
  "orden": 519,
  "sinFoto": false,
  "chips": [
   "14 × 20 cm",
   "80 págs.",
   "Con espiral"
  ],
  "desdeCantidad": 500,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/agenda-espiral.jpg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "500",
     "1000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "500"
    },
    "p": 1400000
   },
   {
    "o": {
     "cantidad": "1000"
    },
    "p": 2200000
   }
  ],
  "estado": "no"
 },
 {
  "slug": "v2-agenda-corcheteada",
  "nombre": "Agenda corcheteada",
  "categoria": "Agendas de colegio",
  "descripcion": "Agenda corcheteada: 14 × 20 cm, Portada full color · interior 80 págs. B/N bond 80 g.",
  "familia": "Agendas",
  "orden": 520,
  "sinFoto": false,
  "chips": [
   "14 × 20 cm",
   "80 págs.",
   "Portada full color"
  ],
  "desdeCantidad": 300,
  "tiempoEntrega": "Por confirmar",
  "imagen": "/images/agenda-corcheteada.jpg",
  "grupos": [
   {
    "id": "cantidad",
    "nombre": "Cantidad",
    "valores": [
     "300",
     "500",
     "1000"
    ],
    "soloInformativo": false
   }
  ],
  "filas": [
   {
    "o": {
     "cantidad": "300"
    },
    "p": 450000
   },
   {
    "o": {
     "cantidad": "500"
    },
    "p": 650000
   },
   {
    "o": {
     "cantidad": "1000"
    },
    "p": 980000
   }
  ],
  "estado": "no"
 }
]

export interface ItemCatalogoV2 {
  producto: Producto
  categoria: string
  familia: string
  orden: number
  sinFoto: boolean
  chips: string[]
  desdeCantidad: number | null
  estado: 'si' | 'no' | 'mixto'
  desde: number
}

function construir(d: DatosProductoV2): ItemCatalogoV2 {
  const gruposPrecio = d.grupos.filter((g) => !g.soloInformativo)
  const tabla = new Map<string, number>()
  for (const f of d.filas) {
    tabla.set(gruposPrecio.map((g) => f.o[g.id] ?? '').join('|'), f.p)
  }
  const producto: Producto = {
    slug: d.slug,
    nombre: d.nombre,
    descripcion: d.descripcion,
    tiempoEntrega: d.tiempoEntrega,
    imagen: d.imagen,
    formatosAceptados: ['PDF', 'AI', 'EPS', 'PNG', 'JPG', 'TIFF'],
    opcionGrupos: d.grupos.map((g): OpcionGrupo => ({ id: g.id, nombre: g.nombre, valores: g.valores })),
    calcularPrecio: (opciones) =>
      tabla.get(gruposPrecio.map((g) => opciones[g.id] ?? g.valores[0]).join('|')) ?? 0,
    // Solo se usa para revisar resolución de archivos, y la vista previa no permite subir.
    dimensiones: () => ({ anchoCm: 21, altoCm: 29.7, granFormato: false }),
  }
  return {
    producto,
    categoria: d.categoria,
    familia: d.familia,
    orden: d.orden,
    sinFoto: d.sinFoto,
    chips: d.chips,
    desdeCantidad: d.desdeCantidad,
    estado: d.estado,
    desde: Math.min(...d.filas.map((f) => f.p)),
  }
}

export const CATALOGO_V2: ItemCatalogoV2[] = DATOS.map(construir).sort((a, b) => a.orden - b.orden)

export function getProductoV2(slug: string): Producto | undefined {
  return CATALOGO_V2.find((i) => i.producto.slug === slug)?.producto
}
