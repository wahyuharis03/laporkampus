import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const INTI = [
  {nama: 'Login', ket: 'NIM dan password'},
  {nama: 'Beranda', ket: 'Ringkasan status'},
  {nama: 'Form Laporan', ket: 'Validasi isian'},
  {nama: 'Laporan Saya', ket: 'Daftar dan status'},
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
          top: 176,
          fontFamily: f.judul,
          fontSize: 58,
          lineHeight: 1.18,
          color: w.teks,
          ...masuk(frame, 8),
        }}
      >
        Empat halaman inti, satu alur
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 350,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {INTI.map((h, i) => (
          <React.Fragment key={h.nama}>
            <div
              style={{
                flex: 1,
                boxSizing: 'border-box',
                padding: '44px 24px',
                backgroundColor: w.kartu,
                border: `1px solid ${w.tepi}`,
                borderTop: `4px solid ${w.aksen}`,
                borderRadius: 12,
                textAlign: 'center',
                ...masuk(frame, 26 + i * 18),
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
                  fontSize: 30,
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
                }}
              >
                {h.ket}
              </div>
            </div>

            {i < INTI.length - 1 ? (
              <div
                style={{
                  width: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: f.isi,
                  fontSize: 30,
                  color: w.aksen,
                  ...masuk(frame, 34 + i * 18),
                }}
              >
                →
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>

      {/* Fitur tambahan, ditandai berbeda supaya tidak terbaca sebagai keharusan */}
      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 660,
          boxSizing: 'border-box',
          padding: '30px 34px',
          border: `1px dashed ${w.kuning}`,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          ...masuk(frame, 110),
        }}
      >
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: w.kuning,
            border: `1px solid ${w.kuning}`,
            borderRadius: 4,
            padding: '5px 10px',
            flexShrink: 0,
          }}
        >
          TAMBAHAN
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 25,
            color: '#CFC8D6',
            lineHeight: 1.4,
          }}
        >
          <span style={{color: w.teks, fontWeight: 700}}>Detail Laporan</span>
          &nbsp;&nbsp;prioritas Should, bukan keharusan utama pada tahap ini
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 76,
          fontFamily: f.isi,
          fontSize: 22,
          color: w.redup,
          ...masuk(frame, 140),
        }}
      >
        Navigasi berada di bawah pada ponsel, dan berpindah ke samping pada layar lebar.
      </div>
    </AbsoluteFill>
  );
};
