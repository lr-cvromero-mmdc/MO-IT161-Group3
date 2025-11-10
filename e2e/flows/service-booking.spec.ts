import { test, expect } from '@playwright/test'

test.describe('Service Booking Flow', () => {
  test('should complete full service booking journey', async ({ page }) => {
    await page.goto('/services')

    // Wait for services to load
    await expect(page.getByText(/basic wash/i).first()).toBeVisible()

    // Add service to cart
    const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first()
    await addToCartButton.click()

    // Open cart modal
    const cartIcon = page.getByRole('button', { name: /cart/i })
    await cartIcon.click()

    // Verify service is in cart
    await expect(page.getByText(/basic wash/i)).toBeVisible()

    // Click proceed to booking (if service requires booking)
    const proceedButton = page.getByRole('link', { name: /proceed to booking/i })
    if (await proceedButton.isVisible()) {
      await proceedButton.click()
      
      // Should navigate to booking page
      await expect(page).toHaveURL(/.*booking/)
    }
  })

  test('should show booking details form for services', async ({ page }) => {
    await page.goto('/services')

    // Add service to cart
    const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first()
    await addToCartButton.click()

    // Open cart and proceed to booking
    await page.getByRole('button', { name: /cart/i }).click()
    
    const proceedButton = page.getByRole('link', { name: /proceed to booking/i })
    if (await proceedButton.isVisible()) {
      await proceedButton.click()
      
      // Check for booking form elements
      await expect(page.getByText(/booking details/i)).toBeVisible()
    }
  })
})

