import { expect } from '@playwright/test';
import { test } from '../src/fixtures/garagePageFixture.js';

test.describe('Garage page', () => {
  test.only('should add car to garage', async ({ userGaragePageWithStorage }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit('Porsche', 'Panamera', 100500);

    const { page } = userGaragePageWithStorage;
    await expect(page.locator('p', { hasText: 'Porsche Panamera' })).toBeVisible();
  });
});
