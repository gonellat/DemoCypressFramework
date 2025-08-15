// cypress/support/pageFactory.js
import AccountInfoPage from '../e2e/pages/AccountInfoPage.js';
import HomePage from '../e2e/pages/HomePage.js';
import LoginSignupPage from '../e2e/pages/LoginSignupPage.js';

let _homePage, _loginSignupPage, _accountInfoPage;

export const Pages = {
  /**
   * Lazily instantiate HomePage
   * @returns {HomePage}
   */
  get homePage() {
    if (!_homePage) _homePage = new HomePage();
    return _homePage;
  },

  /**
   * Lazily instantiate LoginSignupPage
   * @returns {LoginSignupPage}
   */
  get loginSignupPage() {
    if (!_loginSignupPage) _loginSignupPage = new LoginSignupPage();
    return _loginSignupPage;
  },

  /**
   * Lazily instantiate AccountInfoPage
   * @returns {AccountInfoPage}
   */
  get accountInfoPage() {
    if (!_accountInfoPage) _accountInfoPage = new AccountInfoPage();
    return _accountInfoPage;
  },
};
