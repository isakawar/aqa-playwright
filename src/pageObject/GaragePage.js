import BasePage from './BasePage.js';
import AddCarPopup from '../components/AddCarPopup.js';
import GarageCarItems from '../components/GarageCarItems.js';

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page, '/panel/garage');
    this.addCarButton = this.page.locator('button', { hasText: 'Add car' });
  }

  async openAddCarPopup() {
    await this.addCarButton.click();
    return new AddCarPopup(this.page);
  }

  async getCountGarageItems() {
    const garageCarItems = new GarageCarItems(this.page);
    return await garageCarItems.garageItem.count();
  }

  async deleteCarItem() {
    const garageCarItems = new GarageCarItems(this.page);
    await garageCarItems.editButton.click();
    await garageCarItems.deletCarButton.click();
    await garageCarItems.aproveDeleteButton.click();
  }
}
