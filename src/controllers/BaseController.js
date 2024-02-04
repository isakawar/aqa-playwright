import { wrapper } from 'axios-cookiejar-support';
import axios from 'axios';

export default class BaseController {
  constructor(jar) {
    this.client = wrapper(axios.create({
      baseURL: process.env.BASE_API_URL,
      jar,
      validateStatus: () => true,
    }));
  }
}
