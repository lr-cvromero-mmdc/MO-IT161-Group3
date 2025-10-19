// Services page - Booking-focused design with real images, sticky booking bar, and enhanced product section
import { useState } from "react"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ChevronRight, 
  Search, 
  Clock, 
  Star, 
  Filter, 
  ShoppingCart, 
  Package, 
  Calendar, 
  CheckCircle, 
  Users, 
  Star as StarIcon, 
  X, 
  Award, 
  Shield, 
  Sparkles, 
  Zap, 
  Heart 
} from "lucide-react"

const serviceCategories = [
  { value: "all", label: "All Services" },
  { value: "basic", label: "Basic Wash" },
  { value: "premium", label: "Premium Wash" },
  { value: "detailing", label: "Full Detailing" },
  { value: "addons", label: "Add-ons" },
]

const productCategories = [
  { value: "all", label: "All Products" },
  { value: "cleaning", label: "Cleaning" },
  { value: "protection", label: "Protection" },
  { value: "tools", label: "Tools" },
  { value: "bundles", label: "Bundles" },
]

const storeProducts = [
  {
    id: 1,
    name: "Premium Car Shampoo",
    price: "₱299",
    originalPrice: "₱399",
    description: "Professional-grade car shampoo (500ml) for gentle cleaning. pH-balanced formula.",
    category: "cleaning",
    image: "/src/assets/images/products/car-shampoo.png",
    badge: "Best Seller",
    stockStatus: "Only 8 left",
    isRecommended: true
  },
  {
    id: 2,
    name: "Microfiber Towels (Set of 3)",
    price: "₱499",
    description: "High-quality microfiber towels (16x16 inches) for streak-free drying. Machine washable.",
    category: "cleaning",
    image: "/src/assets/images/products/microfiber-towel.png",
    badge: "Popular Choice",
    stockStatus: "In Stock",
    isRecommended: true
  },
  {
    id: 3,
    name: "Car Wax (16oz)",
    price: "₱799",
    description: "Long-lasting car wax (16oz) for protection and shine. Lasts 3-6 months.",
    category: "protection",
    image: "/src/assets/images/products/car-wax.png",
    badge: null,
    stockStatus: "In Stock"
  },
  {
    id: 4,
    name: "Tire Shine Gel",
    price: "₱199",
    description: "Non-greasy tire shine (250ml) for a glossy finish. Water-resistant formula.",
    category: "protection",
    image: "/src/assets/images/products/tire-gel.png",
    badge: "New",
    stockStatus: "Restocking Soon"
  },
  {
    id: 5,
    name: "Interior Cleaner",
    price: "₱399",
    description: "Safe cleaner (500ml) for dashboard, seats, and interior surfaces. Non-toxic formula.",
    category: "cleaning",
    image: "/src/assets/images/products/interior-cleaner.png",
    badge: null,
    stockStatus: "In Stock"
  },
  {
    id: 6,
    name: "Wheel Brush Set",
    price: "₱599",
    description: "Professional wheel cleaning brushes (3 brushes) for all rim types. Durable nylon bristles.",
    category: "tools",
    image: "/src/assets/images/products/wheel-brush.png",
    badge: null,
    stockStatus: "In Stock"
  },
  {
    id: 7,
    name: "Complete Detailing Kit",
    price: "₱1,800",
    originalPrice: "₱2,200",
    description: "Everything you need: shampoo, towels, wax, and cleaner. Save ₱400!",
    category: "bundles",
    image: "/src/assets/images/products/detailing-kit.png",
    badge: "Bundle Deal",
    stockStatus: "Limited Time",
    isRecommended: true,
    isBundle: true
  },
]

