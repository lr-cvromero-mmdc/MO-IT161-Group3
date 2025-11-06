import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight, Trash2, X, Car, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CartItemComponent } from './CartItem'
import { useCart } from '@/hooks/useCart'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { clearCart, getCartSummary, getServices, getProducts, formatPrice, hasServices, hasUnbookedServices } = useCart()
  const { itemCount, isEmpty, servicesSubtotal, productsSubtotal, tax, total } = getCartSummary()

  const services = getServices()
  const products = getProducts()
  const unbookedServicesExist = hasUnbookedServices()

  // Calculate unbooked service count
  const unbookedCount = services.filter(s => !s.bookingDetails).length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full h-full sm:h-auto sm:max-h-[90vh] p-0 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-white sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-brand-dark flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-brand-primary" />
              Cart
              {itemCount > 0 && (
                <span className="bg-brand-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {itemCount}
                </span>
              )}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-neutral-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full sm:h-auto min-h-0">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <ShoppingCart className="h-10 w-10 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  Empty Cart
                </h3>
                <p className="text-neutral-600 mb-6 text-sm">
                  Add services and products to get started
                </p>
                <Button asChild size="sm" className="bg-brand-primary text-white hover:bg-brand-primary/90">
                  <Link to="/services" onClick={() => { onClose(); window.scrollTo(0, 0); }}>
                    Browse Services
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Services Section */}
                {services.length > 0 && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Car className="text-white h-3 w-3" />
                      </div>
                      <h4 className="text-base font-semibold text-brand-dark">
                        Services ({services.length})
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {services.map((item, index) => (
                        <div key={item.id} className="animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                          <CartItemComponent item={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Products Section */}
                {products.length > 0 && (
                  <div className="animate-in slide-in-from-top-2 duration-300" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Package className="text-white h-3 w-3" />
                      </div>
                      <h4 className="text-base font-semibold text-brand-dark">
                        Products ({products.length})
                      </h4>
                      {hasServices() && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Pairs with service
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {products.map((item, index) => (
                        <div key={item.id} className="animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${(index + services.length) * 100}ms` }}>
                          <CartItemComponent item={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Summary & Actions */}
          {!isEmpty && (
            <div className="border-t bg-white px-6 py-4 space-y-4 flex-shrink-0 animate-in slide-in-from-bottom-2 duration-300">
              {/* Summary */}
              <div className="space-y-2">
                {services.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Services</span>
                    <span className="font-medium">{formatPrice(servicesSubtotal)}</span>
                  </div>
                )}
                {products.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Products</span>
                    <span className="font-medium">{formatPrice(productsSubtotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Tax (12% VAT)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-brand-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Smart Suggestions & Warnings */}
              {unbookedServicesExist && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-md p-3 animate-in fade-in duration-500">
                  <p className="text-xs text-yellow-800 font-medium">
                    <strong>Action Required:</strong> {unbookedCount} service{unbookedCount > 1 ? 's need' : ' needs'} booking details. Click "Pick Date & Time" above.
                  </p>
                </div>
              )}

              {!unbookedServicesExist && services.length > 0 && products.length === 0 && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 animate-in fade-in duration-500">
                  <p className="text-xs text-green-800">
                    <strong>Enhance your service:</strong> Add professional car care products to maximize results!
                  </p>
                </div>
              )}

              {products.length > 0 && services.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 animate-in fade-in duration-500">
                  <p className="text-xs text-blue-800">
                    <strong>Get expert application:</strong> Book a service and we'll apply these products professionally!
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                {unbookedServicesExist ? (
                  <Button
                    size="lg"
                    disabled
                    className="w-full bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  >
                    <span>Complete Bookings First</span>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 hover:scale-105 transition-all duration-200"
                  >
                    <Link to={hasServices() ? '/booking' : '/checkout'} onClick={() => { onClose(); window.scrollTo(0, 0); }}>
                      <span>{hasServices() ? 'Proceed to Booking' : 'Proceed to Checkout'}</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-sm hover:scale-105 transition-all duration-200"
                    asChild
                  >
                    <Link to="/services" onClick={() => { onClose(); window.scrollTo(0, 0); }}>
                      Continue Shopping
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 hover:scale-105 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
