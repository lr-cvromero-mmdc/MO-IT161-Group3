// About page - Complete About Us page with company story, mission, vision, values, and team
import { Container } from "@/components/layout/Container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SEO } from "@/components/seo/SEO"
import {
  Award,
  CheckCircle,
  Heart,
  Shield,
  Star,
  Target,
  Users,
  Wrench,
  Sparkles,
  Car,
  MapPin,
  TrendingUp,
  Zap,
} from "lucide-react"
import heroBackgroundImage from "@/assets/images/pages/about/hero-background-about.png"
import ourStoryImage from "@/assets/images/pages/about/our-story.jpg"
import ourVisionImage from "@/assets/images/pages/about/our-vision.jpg"
import mariaEspinosaImage from "@/assets/images/pages/about/Maria Espinosa.jpg"
import juanDelaCruzImage from "@/assets/images/pages/about/JuanDelaCruz.jpg"
import sarahChenImage from "@/assets/images/pages/about/Sarah Chen.jpg"

// Company Statistics
const companyStats = [
  { icon: Users, value: "5,000+", label: "Happy Customers", color: "text-brand-primary" },
  { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-yellow-500" },
  { icon: Car, value: "8+", label: "Years Experience", color: "text-brand-accent" },
  { icon: MapPin, value: "6", label: "Branch Locations", color: "text-green-600" },
]

// Company Values
const companyValues = [
  {
    icon: Shield,
    title: "Quality First",
    description: "We never compromise on quality. Every service is delivered with attention to detail and professional standards that exceed expectations.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Your satisfaction is our priority. We listen to your needs and go the extra mile to ensure your vehicle looks and feels its best.",
  },
  {
    icon: Wrench,
    title: "Hand-Crafted Excellence",
    description: "Every wash is done by hand with care and precision. We believe in the personal touch that automated systems simply can't match.",
  },
  {
    icon: Zap,
    title: "Efficiency & Convenience",
    description: "We value your time. Our streamlined booking system and efficient service mean you can get back on the road quickly without waiting.",
  },
  {
    icon: Award,
    title: "Professional Standards",
    description: "Our team is trained in the latest techniques and uses only premium products. We maintain the highest standards in everything we do.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We continuously improve our services and embrace new technologies to provide you with the best car care experience possible.",
  },
]

// Team Members
const teamMembers = [
  {
    name: "Maria Espinosa",
    role: "Founder & CEO",
    description: "With over 10 years in the automotive care industry, Maria founded Espinosa's with a vision to provide premium hand car wash services.",
    expertise: "Customer Service, Business Strategy",
    image: mariaEspinosaImage,
  },
  {
    name: "Juan Dela Cruz",
    role: "Operations Manager",
    description: "Juan ensures smooth operations across all branches, maintaining quality standards and training our professional team.",
    expertise: "Operations, Quality Control",
    image: juanDelaCruzImage,
  },
  {
    name: "Sarah Chen",
    role: "Head of Customer Experience",
    description: "Sarah leads our customer service team, ensuring every customer receives personalized attention and exceptional service.",
    expertise: "Customer Relations, Service Excellence",
    image: sarahChenImage,
  },
]

// Mission & Vision
const missionVision = {
  mission: {
    title: "Our Mission",
    content: "To provide premium hand car wash services that exceed customer expectations through quality craftsmanship, exceptional customer care, and innovative solutions. We are committed to making every vehicle shine while respecting your time and delivering value that makes a difference.",
  },
  vision: {
    title: "Our Vision",
    content: "To become the leading hand car wash service provider in the Philippines, recognized for our commitment to quality, customer satisfaction, and sustainable business practices. We envision a future where every car owner can easily access premium car care services that make their vehicles look and feel brand new.",
  },
}

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About Us - Our Story"
        description="Learn about Espinosa's Hand Carwash - a family-owned car wash business serving Philippines since 2016. Discover our mission, values, and commitment to quality."
        keywords="about us, car wash company, family business, Philippines car wash, professional detailing, car care history"
      />
      {/* Hero Section with Background Image */}
      <section className="relative bg-brand-primary py-20 pt-32 text-white min-h-[500px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackgroundImage} 
            alt="Espinosa's Hand Carwash - About Us"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/80 via-brand-primary/70 to-brand-dark/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
                About Espinosa's
              </h1>
              <p className="text-xl md:text-2xl text-brand-cream/90 mb-8">
                Where Cars Come to Shine
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                We're more than just a car wash. We're a team of passionate professionals dedicated to giving your vehicle the care and attention it deserves.
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-brand-cream">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {companyStats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-neutral-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-heading">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Story Image */}
              <div className="order-2 md:order-1 h-full">
                <div className="relative rounded-lg overflow-hidden shadow-xl h-full">
                  <img
                    src={ourStoryImage}
                    alt="Espinosa's Hand Carwash - Professional car washing service"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Story Content */}
              <div className="order-1 md:order-2 space-y-6 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Espinosa's Hand Carwash was founded in 2016 with a simple yet powerful vision: to provide premium car care services that combine traditional hand-crafted excellence with modern convenience.
                </p>
                <p>
                  What started as a single location in Metro Manila has grown into a trusted name across the Philippines, with multiple branches serving thousands of satisfied customers. Our journey began when our founder, Maria Espinosa, recognized that car owners deserved more than just a basic wash—they deserved a service that treated their vehicles with the same care and attention they would give themselves.
                </p>
                <p>
                  Over the years, we've built our reputation on three core principles: <strong>Quality</strong>, <strong>Care</strong>, and <strong>Convenience</strong>. Every service we offer is designed with these values in mind, ensuring that whether you choose our Basic Wash or our Full Detailing service, you receive the same level of professional excellence.
                </p>
                <p>
                  Today, Espinosa's continues to evolve, introducing innovative booking systems, expanding our service offerings, and maintaining our commitment to hand-crafted quality. We're proud to be part of your car care journey and look forward to serving you for years to come.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-brand-cream">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-heading">
                Mission & Vision
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={heroBackgroundImage}
                    alt="Our Mission - Professional car care"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-primary/30"></div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-brand-primary" />
                    <CardTitle className="text-2xl font-bold text-brand-dark">
                      {missionVision.mission.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 leading-relaxed">
                    {missionVision.mission.content}
                  </p>
                </CardContent>
              </Card>

              {/* Vision Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ourVisionImage}
                    alt="Our Vision - Future goals"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-brand-accent/80 to-brand-accent flex items-center justify-center">
                    <TrendingUp className="h-16 w-16 text-white opacity-50" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-8 w-8 text-brand-accent" />
                    <CardTitle className="text-2xl font-bold text-brand-dark">
                      {missionVision.vision.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 leading-relaxed">
                    {missionVision.vision.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Company Values Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-heading">
                Our Values
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape how we serve our customers every day.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyValues.map((value, index) => (
                <Card key={index} className="border border-neutral-200 hover:shadow-lg transition-shadow hover:border-brand-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-brand-primary/10 rounded-lg">
                        <value.icon className="h-6 w-6 text-brand-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-brand-dark">
                        {value.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-brand-primary/5 to-brand-cream/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-heading">
                Why Choose Espinosa's?
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    Hand-Crafted Excellence
                  </h3>
                  <p className="text-neutral-600">
                    Every wash is done by hand with attention to detail. Our skilled team ensures your vehicle receives personalized care that automated systems can't match.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    Premium Products
                  </h3>
                  <p className="text-neutral-600">
                    We use only the finest car care products that are safe for your vehicle's paint and surfaces, ensuring long-lasting shine and protection.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    Convenient Booking
                  </h3>
                  <p className="text-neutral-600">
                    Our easy-to-use online booking system lets you schedule your service at your convenience. Choose your preferred location, date, and time slot.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    Multiple Locations
                  </h3>
                  <p className="text-neutral-600">
                    With branches across Metro Manila and major cities, we're always nearby. Find a location that's convenient for you.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    Satisfaction Guaranteed
                  </h3>
                  <p className="text-neutral-600">
                    We stand behind our work. If you're not completely satisfied, we'll make it right. Your happiness is our success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 font-heading">
                Our Team
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Meet the passionate professionals behind Espinosa's Hand Carwash
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border border-neutral-200 hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-brand-cream shadow-md">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover ${
                          member.name === "Maria Espinosa" ? "object-[center_20%]" : "object-top"
                        }`}
                        loading="lazy"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold text-brand-dark">
                      {member.name}
                    </CardTitle>
                    <p className="text-brand-primary font-semibold mt-1">
                      {member.role}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {member.description}
                    </p>
                    <div className="pt-4 border-t border-neutral-200">
                      <p className="text-sm text-neutral-500">
                        <strong>Expertise:</strong> {member.expertise}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
