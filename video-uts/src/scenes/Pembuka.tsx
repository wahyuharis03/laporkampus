import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, w} from '../theme';
import {masuk} from '../components/anim';

export const Pembuka: React.FC = () => {
  const frame = useCurrentFrame();

  const judul = masuk(frame, 10);
  const garis = masuk(frame, 34);
  const sub = masuk(frame, 46);
  const kaki = masuk(frame, 70);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: '0.32em',
          color: w.aksenMuda,
          marginBottom: 34,
          ...masuk(frame, 0),
        }}
      >
        PROPOSAL PROJECT UTS
      </div>

      <div
        style={{
          fontFamily: f.judul,
          fontSize: 168,
          fontWeight: 400,
          letterSpacing: '-0.015em',
          color: w.teks,
          lineHeight: 1,
          ...judul,
        }}
      >
        LaporKampus
      </div>

      <div
        style={{
          width: 190,
          height: 4,
          backgroundColor: w.aksen,
          marginTop: 44,
          marginBottom: 40,
          ...garis,
        }}
      />

      <div
        style={{
          fontFamily: f.isi,
          fontSize: 40,
          color: w.redup,
          letterSpacing: '0.01em',
          ...sub,
        }}
      >
        Pelaporan kerusakan fasilitas kampus
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 96,
          fontFamily: f.isi,
          fontSize: 25,
          letterSpacing: '0.1em',
          color: w.redup,
          ...kaki,
        }}
      >
        Wahyu Hari Santosa&nbsp;&nbsp;·&nbsp;&nbsp;23.01.55.0003&nbsp;&nbsp;·&nbsp;&nbsp;A1 / A2DLC
      </div>
    </AbsoluteFill>
  );
};
