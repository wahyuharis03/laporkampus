# LaporKampus

Aplikasi pelaporan kerusakan fasilitas kampus. Mahasiswa dapat mencatat laporan
fasilitas yang rusak dan memantau status penanganannya, sehingga pengaduan tidak
lagi tercecer di grup chat atau disampaikan secara lisan.

Proyek individu MK Mobile and Web Application Development, Semester Ganjil 2026/2027.

## Identitas

- **Nama:** Wahyu Hari Santosa
- **NIM:** 23.01.55.0003
- **Kelas:** A1 / A2DLC
- **Nama project Flutter:** `laporkampus`

## Tautan

- **Desain Figma (Minggu 4):**
  <https://www.figma.com/make/RiyY93QWEjZXQP93Cx6Sui/Untitled?code-node-id=0-6&p=f&t=EnpQyA2fcK40nQhe-0&fullscreen=1>
- **Repository GitHub:** <https://github.com/wahyuharis03/laporkampus>

## Tangkapan layar

| Halaman Login | Halaman Beranda |
| --- | --- |
| ![Halaman Login](docs/screenshot-login.png) | ![Halaman Beranda](docs/screenshot-beranda.png) |

## Fitur yang sudah ada

| Halaman | Status | Keterangan |
| --- | --- | --- |
| Login | Selesai (UI) | Input NIM dan password, tombol lihat password, validasi kolom kosong |
| Beranda | Selesai (UI) | Sapaan, tombol aksi utama "Buat Laporan", kartu menu "Laporan Saya" |
| Form Laporan | Belum | Direncanakan pada pertemuan 6–7 |
| Laporan Saya | Belum | Direncanakan pada pertemuan 6–7 |
| Detail Laporan | Belum | Prioritas Should |

Login masih berupa simulasi: setiap NIM dan password yang tidak kosong akan masuk
ke Beranda. Firebase Authentication belum dihubungkan pada tahap ini.

## Cara menjalankan

Prasyarat: Flutter SDK 3.x, Chrome, dan Git.

```bash
# 1. Ambil kode
git clone https://github.com/wahyuharis03/laporkampus.git
cd laporkampus

# 2. Pasang dependensi
flutter pub get

# 3. Jalankan di Chrome
flutter run -d chrome
```

Perintah pendukung:

```bash
flutter analyze   # memeriksa masalah kode
flutter test      # menjalankan widget test
```

## Struktur project

```
lib/
  main.dart            # tema aplikasi, LoginPage, BerandaPage
test/
  widget_test.dart     # pengujian validasi login dan navigasi ke Beranda
docs/
  screenshot-login.png
  screenshot-beranda.png
web/  android/  ios/    # pengaturan platform, jarang diubah
pubspec.yaml           # dependensi dan metadata project
```

## Gaya visual

Mengikuti style guide mini Minggu 4:

- Warna primer maroon `#800020`
- Latar halaman `#F5F6F8`, teks utama `#25283A`
- Radius sudut 10, tinggi tombol utama 52
- Warna status: berhasil `#15803D`, menunggu `#D97706`, galat `#DC2626`

## Batasan project

- Flutter + Dart, Firebase paket Spark (tanpa billing account)
- Autentikasi email/password, bukan OTP telepon
- Tanpa Cloud Functions dan payment gateway
- Satu peran pengguna: mahasiswa

## Riwayat pertemuan

| Minggu | Luaran |
| --- | --- |
| 1 | Ide aplikasi, kanvas, problem statement |
| 2 | Persona, user story, kebutuhan berprioritas, use case inti |
| 3 | User flow, sitemap, prioritas halaman, rancangan navigasi |
| 4 | Wireframe dan style guide mini di Figma |
| 5 | Project Flutter berjalan, repository GitHub, README |
