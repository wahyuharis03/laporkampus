import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk, masukKiri} from '../components/anim';
import {Bagian, Chip} from '../components/Bagian';

const STACK = [
  {nama: 'Flutter', isi: 'antarmuka'},
  {nama: 'Dart', isi: 'bahasa'},
  {nama: 'Material 3', isi: 'design system'},
  {nama: 'Firebase Auth', isi: 'login'},
  {nama: 'Cloud Firestore', isi: 'basis data'},
  {nama: 'Firebase Hosting', isi: 'publikasi'},
];

const BIDANG = [
  {nama: 'uid', tipe: 'string'},
  {nama: 'nim', tipe: 'string'},
  {nama: 'nama', tipe: 'string'},
  {nama: 'kelas', tipe: 'string'},
  {nama: 'email', tipe: 'string'},
  {nama: 'createdAt', tipe: 'timestamp'},
];

const LAPORAN = [
  {nama: 'pelaporUid', tipe: 'string → users.uid'},
  {nama: 'lokasi', tipe: 'string'},
  {nama: 'kategori', tipe: 'string'},
  {nama: 'urgensi', tipe: 'string'},
  {nama: 'tanggalKejadian', tipe: 'timestamp'},
  {nama: 'jumlahUnit', tipe: 'number'},
  {nama: 'deskripsi', tipe: 'string'},
  {nama: 'status', tipe: 'Menunggu | Diproses | Selesai'},
  {nama: 'createdAt / updatedAt', tipe: 'timestamp'},
];

const RIWAYAT = [
  {nama: 'status', tipe: 'string'},
  {nama: 'oleh', tipe: 'uid petugas'},
  {nama: 'catatan', tipe: 'string'},
  {nama: 'waktu', tipe: 'timestamp'},
];

const Kolom: React.FC<{
  judul: string;
  jalur: string;
  bidang: {nama: string; tipe: string}[];
  lebar: number;
  delay: number;
  aksen?: boolean;
}> = ({judul, jalur, bidang, lebar, delay, aksen = false}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: lebar,
        padding: '24px 26px',
        boxSizing: 'border-box',
        backgroundColor: w.kartu,
        border: `1px solid ${w.tepi}`,
        borderTop: `3px solid ${aksen ? w.aksen : '#5B5368'}`,
        borderRadius: 14,
        ...masuk(frame, delay),
      }}
    >
      <div
        style={{
          fontFamily: f.isi,
          fontSize: 26,
          fontWeight: 700,
          color: w.teks,
        }}
      >
        {judul}
      </div>
      <div
        style={{
          fontFamily: 'Consolas, "Courier New", monospace',
          fontSize: 15,
          color: w.aksenMuda,
          marginTop: 4,
        }}
      >
        {jalur}
      </div>
      <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 7}}>
        {bidang.map((b) => (
          <div
            key={b.nama}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              borderBottom: '1px solid rgba(255,255,255,0.045)',
              paddingBottom: 6,
            }}
          >
            <div
              style={{
                fontFamily: 'Consolas, "Courier New", monospace',
                fontSize: 17,
                color: '#E3DEE9',
                whiteSpace: 'nowrap',
              }}
            >
              {b.nama}
            </div>
            <div
              style={{
                fontFamily: f.isi,
                fontSize: 15,
                color: w.redup,
                textAlign: 'right',
              }}
            >
              {b.tipe}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Teknis: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Bagian nomor="07" teks="RENCANA TEKNIS" />

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 132,
          display: 'flex',
          gap: 12,
          ...masuk(frame, 4),
        }}
      >
        {STACK.map((s, i) => (
          <div
            key={s.nama}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
              padding: '11px 18px',
              border: `1px solid ${w.tepi}`,
              borderRadius: 10,
              backgroundColor: i < 3 ? 'rgba(196,24,60,0.10)' : w.kartu,
              ...masuk(frame, 8 + i * 5),
            }}
          >
            <div style={{fontFamily: f.isi, fontSize: 20, fontWeight: 700, color: w.teks}}>
              {s.nama}
            </div>
            <div style={{fontFamily: f.isi, fontSize: 15, color: w.redup}}>{s.isi}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 206,
          display: 'flex',
          gap: 26,
          alignItems: 'flex-start',
        }}
      >
        <Kolom
          judul="users"
          jalur="users/{uid}"
          bidang={BIDANG}
          lebar={470}
          delay={24}
        />
        <Kolom
          judul="laporan"
          jalur="laporan/{laporanId}"
          bidang={LAPORAN}
          lebar={720}
          delay={40}
          aksen
        />
        <Kolom
          judul="riwayatStatus"
          jalur="laporan/{id}/riwayatStatus/{riwayatId}"
          bidang={RIWAYAT}
          lebar={450}
          delay={56}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          top: 742,
          display: 'flex',
          gap: 26,
          ...masukKiri(frame, 90),
        }}
      >
        <div
          style={{
            width: 800,
            padding: '20px 24px',
            boxSizing: 'border-box',
            backgroundColor: 'rgba(196,24,60,0.08)',
            border: `1px solid rgba(196,24,60,0.3)`,
            borderRadius: 12,
          }}
        >
          <div style={{fontFamily: f.isi, fontSize: 17, fontWeight: 700, letterSpacing: '0.12em', color: w.aksenMuda}}>
            QUERY
          </div>
          <div style={{fontFamily: f.isi, fontSize: 19, lineHeight: 1.55, color: '#DCD6E2', marginTop: 8}}>
            Mahasiswa: <span style={{fontFamily: 'Consolas, monospace', fontSize: 17}}>where pelaporUid == uid</span>{' '}
            + <span style={{fontFamily: 'Consolas, monospace', fontSize: 17}}>orderBy createdAt desc</span>.
            Petugas: <span style={{fontFamily: 'Consolas, monospace', fontSize: 17}}>where status == …</span>.
          </div>
        </div>

        <div
          style={{
            width: 830,
            padding: '20px 24px',
            boxSizing: 'border-box',
            backgroundColor: w.kartu,
            border: `1px solid ${w.tepi}`,
            borderRadius: 12,
          }}
        >
          <div style={{fontFamily: f.isi, fontSize: 17, fontWeight: 700, letterSpacing: '0.12em', color: w.redup}}>
            ATURAN KEAMANAN
          </div>
          <div style={{fontFamily: f.isi, fontSize: 19, lineHeight: 1.55, color: '#DCD6E2', marginTop: 8}}>
            Mahasiswa hanya membaca dan menulis laporannya sendiri. Perubahan status
            dan subcollection riwayat hanya untuk petugas Sarpras.
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 40,
          fontFamily: f.isi,
          fontSize: 17,
          color: w.redup,
          ...masuk(frame, 110),
        }}
      >
        Paket Spark: tanpa Cloud Functions dan tanpa billing. Data tetap mengikuti
        struktur yang sama saat migrasi dari data simulasi.
      </div>
    </AbsoluteFill>
  );
};
