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
import {Target} from './scenes/Target';
import {Cakupan} from './scenes/Cakupan';
import {Alur} from './scenes/Alur';
import {Bukti} from './scenes/Bukti';
import {BasisData} from './scenes/BasisData';
import {Penutup} from './scenes/Penutup';

const PETA: Record<string, React.FC> = {
  pembuka: Pembuka,
  masalah: Masalah,
  target: Target,
  cakupan: Cakupan,
  alur: Alur,
  bukti: Bukti,
  basisdata: BasisData,
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
          const Adegan = PETA[adegan.id];
          if (!Adegan) {
            throw new Error(`Adegan tidak dikenal: ${adegan.id}`);
          }
          return (
            <Series.Sequence key={adegan.id} durationInFrames={adegan.frames}>
              <Adegan />
              <Audio src={staticFile(adegan.audio)} />
            </Series.Sequence>
          );
        })}
      </Series>

      <Kemajuan />
    </AbsoluteFill>
  );
};
