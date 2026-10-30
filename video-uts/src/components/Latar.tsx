import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {w} from '../theme';

/** Latar gelap dengan dua sumber cahaya yang bergerak sangat lambat. */
export const Latar: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  const x1 = 22 + Math.sin(t * 0.13) * 7;
  const y1 = 26 + Math.cos(t * 0.11) * 7;
  const x2 = 78 + Math.cos(t * 0.09) * 6;
  const y2 = 76 + Math.sin(t * 0.12) * 6;

  return (
    <AbsoluteFill style={{backgroundColor: w.latar}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${x1}% ${y1}%, rgba(196,24,60,0.20), rgba(196,24,60,0) 52%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${x2}% ${y2}%, rgba(96,66,150,0.18), rgba(96,66,150,0) 52%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </AbsoluteFill>
  );
};
