import { cn } from "@/lib/utils"

// Props for PaymentLogo component
interface PaymentLogoProps {
  name: string
  className?: string
}

// Component to display payment method logos with SVG files and emoji fallback
export function PaymentLogo({ name, className }: PaymentLogoProps) {
  // SVG logo mapping for payment methods
  const logoSrc = {
    visa: "/src/assets/images/logos/payments/Visa.svg",
    mastercard: "/src/assets/images/logos/payments/Mastercard.svg",
    gcash: "/src/assets/images/logos/payments/Gcash.svg",
    "qr-ph": "/src/assets/images/logos/payments/QR_Ph_Logo.svg",
    maya: "/src/assets/images/logos/payments/Maya.svg",
  }

  // Emoji fallback mapping
  const emojiMap = {
    visa: "💳",
    mastercard: "💳", 
    gcash: "📱",
    "qr-ph": "📱",
    maya: "📱",
  }

  // Get the logo source based on the name prop
  const svgSrc = logoSrc[name.toLowerCase() as keyof typeof logoSrc]
  const emoji = emojiMap[name.toLowerCase() as keyof typeof emojiMap] || "💳"
  
  if (!svgSrc) {
    // Fallback to emoji if SVG not found
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <span className="text-3xl">{emoji}</span>
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
          // Fallback to emoji if SVG fails to load
          const target = e.target as HTMLImageElement
          const parent = target.parentElement
          if (parent) {
            parent.innerHTML = `<span class="text-3xl">${emoji}</span>`
          }
        }}
      />
    </div>
  )
}
