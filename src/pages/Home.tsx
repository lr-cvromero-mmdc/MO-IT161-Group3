import { useLocationSearch } from "@/hooks/useLocationSearch"
import { useCart } from "@/hooks/useCart"
import { useToast } from "@/hooks/useToast"

import {
  HOME_BOOKING_STEPS,
  HOME_FAQS,
  HOME_LOCATIONS,
  HOME_QUALITY_FEATURES,
  HOME_SERVICES,
  HOME_STORE_PRODUCTS,
  HOME_TESTIMONIALS,
  type HomeService,
  type HomeStoreProduct,
} from "./home/content"

import {
  AboutSection,
  BookingStepsSection,
  ContactSection,
  FaqSection,
  HeroSection,
  PromoBanner,
  QualitySection,
  ServicesSection,
  StoreSection,
  TestimonialsSection,
} from "./home/sections"

export function Home() {
  const { addToCart } = useCart()
  const { success } = useToast()

  const {
    isLoading,
    error,
    result,
    suggestions,
    searchQuery,
    updateSearchQuery,
    searchByText,
    searchByCoordinates,
    getCurrentLocation,
    clearResults,
    clearError,
  } = useLocationSearch(HOME_LOCATIONS)

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      searchByText(searchQuery)
    }
  }

  const handleSuggestionClick = (lat: number, lng: number, name: string) => {
    updateSearchQuery(name)
    searchByCoordinates(lat, lng)
  }

  const handleSelectService = (service: HomeService) => {
    addToCart({
      id: service.id,
      type: "service",
      name: service.title,
      price: service.price,
      quantity: 1,
      description: service.description,
      duration: service.duration,
      requiresLocation: true,
      requiresTimeSlot: true,
    })

    success(`${service.title} added to booking!`, "Complete your booking details to secure your slot.")
  }

  const handleAddProduct = (product: HomeStoreProduct) => {
    addToCart({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      quantity: 1,
      description: product.description,
      image: product.image,
    })

    success(`${product.name} added to cart!`, "You can continue shopping or proceed to checkout.")
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        searchQuery={searchQuery}
        isLoading={isLoading}
        error={error}
        suggestions={suggestions}
        result={result}
        onQueryChange={updateSearchQuery}
        onSubmit={handleSearchSubmit}
        onSuggestionClick={handleSuggestionClick}
        onUseCurrentLocation={getCurrentLocation}
        onDismissError={clearError}
        onClearResults={clearResults}
      />

      <AboutSection />

      <ServicesSection services={HOME_SERVICES} onSelectService={handleSelectService} />

      <StoreSection products={HOME_STORE_PRODUCTS} onAddProduct={handleAddProduct} />

      <BookingStepsSection steps={HOME_BOOKING_STEPS} />

      <TestimonialsSection testimonials={HOME_TESTIMONIALS} />

      <PromoBanner />

      <FaqSection faqs={HOME_FAQS} />

      <ContactSection />

      <QualitySection features={HOME_QUALITY_FEATURES} />
    </div>
  )
}
