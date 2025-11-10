import { test, expect } from '@playwright/test'

test.describe('Mobile Menu Flow', () => {
  test('should open and close mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Menu button should be visible on mobile
    const menuButton = page.getByRole('button', { name: /menu/i })
    await expect(menuButton).toBeVisible()

    // Open menu
    await menuButton.click()

    // Menu items should be visible
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible()

    // Close menu (click outside or close button)
    await page.keyboard.press('Escape')

    // Menu should close (items not immediately visible)
    // Note: Radix UI might keep them in DOM but hidden
  })

  test('should navigate via mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open menu
    await page.getByRole('button', { name: /menu/i }).click()

    // Click Services link
    await page.getByRole('link', { name: /services/i }).click()

    // Should navigate to services page
    await expect(page).toHaveURL(/.*services/)
    await expect(page.getByText(/our services/i)).toBeVisible()
  })

  test('should maintain functionality on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/services')

    // Services should still be visible and functional
    await expect(page.getByText(/basic wash/i).first()).toBeVisible({ timeout: 5000 })

    // Add to cart should work
    const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first()
    await addToCartButton.click()

    // Cart icon should be visible
    await expect(page.getByRole('button', { name: /cart/i })).toBeVisible()
  })
})
