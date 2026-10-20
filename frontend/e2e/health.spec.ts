import { test, expect } from '@playwright/test'

test('home page shows healthy API status', async ({ page }) => {
  await page.route('**/api/health', (route) =>
    route.fulfill({ json: { status: 'ok', time: '2026-01-01T00:00:00Z' } }),
  )

  await page.goto('/')

  await expect(page.getByTestId('health')).toHaveAttribute('data-status', 'ok')
  await expect(page.getByTestId('health')).toContainText('healthy')
})

test('home page shows unavailable when API is down', async ({ page }) => {
  await page.route('**/api/health', (route) => route.fulfill({ status: 500 }))

  await page.goto('/')

  await expect(page.getByTestId('health')).toHaveAttribute('data-status', 'down')
})
