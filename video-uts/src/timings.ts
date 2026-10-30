// Berkas ini dibangkitkan oleh scripts/tts.py — jangan disunting manual.
// Durasi tiap adegan berasal dari panjang audio yang sebenarnya.

export type Adegan = {
  id: string;
  label: string;
  teks: string;
  audio: string;
  detik: number;
  frames: number;
};

export const FPS = 30;
export const TOTAL_FRAMES = 5940;

export const ADEGAN: Adegan[] = [
  { id: "pembuka", label: "PEMBUKA", teks: "Mahasiswa menggunakan berbagai fasilitas kampus dalam kegiatan perkuliahan sehari-hari. Ketika ada fasilitas yang rusak atau bermasalah, penyampaian dan pemantauan pengaduannya menjadi persoalan. Aplikasi ini bernama LaporKampus.", audio: "audio/pembuka.mp3", detik: 15.096, frames: 465 },
  { id: "masalah", label: "MASALAH", teks: "Rumusan masalah proyek ini adalah: mahasiswa mengalami kesulitan dalam menyampaikan dan memantau pengaduan fasilitas kampus ketika menemukan fasilitas yang rusak atau bermasalah. Akibatnya, laporan sulit dicatat dan statusnya sulit diketahui. Kesulitan itu bisa dijelaskan lewat empat hal. Perlu dicatat, keempatnya adalah penjelasan awal, bukan hasil wawancara atau observasi. Pertama, laporan berpindah lewat banyak saluran, sehingga sulit terkumpul di satu tempat. Kedua, status pengaduan tidak terlihat, sehingga mahasiswa tidak tahu sudah sejauh mana penanganannya. Ketiga, informasi lokasi dan kerusakan tidak seragam, sehingga laporan sulit ditindaklanjuti. Keempat, tidak ada catatan yang tersimpan, sehingga riwayat pengaduan tidak bisa ditelusuri.", audio: "audio/masalah.mp3", detik: 50.04, frames: 1514 },
  { id: "target", label: "TARGET PENGGUNA", teks: "Pengguna utama aplikasi ini adalah mahasiswa. Persona berikut bersifat ilustratif, bukan hasil penelitian lapangan. Ia melapor sambil berdiri di lokasi kejadian. Ada empat kebutuhan yang paling relevan. Menyampaikan laporan kerusakan dengan mudah. Mengisi informasi lokasi dan kerusakan secara jelas. Melihat daftar laporan yang pernah dikirim. Dan mengetahui perkembangan status laporan.", audio: "audio/target.mp3", detik: 28.344, frames: 863 },
  { id: "cakupan", label: "CAKUPAN", teks: "Cakupan aplikasi ini adalah proyek awal, bukan sistem pengelolaan seluruh pekerjaan Sarpras. Karena itu batasnya dibuat tegas. Yang termasuk dalam cakupan: login menggunakan NIM dan password, beranda mahasiswa, form laporan kerusakan, validasi formulir, serta daftar laporan beserta statusnya. Yang berada di luar cakupan: integrasi basis data produksi, akun dan dashboard petugas Sarpras, notifikasi otomatis, peta lokasi fasilitas, dan unggah foto sebagai fitur wajib. Pembatasan ini bukan karena tidak mampu, tetapi agar satu alur inti selesai lebih dahulu.", audio: "audio/cakupan.mp3", detik: 37.68, frames: 1143 },
  { id: "alur", label: "ALUR APLIKASI", teks: "Alurnya dimulai dari login dengan NIM dan password, lalu mahasiswa tiba di Beranda yang merangkum laporan menurut status. Dari sana ia membuka form laporan kerusakan, dan formulir memvalidasi setiap isian sebelum laporan disimpan. Laporan yang tersimpan muncul di halaman Laporan Saya beserta statusnya. Halaman Detail Laporan tersedia sebagai fitur tambahan.", audio: "audio/alur.mp3", detik: 22.224, frames: 679 },
  { id: "validasi", label: "VALIDASI & STATUS", teks: "Formulir tidak langsung menerima isian. Setiap kolom diperiksa, dan pesan kesalahan muncul bila ada yang belum benar. Status laporan dirancang dalam tiga tahap: Dilaporkan, Sedang Dikerjakan Sarpras, dan Terverifikasi Selesai. Untuk tahap awal, data masih berupa simulasi, sehingga laporan kembali ke contoh awal ketika aplikasi dimuat ulang. Integrasi basis data produksi berada di luar cakupan.", audio: "audio/validasi.mp3", detik: 27.072, frames: 825 },
  { id: "penutup", label: "PENUTUP", teks: "Login, beranda, form laporan, dan daftar laporan dengan statusnya. LaporKampus memusatkan pencatatan dan pemantauan pengaduan fasilitas kampus dalam satu alur. Dibuat oleh Wahyu Hari Santosa.", audio: "audio/penutup.mp3", detik: 14.616, frames: 451 },
];
