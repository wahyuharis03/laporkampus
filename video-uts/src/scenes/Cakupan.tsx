import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const MASUK = [
  'Login dengan NIM dan password',
  'Beranda mahasiswa',
  'Form laporan kerusakan',
  'Validasi formulir',
  'Daftar laporan dan statusnya',
];

const KELUAR = [
  'Integrasi basis data produksi',
  'Akun dan dashboard petugas Sarpras',
  'Notifikasi otomatis',
  'Peta lokasi fasilitas',
  'Unggah foto sebagai fitur wajib',
];

export const Cakupan: React.FC = () => {
  const frame = useCurrentFrame();

  const kolom = (judul: string, butir: string[], hijau: boolean, delay: number) => (
    <div
      style={{
        flex: 1,
        boxSizing: 'border-box',
        padding: '36px 38px',
        backgroundColor: w.kartu,
        border: `1px solid ${w.tepi}`,
        borderTop: `4px solid ${hijau ? w.hijau : w.tepi}`,
        borderRadius: 12,
        ...masuk(frame, delay),
      }}
    >
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.16em',
          color: hijau ? w.hijau : w.redup,
          marginBottom: 24,
        }}
      >
        {judul.toUpperCase()}
      </div>

      {butir.map((b, i) => (
        <div
          key={b}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            marginBottom: 18,
            ...masuk(frame, delay + 18 + i * 10),
          }}
        >
          <div
            style={{
              fontFamily: f.isi,
              fontSize: 26,
              lineHeight: 1.35,
              color: hijau ? w.hijau : '#6E6878',
              width: 22,
              flexShrink: 0,
            }}
          >
            {hijau ? '✓' : '×'}
          </div>
          <div
            style={{
              fontFamily: f.isi,
              fontSize: 26,
              lineHeight: 1.35,
              color: hijau ? w.teks : w.redup,
            }}
          >
            {b}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <AbsoluteFill>
      <LabelBagian nomor="03" teks="CAKUPAN" />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 176,
          fontFamily: f.judul,
          fontSize: 56,
          lineHeight: 1.18,
          color: w.teks,
          maxWidth: 1420,
          ...masuk(frame, 8),
        }}
      >
        Proyek awal, bukan sistem Sarpras menyeluruh
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 330,
          display: 'flex',
          gap: 28,
        }}
      >
        {kolom('Termasuk dalam scope', MASUK, true, 30)}
        {kolom('Di luar scope', KELUAR, false, 46)}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 88,
          fontFamily: f.judul,
          fontSize: 34,
          fontStyle: 'italic',
          color: w.aksenMuda,
          ...masuk(frame, 130),
        }}
      >
        Bukan karena tidak mampu, tetapi agar satu alur inti selesai lebih dahulu.
      </div>
    </AbsoluteFill>
  );
};
