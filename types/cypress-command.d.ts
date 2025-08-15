/// <reference types="cypress" />

/**
 * Minimal, IDE-friendly cypress-image-snapshot options.
 * Kept loose to stay compatible across plugin versions.
 */
interface MatchImageSnapshotOptions {
  failureThreshold?: number;
  failureThresholdType?: 'percent' | 'pixel';
  capture?: 'viewport' | 'runner' | 'fullPage';
  blackout?: string[];
  customDiffConfig?: Record<string, unknown>;
  customSnapshotIdentifier?: (parameters: {
    testPath: string;
    currentTestName: string;
    counter: number;
    defaultIdentifier: string;
  }) => string;
}

/**
 * If your PageFactory is plain JS, we can’t import its types.
 * Use `any` for now to keep IntelliSense happy in commands; later you can add JSDoc typedefs in your pageFactory.js.
 */
type PagesType = any;

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Log a high-visibility step into the Cypress Command Log.
       * @example cy.logStep("Open login page")
       */
      logStep(message: string): Chainable<void>;

      /**
       * Clear cookies, localStorage and (when available) sessionStorage.
       * @example cy.clearSession()
       */
      clearSession(): Chainable<void>;

      /**
       * Log a step and take a screenshot using a stable file name.
       * @example cy.captureStep("after-login")
       */
      captureStep(label: string): Chainable<void>;

      /**
       * Take a visual snapshot (cypress-image-snapshot).
       * Skips when `Cypress.env("visualTesting") === false`.
       * @example cy.visualSnapshot("home-page", { failureThreshold: 0.005 })
       */
      visualSnapshot(
        name: string,
        options?: Partial<Cypress.ScreenshotOptions & MatchImageSnapshotOptions>
      ): Chainable<void>;
    }

    interface Cypress {
      /** Page Object registry injected at runtime (JS, so typed as any by default) */
      Pages: PagesType;
    }
  }
}

export {};
