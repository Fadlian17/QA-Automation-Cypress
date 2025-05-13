/// <reference types="cypress" />
require('cypress-xpath');

describe('OrangeHRM E2E Test Flow', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.viewport(1280, 720);
  });

  const admin = { username: 'Admin', password: 'admin123' };
  const employee = {
    firstName: 'Fadlian',
    lastName: 'Alfansyah',
    username: 'fadlian.emp',
    password: 'Abcd2345',
    firstNameAdmin: 'Fadlian',
    lastNameAdmin: ' Alfansyah',
    userAdmin: 'fadli.admin'
  };

    it('1.a Negative Case - login gagal dengan kredensial salah', () => {
      cy.xpath('//input[@name="username"]').should('be.visible').type('wronguser');
      cy.xpath('//input[@name="password"]').type('wrongpass');
      cy.xpath('//button[@type="submit"]').click();
  
      // Assertion negatif
      cy.contains('Invalid credentials').should('be.visible');
      cy.url().should('include', '/auth/login');
      cy.screenshot('negative-login');
    });
  
    it('1.b Positive Case - login berhasil dengan kredensial benar', () => {
      cy.xpath('//input[@name="username"]').should('be.visible').clear().type(admin.username);
      cy.xpath('//input[@name="password"]').clear().type(admin.password);
      cy.xpath('//button[@type="submit"]').click();
  
      // Assertion positif setelah login

      cy.url({ timeout: 10000 }).should('include', '/dashboard');

      cy.xpath('//h6[contains(normalize-space(), "Dashboard")]', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Dashboard');
      
      cy.screenshot('positive-login');
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

    it('2. Tambah Jatah Cuti untuk Karyawan', () => {
      cy.loginOrangeHRM(admin.username, admin.password);
      
      cy.contains('Leave').click();
      cy.contains('Entitlements').click();
      cy.contains('Add Entitlements').click();
    
      // --- Ketik nama karyawan ke autocomplete ---
      cy.get('input[placeholder="Type for hints..."]')
        .should('be.visible')
        .type('Fadlian  Alfansyah', { delay: 200 });
    
      cy.get('.oxd-autocomplete-dropdown')
        .should('be.visible')
        .within(() => {
          cy.contains('Fadlian ')
            .should('be.visible')
            .click();
        });
    
      // --- Pilih Leave Type ---
      cy.get('.oxd-select-text-input').eq(0).click();
      cy.get('.oxd-select-dropdown')
        .should('be.visible')
        .within(() => {
          cy.contains('US - Personal').click();
        });
    
      // --- Pilih Leave Period ---
      cy.get('.oxd-select-text-input').eq(1).click();
      cy.get('.oxd-select-dropdown')
        .should('be.visible')
        .within(() => {
          cy.contains('2025-01-01 - 2025-31-12').click();
        });
    
      // --- Isi Entitlement (menggunakan xpath) ---
      cy.xpath('//label[contains(text(), "Entitlement")]/ancestor::div[contains(@class, "oxd-input-group")]//input')
        .should('be.visible')
        .clear()
        .type('12');

    
      // --- Submit ---
      cy.get('button[type="submit"]').click();

      // --- Tunggu loading hilang ---

      cy.xpath("//div[contains(@class, 'orangehrm-modal-footer')]//button[contains(@class, 'oxd-button--secondary')]")
      .should('be.visible')
      .click();

      cy.screenshot('tambah-jatah-cuti');
    
      // --- Assertion berhasil disimpan ---
      cy.contains('Successfully Saved').should('be.visible');
    });

    it('3a. Login Karyawan & Request Cuti ', () => {
      // Login sebagai Employee
      cy.loginOrangeHRM(employee.username, employee.password);

        cy.contains('Leave').click();
      cy.contains('Apply').click();

      // Klik tab "Apply" di dalam menu topbar menggunakan class selector
      cy.get('.oxd-topbar-body-nav-tab.--visited > .oxd-topbar-body-nav-tab-item')
        .should('contain.text', 'Apply')
        .click();

      // Klik dropdown Leave Type
      cy.xpath('//label[contains(text(),"Leave Type")]/following::div[contains(@class,"oxd-select-text-input")]')
        .first()
        .should('be.visible')
        .click();

      // Pilih opsi dari dropdown
      cy.xpath('//div[@role="listbox"]//span[contains(text(),"US - Personal")]')
        .should('be.visible')
        .click();


      // From Date
      cy.xpath('//label[contains(text(),"From Date")]/ancestor::div[contains(@class,"oxd-input-group")]//input')
        .should('be.visible')
        .clear()
        .type('2025-05-13');

      // To Date
      cy.xpath('//label[text()="To Date"]/ancestor::div[contains(@class,"oxd-input-group")]//input')
        .should('be.visible')
        .clear()
        .type('2025-05-13');


      // Pilih Duration
      cy.xpath('//label[contains(text(),"Duration")]/following::div[contains(@class,"oxd-select-text--active")]')
        .click();
      cy.xpath('//div[@role="listbox"]//span[contains(text(),"Full Day")]')
        .click();

      // Isi komentar (optional)
      cy.xpath('//label[contains(text(),"Comments")]/following::textarea')
        .type('Cuti pribadi akhir tahun');

      // Klik tombol Apply
      cy.xpath('//button[contains(., "Apply")]')
        .should('be.visible')
        .click();
          // Ambil screenshot hasil
        cy.screenshot('cuti-request');

    });
    
    it('3b. Admin Approve Cuti Karyawan ', () => {
      // Login sebagai Admin
      cy.loginOrangeHRM(admin.username, admin.password);
    
      // Navigasi ke Leave List
      cy.xpath('//span[text()="Leave"]').click();
    
      // Isi tanggal pencarian
      cy.xpath('//label[contains(text(),"From Date")]/ancestor::div[contains(@class,"oxd-input-group")]//input')
        .clear()
        .type('2025-01-01');
    
      cy.xpath('//label[contains(text(),"To Date")]/ancestor::div[contains(@class,"oxd-input-group")]//input')
        .clear()
        .type('2025-31-12');
    
          // Klik tombol Search
      cy.xpath('//button[normalize-space()="Search"]').click();

      // Tunggu hasil pencarian muncul
      cy.wait(2000); // disarankan diganti dengan .should() jika memungkinkan
    
      // Centang request pertama
      cy.xpath('(//div[@class="oxd-table-card"])[1]//input[@type="checkbox"]')
        .check({ force: true }); // force digunakan jika checkbox tidak sepenuhnya terlihat

      // Klik tombol Approve pertama
      cy.xpath('//button[contains(@class,"oxd-button--label-success")]')
        .first() // ambil tombol pertama saja
        .should('be.visible')
        .click();

      // Tunggu loading hilang
        cy.xpath('//div[contains(@class,"orangehrm-modal-footer")]//button[contains(@class,"oxd-button--secondary")]')
        .should('be.visible')
        .click();    

        // Ambil screenshot hasil
      cy.screenshot('admin-approve-cuti');
    });

    it('3c. Karyawan Verifikasi Status Cuti Disetujui ', () => {
      // Login sebagai karyawan
      cy.loginOrangeHRM(employee.username, employee.password);
    
      cy.contains('Leave').click();
    
      // From Date
      cy.xpath('//label[contains(text(),"From Date")]/ancestor::div[contains(@class,"oxd-input-group")]//input')
        .should('be.visible')
        .clear()
        .type('2025-05-13');

      // To Date
      cy.xpath('//label[text()="To Date"]/ancestor::div[contains(@class,"oxd-input-group")]//input')
        .should('be.visible')
        .clear()
        .type('2025-05-13');

    
      // Klik tombol Search
      cy.xpath('//button[normalize-space()="Search"]').click();
    
      // Verifikasi status Approved muncul
      cy.xpath('//div[contains(@class,"oxd-table-card")]//div[contains(text(),"Scheduled")]')
        .should('be.visible');
    
      // Ambil screenshot hasil
      cy.screenshot('cuti-approved');
    });
});