import { test, expect } from '@playwright/test';

// Helper function to navigate to the registration pop-up
async function navigateToRegistrationPage(page) {
  await page.click('.btn.btn-outline-white.header_signin');
  await page.getByRole('button', { name: 'Registration' }).click();
}

const locators = {
  name: '#signupName',
  lastName: '#signupLastName',
  email: '#signupEmail',
  password: '#signupPassword',
  repeatPassword: '#signupRepeatPassword',
  submitButton: '.modal-footer .btn.btn-primary',
};

test.describe('Login form validation field Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show error message if Name is incorrect', async ({ page }) => {
    await navigateToRegistrationPage(page);

    const { name } = locators;
    const fieldName = page.locator(name);
    const errorMessageName = await page.locator('.form-group:first-of-type .invalid-feedback');

    await fieldName.fill('1234567890');
    await fieldName.blur();

    await expect(errorMessageName).toBeVisible();
    await expect(errorMessageName).toHaveText('Name is invalid');
  });

  test('should show error message if Name is empty', async ({ page }) => {
    await navigateToRegistrationPage(page);

    const { name } = locators;
    const fieldName = page.locator(name);
    const errorMessageName = await page.locator('.form-group:first-of-type .invalid-feedback');

    await fieldName.fill('');
    await fieldName.blur();

    await expect(errorMessageName).toBeVisible();
    await expect(errorMessageName).toHaveText('Name required');
  });

  test('should show error message if Name length is more than 20 characters', async ({ page }) => {
    await navigateToRegistrationPage(page);

    const { name } = locators;
    const fieldName = page.locator(name);
    const errorMessageName = await page.locator('.form-group:first-of-type .invalid-feedback');

    await fieldName.fill('aaaaaaaaaaaaaaaaaaaaa');
    await fieldName.blur();

    await expect(errorMessageName).toBeVisible();
    await expect(errorMessageName).toHaveText('Name has to be from 2 to 20 characters long');
  });

  test('should have red border color for invalid Name', async ({ page }) => {
    await navigateToRegistrationPage(page);

    const { name } = locators;
    const fieldName = page.locator(name);

    await fieldName.fill('1234567890');
    await fieldName.blur();

    await expect(fieldName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should successfully fill in the Name field', async ({ page }) => {
    await navigateToRegistrationPage(page);

    const { name } = locators;
    const fieldName = page.locator(name);

    await fieldName.fill('Test');
    await fieldName.blur();

    await expect(page.locator('.form-group:first-of-type .invalid-feedback')).not.toBeVisible();
  });
});

test.describe('Login form validation field Email', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display "Email required" error for empty Email field', async ({ page }) => {
    const { email } = locators;
    const emailField = page.locator(email);
    const errorMessage = await page.locator('.invalid-feedback');

    await navigateToRegistrationPage(page);

    await emailField.fill('');
    await emailField.blur();

    await expect(errorMessage).toHaveText('Email required');
  });

  test('should display "Email is incorrect" error for wrong data in Email field', async ({ page }) => {
    const { email } = locators;
    const emailField = page.locator(email);

    await navigateToRegistrationPage(page);

    await emailField.fill('invalid-email');
    await emailField.blur();
    const errorMessage = await page.locator('.invalid-feedback');
    await expect(emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(errorMessage).toHaveText('Email is incorrect');
  });
});

test.describe('Login form validation field Password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await navigateToRegistrationPage(page);
  });

  test('should display "Password required" error for empty Password field', async ({ page }) => {
    const { password } = locators;
    const passwordField = page.locator(password);
    const errorMessage = await page.locator('.invalid-feedback');

    await passwordField.click();
    await passwordField.blur();

    await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(errorMessage).toHaveText('Password required');
  });

  test('should display "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error for wrong data in Password field', async ({ page }) => {
    const { password } = locators;
    const passwordField = page.locator(password);
    const errorMessage = await page.locator('.invalid-feedback');

    await passwordField.fill('weakpassword');
    await passwordField.blur();
    await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });
});

test.describe('Login form validation field Re-enter password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await navigateToRegistrationPage(page);
  });

  test('should display "Re-enter password required" error for empty Re-enter password field', async ({ page }) => {
    const { repeatPassword } = locators;
    const reenterPasswordField = page.locator(repeatPassword);

    await reenterPasswordField.click();
    await reenterPasswordField.blur();

    const errorMessage = await page.locator('.invalid-feedback');
    await expect(errorMessage).toHaveText('Re-enter password required');
  });

  test('should display "Passwords do not match" error for mismatched passwords', async ({ page }) => {
    const { password, repeatPassword } = locators;
    const passwordField = page.locator(password);
    const reenterPasswordField = page.locator(repeatPassword);

    await passwordField.fill('Password123');
    await reenterPasswordField.fill('DifferentP123');
    await reenterPasswordField.blur();

    const errorMessage = await page.locator('.invalid-feedback');
    await expect(errorMessage).toHaveText('Passwords do not match');
  });
});

test.describe.only('should successfully fill in the registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await navigateToRegistrationPage(page);
  });

  test.only('should successfully fill in the registration form', async ({ page }) => {
    const {
      name, lastName, email, password, repeatPassword, submitButton,
    } = locators;
    const nameField = page.locator(name);
    const lastNameField = page.locator(lastName);
    const emailField = page.locator(email);
    const passwordField = page.locator(password);
    const reenterPasswordField = page.locator(repeatPassword);
    const submitButtonLocator = page.locator(submitButton);
    const errorMessage = await page.locator('.invalid-feedback');

    await nameField.fill('Vlad');
    await lastNameField.fill('Bilobrov');
    await emailField.fill('example@example.com');
    await passwordField.fill('Password123');
    await reenterPasswordField.fill('Password123');
    await reenterPasswordField.blur();

    await expect(submitButtonLocator).toBeEnabled();
    await expect(errorMessage).not.toBeVisible();
  });
});
