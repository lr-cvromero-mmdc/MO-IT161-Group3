import { cn } from "@/lib/utils"
import { CreditCard } from "lucide-react"

// Import payment method logos
import VisaLogo from "@/assets/images/logos/payments/Visa.svg"
import MastercardLogo from "@/assets/images/logos/payments/Mastercard.svg"
import GcashLogo from "@/assets/images/logos/payments/Gcash.svg"
import QRPhLogo from "@/assets/images/logos/payments/QR_Ph_Logo.svg"
import MayaLogo from "@/assets/images/logos/payments/Maya.svg"

// Props for PaymentLogo component
interface PaymentLogoProps {
  name: string
  className?: string
}

// Payment method logo mapping
const paymentLogos = {
  visa: VisaLogo,
  mastercard: MastercardLogo,
  gcash: GcashLogo,
  "qr-ph": QRPhLogo,
  maya: MayaLogo,
}

// Payment method labels
const paymentLabels = {
  visa: "Visa",
  mastercard: "Mastercard",
  gcash: "GCash",
  "qr-ph": "QR Ph",
  maya: "Maya",
}

// Component to display payment method logos
export function PaymentLogo({ name, className }: PaymentLogoProps) {
  const logoKey = name.toLowerCase() as keyof typeof paymentLogos
  const logo = paymentLogos[logoKey]
  const label = paymentLabels[logoKey] || name
  
  if (!logo) {
    // Fallback for unknown payment methods
    return (
      <CreditCard className="h-16 w-16 text-neutral-400" />
    )
  }

  return (
    <img 
      src={logo} 
      alt={`${label} logo`}
      className={cn("h-12 md:h-14 w-auto object-contain transition-all hover:scale-110", className)}
      loading="lazy"
      title={label}
    />
  )
}
