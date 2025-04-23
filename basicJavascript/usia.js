// Fungsi untuk menentukan kategori usia
function getKategoriUsia(usia) {
  if (usia >= 0 && usia <= 12) {
    return "Anak-anak";
  } else if (usia >= 13 && usia <= 17) {
    return "Remaja";
  } else if (usia >= 18 && usia <= 59) {
    return "Dewasa";
  } else if (usia >= 60) {
    return "Lansia";
  } else {
    return "Tidak valid";
  }
}

// Inisialisasi array untuk input usia (bisa diganti dengan input manual)
const dataUsia = [10, 15, 30, 65, 7, 13, 18, 60, 5, 45];

// Counter kategori
let jumlahKategori = {
  "Anak-anak": 0,
  "Remaja": 0,
  "Dewasa": 0,
  "Lansia": 0
};

// Looping untuk memproses setiap usia
for (let i = 0; i < dataUsia.length; i++) {
  const kategori = getKategoriUsia(dataUsia[i]);
  if (kategori in jumlahKategori) {
    jumlahKategori[kategori]++;
  }
}

// Menampilkan hasil lewat konsol dijalankan dengan node {nama file}
console.log(`Anak-anak : ${jumlahKategori["Anak-anak"]} orang`);
console.log(`Remaja    : ${jumlahKategori["Remaja"]} orang`);
console.log(`Dewasa    : ${jumlahKategori["Dewasa"]} orang`);
console.log(`Lansia    : ${jumlahKategori["Lansia"]} orang`);
