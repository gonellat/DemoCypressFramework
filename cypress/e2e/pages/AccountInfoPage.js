// cypress/pageObjects/AccountInfoPage.js
import BasePage from './BasePage.js';

/**
 * Page class for entering account information and verifying account creation.
 */
class AccountInfoPage extends BasePage {
  /**
   * Define all locators for the Account Info Page
   */
  elements = {
    titleMrRadio: () => cy.get('#id_gender1'),
    passwordInput: () => cy.get('#password'),
    daySelect: () => cy.get('#days'),
    monthSelect: () => cy.get('#months'),
    yearSelect: () => cy.get('#years'),
    newsletterCheckbox: () => cy.get('#newsletter'),
    offersCheckbox: () => cy.get('#optin'),

    firstNameInput: () => cy.get('#first_name'),
    lastNameInput: () => cy.get('#last_name'),
    companyInput: () => cy.get('#company'),
    addressInput: () => cy.get('#address1'),
    countrySelect: () => cy.get('#country'),
    stateInput: () => cy.get('#state'),
    cityInput: () => cy.get('#city'),
    zipCodeInput: () => cy.get('#zipcode'),
    mobileInput: () => cy.get('#mobile_number'),

    createAccountButton: () => cy.get('button[data-qa="create-account"]'),
    accountCreatedMessage: () => cy.contains('Account Created!'),
  };

  /**
   * Fill in the account details form.
   * @param {string} password - The user's password.
   */
  fillAccountDetails(password) {
    this.elements.titleMrRadio().click();
    this.elements.passwordInput().type(password);
    this.elements.daySelect().select('10');
    this.elements.monthSelect().select('May');
    this.elements.yearSelect().select('1990');
    this.elements.newsletterCheckbox().click();
    this.elements.offersCheckbox().click();

    this.elements.firstNameInput().type('John');
    this.elements.lastNameInput().type('Doe');
    this.elements.companyInput().type('DemoCompany');
    this.elements.addressInput().type('123 Demo Street');
    this.elements.countrySelect().select('United States');
    this.elements.stateInput().type('CA');
    this.elements.cityInput().type('DemoCity');
    this.elements.zipCodeInput().type('90001');
    this.elements.mobileInput().type('1234567890');
  }

  /**
   * Submit the completed account form.
   */
  submitForm() {
    this.elements.createAccountButton().click();
  }

  /**
   * Verify that the account was successfully created.
   */
  verifyAccountCreated() {
    this.elements.accountCreatedMessage().should('be.visible');
  }
}

export default AccountInfoPage;
