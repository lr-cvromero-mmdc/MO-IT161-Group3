import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Star, Clock, Users, Car, Shield, Award, Heart, Hand } from "lucide-react"

// Performance indicators displayed 
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

// Core business values
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

// About page component
export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-100 py-16 pt-32">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              About Espinosa's
            </h1>
            <p className="text-lg text-gray-600">
              Where Cars Come to Shine
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Under Development
            </h2>
            <p className="text-gray-600 mb-8">
              This page is being developed by the team.
            </p>
            <div className="bg-gray-50 border rounded p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Planned Content:
              </h3>
              <ul className="text-left text-gray-600 space-y-1">
                <li>• Our Story</li>
                <li>• Company Values</li>
                <li>• Team Members</li>
                <li>• Mission & Vision</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}