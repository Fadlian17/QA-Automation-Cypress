Given('saya membuka halaman login', () => {
  cy.visit('https://www.saucedemo.com/');
});

When('saya login dengan username {string} dan password {string}', (username, password) => {
  cy.xpath('//input[@data-test="username"]').type(username);
  cy.xpath('//input[@data-test="password"]').type(password);
  cy.xpath('//input[@data-test="login-button"]').click();
});

Then('saya harus melihat halaman produk', () => {
  cy.xpath('//span[text()="Products"]').should('be.visible');
});

Then('saya harus melihat pesan error', () => {
  cy.xpath('//h3[@data-test="error"]').should('be.visible');
});
