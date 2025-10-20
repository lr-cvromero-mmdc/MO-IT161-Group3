// Booking availability and conflict prevention system
import { CartItem } from '@/context/CartContext'

export interface BookingSlot {
  locationId: string
  date: string
  timeSlot: string
  duration: number
  isAvailable: boolean
  isReserved: boolean
  reservedUntil?: string
  reservedBy?: string
}

export interface BookingConflict {
  type: 'time_conflict' | 'location_conflict' | 'capacity_exceeded'
  message: string
  conflictingSlots: string[]
}

// Mock database of existing bookings (in real app, this would be a database)
const existingBookings: Array<{
  id: string
  locationId: string
  date: string
  timeSlot: string
  duration: number
  status: 'confirmed' | 'pending' | 'cancelled'
  createdAt: string
}> = [
  // Example existing bookings
  {
    id: 'booking-001',
    locationId: 'location-1',
    date: '2024-01-15',
    timeSlot: '09:00',
    duration: 60,
    status: 'confirmed',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'booking-002',
    locationId: 'location-1',
    date: '2024-01-15',
    timeSlot: '10:30',
    duration: 90,
    status: 'confirmed',
    createdAt: '2024-01-10T11:00:00Z'
  }
]

// Temporary reservations (expire after 15 minutes)
const temporaryReservations: Array<{
  id: string
  locationId: string
  date: string
  timeSlot: string
  duration: number
  reservedUntil: string
  reservedBy: string
}> = []

// Business hours and time slots
export const BUSINESS_HOURS = {
  start: '08:00',
  end: '18:00',
  breakStart: '12:00',
  breakEnd: '13:00'
}

export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
]

// Location capacity limits
export const LOCATION_CAPACITY = {
  'location-1': 3, // Can handle 3 cars simultaneously
  'location-2': 2,
  'location-3': 4
}

/**
 * Check if a time slot is available for booking
 */
export function isTimeSlotAvailable(
  locationId: string,
  date: string,
  timeSlot: string,
  duration: number,
  excludeBookingId?: string
): { available: boolean; conflicts: BookingConflict[] } {
  const conflicts: BookingConflict[] = []
  
  // Check if date is in the past
  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (selectedDate < today) {
    conflicts.push({
      type: 'time_conflict',
      message: 'Cannot book in the past',
      conflictingSlots: [timeSlot]
    })
    return { available: false, conflicts }
  }
  
  // Check if time slot is within business hours
  const timeSlotIndex = TIME_SLOTS.indexOf(timeSlot)
  if (timeSlotIndex === -1) {
    conflicts.push({
      type: 'time_conflict',
      message: 'Invalid time slot',
      conflictingSlots: [timeSlot]
    })
    return { available: false, conflicts }
  }
  
  // Check if service duration fits within business hours
  const endTimeIndex = timeSlotIndex + Math.ceil(duration / 30) - 1
  if (endTimeIndex >= TIME_SLOTS.length) {
    conflicts.push({
      type: 'time_conflict',
      message: 'Service duration exceeds business hours',
      conflictingSlots: TIME_SLOTS.slice(timeSlotIndex, timeSlotIndex + Math.ceil(duration / 30))
    })
    return { available: false, conflicts }
  }
  
  // Check for lunch break conflict
  const lunchStartIndex = TIME_SLOTS.indexOf(BUSINESS_HOURS.breakStart)
  const lunchEndIndex = TIME_SLOTS.indexOf(BUSINESS_HOURS.breakEnd)
  
  if (timeSlotIndex < lunchEndIndex && endTimeIndex >= lunchStartIndex) {
    conflicts.push({
      type: 'time_conflict',
      message: 'Service conflicts with lunch break (12:00-13:00)',
      conflictingSlots: TIME_SLOTS.slice(Math.max(timeSlotIndex, lunchStartIndex), Math.min(endTimeIndex + 1, lunchEndIndex))
    })
    return { available: false, conflicts }
  }
  
  // Check existing confirmed bookings
  const conflictingBookings = existingBookings.filter(booking => 
    booking.locationId === locationId &&
    booking.date === date &&
    booking.status === 'confirmed' &&
    booking.id !== excludeBookingId &&
    isTimeOverlap(timeSlot, duration, booking.timeSlot, booking.duration)
  )
  
  if (conflictingBookings.length > 0) {
    conflicts.push({
      type: 'time_conflict',
      message: 'Time slot is already booked',
      conflictingSlots: conflictingBookings.map(b => b.timeSlot)
    })
  }
  
  // Check temporary reservations
  const conflictingReservations = temporaryReservations.filter(reservation => 
    reservation.locationId === locationId &&
    reservation.date === date &&
    new Date(reservation.reservedUntil) > new Date() && // Not expired
    isTimeOverlap(timeSlot, duration, reservation.timeSlot, reservation.duration)
  )
  
  if (conflictingReservations.length > 0) {
    conflicts.push({
      type: 'time_conflict',
      message: 'Time slot is temporarily reserved',
      conflictingSlots: conflictingReservations.map(r => r.timeSlot)
    })
  }
  
  // Check location capacity
  const currentBookingsAtTime = existingBookings.filter(booking => 
    booking.locationId === locationId &&
    booking.date === date &&
    booking.status === 'confirmed' &&
    isTimeOverlap(timeSlot, duration, booking.timeSlot, booking.duration)
  ).length
  
  const currentReservationsAtTime = temporaryReservations.filter(reservation => 
    reservation.locationId === locationId &&
    reservation.date === date &&
    new Date(reservation.reservedUntil) > new Date() &&
    isTimeOverlap(timeSlot, duration, reservation.timeSlot, reservation.duration)
  ).length
  
  const totalAtTime = currentBookingsAtTime + currentReservationsAtTime
  const capacity = LOCATION_CAPACITY[locationId as keyof typeof LOCATION_CAPACITY] || 1
  
  if (totalAtTime >= capacity) {
    conflicts.push({
      type: 'capacity_exceeded',
      message: `Location at capacity (${capacity} cars max)`,
      conflictingSlots: [timeSlot]
    })
  }
  
  return {
    available: conflicts.length === 0,
    conflicts
  }
}

