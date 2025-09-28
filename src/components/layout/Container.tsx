import { cn } from "@/lib/utils"

<<<<<<< Updated upstream
<<<<<<< HEAD
// Container component that centers its content and applies horizontal padding.
=======
>>>>>>> origin/staging
=======
// Container component that centers its content and applies horizontal padding.
>>>>>>> Stashed changes
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-container px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
