import * as React from "react"

import { cn } from "@/lib/utils"

<<<<<<< Updated upstream
<<<<<<< HEAD
// Card container with border, background, and shadow
=======
>>>>>>> origin/staging
=======
// Card container with border, background, and shadow
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< HEAD
// Header section with vertical spacing
=======
>>>>>>> origin/staging
=======
// Header section with vertical spacing
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< HEAD
//Title text, styled as a heading
=======
>>>>>>> origin/staging
=======
//Title text, styled as a heading
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< HEAD
// Description text below the title
=======
>>>>>>> origin/staging
=======
// Description text below the title
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< HEAD
// Main content area
=======
>>>>>>> origin/staging
=======
// Main content area
>>>>>>> Stashed changes
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

<<<<<<< Updated upstream
<<<<<<< HEAD
// Footer section with padding
=======
>>>>>>> origin/staging
=======
// Footer section with padding
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< HEAD
// Export all card components
=======
>>>>>>> origin/staging
=======
// Export all card components
>>>>>>> Stashed changes
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
