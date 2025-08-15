// @ts-check
/// <reference types="cypress" />

/**
 * Page Factory (ESM) with JSDoc types so IntelliSense knows each page's shape.
 * Adds CartPage, ConfirmationPage, and ProductPage to your existing pages.
 */

import AccountInfoPage from '../e2e/pages/AccountInfoPage.js';
import HomePage from '../e2e/pages/HomePage.js';
import LoginSignupPage from '../e2e/pages/LoginSignupPage.js';
import CartPage from '../e2e/pages/CartPage.js';
import ConfirmationPage from '../e2e/pages/ConfirmationPage.js';
import ProductPage from '../e2e/pages/ProductPage.js';
import eCommerceHomePage from '../e2e/pages/eCommerceHomePage.js';

/**
 * Private cached instances (lazy init in getters).
 * @type {HomePage | undefined}
 */
let _homePage;
/** @type {LoginSignupPage | undefined} */
let _loginSignupPage;
/** @type {AccountInfoPage | undefined} */
let _accountInfoPage;
/** @type {CartPage | undefined} */
let _cartPage;
/** @type {ConfirmationPage | undefined} */
let _confirmationPage;
/** @type {ProductPage | undefined} */
let _productPage;
/** @type {eCommerceHomePage | undefined} */
let _eCommerceHomePage;

/**
 * Public Pages API type:
 * Ensures strong IntelliSense like Pages.homePage.visit()
 * @typedef {object} PagesApi
 * @property {HomePage} homePage
 * @property {LoginSignupPage} loginSignupPage
 * @property {AccountInfoPage} accountInfoPage
 * @property {CartPage} cartPage
 * @property {ConfirmationPage} confirmationPage
 * @property {ProductPage} productPage
 * @property {eCommerceHomePage} eCommerceHomePage
 */

/**
 * Lazily constructs and returns page objects with strong types.
 * Consumers get full IntelliSense for all pages.
 * @type {PagesApi}
 */
export const Pages = {
  /**
   * Lazily instantiate eCommerceHomePage
   * @returns {eCommerceHomePage}
   */
  get eCommerceHomePage() {
    if (!_eCommerceHomePage) _eCommerceHomePage = new eCommerceHomePage();
    return /** @type {eCommerceHomePage} */ (_eCommerceHomePage);
  },

  /**
   * Lazily instantiate HomePage
   * @returns {HomePage}
   */
  get homePage() {
    if (!_homePage) _homePage = new HomePage();
    return /** @type {HomePage} */ (_homePage);
  },

  /**
   * Lazily instantiate LoginSignupPage
   * @returns {LoginSignupPage}
   */
  get loginSignupPage() {
    if (!_loginSignupPage) _loginSignupPage = new LoginSignupPage();
    return /** @type {LoginSignupPage} */ (_loginSignupPage);
  },

  /**
   * Lazily instantiate AccountInfoPage
   * @returns {AccountInfoPage}
   */
  get accountInfoPage() {
    if (!_accountInfoPage) _accountInfoPage = new AccountInfoPage();
    return /** @type {AccountInfoPage} */ (_accountInfoPage);
  },

  /**
   * Lazily instantiate CartPage
   * @returns {CartPage}
   */
  get cartPage() {
    if (!_cartPage) _cartPage = new CartPage();
    return /** @type {CartPage} */ (_cartPage);
  },

  /**
   * Lazily instantiate ConfirmationPage
   * @returns {ConfirmationPage}
   */
  get confirmationPage() {
    if (!_confirmationPage) _confirmationPage = new ConfirmationPage();
    return /** @type {ConfirmationPage} */ (_confirmationPage);
  },

  /**
   * Lazily instantiate ProductPage
   * @returns {ProductPage}
   */
  get productPage() {
    if (!_productPage) _productPage = new ProductPage();
    return /** @type {ProductPage} */ (_productPage);
  },
};
