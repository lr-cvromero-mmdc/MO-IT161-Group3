/**
 * Type definitions for services and products
 * Used throughout the application for type safety
 */

import { LucideIcon } from 'lucide-react'

/**
 * Service category types
 */
export type ServiceCategory = 'basic' | 'premium' | 'detailing' | 'addons'

/**
 * Product category types
 */
export type ProductCategory = 'cleaning' | 'protection' | 'tools' | 'bundles'

/**
 * Value point with icon and descriptive text
 */
export interface ValuePoint {
  /** Text description of the value point */
  text: string
  /** Lucide icon component */
  icon: LucideIcon
}

/**
 * Service definition
 */
export interface Service {
  /** Unique service identifier */
  id: string
  /** Service display title */
  title: string
  /** Service category for filtering */
  category: ServiceCategory
  /** Price in Philippine Pesos (including 12% VAT) */
  price: number
  /** Formatted price display string */
  priceDisplay: string
  /** Service duration in minutes */
  duration: number
  /** Formatted duration display string */
  durationDisplay: string
  /** Detailed service description */
  description: string
  /** List of features included in the service */
  features: string[]
  /** Whether this is a popular/trending service */
  popular: boolean
  /** Value proposition points with icons */
  valuePoints: ValuePoint[]
  /** Service image URL */
  image: string
  /** Service category framing text */
  framing: string
  /** Whether this service is recommended (badge) */
  isRecommended?: boolean
}

/**
 * Product definition
 */
export interface Product {
  /** Unique product identifier */
  id: string
  /** Product display name */
  name: string
  /** Price in Philippine Pesos (including 12% VAT) */
  price: number
  /** Formatted price display string */
  priceDisplay: string
  /** Original price before discount (if applicable) */
  originalPrice?: number
  /** Formatted original price display string */
  originalPriceDisplay?: string
  /** Detailed product description */
  description: string
  /** Product category for filtering */
  category: ProductCategory
  /** Product image URL */
  image: string
  /** Badge label (e.g., "Best Seller", "New") */
  badge: string | null
  /** Stock availability status text */
  stockStatus: string
  /** Whether this product is recommended with services */
  isRecommended?: boolean
  /** Whether this is a bundle/kit product */
  isBundle?: boolean
}

/**
 * Testimonial data structure
 */
export interface Testimonial {
  /** Unique testimonial identifier */
  id: number
  /** Customer name */
  name: string
  /** Star rating (1-5) */
  rating: number
  /** Testimonial text/review */
  text: string
  /** Service that was reviewed */
  service: string
}

/**
 * FAQ item structure
 */
export interface FaqItem {
  /** Unique FAQ identifier */
  id: number
  /** Question text */
  question: string
  /** Answer text */
  answer: string
}

/**
 * Category filter option
 */
export interface CategoryOption {
  /** Category value for filtering */
  value: string
  /** Display label for category */
  label: string
}

