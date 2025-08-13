/**
 * Custom command to log test steps to the Cypress command log.
 * @param {string} message - Message to display in log.
 */
Cypress.Commands.add("logStep", (message) => {
  Cypress.log({
    name: "STEP",
    message: message,
    consoleProps: () => ({ message }),
  });
});

/**
 * Custom command to clear both cookies and local storage.
 */
Cypress.Commands.add("clearSession", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.logStep("Session cleared (cookies + local storage)");
});

/**
 * Logs a test step and takes a screenshot with the same label.
 * @param {string} label - Descriptive name for the step and screenshot.
 */
Cypress.Commands.add("captureStep", (label) => {
  cy.logStep(label);
  const testName = Cypress.currentTest.titlePath.join(" ");
  const fileName = `${testName} - ${label}`.replace(/\s+/g, "-").toLowerCase();
  cy.screenshot(fileName);
});
