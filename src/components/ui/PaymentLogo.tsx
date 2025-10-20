import { cn } from "@/lib/utils"
import { CreditCard, Smartphone } from "lucide-react"

// Props for PaymentLogo component
interface PaymentLogoProps {
  name: string
  className?: string
}

// Component to display payment method logos with SVG files and Lucide icon fallback
export function PaymentLogo({ name, className }: PaymentLogoProps) {
  // SVG logo mapping for payment methods
  const logoSrc = {
    visa: "/src/assets/images/logos/payments/Visa.svg",
    mastercard: "/src/assets/images/logos/payments/Mastercard.svg",
    gcash: "/src/assets/images/logos/payments/Gcash.svg",
    "qr-ph": "/src/assets/images/logos/payments/QR_Ph_Logo.svg",
    maya: "/src/assets/images/logos/payments/Maya.svg",
  }

  // Lucide icon fallback mapping
  const iconMap = {
    visa: <CreditCard className="h-8 w-8" />,
    mastercard: <CreditCard className="h-8 w-8" />, 
    gcash: <Smartphone className="h-8 w-8" />,
    "qr-ph": <Smartphone className="h-8 w-8" />,
    maya: <Smartphone className="h-8 w-8" />,
  }

  // Get the logo source based on the name prop
  const svgSrc = logoSrc[name.toLowerCase() as keyof typeof logoSrc]
  const fallbackIcon = iconMap[name.toLowerCase() as keyof typeof iconMap] || <CreditCard className="h-8 w-8" />
  
  if (!svgSrc) {
    // Fallback to Lucide icon if SVG not found
    return (
      <div className={cn("flex items-center justify-center text-neutral-600", className)}>
        {fallbackIcon}
      </div>
    )
  }

  // Render the SVG logo with fallback
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img
        src={svgSrc}
        alt={`${name} logo`}
        className="h-12 w-auto object-contain"
        onError={(e) => {
          // Fallback to Lucide icon if SVG fails to load
          const target = e.target as HTMLImageElement
          const parent = target.parentElement
          if (parent) {
            const iconElement = document.createElement('div')
            iconElement.className = 'flex items-center justify-center text-neutral-600'
            parent.innerHTML = ''
            parent.appendChild(iconElement)
            // Note: React component fallback would need to be handled differently in production
            iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>'
          }
        }}
      />
    </div>
  )
}
