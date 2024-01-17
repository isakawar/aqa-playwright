import { expect } from '@playwright/test';
import BaseController from './BaseController.js';

export default class UsersController extends BaseController {
  #DELETE_PATH = '/users'; // Path for delete account

  #GET_CURRENT_USER_PATH = '/users/current'; // Path for get current user data

  #GET_PROFILE_PATH = '/users/profile'; // Path for get profile data

  #EDIT_PROFILE_PATH = '/users/profile'; // Path for edit profile data

  constructor(jar) {
    super(jar);
  }

  async getCurrentUser() {
    const response = await this.client.get(this.#GET_CURRENT_USER_PATH);
    expect(response.status).toBe(200);
    return response.data;
  }

  async getProfile() {
    const response = await this.client.get(this.#GET_PROFILE_PATH);
    expect(response.status).toBe(200);
    return response.data;
  }

  async editProfile(requestBody) {
    const response = await this.client.put(this.#EDIT_PROFILE_PATH, requestBody);
    expect(response.status).toBe(200);
    return response.data;
  }

  async deleteAccount() {
    const response = await this.client.delete(this.#DELETE_PATH);
    expect(response.status).toBe(200);
  }
}
