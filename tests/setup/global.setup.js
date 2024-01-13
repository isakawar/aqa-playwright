import { test as setup, expect, request } from '@playwright/test';
import WelcomePage from '../../src/pageObject/WelcomePage.js';
import { USERS } from '../../src/data/users.js';
import { STORAGE_STATE_USER_PATH } from '../../src/data/constants/storageState.js';

let page;
setup('login as user and save storage state', async ({ request }) => {
  await request.post('/api/auth/signin', {
    data: {
      email: USERS.TEST_USER.email,
      password: USERS.TEST_USER.password,
      remember: false,
    },
  });
  await request.storageState({
    path: STORAGE_STATE_USER_PATH,
  });
});
