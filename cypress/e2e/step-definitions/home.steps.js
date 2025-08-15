// @ts-check
/// <reference types="cypress" />

/**
 * Step definitions for home page navigation.
 * Implements: Given "I open the home page"
 */

import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the home page', () => {
  cy.visit('https://automationexercise.com');
});
