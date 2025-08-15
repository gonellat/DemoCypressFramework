// cypress/pageObjects/BasePage.js

/**
 * BasePage - shared reusable methods for all page objects.
 */
class BasePage {
  /**
   * Navigate to a URL.
   * @param {string} path - The URL path to visit (defaults to '/').
   */
  visit(path = '/') {
    cy.visit(path);
  }

  /**
   * Get the current page title.
   * @returns {Cypress.Chainable<string>} The title of the current page
   */
  getTitle() {
    return cy.title();
  }

  /**
   * Get a Cypress-wrapped element by selector.
   * @param {string} selector - The CSS selector for the element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The Cypress-wrapped element
   */
  getElement(selector) {
    return cy.get(selector);
  }

  /**
   * Click an element using a selector.
   * @param {string} selector - The element selector.
   */
  clickElement(selector) {
    cy.get(selector).click();
  }

  /**
   * Type into an element.
   * @param {string} selector - The element selector.
   * @param {string} text - The text to type.
   */
  typeInto(selector, text) {
    cy.get(selector).type(text);
  }
}

export default BasePage;
