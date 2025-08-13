// cypress/support/withBaseTest.js
import { Pages } from "./../../../support/pageFactory";

/**
 * Wrap your tests with shared setup/teardown and auto-injected Pages.
 * @param {function(Pages: object): void} testFn - Test block with injected Pages
 */
export function withBaseTest(testFn) {
  beforeEach(() => {
    cy.log("🔧 [BaseTest] beforeEach");

    // Could also inject test user, seed data, etc.
  });

  afterEach(() => {
    cy.log("🧹 [BaseTest] afterEach");
    // Screenshot, session cleanup, DB reset, etc.
  });

  testFn(Pages);
}
