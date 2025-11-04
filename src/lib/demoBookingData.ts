// Demo booking data and mock backend functions
// This simulates a real backend for testing the booking system

import { TIME_SLOTS } from './bookingAvailability'
import type { CartItem } from '@/context/CartContext'

// Demo existing bookings (simulates what would be in a database)
export const DEMO_BOOKINGS = [
  {
    id: 'demo-booking-1',
    locationId: 'main-branch',
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '09:00',
    duration: 45,
    customerName: 'Maria Santos',
    service: 'Premium Wash',
    status: 'confirmed' as const,
  },
  {
    id: 'demo-booking-2',
    locationId: 'main-branch',
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '11:00',
    duration: 30,
    customerName: 'John Doe',
    service: 'Basic Wash',
    status: 'confirmed' as const,
  },
  {
    id: 'demo-booking-3',
    locationId: 'quezon-city',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '10:00',
    duration: 90,
    customerName: 'Sarah Chen',
    service: 'Full Detailing',
    status: 'confirmed' as const,
  },
]

// In-memory storage for reservations (would be Redis/database in production)
const temporaryReservations: Array<{
  id: string
  serviceId: string
  locationId: string
  date: string
  timeSlot: string
  duration: number
  reservedBy: string
  reservedAt: number
  expiresAt: number
}> = []

// Session ID (would be user ID in production)
const SESSION_ID = `session-${Math.random().toString(36).substr(2, 9)}`

/**
 * Check if a time slot is available
 */
export function checkSlotAvailability(
  locationId: string,
  date: string,
  timeSlot: string,
  duration: number = 60
): {
  available: boolean
  reason?: string
} {
  // Check if in the past
  const slotDate = new Date(`${date}T${timeSlot}`)
  const now = new Date()
  if (slotDate < now) {
    return { available: false, reason: 'Time slot is in the past' }
  }

  // Check against demo bookings
  const hasConflict = DEMO_BOOKINGS.some(booking => {
    if (booking.locationId !== locationId || booking.date !== date) return false

    // Check time overlap
    const bookingStart = TIME_SLOTS.indexOf(booking.timeSlot)
    const bookingEnd = bookingStart + Math.ceil(booking.duration / 30)
    const slotStart = TIME_SLOTS.indexOf(timeSlot)
    const slotEnd = slotStart + Math.ceil(duration / 30)

    return !(slotEnd <= bookingStart || slotStart >= bookingEnd)
  })

  if (hasConflict) {
    return { available: false, reason: 'Time slot already booked' }
  }

  // Check against active reservations (not expired)
  const now_ms = Date.now()
  const activeReservations = temporaryReservations.filter(
    res => res.locationId === locationId &&
           res.date === date &&
           res.expiresAt > now_ms &&
           res.reservedBy !== SESSION_ID
  )

  const hasReservationConflict = activeReservations.some(reservation => {
    const resStart = TIME_SLOTS.indexOf(reservation.timeSlot)
    const resEnd = resStart + Math.ceil(reservation.duration / 30)
    const slotStart = TIME_SLOTS.indexOf(timeSlot)
    const slotEnd = slotStart + Math.ceil(duration / 30)

    return !(slotEnd <= resStart || slotStart >= resEnd)
  })

  if (hasReservationConflict) {
    return { available: false, reason: 'Time slot temporarily reserved by another user' }
  }

  return { available: true }
}

/**
 * Get all available time slots for a given date and location
 */
export function getAvailableSlots(
  locationId: string,
  date: string,
  duration: number = 60
): Array<{
  timeSlot: string
  available: boolean
  reason?: string
}> {
  return TIME_SLOTS.map(slot => {
    const { available, reason } = checkSlotAvailability(locationId, date, slot, duration)
    return {
      timeSlot: slot,
      available,
      reason,
    }
  })
}

/**
 * Reserve a time slot (15-minute temporary hold)
 */
