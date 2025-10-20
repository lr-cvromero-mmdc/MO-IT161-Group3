// ProductCheckout.tsx - Simple checkout flow for products only
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { PAYMENT_METHODS } from '@/lib/bookingUtils'
import { CheckCircle, ArrowLeft, Loader2, Package, User, CreditCard, ShoppingCart } from 'lucide-react'

export function ProductCheckout() {
  const navigate = useNavigate()
  const { clearCart, getCartSummary, getProducts, formatPrice, updateQuantity } = useCart()
  const { error } = useToast()

  const { isEmpty, productsSubtotal, tax, total } = getCartSummary()
  const products = getProducts()

  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: '',
    specialRequests: '',
  })

  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart is empty or has services
  if (isEmpty) {
    navigate('/services', { 
      state: { 
        message: 'Your cart is empty. Browse our products to get started.' 
      }
    })
    return null
  }

  if (products.length === 0) {
    navigate('/booking', { 
      state: { 
        message: 'You have services in your cart. Please complete the booking process.' 
      }
    })
    return null
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.paymentMethod) {
      error('Missing information', 'Please fill in all required fields')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate confirmation code
      const timestamp = Date.now().toString(36).toUpperCase()
      const random = Math.random().toString(36).substring(2, 6).toUpperCase()
      const confirmationCode = `ESP-${timestamp}-${random}`

      // Create order data
      const orderData = {
        confirmationCode,
        services: [], // No services for product-only orders
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
        })),
        customer: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          paymentMethod: customerInfo.paymentMethod,
          specialRequests: customerInfo.address, // Store address in special requests for product orders
        },
        totals: {
          servicesSubtotal: 0,
          productsSubtotal,
          tax,
          total,
        },
        createdAt: new Date().toISOString(),
      }

      // Store in localStorage as backup
      localStorage.setItem('demo-booking', JSON.stringify(orderData))

      // Clear cart
      clearCart()

      // Navigate to confirmation
      navigate('/booking-confirmation', { state: { bookingData: orderData } })
    } catch (err) {
      error('Order failed', 'An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Section background="white" className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-brand-dark mb-4">
                Checkout
              </h1>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Complete your product purchase
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-brand-dark flex items-center gap-2">
                      <Package className="h-5 w-5 text-green-600" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Products */}
                    <div className="space-y-3">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between border-b border-neutral-200 pb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-brand-dark">{product.name}</h4>
                            <p className="text-sm text-neutral-600">{product.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                -
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {product.quantity}
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-brand-dark">
                              {formatPrice(product.price * product.quantity)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 pt-4 border-t border-neutral-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="font-medium">{formatPrice(productsSubtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Tax (12% VAT)</span>
                        <span className="font-medium">{formatPrice(tax)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-neutral-200 pt-2">
                        <span>Total</span>
                        <span className="text-brand-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-brand-dark flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-2">
                            Full Name *
                          </label>
                          <Input
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            className="focus-ring"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            className="focus-ring"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-2">
                            Phone Number *
                          </label>
                          <Input
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter your phone number"
                            className="focus-ring"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-2">
                            Payment Method *
                          </label>
                          <Select
                            value={customerInfo.paymentMethod}
                            onValueChange={(value) => setCustomerInfo(prev => ({ ...prev, paymentMethod: value }))}
                          >
                            <SelectTrigger className="focus-ring">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              {PAYMENT_METHODS.map((method) => (
                                <SelectItem key={method.value} value={method.value}>
                                  {method.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-brand-dark flex items-center gap-2">
                        <Package className="h-5 w-5 text-green-600" />
                        Shipping Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-2">
                          Address *
                        </label>
                        <Input
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Enter your address"
                          className="focus-ring"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-2">
                            City *
                          </label>
                          <Input
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="Enter your city"
                            className="focus-ring"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-2">
                            Postal Code
                          </label>
                          <Input
                            value={customerInfo.postalCode}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                            placeholder="Enter postal code"
                            className="focus-ring"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Special Requests */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-brand-dark flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                        Additional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-2">
                          Special Requests
                        </label>
                        <Textarea
                          value={customerInfo.specialRequests}
                          onChange={(e) => setCustomerInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
                          placeholder="Any special instructions or requests..."
                          className="focus-ring"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <div className="flex justify-between items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/services')}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Continue Shopping
                    </Button>

                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold px-8 py-3 flex items-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Complete Order
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

