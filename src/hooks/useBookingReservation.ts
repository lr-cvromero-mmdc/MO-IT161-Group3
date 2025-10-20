import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/useToast'
import {
  checkSlotAvailability,
  getAvailableSlots,
  reserveSlot as demoReserveSlot,
  cancelReservation as demoCancelReservation,
  getMyReservations,
} from '@/lib/demoBookingData'

export interface BookingReservation {
  id: string
  locationId: string
  date: string
  timeSlot: string
  duration: number
  reservedUntil: string
  serviceId: string
}

export function useBookingReservation() {
  const { success, error: showError } = useToast()
  const [reservations, setReservations] = useState<BookingReservation[]>([])
  const [isReserving, setIsReserving] = useState(false)

  // Load reservations on mount
  useEffect(() => {
    const myReservations = getMyReservations()
    setReservations(
      myReservations.map(res => ({
        id: res.id,
        locationId: res.locationId,
        date: res.date,
        timeSlot: res.timeSlot,
        duration: res.duration,
        reservedUntil: new Date(res.expiresAt).toISOString(),
        serviceId: res.serviceId,
      }))
    )
  }, [])

  // Clean up expired reservations periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setReservations(prev =>
        prev.filter(reservation => new Date(reservation.reservedUntil) > now)
      )
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  /**
   * Reserve a time slot for a service
   */
  const reserveSlot = useCallback(
    async (
      serviceId: string,
      locationId: string,
      date: string,
      timeSlot: string,
      duration: number
    ): Promise<{ success: boolean; reservationId?: string; conflicts: any[] }> => {
      setIsReserving(true)

      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const result = demoReserveSlot(serviceId, locationId, date, timeSlot, duration)

        if (result.success && result.reservationId && result.expiresAt) {
          const reservation: BookingReservation = {
            id: result.reservationId,
            locationId,
            date,
            timeSlot,
            duration,
            reservedUntil: new Date(result.expiresAt).toISOString(),
            serviceId,
          }

          setReservations(prev => {
            // Remove any existing reservation for this service
            const filtered = prev.filter(r => r.serviceId !== serviceId)
            return [...filtered, reservation]
          })

          return { success: true, reservationId: result.reservationId, conflicts: [] }
        } else {
          return {
            success: false,
            conflicts: [{ message: result.error || 'Time slot unavailable' }],
          }
        }
      } catch (err) {
        return { success: false, conflicts: [{ message: 'Reservation failed' }] }
      } finally {
        setIsReserving(false)
      }
    },
    []
  )

  /**
   * Cancel a reservation
   */
  const cancelSlotReservation = useCallback((reservationId: string) => {
    const success = demoCancelReservation(reservationId)
    if (success) {
      setReservations(prev => prev.filter(r => r.id !== reservationId))
    }
    return success
  }, [])

  /**
   * Get slot status (available, reserved, booked)
   */
  const getSlotStatus = useCallback(
    (locationId: string, date: string, timeSlot: string) => {
      const { available, reason } = checkSlotAvailability(locationId, date, timeSlot, 60)
      return {
        status: available ? 'available' : 'unavailable',
        reason,
      }
    },
    []
  )

  /**
   * Get available slots for a date/location
   */
  const getAvailableSlotsForDate = useCallback(
    (locationId: string, date: string, duration: number = 60) => {
      return getAvailableSlots(locationId, date, duration)
    },
    []
  )

  /**
   * Check if user has a reservation for specific slot
   */
  const isSlotReservedByUser = useCallback(
    (locationId: string, date: string, timeSlot: string) => {
      return reservations.some(
        r =>
          r.locationId === locationId &&
          r.date === date &&
          r.timeSlot === timeSlot &&
          new Date(r.reservedUntil) > new Date()
      )
    },
    [reservations]
  )

  /**
   * Get time remaining for a reservation
   */
  const getReservationTimeRemaining = useCallback(
    (reservationId: string): number => {
      const reservation = reservations.find(r => r.id === reservationId)
      if (!reservation) return 0

      const remaining = new Date(reservation.reservedUntil).getTime() - Date.now()
      return Math.max(0, remaining)
    },
    [reservations]
  )

  return {
    reservations,
    isReserving,
    reserveSlot,
    cancelSlotReservation,
    getSlotStatus,
    getAvailableSlots: getAvailableSlotsForDate,
    isSlotReservedByUser,
    getReservationTimeRemaining,
  }
}
