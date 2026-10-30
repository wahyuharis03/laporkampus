import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, TOTAL_FRAMES} from './timings';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LaporKampus"
      component={Video}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
