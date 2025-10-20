import { cn } from "@/lib/utils"

// Section component that constrains background colors and prevents overstretching
interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'primary' | 'cream' | 'neutral' | 'white' | 'dark' | 'none'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'container' | 'container-xl' | 'container-sm' | 'container-md' | 'container-lg' | 'full'
  id?: string
  fullWidthBackground?: boolean
}

export function Section({ 
  children, 
  className = '', 
  background = 'none',
  maxWidth = 'container',
  id,
  fullWidthBackground = false
}: SectionProps) {
  const backgroundClass = {
    'primary': 'bg-brand-primary',
    'cream': 'bg-brand-cream',
    'neutral': 'bg-neutral-100',
    'white': 'bg-white',
    'dark': 'bg-brand-dark',
    'none': ''
  }[background]

  const maxWidthClass = {
    'sm': 'max-w-sm',
    'md': 'max-w-md', 
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    'container': 'max-w-container',
    'container-xl': 'max-w-container-xl',
    'container-sm': 'max-w-container-sm',
    'container-md': 'max-w-container-md',
    'container-lg': 'max-w-container-lg',
    'full': 'max-w-full'
  }[maxWidth]

  if (fullWidthBackground) {
    return (
      <div className={cn("w-full", backgroundClass, className)} id={id}>
        <div className="w-full flex justify-center">
          <div className={cn("px-4 sm:px-6 lg:px-8 w-full", maxWidthClass)} style={{ maxWidth: '1920px' }}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center">
      <div className={cn("px-4 sm:px-6 lg:px-8 w-full", maxWidthClass, backgroundClass, className)} id={id} style={{ maxWidth: '1920px' }}>
        {children}
      </div>
    </div>
  )
}
