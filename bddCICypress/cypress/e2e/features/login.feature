Feature: Login ke SauceDemo

  Scenario: Login sukses dengan kredensial valid
    Given saya membuka halaman login
    When saya login dengan username "standard_user" dan password "secret_sauce"
    Then saya harus melihat halaman produk

  Scenario: Login gagal dengan kredensial salah
    Given saya membuka halaman login
    When saya login dengan username "invalid_user" dan password "wrong_pass"
    Then saya harus melihat pesan error
