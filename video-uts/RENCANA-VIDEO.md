# Rencana Video Proposal LaporKampus

**Remotion + TTS gratis (edge-tts)**
Disusun 30 Oktober 2026 · Wahyu Hari Santosa · 23.01.55.0003

---

## 1. Tujuan

Menghasilkan satu berkas video yang menjelaskan tiga hal yang diminta panduan UTS — **masalah, target pengguna, dan scope** — tanpa perlu merekam diri sendiri, dan tanpa biaya layanan apa pun.

Video ini adalah bagian "proposal lewat video" pada syarat UTS, bukan demo aplikasi. Demo aplikasi sudah punya skenario tersendiri di dokumen persiapan UTS (Bab 8), jadi video ini fokus pada alasan di balik aplikasi.

**Keluaran:** `laporkampus-proposal.mp4`, 1920×1080, 30 fps, H.264 + AAC, durasi sekitar 2 menit 20 detik.

---

## 2. Fakta lingkungan (sudah diverifikasi, bukan asumsi)

| Kebutuhan | Status | Keterangan |
| --- | --- | --- |
| Node.js | Siap | 22.22.2 (managed) |
| npm | Siap | 11.16.0, registry terjangkau |
| Remotion | Belum dipasang | `npm install` dari registry, ukuran ± 120 MB |
| TTS Bahasa Indonesia | **Siap dan sudah diuji** | `edge-tts` 7.3.1, suara `id-ID-ArdiNeural` / `id-ID-GadisNeural` |
| Uji sintesis nyata | Lulus | 1 kalimat → 4,248 detik, MP3 24 kHz 48 kbps |
| Pengukur durasi audio | Siap | `mutagen`, membaca durasi MP3 secara tepat |
| Chrome untuk render | Siap | Dipakai lewat `--browser-executable`, hemat unduhan ± 150 MB |
| ffmpeg | Tidak ada | Tidak dibutuhkan; Remotion membawa ffmpeg internal untuk muxing |
| Tangkapan layar aplikasi | Siap | 7 berkas di `docs/` |

Catatan penting: `edge-tts` memakai layanan suara Microsoft Edge secara gratis dan **butuh internet saat membuat audio**. Kalau internet mati di tengah proses, audio dibuat ulang saja — hasilnya deterministik, jadi tidak merusak apa pun.

---

## 3. Arsitektur teknis

```
narasi.json                 daftar adegan + teks narasi
      │
      ▼
scripts/tts.py              edge-tts → public/audio/<adegan>.mp3
      │                     mutagen  → durasi tiap berkas
      ▼
src/timings.json            { id, frames, detik } per adegan
      │
      ▼
src/Video.tsx               <Series> — durasi tiap adegan = durasi audionya
      │                     <Audio> — satu berkas per adegan, mulai bersamaan
      ▼
npx remotion render         → out/laporkampus-proposal.mp4
```

Kunci sinkronisasi: **audio yang menentukan durasi, bukan sebaliknya.** Setiap adegan dihitung dari durasi MP3-nya ditambah jeda 0,4 detik, lalu dikonversi ke jumlah frame (`detik × 30`). Jadi kalau teks narasi diubah, video ikut menyesuaikan tanpa perlu mengatur timing manual. Ini yang membuat prosesnya bisa diulang tanpa kerja tangan.

Struktur berkas:

```
video-uts/
  package.json
  remotion.config.ts
  narasi.json
  scripts/tts.py
  public/audio/*.mp3          (dibangkitkan)
  public/shots/*.png          (salinan tangkapan layar)
  src/
    index.ts                  titik masuk Remotion
    Root.tsx                  pendaftaran komposisi
    Video.tsx                 rangkaian adegan
    timings.json              (dibangkitkan)
    theme.ts                  warna, jarak, tipografi
    scenes/
      Pembuka.tsx
      Masalah.tsx
      Target.tsx
      Cakupan.tsx
      Penutup.tsx
    components/
      Latar.tsx               latar bergerak halus
      LabelBagian.tsx         label "01 MASALAH" di kiri atas
      Kartu.tsx               kartu dengan animasi masuk
  out/laporkampus-proposal.mp4
```

