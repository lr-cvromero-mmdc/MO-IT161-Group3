import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'

interface CartIconProps {
  onClick?: () => void
  className?: string
}

export const CartIcon = React.forwardRef<HTMLButtonElement, CartIconProps>(
  ({ onClick, className }, ref) => {
    const { getItemCount, hasServices } = useCart()
    const itemCount = getItemCount()
    const servicesInCart = hasServices()

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={`relative p-1.5 ${className}`}
        aria-label={`Shopping cart with ${itemCount} items${servicesInCart ? ' including services' : ''}`}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className={`absolute -top-1 -right-1 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center min-w-[16px] ${
            servicesInCart ? 'bg-blue-600' : 'bg-brand-primary'
          }`}>
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Button>
    )
  }
)

CartIcon.displayName = 'CartIcon'
