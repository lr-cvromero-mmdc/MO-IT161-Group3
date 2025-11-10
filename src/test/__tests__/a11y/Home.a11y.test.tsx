import { describe, it, expect, vi } from 'vitest'
import { render } from '../../utils'
import { Home } from '@/pages/Home'
import * as axe from 'axe-core'

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

describe('Home Page Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Home />)
    
    // Run axe-core accessibility check using jest-axe
    const { violations } = await axe.run(container as HTMLElement)
    
    // Check for violations
    expect(violations).toHaveLength(0)
    
    // Log violations if any (for debugging)
    if (violations.length > 0) {
      console.log('Accessibility violations:', violations)
    }
  })

  it('should have proper heading hierarchy', async () => {
    const { container } = render(<Home />)
    
    const { violations } = await axe.run(container as HTMLElement, {
      rules: {
        'heading-order': { enabled: true },
      },
    })
    
    const headingViolations = violations.filter(
      v => v.id === 'heading-order'
    )
    expect(headingViolations).toHaveLength(0)
  })

  it('should have proper ARIA labels', async () => {
    const { container } = render(<Home />)
    
    const { violations } = await axe.run(container as HTMLElement, {
      rules: {
        'aria-required-attr': { enabled: true },
        'aria-valid-attr-value': { enabled: true },
      },
    })
    
    const ariaViolations = violations.filter(
      v => v.id === 'aria-required-attr' || v.id === 'aria-valid-attr-value'
    )
    expect(ariaViolations).toHaveLength(0)
    })
  })
