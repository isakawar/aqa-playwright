import { expect } from '@playwright/test';
import fs from 'fs';
import { test } from '../../../src/fixtures/userGaragePageAuth.js';
import APIClient from '../../../src/client/APIClient.js';
import { STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME } from '../../../src/data/constants/storageState.js';

test.describe('Cars', () => {
  test.describe('Edit existing car', () => {
    let brands;
    let client;
    let testUserData;
    let responseCreateCar;
    test.beforeAll(async () => {
      const readData = fs.readFileSync(`${STORAGE_STATE_USER_PATH}${STORAGE_STATE_FILE_NAME}`, 'utf-8');
      testUserData = JSON.parse(readData);
      client = await APIClient.authenticate(testUserData.email, testUserData.password);
      brands = await client.carController.getBrands();
      const responseDeletALlCars = await client.carController.deletAllUserCars();
    });

    test.beforeEach(async () => {
      responseCreateCar = await client.carController.createCar({
        carBrandId: 1,
        carModelId: 1,
        mileage: Math.floor(Math.random() * 100),
      });
      expect(responseCreateCar.status).toBe(201);
    });

    test('Edit existing car', async () => {
      const newCarData = {
        mileage: Math.floor(Math.random() * 100),
      };
      const responseEditCar = await client.carController.editCarById(responseCreateCar.data.data.id, newCarData);
      expect(responseEditCar.status).toBe(200);
      expect(responseEditCar.data.data).toEqual(expect.objectContaining(newCarData));
    });
  });
});
