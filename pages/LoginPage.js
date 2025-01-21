const loginLocators = require('../locators/loginLocators');
const { CommonActions } = require('../actions/commonActions'); // Import Common Actions

class LoginPage {
    constructor() {
        // this.page = page;
        this.actions = new CommonActions(); // Use common actions
        this.usernameField = loginLocators.usernameField;
        this.passwordField = loginLocators.passwordField;
        this.loginButton = loginLocators.loginButton;
    }

    async goto() {
        await this.actions.navigateTo('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.actions.fillField(this.usernameField, username); // Use fill action
        await this.actions.fillField(this.passwordField, password); // Use fill action
        await this.actions.clickElement(this.loginButton); // Use click action
    }

    async assertInvalidPassswordMessage(){
        await this.actions.expectElementIsVisible(loginLocators.errorMessage);
        await this.actions.expectElementText(loginLocators.wrongPasswordErrorMessage, loginLocators.errorMessage)
        await this.actions.expectPartialElementText(loginLocators.wrongPasswordErrorMessage, loginLocators.errorMessage)
    }

    async changeFilterToPriceLowToHigh(){
        await this.actions.waitForElementVisible(loginLocators.filterDropDown, 20000);
        await this.actions.selectByLabel(loginLocators.filterDropDown, loginLocators.priceLowToHighLabel);
    }
}

module.exports = { LoginPage };
