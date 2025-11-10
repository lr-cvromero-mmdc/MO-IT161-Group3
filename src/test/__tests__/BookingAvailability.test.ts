import { describe, it, expect } from 'vitest'
import {
  isTimeSlotAvailable,
  getAvailableTimeSlots,
  TIME_SLOTS,
} from '@/lib/bookingAvailability'

describe('Booking Availability System', () => {
  describe('isTimeSlotAvailable', () => {
    it('should return available for future dates with no conflicts', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7) // 7 days from now
      const dateString = futureDate.toISOString().split('T')[0]

      const result = isTimeSlotAvailable(
        'location-3', // Use location-3 (no existing bookings)
        dateString,
        '14:00',
        30
      )

      expect(result.available).toBe(true)
      expect(result.conflicts).toHaveLength(0)
    })

    it('should detect conflicts with existing bookings', () => {
      // Location-1 has existing booking at 09:00 on 2024-01-15
      const result = isTimeSlotAvailable(
        'location-1',
        '2024-01-15',
        '09:00',
        60
      )

      expect(result.available).toBe(false)
      expect(result.conflicts.length).toBeGreaterThan(0)
      expect(result.conflicts[0].type).toBe('time_conflict')
    })

    it('should reject bookings in the past', () => {
      const pastDate = '2020-01-01'

      const result = isTimeSlotAvailable(
        'location-1',
        pastDate,
        '10:00',
        30
      )

      expect(result.available).toBe(false)
      expect(result.conflicts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'time_conflict',
            message: 'Cannot book in the past',
          }),
        ])
      )
    })

    it('should detect lunch break conflicts (12:00-13:00)', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      const dateString = futureDate.toISOString().split('T')[0]

      // Try to book from 11:30 (will overlap with 12:00 lunch)
      const result = isTimeSlotAvailable(
        'location-3',
        dateString,
        '11:30',
        60 // 60 min = will go into lunch break
      )

      expect(result.available).toBe(false)
      expect(result.conflicts.some(c =>
        c.message.includes('lunch break')
      )).toBe(true)
    })

    it('should reject bookings that exceed business hours', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      const dateString = futureDate.toISOString().split('T')[0]

      // Try to book at 17:30 with 90 min duration (would end at 19:00, past 18:00 close)
      const result = isTimeSlotAvailable(
        'location-3',
        dateString,
        '17:30',
        90
      )

      expect(result.available).toBe(false)
      expect(result.conflicts.some(c =>
        c.message.includes('business hours')
      )).toBe(true)
    })

    it('should reject invalid time slots', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      const dateString = futureDate.toISOString().split('T')[0]

      const result = isTimeSlotAvailable(
        'location-1',
        dateString,
        '99:99', // Invalid time
        30
      )

      expect(result.available).toBe(false)
      expect(result.conflicts[0].message).toBe('Invalid time slot')
    })
  })

  describe('getAvailableTimeSlots', () => {
    it('should return all available time slots for a location', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      const dateString = futureDate.toISOString().split('T')[0]

      const slots = getAvailableTimeSlots(
        'location-3',
        dateString,
        30 // 30 min service
      )

      expect(slots.length).toBeGreaterThan(0)
      expect(slots.every(slot => TIME_SLOTS.includes(slot.timeSlot))).toBe(true)
    })

    it('should mark unavailable slots correctly', () => {
      // Location-1 has booking at 09:00 on 2024-01-15
      const slots = getAvailableTimeSlots(
        'location-1',
        '2024-01-15',
        60
      )

      const slot9am = slots.find(s => s.timeSlot === '09:00')
      expect(slot9am?.available).toBe(false)
    })

    it('should filter slots that exceed business hours', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      const dateString = futureDate.toISOString().split('T')[0]

      const slots = getAvailableTimeSlots(
        'location-3',
        dateString,
        90 // 90 min service
      )

      // 18:00 should not be in the list (90min would exceed closing time)
      const has18 = slots.some(s => s.timeSlot === '18:00')
      expect(has18).toBe(false)
    })
  })
})
