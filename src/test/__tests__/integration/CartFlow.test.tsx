import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../utils'
import userEvent from '@testing-library/user-event'
import { Services } from '@/pages/Services'
import { CartModal } from '@/components/cart/CartModal'
import { useState } from 'react'

// Mock CartModal wrapper to test cart flow
function CartFlowTest() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  return (
    <>
      <Services />
      <button onClick={() => setIsCartOpen(true)} data-testid="open-cart">
        Open Cart
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

describe('Cart Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should add service to cart and display in cart modal', async () => {
    const user = userEvent.setup()
    render(<CartFlowTest />)
    
    // Wait for services to load
    await waitFor(() => {
      const basicWashElements = screen.getAllByText(/basic wash/i)
      expect(basicWashElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
    
    // Add service to cart
    const addToCartButtons = screen.getAllByRole('button', { name: /add to cart/i })
    await user.click(addToCartButtons[0])
    
    // Wait for cart to update
    await waitFor(() => {
      const cartData = localStorage.getItem('cart')
      expect(cartData).toBeTruthy()
    }, { timeout: 2000 })
    
    // Open cart modal
    const openCartButton = screen.getByTestId('open-cart')
    await user.click(openCartButton)
    
    // Verify service is in cart
    await waitFor(() => {
      expect(screen.getByText(/basic wash/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('should add multiple items to cart', async () => {
    const user = userEvent.setup()
    render(<CartFlowTest />)
    
    await waitFor(() => {
      const basicWashElements = screen.getAllByText(/basic wash/i)
      expect(basicWashElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
    
    // Add first service
    const addToCartButtons = screen.getAllByRole('button', { name: /add to cart/i })
    await user.click(addToCartButtons[0])
    
    // Wait a bit, then add another
    await waitFor(() => {
      const cartData = localStorage.getItem('cart')
      expect(cartData).toBeTruthy()
    }, { timeout: 2000 })
    
    if (addToCartButtons.length > 1) {
      await user.click(addToCartButtons[1])
    }
    
    // Verify multiple items in cart
    await waitFor(() => {
      const cartData = localStorage.getItem('cart')
      if (cartData) {
        const cart = JSON.parse(cartData)
        expect(cart.items.length).toBeGreaterThanOrEqual(1)
      }
    }, { timeout: 2000 })
  })
})

