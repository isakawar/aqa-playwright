import { test as setup, expect } from '@playwright/test';
import UserDataGenerator from '../../src/utils/UserDataGenerator.js';
import APIClient from '../../src/client/APIClient.js';

setup('Generate data for new user and register new user', async () => {
  const newtestUserData = UserDataGenerator.generateRandomUserData();
  const apiClient = new APIClient();
  const responsRegister = await apiClient.authController.register({
    name: newtestUserData.name,
    lastName: newtestUserData.lastName,
    email: newtestUserData.email,
    password: newtestUserData.password,
    repeatPassword: newtestUserData.repeatPassword,
  });
  expect(responsRegister.status).toBe(201);
});
