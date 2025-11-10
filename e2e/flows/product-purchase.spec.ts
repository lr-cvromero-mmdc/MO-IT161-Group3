import { test, expect } from '@playwright/test'

test.describe('Product Purchase Flow', () => {
  test('should complete product-only purchase flow', async ({ page }) => {
    await page.goto('/services')

    // Switch to Products tab
    const productsTab = page.getByRole('button', { name: /products/i })
    await productsTab.click()

    // Wait for products to load
    await expect(page.getByText(/car shampoo/i).first()).toBeVisible({ timeout: 5000 })

    // Add product to cart
    const addToCartButtons = page.getByRole('button', { name: /add to cart/i })
    const firstProductButton = addToCartButtons.first()
    await firstProductButton.click()

    // Open cart modal
    const cartIcon = page.getByRole('button', { name: /cart/i })
    await cartIcon.click()

    // Verify product is in cart
    await expect(page.getByText(/car shampoo/i)).toBeVisible()

    // Click proceed to checkout
    const checkoutButton = page.getByRole('link', { name: /proceed to checkout/i })
    if (await checkoutButton.isVisible()) {
      await checkoutButton.click()
      
      // Should navigate to checkout page
      await expect(page).toHaveURL(/.*checkout/)
    }
  })

  test('should display product details in cart', async ({ page }) => {
    await page.goto('/services')

    // Switch to Products tab
    await page.getByRole('button', { name: /products/i }).click()

    // Add product
    await page.getByRole('button', { name: /add to cart/i }).first().click()

    // Open cart
    await page.getByRole('button', { name: /cart/i }).click()

    // Check product details are shown
    await expect(page.getByText(/car shampoo/i)).toBeVisible()
    await expect(page.getByText(/₱/i)).toBeVisible()
  })
})

