/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Logs a test step and captures a screenshot.
     * @param label Description of the test step
     */
    captureStep(label: string): Chainable<void>;

    /**
     * Logs a test step message.
     * @param message Description of the step
     */
    logStep(message: string): Chainable<void>;

    visualSnapshot(
      name: string,
      options?: Partial<ScreenshotOptions & MatchImageSnapshotOptions>,
    ): void;

    clearCookies(): Chainable<void>;
    clearLocalStorage(): Chainable<void>;
    clearSession(): Chainable<void>;
  }
}
