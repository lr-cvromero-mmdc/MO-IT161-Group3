// Google Analytics integration
// Only loads when VITE_ENABLE_ANALYTICS is true

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID

/**
 * Initialize Google Analytics
 * Only loads if analytics is enabled and tracking ID is provided
 */
export function initAnalytics(): void {
  // Only initialize if analytics is enabled
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== 'true') {
    return
  }

  // Check if tracking ID is provided
  if (!GA_TRACKING_ID) {
    if (import.meta.env.DEV) {
      console.warn('[Analytics] VITE_GA_TRACKING_ID is not set. Analytics will not be initialized.')
    }
    return
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    if (window.dataLayer) {
      window.dataLayer.push(arguments)
    }
  }

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script)

  // Configure gtag
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  })

  if (import.meta.env.DEV) {
    console.log('[Analytics] Google Analytics initialized')
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string): void {
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== 'true' || !window.gtag || !GA_TRACKING_ID) {
    return
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: path,
    page_title: title,
  })
}

/**
 * Track custom event
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== 'true' || !window.gtag) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * Track conversion (e.g., booking completion, purchase)
 */
export function trackConversion(conversionName: string, value?: number): void {
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== 'true' || !window.gtag) {
    return
  }

  window.gtag('event', 'conversion', {
    send_to: conversionName,
    value: value,
    currency: 'PHP',
  })
}

/**
 * Track e-commerce events
 */
export function trackEcommerce(
  action: 'add_to_cart' | 'remove_from_cart' | 'purchase' | 'begin_checkout',
  items: Array<{
    id: string
    name: string
    category?: string
    price: number
    quantity: number
  }>,
  value?: number
): void {
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== 'true' || !window.gtag) {
    return
  }

  window.gtag('event', action, {
    items: items,
    value: value,
    currency: 'PHP',
  })
}

