# -*- coding: utf-8 -*-
"""Bangkitkan narasi khusus video demo mandiri.

Video UTS sudah punya narasi sendiri. Skrip ini hanya untuk dua sisipan yang
tidak ada di narasi.json: pembuka dan penutup video demo.

Jalankan: python scripts/tts-demo.py
Keluaran: public/audio/demo-intro.mp3, public/audio/demo-outro.mp3,
lalu src/timings-demo.ts
"""
import asyncio
import json
import math
import os

import edge_tts
from mutagen.mp3 import MP3

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NARASI = os.path.join(AKAR, "narasi.json")
AUDIO = os.path.join(AKAR, "public", "audio")
TIMINGS = os.path.join(AKAR, "src", "timings-demo.ts")

FPS = 30

SISIPAN = [
    (
        "demo-intro",
        "Berikut demo aplikasi LaporKampus. Enam langkah yang diperlihatkan: "
        "login, beranda, formulir laporan, validasi isian, pengiriman laporan, "
        "dan daftar laporan. Semua data pada demo ini masih simulasi.",
    ),
    (
        "demo-outro",
        "Sekian demo LaporKampus. Terima kasih.",
    ),
]


async def bangkitkan(teks, voice, rate, keluar):
    komunikasi = edge_tts.Communicate(teks, voice, rate=rate)
    await komunikasi.save(keluar)


def main():
    konfigurasi = json.load(open(NARASI, encoding="utf-8"))
    voice = konfigurasi["voice"]
    rate = konfigurasi["rate"]
    jeda = konfigurasi["jedaDetik"]

    os.makedirs(AUDIO, exist_ok=True)

    hasil = []
    for nama, teks in SISIPAN:
        keluar = os.path.join(AUDIO, "%s.mp3" % nama)
        print("sintesis %-12s ..." % nama, end="", flush=True)
        asyncio.run(bangkitkan(teks, voice, rate, keluar))
        detik = MP3(keluar).info.length
        frames = int(math.ceil((detik + jeda) * FPS))
        print(" %6.2f s -> %4d frame" % (detik, frames))
        hasil.append(
            {
                "id": nama,
                "teks": teks,
                "audio": "audio/%s.mp3" % nama,
                "detik": round(detik, 3),
                "frames": frames,
            }
        )

    baris = [
        "// Berkas ini dibangkitkan oleh scripts/tts-demo.py — jangan disunting manual.",
        "// Hanya sisipan pembuka dan penutup; adegan demo memakai src/timings.ts.",
        "",
        "export type Sisipan = {",
        "  id: string;",
        "  teks: string;",
        "  audio: string;",
        "  detik: number;",
        "  frames: number;",
        "};",
        "",
        "export const SISIPAN: Sisipan[] = [",
    ]
    for h in hasil:
        baris.append(
            '  { id: "%s", teks: %s, audio: "%s", detik: %s, frames: %d },'
            % (
                h["id"],
                json.dumps(h["teks"], ensure_ascii=False),
                h["audio"],
                h["detik"],
                h["frames"],
            )
        )
    baris.append("];")
    baris.append("")

    with open(TIMINGS, "w", encoding="utf-8") as fp:
        fp.write("\n".join(baris))
    print("tulis %s" % TIMINGS)


if __name__ == "__main__":
    main()
