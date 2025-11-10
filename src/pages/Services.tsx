/**
 * Services Page
 * 
 * Main page for browsing and booking car wash services and purchasing products.
 * Features tabbed interface, search/filter functionality, and cart integration.
 */

import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceCardSkeleton, ProductCardSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { FaqSection } from "@/components/sections/FaqSection"
import { ServiceCard } from "@/components/services/ServiceCard"
import { ProductCard } from "@/components/services/ProductCard"
import { ServicesFilters } from "@/components/services/ServicesFilters"
import { useToast } from "@/hooks/useToast"
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback"
import { SKELETON_DELAY_MS, SEARCH_DEBOUNCE_MS } from "@/lib/constants"
import { Service, Product, Testimonial, FaqItem, CategoryOption } from "@/types/services"
import {
  Search,
  Package,
  CheckCircle,
  Users,
  Star as StarIcon,
  Star,
  Clock,
  Award,
  Shield,
  Sparkles,
  Zap,
  Heart
} from "lucide-react"
import heroBackgroundImage from "@/assets/images/services/hero-background.jpg"
import basicWashImage from "@/assets/images/services/basic-wash.jpg"
import premiumWashImage from "@/assets/images/services/premium-wash.jpg"
import fullDetailingImage from "@/assets/images/services/full-detailing.jpg"
import waxApplicationImage from "@/assets/images/services/wax-application.jpg"
import interiorDeepCleanImage from "@/assets/images/services/interior-deepclean.jpg"
import engineBayCleanImage from "@/assets/images/services/engine-bay-clean.jpg"
// Reserved for future use
// import serviceBasicsImage from "@/assets/images/services/service-basics.jpg"
// import servicePremiumImage from "@/assets/images/services/service-premium.jpg"
// import serviceDetailingImage from "@/assets/images/services/service-detailing.jpg"
import carShampooImage from "@/assets/images/products/car-shampoo.png"
import microfiberTowelImage from "@/assets/images/products/microfiber-towel.png"
import carWaxImage from "@/assets/images/products/car-wax.png"
import tireGelImage from "@/assets/images/products/tire-gel.png"
import interiorCleanerImage from "@/assets/images/products/interior-cleaner.png"
import wheelBrushImage from "@/assets/images/products/wheel-brush.png"
import detailingKitImage from "@/assets/images/products/detailing-kit.png"

// Category filter options
const serviceCategories: CategoryOption[] = [
  { value: "all", label: "All Services" },
  { value: "basic", label: "Basic Wash" },
  { value: "premium", label: "Premium Wash" },
  { value: "detailing", label: "Full Detailing" },
  { value: "addons", label: "Add-ons" },
]

const productCategories: CategoryOption[] = [
  { value: "all", label: "All Products" },
  { value: "cleaning", label: "Cleaning" },
  { value: "protection", label: "Protection" },
  { value: "tools", label: "Tools" },
  { value: "bundles", label: "Bundles" },
]

