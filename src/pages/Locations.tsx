import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Phone, CreditCard, Smartphone, QrCode } from "lucide-react"

<<<<<<< Updated upstream
<<<<<<< HEAD
// List of Espinosa's branch locations with contact and payment details
=======
>>>>>>> origin/staging
=======
// List of Espinosa's branch locations with contact and payment details
>>>>>>> Stashed changes
const locations = [
  {
    name: "Espinosa's Main Branch",
    address: "123 Main Street, Makati City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 1234 5678",
    payments: ["Visa", "Mastercard", "GCash", "QR Ph", "Maya"],
    coordinates: "14.5995°N, 120.9842°E",
  },
  {
    name: "Espinosa's Quezon City",
    address: "456 Quezon Avenue, Quezon City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 2345 6789",
    payments: ["Visa", "Mastercard", "GCash", "QR Ph", "Maya"],
    coordinates: "14.6760°N, 121.0437°E",
  },
  {
    name: "Espinosa's Taguig",
    address: "789 BGC High Street, Taguig City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 3456 7890",
    payments: ["Visa", "Mastercard", "GCash", "QR Ph", "Maya"],
    coordinates: "14.5547°N, 121.0244°E",
  },
]

<<<<<<< Updated upstream
<<<<<<< HEAD
//
=======
>>>>>>> origin/staging
=======
//
>>>>>>> Stashed changes
const paymentMethods = [
  { name: "Visa", icon: CreditCard, color: "text-blue-600" },
  { name: "Mastercard", icon: CreditCard, color: "text-red-600" },
  { name: "GCash", icon: Smartphone, color: "text-blue-500" },
  { name: "QR Ph", icon: QrCode, color: "text-green-600" },
]

<<<<<<< Updated upstream
<<<<<<< HEAD
// Card component to display individual location details
=======
>>>>>>> origin/staging
=======
// Card component to display individual location details
>>>>>>> Stashed changes
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

        {/* Payment Methods */}
        <div className="space-y-2">
          <p className="font-medium text-brand-dark">Payment Methods</p>
          <div className="flex flex-wrap gap-2">
            {location.payments.map((payment) => {
              const method = paymentMethods.find(m => m.name === payment)
              return (
                <div
                  key={payment}
                  className="flex items-center gap-1 px-2 py-1 bg-brand-accent rounded-md text-xs"
                >
                  {method && <method.icon className={`h-3 w-3 ${method.color}`} />}
                  <span className="text-brand-dark">{payment}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-6">
          <div className="bg-neutral-100 rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-neutral-300">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-500">Map View</p>
              <p className="text-xs text-neutral-400">{location.coordinates}</p>
            </div>
          </div>
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

<<<<<<< Updated upstream
<<<<<<< HEAD
// Locations page component
=======
>>>>>>> origin/staging
=======
// Locations page component
>>>>>>> Stashed changes
export function Locations() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-20">
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

      {/* Locations Grid */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <LocationCard key={index} location={location} />
            ))}
          </div>
        </Container>
      </section>

      {/* Payment Methods Section */}
      <section className="bg-brand-cream py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Payment Options
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We accept all major payment methods for your convenience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="flex items-center space-x-3 bg-white px-6 py-4 rounded-lg shadow-sm"
              >
                <method.icon className={`h-8 w-8 ${method.color}`} />
                <span className="font-medium text-brand-dark">{method.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-dark text-white py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can't Find Your Location?
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 mb-8">
              We're expanding! Contact us to request a new location or get updates on upcoming branches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold text-lg px-8 py-4 focus-ring"
              >
                <a href="tel:+63212345678">
                  Call Us
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-dark font-semibold text-lg px-8 py-4 focus-ring"
              >
                <a href="mailto:info@espinosacarwash.com">
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}