import type { LucideIcon } from "lucide-react"
import {
  Award,
  Calendar,
  Car,
  CheckCircle,
  Hand,
  MapPin,
  Shield,
  ShoppingCart,
  Star,
} from "lucide-react"

import type { Location } from "@/lib/locationUtils"

import carShampooImg from "@/assets/images/products/car-shampoo.png"
import microfiberTowelImg from "@/assets/images/products/microfiber-towel.png"
import carWaxImg from "@/assets/images/products/car-wax.png"
import tireGelImg from "@/assets/images/products/tire-gel.png"
import interiorCleanerImg from "@/assets/images/products/interior-cleaner.png"
import wheelBrushImg from "@/assets/images/products/wheel-brush.png"

export interface HomeService {
  id: string
  title: string
  price: number
  priceDisplay: string
  description: string
  features: string[]
  icon: LucideIcon
  duration: number
}

export interface HomeBookingStep {
  icon: LucideIcon
  title: string
  description: string
}

export interface HomeStoreProduct {
  id: string
  name: string
  price: number
  priceDisplay: string
  description: string
  image: string
  category: string
}

export interface HomeTestimonial {
  id: number
  quote: string
  customer: string
}

export interface HomeQualityFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface HomeFaq {
  question: string
  answer: string
}

export const HOME_SERVICES: HomeService[] = [
  {
    id: "basic-wash",
    title: "Basic Wash",
    price: 1500,
    priceDisplay: "PHP 1,500",
    description: "Exterior wash, wheel clean, dry and shine. Perfect for weekly maintenance.",
    features: ["Exterior wash", "Wheel cleaning", "Dry and shine", "Tire dressing"],
    icon: Car,
    duration: 30,
  },
  {
    id: "premium-wash",
    title: "Premium Wash",
    price: 2500,
    priceDisplay: "PHP 2,500",
    description: "Basic wash plus interior vacuum, dashboard clean, tire shine. Complete care.",
    features: ["Everything in Basic", "Interior vacuum", "Dashboard clean", "Tire shine"],
    icon: Shield,
    duration: 45,
  },
  {
    id: "full-detailing",
    title: "Full Detailing",
    price: 4500,
    priceDisplay: "PHP 4,500",
    description: "Premium wash plus wax, leather conditioning, engine bay clean. Showroom ready.",
    features: ["Everything in Premium", "Wax application", "Leather conditioning", "Engine bay clean"],
    icon: Award,
    duration: 90,
  },
]

export const HOME_BOOKING_STEPS: HomeBookingStep[] = [
  {
    icon: MapPin,
    title: "Locate the nearest branch",
    description: "Enter your address or postcode across our service areas.",
  },
  {
    icon: ShoppingCart,
    title: "Choose a service",
    description: "From quick washes to full detailing packages.",
  },
  {
    icon: Calendar,
    title: "Pick date and time",
    description: "We operate seven days a week to match your schedule.",
  },
  {
    icon: Star,
    title: "Pay and enjoy",
    description: "We will have your car looking new again in no time.",
  },
]

export const HOME_STORE_PRODUCTS: HomeStoreProduct[] = [
  {
    id: "car-shampoo",
    name: "Premium Car Shampoo",
    price: 299,
    priceDisplay: "PHP 299",
    description: "Professional-grade car shampoo for gentle cleaning.",
    image: carShampooImg,
    category: "cleaning",
  },
  {
    id: "microfiber-towels",
    name: "Microfiber Towels (Set of 3)",
    price: 499,
    priceDisplay: "PHP 499",
    description: "High-quality microfiber towels for streak-free drying.",
    image: microfiberTowelImg,
    category: "cleaning",
  },
  {
    id: "car-wax",
    name: "Car Wax (16oz)",
    price: 799,
    priceDisplay: "PHP 799",
    description: "Long-lasting car wax for protection and shine.",
    image: carWaxImg,
    category: "protection",
  },
  {
    id: "tire-shine",
    name: "Tire Shine Gel",
    price: 199,
    priceDisplay: "PHP 199",
    description: "Non-greasy tire shine for a glossy finish.",
    image: tireGelImg,
    category: "protection",
  },
  {
    id: "interior-cleaner",
    name: "Interior Cleaner",
    price: 399,
    priceDisplay: "PHP 399",
    description: "Safe cleaner for dashboard, seats, and interior surfaces.",
    image: interiorCleanerImg,
    category: "cleaning",
  },
  {
    id: "wheel-brush",
    name: "Wheel Brush Set",
    price: 599,
    priceDisplay: "PHP 599",
    description: "Professional wheel cleaning brushes for all rim types.",
    image: wheelBrushImg,
    category: "tools",
  },
]

