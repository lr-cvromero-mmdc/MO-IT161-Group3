import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component automatically scrolls to the top of the page
 * whenever the route changes. This ensures consistent behavior across
 * all navigation links and prevents users from landing in random scroll positions.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top whenever the pathname changes
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
