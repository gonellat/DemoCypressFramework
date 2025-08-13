// cypress/pageObjects/HomePage.js
import BasePage from "./BasePage.js";

/**
 * HomePage class representing the landing page.
 */
class HomePage extends BasePage {
  /**
   * Verify the page title matches.
   * @param {string} expectedTitle - Expected title substring.
   */
  verifyTitle(expectedTitle) {
    this.getTitle().should("include", expectedTitle);
  }

  /**
   * Accept cookie/consent popup.
   */
  /**
   * Accept cookie/consent if the popup is visible.
   */
  acceptConsent() {
    cy.get("body").then(($body) => {
      if ($body.find("#ez-accept-all").length) {
        this.getElement("#ez-accept-all").click({ force: true });
        cy.log("✅ Consent accepted");
      } else {
        cy.log("⚠️ Consent popup not present — skipping");
      }
    });
  }

  /**
   * Click the "Signup / Login" link.
   */
  clickSignupLogin() {
    cy.contains("Signup / Login").click();
  }

  /**
   * Click the subscribe button.
   */
  clickSubscribe() {
    this.clickElement("#subscribe_email");
  }
}

export default HomePage;
