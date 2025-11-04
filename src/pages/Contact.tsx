// Contact page - Professional, modern, and trustworthy design
import { useState } from "react"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Phone, 
  Mail, 
  CheckCircle,
  Send,
  MessageCircle,
  Star,
  Shield,
  Timer,
  AlertCircle,
  Users
} from "lucide-react"

// Trust indicators data
const trustIndicators = {
  customersServed: "5,000+",
  averageRating: "4.9",
  responseTime: "< 15 min",
  yearsInBusiness: "8+",
  satisfactionGuarantee: "100%"
}

// Contact methods with enhanced information
const contactMethods = [
  {
  icon: Phone,
  title: "Call Us",
  subtitle: "RECOMMENDED",
  description: "Speak directly with our team",
  details: "+63 917 123 4567",
  action: "Call Now",
  href: "tel:+639171234567",
  responseTime: "Immediate",
  waitTime: "Usually under 30 seconds",
    staffedHours: "7 AM - 7 PM daily",
    color: "primary",
    accent: "bg-brand-primary/10 border-brand-primary/20 text-brand-primary",
    iconBg: "bg-brand-primary"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp/SMS",
    description: "Quick text message",
    details: "+63 917 123 4567",
    action: "Send Message",
    href: "https://wa.me/639171234567",
    responseTime: "Within 15 minutes",
    color: "green",
    accent: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-500"
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
    accent: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-500"
  }
]

// Service types for form dropdown
const serviceTypes = [
  "Basic Wash",
  "Premium Wash", 
  "Full Detailing",
  "Interior Deep Clean",
  "Engine Bay Clean",
  "Wax Application",
  "Other"
]

// Enhanced FAQ with better structure
const contactFaqs = [
  {
    question: "How fast do you reply?",
    answer: "Calls are answered immediately during business hours (7 AM - 7 PM). WhatsApp/SMS replies within 15 minutes. Email replies within 2 hours."
  },
  {
    question: "What information should I provide?",
    answer: "Just your name, phone number, preferred service type, and any specific requirements. We'll handle the rest and call you back to confirm details."
  },
  {
    question: "Can I reschedule my appointment?",
    answer: "Yes! Just call us at least 2 hours before your appointment. We'll reschedule you for free to the next available slot."
  },
  {
    question: "What if you're closed?",
    answer: "Leave a message or send a WhatsApp/SMS. We'll get back to you first thing when we open at 7 AM."
  },
  {
    question: "Do you offer mobile car wash services?",
    answer: "Currently we operate from our physical locations only. We have 6 convenient locations across Metro Manila, Cebu, Davao, and Iloilo."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, credit cards (Visa, Mastercard), GCash, Maya, and QR Ph payments for your convenience."
  }
]


