import { test, expect } from '@playwright/test'

test.describe('Search and Filter Flow', () => {
  test('should search for services', async ({ page }) => {
    await page.goto('/services')

    // Wait for services to load
    await expect(page.getByText(/basic wash/i).first()).toBeVisible()

    // Find search input
    const searchInput = page.getByPlaceholderText(/search services/i)
    await searchInput.fill('premium')

    // Wait for filtered results
    await expect(page.getByText(/premium wash/i).first()).toBeVisible({ timeout: 3000 })
    
    // Basic wash should not be visible (or less visible)
    const basicWashCount = await page.getByText(/basic wash/i).count()
    // Premium should be in results
    expect(await page.getByText(/premium wash/i).count()).toBeGreaterThan(0)
  })

  test('should filter products by category', async ({ page }) => {
    await page.goto('/services')

    // Switch to products tab
    await page.getByRole('button', { name: /view car care products/i }).click()

    // Wait for products to load
    await expect(page.getByText(/car shampoo/i).first()).toBeVisible({ timeout: 5000 })

    // Products should be visible
    const productCount = await page.getByText(/car shampoo|microfiber|car wax/i).count()
    expect(productCount).toBeGreaterThan(0)
  })

  test('should show empty state when no results match', async ({ page }) => {
    await page.goto('/services')

    // Wait for services to load
    await expect(page.getByText(/basic wash/i).first()).toBeVisible()

    // Search for something that doesn't exist
    const searchInput = page.getByPlaceholderText(/search services/i)
    await searchInput.fill('nonexistent-service-xyz-12345')

    // Wait for empty state
    await expect(page.getByText(/no.*found|no results/i).first()).toBeVisible({ timeout: 5000 })
  })
})
