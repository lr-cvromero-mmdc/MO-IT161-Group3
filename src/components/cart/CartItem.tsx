import { useState } from 'react'
import { Minus, Plus, Trash2, Calendar, MapPin, Clock, AlertTriangle, CheckCircle, Car, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart, type CartItem } from '@/hooks/useCart'
import { BookingQuickModal } from './BookingQuickModal'
import { formatTimeDisplay } from '@/lib/bookingUtils'

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, updateItemBooking, formatPrice, hasServices } = useCart()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  const incrementQuantity = () => {
    handleQuantityChange(item.quantity + 1)
  }

  const decrementQuantity = () => {
    handleQuantityChange(item.quantity - 1)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  const handleBookingComplete = (bookingDetails: CartItem['bookingDetails']) => {
    updateItemBooking(item.id, bookingDetails)
    setIsBookingModalOpen(false)
  }

  // Check if service needs booking
  const needsBooking = item.type === 'service' && !item.bookingDetails
  const hasBooking = item.type === 'service' && item.bookingDetails

  // Check if reservation is expiring soon (less than 5 minutes)
  const isExpiringSoon = hasBooking && item.bookingDetails?.reservedUntil
    ? new Date(item.bookingDetails.reservedUntil).getTime() - Date.now() < 5 * 60 * 1000
    : false

  return (
    <>
      <div className={`flex flex-col gap-2 p-3 border rounded-md bg-white hover:shadow-sm transition-shadow ${
        item.type === 'service'
          ? needsBooking
            ? 'border-yellow-300 bg-yellow-50/50'
            : isExpiringSoon
              ? 'border-orange-300 bg-orange-50/50'
              : 'border-green-300 bg-green-50/50'
          : 'border-neutral-200'
      }`}>
      {/* Main Item Row */}
      <div className="flex items-center gap-2">
        {/* Item Image */}
        <div className="flex-shrink-0 relative">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={`w-12 h-12 ${item.type === 'service' ? 'bg-blue-100' : 'bg-brand-cream'} rounded flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            {item.type === 'service' ? (
              <Car className="h-6 w-6 text-blue-600" />
            ) : (
              <Package className="h-6 w-6 text-green-600" />
            )}
          </div>

          {/* Service duration indicator */}
          {item.type === 'service' && item.duration && (
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              <span className="text-[9px] font-bold">{item.duration}m</span>
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-brand-dark text-sm truncate">
              {item.name}
            </h3>
            {/* Add-on badge for products when services are present */}
            {item.type === 'product' && hasServices() && (
              <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Add-on
              </span>
            )}
            {/* Booking status badge */}
            {item.type === 'service' && hasBooking && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
                isExpiringSoon
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                <CheckCircle className="h-2.5 w-2.5" />
                Booked
              </span>
            )}
            {needsBooking && (
              <span className="bg-yellow-100 text-yellow-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <AlertTriangle className="h-2.5 w-2.5" />
                Needs Booking
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm text-brand-primary">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-1">
          {/* Services have quantity fixed at 1, products can be adjusted */}
          {item.type === 'service' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500 px-2">
                Qty: 1
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                aria-label="Remove service from cart"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                className="h-6 w-6 p-0 hover:bg-neutral-100"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="text-xs font-semibold min-w-[1.5rem] text-center">
                {item.quantity}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                className="h-6 w-6 p-0 hover:bg-neutral-100"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 ml-1"
                aria-label="Remove item from cart"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Booking Details Section (for services) */}
      {item.type === 'service' && (
        <>
          {needsBooking ? (
            <div className="mt-2 pt-2 border-t border-yellow-200 animate-in fade-in duration-300">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-yellow-700">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span className="font-medium">Booking required</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-brand-primary text-white hover:bg-brand-primary/90 h-7 text-xs px-3"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Pick Date & Time
                </Button>
              </div>
            </div>
          ) : hasBooking && item.bookingDetails ? (
            <div className={`mt-2 pt-2 border-t animate-in fade-in duration-300 ${
              isExpiringSoon ? 'border-orange-200' : 'border-green-200'
            }`}>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${
                    isExpiringSoon ? 'text-orange-700' : 'text-green-700'
                  }`}>
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsBookingModalOpen(true)}
                      className="h-6 text-xs px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="flex items-center gap-1 text-neutral-600">
                    <Calendar className="h-2.5 w-2.5" />
                    <span>{new Date(item.bookingDetails.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <Clock className="h-2.5 w-2.5" />
                    <span>{formatTimeDisplay(item.bookingDetails.timeSlot)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600 col-span-2 truncate">
                    <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
                    <span className="truncate">{item.bookingDetails.locationName}</span>
                  </div>
                </div>

                {isExpiringSoon && (
                  <div className="bg-orange-100 border border-orange-200 rounded px-2 py-1 text-[9px] text-orange-700 font-medium">
                    Reservation expiring soon! Complete checkout.
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      )}

      {/* Booking Quick Modal */}
      {item.type === 'service' && (
        <BookingQuickModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          service={item}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
    </>
  )
}
