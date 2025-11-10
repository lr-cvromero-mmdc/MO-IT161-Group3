import { Link } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LocationSearchResults } from "@/components/ui/LocationSearchResults"
import { LocationSearchSuggestions } from "@/components/ui/LocationSearchSuggestions"
import { Loader2, ChevronRight, Search } from "lucide-react"
import type { LocationSearchResult } from "@/hooks/useLocationSearch"
import type {
  HomeBookingStep,
  HomeQualityFeature,
  HomeService,
  HomeStoreProduct,
  HomeTestimonial,
} from "./content"

// Using same images as Services page for consistency
import basicWashImage from "@/assets/images/services/basic-wash.jpg"
import premiumWashImage from "@/assets/images/services/premium-wash.jpg"
import fullDetailingImage from "@/assets/images/services/full-detailing.jpg"
import locationsHeroImage from "@/assets/images/pages/Locations/hero-background.png"

interface HeroSectionProps {
  searchQuery: string
  isLoading: boolean
  error: string | null
  suggestions: Array<{ name: string; lat: number; lng: number }>
  result: LocationSearchResult | null
  onQueryChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onSuggestionClick: (lat: number, lng: number, label: string) => void
  onUseCurrentLocation: () => void
  onDismissError: () => void
  onClearResults: () => void
}

