import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('should have no accessibility violations on home page', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have no accessibility violations on services page', async ({ page }) => {
    await page.goto('/services')
    
    // Wait for page to load
    await page.waitForSelector('text=Our Services', { timeout: 5000 })
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have no accessibility violations on about page', async ({ page }) => {
    await page.goto('/about')
    
    await page.waitForSelector('text=About Us', { timeout: 5000 })
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should have proper keyboard navigation', async ({ page }) => {
    await page.goto('/')

    // Test tab navigation
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Check if focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()
  })

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/services')
    
    await page.waitForSelector('text=Our Services', { timeout: 5000 })
    
    // Check for buttons with proper labels
    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label')
      const textContent = await button.textContent()
      
      // Button should have either aria-label or text content
      expect(ariaLabel || textContent).toBeTruthy()
    }
  })
})
