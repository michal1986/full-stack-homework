import { test, expect } from '@playwright/test';

test.describe('Numbers Page', () => {
  test('should add and display a number', async ({ page }) => {
    await page.goto('/numbers');

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const numberString = randomNumber.toString();

    await page.getByLabel('Enter a number').fill(numberString);
    await page.getByRole('button', { name: 'Add Number' }).click();

    const table = page.getByRole('table');
    await expect(table).toBeVisible();
    await expect(table).toContainText(numberString);
  });
}); 