/// <reference path="./commands.d.ts" />

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
// i.e. Happens before each test file loads
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands.js";
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand({
  failureThreshold: 0.01, // Allow up to 1% difference
  failureThresholdType: "percent", // Compare by percentage (not absolute pixel count)
});

/**
 * Global test setup.
 */
beforeEach(() => {
  cy.clearSession();
});

Cypress.on("uncaught:exception", () => {
  return false;
});
