import { describe, it, expect, beforeEach } from 'vitest'
import { waitFor } from '@testing-library/react'
import { render, screen } from '../../../utils'
import userEvent from '@testing-library/user-event'
import { ServiceCard } from '@/components/services/ServiceCard'
import { Service } from '@/types/services'
import { Clock, Shield, Sparkles } from 'lucide-react'

const mockService: Service = {
  id: 'basic-wash',
  title: 'Basic Wash',
  description: 'A basic car wash service',
  price: 500,
  priceDisplay: '₱500',
  duration: 30,
  durationDisplay: '30 minutes',
  category: 'basic',
  image: '/test-image.jpg',
  features: ['Exterior wash', 'Tire cleaning'],
  popular: false,
  framing: 'Basic Service',
  valuePoints: [
    { text: 'Quick Service', icon: Clock },
    { text: 'Quality Guaranteed', icon: Shield },
    { text: 'Professional Team', icon: Sparkles },
  ],
}

describe('ServiceCard Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders service card with service information', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('Basic Wash')).toBeInTheDocument()
    expect(screen.getByText('A basic car wash service')).toBeInTheDocument()
    expect(screen.getByText(/₱500/i)).toBeInTheDocument()
  })

  it('adds service to cart when add to cart button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<ServiceCard service={mockService} />)
    
    const addButton = screen.getByRole('button', { name: /add to cart/i })
    await user.click(addButton)
    
    // Wait for cart to be updated in localStorage
    await waitFor(() => {
      const cartData = localStorage.getItem('cart')
      expect(cartData).toBeTruthy()
      if (cartData) {
        const cart = JSON.parse(cartData)
        expect(cart.items.length).toBeGreaterThan(0)
        expect(cart.items.some((item: any) => item.id === 'basic-wash')).toBe(true)
      }
    }, { timeout: 2000 })
  })

  it('displays best value badge when service is recommended', () => {
    const recommendedService = { ...mockService, isRecommended: true }
    render(<ServiceCard service={recommendedService} />)
    
    expect(screen.getByText(/best value/i)).toBeInTheDocument()
  })

  it('displays service features', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('Exterior wash')).toBeInTheDocument()
    expect(screen.getByText('Tire cleaning')).toBeInTheDocument()
  })

  it('displays service duration', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('30 minutes')).toBeInTheDocument()
  })

  it('displays service image', () => {
    render(<ServiceCard service={mockService} />)
    
    const image = screen.getByAltText(/professional.*basic wash/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('displays value points', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('Quick Service')).toBeInTheDocument()
    expect(screen.getByText('Quality Guaranteed')).toBeInTheDocument()
  })
})

