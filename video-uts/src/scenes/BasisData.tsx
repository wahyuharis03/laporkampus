import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const TABEL = [
  {nama: 'pengguna', kolom: ['id', 'nim', 'nama', 'peran']},
  {nama: 'laporan', kolom: ['id', 'pelaporId', 'lokasi', 'status']},
  {nama: 'riwayat_status', kolom: ['laporanId', 'statusBaru', 'diubahPada']},
  {nama: 'kategori', kolom: ['id', 'nama', 'aktif']},
];

export const BasisData: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <LabelBagian nomor="06" teks="RENCANA DATABASE" />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 190,
          fontFamily: f.judul,
          fontSize: 62,
          lineHeight: 1.18,
          color: w.teks,
          ...masuk(frame, 8),
        }}
      >
        Empat tabel, satu rantai data
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 372,
          display: 'flex',
          gap: 24,
        }}
      >
        {TABEL.map((t, i) => (
          <div
            key={t.nama}
            style={{
              flex: 1,
              boxSizing: 'border-box',
              backgroundColor: w.kartu,
              border: `1px solid ${w.tepi}`,
              borderRadius: 12,
              overflow: 'hidden',
              ...masuk(frame, 26 + i * 18),
            }}
          >
            <div
              style={{
                padding: '18px 24px',
                backgroundColor: w.aksen,
                fontFamily: f.isi,
                fontSize: 23,
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#FFFFFF',
              }}
            >
              {t.nama}
            </div>
            <div style={{padding: '22px 24px 26px'}}>
              {t.kolom.map((k) => (
                <div
                  key={k}
                  style={{
                    fontFamily: f.isi,
                    fontSize: 21,
                    color: '#CFC8D6',
                    padding: '7px 0',
                    borderBottom: `1px solid ${w.tepi}`,
                  }}
                >
                  {k}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 104,
          ...masuk(frame, 116),
        }}
      >
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 26,
            lineHeight: 1.5,
            color: '#CFC8D6',
            marginBottom: 12,
          }}
        >
          Setiap kolom formulir punya kolom padanan, dan setiap aturan validasi
          punya aturan padanan di basis data — supaya klien tidak bisa dilewati.
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 23,
            color: w.redup,
            fontStyle: 'italic',
          }}
        >
          Saat ini data masih di memori, jadi hilang setiap aplikasi dimuat ulang.
        </div>
      </div>
    </AbsoluteFill>
  );
};
