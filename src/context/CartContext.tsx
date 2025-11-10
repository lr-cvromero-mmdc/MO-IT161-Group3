import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback, useMemo } from 'react'
import { logger } from '@/lib/logger'

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

export interface CartState {
  items: CartItem[]
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
  | { type: 'LOAD_CART'; payload: CartState }

// Initial State
const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
}

interface PersistedCartState {
  items?: unknown
  subtotal?: unknown
  tax?: unknown
  total?: unknown
  booking?: unknown
}

/**
 * Rehydrate cart state loaded from storage and strip deprecated fields.
 *
 * @param rawValue - Parsed JSON value from localStorage.
 * @returns A validated cart state object.
 */
function sanitizeCartState(rawValue: unknown): CartState {
  const candidate = (typeof rawValue === 'object' && rawValue !== null)
    ? rawValue as PersistedCartState
    : {}

  const items = Array.isArray(candidate.items)
    ? candidate.items
        .map(item => sanitizeCartItem(item))
        .filter((item): item is CartItem => item !== null)
    : []

  const hydrated: CartState = {
    items,
    subtotal: typeof candidate.subtotal === 'number' ? candidate.subtotal : 0,
    tax: typeof candidate.tax === 'number' ? candidate.tax : 0,
    total: typeof candidate.total === 'number' ? candidate.total : 0,
  }

  return calculateTotals(hydrated)
}

interface PersistedCartItem {
  id?: unknown
  type?: unknown
  name?: unknown
  price?: unknown
  quantity?: unknown
  image?: unknown
  description?: unknown
  duration?: unknown
  requiresLocation?: unknown
  requiresTimeSlot?: unknown
  bookingDetails?: unknown
}

interface PersistedBookingDetails {
  date?: unknown
  timeSlot?: unknown
  locationId?: unknown
  locationName?: unknown
  vehicleType?: unknown
  reservationId?: unknown
  reservedUntil?: unknown
}

/**
 * Validate a cart item loaded from storage.
 *
 * @param rawItem - Potential cart entry stored in localStorage.
 * @returns A normalized cart item or null when validation fails.
 */
function sanitizeCartItem(rawItem: unknown): CartItem | null {
  if (typeof rawItem !== 'object' || rawItem === null) {
    return null
  }

  const candidate = rawItem as PersistedCartItem

  if (
    typeof candidate.id !== 'string' ||
    (candidate.type !== 'product' && candidate.type !== 'service') ||
    typeof candidate.name !== 'string' ||
    typeof candidate.price !== 'number' ||
    typeof candidate.quantity !== 'number'
  ) {
    return null
  }

  return {
    id: candidate.id,
    type: candidate.type,
    name: candidate.name,
    price: candidate.price,
    quantity: candidate.quantity,
    image: typeof candidate.image === 'string' ? candidate.image : undefined,
    description: typeof candidate.description === 'string' ? candidate.description : undefined,
    duration: typeof candidate.duration === 'number' ? candidate.duration : undefined,
    requiresLocation: typeof candidate.requiresLocation === 'boolean' ? candidate.requiresLocation : undefined,
    requiresTimeSlot: typeof candidate.requiresTimeSlot === 'boolean' ? candidate.requiresTimeSlot : undefined,
    bookingDetails: sanitizeBookingDetails(candidate.bookingDetails),
  }
}

/**
 * Validate booking details stored on a legacy cart item.
 *
 * @param rawValue - Potential booking details object.
 * @returns Normalized booking details or undefined when invalid.
 */
function sanitizeBookingDetails(rawValue: unknown): CartItem['bookingDetails'] {
  if (typeof rawValue !== 'object' || rawValue === null) {
    return undefined
  }

  const candidate = rawValue as PersistedBookingDetails

  if (
    typeof candidate.date !== 'string' ||
    typeof candidate.timeSlot !== 'string' ||
    typeof candidate.locationId !== 'string'
  ) {
    return undefined
  }

  return {
    date: candidate.date,
    timeSlot: candidate.timeSlot,
    locationId: candidate.locationId,
    locationName: typeof candidate.locationName === 'string' ? candidate.locationName : undefined,
    vehicleType: typeof candidate.vehicleType === 'string' ? candidate.vehicleType : undefined,
    reservationId: typeof candidate.reservationId === 'string' ? candidate.reservationId : undefined,
    reservedUntil: typeof candidate.reservedUntil === 'string' ? candidate.reservedUntil : undefined,
  }
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

    case 'LOAD_CART': {
      return action.payload
    }

    default:
      return state
  }
}

/**
 * Calculate cart financial totals.
 *
 * Note: All prices already include 12% VAT, so we don't add additional tax.
 */
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
        dispatch({ type: 'LOAD_CART', payload: sanitizeCartState(parsedCart) })
      } catch (error) {
        logger.error('Failed to load cart from localStorage', error as Error)
      }
    }
  }, [])

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('espinosa-cart', JSON.stringify(state))
    } catch (error) {
      logger.error('Failed to persist cart to localStorage', error as Error)
    }
  }, [state])

  // Context methods
  /**
   * Add an item to the cart or merge quantities for duplicate product entries.
   */
  const addToCart = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
  }, [])

  /**
   * Remove a cart entry by its identifier.
   */
  const removeFromCart = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
  }, [])

  /**
   * Update the quantity of a cart entry, removing it when the value drops to zero.
   */
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } })
  }, [])

  /**
   * Attach booking details to a service item for scheduling information.
   */
  const updateItemBooking = useCallback((itemId: string, bookingDetails: CartItem['bookingDetails']) => {
    dispatch({ type: 'UPDATE_ITEM_BOOKING', payload: { id: itemId, bookingDetails } })
  }, [])

  /**
   * Clear all items from the cart and reset totals.
   */
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  /**
   * Count the total number of product and service units in the cart.
   */
  const getItemCount = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0)
  }, [state.items])

  /**
   * Determine if any services are present in the cart.
   */
  const hasServices = useCallback(() => {
    return state.items.some(item => item.type === 'service')
  }, [state.items])

  /**
   * Determine if any products are present in the cart.
   */
  const hasProducts = useCallback(() => {
    return state.items.some(item => item.type === 'product')
  }, [state.items])

  /**
   * Determine if any service items still require booking details.
   */
  const hasUnbookedServices = useCallback(() => {
    return state.items.some(item => item.type === 'service' && !item.bookingDetails)
  }, [state.items])

  const value: CartContextType = useMemo(() => ({
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemBooking,
    clearCart,
    getItemCount,
    hasServices,
    hasProducts,
    hasUnbookedServices,
  }), [
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemBooking,
    clearCart,
    getItemCount,
    hasServices,
    hasProducts,
    hasUnbookedServices,
  ])

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
