import BasePage from './BasePage.js';
import CartPage from './CartPage';

/**
 *
 */
class ProductPage extends BasePage {
  /**
   *
   */
  pageValidation() {
    cy.contains('Shop Name').should('be.visible');
  }

  /**
   *
   */
  getCardCount() {
    return cy.get('app-card');
  }

  /**
   *
   */
  selectFirstProduct() {
    cy.get('app-card').eq(0).contains('button', 'Add').click();
  }

  /**
   *
   */
  goToCart() {
    cy.contains('a', 'Checkout').click();
    return new CartPage();
  }

  /**
   *
   * @param productName
   */
  selectProduct(productName) {
    cy.get('app-card')
      .filter(`:contains("${productName}")`)
      .then(($element) => {
        cy.wrap($element).should('have.length', 1);
        cy.wrap($element).contains('button', 'Add').click();
      });
  }
}
export default ProductPage;
