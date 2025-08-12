// cypress/pageObjects/LoginSignupPage.js
import BasePage from "./BasePage.js";

/**
 * Page class representing the Login/Signup page.
 */
class LoginSignupPage extends BasePage {
  /**
   * Fill the signup form with a name and email.
   * @param {string} name - The user's name.
   * @param {string} email - The user's email address.
   */
  fillSignupForm(name, email) {
    this.typeInto('input[data-qa="signup-name"]', name);
    this.typeInto('input[data-qa="signup-email"]', email);
    this.clickElement('button[data-qa="signup-button"]');
  }
}

export default LoginSignupPage;
