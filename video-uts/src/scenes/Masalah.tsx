import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const MASALAH = [
  {
    nomor: '01',
    judul: 'Laporan tercecer',
    isi: 'Pesan tenggelam oleh obrolan lain dalam hitungan jam. Tidak ada satu pun daftar kerusakan yang masih terbuka.',
  },
  {
    nomor: '02',
    judul: 'Tanpa status',
    isi: 'Pelapor tidak pernah tahu laporannya sudah dibaca, sedang dikerjakan, atau selesai. Laporan sama dikirim berulang.',
  },
  {
    nomor: '03',
    judul: 'Tidak seragam',
    isi: 'Satu laporan menyebut lab lantai dua, laporan lain menyebut ruang spesifik. Petugas harus menebak.',
  },
  {
    nomor: '04',
    judul: 'Tanpa jejak',
    isi: 'Karena tidak tercatat, tidak ada data untuk menentukan fasilitas mana yang paling sering rusak.',
  },
];

export const Masalah: React.FC = () => {
  const frame = useCurrentFrame();

  // Narasi memperkenalkan keempat masalah secara berurutan. Kartu muncul lebih
  // dulu, lalu menyala satu per satu mengikuti pembagian waktu yang merata.
  const mulaiNyala = 240;
  const sisa = 1555 - mulaiNyala;
  const aktif = Math.min(
    3,
    Math.max(0, Math.floor(((frame - mulaiNyala) / sisa) * 4)),
  );

  return (
    <AbsoluteFill>
      <LabelBagian nomor="01" teks="MASALAH" />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 190,
          fontFamily: f.judul,
          fontSize: 66,
          lineHeight: 1.18,
          color: w.teks,
          maxWidth: 1180,
          ...masuk(frame, 8),
        }}
      >
        Empat masalah yang sama, setiap semester
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 404,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 30,
        }}
      >
        {MASALAH.map((m, i) => {
          const nyala = frame >= mulaiNyala && aktif === i;
          return (
            <div
              key={m.nomor}
              style={{
                width: 'calc(50% - 15px)',
                boxSizing: 'border-box',
                padding: '40px 38px',
                backgroundColor: nyala ? w.kartuNaik : w.kartu,
                border: `1px solid ${nyala ? w.aksen : w.tepi}`,
                borderLeft: `4px solid ${nyala ? w.aksen : w.tepi}`,
                borderRadius: 12,
                ...masuk(frame, 26 + i * 14),
              }}
            >
              <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
                <div
                  style={{
                    fontFamily: f.judul,
                    fontSize: 30,
                    color: nyala ? w.aksenMuda : w.redup,
                  }}
                >
                  {m.nomor}
                </div>
                <div
                  style={{
                    fontFamily: f.isi,
                    fontSize: 33,
                    fontWeight: 700,
                    color: nyala ? w.teks : '#D8D3DE',
                  }}
                >
                  {m.judul}
                </div>
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 24,
                  lineHeight: 1.5,
                  color: nyala ? '#CFC8D6' : w.redup,
                  marginTop: 12,
                }}
              >
                {m.isi}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
