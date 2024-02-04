import { expect } from '@playwright/test';
import fs from 'fs';
import { test } from '../../../src/fixtures/userGaragePageAuth.js';
import APIClient from '../../../src/client/APIClient.js';
import { STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME } from '../../../src/data/constants/storageState.js';
import { carBrandsFixture } from '../../../src/fixtures/carBrandsFixture.js';
import { carModelsFixture } from '../../../src/fixtures/carModelsFixture.js';

test.describe('Cars', () => {
  test.describe('Get car', () => {
    let brands;
    let client;
    let testUserData;
    let responseCreateCar;
    test.beforeAll(async () => {
      const readData = fs.readFileSync(`${STORAGE_STATE_USER_PATH}${STORAGE_STATE_FILE_NAME}`, 'utf-8');
      testUserData = JSON.parse(readData);
      client = await APIClient.authenticate(testUserData.email, testUserData.password);
      brands = await client.carController.getBrands();

      responseCreateCar = await client.carController.createCar({
        carBrandId: 1,
        carModelId: 1,
        mileage: Math.floor(Math.random() * 100),
      });
      expect(responseCreateCar.status).toBe(201);
    });

    test('Gets car brands', async () => {
      const responseGetCar = await client.carController.getBrands();
      expect(responseGetCar.status).toBe(200);
      expect(responseGetCar.data.data).toMatchObject(carBrandsFixture);
    });

    test('Gets car brand by id', async () => {
      const responseGetCar = await client.carController.getBrandById(1);
      expect(responseGetCar.status).toBe(200);
      expect(responseGetCar.data.data).toMatchObject(carBrandsFixture[0]);
    });

    test('Gets car models', async () => {
      const responseGetCar = await client.carController.getModels();
      expect(responseGetCar.status).toBe(200);
      expect(responseGetCar.data.data).toMatchObject(carModelsFixture);
    });

    test('Gets car model by id', async () => {
      const responseGetCar = await client.carController.getModelById(1);
      expect(responseGetCar.status).toBe(200);
      expect(responseGetCar.data.data).toMatchObject(carModelsFixture[0]);
    });

    test('Get current user cars', async () => {
      const responseGetCar = await client.carController.getCurrentUserCars();
      expect(responseGetCar.status).toBe(200);
      expect(responseGetCar.data.data[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          carBrandId: responseCreateCar.data.data.carBrandId,
          carModelId: responseCreateCar.data.data.carModelId,
          mileage: responseCreateCar.data.data.mileage,
          initialMileage: responseCreateCar.data.data.initialMileage,
          updatedMileageAt: expect.any(String),
          carCreatedAt: expect.any(String),
          brand: responseCreateCar.data.data.brand,
          model: responseCreateCar.data.data.model,
          logo: responseCreateCar.data.data.logo,
        }),
      );
    });

    test('Gets current user car by id', async () => {
      const responseGetCar = await client.carController.getUserCarById(responseCreateCar.data.data.id);
      expect(responseGetCar.status).toBe(200);
      expect(responseGetCar.data.data).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          carBrandId: responseCreateCar.data.data.carBrandId,
          carModelId: responseCreateCar.data.data.carModelId,
          mileage: responseCreateCar.data.data.mileage,
          initialMileage: responseCreateCar.data.data.initialMileage,
          updatedMileageAt: expect.any(String),
          carCreatedAt: expect.any(String),
          brand: responseCreateCar.data.data.brand,
          model: responseCreateCar.data.data.model,
          logo: responseCreateCar.data.data.logo,
        }),
      );
    });
  });
});
