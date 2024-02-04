import BaseController from './BaseController.js';

export default class CarController extends BaseController {
  #CREATE_CAR_PATH = '/cars';

  #DELETE_CAR_PATH = '/cars/';

  #BRANDS_PATH = '/cars/brands';

  #MODELS_PATH = '/cars/models';

  #USER_CARS_PATH = '/cars/';

  #EDIT_CAR_PATH = '/cars/';

  #GET_MODELS_BY_ID_PATH = '/cars/models?carBrandId=';

  #GET_BRANDS_BY_ID_PATH = '/cars/brands/';

  constructor(jar) {
    super(jar);
  }

  async createCar(requestBody) {
    return this.client.post(this.#CREATE_CAR_PATH, requestBody);
  }

  async getBrands() {
    return await this.client.get(this.#BRANDS_PATH);
  }

  async getModels() {
    return await this.client.get(this.#MODELS_PATH);
  }

  async getModelById(id) {
    return await this.client.get(`${this.#MODELS_PATH}/${id}`);
  }

  async getModelsByBrandId(brandId) {
    return await this.client.get(`${this.#GET_MODELS_BY_ID_PATH}${brandId}`);
  }

  async getBrandById(id) {
    return await this.client.get(`${this.#GET_BRANDS_BY_ID_PATH}${id}`);
  }

  async getCurrentUserCars() {
    return await this.client.get(this.#USER_CARS_PATH);
  }

  async getUserCarById(id) {
    return await this.client.get(`${this.#USER_CARS_PATH}${id}`);
  }

  async deleteCarById(id) {
    return await this.client.delete(`${this.#DELETE_CAR_PATH}${id}`);
  }

  async deletAllUserCars() {
    const getUserCarsId = await this.getCurrentUserCars();
    await Promise.all(
      getUserCarsId.data.data.map((car) => this.client.delete(`${this.#DELETE_CAR_PATH}${car.id}`)),
    );
  }

  async editCarById(id, requestBody) {
    return this.client.put(`${this.#EDIT_CAR_PATH}${id}`, requestBody);
  }
}
