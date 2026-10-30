import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {f, w} from '../theme';
import {masuk} from '../components/anim';

const LAYAR = [
  {berkas: 'shots/screenshot-beranda.png', ket: 'Beranda'},
  {berkas: 'shots/screenshot-form-laporan.png', ket: 'Form Laporan'},
  {berkas: 'shots/screenshot-laporan-saya.png', ket: 'Laporan Saya'},
];

const LEBAR_LAYAR = 196;

export const Penutup: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <div
        style={{
          position: 'absolute',
          top: 74,
          display: 'flex',
          gap: 34,
          alignItems: 'flex-start',
        }}
      >
        {LAYAR.map((l, i) => (
          <div
            key={l.berkas}
            style={{
              textAlign: 'center',
              ...masuk(frame, 6 + i * 14),
            }}
          >
            <Img
              src={staticFile(l.berkas)}
              style={{
                width: LEBAR_LAYAR,
                borderRadius: 12,
                border: `1px solid ${w.tepi}`,
                display: 'block',
              }}
            />
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 18,
                letterSpacing: '0.1em',
                color: w.redup,
                marginTop: 12,
              }}
            >
              {l.ket.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 590,
          fontFamily: f.judul,
          fontSize: 118,
          color: w.teks,
          letterSpacing: '-0.01em',
          ...masuk(frame, 52),
        }}
      >
        LaporKampus
      </div>

      <div
        style={{
          position: 'absolute',
          top: 736,
          width: 150,
          height: 3,
          backgroundColor: w.aksen,
          ...masuk(frame, 70),
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 776,
          fontFamily: f.isi,
          fontSize: 34,
          color: w.teks,
          ...masuk(frame, 82),
        }}
      >
        Wahyu Hari Santosa&nbsp;&nbsp;·&nbsp;&nbsp;23.01.55.0003&nbsp;&nbsp;·&nbsp;&nbsp;A1 / A2DLC
      </div>

      <div
        style={{
          position: 'absolute',
          top: 840,
          fontFamily: f.isi,
          fontSize: 23,
          letterSpacing: '0.06em',
          color: w.redup,
          ...masuk(frame, 96),
        }}
      >
        github.com/wahyuharis03/laporkampus
      </div>
    </AbsoluteFill>
  );
};
