// tests/e2e/example.spec.ts — ví dụ test cho app hiện tại
import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Create Next App/);
});

test('homepage displays Hello World heading', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /hello world/i }),
  ).toBeVisible();
});
