describe('User API Tests', () => {
  beforeEach(function () {
    cy.fixture('testUser').as('userData');
  });

  it('should create a new user', function () {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/users', this.userData).then(
      (response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.include(this.userData);
      }
    );
  });

  it('should return a 200 for a valid GET request', () => {
    cy.request('https://jsonplaceholder.typicode.com/users/1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
    });
  });
});
