import BasePage from './BasePage.js';
import ConfirmationPage from './ConfirmationPage';

/**
 *
 */
class CartPage extends BasePage {
  /**
   *
   */
  sumOfProducts() {
    let sum = 0;
    return cy
      .get('tr td:nth-child(4) strong')
      .each(($e1) => {
        const amount = Number($e1.text().split(' ')[1].trim());
        sum = sum + amount;
      })
      .then(() => {
        return cy.wrap(sum);
      });
  }

  /**
   *
   */
  checkOutItems() {
    cy.contains('button', 'Checkout').click();
    return new ConfirmationPage();
  }
}

// And.. module.exports = CartPage;
export default CartPage;
