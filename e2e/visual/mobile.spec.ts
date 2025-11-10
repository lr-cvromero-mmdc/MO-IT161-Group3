import { test, expect } from '@playwright/test'

test.describe('Visual Regression - Mobile Viewport', () => {
  test('home page on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('home-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('services page on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/services')
    
    await page.waitForLoadState('networkidle')
    await expect(page.getByText(/our services/i)).toBeVisible({ timeout: 5000 })
    
    await expect(page).toHaveScreenshot('services-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('mobile menu open state', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Open mobile menu
    await page.getByRole('button', { name: /menu/i }).click()
    
    // Wait for menu animation
    await page.waitForTimeout(300)
    
    // Screenshot of menu
    const menu = page.locator('[role="dialog"], [data-state="open"]').first()
    if (await menu.isVisible()) {
      await expect(menu).toHaveScreenshot('mobile-menu-open.png', {
        maxDiffPixels: 50,
      })
    }
  })
})

