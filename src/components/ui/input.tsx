import * as React from "react"

import { cn } from "@/lib/utils"

<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
// Input component props
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Input component with ref forwarding
<<<<<<< Updated upstream
=======
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

>>>>>>> origin/staging
=======
>>>>>>> Stashed changes
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

<<<<<<< Updated upstream
<<<<<<< HEAD
// Exporting the Input component
=======
>>>>>>> origin/staging
=======
// Exporting the Input component
>>>>>>> Stashed changes
export { Input }