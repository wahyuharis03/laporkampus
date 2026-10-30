# -*- coding: utf-8 -*-
"""Bangkitkan audio narasi dengan edge-tts, lalu tulis durasi ke src/timings.ts.

Audio menentukan durasi adegan: setiap adegan = durasi MP3 + jeda, dikonversi
ke jumlah frame. Jadi mengubah teks narasi cukup jalankan ulang skrip ini.
"""
import asyncio
import json
import math
import os
import shutil
import sys

import edge_tts
from mutagen.mp3 import MP3

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NARASI = os.path.join(AKAR, "narasi.json")
AUDIO = os.path.join(AKAR, "public", "audio")
SHOTS_SRC = os.path.join(os.path.dirname(AKAR), "docs")
SHOTS_DST = os.path.join(AKAR, "public", "shots")
TIMINGS = os.path.join(AKAR, "src", "timings.ts")

FPS = 30


async def bangkitkan(teks, voice, rate, keluar):
    komunikasi = edge_tts.Communicate(teks, voice, rate=rate)
    await komunikasi.save(keluar)


def main():
    konfigurasi = json.load(open(NARASI, encoding="utf-8"))
    voice = konfigurasi["voice"]
    rate = konfigurasi["rate"]
    jeda = konfigurasi["jedaDetik"]

    os.makedirs(AUDIO, exist_ok=True)
    os.makedirs(os.path.dirname(TIMINGS), exist_ok=True)

    hasil = []
    for adegan in konfigurasi["adegan"]:
        nama = "%s.mp3" % adegan["id"]
        keluar = os.path.join(AUDIO, nama)
        print("sintesis %-12s ..." % adegan["id"], end="", flush=True)
        asyncio.run(bangkitkan(adegan["teks"], voice, rate, keluar))
        detik = MP3(keluar).info.length
        total = detik + jeda
        frames = int(math.ceil(total * FPS))
        print(" %6.2f s -> %4d frame" % (detik, frames))
        hasil.append(
            {
                "id": adegan["id"],
                "label": adegan["label"],
                "teks": adegan["teks"],
                "audio": "audio/%s" % nama,
                "detik": round(detik, 3),
                "frames": frames,
            }
        )

    total_frames = sum(a["frames"] for a in hasil)

    baris = [
        "// Berkas ini dibangkitkan oleh scripts/tts.py — jangan disunting manual.",
        "// Durasi tiap adegan berasal dari panjang audio yang sebenarnya.",
        "",
        "export type Adegan = {",
        "  id: string;",
        "  label: string;",
        "  teks: string;",
        "  audio: string;",
        "  detik: number;",
        "  frames: number;",
        "};",
        "",
        "export const FPS = %d;" % FPS,
        "export const TOTAL_FRAMES = %d;" % total_frames,
        "",
        "export const ADEGAN: Adegan[] = [",
    ]
    for a in hasil:
        baris.append(
            "  { id: %s, label: %s, teks: %s, audio: %s, detik: %s, frames: %d },"
            % (
                json.dumps(a["id"]),
                json.dumps(a["label"], ensure_ascii=False),
                json.dumps(a["teks"], ensure_ascii=False),
                json.dumps(a["audio"]),
                a["detik"],
                a["frames"],
            )
        )
    baris.append("];")
    baris.append("")

    open(TIMINGS, "w", encoding="utf-8", newline="\n").write("\n".join(baris))

    # salin tangkapan layar aplikasi ke public/shots
    os.makedirs(SHOTS_DST, exist_ok=True)
    dipakai = [
        "screenshot-beranda.png",
        "screenshot-form-laporan.png",
        "screenshot-laporan-saya.png",
    ]
    for nama in dipakai:
        asal = os.path.join(SHOTS_SRC, nama)
        if os.path.exists(asal):
            shutil.copy2(asal, os.path.join(SHOTS_DST, nama))
        else:
            print("PERINGATAN: %s tidak ditemukan" % asal, file=sys.stderr)

    print("-" * 46)
    print("total %d frame = %.1f detik (%d:%02d)" % (
        total_frames, total_frames / FPS, total_frames // FPS // 60, int(total_frames / FPS) % 60))
    print("timings -> %s" % TIMINGS)


if __name__ == "__main__":
    main()
