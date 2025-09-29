import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"
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
  { name: "How It Works", href: "/#how-it-works" },
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

  // Scroll detection for transparent header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
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

  // Determine header classes based on scroll and route
  const isHomePage = location.pathname === '/'
  
  // Dynamic header classes
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

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-brand-cream text-brand-dark hover:bg-brand-cream/90 font-semibold focus-ring"
            >
              <Link to="/#book-now" className="flex items-center space-x-2">
                <span>Book Now</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`md:hidden focus-ring transition-colors ${
                  isHomePage && !isScrolled 
                    ? 'text-brand-dark hover:bg-brand-dark/10' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Open mobile menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-brand-cream">
              <SheetHeader>
                <SheetTitle className="text-brand-dark">Menu</SheetTitle>
                <SheetDescription className="text-neutral-600">
                  Navigate to different sections of our website
                </SheetDescription>
              </SheetHeader>
              
              <nav className="mt-8 space-y-4" role="navigation" aria-label="Mobile navigation" ref={menuRef}>
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    ref={index === 0 ? firstMenuItemRef : undefined}
                    to={item.href}
                    className={`block transition-colors focus-ring rounded-sm px-3 py-2 text-lg ${
                      location.pathname === item.href
                        ? "text-brand-primary font-semibold"
                        : "text-brand-dark hover:text-brand-primary"
                    }`}
                    onClick={() => {
                      setIsOpen(false)
                      window.scrollTo(0, 0)
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-neutral-200">
                  <Button
                    asChild
                    ref={lastMenuItemRef}
                    className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold focus-ring"
                  >
                    <Link to="/#book-now" onClick={() => setIsOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
