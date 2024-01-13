import GaragePage from '../pageObject/GaragePage.js';

export const deleteCarsIfCountGreaterThanZero = async (count, page) => {
  try {
    if (count > 0) {
      const garagePage = new GaragePage(page);
      await garagePage.deleteCarItem();
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