/**
 * Check if two time periods overlap
 */
function isTimeOverlap(
  start1: string, duration1: number,
  start2: string, duration2: number
): boolean {
  const start1Index = TIME_SLOTS.indexOf(start1)
  const end1Index = start1Index + Math.ceil(duration1 / 30) - 1
  
  const start2Index = TIME_SLOTS.indexOf(start2)
  const end2Index = start2Index + Math.ceil(duration2 / 30) - 1
  
  return !(end1Index < start2Index || end2Index < start1Index)
}

/**
 * Get available time slots for a given date and location
 */
export function getAvailableTimeSlots(
  locationId: string,
  date: string,
  duration: number
): Array<{ timeSlot: string; available: boolean; conflicts: BookingConflict[] }> {
  return TIME_SLOTS.map(timeSlot => {
    const result = isTimeSlotAvailable(locationId, date, timeSlot, duration)
    return {
      timeSlot,
      available: result.available,
      conflicts: result.conflicts
    }
  }).filter(slot => {
    // Filter out slots that would extend beyond business hours
    const timeSlotIndex = TIME_SLOTS.indexOf(slot.timeSlot)
    const endTimeIndex = timeSlotIndex + Math.ceil(duration / 30) - 1
    return endTimeIndex < TIME_SLOTS.length
  })
}

/**
 * Reserve a time slot temporarily (15 minutes)
 */
