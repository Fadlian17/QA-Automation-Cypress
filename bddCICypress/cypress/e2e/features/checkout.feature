Feature: Checkout

  Scenario: Melakukan checkout dengan data lengkap
    Given saya login dan menambahkan item ke keranjang
    When saya masuk ke checkout dan mengisi data
    Then checkout berhasil dilanjutkan
