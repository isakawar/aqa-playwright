import { expect } from '@playwright/test';
import { test } from '../../../src/fixtures/userGaragePageAuth.js';
import { getBrands } from '../../../src/fixtures/carsGetData.js';
import { carCreateNegativeFixtures } from '../../../src/fixtures/carCreateNegativeFixtures.js';

test.describe('Cars', () => {
  test.describe('Create car', () => {
    let brands;

    test.beforeAll(async () => {
      brands = await getBrands();
    });

    test.describe('Positive cases', () => {
      test('Create car', async ({ userClientWithCookie }) => {
        for (const brand of brands) {
          await test.step(`Create car brand ${brand.title}`, async () => {
            const modelsResponse = await userClientWithCookie.get(`/cars/models?carBrandId=${brand.id}`);
            const models = modelsResponse.data.data;

            for (const model of models) {
              await test.step(`Model : ${model.title}`, async () => {
                const createCarReqBody = {
                  carBrandId: brand.id,
                  carModelId: model.id,
                  mileage: Math.floor(Math.random() * 100),
                };
                const createCarResponse = await userClientWithCookie.post('/cars', createCarReqBody);

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
      for (const { title, inputData, expectedData } of carCreateNegativeFixtures) {
        test(title, async ({ userClientWithCookie }) => {
          const createCarResponse = await userClientWithCookie.post('/cars', inputData);

          expect(createCarResponse.status, 'Status code should be valid').toBe(expectedData.statusCode);
          expect(createCarResponse.data, 'Response data should contain all properties for a new car').toEqual(expectedData.data);
        });
      }
    });
  });
});
