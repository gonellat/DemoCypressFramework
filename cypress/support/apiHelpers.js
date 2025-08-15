/**
 * Logs in via API using static credentials.
 * @returns {Cypress.Chainable<Cypress.Response>}
 */
export function loginViaApi() {
  return cy.request('POST', 'https://reqres.in/api/login', {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });
}
