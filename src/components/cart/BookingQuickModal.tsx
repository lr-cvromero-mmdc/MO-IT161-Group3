import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, MapPin, Clock, Car, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { LOCATIONS, VEHICLE_TYPES, formatTimeDisplay } from '@/lib/bookingUtils'
import { useBookingReservation } from '@/hooks/useBookingReservation'
import { useToast } from '@/hooks/useToast'
import { TIME_SLOTS } from '@/lib/bookingAvailability'
import type { CartItem } from '@/context/CartContext'

interface BookingQuickModalProps {
  isOpen: boolean
  onClose: () => void
  service: CartItem
  onBookingComplete: (bookingDetails: CartItem['bookingDetails']) => void
}

export function BookingQuickModal({ isOpen, onClose, service, onBookingComplete }: BookingQuickModalProps) {
  const { success, error: showError } = useToast()
  const {
    reserveSlot,
    getAvailableSlots,
    isReserving,
  } = useBookingReservation()

  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [locationId, setLocationId] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  // Get available time slots based on selection
  const availableSlots = date && locationId
    ? getAvailableSlots(locationId, date, service.duration || 60)
    : []

  // Check if selected slot is available
  const getSlotAvailability = (slot: string) => {
    if (!locationId || !date) return { available: false, reason: 'Select date and location first' }

    const slotInfo = availableSlots.find(s => s.timeSlot === slot)
    if (slotInfo) {
      return { available: slotInfo.available, reason: slotInfo.reason }
    }

    return { available: false, reason: 'Invalid time slot' }
  }

  const handleConfirm = async () => {
    if (!date || !timeSlot || !locationId) {
      showError('Missing information', 'Please select date, time, and location')
      return
    }

    setIsProcessing(true)

    try {
      // Reserve the time slot
      const result = await reserveSlot(
        service.id,
        locationId,
        date,
        timeSlot,
        service.duration || 60
      )

      if (result.success && result.reservationId) {
        const location = LOCATIONS.find(l => l.id === locationId)

        // Create booking details
        const bookingDetails: CartItem['bookingDetails'] = {
          date,
          timeSlot,
          locationId,
          locationName: location?.name || locationId,
          vehicleType: vehicleType || undefined,
          reservationId: result.reservationId,
          reservedUntil: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        }

        onBookingComplete(bookingDetails)
        success('Booking reserved!', `Time slot reserved for 15 minutes. Complete checkout soon.`)
        onClose()
      } else {
        showError('Reservation failed', result.conflicts[0]?.message || 'Time slot unavailable')
      }
    } catch (err) {
      showError('Booking failed', 'Unable to reserve time slot. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setDate('')
      setTimeSlot('')
      setLocationId('')
      setVehicleType('')
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brand-dark flex items-center gap-2">
            <Calendar className="h-5 w-5 text-brand-primary" aria-hidden="true" />
            Book: {service.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500 mt-1">
            🎭 Demo Mode - No real payment required
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Service Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3" role="region" aria-label="Service information">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700">Duration:</span>
              <span className="font-semibold text-blue-900">{service.duration} minutes</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-blue-700">Price:</span>
              <span className="font-semibold text-blue-900">₱{service.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label htmlFor="booking-date" className="block text-sm font-semibold text-brand-dark mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-primary" aria-hidden="true" />
              Select Date *
            </label>
            <Input
              id="booking-date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setTimeSlot('') // Reset time when date changes
              }}
              className="focus-ring"
              aria-required="true"
              aria-describedby="date-help"
            />
            <span id="date-help" className="sr-only">
              Select the date for your booking. Minimum date is today.
            </span>
          </div>

          {/* Location Selection */}
          <div>
            <label htmlFor="booking-location" className="block text-sm font-semibold text-brand-dark mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
              Location *
            </label>
            <Select
              value={locationId}
              onValueChange={(value) => {
                setLocationId(value)
                setTimeSlot('') // Reset time when location changes
              }}
            >
              <SelectTrigger id="booking-location" className="focus-ring" aria-required="true" aria-label="Select service location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{location.name}</span>
                      <span className="text-xs text-neutral-500">{location.hours}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Slot Selection */}
          <div>
            <label id="time-slot-label" className="block text-sm font-semibold text-brand-dark mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-primary" aria-hidden="true" />
              Select Time *
            </label>

            {!date || !locationId ? (
              <div className="text-sm text-neutral-500 italic py-3 px-4 bg-neutral-50 rounded-md" role="status">
                Select date and location first to see available times
              </div>
            ) : (
              <div
                className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-neutral-50"
                role="radiogroup"
                aria-labelledby="time-slot-label"
                aria-required="true"
              >
                {TIME_SLOTS.map((slot) => {
                  const { available, reason } = getSlotAvailability(slot)
                  const isSelected = timeSlot === slot

                  return (
                    <button
                      key={slot}
                      type="button"
                      role="radio"
                      onClick={() => available && setTimeSlot(slot)}
                      disabled={!available}
                      title={!available ? reason : undefined}
                      aria-label={available
                        ? `Select time slot ${formatTimeDisplay(slot)}`
                        : `Time slot ${formatTimeDisplay(slot)} is ${reason?.includes('past') ? 'in the past' : 'unavailable'}`
                      }
                      aria-checked={isSelected}
                      aria-disabled={!available}
                      className={`
                        px-2 py-2 rounded-md text-sm font-medium transition-all
                        ${isSelected
                          ? 'bg-brand-primary text-white ring-2 ring-brand-primary ring-offset-1'
                          : available
                            ? 'bg-white text-brand-dark hover:bg-brand-accent hover:text-brand-primary border border-neutral-200'
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                        }
                      `}
                    >
                      {formatTimeDisplay(slot)}
                      {!available && (
                        <span className="block text-[10px]">
                          {reason?.includes('past') ? 'Past' : 'Booked'}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Vehicle Type (Optional) */}
          <div>
            <label htmlFor="vehicle-type" className="block text-sm font-semibold text-brand-dark mb-2 flex items-center gap-2">
              <Car className="h-4 w-4 text-brand-primary" aria-hidden="true" />
              Vehicle Type <span className="text-xs text-neutral-500">(Optional)</span>
            </label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger id="vehicle-type" className="focus-ring" aria-label="Select vehicle type (optional)">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Auto-reservation notice */}
          {date && timeSlot && locationId && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 animate-in fade-in duration-300" role="alert" aria-live="polite">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-yellow-800">
                  <strong>Note:</strong> This time slot will be reserved for 15 minutes once confirmed. Complete your checkout before it expires.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t" role="group" aria-label="Booking actions">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing || isReserving}
            className="flex-1"
            aria-label="Cancel booking"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!date || !timeSlot || !locationId || isProcessing || isReserving}
            className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90"
            aria-label={isProcessing || isReserving ? "Reserving time slot" : "Confirm booking"}
            aria-busy={isProcessing || isReserving}
          >
            {isProcessing || isReserving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                Reserving...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                Confirm Booking
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
