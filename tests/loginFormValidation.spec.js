import { expect, test } from '@playwright/test';
import RegistrationPopup from '../src/components/RegistrationPopup.js';
import WelcomePage from '../src/pageObject/WelcomePage.js';

let page;
let welcomePage;
let registrationPopup;
test.describe('Login form validation field Name', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    registrationPopup = new RegistrationPopup(page);
    await welcomePage.navigateToRegistrationPopup();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should show error message if Name is incorrect @prod', async () => {
    await registrationPopup.nameInput.fill('1234567890');
    await registrationPopup.nameInput.blur();

    await expect(registrationPopup.errorMessage).toBeVisible();
    await expect(registrationPopup.errorMessage).toHaveText('Name is invalid');
  });

  test('should show error message if Name is empty', async () => {
    await registrationPopup.nameInput.fill('');
    await registrationPopup.nameInput.blur();

    await expect(registrationPopup.errorMessage).toBeVisible();
    await expect(registrationPopup.errorMessage).toHaveText('Name required');
  });

  test('should show error message if Name length is more than 20 characters @prod', async () => {
    await registrationPopup.nameInput.fill('Name has to be from 2 to 20 characters long');
    await registrationPopup.nameInput.blur();

    await expect(registrationPopup.errorMessage).toBeVisible();
    await expect(registrationPopup.errorMessage).toHaveText('Name is invalidName has to be from 2 to 20 characters long');
  });

  test('should have red border color for invalid Name', async () => {
    await registrationPopup.nameInput.fill('1234567890');
    await registrationPopup.nameInput.blur();
    await registrationPopup.assertCheckThatFieldBorderColorIsRed();
  });

  test('should successfully fill in the Name field', async () => {
    await registrationPopup.nameInput.fill('Test');
    await registrationPopup.nameInput.blur();
    await expect(registrationPopup.errorMessage).not.toBeVisible();
  });
});

test.describe('Login form validation field Email', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    registrationPopup = new RegistrationPopup(page);
    await welcomePage.navigateToRegistrationPopup();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display "Email required" error for empty Email field', async () => {
    await registrationPopup.emailInput.fill('');
    await registrationPopup.emailInput.blur();
    await expect(registrationPopup.errorMessage).toHaveText('Email required');
  });

  test('should display "Email is incorrect" error for wrong data in Email field', async () => {
    await registrationPopup.emailInput.fill('invalid-email');
    await registrationPopup.emailInput.blur();

    await expect(registrationPopup.errorMessage).toBeVisible();
    await expect(registrationPopup.errorMessage).toHaveText('Email is incorrect');
    await registrationPopup.assertCheckThatFieldBorderColorIsRed();
  });
});

test.describe('Login form validation field Password', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    registrationPopup = new RegistrationPopup(page);
    await welcomePage.navigateToRegistrationPopup();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display "Password required" error for empty Password field @prod', async () => {
    await registrationPopup.passwordInput.fill('');
    await registrationPopup.passwordInput.blur();

    await expect(registrationPopup.errorMessage).toBeVisible();
    await expect(registrationPopup.errorMessage).toHaveText('Password required');
    await registrationPopup.assertCheckThatFieldBorderColorIsRed();
  });

  test('should display "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error for wrong data in Password field', async () => {
    await registrationPopup.passwordInput.fill('weakpassword');
    await registrationPopup.passwordInput.blur();

    await expect(registrationPopup.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await registrationPopup.assertCheckThatFieldBorderColorIsRed();
  });
});

test.describe('Login form validation field Re-enter password', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    registrationPopup = new RegistrationPopup(page);
    await welcomePage.navigateToRegistrationPopup();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display "Re-enter password required" error for empty Re-enter password field', async () => {
    await registrationPopup.repeatPasswordInput.fill('');
    await registrationPopup.repeatPasswordInput.blur();

    await expect(registrationPopup.errorMessage).toBeVisible();
    await expect(registrationPopup.errorMessage).toHaveText('Re-enter password required');
    await registrationPopup.assertCheckThatFieldBorderColorIsRed();
  });

  test('should display "Passwords do not match" error for mismatched passwords', async () => {
    await registrationPopup.passwordInput.fill('Password123');
    await registrationPopup.passwordInput.blur();
    await registrationPopup.repeatPasswordInput.fill('DifferentP123');
    await registrationPopup.repeatPasswordInput.blur();

    await expect(registrationPopup.errorMessage).toBeVisible();
    await expect(registrationPopup.errorMessage).toHaveText('Passwords do not match');
    await registrationPopup.assertCheckThatFieldBorderColorIsRed();
  });
});

test.describe('should successfully fill in the registration form', () => {
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.visit();
    registrationPopup = new RegistrationPopup(page);
    await welcomePage.navigateToRegistrationPopup();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should successfully fill in the registration form @prod', async () => {
    await registrationPopup.nameInput.fill('Vlad');
    await registrationPopup.lastNameInput.fill('Bilobrov');
    await registrationPopup.emailInput.fill('example@example.com');
    await registrationPopup.passwordInput.fill('Password123');
    await registrationPopup.repeatPasswordInput.fill('Password123');

    await expect(registrationPopup.errorMessage).not.toBeVisible();
    await expect(registrationPopup.submitButton).toBeEnabled();
  });
});
