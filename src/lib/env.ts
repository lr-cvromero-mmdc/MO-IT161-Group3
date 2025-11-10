// Environment variable utilities
// Provides type-safe access to environment variables

interface EnvConfig {
  appEnv: 'development' | 'production' | 'test'
  appName: string
  apiUrl?: string
  gaTrackingId?: string
  sentryDsn?: string
  enableAnalytics: boolean
  enableErrorTracking: boolean
}

function getEnvVar(key: string, defaultValue?: string): string | undefined {
  const value = import.meta.env[key]
  return value || defaultValue
}

function getBooleanEnvVar(key: string, defaultValue = false): boolean {
  const value = import.meta.env[key]
  if (value === undefined) return defaultValue
  return value === 'true' || value === '1'
}

export const env: EnvConfig = {
  appEnv: (getEnvVar('VITE_APP_ENV', 'development') as EnvConfig['appEnv']) || 'development',
  appName: getEnvVar('VITE_APP_NAME', "Espinosa's Hand Carwash") || "Espinosa's Hand Carwash",
  apiUrl: getEnvVar('VITE_API_URL'),
  gaTrackingId: getEnvVar('VITE_GA_TRACKING_ID'),
  sentryDsn: getEnvVar('VITE_SENTRY_DSN'),
  enableAnalytics: getBooleanEnvVar('VITE_ENABLE_ANALYTICS', false),
  enableErrorTracking: getBooleanEnvVar('VITE_ENABLE_ERROR_TRACKING', false),
}

// Validate required environment variables
export function validateEnv(): void {
  // Check if appName has a value (either from env or default)
  if (!env.appName) {
    throw new Error(`Missing required environment variables: VITE_APP_NAME`)
  }
}

// Check if running in production
export const isProduction = env.appEnv === 'production'
export const isDevelopment = env.appEnv === 'development'
export const isTest = env.appEnv === 'test'

