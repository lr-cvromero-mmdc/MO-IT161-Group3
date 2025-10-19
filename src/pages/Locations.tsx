// Locations page - Branch locations with contact details
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationMap } from "@/components/ui/LocationMap"
import { AllLocationsMap } from "@/components/ui/AllLocationsMap"
import { 
  MapPin, 
  Clock, 
  Phone
} from "lucide-react"

// List of Espinosa's branch locations with contact details
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
]


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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-20 pt-32">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Locations
            </h1>
            <p className="text-lg md:text-xl text-brand-cream mb-8">
              Find the nearest Espinosa's Hand Carwash location. We're conveniently located across Metro Manila.
            </p>
          </div>
        </Container>
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
          <AllLocationsMap locations={locations} />
        </Container>
      </section>

      {/* Locations Grid */}
      <section className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <LocationCard key={index} location={location} />
            ))}
          </div>
        </Container>
      </section>


    </div>
  )
}