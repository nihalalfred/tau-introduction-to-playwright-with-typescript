
### Page Object Model (POM)

Now going to enhance our test structure using:  *Page Object Model** (POM) which will help us organise our test code.

Below is how we create a Page Object Model for the **Home Page**.

```typeScript
 import {type Locator, type Page, expect} from "@playwright/test";

export class HomePage{

    //variables

    readonly page:Page;
    
    // await page.getByRole('link', { name: 'Get started' }).click();
    readonly getStartedButton:Locator;

    //await expect(page).toHaveTitle(/Playwright/);
    readonly title: RegExp;



    // constructor
    constructor (page:Page){
    this.page = page;
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
    this.title = /Playwright/;
    }


    //methods
    async clickGetStarted(){
        await this.getStartedButton.click();
    }
    
    
    async assertPageTitle(){
        //await expect(page).toHaveTitle(/Playwright/);
        await expect(this.page).toHaveTitle(this.title);
    }


}

export default HomePage;

```

👆 **Code Explanation:**

This code defines a class called HomePage that represents the homepage of a website. The class has properties (variables) that represent specific elements on the page, and methods (functions) that perform actions like clicking a button or checking the page title.

### 👇 Breakdown:

#### Imports:
- **`Locator`**, **`Page`**, and **`expect`** are imported from **`@playwright/test`**.
  - **`Locator`**: Used to identify and interact with elements on the page.
  - **`Page`**: Represents the webpage.
  - **`expect`**: Used for making assertions (checks) to verify conditions in tests.

#### Class Definition:
- **`HomePage`**: The main class that models the homepage of a website for testing.

#### Variables (Properties):
- **`page: Page`**: Represents the webpage that this class interacts with.
- **`getStartedButton: Locator`**: Represents the "Get started" button on the homepage. It is located by finding a link element with the text "Get started."
- **`title: RegExp`**: Represents the expected title of the page, which should match the regular expression **`/Playwright/`**.

#### Constructor:
- **`constructor(page: Page)`**: This is a special function that runs when you create a new instance of the **`HomePage`** class. It initializes the class with a webpage (**`page`**) and sets up the **`getStartedButton`** and **`title`** properties.
  - **`this.page = page`**: Stores the **`page`** object in the class so that it can be used by other methods.
  - **`this.getStartedButton = page.getByRole('link', { name: 'Get started' })`**: Sets up the **`getStartedButton`** by locating the "Get started" link on the page.
  - **`this.title = /Playwright/`**: Sets up the expected page title using a regular expression.

#### Methods (Functions):
- **`clickGetStarted()`**: This method clicks on the "Get started" button. It simulates a user clicking the button on the homepage.
- **`assertPageTitle()`**: This method checks if the title of the webpage matches the expected title (**`/Playwright/`**). It uses Playwright's **`expect`** function to make sure the title is correct.

#### Default Export:
- The class **`HomePage`** is exported as the default export from this module, which means it can be easily imported and used in other parts of the test suite.


---

Below is how we create another Page Object Model for the **Top Menu Page**

```typeScript
import { expect, Locator, Page } from '@playwright/test';

export class TopMenuPage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly nodeLink: Locator;
    readonly javaLink: Locator;
    readonly nodeLabel: Locator;
    readonly javaLabel: Locator;
    readonly nodeDescription: string = 'Installing Playwright';
    readonly javaDescription: string = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;

    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.nodeLink = page.getByRole('button', {name: 'Node.js'});
        this.javaLink = page.getByRole('navigation', { name: 'Main' }).getByText('Java');
        this.nodeLabel = page.getByText(this.nodeDescription, {exact:true});
        this.javaLabel = page.getByText(this.javaDescription);
    }

    async hoverNode() {
        await this.nodeLink.hover();
    }
    
    async clickJava() {
        await this.javaLink.click();
    }

    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeLabel).not.toBeVisible();
    }

    async assertJavaDescriptionVisible() {
        await expect(this.javaLabel).toBeVisible();
    }

}
export default TopMenuPage;
```

### 👇 Breakdown:

#### Imports:
- **`expect`**, **`Locator`**, and **`Page`** are imported from **`@playwright/test`**.
  - **`Locator`**: Used to identify and interact with elements on the page.
  - **`Page`**: Represents the webpage.
  - **`expect`**: Used for making assertions (checks) to verify conditions in tests.

#### Class Definition:
- **`TopMenuPage`**: The main class that models the top menu of a website for testing.

#### Variables (Properties):
- **`page: Page`**: Represents the webpage that this class interacts with.
- **`getStartedLink: Locator`**: Represents the "Get started" link on the page, located by its role as a link with the name "Get started."
- **`nodeLink: Locator`**: Represents the "Node.js" button, located by its role as a button with the name "Node.js."
- **`javaLink: Locator`**: Represents the "Java" link in the main navigation, located by the text "Java."
- **`nodeLabel: Locator`**: Represents a label containing the description "Installing Playwright."
- **`javaLabel: Locator`**: Represents a label containing the description specific to Java Playwright installation.
- **`nodeDescription: string`**: A string storing the text "Installing Playwright."
- **`javaDescription: string`**: A string storing a detailed description about Java Playwright installation.

#### Constructor:
- **`constructor(page: Page)`**: This function runs when a new instance of the **`TopMenuPage`** class is created. It initializes the class with a webpage (**`page`**) and sets up the various link and label properties.
  - **`this.page = page`**: Stores the **`page`** object in the class for use by other methods.
  - **`this.getStartedLink = page.getByRole('link', { name: 'Get started' })`**: Sets up the **`getStartedLink`** by locating the "Get started" link on the page.
  - **`this.nodeLink = page.getByRole('button', { name: 'Node.js' })`**: Sets up the **`nodeLink`** by locating the "Node.js" button.
  - **`this.javaLink = page.getByRole('navigation', { name: 'Main' }).getByText('Java')`**: Sets up the **`javaLink`** by locating the "Java" link in the main navigation.
  - **`this.nodeLabel = page.getByText(this.nodeDescription, { exact: true })`**: Sets up the **`nodeLabel`** by locating the label with the exact text "Installing Playwright."
  - **`this.javaLabel = page.getByText(this.javaDescription)`**: Sets up the **`javaLabel`** by locating the label with the description about Java Playwright installation.

#### Methods (Functions):
- **`hoverNode()`**: This method hovers the mouse over the "Node.js" button. It simulates a user moving their mouse over the button.
- **`clickJava()`**: This method clicks on the "Java" link. It simulates a user clicking on the Java link in the navigation.
- **`assertPageUrl(pageUrl: RegExp)`**: This method checks if the current page URL matches the expected URL (provided as a regular expression).
- **`assertNodeDescriptionNotVisible()`**: This method checks that the label containing the text "Installing Playwright" is not visible on the page.
- **`assertJavaDescriptionVisible()`**: This method checks that the label with the Java Playwright installation description is visible on the page.

#### Default Export:
- The class **`TopMenuPage`** is exported as the default export from this module, making it easy to import and use in other parts of the test suite.
```