---

## 4. Struktur adegan

Lima adegan. Angka durasi adalah perkiraan dari kecepatan bicara terukur (≈141 kata per menit, dari uji sintesis).

| No | Adegan | Durasi | Isi visual |
| --- | --- | --- | --- |
| 1 | Pembuka | ± 13 s | Judul LaporKampus, subjudul, identitas kecil |
| 2 | Masalah | ± 55 s | Empat kartu masalah muncul berurutan, bernomor 01–04 |
| 3 | Target pengguna | ± 30 s | Kartu persona: nama, peran, lalu empat atribut |
| 4 | Cakupan | ± 35 s | Dua kolom: Termasuk (5 butir) dan Di luar cakupan (5 butir) |
| 5 | Penutup | ± 14 s | Tiga tangkapan layar, judul, nama dan NIM |

Total ± 147 detik.

---

## 5. Naskah narasi (perlu diperiksa sebelum dibangkitkan)

### Adegan 1 — Pembuka

> Setiap hari, ribuan mahasiswa memakai fasilitas kampus yang sama. Ketika ada yang rusak, siapa yang mencatatnya? Aplikasi ini bernama LaporKampus.

### Adegan 2 — Masalah

> Selama ini, laporan kerusakan disampaikan lewat grup chat, pesan pribadi, atau lisan. Akibatnya ada empat masalah.
>
> Pertama, laporan tercecer. Pesan tenggelam oleh obrolan lain dalam hitungan jam, sehingga tidak ada satu pun daftar kerusakan yang masih terbuka.
>
> Kedua, tidak ada status. Pelapor tidak pernah tahu apakah laporannya sudah dibaca, sedang dikerjakan, atau selesai. Akibatnya laporan yang sama dikirim berulang kali oleh orang berbeda.
>
> Ketiga, informasi tidak seragam. Satu laporan menyebut lab lantai dua, laporan lain menyebut ruang spesifik. Petugas harus menebak.
>
> Keempat, tidak ada jejak. Karena tidak tercatat, tidak ada data untuk menentukan fasilitas mana yang paling sering rusak.

### Adegan 3 — Target pengguna

> Pengguna utama aplikasi ini adalah mahasiswa yang memakai fasilitas bersama.
>
> Personanya Dimas, mahasiswa semester lima yang aktif di dua organisasi. Ia melapor sambil berdiri di lokasi kejadian, memakai ponsel dan data seluler.
>
> Yang ia butuhkan hanya dua. Formulir yang singkat, dan kepastian status laporannya.
>
> Yang membuatnya jengkel juga dua. Formulir panjang, dan laporan yang tidak pernah dibalas.

### Adegan 4 — Cakupan

> Cakupan aplikasi ini saya batasi pada satu alur inti. Mahasiswa melapor, laporan tercatat, status dapat dipantau.
>
> Yang masuk cakupan: lima halaman terhubung, formulir enam kolom dengan validasi, penyaringan status, dan tata letak yang menyesuaikan ukuran layar.
>
> Yang sengaja saya keluarkan: basis data sungguhan, unggah foto, peran petugas, notifikasi, dan peta.
>
> Bukan karena tidak mampu, tetapi karena satu alur harus selesai dan teruji lebih dahulu.

### Adegan 5 — Penutup

> Lima halaman, satu formulir tervalidasi, tujuh pengujian otomatis. LaporKampus. Dibuat oleh Wahyu Hari Santosa.

NIM dan tautan repository **ditampilkan di layar**, tidak dibacakan, karena angka panjang terdengar janggal kalau disuarakan.

---

## 6. Arah visual

