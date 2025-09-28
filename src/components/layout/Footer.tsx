import { Link } from "react-router-dom"
import { Container } from "./Container"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaymentLogo } from "@/components/ui/PaymentLogo"

<<<<<<< HEAD
// Define footer links
=======
>>>>>>> origin/staging
const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Locations", href: "/locations" },
    { name: "FAQs", href: "/#faq" },
  ],
  services: [
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/#contact" },
  ],
  support: [
    { name: "Customer Feedback", href: "/#feedback" },
    { name: "Franchising", href: "/#franchising" },
    { name: "Join Our Team", href: "/#careers" },
  ],
}

<<<<<<< HEAD
// Define payment methods
=======
>>>>>>> origin/staging
const paymentMethods = [
  { name: "Visa", key: "visa" },
  { name: "MasterCard", key: "mastercard" },
  { name: "GCash", key: "gcash" },
  { name: "QR Ph", key: "qr-ph" },
  { name: "Maya", key: "maya" },
]

<<<<<<< HEAD
// Footer Component
=======
>>>>>>> origin/staging
export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Payment Methods */}
      <div className="border-b border-neutral-700">
        <Container>
          <div className="py-16">
            <h3 className="text-center text-2xl font-bold mb-12 text-white">
              Payment Options
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 place-items-center">
              {paymentMethods.map((method, index) => (
                <div
                  key={method.name}
                  className="flex items-center justify-center group hover:scale-105 transition-transform duration-200 p-4"
                >
                  <PaymentLogo name={method.key} className="h-12 md:h-14 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-neutral-400 text-sm">
                We accept all major payment methods for your convenience
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-brand-cream flex items-center justify-center">
                  <span className="text-brand-primary font-bold text-lg">E</span>
                </div>
                <span className="text-lg font-bold">Espinosa's</span>
              </div>
              <p className="text-neutral-300 text-sm">
                Where Cars Come to Shine
              </p>
              <p className="text-neutral-400 text-xs">
                © 2025 Espinosa's Hand Carwash
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-4 text-brand-cream">Company</h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-brand-cream">Services</h4>
                <ul className="space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-brand-cream">Support</h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center md:text-right">
              <h4 className="font-bold text-lg mb-4 text-brand-cream">Book a Service</h4>
              <Button
                asChild
                className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 font-semibold focus-ring"
              >
                <Link to="/#book-now" className="flex items-center space-x-2">
                  <span>Book Now</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
