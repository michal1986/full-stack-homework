import { test, expect } from '@playwright/test';

test.describe('Grades Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/grades');
  });

  test('should display grades table and filters', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Grades' })).toBeVisible();
    
    // Check form elements
    await expect(page.getByLabel('Class')).toBeVisible();
    await expect(page.getByLabel('Grade')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Grade' })).toBeVisible();

    // Check filter buttons
    await expect(page.getByRole('button', { name: 'Show All Data' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Class Averages' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Passing Average' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'High Performing' })).toBeVisible();
  });

  test('should add a new grade', async ({ page }) => {
    // Fill in the form
    await page.getByLabel('Class').click();
    await page.getByRole('option', { name: 'MATH' }).click();
    await page.getByLabel('Grade').fill('5');

    // Click the button and wait for responses with timeouts
    const addButton = page.getByRole('button', { name: 'Add Grade' });
    await addButton.click();


    // Wait for success message with timeout
    await expect(page.getByText('Grade added successfully!')).toBeVisible({ timeout: 5000 });

    // Wait for table to contain the new grade with timeout
    const table = page.getByRole('table');
    await expect(table).toBeVisible({ timeout: 5000 });
    
    // Verify the new grade is in the table
    const tableContent = await table.textContent();
    expect(tableContent).toContain('MATH');
    expect(tableContent).toContain('5');
  });
}); 