// Note: All prices below already include 12% VAT
const storeProducts: Product[] = [
  {
    id: "car-shampoo",
    name: "Premium Car Shampoo",
    price: 299,
    priceDisplay: "₱299",
    originalPrice: 399,
    originalPriceDisplay: "₱399",
    description: "Professional-grade car shampoo (500ml) for gentle cleaning. pH-balanced formula.",
    category: "cleaning",
    image: carShampooImage,
    badge: "Best Seller",
    stockStatus: "Only 8 left",
    isRecommended: true
  },
  {
    id: "microfiber-towels",
    name: "Microfiber Towels (Set of 3)",
    price: 499,
    priceDisplay: "₱499",
    description: "High-quality microfiber towels (16x16 inches) for streak-free drying. Machine washable.",
    category: "cleaning",
    image: microfiberTowelImage,
    badge: "Popular Choice",
    stockStatus: "In Stock",
    isRecommended: true
  },
  {
    id: "car-wax",
    name: "Car Wax (16oz)",
    price: 799,
    priceDisplay: "₱799",
    description: "Long-lasting car wax (16oz) for protection and shine. Lasts 3-6 months.",
    category: "protection",
    image: carWaxImage,
    badge: null,
    stockStatus: "In Stock"
  },
  {
    id: "tire-shine",
    name: "Tire Shine Gel",
    price: 199,
    priceDisplay: "₱199",
    description: "Non-greasy tire shine (250ml) for a glossy finish. Water-resistant formula.",
    category: "protection",
    image: tireGelImage,
    badge: "New",
    stockStatus: "Restocking Soon"
  },
  {
    id: "interior-cleaner",
    name: "Interior Cleaner",
    price: 399,
    priceDisplay: "₱399",
    description: "Safe cleaner (500ml) for dashboard, seats, and interior surfaces. Non-toxic formula.",
    category: "cleaning",
    image: interiorCleanerImage,
    badge: null,
    stockStatus: "In Stock"
  },
  {
    id: "wheel-brush",
    name: "Wheel Brush Set",
    price: 599,
    priceDisplay: "₱599",
    description: "Professional wheel cleaning brushes (3 brushes) for all rim types. Durable nylon bristles.",
    category: "tools",
    image: wheelBrushImage,
    badge: null,
    stockStatus: "In Stock"
  },
  {
    id: "detailing-kit",
    name: "Complete Detailing Kit",
    price: 1800,
    priceDisplay: "₱1,800",
    originalPrice: 2200,
    originalPriceDisplay: "₱2,200",
    description: "Everything you need: shampoo, towels, wax, and cleaner. Save ₱400!",
    category: "bundles",
    image: detailingKitImage,
    badge: "Bundle Deal",
    stockStatus: "Limited Time",
    isRecommended: true,
    isBundle: true
  },
]

