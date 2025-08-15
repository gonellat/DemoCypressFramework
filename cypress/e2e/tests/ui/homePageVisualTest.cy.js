import { withBaseTest } from './withBaseTest';

/**
 * @visual @regression
 */
describe('Home Page Visual Test', () => {
  withBaseTest((Pages) => {
    it('should visually match the homepage layout', () => {
      Pages.homePage.visit();

      if (Cypress.env('visualTesting') !== false) {
        cy.matchImageSnapshot('home-page');
      }
    });
  });
});
