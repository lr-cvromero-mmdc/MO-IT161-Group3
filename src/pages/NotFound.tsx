// 404 Not Found page
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, AlertCircle } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-20 pt-32">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="text-9xl font-bold text-brand-primary/20">404</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AlertCircle className="h-16 w-16 text-brand-primary" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Page Not Found
              </CardTitle>
              <p className="text-lg text-neutral-600">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  <Button size="lg" className="flex items-center gap-2 bg-brand-primary text-white hover:bg-brand-primary/90 w-full sm:w-auto">
                    <Home className="h-5 w-5" />
                    Go to Homepage
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go Back
                </Button>
              </div>

              <div className="pt-6 border-t border-neutral-200">
                <p className="text-sm font-semibold text-brand-dark mb-3 text-center">
                  Popular Pages:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Link
                    to="/services"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-center p-3 rounded-lg border border-neutral-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors text-sm font-medium text-neutral-700 hover:text-brand-primary"
                  >
                    Services
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-center p-3 rounded-lg border border-neutral-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors text-sm font-medium text-neutral-700 hover:text-brand-primary"
                  >
                    About
                  </Link>
                  <Link
                    to="/locations"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-center p-3 rounded-lg border border-neutral-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors text-sm font-medium text-neutral-700 hover:text-brand-primary"
                  >
                    Locations
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-center p-3 rounded-lg border border-neutral-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors text-sm font-medium text-neutral-700 hover:text-brand-primary"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  )
}

