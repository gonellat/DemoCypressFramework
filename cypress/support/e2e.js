// @ts-check
/// <reference types="cypress" />

/**
 * Support file is auto-loaded before every spec.
 * Import custom commands FIRST so they’re registered before tests run.
 */
import './commands.js';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

/**
 * Register visual snapshot base command.
 */
addMatchImageSnapshotCommand({
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});

/**
 * Guard: assert our custom commands are actually registered.
 * If not, throw a clear error early.
 */
before(() => {
  if (typeof cy.captureStep !== 'function') {
    throw new Error(
      "[support/e2e] cy.captureStep is not registered. Ensure cypress/support/commands.js is imported first and that supportFile is set to 'cypress/support/e2e.js' in cypress.config.js."
    );
  }
});

/**
 * Clear session data before each test (safe on all Cypress versions).
 * @returns {void}
 */
beforeEach(() => {
  /** @type {any} */
  const sess = Cypress.session;
  if (sess && typeof sess.clearAll === 'function') {
    sess.clearAll();
  } else {
    cy.clearCookies({ log: false });
    cy.clearLocalStorage({ log: false });
    cy.window({ log: false }).then((win) => {
      try {
        win.sessionStorage.clear();
      } catch {
        /* no-op */
      }
    });
  }
});

/**
 * Don’t fail tests on uncaught app errors by default.
 * Flip to `true` during debugging to surface app exceptions.
 */
Cypress.on('uncaught:exception', () => false);
