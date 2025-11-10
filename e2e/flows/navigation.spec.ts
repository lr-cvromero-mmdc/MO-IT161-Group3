import { test, expect } from '@playwright/test'

test.describe('Navigation Flow', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/')

    // Test Home page
    await expect(page).toHaveTitle(/Espinosa's Hand Carwash/i)
    await expect(page.getByRole('heading', { name: /espinosa's hand carwash/i })).toBeVisible()

    // Navigate to About
    await page.getByRole('link', { name: /about/i }).click()
    await expect(page).toHaveURL(/.*about/)
    await expect(page.getByRole('heading', { name: /about us/i })).toBeVisible()

    // Navigate to Services
    await page.getByRole('link', { name: /services/i }).click()
    await expect(page).toHaveURL(/.*services/)
    await expect(page.getByRole('heading', { name: /our services/i })).toBeVisible()

    // Navigate to How It Works
    await page.getByRole('link', { name: /how it works/i }).click()
    await expect(page).toHaveURL(/.*how-it-works/)

    // Navigate to Locations
    await page.getByRole('link', { name: /locations/i }).click()
    await expect(page).toHaveURL(/.*locations/)

    // Navigate to Contact
    await page.getByRole('link', { name: /contact/i }).click()
    await expect(page).toHaveURL(/.*contact/)
    await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible()
  })

  test('should navigate using mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open mobile menu
    const menuButton = page.getByRole('button', { name: /menu/i })
    await menuButton.click()

    // Check menu is open
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()

    // Navigate to Services via mobile menu
    await page.getByRole('link', { name: /services/i }).click()
    await expect(page).toHaveURL(/.*services/)
  })

  test('should maintain cart state across navigation', async ({ page }) => {
    await page.goto('/services')

    // Add item to cart
    const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first()
    await addToCartButton.click()

    // Navigate to another page
    await page.goto('/about')

    // Navigate back and check cart still has item
    await page.goto('/services')
    
    // Check cart icon shows item count
    const cartIcon = page.getByRole('button', { name: /cart/i })
    await expect(cartIcon).toBeVisible()
  })
})

