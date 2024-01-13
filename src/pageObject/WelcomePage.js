import BasePage from './BasePage.js';
import SignInPopup from '../components/SignInPopup.js';
import RegistrationPopup from '../components/RegistrationPopup.js';

export default class WelcomePage extends BasePage {
  constructor(page) {
    super(page, '/');
  }

  async navigateToRegistrationPopup() {
    const signInPopup = new SignInPopup(this.page);
    await this.page.click(signInPopup.signInButtonLocator);
    await this.page.click(signInPopup.registerButtonLocator);
  }

  async clickSignInButton() {
    const signInPopup = new SignInPopup(this.page);
    await this.page.click(signInPopup.signInButtonLocator);
    return signInPopup;
  }
}
