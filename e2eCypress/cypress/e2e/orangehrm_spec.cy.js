describe('OrangeHRM E2E Test Flow', () => {
    const admin = { username: 'Admin', password: 'admin123' };
    const employee = {
      firstName: 'Fadlian',
      lastName: 'Alfansyah',
      username: 'fadlian.emp',
      password: 'Test1234!'
    };
  
    it('1a. Login sebagai Admin (Positive & Negative)', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
      // Negative
      cy.get('input[name="username"]').type('salah');
      cy.get('input[name="password"]').type('salah123');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid credentials').should('be.visible');
  
      // Positive
      cy.get('input[name="username"]').clear().type(admin.username);
      cy.get('input[name="password"]').clear().type(admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  
  });