Feature: Shopping Cart

  Scenario: Menambahkan item ke keranjang
    Given saya login ke aplikasi
    When saya menambahkan item pertama ke keranjang
    Then ikon keranjang harus menunjukkan 1 item
