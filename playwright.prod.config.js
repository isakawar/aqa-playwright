import { defineConfig, devices } from '@playwright/test';
import { config as testConfig } from './config/config.js';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  // testMatch: 'tests/**/*.spec.js',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testConfig.baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true,
    httpCredentials: testConfig.httpCredentials,
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 400,
    },
  },
});

export default config;
