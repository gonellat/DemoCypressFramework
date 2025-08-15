/// <reference types="Cypress" />

describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/');

    cy.intercept('GET', '**/Library/GetBook.php?AuthorName=shetty', {
      statusCode: 200,
      body: [
        {
          book_name: 'Learn Appium Automation with Java',
          isbn: 'RSU1',
          aisle: '2301',
        },
      ],
    }).as('bookretrievals');

    cy.get("button[class='btn btn-primary']").click();

    // Need to wait for the intercepted request and capture the response
    cy.wait('@bookretrievals').then(({ response }) => {
      cy.get('tr').should('have.length', response.body.length + 1);
    });
    cy.get('p').should('have.text', 'Oops only 1 Book available');

    //length of the response array = rows of the table
  });
});