const services = [
  {
    id: 1,
    title: "Basic Wash",
    category: "basic",
    price: "₱1,500",
    duration: "30 min",
    description: "Exterior wash, wheel clean, dry & shine. Perfect for weekly maintenance.",
    features: ["Exterior wash", "Wheel cleaning", "Dry & shine", "Tire dressing"],
    popular: false,
    valuePoints: [
      { text: "Quick & efficient", icon: Zap },
      { text: "Perfect for regular maintenance", icon: Clock },
      { text: "Professional quality", icon: Award }
    ],
    image: "/src/assets/images/services/basic-wash.jpg",
    framing: "Essential Care"
  },
  {
    id: 2,
    title: "Premium Wash",
    category: "premium",
    price: "₱2,500",
    duration: "45 min",
    description: "Basic wash plus interior vacuum, dashboard clean, tire shine. Complete care.",
    features: ["Everything in Basic", "Interior vacuum", "Dashboard clean", "Tire shine"],
    popular: true,
    valuePoints: [
      { text: "Most popular choice", icon: Heart },
      { text: "Complete interior & exterior", icon: Shield },
      { text: "Best value for money", icon: Star }
    ],
    image: "/src/assets/images/services/premium-wash.jpg",
    framing: "Best Value",
    isRecommended: true
  },
  {
    id: 3,
    title: "Full Detailing",
    category: "detailing",
    price: "₱4,500",
    duration: "90 min",
    description: "Premium wash plus wax, leather conditioning, engine bay clean. Showroom ready.",
    features: ["Everything in Premium", "Wax application", "Leather conditioning", "Engine bay clean"],
    popular: false,
    valuePoints: [
      { text: "Showroom quality", icon: Sparkles },
      { text: "Comprehensive service", icon: Award },
      { text: "Long-lasting protection", icon: Shield }
    ],
    image: "/src/assets/images/services/full-detailing.jpg",
    framing: "Complete Care"
  },
  {
    id: 4,
    title: "Wax Application",
    category: "addons",
    price: "₱800",
    duration: "20 min",
    description: "Professional wax application for extra protection and shine.",
    features: ["Premium wax", "Hand application", "UV protection", "Long-lasting shine"],
    popular: false,
    valuePoints: [
      { text: "Extra protection", icon: Shield },
      { text: "Enhanced shine", icon: Sparkles },
      { text: "UV resistant", icon: Award }
    ],
    image: "/src/assets/images/services/wax-application.jpg",
    framing: "Add-on Service"
  },
  {
    id: 5,
    title: "Interior Deep Clean",
    category: "addons",
    price: "₱1,200",
    duration: "30 min",
    description: "Thorough interior cleaning including seats, carpets, and dashboard.",
    features: ["Seat cleaning", "Carpet shampoo", "Dashboard detail", "Leather treatment"],
    popular: false,
    valuePoints: [
      { text: "Deep cleaning", icon: Zap },
      { text: "Safe for all materials", icon: Shield },
      { text: "Fresh interior", icon: Heart }
    ],
    image: "/src/assets/images/services/interior-deepclean.jpg",
    framing: "Add-on Service"
  },
  {
    id: 6,
    title: "Engine Bay Clean",
    category: "addons",
    price: "₱600",
    duration: "15 min",
    description: "Safe engine bay cleaning to remove dirt and grime.",
    features: ["Safe cleaning", "Degreasing", "Protection coating", "Visual inspection"],
    popular: false,
    valuePoints: [
      { text: "Safe cleaning", icon: Shield },
      { text: "Professional degreasing", icon: Zap },
      { text: "Protection coating", icon: Award }
    ],
    image: "/src/assets/images/services/engine-bay-clean.jpg",
    framing: "Add-on Service"
  },
]

