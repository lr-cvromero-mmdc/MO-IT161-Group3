import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Navigation, X } from "lucide-react"
import { formatDistance } from "@/lib/locationUtils"
import { Link } from "react-router-dom"

interface LocationSearchResultsProps {
  location: {
    name: string
    address: string
    hours: string
    phone: string
    distance: number
  }
  userLocation: { lat: number; lng: number } | null
  onClose: () => void
  className?: string
}

export function LocationSearchResults({ 
  location, 
  onClose, 
  className 
}: LocationSearchResultsProps) {
  return (
    <Card className={`mt-4 border-brand-primary/20 shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-brand-dark text-lg">
                Nearest Location
              </h3>
              <p className="text-sm text-brand-primary font-medium">
                {formatDistance(location.distance)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 mb-6">
          <div>
            <h4 className="font-semibold text-brand-dark mb-1">
              {location.name}
            </h4>
            <p className="text-sm text-neutral-600">
              {location.address}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-brand-primary" />
            <span className="text-neutral-600">{location.hours}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-brand-primary" />
            <a 
              href={`tel:${location.phone}`}
              className="text-brand-primary hover:underline"
            >
              {location.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90"
          >
            <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
              Book Now
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="flex-1 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
