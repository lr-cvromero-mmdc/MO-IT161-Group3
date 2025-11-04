import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import { ReactNode } from 'react'

// Wrapper for testing hooks
const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should start with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.state.items).toHaveLength(0)
    expect(result.current.state.total).toBe(0)
  })

  it('should add service to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 1500,
        quantity: 1,
        duration: 30,
      })
    })

    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.items[0].name).toBe('Basic Wash')
    expect(result.current.state.total).toBe(1500)
  })

  it('should add product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 'car-shampoo',
        type: 'product',
        name: 'Car Shampoo',
        price: 299,
        quantity: 1,
      })
    })

    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.total).toBe(299)
  })

  it('should increment product quantity when adding same product', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    const product = {
      id: 'car-shampoo',
      type: 'product' as const,
      name: 'Car Shampoo',
      price: 299,
      quantity: 1,
    }

    act(() => {
      result.current.addToCart(product)
      result.current.addToCart(product)
    })

    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.items[0].quantity).toBe(2)
    expect(result.current.state.total).toBe(598) // 299 * 2
  })

  it('should replace service when adding same service', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    const service = {
      id: 'basic-wash',
      type: 'service' as const,
      name: 'Basic Wash',
      price: 1500,
      quantity: 1,
      duration: 30,
    }

    act(() => {
      result.current.addToCart(service)
      result.current.addToCart({ ...service, price: 2000 }) // Changed price
    })

    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.items[0].quantity).toBe(1) // NOT 2
    expect(result.current.state.items[0].price).toBe(2000) // Updated
  })

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 1500,
        quantity: 1,
        duration: 30,
      })
    })

    expect(result.current.state.items).toHaveLength(1)

    act(() => {
      result.current.removeFromCart('basic-wash')
    })

    expect(result.current.state.items).toHaveLength(0)
    expect(result.current.state.total).toBe(0)
  })

  it('should calculate VAT correctly (12%)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 'premium-wash',
        type: 'service',
        name: 'Premium Wash',
        price: 2500,
        quantity: 1,
        duration: 45,
      })
    })

    // Total with VAT: ₱2,500
    expect(result.current.state.total).toBe(2500)

    // Subtotal (before VAT): ₱2,500 / 1.12 = ₱2,232.14
    expect(Math.round(result.current.state.subtotal)).toBe(2232)

    // Tax (12%): ₱2,500 - ₱2,232.14 = ₱267.86
    expect(Math.round(result.current.state.tax)).toBe(268)
  })

  it('should clear entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 1500,
        quantity: 1,
        duration: 30,
      })
      result.current.addToCart({
        id: 'car-shampoo',
        type: 'product',
        name: 'Car Shampoo',
        price: 299,
        quantity: 2,
      })
    })

    expect(result.current.state.items).toHaveLength(2)

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.state.items).toHaveLength(0)
    expect(result.current.state.total).toBe(0)
  })

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 'car-shampoo',
        type: 'product',
        name: 'Car Shampoo',
        price: 299,
        quantity: 1,
      })
    })

    act(() => {
      result.current.updateQuantity('car-shampoo', 5)
    })

    expect(result.current.state.items[0].quantity).toBe(5)
    expect(result.current.state.total).toBe(1495) // 299 * 5
  })

  it('should remove item when quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart({
        id: 'car-shampoo',
        type: 'product',
        name: 'Car Shampoo',
        price: 299,
        quantity: 3,
      })
    })

    act(() => {
      result.current.updateQuantity('car-shampoo', 0)
    })

    expect(result.current.state.items).toHaveLength(0)
  })

  it('should calculate totals for mixed cart (services + products)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      // Add service
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 1500,
        quantity: 1,
        duration: 30,
      })

      // Add product
      result.current.addToCart({
        id: 'car-shampoo',
        type: 'product',
        name: 'Car Shampoo',
        price: 299,
        quantity: 2,
      })
    })

    const expectedTotal = 1500 + (299 * 2) // 2098
    expect(result.current.state.total).toBe(expectedTotal)
    expect(result.current.state.items).toHaveLength(2)
  })
})
