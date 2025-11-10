import { test, expect } from '@playwright/test'

test.describe('Visual Regression - Home Page', () => {
  test('home page visual snapshot', async ({ page }) => {
    await page.goto('/')
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    await expect(page.getByText(/espinosa's hand carwash/i).first()).toBeVisible()
    
    // Take screenshot
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('home page hero section', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Screenshot of hero section only
    const heroSection = page.locator('section').first()
    await expect(heroSection).toHaveScreenshot('home-hero.png', {
      maxDiffPixels: 50,
    })
  })
})

