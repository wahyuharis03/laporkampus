# Video Proposal LaporKampus

Video penjelasan **masalah, target pengguna, dan cakupan** aplikasi LaporKampus.
Dibuat dengan [Remotion](https://remotion.dev) (React → video) dan
[edge-tts](https://github.com/rany2/edge-tts) untuk narasi Bahasa Indonesia.

Hasil: `out/laporkampus-proposal.mp4` — 1920×1080, 30 fps, H.264 + AAC, 3 menit 18 detik.

Riwayat perubahan naskah ada di [CATATAN-REVISI.md](CATATAN-REVISI.md).

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
| 1 | Pembuka | 15,10 s | 465 |
| 2 | Masalah — rumusan resmi + empat penjelasan | 50,04 s | 1514 |
| 3 | Target pengguna — persona ilustratif + empat kebutuhan | 28,34 s | 863 |
| 4 | Cakupan — termasuk dan di luar scope | 37,68 s | 1143 |
| 5 | Alur aplikasi — empat halaman inti + Detail sebagai tambahan | 22,22 s | 679 |
| 6 | Validasi & status — tiga tahap, data simulasi | 27,07 s | 825 |
| 7 | Penutup | 14,62 s | 451 |
| | **Total** | **198,00 s** | **5940** |

## Prinsip naskah

Tiga aturan yang dipegang supaya tidak ada klaim berlebih:

1. **Masalah memakai rumusan yang sudah ditetapkan**, dan empat kartu penjelas
   dinyatakan terang-terangan sebagai penjelasan awal — bukan hasil wawancara.
2. **Persona diberi label ilustratif** di layar, bukan hanya di narasi.
3. **Tidak ada angka yang tidak bisa dipertanggungjawabkan.** Jumlah kolom formulir
   dan jumlah pengujian otomatis sengaja tidak disebut.

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
  `spring()`, jadi hasil render selalu sama.
- **Penyorotan kartu masalah mengikuti durasi adegan**, bukan angka tetap. Kalau narasi
  berubah panjang, pembagian waktunya ikut menyesuaikan sendiri.
- **Suara:** `id-ID-ArdiNeural`, kecepatan `-3%`. Alternatifnya `id-ID-GadisNeural`.
- **Internet hanya dipakai saat `tts.py` berjalan.** Menonton dan render tidak butuh jaringan.

## Berkas yang tidak masuk Git

`node_modules/`, `out/`, `public/audio/`, dan `public/shots/` diabaikan karena besar dan
bisa dibangkitkan ulang. Tangkapan layar di `public/shots/` disalin otomatis dari `../docs/`
oleh `tts.py`.
