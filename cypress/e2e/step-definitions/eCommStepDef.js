// @ts-check
/// <reference types="cypress" />

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import eCommerceHomePage from '../pages/eCommerceHomePage.js';

/** @typedef {import("../pages/ProductPage.js").default} ProductPage */
/** @typedef {import("../pages/CartPage.js").default} CartPage */
/** @typedef {{ username?: string; password?: string; productName?: string }} FixtureData */
/** @typedef {{ data?: FixtureData, productPage?: ProductPage, cartPage?: CartPage }} MyWorld */
/** @typedef {{ rawTable: string[][] }} DataTable */

// Shared instance
/** @type {eCommerceHomePage} */
let homePage;

/**
 * Get base URL from config or env
 * @returns {string}
 */
function resolveBaseUrl() {
  const cfgUrl = Cypress.config('baseUrl');
  const envUrl = Cypress.env('url');
  const baseUrl = cfgUrl || envUrl;
  if (!baseUrl) {
    throw new Error(
      "Missing base URL. Run with --env configEnv=sample and ensure env/.env.sample contains 'url=...'"
    );
  }
  return baseUrl;
}

Given(
  /^I am on (?:the )?Ecommerce Page$/i,
  /** @type {any} */ (
    function () {
      /** @type {MyWorld} */
      const self = this;
      homePage = new eCommerceHomePage();
      const baseUrl = resolveBaseUrl();
      homePage.goTo(`${baseUrl}/loginpagePractise/`);
    }
  )
);

When(
  'I login to the application',
  /** @type {any} */ (
    function () {
      /** @type {MyWorld} */
      const self = this;
      if (!self.data?.username || !self.data?.password) {
        throw new Error('Missing login credentials in self.data');
      }
      self.productPage = homePage.login(self.data.username, self.data.password);
      self.productPage.pageValidation();
      self.productPage.getCardCount().should('have.length', 4);
    }
  )
);

When(
  'I login to the application portal',
  /** @type {any} */ (
    function (/** @type {DataTable} */ dataTable) {
      /** @type {MyWorld} */
      const self = this;
      const [, [username, password]] = dataTable.rawTable;
      self.productPage = homePage.login(username, password);
      self.productPage.pageValidation();
      self.productPage.getCardCount().should('have.length', 4);
    }
  )
);

When(
  'I add items to Cart and checkout',
  /** @type {any} */ (
    function () {
      /** @type {MyWorld} */
      const self = this;
      if (!self.productPage) throw new Error('productPage not set');
      const productName = self.data?.productName ?? 'Default Product';
      self.productPage.selectProduct(productName);
      self.productPage.selectFirstProduct();
      self.cartPage = self.productPage.goToCart();
    }
  )
);

When(
  'Validate the total price limit',
  /** @type {any} */ (
    function () {
      /** @type {MyWorld} */
      const self = this;
      if (!self.cartPage) throw new Error('cartPage not set');
      self.cartPage.sumOfProducts().then((sum) => {
        expect(sum).to.be.lessThan(200000);
      });
    }
  )
);

Then(
  'select the country submit and verify Thankyou',
  /** @type {any} */ (
    function () {
      /** @type {MyWorld} */
      const self = this;
      if (!self.cartPage) throw new Error('cartPage not set');
      const confirmationPage = self.cartPage.checkOutItems();
      confirmationPage.submitFormDetails();
      confirmationPage.getAlertMessage().should('contain', 'Success');
    }
  )
);
