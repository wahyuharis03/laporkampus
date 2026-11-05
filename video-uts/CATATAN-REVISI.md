# Catatan Naskah Video

Dokumen ini mencatat keputusan yang diambil saat menyusun naskah, termasuk
masukan yang masuk pada 30 Oktober 2026 dan perubahan besar pada 4 November 2026.

---

## 1. Masukan 30 Oktober dan penyelesaiannya

| Bagian | Sebelum | Sesudah |
| --- | --- | --- |
| Pembuka | "Setiap hari, ribuan mahasiswa memakai fasilitas kampus yang sama." | "Mahasiswa menggunakan berbagai fasilitas kampus dalam kegiatan perkuliahan sehari-hari." |
| Masalah | Empat masalah disajikan sebagai keadaan yang terjadi | Rumusan masalah resmi dipakai sebagai masalah utama; empat kartu menjadi **penjelasan awal** dengan pernyataan tegas bahwa belum diverifikasi |
| Pengguna | Persona tampil tanpa keterangan | Diberi label **PERSONA ILUSTRATIF** dan catatan "bukan hasil penelitian lapangan" |
| Cakupan | Daftar karangan sendiri | Mengikuti daftar yang ditetapkan: Login, Beranda, Form Laporan, Validasi, Daftar laporan dan statusnya |
| Klaim pengujian | "tujuh pengujian otomatis" | Dihapus dari narasi |

Ketiga hal yang semula tidak cocok dengan kode sudah diselesaikan dengan
menyesuaikan **video ke kode**, bukan sebaliknya:

| Hal | Keadaan kode | Keputusan pada video |
| --- | --- | --- |
| Jumlah kolom formulir | Enam kolom (`form_laporan_page.dart` baris 175–255) | Video menyebut dan menampilkan **enam kolom** |
| Label status | `Menunggu / Diproses / Selesai` (`data_laporan.dart` baris 43–45) | Video memakai label yang sama |
| Pengujian otomatis | Tujuh `testWidgets`, semuanya lulus | Tidak diklaim di narasi; buktinya ada bila ditanyakan |

---

## 2. Perubahan 4–5 November: video disusun ulang mengikuti brief UTS

Brief UTS meminta isi yang jauh lebih lengkap daripada versi sebelumnya
(3 menit 18 detik, 7 adegan). Versi sekarang **7 menit 15 detik, 14 adegan**:

| No | Adegan | Isi |
| --- | --- | --- |
| 1 | Pembuka | Nama, NIM, kelas, judul aplikasi |
| 2 | Masalah | Rumusan masalah + empat penjelasan awal |
| 3 | Pengguna | Persona ilustratif + empat kebutuhan |
| 4 | Kebutuhan | Lima user story dan prioritasnya (Must/Should) |
| 5 | Rancangan | User flow dan sitemap lima halaman |
| 6 | Wireframe | Lima wireframe dan hasil implementasinya |
| 7–12 | Demo | Login, Beranda, Formulir, Pengisian, Kirim, Daftar |
| 13 | Rencana teknis | Tech stack, koleksi Firestore, aturan keamanan |
| 14 | Penutup | Rencana pertemuan 9–15, kendala, pelajaran |

Demo pada adegan 7–12 memakai **rekaman layar sendiri** aplikasi yang berjalan di
Chrome — bukan animasi, bukan slide, dan bukan rekaman otomatis. Rekaman asli
berdurasi 148 detik; yang dipakai 119 detik dalam enam potongan, dipotong pada
transisi halaman supaya alurnya lurus. Nilai yang tampil di layar (Gedung D5-04, kategori Lainnya, urgensi
Rendah, 1 unit, deskripsi AC) adalah nilai yang benar-benar diketik saat merekam,
dan narasi dibuat mengikuti nilai itu — bukan sebaliknya.

## 3. Batas yang dijaga

1. **Tidak ada angka yang tidak bisa dipertanggungjawabkan.** Jumlah kolom,
   jumlah halaman, dan jumlah pengujian hanya disebut bila sesuai kode.
2. **Masalah tidak diklaim sebagai hasil penelitian.** Adegan masalah memuat
   catatan di layar bahwa empat penjelasannya adalah penjelasan awal, bukan
   hasil wawancara atau observasi lapangan.
3. **Persona diberi label ilustratif** di layar, bukan hanya di narasi.
4. **Data masih di memori.** Narasi menyebutnya apa adanya; Firestore adalah
   rancangan, bukan yang sudah berjalan.
5. **Istilah status sama dengan aplikasi:** Menunggu, Diproses, Selesai.

---

## 4. Yang perlu disiapkan sebelum presentasi

| Prioritas | Pekerjaan | Alasan |
| --- | --- | --- |
| 1 | Jalankan `flutter test` sekali lagi sebelum tampil | Memastikan tujuh tes masih lulus di mesin presentasi |
| 2 | Siapkan jawaban "kenapa belum ada wawancara?" | Video sudah menyatakan masalah bersumber dari rumusan proyek |
| 3 | Siapkan jawaban "kapan Firestore dipakai?" | Rancangan sudah ada; implementasi dijadwalkan Pertemuan 9 |
