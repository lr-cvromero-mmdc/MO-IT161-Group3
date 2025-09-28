import { Link } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, Car, Shield, Award, Search, MapPin, MapPin as Location, ShoppingCart, Calendar, Star, Hand, CreditCard, CheckCircle } from "lucide-react"

// Service offerings for car wash
const services = [
  {
    title: "Basic Wash",
    price: "₱1,500",
    description: "Exterior wash, wheel clean, dry & shine. Perfect for weekly maintenance.",
    features: ["Exterior wash", "Wheel cleaning", "Dry & shine", "Tire dressing"],
    icon: Car,
  },
  {
    title: "Premium Wash",
    price: "₱2,500",
    description: "Basic wash plus interior vacuum, dashboard clean, tire shine. Complete care.",
    features: ["Everything in Basic", "Interior vacuum", "Dashboard clean", "Tire shine"],
    icon: Shield,
  },
  {
    title: "Full Detailing",
    price: "₱4,500",
    description: "Premium wash plus wax, leather conditioning, engine bay clean. Showroom ready.",
    features: ["Everything in Premium", "Wax application", "Leather conditioning", "Engine bay clean"],
    icon: Award,
  },
]

// Steps to book a car wash online
const bookingSteps = [
  {
    icon: Location,
    title: "Locate nearest Espinosa's",
    description: "Enter your address or postcode."
  },
  {
    icon: ShoppingCart,
    title: "Choose a service",
    description: "From quick washes to full detailing."
  },
  {
    icon: Calendar,
    title: "Pick date & time",
    description: "Open 7 days a week."
  },
  {
    icon: Star,
    title: "Pay & enjoy",
    description: "We'll have your car looking new again."
  }
]

// Products available in the store
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

// Customer testimonials
const testimonials = [
  {
    id: 1,
    quote: "Fast, clean, and reliable. My car has never looked better!",
    customer: "Local Customer"
  },
  {
    id: 2,
    quote: "Excellent service and attention to detail. Highly recommended!",
    customer: "Local Customer"
  },
  {
    id: 3,
    quote: "Professional team, great results. Will definitely come back!",
    customer: "Local Customer"
  }
]

// Quality features of the car wash service
const qualityFeatures = [
  {
    icon: Hand,
    title: "100% Hand Washed",
    description: "Every car receives meticulous hand washing"
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "We stand behind our work with satisfaction guarantee"
  },
  {
    icon: CheckCircle,
    title: "SMS When Ready",
    description: "Get notified when your car is ready for pickup"
  },
  {
    icon: Star,
    title: "1M+ Cars Cleaned",
    description: "Trusted by thousands of satisfied customers"
  }
]


// Frequently Asked Questions
const faqs = [
  {
    question: "Do you charge extra for SUVs?",
    answer: "No extra charge for SUVs. Same price as sedans. We have equipment for all vehicle sizes.",
  },
  {
    question: "What's included in a full service wash?",
    answer: "Exterior wash, wheel clean, interior vacuum, dashboard clean, tire shine, and wax application.",
  },
  {
    question: "How do I book online?",
    answer: "Enter your location, select a service, pick date & time, then pay securely. Takes 2 minutes.",
  },
  {
    question: "Do you offer discounts?",
    answer: "Yes! 10% off for first-time customers. 15% off for monthly packages. Ask about fleet rates.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "100% satisfaction guarantee. We'll redo your wash for free or refund your money.",
  },
  {
    question: "How long does a wash take?",
    answer: "Basic wash: 30 minutes. Premium wash: 45 minutes. Full detailing: 90 minutes.",
  },
]