export function reserveTimeSlot(
  locationId: string,
  date: string,
  timeSlot: string,
  duration: number,
  reservedBy: string
): { success: boolean; reservationId?: string; conflicts: BookingConflict[] } {
  // Check availability first
  const availability = isTimeSlotAvailable(locationId, date, timeSlot, duration)
  
  if (!availability.available) {
    return {
      success: false,
      conflicts: availability.conflicts
    }
  }
  
  // Create reservation
  const reservationId = `reservation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const reservedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes from now
  
  temporaryReservations.push({
    id: reservationId,
    locationId,
    date,
    timeSlot,
    duration,
    reservedUntil,
    reservedBy
  })
  
  // Clean up expired reservations
  cleanupExpiredReservations()
  
  return {
    success: true,
    reservationId,
    conflicts: []
  }
}

/**
 * Confirm a booking (convert reservation to confirmed booking)
 */
export function confirmBooking(
  reservationId: string,
  customerInfo: {
    name: string
    email: string
    phone: string
  },
  services: CartItem[]
): { success: boolean; bookingId?: string; conflicts: BookingConflict[] } {
  // Find the reservation
  const reservationIndex = temporaryReservations.findIndex(r => r.id === reservationId)
  
  if (reservationIndex === -1) {
    return {
      success: false,
      conflicts: [{
        type: 'time_conflict',
        message: 'Reservation not found or expired',
        conflictingSlots: []
      }]
    }
  }
  
  const reservation = temporaryReservations[reservationIndex]
  
  // Check if reservation is still valid
  if (new Date(reservation.reservedUntil) < new Date()) {
    // Remove expired reservation
    temporaryReservations.splice(reservationIndex, 1)
    return {
      success: false,
      conflicts: [{
        type: 'time_conflict',
        message: 'Reservation has expired',
        conflictingSlots: []
      }]
    }
  }
  
  // Double-check availability
  const availability = isTimeSlotAvailable(
    reservation.locationId,
    reservation.date,
    reservation.timeSlot,
    reservation.duration
  )
  
  if (!availability.available) {
    // Remove reservation
    temporaryReservations.splice(reservationIndex, 1)
    return {
      success: false,
      conflicts: availability.conflicts
    }
  }
  
  // Create confirmed booking
  const bookingId = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  existingBookings.push({
    id: bookingId,
    locationId: reservation.locationId,
    date: reservation.date,
    timeSlot: reservation.timeSlot,
    duration: reservation.duration,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  })
  
  // Remove reservation
  temporaryReservations.splice(reservationIndex, 1)
  
  return {
    success: true,
    bookingId,
    conflicts: []
  }
}

/**
 * Cancel a reservation
 */
export function cancelReservation(reservationId: string): boolean {
  const index = temporaryReservations.findIndex(r => r.id === reservationId)
  if (index !== -1) {
    temporaryReservations.splice(index, 1)
    return true
  }
  return false
}

/**
 * Clean up expired reservations
 */
function cleanupExpiredReservations(): void {
  const now = new Date()
  for (let i = temporaryReservations.length - 1; i >= 0; i--) {
    if (new Date(temporaryReservations[i].reservedUntil) < now) {
      temporaryReservations.splice(i, 1)
    }
  }
}

/**
 * Get booking status for a specific time slot
 */
export function getBookingStatus(
  locationId: string,
  date: string,
  timeSlot: string
): {
  status: 'available' | 'booked' | 'reserved' | 'unavailable'
  bookingId?: string
  reservedUntil?: string
  conflicts: BookingConflict[]
} {
  // Check confirmed bookings
  const confirmedBooking = existingBookings.find(booking => 
    booking.locationId === locationId &&
    booking.date === date &&
    booking.timeSlot === timeSlot &&
    booking.status === 'confirmed'
  )
  
  if (confirmedBooking) {
    return {
      status: 'booked',
      bookingId: confirmedBooking.id,
      conflicts: []
    }
  }
  
  // Check temporary reservations
  const reservation = temporaryReservations.find(reservation => 
    reservation.locationId === locationId &&
    reservation.date === date &&
    reservation.timeSlot === timeSlot &&
    new Date(reservation.reservedUntil) > new Date()
  )
  
  if (reservation) {
    return {
      status: 'reserved',
      reservedUntil: reservation.reservedUntil,
      conflicts: []
    }
  }
  
  // Check if slot is available
  const availability = isTimeSlotAvailable(locationId, date, timeSlot, 60) // Default 60 min check
  
  return {
    status: availability.available ? 'available' : 'unavailable',
    conflicts: availability.conflicts
  }
}

/**
 * Validate multiple service bookings for conflicts
 */
export function validateMultipleBookings(
  bookings: Array<{
    serviceId: string
    locationId: string
    date: string
    timeSlot: string
    duration: number
  }>
): { isValid: boolean; conflicts: BookingConflict[] } {
  const conflicts: BookingConflict[] = []
  
  // Check each booking individually
  for (const booking of bookings) {
    const availability = isTimeSlotAvailable(
      booking.locationId,
      booking.date,
      booking.timeSlot,
      booking.duration
    )
    
    if (!availability.available) {
      conflicts.push(...availability.conflicts.map(conflict => ({
        ...conflict,
        conflictingSlots: [`${booking.serviceId}: ${booking.timeSlot}`]
      })))
    }
  }
  
  // Check for conflicts between bookings
  for (let i = 0; i < bookings.length; i++) {
    for (let j = i + 1; j < bookings.length; j++) {
      const booking1 = bookings[i]
      const booking2 = bookings[j]
      
      // Check if same location and date
      if (booking1.locationId === booking2.locationId && booking1.date === booking2.date) {
        if (isTimeOverlap(
          booking1.timeSlot, booking1.duration,
          booking2.timeSlot, booking2.duration
        )) {
          conflicts.push({
            type: 'time_conflict',
            message: `Services ${booking1.serviceId} and ${booking2.serviceId} have overlapping time slots`,
            conflictingSlots: [booking1.timeSlot, booking2.timeSlot]
          })
        }
      }
    }
  }
  
  return {
    isValid: conflicts.length === 0,
    conflicts
  }
}
