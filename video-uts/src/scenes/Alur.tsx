import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const HALAMAN = [
  {nama: 'Login', ket: 'Masuk dengan NIM'},
  {nama: 'Beranda', ket: 'Ringkasan status'},
  {nama: 'Form Laporan', ket: 'Enam kolom'},
  {nama: 'Laporan Saya', ket: 'Daftar dan saring'},
  {nama: 'Detail Laporan', ket: 'Rincian satu laporan'},
];

export const Alur: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <LabelBagian nomor="04" teks="ALUR APLIKASI" />

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
        Lima halaman, satu alur
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 430,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {HALAMAN.map((h, i) => (
          <React.Fragment key={h.nama}>
            <div
              style={{
                flex: 1,
                boxSizing: 'border-box',
                padding: '44px 28px',
                backgroundColor: w.kartu,
                border: `1px solid ${w.tepi}`,
                borderTop: `4px solid ${w.aksen}`,
                borderRadius: 12,
                textAlign: 'center',
                ...masuk(frame, 26 + i * 16),
              }}
            >
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: w.aksenMuda,
                  marginBottom: 14,
                }}
              >
                H{i + 1}
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 29,
                  fontWeight: 700,
                  color: w.teks,
                  lineHeight: 1.25,
                }}
              >
                {h.nama}
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 21,
                  color: w.redup,
                  marginTop: 10,
                  lineHeight: 1.4,
                }}
              >
                {h.ket}
              </div>
            </div>

            {i < HALAMAN.length - 1 ? (
              <div
                style={{
                  width: 46,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: f.isi,
                  fontSize: 30,
                  color: w.aksen,
                  ...masuk(frame, 34 + i * 16),
                }}
              >
                →
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 132,
          display: 'flex',
          gap: 26,
          ...masuk(frame, 120),
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '26px 32px',
            backgroundColor: w.kartu,
            border: `1px solid ${w.tepi}`,
            borderRadius: 10,
            fontFamily: f.isi,
            fontSize: 25,
            color: w.teks,
          }}
        >
          <span style={{color: w.aksenMuda, fontWeight: 700}}>Ponsel</span>
          &nbsp;&nbsp;navigasi di bawah, lebar di bawah 600 px
        </div>
        <div
          style={{
            flex: 1,
            padding: '26px 32px',
            backgroundColor: w.kartu,
            border: `1px solid ${w.tepi}`,
            borderRadius: 10,
            fontFamily: f.isi,
            fontSize: 25,
            color: w.teks,
          }}
        >
          <span style={{color: w.aksenMuda, fontWeight: 700}}>Layar lebar</span>
          &nbsp;&nbsp;navigasi berpindah ke samping, 600 px ke atas
        </div>
      </div>
    </AbsoluteFill>
  );
};
