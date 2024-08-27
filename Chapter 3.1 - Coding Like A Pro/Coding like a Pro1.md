

## Coding like a pro

### AAA Patern :

In the previous chapter we have seen how to write your first test.

Now we are going to refactor the same test and make it more readable, maintainable, powerful and clean by giving it a test structure. 

We are going to do that using the AAA Pattern:

```
A - [Arrange]
A - [Act]
A - [Assert]
```



### Important Methods:
- **beforeAll**: 
  - Executed before all tests within a file.
  - Use cases: start a server, create a DB connection, reuse a sign-in state.
  
- **beforeEach**: 
  - Executed before each test method.
  - Use cases: open a URL, clean up the DB, create a page object, dismiss a modal, load parameters.
  
- **afterAll**:
  - Executed after all tests in a file.
  - Use cases: close a DB connection, log that the test file is completed.
  
- **afterEach**:
  - Executed after each test method.
  - Use cases: log test results, clean up data created for the test.

### Test Grouping and Execution Control:
- **test.describe**:
  - Groups multiple test scenarios.
  - Options: 
    - `describe.skip`: Skip all tests within a describe block.
    - `describe.only`: Run only tests within a describe block.
  - **test scenarios** within `describe` can be further divided into steps (Arrange, Act, Assert).

- **Steps within a Test**:
  - Steps are optional and can be used to organize actions within a test scenario.
  - **test.only** and **test.skip**: Control the execution of specific test scenarios.

### Best Practices:
- Keep `beforeAll`, `beforeEach`, `afterAll`, and `afterEach` methods at the top of the file for easy access.
- Consider splitting files if multiple `describe` blocks are needed.

####  Example Code

```typescript

import { test, expect } from '@playwright/test';

//AAA Pattern

// [Arrange]
// [Act]
// [Assert]

const password = process.env.PASSWORD;

test.beforeAll(async ({ playwright }) => {
    test.skip(
      !!process.env.PROD,
      'Test intentionally skipped in production due to data dependency.'
    );
    // start a server
    // create a db connection
    // reuse a sign in state
});
  
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    // open a URL
    // clean up the DB
    // create a page object
    // dismiss a modal
    // load params
});

test.afterAll(async ({ page }, testInfo) => {
    console.log('Test file completed.');
    // close a DB connection
});

test.afterEach( async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    // clean up all the data we created for this test through API calls
});

// test.describe('Test Case', () => {
// test.describe.only('Test Case', () => {
test.describe.skip('Test Case', () => {
    test('Test Scenario One', async ({ page }) => {
        await test.step('Step One', async () => {
            // ...
        });

        await test.step('Step Two', async () => {
            // ...
        });

        // ...
    });
  
    test('Test Scenario Two', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
/**
    test.only('Test Scenario Three', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */  
/**
    test.skip('Test Scenario Four', async ({ page }) => {
        // Arrange
        // Act
        // Assert
    });
 */

  });
  
````