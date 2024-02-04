import BaseController from './BaseController.js';

export default class AuthController extends BaseController {
  #LOGIN_PATH = '/auth/signin';

  #LOGOUT_PATH = '/auth/logout';

  #RESET_PASSWORD_PATH = '/auth/resetPassword';

  #REGISTER_PATH = '/auth/signup';

  constructor(jar) {
    super(jar);
  }

  /**
   * @param {Object} requestBody - Object containing data for authentication.
   *                             - Mandatory fields: email (string), password (string).
   */
  async login(requestBody) {
    return this.client.post(this.#LOGIN_PATH, requestBody);
  }

  /**
   * @param {Object} requestBody - Object containing data for registration.
   *                             - Mandatory fields: name (string), lastName (string),
   *                               email (string), password (string), repeatPassword (string).
   */
  async register(requestBody) {
    return this.client.post(this.#REGISTER_PATH, requestBody);
  }

  async logout() {
    return this.client.get(this.#LOGOUT_PATH);
  }

  /**
   * @param {Object} requestBody - Object containing data for reset password.
   *                            - Mandatory fields: email (string).
   */
  async resetPassword(requestBody) {
    return this.client.post(this.#RESET_PASSWORD_PATH, requestBody);
  }
}
