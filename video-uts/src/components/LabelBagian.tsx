import React from 'react';
import {useCurrentFrame} from 'remotion';
import {f, PAD, w} from '../theme';
import {masuk} from './anim';

type Props = {
  nomor: string;
  teks: string;
};

/** Label bagian di kiri atas: "01 / MASALAH". */
export const LabelBagian: React.FC<Props> = ({nomor, teks}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        left: PAD,
        top: 84,
        right: PAD,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...masuk(frame, 0),
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div
          style={{
            width: 10,
            height: 34,
            backgroundColor: w.aksen,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontFamily: f.isi,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: w.aksenMuda,
          }}
        >
          {nomor} / {teks}
        </div>
      </div>

      <div
        style={{
          fontFamily: f.isi,
          fontSize: 19,
          letterSpacing: '0.16em',
          color: w.redup,
        }}
      >
        LAPORKAMPUS
      </div>
    </div>
  );
};
