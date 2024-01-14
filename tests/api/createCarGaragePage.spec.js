import { expect, request } from '@playwright/test';
import exp from 'constants';
import { test } from '../../src/fixtures/userGaragePageAuth.js';
import { USERS } from '../../src/data/users.js';
import { STORAGE_STATE_USER_PATH } from '../../src/data/constants/storageState.js';

test.describe('Create car via API', () => {
  test.describe('Positive cases', () => {
    test('should success login user via API', async ({ request }) => {
      const response = await request.post('/api/auth/signin', {
        data: {
          email: USERS.TEST_USER.email,
          password: USERS.TEST_USER.password,
          remember: false,
        },
      });
      const responsJson = await response.json();
      await expect(response.status()).toEqual(200);
      await expect(responsJson.data.userId).toEqual(USERS.TEST_USER.userId);
    });
  });
  test('should be able to create a new car', async ({ userApiClient }) => {
    const responseCreateCar = await userApiClient.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      },
    });
    const bodyNewCar = await responseCreateCar.json();

    expect(responseCreateCar.status()).toEqual(201);
    const responseGetCars = await userApiClient.get('/api/cars');
    const bodyCars = await responseGetCars.json();

    await expect(responseGetCars.status()).toEqual(200);
    await expect(bodyCars.data.length).toEqual(1);
    await expect(bodyNewCar.data.id).toEqual(bodyCars.data[0].id);
  });

  test.describe('Negative cases', () => {
    test('should not be able to create a new car with invalid data', async ({ userApiClient }) => {
      const responseCreateCar = await userApiClient.post('/api/cars', {
        data: {
          carBrandId: 132,
          carModelId: 1,
          mileage: 122,
        },
      });
      const bodyNewCar = await responseCreateCar.json();

      await expect(responseCreateCar.status()).toEqual(404);
      await expect(bodyNewCar.message).toEqual('Brand not found');
    });
  });

  test('should not be able to update user profile with invalid data', async ({ userApiClient }) => {
    const responseUpdateUser = await userApiClient.put('/api/users/profile', {
      data: {
        photo: 'user-1621352948859.jpg',
        name: 'John',
        lastName: 'Dou',
        dateBirth: '2021-03-17T15:21:05.0sdfsdfasfda00Z',
        country: 'Ukraine',
      },
    });
    const bodyUpdateUser = await responseUpdateUser.json();

    await expect(responseUpdateUser.status()).toEqual(500);
    await expect(bodyUpdateUser.message).toEqual("Cannot read property 'mime' of undefined");
  });
});
