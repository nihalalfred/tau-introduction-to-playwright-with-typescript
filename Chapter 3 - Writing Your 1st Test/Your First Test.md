## Writing Your First Test

We are going to write our first test for the following steps:

1. **Open the page**  
   URL: [https://playwright.dev/](https://playwright.dev/)

2. **Click on "Get started"**

3. **Mouse hover over the language dropdown**

4. **Click on "Java"**

5. **Check the URL**  
   Ensure that the URL has changed to the expected Java page.

6. **Check that the text "Installing Playwright" is not displayed**

7. **Check that the following text is displayed**:

```` typescript
import test, { expect } from "@playwright/test";
import { execArgv } from "process";

test('check Java Page', async ({ page }) => {

await page.goto('https://playwright.dev/');

await page.getByRole('link', {name: 'Get Started'}).click();
await page.getByRole('button',{name: 'Node.js'}).hover();
await page.getByRole('link', { name: 'Java', exact: true }).click();


await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
await expect(page.getByText('Installing Playwright',{exact:true})).not.toBeVisible();

const javaDesc = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`

await expect(page.getByText(javaDesc)).toBeVisible();

});
````

## Simple Explanation of the Playwright Test

### 1. Importing Required Modules:

```typescript
import test, { expect } from "@playwright/test";
```
- 👆 This line imports the `test` function to define tests and `expect` to write assertions (checks) in the test.

### 2. Defining the Test:

```typescript
test('check Java Page', async ({ page }) => {
```
- 👆 This line defines a test named "check Java Page". The test uses the `page` object, which represents a browser page (tab).

### 3. Navigating to the Website:

```typescript
await page.goto('https://playwright.dev/');
```
- 👆 This command opens the Playwright website in the browser.

### 4. Interacting with the Page:

```typescript
await page.getByRole('link', { name: 'Get Started' }).click();
```
- 👆 Finds a link with the text "Get Started" and clicks on it.

```typescript
await page.getByRole('button', { name: 'Node.js' }).hover();
```
- 👆 Finds a button with the name "Node.js" and hovers the mouse over it.

```typescript
await page.getByRole('link', { name: 'Java', exact: true }).click();
```
- 👆 Finds a link with the exact text "Java" and clicks on it.

### 6. Assertions (Checks):

```typescript
await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
```
- 👆 This checks that the page URL is now the Java introduction page (`https://playwright.dev/java/docs/intro`).

```typescript
await expect(page.getByText('Installing Playwright', { exact: true })).not.toBeVisible();
```
- 👆 This checks that the text "Installing Playwright" is **not** visible on the page.

```typescript
await expect(page.getByText(javaDesc)).toBeVisible();
```
- 👆 This checks that a specific description about Java Playwright installation is visible on the page.
```
