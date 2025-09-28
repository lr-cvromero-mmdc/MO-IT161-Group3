import { cn } from "@/lib/utils"

<<<<<<< HEAD
// Props for PaymentLogo component
=======
>>>>>>> origin/staging
interface PaymentLogoProps {
  name: string
  className?: string
}

<<<<<<< HEAD
// Component to display payment method logos with fallback to emoji
=======
>>>>>>> origin/staging
export function PaymentLogo({ name, className }: PaymentLogoProps) {
  const logoMap = {
    visa: "/src/assets/images/logos/payments/Visa.svg",
    mastercard: "/src/assets/images/logos/payments/Mastercard.svg",
    gcash: "/src/assets/images/logos/payments/Gcash.svg",
    "qr-ph": "/src/assets/images/logos/payments/QR_Ph_Logo.svg",
    maya: "/src/assets/images/logos/payments/Maya.svg",
  }

<<<<<<< HEAD
  //  Get the logo source based on the name prop
=======
>>>>>>> origin/staging
  const logoSrc = logoMap[name.toLowerCase() as keyof typeof logoMap]

  if (!logoSrc) {
    // Fallback to emoji if SVG not found
    const emojiMap = {
      visa: "💳",
      mastercard: "💳",
      gcash: "📱",
      "qr-ph": "📱",
      maya: "📱",
    }
    return (
      <span className={cn("text-3xl", className)}>
        {emojiMap[name.toLowerCase() as keyof typeof emojiMap] || "💳"}
      </span>
    )
  }

<<<<<<< HEAD
  // Render the logo image
=======
>>>>>>> origin/staging
  return (
    <img
      src={logoSrc}
      alt={`${name} logo`}
      className={cn("h-12 w-auto object-contain", className)}
      onError={(e) => {
        // Fallback to emoji if image fails to load
        const target = e.target as HTMLImageElement
    const emojiMap = {
      visa: "💳",
      mastercard: "💳",
      gcash: "📱",
      "qr-ph": "📱",
      maya: "📱",
    }
        target.style.display = "none"
        const parent = target.parentElement
        if (parent) {
          parent.innerHTML = `<span class="text-4xl">${emojiMap[name.toLowerCase() as keyof typeof emojiMap] || "💳"}</span>`
        }
      }}
    />
  )
}
