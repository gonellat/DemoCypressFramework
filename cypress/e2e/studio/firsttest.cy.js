/// <reference types="cypress" />

describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    /* ==== Generated with Cypress Studio ==== */

    //below code belongs to Login Page -
    // use copilot.
    // Add the this code and sample classes with an explanation and it will generate it for you.
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('[href="#/offers"]').click();
    cy.get(':nth-child(1) > .product-image > img').click();
    cy.get('.modal-wrapper.active').click();
    cy.get(':nth-child(2) > .product-action > button').click();
    cy.get('.cart-icon > img').click();
    cy.get('.cart-preview > .action-block > button').click();
    cy.get(
      '[style="text-align: right; width: 100%; margin-top: 20px; margin-right: 10px;"] > :nth-child(14)'
    ).click();
    cy.get('select').select('Afghanistan');
    cy.get('.chkAgree').check();
    cy.get('button').click();
    /* ==== End Cypress Studio ==== */
  });
});

// ✅ Step 1 — Enable Cypress Studio in config

// In your cypress.config.js (or .ts), add:

// e2e: {
//   experimentalStudio: true,
//   // other options...
// }

// ⚠️ Even though Cypress Studio is considered “experimental,” it’s stable enough for most UI flows.

// ✅ Step 2 — Launch Cypress in interactive mode

// Run:

// npx cypress open

// Then:

// Select the E2E Testing mode

// Choose Chrome (or any browser)

// Select a .cy.js test file

// ✅ Step 3 — Use Cypress Studio in the runner

// Inside the test runner, locate a test block:

// it('my test', () => {
//   // blank test
// });

// Click the ➕ icon next to it (appears when you hover) — this activates Studio

// Interact with your app:

// Click buttons

// Type in fields

// Select dropdowns

// Submit forms

// Studio will record each interaction and show a "Save Commands" button.

// Click Save Commands — Cypress will inject code directly into your test file.

// ✅ Step 4 — Review the generated test

// You'll see something like:

// it('my test', () => {
//   cy.get('input[name="email"]').type('demo@example.com');
//   cy.get('button[type="submit"]').click();
// });

// You can now customize or extend this code as needed.

// 🧠 Pro tips:

// Works best in tests that already have a structure (describe + it)

// Use Studio for fast prototyping, then refactor to page objects

// You can only edit one test at a time

// Use .only to focus on a single test if needed
