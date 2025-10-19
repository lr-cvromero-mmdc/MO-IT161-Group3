import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SkipToContent } from "@/components/layout/SkipToContent"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { CartProvider } from "@/context/CartContext"
import { ToastProvider } from "@/components/ui/toast"
import { Home } from "@/pages/Home"
import { About } from "@/pages/About"
import { HowItWorks } from "@/pages/HowItWorks"
import { Services } from "@/pages/Services"
import { Locations } from "@/pages/Locations"
import { Contact } from "@/pages/Contact"
import { Booking } from "@/pages/Booking"
import { BookingConfirmation } from "@/pages/BookingConfirmation"
import { ServiceBooking } from "@/pages/ServiceBooking"
import { ProductCheckout } from "@/pages/ProductCheckout"

// Main application component
function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <ScrollToTop />
          <SkipToContent />
          <Header />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/services" element={<Services />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/service-booking" element={<ServiceBooking />} />
              <Route path="/checkout" element={<ProductCheckout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ToastProvider>
  )
}

// Exporting the App component as default
export default App