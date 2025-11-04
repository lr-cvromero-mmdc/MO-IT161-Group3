// ⚠️ DEPRECATED - ServiceBooking.tsx
// This file is deprecated. The new booking flow uses inline cart-based booking.
// Services are now added to cart first, then booking details are filled inline.
// This file is kept for backwards compatibility only.

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function ServiceBooking() {
  const navigate = useNavigate()

  // Redirect to services page - this page is deprecated
  useEffect(() => {
    console.warn('ServiceBooking page is deprecated. Redirecting to Services page.')
    navigate('/services', {
      replace: true,
      state: {
        message: 'Service booking now uses the cart. Add a service to cart and book from there!'
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Redirecting...</h2>
        <p className="text-neutral-600">Taking you to the new booking experience</p>
      </div>
    </div>
  )
}
