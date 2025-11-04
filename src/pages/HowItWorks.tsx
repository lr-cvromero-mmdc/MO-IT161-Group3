// How It Works page - Basic placeholder for team development
import { Container } from "@/components/layout/Container"

// How It Works page component - Ready for team development
export function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-100 py-16 pt-32">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h1>
            <p className="text-lg text-gray-600">
              Simple steps to get your car clean.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Under Development
            </h2>
            <p className="text-gray-600 mb-8">
              This page is being developed by the team.
            </p>
            <div className="bg-gray-50 border rounded p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Planned Steps:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Book Online</div>
                    <div className="text-sm text-gray-600">Choose your service</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Drop Off</div>
                    <div className="text-sm text-gray-600">Bring your car</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Pick Up</div>
                    <div className="text-sm text-gray-600">Clean car ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
