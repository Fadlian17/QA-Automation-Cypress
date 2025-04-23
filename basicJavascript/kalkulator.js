const readline = require('readline');

const calc = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi operasi
function hitung(a, b, operasi) {
  switch (operasi) {
    case 1: return a + b;
    case 2: return a - b;
    case 3: return a * b;
    case 4: return b === 0 ? "Error: Tidak bisa dibagi 0" : a / b;
    default: return "Operasi tidak valid";
  }
}
// run program node {nama file}
console.log("=== Kalkulator Sederhana ===");
console.log("1. Penjumlahan \n2. Pengurangan \n3. Perkalian\n4. Pembagian");

calc.question("Pilih operasi (1-4): ", (pilihan) => {
  calc.question("Angka pertama: ", (a) => {
    calc.question("Angka kedua: ", (b) => {
      const x = parseFloat(a);
      const y = parseFloat(b);
      const op = parseInt(pilihan);

      if (isNaN(x) || isNaN(y) || op < 1 || op > 4) {
        console.log("Input tidak valid!");
      } else {
        console.log(`Hasil: ${hitung(x, y, op)}`);
      }
      calc.close();
    });
  });
});
