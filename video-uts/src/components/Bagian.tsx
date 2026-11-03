import React from 'react';
import {useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from './anim';

type Props = {
  nomor: string;
  teks: string;
  kanan?: string;
};

/** Kepala bagian: "01 / MASALAH" dengan garis aksen. */
export const Bagian: React.FC<Props> = ({nomor, teks, kanan = 'LAPORKAMPUS'}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: PAD,
        top: 70,
        right: PAD,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...masuk(frame, 0),
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{width: 9, height: 32, backgroundColor: w.aksen, borderRadius: 2}} />
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: w.aksenMuda,
          }}
        >
          {nomor} / {teks}
        </div>
      </div>
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 18,
          letterSpacing: '0.16em',
          color: w.redup,
        }}
      >
        {kanan}
      </div>
    </div>
  );
};

/** Chip kecil untuk label prioritas atau kategori. */
export const Chip: React.FC<{
  teks: string;
  warna?: string;
  isi?: string;
  tebal?: boolean;
}> = ({teks, warna = w.aksen, isi = 'transparent', tebal = true}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '7px 18px',
      borderRadius: 999,
      border: `1.5px solid ${warna}`,
      backgroundColor: isi,
      color: warna,
      fontFamily: f.isi,
      fontSize: 17,
      fontWeight: tebal ? 700 : 500,
      letterSpacing: '0.06em',
      whiteSpace: 'nowrap',
    }}
  >
    {teks}
  </div>
);

/** Kotak gelap dengan garis tepi tipis. */
export const Kartu: React.FC<{
  children: React.ReactNode;
  gaya?: React.CSSProperties;
}> = ({children, gaya}) => (
  <div
    style={{
      backgroundColor: w.kartu,
      border: `1px solid ${w.tepi}`,
      borderRadius: 16,
      boxSizing: 'border-box',
      ...gaya,
    }}
  >
    {children}
  </div>
);
