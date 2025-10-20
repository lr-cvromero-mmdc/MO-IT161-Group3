import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Types
export type CartItemType = 'product' | 'service'

export interface CartItem {
  id: string
  type: CartItemType
  name: string
  price: number
  quantity: number
  image?: string
  description?: string
  // Service-specific fields
  duration?: number
  requiresLocation?: boolean
  requiresTimeSlot?: boolean
  // Booking details (for services)
  bookingDetails?: {
    date: string
    timeSlot: string
    locationId: string
    locationName?: string
    vehicleType?: string
    reservationId?: string // Link to temporary reservation
    reservedUntil?: string // Expiration time
  }
}

// DEPRECATED - Legacy ServiceBooking interface kept for backwards compatibility
// Booking details are now stored per-item in CartItem.bookingDetails
export interface ServiceBooking {
  locationId: string
  locationName: string
  date: string
  timeSlot: string
  vehicleType?: string
  specialInstructions?: string
}

export interface CartState {
  items: CartItem[]
  booking: ServiceBooking | null // DEPRECATED - kept for backwards compatibility only
  subtotal: number
  tax: number
  total: number
}

// Action Types
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_ITEM_BOOKING'; payload: { id: string; bookingDetails: CartItem['bookingDetails'] } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_BOOKING_DETAILS'; payload: ServiceBooking } // DEPRECATED
  | { type: 'LOAD_CART'; payload: CartState }

// Initial State
const initialState: CartState = {
  items: [],
  booking: null,
  subtotal: 0,
  tax: 0,
  total: 0,
}

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id)

      let newItems: CartItem[]
      if (existingItem) {
        // For services, don't allow duplicates - just replace
        if (action.payload.type === 'service') {
          newItems = state.items.map(item =>
            item.id === action.payload.id ? action.payload : item
          )
        } else {
          // For products, update quantity
          newItems = state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      } else {
        // Add new item
        newItems = [...state.items, action.payload]
      }

      return calculateTotals({ ...state, items: newItems })
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return calculateTotals({ ...state, items: newItems })
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0) // Remove items with 0 quantity

      return calculateTotals({ ...state, items: newItems })
    }

    case 'UPDATE_ITEM_BOOKING': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, bookingDetails: action.payload.bookingDetails }
          : item
      )

      return calculateTotals({ ...state, items: newItems })
    }

    case 'CLEAR_CART': {
      return initialState
    }

    case 'SET_BOOKING_DETAILS': {
      // DEPRECATED - kept for backwards compatibility
      return { ...state, booking: action.payload }
    }

    case 'LOAD_CART': {
      return action.payload
    }

    default:
      return state
  }
}

// Helper function to calculate totals
// Note: All prices already include 12% VAT, so we don't add additional tax
function calculateTotals(state: CartState): CartState {
  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Calculate the breakdown: price already includes VAT
  // If total = base + (base * 0.12), then base = total / 1.12
  const subtotal = total / 1.12
  const tax = total - subtotal

  return {
    ...state,
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  }
}

// Context
interface CartContextType {
  state: CartState
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  updateItemBooking: (itemId: string, bookingDetails: CartItem['bookingDetails']) => void
  clearCart: () => void
  setBookingDetails: (booking: ServiceBooking) => void // DEPRECATED - use updateItemBooking instead
  getItemCount: () => number
  hasServices: () => boolean
  hasProducts: () => boolean
  hasUnbookedServices: () => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider Component
interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('espinosa-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('espinosa-cart', JSON.stringify(state))
  }, [state])

  // Context methods
  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
  }

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } })
  }

  const updateItemBooking = (itemId: string, bookingDetails: CartItem['bookingDetails']) => {
    dispatch({ type: 'UPDATE_ITEM_BOOKING', payload: { id: itemId, bookingDetails } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // DEPRECATED - kept for backwards compatibility
  const setBookingDetails = (booking: ServiceBooking) => {
    console.warn('setBookingDetails is deprecated. Use updateItemBooking instead.')
    dispatch({ type: 'SET_BOOKING_DETAILS', payload: booking })
  }

  const getItemCount = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const hasServices = () => {
    return state.items.some(item => item.type === 'service')
  }

  const hasProducts = () => {
    return state.items.some(item => item.type === 'product')
  }

  const hasUnbookedServices = () => {
    return state.items.some(item => item.type === 'service' && !item.bookingDetails)
  }

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemBooking,
    clearCart,
    setBookingDetails,
    getItemCount,
    hasServices,
    hasProducts,
    hasUnbookedServices,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