// Home page component
export function Home() {
  return (
    <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative bg-brand-dark text-white py-20 min-h-[600px] overflow-hidden">
            {/* Background Video/Image Placeholder */}
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-dark/80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-neutral-700/50 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="h-10 w-10 text-neutral-400" />
                  </div>
                  <p className="text-neutral-400 text-lg font-medium tracking-wider uppercase">
                    VIDEO PLACEHOLDER
                  </p>
                </div>
              </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10">
              <Container>
                <div className="max-w-2xl">
                  {/* Header */}
                  <div className="space-y-2 mb-8">
                    <div className="flex items-center">
                      <div className="w-16 h-0.5 bg-brand-cream"></div>
                      <h2 className="text-brand-cream text-sm font-medium tracking-wider uppercase ml-4">
                        FIND AN ESPINOSA'S CAR WASH NEAR YOU
                      </h2>
                    </div>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Where Cars Come to Shine
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-neutral-300 max-w-lg mb-8">
                    Family-owned. Meticulous hand washing & detailing at neighborhood-friendly pricing.
                  </p>

                  {/* Search Section */}
                  <div className="space-y-4 mb-8">
                    {/* Search Bar */}
                    <div className="relative max-w-md">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <Input
                        type="text"
                        placeholder="Enter city or postcode"
                        className="pl-12 pr-4 py-4 text-lg bg-white text-brand-dark placeholder:text-neutral-400 focus-ring rounded-lg"
                      />
                    </div>

                    {/* Location Option */}
                    <div className="flex items-center gap-3 text-neutral-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Or use your current location</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold text-lg px-8 py-4 focus-ring rounded-lg"
                  >
                    <Link to="/#book-now" className="flex items-center gap-2">
                      Book Now
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </Container>
            </div>
          </section>

      {/* About Section */}
      <section className="py-20 bg-neutral-100">
        <Container>
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column - Video/Image Placeholder */}
            <div className="col-span-12 lg:col-span-6">
              <div className="bg-brand-dark rounded-2xl h-80 lg:h-96 flex items-center justify-center">
                <p className="text-white text-lg font-medium tracking-wider uppercase">
                  VIDEO/IMAGE PLACEHOLDER
                </p>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="col-span-12 lg:col-span-6 space-y-8">
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                About Espinosa's
              </h2>

              {/* Description */}
              <p className="text-lg text-neutral-600 leading-relaxed">
                Small, family-run, and proudly local—Espinosa's focuses on meticulous hand washing and detailing with a personal touch. We believe every car deserves the same care we give our own.
              </p>

              {/* KPI Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-6 text-center border border-neutral-200">
                  <div className="text-3xl font-bold text-brand-dark mb-2">5+</div>
                  <div className="text-sm text-neutral-600">Years</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center border border-neutral-200">
                  <div className="text-3xl font-bold text-brand-dark mb-2">5k+</div>
                  <div className="text-sm text-neutral-600">Cars cleaned</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center border border-neutral-200">
                  <div className="text-3xl font-bold text-brand-dark mb-2">4.9/5</div>
                  <div className="text-sm text-neutral-600">Customer rating</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center border border-neutral-200">
                  <div className="text-3xl font-bold text-brand-dark mb-2">100%</div>
                  <div className="text-sm text-neutral-600">Service satisfaction guaranteed!</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>


      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <Container>
            <div className="text-center mb-16">
              {/* Small header with lines */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-0.5 bg-brand-primary"></div>
                <span className="mx-4 text-brand-primary text-sm font-medium">Our Services</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Espinosa's Car Wash Services
              </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              From quick washes to full detailing—packages tailored for you.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {services.map((service) => (
              <Card key={service.title} className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow-lg border-0 overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
                {/* Image Placeholder */}
                <div className="h-48 bg-brand-dark flex items-center justify-center">
                  <p className="text-white text-sm font-medium tracking-wider uppercase">
                    IMAGE PLACEHOLDER
                  </p>
                </div>
                
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-brand-dark mb-2 text-center">
                    {service.title}
                  </CardTitle>
                  
                  {/* Pricing */}
                  <div className="text-center mb-4">
                    <p className="text-sm text-neutral-500 mb-1">Starting at</p>
                    <div className="text-3xl font-bold text-brand-dark">{service.price}</div>
                  </div>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-neutral-600">
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold py-3 rounded-lg focus-ring"
                  >
                    <Link to="/#book-now">
                      Select
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Store Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                Our Store
              </h2>
            </div>
            <Link 
              to="/services" 
              className="text-brand-primary hover:text-brand-primary/80 font-medium focus-ring rounded-sm px-2 py-1"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {storeProducts.slice(0, 4).map((product) => (
              <Card key={product.id} className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl shadow-lg border-0 overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
                {/* Image Placeholder */}
                <div className="h-48 bg-brand-dark flex items-center justify-center">
                  <p className="text-white text-sm font-medium tracking-wider uppercase">
                    IMAGE PLACEHOLDER
                  </p>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-brand-dark">
                      {product.price}
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-neutral-300 text-brand-dark hover:bg-neutral-50 focus-ring rounded-lg"
                    >
                      <Link to="/services">
                        Add
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How To Book Online Section */}
      <section className="py-20 bg-brand-cream">
        <Container>
          <div className="text-center mb-16">
            <div className="w-16 h-0.5 bg-brand-primary mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              How To Book Online
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {bookingSteps.map((step, index) => (
              <Card key={index} className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl shadow-lg border-0 text-center p-6 hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
                <div className="mx-auto mb-4 p-4 bg-brand-cream rounded-2xl w-fit">
                  <step.icon className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-100">
        <Container>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-0.5 bg-brand-primary"></div>
              <span className="mx-4 text-brand-primary text-sm font-medium">Testimonials</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-dark">
              5+ Years of Serving Filipino Car Owners
            </h3>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="col-span-12 md:col-span-4 bg-white rounded-2xl shadow-lg border-0 p-6 hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold text-lg">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-600 italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="w-16 h-0.5 bg-neutral-300 mb-2"></div>
                    <p className="text-sm text-neutral-500">
                      — {testimonial.customer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>


      {/* Promo Banner */}
      <section className="bg-brand-accent py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
              First Time Customer?
            </h2>
            <p className="text-lg md:text-xl text-brand-dark mb-8 max-w-2xl mx-auto">
              Get 10% off your first wash! Book online and use code WELCOME10 at checkout.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold text-lg px-8 py-4 focus-ring"
            >
              <Link to="/#book-now">
                Claim Your Discount
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="w-16 h-0.5 bg-brand-primary mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              Everything you need to know about our car wash services.
            </p>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-start-3 lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-neutral-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-6 focus-ring rounded-sm">
                    <span className="text-lg font-semibold text-brand-dark">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-brand-cream">
        <Container>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-0.5 bg-brand-primary"></div>
              <span className="mx-4 text-brand-primary text-sm font-medium">Contact The Espinosa Car Wash Team</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
              Want To Get In Touch?
            </h3>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Whether you'd like to share feedback, ask about our fleet packages, or explore joining the Espinosa's team, we'd love to hear from you. Select the option below that fits best, and we'll get back to you soon.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Customer Feedback */}
            <Card className="col-span-12 md:col-span-4 bg-brand-dark rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
              <div className="h-48 bg-brand-dark flex items-center justify-center">
                <p className="text-white text-sm font-medium tracking-wider uppercase">
                  IMAGE PLACEHOLDER
                </p>
              </div>
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold text-white mb-4">Customer Feedback</h4>
                <p className="text-neutral-300 mb-6">
                  If you have any feedback or suggestions for us, please don't hesitate to get in touch.
                </p>
                <Button
                  asChild
                  className="w-full bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold focus-ring rounded-lg"
                >
                  <Link to="/#contact">
                    Submit Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Franchising */}
            <Card className="col-span-12 md:col-span-4 bg-brand-dark rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
              <div className="h-48 bg-brand-dark flex items-center justify-center">
                <p className="text-white text-sm font-medium tracking-wider uppercase">
                  IMAGE PLACEHOLDER
                </p>
              </div>
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold text-white mb-4">Franchising</h4>
                <p className="text-neutral-300 mb-6">
                  If you have any feedback or suggestions for us, please don't hesitate to get in touch.
                </p>
                <Button
                  asChild
                  className="w-full bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold focus-ring rounded-lg"
                >
                  <Link to="/#contact">
                    Inquire Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Join Our Team */}
            <Card className="col-span-12 md:col-span-4 bg-brand-dark rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
              <div className="h-48 bg-brand-dark flex items-center justify-center">
                <p className="text-white text-sm font-medium tracking-wider uppercase">
                  IMAGE PLACEHOLDER
                </p>
              </div>
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold text-white mb-4">Join Our Team</h4>
                <p className="text-neutral-300 mb-6">
                  If you have any feedback or suggestions for us, please don't hesitate to get in touch.
                </p>
                <Button
                  asChild
                  className="w-full bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold focus-ring rounded-lg"
                >
                  <Link to="/#contact">
                    Inquire Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Quality Guaranteed Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12">
              Quality Guaranteed
            </h2>

            <div className="grid grid-cols-12 gap-6 md:gap-8">
              {qualityFeatures.map((feature, index) => (
                <Card key={index} className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl shadow-lg border border-brand-accent p-6 text-center hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
                  <div className="mx-auto mb-4 p-3 bg-brand-accent rounded-full w-fit">
                    <feature.icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-dark text-white py-20">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Book Your Car Wash?
              </h2>
              <p className="text-lg md:text-xl text-neutral-300 mb-8">
                Join thousands of satisfied customers who trust us with their vehicles.
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold text-lg px-8 py-4 focus-ring"
              >
                <Link to="/#book-now">
                  Book Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-dark font-semibold text-lg px-8 py-4 focus-ring"
              >
                <Link to="/locations">
                  See Locations
                </Link>
              </Button>
            </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}