import { expect } from '@playwright/test';
import fs from 'fs';
import { test } from '../../../src/fixtures/userGaragePageAuth.js';
import { carCreateNegativeFixtures } from '../../../src/fixtures/carCreateNegativeFixtures.js';
import APIClient from '../../../src/client/APIClient.js';
import { STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME } from '../../../src/data/constants/storageState.js';

test.describe('Cars', () => {
  test.describe('Create car', () => {
    let brands;
    let client;
    let testUserData;

    test.beforeAll(async () => {
      const readData = fs.readFileSync(`${STORAGE_STATE_USER_PATH}${STORAGE_STATE_FILE_NAME}`, 'utf-8');
      testUserData = JSON.parse(readData);
      client = await APIClient.authenticate(testUserData.email, testUserData.password);
      brands = await client.carController.getBrands();
      brands = brands.data.data;
    });

    test.afterEach(async () => {
      const responseDeletALlCars = await client.carController.deletAllUserCars();
    });

    test.describe('Positive cases', () => {
      test('Create car', async () => {
        for (const brand of brands) {
          await test.step(`Create car brand ${brand.title}`, async () => {
            const modelsResponse = await client.carController.getModelsByBrandId(brand.id);
            const models = modelsResponse.data.data;

            for (const model of models) {
              await test.step(`Model : ${model.title}`, async () => {
                const createCarReqBody = {
                  carBrandId: brand.id,
                  carModelId: model.id,
                  mileage: Math.floor(Math.random() * 100),
                };
                const createCarResponse = await client.carController.createCar(createCarReqBody);

                expect(createCarResponse.status, 'Status code should be valid').toBe(201);
                expect(createCarResponse.data.data, 'Response data should contain all properties for a new car').toEqual(
                  expect.objectContaining({
                    id: expect.any(Number),
                    carBrandId: brand.id,
                    carModelId: model.id,
                    mileage: expect.any(Number),
                    initialMileage: expect.any(Number),
                    updatedMileageAt: expect.any(String),
                    carCreatedAt: expect.any(String),
                    brand: brand.title,
                    model: model.title,
                    logo: expect.stringMatching(/\.png$/),
                  }),
                );
              });
            }
          });
        }
      });
    });

    test.describe('Negative cases', () => {
      test.afterEach(async () => {
        const responseDeletALlCars = await client.carController.deletAllUserCars();
      });

      for (const { title, inputData, expectedData } of carCreateNegativeFixtures) {
        test(title, async () => {
          const createCarResponse = await client.carController.createCar(inputData);

          expect(createCarResponse.status, 'Status code should be valid').toBe(expectedData.statusCode);
          expect(createCarResponse.data, 'Response data should contain all properties for a new car').toEqual(expectedData.data);
        });
      }
    });
  });
});
