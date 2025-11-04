// How It Works page - Complete implementation
import { Container } from "@/components/layout/Container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaqSection } from "@/components/sections/FaqSection"
import {
  CheckCircle,
  Clock,
  CreditCard,
  Car,
  ArrowRight,
} from "lucide-react"
import { HOME_BOOKING_STEPS } from "./home/content"

// Booking steps data
const bookingSteps = HOME_BOOKING_STEPS.map((step, index) => ({
  ...step,
  stepNumber: index + 1,
}))

// Additional features
const additionalFeatures = [
  {
    icon: CheckCircle,
    title: "Easy Booking",
    description: "Book your service online in just a few clicks. No need to call or visit.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Choose your preferred date and time. We operate 7 days a week.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description: "Pay with cash, card, GCash, Maya, or QR Ph. Secure and convenient.",
  },
  {
    icon: Car,
    title: "Vehicle Care",
    description: "We handle all vehicle types - cars, SUVs, vans, and motorcycles.",
  },
]

// FAQs data
const howItWorksFaqs = [
  {
    question: "How do I book a service?",
    answer: "Simply browse our services, select your preferred service, choose your location, date, and time slot, then complete your booking. It takes just a few minutes!"
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes! You can cancel or reschedule your booking up to 2 hours before your scheduled time. Just contact us or use the booking confirmation link."
  },
  {
    question: "Do I need to be present during the service?",
    answer: "No, you can drop off your vehicle and pick it up when ready. We'll send you a notification when your service is complete."
  },
  {
    question: "How long does a reservation last?",
    answer: "Your time slot is reserved for 15 minutes after booking. Complete your checkout within this time to secure your slot."
  },
]

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-dark py-20 pt-32 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-brand-cream/90 mb-4">
              Simple steps to get your car clean
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Booking your car wash service is quick and easy. Follow these simple steps to get started.
            </p>
          </div>
        </Container>
      </section>

      {/* Booking Steps Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-heading">
                Booking Process
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                From booking to pickup, we've made the process as simple as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {bookingSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                    {step.stepNumber}
                  </div>

                  {/* Step Card */}
                  <Card className="h-full border-2 border-neutral-200 hover:border-brand-primary hover:shadow-lg transition-all pt-8">
                    <CardHeader>
                      <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-brand-primary/10 rounded-lg">
                          <step.icon className="h-8 w-8 text-brand-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-brand-dark text-center">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600 text-center leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Arrow connector (except last item) */}
                  {index < bookingSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                      <ArrowRight className="h-8 w-8 text-brand-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-brand-cream">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-heading">
                Why Choose Our Booking System?
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="border border-neutral-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-brand-primary/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-brand-primary" />
                      </div>
                      <CardTitle className="text-lg font-bold text-brand-dark">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FaqSection 
        faqs={howItWorksFaqs}
        title="Frequently Asked Questions"
        subtitle="Common questions about our booking process and what to expect."
        className="py-20"
      />
    </div>
  )
}
