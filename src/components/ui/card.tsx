import * as React from "react"

import { cn } from "@/lib/utils"

<<<<<<< HEAD
<<<<<<< HEAD
// Card container with border, background, and shadow
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Card container with border, background, and shadow
=======
>>>>>>> origin/staging
=======
// Card container with border, background, and shadow
>>>>>>> Stashed changes
=======
// Card container with border, background, and shadow
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Card container with border, background, and shadow
>>>>>>> origin/main
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

<<<<<<< HEAD
<<<<<<< HEAD
// Header section with vertical spacing
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Header section with vertical spacing
=======
>>>>>>> origin/staging
=======
// Header section with vertical spacing
>>>>>>> Stashed changes
=======
// Header section with vertical spacing
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Header section with vertical spacing
>>>>>>> origin/main
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

<<<<<<< HEAD
<<<<<<< HEAD
//Title text, styled as a heading
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
//Title text, styled as a heading
=======
>>>>>>> origin/staging
=======
//Title text, styled as a heading
>>>>>>> Stashed changes
=======
//Title text, styled as a heading
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
//Title text, styled as a heading
>>>>>>> origin/main
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

<<<<<<< HEAD
<<<<<<< HEAD
// Description text below the title
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Description text below the title
=======
>>>>>>> origin/staging
=======
// Description text below the title
>>>>>>> Stashed changes
=======
// Description text below the title
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Description text below the title
>>>>>>> origin/main
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

<<<<<<< HEAD
<<<<<<< HEAD
// Main content area
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Main content area
=======
>>>>>>> origin/staging
=======
// Main content area
>>>>>>> Stashed changes
=======
// Main content area
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Main content area
>>>>>>> origin/main
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

<<<<<<< HEAD
<<<<<<< HEAD
// Footer section with padding
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Footer section with padding
=======
>>>>>>> origin/staging
=======
// Footer section with padding
>>>>>>> Stashed changes
=======
// Footer section with padding
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Footer section with padding
>>>>>>> origin/main
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

<<<<<<< HEAD
<<<<<<< HEAD
// Export all card components
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Export all card components
=======
>>>>>>> origin/staging
=======
// Export all card components
>>>>>>> Stashed changes
=======
// Export all card components
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Export all card components
>>>>>>> origin/main
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
