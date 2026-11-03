import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk, masukKiri} from '../components/anim';
import {Bagian} from '../components/Bagian';

const POIN = [
  {
    nomor: '01',
    judul: 'Kanal tersebar',
    isi: 'Laporan berpindah lewat grup chat, lisan, dan pesan pribadi.',
  },
  {
    nomor: '02',
    judul: 'Status tak terlihat',
    isi: 'Mahasiswa tidak tahu laporannya sudah dibaca atau ditangani.',
  },
  {
    nomor: '03',
    judul: 'Informasi tidak seragam',
    isi: 'Lokasi dan jenis kerusakan ditulis dengan cara berbeda.',
  },
  {
    nomor: '04',
    judul: 'Riwayat tidak tersimpan',
    isi: 'Tidak ada catatan yang bisa ditelusuri kembali.',
  },
];

export const Masalah: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Bagian nomor="01" teks="MASALAH" />

      <div style={{position: 'absolute', left: PAD, top: 186, width: 720}}>
        <div
          style={{
            fontFamily: f.judul,
            fontSize: 66,
            lineHeight: 1.12,
            color: w.teks,
            ...masuk(frame, 6),
          }}
        >
          Pengaduan yang tidak tercatat
        </div>

        <div
          style={{
            marginTop: 34,
            paddingLeft: 26,
            borderLeft: `4px solid ${w.aksen}`,
            fontFamily: f.isi,
            fontSize: 27,
            lineHeight: 1.5,
            color: '#DCD6E2',
            ...masuk(frame, 16),
          }}
        >
          Mahasiswa kesulitan menyampaikan dan memantau pengaduan kerusakan
          fasilitas kampus.
        </div>

        <div
          style={{
            marginTop: 30,
            fontFamily: f.isi,
            fontSize: 22,
            lineHeight: 1.6,
            color: w.redup,
            ...masuk(frame, 26),
          }}
        >
          Keluhan tidak terkumpul di satu tempat, statusnya tidak diketahui, dan
          tim Sarpras menerima informasi yang tidak seragam. Fasilitas rusak pun
          dibiarkan lebih lama.
        </div>

        <div
          style={{
            marginTop: 44,
            display: 'flex',
            gap: 34,
            ...masuk(frame, 40),
          }}
        >
          <div>
            <div style={{fontFamily: f.judul, fontSize: 42, color: w.aksenMuda}}>5</div>
            <div style={{fontFamily: f.isi, fontSize: 17, color: w.redup}}>
              halaman dalam sitemap
            </div>
          </div>
          <div style={{width: 1, backgroundColor: w.tepi}} />
          <div>
            <div style={{fontFamily: f.judul, fontSize: 42, color: w.aksenMuda}}>3</div>
            <div style={{fontFamily: f.isi, fontSize: 17, color: w.redup}}>
              status: Menunggu · Diproses · Selesai
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 960,
          right: PAD,
          top: 178,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {POIN.map((p, i) => (
          <div
            key={p.nomor}
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'flex-start',
              padding: '24px 28px',
              backgroundColor: w.kartu,
              border: `1px solid ${w.tepi}`,
              borderLeft: `3px solid ${w.aksen}`,
              borderRadius: 12,
              ...masukKiri(frame, 24 + i * 16),
            }}
          >
            <div
              style={{
                fontFamily: f.judul,
                fontSize: 26,
                color: w.aksenMuda,
                width: 42,
                flexShrink: 0,
              }}
            >
              {p.nomor}
            </div>
            <div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 27,
                  fontWeight: 700,
                  color: w.teks,
                }}
              >
                {p.judul}
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 21,
                  lineHeight: 1.45,
                  color: w.redup,
                  marginTop: 6,
                }}
              >
                {p.isi}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          bottom: 58,
          fontFamily: f.isi,
          fontSize: 19,
          fontStyle: 'italic',
          color: w.redup,
          ...masuk(frame, 120),
        }}
      >
        Empat poin di atas adalah penjelasan awal, bukan hasil wawancara atau
        observasi lapangan.
      </div>
    </AbsoluteFill>
  );
};
