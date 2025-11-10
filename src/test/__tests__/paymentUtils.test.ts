// Tests for payment utilities
import { describe, it, expect } from 'vitest'
import { calculateTax, calculateTotal, formatPrice, validatePaymentMethod } from '@/lib/paymentUtils'

describe('Payment Utils', () => {
  describe('calculateTax', () => {
    it('calculates 12% VAT correctly', () => {
      expect(calculateTax(1000)).toBe(120)
      expect(calculateTax(500)).toBe(60)
      expect(calculateTax(0)).toBe(0)
    })

    it('rounds to 2 decimal places', () => {
      const result = calculateTax(100)
      expect(result).toBe(12)
      expect(result.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2)
    })
  })

  describe('calculateTotal', () => {
    it('calculates total including tax', () => {
      expect(calculateTotal(1000)).toBe(1120)
      expect(calculateTotal(500)).toBe(560)
    })

    it('handles zero subtotal', () => {
      expect(calculateTotal(0)).toBe(0)
    })
  })

  describe('formatPrice', () => {
    it('formats price in PHP currency', () => {
      expect(formatPrice(1000)).toContain('₱')
      expect(formatPrice(1000)).toContain('1,000')
    })

    it('formats zero correctly', () => {
      expect(formatPrice(0)).toContain('₱')
      expect(formatPrice(0)).toContain('0')
    })
  })

  describe('validatePaymentMethod', () => {
    it('validates correct payment methods', () => {
      expect(validatePaymentMethod('cash').isValid).toBe(true)
      expect(validatePaymentMethod('gcash').isValid).toBe(true)
      expect(validatePaymentMethod('maya').isValid).toBe(true)
      expect(validatePaymentMethod('card').isValid).toBe(true)
    })

    it('rejects invalid payment methods', () => {
      expect(validatePaymentMethod('invalid').isValid).toBe(false)
      expect(validatePaymentMethod('invalid').error).toBeDefined()
    })

    it('rejects empty payment method', () => {
      expect(validatePaymentMethod('').isValid).toBe(false)
      expect(validatePaymentMethod('').error).toContain('required')
    })
  })
})

