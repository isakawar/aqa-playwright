import { test as base } from '@playwright/test';
import GaragePage from '../pageObject/GaragePage.js';
import { STORAGE_STATE_USER_PATH } from '../data/constants/storageState.js';
import { deleteCarsIfCountGreaterThanZero } from '../utils/deleteCars.js';

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    const page = await ctx.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.visit();

    // Usage
    await use(garagePage);

    // Clean up
    const count = await garagePage.getCountGarageItems();
    await deleteCarsIfCountGreaterThanZero(count, page);

    await ctx.close();
  },
});
