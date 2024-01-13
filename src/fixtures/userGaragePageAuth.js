import { request, test as base } from '@playwright/test';
import GaragePage from '../pageObject/GaragePage.js';
import { STORAGE_STATE_USER_PATH } from '../data/constants/storageState.js';

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
    const client = await request.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    const userCars = await client.get('/api/cars');
    const body = await userCars.json();
    await Promise.all(
      body.data.map((car) => client.delete(`/api/cars/${car.id}`)),
    );
    await ctx.close();
  },

  userApiClient: async ({ browser }, use) => {
    const client = await request.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    // Usage
    await use(client);

    const userCars = await client.get('/api/cars');
    const body = await userCars.json();
    await Promise.all(
      body.data.map((car) => client.delete(`/api/cars/${car.id}`)),
    );

    await client.dispose();
  },
});
