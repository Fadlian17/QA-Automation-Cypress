import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('saya login ke aplikasi', () => {
  cy.visit('https://www.saucedemo.com/');
  cy.xpath('//input[@data-test="username"]').type('standard_user');
  cy.xpath('//input[@data-test="password"]').type('secret_sauce');
  cy.xpath('//input[@data-test="login-button"]').click();
});


When('saya menambahkan item pertama ke keranjang', () => {
  cy.xpath('(//button[contains(text(),"Add to cart")])[1]').click();
});

Then('ikon keranjang harus menunjukkan {int} item', (count) => {
  cy.xpath('//a[@class="shopping_cart_link"]/span').should('have.text', count.toString());
});
