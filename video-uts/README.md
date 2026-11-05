# Video Presentasi UTS LaporKampus

Video presentasi UTS yang mengikuti alur brief: pembuka, masalah dan pengguna,
kebutuhan dan prioritas, rancangan, demo aplikasi yang berjalan, lalu rencana
teknis dan penutup.

Dibuat dengan [Remotion](https://remotion.dev) (React → video) dan narasi
[edge-tts](https://github.com/rany2/edge-tts). Bagian demo memakai rekaman layar
aplikasi Flutter yang berjalan di Chrome.

Hasil: `out/laporkampus-uts.mp4` — 1920×1080, 30 fps, H.264 + AAC, **7 menit 15 detik**.

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
| 7 | Demo — Login dan validasi | 19,25 s |
| 8 | Demo — Beranda dan detail laporan | 11,42 s |
| 9 | Demo — formulir dan validasi kosong | 37,61 s |
| 10 | Demo — pengisian dan kirim | 26,18 s |
| 11 | Demo — SnackBar hijau dan ringkasan | 11,30 s |
| 12 | Demo — daftar dan filter | 13,54 s |
| 13 | Rencana teknis — stack dan Firestore | 60,12 s |
| 14 | Penutup — rencana 9–15, kendala, pelajaran | 27,17 s |
| | **Total** | **435,2 s (7:15)** |

## Kenapa audio dulu, video kemudian

Panjang setiap adegan **ditentukan oleh durasi audionya**, bukan dikira-kira.
`scripts/tts.py` membangkitkan MP3 per adegan, mengukur durasinya dengan `mutagen`,
lalu menulis `src/timings.ts`. Remotion membaca berkas itu untuk menentukan
`durationInFrames` tiap `Series.Sequence`.

Kalau teks narasi diubah, jalankan ulang `tts.py`, dan video menyesuaikan sendiri
tanpa menggeser timing secara manual.

## Cara demo direkam

Demo bukan slide dan bukan animasi tiruan: rekaman layar aplikasi yang benar-benar
berjalan di Chrome, direkam sendiri pada resolusi 1920×1020, lengkap dengan kursor,
pesan kesalahan, pemilih tanggal, dan SnackBar asli. Rekaman itu tidak punya audio,
jadi narasinya tetap dari edge-tts.

Berkas asal berdurasi 148 detik, tetapi tidak semuanya dipakai: ada bagian yang
membuka laporan lain lalu kembali, yang memutus alur. `scripts/potong-rekaman-user.py`
memotongnya menjadi enam bab pada **transisi halaman**, bukan pada durasi narasi:

```bash
python scripts/potong-rekaman-user.py
```

| Bab | Mulai | Durasi | Isi |
| --- | --- | --- | --- |
| `usr-login` | 6,4 s | 18,9 s | kirim kosong, pesan merah, isi, masuk |
| `usr-beranda` | 25,6 s | 14,1 s | ringkasan, buka satu laporan |
| `usr-form` | 40,0 s | 37,5 s | enam kolom, pesan merah per kolom, dropdown, pemilih tanggal |
| `usr-isi` | 77,5 s | 26,1 s | jumlah unit, deskripsi ditolak lalu diperbaiki, kirim |
| `usr-kirim` | 103,9 s | 10,2 s | SnackBar hijau, total 3 → 4 |
| `usr-daftar` | 114,4 s | 12,4 s | daftar dan filter status |

Bilah Chrome setinggi 108 px tidak dipotong di berkas. `scenes/Demo.tsx` menggesernya
keluar bingkai lewat CSS (`top: -99px` di dalam kotak `overflow: hidden`), sehingga
berkas asli tetap utuh dan bisa diperiksa.

Kalau narasi lebih panjang dari klip, adegan menahan frame terakhir beberapa saat
(`ekor`), supaya tidak ada layar hitam di ujung adegan.

Versi sebelumnya memakai rekaman Playwright (`scripts/rekam-demo.mjs`) dengan bingkai
ponsel. Skrip itu masih ada, tetapi tidak dipakai lagi.

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
