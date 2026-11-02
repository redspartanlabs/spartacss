// Real-browser regression tests for the CSS-only components.
// Development-only: nothing under test/ is in package.json "files".
//
//   npm run build                      (the tests read dist/sparta-all.css)
//   npm exec playwright install chromium firefox webkit     (once)
//   npm run test:browser
//
// SPARTA_CSS may point at another build of the stylesheet (for example a scratch build).

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.mjs',
  outputDir: '../../node_modules/.playwright-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [['list']],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
