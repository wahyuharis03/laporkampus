import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Series,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {ADEGAN, TOTAL_FRAMES} from './timings';
import {Latar} from './components/Latar';
import {w} from './theme';
import {Pembuka} from './scenes/Pembuka';
import {Masalah} from './scenes/Masalah';
import {Persona} from './scenes/Persona';
import {Kebutuhan} from './scenes/Kebutuhan';
import {Rancangan} from './scenes/Rancangan';
import {Wireframe} from './scenes/Wireframe';
import {Demo, type BabDemo} from './scenes/Demo';
import {Teknis} from './scenes/Teknis';
import {Penutup} from './scenes/Penutup';

// Rekaman layar milik sendiri (1920x1020, Chrome). Tiap bab dipotong pada
// transisi halaman, bukan pada durasi narasi — lihat scripts/potong-rekaman-user.py.
const BAB_DEMO: Record<string, BabDemo> = {
  'demo-login': {
    klip: 'usr-login',
    judul: 'Login',
    caption:
      'Masuk tanpa isian ditolak dengan pesan merah. Setelah NIM dan password diisi, pengguna masuk ke Beranda.',
    langkah: 1,
    detik: 18.9,
    ekor: 'usr-login-akhir.png',
  },
  'demo-beranda': {
    klip: 'usr-beranda',
    judul: 'Beranda',
    caption:
      'Tiga kartu ringkasan dan laporan terbaru. Satu laporan dibuka untuk melihat halaman detail.',
    langkah: 2,
    detik: 14.1,
    ekor: 'usr-beranda-akhir.png',
  },
  'demo-form': {
    klip: 'usr-form',
    judul: 'Formulir',
    caption:
      'Enam kolom wajib. Kirim kosong memunculkan pesan merah di bawah tiap kolom.',
    langkah: 3,
    detik: 37.5,
  },
  'demo-isi': {
    klip: 'usr-isi',
    judul: 'Pengisian',
    caption:
      'Jumlah unit, deskripsi, lalu kirim. Pesan kesalahan muncul tepat di bawah kolom yang salah.',
    langkah: 4,
    detik: 26.1,
    ekor: 'usr-isi-akhir.png',
  },
  'demo-kirim': {
    klip: 'usr-kirim',
    judul: 'Kirim',
    caption:
      'SnackBar hijau, kembali ke Beranda, laporan baru di posisi teratas, dan total berubah 3 → 4.',
    langkah: 5,
    detik: 10.2,
    ekor: 'usr-kirim-akhir.png',
  },
  'demo-daftar': {
    klip: 'usr-daftar',
    judul: 'Daftar',
    caption:
      'Laporan baru ikut tampil di Laporan Saya. Filter Menunggu dan Selesai langsung menyaring daftar.',
    langkah: 6,
    detik: 12.4,
    ekor: 'usr-daftar-akhir.png',
  },
};

const PETA: Record<string, React.FC> = {
  pembuka: Pembuka,
  masalah: Masalah,
  persona: Persona,
  kebutuhan: Kebutuhan,
  rancangan: Rancangan,
  wireframe: Wireframe,
  teknis: Teknis,
  penutup: Penutup,
};

/** Garis tipis di dasar layar yang menunjukkan posisi video. */
const Kemajuan: React.FC = () => {
  const frame = useCurrentFrame();
  const rasio = Math.min(1, frame / TOTAL_FRAMES);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 3,
        width: `${rasio * 100}%`,
        backgroundColor: w.aksen,
        opacity: 0.85,
      }}
    />
  );
};

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: w.latar}}>
      <Latar />

      <Series>
        {ADEGAN.map((adegan) => {
          const bab = BAB_DEMO[adegan.id];
          const Adegan = PETA[adegan.id];

          if (!bab && !Adegan) {
            throw new Error(`Adegan tidak dikenal: ${adegan.id}`);
          }

          return (
            <Series.Sequence key={adegan.id} durationInFrames={adegan.frames}>
              {bab ? (
                <Demo {...bab} />
              ) : (
                <Adegan />
              )}
              <Audio src={staticFile(adegan.audio)} />
            </Series.Sequence>
          );
        })}
      </Series>

      <Kemajuan />
    </AbsoluteFill>
  );
};