export function HeroSection({
  searchQuery,
  isLoading,
  error,
  suggestions,
  result,
  onQueryChange,
  onSubmit,
  onSuggestionClick,
  onUseCurrentLocation,
  onDismissError,
  onClearResults,
}: HeroSectionProps) {
  return (
    <section className="relative bg-brand-dark text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* YouTube Video Background - Hidden Branding */}
        <div className="absolute inset-0" style={{ overflow: "hidden" }}>
          <iframe
            src="https://www.youtube.com/embed/ghdkQpEeJFE?autoplay=1&mute=1&loop=1&playlist=ghdkQpEeJFE&controls=0&showinfo=0&rel=0&modestbranding=1&autohide=1&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&enablejsapi=1&origin=https://espinosacarwash.com"
            title="Professional car wash service background video"
            className="absolute"
            style={{
              width: "100vw",
              height: "56.25vw",
              minHeight: "100vh",
              minWidth: "177.77vh",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scale(1.02)",
              border: "none",
              pointerEvents: "none",
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            loading="eager"
          />
        </div>
        {/* Overlay to hide YouTube branding at edges */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/50 via-brand-dark/70 to-brand-dark/85" style={{ zIndex: 1 }} />
        {/* Additional overlay to cover bottom YouTube controls area */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-dark to-transparent" style={{ zIndex: 1 }} />
      </div>

      <div className="relative z-10 w-full">
        <Container>
          <div className="max-w-4xl text-left pt-20">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-brand-primary/20 backdrop-blur-sm border border-brand-cream/20 rounded-full px-6 py-3">
                <div className="w-2 h-2 bg-brand-cream rounded-full" />
                <span className="text-brand-cream text-sm font-medium tracking-wider uppercase">
                  Espinosa&apos;s Car Wash Locator
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Where Cars Come
              <br />
              <span className="text-brand-cream">to Shine</span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl mb-12 leading-relaxed">
              Family-owned. Meticulous hand washing and detailing at neighborhood-friendly pricing. Now serving Metro
              Manila, Cebu, Davao, and Iloilo.
            </p>

            <div className="max-w-2xl space-y-6">
              <form onSubmit={onSubmit} className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-brand-primary z-10" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder="Enter city or area in Metro Manila"
                  className="pl-16 pr-6 py-6 text-lg bg-white/95 backdrop-blur-sm text-brand-dark placeholder:text-neutral-500 focus-ring rounded-2xl border-0 shadow-2xl"
                  disabled={isLoading}
                />

                <LocationSearchSuggestions suggestions={suggestions} onSuggestionClick={onSuggestionClick} />
              </form>

              <button
                onClick={onUseCurrentLocation}
                disabled={isLoading}
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                )}
                <span className="text-lg">
                  {isLoading ? "Finding your location..." : "Or use your current location"}
                </span>
              </button>

              {error && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 text-red-200 text-center">
                  {error}
                  <button onClick={onDismissError} className="ml-2 underline hover:no-underline">
                    Dismiss
                  </button>
                </div>
              )}

              {result && (
                <LocationSearchResults location={result.location} userLocation={result.userLocation} onClose={onClearResults} />
              )}

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                >
                  <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3">
                    Book Now
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <Section background="neutral" className="py-20" fullWidthBackground>
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="col-span-12 lg:col-span-6 h-full">
          <div className="rounded-2xl h-full overflow-hidden">
            <img src={locationsHeroImage} alt="Professional car detailing service" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex flex-col h-full">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-brand-accent rounded-full text-brand-primary text-sm font-semibold mb-4">
              Family-Owned Since 2016
            </div>
            <h2 className="espinosa-section-title text-brand-dark mb-6">
              Meticulous Hand Washing, Modern Results
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              Espinosa&apos;s Hand Carwash is trusted by car owners across the Philippines for professional detailing services,
              friendly service, and fair pricing. From our flagship branch in Makati to our new provincial locations, every
              wash is handled by our trained specialists using premium products.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Card className="col-span-6 bg-white rounded-2xl shadow-lg border-0 p-6 text-center">
              <h3 className="text-3xl font-bold text-brand-dark mb-2">8+</h3>
              <p className="text-sm text-neutral-500">Years of detail experience</p>
            </Card>
            <Card className="col-span-6 bg-white rounded-2xl shadow-lg border-0 p-6 text-center">
              <h3 className="text-3xl font-bold text-brand-dark mb-2">50K+</h3>
              <p className="text-sm text-neutral-500">Cars detailed to date</p>
            </Card>
            <Card className="col-span-6 bg-white rounded-2xl shadow-lg border-0 p-6 text-center">
              <h3 className="text-3xl font-bold text-brand-dark mb-2">6</h3>
              <p className="text-sm text-neutral-500">Branches nationwide</p>
            </Card>
            <Card className="col-span-6 bg-white rounded-2xl shadow-lg border-0 p-6 text-center">
              <h3 className="text-3xl font-bold text-brand-dark mb-2">4.9/5</h3>
              <p className="text-sm text-neutral-500">Average customer rating</p>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  )
}

interface ServicesSectionProps {
  services: HomeService[]
  onSelectService: (service: HomeService) => void
}

const serviceImageMap: Record<string, string> = {
  "basic-wash": basicWashImage,
  "premium-wash": premiumWashImage,
  "full-detailing": fullDetailingImage,
}

export function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  return (
    <Section id="services" background="white" className="py-20" fullWidthBackground>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4 md:gap-0">
        <div className="flex-1">
          <div className="flex items-center mb-4 flex-wrap gap-2">
            <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
            <span className="text-brand-primary text-xs sm:text-sm font-medium whitespace-nowrap">Signature Services</span>
            <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
          </div>
          <h2 className="espinosa-section-title text-brand-dark">Choose Your Package</h2>
        </div>
        <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="text-brand-primary hover:text-brand-primary/80 font-medium focus-ring rounded-sm px-3 py-2 min-h-[44px] flex items-center justify-center md:justify-start">
          View full catalog
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl shadow-lg border-0 overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary"
          >
            <div className="h-48 bg-neutral-200 overflow-hidden flex items-center justify-center">
              <img
                src={serviceImageMap[service.id]}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold text-brand-dark mb-2 text-center">{service.title}</CardTitle>

              <div className="text-center mb-4">
                <p className="text-sm text-neutral-500 mb-1">Starting at</p>
                <div className="text-3xl font-bold text-brand-dark">{service.priceDisplay}</div>
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-neutral-600">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onSelectService(service)}
                className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold py-3 rounded-lg focus-ring"
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

interface StoreSectionProps {
  products: HomeStoreProduct[]
  onAddProduct: (product: HomeStoreProduct) => void
}

export function StoreSection({ products, onAddProduct }: StoreSectionProps) {
  return (
    <Section background="white" className="py-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4 md:gap-0">
        <h2 className="espinosa-section-title text-brand-dark">Our Store</h2>
        <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="text-brand-primary hover:text-brand-primary/80 font-medium focus-ring rounded-sm px-3 py-2 min-h-[44px] flex items-center justify-center md:justify-start">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {products.slice(0, 4).map((product) => (
          <Card
            key={product.id}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl shadow-lg border-0 overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary"
          >
            <div className="h-48 bg-white overflow-hidden flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-brand-dark mb-2">{product.name}</h3>
              <p className="text-sm text-neutral-600 mb-4">{product.description}</p>

              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-brand-dark">{product.priceDisplay}</div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-neutral-300 text-brand-dark hover:bg-neutral-50 focus-ring rounded-lg"
                  onClick={() => onAddProduct(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

interface BookingStepsSectionProps {
  steps: HomeBookingStep[]
}

export function BookingStepsSection({ steps }: BookingStepsSectionProps) {
  return (
    <Section background="cream" className="py-20" fullWidthBackground>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4 md:gap-0">
        <div className="flex-1">
          <div className="flex items-center mb-4 flex-wrap gap-2">
            <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
            <span className="text-brand-primary text-xs sm:text-sm font-medium whitespace-nowrap">How to book online</span>
            <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
          </div>
          <h2 className="espinosa-section-title text-brand-dark">Book in four easy steps</h2>
        </div>
        <Button asChild variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10 focus-ring min-h-[44px] w-full md:w-auto">
          <Link to="/booking" onClick={() => window.scrollTo(0, 0)}>Start Booking</Link>
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {steps.map((step) => (
          <Card
            key={step.title}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl shadow-lg border-0 p-6 text-center hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary"
          >
            <div className="mx-auto mb-4 p-3 bg-brand-accent rounded-full w-fit">
              <step.icon className="h-6 w-6 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">{step.title}</h3>
            <p className="text-sm text-neutral-600">{step.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

interface TestimonialsSectionProps {
  testimonials: HomeTestimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <Section background="white" className="py-20" fullWidthBackground>
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-4 flex-wrap gap-2">
          <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
          <span className="text-brand-primary text-xs sm:text-sm font-medium whitespace-nowrap">What our customers say</span>
          <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
        </div>
        <h2 className="espinosa-section-title text-brand-dark">Customer Testimonials</h2>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="col-span-12 md:col-span-4 bg-brand-dark text-white rounded-2xl shadow-lg border-0 p-8 space-y-6 hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary"
          >
            <p className="text-lg leading-relaxed">“{testimonial.quote}”</p>
            <div className="text-sm text-brand-cream font-semibold uppercase tracking-widest">{testimonial.customer}</div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export function ContactSection() {
  const cards = [
    {
      title: "Customer Feedback",
      action: "Submit Now",
      image: premiumWashImage,
    },
    {
      title: "Franchising",
      action: "Inquire Now",
      image: fullDetailingImage,
    },
    {
      title: "Join Our Team",
      action: "Apply Today",
      image: basicWashImage,
    },
  ] as const

  return (
    <Section background="cream" className="py-20" fullWidthBackground>
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-4 flex-wrap gap-2">
          <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
          <span className="text-brand-primary text-xs sm:text-sm font-medium whitespace-nowrap">Contact the Espinosa Car Wash Team</span>
          <div className="w-6 md:w-8 h-0.5 bg-brand-primary flex-shrink-0" />
        </div>
        <h3 className="espinosa-section-title text-brand-dark mb-4 md:mb-6">Want to get in touch?</h3>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto px-4">
          Whether you want to share feedback, ask about fleet packages, or explore joining the Espinosa&apos;s team, we would love to hear from you. Choose the option that fits best and we will get back to you soon.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="col-span-12 md:col-span-4 bg-brand-dark rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary"
          >
            <div className="h-48 bg-brand-dark overflow-hidden">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80" loading="lazy" />
            </div>
            <CardContent className="p-8 text-center">
              <h4 className="text-xl font-bold text-white mb-4">{card.title}</h4>
              <p className="text-neutral-300 mb-6">
                Tell us how we can help and our team will reach out within one business day.
              </p>
              <Button asChild className="w-full bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold focus-ring rounded-lg">
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                  {card.action}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

interface QualitySectionProps {
  features: HomeQualityFeature[]
}

export function QualitySection({ features }: QualitySectionProps) {
  return (
    <Section background="white" className="py-20" fullWidthBackground>
      <div className="text-center mb-16">
        <h2 className="espinosa-section-title text-brand-dark mb-4 md:mb-12">Quality Guaranteed</h2>
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl shadow-lg border border-brand-accent p-6 text-center hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary"
            >
              <div className="mx-auto mb-4 p-3 bg-brand-accent rounded-full w-fit">
                <feature.icon className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
