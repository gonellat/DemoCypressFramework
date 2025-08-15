import { Before } from '@badeball/cypress-cucumber-preprocessor';

console.log('✅ hooks.js loaded');

Before({ tags: '@ecommerce' }, function () {
  return cy.fixture('ecommerceData').then((data) => {
    this.data = data;
  });
});
