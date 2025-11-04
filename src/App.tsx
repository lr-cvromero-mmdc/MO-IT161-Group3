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

// Main application component
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
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

<<<<<<< HEAD
// Exporting the App component as default
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// Exporting the App component as default
=======
>>>>>>> origin/staging
=======
// Exporting the App component as default
>>>>>>> Stashed changes
=======
// Exporting the App component as default
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
export default App