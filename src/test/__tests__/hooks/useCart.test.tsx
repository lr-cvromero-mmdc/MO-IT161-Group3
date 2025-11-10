import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCart } from '@/hooks/useCart'
import { CartProvider } from '@/context/CartContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('useCart Hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty cart initially', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.isEmpty).toBe(true)
    expect(result.current.getCartSummary().itemCount).toBe(0)
  })

  it('checks if cart requires booking', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    // Initially no booking required
    expect(result.current.requiresBooking).toBe(false)
    
    // Add service
    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 500,
        quantity: 1,
      })
    })
    
    // Now requires booking
    expect(result.current.requiresBooking).toBe(true)
  })

  it('calculates cart summary correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    // Add service
    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 500,
        quantity: 1,
      })
    })
    
    // Add product
    act(() => {
      result.current.addToCart({
        id: 'car-shampoo',
        type: 'product',
        name: 'Car Shampoo',
        price: 300,
        quantity: 1,
      })
    })
    
    const summary = result.current.getCartSummary()
    
    expect(summary.itemCount).toBe(2)
    expect(summary.serviceCount).toBe(1)
    expect(summary.productCount).toBe(1)
    expect(summary.total).toBe(800) // 500 + 300
  })

  it('formats price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    const formatted = result.current.formatPrice(500)
    expect(formatted).toContain('₱')
    expect(formatted).toContain('500')
  })

  it('checks if cart has services', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.hasServices()).toBe(false)
    
    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 500,
        quantity: 1,
      })
    })
    
    expect(result.current.hasServices()).toBe(true)
  })

  it('checks if cart has unbooked services', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.hasUnbookedServices()).toBe(false)
    
    // Add service without booking details
    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 500,
        quantity: 1,
      })
    })
    
    expect(result.current.hasUnbookedServices()).toBe(true)
    
    // Update service with booking details
    act(() => {
      result.current.updateItemBooking('basic-wash', {
        locationId: 'location-1',
        date: '2024-01-01',
        timeSlot: '10:00',
      })
    })
    
    expect(result.current.hasUnbookedServices()).toBe(false)
  })

  it('gets services from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart({
        id: 'basic-wash',
        type: 'service',
        name: 'Basic Wash',
        price: 500,
        quantity: 1,
      })
    })
    
    const services = result.current.getServices()
    expect(services).toHaveLength(1)
    expect(services[0].id).toBe('basic-wash')
  })

  it('gets products from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart({
        id: 'car-shampoo',
        type: 'product',
        name: 'Car Shampoo',
        price: 300,
        quantity: 1,
      })
    })
    
    const products = result.current.getProducts()
    expect(products).toHaveLength(1)
    expect(products[0].id).toBe('car-shampoo')
  })
})

