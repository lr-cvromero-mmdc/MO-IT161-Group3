import { cn } from "@/lib/utils"

// Container component that centers its content and applies horizontal padding.
interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'container' | 'container-xl' | 'container-sm' | 'container-md' | 'container-lg' | 'full'
}

export function Container({ children, className, maxWidth = 'container' }: ContainerProps) {
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

  return (
    <div className="w-full flex justify-center">
      <div className={cn("px-4 sm:px-6 lg:px-8 w-full bg-transparent", maxWidthClass, className)} style={{ maxWidth: '1920px' }}>
        {children}
      </div>
    </div>
  )
}
