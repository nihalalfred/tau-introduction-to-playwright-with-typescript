
import test, { expect } from "@playwright/test";

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