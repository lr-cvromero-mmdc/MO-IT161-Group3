// Performance monitoring utilities
// Tracks Core Web Vitals and performance metrics

interface PerformanceMetric {
  name: string
  value: number
  delta: number
  id: string
  rating?: 'good' | 'needs-improvement' | 'poor'
}

// @ts-expect-error - Type augmentation for performance API
interface PerformanceObserver {
  disconnect(): void
  observe(): void
  takeRecords(): PerformanceEntry[]
}

// Core Web Vitals thresholds
const VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  FID: { good: 100, poor: 300 }, // First Input Delay (ms)
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
}

function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

// Track Core Web Vitals
export function trackWebVitals(onPerfEntry?: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number }
      
      const value = lastEntry.renderTime || lastEntry.loadTime || 0
      const metric: PerformanceMetric = {
        name: 'LCP',
        value,
        delta: value,
        id: lastEntry.entryType,
        rating: getRating(value, VITALS_THRESHOLDS.LCP),
      }
      
      onPerfEntry?.(metric)
      logPerformanceMetric(metric)
    })
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
  } catch (e) {
    // LCP not supported
  }

  // First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      for (const entry of entries) {
        const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number }
        const value = fidEntry.processingStart - fidEntry.startTime
        
        const metric: PerformanceMetric = {
          name: 'FID',
          value,
          delta: value,
          id: entry.entryType,
          rating: getRating(value, VITALS_THRESHOLDS.FID),
        }
        
        onPerfEntry?.(metric)
        logPerformanceMetric(metric)
        fidObserver.disconnect() // Only measure first input
      }
    })
    
    fidObserver.observe({ entryTypes: ['first-input'] })
  } catch (e) {
    // FID not supported
  }

  // Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean }
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value || 0
        }
      }
    })
    
    clsObserver.observe({ entryTypes: ['layout-shift'] })
    
    // Report CLS on page unload
    window.addEventListener('beforeunload', () => {
      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        delta: clsValue,
        id: 'layout-shift',
        rating: getRating(clsValue, VITALS_THRESHOLDS.CLS),
      }
      
      onPerfEntry?.(metric)
      logPerformanceMetric(metric)
    })
  } catch (e) {
    // CLS not supported
  }

  // First Contentful Paint (FCP)
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries[0] as PerformanceEntry & { renderTime?: number }
      
      if (fcpEntry) {
        const value = fcpEntry.renderTime || fcpEntry.startTime || 0
        const metric: PerformanceMetric = {
          name: 'FCP',
          value,
          delta: value,
          id: fcpEntry.entryType,
          rating: getRating(value, VITALS_THRESHOLDS.FCP),
        }
        
        onPerfEntry?.(metric)
        logPerformanceMetric(metric)
      }
    })
    
    fcpObserver.observe({ entryTypes: ['paint'] })
  } catch (e) {
    // FCP not supported
  }
}

function logPerformanceMetric(metric: PerformanceMetric) {
  if (import.meta.env.DEV) {
    console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`)
  }
  
  // In production, send to analytics service
  if (import.meta.env.PROD) {
    // Example: Send to Google Analytics, custom analytics, etc.
    // gtag('event', metric.name, { value: metric.value, rating: metric.rating })
  }
}

// Track page load time
export function trackPageLoad() {
  if (typeof window === 'undefined' || !window.performance) {
    return
  }

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart
      const ttfb = navigation.responseStart - navigation.requestStart
      
      const metrics = [
        {
          name: 'Page Load',
          value: loadTime,
          rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor',
        },
        {
          name: 'TTFB',
          value: ttfb,
          rating: getRating(ttfb, VITALS_THRESHOLDS.TTFB),
        },
      ]
      
      metrics.forEach(metric => {
        if (import.meta.env.DEV) {
          console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`)
        }
      })
    }
  })
}

// Measure function execution time
export function measurePerformance<T>(name: string, fn: () => T): T {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  const duration = end - start
  
  if (import.meta.env.DEV) {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
  }
  
  return result
}

// Measure async function execution time
export async function measureAsyncPerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()
  const result = await fn()
  const end = performance.now()
  const duration = end - start
  
  if (import.meta.env.DEV) {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
  }
  
  return result
}

