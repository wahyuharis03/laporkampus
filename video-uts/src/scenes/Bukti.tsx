import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const ANGKA = [
  {nilai: '6', label: 'Kolom formulir', ket: 'lokasi, kategori, urgensi, tanggal, jumlah, deskripsi'},
  {nilai: '4', label: 'Jenis masukan', ket: 'teks, dropdown, pemilih tanggal, angka'},
  {nilai: '7', label: 'Pengujian lulus', ket: 'termasuk tiga kasus uji formulir'},
];

export const Bukti: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <LabelBagian nomor="05" teks="BUKTI" />

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
        Formulir yang benar-benar diuji
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 400,
          display: 'flex',
          gap: 28,
        }}
      >
        {ANGKA.map((a, i) => (
          <div
            key={a.label}
            style={{
              flex: 1,
              boxSizing: 'border-box',
              padding: '56px 40px',
              backgroundColor: w.kartu,
              border: `1px solid ${w.tepi}`,
              borderTop: `4px solid ${w.aksen}`,
              borderRadius: 12,
              ...masuk(frame, 26 + i * 20),
            }}
          >
            <div
              style={{
                fontFamily: f.judul,
                fontSize: 116,
                lineHeight: 1,
                color: w.aksen,
              }}
            >
              {a.nilai}
            </div>
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 30,
                fontWeight: 700,
                color: w.teks,
                marginTop: 18,
              }}
            >
              {a.label}
            </div>
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 21,
                lineHeight: 1.45,
                color: w.redup,
                marginTop: 12,
              }}
            >
              {a.ket}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 124,
          fontFamily: f.isi,
          fontSize: 27,
          lineHeight: 1.5,
          color: '#CFC8D6',
          ...masuk(frame, 110),
        }}
      >
        Setiap kolom punya aturan sendiri, dan pesan kesalahannya sengaja berbeda
        supaya pengujian tidak tertukar. <span style={{color: w.hijau}}>flutter analyze</span> bersih.
      </div>
    </AbsoluteFill>
  );
};
