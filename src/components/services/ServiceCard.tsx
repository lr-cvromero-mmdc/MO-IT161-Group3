/**
 * ServiceCard Component
 * 
 * Displays a single service offering with pricing, features, and booking options.
 * Includes visual enhancements for recommended services and micro-interactions.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Star, ShoppingCart, ChevronRight } from "lucide-react"
import { Service } from "@/types/services"
import { useCart } from "@/hooks/useCart"
import { useToast } from "@/hooks/useToast"

interface ServiceCardProps {
  /** Service data to display */
  service: Service
}

/**
 * ServiceCard - Individual service display card
 * 
 * Features:
 * - Responsive image with hover effects
 * - "Best Value" badge for recommended services
 * - Value proposition icons
 * - Feature list with checkmarks
 * - Add to cart functionality
 * 
 * @param service - Service object containing all display data
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart } = useCart()
  const { success } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: service.id,
      type: 'service',
      name: service.title,
      price: service.price,
      quantity: 1,
      description: service.description,
      duration: service.duration,
      image: service.image,
    })
    success(`${service.title} added to cart!`, 'Click the cart icon to book your date & time.')
  }

  return (
    <Card 
      className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full ${
        service.isRecommended ? 'ring-2 ring-brand-primary shadow-xl bg-gradient-to-br from-brand-accent/5 to-transparent' : ''
      }`}
    >
      {/* Enhanced Badge for Recommended Services */}
      {service.isRecommended && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white px-4 py-2 rounded-full text-sm font-bold z-10 flex items-center gap-1 shadow-lg">
          <Star className="h-4 w-4" />
          Best Value
        </div>
      )}
      
      {/* Service Image with consistent aspect ratio */}
      <div className="h-48 bg-brand-dark overflow-hidden relative">
        <img 
          src={service.image} 
          alt={`Professional ${service.title.toLowerCase()} service`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        {service.isRecommended && (
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent"></div>
        )}
      </div>
    
      <CardHeader className="text-center pb-4">
        <div className="mb-2">
          <span className="text-sm font-semibold text-brand-primary bg-brand-accent px-3 py-1 rounded-full">
            {service.framing}
          </span>
        </div>
        <CardTitle className="text-2xl text-brand-dark mb-2">{service.title}</CardTitle>
        <div className="flex items-center justify-center gap-4 text-lg mb-4">
          <span className="text-3xl font-bold text-brand-primary">{service.priceDisplay}</span>
          <div className="flex items-center gap-2 text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
            <Clock className="h-5 w-5 text-brand-primary" />
            <span className="font-semibold">{service.durationDisplay}</span>
          </div>
        </div>
      </CardHeader>
    
      <CardContent className="text-center">
        <CardDescription className="text-lg mb-6 text-neutral-600">
          {service.description}
        </CardDescription>
        
        {/* Value Points with Icons */}
        <div className="space-y-3 mb-6">
          {service.valuePoints.map((point, index) => {
            const IconComponent = point.icon
            return (
              <div key={index} className="flex items-center gap-3 text-sm text-neutral-600">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center">
                  <IconComponent className="h-4 w-4 text-brand-primary" />
                </div>
                <span className="font-medium">{point.text}</span>
              </div>
            )
          })}
        </div>
        
        {/* Features */}
        <ul className="space-y-2 mb-8 text-left">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-neutral-600">
              <ChevronRight className="h-4 w-4 text-brand-primary mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button
          onClick={handleAddToCart}
          className="w-full font-semibold text-lg py-3 focus-ring bg-brand-primary text-white hover:bg-brand-primary/90"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

