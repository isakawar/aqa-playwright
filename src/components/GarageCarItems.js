import BaseComponent from './BaseComponent.js';

export default class AddCarPopup extends BaseComponent {
  constructor(page) {
    super(page, page.locator('app-add-car-modal'));
    this.garageItem = this.page.locator('.car-item');
    this.editButton = this.page.locator('.icon.icon-edit');
    this.deletCarButton = this.page.locator('.btn.btn-outline-danger');
    this.aproveDeleteButton = this.page.locator('.btn.btn-danger');
    this.garageItem = this.page.locator('.car-item');
  }
}
