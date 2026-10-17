import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
const chrome =
  process.platform === 'win32' &&
  existsSync('C:/Program Files/Google/Chrome/Application/chrome.exe');
const port = process.env['NEXO_PAGES_PORT'] ?? '4327';
const remote = process.env['NEXO_PAGES_URL'];
const baseURL = remote ?? `http://127.0.0.1:${port}/NexoAprende-Experience/`;
export default defineConfig({
  testDir: './e2e-pages',
  outputDir: './artifacts/pages-test-results',
  workers: 1,
  timeout: 120000,
  expect: { timeout: 15000 },
  reporter: [['list']],
  use: { baseURL, headless: true, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    {
      name: 'pages-desktop',
      use: { ...devices['Desktop Chrome'], channel: chrome ? 'chrome' : undefined },
    },
    {
      name: 'pages-mobile',
      use: {
        ...devices['Pixel 7'],
        defaultBrowserType: 'chromium',
        channel: chrome ? 'chrome' : undefined,
      },
    },
  ],
  webServer: remote
    ? undefined
    : { command: 'npm run serve:pages', url: baseURL, reuseExistingServer: false, timeout: 30000 },
});
