import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {Bagian} from '../components/Bagian';

export type BabDemo = {
  klip: string;
  judul: string;
  caption: string;
  langkah: number;
  /** Durasi berkas klip dalam detik. */
  detik: number;
  /** Gambar diam pengganti bila narasi lebih panjang dari klip. */
  ekor?: string;
};

/**
 * Bingkai jendela untuk rekaman layar 1920x1020.
 *
 * Rekaman masih memuat bilah Chrome setinggi 108 px di atas. Bilah itu tidak
 * dipotong di berkas, melainkan digeser keluar bingkai lewat CSS, supaya berkas
 * aslinya tetap utuh dan bisa diperiksa.
 */
const LEBAR = 1760;
const SKALA = LEBAR / 1920;
const TINGGI_PENUH = Math.round(1020 * SKALA); // 935
const BILAH = Math.round(108 * SKALA); // 99
const TINGGI = TINGGI_PENUH - BILAH; // 836

export const Demo: React.FC<BabDemo> = ({klip, judul, caption, langkah, detik, ekor}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const klipFrames = Math.round(detik * 30);

  return (
    <AbsoluteFill>
      <Bagian
        nomor="06"
        teks="DEMO PROTOTYPE"
        kanan={`LANGKAH ${langkah} / 6 · ${judul.toUpperCase()}`}
      />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 126,
          width: LEBAR,
          height: TINGGI,
          borderRadius: 18,
          border: `1.5px solid ${w.tepi}`,
          backgroundColor: '#0B0910',
          boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
          overflow: 'hidden',
          ...masuk(frame, 2),
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -BILAH,
            left: 0,
            width: LEBAR,
            height: TINGGI_PENUH,
          }}
        >
          <OffthreadVideo
            src={staticFile(`demo/${klip}.mp4`)}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </div>

        {ekor && durationInFrames > klipFrames ? (
          <Sequence from={klipFrames} layout="none">
            <Img
              src={staticFile(`demo/${ekor}`)}
              style={{
                position: 'absolute',
                top: -BILAH,
                left: 0,
                width: LEBAR,
                height: TINGGI_PENUH,
                objectFit: 'cover',
              }}
            />
          </Sequence>
        ) : null}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 978,
          width: LEBAR,
          fontFamily: f.isi,
          fontSize: 23,
          lineHeight: 1.45,
          color: '#D5CFDD',
          ...masuk(frame, 18),
        }}
      >
        {caption}
      </div>
    </AbsoluteFill>
  );
};
