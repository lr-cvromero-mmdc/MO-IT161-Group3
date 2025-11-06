import { useState, useEffect, useCallback, useRef } from "react"
import { useToast } from "@/hooks/useToast"
import {
  getAvailableTimeSlots,
  reserveTimeSlot,
  cancelReservation,
  getReservationsForUser,
  getBookingStatus,
  type BookingConflict,
} from "@/lib/bookingAvailability"

export interface BookingReservation {
  id: string
  locationId: string
  date: string
  timeSlot: string
  duration: number
  reservedUntil: string
  serviceId?: string
}

const SESSION_STORAGE_KEY = "espinosa-reservation-session"

function createSessionId() {
  return `session-${Math.random().toString(36).slice(2)}-${Date.now()}`
}

function ensureSessionId(): string {
  if (typeof window === "undefined") {
    return createSessionId()
  }

  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (existing) {
      return existing
    }

    const newId = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `session-${crypto.randomUUID()}`
      : createSessionId()

    window.sessionStorage.setItem(SESSION_STORAGE_KEY, newId)
    return newId
  } catch {
    return createSessionId()
  }
}

interface BookingSlotAvailability {
  timeSlot: string
  available: boolean
  conflicts: BookingConflict[]
  reason?: string
}

export function useBookingReservation() {
  const { success, error: showError } = useToast()
  const [reservations, setReservations] = useState<BookingReservation[]>([])
  const [isReserving, setIsReserving] = useState(false)
  const sessionIdRef = useRef<string>("")

  if (!sessionIdRef.current) {
    sessionIdRef.current = ensureSessionId()
  }

  const refreshReservations = useCallback(() => {
    const items = getReservationsForUser(sessionIdRef.current)
    setReservations(
      items.map(item => ({
        id: item.id,
        locationId: item.locationId,
        date: item.date,
        timeSlot: item.timeSlot,
        duration: item.duration,
        reservedUntil: item.reservedUntil,
        serviceId: item.serviceId,
      }))
    )
  }, [sessionIdRef])

  useEffect(() => {
    refreshReservations()
    const interval = setInterval(refreshReservations, 10000)
    return () => clearInterval(interval)
  }, [refreshReservations])

  const reserveSlot = useCallback(
    async (
      serviceId: string,
      locationId: string,
      date: string,
      timeSlot: string,
      duration: number
    ): Promise<{ success: boolean; reservationId?: string; conflicts: BookingConflict[] }> => {
      setIsReserving(true)

      try {
        const result = reserveTimeSlot(locationId, date, timeSlot, duration, sessionIdRef.current, serviceId)

        if (result.success && result.reservationId && result.reservedUntil) {
          const reservation: BookingReservation = {
            id: result.reservationId,
            locationId,
            date,
            timeSlot,
            duration,
            reservedUntil: result.reservedUntil,
            serviceId,
          }

          setReservations(prev => {
            const filtered = prev.filter(r => r.serviceId !== serviceId)
            return [...filtered, reservation]
          })
          refreshReservations()

          success("Time slot reserved", "Complete your booking within 15 minutes to keep your slot.")
          return { success: true, reservationId: result.reservationId, conflicts: [] }
        }

        const conflicts = result.conflicts ?? []
        if (conflicts.length > 0) {
          showError(conflicts[0].message)
        } else {
          showError("Time slot unavailable")
        }
        return { success: false, conflicts }
      } catch (error) {
        showError("Reservation failed. Please try again.")
        const fallbackConflict: BookingConflict = {
          type: "time_conflict",
          message: "Reservation failed",
          conflictingSlots: [],
        }
        return { success: false, conflicts: [fallbackConflict] }
      } finally {
        setIsReserving(false)
      }
    },
    [sessionIdRef, showError, success, refreshReservations]
  )

  const cancelSlotReservation = useCallback(
    (reservationId: string) => {
      const cancelled = cancelReservation(reservationId)
      if (cancelled) {
        setReservations(prev => prev.filter(r => r.id !== reservationId))
        refreshReservations()
        success("Reservation cancelled", "The slot is now available for other customers.")
      } else {
        showError("Failed to cancel reservation")
      }
      return cancelled
    },
    [showError, success, refreshReservations]
  )

  const getSlotStatus = useCallback((locationId: string, date: string, timeSlot: string) => {
    const status = getBookingStatus(locationId, date, timeSlot)
    return {
      status: status.status === "available" ? "available" : "unavailable",
      reason: status.conflicts?.[0]?.message,
    }
  }, [])

  const getAvailableSlotsForDate = useCallback(
    (locationId: string, date: string, duration: number = 60): BookingSlotAvailability[] => {
      return getAvailableTimeSlots(locationId, date, duration).map(slot => ({
        ...slot,
        reason: slot.conflicts[0]?.message,
      }))
    },
    []
  )

  const isSlotReservedByUser = useCallback(
    (locationId: string, date: string, timeSlot: string) => {
      return reservations.some(
        reservation =>
          reservation.locationId === locationId &&
          reservation.date === date &&
          reservation.timeSlot === timeSlot &&
          new Date(reservation.reservedUntil) > new Date()
      )
    },
    [reservations]
  )

  const getReservationTimeRemaining = useCallback(
    (reservationId: string): number => {
      const reservation = reservations.find(r => r.id === reservationId)
      if (!reservation) {
        return 0
      }

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
