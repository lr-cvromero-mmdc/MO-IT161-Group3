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
  { name: "Contact", href: "/#contact" },
]

// Header component
export function Header() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null)

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

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
>>>>>>> origin/main
  // Determine header classes based on scroll and route
  const isHomePage = location.pathname === '/'
  
  // Dynamic header classes
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  const isHomePage = location.pathname === '/'
>>>>>>> origin/staging
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
>>>>>>> origin/main
  const headerClasses = `sticky top-0 z-50 transition-all duration-300 ${
    isHomePage && !isScrolled 
      ? 'bg-transparent shadow-none' 
      : 'bg-brand-primary shadow-sm'
  }`

  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center space-x-3 focus-ring rounded-lg"
            aria-label="Espinosa's Hand Carwash - Home"
          >
            <div className="h-10 w-10 rounded-lg bg-brand-cream flex items-center justify-center">
              <span className="text-brand-primary font-bold text-lg">E</span>
            </div>
            <span className={`text-lg font-bold transition-colors ${
              isHomePage && !isScrolled ? 'text-brand-dark' : 'text-white'
            }`}>Espinosa's</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => window.scrollTo(0, 0)}
                className={`text-sm font-medium transition-colors focus-ring rounded-sm px-2 py-1 ${
                  location.pathname === item.href
                    ? isHomePage && !isScrolled ? "text-brand-primary" : "text-brand-cream"
                    : isHomePage && !isScrolled ? "text-brand-dark/80 hover:text-brand-primary" : "text-white/90 hover:text-brand-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
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