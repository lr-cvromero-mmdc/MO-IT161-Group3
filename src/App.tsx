import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SkipToContent } from "@/components/layout/SkipToContent"
import { Home } from "@/pages/Home"
import { About } from "@/pages/About"
import { Services } from "@/pages/Services"
import { Locations } from "@/pages/Locations"

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
>>>>>>> origin/main
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
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

<<<<<<< HEAD
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
=======
// Exporting the App component as default
>>>>>>> origin/main
export default App
