// Berkas ini dibangkitkan oleh scripts/tts-demo.py — jangan disunting manual.
// Hanya sisipan pembuka dan penutup; adegan demo memakai src/timings.ts.

export type Sisipan = {
  id: string;
  teks: string;
  audio: string;
  detik: number;
  frames: number;
};

export const SISIPAN: Sisipan[] = [
  { id: "demo-intro", teks: "Berikut demo aplikasi LaporKampus. Enam langkah yang diperlihatkan: login, beranda, formulir laporan, validasi isian, pengiriman laporan, dan daftar laporan. Semua data pada demo ini masih simulasi.", audio: "audio/demo-intro.mp3", detik: 16.056, frames: 496 },
  { id: "demo-outro", teks: "Sekian demo LaporKampus. Terima kasih.", audio: "audio/demo-outro.mp3", detik: 4.464, frames: 148 },
];
