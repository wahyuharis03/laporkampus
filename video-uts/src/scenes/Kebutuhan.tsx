import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk, masukKiri} from '../components/anim';
import {Bagian, Chip} from '../components/Bagian';

const CERITA = [
  {
    id: 'US-01',
    teks: 'Masuk memakai NIM dan password agar laporan terhubung dengan identitas saya.',
    prioritas: 'Must',
  },
  {
    id: 'US-02',
    teks: 'Melaporkan kerusakan lewat satu formulir agar tidak menghubungi banyak pihak.',
    prioritas: 'Must',
  },
  {
    id: 'US-03',
    teks: 'Melihat daftar laporan dan statusnya agar tahu mana yang belum ditangani.',
    prioritas: 'Must',
  },
  {
    id: 'US-04',
    teks: 'Membuka detail laporan untuk memeriksa isi dan riwayatnya.',
    prioritas: 'Should',
  },
  {
    id: 'US-05',
    teks: 'Menyaring laporan menurut status agar daftar tetap mudah dibaca.',
    prioritas: 'Should',
  },
];

export const Kebutuhan: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Bagian nomor="03" teks="KEBUTUHAN & PRIORITAS" />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 156,
          fontFamily: f.isi,
          fontSize: 21,
          color: w.redup,
          ...masuk(frame, 4),
        }}
      >
        Lima user story, diturunkan dari kebutuhan persona. Format: sebagai
        mahasiswa, saya ingin …, agar ….
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 208,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {CERITA.map((c, i) => {
          const must = c.prioritas === 'Must';
          return (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                height: 108,
                padding: '0 28px',
                boxSizing: 'border-box',
                backgroundColor: must ? w.kartu : 'rgba(28,25,36,0.55)',
                border: `1px solid ${w.tepi}`,
                borderLeft: `4px solid ${must ? w.aksen : w.tepi}`,
                borderRadius: 12,
                ...masukKiri(frame, 26 + i * 18),
              }}
            >
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: must ? w.aksenMuda : w.redup,
                  width: 92,
                  flexShrink: 0,
                }}
              >
                {c.id}
              </div>
              <div
                style={{
                  flex: 1,
                  fontFamily: f.isi,
                  fontSize: 25,
                  lineHeight: 1.35,
                  color: must ? w.teks : '#C9C3D2',
                }}
              >
                {c.teks}
              </div>
              <Chip
                teks={c.prioritas}
                warna={must ? w.aksen : w.redup}
                isi={must ? 'rgba(196,24,60,0.12)' : 'transparent'}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 846,
          display: 'flex',
          gap: 40,
          ...masuk(frame, 128),
        }}
      >
        <div style={{display: 'flex', gap: 14, alignItems: 'flex-start', width: 760}}>
          <Chip teks="MUST" warna={w.aksen} isi="rgba(196,24,60,0.12)" />
          <div
            style={{
              fontFamily: f.isi,
              fontSize: 20,
              lineHeight: 1.45,
              color: w.redup,
            }}
          >
            Tanpa ketiganya, masalah utama belum terselesaikan: identitas pelapor,
            data kerusakan, dan status tidak ada.
          </div>
        </div>
        <div style={{display: 'flex', gap: 14, alignItems: 'flex-start', width: 700}}>
          <Chip teks="SHOULD" warna={w.redup} />
          <div
            style={{
              fontFamily: f.isi,
              fontSize: 20,
              lineHeight: 1.45,
              color: w.redup,
            }}
          >
            Mempercepat pemantauan, tetapi alur inti tetap berjalan tanpa keduanya.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
