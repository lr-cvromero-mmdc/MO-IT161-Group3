import { useState } from "react"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Search, Car, Shield, Award, Clock, Star, Filter, ShoppingCart, Package } from "lucide-react"

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Service categories for filtering
=======
>>>>>>> origin/staging
=======
// Service categories for filtering
>>>>>>> Stashed changes
=======
// Service categories for filtering
>>>>>>> Stashed changes
const serviceCategories = [
  { value: "all", label: "All Services" },
  { value: "basic", label: "Basic Wash" },
  { value: "premium", label: "Premium Wash" },
  { value: "detailing", label: "Full Detailing" },
  { value: "addons", label: "Add-ons" },
  { value: "products", label: "Products" },
]

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Store products data
=======
>>>>>>> origin/staging
=======
// Store products data
>>>>>>> Stashed changes
=======
// Store products data
>>>>>>> Stashed changes
const storeProducts = [
  {
    id: 1,
    name: "Premium Car Shampoo",
    price: "₱299",
    description: "Professional-grade car shampoo for gentle cleaning",
    image: "🧽",
    category: "cleaning",
  },
  {
    id: 2,
    name: "Microfiber Towels (Set of 3)",
    price: "₱499",
    description: "High-quality microfiber towels for streak-free drying",
    image: "🧻",
    category: "cleaning",
  },
  {
    id: 3,
    name: "Car Wax (16oz)",
    price: "₱799",
    description: "Long-lasting car wax for protection and shine",
    image: "✨",
    category: "protection",
  },
  {
    id: 4,
    name: "Tire Shine Gel",
    price: "₱199",
    description: "Non-greasy tire shine for a glossy finish",
    image: "🛞",
    category: "protection",
  },
  {
    id: 5,
    name: "Interior Cleaner",
    price: "₱399",
    description: "Safe cleaner for dashboard, seats, and interior surfaces",
    image: "🧴",
    category: "cleaning",
  },
  {
    id: 6,
    name: "Wheel Brush Set",
    price: "₱599",
    description: "Professional wheel cleaning brushes for all rim types",
    image: "🪥",
    category: "tools",
  },
]

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Service offerings data
=======
>>>>>>> origin/staging
=======
// Service offerings data
>>>>>>> Stashed changes
=======
// Service offerings data
>>>>>>> Stashed changes
const services = [
  {
    id: 1,
    title: "Basic Wash",
    category: "basic",
    price: "₱1,500",
    duration: "30 min",
    description: "Exterior wash, wheel clean, dry & shine. Perfect for weekly maintenance.",
    features: ["Exterior wash", "Wheel cleaning", "Dry & shine", "Tire dressing"],
    icon: Car,
    popular: false,
  },
  {
    id: 2,
    title: "Premium Wash",
    category: "premium",
    price: "₱2,500",
    duration: "45 min",
    description: "Basic wash plus interior vacuum, dashboard clean, tire shine. Complete care.",
    features: ["Everything in Basic", "Interior vacuum", "Dashboard clean", "Tire shine"],
    icon: Shield,
    popular: true,
  },
  {
    id: 3,
    title: "Full Detailing",
    category: "detailing",
    price: "₱4,500",
    duration: "90 min",
    description: "Premium wash plus wax, leather conditioning, engine bay clean. Showroom ready.",
    features: ["Everything in Premium", "Wax application", "Leather conditioning", "Engine bay clean"],
    icon: Award,
    popular: false,
  },
  {
    id: 4,
    title: "Wax Application",
    category: "addons",
    price: "₱800",
    duration: "20 min",
    description: "Professional wax application for extra protection and shine.",
    features: ["Premium wax", "Hand application", "UV protection", "Long-lasting shine"],
    icon: Star,
    popular: false,
  },
  {
    id: 5,
    title: "Interior Deep Clean",
    category: "addons",
    price: "₱1,200",
    duration: "30 min",
    description: "Thorough interior cleaning including seats, carpets, and dashboard.",
    features: ["Seat cleaning", "Carpet shampoo", "Dashboard detail", "Leather treatment"],
    icon: Shield,
    popular: false,
  },
  {
    id: 6,
    title: "Engine Bay Clean",
    category: "addons",
    price: "₱600",
    duration: "15 min",
    description: "Safe engine bay cleaning to remove dirt and grime.",
    features: ["Safe cleaning", "Degreasing", "Protection coating", "Visual inspection"],
    icon: Car,
    popular: false,
  },
]

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Services page component
=======
>>>>>>> origin/staging
=======
// Services page component
>>>>>>> Stashed changes
=======
// Services page component
>>>>>>> Stashed changes
export function Services() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const allItems = [...services, ...storeProducts.map(product => ({
    id: product.id + 1000, // Offset to avoid ID conflicts
    title: product.name,
    category: "products",
    price: product.price,
    duration: "In Stock",
    description: product.description,
    features: [product.category],
    icon: Package,
    popular: false,
    isProduct: true,
    product: product
  }))]

  const filteredServices = allItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-20">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Services
              </h1>
              <p className="text-lg md:text-xl text-brand-cream mb-8">
                Professional hand washing and detailing services tailored to your needs. 
                Choose from our range of packages or customize your own.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-brand-cream">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-start-3 lg:col-span-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg focus-ring"
                    aria-label="Search services"
                  />
                </div>

                {/* Category Filter */}
                <div className="md:w-64">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12 text-lg focus-ring">
                      <Filter className="h-5 w-5 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-center">
                <p className="text-neutral-600">
                  Showing {filteredServices.length} of {allItems.length} items
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20">
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
            <div className="grid grid-cols-12 gap-6 md:gap-8">
              {filteredServices.map((item) => (
                <Card key={item.id} className="col-span-12 md:col-span-6 lg:col-span-4 relative overflow-hidden group hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
                  {item.popular && (
                    <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-brand-accent rounded-full w-fit">
                      {item.isProduct ? (
                        <span className="text-2xl">{item.product.image}</span>
                      ) : (
                        <item.icon className="h-8 w-8 text-brand-primary" />
                      )}
                    </div>
                    <CardTitle className="text-2xl text-brand-dark">{item.title}</CardTitle>
                    <div className="flex items-center justify-center gap-4 text-lg">
                      <span className="text-3xl font-bold text-brand-primary">{item.price}</span>
                      <div className="flex items-center gap-1 text-neutral-600">
                        {item.isProduct ? (
                          <Package className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <CardDescription className="text-lg mb-6 text-neutral-600">
                      {item.description}
                    </CardDescription>
                    
                    {!item.isProduct && (
                      <ul className="space-y-2 mb-8 text-left">
                        {item.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-neutral-600">
                            <ChevronRight className="h-4 w-4 text-brand-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <Button
                      asChild
                      className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold focus-ring"
                    >
                      <a href={item.isProduct ? "/#store" : "/#book-now"}>
                        {item.isProduct ? (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        ) : (
                          `Book ${item.title}`
                        )}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Service Categories Info */}
      <section className="bg-brand-accent py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Service Categories
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Understanding our service categories to help you choose the right package.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <Card className="col-span-6 md:col-span-3 bg-white">
              <CardContent className="p-6 text-center">
                <Car className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                <h3 className="font-bold text-brand-dark mb-2">Basic Wash</h3>
                <p className="text-sm text-neutral-600">
                  Essential cleaning for regular maintenance
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-6 md:col-span-3 bg-white">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                <h3 className="font-bold text-brand-dark mb-2">Premium Wash</h3>
                <p className="text-sm text-neutral-600">
                  Complete interior and exterior cleaning
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-6 md:col-span-3 bg-white">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                <h3 className="font-bold text-brand-dark mb-2">Full Detailing</h3>
                <p className="text-sm text-neutral-600">
                  Showroom-quality comprehensive service
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-6 md:col-span-3 bg-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                <h3 className="font-bold text-brand-dark mb-2">Add-ons</h3>
                <p className="text-sm text-neutral-600">
                  Customize your service with extras
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-6 md:col-span-3 bg-white">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                <h3 className="font-bold text-brand-dark mb-2">Products</h3>
                <p className="text-sm text-neutral-600">
                  Professional car care products
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-dark text-white py-20">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Book Your Service?
              </h2>
              <p className="text-lg md:text-xl text-neutral-300 mb-8">
                Choose your preferred service and book online in just a few clicks.
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold text-lg px-8 py-4 focus-ring"
              >
                <a href="/#book-now">
                  Book Now
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-dark font-semibold text-lg px-8 py-4 focus-ring"
              >
                <a href="/locations">
                  See Locations
                </a>
              </Button>
            </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}