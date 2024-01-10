import { expect } from '@playwright/test';
import BasePage from '../pageObject/BasePage.js';

export default class RegistrationPopup {
  constructor(page) {
    this.nameInput = page.locator('#signupName');
    this.emailInput = page.locator('#signupEmail');
    this.lastNameInput = page.locator('#signupLastName');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.submitButton = page.locator('.modal-footer .btn.btn-primary');
    this.errorMessage = page.locator('.invalid-feedback');
    this.signInButtonLocator = '.btn.btn-outline-white.header_signin';
    this.registerButtonLocator = '.modal-footer.d-flex.justify-content-between .btn.btn-link';
  }

  async assertCheckThatFieldBorderColorIsRed() {
    await expect(this.errorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }
}