// Note: All prices below already include 12% VAT
const services: Service[] = [
  {
    id: "basic-wash",
    title: "Basic Wash",
    category: "basic",
    price: 1500,
    priceDisplay: "₱1,500",
    duration: 30,
    durationDisplay: "30 min",
    description: "Exterior wash, wheel clean, dry & shine. Perfect for weekly maintenance.",
    features: ["Exterior wash", "Wheel cleaning", "Dry & shine", "Tire dressing"],
    popular: false,
    valuePoints: [
      { text: "Quick & efficient", icon: Zap },
      { text: "Perfect for regular maintenance", icon: Clock },
      { text: "Professional quality", icon: Award }
    ],
    image: basicWashImage,
    framing: "Essential Care"
  },
  {
    id: "premium-wash",
    title: "Premium Wash",
    category: "premium",
    price: 2500,
    priceDisplay: "₱2,500",
    duration: 45,
    durationDisplay: "45 min",
    description: "Basic wash plus interior vacuum, dashboard clean, tire shine. Complete care.",
    features: ["Everything in Basic", "Interior vacuum", "Dashboard clean", "Tire shine"],
    popular: true,
    valuePoints: [
      { text: "Most popular choice", icon: Heart },
      { text: "Complete interior & exterior", icon: Shield },
      { text: "Best value for money", icon: Star }
    ],
    image: premiumWashImage,
    framing: "Best Value",
    isRecommended: true
  },
  {
    id: "full-detailing",
    title: "Full Detailing",
    category: "detailing",
    price: 4500,
    priceDisplay: "₱4,500",
    duration: 90,
    durationDisplay: "90 min",
    description: "Premium wash plus wax, leather conditioning, engine bay clean. Showroom ready.",
    features: ["Everything in Premium", "Wax application", "Leather conditioning", "Engine bay clean"],
    popular: false,
    valuePoints: [
      { text: "Showroom quality", icon: Sparkles },
      { text: "Comprehensive service", icon: Award },
      { text: "Long-lasting protection", icon: Shield }
    ],
    image: fullDetailingImage,
    framing: "Complete Care"
  },
  {
    id: "wax-application",
    title: "Wax Application",
    category: "addons",
    price: 800,
    priceDisplay: "₱800",
    duration: 20,
    durationDisplay: "20 min",
    description: "Professional wax application for extra protection and shine.",
    features: ["Premium wax", "Hand application", "UV protection", "Long-lasting shine"],
    popular: false,
    valuePoints: [
      { text: "Extra protection", icon: Shield },
      { text: "Enhanced shine", icon: Sparkles },
      { text: "UV resistant", icon: Award }
    ],
    image: waxApplicationImage,
    framing: "Add-on Service"
  },
  {
    id: "interior-deep-clean",
    title: "Interior Deep Clean",
    category: "addons",
    price: 1200,
    priceDisplay: "₱1,200",
    duration: 30,
    durationDisplay: "30 min",
    description: "Thorough interior cleaning including seats, carpets, and dashboard.",
    features: ["Seat cleaning", "Carpet shampoo", "Dashboard detail", "Leather treatment"],
    popular: false,
    valuePoints: [
      { text: "Deep cleaning", icon: Zap },
      { text: "Safe for all materials", icon: Shield },
      { text: "Fresh interior", icon: Heart }
    ],
    image: interiorDeepCleanImage,
    framing: "Add-on Service"
  },
  {
    id: "engine-bay-clean",
    title: "Engine Bay Clean",
    category: "addons",
    price: 600,
    priceDisplay: "₱600",
    duration: 15,
    durationDisplay: "15 min",
    description: "Safe engine bay cleaning to remove dirt and grime.",
    features: ["Safe cleaning", "Degreasing", "Protection coating", "Visual inspection"],
    popular: false,
    valuePoints: [
      { text: "Safe cleaning", icon: Shield },
      { text: "Professional degreasing", icon: Zap },
      { text: "Protection coating", icon: Award }
    ],
    image: engineBayCleanImage,
    framing: "Add-on Service"
  },
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Santos",
    rating: 5,
    text: "Excellent service! My car looks brand new after the Premium Wash. The team was professional and efficient.",
    service: "Premium Wash"
  },
  {
    id: 2,
    name: "John Rodriguez",
    rating: 5,
    text: "The Full Detailing service exceeded my expectations. Worth every peso for the showroom quality finish.",
    service: "Full Detailing"
  },
  {
    id: 3,
    name: "Sarah Chen",
    rating: 5,
    text: "Quick and reliable Basic Wash service. Perfect for my weekly car maintenance routine.",
    service: "Basic Wash"
  }
]

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "How do I book a service?",
    answer: "Simply select your preferred service from our list, click 'Select & Book', and follow the booking process. You can choose your preferred date and time."
  },
  {
    id: 2,
    question: "What's included in the Premium Wash?",
    answer: "The Premium Wash includes everything in Basic Wash plus interior vacuum, dashboard cleaning, and tire shine for complete care."
  },
  {
    id: 3,
    question: "How long does a service take?",
    answer: "Service duration varies: Basic Wash (30 min), Premium Wash (45 min), Full Detailing (90 min), and Add-ons (15-30 min)."
  },
  {
    id: 4,
    question: "Can I customize my service?",
    answer: "Yes! You can add any of our add-on services to your main service package for a customized experience."
  }
]

