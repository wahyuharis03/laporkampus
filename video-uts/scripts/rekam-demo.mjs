// Merekam demo aplikasi LaporKampus yang benar-benar berjalan di Chrome.
//
// Keluaran: out/demo/demo.webm + out/demo/marks.json (penanda awal tiap bab).
// Durasi tiap bab mengikuti panjang narasi di src/timings.ts, supaya klip hasil
// potongan pas dengan audio tanpa perlu mempercepat atau memperlambat gambar.
// Jalankan dengan DEBUG=1 untuk hanya memeriksa tangkapan layar tiap langkah.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const DEBUG = process.env.DEBUG === '1';
const AKAR = path.resolve(import.meta.dirname, '..');
const KELUAR = path.join(AKAR, 'out', 'demo');
const URL = 'http://127.0.0.1:8099/';

fs.mkdirSync(KELUAR, { recursive: true });

// Ambil durasi narasi tiap bab demo dari timings.ts
const timings = fs.readFileSync(path.join(AKAR, 'src', 'timings.ts'), 'utf8');
const durasi = {};
for (const m of timings.matchAll(/id: "([^"]+)"[^\n]*detik: ([\d.]+)/g)) {
  durasi[m[1]] = parseFloat(m[2]);
}

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-gl=swiftshader', '--hide-scrollbars'],
});

const konteks = await browser.newContext({
  viewport: { width: 540, height: 1080 },
  deviceScaleFactor: 2,
  ...(DEBUG
    ? {}
    : { recordVideo: { dir: path.join(KELUAR, 'mentah'), size: { width: 540, height: 1080 } } }),
});

const page = await konteks.newPage();
const t0 = Date.now();
const marks = [];
const tandai = (id) => {
  marks.push({ id, ms: Date.now() - t0 });
  console.log('MARK', id, ((Date.now() - t0) / 1000).toFixed(2));
};

const jeda = (ms) => page.waitForTimeout(ms);

/** Menahan langkah sampai detik tertentu di dalam bab, agar sinkron dengan narasi. */
async function tungguSampai(detik) {
  const sisa = awalBab + detik * 1000 - Date.now();
  if (sisa > 0) await jeda(sisa);
}

/** Kursor tiruan supaya gerakan mouse terlihat di rekaman. */
async function pasangKursor() {
  await page.evaluate(() => {
    if (document.getElementById('vk-kursor')) return;
    const gaya = document.createElement('style');
    gaya.textContent = `
      #vk-kursor { position: fixed; left: 0; top: 0; width: 26px; height: 26px;
        pointer-events: none; z-index: 2147483647; transform: translate(-4px,-2px);
        transition: transform 40ms linear; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
      .vk-riak { position: fixed; width: 12px; height: 12px; border-radius: 50%;
        border: 3px solid rgba(128,0,32,.85); pointer-events: none; z-index: 2147483646;
        transform: translate(-50%,-50%); animation: vk-riak .45s ease-out forwards; }
      @keyframes vk-riak { from { opacity: .9; width: 12px; height: 12px; }
        to { opacity: 0; width: 54px; height: 54px; } }
    `;
    document.head.appendChild(gaya);
    const k = document.createElement('div');
    k.id = 'vk-kursor';
    k.innerHTML =
      '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2 L4 20 L9.2 15.2 L12.6 22 L15.6 20.6 L12.2 13.8 L19 13.4 Z" fill="#ffffff" stroke="#1a1a1a" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    document.body.appendChild(k);
    window.addEventListener(
      'mousemove',
      (e) => {
        k.style.left = e.clientX + 'px';
        k.style.top = e.clientY + 'px';
      },
      true
    );
  });
}

async function riak(x, y) {
  await page.evaluate(
    ([x, y]) => {
      const d = document.createElement('div');
      d.className = 'vk-riak';
      d.style.left = x + 'px';
      d.style.top = y + 'px';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 500);
    },
    [x, y]
  );
}

