Feature: Login ke aplikasi SauceDemo

  Scenario: Login berhasil
    Given saya membuka halaman login
    When saya mengisi username "standard_user" dan password "secret_sauce"
    And saya klik tombol login
    Then saya berhasil masuk ke halaman inventory
