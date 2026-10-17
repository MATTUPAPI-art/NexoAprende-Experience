import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const chrome =
  process.platform === 'win32' &&
  existsSync('C:/Program Files/Google/Chrome/Application/chrome.exe');
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: { timeout: 8000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4307',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], channel: chrome ? 'chrome' : undefined },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 7'],
        defaultBrowserType: 'chromium',
        channel: chrome ? 'chrome' : undefined,
      },
    },
  ],
  webServer: {
    command: 'npm start',
    url: 'http://127.0.0.1:4307',
    reuseExistingServer: false,
    timeout: 90000,
  },
});
