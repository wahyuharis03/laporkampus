import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {Bagian} from '../components/Bagian';

const Bar: React.FC<{w?: number | string; h?: number; opacity?: number; mt?: number}> = ({
  w: lebar = '100%',
  h = 8,
  opacity = 0.16,
  mt = 8,
}) => (
  <div
    style={{
      width: lebar,
      height: h,
      marginTop: mt,
      borderRadius: 3,
      backgroundColor: `rgba(255,255,255,${opacity})`,
    }}
  />
);

const Tombol: React.FC<{mt?: number}> = ({mt = 12}) => (
  <div
    style={{
      width: '100%',
      height: 22,
      marginTop: mt,
      borderRadius: 5,
      backgroundColor: 'rgba(196,24,60,0.55)',
    }}
  />
);

const Kaca: React.FC<{judul: string; kode: string; children: React.ReactNode; delay: number}> = ({
  judul,
  kode,
  children,
  delay,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{width: 168, ...masuk(frame, delay)}}>
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 13,
          letterSpacing: '0.12em',
          color: w.redup,
          marginBottom: 8,
        }}
      >
        {kode}
      </div>
      <div
        style={{
          width: 168,
          height: 300,
          boxSizing: 'border-box',
          padding: '10px 10px',
          backgroundColor: '#17141E',
          border: `1.5px solid #4A4356`,
          borderRadius: 10,
        }}
      >
        <div
          style={{
            height: 16,
            borderBottom: '1px solid rgba(255,255,255,0.14)',
            marginBottom: 8,
          }}
        />
        {children}
      </div>
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 15,
          color: w.teks,
          marginTop: 10,
        }}
      >
        {judul}
      </div>
    </div>
  );
};

export const Wireframe: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Bagian nomor="05" teks="WIREFRAME" />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 148,
          fontFamily: f.isi,
          fontSize: 21,
          color: w.redup,
          ...masuk(frame, 4),
        }}
      >
        Figma Minggu 4 — lima frame, dipetakan satu banding satu ke halaman aplikasi
      </div>

      <div style={{position: 'absolute', left: PAD, top: 208, display: 'flex', gap: 22}}>
        <Kaca kode="H1" judul="Login" delay={14}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: 'rgba(196,24,60,0.5)',
                marginTop: 14,
              }}
            />
          </div>
          <Bar w="70%" h={9} mt={14} opacity={0.3} />
          <Bar h={20} mt={10} />
          <Bar h={20} mt={8} />
          <Tombol mt={12} />
          <Bar w="60%" h={6} mt={14} opacity={0.1} />
        </Kaca>

        <Kaca kode="H2" judul="Beranda" delay={22}>
          <div
            style={{
              height: 54,
              borderRadius: 6,
              backgroundColor: 'rgba(196,24,60,0.28)',
              marginTop: 2,
            }}
          />
          <div style={{display: 'flex', gap: 6, marginTop: 10}}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 34,
                  borderRadius: 5,
                  border: '1px solid rgba(255,255,255,0.16)',
                }}
              />
            ))}
          </div>
          <Bar w="45%" h={8} mt={14} opacity={0.24} />
          <div
            style={{
              height: 34,
              marginTop: 8,
              borderRadius: 5,
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          />
          <div
            style={{
              height: 34,
              marginTop: 6,
              borderRadius: 5,
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          />
          <div style={{display: 'flex', gap: 22, marginTop: 26, justifyContent: 'center'}}>
            <div style={{width: 18, height: 6, borderRadius: 3, backgroundColor: 'rgba(196,24,60,0.6)'}} />
            <div style={{width: 18, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.18)'}} />
          </div>
        </Kaca>

        <Kaca kode="H3" judul="Form Laporan" delay={30}>
          <Bar w="58%" h={10} mt={6} opacity={0.3} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <Bar w="34%" h={5} mt={10} opacity={0.18} />
              <Bar h={18} mt={4} opacity={0.09} />
            </div>
          ))}
          <Tombol mt={12} />
        </Kaca>

        <Kaca kode="H4" judul="Laporan Saya" delay={38}>
          <div style={{display: 'flex', gap: 5, marginTop: 4}}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 38,
                  height: 14,
                  borderRadius: 7,
                  border: '1px solid rgba(255,255,255,0.18)',
                  backgroundColor: i === 0 ? 'rgba(196,24,60,0.4)' : 'transparent',
                }}
              />
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                height: 48,
                marginTop: 10,
                borderRadius: 5,
                border: '1px solid rgba(255,255,255,0.14)',
                padding: 6,
                boxSizing: 'border-box',
              }}
            >
              <Bar w="62%" h={6} mt={2} opacity={0.22} />
              <Bar w="42%" h={5} mt={6} opacity={0.12} />
            </div>
          ))}
        </Kaca>

        <Kaca kode="H5" judul="Detail" delay={46}>
          <Bar w="66%" h={10} mt={6} opacity={0.3} />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 12,
              }}
            >
              <div style={{width: 44, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.16)'}} />
              <div style={{width: 48, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.24)'}} />
            </div>
          ))}
          <Bar w="100%" h={34} mt={14} opacity={0.08} />
          <Tombol mt={14} />
        </Kaca>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1058,
          top: 330,
          width: 78,
          textAlign: 'center',
          ...masuk(frame, 60),
        }}
      >
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 15,
            letterSpacing: '0.14em',
            color: w.redup,
            marginBottom: 10,
          }}
        >
          1 : 1
        </div>
        <div style={{height: 2, backgroundColor: '#5B5368', position: 'relative'}}>
          <div
            style={{
              position: 'absolute',
              right: -2,
              top: -4,
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderLeft: '9px solid #5B5368',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1160,
          top: 196,
          width: 310,
          ...masuk(frame, 66),
        }}
      >
        <div
          style={{
            width: 310,
            height: 620,
            borderRadius: 34,
            border: `8px solid ${w.kartuNaik}`,
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <Img
            src={staticFile('shots/screenshot-beranda.png')}
            style={{width: '100%', display: 'block'}}
          />
        </div>
      </div>

      <div style={{position: 'absolute', left: 1510, top: 230, width: 300}}>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: w.aksenMuda,
            ...masuk(frame, 74),
          }}
        >
          IMPLEMENTASI
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 25,
            lineHeight: 1.4,
            color: w.teks,
            marginTop: 14,
            ...masuk(frame, 80),
          }}
        >
          Susunan, hierarki, dan navigasi tetap sama.
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 19,
            lineHeight: 1.6,
            color: w.redup,
            marginTop: 18,
            ...masuk(frame, 90),
          }}
        >
          Style guide: maroon #800020, jarak kelipatan 8, radius 10–12, tombol
          utama 52 px.
        </div>
        <div
          style={{
            marginTop: 26,
            padding: '16px 18px',
            border: `1px solid ${w.tepi}`,
            borderRadius: 10,
            fontFamily: f.isi,
            fontSize: 17,
            lineHeight: 1.5,
            color: w.redup,
            ...masuk(frame, 104),
          }}
        >
          Yang berubah saat implementasi: kepadatan teks dan ukuran kartu.
        </div>
      </div>
    </AbsoluteFill>
  );
};
