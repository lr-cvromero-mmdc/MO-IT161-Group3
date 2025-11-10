/**
 * App Component - Application Root
 * 
 * Main entry point for the Espinosa's Hand Carwash application.
 * Handles routing, lazy loading, and global providers.
 */

import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SkipToContent } from "@/components/layout/SkipToContent"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { ErrorBoundary } from "@/components/layout/ErrorBoundary"
import { CartProvider } from "@/context/CartContext"
import { ToastProvider } from "@/components/ui/toast"

// Lazy load pages for code splitting and better performance
const Home = lazy(() => import("@/pages/Home").then(module => ({ default: module.Home })))
const About = lazy(() => import("@/pages/About").then(module => ({ default: module.About })))
const HowItWorks = lazy(() => import("@/pages/HowItWorks").then(module => ({ default: module.HowItWorks })))
const Services = lazy(() => import("@/pages/Services").then(module => ({ default: module.Services })))
const Locations = lazy(() => import("@/pages/Locations").then(module => ({ default: module.Locations })))
const Contact = lazy(() => import("@/pages/Contact").then(module => ({ default: module.Contact })))
const Booking = lazy(() => import("@/pages/Booking").then(module => ({ default: module.Booking })))
const BookingConfirmation = lazy(() => import("@/pages/BookingConfirmation").then(module => ({ default: module.BookingConfirmation })))
const ProductCheckout = lazy(() => import("@/pages/ProductCheckout").then(module => ({ default: module.ProductCheckout })))
const NotFound = lazy(() => import("@/pages/NotFound").then(module => ({ default: module.NotFound })))

/**
 * Main Application Component
 * 
 * Features:
 * - Lazy-loaded routes for optimal performance
 * - Error boundaries for graceful error handling
 * - Global state management (Cart, Toast)
 * - Accessibility features (skip links, keyboard navigation)
 */
function App() {
  // Removed splash screen - always show content immediately
  return (
    <ErrorBoundary>
      <ToastProvider>
        <CartProvider>
          {/* Main content - always visible */}
          <div className="min-h-screen bg-white">
            <ScrollToTop />
            <SkipToContent />
            <Header />
                  <main id="main-content">
                    <Suspense fallback={null}>
                      <ErrorBoundary>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/how-it-works" element={<HowItWorks />} />
                          <Route path="/services" element={<Services />} />
                          <Route path="/locations" element={<Locations />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/booking" element={<Booking />} />
                          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                          <Route path="/checkout" element={<ProductCheckout />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </ErrorBoundary>
                    </Suspense>
                  </main>
            <Footer />
          </div>
        </CartProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

// Exporting the App component as default
export default App
