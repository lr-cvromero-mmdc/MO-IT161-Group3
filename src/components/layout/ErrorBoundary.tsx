// Error Boundary component for catching React errors
import { Component, ReactNode, ErrorInfo } from 'react'
import { Container } from './Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // In production, you would log to an error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo })

    this.setState({
      error,
      errorInfo,
    })

    // Log error for monitoring (in production, use proper logging service)
    if (import.meta.env.PROD) {
      // Send to error tracking service
      // logErrorToService(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-20">
          <Container>
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-red-100 rounded-full">
                      <AlertTriangle className="h-12 w-12 text-red-600" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-brand-dark mb-2">
                    Something went wrong
                  </CardTitle>
                  <p className="text-neutral-600">
                    We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {import.meta.env.DEV && this.state.error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-semibold text-red-900 mb-2">Error Details (Development Only):</p>
                      <p className="text-xs text-red-700 font-mono break-all">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo && (
                        <details className="mt-2">
                          <summary className="text-xs text-red-700 cursor-pointer">Stack Trace</summary>
                          <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-48">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={this.handleReset}
                      className="flex items-center gap-2 bg-brand-primary text-white hover:bg-brand-primary/90"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try Again
                    </Button>
                    <Link to="/" onClick={() => { this.handleReset(); window.scrollTo(0, 0); }}>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 w-full sm:w-auto"
                      >
                        <Home className="h-4 w-4" />
                        Go to Homepage
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </div>
      )
    }

    return this.props.children
  }
}

