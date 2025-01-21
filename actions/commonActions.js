const { expect } = require("@playwright/test");
const path = require("path");

class CommonActions {
    constructor() {
        // this.page = page;
    }

    async navigateTo(url) {
        await global.__PAGE__.goto(url); // Navigates to a specified URL
    }

    async fillField(locator, value) {
        await global.__PAGE__.fill(locator, value); // Fills in a form field
    }

    async clickElement(locator) {
        await global.__PAGE__.click(locator); // Clicks an element on the page
    }

    async waitForElementVisible(locator) {
        await global.__PAGE__.waitForSelector(locator, { state: 'visible' }); // Waits for an element to be visible
    }

    async waitForURL(expectedURL) {
        await global.__PAGE__.waitForURL(expectedURL); // Waits for the expected URL to appear
    }

    async getElementText(locator) {
        return await global.__PAGE__.textContent(locator); // Retrieves text content from an element
    }

    async takeScreenshot(path) {
        await global.__PAGE__.screenshot({ path }); // Takes a screenshot
    }

    async expectElementIsVisible(locator){
        const element = await global.__PAGE__.locator(locator);
        await expect(element).toBeVisible();
    }

    async expectElementText(expectedText, locator){
        const element = await global.__PAGE__.locator(locator);
        const a = await element.innerText();
        const b = await element.textContent();
        await expect(element).toHaveText(expectedText);
    }

    async expectPartialElementText(expectedText, locator){
        const element = await global.__PAGE__.locator(locator);
        await expect(element).toContainText(expectedText);
    }

    async waitForElementVisible(locator, time){
        await global.__PAGE__.locator(locator).waitFor({
            state: 'visible',
            timeout: time
        });
    }

    async waitForElementHidden(locator, time){
        await global.__PAGE__.locator(locator).waitFor({
            state: 'hidden',
            timeout: time
        });
    }

    async waitForElementAttached(locator, time){
        await global.__PAGE__.locator(locator).waitFor({
            state: 'attached',
            timeout: time
        });
    }

    async waitForElementDetached(locator, time){
        await global.__PAGE__.locator(locator).waitFor({
            state: 'detached',
            timeout: time
        });
    }

    async selectByValue(locator, value){
        await global.__PAGE__.selectOption(locator, value);
    }

    async selectByLabel(locator, label){
        await global.__PAGE__.selectOption(locator, label);
    }

    async selectByIndex(locator, index){
        await global.__PAGE__.selectOption(locator, index);
    }


}

module.exports = { CommonActions };
