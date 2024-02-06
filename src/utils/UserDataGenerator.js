// import { faker } from '@faker-js/faker';
//
// class UserDataGenerator {
//   generateRandomUserData = () => {
//     const name = faker.person.firstName();
//     const lastName = faker.person.lastName();
//     const password = faker.internet.password();
//     const repeatPassword = password;
//     const email = `${faker.internet.userName()}${password}@example.com`;
//
//     return {
//       lastName,
//       password,
//       repeatPassword,
//       email,
//       name,
//     };
//   };
// }
//
// export default new UserDataGenerator();
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME } from '../data/constants/storageState.js';

class UserDataGenerator {
  generateRandomUserData = () => {
    const name = faker.person.firstName();
    const lastName = faker.person.firstName();
    const password = faker.internet.password();
    const repeatPassword = password;
    const email = `${faker.internet.userName()}${password}@example.com`;

    const userData = {
      lastName,
      password,
      repeatPassword,
      email,
      name,
    };

    // Use import.meta.url to get the current module's URL
    const currentFilePath = fileURLToPath(import.meta.url);
    // Use dirname to get the directory path
    const stateFolderPath = path.join(dirname(currentFilePath), 'state');

    // Write data to a new file in the 'state' folder
    if (!fs.existsSync(stateFolderPath)) {
      fs.mkdirSync(stateFolderPath);
    }

    const filePath = path.join(STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME);

    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
    console.log('File with data created');
    return userData;
  };
}

export default new UserDataGenerator();
