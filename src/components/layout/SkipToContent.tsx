import { Link } from "react-router-dom"

<<<<<<< HEAD
<<<<<<< HEAD
// SkipToContent component for accessibility
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// SkipToContent component for accessibility
=======
>>>>>>> origin/staging
=======
// SkipToContent component for accessibility
>>>>>>> Stashed changes
=======
// SkipToContent component for accessibility
>>>>>>> Stashed changes
>>>>>>> c47e2c8a892b754f47d3d42d7dec489354be9ac7
=======
// SkipToContent component for accessibility
>>>>>>> origin/main
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