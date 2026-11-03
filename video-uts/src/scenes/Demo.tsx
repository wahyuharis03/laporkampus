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
  /** Perbesaran isi layar ponsel, untuk bagian yang perlu dibaca lebih jelas. */
  zoom?: number;
  fokus?: string;
  /** Durasi berkas klip dalam detik (diisi di Video.tsx). */
  detik: number;
  /** Gambar diam pengganti bila narasi lebih panjang dari klip. */
  ekor?: string;
};

const LANGKAH = ['Login', 'Beranda', 'Form', 'Validasi', 'Kirim', 'Daftar', 'Detail'];

export const Demo: React.FC<BabDemo> = ({
  klip,
  judul,
  caption,
  langkah,
  zoom = 1,
  fokus = '50% 45%',
  detik,
  ekor,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const klipFrames = Math.round(detik * 30);

  return (
    <AbsoluteFill>
      <Bagian nomor="06" teks="DEMO PROTOTYPE" kanan={`LANGKAH ${langkah} / 7`} />

      <div
        style={{
          position: 'absolute',
          left: 132,
          top: 126,
          width: 444,
          height: 888,
          borderRadius: 52,
          border: `10px solid ${w.kartuNaik}`,
          boxShadow: '0 34px 80px rgba(0,0,0,0.6)',
          backgroundColor: '#0B0910',
          overflow: 'hidden',
          ...masuk(frame, 2),
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `scale(${zoom})`,
            transformOrigin: fokus,
          }}
        >
          <OffthreadVideo
            src={staticFile(`demo/${klip}.mp4`)}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
          {ekor && durationInFrames > klipFrames ? (
            <Sequence from={klipFrames} layout="none">
              <Img
                src={staticFile(`demo/${ekor}`)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Sequence>
          ) : null}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 668,
          top: 176,
          width: 1120,
        }}
      >
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: w.aksenMuda,
            ...masuk(frame, 6),
          }}
        >
          REKAMAN APLIKASI BERJALAN · CHROME
        </div>

        <div
          style={{
            fontFamily: f.judul,
            fontSize: 58,
            lineHeight: 1.1,
            color: w.teks,
            marginTop: 14,
            ...masuk(frame, 12),
          }}
        >
          {judul}
        </div>

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 27,
            lineHeight: 1.55,
            color: '#D5CFDD',
            marginTop: 20,
            maxWidth: 1040,
            ...masuk(frame, 22),
          }}
        >
          {caption}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 668,
          top: 590,
          width: 1120,
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
        }}
      >
        {LANGKAH.map((l, i) => {
          const aktif = i + 1 === langkah;
          const lewat = i + 1 < langkah;
          return (
            <div
              key={l}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                ...masuk(frame, 30 + i * 4),
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  border: `1.5px solid ${aktif ? w.aksen : lewat ? w.hijau : w.tepi}`,
                  backgroundColor: aktif
                    ? w.aksen
                    : lewat
                      ? 'rgba(63,169,107,0.16)'
                      : 'transparent',
                  color: aktif ? '#fff' : lewat ? w.hijau : w.redup,
                  fontFamily: f.isi,
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: aktif ? 23 : 20,
                  fontWeight: aktif ? 700 : 400,
                  color: aktif ? w.teks : lewat ? '#A9A2B4' : '#6F687C',
                }}
              >
                {l}
              </div>
              {aktif ? (
                <div
                  style={{
                    marginLeft: 6,
                    padding: '2px 10px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(196,24,60,0.18)',
                    color: w.aksenMuda,
                    fontFamily: f.isi,
                    fontSize: 13,
                    letterSpacing: '0.12em',
                  }}
                >
                  SEKARANG
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 668,
          right: PAD,
          bottom: 62,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          ...masuk(frame, 40),
        }}
      >
        <div style={{display: 'flex', gap: 6, flex: 1}}>
          {LANGKAH.map((l, i) => (
            <div
              key={l}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: i + 1 <= langkah ? w.aksen : w.tepi,
              }}
            />
          ))}
        </div>
        <div style={{fontFamily: f.isi, fontSize: 16, color: w.redup}}>
          bukan slide — aplikasi dijalankan langsung
        </div>
      </div>
    </AbsoluteFill>
  );
};
