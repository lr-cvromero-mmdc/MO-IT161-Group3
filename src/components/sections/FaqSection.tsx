// Reusable FAQ Section Component
import { Container } from "@/components/layout/Container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface Faq {
  id?: string | number
  question: string
  answer: string
}

interface FaqSectionProps {
  title?: string
  subtitle?: string
  faqs: Faq[]
  background?: "white" | "gray" | "cream"
  className?: string
}

export function FaqSection({ 
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions about our services and booking process.",
  faqs,
  background = "white",
  className = ""
}: FaqSectionProps) {
  const bgClass = {
    white: "bg-white",
    gray: "bg-neutral-50",
    cream: "bg-brand-cream/30"
  }[background]

  return (
    <section className={`py-16 ${bgClass} ${className}`}>
      <Container>
        <div className="text-center mb-12">
          <div className="w-8 h-0.5 bg-brand-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4" aria-label="Frequently asked questions">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.id || index} 
                value={`item-${index}`} 
                className="border border-neutral-200 rounded-lg px-6 hover:border-brand-primary/50 transition-colors"
              >
                <AccordionTrigger 
                  className="text-left hover:no-underline py-6 focus:outline-none rounded-sm"
                  aria-label={`Question: ${faq.question}`}
                >
                  <span className="text-lg font-semibold text-brand-dark pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}

