import { test as setup, expect } from '@playwright/test';
import WelcomePage from '../../src/pageObject/WelcomePage.js';
import { USERS } from '../../src/data/users.js';
import { STORAGE_STATE_USER_PATH } from '../../src/data/constants/storageState.js';

let page;
setup('login as user and save storage state', async ({ browser }) => {
  page = await browser.newPage();
  const welcomePage = new WelcomePage(page);
  await welcomePage.visit();
  const signPopup = await welcomePage.clickSignInButton();
  const garagePage = await signPopup.loginWithUi(USERS.TEST_USER.email, USERS.TEST_USER.password);
  await expect(garagePage.addCarButton).toBeVisible();

  await page.context().storageState({
    path: STORAGE_STATE_USER_PATH,
  });
});
