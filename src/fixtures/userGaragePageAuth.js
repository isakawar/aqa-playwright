import { request, test as base } from '@playwright/test';
import axios from 'axios';
import GaragePage from '../pageObject/GaragePage.js';
import { STORAGE_STATE_USER_PATH } from '../data/constants/storageState.js';
import { USERS } from '../data/users.js';

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

  userClientWithCookie: async ({ browser }, use) => {
    let client = axios.create({
      baseURL: 'https://qauto.forstudy.space/api',
      headers: {},
    });
    const signInResponse = await client.post('/auth/signin', {
      email: USERS.TEST_USER.email,
      password: USERS.TEST_USER.password,
      remember: false,
    });
    const cookie = signInResponse.headers['set-cookie'][0].split(';')[0];
    client = axios.create({
      baseURL: 'https://qauto.forstudy.space/api',
      headers: {
        cookie,
      },
      validateStatus: () => true,
    });
    // Usage
    await use(client);

    // Clean up
    const userCars = await client.get('/cars');
    await Promise.all(
      userCars.data.data.map((car) => client.delete(`/cars/${car.id}`)),
    );
  },
});
