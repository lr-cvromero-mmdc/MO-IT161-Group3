/**
 * ProductCard Component
 * 
 * Displays a single product with pricing, stock status, and purchase options.
 * Includes special styling for bundles and recommended products.
 */

import { useState, memo, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Loader2 } from "lucide-react"
import { Product } from "@/types/services"
import { useCart } from "@/hooks/useCart"
import { useToast } from "@/hooks/useToast"

interface ProductCardProps {
  /** Product data to display */
  product: Product
}

/**
 * ProductCard - Individual product display card
 * 
 * Features:
 * - Clean product image display with white background
 * - Badge indicators (Best Seller, New, Bundle Deal)
 * - Stock status with color-coded indicators
 * - Original price strikethrough for discounts
 * - Upsell messaging for recommended products
 * - Special styling for bundle products
 * 
 * @param product - Product object containing all display data
 */
function ProductCardComponent({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { success } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = useCallback(async () => {
    setIsAdding(true)
    try {
      addToCart({
        id: product.id,
        type: 'product',
        name: product.name,
        price: product.price,
        quantity: 1,
        description: product.description,
        image: product.image,
      })
      success(`${product.name} added to cart!`, 'You can continue shopping or proceed to checkout.')
    } finally {
      // Brief delay for visual feedback
      setTimeout(() => setIsAdding(false), 300)
    }
  }, [product.id, product.name, product.price, product.description, product.image, addToCart, success])

  /**
   * Get badge styling based on badge type
   */
  const badgeStyles = useMemo(() => ({
    'Best Seller': 'bg-brand-primary text-white',
    'Popular Choice': 'bg-green-500 text-white',
    'New': 'bg-blue-500 text-white',
    'Bundle Deal': 'bg-orange-500 text-white',
  }), [])

  const getBadgeStyles = useCallback((badge: string | null): string => {
    if (!badge) return ''
    return badgeStyles[badge as keyof typeof badgeStyles] || 'bg-neutral-500 text-white'
  }, [badgeStyles])

  /**
   * Get stock status indicator color
   */
  const getStockStatusColor = useCallback((status: string): string => {
    if (status === 'Only 8 left' || status === 'Only 5 left') {
      return 'text-red-600'
    }
    if (status === 'Restocking Soon') {
      return 'text-orange-600'
    }
    if (status === 'Limited Time') {
      return 'text-purple-600'
    }
    return 'text-green-600'
  }, [])

  /**
   * Get stock status dot color
   */
  const getStockDotColor = useCallback((status: string): string => {
    if (status === 'Only 8 left' || status === 'Only 5 left') {
      return 'bg-red-500'
    }
    if (status === 'Restocking Soon') {
      return 'bg-orange-500'
    }
    if (status === 'Limited Time') {
      return 'bg-purple-500'
    }
    return 'bg-green-500'
  }, [])

  return (
    <Card 
      className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full ${
        product.isRecommended ? 'ring-2 ring-brand-accent shadow-lg' : ''
      }`}
    >
      {/* Product Image with clean white background */}
      <div className="h-48 bg-white overflow-hidden flex items-center justify-center relative border-b">
        <img 
          src={product.image} 
          alt={`${product.name} - Professional car care product`}
          className="w-full h-full object-contain p-6 drop-shadow-sm"
          loading="lazy"
          decoding="async"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${getBadgeStyles(product.badge)}`}>
            {product.badge}
          </div>
        )}
      </div>
      
      <CardContent className="p-6 flex flex-col justify-between flex-grow">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-brand-dark mb-2">{product.name}</h3>
          
          {/* Price Display */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-bold text-brand-primary">{product.priceDisplay}</span>
            {product.originalPrice && (
              <span className="text-lg text-neutral-400 line-through">{product.originalPriceDisplay}</span>
            )}
          </div>
          
          <p className="text-sm text-neutral-600 mb-4">
            {product.description}
          </p>
        </div>
        
        {/* Stock Status */}
        <div className={`flex items-center justify-center gap-2 text-sm mb-4 ${getStockStatusColor(product.stockStatus)}`}>
          <div className={`w-2 h-2 rounded-full ${getStockDotColor(product.stockStatus)}`}></div>
          <span className="font-medium">{product.stockStatus}</span>
        </div>
        
        {/* Upsell Cue for recommended products */}
        {product.isRecommended && !product.isBundle && (
          <p className="text-xs text-brand-primary font-medium mb-3 text-center">
            ✨ Recommended with Premium Wash
          </p>
        )}
        
        {/* Add to Cart Button */}
        <Button
          className={`w-full font-semibold py-3 sm:py-2.5 min-h-[48px] sm:min-h-[44px] text-base sm:text-sm disabled:opacity-70 ${
            product.isBundle 
              ? 'bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-primary/90 hover:to-brand-accent/90 active:from-brand-primary/80 active:to-brand-accent/80 text-white' 
              : 'bg-brand-primary hover:bg-brand-primary/90 active:bg-brand-primary/80 text-white'
          }`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.isBundle ? 'Get Bundle Deal' : 'Add to Cart'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// Memoize component to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent)

