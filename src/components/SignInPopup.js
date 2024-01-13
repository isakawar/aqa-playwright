import GaragePage from '../pageObject/GaragePage';

export default class SignInPopup {
  constructor(page) {
    this.page = page;
    this.container = page.locator('app-signin-modal');
    this.signInButtonLocator = '.btn.btn-outline-white.header_signin';
    this.registerButtonLocator = '.modal-footer.d-flex.justify-content-between .btn.btn-link';
    this.submitButtonLocator = '.modal-footer.d-flex.justify-content-between .btn.btn-primary';
    this.emailInputLocator = '#signinEmail';
    this.passwordInputLocator = '#signinPassword';
  }

  async fill(email, password) {
    await this.page.locator(this.emailInputLocator).fill(email);
    await this.page.locator(this.passwordInputLocator).fill(password);
  }

  async loginWithUi(email, password) {
    await this.fill(email, password);
    await this.page.locator(this.submitButtonLocator).click();
    return new GaragePage(this.page);
  }
}
