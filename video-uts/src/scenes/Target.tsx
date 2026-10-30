import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const KEBUTUHAN = [
  'Menyampaikan laporan kerusakan dengan mudah',
  'Mengisi informasi lokasi dan kerusakan secara jelas',
  'Melihat daftar laporan yang pernah dikirim',
  'Mengetahui perkembangan status laporan',
];

export const Target: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <LabelBagian nomor="02" teks="TARGET PENGGUNA" />

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
        Mahasiswa sebagai pengguna utama
      </div>

      {/* Kartu persona */}
      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 326,
          width: 520,
          boxSizing: 'border-box',
          padding: '40px 40px 52px',
          backgroundColor: w.kartu,
          border: `1px solid ${w.tepi}`,
          borderTop: `4px solid ${w.aksen}`,
          borderRadius: 12,
          ...masuk(frame, 26),
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 56,
            backgroundColor: w.aksen,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: f.judul,
            fontSize: 44,
            color: '#FFFFFF',
            marginBottom: 26,
          }}
        >
          DA
        </div>

        <div
          style={{
            display: 'inline-block',
            fontFamily: f.isi,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: w.kuning,
            border: `1px solid ${w.kuning}`,
            borderRadius: 4,
            padding: '5px 10px',
            marginBottom: 16,
          }}
        >
          PERSONA ILUSTRATIF
        </div>

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 34,
            fontWeight: 700,
            color: w.teks,
          }}
        >
          Dimas
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 23,
            color: w.redup,
            marginTop: 10,
            lineHeight: 1.5,
          }}
        >
          Mahasiswa yang melapor sambil berdiri
          <br />
          di lokasi kejadian
        </div>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 19,
            fontStyle: 'italic',
            color: w.redup,
            marginTop: 18,
            paddingTop: 16,
            borderTop: `1px solid ${w.tepi}`,
          }}
        >
          Contoh untuk ilustrasi, bukan hasil penelitian lapangan.
        </div>
      </div>

      {/* Kebutuhan */}
      <div
        style={{
          position: 'absolute',
          left: PAD + 580,
          right: PAD,
          top: 326,
        }}
      >
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: w.aksenMuda,
            marginBottom: 22,
            ...masuk(frame, 48),
          }}
        >
          KEBUTUHAN YANG PALING RELEVAN
        </div>

        {KEBUTUHAN.map((k, i) => (
          <div
            key={k}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              padding: '34px 0',
              borderBottom: `1px solid ${w.tepi}`,
              ...masuk(frame, 60 + i * 18),
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                border: `2px solid ${w.aksen}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: f.judul,
                fontSize: 22,
                color: w.aksenMuda,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 30,
                lineHeight: 1.35,
                color: w.teks,
              }}
            >
              {k}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