export function reserveSlot(
  serviceId: string,
  locationId: string,
  date: string,
  timeSlot: string,
  duration: number
): {
  success: boolean
  reservationId?: string
  expiresAt?: number
  error?: string
} {
  // Check availability first
  const { available, reason } = checkSlotAvailability(locationId, date, timeSlot, duration)

  if (!available) {
    return {
      success: false,
      error: reason || 'Time slot not available',
    }
  }

  // Cancel any existing reservation for this service
  const existingIndex = temporaryReservations.findIndex(
    res => res.serviceId === serviceId && res.reservedBy === SESSION_ID
  )
  if (existingIndex !== -1) {
    temporaryReservations.splice(existingIndex, 1)
  }

  // Create new reservation
  const reservationId = `res-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

  temporaryReservations.push({
    id: reservationId,
    serviceId,
    locationId,
    date,
    timeSlot,
    duration,
    reservedBy: SESSION_ID,
    reservedAt: Date.now(),
    expiresAt,
  })

  // Cleanup expired reservations
  cleanupExpiredReservations()

  console.log('[DEMO] Reserved slot:', {
    reservationId,
    locationId,
    date,
    timeSlot,
    expiresIn: '15 minutes',
  })

  return {
    success: true,
    reservationId,
    expiresAt,
  }
}

/**
 * Cancel a reservation
 */
export function cancelReservation(reservationId: string): boolean {
  const index = temporaryReservations.findIndex(
    res => res.id === reservationId && res.reservedBy === SESSION_ID
  )

  if (index !== -1) {
    temporaryReservations.splice(index, 1)
    console.log('[DEMO] Cancelled reservation:', reservationId)
    return true
  }

  return false
}

/**
 * Get user's active reservations
 */
export function getMyReservations() {
  const now = Date.now()
  return temporaryReservations.filter(
    res => res.reservedBy === SESSION_ID && res.expiresAt > now
  )
}

/**
 * Clean up expired reservations
 */
function cleanupExpiredReservations() {
  const now = Date.now()
  const before = temporaryReservations.length

  for (let i = temporaryReservations.length - 1; i >= 0; i--) {
    if (temporaryReservations[i].expiresAt < now) {
      temporaryReservations.splice(i, 1)
    }
  }

  const removed = before - temporaryReservations.length
  if (removed > 0) {
    console.log(`[DEMO] Cleaned up ${removed} expired reservations`)
  }
}

/**
 * Simulate booking confirmation (would save to database in production)
 */
export function confirmBooking(
  items: CartItem[],
  customerInfo: {
    name: string
    email: string
    phone: string
  },
  paymentMethod: string
): {
  success: boolean
  confirmationCode?: string
  error?: string
} {
  // Validate all services have booking details
  const services = items.filter(item => item.type === 'service')
  const unbookedServices = services.filter(item => !item.bookingDetails)

  if (unbookedServices.length > 0) {
    return {
      success: false,
      error: `${unbookedServices.length} service(s) missing booking details`,
    }
  }

  // Validate all reservations still valid
  const now = Date.now()
  for (const service of services) {
    if (!service.bookingDetails?.reservationId) continue

    const reservation = temporaryReservations.find(
      res => res.id === service.bookingDetails.reservationId
    )

    if (!reservation) {
      return {
        success: false,
        error: `Reservation for ${service.name} not found`,
      }
    }

    if (reservation.expiresAt < now) {
      return {
        success: false,
        error: `Reservation for ${service.name} has expired`,
      }
    }
  }

  // Generate confirmation code
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  const confirmationCode = `ESP-${timestamp}-${random}`

  // In production, this would save to database
  console.log('[DEMO] Booking confirmed:', {
    confirmationCode,
    customer: customerInfo,
    items: items.map(item => ({
      name: item.name,
      type: item.type,
      booking: item.bookingDetails,
    })),
    payment: paymentMethod,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  })

  // Clear reservations after confirmation
  services.forEach(service => {
    if (service.bookingDetails?.reservationId) {
      cancelReservation(service.bookingDetails.reservationId)
    }
  })

  return {
    success: true,
    confirmationCode,
  }
}

/**
 * Get demo statistics (for display purposes)
 */
export function getDemoStats() {
  return {
    totalBookings: DEMO_BOOKINGS.length,
    activeReservations: temporaryReservations.filter(r => r.expiresAt > Date.now()).length,
    todayBookings: DEMO_BOOKINGS.filter(
      b => b.date === new Date().toISOString().split('T')[0]
    ).length,
  }
}

// Auto-cleanup every minute
if (typeof window !== 'undefined') {
  setInterval(cleanupExpiredReservations, 60000)
}
