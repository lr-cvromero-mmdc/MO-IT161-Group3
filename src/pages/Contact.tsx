// Contact page - Mobile-first design with one-tap actions and trust-building elements
import { useState } from "react"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle,
  Send,
  ChevronRight,
  Navigation,
  MessageCircle
} from "lucide-react"

// Recommended contact method (most prominent)
const recommendedContact = {
  icon: Phone,
  title: "Call Us",
  subtitle: "RECOMMENDED",
  description: "Speak directly with our team",
  details: "+63 917 123 4567",
  action: "Call Now",
  href: "tel:+639171234567",
  responseTime: "Immediate",
  waitTime: "Usually under 30 seconds",
  staffedHours: "7 AM - 7 PM daily"
}

// Alternative contact methods with distinct styling
const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp/SMS",
    description: "Quick text message",
    details: "+63 917 123 4567",
    action: "Send Message",
    href: "https://wa.me/639171234567",
    responseTime: "Within 15 minutes",
    color: "green",
    accent: "bg-green-50 border-green-200 text-green-700"
  },
  {
    icon: Mail,
    title: "Email",
    description: "Detailed inquiry",
    details: "hello@espinosacarwash.com",
    action: "Send Email",
    href: "mailto:hello@espinosacarwash.com",
    responseTime: "Within 2 hours",
    color: "blue",
    accent: "bg-blue-50 border-blue-200 text-blue-700"
  }
]

// Nearest location (prioritized)
const nearestLocation = {
  name: "Main Branch",
  address: "123 Main Street, Makati City, Metro Manila",
  phone: "+63 917 123 4567",
  hours: "Mon-Sun: 7:00 AM - 7:00 PM",
  isOpen: true, // This would be dynamic in a real app
  distance: "2.3 km away",
  driveTime: "~8 minutes",
  services: ["Full Service", "Express Wash", "Detailing"]
}

// Other locations (secondary)
const otherLocations = [
  {
    name: "Quezon City Branch",
    address: "456 EDSA, Quezon City, Metro Manila",
    phone: "+63 917 123 4568",
    hours: "Mon-Sun: 7:00 AM - 7:00 PM",
    isOpen: true,
    distance: "5.1 km away",
    driveTime: "~15 minutes"
  },
  {
    name: "Taguig Branch",
    address: "789 BGC, Taguig City, Metro Manila",
    phone: "+63 917 123 4569",
    hours: "Mon-Sun: 7:00 AM - 7:00 PM",
    isOpen: false,
    distance: "8.7 km away",
    driveTime: "~25 minutes"
  }
]

