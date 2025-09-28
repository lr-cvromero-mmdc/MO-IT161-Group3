import { cn } from "@/lib/utils"

// Container component that centers its content and applies horizontal padding.
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
