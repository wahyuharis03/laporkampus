import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile, useCurrentFrame} from 'remotion';
import {ADEGAN} from './timings';
import {SISIPAN} from './timings-demo';
import {BAB_DEMO, URUTAN_DEMO} from './bab-demo';
import {Demo} from './scenes/Demo';
import {DemoBuka, DemoTutup} from './scenes/DemoSisipan';
import {Latar} from './components/Latar';
import {w} from './theme';

/**
 * Video demo mandiri: rekaman layar sendiri + narasi, tanpa bagian teori.
 *
 * Dipakai bila demo perlu ditonton terpisah dari video UTS penuh. Isi dan
 * durasi tiap bab sama persis dengan video UTS, karena keduanya membaca
 * src/timings.ts dan src/bab-demo.ts yang sama.
 */

const ambil = (id: string) => {
  const s = SISIPAN.find((x) => x.id === id);
  if (!s) throw new Error(`Sisipan tidak dikenal: ${id}. Jalankan scripts/tts-demo.py.`);
  return s;
};

const BUKA = ambil('demo-intro');
const TUTUP = ambil('demo-outro');

const ADEGAN_DEMO = URUTAN_DEMO.map((id) => {
  const adegan = ADEGAN.find((x) => x.id === id);
  if (!adegan) throw new Error(`Adegan demo tidak ada di timings.ts: ${id}`);
  return adegan;
});

export const TOTAL_DEMO =
  BUKA.frames +
  ADEGAN_DEMO.reduce((n, a) => n + a.frames, 0) +
  TUTUP.frames;

const Kemajuan: React.FC = () => {
  const frame = useCurrentFrame();
  const rasio = Math.min(1, frame / TOTAL_DEMO);

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

export const DemoSaja: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: w.latar}}>
      <Latar />

      <Series>
        <Series.Sequence durationInFrames={BUKA.frames}>
          <DemoBuka />
          <Audio src={staticFile(BUKA.audio)} />
        </Series.Sequence>

        {ADEGAN_DEMO.map((adegan) => {
          const bab = BAB_DEMO[adegan.id];
          if (!bab) throw new Error(`Bab demo tidak dikenal: ${adegan.id}`);

          return (
            <Series.Sequence key={adegan.id} durationInFrames={adegan.frames}>
              <Demo {...bab} nomorBagian="DEMO" labelBagian="APLIKASI LAPORKAMPUS" />
              <Audio src={staticFile(adegan.audio)} />
            </Series.Sequence>
          );
        })}

        <Series.Sequence durationInFrames={TUTUP.frames}>
          <DemoTutup />
          <Audio src={staticFile(TUTUP.audio)} />
        </Series.Sequence>
      </Series>

      <Kemajuan />
    </AbsoluteFill>
  );
};
