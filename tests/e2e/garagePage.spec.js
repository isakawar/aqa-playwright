import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/userGaragePageAuth.js';

test.describe('Garage page', () => {
  test('should add car to garage', async ({ userGaragePage }) => {
    const popup = await userGaragePage.openAddCarPopup();
    await popup.fillAndSubmit('Porsche', 'Panamera', 100500);

    const { page } = userGaragePage;
    await expect(page.locator('p', { hasText: 'Porsche Panamera' })).toBeVisible();
  });
});
