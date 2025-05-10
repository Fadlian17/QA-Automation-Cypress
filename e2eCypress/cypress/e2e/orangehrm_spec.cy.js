describe('OrangeHRM E2E Test Flow', () => {
  const admin = { username: 'Admin', password: 'admin123' };
  const employee = {
    firstName: 'Fadlian',
    lastName: 'Alfansyah',
    username: 'fadlian.employee1',
    password: 'Abcd2345',
    firstNameAdmin: 'Fadlian',
    lastNameAdmin: ' Alfansyah',
    userAdmin: 'fadli.admin'
  };

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.viewport(1280, 720);
  });

  it('1a. Login sebagai Admin - Positive & Negative Case', () => {

    it('Negative Case - login gagal dengan kredensial salah', () => {
      cy.get('input[name="username"]').should('be.visible').type('wronguser');
      cy.get('input[name="password"]').type('wrongpass');
      cy.get('button[type="submit"]').click();
  
      // Assertion negatif
      cy.contains('Invalid credentials').should('be.visible');
      cy.url().should('include', '/auth/login');
      cy.screenshot('negative-login');
    });
  
    it('Positive Case - login berhasil dengan kredensial benar', () => {
      cy.get('input[name="username"]').should('be.visible').clear().type(admin.username);
      cy.get('input[name="password"]').clear().type(admin.password);
      cy.get('button[type="submit"]').click();
  
      // Assertion positif
      cy.url().should('include', '/dashboard');
      cy.get('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
        .should('contain.text', 'Dashboard');
      cy.screenshot('positive-login');
    });
  });

  it('1b. Tambah Karyawan Baru via PIM', () => {
    // Login Admin
    cy.loginOrangeHRM(admin.username, admin.password);
  // Navigasi ke Add Employee
  cy.contains('PIM', { timeout: 5000 }).click();
  cy.contains('Add Employee', { timeout: 5000 }).click();

  // Isi nama karyawan
  cy.get('input[name="firstName"]').should('be.visible').type(employee.firstName);
  cy.get('input[name="lastName"]').type(employee.lastName);

  // Aktifkan switch untuk membuat login details
  cy.get('span.oxd-switch-input').click();

  // Isi username & password karyawan
  cy.get('input.oxd-input.oxd-input--active[autocomplete="off"]').eq(0).type(employee.username);// Username
  cy.get('input[type="password"]').eq(0).type(employee.password); // Password
  cy.get('input[type="password"]').eq(1).type(employee.password); // Confirm Password

  // Klik Save
  cy.get('button[type="submit"]').should('contain.text', 'Save').click();

  // Assertion: pastikan nama karyawan terlihat
  cy.contains(`${employee.firstName} ${employee.lastName}`, { timeout: 5000 }).should('be.visible');
  cy.screenshot('tambah-karyawan');
  });

  it('1c. Tambah User via Menu Admin', () => {
    cy.loginOrangeHRM(admin.username, admin.password);
    cy.contains('Admin').click();
    cy.contains('Add').click();

    cy.get('.oxd-select-text').first().click();
    cy.contains('ESS').click();

    // Ketik nama karyawan ke autocomplete
    cy.get('input[placeholder="Type for hints..."]')
    .should('be.visible')
    .type(`${employee.firstNameAdmin}`, { delay: 200 });

    // Tunggu dropdown muncul dan pilih yang cocok
    cy.get('.oxd-autocomplete-dropdown')
    .should('be.visible')
    .within(() => {
      cy.contains(`${employee.firstNameAdmin}`)
        .should('be.visible')
        .click();
    });


    cy.get('input.oxd-input').eq(1).type(employee.userAdmin);
    cy.get('.oxd-select-text').eq(1).click();
    cy.contains('Enabled').click();

    cy.get('input.oxd-input').eq(2).type(employee.password);
    cy.get('input.oxd-input').eq(3).type(employee.password);
    // Klik Save
    cy.get('button[type="submit"]').should('contain.text', 'Save').click();
    cy.screenshot('tambah-admin-user');

  });

  // it('2. Tambah Jatah Cuti untuk Karyawan', () => {
  //   cy.loginOrangeHRM(admin.username, admin.password);
  //   cy.contains('Leave').click();
  //   cy.contains('Entitlements').click();
  //   cy.contains('Add Entitlements').click();

  //   cy.get('input[placeholder="Type for hints..."]').type(`${employee.firstName} ${employee.lastName}`);
  //   cy.get('.oxd-autocomplete-dropdown > div').first().click();

  //   cy.get('.oxd-select-text').eq(1).click();
  //   cy.contains('Annual Leave').click();

  //   cy.get('input[type="number"]').last().type('5');
  //   cy.get('button[type="submit"]').click();

  //   cy.contains('Successfully Saved').should('exist');
  // });

  // it('3a. Login Karyawan & Request Cuti', () => {
  //   cy.loginOrangeHRM(employee.username, employee.password);

  //   cy.contains('Leave').click();
  //   cy.contains('Apply').click();

  //   cy.get('.oxd-select-text').click();
  //   cy.contains('Annual Leave').click();

  //   cy.get('input[placeholder="yyyy-mm-dd"]').eq(0).type('2023-04-20');
  //   cy.get('input[placeholder="yyyy-mm-dd"]').eq(1).type('2024-04-20');

  //   cy.get('button[type="submit"]').click();
  //   cy.contains('Successfully Submitted').should('exist');
  // });

  // it('3b. Admin Approve Cuti Karyawan', () => {
  //   cy.loginOrangeHRM(admin.username, admin.password);

  //   cy.contains('Leave').click();
  //   cy.contains('Leave List').click();

  //   cy.get('input[placeholder="yyyy-mm-dd"]').first().clear().type('2023-04-20');
  //   cy.get('input[placeholder="yyyy-mm-dd"]').eq(1).clear().type('2024-04-20');
  //   cy.contains('Search').click();

  //   cy.get('input[type="checkbox"]').eq(1).check();
  //   cy.contains('Approve').click();

  //   cy.contains('Successfully Updated').should('exist');
  // });

  // it('3c. Karyawan Verifikasi Status Cuti Disetujui', () => {
  //   cy.loginOrangeHRM(employee.username, employee.password);

  //   cy.contains('My Leave').click();
  //   cy.get('input[placeholder="yyyy-mm-dd"]').first().clear().type('2023-04-20');
  //   cy.get('input[placeholder="yyyy-mm-dd"]').eq(1).clear().type('2023-04-20');
  //   cy.contains('Search').click();

  //   cy.contains('Approved').should('exist');
  //   cy.screenshot("cuti-approved");
  // });
});