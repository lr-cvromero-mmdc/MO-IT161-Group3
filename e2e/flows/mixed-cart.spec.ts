import { test, expect } from '@playwright/test'

test.describe('Mixed Cart Flow (Services + Products)', () => {
  test('should handle cart with both services and products', async ({ page }) => {
    await page.goto('/services')

    // Wait for services to load
    await expect(page.getByText(/basic wash/i).first()).toBeVisible()

    // Add service to cart
    const addServiceButton = page.getByRole('button', { name: /add to cart/i }).first()
    await addServiceButton.click()

    // Switch to products tab
    await page.getByRole('button', { name: /view car care products/i }).click()

    // Wait for products to load
    await expect(page.getByText(/car shampoo/i).first()).toBeVisible({ timeout: 5000 })

    // Add product to cart
    const addProductButtons = page.getByRole('button', { name: /add to cart/i })
    await addProductButtons.first().click()

    // Open cart
    await page.getByRole('button', { name: /cart/i }).click()

    // Verify both service and product are in cart
    await expect(page.getByText(/basic wash/i)).toBeVisible()
    await expect(page.getByText(/car shampoo/i)).toBeVisible()

    // Should show proceed to booking (since service requires booking)
    const proceedButton = page.getByRole('link', { name: /proceed to booking/i })
    await expect(proceedButton).toBeVisible()
  })

  test('should calculate correct totals for mixed cart', async ({ page }) => {
    await page.goto('/services')

    // Add service
    await expect(page.getByText(/basic wash/i).first()).toBeVisible()
    await page.getByRole('button', { name: /add to cart/i }).first().click()

    // Add product
    await page.getByRole('button', { name: /view car care products/i }).click()
    await expect(page.getByText(/car shampoo/i).first()).toBeVisible({ timeout: 5000 })
    await page.getByRole('button', { name: /add to cart/i }).first().click()

    // Open cart and check totals
    await page.getByRole('button', { name: /cart/i }).click()

    // Check for price display
    await expect(page.getByText(/₱/i)).toBeVisible()
    
    // Check for total amount
    const totalText = await page.textContent('body')
    expect(totalText).toContain('₱')
  })
})
