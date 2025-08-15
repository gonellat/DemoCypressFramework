import BasePage from './BasePage';

/**
 * Page object model for the Contact Us page on https://automationexercise.com/
 * Extends common functionality from BasePage.
 */
class ContactPage extends BasePage {
  /**
   * Gets the name input field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  get nameInput() {
    return cy.get('[name="name"]');
  }

  /**
   * Gets the email input field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  get emailInput() {
    return cy.get('[name="email"]');
  }

  /**
   * Gets the subject input field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  get subjectInput() {
    return cy.get('[name="subject"]');
  }

  /**
   * Gets the message textarea field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  get messageTextarea() {
    return cy.get('[name="message"]');
  }

  /**
   * Gets the submit button.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  get submitButton() {
    return cy.get('input[type="submit"]');
  }

  /**
   * Gets the success confirmation message element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  get successMessage() {
    return cy.contains('Success! Your details have been submitted successfully.');
  }

  /**
   * Fills out the contact form with the provided data.
   * @param {string} name - Full name of the sender.
   * @param {string} email - Email address of the sender.
   * @param {string} subject - Subject of the message.
   * @param {string} message - Message body text.
   */
  fillContactForm(name, email, subject, message) {
    this.nameInput.type(name);
    this.emailInput.type(email);
    this.subjectInput.type(subject);
    this.messageTextarea.type(message);
  }

  /**
   * Submits the contact form.
   */
  submitForm() {
    this.submitButton.click();
  }

  /**
   * Asserts that the success message is visible.
   */
  verifySubmissionSuccess() {
    this.successMessage.should('be.visible');
  }
}

export default new ContactPage();