export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    serviceType: "",
    preferredMethod: "",
    message: ""
  })
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }
    
    if (!formData.contact.trim()) {
      errors.contact = "Contact information is required"
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.contact.replace(/\s/g, '')) && 
               !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact)) {
      errors.contact = "Please enter a valid phone number or email"
    }
    
    if (!formData.serviceType) {
      errors.serviceType = "Please select a service type"
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
    setFormData({
      name: "",
      contact: "",
        serviceType: "",
        preferredMethod: "",
      message: ""
    })
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-primary/80 text-white py-20 pt-32 overflow-hidden">
        {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <Container>
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-sm font-semibold">TRUSTED BY {trustIndicators.customersServed} CUSTOMERS</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get Help
              <span className="block text-brand-cream">Fast & Easy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-cream/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional car care made simple. Choose how you'd like to reach us - we're here to help with quick, friendly service.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-semibold">{trustIndicators.averageRating}/5</span>
                </div>
                
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-green-400" />
                <span className="text-lg font-semibold">{trustIndicators.responseTime} response</span>
                </div>
                
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-lg font-semibold">{trustIndicators.satisfactionGuarantee} Guarantee</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Choose Your Preferred Contact Method
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We're available through multiple channels. Pick what works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${method.accent} group`} role="article" aria-label={`${method.title} contact option`}>
                <CardContent className="p-8 text-center">
                  {method.subtitle && (
                    <div className="absolute top-4 right-4" aria-label="Recommended contact method">
                      <div className="px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full">
                        {method.subtitle}
                      </div>
                    </div>
                  )}

                  <div className={`mx-auto mb-6 p-6 rounded-full w-fit ${method.iconBg} group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-dark mb-3">{method.title}</h3>
                  <p className="text-neutral-600 mb-4">{method.description}</p>
                  <p className="text-lg font-semibold mb-2">{method.details}</p>
                  
                  {method.staffedHours && (
                    <p className="text-sm text-neutral-500 mb-2">Staffed: {method.staffedHours}</p>
                  )}

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
                    <span className="text-sm font-semibold text-green-600">{method.responseTime}</span>
                  </div>

                  <Button
                    asChild
                    className={`w-full font-semibold py-3 focus-ring ${
                      method.color === 'primary'
                        ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                        : method.color === 'green'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <a href={method.href} aria-label={`${method.action}: ${method.details}`}>
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Enhanced Contact Form */}
      <section className="py-16 bg-brand-cream">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                Fill out the form below and we'll get back to you within 2 hours during business hours.
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">We reply within 2 hours during business hours</span>
                <Users className="h-5 w-5" />
                <span className="font-semibold">{trustIndicators.customersServed} happy customers</span>
              </div>
            </div>

            <Card className="bg-white shadow-xl border-0">
              <CardContent className="p-8">
                {isSuccess ? (
                  <div className="text-center py-12" role="status" aria-live="polite">
                    <div className="mx-auto mb-6 p-6 bg-green-100 rounded-full w-fit">
                      <CheckCircle className="h-12 w-12 text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-4">Message Sent Successfully!</h3>
                    <p className="text-lg text-neutral-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 2 hours during business hours.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <Timer className="h-4 w-4" aria-hidden="true" />
                      <span className="font-semibold">Expected response time: {trustIndicators.responseTime}</span>
                    </div>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          className={`focus-ring text-lg py-3 ${formErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="Enter your full name"
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                    />
                        {formErrors.name && (
                          <div id="name-error" className="flex items-center gap-2 mt-2 text-red-600" role="alert">
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            <span className="text-sm">{formErrors.name}</span>
                          </div>
                        )}
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
                          className={`focus-ring text-lg py-3 ${formErrors.contact ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="Phone number or email address"
                      aria-required="true"
                      aria-invalid={!!formErrors.contact}
                      aria-describedby={formErrors.contact ? "contact-error" : undefined}
                    />
                        {formErrors.contact && (
                          <div id="contact-error" className="flex items-center gap-2 mt-2 text-red-600" role="alert">
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            <span className="text-sm">{formErrors.contact}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="serviceType" className="block text-lg font-semibold text-brand-dark mb-2">
                          Service Type *
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          required
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-lg ${formErrors.serviceType ? 'border-red-500 focus:border-red-500' : ''}`}
                          aria-required="true"
                          aria-invalid={!!formErrors.serviceType}
                          aria-describedby={formErrors.serviceType ? "service-error" : undefined}
                        >
                          <option value="">Select a service</option>
                          {serviceTypes.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                        {formErrors.serviceType && (
                          <div id="service-error" className="flex items-center gap-2 mt-2 text-red-600" role="alert">
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            <span className="text-sm">{formErrors.serviceType}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="preferredMethod" className="block text-lg font-semibold text-brand-dark mb-2">
                          Preferred Contact Method
                        </label>
                        <select
                          id="preferredMethod"
                          name="preferredMethod"
                          value={formData.preferredMethod}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-lg"
                          aria-label="Select preferred contact method (optional)"
                        >
                          <option value="">No preference</option>
                          <option value="call">Phone Call</option>
                          <option value="whatsapp">WhatsApp/SMS</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-lg font-semibold text-brand-dark mb-2">
                        Tell us what you need *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                        rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                        className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none focus-ring text-lg ${formErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Tell us what service you need, any specific requirements, or questions you have..."
                      aria-required="true"
                      aria-invalid={!!formErrors.message}
                      aria-describedby={formErrors.message ? "message-error" : "message-length"}
                      maxLength={500}
                      />
                      <div className="flex justify-between items-center mt-2">
                        {formErrors.message ? (
                          <div id="message-error" className="flex items-center gap-2 text-red-600" role="alert">
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            <span className="text-sm">{formErrors.message}</span>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <span id="message-length" className="text-sm text-neutral-500" aria-live="polite">
                          {formData.message.length}/500 characters
                        </span>
                      </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 font-bold text-xl py-4 focus-ring"
                    aria-label={isSubmitting ? "Sending message" : "Send message"}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" aria-hidden="true"></div>
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="h-6 w-6" aria-hidden="true" />
                          <span>Send Message</span>
                        </div>
                    )}
                  </Button>
                  
                  <p className="text-sm text-neutral-500 text-center mt-4">
                      Your details are kept private and only used to respond to your inquiry. We never share your information.
                  </p>
                </form>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Common questions about contacting us and getting help with your car care needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4" aria-label="Frequently asked questions">
              {contactFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-neutral-200 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-brand-dark hover:text-brand-primary py-6" aria-label={`Question: ${faq.question}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>


      {/* Mobile Sticky Action Bar - Simplified */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden" role="region" aria-label="Quick contact actions">
        <div className="flex">
          <Button
            asChild
            className="flex-1 rounded-none border-r border-neutral-200 bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold py-4 focus-ring"
          >
            <a href="tel:+639171234567" className="flex flex-col items-center gap-1" aria-label="Call us now at +63 917 123 4567">
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm">Call Now</span>
            </a>
          </Button>
          <Button
            asChild
            className="flex-1 rounded-none bg-green-600 text-white hover:bg-green-700 font-semibold py-4 focus-ring"
          >
            <a href="https://wa.me/639171234567" className="flex flex-col items-center gap-1" aria-label="Contact us on WhatsApp at +63 917 123 4567">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm">WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
