import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const MASUK = [
  'Lima halaman terhubung',
  'Formulir 6 kolom dengan validasi',
  'Penyaringan status laporan',
  'Keadaan kosong yang menjelaskan',
  'Tata letak menyesuaikan lebar layar',
];

const KELUAR = [
  'Basis data sungguhan',
  'Unggah foto kerusakan',
  'Peran petugas dan panel admin',
  'Notifikasi dan surel',
  'Peta dan lokasi otomatis',
];

export const Cakupan: React.FC = () => {
  const frame = useCurrentFrame();

  const kolom = (judul: string, butir: string[], hijau: boolean, delay: number) => (
    <div
      style={{
        flex: 1,
        boxSizing: 'border-box',
        padding: '38px 40px',
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
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: '0.16em',
          color: hijau ? w.hijau : w.redup,
          marginBottom: 26,
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
            marginBottom: 20,
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
              fontSize: 27,
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
          top: 190,
          fontFamily: f.judul,
          fontSize: 62,
          lineHeight: 1.18,
          color: w.teks,
          ...masuk(frame, 8),
        }}
      >
        Satu alur inti, bukan daftar keinginan
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 350,
          display: 'flex',
          gap: 28,
        }}
      >
        {kolom('Termasuk', MASUK, true, 30)}
        {kolom('Di luar cakupan', KELUAR, false, 46)}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 92,
          fontFamily: f.judul,
          fontSize: 36,
          fontStyle: 'italic',
          color: w.aksenMuda,
          ...masuk(frame, 130),
        }}
      >
        Bukan karena tidak mampu, tetapi karena satu alur harus selesai dan teruji lebih dahulu.
      </div>
    </AbsoluteFill>
  );
};
