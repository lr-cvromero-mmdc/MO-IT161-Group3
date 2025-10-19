import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { FloatingCartButton } from "@/components/cart/FloatingCartButton"
import { ChevronRight, Menu } from "lucide-react"

// Mobile menu (Sheet) components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// React hooks
import { useState, useEffect, useRef } from "react"

// Navigation links data
const navigation = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Locations", href: "/locations" },
  { name: "Contact", href: "/contact" },
]

// Header component
export function Header() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const lastMenuItemRef = useRef<HTMLButtonElement>(null)

  // Scroll detection for navbar background with improved threshold
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 80) // Increased threshold for better UX
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab (backwards)
          if (document.activeElement === firstMenuItemRef.current) {
            e.preventDefault()
            lastMenuItemRef.current?.focus()
          }
        } else {
          // Tab (forwards)
          if (document.activeElement === lastMenuItemRef.current) {
            e.preventDefault()
            firstMenuItemRef.current?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    firstMenuItemRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Professional navbar classes with enhanced styling
  const headerClasses = `navbar-professional ${
    !isScrolled 
      ? 'navbar-transparent' 
      : 'navbar-solid'
  }`

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000]">
        <div className={headerClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Zone */}
          <div className="flex-shrink-0 flex items-center h-full">
            <Link 
              to="/" 
              className="transition-transform hover:scale-105 flex items-center h-full focus:outline-none"
              aria-label="Espinosa's Hand Carwash - Home"
            >
              <Logo 
                context="header"
                background="light"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center Zone */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 h-16" role="navigation" aria-label="Main navigation">
            <div className="flex items-center gap-6 h-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link-professional flex items-center h-full transition-all duration-200 ${
                    location.pathname === item.href ? 'active' : ''
                  } text-white hover:text-brand-cream hover:scale-105`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop CTA Button - Right Zone */}
          <div className="hidden lg:flex items-center flex-shrink-0 h-full gap-4">
            <Link 
              to="/services" 
              className="cta-button-professional flex items-center gap-2 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary"
              aria-label="Book your car wash service now"
            >
              <span>Book Now</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu - Right Zone */}
          <div className="lg:hidden flex items-center flex-shrink-0 gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`focus-ring transition-all duration-200 p-2 rounded-lg ${
                    !isScrolled 
                      ? 'text-brand-dark hover:bg-brand-dark/10' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-80 mobile-menu-professional">
              <SheetHeader>
                <SheetTitle className="text-white font-bold text-xl">Menu</SheetTitle>
              </SheetHeader>
              
              <nav className="mt-8 space-y-2" role="navigation" aria-label="Mobile navigation" ref={menuRef}>
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    ref={index === 0 ? firstMenuItemRef : undefined}
                    to={item.href}
                    className={`block nav-link-professional text-white hover:text-brand-cream ${
                      location.pathname === item.href
                        ? "active font-semibold"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-6 mt-6 border-t border-white/20">
                  <Link
                    to="/services" 
                    className="cta-button-professional w-full flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary"
                    onClick={() => setIsOpen(false)}
                    aria-label="Book your car wash service now"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </nav>
            </SheetContent>
            </Sheet>
          </div>
        </div>
        </div>
        </div>
    </header>
    
    {/* Floating Cart Button */}
    <FloatingCartButton />
  </>
  )
}