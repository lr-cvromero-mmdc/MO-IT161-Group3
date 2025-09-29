import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
>>>>>>> origin/main
// Sheet (similar to Dialog) component using Radix UI
const Sheet = SheetPrimitive.Root

// Trigger to open the sheet
const SheetTrigger = SheetPrimitive.Trigger

// Close button for the sheet
const SheetClose = SheetPrimitive.Close

// Portal for rendering the sheet in a different part of the DOM
const SheetPortal = SheetPrimitive.Portal

// Overlay for the sheet
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
=======
// Sheet (similar to Dialog) component using Radix UI
>>>>>>> Stashed changes
const Sheet = SheetPrimitive.Root

// Trigger to open the sheet
const SheetTrigger = SheetPrimitive.Trigger

// Close button for the sheet
const SheetClose = SheetPrimitive.Close

// Portal for rendering the sheet in a different part of the DOM
const SheetPortal = SheetPrimitive.Portal

<<<<<<< Updated upstream
>>>>>>> origin/staging
=======
// Overlay for the sheet
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
>>>>>>> origin/main
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Variants for the sheet content based on the side it appears from
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Variants for the sheet content based on the side it appears from
=======
>>>>>>> origin/staging
=======
// Variants for the sheet content based on the side it appears from
>>>>>>> Stashed changes
=======
// Variants for the sheet content based on the side it appears from
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Variants for the sheet content based on the side it appears from
>>>>>>> origin/main
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

<<<<<<< HEAD
<<<<<<< HEAD
// Content of the sheet
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Content of the sheet
=======
>>>>>>> origin/staging
=======
// Content of the sheet
>>>>>>> Stashed changes
=======
// Content of the sheet
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Content of the sheet
>>>>>>> origin/main
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

<<<<<<< HEAD
<<<<<<< HEAD
// Content component for the sheet
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Content component for the sheet
=======
>>>>>>> origin/staging
=======
// Content component for the sheet
>>>>>>> Stashed changes
=======
// Content component for the sheet
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Content component for the sheet
>>>>>>> origin/main
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Header for the sheet
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Header for the sheet
=======
>>>>>>> origin/staging
=======
// Header for the sheet
>>>>>>> Stashed changes
=======
// Header for the sheet
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Header for the sheet
>>>>>>> origin/main
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

<<<<<<< HEAD
<<<<<<< HEAD
// Footer for the sheet
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Footer for the sheet
=======
>>>>>>> origin/staging
=======
// Footer for the sheet
>>>>>>> Stashed changes
=======
// Footer for the sheet
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Footer for the sheet
>>>>>>> origin/main
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

<<<<<<< HEAD
<<<<<<< HEAD
// Title for the sheet
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Title for the sheet
=======
>>>>>>> origin/staging
=======
// Title for the sheet
>>>>>>> Stashed changes
=======
// Title for the sheet
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Title for the sheet
>>>>>>> origin/main
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Description for the sheet
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Description for the sheet
=======
>>>>>>> origin/staging
=======
// Description for the sheet
>>>>>>> Stashed changes
=======
// Description for the sheet
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Description for the sheet
>>>>>>> origin/main
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Exporting all the components for use in other parts of the application
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Exporting all the components for use in other parts of the application
=======
>>>>>>> origin/staging
=======
// Exporting all the components for use in other parts of the application
>>>>>>> Stashed changes
=======
// Exporting all the components for use in other parts of the application
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Exporting all the components for use in other parts of the application
>>>>>>> origin/main
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
