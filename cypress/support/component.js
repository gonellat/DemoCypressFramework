// cypress/support/component.js

// Register any global CT-specific commands here
import "./commands";

// Optional: Add beforeEach/afterEach hooks
beforeEach(() => {
  cy.log("🧪 [CT] Mounting component...");
});
