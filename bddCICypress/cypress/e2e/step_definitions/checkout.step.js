import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('saya login dan menambahkan item ke keranjang', () => {
  cy.visit('https://www.saucedemo.com/');
  cy.xpath('//input[@data-test="username"]').type('standard_user');
  cy.xpath('//input[@data-test="password"]').type('secret_sauce');
  cy.xpath('//input[@data-test="login-button"]').click();
  cy.xpath('(//button[contains(text(),"Add to cart")])[1]').click();
  cy.xpath('//a[@class="shopping_cart_link"]').click();
});

When('saya masuk ke checkout dan mengisi data', () => {
  cy.xpath('//button[@data-test="checkout"]').click();
  cy.xpath('//input[@data-test="firstName"]').type('John');
  cy.xpath('//input[@data-test="lastName"]').type('Doe');
  cy.xpath('//input[@data-test="postalCode"]').type('12345');
  cy.xpath('//input[@data-test="continue"]').click();
});

Then('checkout berhasil dilanjutkan', () => {
  cy.xpath('//span[text()="Checkout: Overview"]').should('be.visible');
});
