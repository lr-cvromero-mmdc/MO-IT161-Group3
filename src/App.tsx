import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SkipToContent } from "@/components/layout/SkipToContent"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { ErrorBoundary } from "@/components/layout/ErrorBoundary"
import { CartProvider } from "@/context/CartContext"
import { ToastProvider } from "@/components/ui/toast"
import { Loader2 } from "lucide-react"

// Lazy load pages for better performance
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

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary mx-auto mb-4" />
        <p className="text-neutral-600">Loading...</p>
      </div>
    </div>
  )
}

// Main application component
function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <ScrollToTop />
            <SkipToContent />
            <Header />
            <main id="main-content">
              <Suspense fallback={<LoadingFallback />}>
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
