// cypress/pageObjects/AccountInfoPage.js
import BasePage from "./BasePage.js";

/**
 * Page class for entering account information and verifying account creation.
 */
class AccountInfoPage extends BasePage {
  /**
   * Fill in the account details form.
   * @param {string} password - The user's password.
   */
  fillAccountDetails(password) {
    this.clickElement("#id_gender1");
    this.typeInto("#password", password);
    cy.get("#days").select("10");
    cy.get("#months").select("May");
    cy.get("#years").select("1990");
    this.clickElement("#newsletter");
    this.clickElement("#optin");

    this.typeInto("#first_name", "John");
    this.typeInto("#last_name", "Doe");
    this.typeInto("#company", "DemoCompany");
    this.typeInto("#address1", "123 Demo Street");
    cy.get("#country").select("United States");
    this.typeInto("#state", "CA");
    this.typeInto("#city", "DemoCity");
    this.typeInto("#zipcode", "90001");
    this.typeInto("#mobile_number", "1234567890");
  }

  /**
   * Submit the completed account form.
   */
  submitForm() {
    this.clickElement('button[data-qa="create-account"]');
  }

  /**
   * Verify that the account was successfully created.
   */
  verifyAccountCreated() {
    cy.contains("Account Created!").should("be.visible");
  }
}

export default AccountInfoPage;
