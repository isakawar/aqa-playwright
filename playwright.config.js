import { defineConfig, devices } from '@playwright/test';
import { config as testConfig } from './config/config.js';

const config = defineConfig({
  testDir: './tests',
  testIgnore: 'tests/**/*.spe.js',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: testConfig.baseURL,
    headless: true,
    httpCredentials: testConfig.httpCredentials,
    trace: 'on-first-retry',
    launchOptions: {
      // slowMo: 40_000,
    },
  },
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
      name: 'global-api-setup',
      testMatch: 'tests/setup/global.api.setup.js',
    },
    {
      name: 'global-api-teardown',
      testMatch: 'tests/teardown/global.api.teardown.js',
    },
    {
      name: 'e2e chrome',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['global-setup'],
      teardown: 'global-teardown',
    },
    {
      name: 'API tests',
      testMatch: 'tests/api/**/*.spec.js',
      dependencies: ['global-api-setup'],
      teardown: 'global-api-teardown',
    },
  ],
});

export default config;
