import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../utils'
import userEvent from '@testing-library/user-event'
import { Home } from '@/pages/Home'

// Mock the location search hook
vi.mock('@/hooks/useLocationSearch', () => ({
  useLocationSearch: () => ({
    isLoading: false,
    error: null,
    result: null,
    suggestions: [],
    searchQuery: '',
    updateSearchQuery: vi.fn(),
    searchByText: vi.fn(),
    searchByCoordinates: vi.fn(),
    getCurrentLocation: vi.fn(),
    clearResults: vi.fn(),
    clearError: vi.fn(),
  }),
}))

describe('Home Page', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('renders home page with hero section', () => {
    render(<Home />)
    
    // Check for hero section elements
    expect(screen.getByText(/espinosa's hand carwash/i)).toBeInTheDocument()
  })

  it('renders services section', () => {
    render(<Home />)
    
    // Check for services section
    expect(screen.getByText(/our services/i)).toBeInTheDocument()
  })

  it('renders FAQ section with accordion', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    // Check FAQ section exists
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument()
    
    // Find first FAQ item and click to expand
    const firstQuestion = screen.getByText(/what services do you offer/i)
    expect(firstQuestion).toBeInTheDocument()
    
    // Click to expand FAQ
    await user.click(firstQuestion)
    
    // Check if answer is visible after clicking
    await waitFor(() => {
      expect(screen.getByText(/we offer a comprehensive range/i)).toBeInTheDocument()
    })
  })

  it('renders testimonials section', () => {
    render(<Home />)
    
    // Check for testimonials
    expect(screen.getByText(/what our customers say/i)).toBeInTheDocument()
  })

  it('renders location search functionality', () => {
    render(<Home />)
    
    // Check for location search input
    const searchInput = screen.getByPlaceholderText(/search for a location/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('renders booking steps section', () => {
    render(<Home />)
    
    // Check for booking steps
    expect(screen.getByText(/how to book/i)).toBeInTheDocument()
  })

  it('renders quality features section', () => {
    render(<Home />)
    
    // Check for quality features section - uses "Quality Guaranteed" as title
    expect(screen.getByText(/quality guaranteed/i)).toBeInTheDocument()
  })
})

