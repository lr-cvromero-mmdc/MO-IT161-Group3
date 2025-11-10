import { Link } from "react-router-dom"

// SkipToContent component for accessibility
export function SkipToContent() {
  return (
    <Link
      to="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold focus-ring"
    >
      Skip to main content
    </Link>
  )
}
