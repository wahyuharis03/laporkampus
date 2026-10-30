import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from '../components/anim';
import {LabelBagian} from '../components/LabelBagian';

const STATUS = [
  {nama: 'Dilaporkan', ket: 'Laporan masuk dan tercatat', warna: w.kuning},
  {
    nama: 'Sedang Dikerjakan Sarpras',
    ket: 'Sedang ditangani petugas',
    warna: w.aksen,
  },
  {
    nama: 'Terverifikasi Selesai',
    ket: 'Perbaikan sudah dipastikan',
    warna: w.hijau,
  },
];

export const Validasi: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <LabelBagian nomor="05" teks="VALIDASI & STATUS" />

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
        Isian diperiksa sebelum laporan disimpan
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 262,
          fontFamily: f.isi,
          fontSize: 27,
          color: w.aksenMuda,
          ...masuk(frame, 20),
        }}
      >
        Setiap kolom divalidasi, dan pesan kesalahan muncul bila ada yang belum benar.
      </div>

      {/* Tiga tahap status */}
      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 380,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {STATUS.map((s, i) => (
          <React.Fragment key={s.nama}>
            <div
              style={{
                flex: 1,
                boxSizing: 'border-box',
                padding: '34px 30px',
                backgroundColor: w.kartu,
                border: `1px solid ${w.tepi}`,
                borderTop: `4px solid ${s.warna}`,
                borderRadius: 12,
                ...masuk(frame, 40 + i * 22),
              }}
            >
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: w.redup,
                  marginBottom: 14,
                }}
              >
                TAHAP {i + 1}
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 27,
                  fontWeight: 700,
                  lineHeight: 1.28,
                  color: s.warna,
                }}
              >
                {s.nama}
              </div>
              <div
                style={{
                  fontFamily: f.isi,
                  fontSize: 21,
                  color: w.redup,
                  marginTop: 12,
                  lineHeight: 1.4,
                }}
              >
                {s.ket}
              </div>
            </div>

            {i < STATUS.length - 1 ? (
              <div
                style={{
                  width: 46,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: f.isi,
                  fontSize: 28,
                  color: w.aksen,
                  ...masuk(frame, 48 + i * 22),
                }}
              >
                →
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: 700,
          ...masuk(frame, 130),
        }}
      >
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 25,
            lineHeight: 1.5,
            color: '#CFC8D6',
          }}
        >
          Dengan tiga tahap ini, mahasiswa dapat melihat posisi pengaduannya tanpa
          harus bertanya ulang.
        </div>
        <div
          style={{
            marginTop: 22,
            paddingTop: 20,
            borderTop: `1px solid ${w.tepi}`,
            fontFamily: f.isi,
            fontSize: 22,
            color: w.redup,
            lineHeight: 1.5,
          }}
        >
          Tahap awal memakai data simulasi, sehingga laporan kembali ke contoh awal saat
          aplikasi dimuat ulang. Integrasi basis data produksi berada di luar cakupan.
        </div>
      </div>
    </AbsoluteFill>
  );
};
