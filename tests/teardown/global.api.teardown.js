import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import APIClient from '../../src/client/APIClient.js';
import { STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME } from '../../src/data/constants/storageState.js';

setup('Delete test user', async () => {
  const readData = fs.readFileSync(`${STORAGE_STATE_USER_PATH}${STORAGE_STATE_FILE_NAME}`, 'utf-8');
  const userData = JSON.parse(readData);
  const client = await APIClient.authenticate(userData.email, userData.password);
  await client.usersController.deleteAccount();

  const currentFilePath = fileURLToPath(import.meta.url); // Use fileURLToPath
  const stateFolderPath = path.join(path.dirname(currentFilePath), '../../state');
  const filePath = path.join(STORAGE_STATE_USER_PATH, STORAGE_STATE_FILE_NAME);

  // Delete file with test user data
  fs.readdirSync(stateFolderPath).forEach((file) => {
    if (file !== '.gitignore') {
      fs.unlinkSync(filePath);
    }
  });
});
