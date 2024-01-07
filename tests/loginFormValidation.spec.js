import { test } from '@playwright/test';
import RegistrationPage from '../src/components/registrationPage.js';

let page;
let registrationPage;
test.describe('Login form validation field Name', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    registrationPage = new RegistrationPage(page);
    await registrationPage.visit();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should show error message if Name is incorrect', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.name, '1234567890');
    await registrationPage.assertErrorMessageVisible();
    await registrationPage.assertErrorMessageText('Name is invalid');
  });

  test('should show error message if Name is empty', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.name, '');
    await registrationPage.assertErrorMessageVisible();
    await registrationPage.assertErrorMessageText('Name required');
  });

  test('should show error message if Name length is more than 20 characters', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.name, 'aaaaaaaaaaaaaaaaaaaaa');
    await registrationPage.assertErrorMessageVisible();
    await registrationPage.assertErrorMessageText('Name has to be from 2 to 20 characters long');
  });

  test('should have red border color for invalid Name', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.name, '1234567890');
    await registrationPage.assertCheckFieldBorderColor(registrationPage.locators.name, 'rgb(220, 53, 69)');
  });

  test('should successfully fill in the Name field', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.name, 'Test');
    await registrationPage.assertErrorMessageNotVisible();
  });
});

test.describe('Login form validation field Email', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    registrationPage = new RegistrationPage(page);
    await registrationPage.visit();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display "Email required" error for empty Email field', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.email, '');
    await registrationPage.assertErrorMessageText('Email required');
  });

  test('should display "Email is incorrect" error for wrong data in Email field', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.email, 'invalid-email');
    await registrationPage.assertCheckVisible();
    await registrationPage.assertErrorMessageText('Email is incorrect');
    await registrationPage.assertCheckFieldBorderColor(registrationPage.locators.email, 'rgb(220, 53, 69)');
  });
});

test.describe('Login form validation field Password', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    registrationPage = new RegistrationPage(page);
    await registrationPage.visit();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display "Password required" error for empty Password field', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.password, '');
    await registrationPage.assertCheckVisible();
    await registrationPage.assertErrorMessageText('Password required');
    await registrationPage.assertCheckFieldBorderColor(registrationPage.locators.password, 'rgb(220, 53, 69)');
  });

  test('should display "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error for wrong data in Password field', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.password, 'weakpassword');
    await registrationPage.assertErrorMessageText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await registrationPage.assertCheckFieldBorderColor(registrationPage.locators.password, 'rgb(220, 53, 69)');
  });
});

test.describe('Login form validation field Re-enter password', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    registrationPage = new RegistrationPage(page);
    await registrationPage.visit();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display "Re-enter password required" error for empty Re-enter password field', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.repeatPassword, '');
    await registrationPage.assertErrorMessageText('Re-enter password required');
    await registrationPage.assertCheckFieldBorderColor(registrationPage.locators.repeatPassword, 'rgb(220, 53, 69)');
  });

  test('should display "Passwords do not match" error for mismatched passwords', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.password, 'Password123');
    await registrationPage.fillFieldByLocator(registrationPage.locators.repeatPassword, 'DifferentP123');
    await registrationPage.assertErrorMessageText('Passwords do not match');
    await registrationPage.assertCheckFieldBorderColor(registrationPage.locators.repeatPassword, 'rgb(220, 53, 69)');
  });
});

test.describe('should successfully fill in the registration form', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    registrationPage = new RegistrationPage(page);
    await registrationPage.visit();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should successfully fill in the registration form', async () => {
    await registrationPage.navigateToRegistrationPage();
    await registrationPage.fillFieldByLocator(registrationPage.locators.name, 'Vlad');
    await registrationPage.fillFieldByLocator(registrationPage.locators.lastName, 'Bilobrov');
    await registrationPage.fillFieldByLocator(registrationPage.locators.email, 'example@example.com');
    await registrationPage.fillFieldByLocator(registrationPage.locators.password, 'Password123');
    await registrationPage.fillFieldByLocator(registrationPage.locators.repeatPassword, 'Password123');

    await registrationPage.assertErrorMessageNotVisible();
    await registrationPage.checkEnabledSubmitButton();
  });
});
