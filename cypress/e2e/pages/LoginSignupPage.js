// cypress/pageObjects/LoginSignupPage.js
import BasePage from "./BasePage.js";

/**
 * Page class representing the Login/Signup page.
 */
class LoginSignupPage extends BasePage {
  /**
   * Define all locators for the Login/Signup Page.
   */
  elements = {
    signupNameInput: () => cy.get('input[data-qa="signup-name"]'),
    signupEmailInput: () => cy.get('input[data-qa="signup-email"]'),
    signupButton: () => cy.get('button[data-qa="signup-button"]'),
  };

  /**
   * Fill the signup form with a name and email.
   * @param {string} name - The user's name.
   * @param {string} email - The user's email address.
   */
  fillSignupForm(name, email) {
    this.elements.signupNameInput().type(name);
    this.elements.signupEmailInput().type(email);
    this.elements.signupButton().click();
  }
}

export default LoginSignupPage;
