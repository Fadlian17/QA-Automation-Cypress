import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('saya membuka halaman login', () => {
  cy.visit('https://www.saucedemo.com/');
});

When('saya mengisi username {string} dan password {string}', (username, password) => {
  cy.xpath('//input[@data-test="username"]').type(username);
  cy.xpath('//input[@data-test="password"]').type(password);
});

When('saya klik tombol login', () => {
  cy.xpath('//input[@data-test="login-button"]').click();
});

Then('saya berhasil masuk ke halaman inventory', () => {
  cy.url().should('include', '/inventory.html');
  cy.xpath('//span[text()="Products"]').should('be.visible');
});
