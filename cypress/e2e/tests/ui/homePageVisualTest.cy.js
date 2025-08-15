// @ts-check
import { withBaseTest } from './withBaseTest';

describe('Demo Account Signup Test', () => {
  withBaseTest((/** @type {import('../../../support/pageFactory.js').PagesApi} */ Pages) => {
    it('should create an account successfully', () => {
      Pages.homePage.visit(); // ✅ now jumps to the method
    });
  });
});
