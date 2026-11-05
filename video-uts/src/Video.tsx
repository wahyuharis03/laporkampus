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
import {Demo} from './scenes/Demo';
import {Teknis} from './scenes/Teknis';
import {Penutup} from './scenes/Penutup';
import {BAB_DEMO} from './bab-demo';

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
