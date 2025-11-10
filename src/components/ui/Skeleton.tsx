import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

/**
 * Skeleton loading component for better perceived performance
 * Shows animated placeholders while content is loading
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200",
        className
      )}
    />
  )
}

/**
 * Skeleton for service/product cards
 */
export function ServiceCardSkeleton() {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-6">
        {/* Badge skeleton */}
        <Skeleton className="h-6 w-24 mb-3" />

        {/* Title skeleton */}
        <Skeleton className="h-7 w-3/4 mb-3" />

        {/* Price and duration */}
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />

        {/* Features skeleton */}
        <div className="space-y-2 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}

/**
 * Skeleton for product cards
 */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-6">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-3" />

        {/* Price skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-4" />

        {/* Stock status skeleton */}
        <Skeleton className="h-5 w-24 mb-4" />

        {/* Button skeleton */}
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  )
}

/**
 * Skeleton for location cards
 */
export function LocationCardSkeleton() {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="p-6">
        {/* Header skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />

        {/* Details skeleton */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-3">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* Map skeleton */}
        <Skeleton className="h-48 w-full mb-4" />

        {/* Buttons skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton for testimonial cards
 */
export function TestimonialSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-6">
      {/* Stars skeleton */}
      <div className="flex gap-1 mb-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>

      {/* Text skeleton */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />

      {/* Author skeleton */}
      <Skeleton className="h-5 w-32 mb-1" />
      <Skeleton className="h-3 w-24" />
    </div>
  )
}