Mengikuti warna aplikasi supaya video dan produk terasa satu kesatuan.

| Peran | Warna | Alasan |
| --- | --- | --- |
| Latar | `#14121A` | Gelap, membuat teks dan tangkapan layar menonjol |
| Teks utama | `#F5F3F0` | Kontras tinggi, tidak menyilaukan |
| Aksen | `#C4183C` | Maroon `#800020` versi lebih terang agar terbaca di latar gelap |
| Teks sekunder | `#9A93A8` | Untuk label dan keterangan |
| Garis | `#2C2836` | Pemisah halus |

Tipografi: **Segoe UI** untuk teks dan **Georgia** untuk judul, keduanya sudah ada di Windows sehingga tidak perlu mengunduh font. Ukuran judul 96 px, isi 40–48 px — aman dibaca di ponsel.

Gerak: setiap elemen masuk dengan *fade* dan naik 24 px selama 18 frame, memakai `spring` bawaan Remotion. Tidak ada transisi yang memotong, supaya tidak memicu gerak berlebih. Latar diberi dua lingkaran samar yang bergerak sangat lambat agar layar tidak terasa mati.

---

## 7. Langkah kerja

| Fase | Pekerjaan | Cara memastikan berhasil |
| --- | --- | --- |
| 1 | Siapkan project Remotion, pasang dependensi | `npx remotion compositions` menampilkan komposisi |
| 2 | Tulis `narasi.json`, jalankan `tts.py` | 5 berkas MP3 ada, `timings.json` terisi durasi nyata |
| 3 | Bangun tema dan lima adegan | `npx remotion studio` bisa dibuka, tiap adegan tampil |
| 4 | Render draf resolusi rendah | MP4 720p terbentuk, audio tersinkron |
| 5 | Periksa hasil: potong gambar di 5 titik, cek durasi total | Tangkapan layar video sesuai rancangan |
| 6 | Render final 1080p | MP4 final, ukuran dan durasi sesuai |

Fase 4 sengaja mendahului fase 6: render 720p butuh waktu jauh lebih singkat, jadi kesalahan desain ketahuan lebih awal.

---

## 8. Risiko dan penanganan

| Risiko | Dampak | Penanganan |
| --- | --- | --- |
| Remotion mengunduh Chrome Headless Shell | Proses lama / gagal | Pakai `--browser-executable` ke Chrome yang sudah terpasang |
| Versi React tidak cocok dengan Remotion | Gagal bundling | Kunci React 18, sesuai kebutuhan Remotion 4 |
| edge-tts butuh internet | Audio gagal dibuat | Ulangi; hasil deterministik. Bila tetap gagal, mundur ke `gTTS` |
| Teks Indonesia terpotong di kartu | Terbaca janggal | Batasi tiap kartu maksimal 2 baris, uji di studio sebelum render |
| Narasi terlalu cepat/panjang | Adegan terasa sesak | Durasi mengikuti audio, jadi tidak akan terpotong; yang perlu dijaga hanya panjang teks di layar |

---

## 9. Yang perlu diputuskan sebelum saya mulai

1. **Durasi** — ± 2 menit 20 detik (sesuai naskah di atas), dipadatkan ke ± 90 detik, atau diperpanjang ke ± 3 menit.
2. **Suara** — `Ardi` (pria) atau `Gadis` (wanita).
3. **Tema visual** — gelap dengan aksen maroon, atau terang mengikuti tampilan aplikasi.
4. **Tangkapan layar aplikasi** — disertakan di adegan penutup, atau video murni animasi teks.

---

## 10. Catatan tentang kebersihan repository

Project video berada di `video-uts/` di dalam repository. Saran: simpan **kode sumbernya** (menunjukkan pekerjaan tambahan), tetapi abaikan `node_modules/`, `out/`, dan `public/audio/` lewat `.gitignore`, karena ketiganya besar dan bisa dibangkitkan ulang.
