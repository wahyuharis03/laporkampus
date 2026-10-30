import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const ATRIBUT = [
  {label: 'Perangkat', isi: 'Ponsel Android, data seluler'},
  {label: 'Kebiasaan', isi: 'Melapor sambil berdiri di lokasi kejadian'},
  {label: 'Kebutuhan', isi: 'Formulir singkat, status yang pasti'},
  {label: 'Kejengkelan', isi: 'Formulir panjang, laporan tanpa balasan'},
];

export const Target: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <LabelBagian nomor="02" teks="TARGET PENGGUNA" />

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
          maxWidth: 1240,
          ...masuk(frame, 8),
        }}
      >
        Mahasiswa yang melapor dari lokasi kejadian
      </div>

      {/* Kartu persona */}
      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 400,
          width: 560,
          boxSizing: 'border-box',
          padding: '48px 44px',
          backgroundColor: w.kartu,
          border: `1px solid ${w.tepi}`,
          borderTop: `4px solid ${w.aksen}`,
          borderRadius: 12,
          ...masuk(frame, 26),
        }}
      >
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: 62,
            backgroundColor: w.aksen,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: f.judul,
            fontSize: 44,
            color: '#FFFFFF',
            marginBottom: 28,
          }}
        >
          DA
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 38,
            fontWeight: 700,
            color: w.teks,
          }}
        >
          Dimas Aryo Pratama
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 24,
            color: w.redup,
            marginTop: 10,
            lineHeight: 1.45,
          }}
        >
          Mahasiswa semester 5
          <br />
          Aktif di dua organisasi
        </div>
      </div>

      {/* Atribut persona */}
      <div
        style={{
          position: 'absolute',
          left: PAD + 620,
          right: PAD,
          top: 400,
        }}
      >
        {ATRIBUT.map((a, i) => (
          <div
            key={a.label}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '36px 0',
              borderBottom: `1px solid ${w.tepi}`,
              ...masuk(frame, 60 + i * 16),
            }}
          >
            <div
              style={{
                width: 240,
                fontFamily: f.isi,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: w.aksenMuda,
                paddingTop: 6,
              }}
            >
              {a.label.toUpperCase()}
            </div>
            <div
              style={{
                flex: 1,
                fontFamily: f.isi,
                fontSize: 32,
                lineHeight: 1.4,
                color: w.teks,
              }}
            >
              {a.isi}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
