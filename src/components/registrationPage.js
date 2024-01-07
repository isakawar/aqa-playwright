import { expect } from '@playwright/test';
import BasePage from '../pageObject/basePage';

export default class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/';
    this.locators = {
      name: '#signupName',
      email: '#signupEmail',
      lastName: '#signupLastName',
      password: '#signupPassword',
      repeatPassword: '#signupRepeatPassword',
      submitButton: '.modal-footer .btn.btn-primary',
      errorMessage: '.invalid-feedback',
    };
  }

  async fillFieldByLocator(locator, value) {
    const element = await this.page.locator(locator).first();
    await element.fill(value);
    await element.blur();
  }

  async assertCheckVisible() {
    const element = await this.page.locator(this.locators.errorMessage);
    await expect(element).toBeVisible();
  }

  async assertErrorMessageText(expectedText) {
    const element = await this.page.locator(this.locators.errorMessage);
    await expect(element).toHaveText(expectedText);
  }

  async assertCheckFieldBorderColor(locator, expectedColor) {
    const element = await this.page.locator(locator);
    await expect(element).toHaveCSS('border-color', expectedColor);
  }

  assertErrorMessageVisible() {
    const element = this.page.locator(this.locators.errorMessage);
    expect(element).toBeVisible();
  }

  async assertErrorMessageNotVisible() {
    const errorMessage = await this.page.locator(this.locators.errorMessage);
    await expect(errorMessage).not.toBeVisible();
  }

  async checkEnabledSubmitButton() {
    const submitButton = await this.page.locator(this.locators.submitButton);
    await expect(submitButton).toBeEnabled();
  }
}
