import { CookieJar } from 'tough-cookie';
import { expect } from '@playwright/test';
import CarController from '../controllers/CarController.js';
import AuthController from '../controllers/AuthController.js';
import UsersController from '../controllers/UsersController.js';

export default class APIClient {
  constructor(jar) {
    this.authController = new AuthController(jar);
    this.carController = new CarController(jar);
    this.usersController = new UsersController(jar);
  }

  static async authenticate(email, password) {
    const jar = new CookieJar();
    const authController = new AuthController(jar);
    const res = await authController.login({
      email,
      password,
      remember: false,
    });
    expect(res.status).toBe(200);

    return new APIClient(jar);
  }
}
