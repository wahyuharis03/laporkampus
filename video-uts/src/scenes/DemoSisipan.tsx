import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk, masukKiri} from '../components/anim';
import {LANGKAH_DEMO} from '../bab-demo';

/**
 * Kartu pembuka video demo mandiri.
 *
 * Enam langkah muncul satu per satu mengikuti narasi yang menyebutkannya,
 * supaya penonton tahu apa saja yang akan diperlihatkan sebelum rekaman mulai.
 */
export const DemoBuka: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: PAD, top: 330, width: 820}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, ...masuk(frame, 4)}}>
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
            DEMO APLIKASI
          </div>
        </div>

        <div
          style={{
            fontFamily: f.judul,
            fontSize: 104,
            lineHeight: 1.05,
            color: w.teks,
            marginTop: 26,
            ...masuk(frame, 12),
          }}
        >
          LaporKampus
        </div>

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 30,
            lineHeight: 1.5,
            color: '#D5CFDD',
            marginTop: 26,
            ...masuk(frame, 22),
          }}
        >
          Enam langkah, dari login sampai laporan tersimpan.
        </div>

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 20,
            lineHeight: 1.6,
            color: w.redup,
            marginTop: 44,
            ...masuk(frame, 32),
          }}
        >
          Rekaman layar aplikasi yang berjalan di Chrome. Data masih simulasi.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1010,
          top: 250,
          width: 790,
          padding: '38px 42px',
          boxSizing: 'border-box',
          backgroundColor: w.kartu,
          border: `1px solid ${w.tepi}`,
          borderRadius: 18,
          ...masuk(frame, 18),
        }}
      >
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: w.redup,
            marginBottom: 22,
          }}
        >
          LANGKAH YANG DIPERLIHATKAN
        </div>

        {LANGKAH_DEMO.map((teks, i) => (
          <div
            key={teks}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              padding: '13px 0',
              borderTop: i === 0 ? 'none' : `1px solid ${w.tepi}`,
              ...masukKiri(frame, 168 + i * 50),
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                flex: '0 0 44px',
                borderRadius: 12,
                backgroundColor: w.kartuNaik,
                border: `1px solid ${w.tepi}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: f.isi,
                fontSize: 19,
                fontWeight: 700,
                color: w.aksenMuda,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{fontFamily: f.isi, fontSize: 25, color: '#E4DFEA'}}>{teks}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** Kartu penutup: mengembalikan penonton ke identitas dan tautan repo. */
export const DemoTutup: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}
    >
      <div style={{...masuk(frame, 4)}}>
        <div
          style={{
            fontFamily: f.judul,
            fontSize: 76,
            color: w.teks,
            lineHeight: 1.2,
          }}
        >
          Sekian demo LaporKampus
        </div>

        <div
          style={{
            width: 96,
            height: 3,
            backgroundColor: w.aksen,
            margin: '34px auto 30px',
          }}
        />

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 25,
            color: '#D5CFDD',
            lineHeight: 1.6,
          }}
        >
          Wahyu Hari Santosa · 23.01.55.0003 · Kelas A1
        </div>

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 21,
            color: w.redup,
            marginTop: 12,
            letterSpacing: '0.04em',
          }}
        >
          github.com/wahyuharis03/laporkampus
        </div>
      </div>
    </AbsoluteFill>
  );
};
