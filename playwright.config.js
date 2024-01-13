import { defineConfig, devices } from '@playwright/test';
import { config as testConfig } from './config/config.js';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  // testMatch: 'tests/**/*.spec.js',
  testIgnore: 'tests/**/*.spe.js',
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testConfig.baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: false,
    httpCredentials: testConfig.httpCredentials,
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 400,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global-setup',
      testMatch: 'tests/setup/*.setup.js',
    },
    {
      name: 'global-teardown',
      testMatch: 'tests/teardown/*.teardown.js',
    },
    {
      name: 'e2e chrome',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['global-setup'],
      teardown: 'global-teardown',
    },

  ],

});

export default config;
