# Understanding TestConfig

Let’s start by learning about Playwright Test Configuration.

- The `playwright.config.ts` file defines the default Test Runner configuration.

- The `TestConfig API` describes the available configuration properties for customization.

- The `Playwright Test CLI` lets you override config properties or file location at runtime.


## Deep dive into `playwright.config.ts`


1. **Global Configuration Settings**
   - **`use` Property**: Sets global settings for all tests, such as `headless`, `viewport`, `ignoreHTTPSErrors`, `video`, `screenshot`, etc.
   - **Example**:
     ```typescript
     use: {
       headless: true,
       viewport: { width: 1280, height: 720 },
       ignoreHTTPSErrors: true,
       screenshot: 'only-on-failure',
     }
     ```

2. **Test Directory**
   - **`testDir` Property**: Specifies the directory where your test files are located.
   - **Example**:
     ```typescript
     testDir: './tests'
     ```

3. **Timeouts**
   - **`timeout` Property**: Sets a maximum time for each test to run.
   - **`expect` Timeout**: Sets timeout for assertions within tests.
   - **Example**:
     ```typescript
     timeout: 30000,  // 30 seconds
     expect: {
       timeout: 5000   // 5 seconds
     }
     ```

4. **Browser Configuration**
   - **`projects` Property**: Defines configurations for running tests in different browsers (e.g., Chromium, Firefox, WebKit).
   - **Example**:
     ```typescript
     projects: [
       { name: 'Chromium', use: { browserName: 'chromium' } },
       { name: 'Firefox', use: { browserName: 'firefox' } },
       { name: 'WebKit', use: { browserName: 'webkit' } },
     ]
     ```

5. **Parallelism**
   - **`retries` Property**: Configures the number of retries for failed tests.
   - **`workers` Property**: Controls the number of worker processes used for parallel test execution.
   - **Example**:
     ```typescript
     retries: 2,
     workers: 4,
     ```

6. **Reporters**
   - **`reporter` Property**: Configures how test results are reported (e.g., list, dot, json, html).
   - **Example**:
     ```typescript
     reporter: [['list'], ['json', { outputFile: 'results.json' }], ['html']],
     ```

7. **Test Hooks and Global Setup/Teardown**
   - **`globalSetup` & `globalTeardown`**: Specifies scripts or functions to run before or after all tests.
   - **`beforeEach`, `afterEach` Hooks**: Executes code before or after each test.
   - **Example**:
     ```typescript
     globalSetup: require.resolve('./global-setup'),
     globalTeardown: require.resolve('./global-teardown'),
     ```

8. **Environment Variables**
   - Use environment variables for sensitive data or environment-specific configurations.
   - Can be accessed within the config using `process.env`.

9. **Command-Line Overrides**
   - CLI allows overriding configuration settings at runtime (e.g., `--config=custom-config.ts`).

## Sample `playwright.config.ts` file

```typescript
import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './utils/environmentBaseUrl';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 2,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: [['html', { open: 'always' }]], //always, never and on-failure (default).
  // reporter: [['html', { outputFolder: 'my-report' }]], // report is written into the playwright-report folder in the current working directory. override it using the PLAYWRIGHT_HTML_REPORT
  // reporter: 'dot',
  // reporter: 'list',
  /**
    reporter: [
      ['list'],
      ['json', {  outputFile: 'test-results.json' }]
    ],
  */
  /**
   * custom reports: https://playwright.dev/docs/test-reporters#custom-reporters 
  */
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // headless: false,
    // ignoreHTTPSErrors: true,
    // viewport: { width: 1280, height: 720 },
    // video: 'on-first-retry',
  },
    // timeout: 30000, //https://playwright.dev/docs/test-timeouts
    // expect: {
      /**
       * Maximum time expect() should wait for the condition to be met.
       * For example in `await expect(locator).toHaveText();`
       */
      // timeout: 10000,
    // },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: 'https://playwright.dev/',
         ...devices['Desktop Chrome']
      },
    },

    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: 'https://playwright.dev/',
         ...devices['Desktop Safari']
      },
    },

    {
      name: 'all-browsers-and-tests',
      use: { 
        baseURL: 'https://playwright.dev/',
         ...devices['Desktop Firefox']
      },
    },

    // Example only
    {
      name: 'local',
      use: { 
        baseURL: baseEnvUrl.local.home,
      },
    },

    // Example only
    {
      name: 'ci',
      use: { 
         baseURL: process.env.CI
          ? baseEnvUrl.ci.prefix + process.env.GITHUB_REF_NAME + baseEnvUrl.ci.suffix //https://dev-myapp-chapter-2.mydomain.com
          : baseEnvUrl.staging.home,
      },
      /**
       * GitHub variables: https://docs.github.com/en/actions/learn-github-actions/variables
       * GitLab variables: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html#predefined-variables-reference
       */
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
