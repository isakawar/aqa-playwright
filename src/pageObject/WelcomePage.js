import BasePage from './BasePage.js';
import SignInPage from '../components/SignInPopup.js';
import RegistrationPopup from '../components/RegistrationPopup.js';

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(page, '/');
  }

  async navigateToRegistrationPopup() {
    const signInPopup = new SignInPage(this.page);
    await this.page.click(signInPopup.signInButtonLocator);
    await this.page.click(signInPopup.registerButtonLocator);
  }
}
