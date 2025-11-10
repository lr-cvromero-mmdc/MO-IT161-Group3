import { describe, it, expect, beforeEach } from 'vitest'
import { waitFor } from '@testing-library/react'
import { render, screen } from '../../../utils'
import userEvent from '@testing-library/user-event'
import { ProductCard } from '@/components/services/ProductCard'
import { Product } from '@/types/services'

const mockProduct: Product = {
  id: 'car-shampoo',
  name: 'Car Shampoo',
  description: 'Premium car shampoo',
  price: 300,
  priceDisplay: '₱300',
  category: 'cleaning',
  image: '/test-product.jpg',
  badge: 'Best Seller',
  stockStatus: 'In Stock',
}

describe('ProductCard Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders product card with product information', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Car Shampoo')).toBeInTheDocument()
    expect(screen.getByText('Premium car shampoo')).toBeInTheDocument()
    expect(screen.getByText(/₱300/i)).toBeInTheDocument()
  })

  it('adds product to cart when add to cart button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<ProductCard product={mockProduct} />)
    
    const addButton = screen.getByRole('button', { name: /add to cart/i })
    await user.click(addButton)
    
    // Wait for cart to be updated in localStorage
    await waitFor(() => {
      const cartData = localStorage.getItem('cart')
      expect(cartData).toBeTruthy()
      if (cartData) {
        const cart = JSON.parse(cartData)
        expect(cart.items.length).toBeGreaterThan(0)
        expect(cart.items.some((item: any) => item.id === 'car-shampoo')).toBe(true)
      }
    }, { timeout: 2000 })
  })

  it('displays badge when product has badge', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Best Seller')).toBeInTheDocument()
  })

  it('displays stock status', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('In Stock')).toBeInTheDocument()
  })

  it('displays product image', () => {
    render(<ProductCard product={mockProduct} />)
    
    const image = screen.getByAltText(/car shampoo.*professional car care product/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-product.jpg')
  })

  it('displays recommended message when product is recommended', () => {
    const recommendedProduct = { ...mockProduct, isRecommended: true }
    render(<ProductCard product={recommendedProduct} />)
    
    expect(screen.getByText(/recommended with premium wash/i)).toBeInTheDocument()
  })

  it('displays bundle deal button text when product is bundle', () => {
    const bundleProduct = { ...mockProduct, isBundle: true }
    render(<ProductCard product={bundleProduct} />)
    
    expect(screen.getByText(/get bundle deal/i)).toBeInTheDocument()
  })

  it('displays original price when product has discount', () => {
    const discountedProduct = {
      ...mockProduct,
      originalPrice: 400,
      originalPriceDisplay: '₱400',
    }
    render(<ProductCard product={discountedProduct} />)
    
    expect(screen.getByText(/₱400/i)).toBeInTheDocument()
  })
})

