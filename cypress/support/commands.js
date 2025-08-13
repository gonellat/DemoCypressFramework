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

/**
 * Takes a visual snapshot and compares it to the saved baseline image.
 *
 * Automatically respects the `visualTesting` Cypress environment variable:
 * - If `visualTesting` is `false`, this command will skip the snapshot
 * - Otherwise, it calls `cy.matchImageSnapshot()` with the given name and options
 *
 * @function visualSnapshot
 * @memberof Cypress.Chainable
 * @param {string} name - The name of the snapshot (used for file naming and matching)
 * @param {Partial<ScreenshotOptions & MatchImageSnapshotOptions>} [options={}] - Optional overrides for snapshot behavior
 *
 * @example
 * // Takes a snapshot named "home-page"
 * cy.visualSnapshot("home-page");
 *
 * @example
 * // Takes a snapshot with custom failure threshold
 * cy.visualSnapshot("dashboard", {
 *   failureThreshold: 0.005,
 *   failureThresholdType: "percent"
 * });
 *
 * @see https://github.com/jaredpalmer/cypress-image-snapshot
 */
Cypress.Commands.add("visualSnapshot", (name, options = {}) => {
  if (Cypress.env("visualTesting") === false) {
    cy.log(`📷 Skipping visual snapshot: ${name}`);
    return;
  }

  cy.matchImageSnapshot(name, options);
});

Cypress.Commands.add("visualSnapshot", (name, options = {}) => {
  if (Cypress.env("visualTesting") === false) {
    cy.log(`📷 Skipping visual snapshot: ${name}`);
    return;
  }

  cy.matchImageSnapshot(name, options);
});
