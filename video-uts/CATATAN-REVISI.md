# Catatan Revisi Naskah Video

Revisi 30 Oktober 2026, menindaklanjuti masukan pada bagian A (masalah),
B (target pengguna), dan C (scope).

---

## 1. Ringkasan yang berubah

| Bagian | Sebelum | Sesudah |
| --- | --- | --- |
| Pembuka | "Setiap hari, ribuan mahasiswa memakai fasilitas kampus yang sama." | "Mahasiswa menggunakan berbagai fasilitas kampus dalam kegiatan perkuliahan sehari-hari." |
| Masalah | Empat masalah disajikan sebagai keadaan yang terjadi | Rumusan masalah resmi dipakai sebagai masalah utama; empat kartu menjadi **penjelasan awal** dengan pernyataan tegas bahwa belum diverifikasi |
| Target | Persona Dimas tampil tanpa keterangan | Diberi label **PERSONA ILUSTRATIF** dan catatan "bukan hasil penelitian lapangan"; empat kebutuhan memakai rumusan yang diminta |
| Scope | Daftar karangan sendiri, 5 masuk / 5 keluar | Persis mengikuti daftar yang ditetapkan: Login NIM + password, Beranda, Form Laporan, Validasi, Daftar laporan dan statusnya |
| Alur | Lima halaman setara | Empat halaman inti; Detail Laporan dipisah sebagai **TAMBAHAN** (prioritas Should) |
| Bukti | "6 kolom", "4 jenis masukan", "7 pengujian lulus" | Adegan diganti menjadi **Validasi & Status**; angka kolom dan angka pengujian dihapus |
| Basis data | Empat tabel + rencana integrasi | Digabung ke adegan Validasi & Status sebagai pernyataan bahwa data masih simulasi dan integrasi basis data produksi di luar cakupan |
| Penutup | "…tujuh pengujian otomatis." | Klaim pengujian dihapus; diganti ringkasan empat halaman inti |

Jumlah adegan turun dari 8 menjadi 7. Durasi berubah dari 3:29 menjadi 3:18.

---

## 2. Tiga hal yang perlu Anda putuskan

Masukan itu menyebut beberapa keadaan yang **tidak sama dengan kode yang ada sekarang**.
Saya sudah periksa ulang, dan berikut buktinya. Saya tidak mengubah kode, hanya naskah.

### a. Jumlah kolom formulir

Masukan menyebut formulir baru memuat tiga informasi utama: nama fasilitas, lokasi, dan deskripsi.
Kenyataannya `lib/pages/form_laporan_page.dart` punya **enam** kolom:

| Baris | Kolom |
| --- | --- |
| 175 | Lokasi fasilitas |
| 185 | Kategori kerusakan |
| 205 | Tingkat urgensi |
| 227 | Tanggal kejadian |
| 242 | Jumlah unit rusak |
| 255 | Deskripsi kerusakan |

Naskah sekarang **tidak menyebut jumlah kolom sama sekali**, jadi aman untuk kedua versi.
Tapi saat demo, layar akan menunjukkan enam kolom. Kalau memang tiga kolom yang diinginkan,
formulirnya perlu disederhanakan lebih dulu — bukan naskahnya yang disesuaikan.

### b. Label status

Masukan menetapkan tiga status: **Dilaporkan**, **Sedang Dikerjakan Sarpras**, **Terverifikasi Selesai**.
Kode masih memakai label lain, di `lib/data/data_laporan.dart` baris 43–45:

```
statusMenunggu = 'Menunggu'
statusDiproses = 'Diproses'
statusSelesai  = 'Selesai'
```

Video sekarang memakai tiga label yang ditetapkan. **Ini akan terlihat bertentangan saat demo**,
karena aplikasi menampilkan "Menunggu / Diproses / Selesai". Sebelum presentasi, ganti label di
`data_laporan.dart` (dan di `label_status.dart` bila ada pemetaan warna) agar sama.

### c. Klaim pengujian otomatis

Masukan meminta klaim "tujuh pengujian otomatis" dihapus sampai pengujian benar-benar dibuat
dan dijalankan. Pengujiannya **sudah ada dan lulus** — saya jalankan ulang saat revisi:

```
00:02 +6: Form valid menyimpan laporan ke daftar di memori
00:03 +7: All tests passed!
```

Tujuh `testWidgets` di `test/widget_test.dart`, semuanya lulus, `flutter analyze` bersih.

Klaim itu tetap saya hapus dari narasi sesuai permintaan, karena menghilangkan sesuatu yang
benar bukan kebohongan. Tapi kalau dosen beranggapan pengujian belum ada, Anda punya bukti
untuk menunjukkan sebaliknya — cukup jalankan `flutter test` di depan kelas.

---

## 3. Satu catatan tambahan

Masukan menyebut Detail Laporan sebagai "fitur tambahan (Should), bukan keharusan utama".
Halaman itu **sudah dibuat** (`lib/pages/detail_laporan_page.dart`) dan berfungsi.
Karena itu di video ia tidak disebut sebagai rencana, melainkan ditandai **TAMBAHAN** —
sudah ada, tetapi bukan bagian dari alur inti. Ini sesuai dengan status Should yang dimaksud.

---

## 4. Yang perlu disiapkan sebelum presentasi

| Prioritas | Pekerjaan | Alasan |
| --- | --- | --- |
| 1 | Samakan label status di `data_laporan.dart` dengan tiga status di video | Menghindari kontradiksi video dan layar |
| 2 | Putuskan: formulir 6 kolom dipertahankan, atau disederhanakan jadi 3 | Naskah sudah netral, tapi demo akan menunjukkan jumlah sebenarnya |
| 3 | Siapkan jawaban bila ditanya "kenapa belum ada wawancara?" | Video sudah menyatakan masalah bersumber dari rumusan proyek, bukan penelitian lapangan |