export function Services() {
  const location = useLocation()
  const { info } = useToast()
  const [activeTab, setActiveTab] = useState<"services" | "products">("services")
  const [isLoading, setIsLoading] = useState(true)

  // Show message if redirected from booking page
  useEffect(() => {
    if (location.state?.message) {
      info('Cart Empty', location.state.message)
      // Clear the state to prevent showing the message again
      window.history.replaceState({}, document.title)
    }
  }, [location.state, info])

  // Simulate loading (in real app, this would be from API)
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, SKELETON_DELAY_MS)
    return () => clearTimeout(timer)
  }, [activeTab])

  const [searchTerm, setSearchTerm] = useState("")
  const [searchInputValue, setSearchInputValue] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isSearching, setIsSearching] = useState(false)

  const applySearchFilter = useDebouncedCallback((value: string) => {
    setSearchTerm(value)
    setIsSearching(false)
  }, SEARCH_DEBOUNCE_MS)

  const handleSearchChange = useCallback((value: string) => {
    setSearchInputValue(value)
    setIsSearching(true)
    applySearchFilter(value)
  }, [applySearchFilter])

  const clearSearchTerm = useCallback(() => {
    setSearchInputValue("")
    setSearchTerm("")
    applySearchFilter("")
  }, [applySearchFilter])

  const filteredServices = useMemo(() => services.filter((service) => {
    const normalizedQuery = searchTerm.toLowerCase()
    const matchesSearch = service.title.toLowerCase().includes(normalizedQuery) ||
                         service.description.toLowerCase().includes(normalizedQuery)
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  }), [searchTerm, selectedCategory, services])

  const filteredProducts = useMemo(() => storeProducts.filter((product) => {
    const normalizedQuery = searchTerm.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(normalizedQuery) ||
                         product.description.toLowerCase().includes(normalizedQuery)
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }), [searchTerm, selectedCategory, storeProducts])


  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section className="relative bg-brand-primary text-white py-20 min-h-[500px] flex items-center pt-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackgroundImage} 
            alt="Professional car wash service"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-brand-primary/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full">
          <Container>
            <div className="text-center">
              <h1 className="espinosa-hero text-white mb-4">
                Book Your Car Service
              </h1>
              <p className="espinosa-body-large text-brand-cream mb-8 max-w-3xl mx-auto">
                Professional hand washing and detailing services. Choose your service, book online, and we'll take care of the rest.
              </p>
              
              {/* Trust Signal */}
              <div className="flex items-center justify-center gap-2 text-brand-cream/90 mb-8">
                <CheckCircle className="h-5 w-5" />
                <span className="text-lg font-semibold">Trusted by 1,200+ happy drivers</span>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex justify-center">
                <div className="bg-white/10 rounded-lg p-1 flex">
                  <button
                    onClick={() => setActiveTab("services")}
                    className={`px-6 py-3 rounded-md font-semibold transition-all ${
                      activeTab === "services"
                        ? "bg-white text-brand-primary"
                        : "text-white hover:bg-white/10"
                    }`}
                    aria-label="View car wash services"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setActiveTab("products")}
                    className={`px-6 py-3 rounded-md font-semibold transition-all ${
                      activeTab === "products"
                        ? "bg-white text-brand-primary"
                        : "text-white hover:bg-white/10"
                    }`}
                    aria-label="View car care products"
                  >
                    Products
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Search and Filter Section */}
      <ServicesFilters
        searchValue={searchInputValue}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={activeTab === "services" ? serviceCategories : productCategories}
        activeTab={activeTab}
        isSearching={isSearching}
      />

      {/* Services Tab */}
      {activeTab === "services" && (
        <section className="py-12">
        <Container>
          {isLoading ? (
            /* Loading skeletons */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </div>
          ) : filteredServices.length === 0 ? (
            /* Empty state with improved design */
            <EmptyState
              icon={Search}
              title="No services found"
              description="Try adjusting your search terms or category filter to find what you're looking for."
                action={{
                  label: "Clear Filters",
                  onClick: () => {
                    clearSearchTerm()
                    setSelectedCategory("all")
                  }
                }}
            />
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <section className="py-12">
          <Container>
            {isLoading ? (
              /* Loading skeletons */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Empty state */
              <EmptyState
                icon={Package}
                title="No products found"
                description="Try adjusting your search terms or category filter to find what you're looking for."
                action={{
                  label: "Clear Filters",
                  onClick: () => {
                    clearSearchTerm()
                    setSelectedCategory("all")
                  }
                }}
              />
            ) : (
              <>
                {/* Trust Reassurance */}
                <div className="text-center bg-brand-cream/50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center gap-2 text-brand-dark mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">100% Authentic & Satisfaction Guaranteed</span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    All products are genuine and backed by our quality promise.
                    <span className="font-medium text-brand-primary"> Pair with Premium Wash for best results.</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </Container>
        </section>
      )}

      {/* Social Proof Section */}
      <section className="py-16 bg-brand-accent">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their car care needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-brand-dark">{testimonial.name}</p>
                    <p className="text-sm text-neutral-500">{testimonial.service}</p>
                  </div>
              </CardContent>
            </Card>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-neutral-600">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>5000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>5-Star Rated Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FaqSection 
        faqs={faqs}
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our services and booking process."
      />
    </div>
  )
}