export const HOME_TESTIMONIALS: HomeTestimonial[] = [
  {
    id: 1,
    quote: "Fast, clean, and reliable. My car has never looked better!",
    customer: "Local Customer",
  },
  {
    id: 2,
    quote: "Excellent service and attention to detail. Highly recommended!",
    customer: "Local Customer",
  },
  {
    id: 3,
    quote: "Professional team, great results. I will definitely come back.",
    customer: "Local Customer",
  },
]

export const HOME_QUALITY_FEATURES: HomeQualityFeature[] = [
  {
    icon: Hand,
    title: "100% Hand Washed",
    description: "Every car receives meticulous hand washing from trained specialists.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "We stand behind our work with a satisfaction guarantee on every service.",
  },
  {
    icon: CheckCircle,
    title: "SMS When Ready",
    description: "Receive a text notification the moment your vehicle is ready for pickup.",
  },
  {
    icon: Star,
    title: "1M+ Cars Cleaned",
    description: "Trusted by thousands of satisfied customers across the country.",
  },
]

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "Do you charge extra for SUVs?",
    answer: "No extra charge for SUVs. We have equipment sized for every vehicle type.",
  },
  {
    question: "What's included in a full service wash?",
    answer: "Exterior wash, wheel clean, interior vacuum, dashboard clean, tire shine, and wax application.",
  },
  {
    question: "Do I need an appointment?",
    answer: "Walk-ins are welcome, but booking online lets you reserve a guaranteed slot.",
  },
  {
    question: "What payment options do you accept?",
    answer: "We accept credit card, debit card, GCash, Maya, and cash on-site.",
  },
  {
    question: "Do you provide fleet services?",
    answer: "Yes, fleet packages are available for businesses. Contact us to tailor a plan.",
  },
  {
    question: "How long does a wash take?",
    answer: "Basic wash: 30 minutes. Premium wash: 45 minutes. Full detailing: 90 minutes.",
  },
]

export const HOME_LOCATIONS: Location[] = [
  {
    name: "Espinosa's Main Branch",
    address: "123 Main Street, Makati City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 1234 5678",
    lat: 14.5995,
    lng: 120.9842,
    coordinates: "14.5995 N, 120.9842 E",
  },
  {
    name: "Espinosa's Quezon City",
    address: "456 Quezon Avenue, Quezon City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 2345 6789",
    lat: 14.676,
    lng: 121.0437,
    coordinates: "14.6760 N, 121.0437 E",
  },
  {
    name: "Espinosa's Taguig",
    address: "789 BGC High Street, Taguig City, Metro Manila",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 2 3456 7890",
    lat: 14.5547,
    lng: 121.0244,
    coordinates: "14.5547 N, 121.0244 E",
  },
  {
    name: "Espinosa's Cebu City",
    address: "321 Ayala Center Cebu, Cebu City, Cebu",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 32 4567 8901",
    lat: 10.3157,
    lng: 123.8854,
    coordinates: "10.3157 N, 123.8854 E",
  },
  {
    name: "Espinosa's Davao City",
    address: "654 SM Lanang Premier, Davao City, Davao del Sur",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 82 5678 9012",
    lat: 7.0735,
    lng: 125.6128,
    coordinates: "7.0735 N, 125.6128 E",
  },
  {
    name: "Espinosa's Iloilo City",
    address: "987 SM City Iloilo, Iloilo City, Iloilo",
    hours: "Mon-Sun: 7:00 AM - 8:00 PM",
    phone: "+63 33 6789 0123",
    lat: 10.7202,
    lng: 122.5621,
    coordinates: "10.7202 N, 122.5621 E",
  },
]
