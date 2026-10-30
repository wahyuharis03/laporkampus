# Video Proposal LaporKampus

Video penjelasan **masalah, target pengguna, dan cakupan** aplikasi LaporKampus.
Dibuat dengan [Remotion](https://remotion.dev) (React → video) dan
[edge-tts](https://github.com/rany2/edge-tts) untuk narasi Bahasa Indonesia.

Hasil: `out/laporkampus-proposal.mp4` — 1920×1080, 30 fps, H.264 + AAC, 3 menit 29 detik.

## Kenapa audio dulu, video kemudian

Panjang setiap adegan **ditentukan oleh durasi audionya**, bukan dikira-kira.
`scripts/tts.py` membangkitkan MP3 per adegan, mengukur durasinya dengan `mutagen`,
lalu menulis `src/timings.ts`. Remotion membaca berkas itu untuk menentukan
`durationInFrames` tiap `Series.Sequence`.

Akibatnya: kalau teks narasi diubah, jalankan ulang `tts.py`, dan video menyesuaikan
sendiri tanpa menggeser timing secara manual. Tidak ada risiko audio dan gambar
bergeser.

## Struktur adegan

| No | Adegan | Durasi audio | Frame |
| --- | --- | --- | --- |
| 1 | Pembuka | 13,78 s | 426 |
| 2 | Masalah (4 poin) | 51,41 s | 1555 |
| 3 | Target pengguna | 29,21 s | 889 |
| 4 | Cakupan | 32,76 s | 995 |
| 5 | Alur aplikasi | 23,33 s | 712 |
| 6 | Bukti pengujian | 18,74 s | 575 |
| 7 | Rencana database | 23,42 s | 715 |
| 8 | Penutup | 13,10 s | 406 |
| | **Total** | **209,10 s** | **6273** |

## Menjalankan ulang

Prasyarat: Node.js 18+, Python 3.10+, Chrome terpasang, dan koneksi internet
(hanya untuk membangkitkan audio).

```bash
# 1. Dependensi
npm install

# 2. Narasi -> audio -> timing
#    (butuh: pip install edge-tts mutagen)
python scripts/tts.py

# 3. Pratinjau di Remotion Studio
npm run studio

# 4. Render final
npm run render
```

Mengubah isi video:

| Yang ingin diubah | Berkas |
| --- | --- |
| Kalimat narasi, suara, kecepatan bicara | `narasi.json` → jalankan `python scripts/tts.py` |
| Warna, font, jarak | `src/theme.ts` |
| Isi dan tata letak satu adegan | `src/scenes/<Nama>.tsx` |
| Urutan adegan | `src/Video.tsx` (peta `PETA`) |

## Catatan teknis

- **Chrome tidak diunduh ulang.** `remotion.config.ts` menunjuk ke Chrome yang sudah
  terpasang lewat `Config.setBrowserExecutable`, jadi Remotion tidak mengunduh
  Chrome Headless Shell (± 150 MB).
- **ffmpeg tidak perlu dipasang.** Remotion membawa ffmpeg sendiri untuk muxing audio.
- **Tidak ada transisi CSS.** Semua gerak dihitung dari nomor frame lewat
  `spring()` dan `interpolate()`, jadi hasil render selalu sama.
- **Suara:** `id-ID-ArdiNeural`, kecepatan `-3%` supaya terdengar lebih tenang.
  Alternatifnya `id-ID-GadisNeural`.
- **Internet hanya dipakai saat `tts.py` berjalan.** Menonton dan render tidak butuh jaringan.

## Berkas yang tidak masuk Git

`node_modules/`, `out/`, dan `public/audio/` diabaikan karena besar dan bisa
dibangkitkan ulang. Berkas tangkapan layar di `public/shots/` disalin otomatis
dari `../docs/` oleh `tts.py`.
