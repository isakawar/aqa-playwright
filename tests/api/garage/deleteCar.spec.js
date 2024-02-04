import { expect } from '@playwright/test';
import fs from 'fs';
import { test } from '../../../src/fixtures/userGaragePageAuth.js';
import { carCreateNegativeFixtures } from '../../../src/fixtures/carCreateNegativeFixtures.js';
import APIClient from '../../../src/client/APIClient.js';
import { STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME } from '../../../src/data/constants/storageState.js';

test.describe('Cars', () => {
  test.describe('Delete existing car', () => {
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

    test('Delete existing car', async () => {
      const responseDeleteCar = await client.carController.deleteCarById(responseCreateCar.data.data.id);
      expect(responseDeleteCar.status).toBe(200);
      expect(responseDeleteCar.data.status).toBe('ok');
      expect(responseDeleteCar.data.data.carId).toEqual(responseCreateCar.data.data.id);
    });
  });
});
