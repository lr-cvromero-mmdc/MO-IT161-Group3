import { cn } from "@/lib/utils"
import logoSvg from "@/assets/images/logos/brand/SVG/espinosa-logo.svg"

// Logo component with proper sizing and positioning for different contexts
interface LogoProps {
  context?: 'header' | 'footer' | 'standalone'
  background?: 'light' | 'dark' | 'transparent'
  className?: string
}

export function Logo({ 
  context = 'standalone',
  background = 'light',
  className
}: LogoProps) {
  const logoSrc = logoSvg

  // Context-specific sizing that considers the container and usage
  const getContextClasses = () => {
    switch (context) {
      case 'header':
        // Header: Fixed width for consistent navbar presence
        return "w-[150px] md:w-[160px] h-auto max-w-none"
      case 'footer':
        // Footer: Small size for subtle brand presence
        return "h-6 sm:h-7 md:h-8 w-auto max-w-none"
      case 'standalone':
        // Standalone: Large and prominent
        return "h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-none"
      default:
        return "h-12 w-auto max-w-none"
    }
  }

  // Color filter based on background
  const getColorFilter = () => {
    if (background === 'dark') {
      return "brightness-0 invert" // Make it white
    }
    if (background === 'light') {
      return "brightness-0 invert" // Make it white for navbar
    }
    return "" // Keep original colors
  }

  // Alignment based on context
  const getAlignment = () => {
    switch (context) {
      case 'header':
        return "flex items-center justify-center"
      case 'footer':
        return "flex items-center justify-start" // Left-align in footer
      case 'standalone':
        return "flex items-center justify-center"
      default:
        return "flex items-center justify-center"
    }
  }

  return (
    <div className={cn(getAlignment(), className)}>
      <img
        src={logoSrc}
        alt="Espinosa's Hand Carwash Logo"
        className={cn(
          "object-contain transition-all duration-200",
          getContextClasses(),
          getColorFilter()
        )}
        onError={(e) => {
          // Fallback to text-based logo if image fails to load
          const target = e.target as HTMLImageElement
          target.style.display = "none"
          const parent = target.parentElement
          if (parent) {
            const fallbackSize = context === 'header' ? 'h-10 w-10' : context === 'footer' ? 'h-8 w-8' : 'h-16 w-16'
            const textSize = context === 'header' ? 'text-lg' : context === 'footer' ? 'text-lg' : 'text-2xl'
            parent.innerHTML = `
              <div class="${fallbackSize} rounded-lg bg-brand-cream flex items-center justify-center">
                <span class="text-brand-primary font-bold ${textSize}">E</span>
              </div>
            `
          }
        }}
      />
    </div>
  )
}
