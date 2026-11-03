import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';

const Identitas: React.FC<{label: string; nilai: string; delay: number}> = ({
  label,
  nilai,
  delay,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{...masuk(frame, delay)}}>
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 15,
          letterSpacing: '0.18em',
          color: w.redup,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 27,
          fontWeight: 600,
          color: w.teks,
        }}
      >
        {nilai}
      </div>
    </div>
  );
};

export const Pembuka: React.FC = () => {
  const frame = useCurrentFrame();
  const mengambang = Math.sin(frame / 42) * 7;

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: PAD, top: 186, width: 1080}}>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.26em',
            color: w.aksenMuda,
            ...masuk(frame, 4),
          }}
        >
          UTS · MOBILE AND WEB APPLICATION DEVELOPMENT
        </div>

        <div
          style={{
            fontFamily: f.judul,
            fontSize: 146,
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            color: w.teks,
            marginTop: 26,
            ...masuk(frame, 14),
          }}
        >
          LaporKampus
        </div>

        <div
          style={{
            width: 132,
            height: 5,
            backgroundColor: w.aksen,
            marginTop: 30,
            borderRadius: 3,
            ...masuk(frame, 26),
          }}
        />

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 33,
            lineHeight: 1.42,
            color: w.teks,
            marginTop: 30,
            maxWidth: 900,
            ...masuk(frame, 36),
          }}
        >
          Aplikasi pelaporan kerusakan fasilitas kampus: satu formulir, satu daftar,
          status yang bisa dipantau.
        </div>

        <div style={{display: 'flex', gap: 72, marginTop: 58}}>
          <Identitas label="NAMA" nilai="Wahyu Hari Santosa" delay={58} />
          <Identitas label="NIM" nilai="23.01.55.0003" delay={64} />
          <Identitas label="KELAS" nilai="A1" delay={70} />
        </div>

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 19,
            color: w.redup,
            marginTop: 50,
            ...masuk(frame, 82),
          }}
        >
          Semester Ganjil 2026/2027 · Project individu
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 150,
          top: 132 + mengambang,
          width: 392,
          height: 800,
          borderRadius: 54,
          border: `10px solid ${w.kartuNaik}`,
          boxShadow: '0 40px 90px rgba(0,0,0,0.55)',
          overflow: 'hidden',
          backgroundColor: '#fff',
          ...masuk(frame, 30),
        }}
      >
        <Img
          src={staticFile('shots/screenshot-beranda.png')}
          style={{width: '100%', display: 'block'}}
        />
      </div>
    </AbsoluteFill>
  );
};
