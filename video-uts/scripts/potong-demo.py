# -*- coding: utf-8 -*-
"""Potong rekaman demo menjadi satu klip per bab, sesuai durasi narasi.

Rekaman Playwright berformat WebM 25 fps. Tiap klip diubah ke MP4 H.264 30 fps
dengan panjang tepat sama dengan audio narasinya, sehingga di Remotion tidak
perlu menyetel playbackRate.
"""
import json
import os
import re
import shutil
import subprocess

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEMO = os.path.join(AKAR, "out", "demo")
FFMPEG = os.path.join(AKAR, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe")


timings = open(os.path.join(AKAR, "src", "timings.ts"), encoding="utf-8").read()
durasi = {m.group(1): float(m.group(2)) for m in re.finditer(r'id: "([^"]+)"[^\n]*detik: ([\d.]+)', timings)}

marks = json.load(open(os.path.join(DEMO, "marks.json"), encoding="utf-8"))
# panjang rekaman sebenarnya
hasil = subprocess.run(
    [os.path.join(AKAR, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffprobe.exe"),
     "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
     os.path.join(DEMO, "demo.webm")],
    capture_output=True, text=True, check=True)
total = float(hasil.stdout.strip())

# Jeda antara pembuatan halaman dan frame pertama video berbeda tiap kali rekam.
# Dihitung dari akhir rekaman: penanda terakhir + durasi bab terakhir + jeda 0,6 dtk.
urutan_awal = [m["id"] for m in marks]
akhir_nyata = marks[-1]["ms"] / 1000 + durasi[urutan_awal[-1]] + 0.6
OFFSET = max(0.0, akhir_nyata - total)
print("offset awal video %.2f dtk (rekaman %.2f dtk)" % (OFFSET, total))

masuk = {m["id"]: m["ms"] / 1000 - OFFSET for m in marks}

urutan = ["demo-login", "demo-beranda", "demo-form", "demo-salah", "demo-benar", "demo-daftar", "demo-detail"]
for i, nama in enumerate(urutan):
    mulai = masuk[nama]
    selesai = masuk[urutan[i + 1]] if i + 1 < len(urutan) else total
    klip = selesai - mulai
    target = durasi[nama]
    keluar = os.path.join(DEMO, "%s.mp4" % nama)

    print("%-14s klip %5.2f, narasi %5.2f, selisih %+.2f" % (nama, klip, target, target - klip))

    subprocess.run(
        [FFMPEG, "-y", "-v", "error", "-ss", "%.3f" % mulai, "-i", os.path.join(DEMO, "demo.webm"),
         "-t", "%.3f" % klip, "-an", "-r", "30",
         "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
         keluar],
        check=True)

print("selesai")

# ---------------------------------------------------------------------------
# Klip "kirim" direkam terlalu lambat: klik Kirim baru terjadi sekitar 19,5 dtk,
# padahal narasi menyebutnya pada 13,5 dtk. Enam detik di awal dipotong supaya
# keduanya bertemu. Sisa waktu adegan diisi gambar diam dari frame terakhir.
PUBLIK = os.path.join(AKAR, "public", "demo")
os.makedirs(PUBLIK, exist_ok=True)

for nama in urutan:
    shutil.copy2(os.path.join(DEMO, "%s.mp4" % nama), os.path.join(PUBLIK, "%s.mp4" % nama))

POTONG = 6.0
sumber = os.path.join(DEMO, "demo-benar.mp4")
keluar = os.path.join(PUBLIK, "demo-benar-potong.mp4")
subprocess.run(
    [FFMPEG, "-y", "-v", "error", "-ss", "%.3f" % POTONG, "-i", sumber,
     "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-an", "-r", "30",
     "-pix_fmt", "yuv420p", keluar],
    check=True)
subprocess.run(
    [FFMPEG, "-y", "-v", "error", "-sseof", "-0.1", "-i", keluar,
     "-frames:v", "1", os.path.join(PUBLIK, "demo-benar-akhir.png")],
    check=True)

print("demo-benar dipotong %.1f dtk di awal; klip dan gambar diam disalin ke public/demo" % POTONG)
