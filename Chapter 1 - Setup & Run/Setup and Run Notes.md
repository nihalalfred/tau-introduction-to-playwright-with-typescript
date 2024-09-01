## Installing Playwright

Playwright can be installed in an existing project using the following command:

    npm init playwright@latest

<img src="https://github.com/nihalalfred/tau-introduction-to-playwright-with-typescript/blob/main/Screenshots/Installation%201.png" height="600" width="1000" >

<img src="https://github.com/nihalalfred/tau-introduction-to-playwright-with-typescript/blob/main/Screenshots/Installation%202.png" height="600" width="1000" >

### Configuration Steps
When running this command, you will be prompted with several configuration options:

1. **Select the language you want to use for your tests**  
   - **Recommended**: TypeScript

2. **Select the name of the test directory**  
   - **Recommended**: `tests`

3. **Add a GitHub Action for automating tests**  
   - **Recommended**: `false` (but you can choose based on your needs)

4. **Install Playwright browsers**  
   - **Recommended**: `true` (default)


## Extension Required

- Playwright Test for VSCode

## How to run tests

- Terminal: `npx playwright test`.

- Inside VS Code: Side Panel icon >  `Testing` > Test Explorer > Run Tests Button

Note: If you would like to only run your test only on the Chromium Browser, you can use the `--project` option

`npx playwright test --project chromium`


## Viewing Test Report

 - `npx playwright show-report`

- This will open the Playwright Test Report on your local host.

 - Clicking on a particular row gives you the detailed run of that test case.
