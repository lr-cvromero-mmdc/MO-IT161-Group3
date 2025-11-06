import { describe, it, expect } from 'vitest'

describe('Cart VAT Calculations', () => {
  it('should calculate 12% VAT correctly', () => {
    // Arrange: Set up test data
    const priceWithVAT = 2500 // ₱2,500 (includes 12% VAT)

    // Act: Perform calculation (Philippine VAT formula)
    const subtotal = priceWithVAT / 1.12
    const tax = priceWithVAT - subtotal

    // Assert: Check results
    expect(Math.round(subtotal)).toBe(2232) // ₱2,232.14
    expect(Math.round(tax)).toBe(268)       // ₱267.86
    expect(subtotal + tax).toBeCloseTo(priceWithVAT, 2)
  })

  it('should handle multiple items correctly', () => {
    const items = [
      { price: 1500, quantity: 1 }, // Basic Wash
      { price: 299, quantity: 2 },  // Shampoo x2
    ]

    const total = items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    )

    expect(total).toBe(2098) // 1500 + (299 * 2) = 2098
  })

  it('should calculate VAT for bundle deals', () => {
    const bundlePrice = 1800 // Bundle with VAT
    const subtotal = bundlePrice / 1.12
    const tax = bundlePrice - subtotal

    expect(Math.round(subtotal)).toBe(1607)
    expect(Math.round(tax)).toBe(193)
  })

  it('should round to 2 decimal places', () => {
    const price = 2500
    const subtotal = Math.round((price / 1.12) * 100) / 100
    const tax = Math.round((price - subtotal) * 100) / 100

    // Check no more than 2 decimal places
    expect(subtotal.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2)
    expect(tax.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2)
  })
})
