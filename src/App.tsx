import { lazy, Suspense, useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SkipToContent } from "@/components/layout/SkipToContent"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { ErrorBoundary } from "@/components/layout/ErrorBoundary"
import { SplashScreen } from "@/components/layout/SplashScreen"
import { CartProvider } from "@/context/CartContext"
import { ToastProvider } from "@/components/ui/toast"

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

// Loading fallback component is now PageLoader (with Lottie animation)

// Main application component
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (hasVisited) {
      // Skip splash screen on subsequent page loads
      setIsLoading(false)
      setShowContent(true)
    } else {
      // Show splash screen on first visit
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  return (
    <ErrorBoundary>
      <ToastProvider>
        <CartProvider>
          {/* Show splash screen on first load */}
          {isLoading && <SplashScreen onLoadingComplete={handleLoadingComplete} />}
          
          {/* Main content - only render after splash screen */}
          <div 
            className={`min-h-screen bg-white transition-opacity duration-300 ${
              showContent ? 'opacity-100' : 'opacity-0'
            }`}
          >
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
