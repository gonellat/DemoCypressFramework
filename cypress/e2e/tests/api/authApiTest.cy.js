import { loginViaApi } from '../../../support/apiHelpers';

describe('Login using API helper', () => {
  it('gets a token and uses it', () => {
    loginViaApi().then((res) => {
      const token = res.body.token;

      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/2',
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});

describe('Multiple login attempts using fixture', () => {
  before(function () {
    cy.fixture('userList').as('users');
  });

  it('tries each login', function () {
    console.log('✅ this.users:', this.users);

    this.users.forEach((user) => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        failOnStatusCode: false,
        body: user,
      }).then((res) => {
        cy.log(`Tried login: ${user.email}`);
        cy.log(`Status: ${res.status}`);
      });
    });
  });
});
