import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {Bagian, Chip} from '../components/Bagian';

const HALAMAN = [
  {kode: 'H1', nama: 'Login', jenis: 'Awal', warna: w.redup},
  {kode: 'H2', nama: 'Beranda', jenis: 'Navigasi utama', warna: w.aksen},
  {kode: 'H3', nama: 'Form Laporan', jenis: 'Push', warna: w.redup},
  {kode: 'H4', nama: 'Laporan Saya', jenis: 'Navigasi utama', warna: w.aksen},
  {kode: 'H5', nama: 'Detail Laporan', jenis: 'Push', warna: w.redup},
];

const Node: React.FC<{
  x: number;
  y: number;
  judul: string;
  isi?: string;
  aksen?: boolean;
  delay: number;
}> = ({x, y, judul, isi, aksen = false, delay}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 250,
        height: 82,
        padding: '14px 20px',
        boxSizing: 'border-box',
        backgroundColor: aksen ? 'rgba(196,24,60,0.13)' : w.kartu,
        border: `1.5px solid ${aksen ? w.aksen : w.tepi}`,
        borderRadius: 12,
        ...masuk(frame, delay),
      }}
    >
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 24,
          fontWeight: 700,
          color: w.teks,
        }}
      >
        {judul}
      </div>
      {isi ? (
        <div style={{fontFamily: f.isi, fontSize: 17, color: w.redup, marginTop: 4}}>
          {isi}
        </div>
      ) : null}
    </div>
  );
};

const Panah: React.FC<{d: string; delay: number; warna?: string}> = ({
  d,
  delay,
  warna = '#5B5368',
}) => {
  const frame = useCurrentFrame();
  const o = Math.min(1, Math.max(0, (frame - delay) / 12));
  return (
    <path
      d={d}
      stroke={warna}
      strokeWidth={2.4}
      fill="none"
      markerEnd="url(#kepala)"
      opacity={o}
    />
  );
};

export const Rancangan: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Bagian nomor="04" teks="RANCANGAN" />

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
        User flow dari login sampai proses utama selesai
      </div>

      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <marker
            id="kepala"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,0 L9,4.5 L0,9 Z" fill="#5B5368" />
          </marker>
        </defs>
        <Panah d="M370,271 L438,271" delay={30} />
        <Panah d="M690,271 L758,271" delay={48} />
        <Panah d="M1010,271 L1078,271" delay={66} />
        <Panah d="M1330,271 L1398,271" delay={84} />
        <Panah d="M565,312 L565,468" delay={110} />
        <Panah d="M690,511 L758,511" delay={128} />
      </svg>

      <Node x={120} y={230} judul="Login" isi="NIM + password" delay={16} />
      <Node x={440} y={230} judul="Beranda" isi="Ringkasan status" delay={34} aksen />
      <Node x={760} y={230} judul="Form Laporan" isi="Enam kolom" delay={52} />
      <Node x={1080} y={230} judul="Validasi" isi="Per kolom" delay={70} />
      <Node x={1400} y={230} judul="Tersimpan" isi="Status: Menunggu" delay={88} />

      <Node x={440} y={470} judul="Laporan Saya" isi="Daftar + filter" delay={108} aksen />
      <Node x={760} y={470} judul="Detail Laporan" isi="Isi + status" delay={124} />

      <div
        style={{
          position: 'absolute',
          left: 1400,
          top: 330,
          width: 250,
          fontFamily: f.isi,
          fontSize: 17,
          lineHeight: 1.4,
          color: w.hijau,
          ...masuk(frame, 96),
        }}
      >
        lolos → SnackBar hijau, kembali ke Beranda
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1080,
          top: 330,
          fontFamily: f.isi,
          fontSize: 17,
          color: '#E9A0AE',
          ...masuk(frame, 76),
        }}
      >
        gagal → pesan di kolom, kirim ditahan
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 620,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          ...masuk(frame, 96),
        }}
      >
        <div style={{fontFamily: f.isi, fontSize: 21, fontWeight: 700, color: w.aksenMuda, letterSpacing: '0.14em'}}>
          SITEMAP
        </div>
        <div style={{flex: 1, height: 1, backgroundColor: w.tepi}} />
        <div style={{fontFamily: f.isi, fontSize: 18, color: w.redup}}>
          Lima halaman · dua di navigasi utama
        </div>
      </div>

      <div style={{position: 'absolute', left: PAD, top: 672, display: 'flex', gap: 24}}>
        {HALAMAN.map((h, i) => (
          <div
            key={h.kode}
            style={{
              width: 312,
              height: 176,
              padding: '22px 24px',
              boxSizing: 'border-box',
              backgroundColor: w.kartu,
              border: `1px solid ${w.tepi}`,
              borderTop: `3px solid ${h.warna}`,
              borderRadius: 12,
              ...masuk(frame, 112 + i * 12),
            }}
          >
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: h.warna === w.aksen ? w.aksenMuda : w.redup,
              }}
            >
              {h.kode}
            </div>
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 27,
                fontWeight: 700,
                color: w.teks,
                marginTop: 8,
              }}
            >
              {h.nama}
            </div>
            <div style={{marginTop: 16}}>
              <Chip
                teks={h.jenis}
                warna={h.warna === w.aksen ? w.aksen : w.redup}
                isi={h.warna === w.aksen ? 'rgba(196,24,60,0.12)' : 'transparent'}
                tebal={false}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 48,
          fontFamily: f.isi,
          fontSize: 19,
          color: w.redup,
          ...masuk(frame, 170),
        }}
      >
        H3 dan H5 dibuka dengan <span style={{color: '#DCD6E2'}}>push–pop</span>; H2
        dan H4 berada di <span style={{color: '#DCD6E2'}}>NavigationBar</span> yang
        berubah menjadi <span style={{color: '#DCD6E2'}}>NavigationRail</span> pada
        layar lebar.
      </div>
    </AbsoluteFill>
  );
};
