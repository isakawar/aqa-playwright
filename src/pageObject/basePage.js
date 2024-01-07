export default class BasePage {
  constructor(page) {
    this.page = page;
    this.url = '/';
    this.signInButtonLocator = '.btn.btn-outline-white.header_signin';
    this.registerButtonLocator = '.modal-footer.d-flex.justify-content-between .btn.btn-link';
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async navigateToRegistrationPage() {
    await this.page.click(this.signInButtonLocator);
    await this.page.click(this.registerButtonLocator);
  }
}
