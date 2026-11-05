# -*- coding: utf-8 -*-
"""Potong rekaman layar milik pengguna menjadi enam bab demo.

Rekaman asal: 1920x1020, Chrome, 148 detik, tanpa audio. Bagian yang dipakai
hanya 6,4-127,0 detik; sisanya (menit pertama dan penutup) berisi halaman yang
melenceng dari alur. Batas tiap bab ditentukan dari transisi halaman yang
terlihat pada rekaman, bukan dari durasi narasi.

Bilah Chrome (108 px di atas) tidak dipotong di sini — Remotion yang memotongnya
lewat CSS, supaya berkas ini tetap bisa diperiksa apa adanya.
"""
import os
import subprocess

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUMBER = r"C:/Users/wahyu/Videos/Captures/LaporKampus - Google Chrome 2026-11-05 10-42-28.mp4"
KELUAR = os.path.join(AKAR, "public", "demo")
FFMPEG = os.path.join(AKAR, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe")
FFPROBE = os.path.join(AKAR, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffprobe.exe")

# (nama, mulai, durasi) — batas diambil dari transisi halaman pada rekaman
BAB = [
    ("usr-login", 6.4, 18.9),
    ("usr-beranda", 25.6, 14.1),
    ("usr-form", 40.0, 37.5),
    ("usr-isi", 77.5, 26.1),
    ("usr-kirim", 103.9, 10.2),
    ("usr-daftar", 114.4, 12.4),
]

os.makedirs(KELUAR, exist_ok=True)
for nama, mulai, durasi in BAB:
    keluar = os.path.join(KELUAR, "%s.mp4" % nama)
    subprocess.run(
        [FFMPEG, "-y", "-v", "error", "-ss", "%.2f" % mulai, "-i", SUMBER,
         "-t", "%.2f" % durasi, "-an", "-r", "30",
         "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
         keluar],
        check=True)
    hasil = subprocess.run(
        [FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", keluar],
        capture_output=True, text=True, check=True)
    print("%-12s mulai %6.2f  durasi %5.2f  berkas %5.2f" % (nama, mulai, durasi, float(hasil.stdout)))

    # frame terakhir, dipakai sebagai gambar diam bila narasi lebih panjang
    subprocess.run(
        [FFMPEG, "-y", "-v", "error", "-sseof", "-0.1", "-i", keluar,
         "-frames:v", "1", os.path.join(KELUAR, "%s-akhir.png" % nama)],
        check=True)

print("selesai: %d klip di public/demo" % len(BAB))
