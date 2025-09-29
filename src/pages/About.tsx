<<<<<<< HEAD
// About page - Professional car wash services with family values and quality focus
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ChevronRight, 
  Star, 
  Clock, 
  Users, 
  Car, 
  Shield, 
  Award, 
  Heart, 
  Hand 
} from "lucide-react"

<<<<<<< HEAD
// Performance indicators displayed 
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Performance indicators displayed 
=======
>>>>>>> origin/staging
=======
// Performance indicators displayed 
>>>>>>> Stashed changes
=======
// Performance indicators displayed 
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Star, Clock, Users, Car, Shield, Award, Heart, Hand } from "lucide-react"

// Performance indicators displayed 
>>>>>>> origin/main
const kpis = [
  {
    number: "120+",
    label: "Happy Customers",
    icon: Users,
  },
  {
    number: "5+",
    label: "Years Experience",
    icon: Clock,
  },
  {
    number: "5,000+",
    label: "Cars Washed",
    icon: Car,
  },
  {
    number: "4.9/5",
    label: "Star Rating",
    icon: Star,
  },
]

<<<<<<< HEAD
<<<<<<< HEAD
// Core business values
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Core business values
=======
>>>>>>> origin/staging
=======
// Core business values
>>>>>>> Stashed changes
=======
// Core business values
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Core business values
>>>>>>> origin/main
const values = [
  {
    title: "Family-Owned",
    description: "We're a local family business that treats every customer like family. Personal service you can trust.",
    icon: Heart,
  },
  {
    title: "Hand-Washed Only",
    description: "No machines, no shortcuts. Every car gets the personal attention it deserves with meticulous hand washing.",
    icon: Hand,
  },
  {
    title: "Quality Guaranteed",
    description: "100% satisfaction guarantee. If you're not happy, we'll make it right or refund your money.",
    icon: Shield,
  },
  {
    title: "Neighborhood Friendly",
    description: "Fair pricing that works for local families. Premium service without the premium price tag.",
    icon: Award,
  },
]

<<<<<<< HEAD
<<<<<<< HEAD
// About page component
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// About page component
=======
>>>>>>> origin/staging
=======
// About page component
>>>>>>> Stashed changes
=======
// About page component
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// About page component
>>>>>>> origin/main
export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-20">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Espinosa's
              </h1>
              <p className="text-lg md:text-xl text-brand-cream mb-8">
                Where Cars Come to Shine - A family story of dedication, quality, and community.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story Split Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="col-span-12 lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  Our Story
                </h2>
                <div className="w-16 h-1 bg-brand-primary mb-6"></div>
              </div>
              
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  Espinosa's Hand Carwash started as a small family dream in 2019. After years of watching 
                  expensive car wash chains charge premium prices for rushed service, we knew there had to be 
                  a better way.
                </p>
                <p>
                  We believe every car deserves the same care and attention we give our own vehicles. 
                  That's why we hand-wash every car with meticulous detail, using only the finest products 
                  and techniques passed down through generations.
                </p>
                <p>
                  Today, we're proud to serve over 120+ happy customers across Metro Manila, maintaining 
                  the same family values and quality standards that started it all.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold text-lg px-8 py-4 focus-ring"
              >
                <a href="/#book-now">
                  Book Your Wash
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            
            <div className="col-span-12 lg:col-span-6 relative">
              <div className="bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <Hand className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-semibold">Family-Owned</p>
                  <p className="text-brand-cream">Since 2019</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* KPI Strip */}
      <section className="bg-brand-cream py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Numbers that tell our story of growth, quality, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {kpis.map((kpi, index) => (
              <div key={index} className="col-span-6 md:col-span-3 text-center">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="mx-auto mb-4 p-3 bg-brand-accent rounded-full w-fit">
                    <kpi.icon className="h-8 w-8 text-brand-primary" />
                  </div>
                  <div className="text-3xl font-bold text-brand-primary mb-2">{kpi.number}</div>
                  <div className="text-brand-dark font-medium">{kpi.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Our Values
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Espinosa's Hand Carwash.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="col-span-12 md:col-span-6 h-full hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-brand-primary">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-accent rounded-lg flex-shrink-0">
                      <value.icon className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark mb-3">
                        {value.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="bg-brand-accent py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Meet the Team
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              The dedicated family and team members who make Espinosa's special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-white">
              <CardContent className="p-8">
                <div className="bg-brand-primary rounded-full h-24 w-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JE</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Juan Espinosa</h3>
                <p className="text-brand-primary font-medium mb-3">Founder & Owner</p>
                <p className="text-neutral-600 text-sm">
                  Started the business with a vision to provide quality car washing at fair prices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white">
              <CardContent className="p-8">
                <div className="bg-brand-primary rounded-full h-24 w-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">ME</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Maria Espinosa</h3>
                <p className="text-brand-primary font-medium mb-3">Operations Manager</p>
                <p className="text-neutral-600 text-sm">
                  Ensures every customer receives the highest quality service and attention.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white">
              <CardContent className="p-8">
                <div className="bg-brand-primary rounded-full h-24 w-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">TE</span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Team Espinosa</h3>
                <p className="text-brand-primary font-medium mb-3">Expert Washers</p>
                <p className="text-neutral-600 text-sm">
                  Our skilled team members trained in the art of meticulous hand washing.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-dark text-white py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 mb-8">
              Join our family of satisfied customers and see why Espinosa's is the trusted choice for hand car washing.
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
        </Container>
      </section>
    </div>
  )
}