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
export const TOTAL_FRAMES = 6273;

export const ADEGAN: Adegan[] = [
  { id: "pembuka", label: "PEMBUKA", teks: "Setiap hari, ribuan mahasiswa memakai fasilitas kampus yang sama. Ketika ada yang rusak, siapa yang mencatatnya? Aplikasi ini bernama LaporKampus, dan video ini menjelaskan mengapa ia dibuat.", audio: "audio/pembuka.mp3", detik: 13.776, frames: 426 },
  { id: "masalah", label: "MASALAH", teks: "Selama ini, laporan kerusakan disampaikan lewat grup chat, pesan pribadi, atau lisan. Akibatnya ada empat masalah. Pertama, laporan tercecer. Pesan tenggelam oleh obrolan lain dalam hitungan jam, sehingga tidak ada satu pun daftar kerusakan yang masih terbuka. Kedua, tidak ada status. Pelapor tidak pernah tahu apakah laporannya sudah dibaca, sedang dikerjakan, atau selesai. Akibatnya laporan yang sama dikirim berulang kali oleh orang berbeda. Ketiga, informasi tidak seragam. Satu laporan menyebut lab lantai dua, laporan lain menyebut ruang spesifik. Petugas harus menebak. Keempat, tidak ada jejak. Karena tidak tercatat, tidak ada data untuk menentukan fasilitas mana yang paling sering rusak.", audio: "audio/masalah.mp3", detik: 51.408, frames: 1555 },
  { id: "target", label: "TARGET PENGGUNA", teks: "Pengguna utama aplikasi ini adalah mahasiswa yang memakai fasilitas bersama. Personanya Dimas, mahasiswa semester lima yang aktif di dua organisasi. Ia melapor sambil berdiri di lokasi kejadian, memakai ponsel dan data seluler. Yang ia butuhkan hanya dua. Formulir yang singkat, dan kepastian status laporannya. Yang membuatnya jengkel juga dua. Formulir panjang, dan laporan yang tidak pernah dibalas.", audio: "audio/target.mp3", detik: 29.208, frames: 889 },
  { id: "cakupan", label: "CAKUPAN", teks: "Cakupan aplikasi ini saya batasi pada satu alur inti. Mahasiswa melapor, laporan tercatat, status dapat dipantau. Yang masuk cakupan: lima halaman terhubung, formulir enam kolom dengan validasi, penyaringan status, dan tata letak yang menyesuaikan ukuran layar. Yang sengaja saya keluarkan: basis data sungguhan, unggah foto, peran petugas, notifikasi, dan peta. Bukan karena tidak mampu, tetapi karena satu alur harus selesai dan teruji lebih dahulu.", audio: "audio/cakupan.mp3", detik: 32.76, frames: 995 },
  { id: "alur", label: "ALUR APLIKASI", teks: "Alurnya sederhana. Mahasiswa masuk, lalu tiba di Beranda yang merangkum jumlah laporan menurut status. Dari sana ia menekan tombol buat laporan, mengisi formulir, dan laporan itu langsung muncul di halaman Laporan Saya. Setiap kartu bisa dibuka untuk melihat rinciannya. Di ponsel navigasi berada di bawah, di layar lebar berpindah ke samping.", audio: "audio/alur.mp3", detik: 23.328, frames: 712 },
  { id: "bukti", label: "BUKTI", teks: "Formulirnya punya enam kolom dengan empat jenis masukan: teks, dropdown, pemilih tanggal, dan angka. Setiap kolom punya aturan sendiri, dan pesan kesalahannya berbeda-beda supaya pengujian tidak tertukar. Tujuh pengujian otomatis memeriksa alur ini, dan seluruhnya lulus.", audio: "audio/bukti.mp3", detik: 18.744, frames: 575 },
  { id: "basisdata", label: "RENCANA DATABASE", teks: "Data saat ini masih disimpan di memori, jadi laporan hilang ketika aplikasi dimuat ulang. Rencana basis datanya sudah disusun: empat tabel utama, yaitu pengguna, laporan, riwayat status, dan kategori. Setiap kolom formulir punya kolom padanan, dan setiap aturan validasi punya aturan padanan di basis data, supaya klien tidak bisa dilewati.", audio: "audio/basisdata.mp3", detik: 23.424, frames: 715 },
  { id: "penutup", label: "PENUTUP", teks: "Lima halaman, satu formulir tervalidasi, tujuh pengujian otomatis. LaporKampus. Dibuat oleh Wahyu Hari Santosa, untuk memastikan tidak ada lagi laporan yang hilang.", audio: "audio/penutup.mp3", detik: 13.104, frames: 406 },
];
