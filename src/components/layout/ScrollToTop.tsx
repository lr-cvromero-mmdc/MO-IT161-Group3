import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { trackPageView } from "@/lib/analytics"

export function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
    
    // Track page view for analytics
    trackPageView(location.pathname + location.search, document.title)
  }, [location])

  return null
}
