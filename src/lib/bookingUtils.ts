import type { CartItem } from '@/context/CartContext'

// Time slots available for booking (24-hour format for consistency with bookingAvailability.ts)
export const TIME_SLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30'
]

// Helper function to format 24-hour time to 12-hour display
export function formatTimeDisplay(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

// Available locations (matching the locations from the app)
export const LOCATIONS = [
  {
    id: 'main-branch',
    name: "Espinosa's Main Branch",
    address: "123 Main Street, Makati City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 1234 5678",
    lat: 14.5995,
    lng: 120.9842,
    coordinates: "14.5995°N, 120.9842°E",
  },
  {
    id: 'quezon-city',
    name: "Espinosa's Quezon City",
    address: "456 Quezon Avenue, Quezon City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 2345 6789",
    lat: 14.6760,
    lng: 121.0437,
    coordinates: "14.6760°N, 121.0437°E",
  },
  {
    id: 'taguig',
    name: "Espinosa's Taguig",
    address: "789 BGC High Street, Taguig City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 3456 7890",
    lat: 14.5547,
    lng: 121.0244,
    coordinates: "14.5547°N, 121.0244°E",
  },
  {
    id: 'cebu',
    name: "Espinosa's Cebu City",
    address: "321 Ayala Center Cebu, Cebu City, Cebu",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 32 4567 8901",
    lat: 10.3157,
    lng: 123.8854,
    coordinates: "10.3157°N, 123.8854°E",
  },
  {
    id: 'davao',
    name: "Espinosa's Davao City",
    address: "654 SM Lanang Premier, Davao City, Davao del Sur",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 82 5678 9012",
    lat: 7.0735,
    lng: 125.6128,
    coordinates: "7.0735°N, 125.6128°E",
  },
  {
    id: 'iloilo',
    name: "Espinosa's Iloilo City",
    address: "987 SM City Iloilo, Iloilo City, Iloilo",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 33 6789 0123",
    lat: 10.7202,
    lng: 122.5621,
    coordinates: "10.7202°N, 122.5621°E",
  },
]

// Vehicle types
export const VEHICLE_TYPES = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'pickup', label: 'Pickup Truck' },
  { value: 'van', label: 'Van' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'convertible', label: 'Convertible' },
  { value: 'other', label: 'Other' },
]

// Payment methods
export const PAYMENT_METHODS = [
  { 
    value: 'cash', 
    label: 'Cash on Arrival',
    description: 'Pay when you arrive at the location',
    iconName: 'Banknote'
  },
  { 
    value: 'gcash', 
    label: 'GCash',
    description: 'Pay via GCash mobile wallet',
    iconName: 'Smartphone'
  },
  { 
    value: 'maya', 
    label: 'Maya',
    description: 'Pay via Maya mobile wallet',
    iconName: 'Smartphone'
  },
  { 
    value: 'card', 
    label: 'Credit/Debit Card',
    description: 'Pay with Visa, Mastercard, or other cards',
    iconName: 'CreditCard'
  },
]

// Validation functions
export function validateCartItems(items: CartItem[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (items.length === 0) {
    errors.push('Cart is empty')
  }

  const services = items.filter(item => item.type === 'service')
  if (services.length > 0) {
    // Check if services have valid durations
    const invalidServices = services.filter(service => !service.duration || service.duration <= 0)
    if (invalidServices.length > 0) {
      errors.push('Some services have invalid duration')
    }

    // Check if all services have booking details
    const unbookedServices = services.filter(service => !service.bookingDetails)
    if (unbookedServices.length > 0) {
      errors.push(`${unbookedServices.length} service(s) missing booking details`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateServiceBookingDetails(bookingDetails: CartItem['bookingDetails']): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!bookingDetails) {
    errors.push('Booking details are required')
    return { isValid: false, errors }
  }

  if (!bookingDetails.locationId) {
    errors.push('Location is required')
  }

  if (!bookingDetails.date) {
    errors.push('Date is required')
  }

  if (!bookingDetails.timeSlot) {
    errors.push('Time slot is required')
  }

  // Validate date is not in the past
  const selectedDate = new Date(bookingDetails.date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    errors.push('Date cannot be in the past')
  }

  // Validate time slot is within business hours
  const timeSlotIndex = TIME_SLOTS.indexOf(bookingDetails.timeSlot)
  if (timeSlotIndex === -1) {
    errors.push('Invalid time slot')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Calculate total duration for services
export function calculateTotalDuration(items: CartItem[]): number {
  return items
    .filter(item => item.type === 'service')
    .reduce((total, item) => total + (item.duration || 0), 0)
}

// Generate booking confirmation code
export function generateBookingCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ESP-${timestamp}-${random}`
}
