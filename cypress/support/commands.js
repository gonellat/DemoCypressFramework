// @ts-check
/// <reference types="cypress" />

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

/**
 * Match Image Snapshot plugin options are not exported as types in JS,
 * so we keep them permissive and merge with ScreenshotOptions.
 * @typedef {Partial<Cypress.ScreenshotOptions> & { skip?: boolean } & Record<string, unknown>} VisualSnapshotOptions
 */

/**
 * Adds a visible "STEP" log line to the Command Log.
 * @function logStep
 * @param {string} message - Message to display in the log.
 * @returns {Cypress.Chainable<void>}
 */
Cypress.Commands.add('logStep', (message) => {
  Cypress.log({
    name: 'STEP',
    message,
    consoleProps: () => ({ message }),
  });
});

/**
 * Clears cookies, localStorage, and attempts sessionStorage clear.
 * Keeps tests isolated across specs.
 * NOTE: Do NOT call cy.logStep() here to avoid circular type timing; use Cypress.log directly.
 * @function clearSession
 * @returns {Cypress.Chainable<void>}
 */
Cypress.Commands.add('clearSession', () => {
  cy.clearCookies({ log: false });
  cy.clearLocalStorage({ log: false });
  cy.window({ log: false }).then((win) => {
    try {
      win.sessionStorage.clear();
    } catch {
      /* no-op */
    }
  });

  Cypress.log({
    name: 'STEP',
    message: 'Session cleared (cookies + storages)',
    consoleProps: () => ({}),
  });
});

/**
 * Log a step and take a screenshot with a stable filename.
 * Uses test title when available; otherwise falls back to timestamp.
 * @function captureStep
 * @param {string} label - Descriptive label for the step.
 * @returns {Cypress.Chainable<void>}
 */
Cypress.Commands.add('captureStep', (label) => {
  cy.logStep(label);

  /** @type {string} */
  let base = String(Date.now());
  try {
    // @ts-ignore - runtime-only field in Cypress
    const path = Cypress.currentTest?.titlePath?.join(' ') || '';
    base = path || base;
  } catch {
    /* best-effort */
  }

  const fileName = `${base} - ${label}`.replace(/\s+/g, '-').toLowerCase();
  cy.screenshot(fileName, { capture: 'viewport' });
});

/**
 * Register the image snapshot command with sensible defaults.
 */
addMatchImageSnapshotCommand({
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});

/**
 * Take a visual snapshot unless explicitly disabled via env or option.
 * Returns `Chainable<void>` in ALL cases to satisfy Cypress types.
 *
 * @function visualSnapshot
 * @param {string} name - Snapshot name.
 * @param {VisualSnapshotOptions} [options] - Screenshot options plus { skip?: boolean }.
 * @returns {Cypress.Chainable<void>}
 */
Cypress.Commands.add(
  'visualSnapshot',
  (name, options = /** @type {VisualSnapshotOptions} */ ({})) => {
    /** @type {VisualSnapshotOptions} */
    const opts = options;

    const disabled = Cypress.env('visualTesting') === false || opts.skip === true;
    if (disabled) {
      // Skip branch: return Chainable<void> (no TS generic)
      return cy.then(() => {
        cy.log(`📷 Skipping visual snapshot: ${name}`);
      });
    }

    // Remove our custom "skip" flag before passing to the plugin
    const { skip: _skip, ...snapshotOpts } = opts;
    void _skip; // appease no-unused-vars

    // Use cypress-image-snapshot; keep chain type as void.
    cy.matchImageSnapshot(name, /** @type {unknown} */ (snapshotOpts));
    return cy.then(() => {});
  }
);
