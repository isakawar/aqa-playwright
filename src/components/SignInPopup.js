export default class SignInPopup {
  constructor(page) {
    this.container = page.locator('app-signin-modal');
    this.signInButtonLocator = '.btn.btn-outline-white.header_signin';
    this.registerButtonLocator = '.modal-footer.d-flex.justify-content-between .btn.btn-link';
  }
}
