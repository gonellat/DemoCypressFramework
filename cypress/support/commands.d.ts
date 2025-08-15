/// <reference types="cypress" />

declare namespace Cypress {
  interface VisualSnapshotOptions extends Partial<ScreenshotOptions> {
    /** Skip visual snapshot even if plugin is installed */
    skip?: boolean;
    /** Allow arbitrary plugin-specific options */
    [key: string]: unknown;
  }

  interface Chainable {
    /**
     * Provided by cypress-image-snapshot.
     */
    matchImageSnapshot(name?: string, options?: unknown): Chainable<void>;

    /**
     * Your custom visual snapshot wrapper (skips via env or { skip: true }).
     */
    visualSnapshot(name: string, options?: VisualSnapshotOptions): Chainable<void>;

    /**
     * Logging helpers you defined
     */
    logStep(message: string): Chainable<void>;
    clearSession(): Chainable<void>;
    captureStep(label: string): Chainable<void>;

    /**
     * Run a SQL Server query using a configured database connection.
     * @param query SQL query string
     * @example
     *   cy.sqlServer('SELECT * FROM Users')
     */
    sqlServer(query: string): Chainable<any>;
  }
}
