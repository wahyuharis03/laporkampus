import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk, masukKiri} from '../components/anim';
import {Bagian, Chip} from '../components/Bagian';

const KEBUTUHAN = [
  'Melapor dalam satu menit, langsung dari ponsel.',
  'Tahu status laporan tanpa harus bertanya ulang.',
  'Melihat riwayat laporan yang pernah dikirim.',
  'Tidak perlu memasang aplikasi baru.',
];

export const Persona: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Bagian nomor="02" teks="PENGGUNA" />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 182,
          width: 610,
          padding: '38px 40px',
          boxSizing: 'border-box',
          backgroundColor: w.kartu,
          border: `1px solid ${w.tepi}`,
          borderRadius: 18,
          ...masuk(frame, 8),
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 46,
              backgroundColor: w.aksen,
              color: '#fff',
              fontFamily: f.judul,
              fontSize: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            R
          </div>
          <div>
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 33,
                fontWeight: 700,
                color: w.teks,
              }}
            >
              Rani Puspita
            </div>
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 20,
                color: w.redup,
                marginTop: 6,
              }}
            >
              20 tahun · Semester 4 · Sistem Informasi
            </div>
          </div>
        </div>

        <div style={{height: 1, backgroundColor: w.tepi, margin: '30px 0'}} />

        <div
          style={{
            fontFamily: f.judul,
            fontSize: 29,
            lineHeight: 1.5,
            fontStyle: 'italic',
            color: '#E6E0EC',
          }}
        >
          “Saya cuma mau lapor sekali, lalu tahu kapan diperbaiki. Tidak perlu
          chat dosen atau menunggu di ruang Sarpras.”
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 30,
            flexWrap: 'wrap',
          }}
        >
          <Chip teks="PERSONA ILUSTRATIF" warna={w.kuning} isi="rgba(217,164,65,0.10)" />
          <Chip teks="PENGGUNA UTAMA" warna={w.redup} isi="transparent" tebal={false} />
        </div>

        <div
          style={{
            fontFamily: f.isi,
            fontSize: 18,
            lineHeight: 1.5,
            color: w.redup,
            marginTop: 22,
          }}
        >
          Disusun untuk menggambarkan pengguna, bukan hasil penelitian lapangan.
        </div>
      </div>

      <div style={{position: 'absolute', left: 800, top: 182, width: 1000}}>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: w.aksenMuda,
            ...masuk(frame, 18),
          }}
        >
          KEBUTUHAN UTAMA
        </div>

        <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14}}>
          {KEBUTUHAN.map((k, i) => (
            <div
              key={k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                padding: '24px 26px',
                backgroundColor: w.kartu,
                border: `1px solid ${w.tepi}`,
                borderRadius: 12,
                ...masukKiri(frame, 40 + i * 22),
              }}
            >
              <div
                style={{
                  fontFamily: f.judul,
                  fontSize: 30,
                  color: w.aksen,
                  width: 46,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 27,
                  lineHeight: 1.4,
                  color: w.teks,
                }}
              >
                {k}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            padding: '22px 26px',
            backgroundColor: 'rgba(196,24,60,0.10)',
            border: `1px solid rgba(196,24,60,0.35)`,
            borderRadius: 12,
            fontFamily: f.isi,
            fontSize: 21,
            lineHeight: 1.55,
            color: '#E9C9D2',
            ...masuk(frame, 150),
          }}
        >
          Kebutuhan ini menjadi dasar lima user story pada bagian berikutnya.
        </div>
      </div>
    </AbsoluteFill>
  );
};
