import { useCallback, useMemo } from 'react'
import { useCart as useCartContext } from '@/context/CartContext'

export type { CartItem } from '@/context/CartContext'

// Re-export the useCart hook with additional utilities
export function useCart() {
  const cart = useCartContext()
  
  // Check if cart is empty
  const isEmpty = useMemo(() => cart.state.items.length === 0, [cart.state.items])
  
  // Check if cart has items requiring booking (services)
  const requiresBooking = useMemo(() => cart.state.items.some(item => item.type === 'service'), [cart.state.items])
  
  // Get cart summary (combined services and products)
  // Note: All prices already include 12% VAT
  const getCartSummary = useCallback(() => {
    const allItems = cart.state.items
    const serviceItems = allItems.filter(item => item.type === 'service')
    const productItems = allItems.filter(item => item.type === 'product')
    
    // These are totals with VAT already included
    const servicesTotal = serviceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const productsTotal = productItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const total = servicesTotal + productsTotal
    
    // Calculate breakdown: if price includes VAT, then base = price / 1.12
    const servicesSubtotal = Math.round((servicesTotal / 1.12) * 100) / 100
    const productsSubtotal = Math.round((productsTotal / 1.12) * 100) / 100
    const subtotal = servicesSubtotal + productsSubtotal
    const tax = Math.round((total - subtotal) * 100) / 100
    
    return {
      itemCount: allItems.reduce((sum, item) => sum + item.quantity, 0), // Total quantity of all items
      serviceCount: serviceItems.length,
      productCount: productItems.length,
      servicesSubtotal,
      productsSubtotal,
      subtotal,
      tax,
      total,
      isEmpty: allItems.length === 0,
      requiresBooking,
    }
  }, [cart.state.items, requiresBooking])
  
  // Format price for display
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }, [])
  
  // Check if item can be added to cart
  const canAddToCart = useCallback((item: { id: string; type: 'product' | 'service' }) => {
    const existingItem = cart.state.items.find(cartItem => cartItem.id === item.id)
    if (!existingItem) return true
    
    // For products, check stock limits (if implemented)
    if (item.type === 'product') {
      // Add stock checking logic here if needed
      return true
    }
    
    // For services, typically only one booking per service
    return false
  }, [cart.state.items])
  
  // Get services from cart
  const getServices = useCallback(() => {
    return cart.state.items.filter(item => item.type === 'service')
  }, [cart.state.items])
  
  // Get products from cart
  const getProducts = useCallback(() => {
    return cart.state.items.filter(item => item.type === 'product')
  }, [cart.state.items])

  return {
    ...cart,
    isEmpty,
    requiresBooking,
    getCartSummary,
    getServices,
    getProducts,
    formatPrice,
    canAddToCart,
  }
}
