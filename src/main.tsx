import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { trackWebVitals, trackPageLoad } from './lib/performance'
import { validateEnv } from './lib/env'
import { initAnalytics } from './lib/analytics'

// Validate environment variables
try {
  validateEnv()
} catch (error) {
  console.error('Environment validation failed:', error)
}

// Initialize Google Analytics
initAnalytics()

// Track performance metrics
trackWebVitals((_metric) => {
  // Send to analytics service if enabled
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    // Example: gtag('event', _metric.name, { value: _metric.value, rating: _metric.rating })
  }
})

// Track page load performance
trackPageLoad()

// Get base path from import.meta.env (set by Vite)
// Vercel uses /, GitHub Pages uses /carwash-website/
const basePath = import.meta.env.BASE_URL || '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        basename={basePath}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
