const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage'); // Import the LoginPage class

test.use({
    launchOptions: {
        slowMo: 2000
    }
})
const loginPage = new LoginPage();

test.describe.only('Login Test using POM with Global Setup', () => {

    test.beforeEach(async ({ page }) => {
        global.__PAGE__ = page;
    });

    test('Login with valid credentials', async () => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(global.__PAGE__).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login with valid username and invalid password', async () => {
        await loginPage.goto();
        await loginPage.login("standard_user", "wrongPassword");
        await loginPage.assertInvalidPassswordMessage();
    });

    test("Sort the item from low to high", async ()=>{
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(global.__PAGE__).toHaveURL('https://www.saucedemo.com/inventory.html');
        await loginPage.changeFilterToPriceLowToHigh();
    });

    test.afterEach(async () => {
        global.__PAGE__.close();
    })
});
