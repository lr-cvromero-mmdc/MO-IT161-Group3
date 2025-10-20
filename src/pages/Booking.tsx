import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { PAYMENT_METHODS, formatTimeDisplay } from '@/lib/bookingUtils'
import { confirmBooking } from '@/lib/demoBookingData'
import { CheckCircle, User, CreditCard, Calendar, MapPin, Clock, Package, Banknote, Smartphone } from 'lucide-react'

export function Booking() {
  const navigate = useNavigate()
  const { state, clearCart, getCartSummary, getServices, getProducts, formatPrice: cartFormatPrice } = useCart()
  const { error, success } = useToast()

  const { isEmpty, servicesSubtotal, productsSubtotal, tax, total } = getCartSummary()
  const services = getServices()
  const products = getProducts()

  // Get payment icon component
  const getPaymentIcon = (iconName: string) => {
    const iconProps = { className: "h-4 w-4" }
    switch(iconName) {
      case 'Banknote': return <Banknote {...iconProps} />
      case 'Smartphone': return <Smartphone {...iconProps} />
      case 'CreditCard': return <CreditCard {...iconProps} />
      default: return <CreditCard {...iconProps} />
    }
  }

  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: '',
    specialRequests: '',
  })

  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart is empty
  if (isEmpty) {
    navigate('/services', {
      state: {
        message: 'Your cart is empty. Browse our services and products to get started.'
      }
    })
    return null
  }

  // Redirect if services don't have booking details (should book via cart first)
  const unbookedServices = services.filter(s => !s.bookingDetails)
  if (unbookedServices.length > 0) {
    error('Booking Required', `${unbookedServices.length} service(s) need booking details. Please complete booking in cart first.`)
    navigate('/services')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.paymentMethod) {
      error('Missing Information', 'Please fill in all required fields')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate booking confirmation
      const result = confirmBooking(
        state.items,
        {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
        customerInfo.paymentMethod
      )

      if (result.success && result.confirmationCode) {
        // Format booking data for confirmation page
        const bookingData = {
          confirmationCode: result.confirmationCode,
          services: services.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            duration: item.duration,
            description: item.description,
            bookingDetails: {
              date: item.bookingDetails!.date,
              timeSlot: item.bookingDetails!.timeSlot,
              location: item.bookingDetails!.locationId,
              vehicleType: item.bookingDetails!.vehicleType || '',
            }
          })),
          products: products.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
          })),
          customer: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            paymentMethod: customerInfo.paymentMethod,
            specialRequests: customerInfo.specialRequests,
          },
          totals: {
            servicesSubtotal,
            productsSubtotal,
            tax,
            total,
          },
          createdAt: new Date().toISOString(),
        }

        // Store in localStorage as backup
        localStorage.setItem('demo-booking', JSON.stringify(bookingData))
        
        clearCart()
        success('Booking Confirmed!', `Your confirmation code is: ${result.confirmationCode}`)
        navigate('/booking-confirmation', {
          state: { bookingData }
        })
      } else {
        error('Booking Failed', result.error || 'Unable to confirm booking. Please try again.')
      }
    } catch (err) {
      error('Error', 'An unexpected error occurred. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream py-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-8">Complete Your Booking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Booking Details Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                      <h3 className="font-semibold text-brand-dark">{service.name}</h3>
                      {service.bookingDetails && (
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(service.bookingDetails.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimeDisplay(service.bookingDetails.timeSlot)}
                          </div>
                          <div className="flex items-center gap-1 col-span-2">
                            <MapPin className="h-3 w-3" />
                            {service.bookingDetails.locationName}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-brand-primary" />
                    Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <Input
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <Input
                        type="email"
                        placeholder="juan@example.com"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        placeholder="+63 912 345 6789"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment Method *
                      </label>
                      <Select
                        value={customerInfo.paymentMethod}
                        onValueChange={(value) => setCustomerInfo({ ...customerInfo, paymentMethod: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method">
                            {customerInfo.paymentMethod && (() => {
                              const selectedMethod = PAYMENT_METHODS.find(m => m.value === customerInfo.paymentMethod);
                              return selectedMethod ? (
                                <div className="flex items-center gap-2">
                                  {getPaymentIcon(selectedMethod.iconName)}
                                  <span>{selectedMethod.label}</span>
                                </div>
                              ) : null;
                            })()}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_METHODS.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              <div className="flex items-center gap-2">
                                {getPaymentIcon(method.iconName)}
                                <div>
                                  <div className="font-medium">{method.label}</div>
                                  <div className="text-xs text-neutral-500">{method.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Special Requests (Optional)</label>
                      <Textarea
                        placeholder="Any special instructions or requests..."
                        value={customerInfo.specialRequests}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                      <strong>🎭 Demo Mode:</strong> This is a demo booking. No real payment will be processed.
                    </div>

                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 text-lg py-6"
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Confirm Booking - {cartFormatPrice(total)}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Services */}
                  {services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-neutral-600">Services</h4>
                      {services.map((service) => (
                        <div key={service.id} className="flex justify-between text-sm mb-1">
                          <span>{service.name}</span>
                          <span className="font-medium">{cartFormatPrice(service.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Products */}
                  {products.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-neutral-600 flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        Products
                      </h4>
                      {products.map((product) => (
                        <div key={product.id} className="flex justify-between text-sm mb-1">
                          <span>
                            {product.name} x{product.quantity}
                          </span>
                          <span className="font-medium">{cartFormatPrice(product.price * product.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{cartFormatPrice(servicesSubtotal + productsSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (12% VAT)</span>
                      <span>{cartFormatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total</span>
                      <span className="text-brand-primary">{cartFormatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
