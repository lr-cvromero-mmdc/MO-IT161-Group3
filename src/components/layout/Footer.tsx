// Footer component - Redesigned with trust signals, conversion-focused CTAs, and improved navigation
import { Link } from "react-router-dom"
import { Container } from "./Container"
import { ChevronRight, Star, Shield, Facebook, Instagram, MessageCircle, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaymentLogo } from "@/components/ui/PaymentLogo"

const footerLinks = {
  company: [
    { name: "About", href: "/about", scrollToTop: true },
    { name: "Locations", href: "/locations", scrollToTop: true },
    { name: "Contact", href: "/contact", scrollToTop: true },
  ],
  services: [
    { name: "Book Now", href: "/services", scrollToTop: true },
    { name: "See All Packages", href: "/services", scrollToTop: true },
    { name: "Premium Wash", href: "/services#premium", scrollToTop: true },
    { name: "Full Detailing", href: "/services#detailing", scrollToTop: true },
  ],
  support: [
    { name: "Customer Feedback", href: "/#feedback" },
    { name: "Franchising", href: "/#franchising" },
    { name: "Join Our Team", href: "/#careers" },
  ],
}

const paymentMethods = [
  { name: "Visa", key: "visa" },
  { name: "MasterCard", key: "mastercard" },
  { name: "GCash", key: "gcash" },
  { name: "QR Ph", key: "qr-ph" },
  { name: "Maya", key: "maya" },
]

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Trust & Action Band */}
      <div className="bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 border-b border-neutral-700">
        <Container>
          <div className="py-16">
            <div className="text-center space-y-8">
              {/* Main CTA Section */}
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Ready to Book Your Service?
                </h3>
                <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
                  Fast, easy booking in just 2 minutes. Professional car care made simple.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-accent text-brand-dark hover:bg-brand-accent/90 font-bold text-xl px-12 py-6 h-auto focus-ring shadow-lg"
                >
                  <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="flex items-center space-x-3">
                    <span>Book a Service</span>
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-dark font-semibold text-lg px-8 py-6 h-auto focus-ring bg-transparent"
                >
                  <Link to="/locations" onClick={() => window.scrollTo(0, 0)} className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>See Locations</span>
                  </Link>
                </Button>
              </div>

              {/* Trust Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-white">4.9/5</span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-300 font-medium">5,000+ happy drivers</span>
                </div>
                
                <div className="flex items-center gap-2 text-neutral-300">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="font-medium">100% Satisfaction Guarantee</span>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-ring"
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Payment Methods */}
      <div>
        <Container>
          <div className="py-8">
            <div className="text-center">
              <p className="text-neutral-400 text-sm mb-6">
                We accept all major payment methods
              </p>
              <div className="flex items-center justify-center gap-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <PaymentLogo name={method.key} className="h-8 w-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Utility Navigation Band */}
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
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

            {/* Company Links */}
            <div>
              <h4 className="font-bold mb-6 text-brand-cream text-lg">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={() => link.scrollToTop && window.scrollTo(0, 0)}
                      className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-bold mb-6 text-brand-cream text-lg">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={() => link.scrollToTop && window.scrollTo(0, 0)}
                      className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-bold mb-6 text-brand-cream text-lg">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('tel:') ? (
                      <a
                        href={link.href}
                        className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5 flex items-center gap-2"
                      >
                        <Phone className="h-3 w-3" />
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => link.scrollToTop && window.scrollTo(0, 0)}
                        className="text-neutral-300 hover:text-brand-accent transition-colors text-sm focus-ring rounded-sm px-1 py-0.5"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

