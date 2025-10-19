import * as React from "react"
import { Check } from 'lucide-react'

export interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = onStepClick && index < currentStep

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    transition-all duration-200
                    ${isCompleted
                      ? 'bg-green-600 text-white'
                      : isCurrent
                        ? 'bg-brand-primary text-white ring-4 ring-brand-primary/20'
                        : 'bg-neutral-200 text-neutral-500'
                    }
                    ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div className={`text-sm font-semibold ${
                    isCurrent ? 'text-brand-primary' : isCompleted ? 'text-green-600' : 'text-neutral-500'
                  }`}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-neutral-500 mt-1 hidden sm:block">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-1 mx-2 -mt-8 transition-all duration-300
                  ${index < currentStep ? 'bg-green-600' : 'bg-neutral-200'}
                `} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

interface StepContentProps {
  children: React.ReactNode
  className?: string
}

export function StepContent({ children, className = '' }: StepContentProps) {
  return (
    <div className={`animate-in fade-in slide-in-from-bottom-4 duration-300 ${className}`}>
      {children}
    </div>
  )
}