const testimonials = [
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

const faqs = [
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
  const [activeTab, setActiveTab] = useState("services")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showBookingBar, setShowBookingBar] = useState(false)

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredProducts = storeProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleServiceSelect = (service: any) => {
    setSelectedService(service)
    setShowBookingBar(true)
  }

  const handleBookNow = () => {
    // This would typically navigate to a booking form or modal
    console.log("Booking service:", selectedService)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section className="relative bg-brand-primary text-white py-20 min-h-[500px] flex items-center pt-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/services/hero-background.jpg" 
            alt="Professional car wash service"
            className="w-full h-full object-cover"
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
      <section className="py-8 bg-brand-cream">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    type="text"
                placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg focus-ring"
                aria-label={`Search ${activeTab}`}
                  />
                </div>

                {/* Category Filter */}
                <div className="md:w-64">
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                    <SelectTrigger className="h-12 text-lg focus-ring">
                      <Filter className="h-5 w-5 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                  {(activeTab === "services" ? serviceCategories : productCategories).map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Tab */}
      {activeTab === "services" && (
        <section className="py-12">
        <Container>
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">No services found</h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                className="bg-brand-primary text-white hover:bg-brand-primary/90 focus-ring"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <Card 
                    key={service.id} 
                    className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full ${
                      service.isRecommended ? 'ring-2 ring-brand-primary shadow-xl bg-gradient-to-br from-brand-accent/5 to-transparent' : ''
                    }`}
                  >
                    {/* Enhanced Badge for Premium Wash */}
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
                        <span className="text-3xl font-bold text-brand-primary">{service.price}</span>
                        <div className="flex items-center gap-2 text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                          <Clock className="h-5 w-5 text-brand-primary" />
                          <span className="font-semibold">{service.duration}</span>
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
                        onClick={() => handleServiceSelect(service)}
                        className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold text-lg py-3 focus-ring"
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        Select & Book
                      </Button>
                    </CardContent>
                  </Card>
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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-dark mb-2">No products found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search terms or category filter.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                  className="bg-brand-primary text-white hover:bg-brand-primary/90 focus-ring"
                >
                  Clear Filters
                </Button>
              </div>
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
                    <Card 
                      key={product.id} 
                      className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full ${
                        product.isRecommended ? 'ring-2 ring-brand-accent shadow-lg' : ''
                      }`}
                    >
                      {/* Product Image with clean white background */}
                      <div className="h-48 bg-white overflow-hidden flex items-center justify-center relative border-b">
                        <img 
                          src={product.image} 
                          alt={`${product.name} - Professional car care product`}
                          className="w-full h-full object-contain p-6 drop-shadow-sm"
                          loading="lazy"
                        />
                        {/* Badge */}
                        {product.badge && (
                          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
                            product.badge === 'Best Seller' ? 'bg-brand-primary text-white' :
                            product.badge === 'Popular Choice' ? 'bg-green-500 text-white' :
                            product.badge === 'New' ? 'bg-blue-500 text-white' :
                            product.badge === 'Bundle Deal' ? 'bg-orange-500 text-white' :
                            'bg-neutral-500 text-white'
                          }`}>
                            {product.badge}
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6 flex flex-col justify-between flex-grow">
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold text-brand-dark mb-2">{product.name}</h3>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-brand-primary">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-lg text-neutral-400 line-through">{product.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 mb-4">
                            {product.description}
                          </p>
                        </div>
                        
                        {/* Stock Status */}
                        <div className={`flex items-center justify-center gap-2 text-sm mb-4 ${
                          product.stockStatus === 'Only 8 left' || product.stockStatus === 'Only 5 left' ? 'text-red-600' :
                          product.stockStatus === 'Restocking Soon' ? 'text-orange-600' :
                          product.stockStatus === 'Limited Time' ? 'text-purple-600' :
                          'text-green-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            product.stockStatus === 'Only 8 left' || product.stockStatus === 'Only 5 left' ? 'bg-red-500' :
                            product.stockStatus === 'Restocking Soon' ? 'bg-orange-500' :
                            product.stockStatus === 'Limited Time' ? 'bg-purple-500' :
                            'bg-green-500'
                          }`}></div>
                          <span className="font-medium">{product.stockStatus}</span>
                        </div>
                        
                        {/* Upsell Cue for recommended products */}
                        {product.isRecommended && !product.isBundle && (
                          <p className="text-xs text-brand-primary font-medium mb-3 text-center">
                            ✨ Recommended with Premium Wash
                          </p>
                        )}
                        
                        {/* Add to Cart Button */}
                        <Button
                          className={`w-full font-semibold py-3 ${
                            product.isBundle 
                              ? 'bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-primary/90 hover:to-brand-accent/90 text-white' 
                              : 'bg-brand-primary hover:bg-brand-primary/90 text-white'
                          }`}
                          onClick={() => console.log("Add to cart:", product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.isBundle ? 'Get Bundle Deal' : 'Add to Cart'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </Container>
        </section>
      )}

      {/* Booking Bar */}
      {selectedService && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
          <Container>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-dark rounded-lg flex items-center justify-center">
                  <p className="text-white text-xs font-medium tracking-wider uppercase">
                    IMG
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedService.title}</h3>
                  <p className="text-neutral-600">{selectedService.duration} • {selectedService.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <Button
                  onClick={handleBookNow}
                  className="bg-brand-primary text-white hover:bg-brand-primary/90 px-6 py-2 font-semibold"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>
          </Container>
        </div>
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
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Get answers to common questions about our services and booking process.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id} className="bg-white">
                <CardHeader 
                  className="cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-brand-dark">{faq.question}</h3>
                    <ChevronRight 
                      className={`h-5 w-5 text-neutral-400 transition-transform ${
                        expandedFaq === faq.id ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </CardHeader>
                {expandedFaq === faq.id && (
                  <CardContent className="pt-0">
                    <p className="text-neutral-600">{faq.answer}</p>
              </CardContent>
                )}
            </Card>
            ))}
          </div>
        </Container>
      </section>


      {/* Sticky Booking Bar */}
      {showBookingBar && selectedService && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
          <Container>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-brand-dark">{selectedService.title}</h3>
                  <p className="text-sm text-neutral-600">{selectedService.duration} • {selectedService.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowBookingBar(false)}
                  className="px-4"
                >
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
                <Button
                  onClick={handleBookNow}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  )
}