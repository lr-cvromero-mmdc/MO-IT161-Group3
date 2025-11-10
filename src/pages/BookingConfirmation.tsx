import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Calendar, MapPin, Phone, Mail, Download, Car, Package, Clock, Banknote, Smartphone, CreditCard, Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/paymentUtils'
import { LOCATIONS, VEHICLE_TYPES, PAYMENT_METHODS } from '@/lib/bookingUtils'
import { logger } from '@/lib/logger'
import { generateReceiptPDF } from '@/lib/pdfReceipt'
import { useToast } from '@/hooks/useToast'

export interface BookingData {
  confirmationCode: string
  services: Array<{
    id: string
    name: string
    price: number
    quantity: number
    duration?: number
    description?: string
    bookingDetails: {
      date: string
      timeSlot: string
      location: string
      vehicleType: string
    }
  }>
  products: Array<{
    id: string
    name: string
    price: number
    quantity: number
    description?: string
  }>
  customer: {
    name: string
    email: string
    phone: string
    paymentMethod: string
    specialRequests?: string
  }
  totals: {
    servicesSubtotal: number
    productsSubtotal: number
    tax: number
    total: number
  }
  createdAt: string
}

export function BookingConfirmation() {
  const location = useLocation()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { success, error } = useToast()
  
  useEffect(() => {
    // First try to get booking data from navigation state
    if (location.state?.bookingData) {
      setBookingData(location.state.bookingData)
      setIsLoading(false)
      return
    }
    
    // Fallback to localStorage
    const storedBookingData = localStorage.getItem('demo-booking')
    
    if (storedBookingData) {
      try {
        const parsed = JSON.parse(storedBookingData)
        setBookingData(parsed)
        setIsLoading(false)
      } catch (error) {
        logger.error('Failed to parse booking data', error as Error)
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [location.state])
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const formatBookingDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const handleDownloadPDF = () => {
    if (!bookingData) {
      error('Error', 'Booking data not available')
      return
    }

    setIsGeneratingPDF(true)
    try {
      generateReceiptPDF(bookingData)
      success('PDF Downloaded', 'Your receipt has been downloaded successfully!')
    } catch (err) {
      logger.error('Failed to generate PDF', err as Error)
      error('PDF Generation Failed', 'Unable to generate PDF receipt. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading booking details...</p>
        </div>
      </div>
    )
  }
  
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-brand-dark mb-4">
            Booking Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            We couldn't find your booking details. Please contact us if you need assistance.
          </p>
          <Button asChild className="bg-brand-primary text-white hover:bg-brand-primary/90">
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    )
  }
  
  const paymentMethod = PAYMENT_METHODS.find(p => p.value === bookingData.customer.paymentMethod)
  
  // Get payment icon component
  const getPaymentIcon = (iconName?: string) => {
    const iconProps = { className: "h-4 w-4 text-brand-primary" }
    switch(iconName) {
      case 'Banknote': return <Banknote {...iconProps} />
      case 'Smartphone': return <Smartphone {...iconProps} />
      case 'CreditCard': return <CreditCard {...iconProps} />
      default: return <CreditCard {...iconProps} />
    }
  }
  
  // Calculate totals if not provided
  const totals = bookingData.totals || {
    servicesSubtotal: bookingData.services?.reduce((sum, s) => sum + (s.price * s.quantity), 0) || 0,
    productsSubtotal: bookingData.products?.reduce((sum, p) => sum + (p.price * p.quantity), 0) || 0,
    tax: 0,
    total: 0
  }
  
  if (!bookingData.totals) {
    const subtotal = totals.servicesSubtotal + totals.productsSubtotal
    totals.tax = subtotal * 0.12
    totals.total = subtotal + totals.tax
  }
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Section background="white" className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-brand-dark mb-4">
                {bookingData.services?.length > 0 ? 'Booking & Purchase Confirmed!' : 'Purchase Confirmed!'}
              </h1>
              <p className="text-xl text-neutral-600 mb-6">
                {bookingData.services?.length > 0
                  ? 'Your services have been booked and products ordered successfully'
                  : 'Your products have been ordered successfully'
                }
              </p>
              <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-4 inline-block">
                <p className="text-brand-primary font-bold text-lg">
                  Confirmation Code: {bookingData.confirmationCode}
                </p>
              </div>
            </div>
            
            {/* Services Booked */}
            {bookingData.services?.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-brand-dark flex items-center gap-3">
                    <Car className="h-6 w-6 text-blue-600" />
                    Services Booked ({bookingData.services.length})
                  </CardTitle>
                  <CardDescription>
                    Your scheduled car wash services with booking details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bookingData.services.map((service) => {
                    const locationDetails = LOCATIONS.find(l => l.id === service.bookingDetails.location)
                    const vehicleType = VEHICLE_TYPES.find(t => t.value === service.bookingDetails.vehicleType)
                    
                    return (
                      <div key={service.id} className="border border-blue-200 rounded-lg p-6 bg-blue-50/30">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-brand-dark mb-2">{service.name}</h3>
                            <p className="text-neutral-600 mb-2">{service.description}</p>
                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {service.duration} minutes
                              </span>
                              <span className="font-semibold text-brand-primary text-lg">
                                {formatPrice(service.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-xs font-medium text-neutral-600">Date</p>
                              <p className="font-semibold text-brand-dark">
                                {formatBookingDate(service.bookingDetails.date)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-xs font-medium text-neutral-600">Time</p>
                              <p className="font-semibold text-brand-dark">
                                {service.bookingDetails.timeSlot}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-xs font-medium text-neutral-600">Location</p>
                              <p className="font-semibold text-brand-dark">
                                {locationDetails?.name || 'Location not found'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-xs font-medium text-neutral-600">Vehicle</p>
                              <p className="font-semibold text-brand-dark">
                                {vehicleType?.label || 'Not specified'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}
            
            {/* Products Purchased */}
            {bookingData.products?.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-brand-dark flex items-center gap-3">
                    <Package className="h-6 w-6 text-green-600" />
                    {bookingData.services?.length > 0 ? `Add-on Products (${bookingData.products.length})` : `Products Purchased (${bookingData.products.length})`}
                  </CardTitle>
                  <CardDescription>
                    {bookingData.services?.length > 0 
                      ? 'Products to enhance your service experience'
                      : 'Your product order details'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookingData.products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg bg-white">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-dark">{product.name}</h4>
                            <p className="text-sm text-neutral-600">{product.description}</p>
                            <p className="text-sm font-semibold text-brand-primary">
                              {formatPrice(product.price)} each
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-neutral-600">Qty: {product.quantity}</p>
                          <p className="font-bold text-brand-dark">
                            {formatPrice(product.price * product.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Customer Information & Order Summary */}
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-brand-dark">
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-brand-primary" />
                    <div>
                      <p className="font-medium text-brand-dark">
                        {bookingData.customer.name}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {bookingData.customer.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-brand-primary" />
                    <div>
                      <p className="font-medium text-brand-dark">
                        Email Confirmation
                      </p>
                      <p className="text-sm text-neutral-600">
                        {bookingData.customer.email}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-neutral-600">Payment Method:</p>
                    <p className="text-brand-dark flex items-center gap-2">
                      {getPaymentIcon(paymentMethod?.iconName)}
                      {paymentMethod?.label || bookingData.customer.paymentMethod}
                    </p>
                  </div>
                  
                  {bookingData.customer.specialRequests && (
                    <div>
                      <p className="text-sm font-medium text-neutral-600">Special Requests:</p>
                      <p className="text-brand-dark text-sm bg-neutral-50 p-2 rounded">
                        {bookingData.customer.specialRequests}
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500">
                      Order created: {formatDate(bookingData.createdAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-brand-dark">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookingData.services?.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Services ({bookingData.services.length})</span>
                        <span className="font-medium">{formatPrice(totals.servicesSubtotal)}</span>
                      </div>
                    )}
                    {bookingData.products?.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">
                          {bookingData.services?.length > 0 ? 'Add-ons' : 'Products'} ({bookingData.products.length})
                        </span>
                        <span className="font-medium">{formatPrice(totals.productsSubtotal)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Tax (12% VAT)</span>
                      <span className="font-medium">{formatPrice(totals.tax)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-brand-dark pt-3 border-t border-neutral-200">
                      <span>Total</span>
                      <span className="text-brand-primary">{formatPrice(totals.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                disabled={isGeneratingPDF}
                className="flex items-center gap-2"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF Receipt
                  </>
                )}
              </Button>
            </div>
            
            {/* Important Notes */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Important Information
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
                  <li>This is a demo booking - no actual service will be provided</li>
                  <li>Please arrive 5 minutes before your scheduled time</li>
                  <li>Bring your confirmation code for verification</li>
                  <li>Payment is due upon arrival unless otherwise specified</li>
                  <li>Contact us if you need to reschedule or cancel</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Return Home */}
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-brand-primary text-white hover:bg-brand-primary/90">
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  Return to Home
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}