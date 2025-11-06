// Payment utilities for handling pricing, taxes, and payment processing
import { logger } from './logger'

/**
 * Calculates the 12% VAT (Value Added Tax) for Philippines
 *
 * @param subtotal - Price before tax in Philippine Pesos (₱)
 * @returns Tax amount rounded to 2 decimal places
 *
 * @example
 * ```typescript
 * const tax = calculateTax(2232) // Returns 268
 * // ₱2,232 * 12% = ₱268
 * ```
 *
 * @remarks
 * Philippines standard VAT rate is 12% as of 2025
 * Result is rounded to nearest centavo (₱0.01)
 */
export function calculateTax(subtotal: number): number {
  return Math.round(subtotal * 0.12 * 100) / 100
}

// Calculate total including tax
export function calculateTotal(subtotal: number): number {
  const tax = calculateTax(subtotal)
  return Math.round((subtotal + tax) * 100) / 100
}

/**
 * Formats price as Philippine Peso currency string without decimals
 *
 * @param price - Amount in Philippine Pesos (₱)
 * @returns Formatted currency string (e.g., "₱2,500")
 *
 * @example
 * ```typescript
 * const formatted = formatPrice(2500) // Returns "₱2,500"
 * const formatted2 = formatPrice(125000) // Returns "₱125,000"
 * ```
 *
 * @remarks
 * Uses Philippine English locale (en-PH) with PHP currency
 * Rounds to nearest peso (no decimal places)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Format price with decimals for precise calculations
export function formatPriceWithDecimals(price: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

// Validate payment method
export function validatePaymentMethod(method: string): { isValid: boolean; error?: string } {
  const validMethods = ['cash', 'gcash', 'maya', 'card']
  
  if (!method) {
    return { isValid: false, error: 'Payment method is required' }
  }
  
  if (!validMethods.includes(method)) {
    return { isValid: false, error: 'Invalid payment method' }
  }
  
  return { isValid: true }
}

// Process payment (mock function - in real app, this would integrate with payment gateway)
export async function processPayment(
  amount: number,
  method: string,
  customerInfo: {
    name: string
    email: string
    phone: string
  }
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  // Mock payment processing
  return new Promise((resolve) => {
    setTimeout(() => {
      logger.logPayment('Processing payment', {
        amount,
        method,
        customer: customerInfo,
      })
      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        resolve({ success: true, transactionId })
      } else {
        resolve({ success: false, error: 'Payment processing failed. Please try again.' })
      }
    }, 2000) // Simulate 2-second processing time
  })
}

// Get payment method details
export function getPaymentMethodDetails(method: string) {
  const methods = {
    cash: {
      name: 'Cash on Arrival',
      description: 'Pay when you arrive at the location',
      iconName: 'Banknote',
      instructions: 'Please bring exact change or prepare to pay upon arrival.',
      processingFee: 0,
    },
    gcash: {
      name: 'GCash',
      description: 'Pay via GCash mobile wallet',
      iconName: 'Smartphone',
      instructions: 'You will receive a GCash payment request via SMS.',
      processingFee: 0,
    },
    maya: {
      name: 'Maya',
      description: 'Pay via Maya mobile wallet',
      iconName: 'Smartphone',
      instructions: 'You will receive a Maya payment request via SMS.',
      processingFee: 0,
    },
    card: {
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard, or other cards',
      iconName: 'CreditCard',
      instructions: 'Secure payment processing powered by Stripe.',
      processingFee: 0.03, // 3% processing fee
    },
  }
  
  return methods[method as keyof typeof methods] || null
}

// Calculate processing fees
export function calculateProcessingFee(amount: number, method: string): number {
  const methodDetails = getPaymentMethodDetails(method)
  if (!methodDetails) return 0
  
  return Math.round(amount * methodDetails.processingFee * 100) / 100
}

// Calculate final amount including processing fees
export function calculateFinalAmount(subtotal: number, method: string): number {
  const tax = calculateTax(subtotal)
  const processingFee = calculateProcessingFee(subtotal, method)
  return Math.round((subtotal + tax + processingFee) * 100) / 100
}

/**
 * Generates a complete payment summary with all charges and formatted strings
 *
 * @param subtotal - Base price before taxes and fees in Philippine Pesos (₱)
 * @param method - Payment method ('cash', 'gcash', 'maya', 'card')
 * @returns Object containing raw numbers and formatted strings for display
 *
 * @example
 * ```typescript
 * const summary = generatePaymentSummary(2232, 'cash')
 * console.log(summary)
 * // {
 * //   subtotal: 2232,
 * //   tax: 268,           // 12% VAT
 * //   processingFee: 0,   // No fee for cash
 * //   total: 2500,
 * //   formatted: {
 * //     subtotal: '₱2,232',
 * //     tax: '₱268',
 * //     processingFee: '₱0',
 * //     total: '₱2,500'
 * //   }
 * // }
 * ```
 *
 * @remarks
 * Processing fees:
 * - Cash: 0%
 * - GCash: 0%
 * - Maya: 0%
 * - Card: 3%
 *
 * Tax is always 12% VAT (Philippines standard)
 */
export function generatePaymentSummary(
  subtotal: number,
  method: string
): {
  subtotal: number
  tax: number
  processingFee: number
  total: number
  formatted: {
    subtotal: string
    tax: string
    processingFee: string
    total: string
  }
} {
  const tax = calculateTax(subtotal)
  const processingFee = calculateProcessingFee(subtotal, method)
  const total = subtotal + tax + processingFee
  
  return {
    subtotal,
    tax,
    processingFee,
    total,
    formatted: {
      subtotal: formatPrice(subtotal),
      tax: formatPrice(tax),
      processingFee: formatPrice(processingFee),
      total: formatPrice(total),
    },
  }
}

// Validate customer information
export function validateCustomerInfo(customerInfo: {
  name: string
  email: string
  phone: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!customerInfo.name || customerInfo.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (!customerInfo.email || !isValidEmail(customerInfo.email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!customerInfo.phone || !isValidPhoneNumber(customerInfo.phone)) {
    errors.push('Please enter a valid phone number')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation (Philippines format)
function isValidPhoneNumber(phone: string): boolean {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // Check if it's a valid Philippine mobile number
  // Should start with 09 and be 11 digits total
  return /^09\d{9}$/.test(digits)
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  
  if (digits.length === 11 && digits.startsWith('09')) {
    return `+63 ${digits.substring(1, 5)} ${digits.substring(5, 9)} ${digits.substring(9)}`
  }
  
  return phone
}
