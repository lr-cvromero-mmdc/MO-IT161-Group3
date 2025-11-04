import { LucideIcon } from "lucide-react"
import { Button } from "./button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

/**
 * Empty state component for better UX when no content is available
 * Used for empty carts, no search results, etc.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent/20 mb-4">
        <Icon className="h-8 w-8 text-brand-primary" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-brand-dark mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 mb-6 max-w-sm mx-auto">
        {description}
      </p>

      {/* Optional action button */}
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-brand-primary text-white hover:bg-brand-primary/90"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
