import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

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