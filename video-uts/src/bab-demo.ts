import type {BabDemo} from './scenes/Demo';

/**
 * Enam bab demo, dipotong dari rekaman layar sendiri (1920x1020, Chrome).
 * Batas potong diambil pada transisi halaman, bukan pada durasi narasi —
 * lihat scripts/potong-rekaman-user.py.
 *
 * Dipakai dua komposisi: video UTS penuh (src/Video.tsx) dan video demo
 * mandiri (src/DemoSaja.tsx).
 */
export const BAB_DEMO: Record<string, BabDemo> = {
  'demo-login': {
    klip: 'usr-login',
    judul: 'Login',
    caption:
      'Masuk tanpa isian ditolak dengan pesan merah. Setelah NIM dan password diisi, pengguna masuk ke Beranda.',
    langkah: 1,
    detik: 18.9,
    ekor: 'usr-login-akhir.png',
  },
  'demo-beranda': {
    klip: 'usr-beranda',
    judul: 'Beranda',
    caption:
      'Tiga kartu ringkasan dan laporan terbaru. Satu laporan dibuka untuk melihat halaman detail.',
    langkah: 2,
    detik: 14.1,
    ekor: 'usr-beranda-akhir.png',
  },
  'demo-form': {
    klip: 'usr-form',
    judul: 'Formulir',
    caption:
      'Enam kolom wajib. Kirim kosong memunculkan pesan merah di bawah tiap kolom.',
    langkah: 3,
    detik: 37.5,
  },
  'demo-isi': {
    klip: 'usr-isi',
    judul: 'Pengisian',
    caption:
      'Jumlah unit, deskripsi, lalu kirim. Pesan kesalahan muncul tepat di bawah kolom yang salah.',
    langkah: 4,
    detik: 26.1,
    ekor: 'usr-isi-akhir.png',
  },
  'demo-kirim': {
    klip: 'usr-kirim',
    judul: 'Kirim',
    caption:
      'SnackBar hijau, kembali ke Beranda, laporan baru di posisi teratas, dan total berubah 3 → 4.',
    langkah: 5,
    detik: 10.2,
    ekor: 'usr-kirim-akhir.png',
  },
  'demo-daftar': {
    klip: 'usr-daftar',
    judul: 'Daftar',
    caption:
      'Laporan baru ikut tampil di Laporan Saya. Filter Menunggu dan Selesai langsung menyaring daftar.',
    langkah: 6,
    detik: 12.4,
    ekor: 'usr-daftar-akhir.png',
  },
};

/** Urutan bab, sama dengan urutan adegan demo di narasi.json. */
export const URUTAN_DEMO = [
  'demo-login',
  'demo-beranda',
  'demo-form',
  'demo-isi',
  'demo-kirim',
  'demo-daftar',
] as const;

/** Enam langkah untuk daftar di kartu pembuka. */
export const LANGKAH_DEMO = [
  'Login dengan validasi',
  'Beranda dan detail laporan',
  'Formulir enam kolom',
  'Pengisian dan pesan kesalahan',
  'Kirim laporan',
  'Daftar dan filter status',
];
