import React, { useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { CartModal } from './CartModal'

interface FloatingCartButtonProps {
  className?: string
}

export function FloatingCartButton({ className = '' }: FloatingCartButtonProps) {
  const { getItemCount, hasServices, hasUnbookedServices } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const itemCount = getItemCount()
  const servicesInCart = hasServices()
  const hasUnbooked = hasUnbookedServices()

  return (
    <>
      {/* Floating Cart Button */}
      <div className={`fixed bottom-6 right-6 floating-cart-button ${className}`}>
        <Button
          onClick={() => setIsModalOpen(true)}
          className={`relative h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            hasUnbooked
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : servicesInCart
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-brand-primary hover:bg-brand-primary/90'
          }`}
          aria-label={`Shopping cart with ${itemCount} items${hasUnbooked ? ' - action required' : servicesInCart ? ' including services' : ''}`}
        >
          <ShoppingCart className="h-6 w-6 text-white" />

          {/* Item Count Badge */}
          {itemCount > 0 && (
            <span className={`absolute -top-2 -right-2 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center min-w-[24px] shadow-md animate-in zoom-in-50 duration-200 ${
              hasUnbooked ? 'bg-yellow-600' : servicesInCart ? 'bg-blue-500' : 'bg-orange-500'
            }`}>
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}

          {/* Warning Badge for Unbooked Services */}
          {hasUnbooked && (
            <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-md">
              !
            </div>
          )}

          {/* Pulse Animation for Services */}
          {servicesInCart && !hasUnbooked && (
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          )}

          {/* Pulse Animation for Unbooked (stronger) */}
          {hasUnbooked && (
            <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-30"></div>
          )}

          {/* Ripple Effect on Click */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-200"></div>
        </Button>

        {/* Quick Cart Preview Tooltip - Desktop Only */}
        {itemCount > 0 && (
          <div className="hidden sm:block absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-3 min-w-[220px] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="text-sm font-semibold text-brand-dark mb-1">
              {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
            </div>
            <div className="text-xs text-neutral-600 mb-2">
              {hasUnbooked
                ? 'Booking required'
                : servicesInCart
                  ? 'Services + Products'
                  : 'Products only'
              }
            </div>
            <div className={`text-xs font-medium ${hasUnbooked ? 'text-yellow-600' : 'text-brand-primary'}`}>
              {hasUnbooked ? 'Complete bookings to checkout' : 'Tap to view & checkout'}
            </div>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
