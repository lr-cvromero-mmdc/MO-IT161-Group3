import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Phone, Search } from "lucide-react"
import { LocationMap } from "@/components/ui/LocationMap"
import { AllLocationsMap } from "@/components/ui/AllLocationsMap"
import { useState, useMemo } from "react"
import heroBackgroundImage from "@/assets/images/pages/Locations/hero-background.png"

// List of Espinosa's branch locations with contact and payment details
const locations = [
  {
    name: "Espinosa's Main Branch",
    address: "123 Main Street, Makati City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 1234 5678",
    lat: 14.5995,
    lng: 120.9842,
    coordinates: "14.5995°N, 120.9842°E",
  },
  {
    name: "Espinosa's Quezon City",
    address: "456 Quezon Avenue, Quezon City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 2345 6789",
    lat: 14.6760,
    lng: 121.0437,
    coordinates: "14.6760°N, 121.0437°E",
  },
  {
    name: "Espinosa's Taguig",
    address: "789 BGC High Street, Taguig City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 3456 7890",
    lat: 14.5547,
    lng: 121.0244,
    coordinates: "14.5547°N, 121.0244°E",
  },
  {
    name: "Espinosa's Pasig",
    address: "321 Ortigas Avenue, Pasig City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 4567 8901",
    lat: 14.5764,
    lng: 121.0851,
    coordinates: "14.5764°N, 121.0851°E",
  },
  {
    name: "Espinosa's Mandaluyong",
    address: "654 Shaw Boulevard, Mandaluyong City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 5678 9012",
    lat: 14.5794,
    lng: 121.0359,
    coordinates: "14.5794°N, 121.0359°E",
  },
  {
    name: "Espinosa's Alabang",
    address: "987 Alabang-Zapote Road, Muntinlupa City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 6789 0123",
    lat: 14.4296,
    lng: 121.0418,
    coordinates: "14.4296°N, 121.0418°E",
  },
]

// Payment methods accepted (for future use)
// const paymentMethods = [
//   { name: "Visa", icon: CreditCard, color: "text-blue-600" },
//   { name: "Mastercard", icon: CreditCard, color: "text-red-600" },
//   { name: "GCash", icon: Smartphone, color: "text-blue-500" },
//   { name: "QR Ph", icon: QrCode, color: "text-green-600" },
// ]

// Card component to display individual location details
function LocationCard({ location }: { location: typeof locations[0] }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
      <CardHeader>
        <CardTitle className="text-xl text-brand-dark flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-primary" />
          {location.name}
        </CardTitle>
        <CardDescription className="text-neutral-600">
          {location.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hours */}
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-brand-dark">Hours</p>
            <p className="text-sm text-neutral-600">{location.hours}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-brand-dark">Phone</p>
            <p className="text-sm text-neutral-600">{location.phone}</p>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mt-6">
          <LocationMap
            name={location.name}
            address={location.address}
            lat={location.lat}
            lng={location.lng}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            asChild
            className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90 focus-ring"
          >
            <a href={`tel:${location.phone}`}>
              Call Now
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-ring"
          >
            <a href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
              Directions
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Locations page component
export function Locations() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter locations based on search term
  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) return locations
    
    const lowerSearch = searchTerm.toLowerCase()
    return locations.filter(location => 
      location.name.toLowerCase().includes(lowerSearch) ||
      location.address.toLowerCase().includes(lowerSearch)
    )
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative bg-brand-primary text-white py-20 pt-32 min-h-[500px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackgroundImage} 
            alt="Our Locations - Find us near you"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/85 via-brand-primary/75 to-brand-dark/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Locations
              </h1>
              <p className="text-lg md:text-xl text-brand-cream/90 mb-8">
                Find the nearest Espinosa's Hand Carwash location. We're conveniently located across Metro Manila.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  type="text"
                  placeholder="Search by city or branch name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-brand-dark border-2 border-brand-cream focus:border-brand-accent h-12"
                  aria-label="Search locations"
                />
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Find All Locations Map */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Find All Locations
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Interactive map showing all Espinosa's Hand Carwash locations across Metro Manila. 
              Click on any marker for more details and directions.
            </p>
          </div>
          <AllLocationsMap locations={filteredLocations} />
        </Container>
      </section>

      {/* Locations Grid */}
      <section className="bg-white py-20">
        <Container>
          {filteredLocations.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <p className="text-neutral-600">
                  Showing {filteredLocations.length} of {locations.length} locations
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLocations.map((location, index) => (
                  <LocationCard key={index} location={location} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <MapPin className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-dark mb-2">No locations found</h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search terms to find a location near you.
              </p>
              <Button
                onClick={() => setSearchTerm("")}
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              >
                Clear Search
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}

