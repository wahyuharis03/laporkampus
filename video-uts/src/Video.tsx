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

const BAB_DEMO: Record<string, Omit<BabDemo, 'detik'>> = {
  'demo-login': {
    klip: 'demo-login',
    judul: 'Login dan validasi awal',
    caption:
      'Masuk tanpa mengisi ditolak dengan pesan yang jelas. Setelah NIM dan password diisi, pengguna masuk ke Beranda.',
    langkah: 1,
  },
  'demo-beranda': {
    klip: 'demo-beranda',
    judul: 'Beranda: ringkasan status',
    caption:
      'Ringkasan status dan laporan terbaru dihitung dari data yang sama dengan daftar — bukan angka tetap.',
    langkah: 2,
  },
  'demo-form': {
    klip: 'demo-form',
    judul: 'Form Laporan: enam kolom',
    caption:
      'Enam kolom dengan dua jenis input: teks, dropdown, tanggal, dan angka. Kirim kosong memunculkan pesan di tiap kolom.',
    langkah: 3,
    zoom: 1.05,
    fokus: '50% 0%',
    ekor: 'demo-form-akhir.png',
  },
  'demo-salah': {
    klip: 'demo-salah',
    judul: 'Validasi menolak isian salah',
    caption:
      'Lokasi kurang dari 5 karakter, jumlah lebih dari 50 unit, dan deskripsi kurang dari 15 karakter ditolak.',
    langkah: 4,
    zoom: 1.05,
    fokus: '50% 0%',
  },
  'demo-benar': {
    klip: 'demo-benar-potong',
    judul: 'Kirim dan simpan data',
    caption:
      'SnackBar hijau muncul, aplikasi kembali ke Beranda, dan laporan baru tampil di posisi teratas.',
    langkah: 5,
    // Tanpa perbesaran: SnackBar ada di dasar layar, dan zoom 1,05 memotongnya.
    zoom: 1.0,
    fokus: '50% 0%',
    // Klip dipotong 6 detik di awal supaya klik "Kirim" jatuh tepat saat narasi
    // menyebutnya. Sisa waktunya diisi gambar diam agar layar tidak membeku.
    ekor: 'demo-benar-akhir.png',
  },
  'demo-daftar': {
    klip: 'demo-daftar',
    judul: 'Laporan Saya dan keadaan kosong',
    caption:
      'Filter Diproses belum punya data. Aplikasi menjelaskan keadaan kosong, bukan meninggalkan layar kosong.',
    langkah: 6,
  },
  'demo-detail': {
    klip: 'demo-detail',
    judul: 'Detail Laporan',
    caption:
      'Semua isian formulir tampil di sini. Data mengalir dari form ke daftar, lalu ke detail.',
    langkah: 7,
    zoom: 1.0,
    fokus: '50% 0%',
  },
};

// Durasi berkas klip demo (detik), dipakai untuk menghitung sisa gambar diam.
const DURASI_KLIP: Record<string, number> = {
  'demo-login': 19.35,
  'demo-beranda': 13.02,
  'demo-form': 19.4,
  'demo-salah': 25.45,
  'demo-benar': 17.4,
  'demo-daftar': 18.27,
  'demo-detail': 15.36,
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
                <Demo {...bab} detik={DURASI_KLIP[adegan.id]} />
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
