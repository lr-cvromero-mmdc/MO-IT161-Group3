import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { trackWebVitals, trackPageLoad } from './lib/performance'
import { validateEnv } from './lib/env'

// Validate environment variables
try {
  validateEnv()
} catch (error) {
  console.error('Environment validation failed:', error)
}

// Track performance metrics
trackWebVitals((_metric) => {
  // Send to analytics service if enabled
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    // Example: gtag('event', _metric.name, { value: _metric.value, rating: _metric.rating })
  }
})

// Track page load performance
trackPageLoad()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
