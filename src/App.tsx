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

<<<<<<< HEAD
<<<<<<< HEAD
// Main application component
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Main application component
=======
>>>>>>> origin/staging
=======
// Main application component
>>>>>>> Stashed changes
=======
// Main application component
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// Main application component
function App() {
  return (
    <div className="min-h-screen bg-white">
      <SkipToContent />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

// Exporting the App component as default
export default App