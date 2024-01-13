import { expect, request } from '@playwright/test';
import { test } from '../../src/fixtures/userGaragePageAuth.js';
import { userGarage } from '../../src/fixtures/carsInGarage.js';

test.describe('Replace json body', () => {
  test('should be able to create a car (modify response)', async ({ userGaragePage }) => {
    const { page } = userGaragePage;

    await page.route('/api/cars', async (route) => {
      await route.fulfill({
        body: JSON.stringify(userGarage),
      });
    });

    await userGaragePage.visit();
    const countItems = await userGaragePage.getCountGarageItems();
    const porscheIconLocator = await page.locator('[alt="911"]');
    const srcAttributeValue = await porscheIconLocator.getAttribute('src');

    await expect(srcAttributeValue).toEqual(expect.stringContaining('porsche.png'));
    await expect(countItems).toEqual(3);
  });
});
