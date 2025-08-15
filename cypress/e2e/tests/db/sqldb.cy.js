// @ts-check
/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/window');
  });

  it('cy.window() - get the global window object', () => {
    cy.window().should('have.property', 'top');
  });

  it('Database Interaction', () => {
    // Ensure cy.sqlServer is registered in your commands.js file
    cy.sqlServer('SELECT * FROM Persons').then((result) => {
      // result[0][1] assumes a 2D array structure — adjust as needed
      console.log(result[0][1]);
    });
  });
});