// Focused FAQ for contact objections
const contactFaqs = [
  {
    question: "How fast do you reply?",
    answer: "Calls are answered immediately during business hours (7 AM - 7 PM). WhatsApp/SMS replies within 15 minutes. Email replies within 2 hours."
  },
  {
    question: "What info should I provide?",
    answer: "Just your name, phone number, and what service you need. We'll handle the rest and call you back to confirm details."
  },
  {
    question: "Can I reschedule my appointment?",
    answer: "Yes! Just call us at least 2 hours before your appointment. We'll reschedule you for free to the next available slot."
  },
  {
    question: "What if you're closed?",
    answer: "Leave a message or send a WhatsApp/SMS. We'll get back to you first thing when we open at 7 AM."
  }
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOtherLocations, setShowOtherLocations] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    setFormData({
      name: "",
      contact: "",
      message: ""
    })
    setIsSubmitting(false)
    
    // Show success message
    alert("Thank you! We'll reply within 2 hours during business hours.")
  }

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-16 pt-32">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Help Fast
            </h1>
            <p className="text-lg md:text-xl text-brand-cream mb-4 max-w-2xl mx-auto">
              Choose how you'd like to reach us. We're here to help with quick, friendly service.
            </p>
            <div className="flex items-center justify-center gap-2 text-brand-cream/90">
              <CheckCircle className="h-5 w-5" />
              <span className="text-lg font-semibold">Trusted by 1,200+ happy drivers</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Recommended Contact Method */}
      <section className="py-12 bg-brand-cream">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-xl border-2 border-brand-primary">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-brand-primary text-white text-sm font-bold rounded-full">
                    {recommendedContact.subtitle}
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">{recommendedContact.responseTime}</span>
                  </div>
                </div>
                
                <div className="mx-auto mb-6 p-6 bg-brand-accent rounded-full w-fit">
                  <recommendedContact.icon className="h-12 w-12 text-brand-primary" />
                </div>
                
                <h2 className="text-3xl font-bold text-brand-dark mb-2">{recommendedContact.title}</h2>
                <p className="text-lg text-neutral-600 mb-4">{recommendedContact.description}</p>
                <p className="text-2xl font-bold text-brand-primary mb-2">{recommendedContact.details}</p>
                <p className="text-sm text-neutral-500 mb-2">Staffed: {recommendedContact.staffedHours}</p>
                <p className="text-sm text-green-600 font-semibold mb-8">{recommendedContact.waitTime}</p>
                
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold text-xl px-12 py-4 focus-ring"
                >
                  <a href={recommendedContact.href}>
                    {recommendedContact.action}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-12 bg-white">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Other Ways to Reach Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`bg-white hover:shadow-lg transition-shadow border-2 ${method.accent}`}>
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 p-4 rounded-full w-fit ${
                    method.color === 'green' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <method.icon className={`h-8 w-8 ${
                      method.color === 'green' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{method.title}</h3>
                  <p className="text-neutral-600 mb-4">{method.description}</p>
                  <p className={`text-lg font-semibold mb-2 ${
                    method.color === 'green' ? 'text-green-700' : 'text-blue-700'
                  }`}>{method.details}</p>
                  <p className="text-sm text-green-600 mb-6">{method.responseTime}</p>
                  <Button
                    asChild
                    className={`w-full font-semibold py-3 focus-ring ${
                      method.color === 'green' 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <a href={method.href}>
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Message Form */}
      <section className="py-12 bg-brand-cream">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                Send a Quick Message
              </h2>
              <p className="text-neutral-600 mb-2">
                Just 3 fields and we'll get back to you fast.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">We reply within 2 hours during business hours</span>
              </div>
            </div>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-lg font-semibold text-brand-dark mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="focus-ring text-lg py-3"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-lg font-semibold text-brand-dark mb-2">
                      Phone or Email *
                    </label>
                    <Input
                      id="contact"
                      name="contact"
                      type="text"
                      required
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="focus-ring text-lg py-3"
                      placeholder="Phone number or email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-lg font-semibold text-brand-dark mb-2">
                      What do you need? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none focus-ring text-lg"
                      placeholder="Tell us what service you need or any questions you have..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 font-bold text-xl py-4 focus-ring"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-6 w-6 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-neutral-500 text-center mt-4">
                    Your details are kept private and only used to respond to your inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Nearest Location */}
      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                Visit Our Nearest Branch
              </h2>
            </div>

            <Card className="bg-white shadow-xl border-2 border-brand-primary">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">{nearestLocation.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        nearestLocation.isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {nearestLocation.isOpen ? 'OPEN NOW' : 'CLOSED'}
                      </div>
                      <span className="text-sm text-neutral-500">{nearestLocation.distance}</span>
                      <span className="text-sm text-neutral-500">• {nearestLocation.driveTime}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-brand-primary mt-1 flex-shrink-0" />
                      <p className="text-neutral-600">{nearestLocation.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-brand-primary flex-shrink-0" />
                      <p className="text-neutral-600">{nearestLocation.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-brand-primary flex-shrink-0" />
                      <p className="text-neutral-600">{nearestLocation.hours}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-brand-dark mb-2">Services Available:</p>
                    <div className="flex flex-wrap gap-2">
                      {nearestLocation.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-brand-accent text-brand-primary text-sm font-medium rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold text-lg px-8 py-4 focus-ring flex-1"
                  >
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(nearestLocation.address)}`}>
                      <Navigation className="h-5 w-5 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold text-lg px-8 py-4 focus-ring flex-1"
                  >
                    <a href={`tel:${nearestLocation.phone}`}>
                      <Phone className="h-5 w-5 mr-2" />
                      Call Branch
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Other Locations */}
      <section className="py-12 bg-neutral-50">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Other Locations
            </h2>
            <Button
              onClick={() => setShowOtherLocations(!showOtherLocations)}
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold focus-ring"
            >
              {showOtherLocations ? 'Hide' : 'Show'} Other Locations
            </Button>
          </div>

          {showOtherLocations && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {otherLocations.map((location, index) => (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-brand-dark">{location.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        location.isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {location.isOpen ? 'OPEN' : 'CLOSED'}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-brand-primary mt-1 flex-shrink-0" />
                        <p className="text-sm text-neutral-600">{location.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-brand-primary flex-shrink-0" />
                        <p className="text-sm text-neutral-600">{location.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-primary flex-shrink-0" />
                        <p className="text-sm text-neutral-600">{location.hours}</p>
                      </div>
                      <p className="text-xs text-neutral-500">{location.distance} • {location.driveTime}</p>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold focus-ring"
                    >
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}>
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Focused FAQ */}
      <section className="py-12 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              FAQs
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Common questions about contacting us and getting help.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactFaqs.map((faq, index) => (
                <Card key={index} className="bg-white border border-neutral-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-bold text-brand-dark mb-4">{faq.question}</h3>
                    <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>


      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden">
        <div className="flex">
          <Button
            asChild
            className="flex-1 rounded-none border-r border-neutral-200 bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold py-4 focus-ring"
          >
            <a href="tel:+639171234567" className="flex flex-col items-center gap-1">
              <Phone className="h-5 w-5" />
              <span className="text-sm">Call</span>
            </a>
          </Button>
          <Button
            asChild
            className="flex-1 rounded-none border-r border-neutral-200 bg-green-600 text-white hover:bg-green-700 font-semibold py-4 focus-ring"
          >
            <a href="https://wa.me/639171234567" className="flex flex-col items-center gap-1">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">WhatsApp</span>
            </a>
          </Button>
          <Button
            asChild
            className="flex-1 rounded-none bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold py-4 focus-ring"
          >
            <a href={`https://maps.google.com/?q=${encodeURIComponent(nearestLocation.address)}`} className="flex flex-col items-center gap-1">
              <Navigation className="h-5 w-5" />
              <span className="text-sm">Directions</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
