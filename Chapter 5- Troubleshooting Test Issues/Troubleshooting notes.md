# Troubleshooting Test Issues

Let's see how to effectively diagnose and fix issues in Playwright tests.

## Analyzing Reports:

Reports include screenshots taken at the moment of failure and a trace of the commands executed.
You can filter the test results by status (passed, failed, flaky, skipped).
Playwright also highlights where and why a test failed, helping you quickly identify issues.

## Using the Playwright Trace Viewer
**Trace Viewer:**

- Offers a detailed view of each test step, including network activity, browser console logs, and element locators.
- Useful for seeing what happened before and after each step in the test.

**Accessing the Trace Viewer**:

- Traces are generated based on configuration in your `playwright.config.js:`

```typeScript
use: {
  trace: 'on-first-retry', // or 'always' to capture traces on every run
},
```

## **Debugging with Playwright**
**Debugging Mode**:
  - Playwright allows you to run tests in debug mode, which pauses execution at breakpoints, letting you inspect the state of the application.
  - Command to run in debug mode:
    ```bash
    npx playwright test tests-examples/ --project=chromium --debug
    ```

**Using Breakpoints**:
  - Set breakpoints by clicking next to the line numbers in your test files.
  - The Playwright extension in Visual Studio Code (VS Code) provides tools to manage breakpoints and debug tests directly from the IDE.

## **Playwright UI Mode**
**UI Mode**:
  - Offers a graphical interface to run, filter, and debug tests. This mode can be initiated via the Playwright extension or command line.
  - Command to start UI mode:
    ```bash
    npx playwright test tests-examples/ --project=chromium --ui
    ```

**Features**:
  - The UI mode allows for easy debugging, setting breakpoints, and visualizing test results in a user-friendly interface.


