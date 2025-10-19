// About page - Basic placeholder for team development
import { Container } from "@/components/layout/Container"

// About page component - Ready for team development
export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-100 py-16 pt-32">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              About Espinosa's
            </h1>
            <p className="text-lg text-gray-600">
              Where Cars Come to Shine
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
                Planned Content:
              </h3>
              <ul className="text-left text-gray-600 space-y-1">
                <li>• Our Story</li>
                <li>• Company Values</li>
                <li>• Team Members</li>
                <li>• Mission & Vision</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}