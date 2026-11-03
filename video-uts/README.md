# Video Presentasi UTS LaporKampus

Video presentasi UTS yang mengikuti alur brief: pembuka, masalah dan pengguna,
kebutuhan dan prioritas, rancangan, demo aplikasi yang berjalan, lalu rencana
teknis dan penutup.

Dibuat dengan [Remotion](https://remotion.dev) (React → video), narasi
[edge-tts](https://github.com/rany2/edge-tts), dan perekaman demo memakai
[Playwright](https://playwright.dev) yang menjalankan aplikasi Flutter di Chrome.

Hasil: `out/laporkampus-uts.mp4` — 1920×1080, 30 fps, H.264 + AAC, **7 menit 30 detik**.

**Unduh:** <https://github.com/wahyuharis03/laporkampus/releases/download/video-uts-final/laporkampus-uts.mp4>

Berkas video tidak disimpan di dalam repository, melainkan dilampirkan sebagai
aset Release `video-uts-final`. Riwayat perubahan naskah ada di
[CATATAN-REVISI.md](CATATAN-REVISI.md).

## Struktur adegan

| No | Adegan | Durasi audio |
| --- | --- | --- |
| 1 | Pembuka — identitas dan judul | 22,70 s |
| 2 | Masalah — rumusan + empat penjelasan | 43,54 s |
| 3 | Pengguna — persona ilustratif + kebutuhan | 33,46 s |
| 4 | Kebutuhan — lima user story dan prioritas | 44,69 s |
| 5 | Rancangan — user flow dan sitemap | 53,57 s |
| 6 | Wireframe — lima frame dan implementasinya | 24,10 s |
| 7 | Demo — Login | 19,34 s |
| 8 | Demo — Beranda | 13,01 s |
| 9 | Demo — Form Laporan | 19,87 s |
| 10 | Demo — validasi menolak isian salah | 25,44 s |
| 11 | Demo — kirim dan simpan data | 23,40 s |
| 12 | Demo — daftar dan keadaan kosong | 18,26 s |
| 13 | Demo — detail laporan | 14,76 s |
| 14 | Rencana teknis — stack dan Firestore | 60,12 s |
| 15 | Penutup — rencana 9–15, kendala, pelajaran | 27,17 s |
| | **Total** | **450,4 s (7:30)** |

## Kenapa audio dulu, video kemudian

Panjang setiap adegan **ditentukan oleh durasi audionya**, bukan dikira-kira.
`scripts/tts.py` membangkitkan MP3 per adegan, mengukur durasinya dengan `mutagen`,
lalu menulis `src/timings.ts`. Remotion membaca berkas itu untuk menentukan
`durationInFrames` tiap `Series.Sequence`.

Kalau teks narasi diubah, jalankan ulang `tts.py`, dan video menyesuaikan sendiri
tanpa menggeser timing secara manual.

## Cara demo direkam

Demo bukan slide dan bukan animasi tiruan. Aplikasi Flutter dijalankan sebagai web,
lalu Playwright mengisi form, menekan tombol, dan merekam layarnya:

```bash
# 1. Bangun dan sajikan aplikasi
flutter build web --release
python -m http.server 8099 --bind 127.0.0.1 --directory ../build/web

# 2. Rekam demo (butuh Chrome dan `npx playwright install ffmpeg`)
node scripts/rekam-demo.mjs

# 3. Potong per bab sesuai durasi narasi
python scripts/potong-demo.py
```

`rekam-demo.mjs` mencatat penanda waktu tiap bab ke `out/demo/marks.json`.
`potong-demo.py` memotong rekaman pada penanda itu, menghitung sendiri jeda awal
video, lalu mengubahnya menjadi MP4 30 fps. Hasilnya disalin ke `public/demo/`.

Kursor pada rekaman adalah elemen DOM yang disuntikkan skrip, supaya gerakan mouse
terlihat. Aplikasi tetap berjalan seperti biasa.

## Menjalankan ulang

Prasyarat: Node.js 18+, Python 3.10+, Chrome terpasang, dan koneksi internet
(hanya untuk membangkitkan audio).

```bash
npm install

# Narasi -> audio -> timing
# (butuh: pip install edge-tts mutagen)
python scripts/tts.py

npm run studio     # pratinjau
npm run render     # render final
```

Mengubah isi video:

| Yang ingin diubah | Berkas |
| --- | --- |
| Kalimat narasi, suara, kecepatan bicara | `narasi.json` → `python scripts/tts.py` |
| Warna, font, jarak | `src/theme.ts` |
| Isi dan tata letak satu adegan | `src/scenes/<Nama>.tsx` |
| Urutan adegan | `src/Video.tsx` |
| Alur demo yang direkam | `scripts/rekam-demo.mjs` |

## Prinsip naskah

1. **Masalah memakai rumusan yang sudah ditetapkan**, dan empat kartu penjelas
   dinyatakan terang-terangan sebagai penjelasan awal — bukan hasil wawancara.
2. **Persona diberi label ilustratif** di layar, bukan hanya di narasi.
3. **Tidak ada angka yang tidak bisa dipertanggungjawabkan.** Jumlah kolom dan
   jumlah pengujian hanya disebut bila sesuai dengan kode.
4. **Istilah status sama dengan aplikasi:** Menunggu, Diproses, Selesai.

## Catatan teknis

- **Chrome tidak diunduh ulang.** `remotion.config.ts` menunjuk ke Chrome yang sudah
  terpasang lewat `Config.setBrowserExecutable`.
- **ffmpeg tidak perlu dipasang.** Remotion membawa ffmpeg sendiri untuk muxing audio;
  skrip pemotong memakai biner yang sama.
- **Tidak ada transisi CSS.** Semua gerak dihitung dari nomor frame lewat `spring()`.
- **Suara:** `id-ID-ArdiNeural`, kecepatan `-3%`.
- **Internet hanya dipakai saat `tts.py` berjalan.**

## Berkas yang tidak masuk Git

`node_modules/`, `out/`, `public/audio/`, `public/shots/`, dan `public/demo/`
diabaikan karena besar dan bisa dibangkitkan ulang. Tangkapan layar di
`public/shots/` disalin otomatis dari `../docs/` oleh `tts.py`.
