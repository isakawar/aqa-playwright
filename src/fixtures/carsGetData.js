import axios from 'axios';

export const getBrands = async () => {
  try {
    const response = await axios.get('https://qauto.forstudy.space/api/cars/brands');
    const brands = response.data.data;
    return brands;
  } catch (error) {
    throw error;
  }
};
