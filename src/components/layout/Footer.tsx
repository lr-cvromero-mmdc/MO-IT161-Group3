// Footer component - Redesigned with improved navigation
import { Link } from "react-router-dom"
import { Section } from "./Section"
import { Logo } from "@/components/ui/Logo"
import { Phone } from "lucide-react"
import { PaymentLogo } from "@/components/ui/PaymentLogo"

// Define footer links
const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Locations", href: "/locations" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Book Now", href: "/services" },
    { name: "All Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Service Packages", href: "/services" },
  ],
  support: [
    { name: "Help & Support", href: "/contact" },
    { name: "Contact Us", href: "/contact" },
    { name: "Call Us", href: "tel:+639171234567", isExternal: true },
  ],
}

// Define payment methods
const paymentMethods = [
  { name: "Visa", key: "visa" },
  { name: "MasterCard", key: "mastercard" },
  { name: "GCash", key: "gcash" },
  { name: "QR Ph", key: "qr-ph" },
  { name: "Maya", key: "maya" },
]

// Helper function to handle link clicks
const handleLinkClick = (href: string, isExternal: boolean = false) => {
  if (isExternal) {
    return // Let browser handle external links
  }
  
  if (href.startsWith('/#')) {
    // Handle anchor links to home page sections
    window.location.href = href
  } else {
    // Regular navigation - scroll to top after navigation
    window.scrollTo(0, 0)
  }
}

// Footer Component
export function Footer() {
  return (
    <footer className="bg-brand-dark text-white" role="contentinfo" aria-label="Site footer">
      {/* Payment Methods */}
      <Section background="none" fullWidthBackground>
        <div className="py-8">
          <div className="text-center">
            <p className="text-neutral-400 text-sm mb-6">
              We accept all major payment methods
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap" role="list" aria-label="Accepted payment methods">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  role="listitem"
                  className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                  aria-label={`${method.name} payment accepted`}
                >
                  <PaymentLogo name={method.key} className="h-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Utility Navigation Band */}
      <Section background="none" fullWidthBackground>
        <div className="py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="lg:col-span-1 mb-8 lg:mb-0">
                <div className="space-y-4">
                  <Logo
                    context="footer"
                    background="dark"
                  />
                  <p className="text-neutral-300 text-sm">
                    Where Cars Come to Shine
                  </p>
                  <p className="text-neutral-400 text-xs">
                    © 2025 Espinosa's Hand Carwash
                  </p>
                </div>
              </div>

              {/* Company Links */}
              <nav aria-label="Company navigation">
                <h4 className="font-bold mb-6 text-brand-cream text-lg">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Services Links */}
              <nav aria-label="Services navigation">
                <h4 className="font-bold mb-6 text-brand-cream text-lg">Services</h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Support Links */}
              <nav aria-label="Support navigation">
                <h4 className="font-bold mb-6 text-brand-cream text-lg">Support</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5 flex items-center gap-2"
                          aria-label={`${link.name}: +63 917 123 4567`}
                        >
                          <Phone className="h-3 w-3" aria-hidden="true" />
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={() => handleLinkClick(link.href)}
                          className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  )
}

