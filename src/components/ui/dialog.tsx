import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
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
// Dialog component using Radix UI
const Dialog = DialogPrimitive.Root

// Trigger component for opening the dialog
const DialogTrigger = DialogPrimitive.Trigger

// Portal component for rendering dialog content outside the DOM hierarchy
const DialogPortal = DialogPrimitive.Portal

// Component for closing the dialog
const DialogClose = DialogPrimitive.Close

// Overlay component for the dialog background
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
=======
// Dialog component using Radix UI
>>>>>>> Stashed changes
const Dialog = DialogPrimitive.Root

// Trigger component for opening the dialog
const DialogTrigger = DialogPrimitive.Trigger

// Portal component for rendering dialog content outside the DOM hierarchy
const DialogPortal = DialogPrimitive.Portal

// Component for closing the dialog
const DialogClose = DialogPrimitive.Close

<<<<<<< Updated upstream
>>>>>>> origin/staging
=======
// Overlay component for the dialog background
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
>>>>>>> origin/main
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Content component for the dialog
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Content component for the dialog
=======
>>>>>>> origin/staging
=======
// Content component for the dialog
>>>>>>> Stashed changes
=======
// Content component for the dialog
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Content component for the dialog
>>>>>>> origin/main
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Header component for the dialog
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Header component for the dialog
=======
>>>>>>> origin/staging
=======
// Header component for the dialog
>>>>>>> Stashed changes
=======
// Header component for the dialog
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Header component for the dialog
>>>>>>> origin/main
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

<<<<<<< HEAD
<<<<<<< HEAD
// Footer component for the dialog
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Footer component for the dialog
=======
>>>>>>> origin/staging
=======
// Footer component for the dialog
>>>>>>> Stashed changes
=======
// Footer component for the dialog
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Footer component for the dialog
>>>>>>> origin/main
const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter"

<<<<<<< HEAD
<<<<<<< HEAD
// Title component for the dialog
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Title component for the dialog
=======
>>>>>>> origin/staging
=======
// Title component for the dialog
>>>>>>> Stashed changes
=======
// Title component for the dialog
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Title component for the dialog
>>>>>>> origin/main
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Description component for the dialog
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Description component for the dialog
=======
>>>>>>> origin/staging
=======
// Description component for the dialog
>>>>>>> Stashed changes
=======
// Description component for the dialog
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Description component for the dialog
>>>>>>> origin/main
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

<<<<<<< HEAD
<<<<<<< HEAD
// Exporting all dialog components
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Exporting all dialog components
=======
>>>>>>> origin/staging
=======
// Exporting all dialog components
>>>>>>> Stashed changes
=======
// Exporting all dialog components
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Exporting all dialog components
>>>>>>> origin/main
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
