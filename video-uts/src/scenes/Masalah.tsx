import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const MASALAH = [
  {
    nomor: '01',
    judul: 'Banyak saluran',
    isi: 'Laporan berpindah lewat chat, pesan pribadi, atau lisan, sehingga sulit terkumpul di satu tempat.',
  },
  {
    nomor: '02',
    judul: 'Status tak terlihat',
    isi: 'Mahasiswa tidak tahu sudah sejauh mana pengaduannya ditangani.',
  },
  {
    nomor: '03',
    judul: 'Informasi tidak seragam',
    isi: 'Lokasi dan kerusakan ditulis dengan cara berbeda, sehingga laporan sulit ditindaklanjuti.',
  },
  {
    nomor: '04',
    judul: 'Tanpa catatan',
    isi: 'Tidak ada riwayat yang tersimpan, sehingga pengaduan tidak bisa ditelusuri.',
  },
];

export const Masalah: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  // Kartu menyala bergiliran mengikuti narasi. Pembagiannya dihitung dari durasi
  // adegan, jadi tetap sejalan walau panjang audio berubah.
  const mulaiNyala = Math.round(durationInFrames * 0.3);
  const sisa = Math.max(1, durationInFrames - mulaiNyala);
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
          top: 176,
          fontFamily: f.judul,
          fontSize: 58,
          lineHeight: 1.18,
          color: w.teks,
          ...masuk(frame, 8),
        }}
      >
        Kesulitan menyampaikan dan memantau pengaduan
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 268,
          fontFamily: f.isi,
          fontSize: 28,
          color: w.aksenMuda,
          ...masuk(frame, 20),
        }}
      >
        Laporan sulit dicatat, dan statusnya sulit diketahui.
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 340,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 28,
        }}
      >
        {MASALAH.map((m, i) => {
          const nyala = frame >= mulaiNyala && aktif === i;
          return (
            <div
              key={m.nomor}
              style={{
                width: 'calc(50% - 14px)',
                boxSizing: 'border-box',
                padding: '32px 34px',
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
                    fontSize: 28,
                    color: nyala ? w.aksenMuda : w.redup,
                  }}
                >
                  {m.nomor}
                </div>
                <div
                  style={{
                    fontFamily: f.isi,
                    fontSize: 31,
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
                  fontSize: 23,
                  lineHeight: 1.48,
                  color: nyala ? '#CFC8D6' : w.redup,
                  marginTop: 10,
                }}
              >
                {m.isi}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 84,
          fontFamily: f.isi,
          fontSize: 21,
          fontStyle: 'italic',
          color: w.redup,
          ...masuk(frame, 120),
        }}
      >
        Keempat hal di atas adalah penjelasan awal, bukan hasil wawancara atau observasi lapangan.
      </div>
    </AbsoluteFill>
  );
};
