import ProductPage from './ProductPage';

/**
 *
 */
class eCommerceHomePage {
  /**
   *
   * @param url
   */
  goTo(url) {
    cy.visit(url);
  }
  /**
   *
   * @param username
   * @param password
   */
  login(username, password) {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.contains('Sign In').click();
    return new ProductPage();
  }
}
export default eCommerceHomePage;
