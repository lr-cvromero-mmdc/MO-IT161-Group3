/**
 * Application-wide constants and configuration values
 * 
 * This file centralizes all magic numbers, timeouts, and configuration
 * values used throughout the application for better maintainability.
 */

// ====================
// TIMING CONSTANTS
// ====================

/**
 * Duration to show skeleton loading screens (in milliseconds)
 * Used for simulating API loading states with a smooth UX
 */
export const SKELETON_DELAY_MS = 800

/**
 * Reservation expiry time (in milliseconds)
 * Time slots are held for 15 minutes during checkout
 */
export const RESERVATION_EXPIRY_MS = 15 * 60 * 1000

/**
 * Mock payment processing time (in milliseconds)
 * Simulates realistic payment gateway response time
 */
export const PAYMENT_PROCESSING_TIME_MS = 2000

/**
 * Debounce delay for search inputs (in milliseconds)
 * Prevents excessive filtering during user typing
 */
export const SEARCH_DEBOUNCE_MS = 200

/**
 * Splash screen minimum display duration (in milliseconds)
 * Ensures branding is visible even on fast connections
 */
export const SPLASH_SCREEN_MIN_DURATION_MS = 2000

/**
 * Fade transition duration after splash screen (in milliseconds)
 */
export const CONTENT_FADE_IN_DELAY_MS = 100

/**
 * Scroll behavior smooth transition duration (in milliseconds)
 */
export const SCROLL_SMOOTH_DURATION_MS = 300

// ====================
// BUSINESS RULES
// ====================

/**
 * Philippine Value Added Tax rate (12%)
 * Applied to all services and products
 */
export const VAT_RATE = 0.12

/**
 * Credit card processing fee rate (3%)
 * Additional charge for card payments
 */
export const CARD_PROCESSING_FEE_RATE = 0.03

/**
 * Minimum name length for form validation
 */
export const MIN_NAME_LENGTH = 2

/**
 * Philippine mobile number format
 * Must start with 09 and be 11 digits total
 */
export const PHONE_NUMBER_REGEX = /^09\d{9}$/

/**
 * Email validation regex (RFC 5322 simplified)
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ====================
// BUSINESS HOURS
// ====================

/**
 * Business operating hours
 */
export const BUSINESS_HOURS = {
  /** Opening time (8:00 AM) */
  START: '08:00' as const,
  /** Closing time (6:00 PM) */
  END: '18:00' as const,
  /** Lunch break start (12:00 PM) */
  BREAK_START: '12:00' as const,
  /** Lunch break end (1:00 PM) */
  BREAK_END: '13:00' as const,
} as const

/**
 * Available time slots in 30-minute intervals
 */
export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
] as const

/**
 * Time slot interval in minutes
 */
export const TIME_SLOT_INTERVAL_MINUTES = 30

// ====================
// LOCATION CAPACITY
// ====================

/**
 * Maximum concurrent bookings per location
 * Different locations have different capacity limits
 */
export const LOCATION_CAPACITY = {
  'location-1': 3, // Main branch - can handle 3 cars simultaneously
  'location-2': 2, // Secondary branch - 2 cars
  'location-3': 4, // Largest branch - 4 cars
} as const

// ====================
// UI/UX CONSTANTS
// ====================

/**
 * Maximum items to show in autocomplete suggestions
 */
export const MAX_AUTOCOMPLETE_RESULTS = 5

/**
 * Scroll threshold for navbar background change (in pixels)
 */
export const NAVBAR_SCROLL_THRESHOLD = 80

/**
 * Maximum file upload size in bytes (5MB)
 */
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

/**
 * Toast notification display duration (in milliseconds)
 */
export const TOAST_DURATION_MS = 3000

// ====================
// VALIDATION CONSTANTS
// ====================

/**
 * Password minimum length requirement
 */
export const MIN_PASSWORD_LENGTH = 8

/**
 * Maximum text input length
 */
export const MAX_TEXT_LENGTH = 500

/**
 * Maximum items in cart
 */
export const MAX_CART_ITEMS = 20

// ====================
// PAYMENT METHODS
// ====================

/**
 * Valid payment methods
 */
export const PAYMENT_METHODS = ['cash', 'gcash', 'maya', 'card'] as const

/**
 * Payment method type
 */
export type PaymentMethod = typeof PAYMENT_METHODS[number]

// ====================
// API/EXTERNAL SERVICES
// ====================

/**
 * Google Maps API key (from environment variable)
 */
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

/**
 * Mock payment success rate for development (95%)
 */
export const MOCK_PAYMENT_SUCCESS_RATE = 0.95

// ====================
// RESPONSIVE BREAKPOINTS
// ====================

/**
 * Tailwind CSS breakpoints for responsive design
 * These match the Tailwind configuration
 */
export const BREAKPOINTS = {
  /** Small devices (640px) */
  SM: 640,
  /** Medium devices (768px) */
  MD: 768,
  /** Large devices (1024px) */
  LG: 1024,
  /** Extra large devices (1280px) */
  XL: 1280,
  /** 2X large devices (1536px) */
  '2XL': 1536,
} as const

// ====================
// LOCALSTORAGE KEYS
// ====================

/**
 * localStorage key names for persistent data
 */
export const STORAGE_KEYS = {
  /** Shopping cart state */
  CART: 'espinosa-cart',
  /** User preferences */
  PREFERENCES: 'espinosa-preferences',
  /** Session visit flag */
  HAS_VISITED: 'hasVisited',
} as const

// ====================
// SERVICE DURATIONS
// ====================

/**
 * Standard service duration in minutes
 */
export const SERVICE_DURATIONS = {
  BASIC_WASH: 30,
  PREMIUM_WASH: 45,
  FULL_DETAILING: 90,
  WAX_APPLICATION: 20,
  INTERIOR_DEEP_CLEAN: 30,
  ENGINE_BAY_CLEAN: 15,
} as const

// ====================
// ERROR MESSAGES
// ====================

/**
 * Standard error messages for consistency
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
  BOOKING_CONFLICT: 'This time slot is no longer available. Please select another time.',
  INVALID_INPUT: 'Please check your input and try again.',
  CART_EMPTY: 'Your cart is empty. Add services or products to continue.',
  SESSION_EXPIRED: 'Your session has expired. Please start over.',
} as const

// ====================
// SUCCESS MESSAGES
// ====================

/**
 * Standard success messages for consistency
 */
export const SUCCESS_MESSAGES = {
  BOOKING_CONFIRMED: 'Booking confirmed successfully!',
  PAYMENT_SUCCESSFUL: 'Payment processed successfully.',
  ITEM_ADDED: 'Item added to cart!',
  MESSAGE_SENT: 'Message sent successfully. We\'ll get back to you soon!',
} as const

