// Logger utility for production-ready logging
// Replaces console statements with proper logging

interface LogLevel {
  DEBUG: 'debug'
  INFO: 'info'
  WARN: 'warn'
  ERROR: 'error'
}

const LOG_LEVELS: LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
}

const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

// Logger class for structured logging
class Logger {
  private log(level: keyof LogLevel, message: string, data?: unknown) {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (isDevelopment) {
      // In development, use console with appropriate level
      switch (level) {
        case 'DEBUG':
          console.debug(logMessage, data || '')
          break
        case 'INFO':
          console.info(logMessage, data || '')
          break
        case 'WARN':
          console.warn(logMessage, data || '')
          break
        case 'ERROR':
          console.error(logMessage, data || '')
          break
        default:
          console.log(logMessage, data || '')
      }
    } else if (isProduction) {
      // In production, send to logging service
      // Example: Send to error tracking service (Sentry, LogRocket, etc.)
      if (level === 'ERROR') {
        // Send to error tracking service
        // Example: Sentry.captureException(new Error(message), { extra: data })
        this.sendToLoggingService(level, message, data)
      } else if (level === 'WARN') {
        // Send warnings to monitoring service
        this.sendToLoggingService(level, message, data)
      }
      // In production, only log errors and warnings, not debug/info
    }
  }

  private sendToLoggingService(level: string, message: string, data?: unknown) {
    // Placeholder for production logging service integration
    // Example implementations:
    // - Sentry for error tracking
    // - LogRocket for session replay
    // - Custom logging API
    // - CloudWatch, DataDog, etc.
    
    // For now, silently handle in production
    // In a real app, you would send to your logging service here
    if (typeof window !== 'undefined' && (window as any).__LOG_SERVICE__) {
      (window as any).__LOG_SERVICE__.log(level, message, data)
    }
  }

  debug(message: string, data?: unknown) {
    this.log('DEBUG', message, data)
  }

  info(message: string, data?: unknown) {
    this.log('INFO', message, data)
  }

  warn(message: string, data?: unknown) {
    this.log('WARN', message, data)
  }

  error(message: string, error: Error | string, data?: unknown) {
    const errorMessage = error instanceof Error ? error.message : error
    const errorData = error instanceof Error 
      ? { ...data, stack: error.stack, name: error.name }
      : data
    
    this.log('ERROR', errorMessage, errorData)
  }

  // Specialized logging methods
  logBooking(message: string, data?: unknown) {
    if (isDevelopment) {
      this.info(`[BOOKING] ${message}`, data)
    }
  }

  logPayment(message: string, data?: unknown) {
    if (isDevelopment) {
      this.info(`[PAYMENT] ${message}`, data)
    }
  }

  logReservation(message: string, data?: unknown) {
    if (isDevelopment) {
      this.info(`[RESERVATION] ${message}`, data)
    }
  }
}

// Export singleton instance
export const logger = new Logger()

// Export for testing
export { Logger }

