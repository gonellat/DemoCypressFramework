// cypress/pageObjects/HomePage.js
import BasePage from './BasePage.js';

/**
 * HomePage class representing the landing page.
 */
class HomePage extends BasePage {
  /**
   * Define all locators for the Home Page.
   */
  elements = {
    consentButton: () => cy.get('#ez-accept-all'),
    signupLoginLink: () => cy.contains('Signup / Login'),
    subscribeInput: () => cy.get('#subscribe_email'),
  };

  /**
   * Verify the page title matches.
   * @param {string} expectedTitle - Expected title substring.
   */
  verifyTitle(expectedTitle) {
    this.getTitle().should('include', expectedTitle);
  }

  /**
   * Accept cookie/consent if the popup is visible.
   */
  acceptConsent() {
    cy.get('body').then(($body) => {
      if ($body.find('#ez-accept-all').length) {
        this.elements.consentButton().click({ force: true });
        cy.log('✅ Consent accepted');
      } else {
        cy.log('⚠️ Consent popup not present — skipping');
      }
    });
  }

  /**
   * Click the "Signup / Login" link.
   */
  clickSignupLogin() {
    this.elements.signupLoginLink().click();
  }

  /**
   * Click the subscribe input field.
   */
  clickSubscribe() {
    this.elements.subscribeInput().click();
  }
  /**
   *Click the contact us link.
   */
  clickContactUs() {
    cy.contains('Contact us').click();
  }
}

export default HomePage;
