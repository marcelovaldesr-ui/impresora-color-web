'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react'

export interface CarritoItem {
  id: string
  productoSlug: string
  productoNombre: string
  opciones: Record<string, string>
  cantidad: number
  precio: number
  archivoNombre?: string
  archivoBlobUrl?: string
}

interface CarritoState {
  items: CarritoItem[]
}

type CarritoAction =
  | { type: 'AGREGAR'; item: CarritoItem }
  | { type: 'ELIMINAR'; id: string }
  | { type: 'LIMPIAR' }
  | { type: 'CARGAR'; items: CarritoItem[] }

function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case 'AGREGAR':
      return { items: [...state.items, action.item] }
    case 'ELIMINAR':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'LIMPIAR':
      return { items: [] }
    case 'CARGAR':
      return { items: action.items }
  }
}

interface CarritoContextType {
  items: CarritoItem[]
  agregarItem: (item: CarritoItem) => void
  eliminarItem: (id: string) => void
  limpiarCarrito: () => void
  totalItems: number
  totalPrecio: number
}

const CarritoContext = createContext<CarritoContextType | null>(null)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(carritoReducer, { items: [] })

  useEffect(() => {
    const stored = localStorage.getItem('carrito_ic')
    if (stored) {
      try {
        dispatch({ type: 'CARGAR', items: JSON.parse(stored) })
      } catch {
        // ignore corrupt data
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('carrito_ic', JSON.stringify(state.items))
  }, [state.items])

  const agregarItem = (item: CarritoItem) => dispatch({ type: 'AGREGAR', item })
  const eliminarItem = (id: string) => dispatch({ type: 'ELIMINAR', id })
  const limpiarCarrito = () => {
    dispatch({ type: 'LIMPIAR' })
    localStorage.removeItem('carrito_ic')
  }

  return (
    <CarritoContext.Provider
      value={{
        items: state.items,
        agregarItem,
        eliminarItem,
        limpiarCarrito,
        totalItems: state.items.length,
        totalPrecio: state.items.reduce((sum, i) => sum + i.precio, 0),
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito(): CarritoContextType {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}
