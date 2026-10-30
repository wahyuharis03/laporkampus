import {spring} from 'remotion';

/** Gaya masuk: memudar sambil naik 26 px. `delay` dalam frame. */
export const masuk = (frame: number, delay = 0, fps = 30) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: {damping: 200, mass: 0.6, stiffness: 110},
  });
  return {
    opacity: s,
    transform: `translateY(${(1 - s) * 26}px)`,
  } as React.CSSProperties;
};

/** Gaya masuk dengan geser dari kiri, untuk daftar bertingkat. */
export const masukKiri = (frame: number, delay = 0, fps = 30) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: {damping: 200, mass: 0.6, stiffness: 110},
  });
  return {
    opacity: s,
    transform: `translateX(${(1 - s) * -32}px)`,
  } as React.CSSProperties;
};
