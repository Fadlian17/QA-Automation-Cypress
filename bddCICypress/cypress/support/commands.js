// cypress/support/commands.js
Cypress.Commands.add('loginSauce', (username, password) => {
    cy.xpath('//input[@data-test="username"]').type(username);
    cy.xpath('//input[@data-test="password"]').type(password);
    cy.xpath('//input[@data-test="login-button"]').click();
  });
  