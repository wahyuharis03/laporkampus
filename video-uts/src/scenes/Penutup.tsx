import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk, masukKiri} from '../components/anim';
import {Bagian} from '../components/Bagian';

const RENCANA = [
  {pekan: '9', isi: 'Firebase Authentication'},
  {pekan: '10', isi: 'Firestore: baca–tulis laporan'},
  {pekan: '11', isi: 'Unggah foto kerusakan'},
  {pekan: '12', isi: 'Hosting dan uji perangkat'},
  {pekan: '13', isi: 'Pengujian dan perbaikan'},
  {pekan: '14', isi: 'Penyempurnaan antarmuka'},
  {pekan: '15', isi: 'Demo untuk UAS'},
];

const PELAJARAN = [
  'Validasi diturunkan dari user story, bukan ditebak saat menulis kode.',
  'Rancangan dan implementasi harus memakai istilah yang sama.',
  'Commit bertahap membuat riwayat pekerjaan terbaca.',
];

export const Penutup: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Bagian nomor="08" teks="PENUTUP" />

      <div style={{position: 'absolute', left: PAD, top: 170, width: 900}}>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: w.aksenMuda,
            ...masuk(frame, 6),
          }}
        >
          RENCANA PERTEMUAN 9–15
        </div>

        <div
          style={{
            marginTop: 20,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          {RENCANA.map((r, i) => (
            <div
              key={r.pekan}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '15px 18px',
                backgroundColor: w.kartu,
                border: `1px solid ${w.tepi}`,
                borderRadius: 10,
                ...masukKiri(frame, 14 + i * 8),
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  backgroundColor: 'rgba(196,24,60,0.16)',
                  border: `1px solid rgba(196,24,60,0.4)`,
                  color: w.aksenMuda,
                  fontFamily: f.isi,
                  fontSize: 16,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {r.pekan}
              </div>
              <div style={{fontFamily: f.isi, fontSize: 20, color: '#DCD6E2'}}>
                {r.isi}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{position: 'absolute', left: 1080, top: 170, width: 720}}>
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: w.redup,
            ...masuk(frame, 70),
          }}
        >
          KENDALA & PELAJARAN
        </div>

        <div style={{marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10}}>
          {PELAJARAN.map((p, i) => (
            <div
              key={p}
              style={{
                fontFamily: f.isi,
                fontSize: 19,
                lineHeight: 1.45,
                color: '#CFC8D8',
                paddingLeft: 18,
                borderLeft: `2px solid ${w.tepi}`,
                ...masuk(frame, 80 + i * 10),
              }}
            >
              {p}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 34,
            paddingTop: 26,
            borderTop: `1px solid ${w.tepi}`,
            ...masuk(frame, 120),
          }}
        >
          <div
            style={{
              fontFamily: f.judul,
              fontSize: 64,
              color: w.teks,
              lineHeight: 1.1,
            }}
          >
            Terima kasih
          </div>
          <div
            style={{
              fontFamily: f.isi,
              fontSize: 20,
              color: w.redup,
              marginTop: 12,
            }}
          >
            Wahyu Hari Santosa · 23.01.55.0003 · A1
          </div>
          <div
            style={{
              fontFamily: f.isi,
              fontSize: 17,
              color: '#6F687C',
              marginTop: 6,
            }}
          >
            github.com/wahyuharis03/laporkampus
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