async function gerak(x, y, langkah = 26) {
  const posisi = await page.evaluate(() => {
    const k = document.getElementById('vk-kursor');
    if (!k) return { x: 270, y: 540 };
    return { x: parseFloat(k.style.left) || 270, y: parseFloat(k.style.top) || 540 };
  });
  for (let i = 1; i <= langkah; i++) {
    const t = i / langkah;
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await page.mouse.move(posisi.x + (x - posisi.x) * e, posisi.y + (y - posisi.y) * e);
    await jeda(9);
  }
}

async function pusat(locator) {
  const box = await locator.first().boundingBox();
  if (!box) throw new Error('Elemen tidak punya kotak');
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function klik(locator, label = '') {
  const p = await pusat(locator);
  await gerak(p.x, p.y);
  await jeda(180);
  await riak(p.x, p.y);
  await page.mouse.click(p.x, p.y);
  console.log('KLIK', label, Math.round(p.x), Math.round(p.y));
  await jeda(500);
}

async function potret(nama) {
  if (DEBUG) await page.screenshot({ path: path.join(KELUAR, `debug-${nama}.png`) });
}

// Menahan bab sampai durasinya sama dengan narasi.
const mulaiBab = Date.now();
let awalBab = mulaiBab;
async function tutupBab(id) {
  const target = (durasi[id] ?? 0) * 1000;
  const terpakai = Date.now() - awalBab;
  if (target > terpakai) await jeda(Math.min(target - terpakai, 15000));
  console.log('BAB', id, 'klip', ((Date.now() - awalBab) / 1000).toFixed(2), 'narasi', (target / 1000).toFixed(2));
}

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await jeda(5000);
  await page.evaluate(() => document.querySelector('flt-semantics-placeholder')?.click());
  await jeda(1200);
  await pasangKursor();
  await page.mouse.move(270, 620);
  await jeda(700);
  await potret('00-login');

  // ---------- A. Login ----------
  awalBab = Date.now();
  tandai('demo-login');
  await klik(page.getByRole('button', { name: 'Masuk' }), 'Masuk kosong');
  await jeda(1700);
  await potret('01-login-error');

  const nim = page.locator('input').nth(0);
  const sandi = page.locator('input').nth(1);
  await klik(nim, 'NIM');
  await page.keyboard.type('23.01.55.0003', { delay: 70 });
  await jeda(350);
  await klik(sandi, 'password');
  await page.keyboard.type('rahasia123', { delay: 75 });
  await tungguSampai(16.3);
  await potret('02-login-terisi');
  await klik(page.getByRole('button', { name: 'Masuk' }), 'Masuk');
  await jeda(1800);
  await potret('03-beranda');
  await tutupBab('demo-login');

  // ---------- B. Beranda ----------
  awalBab = Date.now();
  tandai('demo-beranda');
  await gerak(300, 430, 18);
  await jeda(900);
  await gerak(280, 700, 18);
  await tungguSampai(9.9);
  await klik(page.getByText('Buat Laporan', { exact: true }), 'Buat Laporan');
  await jeda(1200);
  await potret('04-form');
  await tutupBab('demo-beranda');

  // ---------- C. Kirim kosong ----------
  awalBab = Date.now();
  tandai('demo-form');
  await klik(page.getByRole('button', { name: 'Kirim Laporan' }), 'Kirim kosong');
  await jeda(2200);
  await potret('05-validasi-kosong');
  await tutupBab('demo-form');

  // ---------- D. Isi dengan nilai salah ----------
  awalBab = Date.now();
  tandai('demo-salah');
  await klik(page.locator('input[aria-label="Lokasi fasilitas *"]'), 'Lokasi');
  await page.keyboard.type('A', { delay: 90 });
  await jeda(700);
  await potret('06-lokasi-salah');

  // kategori: Listrik (item pertama)
  await klik(page.getByRole('button', { name: /Kategori kerusakan/ }), 'Dropdown kategori');
  await jeda(700);
  await page.keyboard.press('Enter');
  await jeda(700);

  // urgensi: Sedang (turun satu)
  await klik(page.getByRole('button', { name: /Tingkat urgensi/ }), 'Dropdown urgensi');
  await jeda(700);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await jeda(700);

  // tanggal: hari ini
  await klik(page.locator('input[aria-label="Tanggal kejadian *"]'), 'Tanggal');
  await jeda(900);
  await potret('07-dialog-tanggal');
  await klik(page.getByText('OK', { exact: true }), 'OK tanggal');
  await jeda(800);

  // jumlah 60 -> melebihi batas
  await klik(page.locator('input[aria-label="Jumlah unit rusak *"]'), 'Jumlah');
  await page.keyboard.type('60', { delay: 110 });
  await jeda(800);
  await potret('08-jumlah-salah');

  // deskripsi terlalu pendek
  await klik(page.locator('textarea[aria-label="Deskripsi kerusakan *"]'), 'Deskripsi');
  await page.keyboard.type('Rusak', { delay: 90 });
  await jeda(900);
  await potret('09-deskripsi-salah');
  await tutupBab('demo-salah');

  // ---------- E. Perbaiki dan kirim ----------
  awalBab = Date.now();
  tandai('demo-benar');
  const lokasi = page.locator('input[aria-label="Lokasi fasilitas *"]');
  await klik(lokasi, 'Lokasi ulang');
  await page.keyboard.press('Control+A');
  await page.keyboard.type('Gedung B - Ruang B105', { delay: 55 });
  await jeda(600);

  const jumlah = page.locator('input[aria-label="Jumlah unit rusak *"]');
  await klik(jumlah, 'Jumlah ulang');
  await page.keyboard.press('Control+A');
  await page.keyboard.type('2', { delay: 90 });
  await jeda(600);

  const deskripsi = page.locator('textarea[aria-label="Deskripsi kerusakan *"]');
  await klik(deskripsi, 'Deskripsi ulang');
  await page.keyboard.press('Control+A');
  await page.keyboard.type(
    'Dua kursi di ruang B105 patah pada bagian sandaran sehingga tidak aman dipakai saat kuliah.',
    { delay: 22 }
  );
  await jeda(900);
  await potret('10-form-benar');

  await klik(page.getByRole('button', { name: 'Kirim Laporan' }), 'Kirim valid');
  await jeda(1200);
  await potret('11-snackbar-hijau');
  await jeda(1200);
  await tutupBab('demo-benar');

  // ---------- F. Laporan Saya + keadaan kosong ----------
  awalBab = Date.now();
  tandai('demo-daftar');
  // Tab navigasi bawah: koordinat tetap, teks semantik sering belum siap.
  await gerak(405, 1035);
  await jeda(250);
  await riak(405, 1035);
  await page.mouse.click(405, 1035);
  await jeda(900);
  await gerak(270, 830, 16);
  await jeda(900);
  await potret('12-daftar');

  await gerak(251, 84);
  await riak(251, 84);
  await page.mouse.click(251, 84);
  await jeda(900);
  await gerak(270, 820, 14);
  await jeda(900);
  await potret('13-kosong');
  await gerak(57, 84);
  await riak(57, 84);
  await page.mouse.click(57, 84);
  await jeda(700);
  await gerak(270, 820, 12);
  await jeda(900);
  await tutupBab('demo-daftar');

  // ---------- G. Detail ----------
  awalBab = Date.now();
  tandai('demo-detail');
  await gerak(270, 596);
  await riak(270, 596);
  await page.mouse.click(270, 596);
  await jeda(1600);
  await potret('14-detail');
  await tutupBab('demo-detail');
  await jeda(600);
} catch (err) {
  console.error('GAGAL:', err.message);
  await page.screenshot({ path: path.join(KELUAR, 'gagal.png') });
  process.exitCode = 1;
} finally {
  const video = page.video();
  if (video) {
    await page.close();
    const simpan = path.join(KELUAR, 'demo.webm');
    await video.saveAs(simpan);
    console.log('VIDEO', simpan);
  }
  fs.writeFileSync(path.join(KELUAR, 'marks.json'), JSON.stringify(marks, null, 2));
  await konteks.close();
  await browser.close();
}
